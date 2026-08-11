---
phase: 143-link-coverage-fence-mask-unification
plan: 09
subsystem: docs-validation
tags: [link-checker, anchor-model, github-slug, corpus-repair, carve-governance, gov-02-ledger]

requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: github-anchor-model, a-id-recognition (Plan 02)
provides:
  - "Zero `{#id}` tokens anywhere in docs/ — all 87 overrides (85 this plan + 2 landed early by Plan 02) converted to own-line `<a id>` anchors"
  - "check-phase-51.mjs and check-phase-52.mjs updated to recognize the new anchor convention instead of the old trailing-{#id} one"
  - "check-phase-54.mjs's V-54-11 bare-word scan updated to strip `<a id>` tags before scanning body prose"
  - "47 pre-existing duplicate `<a id>` anchors (from an older, co-existing anchor convention) cleaned up"
  - "v1.20-CARVE.md Category 5 gains check-phase-52.mjs and check-phase-54.mjs (D-09 amendments)"
  - "Measured, reconciled dry-run ladder ending at 78 (13 file targets + 65 anchors), zero-regression pair-set subset proof (74 before -> 50 after, 24 removed, 0 added)"
affects: [143-03-PLAN.md, 143-04-PLAN.md, 143-05-PLAN.md, 143-06-PLAN.md, 144-*]

actuals:
  tokens: 24415
  tasks: 3
  commits: 11

tech-stack:
  added: []
  patterns: [D-38 mechanical {#id}-to-<a id> conversion, own-line-above-heading anchor placement, GOV-02 four-part grep discipline, D-09 CARVE-amendment-alone-before-edit sequencing]

key-files:
  created: []
  modified:
    - docs/l1-runbooks/02,11,12,13,14,21,25,27,28,29,30,31,32 (13 files)
    - docs/l2-runbooks/00,19,21,22,23,25 (6 files)
    - docs/operations/app-lifecycle/01,04; co-management/00,03; drift-migration/01 (5 files)
    - docs/operations/patch-management/00,01,02,03,04 (5 files)
    - scripts/validation/check-phase-51.mjs
    - scripts/validation/check-phase-52.mjs
    - scripts/validation/check-phase-54.mjs
    - .planning/milestones/v1.20-CARVE.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md

decisions:
  - "Re-derived the {#id} census directly rather than trusting the plan's authored 87/29: measured 85/29 (Plan 02's own Deviation 1 already converted 2 of the 87 early), reconciled and recorded before any edit."
  - "Discovered (not anticipated by the plan) that check-phase-51.mjs and check-phase-52.mjs hard-pin 14 of the 85 {#id} tokens literally on their heading lines, read live and inside the apex CHAIN_PHASES [48..137] span — remediated by rewriting the 14 regexes to test the same anchor-indexed-heading invariant under the new own-line <a id> convention, following the file's own CDI-02 same-commit-validator-update precedent."
  - "check-phase-52.mjs and check-phase-54.mjs were both off the CARVE Category 5 allowlist entirely — added via the standard D-09 amendment-alone-before-edit procedure (2 separate single-file commits), matching this project's established precedent for check-phase-67.mjs/check-phase-138.mjs."
  - "Discovered a second validator-conflict class empirically (not by grep): check-phase-54.mjs's V-54-11 bare-'ring' NEGATIVE scan misread the new <a id=\"wufb-deployment-rings\"> tag's own id text as an unqualified 'ring' occurrence — fixed by adding one <a id> strip to the existing regex chain."
  - "Discovered 47 pre-existing duplicate <a id> anchors across 13 files (an older anchor convention co-existing with the {#id} override on the same heading, predating this phase) — the conversion script correctly but mechanically inserted a second identical anchor; cleaned up by removing the newly-inserted duplicate, keeping the original."
  - "Final corpus diff is 29 files / 123 added / 85 removed — not the plan's authored 174/87, and not the interim 170/85 either, due to the 47-line dedupe. Recorded as the measured final figure, not silently reconciled to any prior projection (D-36 discipline)."
  - "Task 3's dry-run pair-set measurement (74 before -> 50 after anchor pairs) diverges from the plan's projected 77/51 by 3 pairs; both figures use the same da2876db BEFORE state but the 3-pair gap is not independently reproducible from Plan 02's own artifacts. Recorded as measured, not chased or silently matched."
  - "Class split for Plans 03/04/05: 3 pairs already ruled by CONTEXT D-03/D-06 (1 Class D, 2 Class B), 27 of 50 are error-codes/ deep links (Class C per D-10), the remaining 19 recorded as ground truth pending those plans' own per-link classification — a word-presence heuristic is not the disjoint-class rule D-04/D-05 require, so no fabricated C/D/B count was recorded for them."

metrics:
  duration: ~3h
  completed: 2026-08-11
status: complete
---

# Phase 143 Plan 09: D-38 Corpus-Wide `{#id}` -> `<a id>` Conversion Summary

Converted every remaining `{#id}` heading override in the 29-file CARVE Category 10 roster to an
own-line `<a id>` anchor (D-38, owner ruling), discovered and fixed two frozen-validator
compatibility conflicts and one duplicate-anchor defect the conversion itself introduced, and
measured (not projected) a clean zero-regression dry-run result on the fully-landed state.

## Performance

- **Duration:** ~3h
- **Tasks:** 3 (plus a substantial in-task remediation program across Tasks 1-2)
- **Files modified:** 29 docs files + 3 validators + 3 governance/evidence files
- **Commits:** 11

## Accomplishments

- All 85 remaining `{#id}` heading overrides across 29 files converted to own-line `<a id>`
  anchors (own-line-immediately-above placement, per the `docs/admin-setup-android/02-zero-touch-
  portal.md:38-39` precedent) — `docs/` now holds zero `{#id}` tokens anywhere. Combined with
  Plan 02's 2 early conversions, this discharges the full D-38 owner ruling: all 87.
- `check-phase-51.mjs` (V-51-12/13/14, 10 regexes) and `check-phase-52.mjs` (V-52-11, 4 regexes)
  rewritten to recognize the new anchor convention — both were hard-pinning the literal `{#id}`
  token on Cause/Trap A-D heading lines, a genuine, previously-undocumented conflict this plan's
  own pre-flight cross-reference check surfaced before any edit landed.
- `check-phase-52.mjs` and `check-phase-54.mjs` added to CARVE Category 5 (2 separate D-09
  amendment-alone commits, each landing before the edit it authorizes).
- `check-phase-54.mjs`'s V-54-11 bare-'ring'-token scan fixed to strip the new `<a id>` tag before
  scanning body prose (a second, empirically-discovered false-positive class).
- 47 pre-existing duplicate `<a id>` anchors (an older anchor convention already covering the same
  heading as the `{#id}` override, in 13 of the 29 files) cleaned up — the conversion script
  correctly but mechanically inserted a redundant second anchor; removed, keeping the original.
- Dry-run measured on the fully-landed state: 274 files / 6252 links / 13 broken file targets / 65
  broken anchors / 78 total — matching the plan's own projection exactly. Zero-regression proof
  measured on BOTH ends (BEFORE reconstructed via a temporary, fully-reverted `git checkout`, not
  assumed): 74 anchor pairs before -> 50 after, 24 removed, 0 added.

## Task Commits

1. **Task 1: D-38 conversion pre-flight census + GOV-02 row** - `da2876db` (docs)
2. **Task 2 (CARVE amendment):** add `check-phase-52.mjs` to Category 5 - `6292985b` (docs)
3. **Task 2 (docs family 1/4):** `docs/l1-runbooks/` (13 files, 43 anchors) - `155128eb` (docs)
4. **Task 2 (validator fix):** remediate `check-phase-51.mjs`/`52.mjs` - `9a04ef74` (fix)
5. **Task 2 (docs family 2/4):** `docs/l2-runbooks/` (6 files, 24 anchors) - `6567b238` (docs)
6. **Task 2 (docs family 3/4):** `docs/operations/patch-management/` (5 files, 10 anchors) - `8f4acf13` (docs)
7. **Task 2 (CARVE amendment):** add `check-phase-54.mjs` to Category 5 - `8bd0ad37` (docs)
8. **Task 2 (validator fix):** `check-phase-54.mjs` V-54-11 anchor-strip gap - `99a6057c` (fix)
9. **Task 2 (docs family 4/4):** remaining `docs/operations/` (5 files, 8 anchors) - `0d51ad68` (docs)
10. **Task 2 (cleanup):** remove 47 duplicate `<a id>` anchors - `c0c26d59` (fix)
11. **Task 3: dry-run checkpoint measured on the landed state** - `a69b4d68` (docs)

**Plan metadata:** captured in this SUMMARY commit (below)

## Files Created/Modified

- 29 docs/ files across `l1-runbooks/`, `l2-runbooks/`, `operations/{app-lifecycle,co-management,
  drift-migration,patch-management}/` — `{#id}` heading overrides converted to own-line `<a id>`
  anchors
- `scripts/validation/check-phase-51.mjs` — 10 regexes rewritten (V-51-12/13/14)
- `scripts/validation/check-phase-52.mjs` — 4 regexes rewritten (V-52-11)
- `scripts/validation/check-phase-54.mjs` — 1 line added to V-54-11's strip chain
- `.planning/milestones/v1.20-CARVE.md` — Category 5 gains `check-phase-52.mjs` and
  `check-phase-54.mjs` (2 separate D-09 amendment commits)
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — 5 rows appended (census/pre-flight, 2 CARVE
  amendments, 2 validator remediations)
- `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` — pre-flight
  section, 3 remediation-class sections, Task 3 dry-run measurement section

## Decisions Made

See frontmatter `decisions` for the full list. Summary: every discovered conflict was resolved
via the deviation framework's Rule 1 (bug — a stale validator assumption) / Rule 2 (missing
strip coverage) / Rule 3 (blocking issue) auto-fix path, following this project's own established
precedent for routine CARVE Category 5 additions (check-phase-67.mjs, check-phase-138.mjs) and
same-commit validator updates (CDI-02). No architectural decision or scope question was escalated
to a checkpoint — every fix was mechanical, small, and fully regression-tested before landing.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] check-phase-51.mjs and check-phase-52.mjs hard-pinned the literal `{#id}` token, breaking on conversion**
- **Found during:** Task 1's own pre-flight cross-reference check, before any edit
- **Issue:** `V-51-12/13/14` (10 regexes) and `V-52-11` (4 regexes) required the literal `{#id}`
  token present ON the heading line of `docs/l1-runbooks/{30,31,32}-*.md` and
  `docs/l2-runbooks/25-linux-agent-investigation.md`, read live (not frozen) and inside the apex
  `CHAIN_PHASES` span. Converting per D-38 would flip all 4 checks from PASS to FAIL.
- **Fix:** Rewrote all 14 regexes to test the same anchor-indexed-heading invariant under the new
  own-line `<a id>` convention (`<a id="ID"></a>\r?\n## Heading`) instead of the old trailing-token
  one. `check-phase-52.mjs`'s fix needed an extra `\r?` since its `readFile()` does not
  CRLF-normalize (a real implementation difference from `check-phase-51.mjs`, discovered while
  fixing this).
- **Files modified:** `scripts/validation/check-phase-51.mjs`, `scripts/validation/check-phase-52.mjs`
- **Verification:** Both files 0 FAIL bare and `CHECK_PHASE_NESTED=1`; `check-phase-68.mjs`'s
  RED-07 guard (which pins `check-phase-51.mjs`'s `readFile()` body, untouched by this edit)
  still PASS; c17/hub-scan/carve-gate all unregressed.
- **Committed in:** `9a04ef74`

**2. [Rule 3 - Blocking] check-phase-52.mjs was off the CARVE allowlist entirely**
- **Found during:** Task 1's cross-reference check
- **Issue:** `check-phase-52.mjs` is in-scope for `carve-gate.mjs` (under `scripts/`) but appeared
  in no CARVE category — editing it would hard-block the gate.
- **Fix:** Added to Category 5 via the standard D-09 amendment-alone-before-edit procedure (a
  single commit touching only `v1.20-CARVE.md`, landing before the validator fix).
- **Files modified:** `.planning/milestones/v1.20-CARVE.md`
- **Committed in:** `6292985b`

**3. [Rule 1 - Bug] check-phase-54.mjs's V-54-11 misread the new `<a id>` tag's own text as unqualified content**
- **Found during:** Task 2, immediately after converting the `patch-management` family
- **Issue:** `V-54-11`'s bare-'ring'-token NEGATIVE scan against `01-windows-wufb-rings.md` strips
  the old `{#id}` form but not the new own-line `<a id="wufb-deployment-rings"></a>` tag, so the
  anchor id's own text ("...rings...") was read as an unqualified 'ring' occurrence — a
  false-positive FAIL (`31 passed, 1 failed`).
- **Fix:** Added one `.replace(/^<a id="[a-zA-Z0-9_-]+"><\/a>$/gm, '')` line to the existing strip
  chain. `check-phase-54.mjs` also needed its own Category 5 CARVE amendment (off-list, same
  D-09 procedure).
- **Files modified:** `scripts/validation/check-phase-54.mjs`, `.planning/milestones/v1.20-CARVE.md`
- **Verification:** `32 passed, 0 failed, 0 skipped`, bare and nested identical; c17/hub-scan/
  carve-gate/`check-phase-68.mjs` RED-07 guard all unregressed. `check-phase-53/55/56/57.mjs`
  (the other three families' validators, plus a 4th referencing android runbooks) proactively
  re-run after their own family's conversion — all clean, no third instance of this class found.
- **Committed in:** `8bd0ad37` (amendment), `99a6057c` (fix)

**4. [Rule 1 - Bug] 47 pre-existing duplicate `<a id>` anchors from the mechanical conversion**
- **Found during:** post-Task-2, a full-corpus sanity scan (not predictable from the pre-flight
  grep, which only looks for `{#id}` text)
- **Issue:** 13 of the 29 files already carried a pre-existing, blank-line-separated
  `<a id="ID"></a>` anchor immediately above a heading whose `{#id}` override used the identical
  id — an older anchor convention (visible in `git log`, e.g. Phase 60's
  `a6f312e9 fix(60-04): repair 3 broken anchors...`) co-existing with the newer override. The
  mechanical conversion script correctly inserted its own anchor regardless, producing 47 cases of
  two identical `<a id>` tags in a row — duplicate `id` attributes.
- **Fix:** For every case of two identical `<a id>` lines where the second is immediately followed
  by the heading, removed the second (this plan's newly-inserted) line, leaving the original
  pre-existing anchor and its blank-line spacing untouched.
- **Files modified:** 13 files across `docs/l1-runbooks/` and `docs/l2-runbooks/`
- **Verification:** Zero duplicate ids remain corpus-wide; a systematic per-id grep across all 47
  affected ids against `scripts/` confirms zero validator references any of them;
  `check-phase-51/52/53/54/55/56/57.mjs` all re-run clean; c17/hub-scan/carve-gate unregressed;
  the apex `check-phase-138.mjs` chain run bare: **95 PASS, 0 FAIL, 0 SKIPPED**.
- **Committed in:** `c0c26d59`

---

**Total deviations:** 4 auto-fixed (2 Rule 1 validator-compatibility bugs, 1 Rule 3 blocking
CARVE-allowlist gap that recurred twice, 1 Rule 1 duplicate-content bug) plus 2 routine CARVE
Category 5 amendments (D-09 procedure, not a deviation in itself — the established mechanism for
this exact situation).
**Impact on plan:** All auto-fixes were necessary to complete the plan's own zero-regression
mandate without breaking the apex chain or leaving invalid duplicate HTML in the corpus. No scope
creep beyond what D-38's conversion itself required to land safely — no new feature, no
architectural change, nothing the deviation framework's Rule 4 would have required escalating.

## Issues Encountered

The plan's own numeric acceptance criteria (174/87 diff shape, 51-pair dry-run split, 26 pairs
removed) were all superseded by measurement, in three successive stages: (1) Plan 02's own
Deviation 1 already converted 2 of the 87 early, dropping this plan's scope to 85/29; (2) the
47-anchor duplicate cleanup dropped the added-line count from 170 to 123; (3) Task 3's own
scripted, non-eyeballed pair-set measurement (74 before -> 50 after) diverged from the plan's
projected 77/51 by 3 pairs, not independently reproducible from Plan 02's artifacts. None of these
divergences affects the substantive goal (zero `{#id}` tokens, zero regressions, a strict pair-set
subset with zero additions) — all three are recorded as measured values with their derivation
shown, per this phase's own D-36 discipline ("a `[MEASURED]` tag belongs only on a row produced by
an executed command").

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 03 (Class D de-anchor), Plan 04 (Class C target-side `<a id>`) and Plan 05 (Class B
  source-side rewrite) can proceed against the measured 50-pair ground truth in
  `143-EVIDENCE.md`'s Task 3 section. 3 pairs are already ruled (D-03/D-06); 27 are error-codes/
  deep links (Class C per D-10); the remaining 19 need those plans' own per-link classification —
  a word-presence heuristic was deliberately NOT promoted to a fabricated C/D/B count.
- Every `file:line` citation into one of the 29 converted files from before this plan is stale by
  one line per preceding converted heading in the same file — locate by heading/content text, not
  line number. Two live instances flagged in `143-EVIDENCE.md`.
- No blockers. c17 (234/0/0), check-nav-hub-links (0/0/0, self-test 10/10), carve-gate (80/80/0),
  and the full apex chain (`check-phase-138.mjs`, 95/0/0 bare) are all green at this commit.

---
*Phase: 143-link-coverage-fence-mask-unification*
*Completed: 2026-08-11*

## Self-Check: PASSED

- FOUND: `.planning/phases/143-link-coverage-fence-mask-unification/143-09-SUMMARY.md`
- FOUND commits: `da2876db`, `6292985b`, `155128eb`, `9a04ef74`, `6567b238`, `8f4acf13`,
  `8bd0ad37`, `99a6057c`, `0d51ad68`, `c0c26d59`, `a69b4d68` in `git log --oneline`
