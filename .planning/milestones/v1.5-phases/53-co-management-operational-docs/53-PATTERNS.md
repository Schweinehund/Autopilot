# Phase 53: Co-Management Operational Docs - Pattern Map

**Mapped:** 2026-04-28
**Files analyzed:** 6 (4 new content files + 1 new ops index + 1 new validator)
**Analogs found:** 6 / 6

This document maps each Phase 53 deliverable to its closest existing analog with concrete, paste-ready excerpts. The plan author can lift snippets verbatim and apply the listed token swaps without re-reading the analog files.

Conventions:
- "Copy verbatim" excerpts contain exact byte sequences from analog files (with line references where available).
- "Adapt for Phase 53" sections list specific token swaps and structural additions.
- All path references are relative to repository root.
- 53-RESEARCH.md remains the canonical factual source; this document is the structural mapping.

---

## File Classification

| New File | Role | Data Flow | Closest Analog | Match Quality |
|----------|------|-----------|----------------|---------------|
| `docs/operations/co-management/00-overview.md` | ops-overview (multi-section guide) | request-response | `docs/admin-setup-android/00-overview.md` | role-match (same: admin-facing overview with Mermaid option + cross-platform section + prerequisite structure; different: Windows-only content) |
| `docs/operations/co-management/01-windows-tenant-attach.md` | disambiguation guide (comparison table) | request-response | `docs/reference/android-capability-matrix.md` (Cross-Platform Equivalences section) | data-flow-match (same: feature comparison table with per-row capability distinctions; different: 2-column comparison vs N-column matrix) |
| `docs/operations/co-management/02-windows-workload-sliders.md` | ops-guide (migration sequence with layered callout) | request-response | `docs/l2-runbooks/24-linux-log-collection.md` + `docs/l2-runbooks/25-linux-agent-investigation.md` for EP three-layer pattern | partial-match (three-layer EP HIGH-RISK callout inherited from Phase 52 DPO-Phase52-07; workload sequence table has no exact analog) |
| `docs/operations/co-management/03-cocmgmt-migration-paths.md` | ops-guide (prerequisites checklist) | request-response | `docs/admin-setup-apv2/00-overview.md` (prerequisites checklist + ordered action list) | role-match (same: admin prerequisites + ordered steps; different: Autopatch prereqs content vs APv2 setup) |
| `docs/operations/00-index.md` | index (new directory index file) | — | `docs/l2-runbooks/00-index.md` (existing index with H2-per-platform sections) | partial-match (same: H2-anchored index with When-to-Use table; different: new file with single H2 vs append target with multiple H2s) |
| `scripts/validation/check-phase-53.mjs` | validator (Node.js ESM, file-reads-only) | batch | `scripts/validation/check-phase-52.mjs` | exact (same file-reads-only pattern, same check shape, same runner/output) |

---

## Pattern Assignments

### `docs/operations/co-management/00-overview.md` (ops-overview, request-response)

**Primary analog:** `docs/admin-setup-android/00-overview.md`
**Secondary analog:** `docs/admin-setup-ios/00-overview.md` (Mermaid flowchart shape + prerequisite H3 structure)

---

#### Frontmatter — copy shape, swap tokens (D-12)

**From analog** (`docs/admin-setup-android/00-overview.md` lines 1–7):
```yaml
---
last_verified: 2026-04-25
review_by: 2026-06-24
applies_to: all
audience: admin
platform: Android
---
```

**Adapt for Phase 53 (D-12):** replace `platform: Android` with `platform: Windows`; set `last_verified` to plan-execution date; set `review_by` to `last_verified + 60d`. `audience: admin` stays. `applies_to: all` stays.

```yaml
---
last_verified: <plan-execution-date>
review_by: <last_verified + 60d>
applies_to: all
audience: admin
platform: Windows
---
```

---

#### Platform applicability blockquote at TOP — new pattern for Phase 53 (D-08, V-53-18)

**No direct codebase analog** — Phase 53 introduces `> **Platform applicability:**` as a new ops-domain shape (distinct from the L1/L2 `> **Platform gate:**` shape). The content is specified verbatim in RESEARCH.md Pattern 2.

**Copy verbatim from RESEARCH.md Pattern 2** (place immediately after frontmatter, before H1):
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

**Critical cross-link corrections (RESEARCH.md Area 3):**
- iOS MAM link = `../../admin-setup-ios/09-mam-app-protection.md` (NOT `04-byod-mam-overview.md` — that file does NOT exist)
- macOS enrollment profile link = `../../admin-setup-macos/02-enrollment-profile.md` (singular — NOT `02-enrollment-profiles.md`)

**Validator enforcement:** V-53-18 checks `> **Platform applicability:**` within first 50 lines of file body. V-53-19 checks for tokens: `Jamf`, `ABM MDM transfer`, `MAM`, `MDM`, `Device Administrator`.

---

#### H1 + intro paragraph — from analog shape

**From analog** (`docs/admin-setup-android/00-overview.md` line 14–18):
```markdown
# Android Enterprise Admin Setup

This overview routes Intune administrators to the correct Android Enterprise admin setup path.
```

**Adapt for Phase 53:**
```markdown
# Co-Management Overview: ConfigMgr Workload Model

This guide covers the Windows ConfigMgr-to-Intune co-management workload model for Intune administrators.
Seven workloads can each be migrated independently from ConfigMgr to Intune management using
per-workload slider controls.
```

---

#### 7-workload enumeration — literal tokens locked (V-53-07)

RESEARCH.md Area 1 specifies exact tokens from REQUIREMENTS.md. The overview MUST contain all 7:

```markdown
The seven co-management workloads (ConfigMgr CB 2503) are:

1. **Compliance Policies**
2. **Windows Update Policies**
3. **Resource Access** (deprecated since CB 2203; mandated to Intune in CB 2403 — see [Resource Access Deprecation](#resource-access-deprecation))
4. **Endpoint Protection** (HIGH-RISK — see [02-windows-workload-sliders.md](02-windows-workload-sliders.md))
5. **Device Configuration**
6. **Office Click-to-Run Apps**
7. **Client Apps**
```

**Validator enforcement:** V-53-07 checks all 7 literal tokens: `Compliance Policies`, `Windows Update Policies`, `Resource Access`, `Endpoint Protection`, `Device Configuration`, `Office Click-to-Run Apps`, `Client Apps`.

---

#### `## Three Workload Slider States` H2 + Pilot Intune POSITIVE assertion (D-06, V-53-08, V-53-09)

**Literal H2 string pinned by V-53-08:**
```markdown
## Three Workload Slider States
```

**Body — copy verbatim from RESEARCH.md Pattern 4:**
```markdown
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

**Validator enforcement:**
- V-53-08: literal `## Three Workload Slider States` H2 + 3 state tokens (`ConfigMgr`, `Pilot Intune`, `Intune`) adjacent
- V-53-09 POSITIVE: `collection-scoped` AND (`not a binary toggle` OR `per-collection`) within ~10 lines of "Pilot Intune"
- V-53-10 NEGATIVE: ban `partially migrated`, `partially-migrated`, `fully migrated`, `fully-migrated` (case-insensitive) in files under `docs/operations/co-management/`

---

#### Device Configuration implicit-switching note (REQ COMG-01, V-53-26 adjacent)

**Verbatim content from RESEARCH.md Area 1 (Microsoft Learn confirmed):**
```markdown
> **Implicit workload switching:** Switching the **Device Configuration** workload also implicitly
> switches the **Resource Access** and **Endpoint Protection** workloads — if those workloads have
> not already been individually switched. Verify that Intune Endpoint Protection policy is published
> and confirmed healthy before moving Device Configuration (see
> [02-windows-workload-sliders.md#endpoint-protection-high-risk](02-windows-workload-sliders.md)).
```

---

#### Resource Access deprecation note (D-04, V-53-26)

**Validator enforcement:** V-53-26 requires `deprecated` near `Resource Access` token (≤10-line window) AND reference to `CB 2203` or `CB 2403` in BOTH `00-overview.md` AND `02-windows-workload-sliders.md`.

```markdown
### Resource Access Deprecation {#resource-access-deprecation}

The Resource Access workload is **deprecated since CB 2203** and mandated to Intune in **CB 2403**.
Starting in CB 2403, the Resource Access node is removed from the ConfigMgr console; the slider
is automatically set to Intune. Tenants upgrading to CB 2403 will have this workload moved
automatically.
```

---

#### Soft cross-link from 00 to 03 Autopatch (D-07, V-53-24)

**Validator enforcement:** V-53-24 checks that `00-overview.md` contains a literal cross-link to `03-cocmgmt-migration-paths.md`.

```markdown
> **Windows Autopatch:** Co-management is a prerequisite for Windows Autopatch. Before enabling
> Autopatch, three workloads (Windows Update Policies, Device Configuration, and Office
> Click-to-Run Apps) must be set to Pilot Intune or Intune. See
> [Migration Paths and Autopatch Prerequisites](03-cocmgmt-migration-paths.md#autopatch-prerequisites).
```

---

#### Optional Mermaid diagram (CD-04 — validator does NOT assert presence)

**Shape reference from** `docs/admin-setup-android/00-overview.md` lines 25–37:
```markdown
```mermaid
flowchart TD
    START[...] --> CHOOSE{...}
    CHOOSE -->|...| A[...]
```
```

If included: use `flowchart TD` shape showing the 3-state slider progression for a single workload. This is author discretion per CD-04.

---

### `docs/operations/co-management/01-windows-tenant-attach.md` (disambiguation guide, request-response)

**Primary analog:** `docs/reference/android-capability-matrix.md` Cross-Platform Equivalences section (lines 85–93) — same paired-comparison table shape with per-row feature-axis distinctions
**Secondary analog:** `docs/admin-setup-android/00-overview.md` frontmatter + platform-gate blockquote shape

---

#### Frontmatter — same shape as 00-overview.md (D-12)

```yaml
---
last_verified: <plan-execution-date>
review_by: <last_verified + 60d>
applies_to: all
audience: admin
platform: Windows
---
```

---

#### Platform applicability blockquote — same content as 00-overview.md (D-08, V-53-18, V-53-19)

Copy the identical `> **Platform applicability:**` blockquote from 00-overview.md pattern above. All three files (00, 01, 02) carry the same blockquote per D-08. Place immediately after frontmatter, before H1.

---

#### Comparison table — copy shape from RESEARCH.md Pattern 5 (D-03, V-53-11, V-53-12)

**Structural shape reference from** `docs/reference/android-capability-matrix.md` lines 85–93 (paired comparison table with per-row capability distinctions):
```markdown
| iOS / Apple | Android |
|-------------|---------|
| **iOS Supervision (ADE-enrolled)** | **Android Fully Managed (COBO / DPC owner)** |
```

**Adapt for Phase 53 — copy verbatim from RESEARCH.md Pattern 5:**
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
| Windows Autopatch eligibility | No | Yes — requires 3 workloads moved (see [03-cocmgmt-migration-paths.md](03-cocmgmt-migration-paths.md)) |
| Requires Hybrid Entra ID join | No | Typically yes (ConfigMgr enrollment path) |
| Intune license per device | No | Yes |
```

**Validator enforcement:**
- V-53-11: table with columns matching `| Capability | Tenant Attach | Full Co-Management |`
- V-53-12: literal `no workload switching` AND `workload sliders` present in file

The table row `**No — workloads stay in ConfigMgr**` satisfies V-53-12 for "no workload switching". The `per-workload slider` cell satisfies "workload sliders".

**Optional 4th column** (CD-05): author may add `| Notes |` column at right edge.

---

### `docs/operations/co-management/02-windows-workload-sliders.md` (ops-guide, request-response)

**Primary analog for slider-state semantics block:** `docs/admin-setup-android/00-overview.md` H2 + brief table pattern
**Primary analog for EP HIGH-RISK three-layer callout:** `docs/l2-runbooks/24-linux-log-collection.md` (Phase 52 D-01 three-layer confidence pattern — transferred per DPO-Phase52-07)
**Primary analog for forward-link footer:** `docs/reference/imaging-to-autopilot.md` + `docs/device-operations/04-tenant-migration.md`

---

#### Frontmatter — same shape as 00-overview.md (D-12)

```yaml
---
last_verified: <plan-execution-date>
review_by: <last_verified + 60d>
applies_to: all
audience: admin
platform: Windows
---
```

`audience: admin,L2` is also acceptable per CD-08.

---

#### Platform applicability blockquote — same content as 00/01 (D-08, V-53-18, V-53-19)

Same `> **Platform applicability:**` blockquote. Place immediately after frontmatter, before H1.

---

#### Small slider-state semantics block — copy from RESEARCH.md Pattern 4 table (D-04)

The small block PRECEDES the main 7-row workload sequence table. Copy the 3-row slider-state table from `## Three Workload Slider States` pattern (see 00-overview.md pattern above). This satisfies PITFALL-8 line 179 obligation (1): "explain the three slider states."

```markdown
## Slider State Reference

| State | Scope | ConfigMgr Manages | Intune Manages |
|-------|-------|-------------------|----------------|
| Configuration Manager | All devices | All workloads | None |
| Pilot Intune | Pilot collection only | Devices outside collection | Devices in collection |
| Intune | All devices | None | All workloads |

The Pilot Intune state is collection-scoped — devices inside the pilot collection are managed by
Intune for this workload; devices outside remain on ConfigMgr. This is NOT a binary toggle.
```

---

#### Main 7-row workload sequence table (D-04, V-53-13, V-53-14)

**Column spec from D-04:**
```markdown
| Workload | Migration Order | Risk | Validate Before Moving Slider | Pilot Collection Guidance |
```

**V-53-13** asserts column literal `Validate Before Moving Slider` (or `Validate Before Moving`) and ≥6 data rows.

**V-53-14** asserts migration order: `Compliance` precedes `Endpoint Protection` precedes `Device Configuration` precedes `Apps` in document order.

**Copy verbatim table spec from CONTEXT.md D-04** (rows in low-risk-first sequence):

```markdown
| Compliance Policies | 1 | LOW | Compliance evaluator agreement; non-compliant device cohort baseline measured before move | Scope to single AAD security group of test devices |
| Resource Access | 2 | N/A — DEPRECATED | This workload is deprecated since CB 2203 and mandated to Intune in CB 2403; slider is moved automatically on CB 2403 upgrade | N/A |
| Windows Update Policies | 3 | MEDIUM | WUfB ring assignment validated; deferral conformance baseline established. NOTE: Windows Autopatch requires this workload at Pilot Intune or Intune — see [03-cocmgmt-migration-paths.md](03-cocmgmt-migration-paths.md#autopatch-prerequisites) | Start with 10-device pilot ring; validate WUfB deferral rings reporting correctly |
| Endpoint Protection | 4 | **HIGH-RISK** — see callout | Intune Defender for Endpoint policy published, targeted, AND confirmed reporting healthy via Intune > Endpoint security > Microsoft Defender for Endpoint > Onboarding status | Validate in smallest possible pilot collection; confirm Defender policy delivery before expanding |
| Device Configuration | 5 | MEDIUM-HIGH | Configuration profile assignment validated; CSP equivalence verified for in-scope settings; Resource Access + Endpoint Protection implicit-switching impact reviewed | Pilot with representative device configurations; validate each CSP setting maps correctly |
| Office Click-to-Run Apps | 6 | MEDIUM | C2R deployment via Intune validated for pilot collection; channel and version stability confirmed | Pilot with Office channel mix; validate update channel and version targeting |
| Client Apps | 7 | MEDIUM | Win32, MSI, and Microsoft Store deployments validated; supersedence and dependency graphs reviewed | Review app dependency chains before moving slider |
```

**Resource Access row ordering:** per CD-02, the deprecated row may appear at position 2 (as specified in D-04) or collapsed to last row. Position 2 reflects the historical migration order; both orderings satisfy V-53-13 (≥6 rows) and V-53-14 (Compliance < EP < Device Config < Apps in document order).

---

#### EP HIGH-RISK three-layer callout — cross-domain transfer from Phase 52 D-01 pattern (D-05, V-53-15, V-53-16, V-53-17)

**Pattern source:** Phase 52 D-01 three-layer confidence pattern (DPO-Phase52-07 endorses cross-domain transfer). The Phase 52 pattern used: Layer 1 = matrix-cell token; Layer 2 = adjacent blockquote; Layer 3 = per-occurrence inline tokens. Phase 53 applies identically.

**Layer 1 (table Risk column cell) — V-53-15 asserts `HIGH-RISK` in EP row:**
Already shown in table above: `**HIGH-RISK** — see callout`

**Layer 2 (adjacent blockquote immediately below workload table) — V-53-16 asserts literal blockquote opener + verbatim Defender mandate:**
```markdown
> ⚠️ **Endpoint Protection HIGH-RISK:** do not move this slider until Intune Defender for
> Endpoint policy is published, targeted, and confirmed reporting healthy. Moving the slider
> before Defender policy lands and reports healthy creates a fleet-wide Defender coverage gap
> window. Verify policy reporting via Intune > Endpoint security > Microsoft Defender for
> Endpoint > Onboarding status before initiating slider move.
```

**The verbatim Defender mandate text** ("do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy") is from PITFALLS.md line 179. Copy it exactly — V-53-16 checks for this literal string.

**Layer 3 (per-occurrence inline reminders — ≥2 required) — V-53-17 asserts ≥2 `[HIGH-RISK` tokens:**

**From Phase 52 analog** (`check-phase-52.mjs` V-52-08 pattern):
```javascript
const tokens = (c.match(/\[LOW-MEDIUM, last_verified/g) || []).length;
if (tokens < 2) return { pass: false, detail: "Need >=2 tokens; found " + tokens };
```

**Phase 53 equivalent** — any later text reference to EP workload carries an inline reminder:
```markdown
When planning the Endpoint Protection workload [HIGH-RISK — see callout above], ensure Defender
policy is reporting healthy before initiating the slider move.

...

The Device Configuration workload implicitly switches the Endpoint Protection workload
[HIGH-RISK — see callout above] if EP has not already been individually moved.
```

V-53-17 counts `[HIGH-RISK` tokens across the file; ≥2 required.

---

#### Resource Access deprecation note (V-53-26)

Same content as in 00-overview.md — must appear in BOTH files per V-53-26:
```markdown
> **Resource Access deprecated:** This workload is deprecated since **CB 2203**. In **CB 2403**,
> the Resource Access node is removed from the ConfigMgr console and the slider is mandated to
> Intune. Tenants on CB 2403 or later have this workload moved automatically.
```

---

#### Forward-links to v1.2 Windows migration content (REQ COMG-02, V-53-23)

**Verified target files from RESEARCH.md Area 4:**
- `docs/reference/imaging-to-autopilot.md` — EXISTS (confirmed)
- `docs/device-operations/04-tenant-migration.md` — EXISTS (confirmed)

**Relative paths from `docs/operations/co-management/02-windows-workload-sliders.md`:**
```markdown
## Related Resources

- [Imaging-to-Autopilot Migration](../../reference/imaging-to-autopilot.md) — v1.2 Windows
  on-premises imaging to Autopilot migration guide covering MDT/SCCM OSD paths
- [Tenant-to-Tenant Device Migration](../../device-operations/04-tenant-migration.md) — tenant
  migration process for device moves between Microsoft 365 tenants
- [GPO-to-Intune Migration](../../reference/gpo-to-intune.md) — Group Policy Object to Intune
  Settings Catalog migration mapping
```

**Validator enforcement:** V-53-23 checks for `imaging-to-autopilot.md` OR `device-operations/04-tenant-migration.md` cross-link in `02-windows-workload-sliders.md`.

---

### `docs/operations/co-management/03-cocmgmt-migration-paths.md` (ops-guide / prerequisites, request-response)

**Primary analog:** `docs/admin-setup-apv2/00-overview.md` (prerequisites checklist + ordered step structure)
**Secondary analog:** `docs/device-operations/04-tenant-migration.md` (prerequisite checklist + critical-warning blockquote shape)

---

#### Frontmatter — same shape, Windows platform (D-12)

```yaml
---
last_verified: <plan-execution-date>
review_by: <last_verified + 60d>
applies_to: all
audience: admin
platform: Windows
---
```

---

#### NO cross-platform blockquote (D-09, V-53-21)

**Critical distinction:** `03-cocmgmt-migration-paths.md` does NOT carry the `> **Platform applicability:**` blockquote. V-53-21 is a NEGATIVE regression-guard that will FAIL if this blockquote appears in 03.

Per CDI-Phase53-01: the plan author for 53-04 MUST NOT include `> **Platform applicability:**` — this is the clearest anti-pattern for this file.

---

#### Windows Autopatch prerequisites section (D-07, V-53-20)

**Literal H2 anchor for soft cross-link from 00-overview.md (V-53-24):**
```markdown
## Autopatch Prerequisites {#autopatch-prerequisites}
```

**Content — from RESEARCH.md Area 2 (THREE workloads, not two):**

```markdown
Windows Autopatch requires co-management with the following three workloads set to **Pilot Intune**
or **Intune** before Autopatch can be enabled:

1. **Windows Update Policies** workload → set to Pilot Intune or Intune
2. **Device Configuration** workload → set to Pilot Intune or Intune
3. **Office Click-to-Run Apps** workload → set to Pilot Intune or Intune

If any workload is set to Pilot Intune (rather than full Intune), devices must be members of the
corresponding pilot collection.

> **Critical correction note:** Early documentation (REQUIREMENTS COMG-05) referenced only Device
> Configuration and Office Click-to-Run as Autopatch prerequisites. The current Microsoft Learn
> Autopatch prerequisites page (updated 2026-02-26) specifies all three workloads including
> Windows Update Policies. Document all three.
```

**Analog prerequisites checklist shape** from `docs/admin-setup-apv2/00-overview.md` lines 18–22:
```markdown
- **APv1 deregistration:** If any target devices are currently registered...
- ...this must be complete before any enrollment profile can be created.
```

**Adapt for Phase 53 Autopatch prereqs:**
```markdown
### Prerequisites for Windows Autopatch

- [ ] **Co-management enabled** — Device must be enrolled in co-management (ConfigMgr client +
      Intune enrollment)
- [ ] **Windows Update Policies workload** — Slider set to Pilot Intune or Intune
- [ ] **Device Configuration workload** — Slider set to Pilot Intune or Intune
- [ ] **Office Click-to-Run Apps workload** — Slider set to Pilot Intune or Intune
- [ ] **Pilot collections configured** — If using Pilot Intune for any workload, device must be
      in the corresponding pilot collection
- [ ] **Windows Autopatch prerequisites** — Verify licensing and Entra ID requirements per
      Windows Autopatch documentation
```

**Validator enforcement:** V-53-20 asserts `Device Configuration` AND `Office Click-to-Run` AND `Autopatch` AND `prerequisite` in `03-cocmgmt-migration-paths.md`. The Windows Update workload content is additive and does not break this assertion.

---

#### Forward-link to Phase 54 (CD-07)

```markdown
> **Note:** Windows Update Policies workload migration — including WUfB ring topology and
> WUfB-vs-Autopatch ring disambiguation — is covered in Phase 54 patch-management content.
> See [Patch Management documentation](../../operations/patch-management/) when available.
```

---

#### Prerequisite callout shape — from analog (both analog files use this)

**From** `docs/device-operations/04-tenant-migration.md` lines 15–19:
```markdown
> **Critical warnings — read before proceeding:**
>
> - **Do NOT use Autopilot Reset during tenant migration.**...
```

**Adapt for Phase 53:**
```markdown
> **Before enabling Autopatch:**
>
> - **All three workloads must be confirmed** — Windows Update Policies AND Device Configuration
>   AND Office Click-to-Run Apps must be at Pilot Intune or Intune BEFORE Autopatch enrollment.
> - **Pilot collections must be correctly scoped** — If using Pilot Intune, devices not in the
>   collection are still managed by ConfigMgr and are NOT Autopatch-eligible.
```

---

### `docs/operations/00-index.md` (index, new file)

**Primary analog:** `docs/l2-runbooks/00-index.md` H2-per-platform section shape (the existing multi-H2 index)
**Note:** The Phase 53 ops/00-index.md is a BRAND-NEW file with a SINGLE H2, not an append target with existing H2s.

---

#### Frontmatter — same shape, Windows platform (D-12)

```yaml
---
last_verified: <plan-execution-date>
review_by: <last_verified + 60d>
applies_to: all
audience: admin
platform: Windows
---
```

---

#### File body — copy from RESEARCH.md Pattern 6 (D-02, V-53-22)

**Copy verbatim from RESEARCH.md Pattern 6:**
```markdown
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

**Validator enforcement (V-53-22):**
- POSITIVE: `## Co-Management` H2 must exist (literal match)
- NEGATIVE: NO `## Patch Management`, `## App Lifecycle`, `## Drift`, `## Tenant Migration`, `TBD`, `Coming in Phase`, `Phase 54`, `Phase 55`, `Phase 56` anywhere in file

---

### `scripts/validation/check-phase-53.mjs` (validator, batch)

**Primary analog:** `scripts/validation/check-phase-52.mjs` (exact — same file structure, same check shape, same runner)
**Secondary analog:** `scripts/validation/check-phase-51.mjs` (POSITIVE+NEGATIVE dual-defense pattern)

---

#### File header + shebang + imports — copy verbatim, change comment (D-11)

**From analog** (`scripts/validation/check-phase-52.mjs` lines 1–9):
```javascript
#!/usr/bin/env node
// Phase 52 static validation harness
// Source of truth: .planning/phases/52-linux-l2-investigation-runbooks-24-25/52-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 22 checks (V-52-01 through V-52-22)

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

**Adapt for Phase 53:**
```javascript
#!/usr/bin/env node
// Phase 53 static validation harness
// Source of truth: .planning/phases/53-co-management-operational-docs/53-CONTEXT.md
// NO SHELL: all file content via fs.readFileSync; no shared module; no external tools
// Implements 26 checks (V-53-01 through V-53-26)

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';
```

---

#### CLI flags + readFile helper — copy verbatim (no changes)

**From analog** (`check-phase-52.mjs` lines 11–18):
```javascript
const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');

function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8');
}
```

Copy this block verbatim — no changes needed.

---

#### Pinned file path constants — copy shape, update paths (D-13)

**From analog** (`check-phase-52.mjs` lines 20–26):
```javascript
// D-12: Pinned anchor strings — Phase 56+ renaming requires same-commit validator update.
const RB24 = "docs/l2-runbooks/24-linux-log-collection.md";
const RB25 = "docs/l2-runbooks/25-linux-agent-investigation.md";
const VALIDATOR = "scripts/validation/check-phase-52.mjs";
const INDEX = "docs/l2-runbooks/00-index.md";
const NEW_CONTENT_FILES = [RB24, RB25];
```

**Adapt for Phase 53 (D-13 — pinned per CONTEXT.md; renames require same-commit validator update):**
```javascript
// D-13: Pinned anchor strings — same-commit validator update required on any rename.
const OV  = "docs/operations/co-management/00-overview.md";
const TA  = "docs/operations/co-management/01-windows-tenant-attach.md";
const WS  = "docs/operations/co-management/02-windows-workload-sliders.md";
const MP  = "docs/operations/co-management/03-cocmgmt-migration-paths.md";
const IDX = "docs/operations/00-index.md";
const VAL = "scripts/validation/check-phase-53.mjs";

const CO_MGMT_FILES = [OV, TA, WS, MP];  // files checked for V-53-10 NEGATIVE assertions
const CONTENT_FILES = [OV, TA, WS, MP, IDX];  // all 5 content files for V-53-06 frontmatter
```

---

#### V-53-01..05 File existence checks — copy from analog V-52-01..04 shape

**From analog** (`check-phase-52.mjs` lines 30–61):
```javascript
{
  id: 1, name: "V-52-01: 24-linux-log-collection.md exists",
  run() {
    const c = readFile(RB24);
    if (c === null) return { pass: false, detail: "File missing: " + RB24 };
    return { pass: true, detail: c.length + " bytes" };
  }
},
```

**Phase 53 — 6 existence checks (V-53-01..05 content + V-53-03 self-referential validator):**
```javascript
{
  id: 1, name: "V-53-01: 00-overview.md exists",
  run() {
    const c = readFile(OV);
    if (c === null) return { pass: false, detail: "File missing: " + OV };
    return { pass: true, detail: c.length + " bytes" };
  }
},
// Repeat for id:2 TA / id:3 WS / id:4 MP / id:5 IDX / id:6 self-referential VAL
{
  id: 6, name: "V-53-03: check-phase-53.mjs exists (self-referential)",
  run() {
    const c = readFile(VAL);
    if (c === null) return { pass: false, detail: "File missing: " + VAL };
    return { pass: true, detail: c.length + " bytes" };
  }
},
```

---

#### V-53-06 Frontmatter check — copy from analog V-52-05 shape, adapt tokens

**From analog** (`check-phase-52.mjs` lines 63–91):
```javascript
{
  id: 5, name: "V-52-05: both new content files have platform: Linux + audience: L2 + 60-day cycle",
  run() {
    const failures = [];
    for (const f of NEW_CONTENT_FILES) {
      const c = readFile(f);
      if (c === null) { failures.push(f + ": file missing"); continue; }
      const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
      const fm = fmMatch[1];
      const issues = [];
      if (!/^platform: Linux\s*$/m.test(fm)) issues.push("platform: Linux missing");
      if (!/^audience: L2\s*$/m.test(fm)) issues.push("audience: L2 missing");
      const lvMatch = fm.match(/^last_verified: (\d{4}-\d{2}-\d{2})\s*$/m);
      const rbMatch = fm.match(/^review_by: (\d{4}-\d{2}-\d{2})\s*$/m);
      ...
      const days = (rb - lv) / (1000 * 60 * 60 * 24);
      if (days > 60) issues.push("review_by > 60 days after last_verified...");
    }
  }
}
```

**Adapt for Phase 53 (loop over CONTENT_FILES; platform: Windows; audience: admin):**
```javascript
{
  id: 7, name: "V-53-06: all 5 content files have platform: Windows + audience: admin + 60-day cycle",
  run() {
    const failures = [];
    for (const f of CONTENT_FILES) {
      const c = readFile(f);
      if (c === null) { failures.push(f + ": file missing"); continue; }
      const fmMatch = c.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) { failures.push(f + ": no frontmatter"); continue; }
      const fm = fmMatch[1];
      const issues = [];
      if (!/^platform: Windows\s*$/m.test(fm)) issues.push("platform: Windows missing");
      if (!/^audience:\s*\S+/m.test(fm)) issues.push("audience field missing");
      const lvMatch = fm.match(/^last_verified: (\d{4}-\d{2}-\d{2})\s*$/m);
      const rbMatch = fm.match(/^review_by: (\d{4}-\d{2}-\d{2})\s*$/m);
      if (!lvMatch) issues.push("last_verified missing/invalid");
      if (!rbMatch) issues.push("review_by missing/invalid");
      if (lvMatch && rbMatch) {
        const lv = new Date(lvMatch[1]), rb = new Date(rbMatch[1]);
        const days = (rb - lv) / (1000 * 60 * 60 * 24);
        if (days > 60) issues.push("review_by > 60 days after last_verified (was " + Math.round(days) + ")");
      }
      if (issues.length > 0) failures.push(f + ": " + issues.join("; "));
    }
    if (failures.length === 0) return { pass: true, detail: CONTENT_FILES.length + " files valid" };
    return { pass: false, detail: failures.join(" | ") };
  }
},
```

---

#### V-53-07 through V-53-26 — check shapes

**V-53-07 (7-workload literal tokens in OV):**
```javascript
{
  id: 8, name: "V-53-07: 00-overview.md contains all 7 workload literal tokens",
  run() {
    const c = readFile(OV);
    if (c === null) return { pass: false, detail: "File missing: " + OV };
    const required = ["Compliance Policies", "Windows Update Policies", "Resource Access",
      "Endpoint Protection", "Device Configuration", "Office Click-to-Run Apps", "Client Apps"];
    const missing = required.filter(s => !c.includes(s));
    if (missing.length > 0) return { pass: false, detail: "Missing workload tokens: " + missing.join(", ") };
    return { pass: true, detail: "all 7 workload tokens present" };
  }
},
```

**V-53-08 (## Three Workload Slider States H2 + 3 state tokens):**
```javascript
{
  id: 9, name: "V-53-08: 00-overview.md has ## Three Workload Slider States H2 + 3 state tokens",
  run() {
    const c = readFile(OV);
    if (c === null) return { pass: false, detail: "File missing: " + OV };
    if (!/^## Three Workload Slider States\s*$/m.test(c))
      return { pass: false, detail: "## Three Workload Slider States H2 missing" };
    const h2Idx = c.indexOf("## Three Workload Slider States");
    const section = c.slice(h2Idx, h2Idx + 2000);
    const states = ["Configuration Manager", "Pilot Intune", "Intune"];
    const missing = states.filter(s => !section.includes(s));
    if (missing.length > 0) return { pass: false, detail: "State tokens missing near H2: " + missing.join(", ") };
    return { pass: true, detail: "H2 + 3 state tokens confirmed" };
  }
},
```

**V-53-09 (POSITIVE — collection-scoped near Pilot Intune):**

**Pattern from** `check-phase-51.mjs` V-51-09 shape (proximity check):
```javascript
{
  id: 10, name: "V-53-09: POSITIVE — 'collection-scoped' near 'Pilot Intune' in 00-overview.md",
  run() {
    const c = readFile(OV);
    if (c === null) return { pass: false, detail: "File missing: " + OV };
    const lines = c.split('\n');
    const piIdx = lines.findIndex(l => l.includes("Pilot Intune"));
    if (piIdx === -1) return { pass: false, detail: "'Pilot Intune' not found" };
    const window = lines.slice(Math.max(0, piIdx - 5), piIdx + 10).join('\n');
    if (!window.includes("collection-scoped"))
      return { pass: false, detail: "'collection-scoped' not within ~10 lines of 'Pilot Intune'" };
    return { pass: true, detail: "'collection-scoped' confirmed near 'Pilot Intune'" };
  }
},
```

**V-53-10 (NEGATIVE — ban partially/fully migrated from CO_MGMT_FILES only):**

**Pattern from** `check-phase-51.mjs` V-51-19 inverse shape (negative regression-guard):
```javascript
{
  id: 11, name: "V-53-10: NEGATIVE — no 'partially/fully migrated' variants in co-management files",
  run() {
    const failures = [];
    const banned = [
      /partially\s+migrated/i, /partially-migrated/i, /partially_migrated/i,
      /fully\s+migrated/i, /fully-migrated/i, /fully_migrated/i
    ];
    for (const f of CO_MGMT_FILES) {  // SCOPE RESTRICTION: only docs/operations/co-management/
      const c = readFile(f);
      if (c === null) { failures.push(f + ": file missing"); continue; }
      const found = banned.filter(r => r.test(c)).map(r => r.toString());
      if (found.length > 0) failures.push(f + ": PITFALL-8 violation: " + found.join(", "));
    }
    if (failures.length > 0) return { pass: false, detail: failures.join(" | ") };
    return { pass: true, detail: "no partially/fully-migrated phrasings in co-management files" };
  }
},
```

**V-53-11 (comparison table in TA):**
```javascript
if (!/\| Capability \| Tenant Attach \| Full Co-Management \|/.test(c))
  return { pass: false, detail: "Comparison table header missing from 01-windows-tenant-attach.md" };
```

**V-53-12 (SC#3 literals in TA):**
```javascript
const required = ["no workload switching", "workload sliders"];
const missing = required.filter(s => !c.toLowerCase().includes(s.toLowerCase()));
```

**V-53-15 (EP HIGH-RISK Layer 1 in WS workload table row):**
```javascript
const c = readFile(WS);
if (!c.includes("HIGH-RISK"))
  return { pass: false, detail: "HIGH-RISK token missing from WS workload table" };
```

**V-53-16 (EP HIGH-RISK Layer 2 — blockquote opener + verbatim Defender mandate):**
```javascript
if (!c.includes("> ⚠️ **Endpoint Protection HIGH-RISK:**"))
  return { pass: false, detail: "Layer 2 blockquote opener missing" };
if (!c.includes("do not move this slider until Intune Defender for Endpoint policy is published, targeted, and confirmed reporting healthy"))
  return { pass: false, detail: "Layer 2 verbatim Defender mandate missing" };
```

**V-53-17 (EP HIGH-RISK Layer 3 — ≥2 inline reminders):**

**Pattern from** `check-phase-52.mjs` V-52-08 (token count):
```javascript
const tokens = (c.match(/\[HIGH-RISK/g) || []).length;
if (tokens < 2) return { pass: false, detail: "Need >=2 [HIGH-RISK inline reminders; found " + tokens };
```

**V-53-18 (platform applicability blockquote in first 50 lines of OV + TA + WS):**
```javascript
for (const f of [OV, TA, WS]) {
  const c = readFile(f);
  if (c === null) { failures.push(f + ": file missing"); continue; }
  // Strip frontmatter first
  const body = c.replace(/^---\n[\s\S]*?\n---\n/, '');
  const first50 = body.split('\n').slice(0, 50).join('\n');
  if (!first50.includes('> **Platform applicability:**'))
    failures.push(f + ": > **Platform applicability:** not in first 50 lines of body");
}
```

**V-53-19 (cross-platform analog tokens in blockquotes):**
```javascript
const required = ["Jamf", "ABM MDM transfer", "MAM", "Device Administrator"];
// check within the Platform applicability blockquote content
```

**V-53-20 (Autopatch prereqs in MP):**
```javascript
const required = ["Device Configuration", "Office Click-to-Run", "Autopatch", "prerequisite"];
const missing = required.filter(s => !c.includes(s));
```

**V-53-21 (NEGATIVE — NO platform applicability in MP):**

Directly inverse of V-53-18:
```javascript
if (c.includes('> **Platform applicability:**'))
  return { pass: false, detail: "V-53-21 violation: > **Platform applicability:** must NOT appear in 03-cocmgmt-migration-paths.md" };
```

**V-53-22 (ops/00-index.md — POSITIVE H2 + NEGATIVE regression-guard):**

**Novel shape for Phase 53** (new file, single H2 — not append-after-existing-H2):
```javascript
{
  id: 23, name: "V-53-22: ops/00-index.md has ## Co-Management H2 + no scaffold H2s",
  run() {
    const c = readFile(IDX);
    if (c === null) return { pass: false, detail: "File missing: " + IDX };
    // POSITIVE
    if (!/^## Co-Management\s*$/m.test(c))
      return { pass: false, detail: "## Co-Management H2 missing from 00-index.md" };
    // NEGATIVE
    const banPatterns = [
      /^## Patch Management/m, /^## App Lifecycle/m, /^## Drift/m,
      /^## Tenant Migration/m, /Phase 5[4-6]/m, /\bTBD\b/m, /Coming in Phase/m
    ];
    for (const p of banPatterns) {
      if (p.test(c)) return { pass: false, detail: "Scaffold/future-phase content found: " + p.toString() };
    }
    return { pass: true, detail: "## Co-Management H2 present; no scaffold H2s" };
  }
},
```

**V-53-23 (forward-link in WS to v1.2 migration content):**
```javascript
const hasLink = c.includes("imaging-to-autopilot.md") || c.includes("device-operations/04-tenant-migration.md");
if (!hasLink) return { pass: false, detail: "No forward-link to imaging-to-autopilot.md or 04-tenant-migration.md" };
```

**V-53-24 (soft cross-link from OV to MP Autopatch):**
```javascript
if (!c.includes("03-cocmgmt-migration-paths.md"))
  return { pass: false, detail: "No cross-link from 00-overview.md to 03-cocmgmt-migration-paths.md" };
```

**V-53-25 (TBD/TODO scan — copy from V-52-22 verbatim):**

**From analog** (`check-phase-52.mjs` lines 340–353):
```javascript
{
  id: 26, name: "V-52-22: NEITHER runbook contains TBD/TODO/FIXME/XXX/PLACEHOLDER outside Version History",
  run() {
    const failures = [];
    for (const f of NEW_CONTENT_FILES) {
      const c = readFile(f);
      if (c === null) { failures.push(f + ": file missing"); continue; }
      const stripped = c.replace(/^## Version History[\s\S]*$/m, '');
      if (/\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/.test(stripped)) failures.push(f + ": placeholder token in structural text");
    }
    ...
  }
},
```

**Phase 53 — loop over CONTENT_FILES:**
```javascript
for (const f of CONTENT_FILES) {
  const c = readFile(f);
  if (c === null) { failures.push(f + ": file missing"); continue; }
  const stripped = c.replace(/^## Changelog[\s\S]*$/m, '').replace(/^## Version History[\s\S]*$/m, '');
  if (/\b(TBD|TODO|FIXME|XXX|PLACEHOLDER)\b/.test(stripped))
    failures.push(f + ": placeholder token found");
}
```

**V-53-26 (Resource Access `deprecated` near `CB 2203`/`CB 2403` in OV + WS):**
```javascript
for (const f of [OV, WS]) {
  const c = readFile(f);
  if (c === null) { failures.push(f + ": file missing"); continue; }
  if (!c.includes("deprecated") || !c.includes("Resource Access"))
    { failures.push(f + ": 'deprecated' and 'Resource Access' required"); continue; }
  // Proximity check: deprecated within 10 lines of Resource Access
  const lines = c.split('\n');
  const raIdx = lines.findIndex(l => l.includes("Resource Access"));
  if (raIdx === -1) { failures.push(f + ": Resource Access not found"); continue; }
  const window = lines.slice(Math.max(0, raIdx - 5), raIdx + 10).join('\n');
  if (!window.includes("deprecated"))
    { failures.push(f + ": 'deprecated' not within 10 lines of 'Resource Access'"); continue; }
  if (!window.includes("CB 2203") && !window.includes("CB 2403"))
    failures.push(f + ": CB 2203 or CB 2403 not within 10 lines of Resource Access deprecated note");
}
```

---

#### Runner + output + exit — copy verbatim from analog (no changes)

**From analog** (`check-phase-52.mjs` lines 356–381):
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

Copy this block verbatim — no changes needed.

---

## Shared Patterns

### Frontmatter C10-local contract (all 5 content files)

**Source:** `docs/admin-setup-android/00-overview.md` lines 1–7; adapted per D-12
**Apply to:** All 5 new content files (V-53-06)

Required fields:
- `platform: Windows` (all 5 files — Phase 53 is Windows-led co-management)
- `audience: admin` (default; `admin,L2` acceptable for 02 per CD-08)
- `last_verified: <plan-execution-date>`
- `review_by: <last_verified + 60d>`
- `applies_to: all`

**Note on C10 scope:** The global C10 check (`v1.5-milestone-audit.mjs` lines 141–178) uses `linuxDocPaths()` and does NOT cover `docs/operations/` files. Frontmatter is enforced ONLY by V-53-06 local assertion. No sidecar amendment required at Phase 53 ship (CDI-Phase53-06).

---

### `> **Platform applicability:**` blockquote (files 00, 01, 02 ONLY)

**Source:** RESEARCH.md Pattern 2 (constructed; no direct codebase analog)
**Apply to:** `00-overview.md`, `01-windows-tenant-attach.md`, `02-windows-workload-sliders.md` only
**NOT applied to:** `03-cocmgmt-migration-paths.md` (V-53-21 negative guard)

The blockquote is identical in all three files. Place immediately after frontmatter `---` closing fence, before H1.

**Corrected cross-link paths (RESEARCH.md Area 3 verification):**
- macOS: `../../admin-setup-macos/02-enrollment-profile.md` (singular — file EXISTS)
- iOS enrollment: `../../admin-setup-ios/00-overview.md` (EXISTS)
- iOS MAM: `../../admin-setup-ios/09-mam-app-protection.md` (EXISTS — NOT `04-byod-mam-overview.md` which does NOT exist)
- Android: `../../admin-setup-android/00-overview.md` (EXISTS)

---

### EP HIGH-RISK three-layer callout (02-windows-workload-sliders.md only)

**Source:** Phase 52 D-01 three-layer confidence pattern; DPO-Phase52-07 cross-domain transfer endorsement
**Apply to:** `02-windows-workload-sliders.md` only
**Validator enforcement:** V-53-15 (Layer 1), V-53-16 (Layer 2), V-53-17 (Layer 3 count ≥2)

Layer 1: `**HIGH-RISK** — see callout` in workload table Risk column cell
Layer 2: `> ⚠️ **Endpoint Protection HIGH-RISK:**` blockquote with verbatim Defender mandate (copy from D-05 verbatim text)
Layer 3: `[HIGH-RISK — see callout above]` inline reminder at ≥2 locations in file body

---

### Pilot Intune POSITIVE+NEGATIVE dual-defense (00-overview.md + validator)

**Source:** Phase 51 V-51-09 (POSITIVE proximity check) + V-51-19 (NEGATIVE regression-guard) paired pattern
**Apply to:** `00-overview.md` content authoring + `check-phase-53.mjs` V-53-09 + V-53-10

POSITIVE (V-53-09): `collection-scoped` token within ~10 lines of "Pilot Intune" mention
NEGATIVE (V-53-10): ban `partially migrated` / `partially-migrated` / `fully migrated` / `fully-migrated` from all 4 `docs/operations/co-management/` files

CRITICAL scope restriction: V-53-10 scans ONLY `CO_MGMT_FILES` (the 4 files under `docs/operations/co-management/`). The PITFALLS.md file itself contains the banned phrases as quoted failure examples and must be excluded. Use the `CO_MGMT_FILES` array constant for the loop, never a glob scan.

---

### Validator file-reads-only pattern

**Source:** `scripts/validation/check-phase-52.mjs` lines 11–18 (readFile helper) + lines 356–381 (runner + exit)
**Apply to:** `scripts/validation/check-phase-53.mjs`

Pattern: `join(process.cwd(), relPath)` + `existsSync` guard + `readFileSync` — no shell exec, no external npm deps, no markdown-AST library.

---

### Resource Access deprecation dual-file note (V-53-26)

**Apply to:** Both `00-overview.md` AND `02-windows-workload-sliders.md`

Both files must contain `deprecated` within 10 lines of `Resource Access` AND reference `CB 2203` or `CB 2403`. The validator uses a proximity check identical to V-52-07 (blockquote proximity to path reference).

---

### TBD/TODO scan

**Source:** `check-phase-52.mjs` V-52-22 (lines 340–353) — copy verbatim, expand to CONTENT_FILES
**Apply to:** All 5 new content files

Strip changelog/version-history section before regex scan to avoid false positives on historical change descriptions.

---

## No Analog Found

The following content surfaces have no direct codebase analog and must be authored from RESEARCH.md factual content:

| Surface | Why no codebase analog | Source to use instead |
|---------|----------------------|----------------------|
| Co-management 7-workload slider model (ops-domain) | First ops-tree file in v1.5; no prior Windows co-management operational docs exist in the repo | RESEARCH.md Area 1 — verified Microsoft Learn workload names and slider state definitions |
| Tenant attach vs full co-management distinction content | New disambiguation content with no prior analog in any platform | RESEARCH.md Area 3 — verified Microsoft Learn cloud-attach overview; RESEARCH.md Pattern 5 comparison table |
| Windows Autopatch co-management prerequisites (three workloads) | No prior Autopatch prereqs content in repo; REQUIREMENTS.md COMG-05 text is INCOMPLETE (two workloads) | RESEARCH.md Area 2 — verified Microsoft Learn Autopatch prereqs page (updated 2026-02-26): THREE workloads required |
| `> **Platform applicability:**` blockquote (ops-domain shape) | Phase 53 introduces this shape; distinct from L1/L2 `> **Platform gate:**` shape used in runbooks | RESEARCH.md Pattern 2 (constructed from D-08 + verified cross-link targets) |
| `docs/operations/` directory structure | New directory tree created by Phase 53; no prior ops/ tree exists | D-01 + D-02 file naming decisions |

---

## Critical Anti-Patterns (Do Not Copy)

| Anti-Pattern | Source of False Analog | Why Forbidden |
|-------------|----------------------|---------------|
| `> **Platform gate:**` shape | `docs/admin-setup-android/00-overview.md` line 9; `docs/admin-setup-ios/00-overview.md` line 9 | L1/L2 runbook audience pattern; ops-domain uses `> **Platform applicability:**` per D-08 |
| iOS cross-link to `04-byod-mam-overview.md` | CONTEXT.md D-08 text (verbatim) | File does NOT exist; use `09-mam-app-protection.md` instead (RESEARCH.md Area 3 verification) |
| macOS cross-link to `02-enrollment-profiles.md` (plural) | CONTEXT.md D-08 text | Actual file is `02-enrollment-profile.md` (singular); verified by RESEARCH.md Area 3 |
| `> **Platform applicability:**` in 03-cocmgmt-migration-paths.md | D-08 applies to 00/01/02 | V-53-21 NEGATIVE regression-guard will FAIL; 03 is Windows Autopatch prereqs only (D-09) |
| Two-workload Autopatch prereqs (Device Config + Office C2R only) | REQUIREMENTS.md COMG-05 text | Incomplete — Microsoft Learn (2026-02-26) requires THREE workloads including Windows Update Policies |
| Scaffold H2s in ops/00-index.md (## Patch Management, etc.) | D-02 1B-2/1B-3 rejected options | V-53-22 NEGATIVE regression-guard will FAIL; Phase 53 ships co-management H2 ONLY |
| Two separate commits (content then validator) | Default multi-step instinct | V-53-22 assertion forces single-commit landing (CDI-Phase53-04); D-14 explicit |

---

## Metadata

**Analog search scope:** `docs/admin-setup-android/`, `docs/admin-setup-ios/`, `docs/admin-setup-macos/`, `docs/admin-setup-apv2/`, `docs/reference/`, `docs/device-operations/`, `docs/lifecycle/`, `docs/l2-runbooks/`, `scripts/validation/`
**Analog files read:** `docs/admin-setup-android/00-overview.md`, `docs/admin-setup-ios/00-overview.md`, `docs/admin-setup-macos/00-overview.md`, `docs/admin-setup-apv2/00-overview.md`, `docs/reference/android-capability-matrix.md` (Cross-Platform Equivalences section), `docs/reference/imaging-to-autopilot.md`, `docs/device-operations/04-tenant-migration.md`, `docs/lifecycle/04-esp.md` (lines 137–138), `scripts/validation/check-phase-52.mjs` (full), `scripts/validation/check-phase-51.mjs` (lines 1–60)
**Pattern extraction date:** 2026-04-28
