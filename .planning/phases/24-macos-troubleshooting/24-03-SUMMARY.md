---
phase: 24-macos-troubleshooting
plan: "03"
subsystem: docs/decision-trees, docs/l1-runbooks, docs/l2-runbooks, docs/index.md, docs/admin-setup-macos
tags: [macos, ade, navigation, indexes, tbd-resolution, cross-reference]
dependency_graph:
  requires:
    - 24-01 (macOS L1 triage tree and runbooks -- wave 1)
    - 24-02 (macOS L2 runbooks -- wave 1)
  provides:
    - docs/decision-trees/00-initial-triage.md (macOS cross-reference banner)
    - docs/l1-runbooks/00-index.md (macOS ADE Runbooks section)
    - docs/l2-runbooks/00-index.md (macOS ADE Runbooks section with escalation mapping)
    - docs/index.md (resolved macOS TBD placeholders)
    - docs/admin-setup-macos/06-config-failures.md (resolved all 29 Runbook column links)
    - docs/admin-setup-macos/01-05 (resolved all inline TBD callouts)
  affects:
    - Phase 24 macOS troubleshooting content now fully navigable from every entry point
tech_stack:
  added: []
  patterns:
    - Docs hub TBD placeholder resolution pattern (replace at phase completion)
    - Inline "What breaks" callout runbook link pattern (per-setting See: links in admin guides)
    - macOS ADE section pattern in L1/L2 indexes (after APv2 section, before Scope/Related Resources)
key_files:
  created: []
  modified:
    - docs/decision-trees/00-initial-triage.md
    - docs/l1-runbooks/00-index.md
    - docs/l2-runbooks/00-index.md
    - docs/index.md
    - docs/admin-setup-macos/06-config-failures.md
    - docs/admin-setup-macos/01-abm-configuration.md
    - docs/admin-setup-macos/02-enrollment-profile.md
    - docs/admin-setup-macos/03-configuration-profiles.md
    - docs/admin-setup-macos/04-app-deployment.md
    - docs/admin-setup-macos/05-compliance-policy.md
    - docs/_templates/admin-template-macos.md
decisions:
  - "Template file (admin-template-macos.md) updated to remove Phase 24 placeholder pattern -- runbooks now exist and template guidance updated to point to actual l1-runbooks/ files"
  - "Inline 'See: [Troubleshooting Runbook](TBD)' callouts in per-step What-breaks sections treated as additional TBD placeholders (plan spec referenced table cells but inline callouts are the same pattern)"
metrics:
  duration: ~6min
  completed_date: 2026-04-15
  tasks_completed: 2
  files_created: 0
  files_modified: 11
requirements:
  - MTRO-01
  - MTRO-02
  - MTRO-03
  - MTRO-04
---

# Phase 24 Plan 03: Navigation Integration and TBD Resolution Summary

Navigation indexes updated with macOS ADE sections and all 61+ `[TBD - Phase 24]` placeholders across docs hub, config-failures table, 5 admin setup guides, and admin template replaced with actual runbook links.

## What Was Built

### Task 1: macOS Cross-Reference Banner and L1/L2 Index Updates

**`docs/decision-trees/00-initial-triage.md`** — Added one-line macOS cross-reference banner immediately after the existing APv2 version gate blockquote (line 8). Banner reads: `> **macOS:** For macOS ADE troubleshooting, see [macOS ADE Triage](06-macos-triage.md).` Follows the same pattern as the existing APv2 cross-reference. Existing APv2 version gate on original line preserved unchanged.

**`docs/l1-runbooks/00-index.md`** — Added `## macOS ADE Runbooks` section after the APv2 Runbooks section with a 6-entry table (runbooks 10-15). Updated frontmatter: `applies_to: all` (was `both`) and added `platform: all`. Added macOS ADE triage cross-reference to Related Resources. Updated intro paragraph scope description to include macOS ADE.

**`docs/l2-runbooks/00-index.md`** — Added `## macOS ADE Runbooks` section after the APv2 section (preceded by `---` separator) with version gate blockquote, prerequisite statement, When-to-Use table (4 runbooks), and macOS L1 Escalation Mapping table. Added `platform: all` to frontmatter. Added 3 macOS resource links to Related Resources (triage tree, macos-commands.md, macos-log-paths.md).

All 3 files received 2026-04-14 Version History entries.

Commit: `5c44fb2`

### Task 2: TBD Placeholder Resolution Across All Files

**`docs/index.md`** — Replaced 4 TBD placeholders in macOS L1/L2 sections with actual links to `decision-trees/06-macos-triage.md`, `l1-runbooks/00-index.md#macos-ade-runbooks`, `l2-runbooks/10-macos-log-collection.md`, and `l2-runbooks/00-index.md#macos-ade-runbooks`.

**`docs/admin-setup-macos/06-config-failures.md`** — Replaced all 29 `[TBD - Phase 24]` placeholders in the Runbook column across 5 sections: ABM (10-macos-device-not-appearing), Enrollment Profile (11-macos-setup-assistant-failed), Configuration Profile (12-macos-profile-not-applied), App Deployment (13-macos-app-not-installed), Compliance Policy (14-macos-compliance-access-blocked). Also fixed the See Also section `macOS L1 Runbooks (TBD - Phase 24)` with an actual index link.

**`docs/admin-setup-macos/01-05`** — Replaced all inline `> See: [Troubleshooting Runbook](TBD - Phase 24)` callouts within per-step "What breaks" sections (these were not in the plan's explicit table cell count but are the same placeholder pattern):
- `01-abm-configuration.md`: 9 occurrences → Device Not Appearing
- `02-enrollment-profile.md`: 6 occurrences → Setup Assistant Failed
- `03-configuration-profiles.md`: 10 occurrences → Profile Not Applied
- `04-app-deployment.md`: 7 occurrences → App Not Installed
- `05-compliance-policy.md`: 5 occurrences → Compliance / Access Blocked

All 7 files received 2026-04-14 Version History entries.

**`docs/_templates/admin-template-macos.md`** — Updated template comment instruction (removed "use TBD until runbooks exist" guidance, replaced with pointer to actual l1-runbooks/ files) and replaced all template placeholder `[TBD - Phase 24]` patterns with `[runbook-filename].md` placeholder pattern.

Commit: `350562f`

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing critical functionality] Resolved inline callout TBD placeholders in admin setup guides**
- **Found during:** Task 2 verification sweep (`grep -r "TBD - Phase 24" docs/`)
- **Issue:** The plan spec referenced `[TBD - Phase 24]` in the Configuration-Caused Failures table cells of admin guides 01-05. However, each admin guide also contained inline `> See: [Troubleshooting Runbook](TBD - Phase 24)` callouts within per-step "What breaks" blockquotes — 37 additional occurrences not explicitly counted in the plan. The acceptance criterion "zero TBD Phase 24 references remain in any docs/ file" required resolving these.
- **Fix:** Used `replace_all: true` on each file for the inline callout pattern, applying the same runbook mapping as the table cells (same file → same runbook).
- **Files modified:** `01-abm-configuration.md`, `02-enrollment-profile.md`, `03-configuration-profiles.md`, `04-app-deployment.md`, `05-compliance-policy.md`
- **Commit:** `350562f`

**2. [Rule 2 - Missing critical functionality] Updated admin template to remove obsolete placeholder guidance**
- **Found during:** Task 2 verification sweep
- **Issue:** `docs/_templates/admin-template-macos.md` contained 4 `TBD - Phase 24` references including a comment instructing future guide authors to use the placeholder "until macOS troubleshooting runbooks exist." With Phase 24 complete, this guidance is now incorrect and would cause future admin guides to be created with broken links.
- **Fix:** Updated template comment to point to actual `l1-runbooks/` files; replaced placeholder link patterns with `[runbook-filename].md` pattern.
- **Files modified:** `docs/_templates/admin-template-macos.md`
- **Commit:** `350562f`

## Known Stubs

None. All `[TBD - Phase 24]` placeholders resolved. Zero TBD Phase 24 references confirmed by grep sweep across all `docs/` files.

## Self-Check: PASSED

Files confirmed modified (key files spot-checked):
- FOUND: docs/decision-trees/00-initial-triage.md (contains "06-macos-triage")
- FOUND: docs/l1-runbooks/00-index.md (contains "macOS ADE Runbooks", 6 runbook entries, platform: all)
- FOUND: docs/l2-runbooks/00-index.md (contains "macOS ADE Runbooks", escalation mapping, platform: all)
- FOUND: docs/index.md (contains "06-macos-triage", "10-macos-log-collection", no TBD)
- FOUND: docs/admin-setup-macos/06-config-failures.md (contains all 5 runbook link types, no TBD)
- FOUND: docs/admin-setup-macos/01-05 (no TBD Phase 24 in any file)
- FOUND: docs/_templates/admin-template-macos.md (no TBD Phase 24)

Commits confirmed:
- FOUND: 5c44fb2 (Task 1 — macOS banner and index updates)
- FOUND: 350562f (Task 2 — TBD resolution)

Zero TBD Phase 24 references: CONFIRMED (grep returns 0)
