---
phase: 123-orphan-nav-hub-retrofit-navigation-last
plan: 02
subsystem: testing
tags: [link-checker, markdown, static-analysis, node, eee-standard, github-slug]

# Dependency graph
requires:
  - phase: 123-orphan-nav-hub-retrofit-navigation-last (plan 01)
    provides: retrofit-nav-hub.mjs fork (NAV_HUB_PATHS + resolveDocType branch); registry prep
provides:
  - "scripts/validation/check-nav-hub-links.mjs — net-new standalone (no CHAIN_PHASES) file+anchor
    link-integrity checker for the 4 orphan nav-hubs"
  - "GitHub-exact githubSlug() (strip-in-place, no-collapse, produces the double-hyphen artifact)"
  - "computeAnchorSetFromContent() — {#id}-override-first + encounter-order dedup (-1/-2/-3),
    fence-masked, emphasis-stripped resolvable-anchor-set builder"
  - "resolveLinkTarget() — path.dirname(linkingFileAbs)-relative resolution (never process.cwd()),
    existsSync-bounded, never throws on out-of-tree ../ targets"
  - "checkOutboundLinks() + checkInboundLinks() — both-direction scan (from the 4 hubs; corpus-wide
    into the 4 hubs), file:line -> [text](target) -- reason report"
  - "--self-test covering 7 assertions (double-hyphen, no-collapse, 4x-dup dedup, {#id}-override,
    emphasis-strip, fence-mask, path-traversal-no-throw)"
  - "True-positive proof: live run against the un-fixed corpus flags exactly the 12 known
    pre-existing broken links (11 quick-ref-l2.md ../ over-escapes + 1 common-issues.md:360
    dead anchor) — proving the checker is not a no-op"
affects: [123-04 (fixes the 12 breaks + reruns this checker to 0), 124 (re-runs after the
  descriptive-filename rename pass), 125 (full-corpus close verification)]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Standalone validator with no CHAIN_PHASES array (mirrors the Phase-115 c17-eee-contract.mjs
      standalone precedent) — scripts/validation/ zero-external-dependency convention (node:fs,
      node:path, node:process only)"
    - "GitHub-exact slugify: strip punctuation IN PLACE (deletion, not space-substitution) then
      hyphenate remaining spaces WITHOUT collapsing consecutive hyphens — the double-hyphen
      artifact (ios-compliance--access-blocked) is the correctness signal, not a bug to fix"
    - "Map<slugBase,count> encounter-order anchor dedup (-1/-2/-3), not a plain Set"
    - "Path resolution always via path.dirname(linkingFileAbs), never process.cwd() — the exact
      bug class the 11 pre-existing ../ over-escapes exhibit"
    - "buildFenceMask() reused verbatim from retrofit-mermaid-structural.mjs for both heading
      detection and link-regex scanning"

key-files:
  created:
    - scripts/validation/check-nav-hub-links.mjs
  modified: []

key-decisions:
  - "Self-test uses synthetic in-memory content strings (computeAnchorSetFromContent(), no disk
    fixture files) — mirrors c17-eee-contract.mjs's inline-fixture self-test style, avoids a
    dependency on new c17-fixtures/*.md files for a checker whose whole domain is text parsing"
  - "Inbound scan excludes the 4 hub files as SOURCES (their own outbound links, including any
    hub-to-hub links, are already fully covered by the outbound scan) — avoids double-reporting
    the exact same failure line under both directions"
  - "Self-test G (path-traversal-no-throw) added under the same --self-test flag rather than a
    separate CLI mode — keeps one entry point; the acceptance criterion (no throw, resolves to
    not-found) is proven directly against resolveLinkTarget() with a synthetic
    ../../../../../../etc/passwd target"
  - "Task 1 and Task 2 committed as two separate commits on the same file (resolver-only build,
    then scan/report wiring) to preserve per-task atomic commit discipline even though both
    tasks landed in one execution session"

patterns-established:
  - "Pattern: net-new link/anchor checker as a standalone scripts/validation/*.mjs script,
    reusing readFile/walkMd/relNormalize (c17-eee-contract.mjs) and buildFenceMask
    (retrofit-mermaid-structural.mjs) verbatim rather than re-implementing them"

requirements-completed: []  # RETRO-06 stays Pending — this plan is tooling-only (no doc mutated); 123-04 closes RETRO-06

# Metrics
duration: 20min
completed: 2026-07-08
---

# Phase 123 Plan 02: Nav-Hub Link/Anchor Checker Summary

**Built `scripts/validation/check-nav-hub-links.mjs` — a standalone, GitHub-exact, self-tested file+anchor link checker that scans both outbound (from the 4 nav-hubs) and inbound (corpus-wide into the 4 nav-hubs) directions, and proved via a live true-positive run that it correctly flags all 12 pre-existing broken links already present in the corpus.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-07-08T09:00:59-05:00
- **Completed:** 2026-07-08T09:02:19-05:00 (commits); SUMMARY authored immediately after
- **Tasks:** 2 completed
- **Files modified:** 1 (net-new)

## Accomplishments
- Task 1: GitHub-exact `githubSlug()` (strip-in-place, no-collapse) + `computeAnchorSetFromContent()` (union of `{#id}` overrides added verbatim and heading slugs with `Map<slugBase,count>` encounter-order dedup) + `--self-test` covering the 6 behavior-block cases — all PASS.
- Task 2: `resolveLinkTarget()` (linking-file-directory-relative, never `process.cwd()`), `checkOutboundLinks()` + `checkInboundLinks()`, and a `file:line -> [text](target) -- reason` CLI report. Extended `--self-test` with a 7th assertion proving no-throw on a pathological `../../../../../../etc/passwd`-style target.
- **True-positive proof:** running the finished checker against the live, still-broken corpus reports exactly 12 outbound failures — the 11 `quick-ref-l2.md` `../` over-escapes (lines 316, 317, 318, 320, 322, 366, 367, 368, 369, 371, 373) plus the 1 `common-issues.md:360` dead anchor — and 0 inbound failures, matching CONTEXT/RESEARCH's byte-verified enumeration exactly. This is the evidence that the checker is not a no-op; it is left in this flagged state deliberately (this plan does not fix links — that is Phase 123-04's job).

## Task Commits

Each task was committed atomically:

1. **Task 1: Build the GitHub-exact slugify + resolvable-anchor-set builder (with --self-test)** - `eee079c` (feat)
2. **Task 2: Wire the outbound + inbound scans, path resolution, and the file:line failure report** - `3177529` (feat)

**Plan metadata:** (this commit, immediately following) - `docs(123-02): complete plan`

## Files Created/Modified
- `scripts/validation/check-nav-hub-links.mjs` - Net-new standalone link/anchor checker (419 lines). No `CHAIN_PHASES` array (`grep -c 'CHAIN_PHASES'` returns 0). Exports no CLI beyond `--verbose`/`--self-test`.

## Decisions Made
- Self-test built with synthetic in-memory strings rather than disk fixture files (see `key-decisions` above) — no new `scripts/validation/*-fixtures/` directory needed.
- Inbound scan deliberately excludes the 4 hubs as link *sources* (outbound already covers those) to avoid duplicate failure lines.
- Split the single-file implementation into two commits (Task 1 resolver-only, then Task 2 scan/report) to preserve the per-task atomic-commit protocol.

## Deviations from Plan

None - plan executed exactly as written. Both tasks' acceptance criteria were verified directly:
- `--self-test` exits 0, 7/7 PASS (double-hyphen, no-collapse, 4x-duplicate dedup, `{#id}`-override-verbatim, emphasis-strip, fence-mask, path-traversal-no-throw).
- `grep -c 'CHAIN_PHASES' scripts/validation/check-nav-hub-links.mjs` returns `0`.
- `grep` inside the `resolveLinkTarget()` function body for `process.cwd(` returns no matches — path resolution is exclusively `path.dirname(linkingFileAbs)`-relative.
- Live `--verbose` run against the corpus exits 1 and reports exactly the 12 known pre-existing breaks (11 outbound `../` over-escapes + 1 dead anchor), 0 inbound failures.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required. Zero new dependencies (Node built-ins only: `node:fs`, `node:path`, `node:process`).

## Next Phase Readiness
- The checker is ready for Phase 123-04 to run as the SC2 gate once the 12 pre-existing broken links are fixed and the net-new `## Summary` sections / C17 `#12` blockquote splits are authored on the 4 hubs.
- No doc file was mutated by this plan (per the plan's explicit out-of-scope boundary); `docs/index.md`, `common-issues.md`, `quick-ref-l1.md`, `quick-ref-l2.md` remain exactly as they were before this plan, including their 12 known-broken links.
- RETRO-06 remains Pending (not marked complete by this plan) — it closes when 123-04 lands the fixes and this checker exits 0.

---
*Phase: 123-orphan-nav-hub-retrofit-navigation-last*
*Completed: 2026-07-08*

## Self-Check: PASSED

- FOUND: scripts/validation/check-nav-hub-links.mjs
- FOUND: .planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-02-SUMMARY.md
- FOUND commit: eee079c (Task 1)
- FOUND commit: 3177529 (Task 2)
- FOUND commit: 9380731 (SUMMARY)
