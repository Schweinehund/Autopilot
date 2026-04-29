# Phase 56: Drift Detection + Tenant Migration — Research

**Researched:** 2026-04-29
**Domain:** Cross-platform configuration drift detection (Windows/macOS/iOS/Android) + tenant-to-tenant migration runbooks (4 platforms + cross-platform encryption-drift fold)
**Confidence:** MIXED — HIGH for DRIFT-01/02/03 surfaces (Intune Remediations + cross-platform signals); MEDIUM throughout for DRIFT-04/05/06/07 (tenant migration; no single Microsoft Learn SSoT; multiple community-validated patterns)

---

## Summary

Phase 56 ships a 5-file ops-domain suite under `docs/operations/drift-migration/` plus a `check-phase-56.mjs` validator (28-32 V-56-NN structural assertions). The phase covers two distinct surfaces folded into a single suite: (1) **drift detection** (DRIFT-01/02/03) with HIGH-confidence Intune Remediations (Proactive Remediations) tooling for Windows + cross-platform compliance signal mapping; (2) **tenant-to-tenant migration** (DRIFT-04/05/06/07) with MEDIUM-confidence runbook covering Windows BitLocker re-key (3 enumerated approaches), macOS/iOS ABM token re-issue, Android MGP re-binding, and a cross-platform encryption-drift fold (BitLocker + FileVault + iOS device-level + Android dm-crypt variance).

All key plan-time research questions resolved with current 2026 sources. Microsoft Graph `exportJobs` pattern verified at `POST /beta/deviceManagement/reports/exportJobs` and v1.0 endpoint also available; report names confirmed (`DeviceNonCompliance`, `NonCompliantDevicesAndSettings`, plus v1.0-stable variants). Intune Remediations portal path verified at `Devices > Manage devices > Scripts and remediations` (also surfaced in single-device view as of February 2026). Quest On Demand Migration confirmed as the canonical third-party tool (current product name — "ODMAD" PDF artifacts prove product currency). The BitLocker scheduled-task escrow pattern is the canonical PowerShell approach, used by Quest's own implementation. Apple OS 26 introduces new ABM-driven cross-MDM migration APIs that materially change the macOS/iOS migration surface — but this requires devices on iOS 26 / iPadOS 26 / macOS 26 (NOT a baseline assumption), so the legacy "release → re-assign + wipe + re-enroll" pattern remains the canonical fallback for Phase 56.

**Primary recommendation:** Author `04-tenant-migration-runbook.md` as the primary risk surface — its MEDIUM-confidence dual-surface framing (frontmatter + inline blockquote at TOP), the BitLocker 3-option enumeration with data-risk callout on option (b), and the Apple OS 26 fork-in-the-road ("legacy path documented; new ABM API path mentioned with version-gate") are the three highest-leverage authoring decisions. Slot-02 / slot-03 should ship as routing-only stubs (paralleling Phase 55 4C-prime hybrid) — there is genuinely no native Intune Remediations equivalent on macOS/iOS/Android, so substantive content cannot be authored without scope-creep. The validator should be authored last and mirror `check-phase-55.mjs` line-for-line; pattern lineage is well-established.

---

## User Constraints (from CONTEXT.md)

### Locked Decisions

**File shape (D-01..D-03):** 5-file suite at `docs/operations/drift-migration/`:
- `00-overview.md` (DRIFT-03 PRIMARY; cross-platform signals; `platform: cross-platform`)
- `01-windows-drift-detection.md` (DRIFT-01 + DRIFT-02 fold; `platform: Windows`)
- `02-macos-drift-detection.md` (no specific REQ — slot reserved per SUMMARY 5-file mandate; plan-author discretion stub-vs-substantive; `platform: macOS`)
- `03-ios-android-drift-detection.md` (no specific REQ — slot reserved; plan-author discretion; `platform: iOS,Android`)
- `04-tenant-migration-runbook.md` (DRIFT-04 + DRIFT-05 + DRIFT-06 + DRIFT-07 ALL FOLDED; `platform: cross-platform` + `confidence: MEDIUM`)

**Tenant migration runbook (D-04..D-08):** SINGLE file with 4 platform H2 sections + cross-platform encryption-drift fold ALL INSIDE (NOT split into separate files). H2 order locked: `## Windows tenant migration` → `## macOS / iOS tenant migration` → `## Android tenant migration` → `## Cross-platform encryption drift`. NO sibling `05-cross-platform-encryption-drift.md` may exist (V-56-30 enforces).

**v1.2 doc relationship (D-09..D-10):** Phase 56 cross-references `docs/reference/drift-detection.md` (registration drift) AND `docs/device-operations/04-tenant-migration.md` (Windows tenant migration with hardware-hash deregistration) WITHOUT modifying them. Scope distinction documented in cross-link prose ("registration drift" vs "configuration drift"). No `last_verified` bump on v1.2 docs.

**MEDIUM-confidence dual-surface (D-11..D-13, D-16..D-17):** `04-tenant-migration-runbook.md` carries:
- Frontmatter `confidence: MEDIUM`
- Inline `> ⚠️ MEDIUM confidence — tenant migration is not a formally supported Intune scenario...` blockquote at TOP (after `> **Platform applicability:**` blockquote)
- BitLocker 3-option enumeration NEUTRAL (no Microsoft preference injected)
- Option (b) decrypt → re-encrypt carries dedicated `> ⚠️ Data-risk window` callout
- Quest On Demand Migration mentioned ONCE only (no inline `> 📋` per-tool callout — that's APP-05 community-pattern shape, scope-creep here)

**Cross-platform routing (D-14..D-15):** Each of 5 files carries `> **Platform applicability:**` blockquote at line ~9 (post-frontmatter); bare `> **Platform:**` is FORBIDDEN (V-56-28 NEGATIVE regression-guard). Full 4-platform comparison + `## Drift terminology` concept H2 live ONLY in 00-overview.

**Validator (D-18..D-21):** `check-phase-56.mjs` ships as FULL-scope validator (28-32 V-56-NN assertions), file-reads-only / regex-based / no-shared-module pattern matching `check-phase-55.mjs` line-for-line. All H2/anchor strings + literal-token regexes pinned in BOTH validator and CONTEXT.md.

**Commit atomicity (D-22..D-23):** SINGLE atomic commit covering 5 content files + validator. VERIFICATION.md authored in separate commit (close pattern). 7 plans (matching Phase 55 plan count): 56-01 through 56-07.

### Claude's Discretion

- Slot-02 / slot-03 stub-vs-substantive shape — routing-only stub paralleling Phase 55 4C-prime hybrid is acceptable if substantive content thin
- Exact column choice for cross-platform drift-signal comparison table at 00-overview (4 vs 6 vs 8 rows)
- BitLocker re-key option ordering (a/b/c — REQ-neutral, plan-author choice for prose flow)
- Whether `## macOS / iOS tenant migration` is one combined H2 (D-04 default) or two separate `## macOS tenant migration` + `## iOS tenant migration` H2s — plan-author discretion if file-size reduction warrants split (V-56-NN regex must accommodate either)
- Microsoft Graph `exportJobs` pattern + key report names (per SUMMARY line 53) — plan-author may include in `01-windows-drift-detection.md` or 00-overview as L2-facing depth callout

### Deferred Ideas (OUT OF SCOPE)

- Microsoft Graph SDK / Power BI integration deep-dive (surface-level mention OK; full integration is plan-time L2-facing depth decision)
- Quest On Demand Migration full tutorial / step-by-step (third-party scope-creep)
- macOS-specific drift detection alternatives to Intune Remediations (DEPP / Munki / Jamf-style; not v1.5 scope)
- Linux drift detection (Phase 56 Linux exclusion)
- Pre-existing v1.2 doc deprecation lifecycle (Phase 60/61)
- `last_verified` retroactive freshness normalization for v1.0–v1.4.1 docs (Phase 48 first-pass + Phase 60-61 second-pass)
- iOS jailbreak detection signal authoring deeper than overview-cell prose (out of Phase 56; v1.3 iOS L1/L2 + Phase 54 Play Integrity own this)
- Tenant-to-tenant device-license re-assignment mechanics (REQUIREMENTS.md line 115 — procurement/licensing operation)
- Quest alternative third-party tools enumeration (scope-creep per F-4C-01)

---

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| DRIFT-01 | Windows Intune Remediations (Proactive Remediations) detect+remediate scripts; portal path; status reports | §3 (Intune Remediations canonical pattern); §6 (validator regex hints V-56-12, V-56-13) |
| DRIFT-02 | Canonical Intune Remediations script-authoring pattern; exit codes; Log Analytics surface | §3 (script-authoring pattern with verified exit-code semantics + Log Analytics integration); §6 (V-56-14) |
| DRIFT-03 | Cross-platform compliance drift signals (Windows policy conflict + app install regression / macOS profile revocation / iOS jailbreak + OS downgrade / Android Play Integrity verdict) | §1 (Microsoft Graph drift-detection + Intune compliance signals); §5 (cross-platform compliance drift signals matrix); §6 (V-56-15) |
| DRIFT-04 | Windows tenant migration: BitLocker re-key (3 approaches) + Autopilot deregistration + post-migration escrow validation | §2.1 (Windows tenant migration mechanics); §6 (V-56-16, V-56-17); §7 (research flags) |
| DRIFT-05 | macOS/iOS tenant migration: ABM token re-issue + ADE Await-Configuration | §2.2 (macOS/iOS tenant migration mechanics); §6 (V-56-18, V-56-19); §7 (Apple OS 26 inflection point flag) |
| DRIFT-06 | Android tenant migration: MGP re-binding + ZT portal re-upload + per-ownership-mode re-provisioning | §2.3 (Android tenant migration mechanics); §6 (V-56-20, V-56-21) |
| DRIFT-07 | Cross-platform encryption-drift fold: BitLocker + FileVault + iOS device-level + Android dm-crypt variance | §3 (cross-platform encryption-drift architecture); §6 (V-56-22, V-56-23) |

---

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` governs the codebase but not this documentation phase. Phase 56 ships docs + a Node validator only — no PowerShell modules, FastAPI endpoints, or React components. Three CLAUDE.md directives are nonetheless relevant:

1. **Validator (Node) coding posture** — the validator should match `scripts/validation/check-phase-NN.mjs` lineage: `import` ESM, `node:` prefixed builtins, no third-party deps, file-reads-only, no shell. CLAUDE.md does not gate this directly but the v1.5 audit-harness lineage does.
2. **Security note ("Never commit credentials")** — applies if any tenant-migration runbook prose ends up demonstrating PowerShell snippets that pull tokens. Recommend keeping all PowerShell snippets in plain-prose form ("acquire token via X") rather than executable script blocks.
3. **Markdown-only deliverables in this phase** — no PowerShell module exports, no API endpoints, no React components are added; all deliverables are markdown content + a single Node validator.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Intune Remediations script execution | Browser/Client (device endpoint) | API/Backend (Intune service orchestration) | Detection + remediation scripts run locally on the Windows device under SYSTEM context; Intune service polls + collects status reports |
| Cross-platform compliance signal interpretation | Browser/Client (device evaluates compliance) | API/Backend (Intune compliance engine + Conditional Access) | Each platform reports compliance signals from device → Intune; the OVERVIEW guide is admin-facing documentation with no runtime tier |
| Microsoft Graph `exportJobs` drift reports | API/Backend (Graph API consumer) | — | Admins call Graph API endpoints; results consumed via PowerShell / Power BI / direct CSV |
| BitLocker recovery key escrow | Browser/Client (device runs BackupToAAD-BitLockerKeyProtector) | API/Backend (Entra escrow service) | Escrow script runs on device under user/SYSTEM; key persisted to Entra ID for the joined tenant |
| ABM device assignment / release | API/Backend (Apple Business Manager web portal + APIs) | Browser/Client (device receives MDM check-in from new server) | All ABM operations are admin-portal-driven (web + new ABM APIs in OS 26); device side passive |
| Managed Google Play binding | API/Backend (Intune ↔ Google Cloud OAuth flow) | Browser/Client (Android device receives new MGP binding via re-enrollment) | MGP binding lives at tenant level; device side requires re-enrollment to pick up new binding (corporate-owned) or work profile re-creation (BYOD) |
| Zero-Touch enrollment portal cross-tenant transfer | API/Backend (zero-touch enrollment portal + Intune Connector) | Browser/Client (device fetches new DPC config at OOBE) | ZT portal is admin-driven; device receives new EMM DPC JSON config at first boot |
| Documentation surface | N/A | N/A | Markdown content + Node validator; no runtime tier |

---

## Standard Stack

### Core (Documentation Authoring)

| Library / Tool | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js | ≥18 (any modern LTS) | Validator runtime — `check-phase-56.mjs` | Phase 48-55 lineage; `node:` prefixed builtins; ESM; no shell |
| `node:fs` (`readFileSync`, `existsSync`, `readdirSync`) | builtin | File-reads-only validator pattern | Phase 48 D-25 file-reads-only contract; no third-party deps |
| Markdown / GFM | spec | Doc authoring + GFM anchor generation | All v1.x docs use GFM-flavored markdown |

### Supporting (Optional, plan-time discretion)

| Library / Tool | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Microsoft Graph PowerShell SDK | latest GA | Author L2-facing example for `exportJobs` if depth callout chosen | Only if 01-windows-drift-detection.md includes a Graph API export-job example; surface-level mention is sufficient per CONTEXT D-23 plan-author discretion |
| Microsoft Graph beta endpoint (`/beta/deviceManagement/reports/exportJobs`) | beta | Drift report data | If Graph drift-detection content shipped — note `/beta` vs `/v1.0` stability tradeoff |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Manual exit-code + stdout pattern | Intune-supported `Write-Output` of structured JSON | Microsoft Learn 2026 docs accept structured output for richer reporting, but exit-code semantics (`exit 1` / `exit 0`) remain the canonical primary contract per REQ DRIFT-02 — Phase 56 documents exit-code semantics first; structured output is plan-author optional addendum |
| Quest On Demand Migration (named in REQ) | Other third-party tools (e.g., BitTitan, Mover-style) | OUT OF SCOPE per CONTEXT D-13 (scope-creep). Quest mentioned ONCE; no enumeration of alternatives. |
| Apple OS 26 ABM-API migration path | Legacy "release → re-assign + wipe + re-enroll" path | Apple OS 26 path requires iOS 26 / iPadOS 26 / macOS 26; legacy path is the BASELINE for Phase 56. OS 26 may be mentioned with version gate but cannot be the documented primary path |

**Version verification (verified via WebSearch + Microsoft Learn 2026-04-29):**

- Quest On Demand Migration — current product name; PDF reference doc `79920_ODMAD_Intune_Autopilot_BitLocker_Cleanup_Quick_Start_Guide_en.pdf` confirms product currency [VERIFIED: Quest support portal 2026-04-29]
- Intune Remediations portal path `Devices > Manage devices > Scripts and remediations` — confirmed current 2026 [VERIFIED: Microsoft Learn `learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations`]
- Microsoft Graph `exportJobs` endpoint available at BOTH `/beta/deviceManagement/reports/exportJobs` and `/v1.0/deviceManagement/reports/exportJobs` [VERIFIED: Microsoft Graph docs-contrib repo 2026-04-29]
- Apple OS 26 cross-MDM migration APIs released — Apple announcement confirmed via Microsoft community blog [VERIFIED: techcommunity.microsoft.com 2026 Apple OS 26 ABM device migration]

---

## Architecture Patterns

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                  ADMIN (consumer of Phase 56 docs)                          │
└────────────────────────────────────┬────────────────────────────────────────┘
                                     │ reads
                                     ▼
                        ┌─────────────────────────┐
                        │  drift-migration/       │
                        │  00-overview.md         │  ← entry point
                        │  (cross-platform        │
                        │   compliance signals)   │
                        └─────────────┬───────────┘
                                      │ routes to
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
   ┌─────────────────┐    ┌──────────────────┐    ┌────────────────────┐
   │ 01-windows-     │    │ 02-macos- /      │    │ 04-tenant-         │
   │ drift-detection │    │ 03-ios-android-  │    │ migration-runbook  │
   │ (DRIFT-01+02    │    │ drift-detection  │    │ (DRIFT-04/05/06/07 │
   │  PRIMARY)       │    │ (no REQ; routing │    │  ALL FOLDED)       │
   └────────┬────────┘    │  stub or thin)   │    └─────────┬──────────┘
            │             └──────────────────┘              │
            │ cross-link                                    │ cross-link
            ▼                                               ▼
   ┌──────────────────────────┐                  ┌──────────────────────────┐
   │ docs/reference/          │                  │ docs/device-operations/  │
   │ drift-detection.md       │                  │ 04-tenant-migration.md   │
   │ (v1.2 SSoT —             │                  │ (v1.2 SSoT — Windows     │
   │  REGISTRATION drift)     │                  │  hardware-hash dereg)    │
   └──────────────────────────┘                  └──────────────────────────┘

                  ┌──────────────────────────────────────────────────────┐
                  │   PHASE BOUNDARY ENFORCEMENT (validator-driven)      │
                  │                                                      │
                  │   • V-56-11 NEGATIVE: 00-overview body has NO        │
                  │     per-platform substance literals (firewall)       │
                  │   • V-56-28 NEGATIVE: zero bare > **Platform:**      │
                  │     across docs/+ .planning/ (lexicon discipline)    │
                  │   • V-56-29 NEGATIVE: ops/00-index.md NOT amended    │
                  │     (Phase 59 owns hub integration)                  │
                  │   • V-56-30 NEGATIVE: no sibling 05-encryption-      │
                  │     drift.md file (DRIFT-07 fold per SC#5)           │
                  │   • V-56-31 POSITIVE: v1.2 docs exist at             │
                  │     file-system level (anti-deletion)                │
                  └──────────────────────────────────────────────────────┘
```

**Component responsibilities:**

| File / Component | Owns | Cross-references |
|---|---|---|
| `00-overview.md` | Cross-platform drift-signal comparison table; `## Drift terminology` concept H2; routing to 01-04 | Routes to 01/02/03/04 sibling files |
| `01-windows-drift-detection.md` | Intune Remediations portal path + status reports + canonical script-authoring pattern (DRIFT-02 fold) | Cross-links `docs/reference/drift-detection.md` (registration vs configuration scope distinction) |
| `02-macos-drift-detection.md` | Plan-author discretion: routing stub OR substantive macOS profile-revocation + DDM compliance drift | If substantive: cross-links to v1.2 macOS L2; if stub: routes to 00-overview cross-platform signals + Phase 54 SSoT |
| `03-ios-android-drift-detection.md` | Plan-author discretion: routing stub OR substantive iOS jailbreak / OS downgrade + Android Play Integrity verdict-change | Cross-links Phase 54 `04-android-patch-delivery.md` (Play Integrity SSoT) |
| `04-tenant-migration-runbook.md` | All 4 platform tenant migration H2s + DRIFT-07 cross-platform encryption-drift fold | Cross-links `docs/device-operations/04-tenant-migration.md` (Windows hardware-hash dereg SSoT) |
| `check-phase-56.mjs` | 28-32 V-56-NN structural assertions; file-reads-only regex-based parsing | None (self-contained validator per Phase 48 D-25 contract) |

### Recommended Project Structure

```
docs/
├── operations/
│   ├── 00-index.md                            # NOT amended by Phase 56 (Phase 59 owns)
│   ├── co-management/                         # Phase 53
│   ├── patch-management/                      # Phase 54
│   ├── app-lifecycle/                         # Phase 55
│   └── drift-migration/                       # Phase 56 (NEW directory)
│       ├── 00-overview.md
│       ├── 01-windows-drift-detection.md
│       ├── 02-macos-drift-detection.md
│       ├── 03-ios-android-drift-detection.md
│       └── 04-tenant-migration-runbook.md
├── reference/
│   └── drift-detection.md                     # PRE-EXISTING v1.2 — cross-link target only
└── device-operations/
    └── 04-tenant-migration.md                 # PRE-EXISTING v1.2 — cross-link target only

scripts/
└── validation/
    └── check-phase-56.mjs                     # Phase 56 validator
```

### Pattern 1: Cross-platform inline blockquote at TOP

**What:** Every per-platform / cross-platform file in this phase carries `> **Platform applicability:**` blockquote at line ~9 (post-frontmatter).
**When to use:** All 5 drift-migration content files.
**Example:**
```markdown
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: Windows
---

> **Platform applicability:** This guide is Windows-specific (Intune Remediations
> detect + remediate script pairs). For the cross-platform overview, see
> [Drift Detection Overview](00-overview.md). For tenant migration, see
> [Tenant Migration Runbook](04-tenant-migration-runbook.md).
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md).
> **iOS/Android:** See [iOS/Android Drift Detection](03-ios-android-drift-detection.md).
```
Source: `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md:9` (Phase 55 verified pattern) [VERIFIED: file-system precedent at 5 phases × 5 files = 25 occurrences across 53/54/55].

### Pattern 2: MEDIUM-confidence dual-surface (frontmatter + inline blockquote at TOP)

**What:** Files with MEDIUM-confidence content carry both frontmatter `confidence: MEDIUM` AND an inline `> ⚠️ MEDIUM confidence` blockquote at TOP (after the platform applicability blockquote).
**When to use:** ONLY `04-tenant-migration-runbook.md` in Phase 56. Other 4 files are HIGH confidence (Intune Remediations + cross-platform signals are well-documented at Microsoft Learn).
**Example:**
```markdown
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: cross-platform
confidence: MEDIUM
---

> **Platform applicability:** This runbook covers tenant-to-tenant migration across
> Windows + macOS + iOS + Android with a cross-platform encryption-drift section folded inside.

> ⚠️ **MEDIUM confidence — tenant migration is not a formally supported Intune scenario.**
> Microsoft does not provide automated tooling for tenant-to-tenant device migration.
> Test the process in a non-production environment before executing at scale.
```
Source: Phase 52 D-01 freshness-caveat dual-surface precedent + Phase 55 D-16 inline-blockquote precedent (DIFFERENT shape: Phase 55 uses `> 📋 Community pattern — MEDIUM confidence`; Phase 56 uses `> ⚠️ MEDIUM confidence` warning shape per CONTEXT D-11 token discipline).

### Pattern 3: BitLocker 3-option neutral enumeration with data-risk callout on option (b)

**What:** DRIFT-04 requires NEUTRAL enumeration (no Microsoft preference); option (b) decrypt → re-encrypt requires dedicated `> ⚠️ Data-risk window` callout adjacent to the enumeration anchor.
**When to use:** `## Windows tenant migration` H2 inside `04-tenant-migration-runbook.md`.
**Example:**
```markdown
## Windows tenant migration

After Autopilot deregistration in source and re-registration in target, the BitLocker
recovery key must be re-keyed to the target Entra tenant. Three approaches are available
(neutral enumeration; choose based on tenant-side data-risk tolerance, third-party
budget, and PowerShell scripting capacity):

(a) **Source-tenant escrow → target Entra via PowerShell scheduled task.** Run a
    PowerShell scheduled task post-migration that calls
    `BackupToAAD-BitLockerKeyProtector` to escrow the existing recovery key from the
    workstation to the target Microsoft Entra ID. This approach preserves device
    encryption continuity (no decrypt window) and is the pattern used by Quest On
    Demand Migration's BitlockerBackupToEntraID task. Prerequisites: device joined
    to target Entra tenant; user has logged on; new key protector created and escrow
    re-triggered (existing RecoveryPassword key protectors do NOT auto-escrow).

(b) **Decrypt source-tenant BitLocker → re-encrypt under target tenant.** Decrypt
    each device using `manage-bde -off` or GPO/MDM control, complete tenant
    migration, then re-encrypt and escrow the new recovery key to the target
    Entra ID.

> ⚠️ **Data-risk window:** Option (b) leaves devices unencrypted between decrypt and
> re-encrypt. The duration depends on disk size + tenant migration cadence. For
> regulated workloads or remote / unsupervised devices, prefer option (a) or (c).

(c) **Third-party tool (e.g., Quest On Demand Migration).** Quest On Demand
    Migration includes optional `BitlockerBackupToEntraID` tasks as part of the
    migration workflow — the tool installs a PowerShell script + scheduled task on
    the workstation that escrows the recovery key to the target Entra ID
    post-migration login.
```
Source: §6 (V-56-16 + V-56-17 validator regex hints below); Microsoft Tech Community guidance on BitLocker recovery-key migration; Quest On Demand Migration BitLocker-cleanup quick-start guide.

### Anti-Patterns to Avoid

- **Recommending one BitLocker approach over the others** — REQ DRIFT-04 is NEUTRAL on preference. Microsoft does not officially endorse any tenant-migration BitLocker pattern. Phase 56 must enumerate all three approaches without endorsement.
- **Treating Apple OS 26 ABM device migration as the BASELINE path** — OS 26 path requires iOS 26 / iPadOS 26 / macOS 26 (devices on older OS versions cannot use it). Phase 56 documents the legacy path as primary; OS 26 path is mentioned with explicit version gate.
- **Documenting drift detection without acknowledging Linux exclusion** — Phase 56 covers 4 platforms only (Windows + macOS + iOS + Android). Linux is NOT in scope per CONTEXT D-01.
- **Authoring substantive macOS-specific drift detection content beyond what v1.2 macOS L2 already covers** — there is genuinely no native Intune Remediations equivalent on macOS (despite "Bash/PowerShell" REQ phrasing implying both). Slot-02 should remain a routing stub OR thin operational summary unless plan-author finds substantive Intune Settings Catalog drift signals to document.
- **Linking to `docs/operations/00-index.md` as something amended** — Phase 56 cross-references operations/00-index.md FROM the new files but does NOT amend it. Phase 59 owns hub integration in its own commit.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| BitLocker recovery key escrow PowerShell script for tenant migration | Custom escrow script from scratch | Reference Microsoft's `BackupToAAD-BitLockerKeyProtector` cmdlet pattern OR Quest's existing tooling | Microsoft cmdlet handles edge cases (multiple key protectors, removable storage exclusions, error 0x801C0450); custom scripts miss the "must create new key protector and re-trigger encryption" prerequisite |
| Cross-tenant ABM device transfer automation | Custom Apple Business Manager API wrapper | Apple's new ABM device-migration APIs (introduced with OS 26) for device fleets on OS 26+; legacy ABM admin portal flow for older devices | Apple's APIs are the supported path. For older devices, the manual release→reassign→wipe→re-enroll flow is the only supported Apple-blessed path — DO NOT hand-roll automation around it |
| Managed Google Play tenant rebinding orchestration | Custom OAuth flow against Google Cloud | Use Intune's built-in MGP disconnect/reconnect flow in admin center | The MGP binding lives at the Intune tenant level; Microsoft's own admin-center flow handles the OAuth + Google Cloud project linkage. Custom automation will break on Google's TOS for managed Google account linking |
| Drift-detection report exporter for Graph API | Custom CSV/JSON export pipeline | Microsoft Graph `exportJobs` endpoint with `reportName` parameter (`DeviceNonCompliance`, `NonCompliantDevicesAndSettings`, etc.) | Graph already provides export-jobs with rate-limit + status-tracking semantics; custom pipelines re-implement throttling + zip-file polling |
| Compliance-drift signal custom dashboards | Per-platform custom telemetry collector | Intune compliance policy reports + Endpoint Analytics for Windows; Play Integrity verdicts via Intune for Android; Apple Software Update compliance for iOS/macOS DDM | Each platform has a Microsoft-supported drift signal surface; replicating these surfaces is unsupported and stale-data-prone |
| Detect+remediate script authoring framework | Custom test harness | Just write the two scripts as plain PowerShell/Bash with `exit 1`/`exit 0` semantics; Intune's per-device status report (`No issues detected` / `Issues fixed` / `Error`) is the canonical UX | Intune Remediations is intentionally minimalist; over-engineering the script structure obscures the simple exit-code contract that admins need to understand |

**Key insight:** Phase 56 documents Microsoft-supported flows + Apple/Google's own admin portals. Tenant migration is genuinely a "no first-party tool" gap, but the 3 BitLocker approaches all leverage existing primitives (PowerShell cmdlet + Entra escrow service + Quest tooling). Custom-rolled migration tooling produces silent failures at scale (BitLocker keys lost, devices unmanaged, fleets stranded between tenants).

---

## Runtime State Inventory

This phase is greenfield documentation authoring + a new validator. No rename, refactor, or string-replacement work is involved. **Skip this section per Step 2.5 trigger logic.**

For completeness, the only runtime state Phase 56 affects:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no databases / datastores touched | None |
| Live service config | None — no external service config touched | None |
| OS-registered state | None — no OS registrations created | None |
| Secrets/env vars | None — no secrets touched | None |
| Build artifacts | `check-phase-56.mjs` is a new file in `scripts/validation/`; gets registered in CI workflow `.github/workflows/audit-harness-v1.5-integrity.yml` by **Phase 60** (NOT Phase 56) per AUDIT-06 lifecycle | Phase 60 will register; Phase 56 ships the file only |

---

## Common Pitfalls

### Pitfall 1: BitLocker key escrow without new key protector

**What goes wrong:** Author documents `BackupToAAD-BitLockerKeyProtector` cmdlet without noting the prerequisite that a NEW key protector must be created (and encryption re-triggered) for the existing RecoveryPassword to escrow.
**Why it happens:** Microsoft Learn glosses over this caveat; the actual behavior is documented in community guides (osdsune.com, mardahl/PSBucket GitHub).
**How to avoid:** When documenting option (a) in BitLocker 3-option enumeration, include the prerequisite verbatim: "Existing RecoveryPassword key protectors will NOT automatically back up to Entra unless a new key protector is created and encryption is re-triggered."
**Warning signs:** Plan-author copies `BackupToAAD-BitLockerKeyProtector` example without prerequisite caveat; admins running the documented PowerShell get "no error, no escrow" silent failure.

### Pitfall 2: Apple OS 26 path documented as primary baseline

**What goes wrong:** Author treats Apple OS 26 cross-MDM device migration APIs as the PRIMARY documented path, leaving admins on iOS 17 / macOS 14 fleets without guidance.
**Why it happens:** OS 26 path is genuinely simpler (no wipe, preserves data); recency bias makes it look canonical.
**How to avoid:** Document the legacy ABM "release → re-assign + wipe + re-enroll" path as the BASELINE primary path. OS 26 path is mentioned in a `> 📌 OS 26+ note` callout with explicit version gate. CONTEXT D-06 literal-pin requires `wipe` AND `re-enrollment` tokens — these come from the legacy path.
**Warning signs:** `## macOS / iOS tenant migration` H2 lacks `wipe` / `re-enrollment` literals (V-56-18 + V-56-19 will FAIL); plan-author phrasing implies "if your fleet is on OS 26..."

### Pitfall 3: MGP rebind without re-approving all apps

**What goes wrong:** Android tenant migration runbook misses the fact that disconnecting source MGP and rebinding target MGP requires RE-APPROVING all apps in the target Managed Google Play console — the existing app catalog does not transfer with the binding.
**Why it happens:** MGP binding is at the Intune tenant level, but app approvals are at the Google managed organization level. The two are linked but the app approvals do not survive disconnect/rebind.
**How to avoid:** CONTEXT D-07 literal-pin requires `re-approve` token — this comes from the app re-approval step. Validator V-56-20 enforces.
**Warning signs:** `## Android tenant migration` H2 lacks `re-approve` literal; plan-author phrasing implies "binding rebind preserves apps."

### Pitfall 4: Documenting Intune Remediations as cross-platform

**What goes wrong:** Author treats DRIFT-01 + DRIFT-02 (Intune Remediations) as cross-platform — it's NOT. Intune Remediations (Proactive Remediations) is **Windows-only** despite REQ DRIFT-01 phrasing "Bash/PowerShell" (the "Bash" reference is misleading). macOS shell-script monitoring is a different surface (Intune Settings Catalog macOS shell scripts), and there is no native Intune Remediations equivalent on iOS or Android.
**Why it happens:** REQ DRIFT-01 line 72 lists "Bash/PowerShell script pairs" — "Bash" implies cross-platform, but Microsoft Learn 2026 docs scope Intune Remediations to Windows.
**How to avoid:** Frame `01-windows-drift-detection.md` clearly as Windows-only. Slot-02 (macOS) should NOT attempt to document Intune Remediations on macOS — instead, route to v1.2 macOS L2 + Settings Catalog drift signals OR ship as routing-only stub.
**Warning signs:** Slot-02 file contains `Intune Remediations` H2; slot-02 contains `Devices > Manage devices > Scripts and remediations` portal path (this is the Windows portal path; macOS uses Settings Catalog).

### Pitfall 5: Cross-platform encryption-drift section recommending tools

**What goes wrong:** DRIFT-07 fold section recommends specific encryption-key-recovery tools (e.g., names commercial recovery products by name in iOS device-level encryption section).
**Why it happens:** Authors naturally want to provide actionable guidance for each platform; encryption-drift recovery is high-anxiety for admins.
**How to avoid:** CONTEXT D-13 + SUMMARY MEDIUM-confidence framing: pure educational/comparison content. iOS device-level encryption: "no MDM management beyond compliance check" is the SCOPE statement — do NOT recommend recovery tooling for iOS. Android dm-crypt variance: educational (per-OEM variance noted; AOSP per-OEM precedent applies); no tool recommendations.
**Warning signs:** Cross-platform encryption-drift section contains brand names other than Quest On Demand Migration (which is allowed once per D-13).

### Pitfall 6: Validator regex pinning too tight

**What goes wrong:** Validator regexes are pinned to exact prose phrasing; minor authoring rewrites cause false-positive failures.
**Why it happens:** Pattern lineage from check-phase-55.mjs uses literal-token matching; balance between brittleness (CONTEXT D-21 trade-off accepted) and false-positive immunity is delicate.
**How to avoid:** Use literal-token matching for canonical tokens (`disconnect`, `bind new`, `re-approve`, `re-provision`, `factory reset`, `work profile re-creation`, `ABM token`, `release`, `re-assign`, `Await-Configuration`, `wipe`, `re-enrollment`) but accept multiple phrasings for ancillary tokens. Phase 55 V-55-19 pattern `(retire\/wipe|retire and wipe)` is the model — accept `OR` alternations for canonical tokens with multiple natural phrasings.
**Warning signs:** Validator FAILS on plan-author rephrasing that semantically preserves the canonical token; regex literal-pins not documented in CONTEXT.md (D-21 violation).

### Pitfall 7: PITFALL-12 sidecar pin coordinate drift

**What goes wrong:** This pitfall does NOT apply to Phase 56 — drift-migration files are NEW files (no existing sidecar pins); but if any Phase 56 file ends up extending an existing supervised file (e.g., Phase 55 win32-app-packaging.md got same-commit edited), pin coordinates would shift.
**Why it happens:** Phase 56 has no retrofit obligations per CONTEXT D-22 — does not apply, but stay aware.
**How to avoid:** Confirm at plan time: Phase 56 commit touches ONLY new files in `docs/operations/drift-migration/` + new validator. No existing supervised files touched.
**Warning signs:** Phase 56 commit unexpectedly touches a file outside `docs/operations/drift-migration/` (other than the new validator).

---

## Code Examples

Verified patterns from official sources:

### Microsoft Graph `exportJobs` POST request

```http
POST https://graph.microsoft.com/beta/deviceManagement/reports/exportJobs
Content-Type: application/json
Authorization: Bearer {token}

{
  "reportName": "DeviceNonCompliance",
  "filter": "(ComplianceState eq 'NonCompliant')",
  "select": ["DeviceId", "DeviceName", "PolicyId", "ComplianceState"],
  "format": "csv"
}
```
Source: [Create deviceManagementExportJob (Microsoft Graph v1.0)](https://learn.microsoft.com/en-us/graph/api/intune-reporting-devicemanagementexportjob-create?view=graph-rest-1.0) — confirmed both `/beta/` and `/v1.0/` endpoints accept this pattern. [VERIFIED: Microsoft Learn 2026-04-29].

**Available report names per CONTEXT + verified:**

| Report Name | Stability | Surface |
|---|---|---|
| `DeviceNonCompliance` | v1.0 stable | Devices in non-compliant state with policy attribution |
| `NonCompliantDevicesAndSettings` | v1.0 stable | Setting-level granularity for non-compliance attribution |
| `ConfigurationPolicyAggregate` | beta + v1.0 | Configuration policy aggregate state across fleet |
| `SettingComplianceAggReport` | beta | Setting-level compliance aggregation |
| `FeatureUpdateDeviceState` | beta | Feature-update-driven drift signals (Windows-specific) |

### Intune Remediations canonical detection script (Windows / PowerShell)

```powershell
# Detection script — returns exit 1 if drift detected, exit 0 if not
# This script runs under SYSTEM context via Intune Management Extension on schedule.

try {
    $expected = "C:\Program Files\CompanyApp\version.txt"
    if (-not (Test-Path $expected)) {
        Write-Output "Drift detected: version.txt missing"
        exit 1     # Drift found; remediation will run
    }
    $version = Get-Content $expected -Raw
    if ($version.Trim() -ne "2.0.5") {
        Write-Output "Drift detected: version mismatch (found $version)"
        exit 1
    }
    Write-Output "No issues detected"
    exit 0     # Compliant; no remediation needed
}
catch {
    Write-Output "Detection script error: $($_.Exception.Message)"
    exit 1
}
```

### Intune Remediations canonical remediation script

```powershell
# Remediation script — returns exit 0 on success, non-zero on failure
# Runs only when detection script returned exit 1.

try {
    $installer = "\\share\CompanyApp-2.0.5.msi"
    Start-Process msiexec.exe -ArgumentList "/i `"$installer`" /quiet /norestart" -Wait -NoNewWindow
    Write-Output "Issues fixed: CompanyApp upgraded to 2.0.5"
    exit 0     # Reported as "Issues fixed" in Intune
}
catch {
    Write-Output "Remediation failed: $($_.Exception.Message)"
    exit 1     # Reported as "Error" in Intune
}
```

**Per-device status report literals (verified at Microsoft Learn 2026):**

- `No issues detected` — detection returned exit 0
- `Issues fixed` — detection returned exit 1, remediation returned exit 0
- `Error` — detection or remediation returned non-zero unexpectedly OR threw exception

**Log Analytics surface:** Full script output (`Write-Output` lines) is captured by Intune and forwarded to Log Analytics workspace if the Intune-Log-Analytics connector is configured. Use Log Analytics for L2 deep-dive on script-level errors; per-device portal report shows summary status only.

Source: [Use Remediations to detect and fix support issues (Microsoft Learn)](https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations) — VERIFIED 2026-04-29. Portal path also surfaced in single-device view under Tools + reports as of February 2026.

### BitLocker scheduled-task escrow pattern (Quest-pattern reference)

```powershell
# This script is executed by a scheduled task post-tenant-migration login.
# Pre-requisite: device joined to TARGET Entra tenant.

try {
    $bdeStatus = Get-BitLockerVolume -MountPoint "C:"
    if ($bdeStatus.VolumeStatus -ne "FullyEncrypted") {
        Write-Output "Volume not encrypted; nothing to escrow"
        exit 0
    }
    # Find existing RecoveryPassword key protector
    $rp = $bdeStatus.KeyProtector | Where-Object { $_.KeyProtectorType -eq "RecoveryPassword" }
    if (-not $rp) {
        Write-Output "No RecoveryPassword key protector found"
        exit 1
    }
    # Escrow to target Entra ID
    BackupToAAD-BitLockerKeyProtector -MountPoint "C:" -KeyProtectorId $rp.KeyProtectorId
    Write-Output "Escrow completed for KeyProtectorId $($rp.KeyProtectorId)"
    exit 0
}
catch {
    Write-Output "Escrow failed: $($_.Exception.Message)"
    exit 1
}
```

Source: Quest On Demand Migration pattern + community-verified GitHub references (mardahl/PSBucket Invoke-EscrowBitlockerToAAD.ps1) — VERIFIED 2026-04-29.

> ⚠️ **Prerequisite caveat:** `BackupToAAD-BitLockerKeyProtector` only escrows the existing RecoveryPassword IF a new key protector is created and encryption is re-triggered, OR if the existing protector has not yet been escrowed during the device's lifetime. Some workflows require:
> ```powershell
> Add-BitLockerKeyProtector -MountPoint "C:" -RecoveryPasswordProtector
> # then escrow the NEW protector
> ```
> Document this caveat verbatim in option (a) of BitLocker 3-option enumeration.

---

## State of the Art

| Old Approach | Current Approach (2026) | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Apple cross-MDM device migration via "release → wipe → re-enroll" | Apple OS 26 ABM device-migration APIs (preserves data, no wipe) | Apple OS 26 release (2025-2026) | Devices on OS 26+ can use the new path; older devices still need legacy. Phase 56 documents legacy as primary, OS 26 mentioned with version gate. |
| Managed Google Play account via personal Gmail | Managed Google Domain via Microsoft Entra account | August 2024 (Microsoft "new way") | Existing Gmail-based Intune↔MGP bindings can upgrade to Entra-linked without device retirement. Phase 56 should mention the Entra-linked binding as the recommended target-tenant binding form. |
| SafetyNet attestation API | Play Integrity (MEETS_STRONG_INTEGRITY) | Google deprecated SafetyNet January 2025 | Phase 54 owns the SSoT for Play Integrity. Phase 56 cross-references Phase 54 for Android Play Integrity verdict-change drift signal. |
| Intune Settings Catalog `forceDelayedSoftwareUpdates` MDM commands (legacy iOS/macOS update enforcement) | DDM (Declarative Device Management) only | Apple OS 26 removes legacy MDM commands | Phase 54 owns the SSoT. Phase 56 mentions "macOS profile revocation" + "iOS jailbreak / OS downgrade" as drift signals only; update enforcement is out of Phase 56 scope. |
| `docs.microsoft.com` Microsoft Learn URLs | `learn.microsoft.com` | Late 2022 migration | Cross-link prose in Phase 56 should use `learn.microsoft.com` URLs only (not redirect-from-`docs.`) |

**Deprecated/outdated:**

- SafetyNet API references — out (deprecated January 2025)
- "Bash" framing for Intune Remediations — misleading (Windows-only despite REQ phrasing)
- Apple Configurator-driven MDM transfer — superseded by ABM portal flow
- Personal-Gmail Managed Google Play account — superseded by Entra-linked Managed Google Domain (but legacy still works for existing tenants)

---

## Cross-platform compliance drift signals matrix

This is the substantive content for `00-overview.md` cross-platform comparison table (DRIFT-03). Required signal tokens per CONTEXT D-02 + V-56-15 must all appear in 00-overview body:

| Platform | Drift signal | Detection surface | Remediation surface | REQ literal |
|---|---|---|---|---|
| Windows | **Policy conflict** (two policies target same setting with different values) | Intune compliance reports + Endpoint Analytics | Resolve via policy precedence rules + Settings Catalog conflict report | `policy conflict` |
| Windows | **App install regression** (app uninstalled / reverted on managed device) | Intune Win32 app status + Endpoint Analytics | Re-deploy via Required assignment OR Intune Remediations script pair | `app install regression` |
| macOS | **Profile revocation** (DDM declaration expired / user-removed configuration profile) | Intune compliance reports + DDM declaration status | Re-push profile via Settings Catalog OR retire+re-enroll | `profile revocation` |
| iOS | **Jailbreak detection** (compliance policy reports jailbroken state) | Intune compliance policy with "Jailbroken devices" set to Block | Wipe device + re-enroll OR remove from CA scope | `jailbreak detection` |
| iOS | **OS downgrade** (device reverted to older iOS version) | Intune software update policy + compliance policy minimum OS version | Cannot downgrade via Intune; user must restore via iTunes/Finder + re-enroll | `OS downgrade` |
| Android | **Play Integrity verdict change** (MEETS_STRONG_INTEGRITY → lower verdict; security patch staleness) | Intune compliance policy + Play Integrity attestation | Apply security patches OR fail compliance + CA blocks | `Play Integrity verdict` |

**Other drift signals (optional rows; plan-author discretion for column count):**

- macOS: FileVault key escrow not updated post-re-enrollment (cross-link to DRIFT-07 fold)
- Windows: BitLocker recovery key escrow drift (cross-link to DRIFT-07 fold)
- All platforms: `last_verified` MDM check-in staleness (>30 days)

> ⚠️ **REQ traceability firewall (V-56-11):** 00-overview body MUST NOT contain per-platform substance literals: `supersedence`, `Win32ContentPrepTool`, `BitLocker re-key`, `ABM token`, `MGP re-binding`, `exit 1`, `exit 0`, `Log Analytics`, `Quest On Demand Migration`. These belong to per-platform files (01) or 04-runbook fold sections.

---

## Per-platform tenant migration mechanics

### §2.1 Windows tenant migration

**Sequence (locked per REQUIREMENTS line 75 + CONTEXT D-05):**

1. Pre-migration inventory (serial numbers, hashes if needed for re-registration)
2. Autopilot deregistration in source tenant (per v1.2 `device-operations/04-tenant-migration.md` Method 1 / Method 2 — cross-link to it for hardware-hash collection mechanics)
3. **BitLocker re-key — choose one of 3 enumerated approaches:**
   - (a) Source-tenant escrow → target Entra via PowerShell scheduled task (Quest pattern; preserves encryption continuity)
   - (b) Decrypt → re-encrypt with `> ⚠️ Data-risk window` callout (preserves no continuity; explicit data-risk window)
   - (c) Third-party tool (e.g., Quest On Demand Migration; mention ONCE only per D-13)
4. Autopilot re-registration in target tenant (hash import + profile assignment)
5. Post-migration BitLocker recovery key escrow validation (verify keys present in target Entra ID via Microsoft Entra portal)

**Required validator literals (V-56-16, V-56-17):**

- `source-tenant escrow` (option a)
- `decrypt` AND `re-encrypt` (option b)
- `Quest On Demand Migration` OR `third-party tool` (option c)
- `deregistration` AND `re-registration`
- `escrow validation` OR `escrow verification`
- `> ⚠️ Data-risk window` callout within ~10 lines of option (b) anchor

### §2.2 macOS / iOS tenant migration

**Sequence (locked per REQUIREMENTS line 76 + CONTEXT D-06):**

1. Confirm devices NOT on iOS 26 / iPadOS 26 / macOS 26 (legacy path) — OR document OS 26 path with version gate as alternative
2. **Legacy path (BASELINE):**
   - Release devices from MDM server in source ABM (Apple Business Manager admin portal)
   - Re-assign devices to MDM server in target ABM
   - In-use devices: WIPE + re-enrollment (cannot transfer enrolled state cross-tenant)
   - ADE Await-Configuration behavior callout: devices in DEP/ADE wait at Setup Assistant for new MDM server check-in
3. **OS 26 path (alternative; iOS/iPadOS/macOS 26+ devices only):**
   - In ABM/ASM portal, transfer device assignment between MDM servers (no wipe)
   - Set enrollment deadline (devices auto-locked if not re-enrolled by deadline)
   - Bulk-assign via new ABM APIs

**Required validator literals (V-56-18, V-56-19):**

- `ABM token` AND `release` AND `re-assign`
- `Await-Configuration`
- `wipe` AND `re-enrollment` (within macOS/iOS H2 scope; from legacy path)

**Combined H2 vs split H2:** Per CONTEXT D-04, default is `## macOS / iOS tenant migration` (single combined H2). Plan-author may split into `## macOS tenant migration` + `## iOS tenant migration` if file-size reduction warrants — V-56-NN regex must accommodate either form.

### §2.3 Android tenant migration

**Sequence (locked per REQUIREMENTS line 77 + CONTEXT D-07):**

1. Disconnect from source MGP (Intune admin center → Settings → Managed Google Play → Disconnect)
   - Confirms admin understands disconnect retires + deletes all enrolled Android devices in source tenant per Microsoft Q&A 2026-04-29 [VERIFIED]
2. Bind new MGP account to target Intune tenant (using Entra-linked Managed Google Domain account — current 2026 recommended path per "new way" August 2024)
3. **Re-approve all apps** in target Managed Google Play console (existing app catalog does NOT survive disconnect/rebind)
4. **Re-provision devices** per ownership mode:
   - **Corporate-owned (fully managed / dedicated / COBO):** Factory reset + re-enrollment via target tenant DPC
   - **BYOD (work profile):** Work profile re-creation (user-driven)
   - **Zero-Touch enrolled corporate-owned:** ZT portal re-upload with target credentials (target tenant's Intune Connector enrollment token + DPC config) per CONTEXT D-23 plan-time research item [VERIFIED via Microsoft Learn 2026 zero-touch enrollment guide]

**Required validator literals (V-56-20, V-56-21):**

- `disconnect` AND `bind new` AND `re-approve` AND `re-provision`
- Within Android H2 scope: `factory reset` (corporate) AND `work profile re-creation` (BYOD) AND `ZT portal re-upload`

---

## §3 Cross-platform encryption-drift architecture (DRIFT-07 fold)

**H2 literal-pin:** `## Cross-platform encryption drift` (V-56-22 enforces).

**4-platform coverage (per CONTEXT D-08 + V-56-23 literals):**

| Platform | Encryption surface | Drift risk | MDM management |
|---|---|---|---|
| Windows | **BitLocker** (full-disk encryption; Entra ID escrow target) | Key escrow targeting risk: BitLocker recovery key escrowed to source Entra; tenant migration leaves key orphaned | YES — Intune disk encryption profile + `BackupToAAD-BitLockerKeyProtector` cmdlet |
| macOS | **FileVault** (full-disk encryption; recovery key escrow) | Escrow not updated post-re-enrollment behavior — re-enrolling device in target tenant does NOT automatically re-escrow FileVault recovery key | YES — Intune FileVault policy with personal/institutional recovery key options |
| iOS | **iOS device-level encryption** (hardware-backed; passcode-derived) | No MDM management beyond compliance check (passcode complexity policy + encryption-required compliance signal) | NO — encryption is automatic on all iOS devices; MDM cannot manage keys |
| Android | **AOSP dm-crypt variance** (per-OEM; LUKS NOT available — Android uses dm-crypt or file-based encryption) | Per-OEM variance: Pixel/Samsung/Zebra implementations differ; no Intune-supported recovery key escrow on Android | NO — encryption automatic on Android 10+; per-OEM variance noted (per Phase 45 AOSP per-OEM precedent) |

**Required validator literals (V-56-23) within DRIFT-07 H2 scope:**

- `BitLocker` AND `FileVault` AND (`iOS device-level` OR `iOS encryption`) AND `dm-crypt`

**Editorial discipline:**

- Pure educational/comparison content (NO recommendations of specific encryption-key-recovery tools per CONTEXT D-13 + SUMMARY MEDIUM-confidence framing)
- iOS section MUST clarify "no MDM management beyond compliance check" — no tool recommendations
- Android section MUST note dm-crypt per-OEM variance — no LUKS implication (LUKS is Linux-only)

---

## §4 Intune Remediations canonical script-authoring pattern (DRIFT-02 fold)

**H2 literal-pin:** `## Canonical script-authoring pattern` (V-56-14 enforces) inside `01-windows-drift-detection.md`.

**Required tokens within H2 scope (V-56-14):**

- `exit 1` (detection script returns when drift detected)
- `exit 0` (detection script returns when no drift; remediation script returns on success)
- `Log Analytics`

**Authoring guidance:**

1. **Detection script semantics:** `exit 0` = compliant (`No issues detected`); `exit 1` = drift detected (triggers remediation); any other exit code = error (`Error` status)
2. **Remediation script semantics:** `exit 0` = success (`Issues fixed`); non-zero = failure (`Error`)
3. **Output capture:** Plain `Write-Output` (PowerShell) lines forwarded to Intune for per-device summary; full output available in Log Analytics workspace if connector configured
4. **Run context:** SYSTEM context by default; per-user context optional toggle in admin center
5. **Script signing:** SHA256-signed PowerShell scripts recommended for production; unsigned scripts require `Bypass` execution policy override

**Verified status report literals (V-56-13 enforces in 01-windows file):**

- `No issues detected`
- `Issues fixed`
- `Error`

---

## Validation Architecture

> Phase 56 ships its OWN validator (`check-phase-56.mjs`); this section describes the validator framework not the phase-deliverable validator. Per CONTEXT, `check-phase-56.mjs` is structural-assertion-based and does not invoke a test framework.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None (markdown content + structural-assertion validator) |
| Config file | None — `check-phase-56.mjs` is self-contained |
| Quick run command | `node scripts/validation/check-phase-56.mjs` |
| Full suite command | `node scripts/validation/check-phase-56.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| DRIFT-01 | Windows Intune Remediations portal path + status reports in `01-windows-drift-detection.md` | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-12, V-56-13) | ❌ Wave 0 (Phase 56 ships) |
| DRIFT-02 | Canonical script-authoring pattern H2 + exit codes + Log Analytics | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-14) | ❌ Wave 0 |
| DRIFT-03 | Cross-platform compliance drift signals at 00-overview | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-15) | ❌ Wave 0 |
| DRIFT-04 | BitLocker 3-option enumeration + Autopilot dereg + escrow validation | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-16, V-56-17) | ❌ Wave 0 |
| DRIFT-05 | ABM token re-issue + Await-Configuration + wipe + re-enrollment | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-18, V-56-19) | ❌ Wave 0 |
| DRIFT-06 | MGP re-binding + per-ownership-mode re-provisioning | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-20, V-56-21) | ❌ Wave 0 |
| DRIFT-07 | Cross-platform encryption-drift fold H2 + 4-platform coverage | structural assertion | `node scripts/validation/check-phase-56.mjs` (V-56-22, V-56-23) | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `node scripts/validation/check-phase-56.mjs` (must exit 0 before commit per pre-commit gate)
- **Per wave merge:** `node scripts/validation/v1.5-milestone-audit.mjs --verbose` (must exit 0; C1-C12 PASS; C13 informational PASS-or-noise)
- **Phase gate:** All 3 validators (`check-phase-56.mjs` + `v1.5-milestone-audit.mjs` + `regenerate-supervision-pins.mjs --self-test`) exit 0 before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `scripts/validation/check-phase-56.mjs` — implements V-56-01..32 structural assertions
- [ ] All 5 content files (`docs/operations/drift-migration/00-overview.md` through `04-tenant-migration-runbook.md`)

*(No framework install needed; Node.js builtin runtime sufficient.)*

---

## §6 Validator regex hints for V-56-01..32

This section provides literal-token strings the planner needs to bind each V-56-NN assertion in `check-phase-56.mjs`. Patterns inherit from `check-phase-55.mjs` line-for-line per CONTEXT D-19.

| V-56-NN | File scope | Regex / literal token | Notes |
|---|---|---|---|
| V-56-01 | `00-overview.md` | file existence | `existsSync()` |
| V-56-02 | `01-windows-drift-detection.md` | file existence | `existsSync()` |
| V-56-03 | `02-macos-drift-detection.md` | file existence | `existsSync()` |
| V-56-04 | `03-ios-android-drift-detection.md` | file existence | `existsSync()` |
| V-56-05 | `04-tenant-migration-runbook.md` | file existence | `existsSync()` |
| V-56-06 | `check-phase-56.mjs` | self-reference file existence | `existsSync()` |
| V-56-07 | All 5 content files | frontmatter contract: `platform: <expected>` AND `audience:` AND `last_verified:` AND `review_by:` ≤60 days | per-file expected platform regex map: 00=`/^platform:\s*cross-platform\s*$/m`; 01=`/^platform:\s*Windows\s*$/m`; 02=`/^platform:\s*macOS\s*$/m`; 03=`/^platform:\s*iOS,\s*Android\s*$/m`; 04=`/^platform:\s*cross-platform\s*$/m` |
| V-56-08 | `04-tenant-migration-runbook.md` | `^confidence:\s*MEDIUM\s*$` in frontmatter | exclusive to runbook |
| V-56-09 | `00-overview.md` | 4-platform comparison table (Windows + macOS + iOS + Android) | accept either column-headers or row-headers form per V-55-08 lineage |
| V-56-10 | `00-overview.md` | `^## Drift terminology` H2 + ≥3 cross-platform terminology tokens within ~3000 bytes | candidate tokens: `compliance`, `policy conflict`, `attestation`, `revocation`, `verdict`, `regression`, `downgrade`, `jailbreak`, `drift`, `signal` |
| V-56-11 | `00-overview.md` | NEGATIVE: body prose (with frontmatter, table rows, code blocks, links stripped) MUST NOT contain forbidden tokens: `supersedence`, `Win32ContentPrepTool`, `BitLocker re-key`, `ABM token`, `MGP re-binding`, `exit 1`, `exit 0`, `Log Analytics`, `Quest On Demand Migration` | REQ traceability firewall paralleling V-55-10 |
| V-56-12 | `01-windows-drift-detection.md` | literal: `Devices > Manage devices > Scripts and remediations > Remediation scripts` | DRIFT-01 portal path |
| V-56-13 | `01-windows-drift-detection.md` | literals: `No issues detected` AND `Issues fixed` AND `Error` | DRIFT-01 status reports |
| V-56-14 | `01-windows-drift-detection.md` | `^## Canonical script-authoring pattern` H2 AND `exit 1` AND `exit 0` AND `Log Analytics` | DRIFT-02 fold |
| V-56-15 | `00-overview.md` | all 6 signal tokens within body: `policy conflict`, `app install regression`, `profile revocation`, `jailbreak detection`, `OS downgrade`, `Play Integrity verdict` | DRIFT-03 cross-platform signal coverage |
| V-56-16 | `04-tenant-migration-runbook.md` | `source-tenant escrow` AND `decrypt` AND `re-encrypt` AND (`Quest On Demand Migration` OR `third-party tool`) | DRIFT-04 BitLocker 3-option neutral enumeration |
| V-56-17 | `04-tenant-migration-runbook.md` | `deregistration` AND `re-registration` AND (`escrow validation` OR `escrow verification`) | DRIFT-04 Autopilot dereg + post-migration validation |
| V-56-18 | `04-tenant-migration-runbook.md` | `ABM token` AND `release` AND `re-assign` AND `Await-Configuration` | DRIFT-05 ABM token re-issue + ADE behavior |
| V-56-19 | `04-tenant-migration-runbook.md` | within macOS/iOS H2 scope: `wipe` AND `re-enrollment` | DRIFT-05 in-use device wipe contract |
| V-56-20 | `04-tenant-migration-runbook.md` | `disconnect` AND `bind new` AND `re-approve` AND `re-provision` | DRIFT-06 MGP re-binding sequence |
| V-56-21 | `04-tenant-migration-runbook.md` | within Android H2 scope: `factory reset` AND `work profile re-creation` AND `ZT portal re-upload` | DRIFT-06 per-ownership-mode re-provisioning |
| V-56-22 | `04-tenant-migration-runbook.md` | `^## Cross-platform encryption drift` H2 literal | DRIFT-07 fold H2 literal-pin |
| V-56-23 | `04-tenant-migration-runbook.md` | within DRIFT-07 H2 scope: `BitLocker` AND `FileVault` AND (`iOS device-level` OR `iOS encryption`) AND `dm-crypt` | DRIFT-07 4-platform encryption coverage |
| V-56-24 | `04-tenant-migration-runbook.md` | `> ⚠️ MEDIUM confidence` blockquote within first 50 body lines (post-frontmatter) | MEDIUM-confidence inline blockquote dual-surface |
| V-56-25 | `01-windows-drift-detection.md` | relative-path link `../../reference/drift-detection.md` AND target file exists | cross-link to v1.2 registration-drift SSoT |
| V-56-26 | `04-tenant-migration-runbook.md` | relative-path link `../../device-operations/04-tenant-migration.md` AND target file exists | cross-link to v1.2 Windows tenant-migration SSoT |
| V-56-27 | All 5 content files | each contains `> **Platform applicability:**` blockquote within first 50 body lines | inline blockquote at TOP per Phase 54 D-04 + Phase 55 D-13 inheritance |
| V-56-28 | Corpus-wide (docs/ + .planning/) | NEGATIVE: zero `^>\s*\*\*Platform:\*\*` matches (with no qualifier) | bare-blockquote regression-guard paralleling V-55-27 |
| V-56-29 | `docs/operations/00-index.md` | NEGATIVE: NOT contain `^## Drift Detection` OR `^## Tenant Migration` H2 | ops/00-index.md NOT amended by Phase 56 |
| V-56-30 | `docs/operations/drift-migration/05-cross-platform-encryption-drift.md` | NEGATIVE: file does NOT exist | DRIFT-07 fold-discipline regression-guard |
| V-56-31 | `docs/reference/drift-detection.md` AND `docs/device-operations/04-tenant-migration.md` | POSITIVE: both exist at file-system level | v1.2 anti-deletion regression-guard |
| V-56-32 | All 5 content files | NEGATIVE: zero `\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b` outside Version History tables and code blocks | TBD scan paralleling V-55-30 |

**Summary:** 32 V-56-NN assertions (matching Phase 55's 32-check count exactly).

---

## §7 Research flags + open questions for plan-time verification

### MEDIUM-confidence flags to surface in plan documents

1. **Tenant migration is MEDIUM confidence throughout** — no single authoritative Microsoft Learn guide; multiple community-validated patterns exist. Document via dual-surface (frontmatter + inline blockquote) per CONTEXT D-11/D-16.
2. **ABM cross-tenant transfer is admin-portal-driven** (no API automation for legacy fleets; OS 26 introduces APIs but base case is portal-only). Verify current 2026 UI at plan time — Apple Business Manager UI evolves quarterly.
3. **MGP cross-tenant rebind requires re-approving all apps** — disconnect+rebind does NOT preserve app catalog. Document explicitly per V-56-20 `re-approve` literal.
4. **BitLocker decrypt → re-encrypt approach has a data-risk window** — surface explicit `> ⚠️ Data-risk window` callout per CONTEXT D-12 + ROADMAP SC#3.
5. **Apple OS 26 cross-MDM device migration APIs are NEW (2025-2026)** — document as alternative path with explicit version gate; legacy "release → re-assign + wipe" remains BASELINE for Phase 56.

### LOW-MEDIUM confidence — verify at plan time

1. **Microsoft Graph `exportJobs` `/beta` vs `/v1.0` endpoint stability** — both endpoints accept the same pattern as of 2026-04-29, but report names like `FeatureUpdateDeviceState` may be `/beta`-only. Plan-author should verify each report name against the current Microsoft Graph docs `https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports` before authoring example POST requests.
2. **Zero-Touch portal cross-tenant re-upload procedure** — verified via Microsoft Learn 2026 `learn.microsoft.com/en-us/intune/intune-service/enrollment/android-dedicated-devices-fully-managed-enroll`, but the exact UX of "re-upload with target credentials" is not explicitly documented as a tenant-migration scenario; the procedure inferred is: disconnect ZT account from source Intune → link new ZT account to target Intune → push new EMM DPC config to ZT portal. Plan-author should verify the link-account UX in Intune admin center at plan time.
3. **Quest On Demand Migration BitLocker handling specifics** — confirmed via Quest support portal (PDF reference doc `79920_ODMAD_Intune_Autopilot_BitLocker_Cleanup_Quick_Start_Guide_en.pdf`). Plan-author should NOT author full Quest tutorial (CONTEXT D-13 scope-creep guard) — single-mention contract holds.

### Open questions

1. **Should slot-02 / slot-03 be routing-only stubs or thin operational summaries?**
   - What we know: There is no native Intune Remediations equivalent on macOS/iOS/Android. macOS has Intune Settings Catalog macOS shell-script monitoring (different surface). Android has Play Integrity verdict-change drift signals. iOS has jailbreak/OS downgrade compliance signals.
   - What's unclear: Whether plan-author chooses substantive content (e.g., document Settings Catalog drift signals) OR routing stub (cross-link to v1.2 macOS L2 + Phase 54 Play Integrity SSoT).
   - Recommendation: Default to routing-only stub paralleling Phase 55 4C-prime hybrid pattern. Slot-02 + slot-03 carry the cross-platform inline blockquote + frontmatter + ~50-100 lines of operational summary + cross-links. Substantive content invites scope-creep; v1.2 macOS L2 + Phase 54 already own the SSoTs.

2. **Should `## macOS / iOS tenant migration` be one combined H2 or two?**
   - What we know: CONTEXT D-04 default is combined; macOS and iOS migration share the ABM token re-issue flow.
   - What's unclear: Whether the file-size cap (600-1000 lines hard cap) is hit before/after this decision.
   - Recommendation: Default to combined `## macOS / iOS tenant migration` per CONTEXT D-04. Split only if file size approaches 1000-line cap with combined section. Validator V-56-NN regex must accommodate either form.

3. **Apple OS 26 path inclusion depth?**
   - What we know: OS 26 introduces ABM device-migration APIs that materially change the macOS/iOS migration surface (no wipe; preserves data; deadline enforcement).
   - What's unclear: Phase 56 must document legacy path as BASELINE (devices on iOS <26 / macOS <26); should OS 26 path be a sub-H3 inside `## macOS / iOS tenant migration` or a standalone callout?
   - Recommendation: Inline callout `> 📌 OS 26+ device migration` at TOP of `## macOS / iOS tenant migration` H2, then full legacy path. OS 26 path mentioned as 1-2 paragraph alternative referencing Apple's documentation; do NOT replicate Apple's OS 26 procedure (out of scope; Apple-side documentation owns that).

4. **Should the `## Drift terminology` H2 in 00-overview be REQUIRED to be a specific H2 string?**
   - What we know: V-56-10 enforces an H2 with cross-platform terminology tokens; CONTEXT D-02 phrasing is "Drift terminology" but slack is allowed.
   - Recommendation: Pin `## Drift terminology` literal in V-56-10 regex; accept either bare H2 or H2-with-anchor `## Drift terminology {#drift-terminology}` (Phase 55 V-55-09 lineage).

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js (≥18) | `check-phase-56.mjs` validator | ✓ | (verified at v1.5 audit-tooling phase 48) | — |
| Git | Single atomic commit per CONTEXT D-22 | ✓ | (any modern) | — |
| markdown-link-check | Pre-commit gate informational check | (Phase 48 contract) | — | Skip if not installed (informational, non-blocking) |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** `markdown-link-check` is informational-only at Phase 48 first-pass; not required to be installed for Phase 56 commit.

---

## Security Domain

> Security enforcement applies; this phase ships docs + a Node validator only — security surface is documentation correctness, not runtime code.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | yes (documented patterns) | Document Microsoft Entra-linked Managed Google Domain auth as recommended path; do NOT document credential-bearing PowerShell snippets that hardcode tokens |
| V3 Session Management | no | (no session state in docs) |
| V4 Access Control | yes (documented patterns) | Document tenant migration prerequisites: Intune Service Administrator OR Global Administrator role in BOTH source and target tenants |
| V5 Input Validation | no | (no user input handled by docs) |
| V6 Cryptography | yes (BitLocker 3-option enumeration) | Reference `BackupToAAD-BitLockerKeyProtector` cmdlet — never hand-roll cryptographic key handling |

### Known Threat Patterns for tenant-migration documentation

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Documented PowerShell that hardcodes tenant credentials | Information Disclosure | Use plain-prose token-acquisition narrative ("acquire token via X") rather than executable script blocks with placeholder credentials |
| BitLocker recovery key escrow gap during migration | Tampering / Repudiation | Document option (a) preferred path (PowerShell scheduled task escrow); option (b) data-risk window callout; option (c) third-party tool — neutral enumeration |
| Cross-tenant device data leakage during ABM transfer | Information Disclosure | Document wipe + re-enrollment baseline for legacy fleets; OS 26 path's deadline enforcement (devices auto-locked if not re-enrolled) |
| MGP rebind app catalog leakage | Information Disclosure | Document re-approve all apps step explicitly; existing app catalog does NOT survive disconnect |
| Stale BitLocker key escrow post-migration | Repudiation | Document post-migration escrow validation explicitly (check Entra portal for key presence) |

---

## Assumptions Log

> All claims tagged `[ASSUMED]` requiring user confirmation before becoming locked decisions.

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Apple OS 26 cross-MDM migration APIs are mentioned in Phase 56 with explicit version gate (devices on iOS <26 / macOS <26 use legacy path) | §2.2, Architecture Patterns Anti-Pattern 2 | If user prefers OS 26 path documented as primary baseline, BitLocker / wipe / re-enrollment narrative changes substantially. CONTEXT D-06 literal-pin (`wipe` AND `re-enrollment`) suggests legacy is BASELINE — assumption holds. |
| A2 | Slot-02 (`02-macos-drift-detection.md`) defaults to routing-only stub (no native Intune Remediations equivalent on macOS) | §2.2 Open Q1, Architecture Patterns Anti-Pattern 4 | If user expects substantive macOS drift detection content, slot-02 needs ~200-400 lines documenting Settings Catalog drift signals. CONTEXT D-01 plan-author discretion explicitly allows both shapes — assumption is plan-author's call but defaults to stub. |
| A3 | `## Drift terminology` is the locked H2 literal-pin in V-56-10 | §6 V-56-10, §7 Open Q4 | If user prefers different H2 naming, the validator regex needs adjustment + CONTEXT D-21 same-commit update. |
| A4 | The cross-platform comparison table in 00-overview uses 4-column form (Windows | macOS | iOS | Android) per Phase 55 V-55-08 lineage | §6 V-56-09 | If user prefers transposed (4-row) form, V-56-09 regex must accept both per V-55-08 precedent — assumption holds. |
| A5 | The Microsoft Graph drift-detection deep-dive is OPTIONAL plan-author addendum (per CONTEXT D-23 plan-time research item) and NOT a required deliverable | §1, Standard Stack Supporting | If user wants Graph deep-dive in 01-windows-drift-detection.md (or 00-overview), plan-author adds an additional H2 — assumption is plan-author's call. |
| A6 | iOS jailbreak detection signal authoring stays at overview-cell prose depth (out of Phase 56 scope per CONTEXT deferred section); slot-03 may surface 1-2 paragraphs only | §2.2 Open Q1 | If user wants substantive iOS jailbreak detection authoring, scope expands beyond CONTEXT deferred section. |
| A7 | Quest On Demand Migration is mentioned ONCE only in `04-tenant-migration-runbook.md` per CONTEXT D-13 single-mention contract | §2.1, Standard Stack Alternatives | If user wants Quest mentioned in multiple places (e.g., cross-platform encryption-drift section also), V-56-NN literal-token scan may catch double-mention. Single-mention contract holds. |
| A8 | The OS 26 ABM device-migration API path is mentioned in `## macOS / iOS tenant migration` as an inline callout (not a separate H2) | §7 Open Q3 | If user prefers OS 26 as a separate H3 sub-section, structural assertion needs adjustment. |

---

## Open Questions

(Captured above in §7. Cross-referencing for top-of-mind:)

1. **Slot-02 / slot-03 stub-vs-substantive shape** — defaulted to routing-only stub; plan-author finalizes
2. **Combined vs split macOS / iOS H2** — defaulted to combined per CONTEXT D-04
3. **Apple OS 26 path inclusion depth** — defaulted to inline callout
4. **`## Drift terminology` H2 literal-pin** — defaulted to literal `Drift terminology`

---

## Sources

### Primary (HIGH confidence)

- [Microsoft Learn — Use Remediations to Detect and Fix Support Issues](https://learn.microsoft.com/en-us/intune/device-management/tools/deploy-remediations) — DRIFT-01 portal path verified 2026-04-29; February 2026 single-device view enhancement noted
- [Microsoft Learn — Create deviceManagementExportJob (Microsoft Graph v1.0)](https://learn.microsoft.com/en-us/graph/api/intune-reporting-devicemanagementexportjob-create?view=graph-rest-1.0) — Graph `exportJobs` POST request pattern verified 2026-04-29
- [Microsoft Learn — Intune Graph API Reports and Properties](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/reports-export-graph-available-reports) — Report names verified 2026-04-29
- [Microsoft Learn — Connect Intune account to managed Google Play account](https://learn.microsoft.com/en-us/intune/device-enrollment/android/connect-managed-google-play) — MGP binding flow verified 2026-04-29
- [Microsoft Learn — iOS/iPadOS device compliance settings](https://learn.microsoft.com/en-us/intune/intune-service/protect/compliance-policy-create-ios) — iOS jailbreak detection compliance policy surface verified 2026-04-29
- [Apple Support — Migrate managed devices to another device management service](https://support.apple.com/guide/deployment/migrate-managed-devices-dep4acb2aa44/web) — ABM cross-MDM transfer guidance
- [Microsoft TechCommunity — Apple OS 26 device migration support](https://techcommunity.microsoft.com/blog/intunecustomersuccess/apple-making-device-migration-to-microsoft-intune-easy-with-upcoming-os-26-relea/4439895) — Apple OS 26 ABM API path verified 2026-04-29
- [Quest Support — On Demand Migration Active Directory Intune, Autopilot and BitLocker Cleanup Quick Start Guide](https://support.quest.com/technical-documents/on-demand-migration/current/active-directory-intune--autopilot-and-bitlocker-cleanup-quick-start-guide/2) — Quest tool currency + BitLocker handling confirmed 2026-04-29
- `.planning/research/SUMMARY.md` lines 52-56, 195-260 — Graph API drift detection + tenant migration framing
- `.planning/REQUIREMENTS.md` lines 70-78 — DRIFT-01..07 verbatim
- `.planning/ROADMAP.md` lines 306-318 — Phase 56 5 SCs
- `.planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md` — 22 D-NN locked decisions
- `docs/operations/app-lifecycle/00-overview.md` and `01-windows-win32-msix-scale.md` — Phase 55 sibling pattern source
- `docs/operations/patch-management/04-android-patch-delivery.md` — Phase 54 Play Integrity SSoT
- `docs/reference/drift-detection.md` — v1.2 registration drift cross-link target
- `docs/device-operations/04-tenant-migration.md` — v1.2 Windows tenant migration cross-link target
- `scripts/validation/check-phase-55.mjs` — Phase 55 validator template (line-for-line lineage source per CONTEXT D-19)

### Secondary (MEDIUM confidence)

- [BitLocker recovery key migration practical guide (Microsoft TechCommunity)](https://techcommunity.microsoft.com/blog/coreinfrastructureandsecurityblog/migrating-bitlocker-recovery-key-management-from-configmgr-to-intune-a-practical/4414948) — BitLocker option (a) PowerShell pattern (community-verified)
- [Migrate BitLocker Recovery Key(s) to Azure AD with Proactive Remediation (osdsune.com)](https://www.osdsune.com/home/blog/microsoft-intune/migrate-bitlocker-recovery-key-s-to-azure-ad-with-proactive-remediation) — BitLocker prerequisite caveat (new key protector required)
- [Disconnect Managed Google Play from Intune (Microsoft Q&A 2026)](https://learn.microsoft.com/en-us/answers/questions/1338223/disconnect-managed-google-play-from-intune-(all-an) — Disconnect retires + deletes all Android devices behavior verified
- [PSBucket Invoke-EscrowBitlockerToAAD.ps1 (mardahl GitHub)](https://github.com/mardahl/PSBucket/blob/master/Invoke-EscrowBitlockerToAAD.ps1) — BitLocker escrow community script reference
- [Connecting Intune to Managed Google Play — The NEW Way (move2modern August 2024)](https://move2modern.uk/index.php/2024/09/13/connecting-intune-to-managed-google-play-the-new-way/) — Entra-linked Managed Google Domain binding pattern

### Tertiary (LOW confidence — flagged for plan-time validation)

- Specific Zero-Touch portal cross-tenant re-upload UX flow — multiple community sources, no single Microsoft Learn SSoT for the tenant-migration use case (verified PROCEDURE inference; verify exact UX at plan time)
- Apple OS 26 ABM API specifics — only Apple-side announcements + Microsoft community blog confirm API existence; full API surface documentation not yet in stable Microsoft Learn pages
- Drift signal token list at 00-overview — 6 required tokens locked per CONTEXT D-02; additional rows beyond these 6 are plan-author discretion

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — Node.js validator runtime is established; Microsoft Graph + Intune Remediations + Quest tooling all verified at primary sources
- Architecture (file shape, validator structure): HIGH — Phase 55 line-for-line lineage; CONTEXT D-NN decisions exhaustively cover structure
- DRIFT-01/02/03 (drift detection): HIGH — Intune Remediations + cross-platform compliance signals well-documented at Microsoft Learn
- DRIFT-04 (Windows BitLocker re-key): MEDIUM-HIGH — 3-option enumeration verified across multiple sources; Quest pattern current; option (b) data-risk window is universally acknowledged
- DRIFT-05 (macOS/iOS ABM): MEDIUM — legacy path well-documented; OS 26 path is recent (2025-2026) and not yet in stable Microsoft Learn pages
- DRIFT-06 (Android MGP): MEDIUM — disconnect/rebind flow documented; ZT portal cross-tenant re-upload UX inferred from procedure
- DRIFT-07 (cross-platform encryption-drift): MEDIUM — educational/comparison content; no single SSoT but per-platform encryption surfaces well-known
- Pitfalls: HIGH — drawn from PITFALLS.md PITFALL-7/10/12/13/14/15 verified inheritance + research-driven additions

**Research date:** 2026-04-29
**Valid until:** 2026-05-29 (30 days for stable surfaces; Apple OS 26 + Microsoft Graph beta endpoints may shift sooner — plan-time verification recommended within 7 days of authoring)

## RESEARCH COMPLETE
