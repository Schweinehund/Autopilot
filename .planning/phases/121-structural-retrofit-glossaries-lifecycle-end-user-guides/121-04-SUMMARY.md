---
phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
plan: 04
subsystem: docs
tags: [eee-retrofit, glossary, c17, markdown, blockquote-split]

# Dependency graph
requires:
  - phase: 121-01
    provides: scripts/pipeline/retrofit-structural.mjs fork (Reference/Guide router, RE-index doc_id join, whole-pre-H1-span relocation, VH column-detect PREPEND/CREATE)
provides:
  - docs/_glossary-linux.md retrofitted to doc_type Reference, status Approved, RE-181, net-new Summary, C17-green
  - docs/_glossary.md (base Windows Autopilot glossary) retrofitted to doc_type Reference, status Approved, RE-184, net-new Summary, C17-green
  - RETRO-04 (all 6 glossaries) CLOSED
affects: [122-nav-hub-retrofit, 123-orphan-nav-hub-retrofit, 125-harness-close]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Link/backtick-aware greedy word-packer for C17 #12 blockquote splitting: tokenize with `` `[^`]*`[.,;:)]*|\\[[^\\]]*\\]\\([^)]*\\)[.,;:)]*|\\S+ `` (glues trailing punctuation, INCLUDING a nested outer closing paren, to code-span/link tokens so no spurious space is introduced), then greedily pack tokens into <=200-char lines, emitting each packed chunk as its own blockquote separated by a genuine blank line so C17 measures each group independently"

key-files:
  created: []
  modified:
    - docs/_glossary-linux.md
    - docs/_glossary.md

key-decisions:
  - "Confirmed actual RE-index.md mapping (RE-181 = _glossary-linux.md, RE-184 = _glossary.md, both doc_type Reference) over an inconsistent phase-grounding note that referenced RE-179/RE-184 loosely -- the registry is the source of truth and the fork's --dry-run resolved the same IDs"
  - "Extended the link/backtick-aware tokenizer's trailing-punctuation class from [.,;:]* to [.,;:)]* after the first split pass produced spurious ') .' / ')' -orphan artifacts on nested-paren constructions like '(...[link](url)).' -- reverted both files and re-ran with the fix rather than hand-patching the artifacts"

requirements-completed: [RETRO-04]

# Metrics
duration: 20min
completed: 2026-07-07
---

# Phase 121 Plan 04: Glossary EEE Retrofit (Linux, Base Windows) Summary

**EEE-retrofitted docs/_glossary-linux.md (RE-181) and docs/_glossary.md (RE-184) to doc_type Reference with net-new Summaries and 29 word-preserving C17 #12 blockquote splits, closing RETRO-04's 6-glossary class at full C17-green.**

## Performance

- **Duration:** ~20 min
- **Completed:** 2026-07-07T20:26:50Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Ran `scripts/pipeline/retrofit-structural.mjs` (dry-run then write) against both files: injected `doc_id`/`status: Approved`/`owner: Intune Admin Lead`/`doc_type: Reference` frontmatter, emitted the EEE block line, relocated the whole pre-H1 coverage-blockquote span below a new `## Summary`, and prepended the v1.16 Version-History row (3-column, matching each file's existing table width)
- Authored two net-new (not copied from the coverage blockquote) scope Summaries: Linux (63 words: Ubuntu 22.04/24.04 LTS, intune-portal, systemd services, dm-crypt/LUKS, APT/deb delivery, compliance/CA model) and the base Windows Autopilot glossary (64 words: APv1/APv2 frameworks, OOBE/ESP/device-user phase, hardware hash/TPM/Secure Boot, WinHTTP proxy/NCSI, deployment modes, lifecycle actions)
- Built a reusable link/backtick-aware word-preserving greedy blockquote splitter and used it to split 19 over-200-char blockquote groups in `_glossary-linux.md` and 10 in `_glossary.md` into <=200-char blockquotes separated by blank lines
- Proved reformat-only via a word-set multiset diff (git HEAD vs working tree, blockquote lines only, `>` prefix stripped): zero real words added/removed in either file
- Ran the full C17 corpus: **180 files checked, 0 with violations, 0 total violations** (all 13 assertions green) -- RETRO-04's 6-glossary class (RE-179 through RE-184) is now fully Reference/Approved/C17-green

## Task Commits

Each task was committed atomically:

1. **Task 1: Run the fork and author both net-new Summaries (Reference doc_type)** - `b10878c` (feat)
2. **Task 2: Word-preserving-split every over-200-char blockquote and prove C17 green + reformat-only** - `9531a74` (fix)

## Files Created/Modified
- `docs/_glossary-linux.md` - EEE header block + net-new Summary + doc_type Reference + 19 blockquote groups split <=200 chars; term ### headings and Alphabetical Index byte-unchanged
- `docs/_glossary.md` - EEE header block + net-new Summary + doc_type Reference + 10 blockquote groups split <=200 chars; term ### headings, base-glossary anchor slugs (#apv1/#esp/#oobe/#ztd/#hardware-hash), and Alphabetical Index byte-unchanged

## Decisions Made
- Registry-confirmed doc_id mapping used as source of truth (RE-181 linux, RE-184 base) rather than re-deriving IDs by hand
- Tokenizer trailing-punctuation class widened from `[.,;:]*` to `[.,;:)]*` mid-task after the first split pass introduced spurious space-before-punctuation artifacts on nested-paren constructions (e.g. `(...[link](url)).`); both files were reverted via `git checkout` and re-split cleanly rather than patching the artifacts by hand

## Deviations from Plan

None (beyond the in-task tokenizer self-correction documented above, which was caught and fixed before any commit landed — no bad state was ever committed).

## Issues Encountered
- First blockquote-split pass produced `") ."`-style spacing artifacts around markdown links/code spans immediately followed by a nested closing paren (e.g. `(re-validate per [01-linux-prerequisites.md](linux-lifecycle/01-linux-prerequisites.md)).`). Caught via the word-set reformat-only proof (diff showed a token split across "added"/"removed" pairs) before committing. Fixed by extending the tokenizer's trailing-punctuation glue set from `[.,;:]*` to `[.,;:)]*`; re-ran cleanly with zero word-set diffs on the second pass.

## Next Phase Readiness
- RETRO-04 (all 6 glossaries) is CLOSED — docs/_glossary*.md corpus (RE-179..RE-184) is fully Reference/Approved/C17-green
- Full corpus at 180 C17-checked files, 0 violations — clean baseline for the remaining 121-05/06/07 lifecycle + end-user-guide plans and the eventual Phase 123 navigation-last nav-hub retrofit
- No blockers for continuing wave-2 execution of Phase 121

---
*Phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides*
*Completed: 2026-07-07*

## Self-Check: PASSED

- FOUND: docs/_glossary-linux.md
- FOUND: docs/_glossary.md
- FOUND: b10878c (Task 1 commit)
- FOUND: 9531a74 (Task 2 commit)
