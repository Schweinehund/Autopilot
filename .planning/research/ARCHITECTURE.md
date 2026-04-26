# Architecture Patterns: v1.5 Integration Analysis

**Domain:** Microsoft Intune provisioning documentation suite (5th platform + operational depth)
**Researched:** 2026-04-26
**Source basis:** Existing codebase inspection — PROJECT.md, STATE.md, RETROSPECTIVE.md, docs/index.md, docs/admin-setup-android/00-overview.md, docs/reference/android-capability-matrix.md, scripts/validation/v1.4.1-milestone-audit.mjs, plus directory structure enumeration.

---

## Recommended Architecture

v1.5 extends the existing per-platform tree with a new `docs/admin-setup-linux/` branch parallel to all existing `admin-setup-{platform}/` directories, adds a hybrid operations layer at `docs/operations/` (Option C — see Pillar 3 decision below), closes two v1.4 nav-unification deferrals via targeted modifications to existing hub files, and extends the audit harness via Path A copy lineage.

### Existing Tree Shape (carry-forward, DO NOT modify structure)

```
docs/
  _glossary.md                      (Windows)
  _glossary-macos.md                (Apple — macOS + iOS shared)
  _glossary-android.md              (Android Enterprise)
  admin-setup-{apv1,apv2,macos,ios,android}/  (per-platform admin guides)
  android-lifecycle/, ios-lifecycle/, macos-lifecycle/, lifecycle/, lifecycle-apv2/
  l1-runbooks/00-index.md + 01..29-{platform}-*.md
  l2-runbooks/00-index.md + 01..23-{platform}-*.md
  reference/  (capability matrices + shared references)
  decision-trees/  (triage flowcharts per platform)
  index.md, common-issues.md, quick-ref-l1.md, quick-ref-l2.md  (hub files)
```

### v1.5 Additions and Modifications

```
docs/
  _glossary-linux.md                          NEW — 5th platform glossary
  linux-lifecycle/                            NEW — enrollment overview + prerequisites
    00-enrollment-overview.md
    01-linux-prerequisites.md
  admin-setup-linux/                          NEW — parallel to admin-setup-android/
    00-overview.md
    01-intune-linux-agent.md
    02-enrollment-profile.md
    03-compliance-policy.md
    04-app-delivery.md
    05-conditional-access.md
  reference/
    linux-capability-matrix.md               NEW — 5th capability matrix
    4-platform-capability-comparison.md      NEW — DEFER-08 deliverable
  l1-runbooks/
    30-linux-enrollment-failed.md            NEW
    31-linux-compliance-non-compliant.md     NEW
    32-linux-ca-blocking-web-access.md       NEW
    33-linux-agent-service-failure.md        NEW
  l2-runbooks/
    24-linux-log-collection.md               NEW
    25-linux-agent-investigation.md          NEW
  decision-trees/
    09-linux-triage.md                       NEW
  operations/                                NEW top-level dir (Option C, see below)
    00-index.md
    co-management/
      00-overview.md                         (Windows-led; macOS/iOS/Android contextual notes)
      01-windows-tenant-attach.md
      02-windows-workload-sliders.md
      03-cocmgmt-migration-paths.md
    patch-management/
      00-overview.md
      01-windows-wufb-rings.md
      02-macos-update-enforcement.md
      03-ios-update-lifecycle.md
      04-android-patch-delivery.md
    app-lifecycle/
      00-overview.md
      01-windows-win32-msix-scale.md
      02-macos-pkg-dmg-pipeline.md
      03-ios-vpp-licensing.md
      04-android-mgp-lifecycle.md
    drift-migration/
      00-overview.md
      01-windows-drift-detection.md
      02-macos-ios-drift-detection.md
      03-android-drift-detection.md
      04-tenant-migration-runbook.md
  index.md                                   MODIFIED — Linux H2 + ops-depth section
  common-issues.md                           MODIFIED — Android symptom routing (DEFER-07)
  quick-ref-l1.md                            MODIFIED — Android + Linux sections
  quick-ref-l2.md                            MODIFIED — Android + Linux sections
  _glossary-android.md                       MODIFIED — Linux see-also reciprocal
  _glossary-macos.md                         MODIFIED — Linux see-also reciprocal
  _glossary.md                               MODIFIED — Linux see-also reciprocal
  reference/android-capability-matrix.md    MODIFIED — remove deferred-4-platform footer stub
  reference/macos-capability-matrix.md      MODIFIED — cross-link to 4-platform-comparison
  reference/ios-capability-matrix.md        MODIFIED — cross-link to 4-platform-comparison
scripts/validation/
  v1.5-milestone-audit.mjs                  NEW (Path A copy of v1.4.1)
  v1.5-audit-allowlist.json                 NEW (sidecar for v1.5 harness)
```

---

## Component Boundaries

| Component | Responsibility | New in v1.5 | Communicates With |
|-----------|---------------|-------------|-------------------|
| `docs/admin-setup-linux/` | Linux Intune client admin setup guides (6 files) | YES — new dir | `linux-lifecycle/`, `_glossary-linux.md`, `linux-capability-matrix.md`, hub files |
| `docs/linux-lifecycle/` | Linux enrollment overview + prerequisites | YES — new dir | `admin-setup-linux/`, L1/L2 runbooks, glossary |
| `docs/_glossary-linux.md` | Linux-specific Intune terminology with cross-platform callouts | YES — new file | All 3 existing glossaries (reciprocal see-also) |
| `docs/reference/linux-capability-matrix.md` | Feature surface comparison: Linux vs Windows/macOS/iOS/Android | YES — new file | `4-platform-capability-comparison.md`, `admin-setup-linux/`, L1/L2 runbooks |
| `docs/l1-runbooks/30..33-linux-*.md` | L1 scenario runbooks for Linux (4 files) | YES — new files | `00-index.md` L1 Linux section, decision tree 09 |
| `docs/l2-runbooks/24..25-linux-*.md` | L2 investigation runbooks for Linux (2 files) | YES — new files | `00-index.md` L2 Linux section |
| `docs/decision-trees/09-linux-triage.md` | Linux Mermaid triage decision tree | YES — new file | L1 runbooks 30-33, `linux-lifecycle/` |
| `docs/operations/` | Cross-platform operational depth (4 domains × 4-5 platforms) | YES — new dir | All platform admin-setup dirs, `reference/`, hub files |
| `docs/reference/4-platform-capability-comparison.md` | 4-platform side-by-side matrix (DEFER-08) | YES — new file | All 4 existing capability matrices (cross-link, not duplicate) |
| `docs/index.md` (MODIFIED) | Navigation hub — add Linux H2 + ops-depth section | MODIFIED | All new Linux files + ops files |
| `docs/common-issues.md` (MODIFIED) | Android symptom routing (DEFER-07) | MODIFIED | Android L1 runbooks 22-29 |
| `docs/quick-ref-l1.md`, `quick-ref-l2.md` (MODIFIED) | Android + Linux quick-ref sections (DEFER-07 + Linux) | MODIFIED | L1/L2 runbooks |
| `scripts/validation/v1.5-milestone-audit.mjs` | Audit harness — Linux + ops-domain checks | YES — new file | v1.4.1 harness lineage (Path A copy) |

---

## Pillar 2 — Linux Integration

### Linux Admin Docs Location

`docs/admin-setup-linux/` is the correct home. This is a direct parallel to `admin-setup-android/`, `admin-setup-macos/`, `admin-setup-ios/`, `admin-setup-apv1/`, `admin-setup-apv2/`. The convention is per-platform, not per-enrollment-mode within a platform. Six files match the established admin-guide depth for a narrower platform (Linux has a smaller Intune surface than Android):

```
docs/admin-setup-linux/
  00-overview.md            — enrollment-path selector (simpler than Android's 6-branch Mermaid)
  01-intune-linux-agent.md  — deb package installation, daemon service setup, agent lifecycle
  02-enrollment-profile.md  — enrollment profile creation in Intune admin center
  03-compliance-policy.md   — supported compliance settings (OS version, password, encryption)
  04-app-delivery.md        — script-based app delivery (no MSI/MSIX/.pkg; shell scripts via Intune)
  05-conditional-access.md  — web-app CA only (no native CA on Linux per known scope constraint)
```

A `linux-lifecycle/` directory with `00-enrollment-overview.md` + `01-linux-prerequisites.md` precedes the admin guides (mirrors `ios-lifecycle/`, `android-lifecycle/`).

### Linux Capability Matrix Structure

`docs/reference/linux-capability-matrix.md` follows the established pattern (platform vs feature rows across 5 domains: Enrollment, Configuration, App Deployment, Compliance, Software Updates) but with a narrower column count. Because Linux is one platform (not a multi-mode platform like Android), the matrix is effectively Linux vs existing platforms — structured as a 5-platform comparison (Linux | Windows | macOS | iOS | Android) OR as a Linux-focused bilateral (Linux column + "Windows/macOS/iOS/Android" combined reference column) to avoid duplication with `4-platform-capability-comparison.md`.

Recommended shape: **Linux-centric bilateral** (Linux column + cross-reference "see 4-platform comparison" pointer for other platforms). This keeps the matrix from becoming a duplicate of DEFER-08. The `4-platform-capability-comparison.md` is the canonical cross-platform surface; `linux-capability-matrix.md` answers "what can Intune do on Linux?" without re-deriving the full 4-platform matrix.

Key cells to call out explicitly (Linux surface is distinctly narrower):
- No native Conditional Access — web-app CA only via browser certificate assertion; no device compliance CA gate for native apps
- No zero-touch enrollment analog — manual deb package install + user-initiated enrollment via Company Portal
- Script-based app delivery only — no Win32/MSIX/.pkg equivalent; Intune delivers shell scripts as the "app" mechanism
- Compliance surface limited — no BitLocker equivalent (VeraCrypt/dm-crypt is out-of-scope); password policy + OS version + disk encryption status are the primary axes
- No equivalent of APNs/ADE/ABM/MGP — Linux enrollment is single-portal (Intune admin center only)

Cross-Platform Equivalences section (following Android capability matrix precedent) should contain 2-3 explicitly attributed pairs:
- `intune-portal` service (Linux) ≈ macOS LaunchDaemon for agent supervision (both are OS-managed background services the MDM agent registers with; both can be inspected/restarted via OS service management tools)
- Linux compliance check cycle ≈ iOS MDM check-in cycle (both are agent-polled; neither uses a Windows-style scheduled task)
- No Linux equivalent of ADE/APv1/ZTE zero-touch — enrollment is always user-initiated from the device

### Linux Glossary Reciprocal See-Also Pattern

`docs/_glossary-linux.md` should add a banner pointing to all 3 existing glossaries (same pattern as `_glossary-android.md` and `_glossary-macos.md`). The existing glossaries need reciprocal back-links added:

- `_glossary.md` (Windows): add "For Linux terminology, see `_glossary-linux.md`" to the platform-coverage banner
- `_glossary-macos.md` (Apple): add Linux see-also
- `_glossary-android.md` (Android): add Linux see-also

This is a 4-file retrofit (1 new + 3 existing). The Android glossary already has a 3-platform see-also format; adding Linux is a one-line append per file.

### L1 Runbook Numbering — Linux

L1 runbooks currently run 01-29. Last Android runbook is `29-android-aosp-enrollment-failed.md`. Linux L1 runbooks continue the numeric sequence:

```
30-linux-enrollment-failed.md         — intune-portal daemon not enrolling
31-linux-compliance-non-compliant.md  — compliance check failing (OS version, encryption, password)
32-linux-ca-blocking-web-access.md    — web-app Conditional Access blocking browser
33-linux-agent-service-failure.md     — intune-portal service crashed / not running
```

Four L1 runbooks matches the iOS (6 runbooks for a richer platform) and Android (8+ runbooks) precedent proportionally for a narrower platform. The `l1-runbooks/00-index.md` gets a Linux section appended (append-only contract on shared index).

The Mermaid initial triage tree in `decision-trees/00-initial-triage.md` gets a Linux branch added (same pattern as Android was added in Phase 40).

### L2 Runbook Numbering — Linux

L2 runbooks currently run 01-23. Last Android runbook is `23-android-aosp-investigation.md`. Linux L2 runbooks:

```
24-linux-log-collection.md        — /var/log/microsoft/intune/, journalctl, intune-portal diag
25-linux-agent-investigation.md   — kernel/distro version traps (Ubuntu HWE, snap vs deb)
```

Two L2 runbooks is appropriate given Linux's narrower Intune surface. `l2-runbooks/00-index.md` gets a Linux section appended.

---

## Pillar 3 — Operational Depth Integration

### Directory Option Decision

**Option C (Hybrid) is the correct choice.** Rationale:

- **Option A (top-level `docs/operations/`** per-domain with per-platform sub-docs) is the right primary structure because ops-domain content cuts *across* platforms — a "co-management" doc is fundamentally a Windows → Intune migration topic, not a Windows admin guide appendix. A top-level `operations/` directory signals that this is an orthogonal capability axis, not a platform-specific admin guide extension.

- **Option B (per-platform sub-tree)** fails because co-management is Windows-led — you cannot put it in `admin-setup-macos/` without misrepresenting the scope. Patch management is genuinely multi-platform. Forcing it into per-platform dirs creates fragmentation.

- **Option C** means: `docs/operations/{domain}/` holds the per-domain primary docs with per-platform sub-docs, AND existing per-platform admin guides add cross-references pointing into `operations/` (not duplicate content). The admin guides say "for ongoing patch management, see [operations/patch-management/02-macos-update-enforcement.md]"; the operations docs say "for initial enrollment setup, see [admin-setup-macos/]". This preserves existing patterns without breaking the existing tree.

Specifically for each domain:

**Co-management** (`docs/operations/co-management/`):
- `00-overview.md` — workload slider concept, ConfigMgr-to-Intune migration model, Mermaid workload-slider diagram (new diagram type — first use of workload-slider Mermaid in the suite)
- `01-windows-tenant-attach.md` — Tenant Attach setup, co-management prerequisites
- `02-windows-workload-sliders.md` — per-workload slider decisions (Compliance, Resource Access, Endpoint Protection, etc.)
- `03-cocmgmt-migration-paths.md` — ConfigMgr-to-Intune migration runbook (workload-by-workload sequence)
- Cross-references from `docs/admin-setup-apv1/` and `docs/admin-setup-apv2/` pointing into this dir
- macOS/iOS/Android contextual notes are in-line callout blocks within the above Windows-led docs, NOT separate files (macOS/iOS/Android have no co-management concept; notes explain this)

**Patch & Update Management** (`docs/operations/patch-management/`):
- `00-overview.md` — cross-platform update strategy comparison, ring topology concept, Mermaid ring topology diagram (new diagram type)
- `01-windows-wufb-rings.md` — Windows Update for Business: pilot/broad/defer rings, driver/firmware via WUfB-DS
- `02-macos-update-enforcement.md` — `forceDelayedSoftwareUpdates`, `softwareUpdate` MDM commands, DDM managed updates
- `03-ios-update-lifecycle.md` — supervised vs unsupervised update behaviors, DDM update enforcement on iOS 17+
- `04-android-patch-delivery.md` — system update policy (Default/Automatic/Postpone/Windowed), OEM delays (Samsung KSP, Zebra LifeGuard), Play Integrity tier impact on compliance after patch

**App Lifecycle** (`docs/operations/app-lifecycle/`):
- `00-overview.md` — cross-platform app delivery comparison, supersedence DAG concept (new diagram type)
- `01-windows-win32-msix-scale.md` — Win32 packaging at scale, supersedence chains, dependency graphs, detection rules
- `02-macos-pkg-dmg-pipeline.md` — .pkg/.dmg pipelines, Installomator/Munki adjacency callout (confidence-attributed)
- `03-ios-vpp-licensing.md` — device vs user VPP licensing flows, license reclaim, volume-purchase workflows
- `04-android-mgp-lifecycle.md` — Managed Google Play app lifecycle, private-app publishing, app approval workflows, version management

**Drift Detection + Tenant Migration** (`docs/operations/drift-migration/`):
- `00-overview.md` — deployment-report-driven drift detection workflow, tenant migration overview
- `01-windows-drift-detection.md` — Windows deployment reporting, baseline drift remediation
- `02-macos-ios-drift-detection.md` — macOS/iOS configuration drift patterns, profile re-push
- `03-android-drift-detection.md` — Android compliance-report drift, MGP re-binding scenarios
- `04-tenant-migration-runbook.md` — per-platform tenant-to-tenant migration (BitLocker re-key on Windows, ABM token re-issue on macOS/iOS, MGP re-binding on Android)

### Mermaid Usage in Operations Content

Existing Mermaid usage is limited to L1 triage decision trees (flowchart TD). v1.5 ops content introduces new Mermaid diagram types:

- **Workload-slider diagram** (co-management): Conceptually a horizontal bar showing which workloads are on ConfigMgr vs Intune. Can be rendered as a `gantt` or a `graph LR` with labeled edges — `graph LR` with ConfigMgr/Intune nodes is the pragmatic choice given existing rendering context.
- **Ring topology diagram** (patch management): Pipeline stages (pilot → early adopter → broad → deferred). Use `flowchart LR` with labeled nodes for rings and deferral windows. Consistent with existing Mermaid style.
- **Supersedence DAG** (app lifecycle): Dependency and supersedence chains. Use `flowchart TD` with directed edges. Consistent with existing triage tree style.

No new Mermaid renderer or tooling is needed — existing flowchart + graph patterns cover all new diagram types. The `docs/diagrams/` directory (present but unused per git status) may receive diagram source files; however, given existing pattern of inline Mermaid in markdown, keep diagrams inline in docs files rather than external SVG.

---

## Pillar 1 — Cleanup Integration

### DEFER-07: Android Nav Backport

The Android `## Android Enterprise Provisioning` section in `docs/index.md` (lines 169-171 in current file) is a stub — it has the H2 heading and a one-line description, but lacks the L1/L2/Admin subsection tables present for Windows, macOS, and iOS.

**Exact additions required to reach parity with other platforms:**

`docs/index.md`: Expand the Android Enterprise Provisioning H2 section from the current stub (3 lines) to a full subsection with three sub-tables matching macOS/iOS depth:
- `### Service Desk (L1)` table — linking to `decision-trees/08-android-triage.md`, `l1-runbooks/00-index.md#android-l1-runbooks`, `quick-ref-l1.md#android-quick-reference`, and the 8 Android L1 runbooks (22-29)
- `### Desktop Engineering (L2)` table — linking to `l2-runbooks/18-android-log-collection.md`, `l2-runbooks/00-index.md#android-l2-runbooks`, `quick-ref-l2.md#android-quick-reference`
- `### Admin Setup` table — linking to `admin-setup-android/00-overview.md`, `android-lifecycle/00-enrollment-overview.md`, all per-mode admin guides (01-13), `reference/android-capability-matrix.md`

`docs/common-issues.md`: Add an Android symptom routing block. Current file routes to Windows and macOS sections; Android L1 runbooks 22-29 have no entry point via `common-issues.md`. The Android block needs symptom-first routing (enrollment blocked → runbook 22, work profile not created → runbook 23, etc.) matching the Windows/macOS block structure.

`docs/quick-ref-l1.md`: Add `## Android Quick Reference` section with top checks + escalation triggers + decision-tree link + runbook links matrix (8 runbooks × 3-column table). The section should match iOS Quick Reference depth (added in Phase 32).

`docs/quick-ref-l2.md`: Add `## Android Quick Reference` section with log collection methods, Intune portal investigation paths, and links to L2 runbooks 18-23.

### DEFER-08: 4-Platform Capability Comparison Document

`docs/reference/4-platform-capability-comparison.md` — structural reference doc.

**Structure recommendation:**

```markdown
# Intune: 4-Platform Capability Comparison
# (Windows | macOS | iOS/iPadOS | Android)

## Purpose
One-sentence scope: side-by-side feature comparison for admins managing multi-platform
Intune tenants. Cross-references existing per-platform capability matrices; does NOT
duplicate per-platform detail.

## Enrollment

| Feature | Windows | macOS | iOS/iPadOS | Android |
|---------|---------|-------|------------|---------|
| Zero-touch method | Autopilot (hardware hash) | ADE via ABM | ADE via ABM | ZTE via Zero-Touch portal (GMS) / N/A (AOSP) |
| Hardware identity | 4KB hash | Serial | Serial | IMEI / serial (ZTE) / enrollment token (COBO) |
| Supervision/management model | N/A | ADE = supervised | ADE = supervised; Device Enrollment = unsupervised | Fully Managed / Work Profile / Dedicated / ZTE / AOSP |
...
```

Matrix axes: rows = features, columns = 4 platforms. Per-cell content should be 1-2 sentences max + cross-reference link (not duplicate prose). Footnotes handle variance (e.g., iOS ADE = supervised / Device Enrollment = unsupervised). Anchor scheme: `#enrollment`, `#configuration`, `#app-deployment`, `#compliance`, `#software-updates`, `#conditional-access` matching the per-platform capability matrix domain structure.

The `android-capability-matrix.md` deferred-4-platform footer stub (`#deferred-4-platform-unified-capability-comparison`) gets replaced with a link to this new doc when it lands.

**Domains to cover:**
1. Enrollment (zero-touch, hardware identity, supervision model, re-enrollment)
2. Configuration (DDM availability, profile mechanism, restriction breadth, Settings Catalog)
3. App Deployment (delivery channel, silent install, LOB path, app protection)
4. Compliance (attestation mechanism, CA integration, default posture)
5. Software Updates (update enforcement, deferral control, OEM integration)
6. Conditional Access (native app CA, web-app CA, compliance-based CA)

**Relationship to existing per-platform matrices:**
- `macos-capability-matrix.md` — bilateral Windows/macOS; update its intro to cross-reference `4-platform-capability-comparison.md`
- `ios-capability-matrix.md` — trilateral Windows/macOS/iOS; update intro similarly
- `android-capability-matrix.md` — Android-centric with Cross-Platform Equivalences; remove deferred footer stub, add cross-reference
- `linux-capability-matrix.md` (new) — Linux-centric bilateral; add cross-reference to 4-platform doc from day one

### Broken-Link Sweep

**Automation approach:** Integrate a link-check as audit harness check C13 in `v1.5-milestone-audit.mjs`. Use Node.js `fs.readFileSync` pattern (no shell invocations, consistent with existing harness design) to:
1. Walk all `docs/**/*.md` files
2. Extract markdown links `\]\(([^)]+)\)` that are relative (not `https://`)
3. Resolve each relative path from the source file's directory
4. Check `existsSync()` on resolved path (anchor-stripping for `#anchor` fragments)
5. Collect non-existent targets as violations

Ship as informational-first (C13) in the first phase it appears — promote to blocking only after manual triage resolves pre-existing broken links. This is the same informational-first grace pattern used for C6/C7/C9 in v1.4.1.

**Manual triage protocol:** After C13 runs for the first time, the findings list becomes the input for a manual triage sweep:
- Category A: Broken anchors (file exists, anchor doesn't) — fix anchor names or add anchor targets
- Category B: Broken file paths (file doesn't exist) — either create stub file or fix path
- Category C: Intentionally deferred stubs (e.g., future milestone content) — add to allowlist sidecar

**Timing recommendation: run the broken-link sweep FIRST, before adding v1.5 content.** Rationale: adding Linux + ops-depth content will create new cross-references; auditing before content addition isolates pre-existing breakage from new breakage. The sweep phase is a natural "cleanup before build" step that matches the Pillar 1 ordering. A second sweep pass AFTER all content lands validates the new cross-references are intact — this second pass is the C13 blocking promotion condition.

---

## Pillar 4 — Audit Harness Integration

### File Versioning Lineage (Path A Copy)

```
v1.4-milestone-audit.mjs  (frozen, reproducibility anchor)
  → v1.4.1-milestone-audit.mjs  (Path A copy + C6/C7/C9 informational-first)
    → v1.5-milestone-audit.mjs  (Path A copy + C10/C11/C12/C13 informational-first)
```

Copy `v1.4.1-milestone-audit.mjs` to `v1.5-milestone-audit.mjs`, update header comment, add new checks. Predecessor file is frozen — do not modify `v1.4.1-milestone-audit.mjs`.

Sidecar: `v1.5-audit-allowlist.json` (new file) co-located in `scripts/validation/`. Inherits the same JSON schema as `v1.4.1-audit-allowlist.json` (`safetynet_exemptions`, `supervision_exemptions`, `cope_banned_phrases`). Adds new arrays for Linux exemptions and ops-domain allowlists.

### New Checks: C10-C13

**C10: Linux platform tokenization**
- Scope: `docs/linux-lifecycle/**/*.md`, `docs/admin-setup-linux/**/*.md`, `docs/_glossary-linux.md`, `docs/reference/linux-capability-matrix.md`, L1 runbooks 30-33, L2 runbooks 24-25
- Check: required frontmatter fields present (`platform: Linux`, `last_verified`, `review_by`); `review_by - last_verified <= 60 days` (same rule as C5 for Android)
- Blocking from the start (frontmatter is structural, not content)

**C11: Ops-domain anti-pattern regex**
- Scope: `docs/operations/**/*.md`
- Checks: (a) no "SCCM" without "ConfigMgr/SCCM" disambiguation in same file (branded term drift), (b) no "WUfB" without expansion in first occurrence, (c) no SafetyNet in ops-domain docs (same C1 rule applies cross-domain)
- Informational-first, promote to blocking once ops-domain content is stable

**C12: 4-platform comparison structural validity**
- Scope: `docs/reference/4-platform-capability-comparison.md`
- Checks: (a) file exists, (b) all 6 required H2 domain anchors present (`#enrollment`, `#configuration`, `#app-deployment`, `#compliance`, `#software-updates`, `#conditional-access`), (c) all 4 platform columns present in at least 3 tables
- Blocking once file exists (structural skeleton is a hard requirement)

**C13: Broken relative link detection**
- Scope: all `docs/**/*.md` relative links
- Informational-first (pre-existing breakage must be triaged before promoting to blocking)
- Allowlist: `scripts/validation/v1.5-audit-allowlist.json` `broken_link_exemptions[]` array (per-file path + line number)

### Informational-First Grace Pattern

C10 (Linux frontmatter) ships as blocking immediately because frontmatter is structural. C11, C12, C13 ship informational-first during the phases when content is being authored; C12 promotes to blocking when the 4-platform comparison file lands; C13 promotes to blocking after manual triage sweep resolves pre-existing breakage.

### CI Workflow: New Job vs Upgrade Existing

**Decision: add a new job to the existing `.github/workflows/audit-harness-integrity.yml`** rather than upgrading the existing job. Rationale: the v1.4.1 harness job must remain as-is for predecessor reproducibility (PATH A copy invariant). A second job `v1.5-harness` runs `node scripts/validation/v1.5-milestone-audit.mjs` in parallel with the existing `v1.4.1-harness` job. Both must pass for CI green. This mirrors the "frozen predecessor" principle in audit lineage.

---

## Data Flow

The documentation suite has a static content data flow (no runtime components). The relevant "flows" are:

**Author → Audit → Publish**
```
Author writes docs/  →  per-phase check-phase-NN.mjs  →  v1.5-milestone-audit.mjs  →  CI workflow
```

**Navigation flow** (reader perspective):
```
Hub (index.md / common-issues.md / quick-ref)
  → Platform section (admin-setup-linux/ OR operations/)
    → Per-guide (admin setup, capability matrix, glossary)
      → Per-scenario (L1 runbook OR L2 runbook)
```

The new `docs/operations/` layer adds a second entry axis into the platform-specific content. Readers can enter via the hub → operations domain → platform sub-doc; OR via the hub → platform section → cross-reference to operations. Both paths must be navigable. This is the cross-platform navigation impact of Option C.

---

## Build Order and Phase Dependencies

### Dependency Graph

```
Broken-link sweep (P1 cleanup, no deps)
  ↓
Linux foundation: glossary + lifecycle overview (P2 foundation, parallel to cleanup)
  ↓
Linux admin setup + capability matrix (depends on glossary)
Linux L1/L2 + decision tree (depends on admin setup)
  ↓
Ops-domain foundation: co-management (Windows-led, parallel to Linux content)
  ↓
Ops-domain content: patch + app lifecycle + drift (can parallelize with each other)
  ↓
Integration (DEFER-07 Android nav, DEFER-08 4-platform comparison, index.md Linux section)
  ↓
Audit harness v1.5 (extends after all content lands)
```

### Phase Decomposition (12-15 phases, starting at Phase 48)

The following phase structure derives from the dependency graph and v1.2's foundation-first lesson:

**Phase 48 — Pillar 1a: Broken-Link Sweep + Android Nav Audit (DEFER-07 prep)**
- Files touched: scan only (no edits), produce findings report
- Produces: C13 informational harness check as proof of concept
- Depends on: nothing (runs against existing 179 files)
- Key output: categorized broken-link inventory + Android nav gap inventory

**Phase 49 — Linux Foundation: Taxonomy, Glossary, Lifecycle Overview**
- Files created: `_glossary-linux.md`, `linux-lifecycle/00-enrollment-overview.md`, `linux-lifecycle/01-linux-prerequisites.md`
- Files modified: `_glossary.md`, `_glossary-macos.md`, `_glossary-android.md` (see-also reciprocal)
- Depends on: nothing for new files; Phase 48 findings inform any glossary cleanup
- Pattern mirrors: Phase 20 (v1.2 cross-platform foundation)

**Phase 50 — Linux Admin Setup Guides**
- Files created: `admin-setup-linux/00-overview.md` through `05-conditional-access.md` (6 files)
- Files created: `reference/linux-capability-matrix.md`
- Depends on: Phase 49 (glossary + lifecycle)

**Phase 51 — Linux Triage + L1 Runbooks**
- Files created: `decision-trees/09-linux-triage.md`, `l1-runbooks/30..33-linux-*.md` (4 files)
- Files modified: `l1-runbooks/00-index.md` (append-only Linux section), `decision-trees/00-initial-triage.md` (Linux branch)
- Depends on: Phase 50 (admin setup — L1 runbooks reference admin guides)

**Phase 52 — Linux L2 Investigation Runbooks**
- Files created: `l2-runbooks/24..25-linux-*.md` (2 files)
- Files modified: `l2-runbooks/00-index.md` (append-only Linux section)
- Depends on: Phase 51 (L1 runbooks cross-reference L2 by convention)

**Phase 53 — Co-Management Operational Docs**
- Files created: `operations/co-management/00-overview.md`, `01-windows-tenant-attach.md`, `02-windows-workload-sliders.md`, `03-cocmgmt-migration-paths.md`, `operations/00-index.md`
- Depends on: nothing structural (Windows-led, no dependency on Linux phases)
- Can run in parallel with Phases 51-52 (disjoint file sets)

**Phase 54 — Patch & Update Management**
- Files created: `operations/patch-management/00-overview.md` through `04-android-patch-delivery.md` (5 files)
- Depends on: Phase 53 (`operations/00-index.md` must exist for cross-reference)
- Can parallelize with Phase 52 (disjoint file sets)

**Phase 55 — App Lifecycle Automation**
- Files created: `operations/app-lifecycle/00-overview.md` through `04-android-mgp-lifecycle.md` (5 files)
- Depends on: Phase 53 (`operations/00-index.md`)
- Can parallelize with Phase 54 (disjoint file sets)

**Phase 56 — Drift Detection + Tenant Migration**
- Files created: `operations/drift-migration/00-overview.md` through `04-tenant-migration-runbook.md` (5 files)
- Depends on: Phase 53 (`operations/00-index.md`)
- Can parallelize with Phases 54-55

**Phase 57 — DEFER-07: Android Nav Unification**
- Files modified: `docs/index.md` (Android H2 expansion), `common-issues.md` (Android routing block), `quick-ref-l1.md` (Android section), `quick-ref-l2.md` (Android section)
- Depends on: Phase 48 (gap inventory) + Phases 51-52 (all Android + Linux runbooks must exist before hub links)
- Key lesson: navigation files written AFTER content (v1.0 lesson verified across all milestones)

**Phase 58 — DEFER-08: 4-Platform Capability Comparison**
- Files created: `docs/reference/4-platform-capability-comparison.md`
- Files modified: `macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md` (intro cross-references + remove deferred stub), `linux-capability-matrix.md` (cross-reference)
- Depends on: Phases 49-56 all complete (the comparison doc must see Linux + all ops-depth content to be accurate)
- Integration-phase-last pattern — mirrors Phase 42 (v1.4) and Phase 47 (v1.4.1)

**Phase 59 — Hub Navigation Integration: index.md Linux + Operations Sections**
- Files modified: `docs/index.md` (Linux H2 section + new Operations section linking to `docs/operations/`), hub cross-references from ops docs back to admin-setup dirs
- Depends on: Phase 57 (Android nav), Phase 58 (4-platform comparison), all Linux phases
- Navigation-last pattern enforced here as well as Phase 57

**Phase 60 — Audit Harness v1.5**
- Files created: `v1.5-milestone-audit.mjs`, `v1.5-audit-allowlist.json`
- Extends: v1.4.1 harness with C10/C11/C12/C13
- Depends on: all content phases complete (harness validates the final delivered state)
- C13 broken-link sweep: second pass (after Phase 48 first pass), should pass clean after Phase 48 fixes were applied

**Phase 61 — Broken-Link Fix Execution + Pre-Close Gap Closure**
- Files modified: whatever Phase 48 inventory + Phase 60 C13 violations reveal
- Produces: terminal re-audit, milestone audit doc
- Depends on: Phase 60 harness exists

Total: 14 phases (48-61). This falls within the 12-15 phase target.

### Parallelism Opportunities

- Phases 51-52 (Linux L1/L2) can run in parallel with Phase 53 (co-management) — completely disjoint file sets
- Phases 54, 55, 56 can run in parallel with each other (each ops domain touches different files)
- Phase 57 (Android nav) can run in parallel with Phase 58 (4-platform comparison) if Phase 48 gap inventory is complete and all runbook phases are done

---

## Scalability Considerations

| Concern | Current (v1.4.1) | v1.5 State | Notes |
|---------|-----------------|------------|-------|
| File count | 179 markdown files | ~230+ markdown files | Linux adds ~15, ops adds ~20, new refs add 2 |
| Broken-link audit scope | Not automated | C13 in harness | First systematic scan across all 230 files |
| Per-phase validators | 47 check-phase-NN.mjs scripts | Continues | Each phase ships its own validator |
| Hub maintainability | 4 platforms in index.md | 5 platforms + operations | Operations section is the new navigation surface; index.md grows but remains single hub |
| Capability matrix proliferation | 3 per-platform matrices + android multi-mode | 4 per-platform + 1 4-platform comparison | `4-platform-capability-comparison.md` is the consolidation point |

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Ops-Domain Content in Per-Platform Admin Guides
**What:** Adding `operations/` content directly inside `admin-setup-windows/`, `admin-setup-macos/` etc.
**Why bad:** Co-management is not a Windows admin setup topic — it is a post-enrollment operational lifecycle topic. Embedding it in admin-setup dirs misrepresents the content axis and forces cross-references into platform-specific files.
**Instead:** Use `docs/operations/` as the primary home; add brief cross-reference callouts (one sentence + link) in per-platform admin guides.

### Anti-Pattern 2: Linux Capability Matrix as Full 4-Platform Comparison
**What:** Building `linux-capability-matrix.md` as a 5-column table (Linux | Windows | macOS | iOS | Android)
**Why bad:** Duplicates DEFER-08 (`4-platform-capability-comparison.md`). Creates synchronization debt — changes to platform capabilities require updates in multiple matrices.
**Instead:** `linux-capability-matrix.md` is Linux-centric bilateral or Linux-focused with 1-2 reference columns; `4-platform-capability-comparison.md` is the canonical 4-platform reference.

### Anti-Pattern 3: Android Nav Backport Before Linux/Ops Content Lands
**What:** Executing DEFER-07 (hub nav updates) before Linux runbooks and ops content are complete
**Why bad:** Hub nav links that land before the target files exist create broken links. The navigation-files-last lesson has been verified across every milestone (v1.0-v1.4.1).
**Instead:** DEFER-07 and DEFER-08 are integration phases (57-58-59), executed after all content phases complete.

### Anti-Pattern 4: v1.5 Harness Modifying v1.4.1 Harness File
**What:** Editing `v1.4.1-milestone-audit.mjs` to add C10-C13 checks
**Why bad:** Breaks predecessor reproducibility. v1.4.1 terminal re-audit is a committed artifact; modifying the harness changes what that audit means retroactively.
**Instead:** Path A copy — new file `v1.5-milestone-audit.mjs`, v1.4.1 file is frozen.

### Anti-Pattern 5: Broken-Link Sweep Run Last Only
**What:** Only running the broken-link sweep after all v1.5 content has landed
**Why bad:** Pre-existing breakage (from 179 existing files) gets mixed with new breakage from v1.5 content, making triage ambiguous.
**Instead:** Phase 48 runs the sweep first (against existing tree), triages pre-existing issues. Phase 60/61 runs a second pass to validate the new content is clean.

---

## Sources

All findings derived from direct inspection of the existing repository at `D:\claude\Autopilot`:

- `.planning/PROJECT.md` — v1.5 scope definition, carry-forward patterns, Key Decisions table
- `.planning/STATE.md` — phase numbering, pending todos, carry-forward decisions
- `.planning/RETROSPECTIVE.md` — process evolution, verified lessons (foundation-first, navigation-last, informational-first harness, atomic retrofits)
- `docs/index.md` — current hub structure, Android stub confirmation, existing platform H2 depth for parity analysis
- `docs/admin-setup-android/00-overview.md` — tri-portal Mermaid structure to parallel for Linux
- `docs/reference/android-capability-matrix.md` — Cross-Platform Equivalences pattern, deferred-4-platform footer stub
- `docs/reference/macos-capability-matrix.md` — bilateral matrix structure (Windows/macOS)
- `docs/reference/ios-capability-matrix.md` — trilateral matrix structure (Windows/macOS/iOS)
- `docs/_glossary-android.md`, `docs/_glossary-macos.md` — reciprocal see-also banner patterns
- `scripts/validation/v1.4.1-milestone-audit.mjs` — harness lineage, C1-C9 check patterns, androidDocPaths() enumeration, sidecar JSON contract, informational-first tags
- Directory enumeration: `docs/l1-runbooks/` (01-29), `docs/l2-runbooks/` (01-23), `docs/reference/` (all capability matrices), `docs/` (top-level layout)

Confidence: HIGH for all architectural decisions — all derived from direct codebase inspection, not inference. No external library documentation needed (this is a documentation suite, not a software project).
