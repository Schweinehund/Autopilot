# Phase 56: Drift Detection + Tenant Migration — Pattern Map

**Mapped:** 2026-04-29
**Files analyzed:** 6 (5 content files + 1 validator)
**Analogs found:** 6 / 6 (all with direct sibling precedent)

---

## File Classification

| New File (to create) | Role | Data Flow | Closest Analog | Match Quality |
|----------------------|------|-----------|----------------|---------------|
| `docs/operations/drift-migration/00-overview.md` | doc-overview (cross-platform hub) | request-response (routing) | `docs/operations/app-lifecycle/00-overview.md` AND `docs/operations/patch-management/00-overview.md` | exact (1D Hybrid sibling) |
| `docs/operations/drift-migration/01-windows-drift-detection.md` | doc-platform (Windows; multi-REQ fold) | request-response | `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` | exact (Windows-platform sibling with multi-H2 FOLD pattern) |
| `docs/operations/drift-migration/02-macos-drift-detection.md` | doc-platform (macOS; stub-or-substantive) | request-response | `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` | role-match (macOS sibling; no specific REQ-driven content makes stub viable) |
| `docs/operations/drift-migration/03-ios-android-drift-detection.md` | doc-platform (multi-platform iOS+Android) | request-response | `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` + `04-android-mgp-lifecycle.md` (combined) | role-match (no direct multi-platform-slot sibling — combine shape from two siblings) |
| `docs/operations/drift-migration/04-tenant-migration-runbook.md` | doc-runbook (cross-platform; MEDIUM-confidence; multi-REQ FOLD) | request-response | Primary structural: `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (multi-H2 fold); MEDIUM-confidence inline blockquote: `docs/device-operations/04-tenant-migration.md` (line 9 v1.2 precedent) | role-match (no direct cross-platform single-runbook sibling; combine shapes) |
| `scripts/validation/check-phase-56.mjs` | validator (file-reads-only / regex-based) | batch | `scripts/validation/check-phase-55.mjs` | exact (mirror structure verbatim per CONTEXT D-19) |

---

## Pattern Assignments

### `docs/operations/drift-migration/00-overview.md` (doc-overview, cross-platform routing hub)

**Primary analog:** `docs/operations/app-lifecycle/00-overview.md` (lines 1-218)
**Secondary analog:** `docs/operations/patch-management/00-overview.md` (lines 1-218)

#### Frontmatter literal shape (replicate verbatim — lines 1-7)

```yaml
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: cross-platform
---
```

**What changes from analog:** `last_verified` becomes Phase 56 ship date (2026-04-29 or later); `review_by` is exactly +60 days. `platform: cross-platform` is identical.

#### TOP cross-platform inline blockquote (replicate shape — lines 9-21 of app-lifecycle/00-overview.md)

```markdown
> **Platform applicability:** This guide is the cross-platform compliance drift detection
> overview hub for Windows, macOS, iOS/iPadOS, and Android — covering drift terminology
> (configuration drift / policy conflict / app install regression / profile revocation /
> jailbreak detection / OS downgrade / Play Integrity verdict change), the cross-platform
> comparison, and per-platform routing.
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md) for Intune
> Remediations + canonical script-authoring pattern.
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md) for profile-revocation
> + DDM compliance signals.
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md) for
> jailbreak / OS downgrade / Play Integrity verdict signals.
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md) for
> cross-platform tenant-to-tenant migration with MEDIUM-confidence framing.
```

**What changes from analog:** Replace "app lifecycle automation" tokens with "compliance drift detection" + DRIFT-03 6-signal terminology; add 5th bullet routing to `04-tenant-migration-runbook.md`.

#### Title H1 + intro paragraph (replicate shape — lines 23-39)

Title pattern: `# [Domain] Overview: Cross-Platform Hub`
Example: `# Compliance Drift Detection Overview: Cross-Platform Hub`

Two-paragraph intro: paragraph 1 = "This guide is the cross-platform overview for [domain] across Windows, macOS, iOS/iPadOS, and Android. It covers [terminology], the cross-platform comparison table, and routing to per-platform guides." Paragraph 2 = "For [Windows surface], see..." with all 4 cross-links inline.

#### H2 ordering + naming convention (replicate sequence)

```
## Cross-Platform Comparison       (mandatory; 4-platform comparison table)
## Drift terminology               (LOCKED H2 per V-56-10 + D-02; ≥3 cross-platform terminology tokens within ~30 lines)
## Routing to Per-Platform Guides  (link-not-copy bullet list)
## Cross-Platform Planning Considerations  (program-level concerns)
## When to Use This Overview       (optional; app-lifecycle has it, patch-management does not)
## Related Resources               (mandatory; sibling cross-links + ops-domain peers)
## External References             (mandatory; Microsoft Learn + Apple/Google authoritative URLs + ops/00-index.md cross-reference-only line)
```

**Critical note:** The `## Drift terminology` H2 is the locked literal per CONTEXT V-56-10. Patch-management uses `## Ring Terminology`, app-lifecycle uses `## App-lifecycle terminology`. Phase 56 must use `## Drift terminology` exactly (or accept any regex-pinned variant per V-56-10 prose tolerance — but lock to `## Drift terminology` for predictability).

#### Cross-Platform Comparison table shape (replicate from app-lifecycle/00-overview.md lines 53-60 OR patch-management/00-overview.md lines 49-55)

```markdown
| Concept | Windows | macOS | iOS/iPadOS | Android |
|---------|---------|-------|------------|---------|
| [signal-row-1] | [Win cell] | [macOS cell] | [iOS cell] | [Android cell] |
| ... |
```

**Required content (per V-56-15 6-signal coverage):** Rows must collectively contain all 6 literal tokens: `policy conflict`, `app install regression`, `profile revocation`, `jailbreak detection`, `OS downgrade`, `Play Integrity verdict`. Plan-author discretion: 4-row, 5-row, or 6-row table; one row per signal class is the cleanest mapping (each signal lives in its native-platform cell).

#### Related Resources + External References + ops/00-index.md cross-reference-only line (replicate from lines 197-218)

```markdown
## Related Resources

- [Windows Drift Detection](01-windows-drift-detection.md) — DRIFT-01 + DRIFT-02 fold
- [macOS Drift Detection](02-macos-drift-detection.md) — macOS profile-revocation + DDM signals
- [iOS + Android Drift Detection](03-ios-android-drift-detection.md) — iOS jailbreak + Android Play Integrity
- [Tenant Migration Runbook](04-tenant-migration-runbook.md) — Cross-platform tenant migration (MEDIUM confidence)
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling ops-domain (Phase 54)
- [App Lifecycle Automation Overview](../app-lifecycle/00-overview.md) — Sibling ops-domain (Phase 55)
- [Co-Management Overview](../co-management/00-overview.md) — Sibling ops-domain (Phase 53)

## External References

- [Microsoft Graph deviceManagement reports (Microsoft Learn)](https://...)
- [Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 56 does not amend the operations index per the Phase 59 ROADMAP entry
```

#### NEGATIVE patterns to AVOID at 00-overview (anti-duplication firewall per V-56-11)

The following literal tokens MUST NOT appear in 00-overview body prose (table rows + code blocks + markdown links are stripped before scan, per V-55-10 / V-54-29 inheritance):

```
supersedence              → belongs in app-lifecycle (different domain)
Win32ContentPrepTool      → belongs in app-lifecycle
BitLocker re-key          → belongs in 04-tenant-migration-runbook (DRIFT-04 fold)
ABM token                 → belongs in 04-tenant-migration-runbook (DRIFT-05 fold)
MGP re-binding            → belongs in 04-tenant-migration-runbook (DRIFT-06 fold)
exit 1                    → belongs in 01-windows-drift-detection (DRIFT-02 fold)
exit 0                    → belongs in 01-windows-drift-detection (DRIFT-02 fold)
Log Analytics             → belongs in 01-windows-drift-detection (DRIFT-02 fold)
Quest On Demand Migration → belongs in 04-tenant-migration-runbook (DRIFT-04 only-mention)
```

---

### `docs/operations/drift-migration/01-windows-drift-detection.md` (doc-platform, Windows; DRIFT-01+02 FOLD)

**Primary analog:** `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (lines 1-225)
**Secondary analog (multi-H2 FOLD pattern):** `docs/operations/patch-management/01-windows-wufb-rings.md` (Hotpatch H2 fold at line 104; Driver/Firmware H2 fold at line 148)

#### Frontmatter literal shape (replicate — lines 1-7 of app-lifecycle/01)

```yaml
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: Windows
---
```

#### TOP cross-platform inline blockquote (replicate shape — lines 9-14)

```markdown
> **Platform applicability:** This guide is Windows-specific (Intune Remediations detect+remediate
> script pairs + canonical script-authoring pattern). For the cross-platform overview, see
> [Drift Detection Overview](00-overview.md).
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md).
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md).
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md).
```

#### H2 ordering + naming convention (replicate FOLD pattern from app-lifecycle/01)

```
## Intune Remediations Configuration                    (DRIFT-01 PRIMARY)
   - Portal path: Devices > Manage devices > Scripts and remediations > Remediation scripts
   - Per-device status report: No issues detected / Issues fixed / Error
## Canonical script-authoring pattern {#canonical-script-authoring}   (DRIFT-02 FOLD; LOCKED H2 per V-56-14)
   - Detection script returns `exit 1`; remediation returns `exit 0`
   - Log Analytics surface for full output
## (Optional plan-author H2: Microsoft Graph exportJobs report names — per CONTEXT D-23 plan-time research)
## Related Resources
## External References
```

**Critical token discipline (per V-56-12 + V-56-13 + V-56-14):**
- Portal path literal MUST appear verbatim: `Devices > Manage devices > Scripts and remediations > Remediation scripts`
- Status report literals MUST all appear: `No issues detected`, `Issues fixed`, `Error`
- H2 literal MUST be exact: `## Canonical script-authoring pattern`
- Exit-code literals MUST appear: `exit 1` AND `exit 0`
- Log Analytics literal MUST appear: `Log Analytics`

#### Cross-link to v1.2 SSoT (replicate scope-distinction-prose pattern per D-09)

```markdown
> **Scope distinction:** This guide covers **configuration** drift via Intune Remediations
> (PowerShell/Bash detect+remediate script pairs that run on schedule). For Autopilot
> **registration** drift (profile assignment states: Not assigned / Assigning / Assigned /
> Fix pending), see [Registration Drift Detection](../../reference/drift-detection.md).
```

**Cross-link literal MUST be:** `../../reference/drift-detection.md` (relative path; per V-56-25 verbatim assertion).

#### Related Resources footer (replicate from app-lifecycle/01 lines 208-217)

```markdown
## Related Resources

- [Drift Detection Overview](00-overview.md) — Cross-platform drift detection hub
- [macOS Drift Detection](02-macos-drift-detection.md) — macOS sibling
- [iOS + Android Drift Detection](03-ios-android-drift-detection.md) — iOS/Android sibling
- [Tenant Migration Runbook](04-tenant-migration-runbook.md) — Cross-platform tenant migration
- [Registration Drift Detection](../../reference/drift-detection.md) — v1.2 SSoT — Autopilot registration drift (scope-distinct)
- [Patch & Update Management Overview](../patch-management/00-overview.md) — Sibling ops-domain (Phase 54)
```

---

### `docs/operations/drift-migration/02-macos-drift-detection.md` (doc-platform, macOS; stub-or-substantive)

**Primary analog:** `docs/operations/app-lifecycle/02-macos-pkg-dmg-pipeline.md` (lines 1-214)

#### Frontmatter (replicate — lines 1-7)

```yaml
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: macOS
---
```

#### TOP cross-platform inline blockquote (replicate shape — lines 9-15 of app-lifecycle/02)

```markdown
> **Platform applicability:** This guide is macOS-specific (profile-revocation detection + DDM
> compliance signals + Intune Settings Catalog drift). For the cross-platform overview, see
> [Drift Detection Overview](00-overview.md).
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md).
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md).
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md).
```

#### Stub-vs-substantive choice (per CONTEXT D-01 plan-author discretion)

**Routing-only stub shape (acceptable; paralleling Phase 55 4C-prime hybrid at app-lifecycle/04 lines 89-124 Zebra section):**
- Title H1 + 1-paragraph intro (~10 lines)
- H2 `## macOS Compliance Drift Signals` with operational summary (~30 lines): profile revocation when MDM trust breaks; DDM declaration verdicts; Intune Settings Catalog drift detection
- Cross-link to v1.2 macOS L2 investigation guides (cite specific file paths)
- Related Resources + External References footer

**Substantive shape (also acceptable):**
- Title H1 + intro
- H2 sections per drift signal class (profile revocation / DDM compliance / Settings Catalog drift)
- Configuration steps + screenshots descriptions
- Related Resources + External References

**Either shape satisfies V-56 file-existence + frontmatter + TOP-blockquote assertions.**

#### Anti-duplication discipline

This file MUST NOT contain DRIFT-03 cross-platform signal substance (anti-duplication firewall — those tokens belong in 00-overview only). Specifically avoid restating the cross-platform comparison table; instead link back to 00-overview for cross-platform scope.

---

### `docs/operations/drift-migration/03-ios-android-drift-detection.md` (doc-platform, multi-platform iOS+Android)

**Primary analog (combine shapes):** `docs/operations/app-lifecycle/03-ios-vpp-licensing.md` (iOS shape; lines 1-156) + `docs/operations/app-lifecycle/04-android-mgp-lifecycle.md` (Android shape with Zebra peer-H2 fold; lines 1-147)

**No direct sibling exists** for a combined iOS+Android slot in Phase 54/55. Plan-author discretion per CONTEXT D-01.

#### Frontmatter (NEW pattern — comma-string per V-54-31 / V-55-31 inheritance)

```yaml
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: iOS,Android
---
```

**Critical:** `platform: iOS,Android` is comma-string (no space after comma is acceptable per Phase 54/55 regex tolerance — see check-phase-55.mjs line 94 regex `/(cross-platform|Windows,\s*macOS,\s*iOS,\s*Android)/`). Phase 56 validator V-56-07 should accept either `iOS,Android` or `iOS, Android`. Plan-author should pick one and pin in the validator.

#### TOP cross-platform inline blockquote

```markdown
> **Platform applicability:** This guide covers iOS/iPadOS + Android compliance drift signals
> (jailbreak detection + OS downgrade for iOS; Play Integrity verdict-change for Android).
> For the cross-platform overview, see [Drift Detection Overview](00-overview.md).
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md).
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md).
> **Tenant migration:** See [Tenant Migration Runbook](04-tenant-migration-runbook.md).
```

#### H2 ordering options

**Combined-H2 shape (single-file flow):**
```
## iOS Drift Signals      (jailbreak detection via compliance policy + OS downgrade)
## Android Drift Signals  (Play Integrity MEETS_STRONG_INTEGRITY verdict-change)
   - Cross-link to Phase 54 04-android-patch-delivery.md for MEETS_STRONG_INTEGRITY substance
## Related Resources
## External References
```

**Stub shape (per CONTEXT D-01 plan-author discretion):** Operational summary + cross-link to v1.2 iOS L1/L2 + Phase 54 Play Integrity SSoT.

#### Anti-duplication discipline

MUST cross-link to (NOT duplicate) `docs/operations/patch-management/04-android-patch-delivery.md` for substantive MEETS_STRONG_INTEGRITY content (Phase 54 SSoT). Following PITFALL-7 link-not-copy.

---

### `docs/operations/drift-migration/04-tenant-migration-runbook.md` (doc-runbook, cross-platform; MEDIUM-confidence; multi-REQ FOLD)

**Primary structural analog:** `docs/operations/app-lifecycle/01-windows-win32-msix-scale.md` (multi-H2 fold at lines 30, 80, 154 — Supersedence / Dependency Graphs / ContentPrepTool Packaging)
**MEDIUM-confidence inline blockquote analog:** `docs/device-operations/04-tenant-migration.md` line 9 v1.2 precedent (`> **Version gate:** Tenant migration is not a formally supported Intune scenario — this is a best-effort process documented from official Microsoft support guidance. Microsoft does not provide automated tooling for tenant-to-tenant device migration. Test the process in a non-production environment before executing at scale.`)
**Frontmatter `confidence:` field analog:** No prior file in repo carries `confidence: MEDIUM` frontmatter — this is a NEW field introduced in Phase 56 per CONTEXT D-16. Keep field name lowercase `confidence:`; value uppercase `MEDIUM`.

#### Frontmatter literal shape (NEW field added per D-16)

```yaml
---
last_verified: 2026-04-29
review_by: 2026-06-28
applies_to: all
audience: admin
platform: cross-platform
confidence: MEDIUM
---
```

**Critical:** `confidence: MEDIUM` is the new field. Validator V-56-08 asserts presence on this file ONLY (other 4 Phase 56 files do NOT carry this field).

#### TOP blockquote ORDERING (LOCKED per CONTEXT D-11 + D-16)

Two consecutive blockquotes after frontmatter; ORDER MATTERS:

```markdown
> **Platform applicability:** This guide is the cross-platform tenant-to-tenant migration
> runbook covering Windows / macOS / iOS / Android plus a folded cross-platform encryption-drift
> section. For drift detection (separate scope), see [Drift Detection Overview](00-overview.md).
> **Windows:** See [Windows Drift Detection](01-windows-drift-detection.md).
> **macOS:** See [macOS Drift Detection](02-macos-drift-detection.md).
> **iOS/Android:** See [iOS + Android Drift Detection](03-ios-android-drift-detection.md).

> ⚠️ **MEDIUM confidence** — Tenant migration is not a formally supported Intune scenario.
> Microsoft does not provide automated tooling for tenant-to-tenant device migration. Test the
> process in a non-production environment before executing at scale.
```

**Token discipline (per V-56-24):**
- The MEDIUM-confidence blockquote MUST start with `> ⚠️ **MEDIUM confidence**` (warning shape, NOT community-pattern shape).
- DO NOT use `> 📋 Community pattern — MEDIUM confidence` (that token is APP-05-specific from app-lifecycle/02 line 165; reserved for Installomator/Intuneomator-style community-OSS adjacency).
- Both blockquotes must be within the first 50 lines of body (post-frontmatter) per V-56-27.

#### H2 ordering + naming convention (LOCKED per CONTEXT D-04 — 4 platform sections + DRIFT-07 fold)

```
## Windows tenant migration                    (DRIFT-04 PRIMARY)
   - 3 BitLocker re-key options enumerated NEUTRALLY (no Microsoft preference)
   - Option (b) decrypt → re-encrypt carries dedicated > ⚠️ Data-risk window callout
   - Autopilot deregistration (source) + re-registration (target)
   - Post-migration BitLocker recovery key escrow validation
   - Cross-link to v1.2 docs/device-operations/04-tenant-migration.md (Windows hardware-hash deregistration SSoT)
## macOS / iOS tenant migration                (DRIFT-05 FOLD; or split into 2 H2s per D-23 plan-author discretion)
   - ABM token re-issue (cannot transfer; release Tenant A → re-assign Tenant B)
   - In-use devices require wipe + re-enrollment
   - ADE Await-Configuration behavior callout
## Android tenant migration                    (DRIFT-06 FOLD)
   - MGP re-binding sequence: disconnect → bind new → re-approve → re-provision
   - Per-ownership-mode re-provisioning: factory reset (corporate) / work profile re-creation (BYOD)
   - ZT portal re-upload with target credentials
## Cross-platform encryption drift             (DRIFT-07 FOLD; LOCKED H2 LITERAL per V-56-22)
   - BitLocker (Windows; key escrow targeting risk)
   - FileVault (macOS; escrow not updated post-re-enrollment)
   - iOS device-level encryption (no MDM management beyond compliance check)
   - Android dm-crypt variance (LUKS not available; AOSP variance)
## Related Resources
## External References
```

#### DRIFT-04 BitLocker 3-option enumeration shape (CONTEXT D-05)

Suggested enumeration (order is plan-author discretion per CONTEXT — REQ-neutral):

```markdown
### Option (a): Source-tenant escrow → target Entra via PowerShell scheduled-task

[Prose describing PowerShell scheduled-task pattern that re-escrows BitLocker keys to target tenant Entra]

### Option (b): Decrypt → re-encrypt

[Prose]

> ⚠️ **Data-risk window** — Decrypting then re-encrypting creates a window during which the
> device disk is unencrypted. Plan execution to minimize the window (typically attended,
> single-device sessions); avoid this option for fleet-wide migrations.

### Option (c): Third-party tool

[Prose] e.g., Quest On Demand Migration. [DO NOT enumerate alternative third-party tools per CONTEXT D-13.]
```

**Token discipline (per V-56-16 + ROADMAP SC#3):**
- ALL 3 option literals must appear: `source-tenant escrow`, `decrypt`, `re-encrypt`, AND (`Quest On Demand Migration` OR `third-party tool`)
- The `> ⚠️ Data-risk window` callout must be within ~10 lines of option (b) anchor (V-56-NN per CONTEXT D-12)
- `Quest On Demand Migration` mentioned EXACTLY ONCE (per CONTEXT D-13 + scope-creep risk per F-4C-01)
- Order is neutral — no Microsoft-recommended preference language

#### DRIFT-05 + DRIFT-06 + DRIFT-07 token discipline (per V-56-18..23)

| Section | Required literal tokens |
|---------|-------------------------|
| `## macOS / iOS tenant migration` | `ABM token`, `release`, `re-assign`, `Await-Configuration`, `wipe`, `re-enrollment` |
| `## Android tenant migration` | `disconnect`, `bind new`, `re-approve`, `re-provision`, `factory reset`, `work profile re-creation`, `ZT portal re-upload` |
| `## Cross-platform encryption drift` | `BitLocker`, `FileVault`, (`iOS device-level` OR `iOS encryption`), `dm-crypt` |

#### Cross-link to v1.2 SSoT (replicate scope-overlapping prose pattern per D-09)

```markdown
> **Scope:** The Windows tenant migration H2 below covers BitLocker re-key options (Phase 56
> net-new). For Windows hardware-hash deregistration / re-registration step-by-step procedure
> with batch-size + timing constraints, see [Tenant-to-Tenant Device Migration](../../device-operations/04-tenant-migration.md)
> (v1.2 SSoT preserved; Windows-only).
```

**Cross-link literal MUST be:** `../../device-operations/04-tenant-migration.md` (per V-56-26 verbatim).

#### NEGATIVE patterns to AVOID

- DO NOT use `<details>` HTML disclosures (CONTEXT D-04 rejected option 2D per F-2D-04 confirmed defect — PR-diff reviewability + SharePoint export risk; H2 sectioning preferred)
- DO NOT split DRIFT-07 into a sibling `05-cross-platform-encryption-drift.md` file (V-56-30 NEGATIVE regression-guard; DRIFT-07 MUST be folded inside 04-runbook per ROADMAP SC#5)
- DO NOT enumerate alternative third-party tools beyond Quest (CONTEXT D-13 + F-4C-01 scope-creep)
- DO NOT inject Microsoft preference language for any of 3 BitLocker options (REQ-neutral per CONTEXT D-11 + F-4B-01 reject)
- DO NOT use `> 📋 Community pattern — MEDIUM confidence` token (that's APP-05-specific from Phase 55)

---

### `scripts/validation/check-phase-56.mjs` (validator)

**Primary analog:** `scripts/validation/check-phase-55.mjs` (lines 1-613)
**Secondary analog:** `scripts/validation/check-phase-54.mjs` (lines 1-560+)

#### File header (replicate verbatim — lines 1-12 of check-phase-55.mjs with version updates)

```javascript
#!/usr/bin/env node
// Phase 56 static validation harness
// Source of truth: .planning/phases/56-drift-detection-tenant-migration/56-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 28-32 checks (V-56-01 through V-56-32)
// Lineage: Phase 48 D-25 (validator-as-deliverable) → Phase 49 D-26 → Phase 50 D-25
//          → Phase 51 D-20 → Phase 52 D-11 → Phase 53 D-11 → Phase 54 D-17/D-18
//          → Phase 55 D-17/D-18 → Phase 56 D-18/D-19

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

#### File path constants block (replicate shape — check-phase-55.mjs lines 23-35)

```javascript
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}

// D-21: Pinned anchor strings — same-commit validator update required on any rename.
const OV   = "docs/operations/drift-migration/00-overview.md";
const WIN  = "docs/operations/drift-migration/01-windows-drift-detection.md";
const MAC  = "docs/operations/drift-migration/02-macos-drift-detection.md";
const IOS_AND_ = "docs/operations/drift-migration/03-ios-android-drift-detection.md";
const RUNBOOK = "docs/operations/drift-migration/04-tenant-migration-runbook.md";
const V12_DRIFT_DETECTION = "docs/reference/drift-detection.md";
const V12_TENANT_MIG = "docs/device-operations/04-tenant-migration.md";
const OPS_INDEX = "docs/operations/00-index.md";
const VAL  = "scripts/validation/check-phase-56.mjs";

const DRIFT_FILES = [OV, WIN, MAC, IOS_AND_, RUNBOOK];
```

#### Check structure (replicate object-array pattern — check-phase-55.mjs lines 37-585)

Each check is `{ id: N, name: "V-56-NN: <description>", run() { ... return { pass: bool, detail: str }; } }`. Use the existing helper `readFile()` for all file reads.

#### Specific check templates to copy from check-phase-55.mjs

| Phase 56 Check | Mirror Phase 55 Check (line ref) | Adapt: |
|----------------|----------------------------------|--------|
| V-56-01..05 file existence | V-55-01..05 (lines 39-78) | Update file path constants only |
| V-56-06 self-reference | V-55-06 (lines 80-86) | `check-phase-56.mjs` |
| V-56-07 frontmatter local contract | V-55-07 (lines 89-123) | Update `expectedPlatform` map: `OV`=`cross-platform`, `WIN`=`Windows`, `MAC`=`macOS`, `IOS_AND_`=`iOS,\s*Android` (multi-platform regex), `RUNBOOK`=`cross-platform` |
| V-56-08 MEDIUM-confidence frontmatter (NEW) | (no Phase 55 analog) | New check: assert `RUNBOOK` frontmatter contains `^confidence:\s*MEDIUM\s*$` (multiline regex on frontmatter block) |
| V-56-09 4-platform comparison table | V-55-08 (lines 127-143) | Apply to `OV` |
| V-56-10 `## Drift terminology` H2 | V-55-09 (lines 145-163) | H2 literal `^## Drift terminology(\s+\{#[a-z0-9-]+\})?\s*$`; ≥3 cross-platform terminology tokens within ~30 lines |
| V-56-11 anti-scope-creep regression-guard | V-55-10 (lines 165-184) | Forbidden tokens: `supersedence`, `Win32ContentPrepTool`, `BitLocker re-key`, `ABM token`, `MGP re-binding`, `exit 1`, `exit 0`, `Log Analytics`, `Quest On Demand Migration` |
| V-56-12 DRIFT-01 portal path | V-55-11 (lines 188-202) shape; literal-match Phase 54 V-54-09 (lines 144-159) shape | Literal: `Devices > Manage devices > Scripts and remediations > Remediation scripts` |
| V-56-13 DRIFT-01 status report literals | (literal-token AND-conjunction; Phase 54 V-54-25 lines 405-415 shape) | All 3 literals: `No issues detected` AND `Issues fixed` AND `Error` |
| V-56-14 DRIFT-02 canonical script-authoring H2 + tokens | V-55-14 (lines 250-262) shape | H2 literal `^## Canonical script-authoring pattern`; tokens `exit 1` AND `exit 0` AND `Log Analytics` |
| V-56-15 DRIFT-03 cross-platform 6-signal coverage | V-55-09 (lines 145-163) shape | All 6 tokens in `OV` body: `policy conflict`, `app install regression`, `profile revocation`, `jailbreak detection`, `OS downgrade`, `Play Integrity verdict` |
| V-56-16 DRIFT-04 BitLocker 3 options | (literal-token AND-conjunction) | `source-tenant escrow` AND `decrypt` AND `re-encrypt` AND (`Quest On Demand Migration` OR `third-party tool`) in `RUNBOOK` |
| V-56-17 DRIFT-04 deregistration + escrow validation | (literal-AND) | `deregistration` AND `re-registration` AND (`escrow validation` OR `escrow verification`) in `RUNBOOK` |
| V-56-18 DRIFT-05 ABM token + Await-Configuration | (literal-AND) | `ABM token` AND `release` AND `re-assign` AND `Await-Configuration` in `RUNBOOK` |
| V-56-19 DRIFT-05 wipe + re-enrollment | (literal-AND, scoped to macOS/iOS H2) | `wipe` AND `re-enrollment` within macOS/iOS H2 scope |
| V-56-20 DRIFT-06 MGP re-binding sequence | (literal-AND) | `disconnect` AND `bind new` AND `re-approve` AND `re-provision` in `RUNBOOK` |
| V-56-21 DRIFT-06 per-ownership-mode | (literal-AND, scoped to Android H2) | `factory reset` AND `work profile re-creation` AND `ZT portal re-upload` within Android H2 scope |
| V-56-22 DRIFT-07 fold H2 literal pin | V-55-23 (lines 382-394) shape | H2 literal `^## Cross-platform encryption drift` in `RUNBOOK` |
| V-56-23 DRIFT-07 4-platform encryption coverage | V-55-16 (lines 277-288) shape | `BitLocker` AND `FileVault` AND (`iOS device-level` OR `iOS encryption`) AND `dm-crypt` within DRIFT-07 H2 scope |
| V-56-24 MEDIUM-confidence inline blockquote | V-55-17 (lines 290-307) shape | Blockquote literal `>\s*\u26a0\ufe0f\s*\*\*MEDIUM confidence\*\*` in `RUNBOOK` first 50 lines |
| V-56-25 cross-link to v1.2 drift-detection.md | V-55-21 (lines 351-362) shape | Literal `../../reference/drift-detection.md` in `WIN`; verify target file exists |
| V-56-26 cross-link to v1.2 tenant-migration.md | V-55-24 (lines 396-407) shape | Literal `../../device-operations/04-tenant-migration.md` in `RUNBOOK`; verify target file exists |
| V-56-27 cross-platform inline blockquote at TOP | V-55-26 (lines 429-444) | All 5 files: `> **Platform applicability:**` within first 50 body lines |
| V-56-28 bare `> **Platform:**` NEGATIVE regression-guard | V-55-27 (lines 446-490) **VERBATIM COPY** | Recursive walk over `docs/` + `.planning/` for line-start `> **Platform:**` (no qualifier word) |
| V-56-29 ops/00-index.md NOT amended | V-55-28 (lines 493-502) shape | NEGATIVE: `OPS_INDEX` does NOT contain `## Drift Detection` or `## Tenant Migration` H2 |
| V-56-30 NO sibling 05-cross-platform-encryption-drift.md | (NEW NEGATIVE; V-55-28-style shape) | `existsSync('docs/operations/drift-migration/05-cross-platform-encryption-drift.md')` returns false |
| V-56-31 v1.2 anti-deletion regression-guard | (NEW NEGATIVE) | `existsSync(V12_DRIFT_DETECTION)` AND `existsSync(V12_TENANT_MIG)` both true |
| V-56-32 TBD/TODO scan | V-55-30 (lines 518-537) **VERBATIM COPY** | Apply to 5 `DRIFT_FILES` |

#### Footer summary block (replicate verbatim — check-phase-55.mjs lines 587-613)

```javascript
const LABEL_WIDTH = 64;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + " ";
  return s + " " + ".".repeat(LABEL_WIDTH - s.length) + " ";
}

let passed = 0, failed = 0, skipped = 0;

for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: "Unexpected error: " + e.message }; }
  const prefix = "[" + check.id + "/" + checks.length + "] " + check.name;
  if (result.skipped) {
    skipped++;
    process.stdout.write(padLabel(prefix) + "SKIPPED -- " + (result.detail || "") + "\n");
  } else if (result.pass) {
    passed++;
    process.stdout.write(padLabel(prefix) + "PASS" + (VERBOSE && result.detail ? " -- " + result.detail : "") + "\n");
  } else {
    failed++;
    process.stdout.write(padLabel(prefix) + "FAIL -- " + result.detail + "\n");
  }
}

process.stdout.write("\nSummary: " + passed + " passed, " + failed + " failed, " + skipped + " skipped\n");
process.exit(failed > 0 ? 1 : 0);
```

#### Atomic-coupling cross-check (V-55-32 lineage; OPTIONAL but RECOMMENDED for V-56-32)

Phase 55 V-55-32 (check-phase-55.mjs lines 565-584) re-runs the cross-link conjunction (V-55-21 + V-55-24 + V-55-29) as a runtime atomicity-coupling. Phase 56 may include an analogous V-56-32 OR use V-56-32 for the TBD scan (see CONTEXT D-18 line 120 — V-56-32 is TBD scan). If plan-author wants the atomicity-coupling check, add as V-56-33 or fold into V-56-32 with TBD-scan-PLUS-cross-link-conjunction shape.

---

## Shared Patterns

### Authentication / Auth (N/A)
Documentation phase — no auth surface.

### Frontmatter Local Contract (apply to all 5 content files)
**Source:** Every file in `docs/operations/{co-management,patch-management,app-lifecycle}/*.md` (Phase 53/54/55 inheritance)

```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD     # exactly +60 days from last_verified
applies_to: all
audience: admin
platform: <single-token-or-comma-string>
---
```

**Plus on `04-tenant-migration-runbook.md` only:** `confidence: MEDIUM` (NEW field per CONTEXT D-16).

### TOP Cross-Platform Inline Blockquote (apply to all 5 content files)
**Source:** Every Phase 53/54/55 ops file at line ~9
**Token (LOCKED):** `> **Platform applicability:**` (verbatim — bare `> **Platform:**` is forbidden per V-56-28 NEGATIVE regression-guard)
**Position:** Within first 50 lines of body (post-frontmatter) per V-56-27.

### Cross-Link Discipline (apply to per-platform files + runbook)
**Source:** Phase 53/54/55 footer pattern + scope-distinction prose

- Internal cross-links use relative paths: `00-overview.md`, `../patch-management/...`, `../../reference/...`, `../../device-operations/...`
- v1.2 SSoT cross-links use scope-distinction prose (`This guide covers X via Y; for the related Z scope, see [v1.2 doc]`) per CONTEXT D-09
- ops/00-index.md cross-reference-only line in External References footer: `[Operations Documentation Index](../00-index.md) — Cross-reference only; Phase 56 does not amend the operations index per the Phase 59 ROADMAP entry`

### H2 Anchor Convention
**Source:** Phase 54/55 H2 anchor IDs (e.g., `## Hotpatch {#hotpatch}`, `## ContentPrepTool Packaging {#contentpreptool-packaging}`)
- Optional but RECOMMENDED on H2 sections that are validator-pinned (LOCKED H2 literals get anchors so cross-links remain stable)
- Validator regexes already accept `^## H2 Name(\s+\{#[a-z0-9-]+\})?\s*$` shape (see check-phase-55.mjs:149, :192, :223)

### Validator Self-Reference + Lineage Comment Header
**Source:** check-phase-55.mjs lines 1-8
- Every Phase NN validator opens with `#!/usr/bin/env node`, source-of-truth comment, NO-SHELL declaration, total-checks count, and lineage comment chain (Phase 48 → 49 → 50 → 51 → 52 → 53 → 54 → 55 → 56)

### Anti-Duplication Firewall (apply to 00-overview)
**Source:** check-phase-55.mjs V-55-10 (lines 165-184) + check-phase-54.mjs V-54-29 (lines 493-510)
- Body-prose-only check (strip frontmatter + table rows + code blocks + markdown links before scan)
- Negative literal-token list specific to the domain (Phase 56 list above in 00-overview pattern assignment)

### TBD/TODO/PLACEHOLDER Scan
**Source:** check-phase-55.mjs V-55-30 (lines 518-537) + check-phase-54.mjs V-54-30 (lines 513-530)
- Strip code blocks + Version History + Changelog sections before scan
- Banned regex `\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b`

---

## NEGATIVE Patterns to AVOID (Anti-Patterns Catalog)

### Bare `> **Platform:**` (CRITICAL — corpus-wide regression-guard)
**Source:** V-55-27 (check-phase-55.mjs:446-490) + V-54-27 (check-phase-54.mjs:436-481)
**Rule:** Zero files in `docs/` + `.planning/` may contain line-start `> **Platform:**` (no qualifier word). Always use the qualified form `> **Platform applicability:**`. Lexicon-family preservation per CONTEXT D-14.

### `> 📋 Community pattern — MEDIUM confidence` (RESERVED token)
**Source:** check-phase-55.mjs V-55-17 (lines 290-307) — APP-05-specific
**Rule:** Phase 56 MUST NOT use this token. The `> 📋` community-pattern shape is reserved for community-OSS adjacency callouts (Installomator/Intuneomator pattern). Phase 56 MEDIUM-confidence uses `> ⚠️ **MEDIUM confidence**` (warning shape) per CONTEXT D-11.

### Sibling `05-cross-platform-encryption-drift.md` file (FOLD discipline)
**Source:** CONTEXT D-04 (rejects 2B / 2C); V-56-30 NEGATIVE regression-guard
**Rule:** DRIFT-07 cross-platform encryption drift MUST be folded into `04-tenant-migration-runbook.md` as `## Cross-platform encryption drift` H2. NO sibling file at `docs/operations/drift-migration/05-cross-platform-encryption-drift.md`.

### Modification of v1.2 cross-link target docs (additive-only contract)
**Source:** CONTEXT D-09 + D-10; V-56-31 anti-deletion regression-guard
**Rule:** Phase 56 commit MUST NOT modify `docs/reference/drift-detection.md` or `docs/device-operations/04-tenant-migration.md`. ZERO content edits to v1.2 docs in Phase 56 commit. Cross-reference only.

### Amendment of `docs/operations/00-index.md` (DPO contract)
**Source:** DPO-Phase53-01 + DPO-Phase54-02 + DPO-Phase55-01; V-56-29 NEGATIVE regression-guard
**Rule:** Phase 56 MUST NOT add `## Drift Detection` or `## Tenant Migration` H2 to operations/00-index.md. Phase 59 (Hub Navigation Integration) owns the addition in its own commit.

### `<details>` HTML disclosures in 04-runbook (PR-diff reviewability)
**Source:** CONTEXT D-04 rejects 2D per F-2D-04 confirmed defect
**Rule:** DO NOT use `<details><summary>...` HTML collapsibles in `04-tenant-migration-runbook.md`. Use H2 sectioning instead. (Note: `<details>` exists in 8 v1.2 files in admin-setup-apv1/ + lifecycle-apv2/ — this is a Phase-56-local rule, not a corpus-wide regression-guard.)

### Microsoft preference language in BitLocker 3-option enumeration
**Source:** CONTEXT D-11 + REQ DRIFT-04 neutrality; F-4B-01 reject (HIGH severity)
**Rule:** DO NOT inject "recommended" or "Microsoft prefers" language for any of the 3 BitLocker re-key options. REQ DRIFT-04 line 75 enumerates 3 approaches neutrally; Phase 56 must preserve neutrality.

### Alternative third-party tool enumeration beyond Quest
**Source:** CONTEXT D-13; F-4C-01 reject (MED severity, scope-creep)
**Rule:** Mention `Quest On Demand Migration` EXACTLY ONCE. DO NOT enumerate competing third-party tools (e.g., BitTitan, Quadrotech, etc.). Plain prose: "third-party tool (e.g., Quest On Demand Migration)".

### `Microsoft Graph exportJobs` substantive content in 00-overview
**Source:** CONTEXT V-56-11 anti-scope-creep firewall + CONTEXT D-23 plan-author discretion
**Rule:** If `exportJobs` is documented at all, it belongs in `01-windows-drift-detection.md` as an L2-facing depth callout. DO NOT substantively document Graph API SDK / Power BI integration anywhere in Phase 56 (deferred per CONTEXT line 253).

### Using Phase 54 three-layer hard-deadline pattern for MEDIUM-confidence
**Source:** CONTEXT D-17; Phase 54 V-54-14..16 three-layer pattern for `[HARD-DEADLINE]` items
**Rule:** Phase 56 tenant migration is MEDIUM-confidence (different signal class). DO NOT replicate three-layer pattern (table cell + adjacent blockquote + per-occurrence inline reminder). Use dual-surface only (frontmatter `confidence: MEDIUM` + inline `> ⚠️ **MEDIUM confidence**` blockquote at TOP).

---

## No Analog Found

| File | Role | Reason | Workaround |
|------|------|--------|-----------|
| `03-ios-android-drift-detection.md` (multi-platform iOS+Android slot) | doc-platform combined | Phase 54/55 used separate iOS + Android slots; no precedent for combined-slot file | Combine shape from `03-ios-vpp-licensing.md` (iOS H2 shape) + `04-android-mgp-lifecycle.md` (Android H2 shape with Zebra peer-H2 fold); use comma-string `platform: iOS,Android` per V-54-31/V-55-31 inheritance |
| `04-tenant-migration-runbook.md` (cross-platform single runbook) | doc-runbook | Phase 54/55 didn't have a single multi-platform runbook (each platform had its own file) | Use multi-H2 fold pattern from `01-windows-win32-msix-scale.md` (3 H2s folded inside) extended to 4 platform H2s + 1 cross-cutting H2 (`## Cross-platform encryption drift` for DRIFT-07 fold) |
| `confidence: MEDIUM` frontmatter field | doc-frontmatter | No prior repo file carries this field | Introduce as new field; lowercase key, uppercase value; pin in V-56-08 as repo-first occurrence; forward-compatible with future Phase 60+ C-check expansion per CONTEXT D-16 |

---

## Metadata

**Analog search scope:**
- `docs/operations/app-lifecycle/` — Phase 55 (most-direct precedent; same Wave B sibling)
- `docs/operations/patch-management/` — Phase 54 (Wave B sibling)
- `docs/operations/co-management/` — Phase 53 (lineage source for cross-platform inline blockquote + DPO-Phase53-01 ops/00-index.md hotspot ownership)
- `docs/operations/00-index.md` — DPO contract verification
- `docs/reference/drift-detection.md` — v1.2 cross-link target (registration drift; scope-distinct)
- `docs/device-operations/04-tenant-migration.md` — v1.2 cross-link target (Windows tenant migration; scope-overlapping; line 9 MEDIUM-confidence inline blockquote precedent)
- `scripts/validation/check-phase-55.mjs` — Phase 55 validator (mirror exactly per CONTEXT D-19)
- `scripts/validation/check-phase-54.mjs` — Phase 54 validator (NEGATIVE assertion patterns)

**Files scanned:** 13 markdown content files + 2 validator .mjs files

**Pattern extraction date:** 2026-04-29
