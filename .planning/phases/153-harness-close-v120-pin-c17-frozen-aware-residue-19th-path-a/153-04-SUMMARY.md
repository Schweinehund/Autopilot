---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
plan: 04
subsystem: infra
tags: [validation-harness, path-a-lineage, allowlist-sidecar, pin-drift, git-object-store]

# Dependency graph
requires:
  - phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
    provides: the recorded pre-conversion commit (834418a2) and blob hash (9b0e77240a3bf96fc94547273914e52f9c12fa76) of v1.20-milestone-audit.mjs, plus MILESTONE_CLOSE_SHAS.V120 = 246fa3dd (153-01/153-03)
provides:
  - v1.21-milestone-audit.mjs -- the 19th Path-A lineage harness, forked from the UNCONVERTED v1.20 source, live-HEAD by construction, 16/16 checks green
  - v1.21-audit-allowlist.json -- header-fields-only sidecar copy, all pin arrays byte-identical
  - BASELINE_25 comment block in regenerate-supervision-pins.mjs, positioned per the existing forward pointer
  - a written ruling that the pin-regeneration helper's --report mode is never cited as pin-drift proof, and that --self-test IS run and its result recorded (D-48)
affects: [153 apex plan (check-phase-153.mjs), the 18th CI workflow plan]

actuals:
  tokens: 22786
  tasks: 3
  commits: 3

tech-stack:
  added: []
  patterns:
    - "Path-A copy source is always retrieved from git history via `git show <pre-conversion-commit>:<path>`, hash-verified against a blob hash recorded by the PRIOR plan before its own conversion -- never from the converted form on disk (D-45)"
    - "allowlist sidecar Path-A copy: header-fields-only diff (generated + phase), every pin array byte-identical, proven via same-top-level-key-set check plus a header-fields-excluded JSON diff"
    - "BASELINE_NN refresh blocks are pure comment appends immediately before the shared `const BASELINE_9` array -- the array itself is never renamed across 17 refreshes; only the audit-trail comment grows"

key-files:
  created:
    - scripts/validation/v1.21-milestone-audit.mjs
    - scripts/validation/v1.21-audit-allowlist.json
  modified:
    - scripts/validation/regenerate-supervision-pins.mjs

key-decisions:
  - "The harness's sidecar-read repoint (line naming v1.21-audit-allowlist.json) landed in Task 1's commit, not Task 2's, because the plan's own Task 1 action list names \"the sidecar read path inside the harness body\" as one of the literals to repoint during the fork. This means Task 1's own <verify> command (harness --verbose exits 0) genuinely fails at 12/4/0 immediately after Task 1's commit alone -- the sidecar does not exist until Task 2. This is an artifact of the plan's own task decomposition, not a defect: the plan states the three artifacts land as ONE indivisible unit (D-49), and the true green triple is captured once Task 2's commit lands. Recorded here so a later reader does not mistake Task 1's intermediate red state for a regression."
  - "BASELINE_25's pin-drift proof reuses the V120 back-anchor SHA (246fa3dd) that this same phase established in 153-01/153-03 -- unlike BASELINE_24, which explicitly deferred its own back-anchor pin (V120-PIN-DEFERRAL) because V120 did not exist as a MILESTONE_CLOSE_SHAS entry at Phase 144 authoring time. The intersection this time is 2 candidate files (down from BASELINE_24's 5), and both are c13_rotting_external count-based pins with no `line` key -- so 0 line-pinned entries are at risk, a stronger result than BASELINE_24's 3-of-5 line-pinned finding."

requirements-completed: [HARN-04]

coverage:
  - id: D1
    description: "v1.21-milestone-audit.mjs forked from the UNCONVERTED v1.20 source (git show 834418a2:...), blob hash verified byte-identical to the hash recorded before 153-03's conversion, live-HEAD by construction (zero frozen-at-close imports), C1-C17 inherited verbatim with no C18, header states both the 19th lineage ordinal and the D-46 born-live-HEAD residue"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "git hash-object on the recovered file immediately post-recovery == 9b0e77240a3bf96fc94547273914e52f9c12fa76 (matches 153-03-SUMMARY.md)"
        status: pass
      - kind: other
        ref: "node scripts/validation/v1.21-milestone-audit.mjs --verbose (16 passed, 0 failed, 0 skipped, exit 0, after Task 2's sidecar lands)"
        status: pass
      - kind: other
        ref: "grep -c frozen-at-close scripts/validation/v1.21-milestone-audit.mjs == 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "v1.21-audit-allowlist.json is a header-fields-only copy of v1.20's sidecar (generated + phase changed, every pin array and the nested rotting-external object byte-identical); harness repointed to it; parse-degradation on a missing sidecar produces a loud non-silent exit-1 failure (4 FAILs), never a green pass"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "diff of the two sidecars with generated+phase excluded: empty (JSON re-serialized, sorted keys)"
        status: pass
      - kind: other
        ref: "fail-loud probe: sidecar renamed away -> harness exits 1 at 12 passed/4 failed; restored -> 16/0/0 exit 0"
        status: pass
      - kind: other
        ref: "recursive pinned-file-set size 33 vs naive top-level walk 16 (matches the predecessor's own recorded 33-vs-16 delta)"
        status: pass
    human_judgment: false
  - id: D3
    description: "BASELINE_25 appended following BASELINE_24's shape at the position the existing forward pointer names; self-test exits 0 before and after; both instrument rulings (report-mode never cited as proof; self-test IS run) recorded"
    requirement: "HARN-04"
    verification:
      - kind: other
        ref: "node scripts/validation/regenerate-supervision-pins.mjs --self-test: PASS both before (Diff: identical) and after the append"
        status: pass
      - kind: other
        ref: "grep -n BASELINE_25/BASELINE_26: new block at line 567, after BASELINE_24's line 563 forward pointer; BASELINE_26 forward pointer present at line 583"
        status: pass
      - kind: other
        ref: "git diff on the four hardcoded v1.7-audit-allowlist.json reference lines (:290, :336, :582, :584 pre-edit numbering): empty -- untouched"
        status: pass
    human_judgment: false

duration: ~35min
completed: 2026-08-29
status: complete
---

# Phase 153 Plan 04: V120 Pin — 19th Path-A Lineage Bump Summary

**Forked `v1.21-milestone-audit.mjs` from the unconverted (pre-153-03) `v1.20-milestone-audit.mjs` blob by hash-verified `git show`, authored its header-fields-only `v1.21-audit-allowlist.json` sidecar with a proven fail-loud parse, and appended `BASELINE_25` with a fresh V120-back-anchored pin-drift proof.**

## Performance

- **Duration:** ~35 min
- **Completed:** 2026-08-29
- **Tasks:** 3
- **Files modified:** 3 (2 new, 1 appended)

## Accomplishments

- **Recovery + hash verification (D-45):** `git show 834418a2b4f7807a0bb839a63995312bd126e669:scripts/validation/v1.20-milestone-audit.mjs` written to `scripts/validation/v1.21-milestone-audit.mjs`; `git hash-object` on the result immediately post-recovery == `9b0e77240a3bf96fc94547273914e52f9c12fa76`, exactly matching the blob hash `153-03-SUMMARY.md` recorded before that plan's own conversion landed. This is the UNCONVERTED source -- the on-disk `v1.20-milestone-audit.mjs` today reads its corpus at the frozen V120 SHA; a fork of that form would have made the new harness silently audit v1.20's frozen tree instead of its own live one.
- **Fork repointing:** header title/lineage chain (now `... → v1.20 → v1.21`)/ordinal statement (explicitly distinguishing the 19th Path-A lineage bump from the 18th frozen-aware-conversion ordinal that landed on v1.20's own file one plan earlier in this same phase), source-of-truth line (repointed to `153-CONTEXT.md`), sidecar clause (repointed and restated -- not carried -- to name `v1.21-audit-allowlist.json` and explicitly defer a back-anchor pin-drift claim since v1.21 has no close SHA yet), usage line, and the sidecar read path inside the harness body. C1-C17 inherited verbatim (16 checks, ids 1-7/9-17); no C18 folded in (D-44).
- **Residue statement (D-46):** header states the harness is born live-HEAD (including its C17 leg) because there is no V121 close SHA to freeze against, that it becomes v1.22's sole unconverted harness, and names `.planning/milestones/v1.21-DEFERRED-CLEANUP.md` as the tracking location.
- **Remaining `v1.20` literals enumerated (6 hits, all deliberate lineage-history references, none operational):**
  1. Line 2 -- `Path A copy of v1.20` (lineage provenance statement)
  2. Line 3 -- names the 18th frozen-aware-conversion ordinal that landed on v1.20's own file in 153-03 (historical distinction, D-10)
  3. Line 6 -- lineage chain `... → v1.19 → v1.20 → v1.21` (historical chain, grows by one link each generation, never truncated)
  4. Line 16 -- residue comparison: "exactly as v1.20 was this milestone's sole unconverted harness before 153-03 converted it" (historical precedent citation)
  5. Line 19 -- sidecar clause: "v1.21 Path-A from v1.20's sidecar" (provenance statement)
  6. Line 27 -- pin-drift method citation: "the same method v1.20's header recorded" (methodology precedent, not an operational path)

  No operational literal (usage line, sidecar read path, `Source of truth`) names v1.20 -- all four repointed to v1.21/153-CONTEXT.md.
- **Sidecar (D-47):** `v1.21-audit-allowlist.json` authored as a header-fields-only copy -- `generated: 2026-08-29T00:00:00Z`, `phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a`; same top-level key set as v1.20's sidecar (12 keys) confirmed; a JSON diff with `generated`/`phase` excluded is empty -- every pin array (5 top-level arrays plus the nested `c13_rotting_external` object) is byte-identical. Recursive pinned-file-set size: **33**. Naive top-level-only walk: **16** (undercounts by roughly half, exactly the gap the predecessor's own header records) -- the recursive figure is the correct one.
- **Fail-loud probe:** sidecar temporarily renamed away, harness re-run -- exit 1, `12 passed, 4 failed, 0 skipped` (C2/C7/C9/C13 all fail once their exemption/allowlist arrays degrade to empty). Restored -- exit 0, `16 passed, 0 failed, 0 skipped`. See "Deviations" below for the precise mechanism (degrade-to-empty is the inherited code path, but the *observable* effect is loud, never a silent green).
- **`BASELINE_25` (D-47/D-48):** appended immediately before `const BASELINE_9 = [` (line 567), following `BASELINE_24`'s shape -- opening comment naming the refresh date/phase/plan and what carry-over it closes (`BASELINE_24`'s `V120-PIN-DEFERRAL`), a body restating that `BASELINE_9` itself is unchanged, and a forward pointer naming `BASELINE_26` as the next refresh. The four hardcoded v1.7-sidecar references (`doReport`, `doEmitStubs`, and two others in `BASELINE_9`-era comments) are untouched, confirmed by an empty diff on those regions.
- **Fresh pin-drift proof for `BASELINE_25`:** unlike `BASELINE_24` (which explicitly deferred its own back-anchor because `MILESTONE_CLOSE_SHAS.V120` did not exist yet at Phase 144 authoring time), this refresh has a real back-anchor available -- `246fa3ddc88a73792744285468a0265dfbab68e8`, landed earlier in this same phase (153-01/153-03). Intersecting the 33-file recursive pinned set with `git diff --name-only 246fa3dd..HEAD -- docs scripts .github` (122 changed files) yields a 2-file candidate: `docs/_glossary-apple-business.md`, `docs/_glossary-linux.md`. Both intersecting sidecar entries are `c13_rotting_external` **count-based file pins with no `line` key** -- so zero `BASELINE_9` line coordinates are at risk from either file's content changes. Real drift is ZERO.
- **Both instrument rulings recorded in writing (D-48):**
  1. The pin-regeneration helper's `--report` mode is **never cited as pin-drift proof anywhere in this phase**. It hardcodes the v1.7 sidecar (`scripts/validation/v1.7-audit-allowlist.json`) at 4 call sites and walks only 26 of 59 line-pins. If a pin-drift claim is needed, it is made the way this plan and its predecessor made it: intersect the recursively-derived pinned file set with the changed-file set since the back-anchor SHA and adjudicate the resulting hunks line-granularly (or, when zero candidates are line-pinned as here, file-granularly against the pin's own kind).
  2. `--self-test` **is run**, in both directions (before and after the append), and its result recorded: `Self-test: PASS` both times, `Diff: identical`, `Un-pinned Tier-2 count: 0`. Per `DEFER-119-A`'s closure precedent (dropped at the v1.20 close because the self-test now exits 0), and because `BASELINE_25` edits the file that owns it, running the self-test cheaply guards against a silent regression from this edit.

## Task Commits

Each task was committed atomically:

1. **Task 1: Path-A copy from the UNCONVERTED predecessor source, recovered from git history and hash-verified** - `32d97eb2` (feat)
2. **Task 2: The allowlist sidecar — header-fields-only copy, pins carried byte-identical, harness reference repointed** - `957f4380` (feat)
3. **Task 3: Append BASELINE_25 and rule explicitly on the pin-drift instrument** - `3fcaf684` (docs)

_No plan-metadata commit yet -- SUMMARY/STATE/ROADMAP land in the next commit per the executor's standard close-out order._

## Files Created/Modified

- `scripts/validation/v1.21-milestone-audit.mjs` - new, 19th Path-A lineage harness, forked from the unconverted v1.20 source; 16 checks (C1-C17, C8 never defined) inherited verbatim; live-HEAD by construction; header states the D-46 born-live-HEAD residue
- `scripts/validation/v1.21-audit-allowlist.json` - new, header-fields-only sidecar copy of v1.20's; all pin arrays byte-identical
- `scripts/validation/regenerate-supervision-pins.mjs` - `BASELINE_25` comment block appended before `const BASELINE_9`; both instrument rulings recorded inline

## Decisions Made

- **Task 1's sidecar-path repoint landed in Task 1's own commit, not deferred to Task 2** -- see Deviations below; this is a plan-text-following choice, not a scope decision, but its side effect (Task 1's own `<verify>` genuinely reads red in isolation) is worth recording plainly.
- **`BASELINE_25`'s pin-drift proof reuses the freshly-landed `V120` back-anchor SHA** rather than leaving the proof deferred a second time -- `246fa3dd` exists as of this same phase's earlier plans, so there is no reason to repeat `BASELINE_24`'s `V120-PIN-DEFERRAL` for `BASELINE_25`.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Corrected assumption] Task 1's own `<verify>` reads FAIL until Task 2 lands, by the plan's own task decomposition**
- **Found during:** Task 1 (running `node scripts/validation/v1.21-milestone-audit.mjs --verbose` immediately after committing Task 1)
- **Issue:** Task 1's action list explicitly instructs repointing "the sidecar read path inside the harness body" as one of the fork literals, and Task 1's acceptance criteria require the harness to exit 0. But `v1.21-audit-allowlist.json` does not exist until Task 2's commit -- so immediately after Task 1's commit alone, the harness's `parseAllowlist()` degrades every `ALLOWLIST.*` field to an empty array/undefined, and four checks (C2, C7, C9, C13) genuinely FAIL: `12 passed, 4 failed, 0 skipped`, exit 1.
- **Fix:** Proceeded exactly as the plan's task ordering specifies -- Task 1 repoints the sidecar path as instructed, Task 2 authors the sidecar. The harness reaches its true green triple (`16 passed, 0 failed, 0 skipped`, exit 0) once Task 2's commit lands, which is quoted above and in Task 2's coverage entry. This is not a defect; it is the mechanical consequence of the plan's own stated "one indivisible unit" framing (D-49) applied to per-task atomic commits. Documented here so the intermediate red state is never mistaken for a regression by a later reader diffing individual task commits.
- **Files modified:** none beyond the planned Task 1/Task 2 files.
- **Verification:** `node scripts/validation/v1.21-milestone-audit.mjs --verbose` immediately post-Task-1-commit: exit 1, `12 passed, 4 failed, 0 skipped`. Same command immediately post-Task-2-commit: exit 0, `16 passed, 0 failed, 0 skipped`.
- **Committed in:** `32d97eb2` (Task 1), resolved by `957f4380` (Task 2) -- no separate remediation commit needed.

**2. [Rule 1 - Corrected assumption] "Fails loud" is a degrade-then-fail effect, not a throw/exit-loud mechanism**
- **Found during:** Task 2 (the fail-loud probe)
- **Issue:** Task 2's must-have truth states the sidecar parse "fails loud rather than degrading to an empty allowlist if the file is missing or malformed." The inherited `parseAllowlist()` function (unchanged, Path-A copied verbatim per D-44's no-code-change boundary) literally IS the "degrade to empty arrays on parse failure" pattern -- its own code comment says so, citing the `check-phase-31.mjs parseInventory()` precedent. It does not throw or print an explicit "sidecar missing" error at parse time.
- **Fix:** Verified empirically rather than assuming either reading. Renaming the sidecar away and re-running the harness does NOT produce a silent green pass -- it produces a hard `exit 1` with four checks (C2, C7, C9, C13) failing loudly with un-exempted-violation detail strings, because the now-empty exemption/allowlist arrays no longer suppress real corpus hits. The observable behavior satisfies the practical intent of D-47's empty-edge truth (a missing sidecar is never silently absorbed into a green result) even though the underlying mechanism is "degrade internally, fail externally" rather than "throw at parse time." Recorded both the literal mechanism and the observable effect in the summary and the harness header's sidecar clause, so a later reader does not "fix" the degrade-to-empty pattern under the mistaken belief it violates D-47.
- **Files modified:** none -- this is a verification/documentation correction, not a code change (the parse behavior is inherited unchanged, correctly, per D-44/C1-C17-verbatim).
- **Verification:** sidecar renamed away -> `node scripts/validation/v1.21-milestone-audit.mjs --verbose` exits 1, `12 passed, 4 failed, 0 skipped`; sidecar restored -> exits 0, `16 passed, 0 failed, 0 skipped`.
- **Committed in:** `957f4380` (Task 2 commit) -- the probe and its documented finding are part of that commit's message.

---

**Total deviations:** 2 auto-fixed (both Rule 1 -- premises in the plan text needed empirical correction against measured behavior, mirroring the pattern already twice recorded in 153-03; the protective intent of each acceptance criterion is fully satisfied by the applied fix, just via a different literal mechanism than the plan text anticipated).
**Impact on plan:** No scope creep. Both deviations are documentation/sequencing corrections, not code changes beyond what the plan already specified.

## Issues Encountered

None beyond the deviations documented above.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- The 19th Path-A lineage generation (`v1.21-milestone-audit.mjs` + `v1.21-audit-allowlist.json` + `BASELINE_25`) is landed as one indivisible unit across 3 atomic commits, exactly as D-49 requires.
- The apex plan (`check-phase-153.mjs`, authored two plans later per the phase's own sequencing) can now reference `scripts/validation/v1.21-milestone-audit.mjs` by name via its `HARNESS` const -- the file exists, is live-HEAD, and exits 0.
- The 18th CI workflow plan (`.github/workflows/audit-harness-v1.21-integrity.yml`, D-49's deliberately separate plan) can now grep this harness's sidecar-path literal (`v1.21-audit-allowlist.json`) for its path-match job.
- `.planning/milestones/v1.21-DEFERRED-CLEANUP.md` needs a residue entry for this harness's D-46 born-live-HEAD status (tracked here, not yet written -- that artifact is out of this plan's `<files>` scope and belongs to a later plan in this phase per the phase's own artifact list).
- No blockers. All plan-level `<verification>` commands pass: harness `--verbose` exits 0 (16/0/0); `regenerate-supervision-pins.mjs --self-test` exits 0; recovered blob hash matches; sidecars differ only in header fields; predecessor harness and sidecar are byte-unchanged (`git status --porcelain` empty on both).

## Self-Check: PASSED

All 3 files confirmed present on disk (`scripts/validation/v1.21-milestone-audit.mjs`, `scripts/validation/v1.21-audit-allowlist.json`, `scripts/validation/regenerate-supervision-pins.mjs`); all 3 task commits (`32d97eb2`, `957f4380`, `3fcaf684`) confirmed in `git log`; all plan-level `<verification>` commands re-run and PASS.

---
*Phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a*
*Completed: 2026-08-29*
