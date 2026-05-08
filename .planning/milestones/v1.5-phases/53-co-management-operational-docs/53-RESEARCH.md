# Phase 53: Co-Management Operational Docs - Research

**Researched:** 2026-04-28
**Domain:** ConfigMgr co-management + Windows Autopatch — documentation authoring phase
**Confidence:** HIGH (all factual claims verified against Microsoft Learn updated 2025-2026; CONTEXT.md decisions locked via adversarial review)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** 4-file suite under `docs/operations/co-management/`: `00-overview.md` (COMG-01) / `01-windows-tenant-attach.md` (COMG-03) / `02-windows-workload-sliders.md` (COMG-02; filename per REQ line 157 verbatim — NOT `02-windows-workload-migration.md`) / `03-cocmgmt-migration-paths.md` (COMG-05). Plus creates `docs/operations/00-index.md`.
- **D-02:** `docs/operations/00-index.md` ships at Phase 53 with co-management H2 ONLY. No placeholder rows or scaffold H2s for Phases 54/55/56.
- **D-03:** Tenant attach disambiguation in `01-windows-tenant-attach.md` uses side-by-side feature comparison table (3 columns: Capability | Tenant Attach | Full Co-Management).
- **D-04:** `02-windows-workload-sliders.md` carries a single 7-row workload table preceded by a small slider-state semantics block. Workload table columns: Workload | Migration Order | Risk | Validate Before Moving Slider | Pilot Collection Guidance.
- **D-05:** Endpoint Protection workload carries three-layer HIGH-RISK callout: Layer 1 = table cell (`**HIGH-RISK** — see callout`); Layer 2 = adjacent `> ⚠️ **Endpoint Protection HIGH-RISK:**` blockquote with PITFALLS-line-179 verbatim mandate; Layer 3 = per-occurrence inline `[HIGH-RISK — see callout above]` reminder at ≥2 locations in file.
- **D-06:** Pilot Intune disambiguation = H2 `## Three Workload Slider States` in `00-overview.md` with positive assertion ("collection-scoped") + validator NEGATIVE assertion banning "partially migrated" / "fully migrated" phrasings from the 4 Phase 53 files.
- **D-07:** Autopatch prereqs (COMG-05) primary content lives in `03-cocmgmt-migration-paths.md` per REQ line 160 verbatim. Soft cross-link from `00-overview.md` to `03-cocmgmt-migration-paths.md#autopatch-prerequisites`.
- **D-08:** Each of `00-overview.md` / `01-windows-tenant-attach.md` / `02-windows-workload-sliders.md` carries `> **Platform applicability:**` blockquote at TOP with embedded macOS/iOS/Android analog migration content (~3-5 lines per platform per file).
- **D-09:** `03-cocmgmt-migration-paths.md` does NOT carry inline cross-platform analog blockquote. Windows Autopatch prereqs scope only.
- **D-10:** Validator scope = FULL — 22-26 V-53-NN structural assertions (V-53-01..26 per CONTEXT).
- **D-11:** `check-phase-53.mjs` matches `check-phase-52.mjs` / `check-phase-51.mjs` pattern: file-reads-only, no shared module, regex-based, no markdown-AST dependency.
- **D-12:** All 4 content files + `operations/00-index.md` use `platform: Windows` + `audience: admin` + 60-day `last_verified` + `review_by` frontmatter.
- **D-13:** Hardcoded H2/anchor strings + literal-token regexes pinned in both validator and CONTEXT.md. Renames require same-commit validator update.
- **D-14:** Single atomic commit: 4 new co-management files + new `docs/operations/00-index.md` + validator.
- **D-15:** Plan order: authoring wave (parallel, 53-01 through 53-06) → pre-commit gate → single atomic commit → post-commit verification → VERIFICATION.md (separate commit).

### Claude's Discretion

- **CD-01:** Exact wording of per-platform analog content in inline blockquotes (form + minimum content per D-08; specific verb choice is author discretion).
- **CD-02:** Exact ordering of Resource Access workload row in `02-windows-workload-sliders.md` table (deprecated row may be present-but-collapsed or last-row — author discretion within REQ COMG-02 sequence-preservation contract).
- **CD-03:** Per-workload Pilot Collection Guidance column body length.
- **CD-04:** Whether `00-overview.md` includes a Mermaid diagram — validator does NOT assert Mermaid presence.
- **CD-05:** Tenant attach comparison-table column count — D-03 specifies 3 columns minimum; 4th "Notes" column at author discretion.
- **CD-06:** Cross-platform inline blockquote structure — single multi-platform blockquote vs three separate per-platform blockquotes; validator accepts either via `> **Platform applicability:**` + 3-platform-token coverage.
- **CD-07:** Whether `03-cocmgmt-migration-paths.md` cross-references Phase 54 placeholder content for WUfB-vs-Autopatch ring disambiguation.
- **CD-08:** `audience` frontmatter value — `admin` is default; `admin,L2` permitted for `02-windows-workload-sliders.md`.

### Deferred Ideas (OUT OF SCOPE)

- PITFALL-13 same-commit-allowlist seeding — deferred to first false-positive surface (Phase 48 D-15 YAGNI; path-restriction to `docs/operations/co-management/` excludes PITFALLS file)
- Phase 60 C-check expansion to operations/ files — handled at Phase 60, not Phase 53
- Phase 58 DEFER-08 comparison doc co-management row — Phase 58 authorship
- Phase 59 `docs/index.md` Operations H2 — Phase 59 authorship
- Phase 54 Autopatch ring topology + WUfB-vs-Autopatch disambiguation (PITFALL-9) — forward-link from Phase 53 only
- Phase 56 Phase 53 anchor cross-references for tenant-migration content — Phase 56 author discretion
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| COMG-01 | Admin can read a co-management overview + workload model guide covering all 7 ConfigMgr CB 2503 workloads with Device Configuration → Resource Access + Endpoint Protection implicit-switching note | Research Area 1: 7 workload names verified from Microsoft Learn (updated 2025-05-12); implicit-switching note confirmed in workloads page; slider states confirmed in how-to-switch-workloads page |
| COMG-02 | Admin can plan a workload-slider migration sequence (low-risk-first) with per-workload pilot-collection guidance and forward-link to v1.2 Windows migration content | Research Area 1: workload risk ordering documented; Research Area 4: v1.2 cross-link targets confirmed (imaging-to-autopilot.md + 04-tenant-migration.md both exist) |
| COMG-03 | Admin can distinguish tenant attach from full co-management via focused disambiguation doc | Research Area 2: tenant attach vs co-management distinction verified from Microsoft Learn cloud-attach overview |
| COMG-04 | macOS / iOS / Android admins see explicit "no co-management equivalent" callouts with analog migration paths | Research Area 3: analog paths verified; cross-link target file names confirmed (D-08 content) — NOTE: iOS file discrepancy flagged (see Research Area 3) |
| COMG-05 | Admin can identify Windows Autopatch co-management prerequisites (Device Configuration AND Office Click-to-Run AND Windows Update workloads moved to Intune) | Research Area 2: Autopatch prereqs verified — CRITICAL FINDING: THREE workloads required, not two (see Research Area 2) |
</phase_requirements>

---

## Summary

Phase 53 is a documentation-only phase delivering 4 markdown content files + 1 operations index file + 1 Node.js validator. All architectural and structural decisions are locked in CONTEXT.md via adversarial review (15 D-NN decisions + 7 DPOs + 7 CDIs). This research addresses 6 factual domains: co-management workload names and slider states, Windows Autopatch prerequisites (CRITICAL: three workloads, not two), tenant attach vs co-management distinction, cross-platform analog migration paths and their cross-link targets, v1.2 Windows migration cross-link targets, and validator pattern derivation.

**CRITICAL FINDING — COMG-05 Autopatch Prerequisites:** The ROADMAP SC#5 and REQUIREMENTS COMG-05 state "Device Configuration AND Office Click-to-Run workloads." The Microsoft Learn Autopatch prerequisites page (updated 2026-02-26) states: "the Windows Update, Device configuration, and Office Click-to-Run apps workloads must be set to Pilot Intune or Intune." This is **THREE** required workloads, not two. `03-cocmgmt-migration-paths.md` must document all three: Windows Update Policies, Device Configuration, and Office Click-to-Run Apps. The planner must ensure `02-windows-workload-sliders.md` also surfaces this via its WU Policies row forward-link note.

**CRITICAL FINDING — iOS cross-link target discrepancy:** CONTEXT.md D-08 references `docs/admin-setup-ios/04-byod-mam-overview.md` as the iOS analog content cross-link target. This file does NOT exist. The actual iOS MAM content is in `docs/admin-setup-ios/09-mam-app-protection.md`. The iOS enrollment overview `docs/admin-setup-ios/00-overview.md` exists and covers all enrollment paths including MAM-WE. Plans for 53-02 (`01-windows-tenant-attach.md`) and 53-01/53-03 (`00-overview.md`, `02-windows-workload-sliders.md`) must use the correct cross-link path: `docs/admin-setup-ios/09-mam-app-protection.md` (or the overview at `00-overview.md`).

**Primary recommendation:** All 6 plans (53-01 through 53-06) can be authored in parallel; single atomic commit is required by D-14 and enforced by V-53-22. Use `check-phase-52.mjs` as the primary template for the validator. The CONTEXT.md D-10 V-53-01..26 specification is the authoritative validator blueprint.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Co-management workload sliders | ConfigMgr console (on-premises) | Intune admin center (cloud) | Slider control lives in ConfigMgr console; Intune receives the migrated workload policies |
| Tenant attach device sync | ConfigMgr site (uploads) | Intune admin center (displays) | CM site uploads device records; admin reads + acts in Intune portal |
| Tenant attach remote actions | Intune admin center (initiates) | ConfigMgr client (executes) | Action triggered from cloud; executed on-device via CM client |
| Workload policy enforcement | ConfigMgr or Intune (per slider state) | — | Per-workload: ConfigMgr = slider at ConfigMgr; Intune = slider at Pilot/Intune |
| Windows Autopatch ring management | Intune (cloud-managed) | — | Autopatch requires full Intune workload ownership for 3 workloads |
| Documentation content | Docs repo (markdown files) | — | Phase 53 output is authored markdown; no runtime system |
| Validation | Node.js validator (CI + local) | v1.5-milestone-audit.mjs (C1-C12) | check-phase-53.mjs runs in Node.js against file system |
| Operations index ownership | `docs/operations/00-index.md` (Phase 53 creates) | Phases 54-56 (cross-reference only) | ROADMAP line 448 hotspot ownership table |

---

## Standard Stack

### Core (documentation authoring + Node.js validation)

| Component | Version | Purpose | Why Standard |
|-----------|---------|---------|--------------|
| Markdown (GFM) | — | Content format for all 5 new files | Project-wide standard |
| YAML frontmatter | — | `platform: Windows`, `audience: admin`, `last_verified`, `review_by` | Phase 48-52 D-12/D-04 contract |
| Node.js / ESM `.mjs` | 18+ (as installed) | `check-phase-53.mjs` validator runtime | Phase 48-52 validator lineage; file-reads-only, no npm deps |
| `fs.readFileSync` / `existsSync` | Node built-in | File reading in validator | Phase 48 D-25 file-reads-only contract — no external deps |

### Validator Template Reference

| File | Role | Critical Patterns to Inherit |
|------|------|------------------------------|
| `scripts/validation/check-phase-52.mjs` | PRIMARY template | Frontmatter check pattern (V-52-05); layered-caveat 3-tier pattern (V-52-06/07/08); NEGATIVE assertion with path scope restriction; index append assertion shape |
| `scripts/validation/check-phase-51.mjs` | Secondary template | POSITIVE+NEGATIVE dual-defense pattern (V-51-09 + V-51-19); full validator scope precedent |

### Existing Files Phase 53 Modifies or Creates

| Path | Status | Phase 53 Action |
|------|--------|-----------------|
| `docs/operations/co-management/00-overview.md` | DOES NOT EXIST | CREATE (new directory + file) |
| `docs/operations/co-management/01-windows-tenant-attach.md` | DOES NOT EXIST | CREATE |
| `docs/operations/co-management/02-windows-workload-sliders.md` | DOES NOT EXIST | CREATE |
| `docs/operations/co-management/03-cocmgmt-migration-paths.md` | DOES NOT EXIST | CREATE |
| `docs/operations/00-index.md` | DOES NOT EXIST | CREATE (new parent directory entry) |
| `scripts/validation/check-phase-53.mjs` | DOES NOT EXIST | CREATE |

**No existing files are modified by Phase 53** (per D-14 + ROADMAP line 448: all Phase 53 deliverables are new files; 00-index.md is not an append — it is a brand-new file).

---

## Architecture Patterns

### System Architecture Diagram

```
UPSTREAM: ConfigMgr CB 2503 (on-premises)
  └── 7 co-management workloads (each has 3-state slider)
  └── Tenant attach feature (device sync only, no workload switch)
            │
            │ Admin reads docs to plan migration
            ▼
Phase 53 Documentation Suite (docs/operations/co-management/)
  ┌──────────────────────────────────────────────────────────────┐
  │ 00-overview.md (COMG-01)                                     │
  │   Platform applicability blockquote [top]                    │
  │   7-workload enumeration (Compliance → Client Apps)          │
  │   Three Workload Slider States H2                            │
  │   Pilot Intune positive assertion + NEGATIVE ban             │
  │   Resource Access deprecated callout (CB 2203/CB 2403)       │
  │   Device Config → Resource Access + EP implicit-switch note  │
  │   Soft cross-link → 03-cocmgmt-migration-paths.md#autopatch  │
  ├──────────────────────────────────────────────────────────────┤
  │ 01-windows-tenant-attach.md (COMG-03)                        │
  │   Platform applicability blockquote [top]                    │
  │   Side-by-side comparison table                              │
  │   Tenant Attach: portal sync + remote actions, NO workloads  │
  │   Full Co-Management: workload sliders active                │
  ├──────────────────────────────────────────────────────────────┤
  │ 02-windows-workload-sliders.md (COMG-02)                     │
  │   Platform applicability blockquote [top]                    │
  │   Small slider-state semantics block                         │
  │   7-row workload sequence table (low-risk-first)             │
  │   EP HIGH-RISK three-layer callout [D-05]                    │
  │   Forward-links → imaging-to-autopilot.md, 04-tenant-mgr.md  │
  ├──────────────────────────────────────────────────────────────┤
  │ 03-cocmgmt-migration-paths.md (COMG-05)                      │
  │   Windows Autopatch prerequisites primary content            │
  │   THREE workloads: WU + Device Config + Office C2R           │
  │   Pilot Intune acceptable (per Autopatch prereq page)        │
  │   Forward-link → Phase 54 WUfB-vs-Autopatch [PITFALL-9]      │
  │   NO cross-platform blockquote [D-09 / V-53-21 guard]        │
  └──────────────────────────────────────────────────────────────┘
            │
            ▼
docs/operations/00-index.md (Phase 53 creates; 54-56 cross-reference only)
  Co-Management H2 ONLY; negative-regex regression-guard in V-53-22
            │
            ▼
scripts/validation/check-phase-53.mjs
  V-53-01..26 structural assertions
            │
            ▼
Pre-commit gate:
  check-phase-53.mjs exits 0
  v1.5-milestone-audit.mjs exits 0
  regenerate-supervision-pins.mjs --self-test exits 0
            │
            ▼
Single Atomic Commit (D-14)
  6 new files: 4 content + 1 index + 1 validator
            │
            ▼
VERIFICATION.md (separate commit)
```

### Recommended Project Structure (new files only)

```
docs/
└── operations/                          # NEW DIRECTORY (created by Phase 53)
    ├── 00-index.md                      # NEW — top-level operations index
    └── co-management/                   # NEW SUBDIRECTORY
        ├── 00-overview.md               # COMG-01
        ├── 01-windows-tenant-attach.md  # COMG-03
        ├── 02-windows-workload-sliders.md # COMG-02
        └── 03-cocmgmt-migration-paths.md  # COMG-05

scripts/validation/
└── check-phase-53.mjs                   # NEW — V-53-01..26 validator
```

### Pattern 1: Frontmatter (all 5 content files)

```yaml
---
last_verified: <plan-execution-date>
review_by: <last_verified + 60d>
applies_to: all
audience: admin
platform: Windows
---
```

Source: Phase 52 D-04 frontmatter pattern [VERIFIED: check-phase-52.mjs V-52-05 implementation]

### Pattern 2: Platform Applicability Blockquote (00/01/02 only, NOT 03)

```markdown
> **Platform applicability:** This guide is Windows-specific (ConfigMgr + Intune co-management).
> **macOS:** No co-management equivalent — Microsoft Intune does not federate with Jamf at the
> workload-slider level. Migration path: Jamf → Intune via ABM MDM transfer (release device
> assignment in Jamf-bound MDM server in ABM, then re-assign to Intune-bound MDM server; in-use
> devices require user-initiated re-enrollment). See [macOS Enrollment Profiles](../../admin-setup-macos/02-enrollment-profile.md).
> **iOS/iPadOS:** No co-management equivalent — Apple MDM is single-server-per-device. Migration
> path: MAM → MDM transition (MAM-WE app protection policies coexist with new MDM enrollment).
> See [iOS/iPadOS Admin Setup](../../admin-setup-ios/00-overview.md) and
> [iOS MAM App Protection](../../admin-setup-ios/09-mam-app-protection.md).
> **Android:** No co-management equivalent. Migration paths: legacy Device Administrator →
> Android Enterprise (DA deprecated August 2022; wipe + re-enrollment required); MAM → MDM for
> BYOD. See [Android Admin Setup](../../admin-setup-android/00-overview.md).
```

Source: CONTEXT.md D-08 [CITED: docs/admin-setup-ios/00-overview.md — actual file path verified]; NOTE: cross-link path corrected from CONTEXT.md's `04-byod-mam-overview.md` (file does not exist) to `09-mam-app-protection.md` (actual file). [VERIFIED: bash ls docs/admin-setup-ios/]

### Pattern 3: EP HIGH-RISK Three-Layer Callout (02-windows-workload-sliders.md only)

**Layer 1 — workload table Risk column cell:**
```markdown
| Endpoint Protection | 4 | **HIGH-RISK** — see callout | ... |
```

**Layer 2 — immediately below workload table:**
```markdown
> ⚠️ **Endpoint Protection HIGH-RISK:** do not move this slider until Intune Defender for
> Endpoint policy is published, targeted, and confirmed reporting healthy. Moving the slider
> before Defender policy lands and reports healthy creates a fleet-wide Defender coverage gap
> window. Verify policy reporting via Intune > Endpoint security > Microsoft Defender for
> Endpoint > Onboarding status before initiating slider move.
```

**Layer 3 — per-occurrence inline reminders (≥2 in file body):**
```markdown
... the Endpoint Protection workload [HIGH-RISK — see callout above] ...
```

Source: CONTEXT.md D-05; validated against Phase 52 D-01 three-layer pattern [CITED: .planning/phases/52-linux-l2-investigation-runbooks-24-25/52-CONTEXT.md D-01]; D-05 verbatim Defender mandate [CITED: .planning/research/PITFALLS.md line 179]

### Pattern 4: Pilot Intune H2 with Dual-Defense (00-overview.md)

```markdown
## Three Workload Slider States

| State | Scope | Behavior |
|-------|-------|----------|
| Configuration Manager | All co-managed devices | ConfigMgr manages this workload for all devices |
| Pilot Intune | Devices in specified pilot collection only | Intune manages this workload for collection members; remainder of fleet stays on ConfigMgr |
| Intune | All co-managed devices | Intune manages this workload for all enrolled devices |

> **Note:** The Pilot Intune state is **not a binary toggle** — it is collection-scoped Intune
> management. The slider state is per-collection: devices in the pilot collection are managed by
> Intune; devices outside the collection remain on ConfigMgr. A device can be in the Pilot
> Intune collection for some workloads and not others.
```

V-53-09 POSITIVE assertion: `collection-scoped` token must be present within ~10 lines of "Pilot Intune"
V-53-10 NEGATIVE assertion: ban `partially migrated`, `partially-migrated`, `fully migrated`, `fully-migrated` (case-insensitive) from all 4 co-management/ files — PITFALL-8 regression-guard

Source: CONTEXT.md D-06; PITFALL-8 line 173-187 [CITED: .planning/research/PITFALLS.md]; how-to-switch-workloads.md [VERIFIED: Microsoft Learn 2026-01-29]

### Pattern 5: Tenant Attach vs Full Co-Management Comparison Table

```markdown
| Capability | Tenant Attach | Full Co-Management |
|------------|---------------|---------------------|
| Intune admin center device sync | Yes | Yes |
| Remote actions (from Intune portal) | Yes | Yes |
| Endpoint security reports | Yes | Yes |
| CMPivot queries from Intune | Yes | Yes |
| Workload slider control | **No — workloads stay in ConfigMgr** | Yes — per-workload slider |
| Intune policy enforcement | **No — ConfigMgr manages all workloads** | Yes — for switched workloads |
| Conditional Access with Intune compliance | No (compliance workload not moved) | Yes — when Compliance workload moved |
| Windows Autopatch eligibility | No | Yes — requires 3 workloads moved (see 03) |
| Requires Hybrid Entra ID join | No | Typically yes (ConfigMgr enrollment path) |
| Intune license per device | No | Yes |
```

V-53-11: table with columns `| Capability | Tenant Attach | Full Co-Management |` must exist in 01
V-53-12: literal `no workload switching` AND `workload sliders` must appear in 01

Source: cloud-attach/overview.md [VERIFIED: Microsoft Learn 2026-04-16]; how-to-switch-workloads.md [VERIFIED: Microsoft Learn 2026-01-29]

### Pattern 6: ops/00-index.md Co-Management H2 (co-management only at Phase 53 ship)

```markdown
---
last_verified: <execution-date>
review_by: <execution-date + 60d>
applies_to: all
audience: admin
platform: Windows
---

# Operations

This index covers operational depth guides for Intune-managed fleets. Guides are grouped by
operational domain.

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

V-53-22: `## Co-Management` H2 must exist; NEGATIVE ban on `## Patch Management`, `## App Lifecycle`, `## Drift`, `## Tenant Migration`, `TBD`, `Coming in Phase`, `Phase 54`, `Phase 55`, `Phase 56` at H2 position.

Source: CONTEXT.md D-02; ROADMAP line 248-249 [CITED: .planning/ROADMAP.md]; D-10 V-53-22 specification

### Anti-Patterns to Avoid

- **"Partially migrated" / "fully migrated" framing for slider states:** PITFALL-8 — use "collection-scoped management" for Pilot Intune. V-53-10 NEGATIVE assertion enforces.
- **Two-layer EP HIGH-RISK callout:** Phase 52 DPO-07 establishes three-layer as the ops-domain default. V-53-15/16/17 enforce per-layer.
- **Cross-platform blockquote in 03-cocmgmt-migration-paths.md:** V-53-21 NEGATIVE regression-guard enforces. 03 is Windows Autopatch prereqs only (REQ line 160).
- **Using `docs/admin-setup-ios/04-byod-mam-overview.md` as cross-link:** File does NOT exist. Use `09-mam-app-protection.md`.
- **Using `docs/admin-setup-macos/02-enrollment-profiles.md`:** Actual file is `02-enrollment-profile.md` (no trailing `s`). [VERIFIED: bash ls]
- **Scaffold H2s in ops/00-index.md for Phases 54/55/56:** D-02 + V-53-22 forbid this. Violates Phase 42 D-03 append-only H2-block contract.
- **Documenting only Device Configuration + Office C2R for Autopatch prereqs:** Autopatch requires Windows Update ALSO. See Research Area 2.
- **Committing in two stages:** D-14 + CDI-Phase53-04 require single atomic commit.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Frontmatter validation | Custom parsing | Existing `check-phase-52.mjs` V-52-05 pattern | Regex-based FM extraction already proven; Phase 53 V-53-06 is a direct port |
| Layered callout validation | Novel multi-file scan | Phase 52 V-52-06/07/08 three-layer pattern | Cross-domain transfer explicitly endorsed (DPO-Phase52-07); proven in production |
| H2 anchor POSITIVE+NEGATIVE dual-defense | New approach | Phase 51 V-51-09 + V-51-19 pattern | PITFALL-8 regression-guard precedent established; V-53-09 + V-53-10 are direct ports |
| Validator scope restriction (exclude PITFALLS file) | Global scan | `docs/operations/co-management/` prefix filter | F-2C-3-02 surviving defect in adversarial review; PITFALLS file itself contains banned phrases |
| Ops index H2 scope enforcement | Manual review | V-53-22 combined positive-presence + negative-regression-guard | Novel check for v1.5 (Phase 51/52 used append-after-last-H2; this is new-file single-H2 shape) |

---

## Research Area 1: ConfigMgr CB 2503 Co-Management Workloads

### Verified 7 Workloads (EXACT NAMES from Microsoft Learn)

[VERIFIED: learn.microsoft.com/en-us/intune/configmgr/comanage/workloads, updated 2025-05-12]

| # | Workload (Microsoft Learn exact name) | Status in CB 2503 |
|---|--------------------------------------|-------------------|
| 1 | Compliance policies | Active |
| 2 | Windows Update policies | Active |
| 3 | Resource access policies | **DEPRECATED since CB 2203** |
| 4 | Endpoint Protection | Active — HIGH-RISK |
| 5 | Device configuration | Active |
| 6 | Office Click-to-Run apps | Active |
| 7 | Client apps | Active |

**NOTE on naming normalization:** Microsoft Learn uses mixed case and slight variations. The ROADMAP/REQUIREMENTS use slightly different names (e.g., "Client Apps" vs "Client apps", "Compliance Policies" vs "Compliance policies"). The validator V-53-07 must use the exact tokens from the project's REQUIREMENTS.md COMG-01 verbatim list: `Compliance Policies`, `Windows Update Policies`, `Resource Access`, `Endpoint Protection`, `Device Configuration`, `Office Click-to-Run Apps`, `Client Apps`. These are the pinned literal strings.

### Resource Access Deprecation Details

[VERIFIED: learn.microsoft.com/en-us/intune/configmgr/comanage/workloads, updated 2025-05-12]

- Deprecated **since CB 2203** — no longer supported for new configurations
- **Starting in CB 2403:** Resource access policies node removed from ConfigMgr console; slider is **mandated to Intune**; upgrade is blocked if old policies are still available
- The Resource Access workload is also part of Device configuration — policies are managed by Intune when Device Configuration workload is switched (implicit switching)
- V-53-26 requires: literal `deprecated` near `Resource Access` token (≤10-line window) AND reference to `CB 2203` or `CB 2403`

### Device Configuration → Resource Access + Endpoint Protection Implicit Switching

[VERIFIED: learn.microsoft.com/en-us/intune/configmgr/comanage/workloads]

From the Device configuration section: "Switching this workload also moves the **Resource Access** and **Endpoint Protection** workloads."

From the Endpoint Protection section: "The Endpoint Protection workload is also part of device configuration. The same behavior applies when you switch the Device Configuration workload."

**Implication for doc authoring:** `00-overview.md` MUST include the explicit note: "Switching the Device Configuration workload also implicitly switches the Resource Access and Endpoint Protection workloads — if those workloads have not already been switched." This is the REQ COMG-01 verbatim "Device Configuration → Resource Access + Endpoint Protection implicit-switching note."

### Three Slider States (Verified Definitions)

[VERIFIED: learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-switch-workloads, updated 2026-01-29]

| State | Microsoft Learn Definition |
|-------|---------------------------|
| Configuration Manager | "Configuration Manager continues to manage this workload." |
| Pilot Intune | "Switch this workload only for the devices in the pilot collection. You can change the Pilot collections on the Staging tab." |
| Intune | "Switch this workload for all Windows devices enrolled in co-management." |

**Pilot Intune behavioral note (EP + Device Configuration):** "When Pilot Intune is selected for Endpoint Protection and Device Configuration Policies, Intune only deploys the policies and doesn't perform policy removal upon unassignment. For policy removal from the device when the policy is unassigned, the workload must be switched to Intune."

---

## Research Area 2: Windows Autopatch Co-Management Prerequisites (CRITICAL CORRECTION)

### VERIFIED: THREE Workloads Required, Not Two

[VERIFIED: learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites, updated 2026-02-26]

From the "Configuration Manager co-management requirements" section:

> "Must have the following co-management workloads enabled and set to either **Intune** or **Pilot Intune**:
> - Windows Update policies workload
> - Device configuration workload
> - Office Click-to-Run apps workload"

**The ROADMAP SC#5 and REQUIREMENTS COMG-05 specify "Device Configuration AND Office Click-to-Run" (two workloads). The current Microsoft Learn docs specify THREE: Windows Update policies, Device configuration, AND Office Click-to-Run apps.**

**Resolution for planners:** The workloads page also confirms: "To use Windows Autopatch with these devices, this workload must be moved to Intune [for Windows Update policies]" and similar notes appear in both Device configuration and Office Click-to-Run sections. This is verified by three independent callouts on the workloads page AND the Autopatch prerequisites page. The REQUIREMENTS.md COMG-05 statement is **incomplete** — it was written before the latest Autopatch docs were verified.

**Documentation action (53-04):** `03-cocmgmt-migration-paths.md` MUST document all three Autopatch workload prerequisites:
1. Windows Update policies workload → set to Pilot Intune or Intune
2. Device configuration workload → set to Pilot Intune or Intune
3. Office Click-to-Run apps workload → set to Pilot Intune or Intune

The validator V-53-20 asserts `Device Configuration` AND `Office Click-to-Run` AND `Autopatch` AND `prerequisite` — this is still satisfied even when Windows Update is also mentioned. The planner must ensure "Windows Update" is included in the 53-04 task description and content requirements.

### Pilot Intune Acceptable for Autopatch

The Autopatch prereqs page accepts either "Intune" or "Pilot Intune" for the three workloads. If "Pilot Intune" is selected, devices must be in the corresponding pilot collections. `03-cocmgmt-migration-paths.md` should document this nuance.

### Autopatch WUfB Note (for forward-link)

The workloads page note on Windows Update policies: "After moving the Windows Update workload to Intune, the client settings in Configuration Manager need to be adjusted manually... Either modify existing client settings, or create a new custom client setting to disable the software update workflow." This substantiates the forward-link to Phase 54 content on WUfB-vs-Autopatch disambiguation (PITFALL-9).

---

## Research Area 3: Tenant Attach vs Full Co-Management

### Verified Distinction

[VERIFIED: learn.microsoft.com/en-us/intune/configmgr/cloud-attach/overview, updated 2026-04-16]

**Tenant Attach:** "Tenant attach provides immediate value by having your device records in the cloud and being able to take actions on these devices from the cloud-based console." Capabilities include:
- Device records visible in Intune admin center
- Remote actions from Intune portal (run scripts, install applications, CMPivot, timeline, software updates, BitLocker recovery keys)
- Endpoint security reports (Defender Antivirus status, detected malware)
- **NO workload switching** — ConfigMgr manages all workloads

**Full Co-Management:** Adds workload slider control on top of tenant attach capabilities — specific workloads can be moved from ConfigMgr to Intune management individually or in groups.

**Key SC#3 anchor:** "workload sliders active" is the distinguishing characteristic. The comparison table in `01-windows-tenant-attach.md` must explicitly anchor the "no workload switching" row.

### Cross-Link Targets for D-08 Platform Analog Content (ALL VERIFIED)

[VERIFIED: bash ls against actual file system]

| Platform | Cross-link Target | Status |
|----------|-------------------|--------|
| macOS | `../../admin-setup-macos/02-enrollment-profile.md` | EXISTS (not `02-enrollment-profiles.md` — no trailing `s`) |
| iOS (enrollment overview) | `../../admin-setup-ios/00-overview.md` | EXISTS |
| iOS (MAM content) | `../../admin-setup-ios/09-mam-app-protection.md` | EXISTS — CORRECTION from CONTEXT.md D-08 which listed `04-byod-mam-overview.md` (file does NOT exist) |
| Android | `../../admin-setup-android/00-overview.md` | EXISTS |

**ACTION REQUIRED for planner:** All three plans that include cross-platform blockquotes (53-01, 53-02, 53-03) must use `09-mam-app-protection.md` not `04-byod-mam-overview.md`. Plans must explicitly specify the corrected path.

---

## Research Area 4: v1.2 Windows Migration Cross-Link Targets

### Verified Forward-Link Targets for COMG-02 / V-53-23

[VERIFIED: bash ls + grep against actual files]

| File | Exists | Key H2 Anchors |
|------|--------|----------------|
| `docs/reference/imaging-to-autopilot.md` | YES | `## Migration Paths`, `## Migration Prerequisites`, `## Autopilot for Existing Devices (SCCM Path)`, `## See Also` |
| `docs/device-operations/04-tenant-migration.md` | YES | `## Method 1: Online Migration`, `## Method 2: Offline Migration`, `## Prerequisites`, `## See Also` |
| `docs/reference/gpo-to-intune.md` | EXISTS (in reference dir) | (not verified — optional forward-link) |

V-53-23 requires `02-windows-workload-sliders.md` to contain a cross-link to `imaging-to-autopilot.md` OR `device-operations/04-tenant-migration.md`. Both files exist. The planner should specify both links (REQ COMG-02 verbatim mentions both).

**Relative paths from `docs/operations/co-management/02-windows-workload-sliders.md`:**
- To imaging-to-autopilot: `../../reference/imaging-to-autopilot.md`
- To tenant-migration: `../../device-operations/04-tenant-migration.md`
- To gpo-to-intune: `../../reference/gpo-to-intune.md`

---

## Research Area 5: Validator V-53-NN Pattern Specification

### Check-phase-53.mjs Blueprint (from CONTEXT.md D-10)

The 26-check validator maps to these implementation patterns, all derived from `check-phase-52.mjs`:

```javascript
// FILE CONSTANTS (pinned per D-13)
const OV  = "docs/operations/co-management/00-overview.md";
const TA  = "docs/operations/co-management/01-windows-tenant-attach.md";
const WS  = "docs/operations/co-management/02-windows-workload-sliders.md";
const MP  = "docs/operations/co-management/03-cocmgmt-migration-paths.md";
const IDX = "docs/operations/00-index.md";
const VAL = "scripts/validation/check-phase-53.mjs";
const CO_MGMT_FILES = [OV, TA, WS, MP]; // files checked for NEGATIVE assertions

// V-53-01..06: File existence + frontmatter (6 files: 4 content + index + validator)
// V-53-07: 7-workload literal tokens in OV
// V-53-08: ## Three Workload Slider States H2 + 3 state tokens adjacent
// V-53-09: POSITIVE — collection-scoped near Pilot Intune in OV
// V-53-10: NEGATIVE — ban partially/fully migrated variants from CO_MGMT_FILES
//   SCOPE RESTRICTION: only scan docs/operations/co-management/ files (not PITFALLS)
// V-53-11: comparison table with | Capability | Tenant Attach | Full Co-Management | in TA
// V-53-12: "no workload switching" AND "workload sliders" in TA
// V-53-13: workload sequence table with "Validate Before Moving Slider" column in WS (≥6 rows)
// V-53-14: migration order position check — Compliance before EP before Device Config before Apps
// V-53-15: EP HIGH-RISK Layer 1 — HIGH-RISK token in workload table row 4
// V-53-16: EP HIGH-RISK Layer 2 — blockquote with verbatim Defender mandate
// V-53-17: EP HIGH-RISK Layer 3 — ≥2 inline [HIGH-RISK tokens in WS
// V-53-18: > **Platform applicability:** in first 50 lines of OV + TA + WS
// V-53-19: cross-platform analog tokens in blockquotes (Jamf + ABM MDM transfer + MAM + Device Administrator)
// V-53-20: Autopatch + Device Configuration + Office Click-to-Run + prerequisite in MP
// V-53-21: NEGATIVE — NO > **Platform applicability:** in MP
// V-53-22: ## Co-Management H2 in IDX + NEGATIVE ban on Phase 54/55/56 H2s and TBD text
// V-53-23: forward-link to imaging-to-autopilot.md or 04-tenant-migration.md in WS
// V-53-24: cross-link from OV to 03-cocmgmt-migration-paths.md (Autopatch prereqs surface)
// V-53-25: TBD/TODO/FIXME/PLACEHOLDER scan across all 5 content files
// V-53-26: "deprecated" near "Resource Access" token (≤10-line window) + CB 2203 or CB 2403 in OV + WS
```

### Novel V-53-22 Assertion Shape

V-53-22 is novel for v1.5 because `docs/operations/00-index.md` is a BRAND-NEW file (not an append to an existing file). The assertion must be:

1. POSITIVE: literal `## Co-Management` H2 exists (confirms co-management section ships)
2. NEGATIVE: NO `## Patch Management`, `## App Lifecycle`, `## Drift`, `## Tenant Migration`, `TBD`, `Coming in Phase`, `Phase 54`, `Phase 55`, `Phase 56` at H2 position or anywhere in file (regression-guard against D-02 1B-2/1B-3 scaffold patterns)

Implementation pattern (from V-52-19 adapted):
```javascript
// POSITIVE: H2 exists
if (!/^## Co-Management\s*$/m.test(idx)) return { pass: false, detail: "## Co-Management H2 missing from 00-index.md" };
// NEGATIVE: no future-phase H2s or scaffold text
const banPatterns = [/^## Patch Management/m, /^## App Lifecycle/m, /^## Drift/m, /Phase 5[4-6]/m, /TBD/m, /Coming in Phase/m];
for (const p of banPatterns) {
  if (p.test(idx)) return { pass: false, detail: "Scaffold/future-phase content found in 00-index.md: " + p };
}
```

---

## Research Area 6: Phase 53 Environment and File State

### Pre-existing File State (Phase 52 deliverables confirmed complete)

Phase 52 shipped (confirmed from STATE.md and git log showing commit `087d65c`):
- All Phase 51 + 52 Linux deliverables exist
- `scripts/validation/check-phase-52.mjs` EXISTS (template for check-phase-53.mjs)
- `scripts/validation/v1.5-milestone-audit.mjs` EXISTS (will validate Phase 53 C1-C12)
- `docs/operations/` directory does NOT exist yet (Phase 53 creates it)

### Operations Directory Creation

`docs/operations/` is a NEW directory. `docs/operations/co-management/` is also NEW. The validator V-53-01..05 file existence checks will confirm creation. Plan tasks must explicitly create both directories (git will create them implicitly when files are added, but the planner should note this).

---

## Common Pitfalls

### Pitfall 1: Two-Workload Autopatch Prereq (ACTIVE RISK — VERIFIED)
**What goes wrong:** Documents only "Device Configuration AND Office Click-to-Run" as Autopatch prerequisites (matching REQUIREMENTS COMG-05 wording), omitting Windows Update policies.
**Why it happens:** REQUIREMENTS.md COMG-05 text is incomplete vs. actual Microsoft Learn Autopatch prerequisites page.
**How to avoid:** `03-cocmgmt-migration-paths.md` must document all three workloads: Windows Update policies, Device configuration, AND Office Click-to-Run apps. V-53-20 asserts the two explicitly named in COMG-05 (Device Configuration + Office Click-to-Run) so the validator will still pass; but the doc must include WU policies too.
**Warning signs:** Autopatch prereqs section mentions only 2 workloads; WU policies workload row in `02-windows-workload-sliders.md` omits the Autopatch cross-reference note.

### Pitfall 2: Wrong iOS Cross-Link Path (ACTIVE RISK — VERIFIED)
**What goes wrong:** Plans use `docs/admin-setup-ios/04-byod-mam-overview.md` (from CONTEXT.md D-08 text) which does NOT exist.
**Why it happens:** CONTEXT.md D-08 was written with a path that does not match the actual file system.
**How to avoid:** Use `docs/admin-setup-ios/09-mam-app-protection.md` for MAM content, or `docs/admin-setup-ios/00-overview.md` for enrollment overview. Both verified as existing.
**Warning signs:** During pre-commit markdown-link-check, broken link to `04-byod-mam-overview.md` is flagged.

### Pitfall 3: macOS File Name Typo (LOW RISK)
**What goes wrong:** Using `02-enrollment-profiles.md` (plural) instead of `02-enrollment-profile.md` (singular).
**Why it happens:** CONTEXT.md D-08 uses `02-enrollment-profiles.md` but actual file is `02-enrollment-profile.md`.
**How to avoid:** Verified actual filename is `02-enrollment-profile.md`. Plan task descriptions must specify singular form.
**Warning signs:** markdown-link-check flags broken macOS cross-link.

### Pitfall 4: PITFALL-8 Regression (Co-Management Slider Ambiguity)
**What goes wrong:** Pilot Intune described as "partial migration" or "intermediate state" without explaining collection-scoping.
**Why it happens:** Colloquial phrasing that fails to explain per-collection management.
**How to avoid:** V-53-09 positive assertion + V-53-10 negative assertion provide double protection. Author must use "collection-scoped" literal token and avoid "partially migrated" / "fully migrated" phrasings.

### Pitfall 5: Scaffold in ops/00-index.md
**What goes wrong:** Adding `## Patch Management` or similar Phase 54/55/56 placeholder H2s to ops/00-index.md.
**Why it happens:** D-02 1B-2/1B-3 patterns rejected in adversarial review; ROADMAP line 448 "Phase 53 creates; Phases 54-56 cross-reference only."
**How to avoid:** V-53-22 NEGATIVE regression-guard enforces at validation time. Plan task 53-05 must explicitly scope to co-management H2 only.

### Pitfall 6: Cross-Platform Blockquote in 03
**What goes wrong:** Adding `> **Platform applicability:**` blockquote to `03-cocmgmt-migration-paths.md`.
**Why it happens:** D-08 applies to 00/01/02 but not 03; author may forget the distinction.
**How to avoid:** V-53-21 NEGATIVE regression-guard in validator. Plan task 53-04 must explicitly state "NO cross-platform blockquote."

### Pitfall 7: Two-Commit Split
**What goes wrong:** Committing content files separately from the validator.
**Why it happens:** Default multi-step workflow instinct.
**How to avoid:** D-14 + CDI-Phase53-04 require single atomic commit. V-53-22 append-only-style assertion forces it (index file must exist when validator runs). Plan must specify single-commit constraint.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| 8 co-management workloads | 7 workloads (Resource Access deprecated) | CB 2203 (deprecated) / CB 2403 (mandated to Intune) | Resource Access row in table = deprecated status |
| "SCCM" / "System Center Configuration Manager" naming | "ConfigMgr" / "Configuration Manager" | Rebranded; CB is now called "Configuration Manager current branch" | Use "ConfigMgr" in docs; avoid "SCCM" per PITFALL-9 adjacent guidance |
| Autopatch required 2 workloads (WU + Device Config) | Autopatch requires 3 workloads (WU + Device Config + Office C2R) | Verified on 2026-02-26 Autopatch prereqs page | 03-cocmgmt-migration-paths.md must list all 3 |
| Tenant attach = standalone feature | Tenant attach is one of 3 "cloud attach" features (tenant attach + endpoint analytics + co-management) | Cloud attach overview rebranding | Disambiguation table should acknowledge the cloud-attach umbrella |

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The exact workload token names in REQUIREMENTS.md COMG-01 (`Compliance Policies`, `Windows Update Policies`, etc.) match what the validator should pin — minor capitalization differences from Microsoft Learn (which uses lowercase "policies") exist | Research Area 1 | V-53-07 would pass even if doc uses Microsoft Learn casing; low risk since validator uses REQUIREMENTS verbatim tokens |
| A2 | `docs/operations/` directory does not yet exist — Phase 53 creates it | Research Area 6 | If directory exists with other content, plans must account for it; low risk given STATE.md confirms no ops phases have shipped |
| A3 | CD-07 forward-reference to Phase 54 content in `03-cocmgmt-migration-paths.md` is acceptable per Phase 30 D-22 placeholder retrofit precedent | Standard Stack | If Phase 54 ships different file names/anchors, forward-promise text needs updating; low risk |

**All critical claims verified or cited. Only minor capitalization + file-existence details assumed.**

---

## Open Questions

1. **COMG-05 three-workload discrepancy with REQUIREMENTS.md**
   - What we know: Microsoft Learn Autopatch prerequisites page (verified 2026-02-26) specifies three workloads (WU + Device Config + Office C2R). REQUIREMENTS.md COMG-05 mentions only two (Device Config + Office C2R).
   - What's unclear: Whether the planner should formally note this discrepancy in the plan or treat it as a documentation content decision.
   - Recommendation: Plan task 53-04 description should explicitly note "three workloads per verified Microsoft Learn source (Research Area 2)" and proceed with documenting all three. V-53-20 validator check already covers the two REQUIREMENTS-named tokens; adding WU policies to the doc content is additive and does not break any validator assertion.

2. **iOS cross-link path correction propagation**
   - What we know: CONTEXT.md D-08 references a non-existent file (`04-byod-mam-overview.md`).
   - What's unclear: Whether the planner should formally call out the CONTEXT.md discrepancy vs. silently correcting it in task descriptions.
   - Recommendation: Plan task descriptions for 53-01, 53-02, 53-03 must specify the corrected path `09-mam-app-protection.md`. Note the correction in the plan header as a research-derived correction.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|---------|
| Node.js | `check-phase-53.mjs` validator | Confirmed (Phase 52 validator ran successfully) | 18+ | — |
| `docs/reference/imaging-to-autopilot.md` | V-53-23 forward-link | Confirmed (verified in file system) | — | — |
| `docs/device-operations/04-tenant-migration.md` | V-53-23 forward-link | Confirmed (verified in file system) | — | — |
| `docs/admin-setup-ios/09-mam-app-protection.md` | D-08 iOS cross-link | Confirmed (verified in file system) | — | `00-overview.md` as fallback |
| `docs/admin-setup-macos/02-enrollment-profile.md` | D-08 macOS cross-link | Confirmed (verified in file system) | — | — |
| `docs/admin-setup-android/00-overview.md` | D-08 Android cross-link | Confirmed (verified in file system) | — | — |
| `scripts/validation/check-phase-52.mjs` | Validator template | Confirmed (17 checks verified; listed in ls output) | — | check-phase-51.mjs as secondary |
| `scripts/validation/v1.5-milestone-audit.mjs` | Pre-commit gate (C1-C12) | Confirmed | — | — |

**No missing dependencies. All cross-link targets verified.**

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js ESM `.mjs` — file-reads-only, no npm dependencies |
| Config file | None — standalone script using `process.cwd()` |
| Quick run command | `node scripts/validation/check-phase-53.mjs` |
| Full suite command | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | V-NN Checks |
|--------|----------|-----------|-------------------|-------------|
| COMG-01 | 7 workloads + 3 slider states + Pilot Intune disambiguation + Resource Access deprecated | structural | `node scripts/validation/check-phase-53.mjs` | V-53-07, V-53-08, V-53-09, V-53-10, V-53-26 |
| COMG-02 | Low-risk-first workload sequence + EP HIGH-RISK + forward-links + pilot guidance | structural | `node scripts/validation/check-phase-53.mjs` | V-53-13, V-53-14, V-53-15, V-53-16, V-53-17, V-53-23 |
| COMG-03 | Tenant attach vs co-management disambiguation table | structural | `node scripts/validation/check-phase-53.mjs` | V-53-11, V-53-12 |
| COMG-04 | Cross-platform inline blockquotes in 00/01/02 with analog migration content | structural | `node scripts/validation/check-phase-53.mjs` | V-53-18, V-53-19 |
| COMG-05 | Autopatch prereqs (Device Config + Office C2R + implicitly WU) in 03 | structural | `node scripts/validation/check-phase-53.mjs` | V-53-20, V-53-24 |
| AUDIT-06 | Validator as deliverable | structural | `node scripts/validation/check-phase-53.mjs` | V-53-03 (self-referential) |
| (all) | No TBD/TODO/scaffold text in shipped files | structural | `node scripts/validation/check-phase-53.mjs` | V-53-25, V-53-22 |
| (all) | Correct frontmatter on all 5 files | structural | `node scripts/validation/check-phase-53.mjs` | V-53-06 |

### Sampling Rate

- **Per task authoring:** `node scripts/validation/check-phase-53.mjs` (will fail until all files exist — run after 53-06 validator is authored)
- **Pre-commit gate:** `node scripts/validation/check-phase-53.mjs` exits 0 + `node scripts/validation/v1.5-milestone-audit.mjs --verbose` exits 0 + `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0
- **Phase gate:** Full suite green before VERIFICATION.md + before downstream phases consume ops/00-index.md

### Wave 0 Gaps

- [ ] `docs/operations/` directory — does not exist; created when first file is written
- [ ] `docs/operations/co-management/` directory — does not exist; created when first file is written
- [ ] `scripts/validation/check-phase-53.mjs` — 26 V-53-NN checks per CONTEXT.md D-10 blueprint

*(No existing test infrastructure covers Phase 53 requirements — all 6 deliverables are net-new)*

---

## Security Domain

The `security_enforcement` key is absent from `.planning/config.json` (treated as enabled), but Phase 53 is a documentation-only phase (markdown + Node.js read-only validator). No authentication, session management, cryptography, or user input processing is introduced. The ASVS categories do not apply to documentation authoring phases.

**Applicable security consideration:** The validator `check-phase-53.mjs` is file-reads-only (`fs.readFileSync` + `existsSync` only) — no network I/O, no shell execution, no external dependencies. No security surface added.

---

## Sources

### Primary (HIGH confidence)

- [VERIFIED: learn.microsoft.com/en-us/intune/configmgr/comanage/workloads, updated 2025-05-12] — 7 workload exact names, Resource Access deprecation (CB 2203/CB 2403), Device Config implicit-switching, Autopatch workload notes
- [VERIFIED: learn.microsoft.com/en-us/intune/configmgr/comanage/how-to-switch-workloads, updated 2026-01-29] — Three slider state definitions (ConfigMgr / Pilot Intune / Intune); Pilot Intune collection-scoping; Pilot Intune EP/Device-Config policy-removal behavioral note
- [VERIFIED: learn.microsoft.com/en-us/intune/configmgr/cloud-attach/overview, updated 2026-04-16] — Tenant attach vs co-management distinction; tenant attach capabilities (device sync + remote actions + endpoint security reports; no workload switching)
- [VERIFIED: learn.microsoft.com/en-us/windows/deployment/windows-autopatch/prepare/windows-autopatch-prerequisites, updated 2026-02-26] — THREE co-management workload prereqs for Autopatch (WU + Device Config + Office C2R); Pilot Intune acceptable; collection membership requirement
- [VERIFIED: bash file system] — All cross-link target files confirmed (imaging-to-autopilot.md, 04-tenant-migration.md, admin-setup-macos/02-enrollment-profile.md, admin-setup-ios/09-mam-app-protection.md, admin-setup-android/00-overview.md)
- [CITED: .planning/phases/52-linux-l2-investigation-runbooks-24-25/52-CONTEXT.md D-01 + DPO-Phase52-07] — Three-layer callout pattern cross-domain transfer endorsement; validator file-reads-only pattern
- [CITED: .planning/research/PITFALLS.md lines 173-187] — PITFALL-8 co-management slider ambiguity; Endpoint Protection HIGH-RISK mandate verbatim text

### Secondary (MEDIUM confidence)

- [CITED: .planning/research/SUMMARY.md lines 32-35, 78, 93-94, 175-185, 257-269, 295] — ConfigMgr CB 2503 facts; Phase 53 deliverables specification; confidence assessment (HIGH for ConfigMgr CB 2503 + workloads per Microsoft Learn updated 2026-04-15)
- [CITED: .planning/phases/53-co-management-operational-docs/53-CONTEXT.md] — All 15 locked decisions + 7 DPOs + 7 CDIs; validator V-53-01..26 full specification

---

## Metadata

**Confidence breakdown:**
- Standard stack (validator pattern): HIGH — direct inheritance from check-phase-52.mjs (file read + reviewed)
- Co-management workload facts: HIGH — verified Microsoft Learn (updated 2025-05-12 + 2026-01-29)
- Autopatch prerequisites: HIGH — verified Microsoft Learn (updated 2026-02-26); discrepancy with REQUIREMENTS documented
- Tenant attach distinction: HIGH — verified Microsoft Learn (updated 2026-04-16)
- Cross-link target file existence: HIGH — verified bash ls on actual file system
- Architecture patterns: HIGH — derived from CONTEXT.md locked decisions (adversarial-review-validated)

**Research date:** 2026-04-28
**Valid until:** 2026-05-28 (30 days — Microsoft Learn co-management docs update frequently; Autopatch prereqs page may change if new workloads are added)
