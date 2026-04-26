---
phase: 41-android-l2-investigation
plan: "02"
subsystem: docs/l2-runbooks
tags: [android, l2-runbook, log-collection, adb, amapi, byod, cobo, dedicated, zte]
dependency_graph:
  requires: [41-01]
  provides: [docs/l2-runbooks/18-android-log-collection.md, "#section-1-company-portal-logs", "#section-2-microsoft-intune-app-logs", "#section-3-adb-logcat", "#method-selection-by-enrollment-mode", "#tool-landscape", "#decision-matrix", "#common-artifacts-cross-reference"]
  affects: [docs/l2-runbooks/19-android-enrollment-investigation.md, docs/l2-runbooks/20-android-app-install-investigation.md, docs/l2-runbooks/21-android-compliance-investigation.md]
tech_stack:
  added: []
  patterns: [mode-first-tiered-log-collection, per-assertion-confidence-markers, platform-gate-banner-4-platform, decision-matrix-8-column]
key_files:
  created: [docs/l2-runbooks/18-android-log-collection.md]
  modified: []
decisions:
  - "D-01 mode-first tiering: Android deviates from iOS friction-ordered Tier 1/2/3 because Company Portal vs Microsoft Intune app primary tool depends on enrollment mode (BYOD pre/post-AMAPI vs COBO/Dedicated/ZTE)"
  - "D-04 USB-debug callout included in Section 3 with [MEDIUM, last_verified 2026-04-23] marker — device-owner policy may disable USB debugging, adb tier unreachable in that case"
  - "D-24 command set: exactly 3 families (logcat HIGH, dumpsys device_policy MEDIUM, pm list packages HIGH); excluded commands named in exclusion paragraph but not as runnable examples"
  - "D-02 tool-landscape preamble: no single Intune admin center per-device Download Diagnostics bundle for Android — LOCKED text from CONTEXT.md"
metrics:
  duration: "4m 1s"
  completed_date: "2026-04-23"
  tasks_completed: 2
  files_created: 1
  files_modified: 0
---

# Phase 41 Plan 02: Android Log Collection Runbook Summary

Android L2 log collection guide with mode-first tiering (BYOD pre/post-AMAPI / COBO / Dedicated / ZTE), D-02 tool-landscape preamble, 8-column decision matrix, 3 method sections, USB-debug device-owner-mode callout, and per-assertion adb confidence markers.

## Completed Tasks

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 41-02-01 | Author frontmatter + Context + Tool Landscape + Decision Matrix + Method Selection | 425ed87 | docs/l2-runbooks/18-android-log-collection.md (partial — committed with Task 2) |
| 41-02-02 | Author Sections 1/2/3 + USB-debug callout + Common Artifacts + Version History | 425ed87 | docs/l2-runbooks/18-android-log-collection.md (complete file — 204 lines) |

Note: Tasks 1 and 2 were authored end-to-end in a single write pass and committed atomically as one file. Both tasks are fully satisfied by commit 425ed87.

## Artifact Details

**File:** `docs/l2-runbooks/18-android-log-collection.md`
**Final line count:** 204 lines
**Target range:** 180-220 lines
**Character budget:** 17,194 bytes
**Status:** Within target range

## adb Command Families Audit (D-24)

### Included (exactly 3 families per D-24)

| Family | Heading marker | Confidence |
|--------|---------------|------------|
| `adb logcat -s DevicePolicyManager:* WorkProfileManager:* IntuneManagedAgent:*` | Section 3.1 | `[HIGH, last_verified 2026-04-23]` |
| `adb shell dumpsys device_policy` | Section 3.2 | `[MEDIUM, last_verified 2026-04-23]` |
| `adb shell pm list packages` | Section 3.3 | `[HIGH, last_verified 2026-04-23]` |

Per-tag filter examples within Section 3.1 carry `[MEDIUM, last_verified 2026-04-23]` (OEM ROM tag-visibility variance).

### Excluded (mentioned in exclusion paragraph, NOT as runnable examples)

- `adb bugreport` — PII-laden; Microsoft Support coordination outside L2 scope
- `adb shell am broadcast` — state-mutating; violates diagnostic/remediation boundary
- `adb shell pm grant-permissions` — state-mutating; bypasses device owner policy
- `adb shell getprop ro.build.*` — wildcard glob portability; deferred

Exclusion note appears at end of Section 3 per D-24 requirement.

## D-04 USB-Debug Callout Verification

The D-04 callout at Section 3 opening reads:

> **Device-owner-mode constraint:** On fully-managed (COBO), dedicated (COSU), and ZTE-enrolled devices, Android Enterprise device owner policy may disable USB debugging per [Phase 38 AEDED Android Enterprise device restrictions](../admin-setup-android/05-dedicated-devices.md) and equivalent Phase 36 COBO policy. If USB debugging is unavailable, adb logcat tier is unreachable — escalate to Microsoft Support for remote log retrieval via Company Portal or Microsoft Intune app upload path. [MEDIUM, last_verified 2026-04-23]

This matches the CONTEXT.md D-04 locked text (YYYY-MM-DD filled with 2026-04-23). Cross-reference path `../admin-setup-android/05-dedicated-devices.md` confirmed to exist.

## D-02 Tool-Landscape Preamble Verification

The D-02 preamble text:

> **Tool landscape:** There is **no single Intune admin center per-device Download Diagnostics bundle for Android** (contrast with Phase 31 iOS MDM diagnostic report and Phase 24 macOS IntuneMacODC). Android diagnostic data is fragmented across three methods — Company Portal logs, Microsoft Intune app logs, and adb logcat — each yielding different data scope on different trust boundaries. The decision matrix below selects the method by enrollment mode first, data-scope need second.

This matches CONTEXT.md D-02 locked text exactly.

## Section Anchor Names (for 41-03/04/05/06 cross-link verification)

| Anchor | Source heading |
|--------|---------------|
| `#context` | `## Context` |
| `#tool-landscape` | `## Tool Landscape` |
| `#decision-matrix` | `## Decision Matrix` |
| `#method-selection-by-enrollment-mode` | `## Method Selection by Enrollment Mode` |
| `#section-1-company-portal-logs` | `## Section 1: Company Portal Logs` |
| `#section-2-microsoft-intune-app-logs` | `## Section 2: Microsoft Intune App Logs` |
| `#section-3-adb-logcat` | `## Section 3: adb logcat` |
| `#common-artifacts-cross-reference` | `## Common Artifacts Cross-Reference` |
| `#related-resources` | `## Related Resources` |
| `#version-history` | `## Version History` |

## SafetyNet grep result

```
grep -i "safetynet" docs/l2-runbooks/18-android-log-collection.md
```

**Result:** 0 matches (exit code 1). AEAUDIT-04 pre-audit: PASS.

## Confidence Marker Summary

8 total `[HIGH|MEDIUM|LOW, last_verified YYYY-MM-DD]` occurrences in the file:

- 3 in Decision Matrix rows (HIGH/HIGH/MEDIUM per method)
- 1 in D-04 USB-debug callout (MEDIUM)
- 1 at Section 3.1 heading (HIGH)
- 1 in per-tag filter examples note (MEDIUM)
- 1 at Section 3.2 heading (MEDIUM)
- 1 at Section 3.3 heading (HIGH)

All use Phase 37 D-10/D-11 regex format `[LEVEL, last_verified YYYY-MM-DD]`.

## Deviations from Plan

None — plan executed exactly as written. Both tasks authored end-to-end in single write pass and committed atomically.

## Threat Flags

None. This plan creates a single documentation file in `docs/l2-runbooks/`. No network endpoints, auth paths, file access patterns, or schema changes introduced.

## Known Stubs

- `19-android-enrollment-investigation.md` — referenced but not yet created (Wave 1 plan 41-03)
- `20-android-app-install-investigation.md` — referenced but not yet created (Wave 1 plan 41-04)
- `21-android-compliance-investigation.md` — referenced but not yet created (Wave 1 plan 41-05)

These are intentional forward-references per the plan wave structure. Plans 41-03/04/05 will create these files.

## Self-Check: PASSED

- [x] `docs/l2-runbooks/18-android-log-collection.md` exists (204 lines)
- [x] Commit 425ed87 exists in git log
- [x] Zero SafetyNet tokens
- [x] 3 section H2 headings with exact D-05 text
- [x] D-02 tool-landscape preamble byte-match to CONTEXT.md
- [x] D-04 USB-debug callout with [MEDIUM, last_verified 2026-04-23]
- [x] D-22 source-confidence block at Section 3 opening
- [x] D-25 caveat once at Section 3 opening
- [x] D-24 exactly 3 adb command families
- [x] D-28 4-platform banner on line 9
- [x] D-29 frontmatter: 5 required fields all present
- [x] D-34 shared-file guard: zero diff against protected files
- [x] Line count 204 (target 180-220)
