# Phase 34: Android Foundation - Research

**Researched:** 2026-04-21
**Domain:** Android Enterprise foundational documentation (glossary, tri-portal template, enrollment overview, provisioning matrix, version matrix)
**Confidence:** HIGH (all five deliverables have direct precedent + verified source material)

## Summary

Phase 34 is the structural-and-conceptual foundation for the v1.4 Android Enterprise milestone. It produces **five documents** that anchor every downstream phase (35-42): an Android glossary, a tri-portal admin template, an enrollment overview, a provisioning-method matrix, and an Android version matrix. All five have direct structural precedent in v1.3 (iOS Phase 26) and v1.2 (macOS Phase 22-23), so the authoring risk is low — the research risk is in (a) content accuracy for fast-moving Android behaviors (version gating, COPE language, AOSP OEM matrix) and (b) fidelity to the 33 locked design decisions from `34-CONTEXT.md`.

CONTEXT.md is the authoritative design contract for this phase. Of 33 decisions, 15 specify exact structure (table shapes, column names, ordering), 10 specify content gates (what content must appear where), 6 specify anti-pattern guards (what MUST NOT appear), and 2 are frontmatter/metadata rules. This research document does NOT revisit any locked decision — it surfaces the implementation-level content sources, verification approaches, and specific facts the planner needs to compose executable tasks that honor every decision.

**Primary recommendation:** Plan Phase 34 as 5 parallel authoring tracks (one per deliverable) gated by two constraints: (1) the glossary and admin template should be authored FIRST because the enrollment overview cross-references both; (2) Anti-Pattern 1 (no matrix duplication) and Anti-Pattern 4 (definitions stand alone; cross-platform notes follow) are the two highest-risk patterns to violate and must be encoded as plan-level verification checks, not just author discretion.

## User Constraints (from CONTEXT.md)

### Locked Decisions

All 33 decisions below are verbatim from `.planning/phases/34-android-foundation/34-CONTEXT.md` and are NOT open for reconsideration in planning. The planner MUST honor every row.

#### Enrollment Overview Structure (AEBASE-02 / SC2)

- **D-01:** 5-column mode-comparison table mirroring v1.3 Phase 26 iOS shape (docs/ios-lifecycle/00-enrollment-overview.md lines 31-36). Columns: **Mode | Ownership Model | Management Scope | Provisioning Surface | Appropriate Use Case**. Rows per mode: ZTE, COBO (Fully Managed), BYOD Work Profile, Dedicated, AOSP.
- **D-02:** Separate narrative section placed immediately after the comparison table explains the two orthogonal axes (ownership vs management scope). Narrative — not a table column — carries the axes explanation. Title: "Two Axes of Android Enterprise."
- **D-03:** iOS supervision analog as a dedicated subsection, NOT a column header, to stay AEAUDIT-04 clean (zero uses of "supervision" as an Android management term). Section titled "For Admins Familiar with iOS" uses this exact framing: "Android's Fully Managed mode is the closest analog to iOS Supervision, but the mapping is partial — iOS supervision is a permanent per-device state gating ~60 restriction settings; Android Fully Managed is an ownership-mode designation. See [_glossary-android.md#fully-managed](../_glossary-android.md#fully-managed) for disambiguation."
- **D-04:** Management Scope column values use Android terminology only — "Fully managed" / "Work profile" / "Dedicated (COSU)" / "AOSP (unmanaged)". Do NOT use "Supervised" / "Unsupervised" for Android. Phase 34 narrative does the iOS cross-platform bridging — table rows stay Android-native.
- **D-05:** AOSP row in the comparison table carries explicit "out-of-GMS" annotation in the Provisioning Surface column ("QR only, OEM-gated") and is explicitly called out in the narrative as structurally different (no MGP binding, no work profile, OEM matrix defined separately in Phase 39 stub).
- **D-06:** Provisioning Surface column (not full provisioning matrix) lists 1-2 representative methods per mode and links to `docs/android-lifecycle/02-provisioning-methods.md` for the full method-mode matrix. Prevents Anti-Pattern 1 duplication.
- **D-07:** Target length 800-1200 words (matches v1.3 iOS precedent D-01).

#### Android Glossary Structure (AEBASE-01 / SC1)

- **D-08:** Mirror `docs/_glossary-macos.md` structure exactly: alphabetical pipe-delimited index at top (line 16 pattern), `---` separator, then category sections.
- **D-09:** Categories: Enrollment / Ownership & Management Scope / Provisioning Methods / Portals & Binding / Compliance & Attestation. Five categories absorb all 13 disambiguation entries without forcing term-to-category ambiguity.
- **D-10:** Per-term cross-platform callout after definition, using Anti-Pattern 4 "Do this instead" format: `> **Cross-platform note:** [How this Android term differs from the term with the same name on Windows/macOS/iOS]`. Definition stands alone; callout comes after.
- **D-11:** 13 mandatory disambiguation entries per AEBASE-01: work profile, supervision (as "absent Android concept" callout-only entry pointing to Fully Managed), user enrollment, dedicated, corporate identifiers, COBO, COPE, BYOD, DPC, Managed Google Play (MGP), afw#setup, WPCO, fully managed.
- **D-12:** Additional Android-native terms (non-collision but needed for downstream phases): Zero-Touch Enrollment, Play Integrity, AMAPI, Managed Home Screen (MHS), Entra shared device mode, EMM.
- **D-13:** Version history section at the bottom — same pattern as `_glossary-macos.md` (observed lines 111+) — records term evolution (COPE→WPCO language drift, AMAPI April 2025 migration, SafetyNet→Play Integrity January 2025 deprecation).
- **D-14:** `last_verified` + `review_by` frontmatter with 60-day review cycle (not 90-day) per SUMMARY.md guidance: Android UI changes faster than macOS.
- **D-15:** Reciprocal cross-reference stub added to `docs/_glossary-macos.md` — a 1-line "See also: Android Provisioning Glossary" entry (AEAUDIT-03 is Phase 42's full reciprocal-link work; Phase 34 does not modify _glossary-macos.md content, only notes the planned reciprocal link for Phase 42).

#### Admin Template Structure (AEBASE-05 / SC3)

- **D-16:** Single template file at `docs/_templates/admin-template-android.md`. Three H4 portal sub-sections: `#### In Intune admin center` / `#### In Managed Google Play` / `#### In Zero-Touch portal`.
- **D-17:** ZT portal section wrapped in HTML-comment subtractive pattern following exact precedent from admin-template-macos.md lines 76-77 and admin-template-ios.md lines 98-99:
  ```markdown
  <!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
       corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
       via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
       admin guides (neither uses the Zero-Touch portal). -->
  ```
- **D-18:** Managed Google Play subsection is mandatory for all GMS-based modes (COBO, BYOD, Dedicated, ZTE) — MGP binding is the prerequisite gate per PITFALLS.md Pitfall 2. Template does NOT make MGP optional. Only AOSP guides delete the MGP subsection, and Phase 39 AOSP stub writes that guide using a different pattern per research.
- **D-19:** "What breaks if misconfigured" callouts required per every configurable setting (pattern inherited from admin-template-macos.md and admin-template-ios.md). Tri-portal cross-portal symptoms documented inline.
- **D-20:** Renewal/Maintenance section mandatory by default (unlike iOS template where optional) — per ARCHITECTURE.md Q3 guidance. Both MGP binding and ZT reseller relationship have maintenance obligations.
- **D-21:** Frontmatter block at top: `platform: Android`, `audience: admin`, `last_verified: YYYY-MM-DD`, `review_by: YYYY-MM-DD` (60-day review cycle).
- **D-22:** Renumbered downstream admin guides — the admin-setup-android/ directory starts at `00-overview.md` (Phase 35), so template is Phase 34 deliverable but not numbered in the admin-setup-android/ sequence.

#### Provisioning-Method Matrix Orientation (AEBASE-03 / SC4)

- **D-23:** Mode-rows × method-cols orientation. Rows: COBO, BYOD Work Profile, Dedicated, ZTE, AOSP. Columns: NFC, QR, afw#setup, Zero-Touch. Cell values: ✓ / ✗ / the specific min Android version where support exists. Reader locates mode first, scans row for supported methods — matches AEBASE-03 phrasing.
- **D-24:** Android version availability embedded in cells (not a separate column). A cell like "✓ Android 11+ (COPE NFC removed)" carries both the supported marker and the version gate.
- **D-25:** Dedicated supplementary column "Notes" after the 4 method columns captures mode-level constraints that don't fit per-cell (e.g., COBO row Notes: "Dual-SIM devices: register IMEI 1"; Dedicated row Notes: "MHS exit-PIN sync requirement — see Phase 38").
- **D-26:** Single canonical matrix in `docs/android-lifecycle/02-provisioning-methods.md` — Anti-Pattern 1 guard. Downstream mode guides (Phases 36-39) reference this matrix via filtered-row link patterns, NOT by duplicating grids.
- **D-27:** Mutual-exclusion callout on ZT column for Samsung devices: Knox Mobile Enrollment is mutually exclusive with Zero-Touch on Samsung hardware. Callout placed adjacent to the Zero-Touch column header, not inside a cell.
- **D-28:** No Knox ME row in v1.4 — KME deferred to v1.4.1 per PROJECT.md Key Decisions. Matrix notes that KME will be added in v1.4.1 (stub reference only).

#### Version Fragmentation Matrix Structure (AEBASE-04 / SC5)

- **D-29:** Breakpoints-only orientation. Three columns: **Mode | Intune Minimum OS | Notable Version Breakpoints**. Rows per mode (COBO, BYOD Work Profile, Dedicated, ZTE, AOSP). Mirrors FEATURES.md lines 350-358 research structure.
- **D-30:** Narrative callouts per breakpoint live in a second section below the matrix titled "Version Breakpoint Details." Each breakpoint (Android 11 COPE NFC removal / Android 12 IMEI & serial removal / Android 15 FRP hardening) gets its own subsection with mode impact and admin action required.
- **D-31:** Do NOT add `min_android_version` as frontmatter on any Android doc — ARCHITECTURE.md Q7 explicit prohibition. Version gating lives in this matrix body only; downstream admin guides cite back to this matrix.
- **D-32:** Supplementary subsection "Non-version Breakpoints" covers temporal deprecations: SafetyNet → Play Integrity (January 2025), AMAPI migration for BYOD (April 2025). Document alongside version breakpoints so admins have a single drift-surface.
- **D-33:** `last_verified` frontmatter on this matrix is load-bearing — milestone audit (Phase 42) uses this date as the audit anchor. 60-day review cycle (not 90).

### Claude's Discretion

- Exact word counts within the 800-1200 enrollment-overview target
- Narrative tone and voice in the enrollment overview (factual, audience-mixed)
- Exact category names in the glossary so long as the 5-category count and coverage of 13 terms + Android-native terms is preserved
- Mermaid diagram inclusion in the enrollment overview (iOS Phase 26 used one; Android may benefit from a ownership × management-scope decision diagram — author's call)
- Exact cell content for the provisioning-method matrix version annotations (shortest readable phrasing)
- Whether to include a "Portal shorthand glossary" at the top of the admin template
- Ordering of the 5 category sections in the glossary

### Deferred Ideas (OUT OF SCOPE for Phase 34)

- **Knox Mobile Enrollment row in provisioning-method matrix** — deferred to v1.4.1. Phase 34 matrix includes a placeholder note.
- **Full AOSP OEM matrix (RealWear, Zebra, Pico, HTC VIVE Focus, Meta Quest)** — deferred to v1.4.1. Phase 34 matrices reference AOSP in a single row; the full OEM breakdown is Phase 39 stub's scope.
- **4-platform comparison document** — deferred to v1.5.
- **Cross-platform navigation integration** (backport Android into `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`) — deferred to post-v1.4 unification task. Phase 42 handles only the `docs/index.md` Android stub.
- **Reciprocal cross-reference link from `docs/_glossary-macos.md` to `docs/_glossary-android.md`** — deferred to Phase 42 (AEAUDIT-03).
- **Mermaid diagram in enrollment overview** — author's discretion (Claude's Discretion).

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEBASE-01 | Intune admin can read an Android Enterprise glossary that disambiguates 13 terms colliding with existing Windows/macOS/iOS glossaries | [CITED: _glossary-macos.md lines 16, 26, 32, 44, 50, 111+] — alphabetical index + per-category sections + per-term cross-platform callout + version history pattern all have direct precedent. Terms inventoried in PITFALLS.md Pitfall 3 and FEATURES.md Mode deep-dives. |
| AEBASE-02 | Intune admin can read an Android enrollment overview explaining the two orthogonal axes, with a supervision analog explanation | [CITED: docs/ios-lifecycle/00-enrollment-overview.md lines 31-36] — 5-col comparison table + per-path narrative + supervision section at #supervision anchor is the direct structural precedent. Two-axis content sourced from FEATURES.md lines 10-19. |
| AEBASE-03 | Intune admin can read a provisioning-method matrix comparing NFC / QR / afw#setup / Zero-Touch across all supported modes with Android version availability | [VERIFIED: FEATURES.md lines 329-336 research matrix] — 5-mode × 4-method grid with version annotations directly sourced from ref-corporate-methods (MS Learn updated 2025-12-04) and Jason Bayton Android Enterprise provisioning methods. |
| AEBASE-04 | Intune admin can read an Android version fragmentation matrix showing minimum OS per mode and notable breakpoints | [VERIFIED: FEATURES.md lines 350-358 + web verification] — Three breakpoints (Android 11 COPE NFC removal, Android 12 IMEI/serial removal, Android 15 FRP hardening) all confirmed via Jason Bayton + Google AE Help + MS Learn. |
| AEBASE-05 | Doc author can reference a tri-portal admin template with H4 sub-sections for Intune admin center / Managed Google Play / Zero-Touch portal | [CITED: admin-template-macos.md lines 76-77, admin-template-ios.md lines 98-99] — HTML-comment subtractive-deletion pattern is the exact precedent for the ZT portal optional subsection. Three H4 sub-sections are a straightforward extension of the existing 2-portal pattern. |

## Architectural Responsibility Map

This phase is documentation-only. The "tier" dimension is *audience layer* within the doc suite, not client/server layers. Each deliverable has a primary audience tier and a structural responsibility:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| `_glossary-android.md` (term disambiguation for 13 terms + 6 Android-native) | All audiences (L1/L2/Admin/End-user) | — | Glossary is cross-cutting; every downstream doc links to it. Cannot be scoped to one audience. |
| `admin-template-android.md` (tri-portal template) | Doc Author | Admin (inherited via copy) | Template is the authoring surface; downstream mode admin guides (Phases 35-38) instantiate it. |
| `android-lifecycle/00-enrollment-overview.md` (two-axes + 5-mode comparison + iOS supervision analog) | Admin | L1/L2 (via "How to Use This Guide") | Admin is the primary decision-maker on mode selection; L1/L2 routed via audience-routing section per iOS Phase 26 D-03 precedent. |
| `android-lifecycle/02-provisioning-methods.md` (mode × method matrix) | Admin | L1 (filtered-row reference) | Admin selects provisioning method at enrollment profile creation; L1 references method-specific rows when triaging "device not enrolling" symptoms. |
| `android-lifecycle/03-android-version-matrix.md` (breakpoints-only + narrative) | Admin | L2 (version-specific bug triage) | Admin needs minimum-version per mode; L2 references breakpoints when investigating version-specific failures. |

**Design implication:** Because no deliverable is single-audience, every deliverable should contain an explicit "How to Use This Guide" or equivalent audience-routing block at the top, matching the iOS Phase 26 D-03 / v1.2 macOS audience-routing pattern.

## Standard Stack

Phase 34 is pure documentation — no runtime dependencies, no libraries. The "stack" is tooling and conventions inherited from v1.0-v1.3.

### Core

| Tool / Convention | Version | Purpose | Why Standard |
|-------------------|---------|---------|--------------|
| Markdown (CommonMark + GFM tables) | — | All five deliverables are .md files | Established across 118 docs in suite; no alternative considered |
| YAML frontmatter | — | `last_verified`, `review_by`, `platform: Android`, `audience` | Established schema from v1.0; extended with `platform: Android` per ARCHITECTURE.md Q7 |
| Alphabetical pipe-delimited index pattern | — | Top-of-glossary navigation | [CITED: `_glossary-macos.md` line 16] — established pattern; mirror exactly |
| HTML-comment subtractive-deletion pattern | — | Optional template subsections (ZT portal, Renewal) | [CITED: `admin-template-macos.md` lines 76-77, `admin-template-ios.md` lines 98-99] — locked by D-17 |
| `> **Cross-platform note:**` blockquote | — | Per-term glossary callout AFTER definition | [CITED: `_glossary-macos.md` lines 26, 32, 38, 44, 50] — locked by D-10 (Anti-Pattern 4 guard) |
| 5-column comparison table pattern | — | Enrollment overview mode comparison | [CITED: `docs/ios-lifecycle/00-enrollment-overview.md` lines 31-36] — locked by D-01 |
| `> **Platform gate:**` blockquote | — | Top-of-page scope/cross-platform callout | Established pattern from `_glossary-macos.md` line 9 and iOS/macOS enrollment overviews |
| `> **What breaks if misconfigured:**` callout | — | Per-setting consequence callout in admin template | [CITED: `admin-template-macos.md` line 48, `admin-template-ios.md` line 70] — locked by D-19 |

### Supporting

| Tool / Convention | Version | Purpose | When to Use |
|-------------------|---------|---------|-------------|
| Anchor-only cross-reference (`[term](../_glossary-android.md#anchor)`) | — | Link from enrollment overview / provisioning matrix / version matrix to glossary term | Every term-of-art occurrence in first appearance per doc |
| Mermaid diagram | v10+ (GitHub-rendered) | Optional ownership × management scope decision diagram | Claude's Discretion per CONTEXT.md; iOS Phase 26 used mermaid for lifecycle pipeline |
| 60-day `review_by` cadence | — | Frontmatter — all Android docs | Locked by D-14, D-33; rationale: Android UI / OEM firmware moves faster than macOS (90-day) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Mode-rows × method-cols matrix orientation | Method-rows × mode-cols (what FEATURES.md lines 329-336 used) | CONTEXT.md D-23 LOCKED the mode-rows orientation to match AEBASE-03 phrasing ("for any given enrollment mode"). Research-doc orientation was exploratory; published-doc orientation is reader-first. |
| Single 4-column version matrix (Mode / Min OS / Recommended / Breakpoints) | Three columns (no Recommended) | CONTEXT.md D-29 LOCKED three columns. Research FEATURES.md line 350-358 had "Practical Recommended" — cut to avoid version drift (Pitfall 1). |
| "Supervision Analog" as a column header | Dedicated narrative subsection | CONTEXT.md D-03 LOCKED subsection-only. AEAUDIT-04 forbids "supervision" as an Android management term. |

**Installation:** N/A — no package installs for this phase. No `npm view` verification needed because no npm/pip dependencies are introduced.

## Architecture Patterns

### System Architecture Diagram

```
Phase 34 Deliverables + Their Consumers
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│  docs/_glossary-android.md  ◄─────────┐ (all downstream Android    │
│     [13 disambig + 6 Android-native]  │  docs link terms here)     │
│                                       │                            │
│  docs/_templates/admin-template-android.md                         │
│     [tri-portal H4 sub-sections]  ◄───┼──┐ (Phases 35-38 copy this │
│                                       │  │  as starting point)     │
│                                       │  │                         │
│  docs/android-lifecycle/              │  │                         │
│   00-enrollment-overview.md  ─────────┤  │                         │
│     [5-col table + 2-axes narrative   │  │                         │
│      + iOS supervision analog]        │  │                         │
│                                       │  │                         │
│   02-provisioning-methods.md  ◄───────┤  │  ──► Phase 36-39        │
│     [mode×method matrix,              │  │     (filtered-row       │
│      5 rows × 4 cols + Notes]         │  │      references)        │
│                                       │  │                         │
│   03-android-version-matrix.md  ◄─────┤  │  ──► Phase 42 audit     │
│     [3-col matrix + breakpoint        │  │     (last_verified      │
│      detail + non-version section]    │  │      anchor)            │
│                                       │  │                         │
└───────────────────────────────────────┴──┴────────────────────────┘

Anti-Pattern 1 guard: matrices live HERE only; downstream guides
reference filtered rows, never duplicate the grid.

Anti-Pattern 4 guard: each glossary term defined on its own merits
FIRST; `> **Cross-platform note:**` blockquote added AFTER definition.
```

Entry points:
- An admin opening `docs/index.md` (Phase 42 stub) lands on enrollment-overview.md
- A doc author writing a mode admin guide (Phase 35-38) copies admin-template-android.md
- A term encountered in any Android doc links to `_glossary-android.md#term`
- Phase 42 milestone audit targets `03-android-version-matrix.md` frontmatter `last_verified` as the drift anchor

### Recommended Project Structure

```
docs/
├── _glossary-android.md              # NEW [Phase 34]
├── _templates/
│   └── admin-template-android.md     # NEW [Phase 34]
├── android-lifecycle/                # NEW subdirectory [Phase 34]
│   ├── 00-enrollment-overview.md     # NEW [Phase 34]
│   ├── 02-provisioning-methods.md    # NEW [Phase 34]
│   └── 03-android-version-matrix.md  # NEW [Phase 34]
└── [all other docs untouched]
```

Notes:
- `01-android-prerequisites.md` (AEPREQ-01) is **Phase 35 scope**, NOT Phase 34 — intentionally absent from Phase 34 deliverables. The gap (00 → 02 → 03) is preserved.
- `admin-setup-android/` directory is NOT created in Phase 34 — that's Phase 35 scope (D-22).
- Phase 34 touches NO v1.0-v1.3 files. Pitfall 9 (v1.0-v1.3 shared file modification) guard.

### Pattern 1: Alphabetical-Index-Plus-Category Glossary

**What:** Top-of-page pipe-delimited alphabetical index of all terms, followed by `---` separator, followed by category-grouped definitions.

**When to use:** `_glossary-android.md`

**Example:**
```markdown
# Android Enterprise Provisioning Glossary

## Alphabetical Index

[afw#setup](#afwsetup) | [AMAPI](#amapi) | [BYOD](#byod) | [COBO](#cobo) | [COPE](#cope) | [Corporate Identifiers](#corporate-identifiers) | [Dedicated](#dedicated) | [DPC](#dpc) | [EMM](#emm) | [Entra Shared Device Mode](#entra-shared-device-mode) | [Fully Managed](#fully-managed) | [Managed Google Play](#managed-google-play) | [Managed Home Screen](#managed-home-screen) | [Play Integrity](#play-integrity) | [Supervision](#supervision) | [User Enrollment](#user-enrollment) | [Work Profile](#work-profile) | [WPCO](#wpco) | [Zero-Touch Enrollment](#zero-touch-enrollment)

---

## Enrollment

### Work Profile

[Android-specific definition, 2-4 sentences, on own merits.]

> **Cross-platform note:** On iOS, "Work Profile" has no direct equivalent — the closest Apple parallel is account-driven [User Enrollment](../_glossary-macos.md#account-driven-user-enrollment), which uses a managed APFS volume rather than a work profile container. On Windows, there is no equivalent concept. Do not conflate.
```

Source: [CITED: `_glossary-macos.md` lines 14-51] — direct structural template.

### Pattern 2: 5-Column Mode Comparison Table

**What:** 5 columns (Mode, Ownership Model, Management Scope, Provisioning Surface, Appropriate Use Case); 5 rows (one per Android mode).

**When to use:** `android-lifecycle/00-enrollment-overview.md`

**Example:**
```markdown
| Mode | Ownership Model | Management Scope | Provisioning Surface | Appropriate Use Case |
|------|----------------|------------------|---------------------|---------------------|
| Zero-Touch Enrollment (ZTE) | Corporate-owned | Fully managed (or Dedicated via portal) | Zero-Touch portal + Intune | Corporate-scale automated enrollment via reseller |
| Fully Managed (COBO) | Corporate-owned | Fully managed | QR, NFC, afw#setup, Zero-Touch | Corporate single-user device; maximum admin control |
| BYOD Work Profile | Personally-owned | Work profile (containerized) | Company Portal (user-initiated) | BYOD with data separation; user keeps personal side |
| Dedicated (COSU) | Corporate-owned | Dedicated (locked kiosk) | QR, NFC, afw#setup, Zero-Touch | Kiosk, digital signage, shared shift devices |
| AOSP | Corporate-owned (specialty) | AOSP (unmanaged / no GMS) | QR only, OEM-gated | AR/VR headsets, rugged specialty devices without GMS |
```

Source: [CITED: `docs/ios-lifecycle/00-enrollment-overview.md` lines 31-36] — iOS Phase 26 precedent.

### Pattern 3: Tri-Portal H4 Sub-Section Template

**What:** `### Step N` level contains three (or fewer) `#### In [Portal]` sub-sections. ZT portal subsection wrapped in HTML-comment subtractive-deletion guidance.

**When to use:** `_templates/admin-template-android.md`

**Example:**
```markdown
### Step N: [Configuration action]

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Android** > **Enrollment** > **[path]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {portal}.]

#### In Managed Google Play

1. Sign in to [Managed Google Play](https://play.google.com/work).
2. Navigate to **[section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {portal} — which may differ from where the misconfiguration was set.]

<!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
     corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
     via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
     admin guides (neither uses the Zero-Touch portal). -->

#### In Zero-Touch portal

1. Sign in to [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers).
2. Navigate to **[section]**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence. Symptom appears in: {portal}.]
```

Source: [CITED: `admin-template-macos.md` lines 42-58, 76-77] + [CITED: `admin-template-ios.md` lines 62-80, 98-99] — composite extension adding third portal sub-section.

### Pattern 4: Mode-First Provisioning Matrix (Reader-Model Aligned)

**What:** Rows = modes; Columns = provisioning methods + "Notes" column. Each cell has ✓ / ✗ / version-gated ✓. Version annotations embedded in cells, not split to a separate column.

**When to use:** `android-lifecycle/02-provisioning-methods.md`

**Example:**
```markdown
> **Samsung devices:** Knox Mobile Enrollment (KME) is mutually exclusive with
> Zero-Touch on the same device. Configure only one. KME is deferred to v1.4.1;
> see the KME deferral note below.

| Mode | NFC | QR | afw#setup | Zero-Touch | Notes |
|------|-----|-----|-----------|------------|-------|
| Fully Managed (COBO) | ✓ (Android 8+) | ✓ (Android 9+ built-in; Android 7-8 needs external reader) | ✓ | ✓ | Dual-SIM devices: register IMEI 1 (see Phase 35) |
| BYOD Work Profile | ✗ | ✗ | ✗ | ✗ | Company Portal user-initiated only; no corporate provisioning methods apply |
| Dedicated (COSU) | ✓ (Android 8+) | ✓ (Android 9+ built-in) | ✓ | ✓ | MHS exit-PIN sync requirement — see Phase 38 |
| Zero-Touch Enrollment | — | — | — | ✓ (via portal) | ZT is itself a provisioning method; reseller requirement is Step 0 — see Phase 35 |
| AOSP | ✗ | ✓ (Android 10+, one device at a time) | ✗ | ✗ | OEM firmware-specific; see Phase 39 stub |
```

Source: [CITED: FEATURES.md lines 329-336] — data source; orientation flipped per D-23.

### Pattern 5: Breakpoints-Only Version Matrix + Narrative Detail Section

**What:** Three columns (Mode, Intune Minimum OS, Notable Version Breakpoints) + `## Version Breakpoint Details` section below with one `###` per breakpoint.

**When to use:** `android-lifecycle/03-android-version-matrix.md`

**Example:**
```markdown
| Mode | Intune Minimum OS | Notable Version Breakpoints |
|------|-------------------|----------------------------|
| Fully Managed (COBO) | Android 10.0 | Android 11: enrollment time grouping; Android 15: FRP hardening |
| BYOD Work Profile | Android 5.0 (practical: Android 8) | Android 9: built-in QR reader; Android 12: IMEI/serial removed from corporate identifiers; Android 15: Private Space unsupported |
| Dedicated (COSU) | Android 8.0 | Android 9: built-in QR reader; Android 15: FRP hardening on re-provisioning |
| Zero-Touch Enrollment | Android 8.0 (Oreo) | Android 15: FRP hardening affects re-enrollment flows |
| AOSP | Varies by OEM firmware | Not an Android API level — OEM firmware-specific |

## Version Breakpoint Details

### Android 11 — COPE NFC Provisioning Removed

**Affected modes:** COBO (no impact, QR/afw#setup/ZT still supported); COPE (NFC and afw#setup paths removed).
**What changed:** Google removed NFC and DPC identifier (afw#setup) as valid provisioning methods for work profile on corporate-owned (COPE/WPCO) on Android 11+.
**Admin action required:** For COBO, no action. For COPE, migrate to QR or Zero-Touch.
**References:** [Jason Bayton — Android 11 COPE changes](https://bayton.org/android/android-11-cope-changes/), [MS Learn ref-corporate-methods](https://learn.microsoft.com/en-us/intune/device-enrollment/android/ref-corporate-methods).

### Android 12 — IMEI/Serial Removed from Corporate Identifiers (BYOD only)

**Affected modes:** BYOD Work Profile only.
**What changed:** Google removed IMEI/serial/MEID read access from personally-owned work profile devices.
**Admin action required:** Cannot pre-mark Android 12+ personal devices via identifier upload. Corporate identifiers work only on Android 11 and earlier for BYOD. COBO/COSU/COPE auto-mark as corporate at enrollment — no change for those modes.
**References:** [MS Learn Add corporate identifiers](https://learn.microsoft.com/en-us/intune/device-enrollment/add-corporate-identifiers).

### Android 15 — Factory Reset Protection Hardening

**Affected modes:** COBO (re-enrollment after reset), Dedicated (re-provisioning), Zero-Touch (re-enrollment). BYOD WP unaffected.
**What changed:** OEM unlocking setting no longer affects the reset process; after a hard reset, Enterprise Factory Reset Protection (EFRP) is always enforced. FRP now triggers on more reset pathways than in Android 13/14.
**Admin action required:** Configure Enterprise Factory Reset Protection (EFRP) via Intune policy BEFORE devices are reset. Without EFRP configured, re-enrollment flows that worked on Android 13/14 can block on Android 15.
**References:** [Google AE Help — Enable enterprise factory reset protection](https://support.google.com/work/android/answer/14549362), [Jason Bayton — Android 15: What's new for enterprise?](https://bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/).

## Non-Version Breakpoints

### SafetyNet → Play Integrity (January 2025)

Google turned off SafetyNet Attestation API in January 2025. Play Integrity API is the successor. Intune compliance UI uses "Play Integrity verdict" terminology (Basic / Basic + Device / Strong integrity with hardware-backed security). All Android compliance documentation must use Play Integrity; no SafetyNet references.

### AMAPI Migration for BYOD (April 2025)

Microsoft migrated Android personally-owned work profile management to AMAPI (Android Management API) in April 2025. Custom OMA-URI profiles for BYOD Work Profile are no longer supported. Wi-Fi configuration now requires certificate-based authentication (username/password Wi-Fi broken). Management app changed from Company Portal to Microsoft Intune app (both are still installed, but the Intune app is now the primary management surface).
```

Source: [CITED: FEATURES.md lines 350-358] for matrix data + [VERIFIED: 2026-04-21 web check] for Android 15 FRP + [CITED: PITFALLS.md Pitfall 13] for SafetyNet/Play Integrity.

### Anti-Patterns to Avoid

- **Anti-Pattern 1 — Embedding matrices inside each mode guide:** The provisioning-method matrix and version matrix MUST live in `android-lifecycle/` reference docs only. Downstream mode guides (Phase 36-39) reference via filtered-row links, never duplicate. Enforced by D-06, D-26.

- **Anti-Pattern 4 — Defining Android terms as iOS/macOS analogs:** Each glossary term MUST be defined on its own Android merits first; cross-platform `> **Cross-platform note:**` callout comes AFTER. Writing "Work Profile — similar to iOS Supervision" is forbidden. Enforced by D-10.

- **"Supervision" as an Android management term:** AEAUDIT-04 forbids "supervision" as a primary term in Android docs. The iOS-supervision-analog discussion lives in a dedicated `## For Admins Familiar with iOS` subsection inside the enrollment overview; the glossary entry for "Supervision" is an "absent Android concept" callout pointing to Fully Managed. Enforced by D-03, D-11.

- **"COPE deprecated" language:** Google has NOT formally deprecated COPE. Use "Google recommends WPCO" language. Enforced by STATE.md research flag for Phase 36.

- **SafetyNet in compliance content:** SafetyNet was turned off January 2025. Play Integrity is the current API. Any Phase 34 compliance-related glossary entry MUST use Play Integrity. Enforced by D-12 (Play Integrity as Android-native term), D-32 (non-version breakpoint).

- **QR code images in docs:** QR codes are sensitive artifacts; documented examples expire. Document generation process, never embed images.

- **Linking from Phase 34 docs to deferred files:** `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, and full `docs/index.md` integration are deferred. Phase 34 docs must not link to these (except `_glossary-macos.md` read-only, which is allowed).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Glossary alphabetical navigation | Custom index generator or script | Manually-written pipe-delimited index per `_glossary-macos.md` line 16 | 19 terms is a manageable hand-count; the existing pattern is proven and consistent |
| Template instantiation for downstream guides | A "generator" script that stamps out Phase 35-38 guides from the template | Doc author copies `admin-template-android.md` and fills in placeholders | Matches iOS/macOS template pattern; no tooling exists in this project |
| Cross-platform terminology table | A "superset" 4-platform comparison doc in Phase 34 | Per-term `> **Cross-platform note:**` callouts inside each glossary entry | 4-platform comparison is explicitly deferred to v1.5 (AECOMPARE-01) |
| Version-matrix data as code (e.g., JSON) | A YAML/JSON data file with a generator producing the matrix | Hand-authored markdown table | Matches FEATURES.md research-matrix pattern; no project tooling for doc generation |
| Per-term cross-reference validation | A link-checker that validates `#anchor` targets exist | Manual verification during review + milestone audit (Phase 42) | Milestone audit (AEAUDIT-04) is the verification step; no link-checker tooling in repo |
| Mermaid diagram for provisioning matrix | A mermaid flow chart of mode × method support | Markdown table (GFM) with ✓ / ✗ / version annotation | Tables are more scannable for matrix data; mermaid is for flows and state transitions |

**Key insight:** This is a documentation phase in an established doc suite with proven patterns. Building tooling or generators adds surface area without benefit. The correct discipline is fidelity to existing patterns.

## Runtime State Inventory

**Phase 34 is a pure greenfield content-creation phase.** It creates 5 new files in 2 new directory locations. It does NOT rename, refactor, migrate, or touch existing stored state.

One narrow runtime-state consideration: the 5 new files establish anchors that Phase 35-42 will cross-reference. Once Phase 34 ships, those anchors become load-bearing. Renaming a section heading in Phase 35+ would break the Phase 34 cross-references. This is an authoring hygiene concern, not a Runtime State Inventory concern.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no databases, no Mem0, no ChromaDB, no SQLite involved in this phase | None |
| Live service config | None — no n8n workflows, no Datadog tags, no external service registrations affected | None |
| OS-registered state | None — no Task Scheduler, no pm2, no systemd affected | None |
| Secrets/env vars | None — no credentials, SOPS keys, or env vars involved | None |
| Build artifacts | None — no installed packages, no egg-info, no compiled binaries affected | None |

**Section conclusion: Phase 34 has zero runtime state inventory items. No migration tasks required.**

## Common Pitfalls

### Pitfall 1: Writing Glossary Terms as iOS/macOS Analogs (Anti-Pattern 4 Violation)

**What goes wrong:** Author defines "Work Profile" as "similar to iOS User Enrollment — a containerized BYOD partition." Readers apply the iOS mental model to Android and miss behavioral differences.
**Why it happens:** Cross-platform familiarity is natural when writing the second/third platform; analogies feel helpful.
**How to avoid:** Define each term on its own Android merits first (2-4 sentences). Cross-platform difference goes in `> **Cross-platform note:**` AFTER. Template the pattern explicitly in author instructions.
**Warning signs:** First sentence of a glossary definition contains "iOS" or "macOS" or "like supervision"; primary definition frames the Android term by what it is not.

**Source:** [CITED: ARCHITECTURE.md Anti-Pattern 4 lines 520-527]; locked by D-10.

### Pitfall 2: Using "Supervision" as an Android Management Term

**What goes wrong:** Author writes "Android supervised mode" or uses "Supervision" as a column header in the enrollment overview. Downstream Phase 42 audit (AEAUDIT-04) catches and blocks the milestone.
**Why it happens:** iOS Phase 26 established supervision as the primary management axis; cross-platform brain carries it over to Android.
**How to avoid:** Use "Management Scope" as the column name (D-04 locked). Put iOS-supervision-analog discussion in a dedicated `## For Admins Familiar with iOS` narrative subsection (D-03 locked). The glossary entry for "Supervision" exists only as a callout-only entry pointing to Fully Managed (D-11 locked).
**Warning signs:** grep for "supervis" in any Phase 34 deliverable other than (a) the dedicated "For Admins Familiar with iOS" subsection, (b) the glossary callout-only entry, (c) cross-reference links to macOS glossary.

**Source:** [CITED: PITFALLS.md Pitfall 3 lines 63-94]; locked by D-03, D-04, D-11.

### Pitfall 3: Duplicating the Provisioning Matrix in Mode Guides (Anti-Pattern 1)

**What goes wrong:** Author of `02-provisioning-methods.md` (Phase 34) or `03-fully-managed-cobo.md` (Phase 36) embeds the full 5×4 matrix inside the mode guide. Two copies drift over time.
**Why it happens:** Feels more "complete" to give readers the full grid. Author thinks filtered-row references are harder to read.
**How to avoid:** Phase 34 ships ONE canonical matrix in `02-provisioning-methods.md`. Phase 34 enrollment overview's "Provisioning Surface" column has 1-2 representative methods only (D-06 locked) and a cross-reference link. Plan verification: grep for any duplicate matrix structures.
**Warning signs:** A markdown table with "| NFC | QR | afw#setup | Zero-Touch |" columns appearing in more than one file; version annotations appearing in multiple files (version drift origin).

**Source:** [CITED: ARCHITECTURE.md Anti-Pattern 1 lines 496-502]; locked by D-06, D-26.

### Pitfall 4: "COPE Deprecated" Language

**What goes wrong:** Author writes "COPE is deprecated; use WPCO instead." Google has not formally deprecated COPE — only recommended WPCO. Statement is factually wrong and admins managing COPE fleets will push back on accuracy.
**Why it happens:** Community shorthand conflates "recommended against" with "deprecated."
**How to avoid:** Glossary entry for COPE uses exact phrasing: "Google recommends WPCO" (D-11, D-13). Version history section records the language drift. Ref checked 2026-04-21 web search: community consensus is COPE and WPCO are used interchangeably; WPCO is the newer preferred term per IBM MaaS360, Hexnode, TinyMDM, Scalefusion. No formal deprecation from Google.
**Warning signs:** The words "COPE deprecated" appear in any Phase 34 deliverable.

**Source:** [CITED: STATE.md Phase 36 research flag]; [VERIFIED 2026-04-21: Google recommends WPCO language, web search confirms no formal deprecation]; locked by D-11.

### Pitfall 5: Version Annotation Drift Between Matrices

**What goes wrong:** Provisioning matrix says "NFC: Android 8+" in a cell; version matrix says "COBO minimum OS: Android 10" with no NFC note. Reader sees contradiction.
**Why it happens:** Two matrices authored independently by separate plans.
**How to avoid:** Version annotations in provisioning matrix cells reference Android-version gating for that *method × mode combination*; version matrix minimums reference Intune-enforced minimums for the *mode*. These are different axes — they must align but are not equivalent. Cross-reference explicitly: provisioning-methods.md cells that cite a version should reference version-matrix.md for the mode-level minimum.
**Warning signs:** An admin asks "Which is the correct minimum for COBO — Android 8 (NFC cell) or Android 10 (version matrix)?" If the answer isn't obvious, the cross-reference is missing.

**Source:** Research derived from D-24 (embedded version in cells) + D-29 (separate Intune Minimum OS column).

### Pitfall 6: Adding Deferred Content Early

**What goes wrong:** Author includes Knox Mobile Enrollment as a 5th row in the provisioning matrix, or creates a glossary entry for Knox Platform for Enterprise, because it "feels incomplete without it."
**Why it happens:** Knox is visible in Microsoft's own documentation as an option; feels like an oversight.
**How to avoid:** PROJECT.md explicitly defers Knox ME to v1.4.1. Matrix includes ONLY the note "KME will be added in v1.4.1 (stub reference only)" (D-28). Similarly no deep AOSP OEM matrix — Phase 39 stub handles that.
**Warning signs:** A new row in the provisioning matrix for Knox; an AOSP OEM breakdown table in Phase 34 docs; a Knox-specific glossary entry.

**Source:** [CITED: PROJECT.md Key Decisions]; [CITED: CONTEXT.md Deferred Ideas]; locked by D-28.

### Pitfall 7: Breaking Phase 35-42 Anchor Dependencies

**What goes wrong:** Phase 34 glossary uses heading "### Fully Managed Mode" but Phase 36 admin guide links to `_glossary-android.md#fully-managed`. The auto-generated anchor for "### Fully Managed Mode" is `#fully-managed-mode`, not `#fully-managed`. Phase 36 link breaks silently.
**Why it happens:** Markdown auto-anchor generation is heading-text-derived; small heading changes break anchors.
**How to avoid:** Establish canonical anchor names in Phase 34 and document them in CONTEXT.md-style records. Phase 35-42 cross-references use these exact anchors. For the enrollment overview, canonical anchors established in this research: `#two-axes`, `#fully-managed`, `#work-profile`, `#dedicated`, `#aosp`, `#zero-touch-enrollment`, `#for-admins-familiar-with-ios`. For the glossary: `#cobo`, `#cope`, `#wpco`, `#byod`, `#fully-managed`, `#work-profile`, `#dedicated`, `#supervision`, `#user-enrollment`, `#corporate-identifiers`, `#managed-google-play`, `#zero-touch-enrollment`, `#play-integrity`, `#afw-setup` (matches `afw#setup` minus `#`), `#dpc`, `#amapi`, `#managed-home-screen`, `#entra-shared-device-mode`, `#emm`. For the provisioning matrix: `#nfc`, `#qr`, `#afw-setup`, `#zero-touch`, `#samsung-kme-mutual-exclusion`. For the version matrix: `#cobo`, `#byod`, `#dedicated`, `#zte`, `#aosp`, `#android-11-breakpoint`, `#android-12-breakpoint`, `#android-15-breakpoint`, `#non-version-breakpoints`.
**Warning signs:** Phase 35+ plan references an anchor that doesn't exist in the Phase 34 delivered file.

**Source:** Research-derived implication of CONTEXT.md Integration Points lines 148-150.

### Pitfall 8: Linking from Phase 34 Docs to Deferred Shared Files

**What goes wrong:** Author writes "See [common issues](../common-issues.md)" in the enrollment overview. But `common-issues.md` has no Android section yet (deferred to post-v1.4). Link target exists but Android content is absent.
**Why it happens:** Cross-reference instinct; these files exist in the repo and look like valid link targets.
**How to avoid:** Treat Phase 34 deliverables as self-contained. Cross-references stay within `docs/android-lifecycle/`, `docs/_glossary-android.md`, `docs/_templates/admin-template-android.md`, and read-only cross-refs to `docs/_glossary-macos.md` and `docs/_glossary.md`. No links to `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md`, `docs/index.md`.
**Warning signs:** grep Phase 34 deliverables for links to any of the four deferred files.

**Source:** [CITED: PITFALLS.md Pitfall 9 lines 233-259]; matches CONTEXT.md canonical_refs lines 113-116.

## Code Examples

### Canonical Glossary Entry (13 disambiguation terms)

Verified pattern from [CITED: `_glossary-macos.md` lines 22-32]:

```markdown
### Work Profile

Android Enterprise's containerized partition on a user's device. The work profile creates a separate
OS-level container that holds managed apps, data, and policies, isolated from the personal profile.
Work profile apps appear on the launcher with a badged briefcase icon. Data does not cross the
profile boundary by default; the user can pause the work profile (Android 7+) to suspend notifications
and managed apps. Applies to both BYOD Work Profile (personally-owned device) and Work Profile on
Corporate-Owned devices (WPCO, formerly COPE).

> **Cross-platform note:** On iOS, there is no direct equivalent to Android's work profile. The closest
> Apple parallel is [Account-Driven User Enrollment](../_glossary-macos.md#account-driven-user-enrollment),
> which uses a managed APFS volume rather than a profile container. On macOS and Windows, there is no
> equivalent concept. The term "work profile" in Microsoft's Windows documentation ("Work profile on
> personally-owned devices") applies only to Android. Do not conflate with iOS's User Enrollment.
```

### Canonical Comparison Table Row (enrollment overview)

Verified pattern from [CITED: `docs/ios-lifecycle/00-enrollment-overview.md` lines 33-36]:

```markdown
| Fully Managed (COBO) | Corporate-owned | Fully managed | QR, NFC, afw#setup, Zero-Touch (see [02-provisioning-methods.md](02-provisioning-methods.md#cobo)) | Corporate single-user device; maximum admin control; no personal profile |
```

### Canonical Admin Template Step (tri-portal)

Verified pattern from [CITED: `admin-template-macos.md` lines 42-58] extended to three portals:

```markdown
### Step 1: [Configuration action]

#### In Intune admin center

1. Sign in to [Intune admin center](https://intune.microsoft.com).
2. Navigate to **Devices** > **Android** > **Enrollment** > **Enrollment profiles**.
3. [Action].

   > **What breaks if misconfigured:** [Consequence]. Symptom appears in: [portal where the admin or user notices the failure — often DIFFERENT from the portal where the misconfiguration was set, because Intune policy is delivered to MGP for app assignments and to Zero-Touch for DPC extras].
   > See: [Android Enrollment Blocked Runbook](../l1-runbooks/22-android-enrollment-blocked.md)

#### In Managed Google Play

1. Sign in to [Managed Google Play](https://play.google.com/work).
2. Navigate to **Apps**.
3. [Action].

<!-- Include the "In Zero-Touch portal" subsection ONLY if the guide covers
     corporate Zero-Touch Enrollment, Fully Managed COBO via ZT, or Dedicated
     via ZT. Delete this entire subsection for BYOD Work Profile and AOSP
     admin guides (neither uses the Zero-Touch portal). -->

#### In Zero-Touch portal

1. Sign in to [Zero-Touch portal](https://enterprise.google.com/android/zero-touch/customers).
2. Navigate to **Configurations**.
3. [Action].
```

### Canonical Provisioning Matrix Cell (version-annotated)

Pattern derived from [CITED: FEATURES.md lines 329-336]:

```markdown
| Fully Managed (COBO) | ✓ (Android 8+; NFC tag with 888+ bytes) | ✓ (Android 9+ built-in reader; 7-8 external) | ✓ (all supported Android) | ✓ (Android 8+) | Dual-SIM: register IMEI 1 only — see Phase 35 |
```

### Canonical Breakpoint Narrative (version matrix detail section)

Pattern from CONTEXT.md specifics section:

```markdown
### Android 15 — Factory Reset Protection Hardening

**Affected modes:** COBO (re-enrollment after reset), Dedicated (re-provisioning), Zero-Touch (re-enrollment).
**What changed:** OEM unlocking setting no longer affects the reset process; after a hard reset, Enterprise
Factory Reset Protection (EFRP) is always enforced. FRP triggers on more reset pathways than on Android 13/14.
**Admin action required:** Configure Enterprise Factory Reset Protection (EFRP) via Intune policy BEFORE
devices are reset. Without EFRP configured, re-enrollment flows that worked on Android 13/14 can block on
Android 15.
**References:** [Google AE Help — Enable EFRP](https://support.google.com/work/android/answer/14549362),
[Jason Bayton — Android 15 for enterprise](https://bayton.org/blog/2024/10/actually-new-for-enterprise-android-15/).
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| SafetyNet Attestation API | Play Integrity API (Basic / Basic + Device / Strong integrity) | January 2025 | Intune compliance UI uses "Play Integrity Verdict" — ALL Phase 34 compliance glossary entries must use Play Integrity |
| Custom OMA-URI for BYOD Work Profile | AMAPI-native configuration profiles | April 2025 | BYOD content is Phase 37 scope; Phase 34 glossary entry for AMAPI must note the April 2025 migration |
| Gmail account for MGP binding | Microsoft Entra account (preferred) | August 2024 | MGP binding mechanics are Phase 35 scope; Phase 34 glossary MGP entry should note Entra-preferred since Aug 2024 |
| "COPE deprecated" community shorthand | "Google recommends WPCO" | 2023+ (no formal Google deprecation) | Phase 34 glossary entry for COPE uses "Google recommends WPCO" language — no "deprecated" wording |
| Profile-based User Enrollment (iOS) | Account-Driven User Enrollment | iOS 18 deprecation (irrelevant to Android) | Mentioned because the glossary User Enrollment entry needs a cross-platform note clarifying that Android "user enrollment" (AOSP user-associated) is unrelated to Apple's User Enrollment |
| Android Device Administrator (DA) | Android Enterprise (work profile / fully managed) | Google deprecated DA 2020; Intune ending GMS support August 2024 | Phase 34 glossary: DA is NOT listed (deferred to v1.4 exclusion per REQUIREMENTS.md Out of Scope) |

**Deprecated / outdated:**
- **SafetyNet:** Do not reference as a compliance mechanism. Use Play Integrity.
- **"COPE deprecated":** Factually incorrect. Use "Google recommends WPCO" or "migrating toward WPCO."
- **"Supervised" for Android:** Terminology collision; do not use.
- **Custom OMA-URI profiles for BYOD:** Removed April 2025. Do not document as a BYOD option.
- **Gmail-only MGP binding:** Entra account is the preferred path since August 2024.

## Assumptions Log

Phase 34 research relied primarily on verified sources (CONTEXT.md locked decisions, direct file reads of precedent templates, MS Learn research in `.planning/research/*`). The following claims are flagged `[ASSUMED]` and need user/planner confirmation before execution:

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Canonical anchors for Phase 35-42 cross-references (listed in Pitfall 7) | Pitfall 7 | Phase 35+ plans would need to rebind to different anchor names; easy to fix but should be confirmed before Phase 34 authoring to avoid retroactive edits |
| A2 | The correct glossary anchor for "afw#setup" is `#afw-setup` (GitHub markdown strips the `#` when auto-generating anchors from headings) | Pitfall 7 / Pattern 1 | If GitHub strips differently on this repo, the anchor might be `#afwsetup` or require explicit ID attribute. Verifiable by testing in a preview. |
| A3 | 60-day review cycle is the correct cadence for ALL Phase 34 Android docs (not just fast-moving ones) | Standard Stack / D-14 / D-33 | Locked by D-14 and D-33 in CONTEXT.md; the assumption here is that "all" means "all five" — confirmed correct by re-reading CONTEXT.md |
| A4 | The enrollment-overview anchor for the iOS-supervision-analog section is `#for-admins-familiar-with-ios` | Pitfall 7 | D-03 locks the section *title* as "For Admins Familiar with iOS" but the anchor is author-derivable; if GitHub-style kebab-case, anchor is `#for-admins-familiar-with-ios` |

**If Phase 34 is planned before anchors A1-A4 are confirmed:** planner must include an explicit task to publish the canonical anchor list so Phase 35-42 plans can reference it.

## Open Questions

1. **Anchor registry: should Phase 34 produce a sixth deliverable — a canonical anchor list?**
   - What we know: Phase 35-42 CONTEXT.md Integration Points lines 148-150 state that Phase 34 establishes anchors that downstream phases depend on. No format for how those anchors are recorded.
   - What's unclear: Whether the anchors live only as headings inside the five deliverables (implicit registry) or whether Phase 34 should publish an explicit anchor-list file (explicit registry).
   - Recommendation: Publish anchors as headings inside the five deliverables (implicit). Add a short "Anchor Stability Guarantee" section to the enrollment overview stating "The H2/H3 anchors in this file are stable v1.4 contract surfaces; changes require a Phase 42 audit update." This gives the explicit-registry signal without a separate file. Author's discretion within D-07 word budget.

2. **Is the glossary entry for "Supervision" a `### Supervision` heading or a prose callout inside the Fully Managed entry?**
   - What we know: D-11 says "supervision (as 'absent Android concept' callout-only entry pointing to Fully Managed)."
   - What's unclear: "Callout-only entry" could mean (a) a top-level `### Supervision` heading whose body is a single callout + pointer, or (b) a cross-reference-only stub in the alphabetical index with no separate section.
   - Recommendation: Interpret as (a) — a `### Supervision` heading that appears in the alphabetical index AND has a short section body containing a single callout: "> **Android note:** 'Supervision' is an iOS/iPadOS concept. Android uses 'Fully Managed' for the closest analog — see [Fully Managed](#fully-managed)." This preserves disambiguation while being click-findable from the index. A cross-reference-only stub (option b) is also valid but less discoverable.

3. **Samsung KME mutual-exclusion callout placement in the provisioning matrix: above-table banner, adjacent-to-ZT-column, or in-cell?**
   - What we know: D-27 says "callout placed adjacent to the Zero-Touch column header, not inside a cell."
   - What's unclear: Markdown tables do not support column-header annotations natively; "adjacent to the column header" could mean (a) a blockquote immediately before the table, or (b) a footnote pointer on the column header ("Zero-Touch *[1]*"), or (c) a narrative subsection below the table.
   - Recommendation: Interpret as (a) — a `> **Samsung devices:**` blockquote immediately preceding the table. This satisfies "adjacent" (visually contiguous) and "not inside a cell" (not in the data grid). Matches the existing `> **Platform gate:**` pattern used at top of pages. Example given in Pattern 4 above.

4. **Does the admin template's Renewal/Maintenance section cover WHICH renewable components (MGP binding token, Google account, ZT reseller relationship, enrollment profile tokens)?**
   - What we know: D-20 makes the Renewal section mandatory; lists "MGP binding" and "ZT reseller relationship" as examples with maintenance obligations.
   - What's unclear: The template is a skeleton for downstream mode guides; the Renewal section's specific rows are author-filled per mode. What does the Phase 34 template file show?
   - Recommendation: The Phase 34 template shows a placeholder Renewal table with 2-3 example rows (MGP binding refresh, enrollment token rotation, ZT reseller contract) as guidance for the doc author who instantiates the template in Phase 35-38. Each downstream mode guide then customizes based on which components apply. Matches the iOS/macOS template pattern.

5. **Should Phase 34 verify the three research flags from STATE.md (ZT portal UI, token 90-day limit, COPE language) or defer to Phase 35/36 plan-time verification?**
   - What we know: STATE.md lists these as "research flags to verify at plan time" for Phase 35 and 36, not Phase 34.
   - What's unclear: Phase 34 content (enrollment overview, provisioning matrix) references Zero-Touch Enrollment and COPE terminology — the verification might be load-bearing for Phase 34 accuracy.
   - Recommendation: Phase 34 verifies ONLY what is load-bearing for its 5 deliverables. (a) ZT portal URL: verified in Stack research as `https://enterprise.google.com/android/zero-touch/customers`; stable enough for Phase 34. (b) Token 90-day limit: VERIFIED 2026-04-21 web search — applies specifically to AOSP userless (90 days) vs AOSP user-associated (65 years). Phase 34 version matrix does not need to state this; it's a Phase 35 Managed Google Play / token section concern. (c) COPE language: VERIFIED 2026-04-21 web search — "Google recommends WPCO" is the correct language; COPE is not formally deprecated. Phase 34 glossary COPE entry can be authored with confidence.

## Environment Availability

Phase 34 has no external dependencies. All deliverables are markdown files authored in-repo using standard editing tools.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| — | — | — | — | — |

**No missing dependencies. No environment audit needed.**

## Validation Architecture

Nyquist validation is enabled (config.json has no `nyquist_validation` key; absence defaults to enabled).

### Test Framework

Phase 34 is a documentation phase. There is no traditional test framework (pytest/jest/vitest). Validation is **grep-based mechanical checks + structural audits**.

| Property | Value |
|----------|-------|
| Framework | Bash grep + file-structure checks (no test runner) |
| Config file | None — checks are ad-hoc per-deliverable |
| Quick run command | `grep -l "supervis" docs/_glossary-android.md docs/android-lifecycle/00-enrollment-overview.md` and similar |
| Full suite command | Sequence of greps + word-count checks + frontmatter scans (see per-deliverable checks below) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEBASE-01 | Glossary disambiguates 13 terms | grep + structure | `grep -c "^### " docs/_glossary-android.md` ≥ 19 (13 disambig + 6 Android-native); `grep -c "> \*\*Cross-platform note:" docs/_glossary-android.md` ≥ 13 | Wave 0: create `docs/_glossary-android.md` |
| AEBASE-01 | Alphabetical index present | structure | First non-frontmatter content of `docs/_glossary-android.md` contains pipe-delimited links | Wave 0 |
| AEBASE-01 | Five category sections | structure | `grep -c "^## " docs/_glossary-android.md` ≥ 5 (plus ## Alphabetical Index and ## Version History → ≥ 7) | Wave 0 |
| AEBASE-01 | Version history section at bottom | structure | `tail -40 docs/_glossary-android.md` contains `## Version History` and a table | Wave 0 |
| AEBASE-02 | 5-col comparison table present | grep | `grep -c "| Mode | Ownership Model | Management Scope | Provisioning Surface | Appropriate Use Case |" docs/android-lifecycle/00-enrollment-overview.md` = 1 | Wave 0: create `docs/android-lifecycle/00-enrollment-overview.md` |
| AEBASE-02 | 5 mode rows in table | grep | After the column header, exactly 5 rows (ZTE, COBO, BYOD WP, Dedicated, AOSP) | Wave 0 |
| AEBASE-02 | "Two Axes of Android Enterprise" narrative section | grep | `grep -c "## Two Axes" docs/android-lifecycle/00-enrollment-overview.md` = 1 | Wave 0 |
| AEBASE-02 | "For Admins Familiar with iOS" subsection | grep | `grep -c "For Admins Familiar with iOS" docs/android-lifecycle/00-enrollment-overview.md` = 1 | Wave 0 |
| AEBASE-02 | Zero uses of "supervision" as an Android term | grep (AEAUDIT-04 pre-check) | `grep -i "supervised" docs/android-lifecycle/00-enrollment-overview.md` returns matches ONLY in the "For Admins Familiar with iOS" subsection and the sentence describing iOS supervision (manual review) | Wave 0 |
| AEBASE-02 | Word count 800-1200 | structure | `wc -w docs/android-lifecycle/00-enrollment-overview.md` in range 800-1200 (excluding frontmatter) | Wave 0 |
| AEBASE-03 | Mode × method matrix with mode rows | structure | Table in `docs/android-lifecycle/02-provisioning-methods.md` has rows = [COBO, BYOD WP, Dedicated, ZTE, AOSP]; columns = [NFC, QR, afw#setup, Zero-Touch, Notes] | Wave 0: create `docs/android-lifecycle/02-provisioning-methods.md` |
| AEBASE-03 | KME mutual-exclusion callout | grep | `grep -c -i "knox mobile enrollment" docs/android-lifecycle/02-provisioning-methods.md` ≥ 1; callout appears before the matrix table | Wave 0 |
| AEBASE-03 | Samsung KME deferral note | grep | `grep -c "v1.4.1" docs/android-lifecycle/02-provisioning-methods.md` ≥ 1 | Wave 0 |
| AEBASE-03 | Version annotations embedded in cells | grep | `grep -c "Android [0-9]+" docs/android-lifecycle/02-provisioning-methods.md` ≥ 4 (one per method) | Wave 0 |
| AEBASE-04 | 3-col Mode / Min OS / Breakpoints matrix | structure | Table in `docs/android-lifecycle/03-android-version-matrix.md` has 3 columns (Mode, Intune Minimum OS, Notable Version Breakpoints) | Wave 0: create `docs/android-lifecycle/03-android-version-matrix.md` |
| AEBASE-04 | Android 11 breakpoint detail | grep | `grep -c "Android 11" docs/android-lifecycle/03-android-version-matrix.md` ≥ 2 (matrix row + narrative section); section heading `### Android 11` exists | Wave 0 |
| AEBASE-04 | Android 12 breakpoint detail | grep | Same pattern for `Android 12` | Wave 0 |
| AEBASE-04 | Android 15 breakpoint detail | grep | Same pattern for `Android 15` | Wave 0 |
| AEBASE-04 | Non-version breakpoints section | grep | `grep -c "## Non-Version Breakpoints" docs/android-lifecycle/03-android-version-matrix.md` = 1 | Wave 0 |
| AEBASE-04 | No `min_android_version` frontmatter | grep | `grep "min_android_version" docs/android-lifecycle/*.md` returns empty | Wave 0 |
| AEBASE-04 | No SafetyNet references | grep (AEAUDIT-04 pre-check) | `grep -i "safetynet" docs/android-lifecycle/03-android-version-matrix.md` returns at most 1 match (the "SafetyNet → Play Integrity" breakpoint narrative) | Wave 0 |
| AEBASE-05 | Three H4 portal sub-sections | grep | `grep -c "^#### In Intune admin center" docs/_templates/admin-template-android.md` ≥ 1; same for `#### In Managed Google Play` and `#### In Zero-Touch portal` | Wave 0: create `docs/_templates/admin-template-android.md` |
| AEBASE-05 | HTML-comment subtractive-deletion for ZT | grep | `grep -B 1 "^#### In Zero-Touch portal" docs/_templates/admin-template-android.md` shows an HTML comment with "Delete this entire subsection for BYOD Work Profile and AOSP" | Wave 0 |
| AEBASE-05 | "What breaks if misconfigured" callout pattern | grep | `grep -c "What breaks if misconfigured" docs/_templates/admin-template-android.md` ≥ 2 (at least one per relevant portal sub-section) | Wave 0 |
| AEBASE-05 | Renewal/Maintenance section | grep | `grep -c "^## Renewal" docs/_templates/admin-template-android.md` = 1 | Wave 0 |
| All | Frontmatter with 60-day review_by | grep | For each file: `last_verified` + `review_by` both present in YAML frontmatter; the difference is ≤ 60 days | Wave 0 |
| All | Platform: Android frontmatter | grep | `grep "^platform: [Aa]ndroid$" docs/_glossary-android.md docs/_templates/admin-template-android.md docs/android-lifecycle/*.md` returns 5 matches | Wave 0 |
| All | No links to deferred shared files | grep | `grep -l -E "common-issues\.md\|quick-ref-l1\.md\|quick-ref-l2\.md" docs/_glossary-android.md docs/_templates/admin-template-android.md docs/android-lifecycle/*.md` returns 0 files | Wave 0 |
| All | No modifications to v1.0-v1.3 shared files | git | `git diff --name-only master HEAD -- docs/_glossary-macos.md docs/_glossary.md docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md docs/index.md` returns empty for Phase 34 commits | Wave 0 |

### Sampling Rate

- **Per task commit:** Run grep spot-checks on the file(s) the task modified. Word count check for enrollment overview if that file was touched.
- **Per wave merge:** Full file-existence check; frontmatter presence check; cross-reference integrity check (every `[...](...#anchor)` has a matching anchor).
- **Phase gate:** All 26 Req-ID checks above pass. No SafetyNet / no raw "supervision" as Android term / no deferred-file links / no v1.0-v1.3 shared file diffs.

### Wave 0 Gaps

All five deliverable files do NOT exist yet — all are created in this phase. Wave 0 gap list:

- [ ] `docs/_glossary-android.md` — covers AEBASE-01
- [ ] `docs/_templates/admin-template-android.md` — covers AEBASE-05
- [ ] `docs/android-lifecycle/00-enrollment-overview.md` — covers AEBASE-02
- [ ] `docs/android-lifecycle/02-provisioning-methods.md` — covers AEBASE-03
- [ ] `docs/android-lifecycle/03-android-version-matrix.md` — covers AEBASE-04
- [ ] `docs/android-lifecycle/` directory creation (git auto-creates when first file lands, but plan should reference explicitly)

Framework install: none required. Validation is bash grep + standard unix tools; no npm/pip install needed.

## Security Domain

**Skip:** `.planning/config.json` does not specify `security_enforcement`. Default is enabled. However, this phase is pure documentation creation — no code, no auth/authz flows, no session management, no input validation, no cryptography. The ASVS categories do not map meaningfully. Including an empty ASVS table would be false-signal noise.

The only adjacent security surfaces are documentary:
- **Secrets in docs:** Phase 34 docs MUST NOT embed real enrollment tokens, QR code images, MGP binding tokens, or Zero-Touch portal credentials. Token values are tenant-specific and sensitive — document generation process only, never example values.
- **Play Integrity coverage:** Phase 34 glossary entry for Play Integrity must note the three verdict levels and that Strong integrity requires hardware-backed security. No CVE or vulnerability content; this is attestation policy reference material.

**Section conclusion:** No formal ASVS mapping. One content guard: never embed sensitive artifacts (tokens, QR images, credentials) in Phase 34 deliverables.

## Sources

### Primary (HIGH confidence) — Locked Decisions and Direct File Precedents

- `.planning/phases/34-android-foundation/34-CONTEXT.md` — 33 locked design decisions (D-01 through D-33); adversarial-review-scored
- `.planning/REQUIREMENTS.md` lines 10-19 — AEBASE-01 through AEBASE-05 definitions; traceability table lines 156-162
- `.planning/ROADMAP.md` lines 92-103 — Phase 34 goal + 5 success criteria
- `.planning/PROJECT.md` Key Decisions lines 168-187 — v1.4 scope-trim decisions; tri-portal pattern design decision
- `.planning/STATE.md` lines 82-91 — research flags for Phase 35/36 verification
- `docs/_glossary-macos.md` lines 14-51, 111-116 — primary structural template for glossary (alphabetical index, category sections, per-term cross-platform callouts, version history)
- `docs/ios-lifecycle/00-enrollment-overview.md` lines 13-19, 31-36, 38-48 — primary structural template for enrollment overview (audience routing, 5-col comparison table, supervision section)
- `docs/_templates/admin-template-macos.md` lines 42-58, 76-85 — dual-portal template precedent
- `docs/_templates/admin-template-ios.md` lines 62-84, 98-106 — iOS dual-portal template + HTML-comment subtractive deletion precedent
- `.planning/milestones/v1.3-phases/26-ios-ipados-foundation/26-CONTEXT.md` — validated iOS Foundation precedent (same-shape phase)

### Primary (HIGH confidence) — Research Base

- `.planning/research/FEATURES.md` lines 10-19 (Android complexity vs iOS), 329-336 (provisioning matrix data), 350-358 (version matrix data); sources block lines 529-544 (Microsoft Learn 2026-04-16 fetch cohort)
- `.planning/research/ARCHITECTURE.md` Q1-Q10 (architecture decisions), Anti-Patterns 1-4 (lines 495-527)
- `.planning/research/PITFALLS.md` Pitfalls 1, 2, 3, 4, 5, 9, 10, 12, 13 (all load-bearing for Phase 34)
- `.planning/research/SUMMARY.md` lines 155-169 (Phase 34 Foundation description), confidence assessment lines 371-391
- `.planning/research/STACK.md` lines 9-22 (tri-portal), lines 375-390 (version matrix), lines 395-410 (confidence assessment), lines 415-425 (sparse-doc flags)

### Secondary (MEDIUM confidence) — Verified via 2026-04-21 web search

- [Microsoft Learn — Set up Android (AOSP) corporate-owned userless](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-userless-enroll) — confirms AOSP userless 90-day token maximum; AOSP user-associated 65-year maximum
- [Microsoft Learn — Android (AOSP) user-associated](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/android-aosp-corporate-owned-user-associated-enroll) — confirms user-associated token expiry
- [Microsoft Learn — Set up Intune enrollment for Android Enterprise dedicated devices](https://learn.microsoft.com/en-us/intune/device-enrollment/android/setup-dedicated) — dedicated device enrollment reference
- [Microsoft Learn — Factory Reset Protection Emails Not Enforced in Intune for Android](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-configuration/factory-reset-protection-emails-not-enforced) — Intune FRP troubleshooting
- [Google Android Enterprise Help — Enable enterprise factory reset protection](https://support.google.com/work/android/answer/14549362?hl=en) — Android 15 EFRP reference
- [Google Android Enterprise Help — Zero-touch enrollment for IT admins](https://support.google.com/work/android/answer/7514005?hl=en) — ZT portal reseller requirement
- [Google for Developers — Zero-touch overview](https://developers.google.com/zero-touch/guides/overview) — ZT provisioning architecture
- [Android Enterprise Community — Enhanced FRP in Android 15](https://www.androidenterprise.community/blog/resources/enhanced-factory-reset-protection-in-android-15/9493) — Android 15 FRP community guidance
- [Jason Bayton — Feature spotlight: Factory Reset Protection](https://bayton.org/android/feature-spotlight-factory-reset-protection/) — FRP primary source
- [Hexnode — What is Android WPCO and why do we need it?](https://www.hexnode.com/blogs/what-is-android-wpco-and-why-do-we-need-it/) — WPCO/COPE language confirmation
- [IBM Docs — Work profile on corporate-owned devices (WPCO)](https://www.ibm.com/docs/en/maas360?topic=modes-work-profile-corporate-owned-devices-wpco) — WPCO enterprise reference
- [Scalefusion — Android COPE | Android Enterprise COPE](https://scalefusion.com/android-corporate-owned-personally-enabled-cope) — COPE not formally deprecated confirmation

### Tertiary (LOW confidence) — Not used directly in Phase 34 content

- Community blog posts on enrollment token rotation — cited in research SUMMARY.md MEDIUM confidence tier; not load-bearing for Phase 34 glossary/overview/matrix content.

## Metadata

**Confidence breakdown:**

- **Structural decisions (tables, columns, templates):** HIGH — every deliverable has direct precedent in v1.2 (macOS) or v1.3 (iOS). Copy-and-extend authoring.
- **Content accuracy (version gating, terminology, WPCO/COPE language):** HIGH — `.planning/research/*` is comprehensive and 2026-04-16/17/19-dated; spot-verified 2026-04-21 for the three STATE.md research flags most relevant to Phase 34 content.
- **Anchor stability (Phase 35-42 cross-references):** MEDIUM — assumption A1-A4 list canonical anchors; confirm during Phase 34 task breakdown before authoring.
- **Anti-pattern guards:** HIGH — all four anti-patterns are explicitly documented in ARCHITECTURE.md + PITFALLS.md and each is locked by at least one CONTEXT.md decision.
- **Validation mechanics:** HIGH — grep-based checks are straightforward; all 26 Req-ID verifications in the Nyquist table are mechanical and automatable via bash.

**Research date:** 2026-04-21

**Valid until:** 60 days (2026-06-20). Rationale: all five deliverables will have 60-day review_by frontmatter (D-14, D-33) — research validity aligns with content validity. If Phase 34 is not authored within 60 days of this research date, re-verify (a) Google's language on COPE/WPCO, (b) MS Learn page last-updated dates for AOSP/MGP/ZT portal, (c) Android 15 FRP behavior guidance, before committing to the stated version-gate and terminology claims.

---

*Phase 34 Research — Android Foundation*
*Researched: 2026-04-21*
*Researcher: GSD Research Agent*
*Next: `/gsd-plan-phase 34` or planner consumes this document*
