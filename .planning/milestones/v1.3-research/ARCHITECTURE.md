# Architecture Research

**Domain:** Documentation suite integration — iOS/iPadOS provisioning into existing Intune docs
**Researched:** 2026-04-16
**Confidence:** HIGH

## Architectural Context: v1.3 Adds a Third Platform

The existing v1.2 architecture established a proven pattern: parallel platform directories unified through shared navigation files. This research addresses only the v1.3 question: how iOS/iPadOS plugs into that existing architecture. The v1.2 architecture notes are preserved below for reference.

---

## v1.3: iOS/iPadOS Integration Architecture

### The Core Structural Question

iOS/iPadOS shares more Apple ecosystem infrastructure with macOS than macOS shares with Windows. Both iOS and macOS use ABM, the same ADE token mechanism, the same APNs certificate, VPP/Apps and Books, and Setup Assistant. But iOS has an enrollment complexity that macOS does not: four distinct enrollment paths (ADE, Device Enrollment, User Enrollment, MAM) versus macOS's single ADE path.

**Recommendation:** iOS/iPadOS follows the same parallel-directory pattern as macOS. New directories `ios-lifecycle/` and `admin-setup-ios/` are created. Shared runbook directories (l1-runbooks, l2-runbooks, decision-trees) continue their sequential numbering. Navigation files (index.md, common-issues.md, quick-ref cards) receive injected platform sections.

### iOS/iPadOS in the Docs Tree

```
docs/
├── [SHARED NAVIGATION — updated for iOS]
│   ├── index.md                   ← Add "iOS/iPadOS Provisioning" as third platform section
│   ├── common-issues.md           ← Add "iOS/iPadOS Failure Scenarios" section
│   ├── quick-ref-l1.md            ← Add "iOS/iPadOS Quick Reference" section
│   ├── quick-ref-l2.md            ← Add "iOS/iPadOS Quick Reference" section
│   ├── _glossary-macos.md         ← Extend with iOS-specific terms (supervision, MAM, etc.)
│   └── [ios-vs-macos.md]          ← NEW: iOS-to-macOS concept map (optional, low priority)
│
├── [PLATFORM: iOS/iPadOS — all NEW]
│   ├── ios-lifecycle/
│   │   └── 00-ios-enrollment-paths.md    ← Multi-path lifecycle (ADE, Device, User, MAM)
│   └── admin-setup-ios/
│       ├── 00-overview.md
│       ├── 01-abm-apns-prerequisites.md  ← Shared Apple infra; cross-refs macOS ABM guide
│       ├── 02-ade-enrollment-profile.md  ← Corporate supervised path
│       ├── 03-device-enrollment.md       ← BYOD device-level
│       ├── 04-user-enrollment.md         ← BYOD user-partition
│       ├── 05-configuration-profiles.md
│       ├── 06-app-deployment.md
│       ├── 07-compliance-policy.md
│       └── 08-config-failures.md
│
├── [SHARED TROUBLESHOOTING — extended for iOS]
│   ├── decision-trees/
│   │   └── 07-ios-triage.md              ← NEW (macOS is 06)
│   ├── l1-runbooks/
│   │   ├── 16-ios-device-not-appearing.md  ← NEW (macOS ends at 15)
│   │   ├── 17-ios-setup-assistant-failed.md
│   │   ├── 18-ios-profile-not-applied.md
│   │   ├── 19-ios-app-not-installed.md
│   │   ├── 20-ios-compliance-access-blocked.md
│   │   └── 21-ios-company-portal-signin.md
│   └── l2-runbooks/
│       ├── 14-ios-log-collection.md        ← NEW (macOS ends at 13)
│       ├── 15-ios-profile-delivery.md
│       ├── 16-ios-app-install.md
│       └── 17-ios-compliance.md
│
└── [CROSS-PLATFORM REFERENCES — extended]
    └── reference/
        ├── endpoints.md              ← Add #ios-ade-endpoints anchor section
        ├── 00-index.md               ← Add iOS references section
        └── ios-capability-matrix.md  ← NEW: iOS vs macOS feature parity
```

### Component Responsibilities

| Component | Responsibility | iOS/iPadOS Specific Notes |
|-----------|----------------|--------------------------|
| `index.md` | Platform selector + role entry points | Add third platform section with L1/L2/Admin tables |
| `common-issues.md` | Symptom-to-runbook router | Add iOS failure scenarios below macOS section |
| `quick-ref-l1.md` | L1 cheat sheet per platform | Add iOS top checks, escalation triggers, runbook links |
| `quick-ref-l2.md` | L2 cheat sheet per platform | Add iOS log collection, key commands, runbook links |
| `_glossary-macos.md` | Shared Apple ecosystem terms | Extend: supervision, MAM, user enrollment partition, App Protection Policy, Managed Apple ID |
| `decision-trees/07-ios-triage.md` | L1 triage flowchart | ADE path vs BYOD path as first branch |
| `l1-runbooks/16-21` | Scripted L1 procedures | 6 runbooks mirroring macOS coverage (10-15) |
| `l2-runbooks/14-17` | Technical L2 investigation | 4 runbooks mirroring macOS coverage (10-13) |
| `ios-lifecycle/00-ios-enrollment-paths.md` | Multi-path enrollment lifecycle | Single file covering all 4 paths with comparison table |
| `admin-setup-ios/` | iOS admin configuration guides | 9 files; ADE guides require supervision callout pattern |
| `reference/ios-capability-matrix.md` | iOS vs macOS Intune feature parity | Parallel to `reference/macos-capability-matrix.md` |

## Architectural Patterns

### Pattern 1: Platform Section Injection

**What:** Shared files (index.md, common-issues.md, quick-ref cards) have explicit platform sections separated by `---` horizontal rules. Adding iOS/iPadOS appends a new section below macOS.

**When to use:** Any file currently containing "Choose Your Platform" selectors.

**How the "Choose Your Platform" selector updates:**

```markdown
## Choose Your Platform

- [Windows Autopilot](#windows-autopilot) -- APv1 and APv2
- [macOS Provisioning](#macos-provisioning) -- ADE via Apple Business Manager
- [iOS/iPadOS Provisioning](#ios-ipados-provisioning) -- ADE, device enrollment, user enrollment, MAM
```

**iOS/iPadOS section structure in index.md:**

```markdown
## iOS/iPadOS Provisioning

Troubleshooting, investigation, and setup guides for iOS/iPadOS enrollment through Intune.
Covers ADE (supervised, corporate-owned), device enrollment (Company Portal), account-driven
user enrollment (BYOD), and MAM without enrollment. For Apple ecosystem terminology shared
with macOS, see the [Apple Ecosystem Glossary](_glossary-macos.md).

### Service Desk (L1)

| Resource | When to Use |
|----------|-------------|
| [iOS/iPadOS Triage Decision Tree](decision-trees/07-ios-triage.md) | Start here |
| [iOS L1 Runbooks](l1-runbooks/00-index.md#ios-ipados-runbooks) | Scripted procedures |
| [L1 Quick-Reference Card](quick-ref-l1.md#ios-ipados-quick-reference) | Cheat sheet |

### Desktop Engineering (L2)

| Resource | When to Use |
|----------|-------------|
| [iOS Log Collection Guide](l2-runbooks/14-ios-log-collection.md) | Prerequisite for all iOS L2 |
| [iOS L2 Runbooks](l2-runbooks/00-index.md#ios-ipados-runbooks) | Investigation guides |
| [L2 Quick-Reference Card](quick-ref-l2.md#ios-ipados-quick-reference) | Commands cheat sheet |

### Admin Setup

| Resource | When to Use |
|----------|-------------|
| [iOS/iPadOS Enrollment Paths](ios-lifecycle/00-ios-enrollment-paths.md) | Understand enrollment types |
| [iOS Admin Setup Guides](admin-setup-ios/00-overview.md) | Full setup sequence |
```

### Pattern 2: Runbook Numbering Continuation

**What:** macOS L1 runbooks occupy 10-15, macOS L2 runbooks occupy 10-13. iOS continues from those endpoints.

**iOS L1:** starts at 16 (device-not-appearing, setup-assistant-failed, profile-not-applied, app-not-installed, compliance-access-blocked, company-portal-signin)

**iOS L2:** starts at 14 (log-collection, profile-delivery, app-install, compliance)

**Trade-off:** The gap between L2 numbers 8 (last APv2 runbook) and 10 (first macOS runbook) is already an established precedent. iOS continuing from 14 is consistent with that pattern.

### Pattern 3: Supervision Callout Pattern (new for iOS)

**What:** iOS/iPadOS has a supervision dimension that macOS does not expose in the same way. Under macOS ADE, all ADE-enrolled devices are supervised. Under iOS, supervision is a choice (ADE always supervised, Device Enrollment never supervised). Many iOS features documented in admin guides are supervision-gated.

**When to use:** Any iOS admin guide section documenting a supervision-required feature.

**Recommended format:**

```markdown
> **Supervised only:** [Feature name] requires the device to be supervised.
> Devices enrolled via Device Enrollment (Company Portal) or User Enrollment are not supervised.
> To use this feature, devices must be enrolled via ADE through Apple Business Manager.
> See: [ADE Enrollment Profile](02-ade-enrollment-profile.md)
```

Use this callout label (`**Supervised only:**`) rather than `**What breaks if misconfigured:**` to distinguish a capability boundary from a configuration error. Both use the same blockquote format for visual consistency.

**Supervision-gated features requiring this callout:**
- Silent app installation from App Store (no user confirmation prompt)
- App Lock / Kiosk mode (single-app or multi-app)
- Web content filtering (URL allowlist/blocklist)
- Blocking screen capture
- Autonomous Single App Mode
- Restricting AirDrop, iMessage, FaceTime at policy level
- Factory reset (wipe) via MDM
- Lost Mode
- Activation Lock bypass
- Software update enforcement via declarative management
- Prohibiting apps by bundle ID

**Supervision determination point:** Supervision is set at enrollment time via the ADE enrollment profile. It cannot be added to an already-enrolled device without wiping and re-enrolling. This is the critical "Watch Out For" in the lifecycle doc's ADE section.

### Pattern 4: Multi-Path iOS Lifecycle

**What:** macOS ADE follows a single 7-stage linear pipeline. iOS has four distinct enrollment paths, each with a different device state and management scope. The lifecycle documentation must accommodate this without creating four separate lifecycle files.

**Recommended structure for `ios-lifecycle/00-ios-enrollment-paths.md`:**

1. **Comparison table at top:** enrollment type × key attributes (ownership, supervision, management scope, user experience, recommended for). This lets any reader immediately orient to the right path.
2. **Section per enrollment path:** ADE (full depth), Device Enrollment (medium depth), User Enrollment (medium depth), MAM without enrollment (reference pointer — the actual MAM configuration is out of scope for a provisioning suite).
3. **Each section uses the same macOS lifecycle subsection pattern:** What the Admin Sees, What Happens, Behind the Scenes, Watch Out For.

**Depth by path (corporate IT audience):**

| Path | Documentation Depth | Rationale |
|------|--------------------|-----------| 
| ADE (supervised, corporate) | Full — lifecycle + full admin guide set | Primary corporate path; highest management capability |
| Device Enrollment (Company Portal) | Medium — one admin guide | Secondary BYOD path; simpler setup |
| User Enrollment (account-driven) | Medium — one admin guide with limitations table | BYOD, iOS 13+; important to document limitations clearly |
| MAM without enrollment | Reference only — single paragraph + link out | App team concern, not IT provisioning |

### Pattern 5: Shared Apple Ecosystem Prerequisites

**What:** iOS ADE and macOS ADE share the ABM portal and ADE token mechanism. The APNs certificate is also shared. An organization that already has macOS ADE running through Intune may have the ABM/APNs prerequisites already satisfied for iOS.

**Cross-reference to include in `admin-setup-ios/01-abm-apns-prerequisites.md`:**

```markdown
> **If macOS ADE is already configured:** Your organization's ABM MDM server and ADE token
> may already be linked to Intune. Verify at: Intune admin center > Devices > Enrollment >
> Apple > Enrollment program tokens. A single active token serves both macOS and iOS/iPadOS —
> no separate iOS token is required.
> See: [macOS ABM Configuration](../admin-setup-macos/01-abm-configuration.md)
```

The iOS admin guide for ABM/APNs covers the verification steps and what to do if prerequisites are already met vs. need to be set up from scratch. This avoids duplicating the full ABM token creation walkthrough that already exists in the macOS guide.

## Data Flow

### iOS Triage and Escalation Flow

```
iOS/iPadOS Failure Reported
    ↓
[decision-trees/07-ios-triage.md]
    ↓ (first branch: ADE enrolled vs BYOD enrolled)
    ├─ ADE ──→ routes by symptom ──→ [l1-runbooks/17-ios-setup-assistant-failed.md]
    │                                  [l1-runbooks/16-ios-device-not-appearing.md]
    │                                  [l1-runbooks/18-ios-profile-not-applied.md]
    │                                  [l1-runbooks/19-ios-app-not-installed.md]
    │                                  [l1-runbooks/20-ios-compliance-access-blocked.md]
    │                                  [l1-runbooks/21-ios-company-portal-signin.md]
    │
    └─ BYOD ──→ routes by symptom ──→ [l1-runbooks/18-21 as applicable]

    Escalations from L1 ──→ [l2-runbooks/14-ios-log-collection.md] (prerequisite)
                                ↓
                            [l2-runbooks/15-17 as applicable]
                                ↓ references
                            [reference/ios-capability-matrix.md]
                            [reference/endpoints.md #ios-ade-endpoints]
                            [_glossary-macos.md #supervision]
```

### Admin Setup Flow

```
[admin-setup-ios/00-overview.md]
    ↓
[01-abm-apns-prerequisites.md] ←─cross-ref──→ [admin-setup-macos/01-abm-configuration.md]
    ↓
    ├─ Corporate/ADE path:
    │   [02-ade-enrollment-profile.md]
    │       ↓
    │   [05-configuration-profiles.md] [06-app-deployment.md] [07-compliance-policy.md]
    │       ↓
    │   [08-config-failures.md]
    │
    └─ BYOD paths:
        [03-device-enrollment.md]
        [04-user-enrollment.md]
            ↓
        [07-compliance-policy.md]
```

### Navigation Hub Integration Flow

```
[index.md] "Choose Your Platform"
    ├── Windows Autopilot (existing — APv1/APv2)
    ├── macOS Provisioning (existing — ADE)
    └── iOS/iPadOS Provisioning (NEW)
            ├── L1 ──→ [07-ios-triage.md] + [l1-runbooks/16-21] + [quick-ref-l1.md #ios]
            ├── L2 ──→ [l2-runbooks/14-17] + [quick-ref-l2.md #ios]
            └── Admin ──→ [ios-lifecycle/00-ios-enrollment-paths.md]
                          [admin-setup-ios/00-overview.md]
```

### Glossary Integration

iOS-specific terms are added to `_glossary-macos.md` (not a new file) because ABM, ADE, VPP, Setup Assistant, and APNs already live there and are shared between macOS and iOS. New terms to add:

- **Supervision** — managed device state enabling full MDM control; set at ADE enrollment
- **Unsupervised** — default state for Device Enrollment and User Enrollment
- **MDM Profile (iOS)** — the management profile installed during enrollment; removable on unsupervised devices
- **User Enrollment** — iOS 13+ BYOD enrollment creating a work/personal partition
- **Work Partition** — the managed portion of a User Enrollment device; isolated from personal data
- **MAM (Mobile Application Management)** — app-level policy without device enrollment
- **App Protection Policy** — Intune policy applied to managed apps under MAM
- **Account-Driven User Enrollment** — the iOS 15+ variant of User Enrollment using Settings.app
- **Managed Apple ID** — organization-controlled Apple ID required for Account-Driven User Enrollment
- **Device Enrollment** — full device management via Company Portal; unsupervised unless Apple Configurator-supervised

## Integration Points

### Files Requiring Updates (Existing Files)

| File | Change | Scope |
|------|--------|-------|
| `docs/index.md` | Add iOS/iPadOS as third platform section; update "Choose Your Platform" selector | ~50 lines added |
| `docs/common-issues.md` | Add "iOS/iPadOS Failure Scenarios" section below macOS; update "Choose Your Platform" | ~60 lines added |
| `docs/quick-ref-l1.md` | Add "iOS/iPadOS Quick Reference" section below macOS | ~30 lines added |
| `docs/quick-ref-l2.md` | Add "iOS/iPadOS Quick Reference" section below macOS | ~30 lines added |
| `docs/l1-runbooks/00-index.md` | Add "iOS/iPadOS Runbooks" section (16-21) | ~25 lines added |
| `docs/l2-runbooks/00-index.md` | Add "iOS/iPadOS Runbooks" section (14-17) | ~20 lines added |
| `docs/_glossary-macos.md` | Add iOS-specific terms under new "iOS/iPadOS" section | ~50 lines added |
| `docs/reference/endpoints.md` | Add iOS ADE endpoints section (Albert, ADE activation, APNs, Intune enrollment) | ~15 lines added |
| `docs/reference/00-index.md` | Add iOS references section linking to ios-capability-matrix.md | ~8 lines added |

### New Files Required

**Core content — must be built:**

| File | Type | Mirrors | Build Priority |
|------|------|---------|---------------|
| `docs/ios-lifecycle/00-ios-enrollment-paths.md` | Lifecycle | macOS ADE lifecycle | 1 — unblocks all other work |
| `docs/admin-setup-ios/00-overview.md` | Admin index | macOS admin overview | 2 — needed before sub-guides |
| `docs/admin-setup-ios/01-abm-apns-prerequisites.md` | Admin guide | macOS ABM guide | 3 — blocks ADE guides |
| `docs/admin-setup-ios/02-ade-enrollment-profile.md` | Admin guide | macOS enrollment profile | 4 — primary corporate path |
| `docs/admin-setup-ios/05-configuration-profiles.md` | Admin guide | macOS config profiles | 5 — core management |
| `docs/admin-setup-ios/06-app-deployment.md` | Admin guide | macOS app deployment | 5 — core management |
| `docs/admin-setup-ios/07-compliance-policy.md` | Admin guide | macOS compliance | 5 — core management |
| `docs/admin-setup-ios/03-device-enrollment.md` | Admin guide | (none) | 6 — BYOD path |
| `docs/admin-setup-ios/04-user-enrollment.md` | Admin guide | (none) | 6 — BYOD path |
| `docs/admin-setup-ios/08-config-failures.md` | Admin guide | macOS config failures | 7 — after all guides complete |
| `docs/decision-trees/07-ios-triage.md` | L1 tree | macOS triage | 8 — after runbooks titled |
| `docs/l1-runbooks/16-ios-device-not-appearing.md` | L1 runbook | macOS 10 | 9 |
| `docs/l1-runbooks/17-ios-setup-assistant-failed.md` | L1 runbook | macOS 11 | 9 |
| `docs/l1-runbooks/18-ios-profile-not-applied.md` | L1 runbook | macOS 12 | 9 |
| `docs/l1-runbooks/19-ios-app-not-installed.md` | L1 runbook | macOS 13 | 9 |
| `docs/l1-runbooks/20-ios-compliance-access-blocked.md` | L1 runbook | macOS 14 | 9 |
| `docs/l1-runbooks/21-ios-company-portal-signin.md` | L1 runbook | macOS 15 | 9 |
| `docs/l2-runbooks/14-ios-log-collection.md` | L2 runbook | macOS 10 | 10 — prerequisite for other L2 |
| `docs/l2-runbooks/15-ios-profile-delivery.md` | L2 runbook | macOS 11 | 11 |
| `docs/l2-runbooks/16-ios-app-install.md` | L2 runbook | macOS 12 | 11 |
| `docs/l2-runbooks/17-ios-compliance.md` | L2 runbook | macOS 13 | 11 |

**Supporting content — build when time allows:**

| File | Type | Note |
|------|------|------|
| `docs/reference/ios-capability-matrix.md` | Reference | iOS vs macOS feature parity; useful for admins managing both Apple platforms |
| `docs/ios-vs-macos.md` | Cross-platform | Concept map; less critical since the macOS glossary + lifecycle covers shared concepts |
| `docs/_templates/admin-template-ios.md` | Template | Create after first admin guide is written to codify the supervision callout pattern |

### Internal Boundaries and Cross-References

| Boundary | Direction | Pattern |
|----------|-----------|---------|
| iOS admin guides → macOS admin guides | One-way: iOS references macOS for shared ABM/APNs setup | Cross-ref callout in `01-abm-apns-prerequisites.md` |
| iOS l1-runbooks → iOS l2-runbooks | Escalation node IDs in triage tree | Follow `MAC1/MACR1` pattern; use `IOS1/IOSR1` prefix |
| iOS lifecycle → iOS admin guides | "See Also" at end of each lifecycle section | Same as macOS lifecycle → macOS admin guides |
| `_glossary-macos.md` → iOS docs | Inline links `[term](../_glossary-macos.md#term)` | iOS docs use macOS glossary for all Apple terms |
| iOS triage → common-issues.md | common-issues.md iOS section links to `07-ios-triage.md` | Mirrors macOS pattern exactly |
| iOS admin guides → `08-config-failures.md` | Each guide's "Configuration-Caused Failures" table populated | Same pattern as macOS `06-config-failures.md` |

## Suggested Build Order

### Group 1: Foundation (no dependencies — unblocks everything)

1. **`_glossary-macos.md` iOS term additions** — Supervision, MAM, user enrollment partition, account-driven user enrollment, Managed Apple ID, App Protection Policy. Zero content dependencies.

2. **`docs/ios-lifecycle/00-ios-enrollment-paths.md`** — Conceptual entry point for all three audiences. Writing this crystallizes the four enrollment paths, confirms where supervision boundaries fall, and identifies what admin guides are needed. Serves as the source of truth for all downstream content.

3. **`docs/_templates/admin-template-ios.md`** — Create after the lifecycle doc establishes the supervision callout pattern. Ensures all nine admin guides are structurally consistent.

### Group 2: Admin Setup Guides (sequential internal dependency)

4. **`admin-setup-ios/00-overview.md`** — Mermaid setup sequence. Requires knowing all guide titles from Group 1.

5. **`admin-setup-ios/01-abm-apns-prerequisites.md`** — First guide in sequence. Blocks all ADE guides. Cross-references `admin-setup-macos/01-abm-configuration.md`.

6. **`admin-setup-ios/02-ade-enrollment-profile.md`** — Depends on (5). Defines supervision — all "Supervised only" callouts in other guides refer back to this file.

7. **`admin-setup-ios/05-configuration-profiles.md`**, **`06-app-deployment.md`**, **`07-compliance-policy.md`** — Depend on (6) conceptually. Can be written in parallel.

8. **`admin-setup-ios/03-device-enrollment.md`**, **`04-user-enrollment.md`** — BYOD paths. No supervision content. Can be written in parallel with (7).

9. **`admin-setup-ios/08-config-failures.md`** — Reverse-lookup table. Written last; requires all other guides to exist.

### Group 3: L1 Triage and Runbooks (parallel with Group 2 after Group 1)

10. **`decision-trees/07-ios-triage.md`** — L1 entry point. Sketch tree structure early; finalize after runbooks are titled.

11. **L1 runbooks 16-21** — Six runbooks. Can be written in parallel after the first one establishes the iOS L1 pattern.

### Group 4: L2 Investigation Guides (depends on Group 3)

12. **`l2-runbooks/14-ios-log-collection.md`** — Prerequisite for all other iOS L2 guides. Written first in Group 4. iOS log collection is distinct from macOS: iOS uses Device Console (Xcode), iPhone Mirroring, or Company Portal "Share Diagnostics". Document `Settings > Privacy & Security > Analytics & Improvements > Analytics Data` for on-device log access, and `idevicesyslog` (libimobiledevice) for L2 engineers.

13. **L2 runbooks 15-17** — Written in parallel after (12).

### Group 5: Navigation Integration (last — depends on Groups 1-4)

14. **`index.md`**, **`common-issues.md`**, **`quick-ref-l1.md`**, **`quick-ref-l2.md`** — All require final file paths from Groups 1-4. Single pass after content docs are finalized.

15. **`l1-runbooks/00-index.md`**, **`l2-runbooks/00-index.md`** — Add iOS sections pointing to all new runbooks.

16. **`reference/endpoints.md`**, **`reference/00-index.md`**, **`reference/ios-capability-matrix.md`** — Can be written any time; no content dependency on runbooks.

### Parallelism Opportunities

Groups 2 and 3 can run in parallel once Group 1 is complete (admin setup and L1 troubleshooting have no cross-dependencies). Within Group 2, guides 05/06/07 and 03/04 can be parallelized. Within Group 3, all six L1 runbooks can be parallelized after the first establishes the pattern.

### Dependency Chain

```
Group 1: Glossary iOS terms + iOS lifecycle doc + iOS admin template
    ↓
Group 2 (parallel with Group 3):
  Admin: 00-overview → 01-ABM/APNs → 02-ADE ─→ 05/06/07 (parallel) → 08-failures
                                              └→ 03/04 (parallel)
  L1:    07-triage + 16-21-runbooks (parallel)
    ↓
Group 4: 14-log-collection → 15/16/17-runbooks (parallel)
    ↓
Group 5: Navigation updates + references
```

## Anti-Patterns

### Anti-Pattern 1: Creating a Separate iOS Glossary File

**What people do:** Create `_glossary-ios.md` to hold iOS-specific terms, mirroring the pattern of `_glossary-macos.md` next to `_glossary.md`.

**Why it's wrong:** ABM, ADE, VPP, Setup Assistant, and APNs already live in `_glossary-macos.md` and apply equally to iOS. A third glossary file fragments shared Apple ecosystem concepts. iOS docs would need to link to two files for Apple terminology.

**Do this instead:** Extend `_glossary-macos.md` with an iOS-specific section. Update the file's preamble to note it covers both macOS and iOS/iPadOS Apple ecosystem terminology.

### Anti-Pattern 2: Documenting All Four iOS Enrollment Paths at Equal Depth

**What people do:** Write complete admin guide sets for ADE, Device Enrollment, User Enrollment, and MAM at equal detail.

**Why it's wrong:** The audience is corporate IT. ADE (supervised, corporate-owned) is the primary path. Equal treatment wastes effort and blurs the message about which path to follow for corporate devices.

**Do this instead:** ADE gets full admin guide treatment with supervision callouts throughout. Device Enrollment and User Enrollment each get one admin guide with a focused limitations section. MAM gets a one-paragraph reference with a link to App Protection Policy documentation (out of scope for this provisioning suite).

### Anti-Pattern 3: Starting iOS L1 Runbook Numbers at 10

**What people do:** Number iOS L1 runbooks starting at 10 with an `ios-` prefix to distinguish from macOS's `macos-` prefix.

**Why it's wrong:** `l1-runbooks/` is a flat directory. macOS already occupies `10-macos-*` through `15-macos-*`. File system collisions aside, the 00-index.md tables would list two different "10" entries.

**Do this instead:** iOS L1 runbooks start at 16. Sequential numbering within a flat directory is the established convention.

### Anti-Pattern 4: Using the macOS Admin Template Unchanged for iOS Admin Guides

**What people do:** Copy `_templates/admin-template-macos.md` directly for iOS admin guides since both platforms share Apple Business Manager.

**Why it's wrong:** The macOS template has no supervision callout — under macOS ADE, all ADE-enrolled devices are supervised by default, so no supervision qualifier is needed. iOS requires `**Supervised only:**` callouts throughout admin guides for supervision-gated features. Using the macOS template without modification means these callouts are never added.

**Do this instead:** Create `_templates/admin-template-ios.md` that inherits the dual-portal ABM + Intune structure from the macOS template and adds the supervision callout pattern definition. The first admin guide written (likely `02-ade-enrollment-profile.md`) establishes the canonical supervision callout; the template is formalized from it.

### Anti-Pattern 5: Omitting the Supervision Determination Warning

**What people do:** Document supervised-only features in admin guides without explaining when and how supervision is set, assuming admins will figure it out.

**Why it's wrong:** Supervision is set at enrollment time during ADE enrollment profile creation. An admin who reads the configuration profiles guide, sees a "Supervised only" callout, and then enrolls devices via Device Enrollment cannot add supervision after the fact without wiping and re-enrolling. This is the highest-consequence iOS misconfiguration and must be called out explicitly in the lifecycle doc.

**Do this instead:** In `ios-lifecycle/00-ios-enrollment-paths.md`, include a "Watch Out For" note at the ADE enrollment stage: supervision cannot be added post-enrollment; the decision must be made before enrollment begins. Cross-reference from every `**Supervised only:**` callout in admin guides back to the ADE enrollment profile guide.

### Anti-Pattern 6: Duplicating ABM Setup Steps from macOS Admin Guides

**What people do:** Reproduce the full ABM token creation walkthrough in `admin-setup-ios/01-abm-apns-prerequisites.md` since iOS admins may not read macOS docs.

**Why it's wrong:** The ABM MDM server setup steps are identical for macOS and iOS. Duplicating them means two places to maintain when Apple changes the ABM UI.

**Do this instead:** In the iOS ABM/APNs prerequisites guide, verify whether prerequisites are already met (cross-reference macOS guide), then provide the iOS-specific divergences only (iOS enrollment profiles are configured separately from macOS profiles in Intune; both can use the same ADE token).

## Sources

- [iOS/iPadOS device enrollment guide for Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/fundamentals/deployment-guide-enrollment-ios-ipados) — HIGH confidence, official Microsoft documentation (updated 2025-06-09, verified 2026-04-16)
- [Set up automated device enrollment (ADE) for iOS/iPadOS](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-enrollment-program-enroll-ios) — HIGH confidence, official Microsoft documentation
- [Turn on iOS/iPadOS supervised mode with Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/enrollment/device-supervised-mode) — HIGH confidence, official Microsoft documentation
- [Troubleshooting iOS/iPadOS device enrollment errors in Microsoft Intune](https://learn.microsoft.com/en-us/troubleshoot/mem/intune/device-enrollment/troubleshoot-ios-enrollment-errors) — HIGH confidence, official Microsoft support documentation
- [Apple device restriction settings in Microsoft Intune](https://learn.microsoft.com/en-us/intune/intune-service/configuration/device-restrictions-apple) — HIGH confidence, supervision-gated features list
- Existing `docs/` architecture: direct inspection of 116-file documentation tree — HIGH confidence (source of truth for naming conventions, numbering, and file structure)

---

## v1.2 Architecture Reference (archived)

*The following section preserves the v1.2 architecture research for historical continuity. The patterns established here are the foundation for the v1.3 iOS/iPadOS integration above.*

**Domain:** Cross-platform provisioning documentation — macOS ABM/ADE integration + Windows Autopilot operational gap closure
**Researched:** 2026-04-13
**Confidence:** HIGH

### Architectural Decision: Parallel Platform Directories, Not Integrated

Should macOS content be woven into existing Windows directories or structured as parallel peer directories? **Recommendation: Parallel platform directories.** The existing architecture uses this pattern — `lifecycle/` and `lifecycle-apv2/` are siblings. macOS follows the same convention. The provisioning workflows are fundamentally different technologies sharing almost no diagnostic steps, registry paths, or tooling.

### v1.2 Component Responsibilities

| Component | Responsibility |
|-----------|----------------|
| `lifecycle-macos/` | End-to-end macOS provisioning narrative — ABM through ongoing management |
| `admin-setup-macos/` | Step-by-step macOS Intune configuration for admins |
| `decision-trees/05-macos-triage.md` through `06-macos-triage.md` | macOS L1 triage flowchart |
| `l1-runbooks/10-15` (macOS) | Scripted macOS troubleshooting for Service Desk |
| `l2-runbooks/10-13` (macOS) | Technical macOS investigation with Terminal commands |
| `reference/macos-log-paths.md` | Canonical macOS log file location reference |
| `reference/macos-commands.md` | Terminal diagnostic commands for macOS |

For full v1.2 architecture detail, see the `.planning/milestones/` directory or git history.

---
*Architecture research for: v1.3 iOS/iPadOS documentation integration into Intune provisioning documentation suite*
*Researched: 2026-04-16*
