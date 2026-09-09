# Phase 159 — Evidence Log

Accumulated command-sourced evidence across Phase 159's plans. Each section corresponds to one task;
every figure below is re-measured at execution time per D-65 — the live value wins over any figure
carried from `159-CONTEXT.md` or `159-RESEARCH.md`, with the delta against the carried figure written
down explicitly.

**§1-§5** below belong to Plan 159-01 (Land the v1.22 milestone on `master`). **§6-§8** belong to
Plan 159-02 (the V121 back-anchor pin, HARN-01/HARN-02). **§9 onward** belong to Plan 159-03 (fork
the v1.22 harness, copy the sidecar, insert the `BASELINE_26` journal block).

---

## §1 — Task 1: Scrub the tracked leak, annotate falsified artifacts, register the finding

### Disclosure: in-place edit of a SECURED phase's artifacts

This task edits `.planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md`
and `158-SECURITY.md`, both belonging to Phase 158, which was already marked `secured` (see
`158-SECURITY.md` Sign-Off). **Why this is safe and necessary:** the artifact itself IS the leak —
`158-VERIFICATION.md:97`'s own "Secret-scrub negative control" row quotes the literal 9-character
label it claims is absent, which both leaks the value into a tracked file and falsifies the row's own
recorded PASS verdict. The leak must be gone from the landing branch's tracked content BEFORE Task 2
squashes and archives the branch, because after that point the branch's history is frozen behind
`refs/archive/v1.22-landing` and can never be edited again without violating D-01's prohibition on
rewriting history. This is therefore the only correct place in the milestone's timeline to fix it: an
annotate-and-supersede edit (the falsified row is kept, not deleted, with a dated note explaining the
falsification), never a silent rewrite of Phase 158's own verdict.

### Derived-token scan — five D-06 surfaces, before and after the scrub

The token is derived in-process from `git diff 077b29b7^ 077b29b7 --
assets/recipes/06-walk-up-avd-kiosk/NOTICE` (removed-minus-added 9-character alphanumeric tokens;
exactly one member at that width). It is held only in a shell variable for the duration of the scan
and edit commands; it is never echoed, never written to a file, and no scanner or hash of it is
committed anywhere in this plan. This log records counts and filenames only, per D-06.

| Surface | Pre-scrub count | Pre-scrub files | Post-scrub count (working tree) |
|---|---|---|---|
| 1. Tracked files at HEAD (`git grep -l -- "$T" HEAD`) | 2 files | `.planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md`, `.planning/phases/159-harn-harness-close/159-RESEARCH.md` | 0 (working tree; commit closes surface 1 for the new HEAD) |
| 2. `git grep --untracked -l -- "$T"` | 2 files | same two files | 0 |
| 3. Every message in `origin/master..master` (`git log origin/master..master --format=%B \| grep -c`) | 0 | — | 0 (unchanged — never carried the label) |
| 4. Squash message file | N/A — not yet created; Task 2 writes it and re-scans this surface | — | N/A (deferred to Task 2) |
| 5. Blob content in `git log -p origin/master..master \| grep -c -- "$T"` | 0 | — | 0 (unchanged — the label only ever lived in the two tracked files' current content, never in a prior blob in this range) |

**Re-measured tracked population vs. D-05's carried figure (delta, per D-65):** D-05's `[MEASURED]`
figure was **exactly one tracked file, one occurrence** (`158-VERIFICATION.md:97`), true when
`159-CONTEXT.md` was authored. The live re-measurement at this plan's execution time found **two
tracked files, five total occurrences**:

- `158-VERIFICATION.md` — 1 occurrence (line 97, the negative-control command).
- `159-RESEARCH.md` — 4 occurrences (lines 80, 81, 488, 585), introduced at commit `b0a2f84a`, after
  `159-CONTEXT.md` was gathered.

**Delta: +1 file, +4 occurrences** against D-05's figure. This is a supersession, not a correction of
an error — the second file did not exist yet when D-05 was written; it was introduced later in the
same phase's own planning pipeline by the researcher agent, which is exactly the recurrence WINDOWS
row 17 is scoped to as a CLASS rather than a single site.

### Sites fixed

| File | Line(s) | Site description | Fix |
|---|---|---|---|
| `158-VERIFICATION.md` | 97 | "Secret-scrub negative control" row's own `git grep` command | Literal replaced with `<SCRUBBED-9CHAR-TOKEN>`; dated note appended after the table naming commit `179cf247` and stating the recorded verdict is now false |
| `159-RESEARCH.md` | 80 | Verified-measurements table row quoting the leak verbatim (transcribing `158-VERIFICATION.md:97`) | Literal replaced with placeholder in the quoted cell |
| `159-RESEARCH.md` | 81 | Same table's scrubbed-token-derivation row, which explicitly named the token as the derivation result | Rewritten to state that the derived token is held only in a shell variable per D-06 and is never named in the document, while still describing what is removed/added in the source diff |
| `159-RESEARCH.md` | 488 | Runtime-state table's "Secrets/env vars" row | Literal replaced with placeholder |
| `159-RESEARCH.md` | 585 | Plan Skeleton Inputs, 159-01's "Verify commands today" bullet | Literal replaced with placeholder |

A dated note was also appended in `159-RESEARCH.md` (after the Verified Measurements table) recording
the recurrence of the same defect class and naming commit `b0a2f84a` as its origin.

### `158-SECURITY.md` — T-158-01 supersession and AR-159-01 registration

Appended a `## Supersession Note — T-158-01 (Phase 159, 2026-09-09)` section stating that T-158-01's
prior `closed` disposition covered only the `audit-claimed-fixes.mjs` runner's own guards, not
`158-VERIFICATION.md:97` itself; that the threat was re-opened by the verifier's own negative control;
and that it is closed again by this plan's scrub. Registered `AR-159-01` in the Accepted Risks Log,
referencing T-158-01 and the verifier-secret-echo class, dated 2026-09-09.

### `.planning/WINDOWS.md` — row 17

Authored row 17 (phase 159, kind deviation) for the verifier-secret-echo CLASS — not the single
`158-VERIFICATION.md:97` site — citing the recurrence in `159-RESEARCH.md` as the evidence that a
site-scoped row would not have caught the second occurrence, and stating the replacing rule: derive
needles in-process, count only, scrub on the branch before any squash, never quote a scrubbed value
when documenting the scrub. Column count matches rows 1–16 (10 columns). Frontmatter counters updated:
`open_count` 14 → 15, `total_count` 16 → 17.

### Gate readings (post-edit, before commit)

`node scripts/validation/check-phase-54.mjs` / `-55.mjs` / `-56.mjs` — all three: **32 passed, 0
failed, 0 skipped**, both immediately before and immediately after the Task 1 commit (`9cc76587`).

---

## §2 — Task 2 (TRACER): squash the landing branch onto master with plumbing

### Re-measured values vs. carried figures (D-65)

| Value | RESEARCH (session) | CONTEXT | Live (this execution) | Delta |
|---|---|---|---|---|
| Branch tip after Task 1's scrub commit | — (Task 1 not yet run at RESEARCH time) | — | `9cc765874978c0c77fcc6b3587426226137f737e` | n/a — first read at this point |
| Ahead count (`git rev-list --count master..HEAD`) | 182 | 179 | **188** | +6 vs RESEARCH, +9 vs CONTEXT (2 additional commits landed this session: the STATE.md pre-execution sync commit and Task 1's scrub commit, on top of RESEARCH's own +3 drift note) |
| `master` SHA (pre-squash) | `8de413aa…` | `8de413aa…` | `8de413aae65387a6b381fd34f70f65128592f65d` | none — confirmed |

### Message file

Written to a scratch location outside the repository (never tracked), passed to `git commit-tree`
via `-F`. Subject: `feat(v1.22): land Phases 154-158 and Phase 159 planning as one commit (squash of
v1.22/154-style-landing @ 9cc76587)`. Contains `v1.22` (3 occurrences) and does not contain
`MILESTONE CLOSE` (0 occurrences). Scanned for the derived token: 0 occurrences (D-06 surface 4,
now populated and clean).

**Full message text, verbatim (appendix, per this task's acceptance criteria):**

```
feat(v1.22): land Phases 154-158 and Phase 159 planning as one commit (squash of v1.22/154-style-landing @ 9cc76587)

This commit is a single-parent plumbing squash (git commit-tree) of the
v1.22/154-style-landing branch tip 9cc765874978c0c77fcc6b3587426226137f737e
onto master, carrying 188 commits as one tree. It is not a merge and does
not rewrite any commit on the source branch.

Reason for squashing rather than merging or pushing the branch directly: a
value scrubbed in Phase 155 (and, redundantly, again in Phase 159's own
Task 1 scrub) remains present in the source branch's local commit history
at an earlier revision. That history is never published — the branch is
archived at refs/archive/v1.22-landing and then deleted locally, and is
never pushed, so the scrubbed value never reaches any remote.

Per-phase artifact SHAs for Phases 154 through 158, and the 46-row binding
audit produced during Phase 158's verification, resolve only in the
owner's local repository against the archived branch history. The
published record for those results is the JSON output and the run log
committed alongside each phase's own artifacts, not the commit SHAs
themselves, which become unreachable from origin/master after this squash.
```

### Mechanism executed

1. `git update-ref refs/archive/v1.22-landing 9cc76587...` (created BEFORE the squash, while the
   branch tip was still the sole ref pointing at it).
2. `S=$(git commit-tree HEAD^{tree} -p master -F <msgfile>)` → `S = 9cc84aa6b5db59ecb81ae8310899ad516096e08b`.
3. `git update-ref refs/heads/master "$S"`.
4. `git checkout master`.
5. `git branch -D v1.22/154-style-landing` (a plain `-d` correctly refused with "not fully merged" —
   expected, since a plumbing squash is not a fast-forward or a recorded merge in git's own ancestry
   sense despite the tree being provably identical; `-D` is the correct, expected escalation here,
   not a deviation).

### Assertions

| Assertion | Command | Result |
|---|---|---|
| Tree equality | `git rev-parse master^{tree}` vs `git rev-parse refs/archive/v1.22-landing^{tree}` | Both `15f9d29017b042e4feea3af118140c392bed71f3` — **MATCH** |
| Single parent | `git rev-list --parents -1 master` (word count 2: commit + one parent) | `9cc84aa6… 8de413aa…` — **1 parent, confirmed** |
| Clean tracked tree | `git status --porcelain \| grep -vc '^??'` | `0` — no staged/modified/deleted tracked files after checkout |
| Close discriminator | `git log --all --format="%H\|%s" \| awk -F'\|' '$2 ~ /v1\.22/ && $2 ~ /MILESTONE CLOSE/' \| wc -l` | `0` — confirmed; must read 1 after the close-gate commit later in this phase |
| Archive ref resolves to pre-squash tip | `git rev-parse refs/archive/v1.22-landing` | `9cc765874978c0c77fcc6b3587426226137f737e` — matches recorded tip |
| Landing branch gone | `git branch --list "v1.22/154-style-landing"` | empty |
| Scratch bundle still tracked | `git ls-files --error-unmatch .planning/artifacts/154-scratch-corpus.bundle` | exit 0 |

### Deviations found in this task's own `<verify>` block (Rule 3 — mis-specified verify commands)

1. **`git status --porcelain` non-emptiness is pre-existing, not squash-introduced.** The plan's
   literal verify (`test -z "$(git status --porcelain)"`) fails because 10 pre-existing untracked
   entries (`.agents/`, `.claude/skills/fireworks-tech-graph/`,
   `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs`, `.gsd/`, `.obsidian/`,
   `.planning/milestone.lock`, `154-PATTERNS.md`, `.planning/state.json`, `.playwright-mcp/`,
   `skills-lock.json`) were present in the working tree before this plan started and are explicitly
   documented as Task 5's own scope (D-41: gitignore additions and the two orphan-artifact commits).
   `159-RESEARCH.md`'s own D-41 census (13 directories, ~81 MB, later stated as "105 entries" in the
   `--untracked-files=all` form) already discloses this population predates the squash. The corrected,
   intent-true check — no **tracked** file is modified/staged/deleted after the checkout
   (`git status --porcelain | grep -vc '^??'` = 0) — passes cleanly, proving the checkout itself
   introduced no residual diff or conflict. Logged rather than silently worked around; the untracked
   population is resolved by Task 5, not this task.
2. **`git rev-list --count --parents -1 master | wc -w` is a vacuous check.** `--count` overrides
   `--parents`' effect on the printed line — the command always prints just the commit count (`1` for
   `-1`), regardless of how many parents the commit has, so `wc -w` is always `1`, never `2`, and the
   literal verify command can never pass for ANY commit, single-parent or merge. The corrected form,
   `git rev-list --parents -1 master | wc -w` (no `--count`), correctly prints `<commit-sha>
   <parent-sha>` (2 words) for a single-parent commit and was used above to confirm the real property.

Both are acceptance-criteria/verify-command defects in the plan text itself, not in the squash
mechanism; the underlying properties they intend to assert (clean checkout, single parent) are
independently confirmed true by the corrected commands. Logged per the executor's deviation
protocol (Rule 3 — blocking issue in a verify instrument, not in the deliverable).

### STATE reconciliation

Live re-measurement (per D-65) of every commit-SHA-shaped token cited in `.planning/STATE.md` found
**17** candidates (not `159-CONTEXT.md` D-46's carried **14** — `2016281112` is an Intune error code,
not a SHA, and was excluded as a false positive from the raw regex scan). Of the 17, **11** — not
D-46's carried **8** — are unreachable from the new `master` by direct ancestry after the squash:
`0425921b`, `090ca859`, `83660691`, `845218a4`, `987770f8`, `aa9ae5ae`, `af678f0c`, the pre-squash
`state_head` (`bdb22fdf…`), `c97d322`, `dc7e996`, `f30c37b`. All 11 remain resolvable via
`git cat-file`/`git show` against `refs/archive/v1.22-landing`. One annotation was added to
`.planning/STATE.md`'s Blockers/Concerns section (dated 2026-09-09) naming all 11 SHAs, the archive
ref, and the D-65 delta against D-46's carried figures. `state_head` in the frontmatter itself is
left as the harness's own bookkeeping field (updated automatically at the next state-tooling run) —
the annotation documents its unreachability rather than editing the field by hand.

### Tracer feedback gate (post-commit re-verification)

Per the executor's tracer protocol, all three of this task's `<verify>` blocks were re-run
end-to-end after this task's own commit (`0d6ae73f`, which layers the STATE annotation and this
evidence file on top of the squash commit `9cc84aa6`):

- Close discriminator: still `0`. **PASS**.
- Single-parent chain: `git rev-list --parents -1 master` shows `0d6ae73f 9cc84aa6` (2 words, one
  parent) for the tip, and the squash commit `9cc84aa6` itself independently still shows exactly one
  parent (`8de413aa`) by the same corrected form. **PASS**.
- Tree equality (`master^{tree}` vs. `refs/archive/v1.22-landing^{tree}`): **no longer equal**
  (`9d9608f9…` vs. `15f9d290…`) — expected and correct, not a regression. The equality is a
  point-in-time proof that the squash commit's tree exactly matches the archived branch tip; it was
  true at the moment of the squash (recorded above, both `15f9d290…`) and necessarily diverges the
  instant any ordinary commit lands on `master` afterward, by design (D-02: "every later Phase 159
  commit is an ordinary commit on `master`"). The archive ref stays frozen at the squash point for
  exactly this reason — it is the durable anchor for that one-time equality proof, not `master` going
  forward.

Tracer verified end-to-end: the squash mechanism's own properties (single parent, correct archive
target, 0 close-gate collisions) all hold after this task's metadata commit. Proceeding to expansion
tasks 3-6.

### Branch afterlife note

`git push --all` and `git push --tags` never transfer a `refs/archive/*` ref (git's push refspec
defaults only enumerate `refs/heads/*` and `refs/tags/*`); this repository already carries
`refs/scratch/heads/master` from Phase 154 as the existing precedent for an unpushed, non-standard
ref surviving in a local clone. No push of any kind was performed in this task.

---

## §3 — Task 4: `scripts/hooks/pre-push.sh`, README, and three throwaway-clone tests

### Deviation (Rule 1 — auto-fixed bug): remote-name argument position

`159-CONTEXT.md` D-08 and `159-01-PLAN.md`'s action text both say to use "the remote name passed as
the hook's second argument" for `--remotes="$2"`. Per git's actual `pre-push` hook contract
(`githooks(5)`), the hook is invoked as `pre-push <remote name> <remote URL>` — i.e. `$1` is the
remote name and `$2` is the remote URL. Passing a URL string to `git rev-list --remotes=<pattern>`
(which matches remote-tracking-ref *names* like `origin`, not URLs) would silently match nothing,
making the exclusion inert and the guard's all-zero-remote-SHA arm effectively untested against real
history — the exact class of hole D-08 itself names ("the first-draft form died on the all-zero
remote SHA and let a new-ref push through"). Implemented with `$1` instead, confirmed correct by the
Test (a) transcript below (the exclusion pattern `--remotes="testremote"` correctly matched nothing
on an empty remote, and the guard fired for the right reason — the range genuinely contains the
scrub commit — not because `--remotes=` accidentally matched something).

### Throwaway-clone test setup

All three clones and remotes were created in the OS temp scratch directory (never inside the
project repository), and deleted after the tests completed. The clone was seeded with objects via
`git clone file:///D:/claude/Autopilot` (local, `file://` per the project's own precedent that a bare
local path silently ignores `--depth`) plus one explicit `git fetch … refs/archive/v1.22-landing:refs/heads/archived-test`
to pull the archived history's objects into the clone (a plain clone does not fetch `refs/archive/*`,
which is D-07's own point). The hook was copied to `.git/hooks/pre-push` and made executable inside
the clone; a throwaway bare repo was added as remote `testremote`.

### Test (a) — new-ref push carrying the archived history → REJECTED

```
$ git push testremote archived-test:refs/heads/archived-test
pre-push: REJECTED - range for 'refs/heads/archived-test' -> 'refs/heads/archived-test' contains the archived scrub-source commit (9a1148156e049bc4ff9cf208de869739a8ff5d43)
error: failed to push some refs to '../remote_a'
```
Exit status: **1**. Fired on the all-zero-remote-SHA arm (`git rev-list "$ls" --not --remotes="$1"`,
since `testremote` had no refs yet).

### Test (b) — existing-ref push carrying the archived history → REJECTED

A throwaway commit `poisoned` was built by plumbing (`git commit-tree <master's tree> -p master -p
archived-test`) so its ancestry includes both `master` (already pushed to `testremote` as `master` in
Test (c) below, giving a non-zero remote SHA) and the entire archived-test history. Built by plumbing
rather than an ordinary merge because the working-tree merge hit a real content conflict on
`159-EVIDENCE.md` (expected — this test file itself changed between the archived branch and current
`master`); the plumbing form needs no conflict resolution and produces the same ancestry property
(189 commits reachable from `poisoned` and not from `master`).

```
$ git push testremote poisoned:refs/heads/master
pre-push: REJECTED - range for 'refs/heads/poisoned' -> 'refs/heads/master' contains the archived scrub-source commit (9a1148156e049bc4ff9cf208de869739a8ff5d43)
error: failed to push some refs to '../remote_a'
```
Exit status: **1**. Fired on the two-dot range arm (`git rev-list "${remote_sha}..${local_sha}"`).

### Test (c) — push of `master` → ACCEPTED

```
$ git push testremote master:refs/heads/master
pre-push: OK - no archived history and no refs/archive/* target detected
To ../remote_a
 * [new branch]        master -> master
```
Exit status: **0**.

### Bonus test — `refs/archive/*` remote refspec → REJECTED (arm 4, not enumerated by the plan's three but proving the fourth rule)

```
$ git push testremote master:refs/archive/whatever
pre-push: REJECTED - 'refs/archive/whatever' is a refs/archive/* ref and must never be pushed
error: failed to push some refs to '../remote_a'
```
Exit status: **1**.

### `core.hooksPath` unchanged

`git config --get-all core.hooksPath` in the real repository returns the same single value
(`D:\claude\Autopilot\.git\hooks`) before and after this task; the throwaway clone's own
`.git/hooks/pre-push` install is per-clone and never touches the real repository's config.

---

## §4 — Task 5: close-time hygiene, ignore list, config guard, installer re-encode

### CRITICAL near-miss, caught and fixed (Rule 1 — also logged as WINDOWS.md row 18)

D-41 characterized the 6 filesystem directories under `.claude/worktrees/` that are unregistered
with `git worktree list` as "orphan directories... invisible to `git status`." **This is false for 5
of the 6.** Before deleting, `git ls-files` was checked only after the `rm -rf`, not before —
deleting all 6 directories per the plan's literal instruction removed **16 files tracked in git since
Phases 16/22/23** (docs content and their SUMMARY.md files), left at that path by a historical
cwd-drift bug in those phases' own worktree agents and coincidentally sharing today's
`.claude/worktrees/agent-*` naming pattern. This surfaced immediately as 16 unstaged deletions in
`git status --porcelain --untracked-files=all` before any commit was made, and was fully reverted via
`git checkout -- .claude/worktrees/` (confirmed byte-identical restoration: `git diff --stat` empty,
`git ls-files .claude/worktrees/` still lists all 16 paths). Only `agent-afb6faa2` — confirmed to hold
zero tracked files via `git ls-files` — was genuinely orphaned and stays deleted. See WINDOWS.md row
18 for the full record and the handoff to future milestone-close hygiene passes.

### Worktree tips (recorded before removal)

| Worktree | Tip SHA |
|---|---|
| `.claude/worktrees/agent-a30e3c02` | `919ccfe2` |
| `.claude/worktrees/agent-a7060637` | `b60392ba` |
| `.claude/worktrees/agent-a78a3e75` | `0f3ba159` |
| `.claude/worktrees/agent-a7915453` | `2d64d956` |
| `.claude/worktrees/agent-aa31f5d9` | `e1ce22f4` |
| `.claude/worktrees/agent-adf4846f` | `ad67c271` |
| `.claude/worktrees/agent-af6387cf` | `9f805ed1` |

All 7 registered worktrees removed via `git worktree remove --force`; `git worktree list` afterward
shows only the main checkout (count 1). 1 genuine orphan directory deleted (`agent-afb6faa2`, 0
tracked files); the other 5 nominal "orphans" hold tracked content and were preserved (see above).

Live disk-size re-measurement: `.claude/worktrees/` measured **18 MB** for the 6 remaining directories
after the 7 registered worktrees were already removed (not a full-13-directory reading) — this is a
smaller population than CONTEXT's carried "13 directories, ~81 MB" describes, so the two figures are
not directly comparable; recorded as the actual measurement taken rather than reconciled against the
carried figure.

### Branches deleted

All 13 `worktree-agent-*` local branches deleted (`git branch -D`, listed individually in the
command transcript above). `phase-139-atom-5` confirmed to survive. The 4 remote atom branches
(`origin/phase-119-atom-2`, `origin/phase-125-atom-2`, `origin/phase-128-atom-2`,
`origin/phase-139-atom-5`) are listed as KEEP with their current tips; none deleted (this plan never
deletes a remote branch, per its own prohibitions list).

### `.gitignore`

Grep confirmed, before adding, that nothing under `scripts/validation/` or `.github/workflows/`
references any of the 6 new entries (`.planning/state.json`, `.obsidian/`, `.playwright-mcp/`,
`.gsd/`, `.agents/`, `skills-lock.json`) — all six greps returned zero hits. All six lines added.

### Config guard

`"branching_strategy": "none"` added inside the `workflow` object of `.planning/config.json`.
`159-RESEARCH.md`'s Planner Assumption 1 marked RESOLVED AT EXECUTION in place, re-confirming the key
was still absent immediately before this commit.

### Orphan artifacts committed by explicit path

`154-PATTERNS.md` and `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` — both staged
individually by path, never via a blanket add.

### Installer payload re-encode

The live adapted hook `.claude/hooks/jira-milestone-gate.cjs` (7,075 bytes) was base64-encoded with
no line wrapping and the installer's `HOOK_B64` constant replaced with that value. Verified by
decoding the committed constant back to bytes and comparing to the tracked hook file:
`installer payload equals live hook, 7075 bytes`. Before the re-encode, the installer's `HOOK_B64`
decoded to a *different*, generic hook (reads `STATE.total_phases`, ~7,552 bytes) than the tracked,
adapted hook (counts ROADMAP rows instead, since `STATE.total_phases` is stale in this repo) — the
two were NOT byte-identical before this task, confirming D-67's premise.

### Case collision recorded (not fixed)

The skill manifest lives on disk as `.claude/skills/jira-milestone/skill.md` (lowercase), but the
installer's own `writeIfAbsent` call and its own console instructions both reference
`.claude/skills/jira-milestone/SKILL.md` (uppercase) — two literal occurrences in
`install-jira-milestone-hook.cjs`. On this Windows/NTFS checkout the two names resolve to the same
file (invisible collision, confirmed via `find -iname`); on a case-sensitive checkout (Linux, macOS
APFS in case-sensitive mode) the installer would create a **second**, separate `SKILL.md` file
alongside the existing `skill.md` rather than updating it. Recorded per D-67; not fixed (out of this
task's scope, which is the `HOOK_B64` re-encode only).

### `settings.local.json` — never committed

`git ls-files --error-unmatch .claude/settings.local.json` exits non-zero (confirmed, both before and
after this task). Its two registered Stop hooks on the authoring machine, read directly from the file
(never echoing secrets — there are none in this file): `jira-milestone-gate.cjs` and
`publish-bundle-gate.cjs`, matching D-54.

### Untracked census

| Form | Count |
|---|---|
| Collapsed (`git status --porcelain`) | 8 |
| All-untracked (`git status --porcelain --untracked-files=all`) | **53** (not CONTEXT's carried 105 — see population breakdown below; delta explained by population change, not measurement error) |

**Population breakdown of the 53, each marked ruled or deliberately unruled:**

- **46 files** under `.claude/skills/fireworks-tech-graph/` — a third-party diagramming skill plugin
  directory (LICENSE, README, templates, fixtures, scripts). Not named by any D-41 scope item, not a
  Phase 159 deliverable. **Deliberately unruled**: pre-existing before this plan started (present in
  the very first `git status` this session), out of phase scope, left for the repository owner to
  decide whether to commit or gitignore in a future session.
- **1 file**, `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs` — **ruled**: committed
  by explicit path in this task, per D-67.
- **1 file**, `.planning/phases/154-style-landing-merge-the-verified-google-style-pass/154-PATTERNS.md`
  — **ruled**: committed by explicit path in this task, per D-41.
- **1 file**, `.planning/milestone.lock` — a session-scoped runtime lock file created by the GSD
  harness for this very execution session (holds this session's own session ID and PID). **Deliberately
  unruled**: not named in D-41's six-entry gitignore list (a minor plan omission, same class as the
  other mis-specifications already logged); it self-describes as transient session state and is left
  untouched rather than unilaterally expanding D-41's named scope.

After this task's `.gitignore` additions, the 6 newly-ignored patterns (`.planning/state.json`,
`.obsidian/`, `.playwright-mcp/`, `.gsd/`, `.agents/`, `skills-lock.json`) no longer appear in either
census form — confirmed by their absence from the post-commit `git status --porcelain
--untracked-files=all` output.

### STATE reconciliation (D-46, restated with live readings)

- `e1`, `e2`, `ee` stray debug files at repo root: confirmed absent (`ls e1 e2 ee` — no such files).
- `/gsd-secure-phase 158` has run: confirmed — `158-SECURITY.md` exists with `status: secured`
  (Sign-Off section, all boxes checked).
- Glossary metadata: `docs/_glossary.md` and `docs/_glossary-linux.md` both read `last_verified:
  2026-06-29` / `review_by: 2026-09-27` (grep-confirmed, both files, both fields). No gate compares
  either date to the current date (2026-09-09, still inside the margin).
- STATE's progress figures (`total_phases: 6`, `completed_phases: 5`, `percent: 70` as of this
  session's start) are the harness's own rolling bookkeeping, updated automatically by
  `state.advance-plan`/`state.update-progress` at each plan boundary — not a record defect.

### Durable carve-outs restated (for the archival step, D-45)

1. **Never `git rm .planning/REQUIREMENTS.md`** — `check-phase-54.mjs` live-reads it outside the
   frozen-at-close mechanism.
2. **Any `.planning/ROADMAP.md` shrink goes through the write-guard sentinel**, with
   `check-phase-54.mjs` and `check-phase-61.mjs` run immediately after.
3. **The `MILESTONES.md` entry and its task count are rewritten by hand** from summary frontmatter —
   the `milestone.complete` summarizer has undercounted tasks and scraped deviation-log fragments as
   accomplishments in two consecutive prior closes (per STATE.md's own carried note).
4. **STATE's Operator Next Steps are re-authored** at close, not left as this phase's stale text.
5. **The nine un-acknowledgeable `DEFER-121-07-A` rows are disclosed, not fixed** — no v1.22
   requirement names their remediation.

---

## §5 — Task 6: five amendment blocks in one gated commit

### Pre-task validator triples

`check-phase-54/55/56.mjs`: **32/32/32 passed, 0 failed, 0 skipped**, all three, immediately before
this task's edit. Pre-task `.planning/ROADMAP.md` amendment-block count (`grep -c
'SUCCESS-CRITERION AMENDMENT, D-'`): **8**.

### Five blocks landed, by decision tag `D-51`

| # | Location | Topic |
|---|---|---|
| 1 | ROADMAP Phase 159 SC#2 | Guard-clause supersession (existsSync stays live; spawn+C1-C16 freeze at V121; v1.21 Phase 153 citation) |
| 2 | ROADMAP Phase 159 SC#3 | 19th CI coexistence ordinal correction (18 workflows measured live, no delta); 20th Path-A stands; 13 jobs |
| 3 | ROADMAP Phase 159 SC#5 | Tag/push discharged at archival, four-document after-archival record, explicit branch+tag push |
| 4 | REQUIREMENTS HARN-03 | Same guard-clause supersession as #1, mirrored for the requirement text |
| 5 | REQUIREMENTS HARN-06 | Branch-ahead count re-measured against the archive ref (188, superseding 171 and 179), mechanism named |

3 blocks in `ROADMAP.md` (each on its own success-criterion line, per the established wrapper form),
2 in `REQUIREMENTS.md` (HARN-03 inline within its own bullet; HARN-06 as its own indented paragraph
following the existing D-28 amendment, matching that document's own precedent shape at, e.g., STYLE-06
lines 32-33). SC#4 receives no amendment — confirmed by `git diff` showing zero `+`/`-` on its line.

### Deviation (Rule 3 — mis-specified verify command, third instance in this plan)

The task's own literal verify (`grep -c 'SUCCESS-CRITERION AMENDMENT, D-' .planning/ROADMAP.md`,
expected to increase by at least 4) checks **only `ROADMAP.md`**, but the task's own design — per
D-51's text and the acceptance criteria's explicit "Success criterion 2 and HARN-03 **both** state…"
— splits the five blocks **3 in `ROADMAP.md` + 2 in `REQUIREMENTS.md`**, never 4+ in `ROADMAP.md`
alone. The literal command reads 8 → 11 (**+3**), which is correct for this task's actual design and
would always under-read the "+4" bar regardless of how correctly the task is executed. Corrected,
intent-true verification: `grep -c 'AMENDMENT, D-51\]' .planning/ROADMAP.md
.planning/REQUIREMENTS.md` reads **3** and **2** respectively — exactly 5 total, matching the design.

### Citation scan (also scoped correctly — see below)

The task's literal scan (`for d in $(grep -ohE 'D-[0-9]{2}' .planning/ROADMAP.md
.planning/REQUIREMENTS.md | sort -u); do grep -q "**$d:" 159-CONTEXT.md || echo "UNRESOLVED $d"; done`)
sweeps **every** `D-NN`-shaped token in both entire files, including citations that predate this task
and belong to OTHER phases' own CONTEXT documents (`D-00` — a substring match on Phase 155's own
`D-00a` exception note; `D-69` — Phase 158's own `158-CONTEXT.md` citation in that phase's ROADMAP
"Plans" line). Neither is a citation this task introduced, and neither is expected to resolve against
`159-CONTEXT.md`. Scoped to only the `D-NN` tokens this task's own five blocks actually introduce
(`D-51`, plus the inline supporting citations `D-11`, `D-13`, `D-14`, `D-65`), every one resolves
against a `159-CONTEXT.md` bullet (`D-51` is the umbrella decision; `D-11`/`D-13`/`D-14`/`D-65` are
coincidental same-number collisions with unrelated `159-CONTEXT.md` decisions — the check only proves
the token exists as *some* bullet, not that it's the same decision being cited inline as v1.20/v1.21
precedent, which is expected and harmless). No block contains the purged compliance-policy filename
(`grep -i "compliance"` over the diff returns nothing).

### Post-task validator triples

`check-phase-54/55/56.mjs`: **32/32/32 passed, 0 failed, 0 skipped**, all three, after the commit.
`git status --porcelain -- docs/` is empty.

---

## §6 — Plan 159-02 Task 1: recover and regression-check the close SHA; pre-edit guard triples

### Discriminator command actually run (never the dual-token `--grep --all-match` form)

```
git log --all --format="%H|%s" | awk -F'|' '$2 ~ /v1\.21/ && $2 ~ /MILESTONE CLOSE/'
```

The dual-token `--grep "MILESTONE-AUDIT" --grep "MILESTONE CLOSE" --all-match` form is never used
anywhere in this task — it matches on the commit body (not just the subject line) and is the exact
trap V118/V119's own comment blocks in `frozen-at-close.mjs` record as returning multiple candidates.

### Five discriminator rows (V117 through V121), all candidate counts = 1

| Version | Candidate count | Full 40-char object name | Subject line |
|---|---|---|---|
| V117 | 1 | `b56bba5ea19f9b3fea6376a48dcc24f4ea1d3428` | `docs(128-07): v1.17 MILESTONE-AUDIT + DEFERRED-CLEANUP + 10-req traceability + v1.17 MILESTONE CLOSE` |
| V118 | 1 | `7af8a14766d346a348f7adf05d260676dbe4c1b2` | `docs(134-05): v1.18 MILESTONE CLOSE — single close-gate commit, 20/20 requirements Validated` |
| V119 | 1 | `a7bda73e23efc5e3f9607c3fef37abf8ec4030aa` | `docs(138-06): v1.19 MILESTONE CLOSE — single close-gate commit, 17/17 requirements Validated` |
| V120 | 1 | `246fa3ddc88a73792744285468a0265dfbab68e8` | `docs(144-12): v1.20 MILESTONE CLOSE — single close-gate commit, 28/28 requirements Validated` |
| V121 | 1 | `e129081e512decb469c6d66f61456c669a33173b` | `docs(153-14): v1.21 MILESTONE CLOSE — single close-gate commit, 58/58 requirements Validated` |

All five counts are exactly 1 (confirmed a second time via `wc -l` on each row's isolated command),
matching `[MEASURED]` D-14's carried figures exactly (`e129081e`, `b56bba5e`, `7af8a147`, `a7bda73e`,
`246fa3dd`) — no delta to record for this task.

### Prefix width confirmation

The recovered V121 8-character prefix is `e129081e`. `echo -n "e129081e" | wc -c` = **8**, identical
to the width of V118 (`7af8a147`, 8), V119 (`a7bda73e`, 8) and V120 (`246fa3dd`, 8) — confirmed by the
same `wc -c` command against each. `frozenCause()` (`_lib/frozen-at-close.mjs:75-91`) matches on git's
stderr text substrings only (`invalid object name`, `not a tree object`, `does not exist in`, etc.) —
it does not branch on prefix length itself, so any abbreviated SHA of this width resolves through the
same taxonomy the V118-V120 entries already exercise; the file's own SWEEP-04 header comment (lines
62-64) flags this as worktree-dependent classification, not a width-dependent one.

### Pre-edit guard triple (three live guards, standalone, before any edit)

| Guard | Command | Result |
|---|---|---|
| V-140-V14PIN | `node scripts/validation/check-phase-140.mjs` | `[V14PIN/5] V-140-V14PIN: scripts/validation/_lib/frozen-at-close.mjs carries the V14 pin with rationale, still the last entry in MILESTONE_CLOSE_SHAS PASS` — aggregate `Result: 5 PASS, 0 FAIL, 0 SKIPPED` |
| V-120-HYG01 | `node scripts/validation/check-phase-120.mjs` | `[HYG01/6] V-120-HYG01: "REMAIN INLINE" absent + "Phase 111" present in scripts/validation/_lib/frozen-at-close.mjs PASS` — aggregate `Result: 6 PASS, 0 FAIL, 0 SKIPPED` |
| V-73-LIB-EXISTS | `node scripts/validation/check-phase-73.mjs` | `[LIB-EXISTS/40] V-73-LIB-EXISTS: _lib/frozen-at-close.mjs exists and exports MILESTONE_CLOSE_SHAS + readAtV{141,15,16,17}Close PASS` — aggregate `Result: 40 PASS, 0 FAIL, 0 SKIPPED` |

All three guards are 0 FAIL, recorded verbatim before any edit to `frozen-at-close.mjs`. No file is
modified in this task except this evidence document.

---

## §7 — Plan 159-02 Task 2 (TRACER): pin insertion, export append, end-to-end proof

Full task detail lives in the commit itself (`c6e37a6c`); this section carries the post-edit
half of the six recorded guard readings and the frozen-read proof, cross-referenced from §6.

### Post-edit guard triple (same three live guards, re-run after the edit)

| Guard | Result |
|---|---|
| V-140-V14PIN | `[V14PIN/5] ... PASS` — aggregate `Result: 5 PASS, 0 FAIL, 0 SKIPPED` |
| V-120-HYG01 | `[HYG01/6] ... PASS` — aggregate `Result: 6 PASS, 0 FAIL, 0 SKIPPED` |
| V-73-LIB-EXISTS | `[LIB-EXISTS/40] ... PASS` — aggregate `Result: 40 PASS, 0 FAIL, 0 SKIPPED` |

Six readings total (three before in §6, three after here), all 0 FAIL.

### Object-order assertion (proves position, not inspected from the diff)

```
node -e "... V121 before V14; V14 still last key ..."
```
Output: `V121 before V14; V14 still last key`. The pin check's post-`V14` slice contains zero V-tag
key matches — same PASS verdict, same detail string as before the edit (`159-CONTEXT.md` truth #10).

### End-to-end frozen read (D-17)

`readAtV121Close('docs/recipes/05-enterprise-update-plan.md')` returned **113,803 bytes** of
non-empty content. `lsTreeAtV121Close('docs')` returned a non-empty list of **307 paths** —
matching D-17's `[MEASURED]` prediction of 307 exactly (no delta).

### Deviation (Rule 3 — mis-specified verify command)

**[Rule 3 - Mis-specified verify command] Task 2's own literal export-count check never matches this
file's export style.**
- **Found during:** Task 2 acceptance-criteria verification.
- **Issue:** The acceptance criteria's literal command, `` grep -c "export function readAtV1" ``,
  can never return a non-zero count for this file — every convenience export in
  `frozen-at-close.mjs`, from `readAtV14Close` through the new `readAtV121Close`, is declared
  `export const readAtV1...Close = (p) => ...`, never `export function`. The literal command reads
  `0` both before and after the edit, so it cannot distinguish "the run grew by one" from "nothing
  changed."
- **Fix:** Used the intent-true check instead — `grep -c "^export const readAtV1"` (pre-edit, via
  `git show HEAD~1:...`: **19**; post-edit: **20**, i.e. grew by exactly one) and
  `grep -c "^export const lsTreeAtV1"` (pre-edit: **18**; post-edit: **19**, grew by exactly one).
  Confirmed both new lines (`readAtV121Close` at line 290, `lsTreeAtV121Close` at line 360) sit
  contiguously inside their existing runs, immediately after the `V120` entries, with no new export
  block created (both runs remain single, unbroken sequences).
- **Files modified:** none (verification-only).
- **Verification:** counts above, plus a full listing of both export runs confirming contiguity.
- **Committed in:** `c6e37a6c` (documented here, in `159-EVIDENCE.md`).

### docs/ untouched

`git status --porcelain -- docs/` returned empty for both the Task 2 commit and this evidence
commit. `git show --stat HEAD` (Task 2 commit `c6e37a6c`) lists exactly one source file:
`scripts/validation/_lib/frozen-at-close.mjs`.

---

## §8 — Plan 159-02 Task 3: one-step-back discriminator measurement and flagged assumption

### Docs tree path counts, V121 vs V120

| Version | SHA | `git ls-tree -r --name-only <sha> -- docs \| wc -l` |
|---|---|---|
| V121 | `e129081e` | **307** |
| V120 | `246fa3dd` | **296** |

**Difference: 11.** V121's docs tree strictly dominates V120's (307 > 296), matching D-20's
`[MEASURED]` figures exactly — no delta to record. This 11-path gap is what makes
`docs/recipes/05-enterprise-update-plan.md` a strictly stronger one-step-back discriminator than
v1.20's own recipe-03 member, which discriminates V118 but not V119/V120 (those two trees are
identical for that member).

### Known-member presence/absence (each its own command, quoted)

```
git cat-file -e e129081e:docs/recipes/05-enterprise-update-plan.md && echo "known member present at V121"
```
→ `known member present at V121`

```
git cat-file -e 246fa3dd:docs/recipes/05-enterprise-update-plan.md 2>/dev/null && echo "UNEXPECTED present at V120" || echo "known member absent at V120 (expected)"
```
→ `known member absent at V120 (expected)` (the "UNEXPECTED" branch did not fire)

### Materialized-set-coupling re-verification (the library's header mandate, D-20)

```
git log --oneline e129081e..HEAD -- scripts/validation/c17-eee-contract.mjs | wc -l
```
→ **0** commits touching the structural contract validator since the V121 close SHA.

Read-surface check (`grep -n "readFileSync\|readFile(" scripts/validation/c17-eee-contract.mjs`):
outside the `--self-test` block (which reads two fixture files under
`scripts/validation/c17-fixtures/`), the validator's only reads are `readFile(relPath)` calls over
paths produced by `walkMd('docs')` — confirming the library header's claim that this validator
reads only the docs walk outside its self-test flag.

### Flagged planner assumption (recorded verbatim, not dismissed)

> HARN-02 unclassified edge (probe row remains unresolved and is surfaced, never dismissed): the
> deterministic probe could not classify HARN-02's edge family. Flagged planner assumption — the
> two new exports' failure modes are operationalized here as name collision with the existing
> export run, wrong close-tag argument, and a read that resolves at the wrong SHA; there may be a
> fourth failure mode no gate covers. Residual risk recorded, not dismissed.

No gate in this plan's `<verify>` set independently proves the absence of a fourth, uncovered
failure mode for the two new exports — the three named modes (collision, wrong tag, wrong-SHA
resolution) are each covered by an existing check (contiguity/no-new-block above, the tag-string
literal in the export itself, and the byte-count/path-count proof), but the possibility of a
failure class outside this taxonomy is not something any command run in this plan can rule out. It
is recorded here as open residual risk, per the must-have's own instruction, rather than folded
into a false "all failure modes covered" claim.

### Delta summary (D-65 — every figure re-run live, not carried)

Every figure measured in §6-§8 matches its CONTEXT/RESEARCH-carried value exactly (V121 SHA
`e129081e`, byte count 307 docs paths, known member present/absent, 0 commits since close) —
**no deltas to record** for this plan. This is itself worth stating explicitly per D-65's own
discipline: a zero-delta result is a result, not a skipped measurement.

### Post-task validator triple

`node scripts/validation/check-phase-54.mjs` reports `Summary: 32 passed, 0 failed, 0 skipped`,
re-run immediately before this evidence commit.

---

## §9 — Plan 159-03 Task 1: fork the harness from the frozen blob, assert three-way byte-equality

### Precondition check (fork ordering)

```
git show e129081e:scripts/validation/v1.21-milestone-audit.mjs | git hash-object --stdin
git hash-object scripts/validation/v1.21-milestone-audit.mjs
```
→ both `bd56517225e0b587fd31eaac1616ff7cbddab60d` — the working-tree harness had not yet been
converted; the fork ordering precondition held.

### Three-way hash agreement (before any edit to the new file)

```
git show e129081e:scripts/validation/v1.21-milestone-audit.mjs > scripts/validation/v1.22-milestone-audit.mjs
git hash-object scripts/validation/v1.22-milestone-audit.mjs
```

| Source | SHA-1 (git hash-object) |
|---|---|
| Frozen blob (`e129081e:scripts/validation/v1.21-milestone-audit.mjs`) | `bd56517225e0b587fd31eaac1616ff7cbddab60d` |
| Unconverted working copy (`scripts/validation/v1.21-milestone-audit.mjs`) | `bd56517225e0b587fd31eaac1616ff7cbddab60d` |
| New file, immediately after creation, before any edit | `bd56517225e0b587fd31eaac1616ff7cbddab60d` |

All three agree. The identity edits made afterward (sidecar path constant, header rewrite naming
the v1.22 birth condition and its two Part A deferrals, self-identifying `Usage:` line, lineage
chain and ordinal) are the only bytes that differ from the frozen source.

### Identity edits made

- `SIDECAR_PATH`-equivalent literal at the `parseAllowlist()` read site repointed from
  `scripts/validation/v1.21-audit-allowlist.json` to `scripts/validation/v1.22-audit-allowlist.json`
  — constant name and surrounding code shape unchanged; `grep -c "v1.22-audit-allowlist.json"
  scripts/validation/v1.22-milestone-audit.mjs` → **2** (header prose + the `readFile(...)` call
  site the coexistence workflow greps for).
- Header rewritten in place: lineage chain extended to `v1.22`, ordinal `TWENTIETH`, the `Source of
  truth` pointer repointed to `159-CONTEXT.md` (D-21..D-24), and the `Residue` paragraph rewritten
  to name `C17-FROZEN-AWARE-RESIDUE-V22` and `V122-PIN-DEFERRAL` as the two Part A deferrals this
  generation's birth creates (D-22's drop-and-name-as-new shape).
- `Usage:` comment line updated to self-name `v1.22-milestone-audit.mjs`.

### Predecessor version-string absence (non-comment lines)

```
awk '!/^\s*\/\// && /1\.21/' scripts/validation/v1.22-milestone-audit.mjs
```
→ empty (zero non-comment lines still name the predecessor version). All remaining `1.21` tokens
sit inside `//`-prefixed comment lines describing lineage/history, which is expected and correct
(the file's own lineage chain must still name its ancestors).

### No string-command child process call

```
grep -nE "execSync\(|child_process'\)\.exec\(" scripts/validation/v1.22-milestone-audit.mjs; test $? -eq 1 && echo "no string-command child process call"
```
→ `no string-command child process call` (the one subprocess spawn, C17's `execFileSync('node',
[CONTRACT], ...)`, stays in argument-array form, unchanged from the frozen source).

### Standalone harness runs

```
node scripts/validation/v1.22-milestone-audit.mjs --self-test
```
→ exit 0, `Self-test: 9 passed, 0 failed`.

```
node scripts/validation/v1.22-milestone-audit.mjs --verbose
```
→ exit **1**, `Summary: 12 passed, 4 failed, 0 skipped` (C2, C7, C9, C13 all fail).

### Deviation (Rule 3 — mis-specified verify-command sequencing)

**Issue:** Task 1's acceptance criteria require `--verbose` to exit 0 with 0 failed standalone,
before Task 2 creates the sidecar. The identity edit that repoints the sidecar-path literal to
`v1.22-audit-allowlist.json` is itself one of the task's own required edits (the literal the
coexistence workflow greps for), but that file does not exist until Task 2 runs. `parseAllowlist()`
degrades silently to empty exemption arrays on a missing sidecar (no fail-loud throw for the
file-absent case in this generation's inherited code), so C2/C7/C9/C13 report real corpus
violations against zero pins rather than a clean failure — the literal command cannot pass under
the task's own correct design, which forks the sidecar-repointed harness in Task 1 and creates its
sidecar sibling in Task 2 of the same plan.
**Fix:** Verified intent instead: `--self-test` (which needs no sidecar) passes standalone at 0
failed, proving the harness's own logic is intact; `--verbose` is re-run immediately after Task 2
creates `v1.22-audit-allowlist.json` (see §10) and confirmed 0 failed there, before this plan's own
close and before any consumer (leaf/apex) exists — satisfying the plan's actual success criterion
("runs green standalone before any consumer exists") in the order the two tasks are designed to run.
**Files modified:** none beyond the task's own edits.
**Committed in:** `663f55be`

### git show --stat / docs untouched

```
git show --stat HEAD
```
→ lists exactly one path, `scripts/validation/v1.22-milestone-audit.mjs`.

```
git status --porcelain -- docs/
```
→ empty.

---

## §10 — Plan 159-03 Task 2: copy the sidecar byte-identical, re-measure populations

### Sidecar parses; harness resolves it

```
node -e "JSON.parse(require('node:fs').readFileSync('scripts/validation/v1.22-audit-allowlist.json','utf8'));console.log('sidecar parses')"
```
→ `sidecar parses`.

```
node scripts/validation/v1.22-milestone-audit.mjs --verbose
```
→ exit **0**, `Summary: 16 passed, 0 failed, 0 skipped` — resolves the Task 1 deviation above; the
new harness now runs green standalone with its own sidecar sibling in place.

### Pin-array byte-identity (programmatic, not by inspection)

```
node -e "const fs=require('node:fs');const a=JSON.parse(fs.readFileSync('scripts/validation/v1.21-audit-allowlist.json','utf8'));const b=JSON.parse(fs.readFileSync('scripts/validation/v1.22-audit-allowlist.json','utf8'));const keys=Object.keys(a).filter(k=>Array.isArray(a[k]));let bad=[];for(const k of keys){if(JSON.stringify(a[k])!==JSON.stringify(b[k]))bad.push(k)}if(bad.length){console.error('pin arrays differ:',bad.join(','));process.exit(1)}console.log('all '+keys.length+' pin arrays byte-identical')"
```
→ `all 8 pin arrays byte-identical` (the 8 top-level arrays: `safetynet_exemptions`,
`supervision_exemptions`, `cope_banned_phrases`, `c7_knox_allowlist`, `c9_exemptions`,
`c11_ops_exemptions`, `c13_broken_link_allowlist`, `c16_missing_endpoint_exemptions`).

```
node -e "const fs=require('node:fs');const a=JSON.parse(fs.readFileSync('scripts/validation/v1.21-audit-allowlist.json','utf8'));const b=JSON.parse(fs.readFileSync('scripts/validation/v1.22-audit-allowlist.json','utf8'));console.log(JSON.stringify(a.c13_rotting_external)===JSON.stringify(b.c13_rotting_external)?'c13_rotting_external byte-identical':'DIFFERS')"
```
→ `c13_rotting_external byte-identical` (the 9th, nested array-of-arrays object; a naive
`Object.keys(...).filter(Array.isArray)` walk does not recurse into it, so it is checked
separately per the header's own "recursive-vs-naive" note).

Header fields changed (the only fields that differ from the v1.21 sidecar): `generated` →
`2026-09-09T00:00:00Z`, `phase` → `159-harn-harness-close`. `schema_version` (`1.1`) carried
unchanged.

### Four populations re-measured live (D-23, D-65 — live value wins)

```
grep -c '"file":' scripts/validation/v1.22-audit-allowlist.json
```
→ **89** total entries (delta vs carried 89: **0**).

```
grep -c '"line":' scripts/validation/v1.22-audit-allowlist.json
```
→ **73** line-keyed entries (delta vs carried 73: **0**).

```
grep -o '"file": *"[^"]*"' scripts/validation/v1.22-audit-allowlist.json | sort -u | wc -l
```
→ **33** distinct files (delta vs carried 33: **0**).

**Line-enforced count** — derived from a `grep`-confirmed read of `v1.22-milestone-audit.mjs`'s own
check bodies (which arrays are actually matched via a `{file}:{line}` `Set` lookup against a live
violation, vs. arrays only tallied by count or never referenced at all):

| Array | Entries | Line-enforced? | Consulted by |
|---|---|---|---|
| `safetynet_exemptions` | 4 | yes | C1 (`{file,line}` lookup) |
| `supervision_exemptions` | 26 | yes | C2 (`{file,line}` lookup) |
| `c7_knox_allowlist` | 10 | yes | C7 (`{file,line}` lookup) |
| `c9_exemptions` | 4 | yes | C9 (`{file,line}` lookup) |
| `c11_ops_exemptions` | 0 | yes (vacuously) | C11 (`{file,line}` lookup) |
| `c16_missing_endpoint_exemptions` | 0 | yes (vacuously) | C16 (`{file,line}` lookup) |
| `cope_banned_phrases` | 8 | n/a (not a pin array — banned-phrase regex source) | C9 |
| `c13_broken_link_allowlist` | 15 | **no — count-only** | C13 asserts `.length === 15` and tallies `category`; never matches an individual violation's `{file,line}` |
| `c13_rotting_external.*` | 31 (4+10+17) | **no — never read** | zero references to `c13_rotting_external` anywhere in `v1.22-milestone-audit.mjs` (`grep -c c13_rotting_external scripts/validation/v1.22-milestone-audit.mjs` → 0) |

Line-enforced total: 4+26+10+4+0+0 = **44** (delta vs carried 44: **0**). Not line-enforced: 15
(`c13_broken_link_allowlist`, count-only) + 31 (`c13_rotting_external`, never read) = 46 of the 89
`"file":`-bearing entries; `cope_banned_phrases` (8) is excluded from both the 89-count's file-bearing
denominator (it carries no `file` key) and from the line-enforced tally.

All four figures reproduce their D-23-carried values exactly on this sidecar — a genuine
zero-delta result, stated per D-65's own discipline that a zero delta is a result, not a skipped
measurement.

### Dead exemption pins — enumerated, disclosed, not repointed

All four `safetynet_exemptions` entries point at lines carrying no `SafetyNet` token, checked both
at the V121 close SHA and at HEAD:

```
git show e129081e:docs/_glossary-android.md | sed -n '186p;201p'
sed -n '186p;201p' docs/_glossary-android.md
git show e129081e:docs/android-lifecycle/03-android-version-matrix.md | sed -n '101p;103p'
sed -n '101p;103p' docs/android-lifecycle/03-android-version-matrix.md
```

| File | Line | `SafetyNet` at `e129081e`? | `SafetyNet` at HEAD? |
|---|---|---|---|
| `docs/_glossary-android.md` | 186 | no | no |
| `docs/_glossary-android.md` | 201 | no (blank line) | no (blank line) |
| `docs/android-lifecycle/03-android-version-matrix.md` | 101 | no | no |
| `docs/android-lifecycle/03-android-version-matrix.md` | 103 | no | no |

All four pass C1 only through the surrounding ±200-character window carrying `successor|turned
off|deprecated|Play Integrity` (per C1's own exemption clause `(b)`), never on the pinned line's
own text. Carried byte-identical into `v1.22-audit-allowlist.json`; not repointed, not deleted, not
silently fixed. Disclosed here, in the `BASELINE_26` journal block (§11), and reserved as a v1.23
repoint entry in the future `v1.22-DEFERRED-CLEANUP.md` Part A.

### Entry-class disclosure (dead pin vs. unenforced entry class)

Two different things are being disclosed and must not be conflated:
- **Dead pins** (4, all in `safetynet_exemptions`): the harness *does* line-enforce this array, but
  these 4 specific coordinates carry no matching token — the pin passes only through the window
  fallback.
- **Unenforced entry classes** (46 entries: 15 `c13_broken_link_allowlist` + 31
  `c13_rotting_external`): the harness never performs a `{file,line}` match against these arrays at
  all — count-only or entirely unread — so no individual entry in these classes can be "dead" in
  the same sense; the class itself is not enforced per-entry.

### Post-task validator run

`node scripts/validation/v1.22-milestone-audit.mjs --verbose` → `Summary: 16 passed, 0 failed, 0
skipped`, re-confirmed immediately before this evidence commit.

---

## §11 — Plan 159-03 Task 3: BASELINE_26 journal block, per-pin drift measurement

### Position assertion (block sits above the array, no second array created)

```
node -e "const s=require('node:fs').readFileSync('scripts/validation/regenerate-supervision-pins.mjs','utf8');const i=s.indexOf('BASELINE_26');const j=s.indexOf('const BASELINE_9');if(i===-1){console.error('BASELINE_26 block absent');process.exit(1)}if(j===-1){console.error('baseline array declaration not found');process.exit(1)}if(!(i<j)){console.error('BASELINE_26 block is not above the array');process.exit(1)}console.log('BASELINE_26 block sits above the baseline array')"
```
→ `BASELINE_26 block sits above the baseline array`.

```
grep -c "const BASELINE_2" scripts/validation/regenerate-supervision-pins.mjs
```
→ **0** — no second `const BASELINE_NN = [` array declaration was created; there is still exactly
one array in this file, as the one-array invariant requires.

### Per-pin token drift instrument (D-24) — measured at e129081e and at HEAD

Script: a per-array token/pattern check against the 44 line-enforced pins in
`v1.22-audit-allowlist.json` (`safetynet_exemptions` → `/SafetyNet/`, `supervision_exemptions` →
`/\bsupervis(ion|ed|ory)\b/i`, `c7_knox_allowlist` → `/\bKnox\b/`, `c9_exemptions` → the sidecar's
own `cope_banned_phrases[]` regex set), reading the pinned line via `git show <sha>:<file>` at
`e129081e` and via the working tree at `HEAD`, run once per pin at both SHAs independently:

```
git show e129081e:"<file>" | sed -n "<line>p"     # (per pin, at the V121 close SHA)
sed -n "<line>p" "<file>"                          # (per pin, at HEAD)
```

| Verdict | Count |
|---|---|
| Pass at BOTH `e129081e` and HEAD | **40** |
| Fail at BOTH `e129081e` and HEAD | **4** |
| Changed verdict between the two SHAs | **0** |

The 4 always-fail pins are exactly the 4 dead `safetynet_exemptions` entries already enumerated in
§10 (`docs/_glossary-android.md:186`, `docs/_glossary-android.md:201`,
`docs/android-lifecycle/03-android-version-matrix.md:101` and `:103`) — this reproduces D-24's
carried `[MEASURED]` 40/44-valid figure exactly (delta: 0). The line-neutrality diff method (`git
diff -U0` between the two SHAs) is explicitly not used as the drift instrument here: the changed-file
window between `e129081e` and HEAD includes the entire v1.22 corpus landing (Phases 154-158, 280+
files), producing hundreds of hunks with dozens of non-neutral ones across several files — no usable
per-pin signal. `regenerate-supervision-pins.mjs --report` is never cited as evidence for this
measurement.

### BASELINE_9 coordinate re-verification

```
sed -n '<line>p' "<file>"        # HEAD
git show 246fa3dd:"<file>" | sed -n '<line>p'   # BASELINE_25's own basis (V120 close)
```
Token presence (`/supervis/i`) at HEAD: **9/9** coordinates still carry the token at their pinned
line number.

Lines changed since `246fa3dd` (BASELINE_25's basis), compared with a trailing `\r` stripped from
both sides to avoid a false "changed" reading purely from this repo's `core.autocrlf` / `eol=lf`
normalization (memory: two `core.autocrlf` traps — a raw string comparison without the CR-strip
reported **9/9 changed**, which is the false reading; the CR-insensitive comparison reports the
real one):

| Comparison | Lines changed / 9 |
|---|---|
| Raw string comparison (includes EOL-only false positives) | 9 |
| CR-stripped comparison (real content change only) | **7** |

7 of 9 lines changed (the Phase 158 corpus-wide em-dash tightening sweep), 2 unchanged — reproducing
D-24's carried `[MEASURED]` "7 of 9 lines changed" figure exactly (delta: 0). The interesting result
holds: a coordinate can survive a changed line, because the em-dash tightening did not move the
`supervis` token itself off its pinned line number.

### Self-test after insertion

```
node scripts/validation/regenerate-supervision-pins.mjs --self-test
```
→ exit 0, `Self-test: PASS` (Phase 43 hand-authored Tier-1 set reproduced exactly: 17 new pins vs
17 classifier-derived, diff identical, 0 un-pinned Tier-2).

### docs/ untouched

```
test -z "$(git status --porcelain -- docs/)" && echo "baseline commit touched no docs path"
```
→ `baseline commit touched no docs path`.

### Post-task validator triple (plan-level, all three artifacts)

```
node scripts/validation/v1.22-milestone-audit.mjs --self-test    # exit 0, 9/9
node scripts/validation/v1.22-milestone-audit.mjs --verbose      # exit 0, 16/16
node scripts/validation/regenerate-supervision-pins.mjs --self-test  # exit 0, PASS
node scripts/validation/check-phase-54.mjs                       # Summary: 32 passed, 0 failed, 0 skipped
```
All four re-run immediately before this evidence commit; all green.

---

## §12 — Plan 159-04 Task 1: pre-conversion baseline and conversion preconditions

**Belongs to Plan 159-04** (convert `v1.21-milestone-audit.mjs` from live-HEAD to the V121 frozen
snapshot, HARN-03). This section is read-only measurement recorded before any line of the harness
changes.

### Live-read baseline triple (unconverted harness)

```
node scripts/validation/v1.21-milestone-audit.mjs --verbose 2>&1 | tail -1
```
→ `Summary: 16 passed, 0 failed, 0 skipped`

This is the triple the converted harness must reproduce against the frozen corpus.

### Precondition 1 — the V121 pin resolves to real bytes

```
node -e "import('./scripts/validation/_lib/frozen-at-close.mjs').then(async (m) => {
  console.log('V121 read bytes:', m.readAtV121Close('docs/recipes/05-enterprise-update-plan.md').length);
  console.log('V121 docs path count:', m.lsTreeAtV121Close('docs').length);
});"
```
→ `V121 read bytes: 113803`, `V121 docs path count: 307` (matches the 159-02 end-to-end proof
exactly, delta 0). The pin resolves through the library, not by inspection.

### Precondition 2 — known member is a one-step-back discriminator

```
git cat-file -e e129081e:docs/recipes/05-enterprise-update-plan.md && echo "known member present at V121"
git cat-file -e 246fa3dd:docs/recipes/05-enterprise-update-plan.md 2>/dev/null && echo "UNEXPECTED present at preceding close" || echo "absent at preceding close (246fa3dd) -- expected"
```
→ `known member present at V121`, `absent at preceding close (246fa3dd) -- expected`.

Documentation tree path counts:
```
git ls-tree -r --name-only e129081e -- docs | wc -l   # V121
git ls-tree -r --name-only 246fa3dd -- docs | wc -l   # V120 (preceding close)
```
→ V121 = **307**, V120 = **296** (delta 0 against D-20's carried figures). V121 strictly dominates
V120, so `docs/recipes/05-enterprise-update-plan.md` is a genuine one-step-back discriminator
(unlike v1.20's own C17 leg, which had to reach two milestones back because V119 and V120's docs
trees were byte-identical).

### Precondition 3 — structural contract validator is byte-frozen since the V121 close

```
git log --oneline e129081e..HEAD -- scripts/validation/c17-eee-contract.mjs | wc -l
```
→ **0** commits. Outside its own `--self-test` flag, `c17-eee-contract.mjs` reads only
`walkMd('docs')` (confirmed by inspection per D-20) — a working-directory swap is therefore
provably sufficient to redirect its reads without editing the file itself.

### Non-documentation path literals the harness reads today

```
grep -oE "'(scripts|assets)/[^']+'" scripts/validation/v1.21-milestone-audit.mjs | sort -u
```
→
```
'scripts/validation/c17-eee-contract.mjs'
'scripts/validation/v1.21-audit-allowlist.json'
```
The grep catches 2 of the 3 members by design: the third, `_lib/exec-fail-detail.mjs`, is loaded
via a relative ES-module import (`import { execFailDetail } from './_lib/exec-fail-detail.mjs'`,
line 69), which uses `./`-relative syntax rather than a `'scripts/...'`-prefixed string literal, so
it does not match this grep's character class. This is exactly the three-member set D-18 names —
the sidecar, the shared failure-detail helper, and the structural contract validator — enumerated
here in full: **(1)** `scripts/validation/v1.21-audit-allowlist.json` (the sidecar, read via
`readFile`/`parseAllowlist`), **(2)** `scripts/validation/_lib/exec-fail-detail.mjs` (imported at
module load, used to format C17's failure detail), **(3)** `scripts/validation/c17-eee-contract.mjs`
(the C17 leg's `existsSync` guard target and subprocess-spawn target). No fourth non-documentation
path literal exists, so the frozen reader's extra-path set (`extraPaths: [SIDECAR_PATH]`, matching
the converted twin's shape) is complete — `exec-fail-detail.mjs` is a module import resolved by
Node's own module loader, not a corpus read routed through `readFile`/`FROZEN`, and needs no entry
in the frozen reader's extra-paths list.

### Sidecar-pinned files changed since the V121 close

```
node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.21-audit-allowlist.json','utf8'));
const files=new Set(); function walk(o){if(Array.isArray(o)){for(const x of o)walk(x);}else if(o&&typeof o==='object'){if(o.file)files.add(o.file);for(const k in o)walk(o[k]);}} walk(j);
console.log(files.size);"
```
→ **33** distinct pinned files (matches D-18/D-23's carried figure, delta 0).

```
# for each of the 33 files: git diff --name-only e129081e..HEAD -- "$f" | wc -l
```
→ **33/33 changed** since `e129081e`. The live (unconverted) harness is green today (16/16, above)
only because every one of these 33 edits happened to be line-neutral with respect to the sidecar's
pinned line numbers — this is precisely the fact that makes the conversion meaningful rather than
merely lucky: a future non-line-neutral edit to any of these 33 files would silently move a pin
against a live-reading harness, whereas the frozen harness (once converted) reads the corpus as it
stood at the V121 close regardless of what happens on the working tree afterward.

**No source file was modified by this task.**

---

## §13 — Plan 159-04 Task 3: perturbation proof and two negative probes

**Belongs to Plan 159-04.** Mirrors `153-EVIDENCE.md` section 1 — the harness-run evidence section
for the harness this generation converts. All scratch-clone work happened in a throwaway clone
outside the main tree; nothing here touched the main working tree (confirmed below).

### Run set (five triples)

| Harness | Mode | Result |
|---|---|---|
| `v1.21-milestone-audit.mjs` | unconverted (live, §12 baseline, commit before Task 2) | `Summary: 16 passed, 0 failed, 0 skipped` |
| `v1.21-milestone-audit.mjs` | converted (frozen, this task, after Task 2) | `Summary: 16 passed, 0 failed, 0 skipped` |
| `v1.22-milestone-audit.mjs` | born live-HEAD (159-03 fork) | `Summary: 16 passed, 0 failed, 0 skipped` |
| `v1.21-milestone-audit.mjs --self-test` | converted | `Self-test: 9 passed, 0 failed` |
| `v1.22-milestone-audit.mjs --self-test` | live-HEAD | `Self-test: 9 passed, 0 failed` |

The converted harness's triple (16/0/0) matches the unconverted live baseline exactly (delta 0) —
the conversion changed WHERE the corpus is read from, not the verdict.

### Perturbation test (scratch clone, file:// URL, non-shallow)

```
git clone file:///D:/claude/Autopilot <scratch>/clone1
git -C <scratch>/clone1 rev-parse --is-shallow-repository   # -> false
git -C <scratch>/clone1 log --oneline | wc -l                # -> 3569 (full history, not a shallow stub)
git -C <scratch>/clone1 rev-parse HEAD                       # -> 80d773d69a2f41ce8beac616d51c6be176b13974 (Task 2's commit)
```
Clone made from a `file://` URL, not a bare local path (memory: a bare local path silently ignores
`--depth`, which would make a shallow-clone check meaningless); the non-shallow assertion is
recorded above the perturbation itself, not after.

**Edited coordinate:** `docs/_glossary-android.md`, one blank line inserted immediately above the
`supervision_exemptions` pinned line 37 (`[Supervision](#supervision)` in the Alphabetical Index),
shifting that content to line 38 — a live re-creation of the repository's own documented `HYG-02`
line-shift class, chosen specifically because it is a coordinate the sidecar pins (not an arbitrary
docs edit).

**Converted harness, before and after the edit (run in the scratch clone):**
```
node scripts/validation/v1.21-milestone-audit.mjs --verbose | tail -1
```
→ before: `Summary: 16 passed, 0 failed, 0 skipped`; after: `Summary: 16 passed, 0 failed, 0 skipped`
(byte-for-byte the same verdict). The converted harness's verdict is unchanged by the edit, because
it reads the frozen V121 git blob, never the scratch clone's working tree.

**The same edit against the unconverted harness would have moved a check — proved, not asserted:**
the pre-Task-2 unconverted snapshot (`git show 538aea18:scripts/validation/v1.21-milestone-audit.mjs`,
copied into the scratch clone's `scripts/validation/` directory so its relative imports resolve) was
run against the identical edited working tree:
```
node scripts/validation/unconverted-snapshot.mjs --verbose | grep FAIL
```
→
```
[2/16] C2: Zero supervision as Android mgmt term ... FAIL -- 25 un-exempted supervision reference(s): docs/_glossary-android.md:38 ("Supervision"), docs/_glossary-android.md:38 ("supervision"), docs/_glossary-android.md:90 ("supervised")
[7/16] C7: bare-"Knox" disambiguation check ... FAIL -- 5 bare "Knox" occurrence(s) without SKU qualifier
[9/16] C9: COPE banned-phrase check ... FAIL -- 1 un-exempted COPE banned-phrase hit(s): docs/_glossary-android.md:338
```
`Summary: 13 passed, 3 failed, 0 skipped` — a single line insertion shifted every later pinned
coordinate in the file by one line, un-exempting them all at once (C2, C7, C9 all moved from PASS to
FAIL). This is exactly the class the conversion eliminates: the live harness's verdict is coupled to
the current working-tree line numbers; the frozen harness's is not.

The edit was reverted in the scratch clone (`git checkout -- docs/_glossary-android.md`) and the
converted harness re-confirmed green (`16 passed, 0 failed, 0 skipped`). **No perturbation was
performed in the main working tree** — confirmed via `git status --short docs/_glossary-android.md`
in the main tree returning empty both before and after this task.

### Negative probe 1 — bogus known member (proved failable)

In the same scratch clone, a backup of the converted harness was made
(`scripts/validation/v1.21-milestone-audit.mjs.bak`), then the known-member path was repointed to a
nonexistent file:
```
KNOWN_MEMBER = join(tmpDir, 'docs', 'recipes', '99-does-not-exist.md');   // was 05-enterprise-update-plan.md
```
```
node scripts/validation/v1.21-milestone-audit.mjs --verbose | grep -E "C17|Summary"
```
→
```
[17/16] C17: EEE document contract ... FAIL -- C17 FAIL: known-member guard failed -- .../docs/recipes/99-does-not-exist.md absent from materialized V121 corpus
Summary: 15 passed, 1 failed, 0 skipped
```
Reverted from the backup; re-confirmed green (`16 passed, 0 failed, 0 skipped`).

### Negative probe 2 — wrong milestone tag (proved failable)

Same scratch clone, restored to the correct known member, then the materialize wrapper's tag was
repointed:
```
return withDocsAtClose('V120', (tmpDir, writtenPaths) => {   // was 'V121'
```
```
node scripts/validation/v1.21-milestone-audit.mjs --verbose | grep -E "C17|Summary"
```
→
```
[17/16] C17: EEE document contract ... FAIL -- C17 FAIL: known-member guard failed -- .../docs/recipes/05-enterprise-update-plan.md absent from materialized V121 corpus
Summary: 15 passed, 1 failed, 0 skipped
```
The known-member assertion (still checking for `05-enterprise-update-plan.md`, the V121-only
member) correctly fails when the materialize wrapper is pointed at V120's docs tree, since that
file does not exist at V120. Reverted from the backup; re-confirmed green (`16 passed, 0 failed, 0
skipped`). Both negative probes and the reverted-green re-run were then removed from the scratch
clone before it was discarded — a guard that has never failed is decorative, and both have now
failed and been proven to fail for the right reason.

### Ordering backstop

```
node scripts/validation/v1.21-milestone-audit.mjs --verbose > r1
node scripts/validation/v1.21-milestone-audit.mjs --verbose > r2
diff -q r1 r2
```
→ **two runs byte-identical.** No check's verdict depends on an unstable enumeration order between
consecutive invocations.

### Post-task validator confirmation

```
node scripts/validation/check-phase-54.mjs | tail -1
```
→ `Summary: 32 passed, 0 failed, 0 skipped`.

### Delta ledger (D-65)

Every figure measured in this task and in §12 reproduces its corresponding CONTEXT/RESEARCH-carried
figure exactly — **delta 0** in all cases: the V121/V120 docs path counts (307/296, D-20), the known
member's presence/absence split, the 33-file sidecar-pinned population (D-18), and the converted
harness's 16/0/0 triple against the unconverted baseline. No figure in this task diverged from its
carried value.

## §14 — Plan 159-05 Task 1: re-measure attribution boundaries, prove every needle failable

### Boundary SHAs re-read at execution time (no delta against D-32)

Command: `git log -1 --format='%H %ai %s' <sha>` for each of the five boundaries plus HEAD.

| Phase window | SHA | Commit subject | Date |
|---|---|---|---|
| 154 start | `8de413aae65387a6b381fd34f70f65128592f65` | docs(154-01): complete preserve-corpus, argv-ify verify2, gate baseline plan | 2026-09-01 |
| 154 end / 155 start | `ce9b0b73d3d999bf91b0716cf8c34bedaa271149` | docs(phase-154): add security threat verification | 2026-09-03 |
| 155 end / 156 start | `2a46d32af802c631cc97b007a7062b4810873375` | docs(phase-155): add security threat verification | 2026-09-03 |
| 156 end / 157 start | `bb22f89a95e2984dd2c5f50bf8d27bc9efb1ce28` | fix(156): restore two falsified HP Sure Admin citations (CR-01) | 2026-09-05 |
| 157 end / 158 start | `937d0a1f335c37182482dcf77173d98e00a018bf` | docs(phase-157): add security threat verification | 2026-09-06 |

**Delta: 0.** All five SHAs match D-32 exactly, character for character.

### Two-part attribution proof — corpus-wide zero candidates

Command shape: `for c in <5 boundaries> HEAD; do printf "%s " "$c"; git grep -c "TOKEN" $c -- docs 2>/dev/null | awk -F: '{s+=$NF} END{print s+0}'; done`

| Token | 8de413aa | ce9b0b73 | 2a46d32a | bb22f89a | 937d0a1f | HEAD | Transition window | Stable after | Owning phase |
|---|---|---|---|---|---|---|---|---|---|
| `i.e.` | 1 | 0 | 0 | 0 | 0 | 0 | inside 154 | yes | 154 |
| `cf.` | 1 | 0 | 0 | 0 | 0 | 0 | inside 154 | yes | 154 |
| `sign into` (literal, case-sensitive) | 7 | 1 | 1 | 0 | 0 | 0 | inside 156 | yes | 156 |

**Matcher note (D-31 discipline):** the case-INsensitive reading of "sign into" was tried first and
rejected — it reports 8/2/2/1/1/1 (never reaching 0 at HEAD), because a different, still-live phrase
collides under case-folding. Only the literal case-sensitive substring satisfies both halves of the
attribution proof, so that is the only form pinned in `check-phase-156.mjs`.

Both halves hold for all three tokens: the transition lands strictly inside the owning phase's window
and the count stays 0 at every later boundary through HEAD. Matches D-33 (154) and D-35 (156) exactly
— delta 0.

### Documentation corpus floor

`git ls-files 'docs/*.md' | wc -l` → **294** files. Above the 250-file floor. Delta against D-31's
carried figure of 294: **0**.

### Per-file counts re-measured live

Commands: `grep -Fo "e.g." <file> | wc -l` (154, literal); `grep -Fo "administrator" <file> | wc -l`
(156, literal, the pinned matcher); `grep -Foi "administrator" <file> | wc -l` (156, case-insensitive
reading, recorded not pinned); `grep -ow "administrator" <file> | wc -l` (156, word-bounded reading,
recorded not pinned).

| File | 154 `e.g.` | 156 `administrator` literal (pinned) | 156 case-insensitive (recorded only) | 156 word-bounded (recorded only) |
|---|---|---|---|---|
| `docs/admin-setup-android/09-aosp-realwear.md` | 2 | — | — | — |
| `docs/admin-setup-android/10-aosp-zebra.md` | 1 | — | — | — |
| `docs/admin-setup-android/11-aosp-pico.md` | 1 | — | — | — |
| `docs/admin-setup-android/12-aosp-htc-vive-focus.md` | 1 | — | — | — |
| `docs/admin-setup-android/13-aosp-meta-quest.md` | 1 | — | — | — |
| `docs/reference/android-capability-matrix.md` | 1 | — | — | — |
| `docs/operations/firmware-bios/01-windows-dfci.md` | — | 10 | 10 | 8 |
| `docs/operations/firmware-bios/02-dell-bios-configuration.md` | — | 2 | 5 | 2 |
| `docs/recipes/05-enterprise-update-plan.md` | — | 15 | 35 | 11 |
| `docs/recipes/06-walk-up-avd-kiosk-autologon.md` | — | 10 | 13 | 10 |

All ten pinned figures match D-33/D-35 exactly. **Delta: 0.** The leaf pins only the literal
case-sensitive column; the other two columns are recorded here so a future reader can tell which
matcher produced the pinned number and cannot silently swap one for another.

### 155 needles re-measured live

- Provenance heading: `## Asset Provenance` occurs exactly 1 time in
  `docs/recipes/06-walk-up-avd-kiosk-autologon.md`.
- Seven content substrings all present (`grep -Fc -- "SUBSTRING" <file>`; the `-2016281112` needle
  required `--` before the pattern on the command line since it begins with a hyphen — the leaf's
  own `String.prototype.includes` call has no such trap).
- Registry: `docs/_registry/RE-index.md` carries exactly one row matching `| RE-237 |`, containing
  both the recipe path and `Approved`.
- Hub wiring: `docs/index.md`, `docs/recipes/01-shared-windows-avd-client.md`,
  `docs/recipes/03-windows-11-multi-app-kiosk.md`, `docs/reference/licensing-matrix.md` each contain
  the recipe's filename (count 1 each); `licensing-matrix.md` contains
  `no Windows Subscription Activation`.
- Assets re-hashed live via `git hash-object`:
  - `Remove-KioskOemBloat.ps1` (packaged vs. remediation) → `d7287e764fb2b7bd4e3f02097a9a55e1390c5991`
    both sides, identical. Delta against D-34's `d7287e76`: **0**.
  - `Remove-KioskRunTasks.ps1` (packaged vs. remediation) → `d79c9780c4df51ed493ea084783dc8365278b1c2`
    both sides, identical. Delta against D-34's `d79c9780`: **0**.
  - Both contain `SupportsShouldProcess`.
- `scripts/validation/check-phase-135.mjs` contains both retirement content needles as source
  substrings, and itself runs `7 PASS, 0 FAIL, 0 SKIPPED`.

### 156 script-tree artifacts re-measured live

- `scripts/docs-style/_JUDGE-VERDICTS-batch10.json`: raw bytes 3590, normalized (CRLF to LF) bytes
  3590 (the live checkout already uses LF, no conversion needed), containing 17 newlines. A
  hypothetical CRLF checkout would read 3590 + 17 = **3607** bytes. Delta against D-35's 3590/3607:
  **0**. Contains the sibling-identification phrase.
- `scripts/docs-style/subs-batch10.tsv`: 3 non-comment, non-blank data rows.
- `scripts/docs-style/subs-emdash-batch10.tsv`: 3 non-comment, non-blank data rows.
- `scripts/docs-style/_DISPOSITIONS-batch10.tsv`: **0 data rows** (header comments only) — see the
  correction below.

### Live-value correction against D-35 (D-65 measurement discipline)

D-35 states all three batch-10 tables carry "at least 1 data row." Re-measurement found
`_DISPOSITIONS-batch10.tsv` genuinely carries 0 data rows — its own header comment explains this is
correct: it is "currently empty of data rows because there is nothing to disposition yet," created
as the sibling `156-04-SUMMARY.md`'s dispositions path resolves to, with rows appended only as
future findings surface. Pinning "at least 1 data row" against a file that is correctly empty would
make `check-phase-156.mjs` permanently red for a reason unrelated to any regression. Resolution: the
leaf pins presence only for `_DISPOSITIONS-batch10.tsv`, and keeps the "at least 1 data row" needle
for the two tables that genuinely carry rows. This is the one figure in this plan diverging from its
CONTEXT-carried value; recorded here per D-65 and in `159-05-SUMMARY.md`.

### Failability proofs (scratch-copy perturbations)

All perturbations were made against copies under a scratchpad temp directory, never the working
tree, and discarded immediately after confirming the FAIL condition.

| Needle mechanism | Perturbation | Before | After | Confirmed failable |
|---|---|---|---|---|
| corpus-wide zero (`i.e.`) | appended a line containing `i.e.` to a docs copy | 0 | 1 | yes |
| corpus-wide zero (`cf.`) | appended a line containing `cf.` to a docs copy | 0 | 1 | yes |
| corpus-wide zero (`sign into`, case-sensitive) | appended a line containing `sign into` to a docs copy | 0 | 1 | yes |
| per-file exact count (`e.g.`) | injected extra `e.g.` markers into a file copy | 1 | 227 | yes |
| per-file exact count (`administrator`) | replaced every occurrence with `somethingelse` in a copy | 2 | 0 | yes |
| presence (tool file) | deleted a copy of `verify-meaning.py` | present | absent | yes |
| content substring (`## Asset Provenance`) | renamed the heading in a recipe copy | 1 | 0 | yes |
| registry row | mutated `RE-237` to `RE-999` in a copy | 1 match | 0 matches | yes |
| byte-identity pair | appended a trailing line to one copy of `Remove-KioskOemBloat.ps1` | identical hashes | hashes differ | yes |
| normalized byte length | appended one byte to a copy of `_JUDGE-VERDICTS-batch10.json` | 3590 | 3591 | yes |

Every needle mechanism used across the three leaves is proven failable by at least one
representative perturbation of its type; every needle instance built on a proven-failable mechanism
inherits that proof, since the check logic is identical per mechanism and only the pinned literal
differs. No needle that entered a leaf is decorative.

### Not-pinnable list (items rejected as not pinnable, with reasons)

**154:** `e.g.` corpus-wide totals (not driven to a stable count by this phase); the bare tokens
`Admins` and `via`; the phrase `sign in to`; `_PINNED-HEADINGS.txt` and `_CONTENT-PINS.txt` (last
written by Phase 157, not 154); any invocation of `scripts/docs-style/verify2.py` (no `--help` flag;
every argv exits 0 after roughly 25 seconds; its report tokens are not stably pinnable);
`docs/_templates/*` counts (templates are explicitly out of the landing's scope).

**155:** the `[PILOT]` label (quote-only, no count — it recurs unpredictably as the recipe is
field-amended); the recipe's line count (D-09/D-10 precedent: a line-count equality pin makes any
future prose correction an immediate apex failure); the two RE-222/RE-224 prose corrections
(already guarded by five existing checks in the `check-phase-135.mjs` family — re-guarding here
would be redundant, not additive).

**156:** the non-batch-10 `_JUDGE-VERDICTS.json` file (single commit, predates this milestone
entirely — not phase 156's deliverable); bare `admin` word counts (too broad, collides with
unrelated prose); em-dash counts (a style-mechanical byproduct, not a phase-156 deliverable in its
own right); the `"baseline"` SHA field inside any verdict file (a commit-SHA read, banned outright by
D-31).

### Attribution supersession

Per D-32: 158 D-35's needle list assigned to `check-phase-158` several deliverables Phase 157 (not
158) actually made — the hub-phrase fix, the Linux update-delivery link, the Autopatch figures, the
D-headings, and the glossary entries. D-35's FORM (the needle shapes themselves) is adopted
unchanged; its ATTRIBUTION is superseded — those five deliverables belong to Phase 157's own leaf
(plan 159-07), not Phase 158's. This supersession is recorded here per D-32's own instruction and
belongs in `v1.22-MILESTONE-AUDIT.md`'s Corrections of Record section (D-61), to be written at the
milestone-close step — this plan only records the pointer.

## §15 — Plan 159-05 Task 3: write the style-extension leaf, close the three-leaf evidence

### check-phase-156.mjs standalone run

`node scripts/validation/check-phase-156.mjs` → `10 PASS, 0 FAIL, 0 SKIPPED`.

### Three-leaf confirmation together

```
for f in 154 155 156; do node scripts/validation/check-phase-$f.mjs | tail -1; done
```
→ `154: Result: 13 PASS, 0 FAIL, 0 SKIPPED`, `155: Result: 10 PASS, 0 FAIL, 0 SKIPPED`,
`156: Result: 10 PASS, 0 FAIL, 0 SKIPPED`.

### Guard commands

- `grep -cE "execFileSync|spawnSync" scripts/validation/check-phase-156.mjs` → 0 (no spawn).
- `grep -vE '^\s*(//|\*|/\*)' scripts/validation/check-phase-154.mjs scripts/validation/check-phase-155.mjs scripts/validation/check-phase-156.mjs | grep -cE "\.planning/|[0-9a-f]{7,40}:|:[0-9]+\b"` → 0 across all three leaves (no planning-tree scope, no commit SHA, no line number).
- `grep -c 'files.length < 250' scripts/validation/check-phase-154.mjs` → 1; same grep against
  `check-phase-156.mjs` → 1. Both corpus-wide-negative leaves carry the floor literal.
- `node scripts/validation/check-phase-135.mjs | tail -1` → `Result: 7 PASS, 0 FAIL, 0 SKIPPED` (the
  predecessor recipe validator the 155 leaf pins content inside is itself green).
- `node scripts/validation/check-phase-54.mjs | tail -1` → `Summary: 32 passed, 0 failed, 0 skipped`
  (unaffected by the new leaves — they are standalone chain members, not yet apex-wired).
- `git status --porcelain -- docs/` → empty after every commit this plan made.

### Summary of all three leaves' triples

| Leaf | Checks | PASS | FAIL | SKIPPED | Spawns |
|---|---|---|---|---|---|
| `check-phase-154.mjs` | 13 | 13 | 0 | 0 | 1 (`verify-meaning.py --self-test`, argument-array form, paired with a fail-loud presence assertion) |
| `check-phase-155.mjs` | 10 | 10 | 0 | 0 | 0 |
| `check-phase-156.mjs` | 10 | 10 | 0 | 0 | 0 |

Exactly one spawn across the three leaves in this plan, matching D-39's ceiling for these members.

## §16 — Plan 159-06 Task 1: measure the 157 and 158 needle candidates, record every rejection

### Heading needles — full text vs. colon-prefix vs. bare form

Command: `grep -Fc "TEXT" docs/_standards/EEE-SOP-standard.md` per full heading;
`grep -c "^### D-0N:" file` per colon-prefix; `grep -nE "^### D-0[1-5][^:]" file` for the bare form.

| Full heading text (pinned) | Count |
|---|---|
| `### D-01: The non-gate rule` | 1 |
| `### D-02: The mandate-promotion hazard` | 1 |
| `### D-03: The passive-to-active hazard` | 1 |
| `### D-04: Corpus scope` | 1 |
| `### D-05: Tooling pairing and its risks` | 1 |

| Colon-prefix form (`### D-0N:`, not pinned) | Count |
|---|---|
| D-01 | 3 |
| D-02 | 3 |
| D-03 | 3 |
| D-04 | 3 |
| D-05 | 2 |

Matches D-36's carried figures exactly (delta 0). Combined colon-prefix-or-bare grep
(`grep -c '^### D-0[1-5]' docs/_standards/EEE-SOP-standard.md`) returns **15** across the whole
file — three unrelated D-series share the "### D-0N:" shape (the EEE structural sections, the C17
assertion-shape sections, and this prose-style section). The bare form additionally collides with
`### D-02 Edge-case rulings` at line 134, an entirely unrelated heading. **Neither the colon-prefix
form nor the bare form is a needle** for either reason; only the five full heading texts are
pinnable, each confirmed at exactly one occurrence. The task's own `<verify>` block runs this same
combined grep as a demonstration command — its printed value of 15 (greater than 5) is the proof
artifact this section records, not a defect in `check-phase-157.mjs` (which never pins the
colon-prefix or bare form at all).

### Corpus-wide zeros with the floor (157)

Command shape: `for c in <5 boundaries> HEAD; do printf "%s " "$c"; git grep -c "TOKEN" $c -- docs 2>/dev/null | awk -F: '{s+=$NF} END{print s+0}'; done`; the third token uses a
line-level predicate command instead: `grep -rn "2026-06-19" docs/ | grep -v "review_by" | wc -l`.

| Token | 8de413aa | ce9b0b73 | 2a46d32a | bb22f89a | 937d0a1f | HEAD | Transition window | Stable after | Owning phase |
|---|---|---|---|---|---|---|---|---|---|
| `300 groups` | 1 | 1 | 1 | 1 | 0 | 0 | inside 157 | yes | 157 |
| `4-platform comparison hub for update enforcement` | 1 | 1 | 1 | 1 | 0 | 0 | inside 157, correction at `18f378aa` | yes | 157 |
| lines with `2026-06-19` sans `review_by` | 3 | 3 | 3 | 3 | 0 | 0 | inside 157 | yes | 157 |

All three land inside 157's own window (`bb22f89a` -> `937d0a1f`) and stay at 0 through HEAD.
Matches D-36 exactly — delta 0. Corpus floor: `git ls-files 'docs/*.md' | wc -l` -> **294** files
at HEAD, above the 250-file floor.

### Per-file counts, confined to 157's own diff

`git diff --name-only bb22f89a 937d0a1f -- docs/` was computed fresh and confirmed to contain
`docs/_glossary.md`, `docs/operations/patch-management/00-overview.md`,
`docs/operations/patch-management/01-windows-wufb-rings.md`, and `docs/operations/00-index.md` —
the four files carrying the eight per-file needles below. Matcher: literal, case-sensitive,
substring (`grep -Fc "NEEDLE" file` / `c.split(needle).length - 1`).

| File | Needle | Count |
|---|---|---|
| `docs/_glossary.md` | `15 deployment rings` | 1 |
| `docs/_glossary.md` | `300 Autopatch groups` | 1 |
| `docs/operations/patch-management/00-overview.md` | `15 deployment rings` | 1 |
| `docs/operations/patch-management/00-overview.md` | `300 Autopatch groups` | 1 |
| `docs/operations/patch-management/00-overview.md` | `updated 2025-06-17` | 1 |
| `docs/operations/patch-management/00-overview.md` | `[Linux Update Delivery](05-linux-update-delivery.md)` | 4 |
| `docs/operations/patch-management/01-windows-wufb-rings.md` | `updated 2025-06-17` | 2 |
| `docs/operations/00-index.md` | `5-platform comparison hub for update enforcement` | 1 |

All eight match D-36 exactly — delta 0.

**Dropped as not 157's (D-36):** `docs/operations/07-windows-autopatch.md` and
`docs/recipes/05-enterprise-update-plan.md` — neither file appears in the diff computed above, so
neither is 157's needle. Both drops are confirmed by the same diff listing, not by CONTEXT's
say-so.

### 158 candidates measured live

Command shape: same boundary-series loop, applied to 158's window (`937d0a1f` -> HEAD).

| Candidate | 937d0a1f | HEAD | Transition window | Owning phase |
|---|---|---|---|---|
| `using apt and unattended-upgrades` in `docs/index.md` | 0 | 1 | inside 158 | 158 |
| `using apt and unattended-upgrades` in `docs/operations/00-index.md` | 0 | 1 | inside 158 | 158 |
| `#reboot-handling` in `docs/_glossary-linux.md` | 0 | 1 | inside 158 | 158 |
| `governs the whole tracked documentation corpus the mechanical gate scans` in the standard | 0 | 1 | inside 158 | 158 |
| `corrected D-05's falsified point-in-time identity claim` in the standard | 0 | 1 | inside 158 | 158 |

All five land inside 158's own window and match D-37 exactly — delta 0. `git diff --name-only
937d0a1f HEAD -- docs/` confirms all four files above (`docs/index.md`,
`docs/operations/00-index.md`, `docs/_glossary-linux.md`, `docs/_standards/EEE-SOP-standard.md`)
are inside that diff.

Scripts and artifacts confirmed present and non-empty: `scripts/docs-style/audit-claimed-fixes.mjs`
(559 lines); `scripts/docs-style/_DISPOSITIONS-158.tsv` (9 data rows);
`scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv` (120 data rows);
`scripts/docs-style/_JUDGE-VERDICTS-158.json` (presence only); `scripts/docs-style/158-FIX-AUDIT.json`
(presence only — carries branch-only SHAs that must never become a needle).

### 158 rejections with reasons (D-37)

- **Any em-dash count:** a large population of spaced em dashes remains inside protected spans
  (`grep -rl " — " docs/` finds 283 files carrying at least one), so no stable count survives —
  the population is a style-mechanical byproduct, not a 158 deliverable in its own right.
- **The bare platform-package phrase (`via apt`):** its one remaining occurrence, at
  `docs/reference/linux-capability-matrix.md:112`, sits inside a technical-accuracy table cell
  describing the actual installation mechanism and is citation-blocked from a style rewrite.
- **Archive, manifest, runner and pin totals:** all are build-run artifacts recomputed on every
  run, not corpus state — pinning any of them would pin a byproduct of the CI environment, not a
  documentation deliverable.

### Gate timing (D-38)

| Run | Command | Wall time |
|---|---|---|
| Full run | `python3 scripts/validation/check-prose-style.py` | **79.3s** (measured `time` output: `real 1m19.343s`) |
| Self-test | `python3 scripts/validation/check-prose-style.py --self-test` | **0.37s** (measured `time` output: `real 0m0.370s`) |
| `audit-claimed-fixes.mjs --self-test` | `node scripts/docs-style/audit-claimed-fixes.mjs --self-test` | **1.588s** |

D-38 carried a range of 63-76s for the full run; the live re-measurement (79.3s) is slightly above
that range. Per D-65 measurement discipline, the live value wins: the accepted per-apex cost is
stated here as **~79s**, not the carried ~76s figure. The self-test and audit-claimed-fixes
self-test times match D-38/D-37 closely (both sub-2-second) with no material delta.

### Failability proofs (scratch-copy perturbations, new mechanisms only)

The corpus-wide-zero, per-file-exact-count, and self-test-spawn mechanisms were already proven
failable in §14 (159-05 Task 1) and are inherited unchanged by this plan's leaves — the check logic
is identical per mechanism, only the pinned literal differs. This plan introduces two mechanisms
not covered by §14, plus one already-covered mechanism re-confirmed for its new literal:

| Needle mechanism | Perturbation | Before | After | Confirmed failable |
|---|---|---|---|---|
| exact heading count (`### D-01: The non-gate rule`) | renamed the heading text in a scratch copy | 1 | 0 | yes |
| line-level predicate (date without review key) | appended a line containing `2026-06-19` without `review_by` to a scratch copy | 0 | 1 | yes |
| corpus-wide zero (`300 groups`) | appended a line containing `300 groups` to a scratch copy | 0 | 1 | yes |
| per-file exact count (`300 Autopatch groups`) | mutated the literal to `999 Autopatch groups` in a scratch copy | 1 | 0 | yes |
| full-gate spawn, exit-0-required | pointed a scratch copy of `check-phase-157.mjs` at a fake tool exiting 1 | PASS | FAIL (`corpus violates the prose-style gate`) | yes |
| tool-presence vs. runtime-absence distinction | deleted the tool from a scratch copy's `scripts/validation/` tree | 1 hard FAIL + 2 graceful SKIP (overall FAIL) | same | yes — confirms absence is never laundered into a pass |

### Not-pinnable list (157, beyond the heading forms above)

- The colon-prefix and bare heading forms — see the heading-needles section above.
- Any per-file count outside 157's own diff (`07-windows-autopatch.md`,
  `recipes/05-enterprise-update-plan.md`) — see the drop record above.

### Not-pinnable list (158)

- Any em-dash count, the bare `via apt` phrase, and any archive/manifest/runner/pin total — see
  the 158 rejections section above.

Every needle carried into `check-phase-157.mjs` and `check-phase-158.mjs` is attributed to the
correct phase's own window, confined to that phase's own diff where applicable, and proven
failable by a mechanism-level perturbation. 157 and 158 candidate measurement recorded.
