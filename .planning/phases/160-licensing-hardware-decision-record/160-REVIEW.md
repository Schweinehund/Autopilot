---
phase: 160-licensing-hardware-decision-record
reviewed: 2026-09-15T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - docs/recipes/06-walk-up-avd-kiosk-autologon.md
  - docs/reference/licensing-matrix.md
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 160: Code Review Report

**Reviewed:** 2026-09-15
**Depth:** standard
**Files Reviewed:** 2
**Status:** issues_found

## Summary

Reviewed the phase's diff to `docs/recipes/06-walk-up-avd-kiosk-autologon.md` and `docs/reference/licensing-matrix.md` against `08ea300f6ee8a605a1c0b2676eb5b2c2ee3ad3fe^`. Both new tables in the recipe's Step 4 are pipe-balanced (5 pipes per 4-column row, verified with `awk`), all new blockquotes are separated by blank lines (no accidental blockquote merging), all new/rewritten Markdown links resolve to real headings or external URLs, frontmatter `last_verified`/`review_by` deltas are internally consistent (90-day cadence in both files), and no device identifiers (Activation ID, Installation ID, Partial Product Key, CID/IID) leaked into either file. No BLOCKER-level defects found.

Two WARNING-level issues were found: a dangling in-prose reference to a section name ("Reversibility notes") that does not exist anywhere in this document or the rest of the recipe corpus, and a genuine guidance contradiction between the newly added Step-4 decision block and the pre-existing activation-status decision table two paragraphs later in the same step.

## Warnings

### WR-01: Dangling reference to a nonexistent "Reversibility notes" section

**File:** `docs/recipes/06-walk-up-avd-kiosk-autologon.md:108`
**Issue:** The new decision-block row says the MAK activation "is permanent and consumes one count from the volume agreement (see this recipe's own Reversibility notes)". No section named "Reversibility" (or "Reversibility notes") exists anywhere in this file — the actual section is `## Rollback/Recovery` (line 268), whose "Licensing:" subsection (lines 290-292) is where the permanence/consumption claim is actually documented. `grep -rn "^## Reversibility\|^## Rollback" docs/recipes/*.md` confirms every recipe in the corpus (01 through 06) uses "Rollback/Recovery" as the heading name — "Reversibility" is used nowhere. The doc's own convention elsewhere is to use a real Markdown anchor link (e.g. line 305: `[Rollback/Recovery](#rollbackrecovery)`), so this plain-text mention is both unlinked and misnamed, unlike the rest of the document.
**Fix:**
```markdown
As with any MAK, the activation is permanent and consumes one count from the volume agreement (see this recipe's own [Rollback/Recovery](#rollbackrecovery) notes, "Licensing:"); **[PILOT]** an image showing as unactivated failed the ShellLauncher node
```

### WR-02: New Step-4 decision block contradicts the existing activation-status branch in the same step

**File:** `docs/recipes/06-walk-up-avd-kiosk-autologon.md:108-122`
**Issue:** The new row's Branch column reads: `Standard, ruled 2026-09-10—continue with the multi-app branch at [Step 5]` — i.e. it unconditionally routes anyone who confirms the fleet standard (MAK-activated Windows Enterprise) straight to the multi-app path, skipping Shell Launcher. But nine lines later, the pre-existing "Ask the admin: Is the kiosk image activated Enterprise, IoT Enterprise or Education right now…" table (lines 117-122, unchanged by this phase) explicitly branches to Shell Launcher when the edition is confirmed activated Enterprise/IoT Enterprise/Education. Prerequisites (line 29) independently states "Shell Launcher is the preferred shell for this device class." Read together, a reader who follows the new "Standard" row's instruction never reaches the still-live Shell Launcher branch even after a MAK is confirmed and activation succeeds, because the new row tells them to "continue with the multi-app branch" as the standing decision rather than as an interim state pending confirmation. The new prose paragraph at lines 111-113 hints at a "confirm activation first, then reconsider" logic, but the table's Branch column itself does not carry that conditionality, so the two decision points in the same step give conflicting routing instructions once a MAK is actually confirmed and activated.
**Fix:** Make the Branch column's conditionality explicit, e.g.:
```markdown
| Standard, ruled 2026-09-10—until a MAK entitlement is confirmed and `slmgr /xpr` reports permanent activation, continue with the multi-app branch at [Step 5](#step-5-author-the-assignedaccessconfiguration-xml); once confirmed activated, re-enter this step's next decision (below) to select Shell Launcher |
```

## Info

### IN-01: Version History entries cite different traceability schemes for the same ruling

**File:** `docs/recipes/06-walk-up-avd-kiosk-autologon.md:325`, `docs/reference/licensing-matrix.md:103`
**Issue:** Both new Version History rows document the same 2026-09-10 ruling, but the recipe's row cites "Step-4 STD-05 decision block" while the matrix's row cites "Phase 160 LIC-02". Neither row cites the other's identifier, so a reader trying to cross-reference the ruling's origin from one doc's changelog to the other has no shared key.
**Fix:** Include both identifiers in each row (e.g. "Phase 160 LIC-02 / STD-05 decision block") so either document's Version History can be traced to the other.

### IN-02: `last_verified` stamps are one day apart for documents recording the same ruling

**File:** `docs/recipes/06-walk-up-avd-kiosk-autologon.md:7` (2026-09-14), `docs/reference/licensing-matrix.md:6` (2026-09-15)
**Issue:** Both files record the same 2026-09-10 licensing ruling but carry `last_verified` dates one day apart. This is plausible if the two files were edited/verified on separate days, but it's worth confirming that's intentional rather than an artifact of editing order, since both `review_by` dates (2026-12-13 / 2026-12-14) now also diverge by one day going forward.
**Fix:** No action required if the staggered edit dates are intentional; otherwise align both stamps to the same verification date.

---

_Reviewed: 2026-09-15_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
