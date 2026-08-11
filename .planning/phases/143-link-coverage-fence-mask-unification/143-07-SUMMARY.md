---
phase: 143-link-coverage-fence-mask-unification
plan: 07
subsystem: docs-validation
tags: [fence-mask, commonmark, gov-02-ledger, regression-gate, c17-eee-contract, convert-ps1]

requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: corpus-wide link checker (Plan 06), zero-broken-link corpus state (Plans 02-05/09)
provides:
  - "All 15 fence-mask call sites across 9 Pillar-C files unified under a single ^ {0,3} CommonMark indented-fence rule -- 14 JS sites (c17-eee-contract.mjs, check-nav-hub-links.mjs, 6 retrofit-*.mjs) + 1 PowerShell site (convert.ps1:108, framed as a three-axis tightening per D-17, not a widening)"
  - "9 GOV-02 ledger rows (one per Pillar-C file) with target-scoped path-literal grep, symbol-scoped grep, live cross-reference checks against 6 known pinning validators, all landed before their respective edits"
  - "D-35 CRLF hazard discharged per file: 7 of 8 previously-unverified files already normalize CRLF identically to check-nav-hub-links.mjs; convert.ps1 is CRLF-safe via PowerShell Get-Content's line-splitting contract"
  - "LINK-06's four evidence legs measured and recorded in 143-EVIDENCE.md: (a) c17 byte-identical 234/0/0 before/after, (b) 46-line mask-state diff (46 newly-masked, 0 newly-unmasked, 11 files, 0 of 12 c17-relevant patterns matched), (c) 0 of the 46 lines fall inside a Summary section (the assertion-#5 leg), (d) check-nav-hub-links.mjs's corpus scan unchanged at 0/0/0"
  - "D-20 out-of-census residual named and routed: 4 divergent fence-handling classes (check-phase-66.mjs:274, 12 unanchored strip sites in check-phase-54..59, carve-gate.mjs:65, 4 column-0-only detectors) confirmed present and untouched, not claimed as unified"
affects: [143-08-PLAN.md]

actuals:
  tokens: 14519
  tasks: 3
  commits: 6

tech-stack:
  added: []
  patterns: [copy-verbatim-with-provenance fence mask (D-16, no shared _lib/fence-mask.mjs), one-line provenance comment citing the reference instance, mask-state-diff-plus-pattern-set as a four-leg regression proof for a mask-widening edit]

key-files:
  created: []
  modified:
    - scripts/validation/c17-eee-contract.mjs
    - scripts/validation/check-nav-hub-links.mjs
    - scripts/pipeline/retrofit-guide.mjs
    - scripts/pipeline/retrofit-mermaid-structural.mjs
    - scripts/pipeline/retrofit-nav-hub.mjs
    - scripts/pipeline/retrofit-reference.mjs
    - scripts/pipeline/retrofit-runbook.mjs
    - scripts/pipeline/retrofit-structural.mjs
    - scripts/pipeline/convert.ps1
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md

decisions:
  - "Compressed the fence-mask provenance comments from an initial 2-3 line form to the plan's specified one-line form in a follow-up commit (e9a505be) after re-reading the task text -- caught and fixed within the same task, not left as a deviation."
  - "convert.ps1's fixture exercise (3 synthetic fixtures: indented-fence, column-0-fence, no-fence) discharges D-17's evidence-asymmetry by exercising the fence loop directly rather than a full 221-document publish-bundle build, which was explicitly not run and not claimed."
  - "The 12-pattern c17-relevance probe's bold/emphasis pattern was tightened to a no-internal-whitespace form after an initial run produced 2 false-positive matches on underscore-delimited shell placeholders (<source_folder>, <setup_file>) -- recorded as a probe-precision fix, not a finding about the corpus."

metrics:
  duration: ~45min
  completed: 2026-08-11
status: complete

requirements-completed: [LINK-05, LINK-06]
---

# Phase 143 Plan 07: Fence-Mask Unification Summary

Unified all 15 fence-mask call sites (14 JS regex literals + 1 PowerShell pattern) across the 9
Pillar-C files under a single `^ {0,3}` CommonMark indented-fence rule, and proved with four
independent measured legs that the widening hides no suppressed c17 violation.

## Performance

- **Duration:** ~45 min
- **Tasks:** 3
- **Files modified:** 9 Pillar-C files (8 JS + 1 PowerShell) + GOV-02 ledger + EVIDENCE.md
- **Commits:** 6

## Accomplishments

- **Task 1 — GOV-02 pre-edit census + D-35 CRLF discharge:** Appended 9 ledger rows (one per
  Pillar-C file), each with a target-scoped path-literal grep (`scripts/`+`.github/`), a
  symbol-scoped grep on the fence-mask literal and its four carrier symbols
  (`buildFenceMask`/`inCodeFence`/`fenceChar`/`fenceLen`), and a live cross-reference check against
  the six known pinning validators (`check-phase-115/120/113/124/123.mjs`). A corpus-wide grep
  confirmed the fence-regex literal and its carrier symbols appear nowhere outside the 9 files this
  plan edits — zero frozen call-site conflicts on the fence site itself. D-35's CRLF hazard was
  discharged per file: direct reads showed 7 of the 8 files D-35 called "unverified" already carry
  the identical explicit `.replace(/\r\n/g, '\n')` normalization as `check-nav-hub-links.mjs` (a
  shared idiom, not a one-off); `convert.ps1` is CRLF-safe via PowerShell `Get-Content`'s own
  line-splitting contract.
- **Task 2 — 14 JS fence sites:** Inserted ` {0,3}` into every one of the 14 fence-regex literals
  across 8 files, with paired sites (c17 `:158/:166`; `check-nav-hub-links.mjs:100/:103`, drifted
  from the plan's cited `:91/:94` by Plan 06's own edits and located by regex text per the plan's
  own instruction; `retrofit-mermaid-structural.mjs:268/:271`; `retrofit-nav-hub.mjs:252/:255`)
  changed together, never one alone. A one-line provenance comment landed at every site citing
  `check-nav-hub-links.mjs:85-112` (`buildFenceMask`) as the reference instance (D-16). No
  `_lib/fence-mask.mjs` created; no detection regex (c17's mermaid detector, every retrofit's
  ` ```mermaid ` test) touched. Post-edit: c17 byte-identical `234/0/0`, all 13 counters 0,
  `--self-test` 4/0; `check-nav-hub-links.mjs` `0/0/0` exit 0, `--self-test` 10/0; all five pinning
  validators (`check-phase-113/115/120/123/124.mjs`) still exit 0; `CHAIN_PHASES` confirmed still
  absent from c17.
- **Task 3 — `convert.ps1`'s tightening + LINK-06's four legs:** `convert.ps1:108`'s match pattern
  narrowed from `'^\s*(```|~~~)'` to `'^ {0,3}(```|~~~)'`, framed and ledgered as a **three-axis
  tightening** (D-17) — the old pattern matched 4+-space indents, tab indents, and Unicode-separator
  whitespace (`.NET \s` = `\p{Z}`); the new pattern narrows all three, with 0 live instances of any
  wider form in `docs/` today. Discharged via a 3-fixture exercise (indented-fence, column-0-fence,
  no-fence) rather than a full 221-document bundle build (explicitly not run, not claimed) — all
  three report `PIPE-03 preprocessing: 1 nav-footer rewrite(s), guard PASS` identically before and
  after. LINK-06's four legs measured and recorded in `143-EVIDENCE.md`:
  - **(a)** c17's full output byte-compared before/after — `234 files checked, 0 with violations,
    0 total violations`, all 13 counters 0, identical both states.
  - **(b)** the mask-state diff over all 274 `docs/` files — 46 lines change state, all 46
    newly-masked, 0 newly-unmasked, across 11 files, 0 of the 46 matching any of a 12-pattern
    c17-relevance set (all 46 are shell commands inside 3-space-indented numbered-list code fences).
  - **(c)** 0 of the 46 newly-masked lines fall inside a `## Summary` section — the leg the
    12-pattern set structurally cannot reach, since `c17:259-264`'s word count is content-agnostic.
  - **(d)** `check-nav-hub-links.mjs`'s corpus scan unchanged at `0/0/0`, exit 0 — the null result
    for the 2 of 15 sites the draft carried no evidence for.
  - Also recorded the D-20 out-of-census residual: 4 divergent fence-handling classes
    (`check-phase-66.mjs:274`'s bare toggle, 12 unanchored strip sites across `check-phase-54..59`,
    `carve-gate.mjs:65`'s allowlist-fence parser, 4 column-0-only detectors) confirmed present and
    untouched — routed to Plan 08's carry-forward token, not claimed as unified.

## Task Commits

1. **Task 1: GOV-02 pre-edit census + D-35 CRLF discharge** - `a9b5371e` (docs)
2. **Task 2a: c17 + check-nav-hub-links fence unification** - `2c3269ca` (feat)
3. **Task 2b: comment-format fix (one-line, not 3-line)** - `e9a505be` (docs)
4. **Task 2c: retrofit-mermaid-structural + retrofit-nav-hub** - `5d262e01` (feat)
5. **Task 2d: retrofit-guide/reference/runbook/structural** - `ca026ad8` (feat)
6. **Task 3: convert.ps1 tightening + LINK-06 four-leg evidence** - `39ab49e7` (feat)

**Plan metadata:** captured in this SUMMARY commit (below)

## Files Created/Modified

- `scripts/validation/c17-eee-contract.mjs` — `inCodeFence` paired open/close regex (`:158,166`)
  widened to `^ {0,3}(...)`, one-line provenance comment
- `scripts/validation/check-nav-hub-links.mjs` — `buildFenceMask` paired open/close regex
  (`:100,103`) widened, one-line provenance comment (reference instance)
- `scripts/pipeline/retrofit-mermaid-structural.mjs` — `buildFenceMask` paired site (`:268,271`) +
  first-H1-scanner single-toggle site (`:496`) widened, both provenance comments
- `scripts/pipeline/retrofit-nav-hub.mjs` — `buildFenceMask` paired site (`:252,255`) +
  first-H1-scanner single-toggle site (`:481`) widened, both provenance comments
- `scripts/pipeline/retrofit-guide.mjs`, `retrofit-reference.mjs`, `retrofit-runbook.mjs`,
  `retrofit-structural.mjs` — single-toggle first-H1-scanner site widened, one-line provenance
  comment each
- `scripts/pipeline/convert.ps1` — `:108`'s match pattern tightened (3-axis narrowing), explanatory
  comment above the changed line
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — 9 rows appended (one per Pillar-C file, pre-edit
  census, all four D-12/D-33 parts)
- `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` — Plan 07 D-33 census
  + D-35 CRLF discharge section, Task 2 landing summary, Task 3 tightening + LINK-06 four-leg
  evidence + D-20 out-of-census residual sections

## Decisions Made

See frontmatter `decisions` for the full list. Summary: the provenance comments were initially
authored as 2-3 line blocks and compressed to the plan's specified one-line form in a dedicated
follow-up commit once the task text's "one-line" instruction was re-read (caught within the same
task, not carried forward as a deviation); the `convert.ps1` fixture exercise substitutes for a
full bundle build per D-17's own instruction; the 12-pattern relevance probe's emphasis pattern was
tightened mid-task to avoid a false-positive on shell placeholder text, a probe-precision fix
rather than a corpus finding.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Compressed multi-line provenance comments to the plan's specified one-line form**
- **Found during:** Task 2, immediately after landing the first pair of edits
- **Issue:** The task text says "Add a one-line provenance comment at each site"; the first
  implementation used 2-3 line `//` comment blocks at all 8 files.
- **Fix:** Compressed every provenance comment to a single `//` line, re-verified all regression
  gates green after the format change.
- **Files modified:** `scripts/validation/c17-eee-contract.mjs`, `scripts/validation/
  check-nav-hub-links.mjs` (fixed in a dedicated commit before the remaining 6 files were touched,
  which landed with the correct one-line form from the start).
- **Commit:** `e9a505be`

**Total deviations:** 1 auto-fixed (Rule 1, self-caught format correction).
**Impact on plan:** None on substance — the fence-regex edits themselves were correct from the
first commit; only the comment formatting needed correction, fixed before Task 2 completed.

## Issues Encountered

- The plan's cited line numbers for `check-nav-hub-links.mjs`'s paired fence site (`:91,94`) had
  drifted to `:100,103` due to Plan 06's own prior edits to the same file. Located by regex text
  per the plan's own explicit instruction ("locate by the regex text, not by line number alone"),
  confirmed via `Grep` before editing. No other site's cited line number had drifted.
- The plan's acceptance text `grep -c 'C17 assertion-violation-counts:' ... returns 1` measures
  **2** in reality — a pre-existing self-test fixture at `:544` (unrelated to this plan's edit)
  hardcodes the literal string alongside the real summary-print call at `:583`. Recorded as a
  measured deviation from the plan's authored figure (D-36), not silently forced.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- LINK-05 and LINK-06 both discharged: all 15 fence-mask sites carry the unified `^ {0,3}` rule;
  the PowerShell 15th site is framed and ledgered as a tightening, not a widening; c17's output is
  byte-identical before and after across all 234 enrolled files; all four LINK-06 legs are measured
  with the expected 46/0/0 mask-state-diff figures and 0 Summary-section hits.
- No shared `_lib/fence-mask.mjs` module was created (D-16 honored); no detection regex was widened
  (D-21 honored) — the mermaid detectors in c17 and every retrofit stay column-0-anchored.
- The D-20 out-of-census residual (4 divergent fence-handling classes) is named, confirmed
  untouched, and routed to Plan 08's carry-forward token — Phase 143 does not claim a unification
  the repo does not fully have.
- All regression gates green at close: c17 `234/0/0`, `check-nav-hub-links.mjs` `0/0/0` exit 0,
  `check-phase-113/115/120/123/124.mjs` all exit 0, `carve-gate.mjs` `106/106/0` exit 0.
- No blockers for Plan 08.

---
*Phase: 143-link-coverage-fence-mask-unification*
*Completed: 2026-08-11*

## Self-Check: PASSED

- FOUND: all 9 Pillar-C files, `v1.20-GOV-02-LEDGER.md`, `143-EVIDENCE.md`, this SUMMARY
- FOUND commits: `a9b5371e`, `2c3269ca`, `e9a505be`, `5d262e01`, `ca026ad8`, `39ab49e7` in
  `git log --oneline`
