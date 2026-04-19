---
phase: 31-ios-l2-investigation
fixed_at: 2026-04-18T00:00:00Z
review_path: .planning/phases/31-ios-l2-investigation/31-REVIEW.md
iteration: 1
findings_in_scope: 10
fixed: 9
skipped: 1
status: partial
---

# Phase 31: Code Review Fix Report

**Fixed at:** 2026-04-18
**Source review:** `.planning/phases/31-ios-l2-investigation/31-REVIEW.md`
**Iteration:** 1

**Summary:**
- Findings in scope: 10
- Fixed: 9
- Skipped: 1 (WR-01 — already resolved by Phase 32 prior work)

## Fixed Issues

### WR-02: Fabricated section reference "§Post-enrollment diagnostics"

**Files modified:** `docs/ios-lifecycle/01-ade-lifecycle.md`, `docs/l2-runbooks/14-ios-log-collection.md`
**Commit:** 656bb8b
**Applied fix:** Added `<a id="post-enrollment-diagnostics"></a>` anchor immediately before the Stage 7 "Behind the Scenes" heading in `01-ade-lifecycle.md`. Updated both links in `14-ios-log-collection.md` (lines 54 and 176) from `#behind-the-scenes` / bare file to `#post-enrollment-diagnostics`.

### WR-03: Broken anchor — `02-abm-token.md#renewal`

**Files modified:** `docs/l1-runbooks/17-ios-ade-not-starting.md`
**Commit:** 61e88b5
**Applied fix:** Updated the link fragment in line 66 from `#renewal` to `#renewal--maintenance` (matching the actual heading `## Renewal / Maintenance` in `02-abm-token.md`) and updated the link label to match.

### WR-04: Factual inconsistency — ADE token sync cadence ("hourly" vs "every 12 hours")

**Files modified:** `docs/l2-runbooks/15-ios-ade-token-profile.md`
**Commit:** 00e1bd1
**Applied fix:** Updated Step 1 observable to read "expected ~12-hour cadence (delta sync); manual sync rate-limited to once per 15 min. Drift > 24 hours (2+ missed automatic cycles)" and updated Pattern A indicators to read "last sync > 24 hours ago (2+ missed 12-hour cycles)" and "normal sync is every 12 hours". Both changes align with `01-ade-lifecycle.md` and Microsoft Learn documentation.

### IN-01: `applies_to` enum in L2 template is stale

**Files modified:** `docs/_templates/l2-template.md`
**Commit:** a4e48fb
**Applied fix:** Updated the instruction comment (line 5) from "Set applies_to to APv1, APv2, or both" to "APv1, APv2, both, ADE, or all". Updated the frontmatter example value from `APv1 | APv2 | both` to `APv1 | APv2 | both | ADE | all`.

### IN-02: Bare directory link to `../l1-runbooks/`

**Files modified:** `docs/l2-runbooks/15-ios-ade-token-profile.md`
**Commit:** 5a0ce69
**Applied fix:** Changed `../l1-runbooks/` to `../l1-runbooks/00-index.md` on line 184, matching the explicit index-file pattern used elsewhere in the iOS suite.

### IN-03: Dead code — `walkMd()` defined but never called

**Files modified:** `scripts/validation/check-phase-31.mjs`
**Commit:** 3d36b6a
**Applied fix:** Removed the entire `walkMd()` function body (18 lines) and removed the now-unused `statSync` import from the `node:fs` import statement.

### IN-04: `JSON.parse` lacks a try/catch

**Files modified:** `scripts/validation/check-phase-31.mjs`
**Commit:** 79901e0
**Applied fix:** Added `parseInventory()` helper with a local try/catch that returns `{ _parseError: err.message, placeholders: [] }` on malformed JSON. Updated V-31-21 and V-31-24 to call `parseInventory()` instead of inline `JSON.parse(...)` and to short-circuit with `{ pass: false, detail: 'inventory JSON invalid: ...' }` when `_parseError` is set.

### IN-05: V-31-07 pattern-body split heuristic is fragile

**Files modified:** `scripts/validation/check-phase-31.mjs`
**Commit:** 8eba018
**Applied fix:** Replaced the `.split(/^### Pattern [ABCD]:/m).slice(1)` approach with a regex `/^### Pattern ([ABCD]):.*\n([\s\S]*?)(?=^### Pattern [ABCD]:|^## )/gm` that captures each pattern body up to the next same-level or higher-level heading, preventing the Pattern D body from consuming downstream `## Resolution` and `## Escalation Ceiling` sections. Verified all four patterns pass with correct body lengths (A:603, B:524, C:616, D:1142 chars).

### IN-06: Runbook 17 at exact lower line-count bound

**Files modified:** `scripts/validation/check-phase-31.mjs`
**Commit:** e2b48c7
**Applied fix:** Widened the V-31-29 lower bound for runbook 17 from 187 to 170, giving a 17-line safety margin below current count. Comment added to the check noting the widening rationale (IN-06). All 29 required checks pass after this change.

## Skipped Issues

### WR-01: Broken anchor — `#section-3-mac-cable-sysdiagnose`

**File:** `docs/ios-lifecycle/01-ade-lifecycle.md:364`
**Reason:** Already resolved by prior Phase 32 work. The Phase 32 gap-closure commit rewrote Section 3 of `14-ios-log-collection.md` from "Mac+Cable Sysdiagnose" to "Sysdiagnose Trigger and File Export" (new anchor: `#section-3-sysdiagnose-trigger-and-file-export`) and simultaneously updated the link in `01-ade-lifecycle.md:364` to point to the new anchor. At the time of this fix run, the link already reads `#section-3-sysdiagnose-trigger-and-file-export` and resolves correctly — no action required.
**Original issue:** Link fragment `#section-3-mac-cable-sysdiagnose` did not match GitHub slug; `+` was stripped without inserting a hyphen.

---

_Fixed: 2026-04-18_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
