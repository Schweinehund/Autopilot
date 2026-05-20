# Architecture Research: v1.6 Apple Business Delegated Governance Integration

**Domain:** Microsoft Intune docs corpus — Apple Business delegated permissions layered onto 5-platform tree
**Researched:** 2026-05-20
**Overall confidence:** HIGH for structural decisions inheriting from v1.2 / v1.4 / v1.4.1 / v1.5 precedents; MEDIUM for Apple Business privilege surface (verified rebrand from training data: Apple Business Manager → Apple Business announced 2026-03-24, GA 2026-04-14; built-in roles People Manager / Device Enrollment Manager / Content Manager + custom roles; role assignment is per-Location)

**Source basis:**
- `.planning/PROJECT.md` (Q-decisions Q2/Q5; v1.4/v1.4.1/v1.5 patterns)
- `.planning/MILESTONES.md` (v1.5 architectural patterns)
- `docs/index.md` (hub structure: Choose Your Platform selector + 5 platform H2s + Operations H2)
- `docs/admin-setup-macos/00-overview.md` + `docs/admin-setup-ios/00-overview.md` (dual-portal + branching-Mermaid path-selector)
- `docs/admin-setup-android/00-overview.md` (tri-portal + 4th-portal Knox overlay pattern)
- `docs/admin-setup-linux/00-overview.md` (5-step linear sequence)
- `docs/operations/00-index.md` (cross-platform ops index pattern)
- `docs/reference/4-platform-capability-comparison.md` (5 platforms × 6 H2 × 48 rows = 240 cells; link-not-copy)
- `docs/reference/{macos,ios}-capability-matrix.md` (bilateral / trilateral matrix structure)
- `docs/_glossary-macos.md` (Apple-shared glossary for macOS + iOS)
- `docs/l1-runbooks/` (33 runbooks, next = 34), `docs/l2-runbooks/` (25 runbooks, next = 26)
- `docs/common-issues.md` (cross-platform symptom routing)
- `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`
- Apple Support documentation (verified rebrand + role architecture)

---

## Executive Architecture Summary

v1.6 adds a **hybrid Apple Business docs tree** under a new `docs/cross-platform/apple-business/` directory (mirroring the `docs/operations/` v1.5 pattern) for foundation, glossary-cross-link target, multi-org architecture, custom-role authoring, and delegation runbooks shared between iOS and macOS. **Platform-specific overlays** (the 2 rebrand intro callouts at existing macOS ABM-config doc and existing iOS ABM-token doc) remain in place per the Q5 (b) no-corpus-sweep contract. Apple Business **does NOT become a 6th platform** (no `docs/admin-setup-apple-business/`); it becomes a **5th Operations domain** under the existing v1.5 Operations H2 in the hub, because conceptually Apple Business is operational/multi-org-governance over existing-managed iOS+macOS devices, not a provisioning surface.

Apple TV and shared iPad become **first-class admin workflows** *inside* the Apple Business tree (because they are Apple Business-owned lifecycle: device assignment + Managed Apple Account provisioning + sessions), with a single sub-row added to the existing iOS capability matrix (no new H2). The 240-cell comparison matrix structure is **preserved unchanged** — Apple Business is not a capability axis comparable to Enrollment/Configuration/etc., so we deliberately do NOT add a 7th H2 (this avoids the D-13/D-18 sibling-matrix reciprocity cascade and keeps the C12 240-cell math intact).

A **new shared glossary file** `docs/_glossary-apple-business.md` (split architecture, option c) holds Apple Business-delegation-specific terms; reciprocal see-also entries are added to the 5 existing glossaries via the CLEAN-08 pattern. L1 / L2 runbooks continue global numbering (L1 starts at 34, L2 starts at 26) with a new frontmatter convention `platform: ios+macos` (or `+shared-ipad` / `+apple-tv` where applicable) — first use of compound-platform frontmatter, inheriting from the v1.4 D-14 "platform frontmatter" pattern but extending it. The audit harness v1.6-milestone-audit.mjs is a Path-A copy from v1.5 + C14/C15/C16 new blocking checks.

---

## Standard Architecture

### System Overview — Where v1.6 Content Lives

```
docs/
├── _glossary.md                                (Windows — unchanged)
├── _glossary-macos.md                          (Apple-shared — unchanged at v1.6, gains reciprocal entry only)
├── _glossary-ios.md                            (does NOT exist — Apple terms collapse to _glossary-macos.md per v1.3 D-22)
├── _glossary-android.md                        (Android — unchanged, gains reciprocal entry only)
├── _glossary-linux.md                          (Linux — unchanged, gains reciprocal entry only)
├── _glossary-apple-business.md                 ★ NEW v1.6 — delegated-governance terminology
├── index.md                                    ☆ MOD v1.6 — Operations H2 gains 5th sub-section
├── common-issues.md                            ☆ MOD v1.6 — append cross-org-boundary symptom rows
├── quick-ref-l1.md                             ☆ MOD v1.6 — append Apple Business L1 H2
├── quick-ref-l2.md                             ☆ MOD v1.6 — append Apple Business L2 H2
├── admin-setup-apv1/                           (Windows APv1 — unchanged)
├── admin-setup-apv2/                           (Windows APv2 — unchanged)
├── admin-setup-macos/
│   ├── 00-overview.md                          (unchanged)
│   ├── 01-abm-configuration.md                 ☆ MOD v1.6 — intro callout #1 (Q5 b)
│   └── (rest unchanged)
├── admin-setup-ios/
│   ├── 00-overview.md                          (unchanged)
│   ├── 02-abm-token.md                         ☆ MOD v1.6 — intro callout #2 (Q5 b)
│   └── (rest unchanged)
├── admin-setup-android/                        (Android — unchanged)
├── admin-setup-linux/                          (Linux — unchanged)
├── cross-platform/                             ★ NEW v1.6 — first cross-platform/ tree
│   └── apple-business/
│       ├── 00-overview.md                      ★ Foundation + rebrand callout #3 (Q5 b — canonical site)
│       ├── 01-role-privilege-model.md          ★ Built-in roles + privilege catalog + scope-boundary table
│       ├── 02-locations-architecture.md        ★ Locations concept + multi-location patterns
│       ├── 03-locations-vs-custom-roles.md     ★ Decision matrix Q2-b vs Q2-c vs combination
│       ├── 04-custom-role-authoring.md         ★ Step-by-step authoring guide (Locations prerequisite)
│       ├── 05-sub-org-admin-onboarding.md      ★ Onboarding workflow for new sub-org admin
│       ├── 06-mdm-server-assignment.md         ★ MDM server scoping + multi-cohort device assignment
│       ├── 07-content-token-consolidation.md   ★ VPP content token unification under Locations
│       ├── 08-managed-apple-account.md         ★ Managed Apple Account provisioning per Location
│       ├── 09-shared-ipad-lifecycle.md         ★ Shared iPad multi-org provisioning + Sessions
│       ├── 10-apple-tv-lifecycle.md            ★ Apple TV multi-org provisioning
│       ├── 11-vpp-catalog-runbook.md           ★ Delegation runbook — VPP catalog scoped to Location
│       ├── 12-shared-ipad-passcode-reset.md    ★ Delegation runbook — passcode reset (L1 cross-link target)
│       ├── 13-device-release-runbook.md        ★ Delegation runbook — device release
│       ├── 14-device-transfer-runbook.md       ★ Delegation runbook — inter-Location device transfer
│       ├── 15-audit-log-scoping.md             ★ Delegation runbook — audit log scope per role
│       └── 16-cross-org-boundary-cheat-sheet.md ★ "What Apple Business owns vs what Intune owns" matrix
├── l1-runbooks/
│   ├── 00-index.md                             ☆ MOD v1.6 — append Apple Business section
│   ├── ... (00-33 unchanged)
│   └── 34-apple-business-shared-ipad-passcode-reset.md  ★ NEW (next global number)
├── l2-runbooks/
│   ├── 00-index.md                             ☆ MOD v1.6 — append Apple Business section
│   ├── ... (00-25 unchanged)
│   └── 26-apple-business-permission-denied.md  ★ NEW (next global number)
├── operations/                                 ☆ MOD v1.6 — 00-index.md gains 5th H2
│   ├── 00-index.md
│   ├── co-management/
│   ├── patch-management/
│   ├── app-lifecycle/
│   └── drift-migration/
└── reference/
    ├── macos-capability-matrix.md              (unchanged — no Apple Business H2)
    ├── ios-capability-matrix.md                ☆ MOD v1.6 — 3 rows added under existing Enrollment H2 (Apple TV / Shared iPad / Apple Business delegation)
    └── 4-platform-capability-comparison.md     (UNCHANGED — Apple Business is NOT a 7th H2)
```

**Legend:** ★ NEW, ☆ MOD (existing file, surgical edit only), unmarked = untouched

### Component Responsibilities

| Component | Responsibility | Inherits From |
|-----------|---------------|---------------|
| `docs/cross-platform/apple-business/` | All v1.6 NEW content — foundation, multi-org architecture, admin guides, delegation runbooks | New top-level convention; modeled after `docs/operations/` v1.5 pattern |
| `_glossary-apple-business.md` | Delegated-governance-specific terms; reciprocal see-also from other 5 glossaries | Glossary split pattern from v1.4 (`_glossary-android.md`) + v1.5 (`_glossary-linux.md`) |
| `_glossary-macos.md` | Apple-platform terms remain here (ABM, ADE, Supervision, VPP, APNs); gains see-also pointer to Apple Business glossary; **no entry rewrites** | CLEAN-08 v1.5 reciprocal-see-also pattern |
| `admin-setup-macos/01-abm-configuration.md:1` | Intro callout flagging rebrand (canonical site #2) | v1.4 platform-frontmatter no-retroactive-sweep precedent |
| `admin-setup-ios/02-abm-token.md:1` | Intro callout flagging rebrand (canonical site #3) | Same as above |
| `cross-platform/apple-business/00-overview.md:1` | Rebrand callout #1 (canonical site for harness C14 scan) | New convention; first canonical content site |
| `l1-runbooks/34-*.md` | L1 shared iPad passcode reset; frontmatter `platform: ios+macos+shared-ipad` | L1 global numbering from v1.4 (22-29) + v1.5 (30-33) |
| `l2-runbooks/26-*.md` | L2 Apple Business permission-denied diagnostic; frontmatter `platform: ios+macos` | L2 global numbering from v1.4.1 (22-23) + v1.5 (24-25) |
| `reference/ios-capability-matrix.md` | Adds rows for "Apple TV management", "Shared iPad sessions", "Apple Business delegation surface" under existing Enrollment H2; iOS column only | v1.3 iOS matrix incremental-row pattern |
| `reference/4-platform-capability-comparison.md` | **UNCHANGED** — Apple Business is not a capability axis | C12 240-cell structural validator gate; D-13/D-18 sibling-matrix reciprocity preserved |
| `docs/index.md` Operations H2 | Gains "### Apple Business Delegated Governance" sub-section pointing into `cross-platform/apple-business/` | v1.5 Operations H2 sub-section pattern (Co-Management / Patch / App / Drift / **+ Apple Business**) |
| `docs/common-issues.md` | Append "## Apple Business Governance Failure Scenarios" H2 with cross-org-boundary symptom routing | v1.5 Phase 57 Android append-only pattern |
| `docs/quick-ref-l1.md` / `quick-ref-l2.md` | Append `## Apple Business Quick Reference` H2 each | v1.5 Phase 57 / CLEAN-03 / CLEAN-04 append-only pattern |
| Audit harness v1.6 | Path-A copy v1.5→v1.6 + C14/C15/C16 new blocking checks | v1.5 Path-A v1.4.1→v1.5 precedent (AUDIT-01) |

---

## Architectural Decisions (Recommended)

The following 10 decisions track 1:1 against the orchestrator's 10 sub-questions. Each carries: option taken / alternatives rejected / rejection rationale / inherited precedent / confidence.

---

### D-A1: Directory Placement — `docs/cross-platform/apple-business/` (Option d, hybrid leaning to "c")

**Option taken:** Option d (hybrid) — foundation/glossary/multi-org architecture/runbooks all live in NEW `docs/cross-platform/apple-business/`. The 2 platform-specific intro callouts (Q5 b) live as surgical edits inside existing `admin-setup-macos/01-abm-configuration.md` and `admin-setup-ios/02-abm-token.md`. The new tree introduces the first `docs/cross-platform/` parent directory (analogous to `docs/operations/`).

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| (a) `docs/admin-setup-apple-business/` (treats Apple Business as a 6th platform) | Creates a peer to the 5 existing platform directories, but Apple Business is NOT a platform — it's a delegated-permissions surface that spans iOS+macOS. Adding a 6th platform directory would force a 6th Choose-Your-Platform bullet in `docs/index.md`, a 6th glossary (already deciding to add one), and would imply admins should look here for *primary* iOS/macOS provisioning rather than for governance. Violates the platform-as-target-device-OS taxonomy v1.2 established. |
| (b) Extend `admin-setup-macos/` + `admin-setup-ios/` with shared `0X-apple-business-*.md` docs cross-linked between the two | Creates duplicate doc maintenance (or relies on symlinks, which break on git/SharePoint export). The Q5 (b) decision explicitly says "iOS+macOS share one merged docs tree" — this option produces two trees that *must* stay in lockstep. Violates the cross-platform v1.2 single-source-of-truth pattern. |
| (c) `docs/cross-platform/apple-business/` mirroring `docs/operations/` v1.5 pattern exactly (no platform-specific overlays) | Pure-c is rejected because Q5 (b) decision requires intro callouts at the 2 existing admin docs. Pure-c can't satisfy the canonical-callout-sites requirement without also editing existing docs. Hybrid (d) adds the 2 callouts on top of (c). |

**Inherits from:** `docs/operations/` v1.5 pattern (Phase 59 Plan 59-05) — operations content lived in a new top-level directory because it spans multiple platforms by operational axis rather than per-platform. Same logic here: Apple Business governance spans 2 platforms (iOS+macOS) by delegation axis. Plus v1.4 platform-frontmatter no-retroactive-sweep precedent (D-14) for the surgical 2-callout edits.

**Why "cross-platform/" rather than "operations/apple-business/":** Apple Business is a *governance* surface (multi-org administration of who-can-do-what), not an *operations* surface (what to do to devices). It's conceptually adjacent to operations but the categorical distinction matters for navigation discoverability — admins look here for *permission-delegation patterns*, not for patch/app/drift workflows. Reserving `cross-platform/` as a parent leaves room for future cross-platform-but-not-operations content (e.g., cross-platform identity, cross-platform supervision concepts).

**PITFALL-6 anchor-stability surface:** Zero existing anchor changes because we ADD new files and ADD content to existing docs only. The 2 intro-callout edits at `admin-setup-macos/01-abm-configuration.md:1` and `admin-setup-ios/02-abm-token.md:1` add content above the existing H1 — no existing H2/H3 anchors shift. Append-only contract enforced.

**Confidence:** HIGH — directly inherits two proven precedents (v1.5 `docs/operations/` + v1.4 platform-frontmatter surgical-edit pattern).

---

### D-A2: Glossary Architecture — Split (Option c): NEW `_glossary-apple-business.md` + reciprocal see-also on 5 existing glossaries

**Option taken:** Option (c) — dedicated `_glossary-apple-business.md` for Apple-Business-delegation-specific terms (Locations, custom role, privilege, content token, Managed Apple Account, shared iPad sessions, device transfer, audit log scope, sub-org admin); existing `_glossary-macos.md` Apple-platform terms (ABM, ADE, Supervision, VPP, APNs, Await Configuration, Setup Assistant, MAM-WE) stay in `_glossary-macos.md`. ABM term in `_glossary-macos.md` gains a Q5 (b) intro callout flagging the rebrand at the entry; no rewrite of existing entries.

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| (a) Append everything to `_glossary-macos.md` | The file is already Apple-shared (iOS+macOS) per v1.3 D-22 and would grow ~9 new entries. More importantly, the Apple Business *delegation* concepts (Locations, custom roles, privileges) have qualitatively different semantics from the Apple *platform* concepts (ADE, Supervision, VPP). Mixing them blurs the conceptual layer — a reader looking for "Supervision" shouldn't have to wade through Apple Business role-privilege terminology. |
| (b) New `_glossary-apple-business.md` shared between iOS + macOS, but ALSO move ABM/ADE/Supervision/VPP into it | Breaks ~30 existing inbound links to `_glossary-macos.md#abm` / `#ade` / `#supervision` / `#vpp` across the corpus (PITFALL-6 anchor-stability violation, retroactive corpus sweep). Q5 (b) explicitly forbids this. |
| (c) Split: Apple-Business delegation terms in NEW glossary, Apple-platform terms stay in existing | **Chosen.** Minimizes existing-anchor churn (zero changes to existing `#abm`/`#ade`/`#supervision`/`#vpp` anchors). |

**CLEAN-08 v1.5 reciprocal-see-also impact:** v1.5 CLEAN-08 normalized 5 platform glossaries with reciprocal see-also entries. v1.6 adds a 6th glossary node, which requires:
- 5 existing glossaries (`_glossary.md`, `_glossary-macos.md`, `_glossary-android.md`, `_glossary-linux.md`) each gain ONE new see-also line in their header banner pointing to `_glossary-apple-business.md`. Total: 4 single-line additions (Windows + Android + Linux + macOS).
- The new `_glossary-apple-business.md` carries see-also lines to all 4 existing glossaries.
- ABM entry in `_glossary-macos.md` gains an inline see-also link to `_glossary-apple-business.md#locations` (the "Locations replaces what used to be one global ABM scope" concept-bridge).

**Inherits from:** v1.5 CLEAN-08 reciprocal-see-also pattern (Phase 59 Plan 59-05) + v1.4 `_glossary-android.md` precedent (separate glossary because Android terms qualitatively different from Apple/Windows) + v1.5 `_glossary-linux.md` precedent (separate glossary because Linux terms qualitatively different).

**Confidence:** HIGH — direct inheritance from two proven glossary-split precedents.

---

### D-A3: Capability Matrix Strategy — Incremental rows in `ios-capability-matrix.md` ONLY; NO change to `macos-capability-matrix.md`; NO change to `4-platform-capability-comparison.md`

**Option taken:** Three sub-decisions:

1. **`ios-capability-matrix.md`** — add 3 new rows under the existing `## Enrollment` H2 (no new H2):
   - `Apple TV management` (iOS column: Supported via Apple Business Location + MDM server assignment)
   - `Shared iPad sessions` (iOS column: Supported on iPad; supervised + Managed Apple Account required)
   - `Apple Business delegated administration surface` (iOS column: Supported via Locations + custom roles; cross-link to `cross-platform/apple-business/00-overview.md`)

2. **`macos-capability-matrix.md`** — UNCHANGED. macOS *uses* Apple Business for governance but does not need new rows; existing ABM/ADE rows already cover macOS. (Optionally a single see-also link in the file footer pointing to the Apple Business tree.)

3. **`reference/4-platform-capability-comparison.md`** — **UNCHANGED.** No 7th H2 column for Apple Business delegation.

**Why NO 7th H2 in the 5-platform comparison doc:** The 5 existing H2s (Enrollment / Configuration / App Deployment / Compliance / Software Updates / Conditional Access — that's actually 6 H2s containing 48 rows totaling 240 cells per the C12 validator) are **device-capability axes** that exist across all platforms. Apple Business delegation is **not** a device-capability axis — it's an iOS+macOS-only multi-tenant-governance overlay that has no Windows / Android / Linux analog. Adding a 7th H2 would:
- Force 5 n/a cells per row (Windows / Android / Linux all n/a for Apple Business governance)
- Trigger the D-13/D-18 sibling-matrix-anchor-pin contract: any new H2 in the comparison doc requires reciprocal H2 in `linux-capability-matrix.md`, `macos-capability-matrix.md`, `ios-capability-matrix.md`, `android-capability-matrix.md` — that's 4 new H2s to add, each with rows
- Break the C12 240-cell math (6 H2 × 5 cols × 48 rows = 240). New H2 → 7 H2 × 5 cols × N rows → C12 validator needs a new expected-cell count
- Mix a delegation concept into a device-capability matrix (categorical confusion)

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| 7th H2 "Apple Business Delegation" added to all 4 sibling matrices + comparison doc | Forces 5 n/a cells per row in Windows/Android/Linux columns, mixes governance with device capability, triggers D-13/D-18 cascade across 4 files, breaks C12 240-cell math. |
| New H2 "Apple Business Delegation" in iOS + macOS matrices only (no propagation) | Breaks D-13/D-18 sibling-matrix-anchor-pin contract which requires reciprocal H2 in ALL 4 sibling matrices, not just 2. |
| Add 3 rows to BOTH iOS + macOS capability matrices | macOS matrix doesn't gain meaningfully from these rows because (a) shared iPad is iOS-only, (b) Apple TV is tvOS but admins-mental-model-iOS, (c) Apple Business delegation surface adds 1 row to a matrix that already documents ABM extensively. Less duplication if iOS matrix is sole home. |
| Add rows to iOS matrix only (chosen) | Apple TV / shared iPad are iPad-family concerns; iOS matrix is the natural home. Cross-link from macOS matrix footer suffices for macOS admins who want to reach the same content. |

**Inherits from:** v1.5 D-13 sibling-matrix-anchor-pin contract (deliberately *preserves* it by not adding a 7th H2); v1.3 iOS matrix incremental-row pattern (rows added under existing H2 without forcing structural change); v1.4 / v1.4.1 Android capability matrix row-addition pattern (Knox row, COPE column).

**C12 240-cell math preservation:** **240 cells unchanged.** 6 H2 × 5 platform columns × 48 rows. Apple Business delegation does NOT enter this matrix. The C12 structural validator passes without modification.

**Confidence:** HIGH — explicitly preserves the most expensive v1.5 invariant (C12 + D-13/D-18). The alternative was researched and rejected because the cost of cascading sibling-matrix reciprocity for a non-device-capability concept exceeds the value.

---

### D-A4: Hub Navigation — Apple Business as 5th Operations sub-domain (Option c)

**Option taken:** Option (c) — append `### Apple Business Delegated Governance` as a 5th sub-section under the existing `## Operations` H2 in `docs/index.md`, alongside Co-Management / Patch / App / Drift. Also append entries to the `## Cross-Platform References` H2 at the bottom (analogous to the v1.5 Linux Capability Matrix / Linux Provisioning Lifecycle entries).

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| (a) New top-level H2 `## Apple Business Governance` (peer to `## Windows Autopilot`, `## macOS Provisioning`, `## iOS/iPadOS Provisioning`, `## Android Enterprise Provisioning`, `## Linux Provisioning`, `## Operations`) | Treats Apple Business as a *platform* peer, but it's not — it's a delegation surface over iOS+macOS. Would force a 7th Choose-Your-Platform bullet which dilutes the platform-selector signal ("choose your platform" stops being about device OS). v1.5 Operations H2 set the precedent that cross-platform-by-axis content is a peer-of-platforms, not a platform-itself; Apple Business is *narrower* than Operations (only 2 platforms) so even less platform-like. |
| (b) Sub-sections under both `## macOS Provisioning` AND `## iOS/iPadOS Provisioning` (cross-linked) | Duplicates the same content under two H2s, fragments the Apple Business surface across the hub, creates two link targets for the same content (PITFALL-6 anchor-stability concern when readers bookmark either copy). |
| (c) Sub-section under existing `## Operations` H2 alongside Co-Management / Patch / App / Drift | **Chosen.** Apple Business is conceptually operational (you're doing things to existing-managed devices via delegation) and fits naturally as the 5th ops domain. Single canonical link target; existing Operations H2 already established by v1.5 (Phase 59 CLEAN-08 SC#1) as the cross-platform-by-axis home. |

**Specific edit to `docs/index.md`:**
- Insert new sub-section under `## Operations` H2 (after the existing `### Compliance Drift Detection + Tenant Migration` H3), structured as: `### Apple Business Delegated Governance` + 1-2 sentence intro + table of 4-5 representative resources (overview, role-privilege model, custom-role authoring guide, shared iPad passcode reset runbook, cross-org-boundary cheat sheet)
- The `## Cross-Platform References` H2 at file bottom gains 2-3 new entries (Apple Business glossary, Apple Business role-privilege model, cross-org-boundary cheat sheet)
- The `> **Platform coverage:**` banner at the top of `docs/index.md:9` gains a small clause appendix: "...plus cross-platform Apple Business delegated governance (iOS+macOS multi-org operations)" — surgical append, no rewrite

**Confidence:** HIGH — inherits directly from v1.5 Phase 59 Operations H2 pattern; the "5th ops domain" framing maps cleanly onto the existing 4 sub-sections.

---

### D-A5: L1 / L2 Runbook Numbering & Frontmatter

**Option taken:**

- **L1 next available global number = 34.** First v1.6 L1 runbook is `34-apple-business-shared-ipad-passcode-reset.md`. (Verified by Bash directory listing: 00-33 occupied across Windows/macOS/iOS/Android/Linux per v1.0-v1.5.)
- **L2 next available global number = 26.** First v1.6 L2 runbook is `26-apple-business-permission-denied.md`. (Verified by Bash directory listing: 00-25 occupied; gaps at 09 not a numbering reset per v1.0 omission.)
- **Frontmatter convention — NEW compound-platform values:** `platform: ios+macos` (default for Apple Business runbooks), `platform: ios+macos+shared-ipad` (for shared iPad-specific), `platform: ios+macos+apple-tv` (for Apple TV-specific). Plus-separator follows the v1.4 D-14 platform-frontmatter convention's spirit (default-Windows + explicit-other-platforms) but extends it for cross-platform runbooks.
- **common-issues.md routing** — append `## Apple Business Governance Failure Scenarios` H2 with rows: "Shared iPad passcode reset blocked / wrong sub-org admin" → L1 #34, "VPP catalog assignment failing / permission denied" → L2 #26, "Device cannot be released by sub-org admin" → L2 #26 sub-cause routing, etc.

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| Reset numbering at 100 for v1.6 (e.g., L1 100, L2 100) to mark milestone | Breaks global-numbering invariant established v1.0-v1.5 (33 L1 runbooks numbered sequentially across platforms). Would create a discontinuity that's purely cosmetic and complicates downstream Mermaid triage-tree node IDs. |
| Per-platform numbering reset (e.g., apple-business-l1-01.md) | Breaks the global L1/L2 numbering invariant. v1.5 did NOT reset for Linux (used 30-33 continuing from Android 22-29). |
| `platform: apple-business` (single value, replaces ios+macos) | Implies Apple Business is its own platform (see D-A1 rejection of Option a). Compound `ios+macos` correctly signals "applies to both iOS and macOS, scoped to Apple Business delegation context" without inventing a new platform identity. |
| `platform: ios+macos` continuing global numbering (chosen) | **Chosen.** Honors invariant, signals cross-platform scope, allows downstream Mermaid + harness checks to recognize compound platforms via a `+` split parse. |

**Frontmatter convention introduced (NEW for v1.6):**
```yaml
---
last_verified: 2026-05-20
review_by: 2026-07-19      # 60-day cycle per v1.4 D-14
applies_to: governance      # NEW value — formerly all/both/ADE/etc.
audience: L1                # or L2
platform: ios+macos+shared-ipad  # NEW compound-platform pattern
---
```

**Inherits from:** v1.4 D-14 platform-frontmatter convention (extends, does not replace) + v1.5 L1 numbering 30-33 + L2 numbering 24-25 (continues sequence).

**Confidence:** HIGH for numbering; MEDIUM for compound-platform frontmatter (new convention; needs Phase 1 validation that the audit harness can parse `ios+macos+shared-ipad` correctly — recommend C15 anti-pattern guard include a parse-test for the `+` separator).

---

### D-A6: Quick-Ref Card Placement — Append new Apple Business H2 (Option a)

**Option taken:** Option (a) — append new top-level `## Apple Business Quick Reference` H2 to BOTH `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md`, alongside existing platform H2s (Windows / macOS / iOS / Android / Linux). The H2 contains scenario-specific quick checks (Apple Business L1 #34 link, "is this user a sub-org admin?" lookup, escalation triggers for sub-org admin permission gaps).

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| (a) New Apple Business H2 alongside existing 5 platform H2s | **Chosen.** Single discoverability point; mirrors the structure of all 5 existing platform sections; readers can scan H2s and find their domain. |
| (b) Extend existing macOS + iOS H2s with Apple Business sub-H3s | Fragments the Apple Business content across 2 different H2s within the same file. A reader looking for "shared iPad passcode reset" doesn't know whether to scan macOS or iOS quick-ref sections. Defeats the cross-platform consolidation principle (Q5 b decision). |

**Specific quick-ref structure** (matches the existing per-platform H2 template):
```markdown
## Apple Business Quick Reference

### Top 5 Checks

**Domain:** Apple Business Delegated Governance (iOS + macOS multi-org)

1. **Sub-org admin role assigned?** — Apple Business > Access Management > Users > [user] — verify role + Location assignment
2. **Custom role has required privilege?** — Apple Business > Access Management > Roles > [role] — verify privilege checkbox for the action
3. **Device in correct Location?** — Apple Business > Devices > filter by Location
4. **Content token attached to Location?** — Apple Business > Content > [token] — verify Location assignment
5. **Managed Apple Account provisioned?** — Apple Business > Users > [user] — verify Managed Apple Account status

### Escalation Triggers

- Sub-org admin reports "Permission denied" but they have the role → Verify Location assignment, escalate L2 #26
- Shared iPad passcode reset blocked → Verify sub-org admin owns the device's Location, see L1 #34
- ...

### Runbooks

- [Shared iPad Passcode Reset](l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md)
- [Cross-Org-Boundary Cheat Sheet](cross-platform/apple-business/16-cross-org-boundary-cheat-sheet.md)
```

**Inherits from:** v1.5 Phase 57 CLEAN-03 / CLEAN-04 quick-ref append-only pattern for Android; v1.5 Phase 59 Linux quick-ref H2 addition.

**Confidence:** HIGH — direct inheritance from two proven precedents (Android v1.4.1, Linux v1.5).

---

### D-A7: Apple TV + Shared iPad Doc Surface

**Option taken:** Apple TV and Shared iPad become **first-class admin workflows under `docs/cross-platform/apple-business/`** as dedicated files (`09-shared-ipad-lifecycle.md` and `10-apple-tv-lifecycle.md`), with:
- 3 new rows added to `reference/ios-capability-matrix.md` under existing Enrollment H2 (per D-A3): one each for Apple TV management, shared iPad sessions, Apple Business delegation surface
- L1 #34 (shared iPad passcode reset) carries `platform: ios+macos+shared-ipad` compound frontmatter and lives in `l1-runbooks/`
- Existing iOS docs (e.g., `docs/admin-setup-ios/03-ade-enrollment-profile.md`) are NOT modified — Apple TV / shared iPad coverage is additive only

**Alternatives considered + rejection rationale:**

| Option | Why Rejected |
|--------|--------------|
| Apple TV / shared iPad remain only in capability matrices + lifecycle docs (do not elevate) | Q1 hard scope explicitly calls Apple TV + shared iPad first-class admin workflows in v1.6. Leaving them as matrix cells doesn't satisfy the multi-org provisioning need. |
| Create separate `docs/admin-setup-tvos/` + `docs/admin-setup-shared-ipad/` trees | Creates 2 NEW top-level platform-like directories for what are really *sub-form-factors* of iOS/iPadOS (Apple TV runs tvOS but is admin-mental-model adjacent to iPad; shared iPad is an iPad mode). Violates platform-as-target-device-OS taxonomy. Multiplies maintenance surface. |
| Elevate via dedicated files inside `cross-platform/apple-business/` tree (chosen) | **Chosen.** Apple TV + shared iPad are governance concerns (Location assignment, Managed Apple Account, content token routing) — fits naturally under Apple Business tree. Doesn't fragment iOS/iPadOS docs. |

**Confidence:** HIGH — the governance-not-platform framing makes the location obvious.

---

### D-A8: Cross-Link Contract — Read-only references to existing docs; reciprocal see-also additions allowed via single-line surgical appends ONLY at 3 canonical sites (Q5 b)

**Option taken:** v1.6 new docs link **OUT** to existing v1.0-v1.5 docs freely (read-only references); existing v1.0-v1.5 docs receive **NO modifications** EXCEPT the 2 explicit Q5 (b) intro-callout sites:
- `docs/admin-setup-macos/01-abm-configuration.md:1` — intro callout flagging ABM→Apple Business rebrand + see-also link to `cross-platform/apple-business/00-overview.md`
- `docs/admin-setup-ios/02-abm-token.md:1` — intro callout flagging rebrand + see-also link to `cross-platform/apple-business/00-overview.md`
- `docs/_glossary-macos.md:62` (the ABM entry) — single inline see-also link added to the existing entry, NOT a rewrite

That's the entire scope of existing-doc modifications. No reciprocal see-also additions in any other existing v1.0-v1.5 docs. PITFALL-6 anchor-stability is fully preserved.

**Cross-link patterns allowed for v1.6 NEW docs:**
- Link from `cross-platform/apple-business/01-role-privilege-model.md` → `docs/admin-setup-macos/01-abm-configuration.md#existing-anchor` (read-only)
- Link from `cross-platform/apple-business/06-mdm-server-assignment.md` → `docs/admin-setup-ios/02-abm-token.md#existing-anchor` (read-only)
- Link from `cross-platform/apple-business/11-vpp-catalog-runbook.md` → `docs/operations/app-lifecycle/03-ios-vpp-licensing.md#existing-anchor` (read-only)

**Cross-link patterns FORBIDDEN for v1.6:**
- Adding "see also" lines to existing v1.0-v1.5 docs OTHER than the 3 canonical sites (would violate Q5 b no-corpus-sweep)
- Changing anchor text in existing docs (PITFALL-6)
- Adding new H2/H3 to existing docs (PITFALL-6)

**Smallest-footprint pattern (what's the test):** Run `git diff origin/master -- docs/*.md` after v1.6 close. The diff should show:
- 3 modified existing files (`admin-setup-macos/01-abm-configuration.md`, `admin-setup-ios/02-abm-token.md`, `_glossary-macos.md`) — each with ≤3 added lines
- 5 modified hub/cross-cutting files (`docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`, `docs/operations/00-index.md`) — each with append-only additions
- Many new files under `docs/cross-platform/apple-business/`, `docs/l1-runbooks/`, `docs/l2-runbooks/`, plus the new glossary

**Inherits from:** v1.4 D-14 no-retroactive-sweep precedent (platform: Windows default avoided retroactive edits to 70+ v1.0/v1.1 docs); v1.5 CLEAN-08 reciprocal-see-also pattern (single-line additions only).

**Confidence:** HIGH — the surgical-cross-link discipline is well-established by 4 prior milestones.

---

### D-A9: Audit Harness C14 / C15 / C16 Design

**Option taken:** Path-A copy `v1.5-milestone-audit.mjs` → `v1.6-milestone-audit.mjs` + add 3 new blocking checks. v1.6 ships C14 / C15 / C16 as **blocking from start** because they each target a structurally-required invariant (mirrors v1.5 C10 Linux-frontmatter blocking-from-start; differs from C11/C12/C13 which scaffolded informational-first because they targeted breadth checks).

**C14 — rebrand-statement presence at 3 canonical sites (BLOCKING)**
- **Target file:line coords (verified for harness regex stability):**
  - `docs/cross-platform/apple-business/00-overview.md` — within first 30 lines, must contain the rebrand statement (a short paragraph naming both "Apple Business Manager" and "Apple Business" with the rebrand date 2026-04-14)
  - `docs/admin-setup-macos/01-abm-configuration.md` — within first 15 lines (the intro-callout zone above the existing H1)
  - `docs/admin-setup-ios/02-abm-token.md` — within first 15 lines
- **Regex sketch:**
  ```javascript
  const REBRAND_STATEMENT = /Apple Business Manager.{0,80}now (called )?Apple Business|Apple Business.{0,80}formerly (known as )?Apple Business Manager/i;
  const REBRAND_DATE = /2026-04-14|April 14,? 2026/;
  // Both must match in the file's first N lines
  ```
- **Why blocking from start:** the 3-site presence is a structural requirement of Q5 (b). If any canonical site is missing the statement, the rebrand handling is incomplete.

**C15 — Intune-delegation anti-pattern guard (BLOCKING)**
- **Target files scanned:** all files matching `docs/cross-platform/apple-business/**/*.md` (new tree only — existing docs unchanged)
- **Banned phrases (deny-list, case-insensitive):**
  ```javascript
  const BANNED_PHRASES = [
    /delegate.{0,40}VPP.{0,40}role.{0,40}(in|via|through)\s+Intune/i,
    /Apple Business.{0,40}scope group.{0,40}(in|via|through)\s+(Intune|Endpoint Manager)/i,
    /Intune.{0,40}custom role.{0,40}for.{0,40}Apple Business/i,
    /Endpoint Manager.{0,40}Locations/i,
    /Intune.{0,40}grant.{0,40}Apple Business.{0,40}privilege/i,
    /assign.{0,40}Apple Business.{0,40}(role|privilege).{0,40}in.{0,40}(Intune|Endpoint Manager)/i,
    /Intune.{0,40}(replace|substitute|fulfill).{0,40}Apple Business.{0,40}role/i,
    /(?:^|\s)delegate.{0,40}Apple Business.{0,40}(?:via|using|through).{0,40}(?:Intune|Microsoft Entra|Graph API)/i,
  ];
  ```
- **Pre-allowlist exemption pattern:** matches inside a `> ⚠️ Anti-pattern:` blockquote or inside a `<!-- C15-allowlist-anti-pattern: ... -->` HTML comment are exempt (the Cross-Org-Boundary Cheat Sheet legitimately *names* anti-patterns to flag them).
- **Why blocking from start:** the hard scope boundary (Q-decision: Apple Business surface only; Intune RBAC out of scope) is the central architectural invariant of v1.6. A single Intune-delegation anti-pattern leak undermines the milestone's value.

**C16 — shared iPad passcode reset L1 cross-link integrity (BLOCKING)**
- **Target link the validator must resolve:** the L1 #34 runbook (`docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md`) MUST link to BOTH:
  - `docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md` (the canonical admin-context runbook) — anchor-resolvable
  - `docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` (the "which admin owns this pool" lookup procedure) — anchor-resolvable
- **Reverse-link assertion:** the canonical admin-context runbook MUST link back to L1 #34 (reciprocal)
- **common-issues.md row assertion:** `docs/common-issues.md` MUST have a row under "Apple Business Governance Failure Scenarios" pointing to L1 #34
- **Regex sketch:**
  ```javascript
  const L1_RUNBOOK = readFile('docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md');
  assert(L1_RUNBOOK.includes('cross-platform/apple-business/12-shared-ipad-passcode-reset.md'));
  assert(L1_RUNBOOK.match(/cross-platform\/apple-business\/05-sub-org-admin-onboarding\.md#which-admin-owns-this-pool/));
  const CANON = readFile('docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md');
  assert(CANON.includes('l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md'));
  const COMMON_ISSUES = readFile('docs/common-issues.md');
  assert(COMMON_ISSUES.match(/Apple Business Governance Failure Scenarios[\s\S]*l1-runbooks\/34-/));
  ```
- **Why blocking from start:** the L1 / admin-doc / common-issues triangle is the central user-facing integration test for the L1 runbook integration pillar. If any leg fails, end users cannot navigate to the runbook from the symptom they're searching.

**Additional harness lift:**
- Sidecar `v1.6-audit-allowlist.json` migrated to `scripts/validation/` per v1.4.1 / v1.5 precedent
- BASELINE refresh: regenerate-supervision-pins.mjs --self-test exits 0 after C15 pre-allowlist is populated
- Per-phase `check-phase-NN.mjs` validators (62, 63, 64, ...) following v1.5 lineage
- CI workflow `audit-harness-v1.6-integrity.yml` Path-A from v1.5

**Inherits from:** v1.5 Path-A v1.4.1→v1.5 (AUDIT-01); v1.4.1 C9 cope_banned_phrases pattern (deny-list regex with allowlist exemption — direct ancestor of C15); v1.5 C12 cross-link integrity validator pattern (direct ancestor of C16).

**Confidence:** HIGH for C14 + C16 (well-precedented patterns); MEDIUM for C15 (banned-phrase list quality depends on phase 1 content-pattern review; recommend Phase 1 produce a tightened list after first draft of cross-org-boundary cheat sheet is written).

---

### D-A10: Phase Build Order (Dependency DAG)

**Critical dependency rules** (must be respected by phase sequencing):
1. **Locations exist** in Apple Business before **custom roles** can be assigned (role assignment is per-Location)
2. **Custom roles exist** before **delegation runbooks** can describe per-role workflows
3. **Glossary terms exist** before **admin guides** can reference them via see-also
4. **Admin guides exist** before **L1/L2 runbooks** can cross-link to them (PITFALL-6 — L1 #34 must resolve `cross-platform/apple-business/12-...md` anchor on commit, or C16 fails)
5. **Capability matrix rows exist** before **hub navigation** lists them (D-13 sibling-anchor-pin contract — anchors must be stable before they're linked)
6. **Audit harness scaffold exists** before content phases land — but C14/C15/C16 are blocking from start (no informational-first promotion ladder), so harness scaffold must include C14/C15/C16 functional from Phase 1
7. **Navigation files land LAST** — `docs/index.md` Operations H2 sub-section + `docs/common-issues.md` + `docs/quick-ref-l1.md` + `docs/quick-ref-l2.md` are all append-only edits done at the final integration phase, AFTER all downstream content is committed (v1.5 navigation-files-last precedent from Phase 57 + Phase 59)

**Recommended phase sequence:**

```
Phase 62 — Foundation
  ├── _glossary-apple-business.md (NEW)
  ├── _glossary-macos.md reciprocal see-also (+1 line in header banner)
  ├── _glossary.md, _glossary-android.md, _glossary-linux.md reciprocal see-also (+1 line each)
  ├── 00-overview.md (Apple Business tree) — canonical rebrand callout site #1
  ├── 01-role-privilege-model.md — defines roles + privileges before anything references them
  ├── 02-locations-architecture.md — defines Locations before role-assignment guides
  ├── Audit harness v1.6 Path-A copy + C14/C15/C16 scaffold (blocking from start)
  └── intro callouts at admin-setup-macos/01 + admin-setup-ios/02 (canonical sites #2 + #3)

Phase 63 — Multi-Org Architecture + Custom Roles
  ├── 03-locations-vs-custom-roles.md (decision matrix)
  ├── 04-custom-role-authoring.md (depends on Locations from 02)
  ├── 05-sub-org-admin-onboarding.md (depends on custom roles from 04; contains "which admin owns this pool" anchor required by C16)
  ├── 06-mdm-server-assignment.md
  ├── 07-content-token-consolidation.md
  └── 08-managed-apple-account.md

Phase 64 — Apple TV + Shared iPad + Delegation Runbooks
  ├── 09-shared-ipad-lifecycle.md
  ├── 10-apple-tv-lifecycle.md
  ├── 11-vpp-catalog-runbook.md
  ├── 12-shared-ipad-passcode-reset.md (CANONICAL admin-doc — must exist before L1 #34 lands)
  ├── 13-device-release-runbook.md
  ├── 14-device-transfer-runbook.md
  ├── 15-audit-log-scoping.md
  ├── 16-cross-org-boundary-cheat-sheet.md (contains C15 anti-pattern allowlist exemptions)
  └── ios-capability-matrix.md row additions (3 new rows under existing Enrollment H2 — D-A3)

Phase 65 — L1 + L2 + Common Issues + Hub Integration (NAVIGATION FILES LAST)
  ├── l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md (depends on 12-shared-ipad-passcode-reset.md + 05-sub-org-admin-onboarding.md#which-admin-owns-this-pool; C16 gate)
  ├── l1-runbooks/00-index.md append (Apple Business H2 section)
  ├── l2-runbooks/26-apple-business-permission-denied.md
  ├── l2-runbooks/00-index.md append (Apple Business H2 section)
  ├── docs/common-issues.md append (## Apple Business Governance Failure Scenarios H2)
  ├── docs/quick-ref-l1.md append (## Apple Business Quick Reference H2)
  ├── docs/quick-ref-l2.md append (## Apple Business Quick Reference H2)
  ├── docs/operations/00-index.md append (5th H2 sub-section)
  ├── docs/index.md mod (5th sub-section under ## Operations H2 + Cross-Platform References entries + platform-coverage banner appendix)
  └── Audit harness terminal re-audit from fresh worktree
```

**Why navigation files LAST:** v1.5 Phase 57 + Phase 59 established that navigation files (`docs/index.md` / `common-issues.md` / `quick-ref-*.md`) are modified at the END of the milestone, after all downstream content is committed. Reason: navigation edits link TO downstream content, and downstream content must exist at the time the navigation commit lands or C13 (broken-link automation) fires.

**Parallelization opportunity:** Phase 63 and Phase 64 are partially parallelizable IF Phase 63 lands the `05-sub-org-admin-onboarding.md#which-admin-owns-this-pool` anchor first (Phase 64's L1 #34 depends on it for C16 gate). Realistic wave structure: Wave A = Phase 62 sequential; Wave B = Phase 63 in parallel with the *first half* of Phase 64 (Apple TV + shared iPad lifecycle docs which don't depend on roles); Wave C = Phase 65 sequential (navigation-last).

**Inherits from:** v1.5 wave-based parallelism (Wave A Phases 51+53; Wave B Phases 54+55+56); v1.5 navigation-files-last precedent (Phase 57 + Phase 59); v1.4.1 atomic same-commit retrofit (multiple cross-link targets land in same commit to avoid C13 false fires).

**Confidence:** HIGH — sequence respects all dependencies and inherits proven parallelism patterns.

---

## Architectural Patterns

### Pattern 1: Cross-Platform Tree for Multi-Platform-Spanning Domains

**What:** When content spans 2+ platforms by a non-device-OS axis (governance, operations, identity), create a new `docs/cross-platform/{domain}/` subdirectory rather than duplicating into per-platform trees.

**When to use:**
- Content has the same architectural model across all targeted platforms (Apple Business delegation is identical for iOS, iPadOS, macOS, tvOS, shared iPad)
- Content would create maintenance burden if duplicated into per-platform trees (lockstep update problem)
- Content is conceptually about a SHARED surface (the Apple Business *portal* is one place, not two)

**Trade-offs:**
- (+) Single source of truth; no cross-tree drift
- (+) Cleaner mental model for readers ("I want to learn about Apple Business" → one location)
- (-) Adds a new top-level directory category; reader must learn the cross-platform/ convention

**Example: directory + cross-link convention:**
```
docs/cross-platform/apple-business/
├── 00-overview.md     (rebrand callout #1)
├── 01-role-privilege-model.md
└── ...

# Cross-links FROM new tree TO existing per-platform docs (read-only)
docs/cross-platform/apple-business/01-role-privilege-model.md:
  See also: [macOS ABM Configuration](../../admin-setup-macos/01-abm-configuration.md)

# Cross-links FROM existing per-platform docs TO new tree (only at 3 canonical Q5 b sites)
docs/admin-setup-macos/01-abm-configuration.md:1
  > **Naming update:** Apple Business Manager is now called Apple Business (rebrand 2026-04-14).
  > For delegated governance and Locations, see [Apple Business Governance](../cross-platform/apple-business/00-overview.md).
```

### Pattern 2: Compound-Platform Frontmatter for Cross-Platform Runbooks

**What:** When an L1/L2 runbook applies to multiple platforms via a shared abstraction (Apple Business), use a `+`-separated compound platform value in frontmatter.

**When to use:**
- Runbook is multi-platform by design (not a happen-to-overlap)
- Audit harness needs to recognize the runbook's platform scope (e.g., C10 Linux-frontmatter validator pattern)

**Trade-offs:**
- (+) Single runbook, no per-platform duplication
- (+) Discoverable by either platform's docs reader (common-issues.md routes both iOS + macOS symptoms to it)
- (-) Harness parsing must handle the `+` separator (new convention — needs explicit parser support)

**Example:**
```yaml
---
last_verified: 2026-05-20
review_by: 2026-07-19
applies_to: governance       # NEW value alongside existing all/both/ADE/enrollment
audience: L1
platform: ios+macos+shared-ipad
---
```

### Pattern 3: 3-Canonical-Site Rebrand Callout

**What:** When a vendor renames a critical product mid-corpus-lifetime (Apple Business Manager → Apple Business), do NOT corpus-sweep all ~30 references. Instead, place rebrand statements at 3 canonical sites where readers FIRST encounter the term: the new domain's overview, the existing platform's first ABM-related doc per platform.

**When to use:**
- Rebrand is non-functional (capability surface unchanged; only name changed)
- Existing references work correctly under either name (anchor stability preserved)
- Corpus-sweep cost exceeds the disambiguation value

**Trade-offs:**
- (+) Zero retroactive churn on existing v1.0-v1.5 docs
- (+) PITFALL-6 anchor-stability fully preserved
- (-) Readers searching for "Apple Business" via grep will find ~30 unchanged "Apple Business Manager" / "ABM" hits without rebrand context; the 3-callout strategy assumes readers enter via the canonical sites

**Inherits from:** v1.4 D-14 platform-frontmatter-defaults-to-Windows no-retroactive-sweep precedent (same logic: corpus-sweep cost > disambiguation value).

### Pattern 4: 5-State Verdict Lock for Comparison Cells (preserved)

**What:** Cells in the 5-platform comparison doc use exactly one of `Supported` / `Partial` / `Not supported` / `Mode-dependent` / `n/a`. v1.6 does NOT change this lock because Apple Business is not added to the matrix.

**Inheritance:** v1.5 D-09 verdict-vocabulary lock.

---

## Anti-Patterns

### Anti-Pattern 1: Treating Apple Business as a 6th Platform

**What people do:** Create `docs/admin-setup-apple-business/` parallel to the 5 existing per-platform directories; add `## Apple Business` as a 6th top-level H2 in `docs/index.md`; create a `_glossary-apple-business.md` AND move ABM/ADE/Supervision entries out of `_glossary-macos.md` into it.

**Why it's wrong:**
- Apple Business is NOT a target device platform — it's a delegation surface over iOS+macOS
- Adding a 6th platform forces 6th column in the 5-platform comparison matrix (240 cells → 288 cells, breaks C12)
- Moving ABM/ADE/Supervision out of `_glossary-macos.md` breaks ~30 existing inbound anchor links (PITFALL-6)
- Hub Choose-Your-Platform selector dilutes ("choose your platform" was about device OS)

**Do this instead:** Treat Apple Business as a 5th Operations sub-domain (D-A4) under `cross-platform/apple-business/` (D-A1), with its own NEW glossary that ADDS to (does not replace) the existing Apple-shared glossary.

### Anti-Pattern 2: Adding a 7th H2 to the 5-Platform Comparison Doc

**What people do:** Add `## Apple Business Delegation` as a 7th H2 to `docs/reference/4-platform-capability-comparison.md`, force 5 n/a cells per row (Windows / Android / Linux all n/a), and propagate the new H2 to all 4 sibling matrices per D-13/D-18 reciprocity contract.

**Why it's wrong:**
- Apple Business delegation is not a device-capability axis comparable to Enrollment/Configuration/etc.
- Triggers D-13/D-18 cascade across 4 files (each sibling matrix needs the new H2 + new rows)
- Breaks C12 240-cell math (becomes 7 H2 × 5 cols × N rows)
- Confuses two categorical layers (device capability vs delegation governance)

**Do this instead:** Add 3 rows to `ios-capability-matrix.md` under the existing Enrollment H2 (D-A3); leave the comparison doc and other sibling matrices unchanged.

### Anti-Pattern 3: Corpus-Sweeping All ABM References to "Apple Business"

**What people do:** Find/replace all 30+ "Apple Business Manager" / "ABM" references across the corpus, update anchors from `#abm` to `#apple-business`, update inbound links.

**Why it's wrong:**
- Violates Q5 (b) decision explicitly
- Breaks every existing inbound anchor link (PITFALL-6 anchor-stability cascade — ~30 references means ~30+ broken inbound links)
- Forces retroactive freshness-date refresh on ~30 files (60-day review cycle invariant)
- Multiplies milestone surface from "add new tree + 3 callouts + 2 runbooks" to "edit 30+ existing files"

**Do this instead:** 3-canonical-site callout pattern (Pattern 3 above). Existing references remain unchanged; readers who land on an existing doc see "ABM" without context (acceptable because the 3 canonical entry points provide context).

### Anti-Pattern 4: Allowing Intune-Delegation Language in Apple Business Docs

**What people do:** Write "delegate VPP role assignment in Intune" or "use Endpoint Manager scope groups for Apple Business permissions" or "Intune custom roles fulfill the Apple Business delegation requirement."

**Why it's wrong:**
- Hard scope boundary (Q-decision: Apple Business surface only; Intune RBAC out of scope)
- The two systems are SEPARATE delegation surfaces — conflating them undermines the milestone's central value (admins must learn Apple Business as its own system)
- C15 audit guard exists specifically to prevent this leak

**Do this instead:** Each delegation runbook carries an explicit scope-boundary callout at the top ("This action is owned by Apple Business — Intune cannot delegate this"). The `16-cross-org-boundary-cheat-sheet.md` is the canonical reference. C15 banned-phrase list enforces.

---

## Data Flow

### Reader Navigation Flow — Apple Business Governance Question

```
[Reader has Apple Business governance question]
    │
    ├── Entry via docs/index.md
    │     → ## Operations H2
    │       → ### Apple Business Delegated Governance (D-A4)
    │         → cross-platform/apple-business/00-overview.md
    │
    ├── Entry via grep / search "Locations"
    │     → docs/_glossary-apple-business.md#locations (D-A2)
    │       → cross-platform/apple-business/02-locations-architecture.md
    │
    ├── Entry via symptom in common-issues.md
    │     → ## Apple Business Governance Failure Scenarios
    │       → L1 #34 (l1-runbooks/34-...md) [if Service Desk]
    │       → L2 #26 (l2-runbooks/26-...md) [if Desktop Engineering]
    │       → cross-platform/apple-business/12-shared-ipad-passcode-reset.md [if Admin]
    │
    └── Entry via existing macOS/iOS ABM doc
          → docs/admin-setup-macos/01-abm-configuration.md:1 intro callout (D-A8 canonical site #2)
            → cross-platform/apple-business/00-overview.md
```

### Cross-Link Network — C16 Integrity Triangle

```
docs/common-issues.md
    │ (## Apple Business Governance Failure Scenarios H2)
    ↓ (symptom row link)
docs/l1-runbooks/34-apple-business-shared-ipad-passcode-reset.md
    │           │
    │           ↓ (admin-context link)
    │   docs/cross-platform/apple-business/12-shared-ipad-passcode-reset.md
    │           ↑ (reciprocal back-link to L1)
    │           │
    └───────────┘
    │
    ↓ (which-admin-owns-this-pool link)
docs/cross-platform/apple-business/05-sub-org-admin-onboarding.md#which-admin-owns-this-pool

C16 asserts: ALL 4 edges of this graph resolve to existing anchors at commit time.
```

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Single Apple Business account, no Locations | Single-default-Location pattern; sub-org admin onboarding becomes vestigial; custom-role authoring still applies |
| 1 Apple Business account + 2-10 Locations | Core v1.6 scope; the multi-org architecture guide documents this case |
| 1 Apple Business account + 10-100 Locations | Same architecture; the sub-org-admin onboarding workflow becomes higher-volume — recommend tooling layer (out of scope for v1.6) |
| Multiple separate Apple Business accounts (inter-tenant) | **OUT OF SCOPE per Q-decision.** v1.6 documents one Apple Business account only. |

---

## Integration Points

### External Services / References

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Apple Business portal | Read-only URL references in admin guides; no API integration | All admin actions documented as portal-click sequences (consistent with existing macOS/iOS admin docs) |
| Microsoft Intune | Read-only cross-link references to existing v1.0-v1.5 Intune docs | NO new Intune-side configuration in v1.6 (hard scope boundary) |
| Apple Business Connect / Essentials | Acknowledged in 00-overview.md as consolidated under Apple Business since 2026-04-14 | Not in scope for delegation governance content |

### Internal Doc Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `cross-platform/apple-business/` ↔ `admin-setup-macos/` | Cross-link FROM Apple Business tree to existing macOS docs; intro callout AT `admin-setup-macos/01-abm-configuration.md` (canonical site #2) | Read-only outbound + 1 surgical edit inbound |
| `cross-platform/apple-business/` ↔ `admin-setup-ios/` | Cross-link FROM Apple Business tree to existing iOS docs; intro callout AT `admin-setup-ios/02-abm-token.md` (canonical site #3) | Read-only outbound + 1 surgical edit inbound |
| `_glossary-apple-business.md` ↔ `_glossary-macos.md` | Reciprocal see-also entries; ABM entry in `_glossary-macos.md` gains 1 inline see-also line | Append-only |
| `cross-platform/apple-business/` ↔ `operations/` | Sibling Operations domain (5th sub-section) | No content cross-links beyond the hub-level index references |
| `l1-runbooks/34-...md` ↔ `cross-platform/apple-business/12-...md` | Bidirectional cross-link (C16 integrity triangle) | Both directions must resolve at commit time |

---

## Confidence Assessment

| Decision | Confidence | Reason |
|----------|------------|--------|
| D-A1 Directory placement (`cross-platform/apple-business/`) | HIGH | Direct inheritance from v1.5 `docs/operations/` pattern + v1.4 surgical-edit precedent |
| D-A2 Glossary architecture (split, new file) | HIGH | Direct inheritance from v1.4 `_glossary-android.md` + v1.5 `_glossary-linux.md` precedents |
| D-A3 Capability matrix strategy (3 rows in iOS matrix, no change to comparison) | HIGH | Explicitly preserves C12 240-cell invariant; D-13/D-18 reciprocity untouched |
| D-A4 Hub navigation (5th Operations sub-domain) | HIGH | Direct inheritance from v1.5 Operations H2 4-sub-section pattern |
| D-A5 L1 / L2 numbering (continue global) | HIGH for numbering, MEDIUM for compound-platform frontmatter | Numbering follows v1.5 precedent; compound frontmatter is new convention needing Phase 1 parser-test |
| D-A6 Quick-ref placement (new H2) | HIGH | Direct inheritance from v1.5 CLEAN-03 / CLEAN-04 |
| D-A7 Apple TV + shared iPad (in Apple Business tree) | HIGH | Governance-not-platform framing makes location obvious |
| D-A8 Cross-link contract (Q5 b 3 canonical sites only) | HIGH | Inherits v1.4 D-14 + v1.5 CLEAN-08 |
| D-A9 Audit harness C14/C15/C16 design | HIGH for C14 + C16, MEDIUM for C15 banned-phrase list | C15 needs Phase 1 content-pattern review to tighten regex list |
| D-A10 Phase build order | HIGH | Respects all dependencies; inherits v1.5 navigation-files-last + wave-based parallelism |
| Apple Business capability surface (Locations, roles, privileges) | MEDIUM | Verified rebrand timing from Apple Support docs (2026-04-14 GA); detailed privilege catalog not exhaustively researched here — Phase 62 Foundation phase must verify the complete privilege list via Apple Support |

---

## Sources

- `.planning/PROJECT.md` (D-decisions and milestone history)
- `.planning/MILESTONES.md` (v1.5 architectural patterns)
- `docs/index.md`, `docs/operations/00-index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`
- `docs/admin-setup-{macos,ios,android,linux}/00-overview.md` (4 platform overview patterns)
- `docs/reference/{macos,ios}-capability-matrix.md`, `docs/reference/4-platform-capability-comparison.md`
- `docs/_glossary-{macos,android,linux}.md` (3 platform glossary patterns)
- `docs/l1-runbooks/` directory listing (next available = 34)
- `docs/l2-runbooks/` directory listing (next available = 26)
- [Apple Business Manager is now Apple Business — Apple Support](https://support.apple.com/guide/apple-business-manager/apple-business-manager-is-now-apple-business-axmd79d79dea/web) — rebrand announcement
- [Intro to roles and privileges in Apple Business Manager — Apple Support](https://support.apple.com/guide/apple-business-manager/intro-to-roles-and-privileges-axm97dd59159/web) — built-in roles + privilege model
- [View and assign roles in Apple Business Manager — Apple Support](https://support.apple.com/en-gb/guide/apple-business-manager/axmb46d473c7/web) — Location-scoped role assignment
- [What are Role Privileges in Apple Business Manager? — HardSoft](https://www.hardsoftcomputers.co.uk/blog/apple-business-manager/understanding-role-privileges-in-apple-business-manager/) — third-party confirmation of People Manager / Device Enrollment Manager / Content Manager + custom roles
- [Apple Business Connect Is Now Apple Business — PinMeTo (2026-03-24)](https://www.pinmeto.com/blog/apple-business-connect-now-apple-business/) — rebrand announcement context
- [Apple Business: Everything you need to know — IT Pro](https://www.itpro.com/software/apple/apple-business-everything-you-need-to-know-about-the-all-new-enterprise-platform) — consolidation of ABM + Apple Business Essentials + Apple Business Connect under Apple Business

---

*Architecture research for: v1.6 Apple Business Delegated Governance & Multi-Org Operations integration into the existing 5-platform Intune docs corpus*
*Researched: 2026-05-20*
*Source confidence: HIGH for structural decisions inheriting from v1.2 / v1.4 / v1.4.1 / v1.5; MEDIUM for Apple Business privilege surface (Phase 62 Foundation must verify via Apple Support deep-dive)*
