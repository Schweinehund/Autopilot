---
phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close
plan: 02
subsystem: infra
tags: [audit-harness, path-a-lineage, sidecar-allowlist, milestone-close, node]

# Dependency graph
requires:
  - phase: 128-01
    provides: Wave-0 pre-anchor SHA (f0e1f163), V116 SHA positively confirmed (3dd2512), the independently re-derived 35-pin sidecar -1 line-shift worklist
provides:
  - "v1.17-milestone-audit.mjs — 15th Path-A milestone audit harness, C1-C17 inherited byte-verbatim from v1.16, sidecar path repointed to v1.17-audit-allowlist.json"
  - "v1.17-audit-allowlist.json — sidecar copy with the mandatory 35-pin -1 line-shift (4 HYG-02-touched files) applied and re-verified against live corpus; harness runs C1-C17 all GREEN (16/16 PASS, exit 0)"
  - "BASELINE_21 freshness comment appended to regenerate-supervision-pins.mjs, back-anchored to the JIT pre-Atom-1 HEAD (a96f3b7)"
  - "Atom 1 landed as ONE indivisible 3-file commit (fac3bc2)"
affects: [128-03, 128-04, 128-05]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Path-A copy-then-repoint: byte-copy the predecessor harness/sidecar, repoint only header/provenance/version tokens, never touch check-body logic"
    - "Programmatic multiset-consumption shift: applied the 35-pin -1 line-shift via a Node script matching (file,line) pairs against the exact worklist (including the duplicate _glossary-android.md:221 entry), asserting zero leftover/unconsumed spec entries before writing"
    - "JIT pre-Atom-1 HEAD capture (git rev-parse HEAD immediately before the commit) as the BASELINE_N back-anchor target, distinct from the Wave-0 anchor — mirrors the Phase 119/125 precedent where an intervening Jira-sync commit shifted the true predecessor"

key-files:
  created:
    - scripts/validation/v1.17-milestone-audit.mjs
    - scripts/validation/v1.17-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs

key-decisions:
  - "Verified the -1 shift empirically (not just arithmetically) for every one of the 4 sidecar categories (safetynet_exemptions/C1, supervision_exemptions/C2, c7_knox_allowlist/C7, c9_exemptions/C9) by independently computing live-corpus violation positions with the OLD unshifted sidecar and confirming each unpinned violation lands exactly at (old_pin_line - 1) before writing the new sidecar"
  - "Confirmed two of the four safetynet_exemptions pins (glossary-android:187/202, android-version-matrix:102/104) are already orphaned/dead pins relative to live content (the file's only 2 real 'SafetyNet' occurrences sit at unrelated lines 311/335 and pass via the C1 nearby-keyword-window fallback, not the exact-line pin) — shifted them anyway per the plan's uniform-shift mandate since doing so is harmless and preserves sidecar structural fidelity"
  - "Captured the JIT pre-Atom-1 HEAD (a96f3b7) immediately before the Atom-1 commit rather than reusing the 128-01 Wave-0 anchor (f0e1f163) — an intervening Jira-sync commit (a96f3b7 itself, 'docs(128-01): complete Wave-0 anchor plan') landed between Wave-0 and Atom-1 authoring, so the true predecessor differs, mirroring the exact Phase 119/125 precedent already documented in the BASELINE_19/20 comment blocks"

patterns-established: []

requirements-completed: [HARN-09]

# Metrics
duration: 28min
completed: 2026-07-11
---

# Phase 128 Plan 02: Atom 1 — v1.17 Milestone-Audit Harness + 35-Pin Sidecar Repoint + BASELINE_21 Summary

**Authored the v1.17 Path-A milestone-audit harness (byte-identical C1-C17 logic to v1.16) plus its sidecar allowlist carrying a targeted -1 line-shift on exactly 35 pins across 4 HYG-02-touched files, defusing the stale-line-pin landmine that would otherwise trip BLOCKING C1/C2/C7/C9 checks — harness confirmed GREEN (16/16 PASS, exit 0) against live HEAD, landed as one indivisible 3-file commit.**

## Performance

- **Duration:** 28 min
- **Started:** 2026-07-11T07:05:00Z (approx, following 128-01 completion)
- **Completed:** 2026-07-11T17:33:00Z
- **Tasks:** 3 completed
- **Files modified:** 3 (2 new, 1 modified)

## Accomplishments

- Copied `v1.16-milestone-audit.mjs` byte-for-byte to `v1.17-milestone-audit.mjs`, repointing only the header/lineage/source-of-truth comments and the `parseAllowlist` sidecar-path constant (`v1.16-audit-allowlist.json` → `v1.17-audit-allowlist.json`); `git diff --no-index` against the v1.16 source confirms the change surface is exactly the header block + one `readFile(...)` string — all 16 C1-C17 check bodies (id 4 and id 8 retired/absent, matching v1.16's own numbering) are byte-identical
- Independently re-derived and empirically verified the 35-pin `-1` line-shift is correct — not just arithmetically (old-1) but by running each of C1/C2/C7/C9's actual match logic against the live post-HYG-02 corpus with the OLD (unshifted) sidecar and confirming every real unpinned violation lands exactly at `(old_pin_line - 1)`: 13+2 = supervision + c9 hits on `_glossary-android.md`, 7+1 on `android-capability-matrix.md`, 2+1 on `03-fully-managed-cobo.md`, 1+2 on `03-android-version-matrix.md`, plus all 5 bare-Knox hits at the shifted glossary lines
- Applied the shift programmatically via a Node script that consumes a multiset of the exact 35 `(file, line)` pairs from the 128-01 worklist (correctly handling the duplicate `_glossary-android.md:221` entry as two independent shifts) and asserted **zero leftover/unconsumed spec entries** — eliminating any risk of a manual off-by-one or a skipped pin
- Ran `node scripts/validation/v1.17-milestone-audit.mjs --verbose` against live HEAD post-shift: **16 passed, 0 failed, 0 skipped, exit 0** — C1 (SafetyNet), C2 (supervision), C7 (Knox), and C9 (COPE banned-phrase) all GREEN, up from the pre-shift baseline where the same harness (run against the OLD v1.16 sidecar for comparison) showed C2/C7/C9 all FAILING (33/5/4 violations respectively) due to the stale pins
- Discovered and documented that 2 of the 4 `safetynet_exemptions` pins in the shifted set (glossary-android 187→186, 202→201; android-version-matrix 102→101, 104→103) were already orphaned relative to live content even before this shift — the file's only 2 real SafetyNet mentions sit at unrelated lines and pass via C1's nearby-keyword-window fallback, not an exact-line pin match; shifted them anyway per the uniform-shift mandate (harmless, preserves structural fidelity, matches the plan's explicit instruction)
- Appended the BASELINE_21 freshness comment to `regenerate-supervision-pins.mjs`, back-anchored to the JIT pre-Atom-1 HEAD `a96f3b7687b3ef8092599500097e9b0613dfa6cd` (captured via `git rev-parse HEAD` immediately before the commit) — NOT the Wave-0 anchor `f0e1f163`, because an intervening Jira-sync/plan-completion commit landed between Wave-0 and Atom-1 authoring, mirroring the exact Phase 119/125 precedent already recorded in the BASELINE_19/20 comment blocks; confirmed via `git diff --stat` that the change is purely 11 comment-line insertions, 0 deletions — the `BASELINE_9` line-coordinate array itself is byte-unchanged
- Landed all three files as ONE indivisible commit (`fac3bc2`) via direct `git add`/`git commit` (not the SDK, per this repo's CRITICAL_ENVIRONMENT_GOTCHA) — `git log -1 --name-only` confirms exactly the 3 named files and no others

## Task Commits

Tasks 1-3 were authored as working-tree edits and landed together in a single atomic Atom-1 commit, per the plan's explicit mandate ("Atom 1 lands as ONE indivisible commit of exactly these three files; it is never folded into Atom 2") — this deliberately overrides the default per-task-commit protocol.

1. **Task 1: Path-A copy `v1.16-milestone-audit.mjs` → `v1.17-milestone-audit.mjs`** - working-tree edit, verified (`node -c` parse OK, diff-scope confirmed header-only)
2. **Task 2: Path-A copy allowlist with the 35-pin -1 line-shift** - working-tree edit, verified (harness exit 0, 35 pins re-verified against live corpus)
3. **Task 3: Append BASELINE_21 + land Atom 1 as one commit** - `fac3bc2` (feat)

**Plan metadata:** (this SUMMARY + STATE/ROADMAP update, separate commit)

## Files Created/Modified

- `scripts/validation/v1.17-milestone-audit.mjs` - 15th Path-A milestone-audit harness; C1-C17 byte-identical to v1.16; header/lineage/sidecar-path repointed to v1.17
- `scripts/validation/v1.17-audit-allowlist.json` - sidecar allow-list; 35 pins across 4 HYG-02 files shifted -1 and re-verified; all other ~470+ entries copied byte-verbatim; `generated`/`phase` fields repointed to Phase 128
- `scripts/validation/regenerate-supervision-pins.mjs` - BASELINE_21 freshness comment appended (back-anchored to JIT pre-Atom-1 HEAD `a96f3b7`); `BASELINE_9` array untouched

## Decisions Made

- Used a programmatic (Node script, multiset-consumption) shift rather than manual JSON editing for the 35-pin repoint — eliminates any risk of a miscounted duplicate (`_glossary-android.md:221` appears twice in `c7_knox_allowlist`) or a skipped entry; the script asserted `totalSpec === shiftedCount === 35` and zero leftover before writing the file
- Empirically re-verified every one of the 35 shifts against live corpus content (not just the arithmetic `old - 1`) by independently recomputing C1/C2/C7/C9's actual match positions — satisfies RESEARCH Pitfall 3's "re-verify, don't blind-decrement" mandate with direct evidence, not just trust in the recorded worklist
- Captured the BASELINE_21 back-anchor HEAD at Task-3 commit time (`a96f3b7`), distinct from the 128-01 Wave-0 anchor (`f0e1f163`) — the intervening `docs(128-01): complete Wave-0 anchor plan` commit is itself the JIT pre-Atom-1 predecessor, consistent with the documented Phase 119/125 two-anchor distinction

## Deviations from Plan

None — plan executed exactly as written. All three tasks' acceptance criteria were met exactly as specified: `node -c` parse succeeded, the diff-scope check confirmed header-only changes, the harness ran GREEN with exit 0, the BASELINE_9 array stayed byte-unchanged, and Atom 1 landed as a single 3-file commit via direct git.

## Issues Encountered

None. The empirical re-verification of the 35-pin shift surfaced two informational findings (2 of the 4 `safetynet_exemptions` pins were already dead/orphaned relative to live content, unrelated to this phase's edit) but these did not block or require any deviation — C1 already passes via the nearby-keyword-window fallback regardless of exact-pin accuracy, and the plan's instruction was to apply the uniform shift to all 35 entries regardless.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The current-milestone harness surface (`v1.17-milestone-audit.mjs` + `v1.17-audit-allowlist.json`) exists and runs GREEN against live HEAD — ready for `check-phase-128` (Atom 2, plan 128-03) to target as its `HARNESS` constant and for the new `audit-harness-v1.17-integrity.yml` CI workflow to run directly
- BASELINE_21 is in place, closing the BASELINE_20 v1.16 carry-over per the HARN-09 contract
- Atom 2 (128-03) can proceed with zero remaining discovery: pin `V116: '3dd2512'` + `readAtV116Close` export in `frozen-at-close.mjs`, author `check-phase-126/127/128.mjs`, convert the 8 enumerated validators (`check-phase-49/58/59/62/101/109/118/121.mjs`) to frozen-aware reads, and author `audit-harness-v1.17-integrity.yml`
- No blockers or concerns for downstream plans

---
*Phase: 128-v116-pin-15th-path-a-lineage-bump-terminal-close*
*Completed: 2026-07-11*
