---
phase: 32
plan: "01"
subsystem: documentation
tags: [glossary, ios, apple, nav-01, navigation-integration]
dependency_graph:
  requires:
    - docs/_glossary-macos.md (Phase 26 locked filename)
    - Phase 26 D-03 MAM-WE separation from MDM paths
    - Phase 32 D-11 through D-19 glossary extension decisions
  provides:
    - 5 new iOS glossary anchors: #supervision, #account-driven-user-enrollment, #apns, #jailbreak-detection, #mam-we
    - Updated VPP entry with iOS device-licensed vs user-licensed distinction
    - New ## App Protection (MAM) H2 section
  affects:
    - Plan 32-03 (placeholder retrofit) — needs these anchors for 07-ios-triage.md:99 rewrite
    - Plan 32-02 (capability matrix) — matrix rows cross-link to these anchors
    - Plan 32-04 (common-issues.md iOS section) — will link to #mam-we for MAM-WE advisory
tech-stack:
  added: []
  patterns:
    - "Apple glossary extension (additive, no rename per D-11)"
    - "Windows-equivalent blockquote per new term (D-15)"
    - "Cross-platform scope statement in opening sentence (D-16)"
key-files:
  created: []
  modified:
    - docs/_glossary-macos.md (73 → 116 lines; +50 lines, -6 lines)
decisions:
  - "Applied Phase 32 D-13 placement map exactly: 4 terms into existing H2s + 1 new H2 for MAM-WE"
  - "Preserved VPP's existing Windows-equivalent blockquote content while extending prose (D-18 soft constraint)"
  - "Alphabetical Index sorted strictly alphabetically: ABM → ABM Token → Account-Driven → ADE → APNs → Await → Jailbreak → MAM-WE → Setup → Supervision → VPP"
metrics:
  duration: "~10 minutes"
  completed: "2026-04-17"
  tasks: 3
  files_changed: 1
  lines_added: 50
  lines_removed: 6
---

# Phase 32 Plan 01: Apple Glossary iOS Term Extension Summary

**One-liner:** Extended `docs/_glossary-macos.md` with 5 net-new iOS terms (Supervision, Account-Driven User Enrollment, APNs, Jailbreak Detection, MAM-WE) and rewrote the VPP entry with iOS-specific device-licensed vs user-licensed semantics, satisfying NAV-01 / Phase 32 SC #1 literal scope without renaming the file (76 inbound references preserved).

## Execution Overview

Per Plan 32-01, the shared Apple provisioning glossary was extended with exactly the 6 terms enumerated in Phase 32 Success Criterion #1 (5 net-new + VPP update). No scope creep — DDM, ACME, Managed Apple ID, DEP, and Company Portal were explicitly deferred per D-19. File rename to `_glossary-apple.md` was NOT performed per D-11 LOCK (Phase 26 foundation decision, 76 cross-references across 29 files).

All 3 tasks executed in a single agent session with no checkpoints. File grew from 73 lines to 116 lines (within planned ~120-160 range; slightly under because the updated VPP entry reused existing Windows-equivalent blockquote content rather than doubling it).

## Task Breakdown

### Task 1: Frontmatter + Platform Coverage + Alphabetical Index

**Files touched:** `docs/_glossary-macos.md` (lines 1-16)

Applied three surgical edits:

1. **Frontmatter bump** (lines 2-3):
   - `last_verified: 2026-04-13` → `2026-04-17`
   - `review_by: 2026-07-12` → `2026-07-16` (+90d)

2. **Platform coverage blockquote** (line 9) — applied D-41 canonical phrasing:
   - Old: "This glossary covers macOS-specific provisioning and management terminology."
   - New: "This glossary covers Apple-platform provisioning and management terminology for macOS and iOS/iPadOS."

3. **Alphabetical Index expansion** (line 16) — grew from 6 to 11 entries in strict alphabetical order:
   ```
   [ABM] | [ABM Token] | [Account-Driven User Enrollment] | [ADE] | [APNs] | [Await Configuration] | [Jailbreak Detection] | [MAM-WE] | [Setup Assistant] | [Supervision] | [VPP]
   ```

   Alphabetical ordering confirmed correct: "Account-Driven..." (A-c-c) < "ADE" (A-D) < "APNs" (A-P); "Jailbreak" (J) < "MAM-WE" (M) < "Setup" (S) < "Supervision" (Su) < "VPP" (V).

### Task 2: Four Net-New H3 Entries + VPP Rewrite

**Files touched:** `docs/_glossary-macos.md` (Enrollment H2, Device Management H2, App Distribution H2)

**Enrollment H2 (after Task 2)**:
1. Account-Driven User Enrollment (NEW — inserted before ADE per alphabetical order)
2. ADE (existing — untouched)
3. Await Configuration (existing — untouched)
4. Setup Assistant (existing — untouched)
5. Supervision (NEW — inserted after Setup Assistant per alphabetical order)

**Device Management H2 (after Task 2)**:
1. ABM (existing — untouched)
2. ABM Token (existing — untouched)
3. APNs (NEW)
4. Jailbreak Detection (NEW)

**App Distribution H2 (after Task 2)**:
- VPP entry fully rewritten with iOS-specific content:
  - Cross-platform scope statement (D-16): "Applies to all Apple platforms (iOS, iPadOS, macOS, tvOS)"
  - Device-licensed vs user-licensed bullet list distinction
  - Explicit supervised-only silent install gate statement: "Silent app installation on iOS/iPadOS requires BOTH (a) VPP device-licensed assignment AND (b) device supervision via ADE"
  - macOS contrast: "On macOS, VPP installs silently regardless of supervision state"
  - Cross-links block: `[iOS App Deployment Guide](admin-setup-ios/05-app-deployment.md) | [macOS App Deployment Guide](admin-setup-macos/04-app-deployment.md)`
  - Windows-equivalent blockquote preserved (with minor extension to mention per-user vs per-device Windows assignment parallel)

### Task 3: New App Protection (MAM) H2 + Version History

**Files touched:** `docs/_glossary-macos.md` (new H2 between App Distribution and Version History, plus Version History table)

**New `## App Protection (MAM)` H2 placement:** Correctly placed AFTER `## App Distribution` and BEFORE `## Version History` per Phase 26 D-03 separation of MAM-WE from MDM enrollment paths. MAM-WE was NOT placed under Enrollment H2 (Pitfall 6 avoided).

**MAM-WE entry content highlights:**
- Cross-platform scope statement (D-16): "Intune's **app-layer** data protection model for iOS/iPadOS"
- Explicit non-MDM boundary: "the device is NOT supervised, NOT registered in Intune Devices blade, and NOT visible to IT as a managed device"
- Selective wipe scope: "removes managed app data only, preserves personal data and the device"
- Scope boundary callout references Phase 26 explicitly
- Cross-link to `admin-setup-ios/09-mam-app-protection.md` for configuration guide

**Version History:** New row added above the 2026-04-13 initial-version row (preserving existing row per D-18):
```
| 2026-04-17 | Phase 32: added iOS/iPadOS terms (supervision, MAM-WE, APNs, account-driven user enrollment, jailbreak detection), updated VPP with iOS device-licensed vs user-licensed distinction, new ## App Protection (MAM) H2 | -- |
```

## Verification Results

### Plan 32-01 Acceptance Criteria Grep Checks

| Check | Expected | Actual | Status |
|---|---|---|---|
| `^### (Supervision\|Account-Driven User Enrollment\|APNs\|Jailbreak Detection\|MAM-WE)` | 5 | 5 | PASS |
| `^## App Protection (MAM)` | 1 | 1 | PASS |
| Alphabetical Index anchor-link count (line 16) | ≥11 | 11 | PASS |
| `> **Windows equivalent:**` blockquote count | ≥11 (was 6) | 11 | PASS |
| `last_verified: 2026-04-17` | present | present | PASS |
| `review_by: 2026-07-16` | present | present | PASS |
| "and iOS/iPadOS" in platform coverage | ≥1 | 2 (also in VH row) | PASS |
| "Device-licensed" in VPP entry | ≥1 | 1 | PASS |
| `admin-setup-ios/05-app-deployment.md` cross-link | ≥1 | 1 | PASS |
| `2026-04-17 \| Phase 32:` in Version History | 1 | 1 | PASS |
| `selective wipe` in MAM-WE entry (case-insensitive) | ≥1 | 2 | PASS |

### Validation Scripts

| Script | Pre-edit Exit | Post-edit Exit | Status |
|---|---|---|---|
| `validation/link-check.sh docs/_glossary-macos.md` | 0 | 0 | PASS |
| `validation/anchor-collision.sh docs/_glossary-macos.md` | 0 | 0 | PASS |

### Regression Checks

- **6 pre-existing H3 anchors preserved** (ABM, ABM Token, ADE, Await Configuration, Setup Assistant, VPP H3 heading text unchanged → anchor slugs unchanged)
- **9 files elsewhere in `docs/` reference pre-existing `_glossary-macos.md#` anchors** — all anchor targets still present; no inbound links broken
- **`## App Distribution` H2 preserved** — VPP still reachable at `#vpp` anchor
- **Version History table structure preserved** — existing 2026-04-13 row unchanged

### Success Criteria (from PLAN)

| Criterion | Status |
|---|---|
| Glossary contains definitions for: supervision, MAM-WE, APNs, account-driven user enrollment, VPP (updated), jailbreak detection | PASS (6 terms total — 5 new + 1 updated) |
| MAM-WE under NEW `## App Protection (MAM)` H2, NOT under Enrollment | PASS (Phase 26 D-03 compliance) |
| Alphabetical Index contains 11 entries in alphabetical order | PASS |
| Every new H3 ends with `> **Windows equivalent:**` blockquote (D-15) | PASS (all 5 new + updated VPP) |
| VPP distinguishes device-licensed vs user-licensed with supervised-only callout | PASS |
| File name unchanged (`_glossary-macos.md` per D-11) | PASS |
| No pre-existing anchors broken | PASS |

## Deviations from Plan

**None — plan executed exactly as written.**

The executor-context prompt referenced a `> **Windows equivalent:** increase by at least 5` check. Actual increase was 5 (5 new H3s each with their own blockquote) — VPP's existing blockquote was preserved (not duplicated), so total went from 6 → 11 matching the +5 delta expected by the plan's verify step.

Minor prose-level choice (within D-15/D-16 template latitude): Used "pre-provisioning" (not "pre-provisioned") in the Supervision entry's Windows-equivalent blockquote to match Microsoft's canonical product-name spelling. No deviation from D-15 template structure.

## Threat Surface Scan

No new threat surfaces introduced. This is a pure-documentation plan — no code, no network endpoints, no auth paths, no schema changes.

Per plan `<threat_model>`:
- **T-32-03 (Information Disclosure / supervision silent-install claims):** Mitigated — VPP entry explicitly states "silent install requires BOTH (a) device-licensed AND (b) supervision via ADE"; Supervision entry explicitly states "set at enrollment time, CANNOT be added retroactively without a full device erase". No sweeping "supervised = silent install" generalizations present. The macOS contrast sentence ("On macOS, VPP installs silently regardless of supervision state") prevents readers from over-generalizing the iOS-only gate.
- **T-32-04 (Information Disclosure / ABM Token + APNs certificate descriptions):** Mitigated — APNs entry describes certificate lifecycle abstractly with no example tokens, no example Apple IDs, no real tenant IDs. Placeholder-style `[organization]` used in the Supervision verification example. ABM Token entry (pre-existing, not modified) already describes token shape as `.p7m file` only.

## Known Stubs

None. All 5 new H3 entries contain substantive prose with cross-links, Windows-equivalent blockquotes, and configuration/verification details. No placeholder text, no "TODO", no "coming soon", no empty sections.

## Self-Check: PASSED

- File exists: `docs/_glossary-macos.md` — FOUND (116 lines)
- Summary exists: `.planning/phases/32-navigation-integration-references/32-01-SUMMARY.md` — FOUND (this file)
- All 5 new H3 entries present and grep-verified
- Validation scripts both exit 0
- Commit hash: populated post-commit in the commit step below
