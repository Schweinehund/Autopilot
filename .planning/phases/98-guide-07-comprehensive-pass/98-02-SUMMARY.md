---
phase: "98-guide-07-comprehensive-pass"
plan: "02"
subsystem: docs-macos-psso
tags: [troubleshooting, extension-identifier, diagnostic-tree, configuration-caused-failures]
dependency_graph:
  requires: [98-01]
  provides: [TS-01, TS-03]
  affects: [docs/admin-setup-macos/07-platform-sso-setup.md]
tech_stack:
  added: []
  patterns: [contrast-table-idiom, numbered-bisection-ladder, in-page-anchor-links]
key_files:
  modified:
    - docs/admin-setup-macos/07-platform-sso-setup.md
decisions:
  - "TS-01 table row Runbook cell uses in-page anchor #extension-identifier-typo--looping-setup-assistant-sign-in; em-dash in heading slug produces double-hyphen per GitHub slug algorithm"
  - "TS-01 deep-dive placed as ### (H3) under ## Configuration-Caused Failures per D-01; TS-03 placed as ## sibling (H2) between deep-dive and ## Optional and Advanced Platform SSO Settings per D-01/Pitfall-3"
  - "Symptom authored by observable signature (CP Installed + policy Succeeded + looping/permanent) not hard-quoted UI string; permanent-vs-transient contrast included per Open Question 1"
  - "Contrast table used to disambiguate com.microsoft.CompanyPortalMac.ssoextension (Extension Identifier field) from com.microsoft.CompanyPortalMac (CP app bundle ID)"
metrics:
  duration_seconds: 144
  completed_date: "2026-06-29"
  tasks_completed: 2
  tasks_total: 2
  files_modified: 1
---

# Phase 98 Plan 02: TS-01 Extension-Identifier-Typo Failure and TS-03 Diagnostic Tree Summary

**One-liner:** Extension-Identifier-typo failure documented as Configuration-Caused-Failure (table row + prose deep-dive with permanent-vs-transient contrast, correct value `com.microsoft.CompanyPortalMac.ssoextension`, A1+A2 applicability), and Setup-Assistant SSO-Extension Diagnostic Tree added as a numbered 5-rung bisection ladder in its own H2 sibling section.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | TS-01 — Extension-Identifier-typo table row + adjacent prose deep-dive | 5d2e080 | docs/admin-setup-macos/07-platform-sso-setup.md |
| 2 | TS-03 — Setup-Assistant SSO-Extension Diagnostic Tree numbered bisection ladder | 5d2e080 | docs/admin-setup-macos/07-platform-sso-setup.md |

Tasks 1 and 2 were committed together (single edit operation, naturally adjacent content in the same file location).

## What Was Built

### TS-01: Extension-Identifier-Typo Configuration-Caused Failure

Added a new schema-conformant row to the existing `## Configuration-Caused Failures` table (`Misconfiguration | Portal | Symptom | Runbook` schema):

- **Misconfiguration column:** Extension Identifier field contains a typo (Intune does not validate this free-text field — correct value: `com.microsoft.CompanyPortalMac.ssoextension`)
- **Portal column:** Intune
- **Symptom column:** Company Portal is Installed and the PSSO policy shows Succeeded, yet Setup Assistant sign-in loops persistently — "Try Again" never resolves it (permanent failure; contrast with transient CP-still-downloading case)
- **Runbook column:** In-page anchor link to the adjacent deep-dive

Immediately below the table, added `### Extension Identifier typo — looping Setup-Assistant sign-in` (H3 sub-heading, net-new, no inbound anchors). Deep-dive covers:

- **Symptom:** the observable signature (CP Installed + policy Succeeded + "Try Again" loops permanently); explicit contrast with the transient CP-still-downloading case (Microsoft Learn documented)
- **Root cause:** Extension Identifier is a free-text field; Intune does not validate at save time; a typo prevents macOS from locating the SSO extension bundle at runtime
- **Disambiguation contrast table:** `com.microsoft.CompanyPortalMac.ssoextension` (Extension Identifier field) vs `com.microsoft.CompanyPortalMac` (CP app bundle ID)
- **Fix:** locate the Extension Identifier field, set to exactly `com.microsoft.CompanyPortalMac.ssoextension`, save and sync
- **Affects:** explicitly states this affects both the A1 (standard post-enrollment) and A2 (ADE-during-Setup-Assistant) paths

### TS-03: Setup-Assistant SSO-Extension Diagnostic Tree

Added `## Setup-Assistant SSO-Extension Diagnostic Tree` as a new H2 sibling, positioned between the `## Configuration-Caused Failures` section (including the TS-01 deep-dive) and `## Optional and Advanced Platform SSO Settings`. The section is not nested under `## Configuration-Caused Failures` (per D-01/Pitfall-3).

Content is a numbered `1.` `2.` `3.` `4.` `5.` ordered list (not mermaid, not a decision table) in the locked D-02 sequence:

1. Check the Intune device record (device enrolled; PSSO policy shows Succeeded)
2. Check the Company Portal version (`5.2604.0` for A2, `5.2404.0` for A1 — "Installed ≠ correct version")
3. Check the Extension Identifier (exactly `com.microsoft.CompanyPortalMac.ssoextension`; cross-reference to TS-01 deep-dive)
4. Check the user license (active Intune license — standard requirement, commonly overlooked as A2 failure point)
5. A1 path bisect — nested sub-bullet branch: disable `Enable Registration During Setup`, re-test via A1 post-enrollment flow; if A1 succeeds, the blocking condition is A2-path-specific → check ADE Path Prerequisites

## Deviations from Plan

None — plan executed exactly as written. Tasks 1 and 2 were logically committed together (single contiguous edit to the same file; content is naturally adjacent and sequentially dependent).

## Known Stubs

None — no hardcoded empty values, placeholder text, or unwired data sources were introduced. All content is prose documentation with verified factual claims.

## Threat Surface Scan

No new network endpoints, auth paths, file access patterns, or schema changes were introduced. This is a documentation-only edit to one static markdown file. The two [ASSUMED] claims from TS-01 (Intune-does-not-validate; symptom described by observable signature rather than exact UI string) were handled per T-98-03 disposition: authored by observable signature with permanent-vs-transient contrast, not a hard-quoted UI string.

## Self-Check

**1. Files exist:**

- docs/admin-setup-macos/07-platform-sso-setup.md: FOUND (confirmed — 56 lines added)

**2. Commits exist:**

- 5d2e080: FOUND — `docs(98-02): TS-01 Extension-Identifier-typo failure + TS-03 diagnostic tree`

**3. Acceptance criteria satisfied:**

- `grep "com.microsoft.CompanyPortalMac.ssoextension"` — matches in failures table row, deep-dive prose, contrast table, fix step, AND diagnostic tree step: PASS
- `grep -iq "affects both"` — present in deep-dive Affects section: PASS
- `grep -iqE "extension identifier typo"` — present in H3 deep-dive heading: PASS
- `grep "## Configuration-Caused Failures"` — heading byte-identical: PASS
- `grep -qiE "^## .*(diagnostic|sso-extension)"` — new H2 heading found: PASS
- `grep "Enable Registration During Setup"` — present in TS-03 A1 bisect rung: PASS
- `grep "5.2604.0"` — present in TS-03 rung 2: PASS
- `! grep '```mermaid'` — zero mermaid fences: PASS
- `grep "## Optional and Advanced Platform SSO Settings"` — heading preserved byte-identical: PASS
- Git diff heading lines — only net-new headings added, no pre-existing heading modified: PASS

## Self-Check: PASSED
