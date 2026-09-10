# Phase 154: STYLE Landing — Merge the Verified Google-Style Pass - Context

**Gathered:** 2026-08-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Move an already-verified 280-file Google-style pass out of a **separate git repository**
(`D:\claude\docs-google-style-test`) into `docs/`, across the post-fork drift, with the protective
canon intact and the pre-merge structural-gate baseline captured.

Discharges STYLE-01, STYLE-03, STYLE-04, STYLE-05, STYLE-06, VERIFY-01.

**Out of scope in both directions.** No batch-10 styling (the 9 post-fork documents plus RE-237 are
Phase 156's, and their residual is recorded here as inherited, never edited). No RE-237 registration
or reconciliation (Phase 155). No hygiene fixes (Phase 157). No publish bundle (Phase 158). No
harness work (Phase 159). A content defect found in a batch-10 file during this phase is recorded,
not fixed.

This CONTEXT was produced by `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review`
(4 parallel Finders → Adversary → Referee). 94 raw findings → 73 deduplicated → 72 confirmed after
adjudication, 1 clean disproof, 9 Adversary rulings overturned by the Referee, plus 5 findings the
Referee raised itself. Every `[MEASURED]` row below was executed against this repository, and every
load-bearing one was re-executed independently by at least two agents in throwaway `--shared` clones.
Neither `D:\claude\Autopilot` nor `D:\claude\docs-google-style-test` was modified during discussion.

**Four of the original draft's own measurements were falsified during review** — a wrong commit SHA,
an inverted reading of the em-dash rule, a publish-pipeline inference that does not hold, and a
line-ending claim that was false on both limbs. All four are corrected below and the corrections are
load-bearing.

</domain>

<decisions>
## Implementation Decisions

### Area A — Merge mechanics

- **D-01:** The landing is `git fetch` **then** `git apply --3way`, not a copy and not a patch alone.
  `[MEASURED]` The scratch repo's pre-image blob SHAs are content-addressed, so **279 of 281 already
  resolve in this repo's object DB**; the two that do not are `_PASSIVE-REPORT.md` (an add) and the
  android file. Adding the scratch repo as a remote and fetching supplies the missing blob and makes
  `c97d322` resolvable. Verified end to end:
  ```
  git remote add scratch D:/claude/docs-google-style-test
  git fetch scratch
  git diff c97d322 e71f862 > full281.patch
  git apply --3way --directory=docs --exclude='docs/_PASSIVE-REPORT.md' full281.patch
  git status --porcelain | awk '{print $1}' | sort | uniq -c    # 277 M / 3 UU
  ```
  **280 files land, zero refusals.** `--directory=docs` supplies the prefix map (scratch root =
  `docs/`); the mapping is total — all 280 styled paths exist under `docs/` at HEAD.
  — **Reversibility:** reversible — `git checkout -m -- docs` restores markers, `git reset --hard`
  the pre-merge SHA restores the tree, both safe only because D-20's clean-tree precondition holds.

- **D-02:** Without the fetch the recommended procedure lands **zero** files. `[MEASURED]`
  `git apply --3way` is atomic: the android refusal (`error: repository lacks the necessary blob to
  perform 3-way merge`) rolls the whole apply back — `git status --porcelain` returns 0 lines after
  exit 1. Any plan that generates a 280-file patch without the fetch aborts on first execution.
  Note also that even the **successful** apply **exits 1** because of the conflicts, so it must never
  be chained with `&&`.

- **D-03:** Exactly one pathspec exclusion — `--exclude='docs/_PASSIVE-REPORT.md'`. Under D-01 no
  android exclusion is needed. `docs/_PINNED-HEADINGS.txt` is not in the patch and needs none; the
  draft's stated reason for excluding it was wrong (`c17-eee-contract.mjs:81` filters to `.md`, so a
  `.txt` file is invisible to C17 — the conclusion held, the mechanism did not). Assert post-apply
  that neither file exists under `docs/`.

- **D-04:** The merge is staged in the **live main working tree**, on branch
  `v1.22/154-style-landing`, with a clean-tree precondition, and apply → resolve → gate → commit runs
  inside a **single tool invocation**. `[MEASURED]` The draft's stated reason was false: the corpus is
  **mixed, 87 CRLF / 207 LF**, `core.autocrlf=true` lives in the *system* gitconfig so every clone
  inherits it, HEAD blobs carry zero CR, and a fresh CRLF clone stages the apply at hunk granularity
  (277 files, 6,093 insertions, 6,094 deletions) — there is no whole-file-diff hazard and no LF/CRLF
  differential. The real constraint is D-22.
  — **Reversibility:** reversible on a branch — **one-way** if D-20's precondition is skipped, because
  the abort is `git reset --hard` and would destroy unrelated uncommitted work.

- **D-05:** There are **three** conflicts, not two, each with a stated resolution direction and a
  stated detector. `[MEASURED]` marker counts are 1 per file, but that understates two of them.

  | File | Shape | Rule |
  |---|---|---|
  | `docs/end-user-guides/android-work-profile-setup.md:130` | 1 vs 1 | Take **ours** wording, apply `admin guide` → `administrator guide`. **Never theirs** — its half carries `can't see` and the `#what-your-it-team-can-and-cant-see` anchor from the sample rewrite. |
  | `docs/index.md:33` | 6 vs 6, three orthogonal changes interleaved | Keep ours' content (the v1.21 drift), take theirs' style (`via`→`through`, `admin`→`administrator`) on every bullet. |
  | `docs/operations/patch-management/00-overview.md:241` | theirs 1 line vs **ours 8 lines**, carrying two whole v1.21 nav entries | Reconstruct all 8 ours lines, apply theirs' style rules to them. |

- **D-06:** The draft's proposed proof of a conflict resolution is a **no-op** and is replaced.
  `[MEASURED]` A deliberately-bad resolution (ours wholesale, every styled hunk dropped) and a good
  one were both tested: plain `git apply --check` **fails on both**; `git apply --check --3way`
  **exits 0 on both**. The only discriminator is the stderr string `cleanly` versus `with conflicts`,
  which no exit-code-driven step would read. Replacement proof, three parts: capture stderr and assert
  the literal `cleanly`; `sweep3.py` reports 0 mechanical residual on the resolved file;
  `check-nav-hub-links` reports 0 corpus-link failures — that last one is the only automated detector
  in the entire toolchain that catches a wrong-direction android resolution.
  — **Reversibility:** reversible before commit — **costly** after, because a silently dropped styled
  hunk is invisible to C17 (see D-21).

- **D-07:** `git apply --3way` implies `--index`. `[MEASURED]` all 277 clean files arrive **pre-staged**
  (`277 "M "` + `3 "UU"`), so D-15's commit split needs an explicit `git reset` between commits, and a
  failed apply mutates the index rather than only the worktree.

- **D-08:** The scratch repository is preserved by mechanism, not by a note. `[MEASURED]` it has **no
  remote** (`git remote -v` → empty) and is the only copy of the styled corpus. Before the landing:
  `git bundle create` from the scratch repo committed under `.planning/artifacts/`, plus
  `git fetch scratch '+refs/*:refs/scratch/*'` so `c97d322` and `e71f862` stay permanently resolvable
  from this repo. Both SHAs are pinned in commit C1's message body.
  — **Reversibility:** **one-way if skipped** — loss of the only copy of the pass.

### Area B — The un-restored sample rewrites

- **D-09:** `c97d322` is **not** a pristine copy of `docs/@534073f4`. `[MEASURED]` an exhaustive
  blob-identity sweep over all 299 scratch paths returns **exactly two divergent files** —
  `end-user-guides/android-work-profile-setup.md` (36 ins / 36 del) and
  `l1-runbooks/01-device-not-registered.md` (**14 ins / 14 del**, not the 72 the draft claimed; that
  was the android figure misapplied) — plus scratch-only `_PINNED-HEADINGS.txt`, and zero main-only
  paths. **`6010dd5` shows the identical two divergences**, which closes the obvious wrong turn a
  reader of STYLE-01's "not `6010dd5`" clause would otherwise take. These are RESUME.md's "2 sample
  rewrites"; `c97d322` restored a single Version-History **row** of one of them.

- **D-10:** No hand rebase of the android file. `[MEASURED]` under D-01 it 3-way merges with base
  `c97d322`, theirs `e71f862`, ours live `docs/` — so the 36-line sample rewrite is the ours→base
  delta and 3-way keeps ours everywhere the sides do not collide. Verified result: `1 file changed,
  6 insertions(+), 2 deletions(-)`; heading still `## What your IT team can and cannot see`; modal
  still `will need to adjust`; the 15 sample-rewrite tight dashes **not** imported. Two of the three
  real hunks land clean and the one ambiguous line surfaces as D-05's conflict. **Three hand edits
  nobody could `git log -S` become one commit that `git log -S` finds.**

- **D-11:** No edit to `l1-runbooks/01-device-not-registered.md`. `[MEASURED]` the pass's diff on it
  (`c97d322..e71f862`) is **empty** — the file is not among the 281 — so 3-way imports nothing and the
  live file is already correct. Two supporting arguments from the draft are **dropped as refuted**:
  nothing links a document's H1 to its registry Title (`build-filename-map.mjs:110` takes
  `title: cols[3]` from `RE-index.md`, its header names that column the sole source of truth, and the
  cited `:234,:244` is a hardcoded inline self-test fixture, not a read), and `## Escalation Criteria`
  is pinned by **zero** validators. This is a policy and consistency defect, not an enforcement hazard.

- **D-12:** `.planning/REQUIREMENTS.md` and `.planning/ROADMAP.md` are both amended in-phase, using
  **annotate-and-supersede** — the superseded wording preserved verbatim in the same block, per
  `141-01-PLAN.md:24` (D-27) — and citing the on-point precedent **Phase 143 D-29** at
  `v1.20-GOV-02-LEDGER.md:64`, which already carries this recipe. The Phase 153 D-08 instances the
  draft cited amend a cleanup ledger and a milestone audit, not these two files. Four corrections:
  (i) drift is **23 files / 4,324 insertions / 12 deletions**, not 22 / 4,032 / 12 — RE-237 landed at
  `68c747a9`; (ii) `c97d322` is the corrected baseline *for the verifier* and not a pristine copy, and
  neither is `6010dd5`; (iii) SC#3's ref is reachable only after D-01's fetch and even then is not
  path-compatible with `docs/` (see D-24); (iv) STYLE-06's `[MEASURED]` numbers are stale in their own
  geometry.
  — **Reversibility:** reversible as text — **costly if botched**, because `check-phase-54.mjs` is an
  apex chain member.

- **D-13:** The validator rider on D-12 names the assertion that can actually fire. `[MEASURED]`
  `check-phase-54.mjs:30-31` reads **both** `REQ` and `ROAD`; `V-54-21` and `V-54-32` are pure
  negatives on a literal filename an amendment cannot introduce, so they cannot fire. **`V-54-27`**
  recursively walks `['docs','.planning']` for a bare platform-callout line and therefore covers every
  artifact this phase writes under `.planning/phases/154-…/`. Baseline `check-phase-54.mjs` before the
  edit and re-run it after, in the same task; it was 32/32 PASS at HEAD.

- **D-14:** The divergence sweep is re-run **in both directions** at plan time, and the real detector
  is the apply shape, not the sweep. The draft's method enumerated scratch-side paths only, so a file
  present in `docs/` but absent from scratch was invisible (currently zero, but `docs/` grows between
  sessions). Assert `git apply --3way` produces exactly `277 M + 3 UU`; any other shape halts the phase.

### Area C — The drifted-hunk style gap

- **D-15:** Phase 154 owns a mechanical slice of **one sweep edit plus two in-resolution applications**
  — not the "2 edits" the draft claimed and not the 14 its projection reported. `[MEASURED]` the
  draft's projection was taken on a tree still carrying raw conflict markers, so every token in the
  conflicted files was double-counted. Re-measured on a correctly merged tree: **12 edits / 8 files**,
  of which 5 files are batch-10/RE-237 (Phase 156) and 2 are conflict artifacts. What remains for this
  phase: `docs/_standards/EEE-SOP-standard.md:554` (`admin decision points`) as a sweep edit in commit
  C4, plus the `admin`→`administrator` applications inside the `index.md` and android resolutions.
  Touching `EEE-SOP-standard.md` is permitted — `STATE.md:135` is a "worth noticing" note about lines
  `:578` and `:649`, and a one-word substitution at `:554` shifts neither.

- **D-16:** SC#2 **and VERIFY-01** are both amended under D-12's mechanism to read *0 wanted edits over
  the landed set*, with the batch-10 residual (measured 9 at HEAD) named as out-of-scope-by-design and
  inherited by Phase 156 **with a staleness caveat** — Phase 155's RCP work rewrites 4 of Phase 156's
  13 files between the measurement and its use. The draft rescoped these in prose only, which is
  exactly the option it had rejected forty lines earlier, and it **never named VERIFY-01 at all** —
  leaving a requirement that flips to Validated at the close gate against an unamended criterion.
  Record explicitly that **"0 wanted edits" does not mean "styled"**: post-merge the corpus still
  carries ~1,548 standalone `admin` and 22 `admin guide` across 17 files inside table rows,
  `KEEP_LINE` and protected spans. Also correct the tool name — **`sweep3.py` has no `--dry-run`
  flag**; dry run is the default and `--apply` opts out.
  — **Reversibility:** reversible as text — **one-way if omitted**, because VERIFY-01 then validates
  against a criterion nobody amended.

- **D-17:** Phase 156's SC#1 and STYLE-02 are amended for the judgment-slice handoff, which is **2**
  candidates on the landed set (the `Admin` pair in `docs/_glossary.md`), not 7. The amendment must not
  double-count `docs/recipes/01-shared-windows-avd-client.md` (RE-222), which is already in STYLE-02's
  set — and STYLE-02's set is **13** documents, not the 10 the draft implied.

### Area D — Baseline, requirements and landing shape

- **D-18:** The pre-merge baseline covers **all five** SC#4 components on the live main tree at the
  commit immediately before the landing. The draft measured three and substituted an SC#3 item.
  `[MEASURED]` at HEAD `c4088fc0`:

  | Component | Command | Baseline |
  |---|---|---|
  | C17 | `node scripts/validation/c17-eee-contract.mjs` | 237 files / 0 violations, #1–#13 all 0 |
  | Apex | `node scripts/validation/check-phase-153.mjs` | 111 PASS / 0 FAIL / 0 SKIPPED |
  | Nav-hub link checker | `node scripts/validation/check-nav-hub-links.mjs` | 0 / 0 / 0 |
  | Link differ | `scripts/docs-style/verify2.py` (needs D-23's edit) | to capture |
  | Pin differ | every `_CONTENT-PINS.txt` line occurs verbatim in `docs/` | **562 pins / 0 lost** |

  — **Reversibility:** **one-way** — the pre-merge state is unrecoverable once the landing commits exist.

- **D-19:** The baseline is a generated artifact at `154-GATE-BASELINE.json` in this phase directory,
  with `gate_baseline` (the five components plus the SHA they ran at) and `landing` (SC#1's post-merge
  shortstat plus the four landing SHAs). Phase 156 regenerates and diffs `gate_baseline` only. The
  precedent already exists twice — `v1.20-phases/141-…/141-sweep-result.json` and
  `143-…/.143-edge-coverage.json` — and should be cited; the draft's stated reason for the location was
  false, since `c17-eee-contract.mjs:526` walks `walkMd('docs')` and `scripts/` is equally off that
  walk. Phase 156 and Phase 158 must **resolve** this path rather than hardcode it, because
  `.planning/phases/` relocates to `.planning/milestones/v1.22-phases/` at close.

- **D-20:** The landing is four commits, but **every conflict is resolved before any commit exists**.
  `[MEASURED]` bare `git commit` refuses with unmerged paths — and the obvious workaround is worse:
  `git commit -m … -- <pathspec>` with unmerged entries **exits 0 and commits the conflict-marker files
  anyway**, `:(exclude)` notwithstanding. Order: **C1** the 277 clean applies (carrying the SHA pins);
  **C2** the two drift-overlap resolutions; **C3** the android 3-way and its resolution; **C4** the one
  `EEE-SOP-standard.md` sweep edit. `git reset` the index between commits per D-07.
  The draft's justification for splitting was a rationalization and is replaced: `git log -S` returns a
  commit identically whether it touches 1 file or 280, and `git show <sha> -- <path>` isolates anything
  inside it. The honest reason is **reviewability** — C2, C3 and C4 are three small hand-authored diffs
  a reviewer would otherwise have to find inside a 10,000-line machine diff. Record for Phase 158 that
  `-S` is the wrong pickaxe where a string is removed and re-added in equal measure: `administrator
  guide` goes 0→39 while `admin guide` still occurs 22 times across 17 files, so `-G` is needed.

- **D-21:** A conflict-marker gate blocks every commit in this phase.
  `git grep -n '^<<<<<<<\|^=======$\|^>>>>>>>' -- docs` must return empty before any `git commit`.
  `[MEASURED]` this is not defensive boilerplate: **C17 reports `237 files checked, 0 violations,
  #1–#13 all 0` on a tree carrying three live conflict-marker blocks.** The structural gate cannot see
  an unresolved merge; only `check-nav-hub-links` caught anything, and only the one marker that
  happened to produce a dangling anchor. No existing validator covers this.
  — **Reversibility:** reversible to add — **one-way if omitted**, because merge markers ship into the
  published corpus.

- **D-22:** Apply, resolve, gate and commit run inside **one** tool invocation. `[MEASURED]`
  `.claude/settings.local.json` registers two `Stop` hooks; they do not commit themselves — they block
  the turn and instruct a jira sync, whose commit is pathspec-scoped (`c4088fc0` touched one file).
  Pathspec scoping looks safe and is not: per D-20 a pathspec commit taken while three `UU` paths exist
  commits the conflict markers. Single-invocation execution is the whole mitigation.

- **D-23:** STYLE-03 is **work, not verification** — and this is the most serious defect found anywhere
  in the review. `[MEASURED]` `subs-admin-batch9.tsv` row 26 still rewrites HP's product name
  **`Sure Admin` → `Sure Administrator` 20 times in one file, five of them inside `**Source:**`
  citation titles**, against URLs that still read `sure-admin`, while `### Sure Admin` and
  `#sure-admin` own a glossary heading and anchor at `docs/_glossary.md:193`. That is precisely the
  label-splitting class STYLE-03 bars, it is live now, and the draft marked STYLE-03 discharged.
  Corpus damage today is **zero** — the HP file is a batch-10 file the row has never run against — so
  Phase 154 owns the **tooling fix only** and writes nothing to `docs/`. Fix: add `(?<!Sure )` to row
  26's lookbehind chain, the row's own established idiom alongside the existing Intune / Sub-Org /
  Google / Local / macOS / iOS exemptions. Deleting the row per STYLE-03's literal wording would lose
  ~1,500 legitimate expansions and is rejected. Standing detector: `grep -c "Sure Administrator" docs/`
  must be 0. Phase 156 is where the damage would otherwise fire.

- **D-24:** STYLE-03's `git log -S` evidence uses the **correct** SHAs. `[MEASURED]` `9b3007c1` never
  touched `sweep3.py`; `KEEP_LINE` went from 3 to **7** alternates at **`0332a61c`**, and `9b3007c1`
  landed only the 20 `subs-*.tsv` row deletions (5+3+6+1+4+1). The draft named the wrong commit and
  undercounted the alternates as 6 — and Q4.4 would have turned that wrong SHA into an acceptance
  criterion VERIFY-06 re-runs in Phase 158, planting a false ledger entry in advance of the audit
  designed to catch exactly that.

- **D-25:** STYLE-04 is verification, by a **different mechanism** than the draft proposed.
  `[MEASURED]` `--no-headings` is a `check.py` flag only; `sweep3.py:245-247` parses just `--apply` and
  `--subs` and discards unknown tokens, and `:199-202` skips headings unconditionally regardless — so
  the proposed discharge was a silent no-op. Discharge instead by a heading census across the merge:
  `## Escalation Criteria` stays 43 occurrences Title Case and 0 sentence-case, and no
  `_PINNED-HEADINGS.txt` entry changes. Both at-risk heading edits arrived via the baseline, which no
  flag could prevent and which D-01 already excludes.

- **D-26:** STYLE-05 is verification only, and **the draft's proposed new work item is deleted as
  inverted**. `[MEASURED]` `sweep3.py:89` is `EMDASH.subn("—", seg)` — it substitutes spaced → **tight**;
  tight is the canon's *output* and a fixed point, and `REQUIREMENTS.md:31` says so outright. The corpus
  goes from 7 tight occurrences in 5 files pre-merge to **4,364 in 245 files** post-merge. The proposed
  "measure corpus-wide and correct or disposition" would have **reverted roughly 4,900 canonical
  edits**, and taken literally would have edited two verbatim vendor blockquotes and three ratified
  table-N/A placeholders that ten milestone-audit validators content-match. It also contradicted D-16's
  scoping in the same breath. Note additionally that `do_em = False` is hardcoded at `sweep3.py:212`, so
  the em-dash rule never runs in any invocation. Discharge by asserting that flag unchanged and the
  pins-file distinction held.

- **D-27:** STYLE-06 is verification plus a text correction. Assert `_CONTENT-PINS.txt` (562 pins) in
  every recorded invocation, and amend the requirement's stale numbers under D-12. `[MEASURED]` the
  requirement's right-file-0 / wrong-file-20 pair was taken against the styled scratch corpus; at HEAD
  it is 969 / 1000, and the post-merge target is 12–14, not 0.

- **D-28:** VERIFY-01 is honoured **both** ways, and the fetch does **not** collapse this.
  `[MEASURED]` after D-01's fetch `c97d322` resolves, but reachability is not path-compatibility:
  `git diff --name-only c97d322` from the main repo returns **2,746 changed `.md`**, because the scratch
  tree is root-relative and only 308 paths carry a `docs/` prefix. So (a) the historical reproduction
  runs **in the scratch repo** against `c97d322` with `_DISPOSITIONS.tsv`, and (b) the real post-merge
  proof runs in the main repo with `BASE` = the pre-merge SHA and a **new**
  `scripts/docs-style/_DISPOSITIONS-docs.tsv` carrying the same six verbatim reasons under six
  `docs/`-prefixed IDs — the `--dispositions` flag already exists at `verify-meaning.py:319`, so no
  tracked file is rewritten and (a) stays runnable. **Measured cost of (b): exactly 6 findings on the
  same 6 files with 6 new IDs, zero new substantive findings** — the fingerprint is
  `sha1(kind \0 file path \0 evidence)`, so the `docs/` prefix stales all six and nothing else. Path
  scoping is **not** needed: with `BASE` = the pre-merge SHA and D-20's docs-only commits, no
  `.planning/` file is in range. Run it on a clean tree — `verify-meaning.py` diffs BASE against the
  **worktree**, not HEAD, so an uncommitted SUMMARY would enter the scan.

- **D-29:** `verify-meaning.py --self-test` is verification only and is recorded into
  `154-GATE-BASELINE.json` under `sc3.self_test`, not into prose. `[MEASURED]` PASS 10/10 at HEAD.

- **D-30:** SC#1's post-merge shortstat is owned by this phase, taken at commit **C4**, and written to
  `154-GATE-BASELINE.json` under `landing.shortstat` **with the C4 SHA beside it** so it is
  re-derivable rather than asserted. The draft measured only the pre-merge drift and left SC#1's second
  half with no owner.

- **D-31:** The SC#4 link differ and pin differ are captured with the minimum edit, and one tool is
  explicitly **not** run. `[MEASURED]` both exist — `verify2.py` (link/anchor health, named in
  RESUME.md's own gate stanza alongside C17 and the apex) and `pins2.py` — but neither is runnable in
  the main-repo geometry unedited. The **pin differ needs no tool at all**: assert every
  `_CONTENT-PINS.txt` line occurs verbatim in `docs/`, measured 562/562 with 0 lost on both sides of the
  merge. **`pins2.py` must not be run to regenerate `_CONTENT-PINS.txt` in this phase** — `:41-42`
  hardcodes the *scratch* repo path, so post-merge it reads the wrong corpus, and regenerating would
  move STYLE-06's 562-pin invariant under its own feet. The **link differ** needs a two-line edit to
  `verify2.py` (`HEAD~1` → an argv BASE at `:27`, `Path('.')` → `Path('docs')` at `:41`), committed
  separately from the landing.

- **D-32:** "As a **real merge**" in STYLE-01 means a **content** merge against post-fork drift —
  explicitly not a re-run of the pass — and not a literal merge commit. `[MEASURED]`
  `git merge-base scratch/master HEAD` is empty: the histories are unrelated and the scratch root paths
  collide with this repo's root. Record this reading in D-12's amendment so it is not re-litigated.

- **D-33:** Rollback path, stated rather than assumed. Precondition: `git status --porcelain` shows only
  the five known untracked entries. The pre-merge SHA is written to `154-GATE-BASELINE.json` **before**
  applying. Abort before commit is `git checkout -m -- docs && git reset --hard <pre-merge SHA>`; abort
  after commit is `git reset --hard <pre-merge SHA>` on the branch. `master` is never touched. The draft
  contained no rollback, reversibility, or blast-radius statement anywhere.

- **D-34:** The stray root files `e1`, `e2`, `ee` are deleted in a separate housekeeping commit outside
  C1–C4. `STATE.md` directs deletion in whichever v1.22 phase first touches the working-tree root, and
  D-04 makes this that phase.

### Claude's Discretion

- Exact JSON key names and nesting inside `154-GATE-BASELINE.json`, provided `gate_baseline` and
  `landing` remain separable and Phase 156 can diff the former alone.
- Commit message wording for C1–C4, provided C1's body carries both scratch SHAs.
- Whether the `verify2.py` two-line edit ships as its own commit or rides with the baseline capture,
  provided it is separable from the 277-file landing commit.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing planning documents
- `.planning/ROADMAP.md` — Phase 154 goal, the four Success Criteria, and Phases 155-159 which depend
  on this landing. Amended by D-12/D-16/D-17.
- `.planning/REQUIREMENTS.md` — STYLE-01, STYLE-03..06, VERIFY-01 verbatim, the "Validator Constraints
  on Requirement Text" section, and "Out of Scope". Amended by D-12/D-16.
- `.planning/STATE.md` — the LOCKED named decisions from roadmap time, `:135` (the `EEE-SOP-standard.md`
  watch note) and `:136` (the `e1`/`e2`/`ee` housekeeping directive).

### The pass and its record
- `scripts/docs-style/RESUME.md` — the prior record. **Treat as untrusted:** it carries at least one
  documented false claim, and its "Gate after everything" stanza is the authority for what SC#4's five
  components are.
- `scripts/docs-style/sweep3.py` — `:47-49` `KEEP_LINE` (7 alternates), `:89` the em-dash substitution
  (spaced → tight), `:199-204` heading and table-row skips, `:212` `do_em = False`, `:245-247` the argv
  parse.
- `scripts/docs-style/verify-meaning.py` — `:85` `changed_files()`, `:261` the fingerprint,
  `:319` `--dispositions`.
- `scripts/docs-style/verify2.py` — the SC#4 link differ; `:27` and `:41` are D-31's edit sites.
- `scripts/docs-style/pins2.py` — the SC#4 pin differ; `:41-42` hardcode the scratch repo path.
- `scripts/docs-style/_CONTENT-PINS.txt` (562 pins) and `_EMDASH-PINS.txt` (8) — never interchangeable.
- `scripts/docs-style/_DISPOSITIONS.tsv` — the six scratch-path dispositions; D-28 adds a sibling.
- `scripts/docs-style/subs-admin-batch9.tsv` — row 26 is D-23's fix site.

### Validators and pipeline
- `scripts/validation/check-phase-54.mjs` — `:30-31` reads both planning documents live at HEAD;
  `V-54-27` is the assertion D-13 guards.
- `scripts/validation/c17-eee-contract.mjs` — `:81` the `.md` filter, `:526` `walkMd('docs')`.
- `scripts/validation/check-phase-153.mjs` — the current apex.
- `scripts/validation/check-nav-hub-links.mjs` — the only detector that catches a wrong-direction
  android resolution.
- `scripts/pipeline/build-filename-map.mjs` — `:110` `title: cols[3]`; refutes the H1-to-registry
  inference in D-11.

### Precedent
- `.planning/milestones/v1.20-GOV-02-LEDGER.md:64` — Phase 143 D-29, the on-point precedent for
  amending these two planning documents.
- `.planning/milestones/v1.20-phases/141-…/141-01-PLAN.md:24` — D-27 annotate-and-supersede.
- `.planning/milestones/v1.21-phases/153-…/153-CONTEXT.md` — the CONTEXT rigor precedent.
- `.planning/milestones/v1.20-phases/141-…/141-sweep-result.json` and `143-…/.143-edge-coverage.json` —
  the precedent for a generated JSON measurement artifact under a phase directory.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **Content-addressed blob identity across unrelated repos** — the property that makes D-01 work at all.
- **`--dispositions <path>`** already exists in `verify-meaning.py`, so D-28 needs no source edit.
- **`check-nav-hub-links.mjs`** is the one existing detector that catches a wrong-direction resolution.

### Established Patterns
- Annotate-and-supersede for planning-document amendments (Phase 141 D-27), with a
  `check-phase-54.mjs` baseline/re-run rider (Phase 143 D-29).
- Generated JSON measurement artifacts under the phase directory (Phases 141, 143).
- Nav-last convention and registry atomicity — not exercised here, but the reason Phase 154 writes
  nothing to `docs/_registry/`.

### Integration Points
- `check-phase-54.mjs` reads both planning documents live at HEAD and sits on the apex chain, so D-12's
  edits are gated by it.
- `.planning/phases/` relocates at milestone close, so D-19's artifact path must be resolved by Phases
  156 and 158, never hardcoded.
- The two `Stop` hooks in `.claude/settings.local.json` are the reason D-22 exists.

</code_context>

<specifics>
## Specific Ideas

- The structural gate is blind to an unresolved merge — C17 reports 237 files and 0 violations on a
  tree with three live marker blocks. D-21 exists because of that single measurement, and it is the
  clearest instance yet of this repository's standing lesson that validators check shape and never
  meaning.
- Four of the draft's own measurements were falsified by adversarial review. The pattern is consistent:
  each was a plausible reading of a tool taken without executing it (a regex read backwards, a flag
  attributed to the wrong script, a SHA attributed to the wrong commit, a `file` spot check on one file
  of a mixed corpus). Every acceptance criterion in this phase should be executed, not read.

</specifics>

<deferred>
## Deferred Ideas

- **`.gitattributes` `* text=auto eol=lf`** — real hygiene this repo has never had, and HARN-05's
  fresh-clone axis is a genuine unaddressed constraint. Not a merge hazard (the index is uniformly LF).
  → **Phase 159.**
- **Full cross-repo geometry rework of `verify2.py` / `pins2.py`** beyond D-31's two-line minimum.
  → **Phase 156.**
- **`EEE-SOP-standard.md:578` and `:649`** stale provenance citations. → **Phase 157.**
- **`-G` rather than `-S` pickaxe discipline** for equal-count string swaps. → **Phase 158.**
- **Archival-path resolution for `154-GATE-BASELINE.json`** after `.planning/phases/` relocates.
  → **Phases 156 and 158.**
- **Third copy of the runbook H1** at `scripts/pipeline/test-fixtures/01-device-not-registered.md:11`.
  → **Phase 157.**
- **`D:\claude\c17-sandbox`** — 284 dirty entries at the fork point. → **Phase 157, or discard.**
- **Running the fixed `subs-admin-batch9.tsv` over the HP file.** The row fix is Phase 154's; the corpus
  application is batch-10's. → **Phase 156.**

</deferred>

---

*Phase: 154-style-landing-merge-the-verified-google-style-pass*
*Context gathered: 2026-08-31*
