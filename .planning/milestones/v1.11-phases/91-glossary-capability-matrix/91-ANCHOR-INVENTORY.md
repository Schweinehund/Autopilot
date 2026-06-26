# Phase 91 Pre-Edit Anchor Inventory

**Captured:** 2026-06-24 (BEFORE any Phase 91 edits to existing files)
**Files inventoried:** 2 existing files receiving new rows
**Purpose:** Pre-edit anchor-stability surface (SC#1 / PITFALL-6 / DA-4 convention)
**Mirrors format:** .planning/milestones/v1.6-phases/63-multi-ou-architecture-apple-admin-setup/63-ANCHOR-INVENTORY.md

---

## File 1: docs/reference/macos-capability-matrix.md

**Pre-edit git SHA (last commit touching file):** `87a6092`
**Pre-edit blob hash:** `73f16378197223378a8507a6751c763902de58db`
**Receiving:** macOS 26 in-place ABM migration row appended inside the `## Enrollment` table

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `13:## Enrollment`
- `28:## Configuration`
- `42:## App Deployment`
- `56:## Compliance`
- `68:## Software Updates`
- `78:## Conditional Access`
- `88:## Key Gaps Summary`
- `100:## Authentication`
- `116:## See Also`

H3 anchors: (none — H2-only file)

**Note:** `macos-capability-matrix.md` has no `## Version History` heading — the version table at the bottom of the file is a bare Markdown table (no `## ` heading prefix). This is confirmed by grep on authoring day.

**Permitted edits per Plan 91-03:**
- New data row APPENDED inside the `## Enrollment` table (after the `Re-enrollment fires blocking screen` row, before the blank line preceding `## Configuration`)
- Zero H2/H3 headings renamed
- Zero existing prose modified
- `check-phase-63.mjs` V-63-08 BASELINE updated to post-edit hash in the same atomic commit as the content edit

---

## File 2: docs/reference/4-platform-capability-comparison.md

**Pre-edit git SHA (last commit touching file):** `7572033`
**Pre-edit blob hash:** `2314ede7be54efbea1d4a4a787068310869a5896`
**Receiving:** macOS 26 in-place ABM migration row appended inside the `## Enrollment` table

### H2/H3 Anchor List (verbatim, pre-edit)

H2 anchors:
- `19:## Enrollment`
- `34:## Configuration`
- `47:## App Deployment`
- `61:## Compliance`
- `75:## Software Updates`
- `87:## Conditional Access`
- `97:## Single Sign-On`
- `105:## See Also`
- `114:## Version History`

H3 anchors: (none — H2-only file)

**Permitted edits per Plan 91-03:**
- New data row APPENDED inside the `## Enrollment` table (after the `Windows 10 support / minimum OS` row, before the blank line preceding `## Configuration`)
- Zero H2/H3 headings renamed
- Zero existing prose modified
- `check-phase-63.mjs` V-63-09 BASELINE updated to post-edit hash in the same atomic commit as the content edit
