# Phase 159 Plan 01 — Evidence Log

Accumulated command-sourced evidence for Plan 159-01 (Land the v1.22 milestone on `master`). Each
section corresponds to one task; every figure below is re-measured at execution time per D-65 — the
live value wins over any figure carried from `159-CONTEXT.md` or `159-RESEARCH.md`, with the delta
against the carried figure written down explicitly.

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
