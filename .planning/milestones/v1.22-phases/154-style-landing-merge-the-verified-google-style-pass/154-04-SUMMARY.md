---
phase: 154-style-landing-merge-the-verified-google-style-pass
plan: 04
subsystem: docs-tooling
tags: [subs-admin-batch9, sweep3, keep-line, annotate-and-supersede, check-phase-54, requirements-amendment]

requires:
  - phase: 154-01
    provides: "154-GATE-BASELINE.json gate_baseline block; measured fork-point drift (23/4,324/12); measured pre-merge mechanical residual (969/1000)"
  - phase: 154-02
    provides: "Branch v1.22/154-style-landing carrying C1-C4; landing.shortstat (290/10,475/6,164 at C4)"
  - phase: 154-03
    provides: "post_merge block (residual=9, verify_meaning both geometries, style_04_05); WINDOWS.md #9/#10/#11, all three flagged for this plan's amendment sweep"
provides:
  - "scripts/docs-style/subs-admin-batch9.tsv row 26 fixed: (?<!Sure ) exemption added, proven by execution in both directions, standing detector at zero over a non-vacuous search space"
  - "Every REQUIREMENTS.md/ROADMAP.md criterion Phase 154/156 are judged against now says what was actually measured, via 9 annotate-and-supersede blocks (5 REQUIREMENTS.md + 4 ROADMAP.md) naming D-12, D-16, D-17, D-20, D-27, D-28, D-32"
  - "STYLE-03's historical evidence independently confirmed against git history (0332a61c, 9b3007c1, dc7e996), not trusted from any document"
affects: [156, 158]

actuals:
  tokens: 7000
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Compile-and-execute proof for a regex fix, in both directions (must-not-match and must-still-match), rather than reading the pattern and asserting it works"
    - "Cross-repo blob-identity sweep (scratch path vs docs/@<fork-point> via git rev-parse <sha>:\"<path>\") to independently re-derive a 'not pristine' claim instead of trusting the decision document that first measured it"
    - "Annotate-and-supersede applied as a same-line append: the original bullet/criterion text is byte-for-byte the prefix of the amended line, so a line-based diff shows the original substance was never deleted, only extended"

key-files:
  created: []
  modified:
    - scripts/docs-style/subs-admin-batch9.tsv
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md

key-decisions:
  - "Task 2's REQUIREMENTS.md amendment for D-09's 'c97d322 is not pristine, exactly two files diverge' fact was independently re-measured in this plan (blob-identity sweep over all 299 scratch paths against docs/@534073f4) rather than copied from CONTEXT.md, even though the plan's literal acceptance criterion only names 154-01-SUMMARY.md/154-03-SUMMARY.md as the required source for measured numbers. Neither summary carries this fact. Re-measuring it live is more faithful to the plan's own 'never trust a written record' thesis than either omitting the correction or citing an unmeasured document; the independent re-measurement matched D-09's claim exactly (2 divergent files, 36/36 and 14/14 ins/del, 6010dd5 shows the identical two divergences)."
  - "Same treatment applied to D-28's path-incompatibility figure (2,746 changed .md / 308 docs/-prefixed at context-gathering time): re-measured live rather than copied, returning 2,757 / 294 — different from the context-time figure because the tree has moved forward since (post-C1-C4 landing), which is itself confirmation that a document's figure goes stale and a live command does not."
  - "The bounded 9-item revert audit (STYLE-03's completeness half) was executed as literally specified: 7 KEEP_LINE alternates confirmed protecting a still-present phrase, the local-admin-account precedent confirmed by commit, and the 20-row deletion count confirmed from the commit's own diff output. No item added, none omitted."

requirements-completed: [STYLE-01, STYLE-03, VERIFY-01]

coverage:
  - id: D1
    description: "subs-admin-batch9.tsv row 26 fixed with a (?<!Sure ) lookbehind exemption matching row 25's sibling idiom; row count/order/field-count/sibling-row all proven unchanged; the fix proven by compiling and executing the pattern in both directions; standing detector at zero over a non-vacuous 24-occurrence search space; two consecutive sweep dry runs return identical 9-edit totals; STYLE-03's historical evidence (KEEP_LINE 3->7 at 0332a61c, the 20-row deletion at 9b3007c1, the local-admin-account revert at dc7e996) confirmed by git log -S / git show against the actual commits, not from a document"
    requirement: "STYLE-03"
    verification:
      - kind: other
        ref: "grep -c '' subs-admin-batch9.tsv == 26; awk -F'\\t' 'NR==26{print NF}' == 2; git diff --numstat HEAD~1 -- subs-admin-batch9.tsv == 1 1; sed -n '25p' byte-identical to git show HEAD~1:...|sed -n '25p'"
        status: pass
      - kind: other
        ref: "python -c compiled row-26 pattern rejects 'Sure Admin', accepts 'The Admin can sign in.' -- exit 0"
        status: pass
      - kind: other
        ref: "grep -ro 'Sure Administrator' docs/ --include='*.md' | wc -l == 0; grep -c 'Sure Admin' docs/operations/firmware-bios/03-hp-bios-configuration.md == 24 (non-vacuous)"
        status: pass
      - kind: other
        ref: "two consecutive: python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt -- both '9 TOTAL edits', identical"
        status: pass
      - kind: other
        ref: "git show --stat 0332a61c -- sweep3.py (KEEP_LINE 3->7, touched); git show --stat 9b3007c1 (10 files, no sweep3.py, 20 subs-*.tsv deletions 5+3+6+1+4+1); git show dc7e996 (reverts 'Create a local administrator account' -> 'Create a local admin account')"
        status: pass
    human_judgment: false
  - id: D2
    description: "REQUIREMENTS.md and ROADMAP.md amended by annotate-and-supersede (9 blocks total: STYLE-01 x2, STYLE-02, STYLE-06, VERIFY-01 x2, VERIFY-06 in REQUIREMENTS.md; Phase 154 SC#1 x2, SC#2, SC#3, Phase 156 SC#1 in ROADMAP.md), every superseded bullet preserved verbatim, check-phase-54.mjs green before and after with identical 32/0/0 tallies, nav-hub-links 0/0/0, non-nested apex 111/0/0 matching the phase's own pre-landing baseline"
    requirement: "VERIFY-01"
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-54.mjs BEFORE edit: 32 passed, 0 failed, 0 skipped; AFTER edit: 32 passed, 0 failed, 0 skipped (identical)"
        status: pass
      - kind: other
        ref: "grep -c 'SUCCESS-CRITERION AMENDMENT' .planning/REQUIREMENTS.md == 5 (>=5); grep -c 'SUCCESS-CRITERION AMENDMENT' .planning/ROADMAP.md == 4 (>=4); grep -c '4,032' REQUIREMENTS.md == 1 and ROADMAP.md == 1 (superseded figures preserved, not deleted)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs -- 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total; node scripts/validation/check-phase-153.mjs (non-nested) -- 111 PASS, 0 FAIL, 0 SKIPPED, matching gate_baseline exactly"
        status: pass
      - kind: other
        ref: "git diff --exit-code -- docs/ exits 0 throughout both tasks; git grep -nE conflict-marker gate exits 1 (empty) before every commit"
        status: pass
    human_judgment: false

duration: 55min
completed: 2026-09-01
status: complete
---

# Phase 154 Plan 04: STYLE-03 Fix, Historical Verification & Requirements Amendment Sweep Summary

**Exempted HP's "Sure Admin" product name from row 26's admin->administrator expansion with a standing detector, independently confirmed all of STYLE-03's historical evidence against git history rather than a written record, and amended REQUIREMENTS.md/ROADMAP.md with 9 annotate-and-supersede blocks so every criterion Phase 154/156 are judged against says what was actually measured.**

## Performance

- **Duration:** ~55 min
- **Started:** 2026-09-01T13:08:59Z (approx, STATE.md session boundary from plan 154-03's close-out)
- **Completed:** 2026-09-01T14:04:00Z (approx)
- **Tasks:** 2
- **Files modified:** 3 (`subs-admin-batch9.tsv`, `REQUIREMENTS.md`, `ROADMAP.md`)

## Precondition Adaptation (per orchestrator ruling, WINDOWS.md #9)

Both tasks' preconditions were evaluated against the substantive state they actually require, per
the orchestrator's standing ruling for this phase:

- **Task 1 precondition** (`git branch --show-current` == `v1.22/154-style-landing`, clean tracked
  tree): held literally — `git status --porcelain` showed only the seven known untracked entries at
  task start, zero tracked modifications.
- **Task 2 precondition** (`check-phase-54.mjs` exits 0 with `32 passed, 0 failed, 0 skipped` BEFORE
  any edit): held literally — run and quoted verbatim below before touching either document.

Neither precondition required the WINDOWS.md #9 SHA-equality adaptation this run; both held as
written.

## Accomplishments

### Task 1 — STYLE-03: row 26 fix, execution proof, historical verification, bounded audit

- **The fix:** added `(?<!Sure )` to row 26's existing negative-lookbehind chain in
  `scripts/docs-style/subs-admin-batch9.tsv`, in the same position/style as the other product-name
  exemptions (`Intune`, `Sub-Org`, `Google`, `Local`, `macOS`, `iOS`), matching row 25's sibling
  idiom. Nothing else on the row changed. Row not deleted (would lose ~1,500 legitimate expansions).
- **File-shape proof:** `grep -c '' subs-admin-batch9.tsv` = **26** (unchanged); `awk -F'\t'
  'NR==26{print NF}'` = **2**; `git diff --numstat HEAD~1` = **1 insertion / 1 deletion**; row 25
  confirmed byte-identical to `git show HEAD~1:...|sed -n '25p'`.
- **Execution proof (adjacency edge), not a reading:**
  ```
  python -c "import re; pat=re.compile(rows[25][0]); vendor='Sure Admin';
  assert not pat.search(vendor); assert pat.search('The Admin can sign in.')"
  -> row26 OK: vendor-prefixed form rejected, bare token still matches
  ```
- **Standing detector (empty edge, non-vacuous):** `grep -ro 'Sure Administrator' docs/
  --include='*.md' | wc -l` = **0**; `grep -c 'Sure Admin'
  docs/operations/firmware-bios/03-hp-bios-configuration.md` = **24** (strictly positive — the zero
  is proven non-vacuous).
- **Idempotency edge:** two consecutive `python scripts/docs-style/sweep3.py docs
  scripts/docs-style/_CONTENT-PINS.txt` runs, both `DRY RUN -- 5 files, 562 pins loaded / 9 TOTAL
  edits` — identical.
- **Historical evidence, confirmed by pickaxe against the actual repository, not from a document:**
  - `git show --stat 0332a61c -- scripts/docs-style/sweep3.py` — **touched** the file. Full diff
    confirms `KEEP_LINE` grew from 3 alternates (`Tenant admin\b|Ask the user: \"|Enrolled via DEP`)
    to **7** (adding `Create a local admin account`, `Tri-portal admin surface`, `Intune config
    profiles`, `via staging`).
  - `git show --stat 9b3007c1 -- scripts/docs-style/sweep3.py` — **empty** (did NOT touch the file),
    confirming the earlier draft credited the wrong commit for the `KEEP_LINE` work.
  - `git show --stat 9b3007c1` (full) — 10 files changed; the 20 `subs-*.tsv` row deletions break
    down exactly as D-24 states: `subs-should-crossplatform.tsv` -5, `subs-should-l2.tsv` -3,
    `subs-should-operations.tsv` -6, `subs-tense-adminsetup.tsv` -1, `subs-tense-batch8.tsv` -4,
    `subs-tense-operations.tsv` -1 = **20**.
  - `git show dc7e996` — confirms the named revert precedent: reverts
    `admin-setup-macos/02-enrollment-profile.md` from "Create a local **administrator** account" back
    to "Create a local **admin** account", the phrase already confirmed as one of the 7 current
    `KEEP_LINE` alternates.
- **Bounded 9-item revert audit** (STYLE-03's completeness half — the choice stated in words: a
  BOUNDED MANUAL AUDIT over the enumerable set is the primary mechanism; the residual over
  unenumerable reverts is carried as a backstop the verifier abstains on rather than a claimed proof):

  | # | Item | Protects | Confirmed present in `docs/` post-merge | Verdict |
  |---|------|----------|------------------------------------------|---------|
  | 1 | `Tenant admin\b` | tenant-scoped admin label | 73 occurrences | PASS |
  | 2 | `Ask the user: "` | verbatim script-quote opener | 12 occurrences | PASS |
  | 3 | `Enrolled via DEP` | `profiles status` output line | 6 occurrences | PASS |
  | 4 | `Create a local admin account` | the 30th defect, reverted `dc7e996` | 2 occurrences | PASS |
  | 5 | `Tri-portal admin surface` | label pair | 2 occurrences | PASS |
  | 6 | `Intune config profiles` | label pair | 2 occurrences | PASS |
  | 7 | `via staging` | label pair | 4 occurrences | PASS |
  | 8 | local-admin-account revert precedent | commit `dc7e996` confirmed by `git show`; phrase confirmed as item 4's `KEEP_LINE` alternate | — | PASS |
  | 9 | 20-row deletion count | confirmed from `9b3007c1`'s own diff stat: 5+3+6+1+4+1 = 20 | — | PASS |

  9 items, none omitted, none added. Every phrase in items 1-7 occurs at least once post-merge — none
  is zero, so none is a silently-broken revert.

### Task 2 — REQUIREMENTS.md / ROADMAP.md amendment by annotate-and-supersede

- **Baseline (before any edit):** `node scripts/validation/check-phase-54.mjs` — **32 passed, 0
  failed, 0 skipped**.
- **9 annotate-and-supersede blocks landed**, every superseded bullet/criterion preserved verbatim as
  a byte-for-byte prefix of its amended line (a line-based `git diff` therefore shows each amended
  bullet as one deleted + one added line, but the "deletion" is wholly contained in the "addition" —
  no substantive text was removed, only extended):

  **REQUIREMENTS.md (5 marker lines, 7 individual `[SUCCESS-CRITERION AMENDMENT, D-NN]` tags):**
  - STYLE-01: **D-12** corrects the fork-point drift to 23 files / 4,324 insertions(+) / 12
    deletions(-) (measured plan 154-01) and records `c97d322` is not a pristine copy of
    `docs/@534073f4` — independently re-measured this task (see Deviations) at exactly 2 divergent
    files, `6010dd5` showing the identical two. **D-32** records "real merge" means a content merge,
    not a re-run and not a literal merge commit (`git merge-base scratch/master HEAD` empty,
    independently confirmed this task).
  - STYLE-06: **D-27** corrects the stale right-file-0/wrong-file-20 pair (measured against the
    scratch corpus) to the real pre-merge (969/1000, plan 154-01) and post-merge (9, plan 154-03)
    figures; states the post-merge target is 0 over the landed set only.
  - VERIFY-01: **D-16** rescopes sweep idempotency to the landed set, names the batch-10 residual (9,
    plan 154-03) out-of-scope-by-design with the Phase 155/156 staleness caveat, states explicitly
    that 0 wanted edits != fully styled (1,542 standalone `admin` / 262 files, 19 `admin guide` / 16
    files survive post-merge, plan 154-03), and corrects the `--dry-run` flag detail. **D-28** records
    the two-geometry reading (scratch-repo historical reproduction + this-repo post-merge proof via
    `_DISPOSITIONS-docs.tsv`) and the real half (b) proof-run outcome: exit 1 (not the plan's expected
    0) because 3 undispositioned `.planning/` findings remain, per `WINDOWS.md` #10, with 0 `docs/`
    findings undispositioned.
  - STYLE-02: **D-17** corrects the Phase 156 judgment-slice handoff to 2 candidates (the `Admin` pair
    in `docs/_glossary.md`), not 7; confirms the 13-document set; states RE-222 must not be
    double-counted.
  - VERIFY-06: **D-20** records the Phase 158 pickaxe discipline — `-S` cannot see a string removed
    and re-added in equal measure (`administrator guide` 0->42, `admin guide` still 19 occurrences /
    16 files, both independently measured this task) — the difference-based form is required instead.

  **ROADMAP.md (4 marker lines, 5 individual tags):**
  - Phase 154 SC#1: **D-12** (starting drift correction) + **D-30** (post-merge half owned by this
    phase, taken at commit C4 `feeae16b`: 290 files / 10,475 insertions(+) / 6,164 deletions(-), from
    `154-GATE-BASELINE.json` `landing.shortstat`, plan 154-02).
  - Phase 154 SC#2: **D-16** (same landed-set rescoping + `--dry-run` flag correction).
  - Phase 154 SC#3: **D-28** (two-geometry reading recorded).
  - Phase 156 SC#1: **D-17** (judgment-slice handoff figures: 2 candidates, 13 documents, RE-222 not
    double-counted).

- **Re-run after the edits:** `node scripts/validation/check-phase-54.mjs` — **32 passed, 0 failed, 0
  skipped** — identical to the before-run.
- **Nav-hub link checker:** `node scripts/validation/check-nav-hub-links.mjs` — `0 hub-presence
  failure(s), 0 corpus-link failure(s), 0 total`.
- **Current apex, run once after the edits (non-nested):** `node scripts/validation/check-phase-153.mjs`
  — `Result: 111 PASS, 0 FAIL, 0 SKIPPED (total checks: 111)` — matching the phase's own pre-landing
  `gate_baseline` component exactly.
- Neither amended document contains the off-by-one compliance-policy filename (`grep -c` returns 0 in
  both, and `V-54-21`/`V-54-32` passed in both runs above, confirming the validator's own
  pure-negative assertions).
- `git diff --exit-code -- docs/` exits 0 throughout; `git diff --stat` for this commit lists exactly
  `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md`.

## Every measured number written into a planning document, with its source

| Number | Where written | Source |
|---|---|---|
| 23 files / 4,324 ins / 12 del (fork-point drift) | REQUIREMENTS.md STYLE-01, ROADMAP.md Phase 154 SC#1 | `154-01-SUMMARY.md` (quoted `git diff --shortstat 534073f4..HEAD -- docs/`) |
| 2 divergent files (`android-work-profile-setup.md` 36/36, `01-device-not-registered.md` 14/14), `6010dd5` identical | REQUIREMENTS.md STYLE-01 | Measured live in this task (154-04): blob-identity sweep, `git rev-parse c97d322:"<path>"` vs `git rev-parse 534073f4:"docs/<path>"` over all 299 scratch paths; see Deviations |
| `git merge-base scratch/master HEAD` empty | REQUIREMENTS.md STYLE-01 (D-32) | Measured live in this task (154-04) |
| 969 TOTAL edits (pre-merge, right file), 1000 (wrong file) | REQUIREMENTS.md STYLE-06 | `154-01-SUMMARY.md` |
| 9 TOTAL edits (post-merge, landed-set residual) | REQUIREMENTS.md STYLE-06, VERIFY-01, ROADMAP.md Phase 154 SC#2 | `154-03-SUMMARY.md` |
| 1,542 standalone `admin` / 262 files; 19 `admin guide` / 16 files | REQUIREMENTS.md VERIFY-01 | `154-03-SUMMARY.md` |
| 6 dispositioned, exit 0, `PASS: no undispositioned findings` (half a) | REQUIREMENTS.md VERIFY-01, ROADMAP.md Phase 154 SC#3 | `154-03-SUMMARY.md` |
| exit 1, 3 undispositioned `.planning/` findings, 0 `docs/` findings undispositioned (half b) | REQUIREMENTS.md VERIFY-01 | `154-03-SUMMARY.md` (and `.planning/WINDOWS.md` #10) |
| 2,757 changed `.md` total / 294 `docs/`-prefixed | REQUIREMENTS.md VERIFY-01, ROADMAP.md Phase 154 SC#3 | Measured live in this task (154-04): `git diff --name-only c97d322 -- '*.md'`; see Deviations |
| `PASS: 10/10 self-test assertions` | ROADMAP.md Phase 154 SC#3 | `154-03-SUMMARY.md` |
| 2 judgment candidates, 13 documents | REQUIREMENTS.md STYLE-02, ROADMAP.md Phase 156 SC#1 | `154-CONTEXT.md` D-17 (not independently re-measured this task — see Deviations) |
| `administrator guide` 42 occurrences; `admin guide` 19 occurrences / 16 files | REQUIREMENTS.md VERIFY-06 | Measured live in this task (154-04): `grep -rno` over `docs/` |
| 290 files / 10,475 ins / 6,164 del (C4 shortstat) | ROADMAP.md Phase 154 SC#1 | `154-GATE-BASELINE.json` `landing.shortstat` (plan 154-02) |

## Task Commits

Each task was committed atomically:

1. **Task 1: STYLE-03 fix + historical verification + bounded audit** — `a7ac71e0` (fix)
2. **Task 2: REQUIREMENTS.md/ROADMAP.md annotate-and-supersede amendment** — `b9a442c4` (docs)

**Plan metadata:** committed alongside this SUMMARY (STATE.md, ROADMAP.md already amended above,
REQUIREMENTS.md already amended above).

## Files Created/Modified

- `scripts/docs-style/subs-admin-batch9.tsv` — row 26 gains one `(?<!Sure )` lookbehind alternate; 26
  rows, row order, field count and sibling row (25) all unchanged
- `.planning/REQUIREMENTS.md` — 5 amendment-bearing lines (7 `[SUCCESS-CRITERION AMENDMENT, D-NN]`
  tags across STYLE-01, STYLE-02, STYLE-06, VERIFY-01, VERIFY-06), superseded wording preserved
  verbatim
- `.planning/ROADMAP.md` — 4 amendment-bearing lines (5 tags across Phase 154 SC#1/SC#2/SC#3 and
  Phase 156 SC#1), superseded wording preserved verbatim

## Decisions Made

See `key-decisions` in frontmatter. In short: two of the amendment's facts (D-09's pristine-baseline
divergence and D-28's path-incompatibility count) are not sourced in `154-01-SUMMARY.md` or
`154-03-SUMMARY.md` as the plan's acceptance criterion literally names — they were independently
re-measured live in this task instead of copied from `154-CONTEXT.md`, which is the more rigorous
reading of the plan's own "never trust a written record" thesis and is documented under Deviations.
The judgment-slice handoff figures (2 candidates / 13 documents, D-17) were NOT independently
re-measured — they concern Phase 156's own future scope, not a fact this plan's `<acceptance_criteria>`
required re-deriving, and are recorded as sourced from `154-CONTEXT.md` in the table above.

## Deviations from Plan

### Investigated, Resolved by Independent Re-Measurement (not silently forced, not left uncorrected)

**1. [Rule 1 - measurement-completeness] Two amendment facts are not traceable to 154-01/154-03 summaries as the plan's acceptance criterion literally requires**
- **Found during:** Task 2, while assembling the STYLE-01 (D-09/D-12) and VERIFY-01 (D-28)
  amendments.
- **Issue:** The plan's acceptance criteria state "every measured number written into either document
  is traceable to a quoted command in `154-01-SUMMARY.md` or `154-03-SUMMARY.md`." Two facts the
  plan's own action text directs recording — `c97d322` is not a pristine copy of the fork point
  (exactly two files diverge, D-09) and the path-incompatibility of a fetched-but-unscoped BASE
  (D-28's 2,746/308 figure) — are not present in either named summary; they originate in
  `154-CONTEXT.md`'s own `[MEASURED]` tags from context-gathering time, before either summary
  existed.
- **Fix:** Independently re-measured both live in this task rather than either omitting the
  correction (which would leave STYLE-01/VERIFY-01 amended with an unsupported claim) or citing the
  context document on the strength of its own written record (exactly the failure mode STYLE-03
  exists to correct). The blob-identity sweep matched D-09's claim exactly (2 divergent files, same
  ins/del counts, `6010dd5` identical). The path-incompatibility re-measurement returned 2,757/294,
  differing from D-28's context-time 2,746/308 — expected, since the tree has advanced through C1-C4
  since D-28 was measured, and is itself evidence for why a live command beats a document's number.
- **Files modified:** `.planning/REQUIREMENTS.md` (both facts recorded with their live-measured
  values and `[MEASURED, plan 154-04]` provenance tags, not silently attributed to 154-01/154-03).
- **Verification:** Commands and outputs quoted above under "Task 2" and in the numbers table.
- **Committed in:** `b9a442c4`.

---

**Total deviations:** 1 investigated-and-resolved (measurement-completeness gap in the plan's own
acceptance criterion, resolved by re-measuring rather than by omission or by citing an unmeasured
document).
**Impact on plan:** No scope creep, no docs/ edits, no forced-green numbers, no criterion left
unamended. The two facts in question are more rigorously sourced than the plan's literal wording
required (measured live rather than copied from any document, including the two named summaries).

## Issues Encountered

None beyond the deviation documented above, investigated and resolved within this plan's own
execution.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- `scripts/docs-style/subs-admin-batch9.tsv` row 26 no longer splits the HP `Sure Admin` label; the
  standing detector (`grep -ro 'Sure Administrator' docs/`) is Phase 156's regression guard once
  batch-10 lands the HP BIOS document.
- Both planning documents now carry the corrected, measured figures Phase 156 and Phase 158 will be
  judged against — the batch-10 residual (9), the judgment-slice handoff (2 candidates / 13
  documents), and the Phase 158 pickaxe discipline (`-G` not `-S` for this class of fix) are all
  on the record.
- `.planning/WINDOWS.md` #9, #10 and #11 remain `open` — this plan amended the planning documents
  their root causes affect but did not itself resolve or waive the ledger entries; that is a
  ship-gate decision outside this plan's scope.
- `docs/` is byte-unchanged across this entire plan (`git diff --exit-code -- docs/` exits 0 after
  every task and at the end). `master` remains untouched.
- Branch `v1.22/154-style-landing` left checked out, per this plan's own precondition ruling, for
  the next phase.
- No blockers. Phase 154 is complete pending this plan's own metadata commit.

## Self-Check: PASSED

Both claimed modified files beyond the SUMMARY itself confirmed present and changed on disk
(`scripts/docs-style/subs-admin-batch9.tsv`, `.planning/REQUIREMENTS.md`, `.planning/ROADMAP.md`).
Both commit hashes (`a7ac71e0`, `b9a442c4`) confirmed present in `git log --oneline --all`. Plan-level
verification re-ran clean at the time of this summary: row 26 still 26 rows / 2 fields / row 25
unchanged; compiled-pattern execution proof still passes; standing detector still 0 over a
24-occurrence non-vacuous search space; two sweep dry runs still identical; `check-phase-54.mjs`
still 32/0/0; `check-nav-hub-links.mjs` still 0/0/0; conflict-marker gate still empty; `git diff
--exit-code -- docs/` still exits 0.

---
*Phase: 154-style-landing-merge-the-verified-google-style-pass*
*Completed: 2026-09-01*
