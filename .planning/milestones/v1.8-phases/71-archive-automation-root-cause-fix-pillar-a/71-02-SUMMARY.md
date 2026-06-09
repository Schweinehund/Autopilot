---
phase: 71-archive-automation-root-cause-fix-pillar-a
plan: 02
one-liner: "Re-authored v1.1 + v1.2 H2 entries in .planning/MILESTONES.md from canonical MILESTONE-AUDIT source-of-truth; 5 debris lines (v1.2:145-148 + v1.1:164) REPLACED with restored bullets; V-71-MILESTONES-01 + V-71-ARCHIVE02-01 flipped FAIL->PASS at SHA ff4514b."
type: execute
wave: 2
depends_on:
  - 71-01
status: complete
completed: 2026-06-04
commit: ff4514bd2e716c601e2664dd95281b59034499b8
files_changed:
  - .planning/MILESTONES.md
requirements:
  - ARCHIVE-02
tags:
  - milestones-re-authoring
  - archive-residue-sweep
  - replacement-not-deletion
  - milestone-audit-source-of-truth
---

# Phase 71 Plan 02: ARCHIVE-02 Re-Authoring (v1.1 + v1.2 H2) Summary

**One-liner:** Re-authored v1.1 + v1.2 H2 entries in `.planning/MILESTONES.md` from canonical MILESTONE-AUDIT source-of-truth; 5 debris lines (v1.2:145-148 + v1.1:164) REPLACED with restored bullets; V-71-MILESTONES-01 + V-71-ARCHIVE02-01 flipped FAIL->PASS at SHA `ff4514b`.

## What Was Built

A single-commit surgical re-authoring of two adjacent H2 entries in `.planning/MILESTONES.md` per D-03 LOCKED Option D (REPLACEMENT FROM CANONICAL SOURCE, not deletion). The commit:

1. **v1.1 H2 (lines 155-165 pre-sweep -> lines 159-173 post-sweep):**
   - Replaced `**Phases completed:** 9 phases, 18 plans, 42 tasks` with corrected `7 phases (11-17), 18 plans, 42 tasks` per `v1.1-MILESTONE-AUDIT.md` (audit-doc Phase Verification Summary lines 52-60 enumerates Phases 11/12/13/14/15/16/17 = 7 phases, NOT 9 as the pre-sweep entry claimed).
   - Added `**Audit status:** \`tech_debt\` ...` row citing the audit-doc + key metrics (24/24 requirements; 7/7 phases verified; 5/6 integration flows; 5/6 working flows; 7 tech-debt items).
   - Added `**Note:**` row recording retroactive-authoring 2026-06-04 + ARCHIVE-02 sweep + the NEW DISCOVERY provenance for the v1.1:164 `Edit 1 --` debris (NOT in `v1.7-DEFERRED-CLEANUP.md:38-48` known-sites list).
   - Replaced 4 pre-sweep bullets (3 substantive + 1 truncated debris `- Edit 1 -- docs/error-codes/00-index.md:`) with 5 canonical bullets covering Phases 11-12 / 13-14 / 15 / 16 / 16-17 deliverables per `v1.1-MILESTONE-AUDIT.md` Requirements Coverage rows 70-96. The 5th bullet SEMANTICALLY RESTORES the truncated debris by explicitly covering Intune Connector + 30-entry consolidated error-code reverse-lookup table + navigation hub updates at `docs/error-codes/00-index.md`.

2. **v1.2 H2 (lines 138-152 pre-sweep -> lines 138-153 post-sweep):**
   - Replaced `**Phases completed:** 6 phases, 20 plans, 23 tasks` with phase-range-anchored `6 phases (20-25), 20 plans, 23 tasks`.
   - Added `**Audit status:** \`gaps_found\` ...` row honestly reflecting the audit-doc frontmatter (16/38 formally verified; 22/38 partial status due to Phases 21 + 24 lacking VERIFICATION.md at close; all 44+ content deliverables on disk; nature: process gaps not content gaps; tech-debt routed to v1.3 closure).
   - Added `**Note:**` row recording retroactive-authoring 2026-06-04 + ARCHIVE-02 sweep + `v1.7-DEFERRED-CLEANUP.md:38-48` known-sites attribution for the 4-debris-line cluster at v1.2:145-148.
   - Replaced 8 pre-sweep bullets (4 substantive + 4 debris `- One-liner:` / `- Commit:`) with 5 canonical bullets covering Phases 20 / 21 / 22 / 23 / 24-25 deliverables per `v1.2-MILESTONE-AUDIT.md` Executive Summary + Requirements Coverage tables + Phase Verification Summary.

## Pre-Commit Dry-Run Output

`node scripts/validation/check-phase-71.mjs` output verbatim post-sweep (the green-baseline witness for the chicken-and-egg resolution):

```
check-phase-71 -- Phase 71 deliverables (Archive-Automation Root-Cause Fix + Historical Residue Sweep)

[FIX-01/29] V-71-FIX-01: scripts/archive/extract-summary-oneliners.mjs exists + corrected regex anchor PASS
[FIX-02/29] V-71-FIX-02: scripts/archive/test-extract-oneliner.mjs exists + Fixture 1/2/3 labels PASS
[MILESTONES-01/29] V-71-MILESTONES-01: .planning/MILESTONES.md HEAD -- zero anchored placeholder-label bullets PASS
[ARCHIVE02-01/29] V-71-ARCHIVE02-01: v1.1 + v1.2 H2 ranges in MILESTONES.md -- zero placeholder-label residue PASS
[CHAIN-48/29] V-71-CHAIN-48: check-phase-48.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-49/29] V-71-CHAIN-49: check-phase-49.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-50/29] V-71-CHAIN-50: check-phase-50.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-51/29] V-71-CHAIN-51: check-phase-51.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-52/29] V-71-CHAIN-52: check-phase-52.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-53/29] V-71-CHAIN-53: check-phase-53.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-54/29] V-71-CHAIN-54: check-phase-54.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-55/29] V-71-CHAIN-55: check-phase-55.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-56/29] V-71-CHAIN-56: check-phase-56.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-57/29] V-71-CHAIN-57: check-phase-57.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-58/29] V-71-CHAIN-58: check-phase-58.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-59/29] V-71-CHAIN-59: check-phase-59.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-60/29] V-71-CHAIN-60: check-phase-60.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-61/29] V-71-CHAIN-61: check-phase-61.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-61 FAIL:
[CHAIN-62/29] V-71-CHAIN-62: check-phase-62.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-62 FAIL:
[CHAIN-63/29] V-71-CHAIN-63: check-phase-63.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-63 FAIL:
[CHAIN-64/29] V-71-CHAIN-64: check-phase-64.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-64 FAIL:
[CHAIN-65/29] V-71-CHAIN-65: check-phase-65.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-65 FAIL:
[CHAIN-66/29] V-71-CHAIN-66: check-phase-66.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-66 FAIL:
[CHAIN-67/29] V-71-CHAIN-67: check-phase-67.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-67 FAIL:
[CHAIN-68/29] V-71-CHAIN-68: check-phase-68.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-69/29] V-71-CHAIN-69: check-phase-69.mjs exits 0 (CHAIN regression-guard) PASS
[CHAIN-70/29] V-71-CHAIN-70: check-phase-70.mjs exits 0 (CHAIN regression-guard) FAIL -- check-phase-70 FAIL:
[AUDIT/29] V-71-AUDIT: v1.7-milestone-audit.mjs exits 0 (predecessor-byte-unchanged) PASS
[SELF/29] V-71-SELF: CHAIN_PHASES does NOT include 71; CHAIN_SKIP is empty Set PASS

Result: 21 PASS, 8 FAIL, 0 SKIPPED
```

**Interpretation:**

- **V-71-MILESTONES-01 PASS** (was FAIL at Plan 71-01 SHA `e4887b2`) -- chicken-and-egg resolved.
- **V-71-ARCHIVE02-01 PASS** (was FAIL at Plan 71-01 SHA `e4887b2`) -- v1.1 + v1.2 H2 ranges scoped scan clean.
- **V-71-FIX-01 + V-71-FIX-02 + V-71-AUDIT + V-71-SELF + V-71-CHAIN-{48..60, 68, 69}** all PASS (16 chain validators + 4 phase-71-deliverable validators = 20 unchanged PASS from Plan 71-01).
- **V-71-CHAIN-{61..67, 70}** FAIL (8 pre-existing FAILs persist post-Plan-71-02) -- these are `CHAIN-DEGRADED-AT-HEAD-01` / `SCOPE-GAP-RETRO-01` class items scoped to **Phase 73 Pillar C** (retrospective forward-port of v1.5/v1.6/v1.7-frozen-aware logic into check-phase-{48..66}.mjs); NOT a regression introduced by Plan 71-02 -- they were FAILing at Plan 71-01 SHA `e4887b2` already (per Plan 71-01 disclosure). Plan 71-03 close-gate will draft the `v1.8-DEFERRED-CLEANUP.md` stub for those.

## Predecessor-Byte-Unchanged Verification

Empirically verified post-commit via:

```bash
git diff e4887b2 HEAD -- \
  .github/workflows/audit-harness-v1.7-integrity.yml \
  scripts/validation/v1.7-milestone-audit.mjs \
  scripts/validation/v1.7-audit-allowlist.json \
  scripts/archive/extract-summary-oneliners.mjs \
  scripts/archive/test-extract-oneliner.mjs \
  scripts/validation/check-phase-71.mjs
```

Output: **EMPTY** (zero modifications to v1.4/v1.5/v1.6/v1.7 frozen workflow YAMLs + audit-MJS + sidecar JSONs + Plan 71-01 Wave-3 NEW artifacts since Plan 71-01 SHA `e4887b2`).

## Diff Hunk Topology Note

`git diff e4887b2 HEAD -- .planning/MILESTONES.md` produces **a single contiguous hunk** `@@ -137,31 +137,35 @@`:

- v1.2 H2 (lines 138-152 pre-sweep) and v1.1 H2 (lines 155-165 pre-sweep) are adjacent in the file -- separated only by 3 lines (blank + `---` + blank).
- Git auto-coalesces adjacent hunks into a single hunk when the unchanged-context-lines between them are below the default `--unified=3` threshold.
- This is a git-behavior artifact, NOT a scope-creep regression. The Plan 71-02 underlying invariant -- "changes EXCLUSIVELY within v1.1 H2 + v1.2 H2 ranges" -- is preserved.
- v1.0 H2 (line 168+) + v1.3 H2 (line 111+) + v1.4/v1.4.1/v1.5/v1.6/v1.7 H2 entries (lines 3-109) all byte-unchanged.

Plan 71-02 acceptance criteria line 294 ("git diff HEAD -- .planning/MILESTONES.md shows EXACTLY 2 hunks") was a planning-time over-specification of the underlying invariant. The actual invariant is met: scope-bounded changes confined to v1.1 + v1.2 H2 ranges.

## Closing Commit SHA

**Plan 71-02 SHA: `ff4514bd2e716c601e2664dd95281b59034499b8`** (short: `ff4514b`)

This SHA is the chicken-and-egg-resolution witness for the Plan 71-01 transient. Plan 71-03 close-gate will record this SHA in `71-VERIFICATION.md` Section D Atomic-Commit SHA Record table.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Corrected pre-sweep v1.1 H2 phase count (9 -> 7)**
- **Found during:** Task 1 reconnaissance (reading `v1.1-MILESTONE-AUDIT.md` frontmatter)
- **Issue:** Pre-sweep v1.1 H2 claimed `**Phases completed:** 9 phases, 18 plans, 42 tasks`. The audit-doc Phase Verification Summary lines 52-60 enumerates exactly Phases 11/12/13/14/15/16/17 = **7 phases** (the audit-doc frontmatter `scores.phases: 7/7` corroborates).
- **Fix:** Re-authored v1.1 H2 header line as `**Phases completed:** 7 phases (11-17), 18 plans, 42 tasks` per canonical source-of-truth.
- **Files modified:** `.planning/MILESTONES.md` (line 157 area pre-sweep).
- **Commit:** `ff4514b` (folded into the atomic Plan 71-02 commit).

### Architectural Decisions Surfaced (Rule 4 NOT triggered)

The pre-sweep v1.1 H2 "9 phases" miscount was a Rule-1-bug not a Rule-4-architectural-change because:
- Fix scope is confined to one line within an H2 already being fully re-authored.
- Canonical source-of-truth (audit-doc) is unambiguous.
- No new column / schema / table created.
- No user-facing decision required (silent canonical-source correction symmetric with v1.6+v1.7 retroactive-authoring precedent).

Per CONTEXT D-03 LOCKED Option D + v1.6 H2 retroactive-authoring exemplar (lines 25-32) the audit-doc IS the source of truth for H2 entry content; pre-existing miscounts in retroactively-authored entries are silently corrected.

## Authentication Gates

None encountered. No external network access required; no Microsoft Graph API calls; no credential surfaces touched.

## Threat Flags

None. Plan 71-02 modifies one planning-doc markdown file -- no new auth surface, no new network endpoint, no new file-access pattern at trust boundaries, no schema change. STRIDE threat-model (PLAN.md lines 380-388) all 5 listed threats dispositioned `mitigate` empirically held:
- T-71-02-01 (off-by-one Edit-tool capture): mitigated -- single contiguous hunk at @-137 +137 confirms scope confinement.
- T-71-02-02 (whitespace drift): mitigated -- Edit tool succeeded first invocation in both Task 2 and Task 3; no `old_string not found` retry needed.
- T-71-02-03 (CRLF/LF drift via Set-Content): mitigated -- Edit tool used exclusively; no PowerShell `Set-Content` / `Out-File`.
- T-71-02-04 (NEW DISCOVERY surfaces in commit message): accepted by design (provenance transparency contract).
- T-71-02-05 (re-authored bullet faithfulness to audit doc): mitigated -- `**Note:**` row provides explicit provenance citing `v1.1-MILESTONE-AUDIT.md` / `v1.2-MILESTONE-AUDIT.md` audit-doc paths.
- T-71-02-SC (package install legitimacy): zero packages installed (one markdown file modified).

## Known Stubs

None. The 5 re-authored bullets per H2 are substantive prose with explicit REQ-ID anchors, audit-doc citations, and Phase-VERIFICATION.md PASS-count citations. Zero "TODO" / "coming soon" / "placeholder" / empty-value patterns.

## Self-Check: PASSED

**Verification commands run:**

1. `git log -1 --format=%H` -> `ff4514bd2e716c601e2664dd95281b59034499b8` (40-char hex; FOUND)
2. `git show --name-only --format= ff4514b` -> `.planning/MILESTONES.md` (exactly 1 file; FOUND)
3. `git log -1 --format=%s HEAD` -> `docs(archive): ARCHIVE-02 re-author v1.1+v1.2 MILESTONES.md entries from MILESTONE-AUDIT source (replacement-not-deletion per ARCHIVE-01 doctrine)` (literal-match commit subject; FOUND)
4. `grep -c "^- Edit 1 --" .planning/MILESTONES.md` -> 0 (debris cleared; FOUND-AS-EXPECTED)
5. `grep -cE "^- (One-liner:|Commit:)" .planning/MILESTONES.md` -> 0 (v1.2 debris cleared; FOUND-AS-EXPECTED)
6. `grep -c "v1.1-MILESTONE-AUDIT.md" .planning/MILESTONES.md` -> 2 (Note + Audit-status rows; FOUND)
7. `grep -c "v1.2-MILESTONE-AUDIT.md" .planning/MILESTONES.md` -> 2 (Note + Audit-status rows; FOUND)
8. `grep -c "retroactively re-authored 2026-06-04" .planning/MILESTONES.md` -> 2 (one row per H2; FOUND)
9. `grep -c "tech_debt" .planning/MILESTONES.md` -> 4 (v1.1 audit-status row + audit-doc-frontmatter status citation appearances; FOUND)
10. `grep -c "gaps_found" .planning/MILESTONES.md` -> 2 (v1.2 audit-status row + audit-doc-frontmatter status citation; FOUND)
11. Predecessor-byte-unchanged check: empty diff vs `e4887b2` across 6 frozen surfaces (FOUND-AS-EXPECTED).
