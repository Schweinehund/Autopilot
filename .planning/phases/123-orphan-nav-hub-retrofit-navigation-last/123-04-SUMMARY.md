---
phase: 123-orphan-nav-hub-retrofit-navigation-last
plan: 04
subsystem: testing
tags: [link-checker, markdown, c17, eee-standard, github-slug, phase-close]

# Dependency graph
requires:
  - phase: 123-orphan-nav-hub-retrofit-navigation-last (plan 02)
    provides: scripts/validation/check-nav-hub-links.mjs (standalone link/anchor checker)
  - phase: 123-orphan-nav-hub-retrofit-navigation-last (plan 03)
    provides: the 4 nav-hubs EEE-enrolled, Summary-first, C17-green (SC1 baseline)
provides:
  - "12 pre-existing broken links fixed in docs/quick-ref-l2.md (11 ../ over-escapes)
    and docs/common-issues.md (1 dead anchor), landed as a SEPARATE
    git-blame-attributed commit distinct from the 123-03 retrofit commits (D-01)"
  - "check-nav-hub-links.mjs exits 0 on the final corpus (SC2 confirmed, both
    outbound and inbound scans clean)"
  - "Full-corpus c17-eee-contract.mjs exits 0 across 229 files (SC1 re-confirmed
    with no regression from the link fixes)"
  - "123-VERIFICATION.md — SC1/SC2/SC3 attestation with real command outputs,
    git-blame pre-existing-rot dates, and the navigation-last git-history proof"
  - "RETRO-06 flipped to Complete in .planning/REQUIREMENTS.md"
affects: [124 (re-runs check-nav-hub-links.mjs after the descriptive-filename rename
  pass), 125 (full-corpus close verification inherits this phase's 229/0 C17 baseline)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "GitHub double-hyphen slug artifact recurs on punctuation-surrounded-by-spaces
      other than '/' -- '+' in 'dm-crypt + LUKS' also produces a double-hyphen slug
      (dm-crypt--luks), not just the previously-known '/' case"
    - "Relocate-by-content-not-line-number when a prior plan's retrofit shifted line
      numbers -- RESEARCH's byte-verified line table (316-373/360) was superseded by
      123-03's Summary/#12-split insertions (341-400/388); re-grepped by link target
      text rather than trusting stale line numbers"

key-files:
  created:
    - .planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-VERIFICATION.md
  modified:
    - docs/quick-ref-l2.md
    - docs/common-issues.md
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Fixed the 12 pre-existing broken links in a commit SEPARATE from the SC1/SC3
    verification work (Task 1 vs Task 2), even though both are part of this single
    plan -- preserves the D-01 git-blame-attribution requirement's spirit of keeping
    pre-existing-rot fixes distinguishable from any other change in this plan"
  - "Corrected one target anchor from RESEARCH's stated single-hyphen slug
    (step-4-configure-device-encryption-dm-crypt-luks) to the actual GitHub
    double-hyphen slug (...dm-crypt--luks) after the link-checker caught the
    mismatch on first verification run -- the '+' in 'dm-crypt + LUKS' is
    surrounded by spaces on both sides, producing the same double-hyphen
    artifact class as the previously-known '/' case"
  - "Re-located all 12 broken links by grepping link text/target rather than
    trusting RESEARCH's line numbers, since 123-03's retrofit (Summary insertion +
    21 #12 blockquote reflows) shifted every line number in both files"

requirements-completed: [RETRO-06]

# Metrics
duration: ~35min
completed: 2026-07-08
---

# Phase 123 Plan 04: Phase Close — Pre-Existing-Rot Link Fixes + Full-Corpus Verification Summary

**Fixed the 12 pre-existing broken links inside the 4 nav-hubs in a separate git-blame-attributed commit, drove `check-nav-hub-links.mjs` to 0 failures (SC2), re-confirmed full-corpus C17 at 229/0 (SC1), proved navigation-last via git history (SC3), and closed RETRO-06.**

## Performance

- **Duration:** ~35 min
- **Tasks:** 2 completed
- **Files modified:** 3 (2 docs, 1 requirements doc) + 1 new VERIFICATION.md

## Accomplishments
- Re-confirmed the checker's true-positive baseline against the live corpus: exactly 12 outbound failures (11 `quick-ref-l2.md` `../` over-escapes + 1 `common-issues.md` dead anchor), 0 inbound — matching CONTEXT/RESEARCH's byte-verified enumeration, with line numbers re-located by content since 123-03 shifted them (341-400/388, not the RESEARCH-era 316-373/360)
- Fixed all 12 links: dropped `../` on 11 `quick-ref-l2.md` links (`operations/` and `admin-setup-linux/` are docs-relative siblings, not repo-root-relative); repointed `common-issues.md`'s dead `#compliance-access-blocked` anchor to the real slug `#compliance-failure-or-access-blocked`
- Caught and corrected a double-hyphen slug mismatch mid-verification: `### Step 4: Configure Device Encryption (dm-crypt + LUKS)` slugifies to `...dm-crypt--luks` (double hyphen, not single) because `+` is surrounded by spaces on both sides
- Committed the 12 fixes as ONE dedicated commit (`5b28c88`), separate from the 123-03 retrofit commits, citing git-blame dates (2026-04-30 / 2026-05-05) proving 2+ months of pre-existing rot
- Ran `check-nav-hub-links.mjs` to 0 failures (SC2) and full-corpus `c17-eee-contract.mjs` to 229/0 (SC1, no regression from the link fixes)
- Proved navigation-last (SC3) via git log: earliest Phase-123 hub commit (`15b1b20`, 2026-07-08T09:09:13) strictly post-dates the latest Phase-121/122 content commit (`e2ec2a5`, 2026-07-07T23:19:51)
- Authored `123-VERIFICATION.md` with all 3 SC proofs, registry confirmation (RE-218..221 Approved), and requirement-completion rationale
- Flipped RETRO-06 to Complete in `.planning/REQUIREMENTS.md` (checkbox + traceability row)

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix the 12 pre-existing broken links (separate git-blame-attributed commit)** - `5b28c88` (fix)
2. **Task 2: Full-corpus C17 (SC1) + navigation-last git attestation (SC3) + author 123-VERIFICATION.md + mark RETRO-06 complete** - `ca048df` (docs)

**Plan metadata:** (this commit, immediately following)

## Files Created/Modified
- `docs/quick-ref-l2.md` - 11 `../` over-escapes dropped (3 play-integrity-attestation rows, 2 deadlines-cutover-dates refs, 4 Linux compliance-category rows, 2 Linux Compliance Policy admin-guide refs); 1 anchor corrected to the double-hyphen GitHub slug
- `docs/common-issues.md` - dead anchor `#compliance-access-blocked` repointed to `#compliance-failure-or-access-blocked`
- `.planning/REQUIREMENTS.md` - RETRO-06 checkbox + traceability row flipped to Complete
- `.planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-VERIFICATION.md` - new; SC1/SC2/SC3 attestation

## Decisions Made
See `key-decisions` in frontmatter. Most significant: the double-hyphen slug correction (RESEARCH's table had the wrong single-hyphen form for the `dm-crypt + LUKS` heading) and re-locating all 12 links by content rather than RESEARCH's stale line numbers.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] RESEARCH's slug table had a single-hyphen error for one target anchor**
- **Found during:** Task 1, first `check-nav-hub-links.mjs` verification run after applying all 12 fixes
- **Issue:** RESEARCH's fix table (`123-RESEARCH.md`) stated the fix for the `Device Encryption` row as `#step-4-configure-device-encryption-dm-crypt-luks` (single hyphen). The checker reported this anchor as not found.
- **Fix:** Recomputed the GitHub slug by hand: `### Step 4: Configure Device Encryption (dm-crypt + LUKS)` has `+` surrounded by spaces on both sides; removing `+` in-place (GitHub's strip-not-replace behavior) leaves two adjacent spaces, which become two hyphens — the correct slug is `#step-4-configure-device-encryption-dm-crypt--luks` (double hyphen). Corrected the link.
- **Files modified:** docs/quick-ref-l2.md
- **Verification:** Re-ran `check-nav-hub-links.mjs` — 0 failures
- **Committed in:** `5b28c88` (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 — a stale research-table slug value, not a plan/architecture issue)
**Impact on plan:** No scope creep. The fix was required to satisfy the plan's own SC2 done-criterion (`check-nav-hub-links.mjs` exits 0); RESEARCH's underlying fix strategy (repoint/drop-`../`) was correct, only the exact slug string needed a byte-level correction.

## Issues Encountered
None beyond the deviation above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 123 is fully closed: SC1 (C17 229/0), SC2 (link-checker 0/0), SC3 (navigation-last git attestation) all proven and recorded in `123-VERIFICATION.md`
- RETRO-06 is Complete — all 6 v1.16 RETRO requirements (RETRO-04/05/06/07/08/09) are now Complete
- Phase 124 (pipeline fix + descriptive-filename pass + Draft-label probe) can proceed against a fully-retrofitted, link-accurate corpus; its filename rename pass should re-run `check-nav-hub-links.mjs` after renaming since it will re-touch nav-hub link targets (already flagged as a Deferred Idea in `123-CONTEXT.md`)
- No blockers for Phase 124

---
*Phase: 123-orphan-nav-hub-retrofit-navigation-last*
*Completed: 2026-07-08*

## Self-Check: PASSED

- FOUND: docs/quick-ref-l2.md
- FOUND: docs/common-issues.md
- FOUND: .planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-VERIFICATION.md
- FOUND: .planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-04-SUMMARY.md
- FOUND commit: 5b28c88 (Task 1)
- FOUND commit: ca048df (Task 2)
- FOUND commit: aca601d (SUMMARY)
