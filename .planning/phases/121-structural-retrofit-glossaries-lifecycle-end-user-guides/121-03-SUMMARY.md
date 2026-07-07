---
phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
plan: 03
subsystem: docs
tags: [eee-retrofit, glossary, c17, markdown, blockquote-split, apple-business, macos]

# Dependency graph
requires:
  - phase: 121-01
    provides: scripts/pipeline/retrofit-structural.mjs (the deterministic fork), docs/_registry/RE-index.md rows RE-179..206
provides:
  - docs/_glossary-macos.md retrofitted to EEE Reference (RE-182), C17-green, Kandji-Iru slug preserved
  - docs/_glossary-apple-business.md retrofitted to EEE Reference (RE-180), C17-green
affects: [121-04, 121-05, 121-06, 121-07, 125-harness-close]

# Tech tracking
tech-stack:
  added: []
  patterns: [word-preserving greedy blockquote packer (tokenizer respects markdown links/backtick spans), C17-group-accurate length validator (joins consecutive '>' lines exactly like the real assertion #12 algorithm)]

key-files:
  created: []
  modified:
    - docs/_glossary-macos.md
    - docs/_glossary-apple-business.md

key-decisions:
  - "Ran retrofit-structural.mjs --dry-run first to confirm doc_id (RE-182/RE-180) and platform-map resolution (All Platforms / iOS + macOS) before writing"
  - "Authored net-new ≥30-word Summaries as scope prose (56 words macos, 60 words apple-business), NOT the relocated coverage blockquote (D-03 strict D3-A)"
  - "Built a reusable word-preserving greedy packer (tokenizer aware of markdown links/backtick spans, prefers breaking after sentence/clause punctuation) rather than hand-splitting each of the 31 over-200-char blockquote groups"
  - "Every split chunk is separated by a genuine blank line (no residual '>' prefix) — required because C17 assertion #12 joins ALL consecutive '>' lines into one group regardless of semantic boundaries; a per-line-only length check is insufficient"
  - "Proved reformat-only via word multiset diff (git HEAD vs working tree, '>' prefixes stripped) — only diff found was the intentional VH date-placeholder fill (YYYY-MM-DD -> 2026-07-07)"

patterns-established:
  - "Pattern: word-preserving greedy blockquote splitter with markdown-aware tokenizer, reusable for any future >200-char blockquote remediation"
  - "Pattern: C17-group-accurate validator (consecutive '>' line joining) as the pre-commit safety check, not a naive per-line length check"

requirements-completed: [RETRO-04]

# Metrics
duration: 40min
completed: 2026-07-07
---

# Phase 121 Plan 03: Glossary EEE Retrofit (macos, apple-business) Summary

**EEE-retrofit `docs/_glossary-macos.md` (RE-182) and `docs/_glossary-apple-business.md` (RE-180) to Reference doc_type with word-preserving splits of 31 over-200-char blockquotes, C17-green on the full 178-file corpus, Kandji-Iru slug byte-unchanged**

## Performance

- **Duration:** ~40 min
- **Tasks:** 2 completed
- **Files modified:** 2

## Accomplishments

- Ran `scripts/pipeline/retrofit-structural.mjs` (dry-run then write) on both files: injected `doc_id`/`status: Approved`/`owner: Intune Admin Lead`/`doc_type: Reference` frontmatter, the EEE header block, relocated the pre-H1 coverage blockquote byte-preserved below a new `## Summary`, and inserted the v1.16 Version History row
- Authored net-new ≥30-word scope Summaries for both glossaries (56 words macos, 60 words apple-business) — NOT the coverage blockquote text
- Split all 31 over-200-char blockquote groups (24 in macos, 7 in apple-business) into word-preserving, clause/sentence-boundary chunks ≤200 chars each, blank-line-separated so C17 assertion #12 measures every resulting group independently
- Full C17 corpus run: **178 files checked, 0 with violations, 0 total violations, exit 0**
- `### Kandji-Iru` term heading confirmed byte-unchanged (exactly one bare heading, no `{#id}` override); Alphabetical Index and all anchor slugs in both files unchanged
- Word-set multiset diff (git HEAD vs working tree) confirmed zero real words added/removed beyond the intentional Version-History date-placeholder fill

## Task Commits

Each task was committed atomically:

1. **Task 1: Run the fork and author both net-new Summaries (Reference doc_type)** - `b9a56a2` (feat)
2. **Task 2: Word-preserving-split every over-200-char blockquote and prove C17 green + reformat-only** - `9f81f4d` (fix)

## Files Created/Modified

- `docs/_glossary-macos.md` - Apple Provisioning Glossary retrofitted to EEE Reference (RE-182); 24 blockquote groups split
- `docs/_glossary-apple-business.md` - Apple Business Governance Glossary retrofitted to EEE Reference (RE-180); 7 blockquote groups split

## Decisions Made

- Built a general-purpose word-preserving greedy blockquote packer (`pack.mjs` scratchpad utility) instead of hand-splitting all 31 violating groups — the tokenizer treats markdown links `[text](url)` and backtick spans as atomic units (never splits mid-link), absorbs trailing punctuation attached to a link/span so no stray space is introduced, and prefers breaking after a token ending in sentence/clause punctuation (`.`, `;`, `:`, `--`) to produce natural-reading chunks rather than arbitrary word-wraps.
- Discovered and fixed a validation gap mid-task: an initial per-line-only length checker would have passed splits that still violated C17, because assertion #12 joins ALL consecutive `>` lines (no blank line between) into one measured group — not just lines that were originally one semantic unit. Rewrote the validator to replicate C17's exact grouping algorithm before proceeding, and ensured every split chunk (across all "logical parts" of a group) gets its own blank-line-isolated blockquote.
- Two occurrences (`Apple Business governance` coverage sentence, `See also: [ABM]...` line) were split at a hand-chosen natural clause boundary instead of the greedy packer's default break point, to avoid an awkward mid-phrase split (e.g., breaking "Apple Business Manager)" across two blockquotes). No word-preservation trade-off — same multiset-equality proof applied.
- Version History date placeholder filled with the actual commit date (2026-07-07), matching the 117-02/118-02/118-03/121-02 precedent.

## Deviations from Plan

None - plan executed exactly as written. The word-preserving greedy splitter approach is explicitly sanctioned by the plan ("A scripted greedy splitter is acceptable (Phase-117-05 precedent) with a word-set reformat-only proof").

## Issues Encountered

- Initial swap attempts under-validated: a per-line char-count check let through replacements that still exceeded 200 chars once C17's actual consecutive-`>`-line grouping was applied (e.g., three short split lines with no blank line between them still summed over 200). Caught before any file write occurred (the swap-application script only writes after ALL swaps in a batch validate cleanly) — rewrote the checker to replicate C17's real grouping algorithm, then re-ran all splits. No incorrect content ever reached the repository.
- The generic greedy packer occasionally chose a split point that broke a proper-noun phrase awkwardly (e.g., "Apple Business Manager)" split across the token boundary). Resolved by hand-selecting a nearby natural clause boundary for those 2 specific chunks; verified via the same length + word-multiset checks as the automated splits.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- RETRO-04 (glossaries) now spans plans 121-02 (android, network) and 121-03 (macos, apple-business) — the remaining glossary files (`_glossary.md`, `_glossary-linux.md`) are covered by other 121-series plans per the phase's wave structure.
- `scripts/pipeline/retrofit-structural.mjs` and the word-preserving packer pattern are proven against the corpus's most anchor-slug-sensitive file (macos, carrying the canonical `### Kandji-Iru` double-hyphen heading) and its most blockquote-dense file (24 violating groups) — both worst cases for this retrofit class are now cleared, reducing risk for remaining 121-series plans.
- Full C17 corpus remains green (178 files, 0 violations) after this plan — no regression introduced to any previously-retrofitted file.
- No blockers for the next plan in this phase.

---
*Phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides*
*Completed: 2026-07-07*
