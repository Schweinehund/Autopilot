---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
plan: 07
subsystem: docs-tooling-authoring-standard
tags: [std-01, std-03, std-04, google-style, authoring-standard, wiring, corpus-scope]

requires:
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 04
    provides: "scripts/validation/check-prose-style.py, the STD-02 mechanical gate this
      plan cross-references and re-verifies stays green after every edit"
  - phase: 157-std-hyg-authoring-standard-corpus-hygiene
    plan: 06
    provides: "HYG-06/HYG-07 closure, leaving this plan free to run independently as the
      phase's final, C17-constrained authoring plan"
provides:
  - "docs/_standards/EEE-SOP-standard.md: new ## Prose Style Authoring Standard section
    (D-01..D-05) recording the standing non-gate rule, the 26-vs-19 mandate-promotion
    hazard, the passive-to-active actor-invention hazard, the 294-vs-237-file corpus-scope
    resolution, and the tooling-pairing / two-copy divergence risk -- pinned in both pin
    files before any later sweep reaches it"
  - "The standing non-gate rule ('never mandate a rule set whose checker cannot report
    zero on work already accepted') written into its other two required homes: check.py's
    module docstring (printed on a bare invocation) and scripts/docs-style/RESUME.md"
  - "The passive-to-active hazard, which had no home anywhere in the skill set, added to
    google-style/SKILL.md's Common mistakes list beside the existing quoted-error-message
    anti-pattern, pointing at references/voice.md"
  - "Nine authoring surfaces (CLAUDE.md + all eight docs/_templates/*.md) wired to the new
    section by path and heading, each provably followable rather than merely asserting the
    standard exists"
affects: [158, 159]

actuals:
  tokens: 2118
  raw_tokens: 8470
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Version-History-only milestone attribution for an identifier-free heading: STD-0*
      has four live meanings in this file's own namespace (three v1.15 requirements, two
      existing sections, and the meta-doc ID), so the new section carries no requirement
      identifier in its heading and the v1.22 STD-01..STD-04 attribution lives solely in
      the Version History row -- matching where both precedent sections (STD-04, STD-05)
      put their own milestone tokens."
    - "Prose-not-blockquote hazard recording: both measured rewrite hazards are written as
      ordinary paragraphs, never as a blockquote, because C17 assertion #12 caps a
      contiguous top-level blockquote run at 200 characters and the mandate-promotion
      hazard's existing home (google-style-verify/SKILL.md:104-121) is already a ~900-
      character blockquote -- copying that shape into this C17-enrolled file would be an
      immediate hard failure."
    - "Nine-surface wiring proven by a paired grep (section name + file path in all nine
      files), not by the link checker -- check-nav-hub-links.mjs excludes docs/_templates/
      as a link *source*, so a template pointer to the standard is structurally invisible
      to that validator, permanently."

key-files:
  created: []
  modified:
    - docs/_standards/EEE-SOP-standard.md
    - scripts/docs-style/_CONTENT-PINS.txt
    - scripts/docs-style/_PINNED-HEADINGS.txt
    - .claude/skills/google-style/check.py
    - scripts/docs-style/RESUME.md
    - .claude/skills/google-style/SKILL.md
    - CLAUDE.md
    - docs/_templates/admin-template.md
    - docs/_templates/admin-template-android.md
    - docs/_templates/admin-template-ios.md
    - docs/_templates/admin-template-macos.md
    - docs/_templates/l1-template.md
    - docs/_templates/l2-template.md
    - docs/_templates/recipe-template.md
    - docs/_templates/reference-template.md

key-decisions:
  - "The new section states explicitly that it governs the whole 294-file tracked corpus
    the mechanical gate scans, not only the 237-file EEE-enrolled subset the rest of this
    document governs -- resolving the 57-file mismatch (docs/operations/ and the other
    directories with no doc_id) in prose rather than leaving it implicit, per D-29."
  - "last_verified (2026-07-04) and review_by (2026-10-02) are byte-unchanged. The new
    Version History row states this deliberately: a review date records when the file's
    review cycle last completed, not when its newest section was written -- matching
    neither the v1.18 nor the v1.21 amendment having advanced them either."
  - "No edit was made to .claude/skills/google-style-verify/SKILL.md, per D-34. The
    mandate-promotion hazard is already fully documented there (lines 104-121, plus the
    self-indictment at 195-197); adding a second copy in a second file would create the
    exact divergence risk this plan records, not reduce it."
  - "The two-copy skill divergence risk is recorded in three places: the new standard
    section (D-05), this SUMMARY, and implicitly guarded by the byte-diff assertion against
    google-style-verify/ in Task 2's verify block. The untracked global skill copy and the
    tracked project copy are byte-identical today; which one a session loads is
    environment-dependent; the verifier skill exists only at project level, so a
    global-only session has the rewriter without the verifier -- the exact pairing STD-01
    requires."
  - "No amendment was made to check-phase-153.mjs or any file under .github/. The gate stays
    exactly as standalone and unchained as Phase 159 expects to find it, per D-32/D-35 --
    a presence-of-wiring assertion has a milestone lifetime and belongs in Phase 159's leaf,
    not in this phase's authoring commit."

requirements-completed: [STD-01, STD-03, STD-04]

coverage:
  - id: D1
    description: "The Prose Style Authoring Standard section exists exactly once in
      EEE-SOP-standard.md, carries no requirement identifier, sits before Version History,
      is preceded by a horizontal rule, and is pinned in both pin files which each grew by
      exactly one line (562->563, 186->187, no re-sort)"
    requirement: STD-04
    verification:
      - kind: other
        ref: "grep -cxF exact-match assertions for the heading in the standard, both pin
          files, plus the awk positional check for rule-then-heading-before-Version-History
          (Task 1 <verify> block, PLAN 157-07)"
        status: pass
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs -> 237 files checked, 0 with
          violations, 0 total violations"
        status: pass
    human_judgment: false
  - id: D2
    description: "The section body states both measured rewrite hazards as prose (26
      STRENGTHENED vs 19 INVERTED across 406 judged hunks; the passive-to-active
      actor-invention mechanism), the non-gate report-zero rule, and the 294-vs-237-file
      corpus-scope resolution, with zero occurrences of the .planning/ literal prefix"
    requirement: STD-04
    verification:
      - kind: other
        ref: "grep assertions for '26', '19', 'passive', 'report zero' inside the section
          span, plus a zero-count assertion for the literal prefix (Task 1 <verify> block)"
        status: pass
      - kind: other
        ref: "grep -rc '\\.planning/' docs/ --include='*.md' summed to 0 (corpus-wide,
          re-broken risk explicitly called out in must_haves.key_links)"
        status: pass
    human_judgment: false
  - id: D3
    description: "The standing non-gate rule appears in all three required homes (the new
      standard section, check.py's module docstring, and RESUME.md) and reaches a user who
      invokes check.py with no arguments; google-style-verify/ remains byte-unchanged"
    requirement: STD-03
    verification:
      - kind: other
        ref: "python -c ast-parse assertion that check.py's docstring still contains
          --no-headings AND the new rule; python check.py (bare) piped to grep -qi 'report
          zero'; grep -qi 'report zero' across RESUME.md and the standard (Task 2 <verify>
          block, PLAN 157-07)"
        status: pass
      - kind: other
        ref: "git diff --exit-code -- .claude/skills/google-style-verify/ -> exit 0"
        status: pass
    human_judgment: false
  - id: D4
    description: "The passive-to-active hazard, which had no home anywhere in the skill
      set, is added to google-style/SKILL.md's Common mistakes list beside the existing
      quoted-error-message anti-pattern, naming the actor-invention mechanism and pointing
      at references/voice.md"
    requirement: STD-04
    verification:
      - kind: other
        ref: "grep -qiE 'passive' and 'actor' and grep -qF 'voice.md' against
          google-style/SKILL.md (Task 2 <verify> block)"
        status: pass
    human_judgment: false
  - id: D5
    description: "All nine authoring surfaces (CLAUDE.md + all eight docs/_templates/*.md)
      name both the exact section heading and the exact standards-file path, so each
      pointer is followable rather than a bare assertion that a standard exists; CLAUDE.md
      additionally names the google-style-verify pairing for bulk rewrites"
    requirement: STD-01
    verification:
      - kind: other
        ref: "paired 9-file grep for the section name and for the standards-file path
          (Task 3 <verify> block, PLAN 157-07); grep -qiE
          'google-style-verify|verifier' CLAUDE.md"
        status: pass
      - kind: other
        ref: "git ls-files 'docs/_templates/*.md' == 8 AND git diff --name-only --
          docs/_templates/ == 8 (no template added or removed)"
        status: pass
    human_judgment: false
  - id: D6
    description: "The phase's mechanical guardrails are unmoved by this plan's authoring:
      C17 stays 237/0, the STD-02 prose-style gate exits 0 (self-test 7/0 plus a live run),
      the apex chain (check-phase-153.mjs) matches 157-BASELINE.json's recorded 111/0/0
      exactly, and check-phase-153.mjs / .github/ carry no new reference to the gate"
    requirement: STD-04
    verification:
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs (237/0) after every task; python
          scripts/validation/check-prose-style.py --self-test (7 passed, 0 failed) and a
          normal run (exit 0) after Task 2; node scripts/validation/check-phase-153.mjs
          (111 PASS, 0 FAIL, 0 SKIPPED) and node scripts/validation/check-nav-hub-links.mjs
          (0/0/0) after Task 3"
        status: pass
      - kind: other
        ref: "test -z \"$(git status --porcelain -- .github/)\" && grep -c
          'check-prose-style' scripts/validation/check-phase-153.mjs (0 matches, .github/
          untouched)"
        status: pass
    human_judgment: false

duration: 55min
completed: 2026-09-06
status: complete
---

# Phase 157 Plan 07: Prose Style Authoring Standard + Nine-Surface Wiring Summary

**A new `## Prose Style Authoring Standard` section in `EEE-SOP-standard.md` recording both measured rewrite hazards (26-vs-19 mandate promotion, passive-to-active actor invention) and the standing non-gate rule in all three of its required homes, pinned before any future sweep reaches it and wired into CLAUDE.md plus all eight document templates -- with C17, the STD-02 gate, and the apex chain all re-measured green, matching `157-BASELINE.json` exactly.**

## Performance

- **Duration:** 55 min
- **Started:** 2026-09-06T01:33:00Z (approx.)
- **Completed:** 2026-09-06T02:28:12Z
- **Tasks:** 3
- **Files modified:** 15

## Accomplishments

- **Authored the Prose Style Authoring Standard section** in `docs/_standards/EEE-SOP-standard.md`, immediately before the horizontal rule that precedes the terminal `## Version History` heading, matching the shape of the two precedent sections (STD-04, STD-05). The heading carries no requirement identifier -- the `v1.22 STD-01..STD-04` attribution lives only in a new Version History row, avoiding a collision with the four other live meanings `STD-0*` already carries in this file's own namespace.
- **Pinned the new heading in both pin files** before Phase 158's sweep can reach an unpinned normative section: `_CONTENT-PINS.txt` grew from 562 to 563 lines (unordered append) and `_PINNED-HEADINGS.txt` grew from 186 to 187 lines (inserted alphabetically after `## Prerequisites`, no re-sort of the rest of the file).
- **Both measured hazards are recorded as prose, never as a blockquote:** the mandate-promotion hazard (26 STRENGTHENED against 19 INVERTED, 360 preserved, 1 weakened, across 406 judged hunks -- read from `_JUDGE-VERDICTS.json`'s own `counts` key) and the passive-to-active hazard (the only rewrite rule that can invent a fact, because a passive-voice source sentence may withhold its actor deliberately; ruled default is the reader). Writing either as a blockquote would have crossed C17 assertion #12's 200-character contiguous-blockquote cap -- the mandate hazard's existing home in `google-style-verify/SKILL.md:104-121` is itself a ~900-character blockquote run, which is exactly the shape this section had to avoid.
- **Resolved the corpus-scope question explicitly:** the new section states that it governs the whole 294-file tracked corpus the mechanical gate scans, not only the 237-file EEE-enrolled subset the rest of the document governs -- naming the 57-file gap (`docs/operations/` and the other no-`doc_id` directories) rather than leaving the mismatch implicit.
- **The standing non-gate rule now lives in all three required homes:** the new standard section, `check.py`'s module docstring (printed verbatim on a bare invocation), and `scripts/docs-style/RESUME.md` (in its own self-contained section that explicitly does not endorse the rest of that file's untrusted narrative).
- **The passive-to-active hazard, which had no home anywhere in the skill set, was added** to `google-style/SKILL.md`'s Common mistakes list beside the existing quoted-error-message anti-pattern, pointing at `references/voice.md`. No edit was made to `google-style-verify/SKILL.md` -- confirmed byte-unchanged by `git diff --exit-code`.
- **Wired nine authoring surfaces** (`CLAUDE.md` plus all eight `docs/_templates/*.md` files) to the new section by exact heading and exact path, proven by a paired 9-file grep rather than the link checker, which structurally excludes `docs/_templates/` as a link *source* and would never catch a broken template pointer. `CLAUDE.md` additionally names the `google-style-verify` pairing for bulk rewrites, not only the authoring skill.
- **Every mechanical guardrail re-measured green after each task:** C17 stayed at 237 files checked / 0 violations throughout; the STD-02 gate (`check-prose-style.py`) self-test held at 7 passed / 0 failed and its live run stayed exit 0; the apex chain (`check-phase-153.mjs`) reported 111 PASS / 0 FAIL / 0 SKIPPED, matching `157-BASELINE.json`'s recorded apex exactly; `check-nav-hub-links.mjs` reported 0/0/0; the corpus-wide `.planning/` literal needle stayed at 0; and no reference to the gate was added to `check-phase-153.mjs` or any file under `.github/`.

## Task Commits

Each task was committed atomically:

1. **Task 1: Author the Prose Style Authoring Standard section and pin its heading** - `83660691` (feat)
2. **Task 2: Give the standing rule its other two homes and the passive hazard its missing one** - `9da028e7` (feat)
3. **Task 3: Wire the standard into CLAUDE.md and all eight document templates** - `19b352d7` (feat)

**Plan metadata:** recorded in this SUMMARY's own commit (below).

## Files Created/Modified

- `docs/_standards/EEE-SOP-standard.md` - new `## Prose Style Authoring Standard` section (D-01..D-05) plus a new Version History row; `last_verified`/`review_by` byte-unchanged
- `scripts/docs-style/_CONTENT-PINS.txt` - new pin line appended (562 -> 563)
- `scripts/docs-style/_PINNED-HEADINGS.txt` - new pin line inserted alphabetically (186 -> 187), rest of file byte-unchanged
- `.claude/skills/google-style/check.py` - module docstring gains the standing non-gate rule, original usage content preserved
- `scripts/docs-style/RESUME.md` - new self-contained Standing rule section appended
- `.claude/skills/google-style/SKILL.md` - new Common-mistakes bullet for the passive-to-active hazard, citing `references/voice.md`
- `CLAUDE.md` - new Documentation Authoring section naming the authoring skill, the verifier pairing, and the standard's path/heading
- `docs/_templates/admin-template.md`, `admin-template-android.md`, `admin-template-ios.md`, `admin-template-macos.md`, `l1-template.md`, `l2-template.md`, `recipe-template.md`, `reference-template.md` - one new `Rules:` bullet each, pointing at the standard by path and heading, placed beside the existing Draft -> Approved promotion bullet

## Decisions Made

See `key-decisions` in frontmatter above for the full list. Highlights: the corpus-scope resolution (whole 294-file tracked corpus, not only the 237-file EEE-enrolled subset) is stated explicitly rather than left implicit; `last_verified`/`review_by` are deliberately not advanced, with that choice recorded in the Version History row itself; `google-style-verify/SKILL.md` receives no edit, since the mandate-promotion hazard is already fully documented there and a second copy would create the exact divergence risk this plan records; the gate stays unamended and unchained, exactly as standalone as Phase 159 expects to find it.

## Deviations from Plan

None - plan executed exactly as written. All three tasks' `<action>` instructions were followed as specified: the section landed at the exact insertion point the plan named (immediately before the horizontal rule preceding `## Version History`), both hazards were taken verbatim from their measured sources (`_JUDGE-VERDICTS.json`'s `counts` key: `{STRENGTHENED: 26, PRESERVED: 360, INVERTED: 19, WEAKENED: 1}`), the pin insertions matched the plan's named alphabetical position and left both files otherwise byte-unchanged, and the nine wiring edits used the plan's named anchor line (the existing Draft -> Approved promotion bullet, present verbatim in all eight templates) as the insertion point.

**Total deviations:** 0.
**Impact on plan:** None - no scope creep, no auto-fixes required.

## Issues Encountered

None.

## Two-Copy Skill Divergence Risk (recorded per Task 3's instruction)

`~/.claude/skills/google-style/` (untracked, outside this repository) and `.claude/skills/google-style/` (tracked, this project) are byte-identical today. Which copy a given session loads is environment-dependent. `google-style-verify` exists **only** at the project level -- a session that loads only the global/untracked skill copies has the rewriter without the verifier, which is the exact pairing STD-01 requires for any bulk prose rewrite. This risk is recorded here and in the new standard section's D-05; no guard was built against it, per the plan's scope (recording, not tooling, was the deliverable).

## `last_verified` / `review_by` Decision (recorded per Task 1's instruction)

`docs/_standards/EEE-SOP-standard.md`'s `last_verified: 2026-07-04` and `review_by: 2026-10-02` frontmatter values are **byte-unchanged** by this plan. The new Version History row states this choice explicitly: a review date records when the file's review cycle last completed, not when its newest section was written, and neither the v1.18 nor the v1.21 amendment advanced these fields either.

## User Setup Required

None - no external service configuration required.

## Phase 157 First and Last Commit SHAs (D-48)

Per D-48, no `157-EDITED-FILES.md` artifact was created -- Phase 158 SC#3 already prescribes enumerating the edited-file list from `git diff --name-only` across this phase's commits, so a static file would satisfy nothing that phase will not re-derive.

- **First commit:** `d0b611e8` (`docs(157-01): baseline apex chain and leak needles at phase start`)
- **Last commit:** `19b352d7` (`feat(157-07): wire CLAUDE.md and all eight document templates to the standard`) -- the last commit that exists at the time this SUMMARY is written, per D-48's instruction to record the SHA after the final commit lands rather than as a precondition or by amending a later commit. This SUMMARY's own metadata commit necessarily lands after this SHA.

## Next Phase Readiness

- STD-01, STD-03, and STD-04 are discharged: the authoring standard exists, is findable by an author from nine surfaces, states both measured hazards as prose, resolves the scope question, and the standing non-gate rule lives in all three homes a future re-litigation would actually open.
- Phase 157 is complete: all seven plans (baseline, two corpus-substitution plans, the STD-02 gate, the vendor-citation-date correction, the glossary/seed closure, and this authoring-standard plan) are landed. C17 (237/0), the apex chain (111/0/0, matching `157-BASELINE.json`), and `check-nav-hub-links.mjs` (0/0/0) are all green at HEAD.
- Phase 158 has everything it needs: the phase's first and last commit SHAs (above) to re-derive the edited-file list via `git diff --name-only`, and no static artifact to reconcile against.
- Phase 159 has a concrete, currently-green `check-prose-style.py` to promote into a `check-phase-157.mjs` leaf and its enforcing CI job -- this plan performs none of that wiring itself, by design (D-32, D-35), and confirms `.github/` and `check-phase-153.mjs` are untouched.
- No blockers.

---
*Phase: 157-std-hyg-authoring-standard-corpus-hygiene*
*Completed: 2026-09-06*

## Self-Check: PASSED

- `docs/_standards/EEE-SOP-standard.md` contains `## Prose Style Authoring Standard` exactly once, preceded by a horizontal rule, before `## Version History` -- verified via `grep -cxF` and the positional `awk` check.
- `scripts/docs-style/_CONTENT-PINS.txt` (563 lines) and `scripts/docs-style/_PINNED-HEADINGS.txt` (187 lines) each contain the exact heading string exactly once -- verified via `grep -cxF` and `grep -c ''`.
- `.claude/skills/google-style/check.py` still parses (`ast.parse`), still carries `--no-headings` in its docstring, and now also carries the standing rule; a bare invocation prints "report zero" -- verified via `python -c` and a live run.
- `scripts/docs-style/RESUME.md` and the new standard section both contain "report zero" -- verified via `grep -qi`.
- `.claude/skills/google-style/SKILL.md` contains `passive`, `actor`, and `voice.md` -- verified via `grep`.
- `.claude/skills/google-style-verify/` is byte-unchanged -- verified via `git diff --exit-code`.
- `CLAUDE.md` and all eight `docs/_templates/*.md` files contain both the exact section heading and the exact standards-file path (9/9 in both greps); `CLAUDE.md` names `google-style-verify`/verifier; exactly 8 templates are tracked and exactly 8 appear in the diff -- verified via paired `grep` loops and `git ls-files` / `git diff --name-only` counts.
- All three task commit hashes (`83660691`, `9da028e7`, `19b352d7`) found in `git log --oneline`.
- Re-run of every task-level `<verify>` command: C17 237/0 (three times, once per task); `check-prose-style.py --self-test` 7/0 and a live run exit 0 (twice); `check-phase-153.mjs` 111 PASS/0 FAIL/0 SKIPPED matching `157-BASELINE.json`'s recorded apex; `check-nav-hub-links.mjs` 0/0/0; corpus-wide `.planning/` literal needle 0; `.github/` untouched and `check-phase-153.mjs` carries no reference to `check-prose-style`.
