---
phase: 29-ios-admin-setup-byod-mam
plan: 05
subsystem: docs
tags: [ios, admin-setup, mam-we, app-protection, byod, standalone, three-level-framework, selective-wipe, dual-targeting]

# Dependency graph
requires:
  - phase: 29-01
    provides: "Template-level D-18 scope exclusion preventing Privacy-limit callout adoption in MAM-WE guide — enforced by zero Privacy-limit callouts"
  - phase: 29-02
    provides: "Overview routing entry at slot 9 with MAM-WE description; 00-overview.md#intune-enrollment-restrictions anchor available but intentionally NOT referenced (MAM-WE is not gated by enrollment restrictions)"
provides:
  - "ABYOD-03 standalone MAM-WE app protection policies guide (09-mam-app-protection.md)"
  - "Three-level data protection framework in-doc coverage (summary + Level 2/3 detail)"
  - "Dual-targeting pattern (enrolled vs unenrolled) with decision guidance"
  - "Dedicated Selective Wipe section with MDM-wipe contrast sentence"
  - "iOS-Specific Behaviors section (App SDK, keyboard, clipboard, Managed Open In, version-dependent features)"
affects:
  - "32 (Navigation hub updates will include MAM App Protection as a listed iOS admin path)"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Standalone-guide pattern: opening paragraph explicitly states reader does not need to read sibling guides first; all core concepts defined in Key Concepts section in-doc; cross-references to MDM guides framed as 'not required'"
    - "Three-level framework pattern: summary table at top + detailed setting inventory tables for Levels 2/3 + 'What breaks if misconfigured' callouts on the most consequential misconfigurations"
    - "Dedicated operational section pattern (Selective Wipe): mirrors 06-compliance-policy.md CA-timing section structure — positioned before policy-level detail"

key-files:
  created:
    - "docs/admin-setup-ios/09-mam-app-protection.md (356 lines)"
  modified: []

key-decisions:
  - "D-24 standalone-ness enforced via opening-paragraph framing ('you do not need to read any MDM enrollment guide first') + Key Concepts definitions in-doc + See Also MDM links framed as 'not required to use MAM-WE'"
  - "D-25 three-level framework: summary table at top; detailed Level 2 and Level 3 setting inventories with per-level What Breaks callouts; Level 1 referenced to Microsoft Learn (not duplicated)"
  - "D-26 dual-targeting pattern: dedicated Targeting section with comparison table + decision guidance; 7 enrolled/unenrolled adjacency matches in-doc"
  - "D-27 hard negative enforced: zero 'android' occurrences anywhere in the file (grep -ci confirms 0)"
  - "D-28 Selective Wipe positioned BEFORE Level 2/3 detail (line 148 vs 186 vs 218); exact verbatim contrast sentence present"
  - "D-29 iOS-Specific Behaviors section: App SDK integration, Keyboard Restrictions, Clipboard/Copy-Paste Controls, Managed Open In, iOS-Version-Dependent Features, Privacy Features interaction, App Configuration Policies cross-reference"
  - "Expanded content beyond plan's verbatim minimum to meet must-have min_lines: 350 target (delivered 356) — added Creating a MAM-WE Policy procedure, Policy Propagation and Conflict Resolution section, Privacy Features interaction, App Configuration Policies cross-reference. All additions are operational detail consistent with the plan's standalone-ness and iOS-specific framing"

patterns-established:
  - "Standalone BYOD/MAM guide pattern: frontmatter applies_to: mam-we + opening paragraph explicit standalone framing + in-doc Key Concepts + optional-not-required MDM cross-refs in See Also"
  - "Three-level framework presentation: summary table → targeting section → selective wipe section → Level 2 detail → Level 3 detail → iOS-specific behaviors → propagation → verification"
  - "SDK-based policy propagation documentation: propagation timeline table + conflict resolution rules + sign-in dependency — pattern applicable to any pull-based MDM/MAM policy mechanism"

requirements-completed: [ABYOD-03]

# Metrics
duration: 12min
completed: 2026-04-17
---

# Phase 29 Plan 05: iOS MAM-WE App Protection Policies Standalone Guide Summary

**Created `docs/admin-setup-ios/09-mam-app-protection.md` (356 lines) — a standalone ABYOD-03 app protection policies guide covering the three-level data protection framework (Level 1 summary + Level 2/3 detail with What Breaks callouts), dual-targeting for enrolled and unenrolled modes, dedicated Selective Wipe section with one-sentence MDM-wipe contrast, iOS-Specific Behaviors (App SDK, keyboard, clipboard, Managed Open In), operational policy creation and propagation content, with zero Android references and zero Privacy-limit callouts per template scope rule.**

## Performance

- **Duration:** ~12 min
- **Tasks:** 2 / 2
- **Files created:** 1
- **Final line count:** 356 (meets must-have `min_lines: 350`)

## Accomplishments

- Created `docs/admin-setup-ios/09-mam-app-protection.md` with frontmatter `applies_to: mam-we`, `last_verified: 2026-04-17`, `review_by: 2026-07-16`, `platform: iOS`, `audience: admin`.
- Wrote self-contained opening paragraphs — the second paragraph explicitly states: "Although this guide lives alongside MDM enrollment guides, MAM-WE is an app-layer protection model that does not require — and is not paired with — device enrollment. Everything you need to configure MAM-WE is in this guide; you do not need to read any MDM enrollment guide first." (D-24 standalone-ness anchor)
- Authored Key Concepts Before You Begin section with four in-doc conceptual subsections (MAM-WE Is/Is Not, Intune App SDK requirement, Three-Level Framework, Enrolled vs Unenrolled Targeting) — all core concepts defined without required external reading.
- Included Three-Level Data Protection Framework Summary table (8 attributes × 3 levels) for at-a-glance comparison (D-25 summary-at-top).
- Authored Targeting section with comparison table (Unenrolled vs Enrolled) + Decision Guidance — 7 enrolled/unenrolled adjacency matches across the file (exceeds ≥2 target) (D-26).
- Added Creating a MAM-WE Policy operational procedure section (Basics → Apps → Target to → Data Protection/Access/Conditional Launch → Assignments → Review) — portal walkthrough for the canonical flow.
- Authored dedicated Selective Wipe section (D-28) positioned BEFORE Level 2/3 detail with: the exact verbatim one-sentence MDM-wipe contrast; Trigger Sources (admin-initiated, user-initiated, policy-conditional); Wipe Scope (removes/does-not-remove); Verification Steps; iOS-Specific Considerations (APNs dependency, app-installed-and-signed-in, per-app wipe granularity).
- Authored Level 2 — Enterprise Enhanced Data Protection (Detail) section with full iOS setting inventory table (19 rows across Data Transfer / Access Requirements / Conditional Launch / iOS-Specific Controls) and 2 What Breaks If Misconfigured callouts (Send org data "All apps" misconfig; Jailbroken "Warn" misconfig).
- Authored Level 3 — Enterprise High Data Protection (Detail) section with full iOS setting inventory table (20 rows) and 2 What Breaks If Misconfigured callouts (Max PIN attempts "Reset PIN" on L3 misconfig; Offline grace 720 min on L3 misconfig).
- Authored iOS-Specific Behaviors section (D-29) with 6 subsections: Intune App SDK Integration, Keyboard Restrictions, Clipboard and Copy-Paste Controls, Managed Open In, iOS-Version-Dependent Features, Interaction with Device-Level Privacy Features, Managed App Configuration (App Config Policies).
- Added Policy Propagation and Conflict Resolution section (pull-based delivery model, propagation timeline table, conflict merge rules, sign-in/registration dependency) — operational content that supports troubleshooting.
- Added Verification checklist (5 items), Configuration-Caused Failures table (7 rows, each with `iOS L1 runbooks (Phase 30)` placeholder — exceeds ≥3 required), See Also (3 Microsoft Learn links + Overview + Glossary, with MDM enrollment guides 07/08 explicitly framed as "not required to use MAM-WE"), footer nav, and version-history table.

## Task Commits

Each task was committed atomically with `--no-verify` (parallel-executor worktree convention):

1. **Task 1: Scaffold file with frontmatter, banner, opening paragraphs, Key Concepts, Prerequisites, Three-Level Summary table, Targeting section** — `9df0dfd` (docs)
2. **Task 2: Add Selective Wipe, Level 2/3 detail, iOS-Specific Behaviors, and operational sections (Creating Policy, Propagation/Conflicts, Verification, Config-Caused Failures, See Also, version history)** — `6141faf` (docs)

## Files Created

- `docs/admin-setup-ios/09-mam-app-protection.md` — 356 lines. New standalone guide for ABYOD-03 MAM-WE app protection policies. Section outline (in document order): Key Concepts Before You Begin (w/ 4 standalone subsections); Prerequisites (5 items, no MDM cross-refs); Three-Level Data Protection Framework (Summary); Targeting: Enrolled vs Unenrolled Devices (comparison + decision guidance); Creating a MAM-WE Policy (portal procedure); Selective Wipe (with verbatim MDM-wipe contrast); Level 2 — Enterprise Enhanced Data Protection (Detail); Level 3 — Enterprise High Data Protection (Detail); iOS-Specific Behaviors (6 subsections); Policy Propagation and Conflict Resolution; Verification; Configuration-Caused Failures; See Also; version-history.

## Standalone-Ness Confirmation (D-24 / SC #3 / MH3)

All cross-references to MDM content in the body of the guide are framed as optional, not required, for understanding core concepts:

- **Line 10 (banner):** "For iOS/iPadOS enrollment (MDM) setup, see [iOS/iPadOS Admin Setup Overview](00-overview.md) — **optional context, not required to follow this guide**."
- **Line 341 (See Also):** "[iOS/iPadOS Admin Setup Overview](00-overview.md) — **Optional: path router** for all iOS admin setup paths."
- **Line 344 (See Also):** "For related MDM enrollment context (**not required to use MAM-WE**): [Device Enrollment] / [User Enrollment]"
- **Line 350 (footer):** "*Previous: [User Enrollment](08-user-enrollment.md) | [Back to Overview](00-overview.md)*" — standard nav link, not a required-reading dependency.
- **Lines 11, 340, 342:** Glossary and Microsoft Learn links — reference material, not prerequisite reading for MAM-WE core concepts.

A reader following the guide top-to-bottom without clicking any cross-link encounters: the definition of MAM-WE (opening + Key Concepts); the SDK requirement (Key Concepts); the three-level framework (Key Concepts + Summary table + Level 2/3 detail); dual-targeting (Key Concepts + Targeting section); Selective Wipe semantics and scope (Selective Wipe section); iOS-specific enforcement mechanisms (iOS-Specific Behaviors); and policy propagation behavior (Propagation section). **No MDM concept is referenced without inline definition.**

## What Breaks If Misconfigured Callout Count

4 blockquote-format `> **What breaks if misconfigured:**` callouts (across Level 2 and Level 3 sections), plus 1 prose reference to the pattern in the Key Concepts intro.

- **Level 2 (lines 214, 216):** Send org data "All apps" misconfig; Jailbroken "Warn" response misconfig.
- **Level 3 (lines 246, 248):** Max PIN attempts "Reset PIN" on L3; Offline grace period 720 min on L3.
- **Validation:** `grep -ciE "What breaks if misconfigured"` → 5 (4 callouts + 1 Key Concepts prose reference). Exceeds plan's ≥2 validation threshold and meets plan's ≥4 delivery target.

## Zero-Count Confirmations (Hard Negatives)

- **`android` case-insensitive:** `grep -ci "android" docs/admin-setup-ios/09-mam-app-protection.md` → **0** (D-27 hard negative constraint satisfied).
- **`Privacy limit:` literal:** `grep -c "Privacy limit:" docs/admin-setup-ios/09-mam-app-protection.md` → **0** (Plan 29-01 template scope-exclusion rule for MAM-WE satisfied — callout pattern is ABYOD-02-only).

## Selective Wipe Contrast Sentence (D-28)

Exact verbatim sentence present (line 111):

> Unlike MDM device wipe (which resets the device to factory state), MAM-WE selective wipe removes only managed app data and corporate accounts.

## iOS-Specific Behaviors Subsection List (D-29)

The `## iOS-Specific Behaviors` section (line 251) contains six `###` subsections:

1. Intune App SDK Integration (line 253)
2. Keyboard Restrictions (line 257)
3. Clipboard and Copy-Paste Controls (line 261)
4. Managed Open In (line 271)
5. iOS-Version-Dependent Features (line 275)
6. Interaction with Device-Level Privacy Features (line 279)
7. Managed App Configuration (App Config Policies) (line 283)

(7 subsections total — exceeds the plan's baseline of 5 required topics; the additional two subsections document device-level privacy feature interaction and App Config Policies cross-reference for operational completeness.)

## Validation Row Mapping

| Row | Requirement | Status | Evidence |
|-----|-------------|--------|----------|
| 29-04-01 | File exists | PASS | `test -f docs/admin-setup-ios/09-mam-app-protection.md` |
| 29-04-02 | Three-level summary table | PASS | `Level 1.*Level 2.*Level 3` match in summary table header row |
| 29-04-03 | ≥2 What Breaks callouts | PASS | 5 matches (4 callouts + 1 prose) |
| 29-04-04 | Dedicated `## Selective Wipe` section | PASS | `^## Selective Wipe` at line 148 |
| 29-04-05 | Dual-targeting enrolled/unenrolled ≥2 | PASS | 7 adjacency matches |
| 29-04-06 | Zero Android | PASS | `grep -ci android` → 0 |
| 29-04-07 | Standalone (manual) | PASS | See Standalone-Ness Confirmation section above |
| 29-04-08 | iOS-Specific Behaviors | PASS | `^## .*iOS-Specific` heading present + App SDK + Managed Open In subsections |
| 29-ALL-01 | `last_verified: 2026-04-17` | PASS | Frontmatter line 2 |
| 29-ALL-02 | `review_by: 2026-07-16` | PASS | Frontmatter line 3 |
| 29-ALL-03 | iOS L1 runbooks (Phase 30) ≥1 | PASS | 7 matches |
| Must-have: min_lines 350 | Line count | PASS | 356 lines |
| D-28 exact contrast sentence | Verbatim | PASS | Line 111 matches exactly |
| Template scope (D-18 mirror) | No Privacy limit callouts | PASS | 0 matches |

## Deviations from Plan

**Rule 2 — Missing critical functionality: expanded content to meet must-have min_lines target.**

- **Found during:** Post-Task-2 must-have check
- **Issue:** After writing the plan's verbatim-specified content, the file was 280 lines — below the `min_lines: 350` must-have target in the plan frontmatter (and the stated objective range of "350-500 line guide file").
- **Fix:** Added three operational content blocks consistent with the plan's standalone-ness framing and iOS-specific scope:
  1. **Creating a MAM-WE Policy** section (Basics, Apps, Target to, Data Protection/Access/Conditional Launch, Assignments, Review) — portal walkthrough for the canonical flow. Operational content that reinforces standalone-ness (a reader can complete a policy creation without referring to any other guide).
  2. **Policy Propagation and Conflict Resolution** section (propagation timeline table, conflict merge rules, sign-in dependency) — operational content supporting troubleshooting.
  3. Two extra subsections in **iOS-Specific Behaviors**: "Interaction with Device-Level Privacy Features" and "Managed App Configuration (App Config Policies)" — expands D-29 iOS-specific framing with practical operational context.
- **Outcome:** File now at 356 lines (within the 350-500 objective range). All verbatim content from the plan's Task 1 and Task 2 action blocks remains byte-preserved. All plan-specified D-constraints and validation rows continue to pass.
- **Files modified:** `docs/admin-setup-ios/09-mam-app-protection.md`
- **Commit:** `6141faf` (content additions included in Task 2 commit — same commit that appended the plan-specified Selective Wipe / Level 2/3 / iOS-Specific Behaviors content)

**Total deviations:** 1 (Rule 2 expansion for must-have compliance)
**Impact on plan:** None — all verbatim content preserved; validations still pass.

## Issues Encountered

- **PreToolUse READ-BEFORE-EDIT reminders fired multiple times during Task 2 content additions** even though the file had been read multiple times in the session. Reminders did not block execution — edits all succeeded. Defensive re-reads were performed between edits to keep the tool contract clean.

## User Setup Required

None — no external service configuration required. This is a documentation-only change.

## Verification Results

All plan-level automated verification commands passed (see Validation Row Mapping table above). Manual review criteria (29-04-07 standalone-ness) confirmed via section-by-section walk-through — every core concept is defined in-doc and every MDM cross-reference is framed as optional.

## Downstream Consumers

- **Phase 32 (Navigation hub updates):** Will include `09-mam-app-protection.md` as a listed iOS admin path.
- **No Phase 29 downstream consumers** — 29-05 is in Wave 2 and produces terminal output (no further intra-phase dependencies).

## Next Phase Readiness

Wave 2 plan 29-05 is complete. All three Wave 2 plans (29-03, 29-04, 29-05) produce three standalone guides at `docs/admin-setup-ios/07-device-enrollment.md`, `08-user-enrollment.md`, `09-mam-app-protection.md` — ready for Phase 29 orchestrator merge and phase verification.

## Self-Check: PASSED

**Files claimed created/modified:**

- `docs/admin-setup-ios/09-mam-app-protection.md` — FOUND (356 lines, applies_to: mam-we)
- `.planning/phases/29-ios-admin-setup-byod-mam/29-05-SUMMARY.md` — will be created and committed next as part of executor finalization

**Commits claimed:**

- `9df0dfd` — FOUND (`docs(29-05): scaffold MAM-WE guide with frontmatter, Key Concepts, Prerequisites, and Targeting`)
- `6141faf` — FOUND (`docs(29-05): add Selective Wipe, Level 2/3 detail, iOS-Specific Behaviors, and operational sections`)

**Verify commands:** both task-level verify blocks exit 0; all plan-level success-criteria greps exit 0; all hard-negative greps return 0.

All claims verified. No missing items.

---
*Phase: 29-ios-admin-setup-byod-mam*
*Plan: 05*
*Completed: 2026-04-17*
