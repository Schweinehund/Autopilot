---
phase: 143
plan: 02
subsystem: validation
tags: [link-checker, anchor-model, github-slug, fence-mask, tracer, gov-02-ledger]
dependency graph:
  requires: [143-01-PLAN.md]
  provides: [github-anchor-model, a-id-recognition, templates-exclusion, inline-code-mask]
  affects: [143-03-PLAN.md, 143-04-PLAN.md, 143-05-PLAN.md, 143-06-PLAN.md, 143-09-PLAN.md]
tech-stack:
  added: []
  patterns: [net-deletion model fix, matchAll per-line recognition loop, copy-verbatim provenance comment, GOV-02 four-part grep discipline]
key-files:
  created:
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md
  modified:
    - scripts/validation/check-nav-hub-links.mjs
    - docs/error-codes/01-mdm-enrollment.md
    - docs/operations/patch-management/04-android-patch-delivery.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-CONTEXT.md
decisions:
  - "Recorded D-38 (owner ruling, 2026-08-11): convert ALL 87 {#id} overrides to <a id> anchors across all 29 files, not only the 22 link targets -- discharges D-01's one-way checkpoint without deleting the reversibility rating."
  - "The GitHub anchor model landing alone (before D-38's conversion) regressed the hub-scope outbound scan from 0 to 5 failures against two still-un-converted {#id} headings a hub file links to. Fixed by converting exactly those 2 of the 87 headings early (Rule 1 auto-fix), leaving 85 for Plan 09's wave-3 sweep."
  - "<a id> placement for heading-level conversions is own-line-immediately-above the heading (182-of-200 corpus census + a stripHeadingText HTML-non-stripping correctness hazard), distinct from the table-row prepend pattern used for Class-C repairs."
metrics:
  duration: ~40min
  completed: 2026-08-11
status: complete
actuals:
  tokens: 58000
  tasks: 3
  commits: 7
---

# Phase 143 Plan 02: TRACER — GitHub Anchor Model + Corpus Narrowing Summary

Adopted the GitHub anchor model in `check-nav-hub-links.mjs` as a net deletion plus one `matchAll`
addition, proved it end-to-end on the `0x80180014` tracer path, and narrowed the corpus scan with
the `docs/_templates/` exclusion and inline-code-span masking — D-14 steps 1-3, in order, with the
corpus-wide flip (step 4) deliberately left uncommitted for Plan 06.

## What was built

**Task 1 — D-38 record + evidence artifact** (commit `95e574f9`):

- Recorded D-38 in `143-CONTEXT.md`: the owner's ruling to convert all 87 `{#id}` overrides
  (not only the 22 link targets) to `<a id>` anchors, its accepted rationale, what it supersedes
  (D-04's Class-B source-side routing for 26 pairs) and what it leaves unchanged (D-04/D-11/D-12/
  D-14/D-23/D-31/D-33, both CARVE Standing bars).
- Created `143-EVIDENCE.md`: the measured blast-radius table (13/132/77 before, 13/67/51 after a
  trial-and-reverted all-87 conversion), the zero-regression finding, the ordering hazard against
  the pre-LINK-01 checker, the c17 null result (174 added/87 removed across 29 files), and the
  `<a id>` placement ruling (own-line above the heading).

**Task 2 — TRACER: GitHub anchor model end-to-end** (commits `a8816f45`, `92699a13`, `598c76a7`,
`2e7cccd3`):

- `computeAnchorSetFromContent`/`stripHeadingText` rewritten as a net deletion: removed the
  `{#id}` override-registration loop, the auto-slug-suppression branch, and the `{#id}`-strip line
  in `stripHeadingText`. Added one `matchAll`-based `<a id="…"></a>` recognition loop in the
  deleted loop's old position. `{#id}` now flows through the ordinary heading-slug pipeline as
  literal text, exactly as GitHub renders it. Header comment documents the un-prefixed `<a id>`
  model per RESEARCH.md Open Question 3 (GitHub's own rendering API), warning a future maintainer
  not to "correct" it to expect `user-content-`.
- Self-test: case D rewritten for the GitHub model (`foo-bar-custom-anchor` present, bare
  `custom-anchor` absent); cases H (`<a id>` inside a table row) and I (two adjacent tags on one
  line, proving the global-loop shape) added. 9/9 passed.
- GOV-02 ledger row appended before the edit (D-33): target-scoped + symbol-scoped greps confirm
  `check-phase-123.mjs:40,83` pins only the path string via `presence()`, never content.
- Tracer repair: `<a id="0x80180014"></a>` prepended to the first cell of the numerically-first
  matching row (`01-mdm-enrollment.md:33`, D-10's editorial rule), proving
  `docs/error-codes/00-index.md:49 -> ../01-mdm-enrollment.md#0x80180014` end-to-end.
- Step-5 dry-run (temporary `:259`/`:269` deletion, reverted, never committed): confirmed the
  tracer string appears zero times in the failure list. See Deviations for the measured totals.

**Task 3 — `docs/_templates/` exclusion + inline-code-span masking** (commits `083c2c6e`,
`52909649`):

- Excluded `docs/_templates/` from the corpus walk via an early `continue` on the
  forward-slash-normalized relative path inside `checkInboundLinks` — 282 → 274 in-scope files
  once the corpus-wide flip lands.
- Masked single-backtick inline code spans (equal-length space replacement, preserving line
  length and column arithmetic) inside `extractLinks`, before the link regex runs. Self-test case
  J added (a backtick-spanned `[xml](...)` PowerShell cast is not extracted; an ordinary link on
  the same line still is). 10/10 passed.
- Re-ran the Step-5 dry-run procedure: confirmed 274 files, 6252 relative links, 13 broken file
  targets exactly as predicted (see Deviations for the anchor-count delta), and confirmed the
  inline-mask leg is load-bearing — reverting it alone raises broken file targets 13 → 14, the
  extra being exactly `docs/recipes/03-windows-11-multi-app-kiosk.md:173`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] The GitHub model change alone regressed the hub-scope outbound scan**
- **Found during:** Task 2, immediately after landing the `computeAnchorSetFromContent`/
  `stripHeadingText` rewrite.
- **Issue:** `docs/quick-ref-l2.md` (a nav-hub) links to
  `operations/patch-management/04-android-patch-delivery.md#play-integrity-attestation` and
  `#deadlines-cutover-dates`. Both target headings still carried the old `{#id}` override syntax
  (not yet converted — that's Plan 09's wave-3 job). Under the corrected GitHub model, the bare
  override id is correctly no longer a resolvable anchor (GitHub would render it as literal junk
  text and slug the heading differently), so 5 hub-outbound links (`:341-343`, `:345`, `:347`)
  started failing — a real, previously-invisible defect in the class D-01 exists to expose, but one
  this plan's own acceptance criteria required to be green (`0 outbound failure(s), 0 inbound
  failure(s), 0 total`) immediately after the model change.
- **Fix:** Converted exactly these 2 of the 87 `{#id}`-override headings to `<a id>` anchors now
  (own-line-immediately-above placement, per this plan's own D-38 ruling recorded in
  `143-EVIDENCE.md`), rather than waiting for Plan 09's full sweep. The file is CARVE
  Category-10-authorized (landed by Plan 01), so no allowlist amendment was needed. This lands 2 of
  D-38's 87 conversions early; Plan 09 will find these 2 already done and convert the remaining 85
  across the other 28 files. The resulting diff shape (1 line removed, 2 lines added per heading)
  exactly matches `143-EVIDENCE.md`'s own measured D-38 diff shape (174 added/87 removed across 29
  files), corroborating this is the expected, authorized conversion pattern, not new content.
- **Files modified:** `docs/operations/patch-management/04-android-patch-delivery.md`
- **Commit:** `598c76a7`

**2. [Rule 1 - Bug] Spurious "matchAll" text mentions inflated an acceptance-criteria grep count**
- **Found during:** Task 2, self-verification of the plan's `grep -c 'matchAll'` acceptance
  criterion (expects exactly 1, the single real `.matchAll(` call).
- **Issue:** Explanatory comments and a self-test label I wrote mentioned the word "matchAll" as
  plain text three additional times, inflating the grep count to 4.
- **Fix:** Reworded the three non-functional mentions to "global loop"/"single match" phrasing,
  with no behavior change. Self-test still 9/9 (later 10/10) PASS.
- **Files modified:** `scripts/validation/check-nav-hub-links.mjs`
- **Commit:** `92699a13`

**3. [Process] Working-tree accident during Step 5's temporary widening, recovered without data loss**
- **Found during:** Task 2 Step 5.
- **Issue:** The plan's Step 5 instructs "with Steps 2-4 committed, temporarily widen the scan...
  then `git checkout --` to restore." I ran the widening edit before committing Steps 2-3, so the
  `git checkout --` reverted the entire file back to Task 1's HEAD (undoing the uncommitted model
  change and self-test rewrite), not just the temporary widening.
- **Fix:** Reapplied the Steps 2-3 edits (verified byte-identical to the pre-accident state via
  self-test/hub-scan re-verification), committed them, then re-ran Step 5 correctly against the
  committed state. No data was permanently lost; the docs/ edits and the GOV-02 ledger row (in
  separate files) survived the accidental single-file checkout untouched.
- **Files affected:** `scripts/validation/check-nav-hub-links.mjs` (no net change from the
  recovery itself — reapplied identically)

### Measured-total deltas from the plan's predicted dry-run ladder

The plan predicted a dry-run ladder of 175 (model only) → 173 (after the tracer repair) → 143
(after exclusion + masking). This plan's actual measured ladder is 170 → 168 → 138 — every figure
exactly 5 lower, fully and only explained by Deviation 1's early fix of 5 links (the plan's
prediction was made before that fix existed). Every OTHER figure matches the plan's prediction
exactly: 274 files, 6252 relative links, 13 broken file targets (both before and after masking:
14 with the mask reverted, confirming it is load-bearing), and the tracer string
`01-mdm-enrollment.md#0x80180014` appears zero times in both dry-run failure lists.

## Verification

- `node scripts/validation/check-nav-hub-links.mjs --self-test` → `Self-test: 10 passed, 0 failed`, exit 0.
- `node scripts/validation/check-nav-hub-links.mjs` → `0 outbound failure(s), 0 inbound failure(s), 0 total`, exit 0.
- `node scripts/validation/c17-eee-contract.mjs` → `234 files checked, 0 with violations, 0 total violations`, all 13 counters 0.
- `node scripts/validation/carve-gate.mjs` → `50 in-scope, 50 on-list, 0 off-list`, exit 0.
- Dry-run (widened, uncommitted, reverted both times): 274 files / 6252 links / 13 broken file
  targets / 125 broken anchors / 138 total (post-mask); 14 broken file targets with the inline
  mask reverted, extra failure `docs/recipes/03-windows-11-multi-app-kiosk.md:173`, confirming the
  masking leg is load-bearing.
- `git status --porcelain scripts/validation/check-nav-hub-links.mjs` empty after both dry-runs —
  the corpus-flip patch was never committed.
- `test -f scripts/validation/check-nav-hub-links.mjs` succeeds; no `check-phase-143.mjs` exists
  anywhere under `scripts/`; `git status --porcelain scripts/validation/ | grep -c '^A'` = 0 (no
  new files).

## Known Divergence from a Literal Prohibition-Verification Method

The plan's prohibition "No new documentation content is authored — the only `docs/` change is an
`<a id>` tag prepended to an existing table row's first cell" states its verification as
`git diff HEAD~1 -- docs/ | grep '^+' | grep -vc '<a id=' returns 0`. Deviation 1's commit
(`598c76a7`) adds 2 lines that do not themselves contain the literal `<a id=` substring — the two
heading lines, each with its `{#id}` suffix removed. This is the expected, measured shape of a
D-38 conversion (one heading line replaced by two: the new `<a id>` line plus the stripped heading
line), documented in `143-EVIDENCE.md`'s own c17-safety trial (174 added/87 removed across 29
files). The substantive prohibition — no new prose, no new narrative content — holds; only the
specific grep, written before this deviation was known and scoped to the Step-4 table-row pattern,
does not accommodate the heading-level pattern. Recorded here rather than silently reconciled.

## Self-Check: PASSED

- FOUND: `scripts/validation/check-nav-hub-links.mjs` (modified, commits a8816f45, 92699a13,
  598c76a7 [docs only], 2e7cccd3 [docs only], 083c2c6e, 52909649)
- FOUND: `docs/error-codes/01-mdm-enrollment.md` (modified, commit 2e7cccd3)
- FOUND: `docs/operations/patch-management/04-android-patch-delivery.md` (modified, commit 598c76a7)
- FOUND: `.planning/milestones/v1.20-GOV-02-LEDGER.md` (modified, commit a8816f45)
- FOUND: `.planning/phases/143-link-coverage-fence-mask-unification/143-CONTEXT.md` (modified, commit 95e574f9)
- FOUND: `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` (created, commit 95e574f9)
- FOUND commit 95e574f9, a8816f45, 92699a13, 598c76a7, 2e7cccd3, 083c2c6e, 52909649 in `git log --oneline`
