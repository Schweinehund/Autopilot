---
phase: 159-harn-harness-close
plan: 01
subsystem: infra
tags: [git-plumbing, milestone-close, security-scrub, git-hooks, gitattributes]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: a fully verified, publish-bundle-proven corpus and the recorded (but not yet executed) squash decision for the v1.22/154-style-landing branch
provides:
  - The entire v1.22 milestone (Phases 154-158 plus Phase 159's own planning) landed on `master` as one single-parent, tree-equality-proven commit
  - The landing branch archived at `refs/archive/v1.22-landing` and deleted
  - A tracked, three-clone-proven `pre-push` guard preventing the archived history from ever being pushed
  - `* text=auto eol=lf` normalization committed alone, proven a no-op against the index
  - Close-time working-tree hygiene: worktrees/branches pruned, `.gitignore` expanded, `branching_strategy` config guard written, two orphan artifacts committed, the Jira installer payload re-encoded byte-identical to the live hook
  - Five amendment blocks correcting Phase 159's own ROADMAP/REQUIREMENTS text to what this plan actually measured
affects: [159-02, 159-03, 159-04, 159-05, 159-06, 159-07, 159-08, 159-09, 159-10, 159-11, 159-12, 159-13]

# Actuals (#2632)
actuals:
  tokens: 33700
  tasks: 6
  commits: 9

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "git commit-tree plumbing squash (never a working-tree merge) to land a long-lived branch onto master while preserving full history behind an archive ref"
    - "refs/archive/* as the local, unpushed, recoverable-history mechanism (git push --all/--tags never transfers it)"
    - "Tracked reference hook scripts installed per-clone by hand (scripts/hooks/*.sh), documented in scripts/hooks/README.md, proven by throwaway-clone-and-push tests rather than by reading"

key-files:
  created:
    - scripts/hooks/pre-push.sh
    - .planning/phases/159-harn-harness-close/159-EVIDENCE.md
  modified:
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md
    - .planning/phases/158-final-corpus-verification-publish-bundle/158-SECURITY.md
    - .planning/phases/159-harn-harness-close/159-RESEARCH.md
    - .planning/WINDOWS.md
    - .gitattributes
    - .gitignore
    - .planning/config.json
    - scripts/hooks/README.md
    - .claude/skills/jira-milestone/install-jira-milestone-hook.cjs
    - .planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-PATTERNS.md
    - .planning/REQUIREMENTS.md
    - .planning/ROADMAP.md
    - .planning/STATE.md

key-decisions:
  - "Followed D-01/D-02 exactly: squashed via git commit-tree plumbing (never merge --squash, never a history rewrite at the scrub-source commit), tree-equality-asserted against an archive ref created before the squash could lose the branch tip."
  - "Re-measured every D-65-flagged figure live rather than trusting CONTEXT/RESEARCH: tracked-leak population (2 files/5 occurrences, not D-05's 1/1), branch-ahead count (188, not RESEARCH's 182 or CONTEXT's 179), in-index LF count (3,195, not either carried figure), worktree disk size (18MB for the 6 remaining dirs, not the carried ~81MB for 13)."
  - "Fixed the pre-push hook's remote-name argument position ($1, not the plan's literal $2) after confirming git's actual pre-push contract, so --remotes= genuinely excludes the pushing remote's own tracking refs instead of silently matching nothing."
  - "Preserved 16 tracked files under 5 of the 6 nominally-orphan .claude/worktrees/ directories after discovering D-41's 'orphan, invisible to git status' characterization was false for them (historical Phase 16/22/23 content); only the 1 genuinely-empty directory was deleted."

patterns-established:
  - "A verifier's own negative-control command must never quote the literal it asserts absent — doing so both leaks the value and inverts the row's own verdict (WINDOWS.md row 17, the verifier-secret-echo class)."
  - "Before deleting any 'orphan' worktree directory during close-time hygiene, run git ls-files against it first — an unregistered worktree directory is not the same fact as an untracked one."

requirements-completed: []  # D-28: HARN-01..06 flips are owned by 159-02/159-04/159-08/159-13 only

coverage:
  - id: D1
    description: "Tracked verifier-secret-echo leak scrubbed on the landing branch before the squash; population re-measured live (2 files, 5 occurrences) and superseded D-05's carried figure; WINDOWS row 17 and AR-159-01 registered for the class"
    requirement: null
    verification:
      - kind: other
        ref: "derived-token scan across all 5 D-06 surfaces, post-scrub: git grep -c HEAD/untracked/origin..master msgs/squash msg file/log -p, all read 0"
        status: pass
    human_judgment: false
  - id: D2
    description: "TRACER — landing branch squashed onto master via git commit-tree plumbing, tree-equality-proven against refs/archive/v1.22-landing, branch deleted, close discriminator reads 0"
    requirement: null
    verification:
      - kind: other
        ref: "git rev-parse master^{tree} == refs/archive/v1.22-landing^{tree} (both 15f9d290...); git rev-list --parents -1 master (2 words, 1 parent); close discriminator count 0"
        status: pass
    human_judgment: false
  - id: D3
    description: "eol=lf normalization committed alone as the first commit after the squash; index holds 0 CRLF blobs; renormalize is a no-op"
    requirement: null
    verification:
      - kind: other
        ref: "git ls-files --eol | grep -c i/crlf = 0; git add --renormalize . stages nothing; git show --stat HEAD touches exactly .gitattributes"
        status: pass
    human_judgment: false
  - id: D4
    description: "Tracked, documented pre-push guard proven by three real throwaway-clone-and-push transcripts (new-ref archived-history push rejected, existing-ref archived-history push rejected, master push accepted)"
    requirement: null
    verification:
      - kind: other
        ref: "159-EVIDENCE.md §3 — three transcripts with exit statuses; bash -n scripts/hooks/pre-push.sh exits 0"
        status: pass
    human_judgment: false
  - id: D5
    description: "Close-time hygiene: worktrees/branches pruned (with a caught-and-reverted near-miss on 5 falsely-orphan directories), .gitignore expanded, branching_strategy config guard written, installer payload re-encoded byte-identical to the live hook"
    requirement: null
    verification:
      - kind: other
        ref: "git worktree list = 1; worktree-agent-* branches = 0; phase-139-atom-5 survives; node -e config assertion; decode-and-compare installer payload = 7075 bytes match"
        status: pass
    human_judgment: false
  - id: D6
    description: "Five amendment blocks (3 ROADMAP + 2 REQUIREMENTS) landed in one commit, correcting Phase 159's own success-criteria and requirement text to live-measured values, with check-phase-54/55/56 green before and after"
    requirement: null
    verification:
      - kind: other
        ref: "grep -c 'AMENDMENT, D-51\\]' across both files = 3 and 2; check-phase-54/55/56 = 32/32/32 before and after; docs/ untouched"
        status: pass
    human_judgment: false

# Metrics
duration: 33min
completed: 2026-09-09
status: complete
---

# Phase 159 Plan 1: Land the v1.22 milestone on master Summary

**Squashed 188 commits of v1.22 (Phases 154-158) onto `master` via `git commit-tree` plumbing with a proven tree equality, after scrubbing a self-falsifying verifier leak that had independently recurred in this phase's own research document, and closed out the branch's afterlife with an archive ref, a clone-tested pre-push guard, EOL normalization, worktree/branch hygiene, and five text-correcting amendment blocks.**

## Performance

- **Duration:** 33 min
- **Started:** 2026-09-09T11:28:02Z
- **Completed:** 2026-09-09T12:00:13Z
- **Tasks:** 6 completed (Task 2 is the phase TRACER)
- **Files modified:** 15 unique files across this plan's own work (plus the 188-commit squash carrying all of Phases 154-158's content into `master` as one tree)

## Accomplishments

- Scrubbed a 9-character label from two tracked files (not the one D-05 expected — the defect had independently recurred in `159-RESEARCH.md`) before the squash could freeze it behind an archive ref forever; registered the class in `WINDOWS.md` row 17 and `158-SECURITY.md`'s `AR-159-01`.
- Landed the entire v1.22 milestone on `master` as one single-parent, plumbing-built commit with a proven tree equality against `refs/archive/v1.22-landing`, then deleted the source branch.
- Shipped a tracked `pre-push` guard, proven — not just read — against three real throwaway clones, and fixed a real bug in it (the plan's own `$2` remote-name instruction would have made the guard's exclusion silently inert).
- Caught and fully reverted a near-miss where a literal plan instruction ("delete 6 orphan directories") would have destroyed 16 files tracked in git since Phases 16, 22, and 23.
- Landed five text-correcting amendment blocks so ROADMAP.md and REQUIREMENTS.md agree with what this plan actually measured, with the planning-tree gates green before and after every commit.

## Task Commits

Each task was committed atomically (plus one pre-execution housekeeping commit and one tracer feedback-gate note):

0. **Pre-execution:** Committed a pending orchestrator `STATE.md` snapshot before Task 1 so the tracked tree was clean at the start (Phase 154 precedent) — `d9a066ff` (docs)
1. **Task 1: Scrub the tracked leak** — `9cc76587` (fix) — landed on the branch before the squash; unreachable from `master` after Task 2, resolvable via `refs/archive/v1.22-landing`
2. **Task 2 (TRACER): Squash onto master** — `9cc84aa6` (the squash commit itself, via `git commit-tree`) + `0d6ae73f` (feat — STATE annotation/evidence) + `a74576ad` (docs — tracer feedback-gate re-verification note)
3. **Task 3: `.gitattributes` normalization** — `7b50ff69` (chore)
4. **Task 4: Pre-push guard** — `c9121b41` (feat)
5. **Task 5: Close-time hygiene** — `0f5a0903` (chore)
6. **Task 6: Five amendment blocks** — `4c37dd9c` (docs)

**Plan metadata:** committed as part of this final close-out step (STATE.md/ROADMAP.md/REQUIREMENTS.md sync + this SUMMARY.md).

## Files Created/Modified

- `scripts/hooks/pre-push.sh` — new tracked pre-push guard rejecting any push whose range contains the archived scrub-source commit, and any push targeting `refs/archive/*`
- `scripts/hooks/README.md` — added the `## pre-push.sh` section (install/uninstall, mirroring the existing `pre-commit.sh` section)
- `.gitattributes` — added `* text=auto eol=lf` below the existing binary-attribute line
- `.gitignore` — added `.planning/state.json`, `.obsidian/`, `.playwright-mcp/`, `.gsd/`, `.agents/`, `skills-lock.json`
- `.planning/config.json` — added `"branching_strategy": "none"` inside `workflow`
- `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` — committed (was untracked); `HOOK_B64` re-encoded from the live adapted hook
- `.planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-PATTERNS.md` — committed (was untracked orphan artifact)
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md` — line 97's leak replaced with a placeholder; falsification note appended
- `.planning/phases/158-final-corpus-verification-publish-bundle/158-SECURITY.md` — T-158-01 supersession note; `AR-159-01` registered
- `.planning/phases/159-harn-harness-close/159-RESEARCH.md` — 4 leak sites scrubbed; Planner Assumption 1 marked RESOLVED at execution
- `.planning/WINDOWS.md` — rows 17 (verifier-secret-echo class) and 18 (this plan's own worktree near-miss) authored
- `.planning/phases/159-harn-harness-close/159-EVIDENCE.md` — new, 514 lines, the full command-sourced evidence log for all 6 tasks
- `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md` — five amendment blocks (D-51)
- `.planning/STATE.md` — one annotation recording the 11 STATE-cited SHAs unreachable from `master` post-squash

## Decisions Made

- Followed D-01/D-02's plumbing-squash mechanism exactly rather than any working-tree merge, and created the archive ref before the squash could lose the branch tip.
- Every D-65-flagged figure was re-measured live rather than carried from `159-CONTEXT.md`/`159-RESEARCH.md`; every delta is written down in `159-EVIDENCE.md` (tracked-leak population, branch-ahead count, LF/CRLF index counts, worktree disk size, workflow file count).
- Fixed the pre-push guard's remote-name argument bug ($1, not the plan's literal $2) rather than shipping a guard whose exclusion clause would silently never fire.
- Preserved rather than destroyed 16 tracked files once the "orphan directory" premise was discovered false for 5 of the 6 nominal orphans.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Mis-specified verify command] Task 2's `git status --porcelain` check fails on pre-existing untracked cruft, not on anything the squash introduced**
- **Found during:** Task 2
- **Issue:** The plan's literal verify (`test -z "$(git status --porcelain)"`) can never pass immediately after the squash because 10 pre-existing untracked entries (documented as Task 5's own scope, D-41) sit in the working tree before this plan starts.
- **Fix:** Used the intent-true check instead — no tracked file is modified/staged/deleted (`git status --porcelain | grep -vc '^??'` = 0) — which correctly proves the checkout introduced no residual diff or conflict.
- **Files modified:** none (verification-only)
- **Verification:** `git status --porcelain | grep -v '^??'` empty
- **Committed in:** `0d6ae73f` (documented in `159-EVIDENCE.md` §2)

**2. [Rule 3 - Mis-specified verify command] Task 2's `git rev-list --count --parents -1 master | wc -w` is vacuous**
- **Found during:** Task 2
- **Issue:** Combining `--count` with `--parents` suppresses `--parents`' effect on the printed output — the command always prints just `1` (the commit count for `-1`), regardless of how many parents the commit actually has, so the literal check can never distinguish a single-parent commit from a merge.
- **Fix:** Used `git rev-list --parents -1 master | wc -w` (no `--count`), which correctly prints 2 words (commit + one parent SHA) for a single-parent commit.
- **Files modified:** none (verification-only)
- **Verification:** confirmed `9cc84aa6 8de413aa` (2 words) at squash time, and `0d6ae73f 9cc84aa6` (2 words) after Task 2's own metadata commit
- **Committed in:** `0d6ae73f` (documented in `159-EVIDENCE.md` §2)

**3. [Rule 1 - Bug] Pre-push hook's remote-name argument position**
- **Found during:** Task 4
- **Issue:** `159-CONTEXT.md` D-08 and the plan's own action text say to use "the remote name passed as the hook's second argument" (`$2`) for `--remotes=`. Per git's actual `pre-push` contract, `$1` is the remote name and `$2` is the remote URL; passing a URL to `--remotes=<pattern>` (which matches ref names, not URLs) would silently match nothing, leaving the all-zero-remote-SHA arm's exclusion inert — the exact hole class D-08 itself names.
- **Fix:** Implemented with `$1` instead.
- **Files modified:** `scripts/hooks/pre-push.sh`
- **Verification:** Test (a)'s transcript shows the exclusion pattern correctly matching nothing on a genuinely empty remote, and the guard firing for the right reason (the range genuinely contains the scrub commit)
- **Committed in:** `c9121b41`

**4. [Rule 1 - Bug, CRITICAL near-miss] `rm -rf` on Task 5's "6 orphan directories" deleted 16 tracked files**
- **Found during:** Task 5
- **Issue:** `159-CONTEXT.md` D-41 characterized 6 unregistered `.claude/worktrees/` directories as orphan cruft "invisible to `git status`." This was false for 5 of the 6 — they held 16 files tracked in git since Phases 16, 22, and 23 (a historical cwd-drift artifact from those phases' own worktree agents, coincidentally sharing today's directory naming pattern). Deleting all 6 per the plan's literal instruction removed those 16 tracked files from the working tree.
- **Fix:** Caught immediately via `git status --porcelain --untracked-files=all` (16 unstaged deletions) before any commit; fully restored via `git checkout -- .claude/worktrees/`. Only the 1 genuinely-empty directory (`agent-afb6faa2`, confirmed 0 tracked files via `git ls-files`) stayed deleted.
- **Files modified:** none in the end (restored to original state); `.planning/WINDOWS.md` row 18 added to record the near-miss and the handoff
- **Verification:** `git diff --stat -- .claude/worktrees/` empty (byte-identical restoration); `git ls-files .claude/worktrees/` still lists all 16 paths
- **Committed in:** `0f5a0903`

**5. [Rule 3 - Mis-specified verify command] Task 6's amendment-count verify checks only `ROADMAP.md`, expecting +4, but the design is 3 ROADMAP + 2 REQUIREMENTS blocks**
- **Found during:** Task 6
- **Issue:** The literal verify (`grep -c 'SUCCESS-CRITERION AMENDMENT, D-' .planning/ROADMAP.md`, expected +4) can never pass under the task's own correct design, which splits the five blocks 3-in-ROADMAP/2-in-REQUIREMENTS per D-51 and the acceptance criteria's explicit "Success criterion 2 and HARN-03 **both** state...".
- **Fix:** Used the intent-true check — `grep -c 'AMENDMENT, D-51\]'` across both files, confirming exactly 3 and 2 (5 total).
- **Files modified:** none (verification-only)
- **Verification:** counts confirmed 3 (ROADMAP) + 2 (REQUIREMENTS) = 5
- **Committed in:** `4c37dd9c` (documented in `159-EVIDENCE.md` §5)

**6. [Rule 3 - Mis-specified verify command] Task 6's citation scan sweeps the entire file, catching two pre-existing, unrelated citations**
- **Found during:** Task 6
- **Issue:** The literal citation scan greps every `D-NN`-shaped token across the entire `ROADMAP.md`/`REQUIREMENTS.md` files, including citations from OTHER phases' own CONTEXT documents that predate this task (`D-00` — a substring match on Phase 155's `D-00a`; `D-69` — Phase 158's own citation). Neither belongs to this task's own additions.
- **Fix:** Scoped the check to only the `D-NN` tokens this task's five blocks actually introduce; all resolve against `159-CONTEXT.md`.
- **Files modified:** none (verification-only)
- **Verification:** documented in `159-EVIDENCE.md` §5
- **Committed in:** `4c37dd9c`

---

**Total deviations:** 6 auto-fixed (2 Rule 1 — one real bug fix, one critical near-miss caught and reverted; 4 Rule 3 — mis-specified verify commands in the plan text itself).
**Impact on plan:** All auto-fixes were necessary for correctness (the pre-push guard would otherwise ship with an inert exclusion clause) or for using the plan's own verify commands as intended (three of the plan's literal verify commands cannot pass regardless of correct execution, due to shell/grep-scope defects in the plan text, not in the deliverables). The near-miss was caught before any commit and fully reverted — zero net data loss. No scope creep: every fix stayed within the named task's own files and intent.

## Issues Encountered

None beyond the deviations documented above, all of which were resolved during execution.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

`master` now carries the entire v1.22 milestone as one auditable, single-parent commit with a proven tree equality against the archived branch. Every subsequent Phase 159 plan (159-02 through 159-13) is now an ordinary, individually reviewable and revertible commit on `master` — the ordering hazard this plan existed to fix (an un-scrubbable leak frozen behind an archive ref) is resolved. No blockers for Plan 159-02 (the V121 back-anchor pin).

**Known Stubs:** None.

**Threat Flags:** None beyond what this plan's own `<threat_model>` already scoped and mitigated (T-159-01 through T-159-06, all `mitigate`, all closed by this plan's own verify commands).

## Self-Check: PASSED

All 9 key files confirmed present on disk; all 9 commit hashes (1 pre-execution housekeeping + 8 task/tracer commits) confirmed present in `git log --all`.

---
*Phase: 159-harn-harness-close*
*Completed: 2026-09-09*
