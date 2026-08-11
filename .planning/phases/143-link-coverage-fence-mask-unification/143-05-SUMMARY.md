---
phase: 143-link-coverage-fence-mask-unification
plan: 05
subsystem: docs-validation
tags: [link-checker, class-b-rewrite, github-slug, gov-02-ledger, dry-run-zero]

requires:
  - phase: 143-link-coverage-fence-mask-unification
    provides: github-anchor-model, LINK-03 file-target repair, Class-D de-anchor, Class-C target-side <a id>, D-05 precedence rule (Plans 02, 03, 04, 09)
provides:
  - "All 8 Class-B pairs / 13 links rewritten source-side to heading-derived true GitHub slugs (D-06's 3 substitutions + 3 singletons + 2 Plan-04-adjudicated pairs)"
  - "Corpus-wide dry-run measured at 0 broken file targets, 0 broken anchors, 0 total — seven-row ladder complete: 175 -> 173 -> 143 -> 78 -> 49 -> 13 -> 0"
  - "51-pair / 67-link post-conversion ledger fully closed with class + landed remedy per row, reconciling 51+26=77 pairs / 67+65=132 links against the original pre-conversion defect census"
  - "Both D-15 rulings recorded (.planning/ link-scope in-bounds; above-cwd relNormalize latent class)"
affects: [143-06-PLAN.md]

actuals:
  tokens: 12000
  tasks: 2
  commits: 2

tech-stack:
  added: []
  patterns: [source-side githubSlug-derived fragment rewrite (D-04 Class-B remedy), double-hyphen artifact preservation from em-dash/literal-double-hyphen stripping, D-36 measured-not-forced discrepancy recording]

key-files:
  created: []
  modified:
    - docs/error-codes/02-tpm-attestation.md
    - docs/error-codes/03-esp-enrollment.md
    - docs/error-codes/04-pre-provisioning.md
    - docs/error-codes/05-hybrid-join.md
    - docs/l1-runbooks/02-esp-stuck-or-failed.md
    - docs/l1-runbooks/05-oobe-failure.md
    - docs/l2-runbooks/10-macos-log-collection.md
    - docs/admin-setup-android/04-byod-work-profile.md
    - docs/admin-setup-android/08-cope-full-admin.md
    - docs/admin-setup-apv2/02-etg-device-group.md
    - docs/_glossary-apple-business.md
    - .planning/milestones/v1.20-GOV-02-LEDGER.md
    - .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md

decisions:
  - "Confirmed all 8 target headings live before editing (not accepted from the plan's table alone, D-03): #esp, #entra-id-sso, #self-deploying-mode, the byod-work-profile <a id>, the Android-11-COPE double-hyphen slug, the IntuneMacODC case fix, the ETG four-hyphen slug, and the OP-3-prevention suffix all re-derived by hand via githubSlug against the live heading text."
  - "Recorded (not chased) a 2-link discrepancy between the plan's carried 6252 relative-link figure and this plan's direct 6250 measurement — file count (274) matches exactly, this plan's own edits are confirmed link-count-neutral by git diff --numstat, and the discrepancy predates this plan (already the carried figure at Plan 04's close). Zero-failure total (the substantive criterion) independently confirmed both ways."
  - "Built the full 51-row per-pair ledger table (12 Class D + 31 Class C + 8 Class B) from scratch in 143-EVIDENCE.md — no such consolidated table existed before this plan; verified programmatically to sum to 51 rows / 67 links."

metrics:
  duration: ~25min
  completed: 2026-08-11
status: complete
---

# Phase 143 Plan 05: Class-B Source-Side Link Rewrites + Dry-Run to Zero Summary

Rewrote all 8 remaining Class-B (target-file, fragment) pairs — 13 links — to their true
GitHub-slug fragments, then drove the corpus-wide dry-run from 13 broken anchors to 0 and closed
the full 51-pair/67-link post-conversion ledger.

## Performance

- **Duration:** ~25 min
- **Tasks:** 2
- **Files modified:** 12 docs/GOV-02-ledger files (Task 1) + `143-EVIDENCE.md` (Task 2)
- **Commits:** 2

## Accomplishments

- Rewrote D-06's three verified clean substitutions (`#enrollment-status-page`->`#esp`,
  `#entra`->`#entra-id-sso`, `#self-deploying`->`#self-deploying-mode`, 6 links across 6 files),
  re-confirming each target heading live before editing rather than trusting the table.
- Rewrote the three singletons: `#byod`->`#byod-work-profile` (the target row's own existing
  `<a id>`), `#cope`->`#android-11--cope-nfc-provisioning-removed` (em-dash-stripping produces
  the double hyphen, confirmed intact), `#intunemacODC`->`#intunemacodc` (pure case fix).
- Rewrote the two Plan-04-adjudicated pairs: the ETG fragment gains its missing `etg` token and
  preserves all four consecutive hyphens from the literal ` -- ` in the heading; the
  Edit-without-View fragment gains its missing `(OP-3 Prevention)` suffix.
- Confirmed the three D-38-resolved doubled-slug rewrites (`#contentpreptool-packaging`,
  `#resource-access-deprecation`, `#ddm-update-keys`) were correctly NOT re-added anywhere in the
  corpus, and `#intune`/`#aosp` stayed correctly de-anchored (absent from this edit set).
  `#intune`/`#aosp` are Plan 03's Class-D de-anchor targets, not this plan's scope.
- All 13 rewrites landed as same-line `#fragment` substring replacements — `git diff --numstat`
  shows equal added/removed line counts per file, zero heading/`<a id>`/`{#id}` lines touched.
- Ran the corpus-wide temporary-widening dry-run (the established Plans 02/03/04/09 procedure):
  **0 broken file targets, 0 broken anchors, 0 total** — the seven-row dry-run ladder completes
  at 175 -> 173 -> 143 -> 78 -> 49 -> 13 -> **0**. Unpatched `check-nav-hub-links.mjs` independently
  confirms `0 outbound failure(s), 0 inbound failure(s), 0 total`, exit 0.
- Built and closed the full 51-pair/67-link post-conversion ledger in `143-EVIDENCE.md` — no such
  consolidated table existed before this plan; assembled from the exact `<a id>` anchors landed
  in Plan 04's error-code family, the Class-D pairs de-anchored in Plan 03, and this plan's 8
  Class-B rewrites. Reconciles 12+31+8=51 pairs / 16+38+13=67 links, and against the original
  census: 51+26=77 pairs / 67+65=132 links, zero unexplained residue.
- Recorded both D-15 rulings: (a) `docs/_glossary-linux.md:157`'s link to
  `../.planning/research/PITFALLS.md` is in scope (not excluded) — `carve-gate`'s
  `IN_SCOPE_PREFIXES` governs edits, not link targets; (b) `relNormalize`'s above-`cwd` latent bug
  class has zero live instances (13 of 14 outside-`docs/` links repaired by Plan 03, the 14th is
  D-15(a) itself, fragment-free).
- Appended one GOV-02 ledger row: target-scoped + symbol-scoped grep across all 8 old fragment
  strings — zero frozen call-site conflicts found (this plan touches `docs/` and
  `.planning/milestones/` only, no `scripts/` file).
- c17 (`234 files checked, 0 with violations, 0 total violations`) and carve-gate
  (`98 in-scope, 98 on-list, 0 off-list`) both green throughout.

## Task Commits

1. **Task 1: All 8 Class-B rewrites** - `ecd1fef1` (feat)
2. **Task 2: Dry-run to zero + close the 51-pair ledger** - `6f9f9064` (docs)

**Plan metadata:** captured in this SUMMARY commit (below)

## Files Created/Modified

- `docs/error-codes/{02,03,04,05}-*.md` — `#self-deploying`/`#entra` fragment rewrites
- `docs/l1-runbooks/{02,05}-*.md` — `#enrollment-status-page` fragment rewrites
- `docs/admin-setup-android/{04,08}-*.md` — `#byod`/`#cope` fragment rewrites
- `docs/l2-runbooks/10-macos-log-collection.md` — `#intunemacODC` case-fix rewrite
- `docs/admin-setup-apv2/02-etg-device-group.md` — ETG fragment rewrite (2 links)
- `docs/_glossary-apple-business.md` — Edit-without-View fragment rewrite
- `.planning/milestones/v1.20-GOV-02-LEDGER.md` — 1 row appended (grep-before-edit proof)
- `.planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md` — Task 1 rewrite
  table, Task 2 dry-run checkpoint, the full closed 51-pair ledger, both D-15 rulings

## Decisions Made

See frontmatter `decisions` for the full list. Summary: every target heading was re-confirmed
live (not accepted from the plan's table) per D-03; a 2-link discrepancy between the carried 6252
relative-link figure and this plan's directly-measured 6250 was recorded with its derivation
rather than forced to match, per this phase's own D-36 discipline — the file count (274) matches
exactly and this plan's own edits are confirmed link-count-neutral, so the discrepancy predates
this plan and is not chased further; the 0/0/0 failure total is confirmed independently by both
the widened dry-run and the unpatched checker.

## Deviations from Plan

### Auto-fixed Issues

None — no Rule 1/2/3 auto-fixes were required. All edits were mechanical same-line fragment
substring rewrites with no bugs, missing functionality, or blocking issues encountered.

### Measured deviations from the plan's own literal acceptance-criteria text (recorded per D-36, not silently reconciled)

**1. Relative-link count measures 6250, plan's acceptance text states 6252**
- **Found during:** Task 2 dry-run measurement
- **Detail:** A direct instrumented count over the same `walkMd`/`extractLinks`/`resolveLinkTarget`
  functions the checker itself uses (temporarily added to the widened checker, reverted before
  commit) measures 274 files / 6250 relative links at this plan's closing state. The file count
  matches the plan's stated 274 exactly; only the link count differs, by 2.
- **Verification:** `git diff --numstat -- docs/` across this plan's 12 touched files shows equal
  added/removed line counts in every file — confirming this plan's own edits added or removed zero
  links. The discrepancy therefore predates this plan (already the carried 6252 figure at Plan 04's
  close). Not chased further; recorded per D-36 rather than silently forced to 6252.

**2. `git status --porcelain | grep -vc '^.. \.planning/'` measures 8, plan expects 0**
- **Found during:** Task 2 acceptance-criteria verification
- **Detail:** All 8 hits are pre-existing untracked repo clutter unrelated to this plan's work
  (`.agents/`, `.claude/skills/fireworks-tech-graph/`,
  `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs`, `.obsidian/`, `e1`, `e2`, `ee`,
  `skills-lock.json`) — present in the working tree before this plan's session started (confirmed
  against the session's opening `git status`), not introduced by any edit in this plan.
- **Verification:** `git status --short` after both task commits shows only the intended tracked
  files as modified; no new untracked file was created by this plan's edits. Per the deviation
  rules' scope boundary, out-of-scope pre-existing clutter is left untouched, not auto-cleaned.

---

**Total deviations:** 0 auto-fixed. 2 measured discrepancies against the plan's own literal
acceptance-criteria text, both recorded with derivation shown rather than silently reconciled or
force-fixed, per this phase's own D-36 discipline.
**Impact on plan:** None substantive — both discrepancies are artifacts of pre-existing state
(a carried link-count figure and pre-existing untracked repo clutter), not defects in this plan's
corpus edits. The plan's real substantive criteria — 0 broken file targets, 0 broken anchors, 0
total, 51-pair ledger closed and reconciled — all hold exactly.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Plan 06 can proceed against this plan's measured 0-broken-anchor, 0-broken-file-target ground
  truth. LINK-04 is still **NOT** marked complete by this plan — the requirement's own text names
  the corpus-wide checker's exit code as the trigger, and the unpatched `check-nav-hub-links.mjs`
  currently scans only the 4 nav-hubs by default (already green since Phase 123); Plan 06 owns
  widening the checker's default scope to the full corpus-wide scan this plan's dry-run only
  exercises temporarily.
- No blockers. c17 (234/0/0), carve-gate (98 in-scope, all on-list), the widened dry-run (0/0/0),
  and the unpatched checker (0/0/0, exit 0) all green at this commit.

---
*Phase: 143-link-coverage-fence-mask-unification*
*Completed: 2026-08-11*

## Self-Check: PASSED

- FOUND: `docs/error-codes/{02,03,04,05}-*.md`, `docs/l1-runbooks/{02,05}-*.md`,
  `docs/l2-runbooks/10-macos-log-collection.md`, `docs/admin-setup-android/{04,08}-*.md`,
  `docs/admin-setup-apv2/02-etg-device-group.md`, `docs/_glossary-apple-business.md`,
  `.planning/milestones/v1.20-GOV-02-LEDGER.md`, `143-EVIDENCE.md`, this SUMMARY
- FOUND commits: `ecd1fef1`, `6f9f9064` in `git log --oneline`
