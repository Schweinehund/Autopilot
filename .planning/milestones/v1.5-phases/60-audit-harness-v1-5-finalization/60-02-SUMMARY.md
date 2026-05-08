---
phase: 60-audit-harness-v1-5-finalization
plan: 02
subsystem: docs
tags: [markdown, anchor-shims, broken-links, mlc-3.14.2, l1-runbooks, macos-ade]

requires:
  - phase: 48-audit-harness-bootstrap-broken-link-sweep-first-pass
    provides: 48-VERIFICATION-broken-links.md baseline (51 Category A findings; rows 41-50 owned by this plan)
provides:
  - 10 GFM-honored `<a id="..."></a>` shims across 4 macOS L1 runbooks (file 11=3, file 12=2, file 13=3, file 14=2)
  - 10 of 51 Category A baseline findings closed (pre-Plan-08 C13 promotion path)
  - Per-file commit cadence (D-25 progressive landing) — 4 atomic `fix(60-02):` commits
affects:
  - Plan 60-08 (atomic harness commit / C13 informational→blocking promotion gate)
  - Plan 60-09 (pre-promotion second-pass mlc sweep — these 10 findings now resolved)
  - Plan 60-10 (terminal re-audit close)

tech-stack:
  added: []
  patterns:
    - "D-08(b) HTML-shim cluster-edit pattern: <a id=\"...\"></a> on its own line immediately above existing H2 with intact {#explicit-id} attribute"
    - "Per-file atomic commit per D-25 (4 commits for 4 files; 10 shims total)"
    - "Per-commit harness regression-guard (node scripts/validation/v1.5-milestone-audit.mjs exit 0)"

key-files:
  created: []
  modified:
    - "docs/l1-runbooks/11-macos-setup-assistant-failed.md (+3 shim lines: authentication-failure, await-configuration-stuck, network-connectivity)"
    - "docs/l1-runbooks/12-macos-profile-not-applied.md (+2 shim lines: profile-not-showing, profile-showing-not-working)"
    - "docs/l1-runbooks/13-macos-app-not-installed.md (+3 shim lines: dmg-pkg-missing, vpp-missing, app-install-failed)"
    - "docs/l1-runbooks/14-macos-compliance-access-blocked.md (+2 shim lines: device-non-compliant, compliant-access-blocked)"

key-decisions:
  - "Used D-08(b) HTML-shim approach (not D-08(a) link-text rewrite) for ALL 10 anchors — preserves intentional anchor names; mlc 3.14.2 doesn't honor existing {#explicit-id} attributes but does honor <a id> shims"
  - "Per-file commit cadence (4 commits) vs single bulk commit — matches D-25 progressive-landing precedent for cluster-edit safety"
  - "Heading text and {#explicit-id} attributes preserved verbatim (zero behavioral diff for non-mlc consumers including GFM auto-slug + GitHub UI)"

patterns-established:
  - "D-08(b) HTML-shim: when a markdown file has <H2/H3> heading with intact `{#explicit-id}` attribute that mlc 3.14.2 doesn't recognize, insert `<a id=\"<anchor>\"></a>` on its own line followed by blank line above the heading; shim is GFM-honored AND mlc-honored AND adds zero visible content"
  - "Cluster-edit safety: each file committed atomically; harness regression-guard run after EACH commit (4 separate harness runs across this plan); halts immediately on any FAIL"

requirements-completed: [AUDIT-05]

duration: ~10min
completed: 2026-05-06
---

# Phase 60 Plan 02: Broken-Anchor Cluster Edit (4 macOS L1 Runbooks) Summary

**10 GFM-honored `<a id="..."></a>` anchor shims added across 4 macOS L1 runbooks via D-08(b) HTML-shim cluster-edit pattern; 10 of 51 Category A baseline broken-anchor findings closed; mlc 3.14.2 confirms 0 broken refs in fixed files post-edit**

## Performance

- **Duration:** ~10 min (including baseline harness check + mlc per-file post-fix verification)
- **Started:** 2026-05-06T19:18:00Z
- **Completed:** 2026-05-06T19:28:29Z
- **Tasks:** 2 (Task 1 = 1 file / 3 shims / 1 commit; Task 2 = 3 files / 7 shims / 3 commits)
- **Files modified:** 4
- **Total shims:** 10 (3 + 2 + 3 + 2)

## Accomplishments

- 10 broken anchor refs in `docs/l1-runbooks/{11,12,13,14}-macos-*.md` (per 48-VERIFICATION-broken-links.md rows 41-50) now resolve to existing in-document HTML-id shims
- D-08(b) HTML-shim cluster-edit pattern applied uniformly across all 4 files (no link-text rewrites; no heading text edits; no `{#explicit-id}` attribute edits)
- 4 atomic per-file commits (per D-25 progressive landing) — bisectable on a per-file basis
- Per-commit harness regression-guard PASSED 4× consecutively (`node scripts/validation/v1.5-milestone-audit.mjs` exit 0 after each commit)
- Post-fix mlc 3.14.2 sweep on the 4 fixed files reports 0 broken anchors — pre-Plan-09 second-pass criterion (D-12) preemptively satisfied for this file group
- TOC bullet text at lines 25-29 of each file preserved verbatim (only HTML shims added)
- Frontmatter preserved (1× `last_verified:` per file unchanged)

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix 11-macos-setup-assistant-failed.md (3 anchor shims)** - `bc96b05` (fix)
2. **Task 2 file 12: Fix 12-macos-profile-not-applied.md (2 anchor shims)** - `3d38e39` (fix)
3. **Task 2 file 13: Fix 13-macos-app-not-installed.md (3 anchor shims)** - `c4bb477` (fix)
4. **Task 2 file 14: Fix 14-macos-compliance-access-blocked.md (2 anchor shims)** - `d7c4230` (fix)

**Plan metadata:** This SUMMARY.md will be committed by the wave-close orchestrator (worktree-mode parallel execution; do not modify shared STATE.md or ROADMAP.md from within executor).

## Files Created/Modified

- `docs/l1-runbooks/11-macos-setup-assistant-failed.md` — Added 3 shims (`<a id="authentication-failure"></a>`, `<a id="await-configuration-stuck"></a>`, `<a id="network-connectivity"></a>`) above their corresponding H2 sections at original lines 31, 53, 73
- `docs/l1-runbooks/12-macos-profile-not-applied.md` — Added 2 shims (`<a id="profile-not-showing"></a>`, `<a id="profile-showing-not-working"></a>`) above their corresponding H2 sections at original lines 30, 54
- `docs/l1-runbooks/13-macos-app-not-installed.md` — Added 3 shims (`<a id="dmg-pkg-missing"></a>`, `<a id="vpp-missing"></a>`, `<a id="app-install-failed"></a>`) above their corresponding H2 sections at original lines 31, 53, 73
- `docs/l1-runbooks/14-macos-compliance-access-blocked.md` — Added 2 shims (`<a id="device-non-compliant"></a>`, `<a id="compliant-access-blocked"></a>`) above their corresponding H2 sections at original lines 33, 59

## Decisions Made

- **D-08(b) HTML-shim approach uniformly chosen over D-08(a) link-text rewrite** for all 10 anchors. Rationale: (1) all 10 broken anchors have a clearly-corresponding existing H2 section with an intact `{#explicit-id}` attribute that already encodes the intent; (2) `<a id="...">`-shim is honored by both mlc 3.14.2 (the harness link-checker) AND GFM (the GitHub renderer); (3) zero link-call-site rewrites means quick-nav TOC bullets remain untouched and authoritative; (4) cluster-edit per-file is small surface (2-3 inserts each).
- **Per-file commit cadence over single bulk commit** — 4 atomic commits matches D-25 progressive-landing precedent established in Phase 56-58, makes any future bisect surgical to a single file, and lets the harness regression-guard catch a problem at the smallest possible blast radius.
- **No fall-back to D-08(a) needed** — every one of the 10 broken anchors had a corresponding existing H2 section in its host file (verified by reading each file in full before edits); zero "intended-but-never-authored content" cases occurred.

## Deviations from Plan

None — plan executed exactly as written.

All 10 anchor shims were inserted in the locations indicated by the plan. No fall-back to D-08(a) was required (all H2 targets existed in all 4 files). Per-file commit cadence matched plan acceptance criteria. Harness regression-guard PASSED after each commit. Post-fix mlc sweep returned 0 broken refs on the 4 fixed files.

## Issues Encountered

None. The plan was precise enough about the cluster-edit pattern and the H2/H3 target locations that each file required only 2-3 simple `Edit`-tool calls to insert the shims.

## Verification Evidence

```
$ grep -c '<a id=' docs/l1-runbooks/{11,12,13,14}-macos-*.md
docs/l1-runbooks/11-macos-setup-assistant-failed.md:3
docs/l1-runbooks/12-macos-profile-not-applied.md:2
docs/l1-runbooks/13-macos-app-not-installed.md:3
docs/l1-runbooks/14-macos-compliance-access-blocked.md:2
TOTAL = 10 shims (matches plan SC: 3+2+3+2 = 10)

$ node scripts/validation/v1.5-milestone-audit.mjs > /dev/null 2>&1 && echo OK
OK (harness regression-guard PASSED — exit 0 — confirmed after each of 4 commits)

$ for f in 11 12 13 14; do npx markdown-link-check@3.14.2 -q "docs/l1-runbooks/$f-macos-*.md" 2>&1 | grep -E '✖|broken'; done
(no output — 0 broken refs across all 4 files; D-12 pre-Plan-09 second-pass criterion satisfied for this file group)

$ git log --oneline -10 | grep 'fix(60-02)'
d7c4230 fix(60-02): repair 2 broken anchors in 14-macos-compliance-access-blocked.md
c4bb477 fix(60-02): repair 3 broken anchors in 13-macos-app-not-installed.md
3d38e39 fix(60-02): repair 2 broken anchors in 12-macos-profile-not-applied.md
bc96b05 fix(60-02): repair 3 broken anchors in 11-macos-setup-assistant-failed.md (cluster-edit per D-08)
4 commits ✓ (matches plan SC: 4 separate per-file commits)

$ for f in 11-macos-setup-assistant-failed 12-macos-profile-not-applied 13-macos-app-not-installed 14-macos-compliance-access-blocked; do grep -c 'last_verified:' "docs/l1-runbooks/$f.md"; done
1 / 1 / 1 / 1 ✓ (frontmatter unchanged in all 4 files; pre-edit values preserved)
```

## Threat Model Disposition

| Threat ID | Disposition | Outcome |
|-----------|-------------|---------|
| T-60-02-01 (Tampering on runbook content) | mitigate | All 4 commits ran harness regression-guard exit-0 immediately post-edit; all 4 PASSED. No C1-C13 violation introduced. |
| T-60-02-02 (Information Disclosure on runbook) | accept | Shims are zero-content HTML elements (`<a id="..."></a>`); no information added or revealed beyond what each file already documented. |

No new threat surface introduced.

## Self-Check: PASSED

Verified:
- All 4 modified files exist on disk: `docs/l1-runbooks/{11,12,13,14}-macos-*.md` ✓
- All 4 commits present in git log: `bc96b05`, `3d38e39`, `c4bb477`, `d7c4230` ✓
- Total shim count = 10 (matches plan SC 3+2+3+2) ✓
- Harness regression-guard exit 0 ✓
- mlc 3.14.2 reports 0 broken refs in the 4 fixed files ✓
- TOC bullets at lines 25-29 of each file preserved verbatim ✓
- Frontmatter `last_verified` count = 1 per file ✓

## Next Phase Readiness

- 10 of 51 Category A baseline broken-anchor findings now closed (Plans 60-03 through 60-07 own the remaining 41 across other file groups per Phase 60 plan-set)
- Pre-Plan-08 atomic-harness-commit C13 promotion path: this plan's 10 closures contribute to the running tally of "Category A findings resolved before C13 flips informational→blocking"
- Pre-Plan-09 second-pass mlc sweep already PASSES 0 broken refs on these 4 files (early credit for D-12 baseline-comparison criterion)
- No blockers for downstream Phase 60 plans

---
*Phase: 60-audit-harness-v1-5-finalization*
*Plan: 02*
*Completed: 2026-05-06*
