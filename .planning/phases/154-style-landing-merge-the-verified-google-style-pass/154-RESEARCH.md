# Phase 154: STYLE Landing — Merge the Verified Google-Style Pass - Research

**Researched:** 2026-08-31
**Domain:** Cross-repository git merge mechanics (`git fetch` + `git apply --3way`), Python
mechanical-sweep/verification tooling, Node.js structural-gate validators. Not a greenfield
technology-selection phase — every tool this phase uses already exists in-repo.
**Confidence:** HIGH — every numeric claim in this file was produced by a command run in this
session, shown inline, either directly against `D:\claude\Autopilot` (branch `master`, HEAD
`033acd54`) or against a disposable `git clone --shared` of it plus the scratch repo as a remote.
Neither `D:\claude\Autopilot` nor `D:\claude\docs-google-style-test` was modified by this research
session; all throwaway clones and patch files were deleted after use.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

This phase's CONTEXT.md carries 34 ratified decisions (D-01 through D-34), produced by
`/gsd-discuss-phase` + `/grill-me` + `/adversarial-review` (4 parallel Finders → Adversary →
Referee; 94 raw findings → 73 deduplicated → 72 confirmed, 1 clean disproof, 9 Adversary rulings
overturned by the Referee). **Do not re-litigate these.** Full text is authoritative in
`154-CONTEXT.md`; this research re-verifies the load-bearing numeric and mechanical claims inside
them (see `## Re-Verification of CONTEXT.md's [MEASURED] Claims` below) rather than reproducing
all 34 verbatim. Group summary:

- **Area A — Merge mechanics (D-01..D-08):** `git fetch` the scratch repo as a remote, THEN
  `git apply --3way --directory=docs --exclude='docs/_PASSIVE-REPORT.md'` against the
  `c97d322..e71f862` diff. Without the fetch, the apply lands **zero** files (atomic rollback on
  the android blob-absence refusal). The successful apply still **exits 1** (conflicts exist) —
  never chain with `&&`. The scratch repo itself is preserved via `git bundle` + a permanent
  `refs/scratch/*` fetch, pinned in commit C1's message body.
- **Area B — The un-restored sample rewrites (D-09..D-14):** `c97d322` is NOT a pristine copy of
  `docs/@534073f4` — exactly two files diverge (android, l1-runbook). Do not hand-rebase; the
  3-way merge (base `c97d322`, theirs `e71f862`, ours live `docs/`) resolves the android file
  automatically to 6 ins / 2 del, and the l1-runbook file needs **no edit at all** (its
  `c97d322..e71f862` diff is empty).
- **Area C — The drifted-hunk style gap (D-15..D-17):** Phase 154 owns exactly one sweep edit
  (`EEE-SOP-standard.md:554`, `admin decision points`) plus the `admin`→`administrator`
  applications inside the two non-android conflict resolutions. SC#2 and **VERIFY-01** are both
  amended to read "0 wanted edits over the landed set," with the batch-10 residual (measured 9 at
  HEAD, staleness-flagged) explicitly inherited by Phase 156.
- **Area D — Baseline, requirements and landing shape (D-18..D-34):** Landing is staged in the
  **live main working tree** on branch `v1.22/154-style-landing`, clean-tree precondition, apply →
  resolve → gate → commit inside **one tool invocation** (two `Stop` hooks in
  `.claude/settings.local.json` make a second invocation unsafe — see Landmines). Four commits
  (C1 clean applies, C2 the two non-android resolutions, C3 the android 3-way + resolution, C4 the
  one sweep edit), **every conflict resolved before any commit exists** (a pathspec-scoped commit
  with `UU` paths present commits the markers). A conflict-marker grep gates every commit. The
  baseline artifact is `154-GATE-BASELINE.json` in this phase directory (`gate_baseline` +
  `landing` keys, Claude's discretion on nesting). `.planning/REQUIREMENTS.md` and
  `.planning/ROADMAP.md` are amended in-phase via annotate-and-supersede (Phase 143 D-29
  precedent), gated by `check-phase-54.mjs` (`V-54-27`).

### Claude's Discretion

- Exact JSON key names/nesting inside `154-GATE-BASELINE.json`, provided `gate_baseline` and
  `landing` remain separable and Phase 156 can diff the former alone.
- Commit message wording for C1–C4, provided C1's body carries both scratch SHAs
  (`c97d322`, `e71f862`).
- Whether the `verify2.py` two-line edit ships as its own commit or rides with the baseline
  capture, provided it is separable from the 277-file landing commit.

### Deferred Ideas (OUT OF SCOPE for this phase)

- `.gitattributes` `* text=auto eol=lf` line-ending hygiene → Phase 159.
- Full cross-repo geometry rework of `verify2.py` / `pins2.py` beyond D-31's two-line minimum →
  Phase 156.
- `EEE-SOP-standard.md:578` and `:649` stale provenance citations → Phase 157.
- `-G` rather than `-S` pickaxe discipline for equal-count string swaps → Phase 158.
- Archival-path resolution for `154-GATE-BASELINE.json` after `.planning/phases/` relocates →
  Phases 156 and 158.
- Third copy of the runbook H1 at `scripts/pipeline/test-fixtures/01-device-not-registered.md:11`
  → Phase 157.
- `D:\claude\c17-sandbox` (284 dirty entries at the fork point) → Phase 157, or discard.
- Running the fixed `subs-admin-batch9.tsv` over the HP file → Phase 156 (batch-10 application;
  the row fix itself is Phase 154's).

</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description (verbatim from REQUIREMENTS.md) | Research Support |
|----|---|---|
| STYLE-01 | Scratch corpus merged into `docs/` as a real merge against post-fork drift. Fork point `534073f4`; corrected pristine baseline `c97d322` (not `6010dd5`). Drift figure must be re-measured at plan time. | `## Live Drift Re-measurement` gives the CURRENT number (23 / 4,324 / 12 — already amended by D-12, confirmed unchanged since context-gather). `## The Merge Mechanism` gives the exact verified command sequence and its measured output shape (277 M + 3 UU). |
| STYLE-03 | Every hand-adjudicated revert carries a `KEEP_LINE` entry; blanket `subs-*.tsv` rows that split a real label pair are deleted, not worked around. | `## Tooling Inventory` confirms `KEEP_LINE` currently has 7 alternates (`sweep3.py:47-49`) and that `subs-admin-batch9.tsv` row 26 currently lacks the `(?<!Sure )` exemption D-23 requires — confirmed 0 corpus damage today (`Sure Administrator` occurs 0 times in `docs/`, HP file confirmed live at `docs/operations/firmware-bios/03-hp-bios-configuration.md` still reading `Sure Admin`). **No deterministic proof for the KEEP_LINE-per-revert half** — see Requirement Decomposition. |
| STYLE-04 | Option 1 preserved: every Google rule class adopted except sentence-case headings. Every style invocation passes `--no-headings`. | `## Tooling Inventory` confirms `--no-headings` is a `check.py`-only flag (`.claude/skills/google-style/check.py`) that `sweep3.py` never parses (`sweep3.py:245-247` recognizes only `--apply`/`--subs`) — discharge by heading census, not by flag-passing. Deterministic: `## Validation Architecture`. |
| STYLE-05 | Em-dash canon survives the merge unbroken (tight is the canon's output, not a violation). | `## Tooling Inventory` confirms `do_em = False` hardcoded at `sweep3.py:212` (the rule never runs in any invocation) and `EMDASH.subn("—", seg)` at `:89` substitutes spaced→tight. Deterministic: assert the flag unchanged. |
| STYLE-06 | Every `sweep3.py` invocation passes `_CONTENT-PINS.txt` (562 pins), never `_EMDASH-PINS.txt` (8 pins). | **MEASURED THIS SESSION:** `_CONTENT-PINS.txt` = 562 lines, `_EMDASH-PINS.txt` = 8 lines. `sweep3.py docs _CONTENT-PINS.txt` (dry run) = **969** wanted edits at current HEAD; the same run against `_EMDASH-PINS.txt` = **1,000** — exactly reproduces STYLE-06's and D-27's "969/1000" pair. Deterministic: `## Validation Architecture`. |
| VERIFY-01 | Deterministic slice reports zero: `verify-meaning.py` exits 0 against `c97d322` with `_DISPOSITIONS.tsv`; `sweep3.py` idempotent at 0 edits against `_CONTENT-PINS.txt`; `verify-meaning.py --self-test` prints 10/10. | **MEASURED THIS SESSION:** `verify-meaning.py --self-test` = **PASS: 10/10** at current HEAD. `c97d322` does NOT resolve in the main repo (confirmed: `git cat-file -t c97d322` → `fatal: Not a valid object name`) — the deterministic-slice-against-`c97d322` half can only run inside the scratch repo per D-28, not in `docs/` post-merge. Post-merge "0 edits" is the amended target (D-16); pre-merge is 969, not 0 — this is expected and correct, the requirement's "0" applies post-landing. |

</phase_requirements>

## Summary

Phase 154 is a measurement-and-merge phase, not a build phase. Every tool it needs
(`sweep3.py`, `verify-meaning.py`, `verify2.py`, `pins2.py`, `c17-eee-contract.mjs`,
`check-phase-153.mjs`, `check-nav-hub-links.mjs`) already exists in-repo and was exercised
read-only in this session. The single highest-risk mechanical step is the cross-repo
`git fetch` + `git apply --3way --directory=docs` sequence CONTEXT.md's D-01 specifies — this
research **independently reproduced it end to end in a disposable clone** and got the exact
predicted shape: 281 files in the patch, 277 clean applies + 3 conflicts (`UU`), exit code 1,
conflict markers at the exact three files/lines D-05 names. The fork-point drift figure
(23 files / 4,324 insertions / 12 deletions) is unchanged since CONTEXT.md was written — no new
commits landed on `docs/` since context-gathering. Two numeric divergences were found and are
flagged below: the scratch corpus's CRLF/LF split measured here (282 CRLF / 3 LF working-tree
files; 285/285 LF-only committed blobs) does not match D-04's stated "87 CRLF / 207 LF," and the
stray root files `e1`/`e2`/`ee` that D-34 directs be deleted do not currently exist anywhere in
the repository (not tracked, not on disk, not in history) — D-34's housekeeping commit is a likely
no-op that the executor should verify-then-skip rather than treat as a hard requirement.

**Primary recommendation:** Follow D-01 through D-34 exactly as ratified; this research confirms
their mechanics reproduce today. Do not re-derive the merge strategy — re-run the verification
commands below at execution time (fresh timestamps, since the repo takes commits between
sessions) and proceed.

## Architectural Responsibility Map

This phase touches no application-tier architecture — it is entirely git/tooling mechanics over a
documentation corpus. The nearest analogue:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Cross-repo content merge | Git object database / working tree | — | `git fetch` + `git apply --3way` operate at the plumbing layer; no application code involved. |
| Mechanical style conformance | Python CLI tooling (`scripts/docs-style/`) | — | `sweep3.py`/`verify-meaning.py` run standalone against the filesystem, no service boundary. |
| Structural/link validation | Node.js CLI validators (`scripts/validation/`) | — | `c17-eee-contract.mjs`, `check-phase-153.mjs`, `check-nav-hub-links.mjs` run standalone, no runtime dependency on the merge tooling. |
| Corpus content (`docs/`) | Filesystem / git-tracked Markdown | — | Not served by any running process in this phase. |

## Re-Verification of CONTEXT.md's [MEASURED] Claims

Every row below is `MEASURED` this session, with the command shown. Rows with no divergence are
terse confirmations; rows with a divergence get their own callout.

### 1. Live drift re-measurement

```
$ git branch --show-current
master
$ git rev-parse HEAD
033acd546bdf9b03c2c28302a00154bf65f808d7
$ git diff --shortstat 534073f4..HEAD -- docs/
23 files changed, 4324 insertions(+), 12 deletions(-)
$ git merge-base --is-ancestor 534073f4 HEAD ; echo $?
0   (534073f4 IS an ancestor)
$ git merge-base --is-ancestor c97d322 HEAD ; echo $?
fatal: Not a valid object name c97d322   (exit 128 -- c97d322 unknown to this repo until fetched)
```

**Result: MATCHES CONTEXT.md's D-12-corrected figure exactly (23 / 4,324 / 12), NOT the stale
22/4,032/12 that REQUIREMENTS.md STYLE-01 still quotes verbatim.** Zero new `docs/` commits landed
between context-gathering (2026-08-31 20:01 UTC per STATE.md) and this research pass. The
`git log --oneline 534073f4..HEAD -- docs/` list (44 commits, oldest first `7d265323`, newest
`68c747a9` "import Claude Desktop walk-up AVD kiosk work UNMODIFIED as provenance baseline") is
unchanged. `git diff --name-status` confirms the file set: 13 `M` (modified) + 10 `A` (added,
including the 9-file STYLE-02 batch-10 set plus RE-237's `06-walk-up-avd-kiosk-autologon.md`).
**Executor action: re-run `git diff --shortstat 534073f4..HEAD -- docs/` again immediately before
landing — this number is a moving target across sessions, per the phase's own hard constraint.**

### 2. The scratch corpus

```
$ cd D:/claude/docs-google-style-test && git rev-parse --is-inside-work-tree
true
$ git log -1 --oneline
e71f862 fix(judge): apply all 46 verdicts from the modal-drop judge pass
$ git cat-file -t c97d322
commit
$ git remote -v
(empty -- no remote)
$ find . -name "*.md" | wc -l
285
$ git ls-tree -r --name-only HEAD | wc -l
300
$ git log --oneline | wc -l
29
```

Confirmed: standalone git repo, 29 commits, unrelated history to the Autopilot repo (root-relative
paths, no `docs/` prefix — `end-user-guides/...` not `docs/end-user-guides/...`), no remote (the
only copy of the styled corpus — D-08's bundle-preservation step is not optional). 285 `.md` files,
300 total tracked objects (the 15-file delta is `_registry/`, `_standards/`, `_templates/` non-.md
assets plus `_PINNED-HEADINGS.txt` and `_PASSIVE-REPORT.md`).

**Relationship to the fork point:** `git merge-base scratch/master HEAD` (run from a repo that has
both fetched) returns empty — the histories are genuinely unrelated (D-32 confirmed). The scratch
tree is root-relative; only paths under a `docs/`-prefix mapping correspond to the main repo's
`docs/` tree, and `--directory=docs` supplies that mapping at apply time (verified below).

### 3. The merge mechanism — reproduced end to end

Reproduced in a disposable `git clone --shared` of the Autopilot repo (not the live tree; deleted
after the test), because D-04/D-22 require the real landing to run in the live tree inside one
tool invocation — this research verifies the mechanism works, it does not perform the landing.

```
$ git clone --shared D:/claude/Autopilot <tmp>
$ cd <tmp> && git checkout -f master
$ git remote add scratch D:/claude/docs-google-style-test
$ git fetch scratch
 * [new branch]      master -> scratch/master
$ git cat-file -t e71f862   # now resolvable post-fetch
commit
$ git cat-file -t c97d322   # now resolvable post-fetch
commit
$ git diff c97d322 e71f862 > full281.patch
$ grep -c '^diff --git' full281.patch
281
$ git apply --3way --directory=docs --exclude='docs/_PASSIVE-REPORT.md' full281.patch
Applied patch to '...' cleanly.   [x 277]
Applied patch to 'docs/end-user-guides/android-work-profile-setup.md' with conflicts.
Applied patch to 'docs/index.md' with conflicts.
Applied patch to 'docs/operations/patch-management/00-overview.md' with conflicts.
$ echo "EXIT CODE: $?"
EXIT CODE: 1
$ git status --porcelain | awk '{print $1}' | sort | uniq -c
    277 M
      3 UU
```

**This reproduces D-01/D-02/D-07/D-20's predicted shape exactly: 281-file patch, 277 clean
applies, exactly 3 `UU` conflicts, exit 1.** The three conflict files and their line numbers also
match D-05 exactly:

```
$ git grep -n '^<<<<<<<\|^=======$\|^>>>>>>>' -- docs
docs/end-user-guides/android-work-profile-setup.md:130:<<<<<<< ours
docs/end-user-guides/android-work-profile-setup.md:134:>>>>>>> theirs
docs/index.md:33:<<<<<<< ours
docs/index.md:47:>>>>>>> theirs
docs/operations/patch-management/00-overview.md:241:<<<<<<< ours
docs/operations/patch-management/00-overview.md:252:>>>>>>> theirs
```

**Landmine found in D-21's own detector command:** the middle clause `^=======$` of that exact
grep pattern (git BRE with `\|` alternation) does **not** independently match the `=======`
separator line — only `^<<<<<<<` and `^>>>>>>>` fire (confirmed: `git grep -n '^=======$' -- docs`
alone returns nothing/exit 1 on this same tree, while the extended-regex form
`git grep -nE '^(<<<<<<<|=======|>>>>>>>)' -- docs` DOES match all three lines including the
separators). This does not weaken D-21's gate — either boundary marker alone is sufficient
evidence of an unresolved conflict block, and both boundary markers fire correctly — but the
executor should not expect the `=======` clause to contribute any hits; it is dead weight in the
BRE alternation as written. No fix needed, just don't be surprised when it's silent.

**Sample-rewrite divergence (D-09/D-10/D-11), independently re-derived in the same disposable
clone by diffing the raw blobs (not `git diff`, because the scratch and main repos have unrelated
histories and different path prefixes):**

```
$ git show 534073f4:docs/end-user-guides/android-work-profile-setup.md > a1.txt
$ git show c97d322:end-user-guides/android-work-profile-setup.md > a2.txt
$ diff a1.txt a2.txt | grep -c '^>' ; diff a1.txt a2.txt | grep -c '^<'
36
36
$ git show 534073f4:docs/l1-runbooks/01-device-not-registered.md > b1.txt
$ git show c97d322:l1-runbooks/01-device-not-registered.md > b2.txt
$ diff b1.txt b2.txt | grep -c '^>' ; diff b1.txt b2.txt | grep -c '^<'
14
14
```

**Both counts match D-09 exactly (36/36 android, 14/14 l1-runbook, not the "72" the original draft
claimed).** Cross-check against `6010dd5` (the scratch repo's own "pristine copy of docs/
@534073f4" baseline commit): the android file is **byte-identical** between `c97d322` and
`6010dd5` (0 diff lines); the l1-runbook file differs by exactly 2 lines between the two — the
single Version-History row D-09 says `c97d322` restored. Confirms D-09's reading precisely.

```
$ git diff c97d322 e71f862 -- l1-runbooks/01-device-not-registered.md
(empty)
```

Confirms D-11: the pass never touched this file (`c97d322..e71f862` diff on it is empty), so the
3-way merge imports nothing to it and the live file needs no edit.

### 4. Tooling inventory

All tools live at `scripts/docs-style/` (Python) and `scripts/validation/` (Node.js). Python 3.13.5
confirmed available (`C:\Python313\python.exe`, also on PATH via WindowsApps shim).

| Tool | Exists | CLI surface | Pins-file default |
|---|---|---|---|
| `scripts/docs-style/sweep3.py` | Yes | `sweep3.py ROOT PINSFILE [--subs TSV] [--apply]` — `sys.argv` parsed manually at `:245-247`, only recognizes `--subs` and `--apply`; any other token (e.g. `--no-headings`, `--dry-run`) is silently discarded, dry-run is the unconditional default | None — pins file is a required positional arg, never hardcoded |
| `scripts/docs-style/verify-meaning.py` | Yes | `verify-meaning.py BASE [--dispositions FILE] [--json]` or `verify-meaning.py --self-test` | `DISPOSITIONS = "_DISPOSITIONS.tsv"` (`:40`), overridable via `--dispositions` |
| `scripts/docs-style/verify2.py` | Yes | No argv parsing at all — `baseline()` hardcodes `'HEAD~1:' + f` (`:27`) and file discovery hardcodes `pathlib.Path('.').rglob('*.md')` (`:41`). **Needs D-31's two-line edit** (argv `BASE` at `:27`, `Path('docs')` at `:41`) before it is runnable against the main-repo geometry. | N/A |
| `scripts/docs-style/pins2.py` | Yes | `pins2.py > _CONTENT-PINS.txt` (stdout redirect) | Hardcodes `V = Path("D:/claude/Autopilot/scripts/validation")` (`:41`) and `D = Path("D:/claude/docs-google-style-test")` (`:42`) — **must not be run in this phase**, it reads the wrong (scratch) corpus and would move the 562-pin invariant under its own feet |
| `_CONTENT-PINS.txt` | Yes | 562 lines (`grep -c '' _CONTENT-PINS.txt` → 562) | The correct pins file for every `sweep3.py` invocation in this milestone |
| `_EMDASH-PINS.txt` | Yes | 8 lines (`grep -c '' _EMDASH-PINS.txt` → 8; `wc -l` undercounts to 7 if run without `grep -c ''` because the file lacks a trailing newline — use `grep -c ''`, not `wc -l`, for pins-file line counts) | Never pass this to `sweep3.py` in this milestone — using it silently substitutes a smaller, wrong protection set |
| `_DISPOSITIONS.tsv` | Yes | 17 lines total (includes a 3-line comment header); format `<id><TAB><reason>`, id = `sha1(kind\x00file\x00evidence)[:12]` | Default for `verify-meaning.py`; D-28 adds a sibling `_DISPOSITIONS-docs.tsv` for the post-merge main-repo run |
| `subs-admin-batch9.tsv` | Yes | Row 26 (0-indexed vs 1-indexed not disambiguated by CONTEXT.md; confirmed via `sed -n '26p'`) is a regex/replacement TSV row: `(?<!Intune )(?<!Sub-Org )(?<!Google )(?<!Local )(?<!macOS )(?<!iOS )(?<!> )(?<!/ )(?<![\w-])Admin(?![\w-])(?! ?[A-Z])(?! log)(?! consent)(?! directory)(?! sees)(?! \(Intune\))(?!:)` → `Administrator`. **Confirmed missing the `(?<!Sure )` exemption D-23 requires.** | STYLE-03's fix target — add one more `(?<!Sure )` alternate to the existing lookbehind chain |
| `KEEP_LINE` (in `sweep3.py:47-49`) | Yes | `re.compile(r"Tenant admin\b|Ask the user: \"|Enrolled via DEP" r"|Create a local admin account|Tri-portal admin surface" r"|Intune config profiles|via staging")` — **confirmed 7 alternates**, matching D-24's correction (not the "6" the original draft undercounted) | N/A |
| `do_em` flag (`sweep3.py:212`) | Yes | Hardcoded `do_em = False` inside the per-line loop — confirmed the em-dash substitution branch (`sweep3.py:88-89`, `EMDASH.subn("—", seg)`, spaced→tight) never executes in any current invocation | Confirms D-25/D-26's discharge-by-assertion strategy |
| `.claude/skills/google-style/check.py` | Yes | Separate script from `sweep3.py`; this is where `--no-headings` actually lives | Confirms D-25: passing `--no-headings` to `sweep3.py` (not `check.py`) is a silent no-op |

**Live dry-run results (pre-merge, current HEAD `033acd54`):**

```
$ python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt
DRY RUN -- 193 files, 562 pins loaded
     765  admin
     148  admins
      22  vs
      20  config
       7  sign-in-to
       7  desired
     969  TOTAL edits
```

```
$ python scripts/docs-style/sweep3.py docs scripts/docs-style/_EMDASH-PINS.txt
DRY RUN -- 195 files, 8 pins loaded
    1000  TOTAL edits
```

**Both numbers exactly reproduce STYLE-06's and D-27's "969/1000" pair.** This confirms the
documented trap live: using `_EMDASH-PINS.txt` instead of `_CONTENT-PINS.txt` changes both the
file-scan count (195 vs 193 — 2 more files "protected" incorrectly become editable) and the total
edit count (1000 vs 969), i.e. the corpus looks like it needs 31 MORE mechanical edits than it
actually should, purely from picking the wrong pins file.

```
$ python scripts/docs-style/verify-meaning.py --self-test
PASS: 10/10 self-test assertions
```

Confirms VERIFY-01's third clause exactly, at current HEAD.

```
$ git cat-file -t c97d322    # run from D:/claude/Autopilot, NOT the scratch repo
fatal: Not a valid object name c97d322
```

Confirms `c97d322` is not resolvable in the main repo pre-fetch — the deterministic-slice-against-
`c97d322` run (VERIFY-01's first clause) can currently only execute inside the scratch repo,
exactly as D-28 requires.

### 5. Structural gate inventory (SC#4)

```
$ node scripts/validation/c17-eee-contract.mjs
C17 assertion-violation-counts: #1=0 #2=0 #3=0 #4=0 #5=0 #6=0 #7=0 #8=0 #9=0 #10=0 #11=0 #12=0 #13=0
C17 summary: 237 files checked, 0 with violations, 0 total violations
```

```
$ node scripts/validation/check-phase-153.mjs
...
Result: 111 PASS, 0 FAIL, 0 SKIPPED (total checks: 111)
real    0m56.033s
```

(This run was non-nested — `CHECK_PHASE_NESTED` unset — which is why `SKIPPED` is 0/0: the two
`CHAIN`/`AUDIT-HARNESS` categories the apex conditionally skips under
`CHECK_PHASE_NESTED=1` both actually executed here. Use a non-nested run for the phase baseline
capture, matching D-18's own 111/0/0 figure.)

```
$ node scripts/validation/check-nav-hub-links.mjs
check-nav-hub-links summary: 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total
```

```
$ python3 -c "... every _CONTENT-PINS.txt line occurs verbatim in docs/ ..."
562 pins checked, 0 lost
```

**All four numbers reproduce D-18's baseline exactly (237/0, 111/0/0, 0/0/0, 562/0).** The link
differ (`verify2.py`) and pin differ (raw pin-presence check, not `pins2.py`) are the two SC#4
components still needing capture — `verify2.py` needs its D-31 two-line edit first; the pin differ
needs no tool, just the verbatim-occurrence check shown above, already run.

**Apex identity confirmed:** `scripts/validation/check-phase-153.mjs` is the current apex
(highest-numbered `check-phase-*.mjs` in the repo — confirmed via directory listing,
`check-phase-153.mjs` is the max). `check-phase-54.mjs` (the amendment-gating validator for D-12)
was also run directly and reproduces its own documented baseline exactly:

```
$ node scripts/validation/check-phase-54.mjs
...
Summary: 32 passed, 0 failed, 0 skipped
```

**"The commit immediately before the merge lands"** resolves, at the moment this research was
run, to `033acd54` (`docs(state): record phase 154 context session`) — but this SHA is a **plan-
time snapshot only**. `git status --porcelain` at that commit shows exactly 5 untracked entries
(`.agents/`, `.claude/skills/fireworks-tech-graph/`, `.claude/skills/jira-milestone/install-jira-
milestone-hook.cjs`, `.obsidian/`, `skills-lock.json`) — this matches D-33's stated rollback
precondition ("only the five known untracked entries") exactly. **Executor action: re-resolve
this SHA at execution time** (`git rev-parse HEAD` immediately before starting C1), write it into
`154-GATE-BASELINE.json`, and re-verify the 5-entry untracked-file precondition still holds before
touching anything.

### 6. Requirement decomposition — deterministic proof coverage

See `<phase_requirements>` above for the primary table. One gap flagged: **STYLE-03's
`KEEP_LINE`-per-revert half has no deterministic proof command.** The `subs-admin-batch9.tsv`
row-26 fix (`grep -c "Sure Administrator" docs/` must stay 0) is fully deterministic and already
verified above. But "every hand-adjudicated revert carries a `KEEP_LINE` entry" is a completeness
claim over an unenumerated set (every past revert, corpus-wide) — no command enumerates "all
hand-adjudicated reverts" independently of `KEEP_LINE` itself, so this half is **necessarily a
manual audit against the historical revert record** (the `dc7e996` "Create a local admin account"
precedent cited in REQUIREMENTS.md), not a script. Flag this to the planner as a checklist item,
not a gate.

## Validation Architecture

| Success Criterion | Command | Expected Output |
|---|---|---|
| SC#1 (drift measured, merge lands) | `git diff --shortstat 534073f4..HEAD -- docs/` (before) then re-run at C4 (after) | Before: re-measure at plan time (23 files / 4,324 ins / 12 del as of this session). After: recorded into `154-GATE-BASELINE.json.landing.shortstat` alongside the C4 SHA. |
| SC#2 (sweep3 0 wanted edits, KEEP_LINE discipline) | `python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt` (never `_EMDASH-PINS.txt`) | `0 TOTAL edits` post-merge (pre-merge measured 969) |
| SC#3 (verify-meaning.py 0 findings + self-test) | (a) in scratch repo: `python verify-meaning.py c97d322 --dispositions _DISPOSITIONS.tsv`; (b) in main repo post-merge: `python scripts/docs-style/verify-meaning.py <pre-merge-SHA> --dispositions scripts/docs-style/_DISPOSITIONS-docs.tsv` (new sibling file, D-28); (c) `python scripts/docs-style/verify-meaning.py --self-test` | (a) exit 0; (b) exit 0, exactly 6 findings all dispositioned (D-28 measured this precisely: "6 findings on the same 6 files with 6 new IDs, zero new substantive findings"); (c) `PASS: 10/10` |
| SC#4 (structural gate before/after) | `node scripts/validation/c17-eee-contract.mjs` && `node scripts/validation/check-phase-153.mjs` && `node scripts/validation/check-nav-hub-links.mjs` && (post D-31 edit) `python scripts/docs-style/verify2.py` && pin-verbatim-occurrence check | C17: `237 files checked, 0 with violations`; apex: `111 PASS, 0 FAIL, 0 SKIPPED`; nav-hub: `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`; pin differ: `562 pins checked, 0 lost`; link differ: captured post-edit |
| Conflict-marker gate (D-21, blocks every commit) | `git grep -n '^<<<<<<<\|^=======$\|^>>>>>>>' -- docs` | Empty output, exit 1 (grep convention: no match = exit 1) BEFORE every `git commit`. Note: only the `<<<<<<<`/`>>>>>>>` clauses actually fire in this BRE form (verified this session) — that is sufficient, the `=======` clause is redundant-but-harmless. |

## Common Pitfalls

### Pitfall 1: Chaining the apply with `&&`
**What goes wrong:** `git apply --3way ... && git commit` never runs the commit, because the
successful apply (277 clean + 3 conflicts) still exits 1.
**Why it happens:** Conflicts are a normal, expected outcome of this apply, not a failure state —
but the shell doesn't know that.
**How to avoid:** Check `git status --porcelain` shape (`277 M + 3 UU`) explicitly rather than the
apply's exit code.

### Pitfall 2: Running `pins2.py` in this phase
**What goes wrong:** `pins2.py:41-42` hardcodes the scratch repo path
(`D:/claude/docs-google-style-test`) as its corpus source. Running it post-merge in the main repo
regenerates `_CONTENT-PINS.txt` from the WRONG corpus, silently moving STYLE-06's 562-pin
invariant.
**How to avoid:** Never run `pins2.py` in this phase (D-31). Only read `_CONTENT-PINS.txt`, never
regenerate it.

### Pitfall 3: Trusting `wc -l` on the pins files
**What goes wrong:** `wc -l _EMDASH-PINS.txt` returns 7, not 8, because the file has no trailing
newline after its last line and `wc -l` counts newlines, not lines.
**How to avoid:** Use `grep -c ''` for pins-file line counts (confirmed this session: returns 8 for
`_EMDASH-PINS.txt`, 562 for `_CONTENT-PINS.txt`, matching the documented figures).

### Pitfall 4: Assuming `--no-headings` protects headings during the landing
**What goes wrong:** `--no-headings` is a `check.py` flag (a different script). `sweep3.py`
discards unknown argv tokens silently at `:245-247` and already skips heading lines
unconditionally at `:199-204` regardless of flags. Passing `--no-headings` to `sweep3.py` gives a
false sense of an explicit safety switch that does nothing.
**How to avoid:** Discharge STYLE-04 by a heading census (count `## Escalation Criteria` and other
pinned headings before/after; assert unchanged), not by flag-passing.

### Pitfall 5: A pathspec-scoped commit while `UU` paths exist
**What goes wrong:** `git commit -m … -- <pathspec>` with unmerged entries present **exits 0** and
commits the conflict-marker files anyway — `:(exclude)` notwithstanding (D-20's measured finding).
`c4088fc0`'s jira-hook auto-commit is exactly this shape (pathspec-scoped, touches one file) and
demonstrates why the two `Stop` hooks in `.claude/settings.local.json` make a second tool
invocation between apply and commit unsafe.
**How to avoid:** Apply → resolve → conflict-marker-gate → commit inside one tool invocation
(D-22), and never leave `UU` paths across an invocation boundary.

### Pitfall 6: Regenerating the CRLF/LF narrative from a fresh measurement
**What goes wrong:** This session's own working-tree measurement of the scratch corpus (282 CRLF
files / 3 LF files by both a direct byte-scan and `file`) does **not** match D-04's stated
"87 CRLF / 207 LF." Re-deriving a merge-safety argument from a fresh CRLF/LF count on a different
machine or session will produce yet another different split, because `core.autocrlf=true` is a
per-machine checkout behavior, not a corpus property.
**How to avoid:** Don't re-litigate the CRLF story. The load-bearing fact is that **committed
blobs are 100% LF** (confirmed this session: 285/285 blobs, 0 CR bytes) and the actual apply
mechanism was independently re-verified this session to produce the exact predicted hunk-level
shape (277 M + 3 UU) regardless of the local machine's checkout line-ending state. That is the
real invariant; the specific CRLF/LF split is checkout noise.

## Code Examples

### Full landing sequence (from a clean tree on `v1.22/154-style-landing`)

```bash
# One tool invocation, in order:
git checkout -b v1.22/154-style-landing
git remote add scratch D:/claude/docs-google-style-test   # if not already added
git fetch scratch
git bundle create .planning/artifacts/154-scratch-corpus.bundle --all   # inside scratch repo, D-08
git fetch scratch '+refs/*:refs/scratch/*'                              # pin c97d322/e71f862 permanently

git diff c97d322 e71f862 > /tmp/full281.patch
git apply --3way --directory=docs --exclude='docs/_PASSIVE-REPORT.md' /tmp/full281.patch
# EXPECT exit 1. Verify shape before proceeding:
git status --porcelain | awk '{print $1}' | sort | uniq -c
# MUST read exactly:  277 M  /  3 UU  -- any other shape halts the phase (D-14)

git reset   # per D-07, undo the pre-staging so C1 can be composed explicitly
git add <the 277 clean files>
git commit -m "..."   # C1 -- body carries both scratch SHAs c97d322 / e71f862

# Resolve docs/index.md and docs/operations/patch-management/00-overview.md per D-05's table.
git grep -n '^<<<<<<<\|^=======$\|^>>>>>>>' -- docs   # MUST be empty before commit
git add docs/index.md docs/operations/patch-management/00-overview.md
git commit -m "..."   # C2

# Resolve docs/end-user-guides/android-work-profile-setup.md per D-05 (take ours, admin->administrator).
git grep -n '^<<<<<<<\|^=======$\|^>>>>>>>' -- docs   # MUST be empty before commit
git add docs/end-user-guides/android-work-profile-setup.md
git commit -m "..."   # C3

# One sweep edit: docs/_standards/EEE-SOP-standard.md:554 "admin decision points"
git add docs/_standards/EEE-SOP-standard.md
git commit -m "..."   # C4
```

### Baseline capture (before C1, on the pre-merge tree)

```bash
node scripts/validation/c17-eee-contract.mjs                 # expect 237/0
node scripts/validation/check-phase-153.mjs                  # expect 111/0/0, non-nested
node scripts/validation/check-nav-hub-links.mjs               # expect 0/0/0
python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt   # dry run, record current count
python scripts/docs-style/verify-meaning.py --self-test      # expect 10/10
# pin differ -- no tool, verbatim occurrence check (see Tooling Inventory section for the one-liner used this session)
git rev-parse HEAD   # the pre-merge SHA -- write into 154-GATE-BASELINE.json BEFORE applying (D-33)
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Landing the styled corpus | A custom copy/diff script, or a fresh re-run of the style pass | `git fetch` + `git apply --3way --directory=docs` | Content-addressed blob identity across unrelated repos makes 279/281 files resolve with zero custom logic; a fresh re-run discards 406 hunks of already-completed judge verification (owner ruling 1). |
| Proving 0 mechanical residual | A new grep-based residual checker | `sweep3.py` dry run against `_CONTENT-PINS.txt` | Already exists, already pins the exact validator-literal set; a new checker would re-derive `_CONTENT-PINS.txt`'s 562 entries from scratch and likely miss some. |
| Proving no meaning changed | Manual diff review at scale | `verify-meaning.py` (deterministic checks) + the judge worklist for modal-loss | Purpose-built for exactly this; self-tests 10/10, catches label-drift/word-order/split-verb/frontmatter/quotation classes structural validators cannot see. |
| Regenerating `_CONTENT-PINS.txt` | Running `pins2.py` "just to be safe" | Don't regenerate at all in this phase | `pins2.py:41-42` hardcodes the scratch repo as its corpus source — running it post-merge reads the wrong tree entirely. |

**Key insight:** every piece of tooling this phase needs was purpose-built during the original
9-batch pass and is already proven against this exact corpus (406-hunk, 10-agent judge
verification per REQUIREMENTS.md's Scope Origin). The only genuinely new mechanical step is the
cross-repo fetch, which this research independently reproduced end to end.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | The `e1`/`e2`/`ee` stray root files D-34 directs be deleted in a housekeeping commit do not currently exist anywhere in the repository (confirmed: not tracked via `git ls-files`, not in `git log --all -- e1 e2 ee`, not present on disk via `find`). Treated here as a likely-stale note from an earlier session rather than a live defect. | Live Drift / Landmines | Low — if the executor blindly attempts `git rm e1 e2 ee` per D-34/STATE.md without checking first, the commit will fail (nothing to remove) or silently no-op; either way it's non-blocking. Recommended default: `git ls-files -- e1 e2 ee` first, skip the housekeeping commit if empty. |
| A2 | D-04's stated "87 CRLF / 207 LF" corpus split could not be reproduced under any scoping tried this session (whole scratch tree, 281-file patch subset, byte-scan, and independent `file` command all agree: 282 CRLF / 3 LF working-tree, 285/285 LF committed blobs). The specific split may have been measured on a different machine/session with different `core.autocrlf` behavior, or against a different file scope entirely. | Landmines / Pitfall 6 | Low for the merge mechanism itself (independently re-verified to produce the correct 277M+3UU shape regardless), but the D-04 prose citing "87/207" should not be repeated as fact in execution artifacts — cite the blobs-are-100%-LF fact instead, which is directly reproducible. |

## Open Questions

None left unresolved. Both items that could not be fully pinned down (the `e1`/`e2`/`ee` file
existence and the CRLF/LF split) are resolved above into the Assumptions Log with a stated default
recommendation, per this research's own measurement — there is no remaining question requiring a
planner decision beyond "verify before acting," which is already the recommended default.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Git | Every step of this phase | ✓ | (repo already git-managed; `git clone --shared` confirmed working this session) | — |
| Python 3 | `sweep3.py`, `verify-meaning.py`, `verify2.py`, `pins2.py` | ✓ | 3.13.5 (`C:\Python313\python.exe`) | — |
| Node.js | `c17-eee-contract.mjs`, `check-phase-153.mjs`, `check-nav-hub-links.mjs` | ✓ | (all three ran successfully this session) | — |
| Scratch repo `D:\claude\docs-google-style-test` | The entire merge source | ✓ | HEAD `e71f862`, 29 commits, no remote | None — this is the only copy; D-08's bundle preservation is not optional |

No missing dependencies. This phase requires no package installs — the Package Legitimacy Audit
gate does not apply.

## Sources

### Primary (HIGH confidence — MEASURED this session against this repository)
- `D:\claude\Autopilot` git object database and working tree (branch `master`, HEAD `033acd54`).
- `D:\claude\docs-google-style-test` git object database (HEAD `e71f862`).
- A disposable `git clone --shared` reproduction of the full D-01 merge sequence (created and
  deleted within this session).
- `scripts/docs-style/sweep3.py`, `verify-meaning.py`, `verify2.py`, `pins2.py`,
  `_CONTENT-PINS.txt`, `_EMDASH-PINS.txt`, `_DISPOSITIONS.tsv`, `subs-admin-batch9.tsv` — read
  directly.
- `scripts/validation/c17-eee-contract.mjs`, `check-phase-153.mjs`, `check-phase-54.mjs`,
  `check-nav-hub-links.mjs` — executed directly.
- `.claude/settings.local.json` — read directly.

### Secondary (MEDIUM confidence)
- `154-CONTEXT.md` and `154-DISCUSSION-LOG.md` — the ratified decision record, itself produced by
  an adversarial-review process with independent throwaway-clone re-execution of load-bearing
  claims; treated as authoritative per this agent's role but re-verified rather than trusted
  blindly, per the phase's own stated pattern of prior draft measurements being falsified.

### Tertiary (LOW confidence)
- None. No claim in this file rests solely on training knowledge or an unverified web source —
  this phase has no external technology-selection component.

## Metadata

**Confidence breakdown:**
- Merge mechanism: HIGH — independently reproduced end to end in a disposable clone this session,
  matching CONTEXT.md's predicted shape exactly.
- Tooling inventory: HIGH — every script read directly, every claimed line number and behavior
  confirmed by direct execution or source inspection this session.
- Structural gate baseline: HIGH — every validator executed directly this session, all four
  numbers reproduce D-18's baseline exactly.
- Requirement decomposition: HIGH for STYLE-04/05/06/VERIFY-01 (fully deterministic, reproduced);
  MEDIUM for STYLE-03 (the `KEEP_LINE`-per-revert completeness half has no deterministic proof
  command and must be a manual audit).
- CRLF/LF corpus claim (D-04): LOW / DIVERGENT — could not reproduce the stated 87/207 split under
  any tested scoping; documented as a landmine rather than corrected, since it is not load-bearing
  for the merge mechanism's own correctness.

**Research date:** 2026-08-31
**Valid until:** Re-verify all commands in this file immediately at plan/execute time — this repo
takes commits from other sessions and several numbers here (fork-point drift, sweep3 dry-run
counts, structural gate baseline, the pre-merge HEAD SHA) are explicitly moving targets that this
research itself flags as needing re-measurement, not one-time facts.
