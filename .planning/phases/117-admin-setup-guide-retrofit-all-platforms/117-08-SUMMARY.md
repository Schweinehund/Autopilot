---
phase: 117-admin-setup-guide-retrofit-all-platforms
plan: 08
subsystem: docs
tags: [eee-standard, c17-harness, doc-retrofit, linux, markdown]

# Dependency graph
requires:
  - phase: 117-01
    provides: scripts/pipeline/retrofit-guide.mjs (forked EEE retrofit helper, whole-pre-H1-span fix)
  - phase: 117-07
    provides: precedent for Transform A/B #12 blockquote fixes on admin-setup guides
provides:
  - EEE-conformant Linux admin-setup guide files 01-05 (RE-129..RE-133): header block, D3-A structure, hand-authored Summary, Version-History row
  - Zero over-limit #12 blockquote groups across the 5-file Linux batch (19 groups fixed)
  - RE-index.md RE-129..RE-133 flipped Pending -> Approved (RE-128 stays Pending, mermaid-deferred)
  - C17 exits 0 across all 134 enrolled docs/ files corpus-wide
affects: [118-reference-doc-retrofit, 119-frozen-surface-rebaseline]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "D-03 Linux/all rule: generic scope-lead Summary (platform + task scope + Intune admin role) with the APv1/APv2 framework clause omitted entirely"
    - "Transform A (sentence-boundary split with a truly-empty blank line) for standard multi-sentence callouts"
    - "Em-dash / semicolon clause-boundary splits for single-sentence blockquotes that exceed 200 chars even alone (02's enrollment-restriction sentence, 03's architecture-callout lead-in and capability-comparison sentence, 04's Bash-delivery sentence, 05's CA-enforcement-path sentence)"
    - "Transform B (de-blockquote) reserved for structured multi-paragraph WARNING/admonition boxes with an embedded numbered list (01's 1158c Identity Broker re-enrollment pitfall)"

key-files:
  created: []
  modified:
    - docs/admin-setup-linux/01-intune-linux-agent.md
    - docs/admin-setup-linux/02-enrollment-profile.md
    - docs/admin-setup-linux/03-compliance-policy.md
    - docs/admin-setup-linux/04-app-delivery.md
    - docs/admin-setup-linux/05-conditional-access.md
    - docs/_registry/RE-index.md

key-decisions:
  - "01-intune-linux-agent's 1158c Identity Broker re-enrollment box used Transform B (de-blockquote) rather than Transform A -- it is a structured multi-paragraph admonition with a numbered admin-action checklist, not a simple prose callout, matching the PATTERNS.md Transform B criterion even though it embeds no literal code fence"
  - "Three single-sentence blockquotes exceeded 200 chars even alone (02's enrollment-restriction 244c sentence, 03's architecture-callout 223c lead-in and 238c capability-comparison sentence, 04's 224c Bash-delivery sentence, 05's 261c CA-enforcement sentence) -- each split at a natural em-dash or semicolon clause boundary per the escalation-avoidance precedent (117-05/117-06), preserving every word"
  - "Word-set diff against the Task-2 HEAD commit shows the only delta across all 5 files is the count of '>' blockquote-marker characters (expected from splitting single groups into multiple quote paragraphs) -- zero real words added or removed"

patterns-established: []

requirements-completed: [RETRO-02]

# Metrics
duration: 25min
completed: 2026-07-06
---

# Phase 117 Plan 08: Linux Admin-Setup Guide Retrofit (RE-129..RE-133) Summary

**Retrofitted all 5 Linux admin-setup guides to the EEE standard using the generic scope-lead Summary (framework clause omitted per D-03), fixed all 19 over-limit #12 blockquote groups via Transform A/B, and flipped RE-129..RE-133 Approved in the registry with C17 exiting 0 corpus-wide.**

## Performance

- **Duration:** ~25 min
- **Started:** 2026-07-06T04:39:23Z (session resume)
- **Completed:** 2026-07-06T04:53:12Z
- **Tasks:** 3 completed
- **Files modified:** 6 (5 guides + RE-index.md)

## Accomplishments
- Ran the forked `retrofit-guide.mjs` helper (dry-run then write) on all 5 Linux files: injected `doc_id`/`status`/`owner`/`doc_type` frontmatter, the `**Platform:** Linux` block line, relocated the whole pre-H1 span, and created a new `## Version History` section (byte-length equality confirmed for every file's relocated span)
- Hand-authored all 5 `## Summary` sections using the D-03 Linux/all generic scope-lead shape (platform + task scope + required Intune admin role), explicitly omitting the APv1/APv2 framework clause; all 5 are the first H2 and well above the 30-word minimum (178-291 words each)
- Fixed all 19 over-limit `#12` blockquote groups across the 5 files (3+4+7+3+2, matching RESEARCH.md's independent count) using Transform A sentence-splits, targeted em-dash/semicolon clause splits for 5 single-sentence over-200c blockquotes, and one Transform B de-blockquote for 01's 1158c Identity Broker admonition
- `node scripts/validation/c17-eee-contract.mjs` exits 0 across all 134 enrolled `docs/` files (0 violations) — confirms this batch is clean and did not regress any prior-plan file
- Flipped `docs/_registry/RE-index.md` rows RE-129..RE-133 from `Pending` to `Approved`; RE-128 (`linux/00-overview.md`, mermaid-deferred) correctly left untouched at `Pending`

## Task Commits

Each task was committed atomically:

1. **Task 1: Mechanical transform via the helper** - `88bdf07` (feat)
2. **Task 2: Hand-author Summary prose** - `9f2bc8d` (docs)
3. **Task 3: #12 blockquote compliance, C17 exit 0, registry Approved** - `b7e2b43` (fix)

**Plan metadata:** (this commit, following SUMMARY.md creation)

## Files Created/Modified
- `docs/admin-setup-linux/01-intune-linux-agent.md` - RE-129; Transform B applied to the 1158c Identity Broker re-enrollment box; 2 other groups Transform-A split
- `docs/admin-setup-linux/02-enrollment-profile.md` - RE-130; 4 groups Transform-A split, one em-dash clause split for the 244c enrollment-restriction sentence
- `docs/admin-setup-linux/03-compliance-policy.md` - RE-131; 7 groups Transform-A split, two clause splits for over-200c single sentences (223c architecture lead-in, 238c capability-comparison sentence)
- `docs/admin-setup-linux/04-app-delivery.md` - RE-132; 3 groups Transform-A split, one semicolon clause split for the 224c Bash-delivery sentence
- `docs/admin-setup-linux/05-conditional-access.md` - RE-133; 2 groups Transform-A split, one semicolon clause split for the 261c CA-enforcement sentence
- `docs/_registry/RE-index.md` - RE-129..RE-133 Status Pending -> Approved; RE-128 unchanged

## Decisions Made
- Transform B chosen for 01's 1158c box because it is a structured multi-paragraph admonition (main warning + back-link + numbered admin-action checklist), matching the PATTERNS.md Transform B criterion for structured multi-paragraph WARNING boxes even without an embedded code fence
- Five single-sentence blockquotes exceeded 200 chars even alone; each was split at a natural em-dash or semicolon clause boundary (no words trimmed or reworded) rather than escalated, consistent with the 117-05/117-06 precedent for handling unsplittable-looking sentences that do contain an internal clause boundary

## Deviations from Plan

None - plan executed exactly as written. All three tasks' acceptance criteria and the plan's overall verification/success criteria were met without needing Rule 1-4 auto-fixes.

## Issues Encountered

None. The retrofit-guide.mjs dry-run confirmed byte-length equality for every file's relocated pre-H1 span before any write, and the post-#12-fix word-set diff against the Task-2 HEAD commit confirmed the only delta was the `>` blockquote-marker count (expected), not any word content change.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Linux admin-setup guides (RE-129..RE-133) are fully EEE-conformant and C17-green; ready for Phase 118 (reference doc retrofit) and Phase 119 (frozen-surface re-baseline + close)
- No blockers. `linux/00-overview.md` (RE-128) remains correctly keyless/Pending, deferred to v1.16 per the mermaid-carve-out (D-05)
- Plan 09 (802.1X, the final Phase 117 batch) can proceed independently

---
*Phase: 117-admin-setup-guide-retrofit-all-platforms*
*Completed: 2026-07-06*
