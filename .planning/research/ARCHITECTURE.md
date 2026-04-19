# Architecture Research

**Domain:** Documentation suite — Android Enterprise integration into existing multi-platform Intune provisioning docs
**Researched:** 2026-04-19
**Confidence:** HIGH (based on direct inspection of all existing docs/ files and established patterns)

---

## Standard Architecture

### System Overview

```
docs/
├── CROSS-PLATFORM SHARED (platform: all)
│   ├── index.md                    ← nav hub — 4-platform selector (Android stub in v1.4)
│   ├── common-issues.md            ← symptom router — deferred for Android
│   ├── quick-ref-l1.md             ← L1 cheat sheet — deferred for Android
│   ├── quick-ref-l2.md             ← L2 cheat sheet — deferred for Android
│   ├── _glossary.md                ← Windows terms
│   ├── _glossary-macos.md          ← Apple-platform terms (iOS + macOS shared)
│   ├── _glossary-android.md        ← NEW: Android Enterprise terms [v1.4]
│   ├── windows-vs-macos.md         ← existing cross-platform comparison
│   └── _templates/                 ← guide templates
│       ├── admin-template-android.md  ← NEW: tri-portal template [v1.4 Phase 1]
│       └── ...
│
├── ANDROID LIFECYCLE (new subdirectory)
│   └── android-lifecycle/
│       ├── 00-enrollment-overview.md  ← enrollment modes + ownership axis [v1.4]
│       └── 01-android-prerequisites.md ← MGP binding, ZT portal [v1.4]
│
├── ANDROID ADMIN SETUP (new subdirectory)
│   └── admin-setup-android/
│       ├── 00-overview.md             ← tri-portal setup sequence [v1.4]
│       ├── 01-managed-google-play.md  ← MGP binding (prereq for all modes) [v1.4]
│       ├── 02-zero-touch-portal.md    ← ZT portal setup [v1.4]
│       ├── 03-fully-managed-cobo.md   ← COBO/corporate-owned [v1.4]
│       ├── 04-byod-work-profile.md    ← personally-owned work profile [v1.4]
│       ├── 05-dedicated-devices.md    ← kiosk/COSU [v1.4]
│       └── 06-aosp-stub.md            ← AOSP stub [v1.4, full v1.4.1]
│
├── ANDROID LIFECYCLE REFERENCE
│   └── android-lifecycle/
│       ├── 02-provisioning-methods.md ← NFC/QR/afw#setup/ZT matrix [v1.4]
│       └── 03-android-version-matrix.md ← min OS per mode [v1.4]
│
├── L1 RUNBOOKS (existing, append Android section)
│   └── l1-runbooks/
│       ├── 00-index.md              ← MODIFY: add Android L1 section [v1.4]
│       ├── 22-android-enrollment-blocked.md   [v1.4]
│       ├── 23-android-work-profile-not-created.md [v1.4]
│       ├── 24-android-device-not-enrolled.md  [v1.4]
│       ├── 25-android-compliance-access-blocked.md [v1.4]
│       ├── 26-android-mgp-app-not-installed.md    [v1.4]
│       └── 27-android-zt-enrollment-failed.md [v1.4]
│
├── END-USER GUIDE (new tier for BYOD)
│   └── end-user-guides/
│       └── android-work-profile-setup.md ← NEW TIER [v1.4]
│
├── L2 RUNBOOKS (existing, append Android section)
│   └── l2-runbooks/
│       ├── 00-index.md              ← MODIFY: add Android L2 section [v1.4]
│       ├── 18-android-log-collection.md   [v1.4]
│       ├── 19-android-enrollment-investigation.md [v1.4]
│       ├── 20-android-app-install-failure.md      [v1.4]
│       └── 21-android-compliance-investigation.md [v1.4]
│
├── DECISION TREES (existing dir, new Android file)
│   └── decision-trees/
│       └── 08-android-triage.md     ← NEW: Android mode-first triage [v1.4]
│
└── REFERENCE (existing, new Android entries)
    └── reference/
        ├── 00-index.md              ← MODIFY: add Android entries [v1.4]
        └── android-capability-matrix.md ← NEW [v1.4]
```

### Component Responsibilities

| Component | Responsibility | New / Modified |
|-----------|----------------|----------------|
| `android-lifecycle/00-enrollment-overview.md` | Mode axis (COBO/COPE/BYOD/Dedicated/AOSP) + ownership dimension; provisioning-method matrix reference | NEW |
| `admin-setup-android/01-managed-google-play.md` | MGP binding via Intune; token management; prerequisite gate for all corporate modes | NEW |
| `admin-setup-android/02-zero-touch-portal.md` | ZT portal reseller import; Intune DPC config; ZT-specific enrollment profile | NEW |
| `_templates/admin-template-android.md` | Tri-portal template (Intune + MGP + ZT portal); extends not replaces dual-portal template | NEW |
| `_glossary-android.md` | COBO/COPE/BYOD WP/Dedicated/AOSP/ZTE/DPC/MGP/afw#setup/WPCO terms with cross-platform equivalents | NEW |
| `end-user-guides/android-work-profile-setup.md` | End-user BYOD Company Portal enrollment; self-service; privacy boundary callouts | NEW TIER |
| `decision-trees/08-android-triage.md` | Android L1 triage: symptom → mode identification → mode-specific runbook routing | NEW |
| `l1-runbooks/00-index.md` | Android L1 runbook section header + table (runbooks 22-27) | MODIFIED |
| `l2-runbooks/00-index.md` | Android L2 runbook section header + table (runbooks 18-21) | MODIFIED |
| `index.md` | Android stub placeholder in Choose Your Platform; full integration deferred post-v1.4 | MODIFIED (stub only) |
| `_glossary-macos.md` | Cross-ref anchor added pointing to `_glossary-android.md` for "Work Profile" disambiguation | MODIFIED (1-line addition) |
| `reference/android-capability-matrix.md` | Android mode × feature matrix across COBO/BYOD/Dedicated; comparison to iOS supervision axis | NEW |

---

## Recommended Project Structure

```
docs/
├── android-lifecycle/              # NEW subdirectory — v1.4
│   ├── 00-enrollment-overview.md
│   ├── 01-android-prerequisites.md
│   ├── 02-provisioning-methods.md
│   └── 03-android-version-matrix.md
├── admin-setup-android/            # NEW subdirectory — v1.4
│   ├── 00-overview.md
│   ├── 01-managed-google-play.md
│   ├── 02-zero-touch-portal.md
│   ├── 03-fully-managed-cobo.md
│   ├── 04-byod-work-profile.md
│   ├── 05-dedicated-devices.md
│   └── 06-aosp-stub.md
├── end-user-guides/                # NEW subdirectory — v1.4 (BYOD tier)
│   └── android-work-profile-setup.md
├── l1-runbooks/                    # EXISTING — append Android section
│   ├── 00-index.md                 # MODIFIED
│   ├── 22-android-*.md             # NEW (6 runbooks)
│   └── ...
├── l2-runbooks/                    # EXISTING — append Android section
│   ├── 00-index.md                 # MODIFIED
│   ├── 18-android-*.md             # NEW (4 runbooks)
│   └── ...
├── decision-trees/                 # EXISTING — add Android triage
│   ├── 08-android-triage.md        # NEW
│   └── ...
├── reference/                      # EXISTING — add Android capability matrix
│   ├── android-capability-matrix.md # NEW
│   └── ...
├── _templates/                     # EXISTING — add Android template
│   ├── admin-template-android.md   # NEW
│   └── ...
├── _glossary-android.md            # NEW (platform-level glossary)
├── index.md                        # MODIFIED (Android stub)
├── common-issues.md                # DEFERRED — post-v1.4 unification
├── quick-ref-l1.md                 # DEFERRED — post-v1.4 unification
└── quick-ref-l2.md                 # DEFERRED — post-v1.4 unification
```

### Structure Rationale

- **android-lifecycle/:** Mirrors `ios-lifecycle/` and `macos-lifecycle/` naming convention; keeps enrollment-model docs separate from admin-setup procedural docs.
- **admin-setup-android/:** Mirrors `admin-setup-ios/` and `admin-setup-macos/`; numbered guides follow the prerequisite DAG (MGP first, ZT second, mode-specific guides after).
- **end-user-guides/:** New subdirectory rather than a misfit inside `admin-setup-android/` or `l1-runbooks/`; "end-user" audience is distinct from L1/L2/Admin — placing it inside any existing tier would misrepresent the audience.
- **_glossary-android.md:** Parallel to `_glossary.md` (Windows) and `_glossary-macos.md` (Apple). Android does not share glossary with Apple platforms; creating a third glossary avoids contaminating the Apple glossary and mirrors the established two-glossary pattern.
- **Runbook numbering:** L1 Android runbooks start at 22 (iOS ended at 21); L2 Android start at 18 (iOS ended at 17). Flat numeric namespace maintained — no per-platform sub-numbering.

---

## Architectural Patterns

### Pattern 1: Tri-Portal Template (Android extension of Dual-Portal)

**What:** Every Android corporate admin guide uses a three-portal sub-section structure:
`#### In Intune admin center`, `#### In Managed Google Play`, `#### In Zero-Touch portal (where applicable)`.

**When to use:** All Android admin guides touching corporate enrollment (COBO, Dedicated, ZTE). BYOD Work Profile only requires Intune admin center + brief MGP reference (MGP is already bound; no ZT portal for BYOD).

**Trade-offs:** Adds one portal section per guide vs dual-portal. Authoring cost is higher but administrators must navigate three portals in practice; omitting a portal creates a gap that generates escalations.

**Relationship to dual-portal template:** The `admin-template-android.md` is a new file, not a modification to `admin-template-macos.md` or `admin-template-ios.md`. The dual-portal templates remain unchanged. Android guides cite `admin-template-android.md`. This subclasses by copy-and-extend rather than inheritance, consistent with how the iOS template extended the macOS template in v1.3.

**Implementation:**
```markdown
### Step N: [Configuration action]

#### In Intune admin center
...steps...

#### In Managed Google Play
...steps...

#### In Zero-Touch portal
...steps...  (omit this section when ZT is not applicable to the step)
```

### Pattern 2: Mode-First Triage (Android L1 decision tree)

**What:** Android triage tree routes symptom → enrollment mode identification FIRST, then to mode-specific runbook. This is different from iOS triage (symptom → direct runbook) because Android failure root causes differ fundamentally by mode: a "device not enrolling" symptom on a COBO device (wrong DPC, ZT config error) has entirely different remediation than the same symptom on a BYOD device (Company Portal not installed, personal Google account interference).

**When to use:** `decision-trees/08-android-triage.md`. The L1 triage tree entry question is "What enrollment mode was intended?" before branching to symptom-specific runbooks.

**Trade-offs:** Mode-first adds one triage step vs symptom-first. Acceptable because L1 agents can identify the intended mode from the ticket (ticket metadata: device type, user classification) without device access.

**Implementation:**
```
Symptom reported
    ↓
"What enrollment mode was intended?"
    COBO / ZTE → [runbook 24: device-not-enrolled or 27: zt-enrollment-failed]
    BYOD Work Profile → [runbook 23: work-profile-not-created]
    Dedicated → [runbook 24: device-not-enrolled]
    Unknown → "Is this a corporate or personal device?"
        Corporate → assume COBO/ZTE, escalate L2 if mode unclear
        Personal → assume BYOD Work Profile → [runbook 23]
```

### Pattern 3: Enrollment Method × Enrollment Mode Matrix (2-axis grid)

**What:** Android provisioning method (NFC, QR code, afw#setup DPC identifier, Zero-Touch) is orthogonal to enrollment mode (COBO, COPE, BYOD Work Profile, Dedicated, AOSP). A single matrix doc (`android-lifecycle/02-provisioning-methods.md`) captures the full 5×4 grid rather than embedding partial coverage inside each mode doc.

**When to use:** Referenced from `android-lifecycle/00-enrollment-overview.md` (full grid for conceptual understanding) and from each mode's admin guide (filtered view showing only relevant methods for that mode). Admin guides cross-reference the matrix doc rather than duplicating the grid.

**Trade-offs:** Centralized matrix is a single source of truth but requires cross-referencing discipline. The alternative — embedding mode-specific method coverage in each guide — causes duplication and divergence as ZT capabilities evolve.

**Matrix skeleton:**
```
                    COBO    COPE    BYOD WP   Dedicated   AOSP
NFC                  Y       Y        N          Y         N
QR Code              Y       Y        N          Y         Y
afw#setup            Y       Y        Y          Y         Y
Zero-Touch (ZTE)     Y       Y        N          Y         N
```

### Pattern 4: End-User Self-Service Guide (4th documentation tier)

**What:** Android BYOD Work Profile enrollment is user-initiated via Company Portal. There is no admin-portal enrollment step for the user's device — the admin's role is to configure the Work Profile enrollment profile in Intune, then communicate enrollment instructions to users. A dedicated end-user guide (`end-user-guides/android-work-profile-setup.md`) covers the user-side enrollment steps.

**When to use:** BYOD Work Profile only. All other Android modes (COBO, Dedicated, ZTE, AOSP) are corporate-owned and admin-initiated.

**Audience and tone distinction:** End-user guide uses plain language, no Intune portal steps, and focuses on what the user sees on their device (Company Portal screens). Contrast with admin guide (`admin-setup-android/04-byod-work-profile.md`) which covers the policy/configuration side.

**What this is NOT:** L1 runbook. The end-user guide is not a troubleshooting document. It is a how-to enrollment guide for the device owner. When enrollment fails, the user's next step is to contact L1 — the end-user guide does not replace L1 runbooks.

---

## Data Flow

### L1 Triage Flow for Android

```
Symptom reported to L1
    ↓
decision-trees/08-android-triage.md
    ↓ (mode identification)
    ↓
Mode = BYOD?        → l1-runbooks/23-android-work-profile-not-created.md
Mode = COBO/ZTE?    → l1-runbooks/24-android-device-not-enrolled.md
                      or l1-runbooks/27-android-zt-enrollment-failed.md
Mode = Dedicated?   → l1-runbooks/24-android-device-not-enrolled.md
Mode = Compliance?  → l1-runbooks/25-android-compliance-access-blocked.md
Mode = App?         → l1-runbooks/26-android-mgp-app-not-installed.md
    ↓ (if L1 action fails or escalation threshold met)
L2 escalation with data collection checklist
    ↓
l2-runbooks/18-android-log-collection.md  (prerequisite)
    ↓
l2-runbooks/19, 20, or 21 (investigation)
```

### Admin Setup Dependency Chain (prerequisite DAG)

```
[Phase 1 prerequisite]
admin-template-android.md (tri-portal template)
_glossary-android.md
    ↓
android-lifecycle/00-enrollment-overview.md (conceptual framework)
    ↓
admin-setup-android/01-managed-google-play.md  ← GATE: all corporate modes blocked until MGP bound
    ↓              ↓
    ↓    admin-setup-android/02-zero-touch-portal.md  ← GATE: ZTE blocked until ZT portal configured
    ↓              ↓
    ↓    admin-setup-android/03-fully-managed-cobo.md
    ↓
admin-setup-android/04-byod-work-profile.md    ← does NOT require ZT portal
    ↓
admin-setup-android/05-dedicated-devices.md    ← requires MGP (app assignment)
    ↓
admin-setup-android/06-aosp-stub.md            ← partial; full v1.4.1

Parallel to main chain:
android-lifecycle/02-provisioning-methods.md   ← reference doc; no prereqs
android-lifecycle/03-android-version-matrix.md ← reference doc; no prereqs
```

### Cross-Platform Reference Flow

```
"What is a Work Profile?"
    → _glossary-android.md#work-profile
    → [cross-ref callout]: "For iOS equivalent, see Supervision in _glossary-macos.md"
    → [disambiguation callout]: "For Android Dedicated vs iOS Shared iPad vs Windows
       Shared PC, see android-capability-matrix.md#dedicated-device-disambiguation"

"Dedicated device" disambiguation:
    → _glossary-android.md#dedicated-device
    → callout: Android Dedicated (COSU) ≠ iOS Shared iPad ≠ Windows Shared PC
    → forward reference to android-capability-matrix.md
```

---

## Integration Points

### New Components to Existing Components

| New Component | Integrates With | Integration Type |
|---------------|-----------------|------------------|
| `admin-template-android.md` | `admin-template-macos.md`, `admin-template-ios.md` | Sibling template; no modification to existing templates |
| `_glossary-android.md` | `_glossary-macos.md` | Cross-reference: `_glossary-macos.md` adds 1-line see-also for "Work Profile" disambiguation |
| `l1-runbooks/00-index.md` | Android runbooks 22-27 | Append new section; no modification to existing iOS/macOS/Windows sections |
| `l2-runbooks/00-index.md` | Android runbooks 18-21 | Append new section; no modification to existing sections |
| `android-lifecycle/00-enrollment-overview.md` | `ios-lifecycle/00-enrollment-overview.md` | Sibling doc; index.md links to both; no modification to iOS doc |
| `decision-trees/08-android-triage.md` | `l1-runbooks/00-index.md` | 00-index.md related-resources section adds link to 08-android-triage.md |
| `reference/android-capability-matrix.md` | `reference/ios-capability-matrix.md`, `reference/macos-capability-matrix.md` | Sibling; reference/00-index.md adds entry |

### Deferred Integration Points (post-v1.4)

| Deferred Item | Files Affected | Why Deferred |
|---------------|----------------|--------------|
| `index.md` Android platform section (full) | `index.md` | Regression risk against v1.0-v1.3 live nav; separate unification task |
| `common-issues.md` Android section | `common-issues.md` | Same regression risk; 3-platform cross-refs would need Android added throughout |
| `quick-ref-l1.md` Android section | `quick-ref-l1.md` | Consistent with iOS pattern — was deferred then backported; same approach |
| `quick-ref-l2.md` Android section | `quick-ref-l2.md` | Same as L1 card |

### index.md Stub Pattern (v1.4 in-scope)

Add to `index.md` "Choose Your Platform" list:

```markdown
- [Android Enterprise](#android-enterprise) -- Android device management
  via Microsoft Intune (Zero-Touch corporate enrollment, Fully Managed,
  Work Profile BYOD, Dedicated/kiosk devices)
```

Add stub section at bottom of `index.md` (after iOS/iPadOS section, before Cross-Platform References):

```markdown
## Android Enterprise

> **Coverage note:** Android Enterprise documentation is v1.4.
> Cross-platform navigation integration (quick-reference cards, common-issues routing)
> is deferred to a post-v1.4 unification task to avoid regression in existing platform links.

For Android Enterprise enrollment, see:
- [Android Enrollment Path Overview](android-lifecycle/00-enrollment-overview.md)
- [Android Admin Setup Guides](admin-setup-android/00-overview.md)
- [Android L1 Runbooks](l1-runbooks/00-index.md#android-enterprise-runbooks)
- [Android L2 Runbooks](l2-runbooks/00-index.md#android-l2-runbooks)
```

This stub ensures reachability from index.md without modifying cross-platform tables that carry iOS/macOS/Windows anchors.

---

## Specific Architecture Decisions

### Q1: Folder Structure

**Decision:** Four new subdirectories: `android-lifecycle/`, `admin-setup-android/`, `end-user-guides/`. No new `scenarios/android` or `error-codes/android` subdirectory — Android failure catalog lives inside the L1 runbooks and L2 runbooks using the same flat-in-existing-dir pattern established for iOS and macOS. Error codes as a pattern does not apply to Android (Android Enterprise failures are symptom-based like APv2, not hex-code-based like APv1).

**Rationale:** Mirrors iOS pattern (`ios-lifecycle/`, `admin-setup-ios/`). Adding `scenarios/android` would diverge from how iOS/macOS scenarios are handled (embedded in runbooks, not a separate scenarios/ dir).

### Q2: Navigation Integration Deferral

**Decision:** `index.md` gets a stub Android section. `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md` get no Android content in v1.4.

**Stub anchors in v1.4:** The stub section in `index.md` uses the anchor `#android-enterprise`. This anchor is stable and safe to use in cross-references within Android docs (e.g., `../index.md#android-enterprise`). Post-v1.4 unification expands this section rather than replacing it.

**v1.0-v1.3 file freeze:** No modifications to files in `.planning/milestones/v1.0`-`v1.3`. Live `docs/` files that contain platform-scoped sections (like `l1-runbooks/00-index.md`) are modified by appending new Android sections — existing iOS/macOS/Windows sections are untouched.

### Q3: Admin Template Evolution (Tri-Portal)

**Decision:** New `admin-template-android.md` that extends the dual-portal pattern with a third portal section for ZT portal. The existing `admin-template-macos.md` and `admin-template-ios.md` are NOT modified.

**Sub-classing logic:** BYOD Work Profile guide uses Intune + MGP only (no ZT portal). The ZT portal sub-section (`#### In Zero-Touch portal`) appears only in guides 02-zero-touch-portal.md and 03-fully-managed-cobo.md. Template comment block documents: "Include ZT portal section only when configuring Zero-Touch DPC rules or reseller-side configuration."

**Renewal/Maintenance section:** The MGP binding has a token that can expire or need refresh (Google account credential rotation). The ZT portal has reseller import workflows with CSV exports. The template includes a Renewal/Maintenance section by default, unlike iOS ADE where it was optional.

### Q4: Enrollment Method × Mode Matrix

**Decision:** Standalone reference doc `android-lifecycle/02-provisioning-methods.md`. Each mode's admin guide contains a "Provisioning Methods" subsection that shows only the methods valid for that mode and cross-references the full matrix.

**Not embedded per guide:** Embedding the full 5×4 grid in each of 4 mode guides would create 4 copies to maintain. The matrix changes as Android versions evolve (ZT support expands per Android version); centralizing it means one update location.

### Q5: BYOD Tier Inversion

**Decision:** Create `end-user-guides/` as a new first-level subdirectory of `docs/`. Android BYOD Work Profile gets one end-user guide (`android-work-profile-setup.md`). The admin guide for BYOD (`admin-setup-android/04-byod-work-profile.md`) covers the policy-side; the end-user guide covers the device-side.

**The 4th tier (End User):** Sits alongside L1/L2/Admin, not inside any existing tier. It is referenced from `admin-setup-android/04-byod-work-profile.md` (admin guide tells admins to distribute the end-user guide link) and from `l1-runbooks/23-android-work-profile-not-created.md` (if the user needs to re-run enrollment, L1 can point to the end-user guide).

**Not added to `index.md` main tier navigation** in v1.4 — covered by the Android stub section with a direct link.

### Q6: Cross-Platform Disambiguation ("Dedicated Device")

**Decision:** `_glossary-android.md#dedicated-device` entry includes a disambiguation callout block:

```markdown
> **Cross-platform disambiguation:** "Dedicated device" in Android Enterprise (COSU —
> Corporate-Owned Single Use) is not equivalent to iOS Shared iPad or Windows Shared PC.
> Android Dedicated: single-purpose kiosk, no user accounts, single app or limited app set.
> iOS Shared iPad: multi-user shared device with Managed Apple IDs.
> Windows Shared PC: multi-user shared with local accounts.
> For a comparison across platforms, see [Android Capability Matrix](../reference/android-capability-matrix.md#dedicated-device-disambiguation).
```

**Glossary impact:** `_glossary-macos.md` does not need modification for "Dedicated" disambiguation — the iOS equivalent is "Shared iPad" which is already a distinct term. The disambiguation is handled at the Android glossary level, with a forward reference to the capability matrix.

**Cross-reference banner pattern:** Admin guides for Dedicated devices (Android) include a `> **Platform note:**` banner at the top cross-referencing iOS Shared iPad and Windows Shared PC. Mirrors the existing `> **macOS:** ...` cross-ref banners already used in `common-issues.md` and `l1-runbooks/00-index.md`.

### Q7: Frontmatter Taxonomy Extension

**Decision:** Add `android` to the `platform` enum. No modification to v1.0-v1.3 files (Windows defaults to Windows, macOS files have `platform: macOS`, iOS files have `platform: iOS` — all remain valid).

**Corporate Device Identifier type:** Android uses IMEI, serial number, and MEID for corporate device identifiers in Intune. The frontmatter taxonomy does not currently encode identifier type as a field. Decision: do NOT add `identifier_type` frontmatter field in v1.4. The identifier coverage belongs in the body of `admin-setup-android/01-managed-google-play.md` (corporate identifier enrollment restrictions section). Frontmatter is for routing and filtering, not content metadata.

**Android version field:** Do NOT add `min_android_version` as frontmatter. Android version minimums per mode belong in `android-lifecycle/03-android-version-matrix.md` (reference doc) and per-mode callouts in admin guides. Frontmatter inflation is a maintenance cost.

**Resulting frontmatter for Android docs:**
```yaml
platform: android
audience: admin | L1 | L2 | end-user   # end-user is new valid value
```

### Q8: Build Order — Dependency DAG

**Phase 1 prerequisites (must complete before any runbook phase):**
1. `_glossary-android.md` — terms needed in all subsequent docs
2. `_templates/admin-template-android.md` — tri-portal template for all admin guides
3. `android-lifecycle/00-enrollment-overview.md` — conceptual framework for mode identification
4. `android-lifecycle/02-provisioning-methods.md` — method × mode matrix
5. `android-lifecycle/03-android-version-matrix.md` — version fragmentation reference

**Phase 2 prerequisites (MGP binding gate):**
6. `android-lifecycle/01-android-prerequisites.md` — MGP binding + ZT portal overview
7. `admin-setup-android/00-overview.md` — tri-portal setup sequence overview
8. `admin-setup-android/01-managed-google-play.md` — **hard gate**: all corporate modes blocked

**Phase 3 (ZT portal gate, parallel with phase 2 tail):**
9. `admin-setup-android/02-zero-touch-portal.md` — **gate for ZTE and COBO via ZT**

**Phase 4 (mode-specific admin guides — parallel candidates after phase 2+3):**
10. `admin-setup-android/03-fully-managed-cobo.md` (requires 01 + 02)
11. `admin-setup-android/04-byod-work-profile.md` (requires 01 only)
12. `admin-setup-android/05-dedicated-devices.md` (requires 01)
13. `admin-setup-android/06-aosp-stub.md` (requires 01; content is minimal)
14. `end-user-guides/android-work-profile-setup.md` (parallel with 11 — same guide pair)

**Phase 5 (triage + L1 runbooks — require mode-specific admin knowledge):**
15. `decision-trees/08-android-triage.md` (conceptual mode-first triage tree)
16. `l1-runbooks/22-27-android-*.md` (6 runbooks; most can be parallel)
17. `l1-runbooks/00-index.md` modification (after all 6 runbooks exist)

**Phase 6 (L2 runbooks — require L1 escalation paths to exist):**
18. `l2-runbooks/18-android-log-collection.md` (prerequisite for all L2)
19. `l2-runbooks/19-21-android-*.md` (3 investigation runbooks; parallel after 18)
20. `l2-runbooks/00-index.md` modification (after all 4 runbooks exist)

**Phase 7 (cross-platform integration):**
21. `reference/android-capability-matrix.md`
22. `index.md` Android stub addition
23. `_glossary-macos.md` 1-line see-also addition

**Parallelizable pairs:**
- Phases 4 items 10 + 11 + 12 + 13 + 14 (all independent of each other after MGP binding doc)
- Phases 6 items 19 + 20 + 21 (all independent of each other after log collection doc)

### Q9: Failure Catalog Integration

**Decision:** Symptom-first, then mode-branch at the first triage step.

**Rationale:** L1 agents receive tickets with symptoms ("device won't enroll"), not mode labels. The triage tree (`08-android-triage.md`) asks the mode question first because symptoms repeat across modes while causes differ by mode. This is the same L1 usability logic that drove the iOS triage tree design.

**Catalog structure:** No standalone `error-codes/android` catalog file. Android Enterprise enrollment failures are symptom-based (like APv2), not error-code-based (like APv1). The L1 runbooks themselves are the failure catalog — each runbook covers one symptom cluster with mode-conditional branches inside the runbook where applicable.

**Mode branch inside runbook vs separate runbook per mode:** For high-volume symptoms (device not enrolling), a single runbook (e.g., `24-android-device-not-enrolled.md`) with internal mode branches is more maintainable than 4 separate runbooks with 90% overlap. For symptoms that are mode-exclusive (ZT enrollment failure), a dedicated runbook (`27-android-zt-enrollment-failed.md`) is correct.

### Q10: docs/ Cross-References That Need Android Added

Files with existing platform cross-refs that will need Android added post-v1.4 (tracked, not in-scope for v1.4):

| File | Existing Cross-Ref Pattern | Post-v1.4 Addition Needed |
|------|---------------------------|---------------------------|
| `common-issues.md` lines 14-19 | `Choose Your Platform` list | Add `[Android Enterprise Issues](#android-enterprise-issues)` |
| `common-issues.md` H2 sections | Windows / macOS / iOS sections | Add `## Android Enterprise Failure Scenarios` |
| `quick-ref-l1.md` | Platform sections with anchors | Add `## Android Enterprise Quick Reference` |
| `quick-ref-l2.md` | Platform sections with anchors | Add `## Android Enterprise Quick Reference` |
| `index.md` | iOS/iPadOS Provisioning section | Expand Android stub to full section |
| `_glossary-macos.md` | Apple-platform scope line | Add "For Android Enterprise terms, see _glossary-android.md" |

**v1.4 in-scope touches to these files:**
- `_glossary-macos.md`: 1-line addition in the > **Platform coverage:** banner to add Android cross-ref
- `index.md`: Android stub section (Choose Your Platform entry + stub H2)
- `l1-runbooks/00-index.md`: Append Android section (existing sections untouched)
- `l2-runbooks/00-index.md`: Append Android section (existing sections untouched)

**Anchor safety:** All existing anchors in `l1-runbooks/00-index.md`, `l2-runbooks/00-index.md`, and `index.md` remain unchanged. New Android sections append after existing content with new anchors (`#android-enterprise-runbooks`, `#android-l2-runbooks`, `#android-enterprise`).

---

## Anti-Patterns

### Anti-Pattern 1: Embedding the provisioning-method matrix inside mode guides

**What people do:** Add a "Provisioning Methods" section to each mode guide (COBO, BYOD, Dedicated) with the full NFC/QR/afw#setup/ZT grid.

**Why it's wrong:** The matrix gets duplicated 4 times. When Google expands ZT support to new Android versions, all 4 copies need updating. Divergence happens in practice.

**Do this instead:** One canonical matrix doc (`android-lifecycle/02-provisioning-methods.md`). Mode guides reference it with a filtered view (one row of the matrix) and a link to the full matrix.

### Anti-Pattern 2: Putting BYOD Work Profile content inside a single combined BYOD guide

**What people do:** Combine admin setup + end-user instructions into one document under `admin-setup-android/04-byod-work-profile.md`.

**Why it's wrong:** Admin portal steps (enrollment profile creation, Work Profile configuration, compliance policies) have no relevance to end users. End-user instructions (Company Portal install, account sign-in, work/personal separation explanation) have no relevance to admins. A combined doc fails both audiences.

**Do this instead:** Two separate docs with explicit audience callouts. `admin-setup-android/04-byod-work-profile.md` (audience: admin) ends with a section "Distributing Enrollment Instructions" that links to `end-user-guides/android-work-profile-setup.md`. The end-user guide opens with a note that it is for device users, not administrators.

### Anti-Pattern 3: Modifying v1.0-v1.3 files for cross-platform nav in v1.4

**What people do:** Add Android to `common-issues.md` "Choose Your Platform" list and update all the cross-ref banners (lines like `> **iOS:** For iOS issues, see...`) to add `> **Android:**` everywhere.

**Why it's wrong:** `common-issues.md` has 20+ cross-platform banners. Each banner addition in a shared file is a regression risk for existing links. Any anchor rename or formatting inconsistency breaks existing iOS/macOS/Windows navigation paths that v1.0-v1.3 consumers rely on.

**Do this instead:** Stub in `index.md` only. Comprehensive `common-issues.md` + quick-ref integration is a post-v1.4 unification task, handled as a dedicated audit+update phase with a re-audit step to verify no regressions.

### Anti-Pattern 4: Creating `_glossary-android.md` terms as copies of Apple terms

**What people do:** Write "Work Profile — similar to Supervision in iOS" as the primary definition.

**Why it's wrong:** Work Profile is not analogous to iOS Supervision. Work Profile is an ownership/data-separation concept (personal vs work data on one device). Supervision is a management-capability escalation concept (what MDM can do). Equating them misleads admins configuring both platforms.

**Do this instead:** Define each term on its own merits. Add a `> **Cross-platform note:**` callout AFTER the definition to explain the closest parallel and the key difference. The definition stands alone; the cross-platform note adds context for admins who know iOS.

---

## Sources

- Direct inspection of `docs/` directory: all existing templates, glossaries, runbook indexes, quick-ref cards, admin setup overviews — HIGH confidence
- Existing patterns from v1.2 macOS (dual-portal template) and v1.3 iOS (supervised-only callout, 4th BYOD enrollment path) — HIGH confidence (established and validated patterns)
- Project decisions recorded in `.planning/PROJECT.md` Key Decisions table (tri-portal, BYOD tier-inversion, nav deferral) — HIGH confidence (scope decisions already made)
- `.planning/STATE.md` v1.4 decisions (phase numbering, shape mirrors v1.3) — HIGH confidence

---
*Architecture research for: Android Enterprise enrollment documentation integration (v1.4)*
*Researched: 2026-04-19*
