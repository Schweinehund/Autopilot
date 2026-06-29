---
phase: 96-surgical-conflict-fixes
reviewed: 2026-06-28T00:00:00Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - docs/macos-lifecycle/00-ade-lifecycle.md
  - docs/l1-runbooks/15-macos-company-portal-sign-in.md
  - docs/_glossary-macos.md
findings:
  critical: 0
  warning: 2
  info: 0
  total: 2
status: issues_found
---

# Phase 96: Code Review Report

**Reviewed:** 2026-06-28
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Phase 96 made four surgical corrections across three files: (1) rewrote Stage-6 Company Portal deployment language from VPP/LOB ambiguity to PKG/LOB-only plus an explicit "never VPP on macOS" statement, (2) removed an orphaned VPP row from the guide-00 Glossary Quick Reference table, (3) changed the Stage-4 Platform SSO extension policy from "device group" to "user group" in both guide 00 and runbook 15, and (4) updated the Kandji-Iru glossary entry to describe the 3-URL reality.

All four substantive corrections are factually sound and internally consistent. No remaining VPP contradictions were found. The Platform SSO "user group" language is now consistent across guide 00 Stage 4 (line 250), guide 00 Stage 6 Watch Out For (line 329, pre-existing), the glossary Platform SSO entry (line 186), and runbook 15 step 4 (line 30). The Kandji-Iru glossary anchor (`#kandji-iru`) matches its heading. All five remaining rows in the guide-00 Glossary Quick Reference table carry valid anchors. Frontmatter timestamps are correct (`last_verified: 2026-06-28`, `review_by: 2026-09-28`) in all three files.

Two structural defects were found: a malformed Markdown table in guide 00's version history (introduced by Phase 96 continuing a pre-existing pattern) and a broken cross-reference anchor in runbook 15 (pre-existing, left unrepaired during Phase 96 edits).

## Warnings

### WR-01: Version history table column mismatch in guide 00

**File:** `docs/macos-lifecycle/00-ade-lifecycle.md:415-420`

**Issue:** The version history table header declares two columns:

```
| Date | Change |
|------|--------|
```

Phase 96 added its row at line 418 with three pipe-delimited cells, including a trailing `| -- |` author placeholder:

```
| 2026-06-28 | Phase 96 (ACC-01, ACC-02): ... | -- |
```

The Phase 81 row at line 419 also carries a trailing `| -- |` (pre-existing). The initial row at line 420 has two cells (consistent with the header). The result is a structurally malformed table: the header defines two columns but two of three data rows have three cells. GitHub's Markdown renderer displays the extra `| -- |` as an orphaned cell; strict link-checkers and CI Markdown linters flag the column count mismatch.

Phase 96 should have corrected the header when adding its row with an author field.

**Fix:** Add an `Author` column to the header and separator, and add the missing author cell to the initial row:

```markdown
| Date | Change | Author |
|------|--------|--------|
| 2026-06-28 | Phase 96 (ACC-01, ACC-02): corrected Stage-6 Company Portal VPP/LOB claims (lines 309, 319); removed orphaned VPP glossary quick-ref row (line 411); corrected Stage-4 SSO-extension policy group type from device to user (line 250) | -- |
| 2026-06-22 | Phase 81 (SSOREF-04): added E8 Related Guides cross-link to guide 07 | -- |
| 2026-04-14 | Initial version -- complete 7-stage ADE lifecycle narrative | -- |
```

Alternatively, strip the trailing `| -- |` from lines 418-419 to restore the consistent 2-column format matching the header and the initial row.

---

### WR-02: Broken cross-reference anchor in runbook 15

**File:** `docs/l1-runbooks/15-macos-company-portal-sign-in.md:67`

**Issue:** The escalation footer contains:

```
see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md#stage-6-company-portal)
```

The anchor fragment `#stage-6-company-portal` does not exist. The heading in guide 00 is `## Stage 6: Company Portal Sign-In`, which generates the GitHub slug `#stage-6-company-portal-sign-in`. The fragment is missing the `-sign-in` suffix. In GitHub rendering and in most anchor-aware link checkers, this link resolves silently to the top of the target page rather than to Stage 6. Phase 96 edited this file (step 4 group-type fix) but did not repair this pre-existing broken anchor.

**Fix:** Correct the fragment on line 67:

```markdown
see [macOS ADE Lifecycle](../macos-lifecycle/00-ade-lifecycle.md#stage-6-company-portal-sign-in)
```

---

_Reviewed: 2026-06-28_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
