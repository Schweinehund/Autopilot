# Phase 158: Final Corpus Verification & Publish Bundle - Context

**Gathered:** 2026-09-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Prove the fully landed, extended, reconciled and hygiene-corrected corpus: confirm every fix this milestone
claimed against git history rather than a written record (VERIFY-06, SC#2), give every file Phase 157 edited
its style pass and disposition (SC#3), reproduce Phase 156's clean gate with every delta attributed (SC#4),
and rebuild `dist/docs-library-v1.22.zip` fail-closed with a correct manifest, README and both drift canaries
(VERIFY-05, SC#1).

Discharges VERIFY-05 and VERIFY-06.

**Out of scope in both directions.** No harness work, no `check-phase-154..158.mjs` and no v1.22 apex —
Phase 159 authors every v1.22 content-phase leaf (155 D-52). No push of any ref (D-27). No rewrite of
history (owner's call at 159, D-28). The three do-not-edit-ruled defects (`REQUIREMENTS.md:110`, `:128`) stay
untouched even if the audit re-finds them (D-05). No corpus-wide style pass beyond the em-dash close (D-09) and
the five named edits (D-61). A defect found outside the named surfaces is recorded, not fixed.

This CONTEXT was produced by `/gsd-discuss-phase` + `/grill-me` + `/adversarial-review` in **four rounds**
(16 areas; per round 4–5 parallel Finders → Adversary → Referee): 447 raw findings → 417 rulings →
**359 standing** (round 1: 90 rulings / 78 real; round 2: 102 / 84; round 3: 105 / 96; round 4: 110 / 101).
Every `[MEASURED]` row below was executed against this repository at HEAD `937d0a1f` on branch
`v1.22/154-style-landing`; every agent verified `git status --porcelain` byte-identical at start and end.
One Finder's demonstration of the shell-string hazard (D-53) transiently wrote 53 zero-byte files to the
repository root and removed them; the tree was re-verified clean before every later agent ran.

**Twenty-two of the draft's own recommendations were falsified or reversed across the rounds**, among them:
the audit range, the BASE SHA, the pickaxe instrument, the sweep scope, the verify2 sibling (ratified in
round 1, reversed in round 3), a second gate-drift runner, a bundle verifier script, a candidate-enumeration
script, the hand-sequenced commit table, "no remote ref carries any v1.22 commit", "28 already-checked
requirements", and a `[MEASURED]` row whose number and mechanism were both wrong. All corrections below are
load-bearing.

</domain>

<decisions>
## Implementation Decisions

### Area A — VERIFY-06: the claimed-fix audit

- **D-01: The audit range is `4e781fc5^..HEAD`, resolved to a SHA pair at authoring, never `HEAD`.**
  `[MEASURED]` `8de413aa` is itself `docs(154-01): complete …`; `git rev-list --count origin/master..8de413aa`
  = 11, all ancestors of HEAD, all of plan 154-01 — and that set carries a live correction claim
  (`STATE.md` "gate_baseline.sha corrected to 8de413aa"; `154-GATE-BASELINE.json` `/gate_baseline/anchor_note`,
  whose tree-equality claim is git-confirmable: `789a348a^{tree}:docs == 8de413aa^{tree}:docs`). SC#2 says
  "this milestone's phases"; Phase 154 is one. A range ending in `HEAD` resolves differently at every run and
  after the 159 squash `4e781fc5` is unreachable from `origin/master`.

- **D-02: The confirmation instrument is a per-claim before/after occurrence count, never `grep -c`, never
  `git log -S` as the assertion.** `[MEASURED]` D-20's flagship figure is `administrator guide` **42
  occurrences**; `grep -c` sums **39** lines (three lines carry it twice). The falsified HP citation was
  line-wrapped (`HP Sure⏎  Administrator`): `git log -S"Sure Administrator"` returns **0** commits on a fix
  that provably landed (`03d43070` introduced, `bb22f89a` restored) — a naive audit concludes the falsification
  never happened. Joining the blob and collapsing `\s+` to one space gives **parent 2 → fix 0 → HEAD 0**. Every
  count is scoped to `docs/` or the named file (unscoped, `administrator guide` is 54 — 12 in `.planning/`,
  including REQUIREMENTS.md's own D-20 sentence). Directional assertions replace frozen integers except where
  the requirement itself froze one (D-20's 42/19, HYG-05's 5/4/0, HYG-04's 11) or where the row's own defect
  *is* a count regression (D-04). See D-47 for the runner's exact git calls.
  — **Reversibility:** costly — this widens REQUIREMENTS.md:43 D-20 from "this class of fix" to every claim
  and is recorded there by annotate-and-supersede (D-66).

- **D-03: The claim population has seven surfaces, and RESUME.md is audited, not excluded.** In range:
  (1) the 22 `fix(` commits — a commit count, not a claim count: `[MEASURED]` they touch 61 `docs/*.md`
  file-instances and 6 of the 22 touch no `docs/` file (`9c93a2f3`, `655654f2`, `d7a1b297`, `077b29b7`,
  `6689ffc3`, `a7ac71e0`), so rows carry an `evidence_path` distinct from the fix's own path; (2) the **8**
  `[x]` requirement lines carrying revert/correct/restore vocabulary (STYLE-01/03/05, VERIFY-01, RCP-04,
  RCP-07, HYG-03, HYG-04 — VERIFY-06 is `[ ]`; the STD-02 supersession block is a paragraph, not a line);
  (3) SUMMARY / VERIFICATION / REVIEW lines across 154–157 (`[MEASURED]` `grep -Eci 'revert|correct|restor'`
  → 61 / 52 / 58 / 78 raw lines; the draft's 39/18/30/60 reproduced under no reading); (4) the
  `*-GATE-BASELINE.json` notes (`anchor_note`, `/landing/commits/C1/note`, the negative claim in
  `tightEmDash/note`, `fork_point_drift/note`); (5) `.planning/WINDOWS.md` rows (row 15 carries a written
  fix claim with a stated verification command); (6) explicit prior-phase hand-offs by number
  (`157-VERIFICATION.md:118` hands 158 HYG-06's DFCI falsification, which no vocabulary filter can see);
  (7) `scripts/docs-style/RESUME.md`'s ruling tables. On (7): `[MEASURED]` no "48-row table" exists — the three
  Rulings tables hold 13 + 9 + 8 = **30** rows; `f30c37b`, `dc7e996`, `c97d322` are reachable via
  `refs/scratch/heads/master`; the flagship KEEP resolves verbatim at
  `docs/admin-setup-macos/02-enrollment-profile.md:146`; and one row already found false after shipping
  gate-green is the argument for auditing the other 29, not excluding them. Of the 30, `[MEASURED]` ~12 are
  mechanically assertable and 6 FAIL or go vacuous when their literal is retyped from RESUME (RESUME's
  literals are pre-substitution scratch-corpus text: `blast radius` 2 live, `not just` 3, `admins` 26 + 21,
  three KEEP literals at 0) — so needles are **re-derived from shipped corpus bytes at the cited site**, and
  the ~18 non-assertable rows get class-rule disposition rows naming why. The 406-hunk `_JUDGE-VERDICTS.json`
  stays out (REQUIREMENTS Out-of-Scope "must not be re-judged"); `_JUDGE-VERDICTS-batch10.json` is
  `judged: 0` and contributes no row.

- **D-04: The flagship KEEP is a count, not a presence.** `[MEASURED]` `Create a local admin account` occurs
  **twice** in `02-enrollment-profile.md` — `:94` (a sweep-protected setting-name table row) and `:146` (the
  prose echo that was silently expanded at `f30c37b`). `present_at_head` is satisfied by `:94` alone and was
  green throughout the original defect. The row asserts `count_at_head_eq 2` on that file.

- **D-05: A falsified claim is remediated in 158, with a carve-out, and re-enters the whole tail.** The
  already-`[x]` requirement is annotated by annotate-and-supersede (never un-checked in place), the corpus is
  fixed in its own commit, a WINDOWS.md row is logged, and the fix re-enters the sweep, the judge, the binding
  audit, SC#4's after-half and the bundle (D-70). Carve-out: the three defects behind the standing
  do-not-edit ruling (`REQUIREMENTS.md:110`, `:128`) — one is the falsified cell at
  `docs/operations/patch-management/00-overview.md:57`, the same file as HYG-04's `:101` fix — are annotated
  only. A claim git cannot confirm ("corrected *to X*, where X is right") is a named class (D-40).

- **D-06: SC#2's "before the corresponding requirement is checked off" is retroactive for the 31
  already-`[x]` requirements and is amended, not narrated.** `[MEASURED]` `- [x]` = 31 (STYLE 6, VERIFY 4,
  RCP 10, STD 4, HYG 7); `- [ ]` = 8. Confirmation precedes VERIFY-05/06's own check-off; for the 31 it is a
  retroactive audit. Recorded as a `[SUCCESS-CRITERION AMENDMENT]` block in both planning documents (D-66).

- **D-07: The audit instrument is terminal and declared so now.** A count-equality runner over `docs/` is a
  milestone-lifetime assertion of exactly the shape `carve-gate.mjs:5-12` warns against; it is never an apex
  member and is retired or frozen at 159 (157 D-32). Phase 159 may re-run it as a check; nothing under
  `scripts/docs-style/` is read by any validator or workflow (`[MEASURED]`).

- **D-08: The 2 modal-changed hunks are judged; the 7-vs-2 gap is the documented modal-bag filter.**
  `[MEASURED]` `verify-meaning.py` prints `JUDGE WORKLIST: 7` and `judge-packets.py` emits **2** at the same
  BASE; `judge-packets.py:10-16` and REQUIREMENTS.md:39 both state the raw worklist is deliberately
  over-inclusive and the second step drops hunks whose modal bag survived. Nothing to reconcile.

### Area B — SC#3: the style pass over Phase 157's edits

- **D-09: The em-dash class is closed corpus-wide — 31 edits on 28 lines in 15 files — via the unmodified
  `sweep3.py` and `subs-emdash-batch10.tsv`, not "apply the 21 in the 59".** `[MEASURED]` a scratch apply
  reproduces 31 / 28 / 15 with the protection census `6539 table row / 384 cited verbatim quotation /
  123 heading line / 92 agent speech script / 29 UI label line / 4 validator-pinned string` (the census is
  per rule set — the base set reports 31 pinned plus a blockquote-cap bucket — so every citation names the
  TSV). Applying only the 21 inside the 59 would tighten AOSP 10/12/13 and leave the byte-identical clause in
  09/11 spaced — an asymmetry this phase would author; STYLE-05 names tight prose the landed canon; 156 D-22
  deferred the class as scope, not as a ruling that prose stays spaced. The 6 files outside the 59
  (`_registry/RE-index.md`, `09-aosp-realwear`, `11-aosp-pico`, `end-user-guides/android-work-profile-setup`,
  `l1-runbooks/01-device-not-registered`, `recipes/02-shared-ipad-full-provisioning`) each get a `drift[]`
  row (D-51); none of 156's 13 targets and neither armed validator sentence is touched. `RE-index.md:269` is
  a prose bullet, so both canaries are re-asserted at 237 in the same commit (D-71). All 36 rule sets exist
  (not 34); the two the count excluded produce 19 of the 21 in-59 edits.
  — **Reversibility:** costly — 15 files, 6 outside the phase's enumerated surface; reverting means
  re-opening the 156 handoff with its measurements.

- **D-10: `via apt` → `using apt` at `docs/index.md:305` and `docs/operations/00-index.md:28`, by hand, never
  `through`.** `[MEASURED]` five rule sets (`subs-decisiontrees` + four `subs-via-*`) fire their terminal
  blanket `via→through` row on these sites; `RESUME.md:518` rules the package-source sense `via` → `from`,
  "not `through`", and `subs-via-sense.tsv:6` maps the tool sense to `using`; ``through `apt` `` has zero
  corpus occurrences as a de-`via` form (the three hits are ``through `apt install <pkg>` ``, a command
  sense). The third `via apt`, `docs/reference/linux-capability-matrix.md:112`, is a protected table row in a
  file neither pillar touched: no edit, no disposition row, one `note` on the `using apt` audit row. Every
  `via apt` needle is path-scoped to the two hubs; never corpus-wide.

- **D-11: The 59-file list is `git diff --name-only 3a5c74b6^..937d0a1f -- docs/`, byte-identical to
  `d0b611e8..937d0a1f`; 157's last `docs/` commit is `9a68aa1a`, not `19b352d7`.** `[MEASURED]` 59 files
  (25 in the bundle, 34 outside — the largest outside group is **14** `cross-platform/apple-business/*` files,
  then `docs/operations/`, `_templates/`, `_standards/`, `v1.9-DEFERRED-CLEANUP.md`); 184 added lines
  (**27** blank, 24 mask-blanked template bullets, 11 headings → 122 scannable / 62 non-dispositionable);
  zero overlap with 156's 13. Non-`docs/` files 157 edited (`check.py`, `SKILL.md`, the two pin files,
  `RESUME.md`, `check-prose-style.py`, `CLAUDE.md`) are outside the sweep but inside the audit (D-03).

- **D-12: BASE for `verify-meaning.py`, `judge-packets.py` and the dispositions sibling is `d0b611e8`, bare.**
  `[MEASURED]` `090ca859` (156's recorded `after.sha`) does not bound Phase 157: `bb22f89a fix(156)` lands
  after it (`git merge-base --is-ancestor 090ca859 bb22f89a` → true), dragging `firmware-oem-matrix.md` into
  range — 60 files / 14 undispositioned / 7 worklist hunks versus 59 / 13 / 6 at every other candidate.
  `d0b611e8` is the parent of `e6930d25`, 157's first content commit — 156 D-17's exact shape — and excludes
  157's own planning commits, which demonstrably emit hunks. At that BASE: 9 `docs/` findings (8 template
  `[htmlcomment]` from 157 D-30's wiring comment, 1 `08-cope-full-admin.md` `[htmlcomment]`) and 4
  `.planning/` findings; 2 judge packets (`drift-migration/02-macos-drift-detection.md:116`,
  `03-ios-android-drift-detection.md:130`, both the deleted `will`-bearing HYG-02 parenthetical).

- **D-13: `_DISPOSITIONS-158.tsv` (scripts/docs-style) holds only verify-meaning fingerprint ids — the 9
  `docs/` findings each with a reason; the 4 `.planning/` findings attributed in the header, never padded.**
  Criterion: 0 undispositioned `docs/` findings. `_DISPOSITIONS-batch10.tsv` and `-docs.tsv` stay
  byte-unchanged (`[MEASURED]` batch-10 carries zero data rows; `load_dispositions` silently *accepts* a
  multi-column row, so the separation ground is the key space, not parsing).

- **D-14: Version History rows and freshness: EEE-SOP gets a new dated VH row for its correction (its own
  v1.19 HYG-05 precedent, "the prior claim was empirically false"); the glossaries get none (9a68aa1a's
  same-entry precedent); no swept file gets a row; `last_verified`/`review_by` are not advanced anywhere**
  (owner ruling; 157's 2026-08-25 ruling carried the same way).

- **D-15: Every intra-phase byte comparison is CR-insensitive; `.gitattributes` gains no `text=auto` in 158.**
  `[MEASURED]` `sweep3.py:240` writes with `newline=None`, rewriting every LF file to CRLF on Windows (29 of
  the 59 are LF; a one-line edit on `10-aosp-zebra.md` reports `1,225c1,225` on a bare diff); `core.autocrlf
  = true` at system scope normalises it at `git add`, and C17, nav-hub, the apex, verify2 and check.py all
  normalise on read, so no gate the phase runs sees it — but the 5-vs-16 attribution and the sweep's own
  byte-identity assertion (D-32) must use `tr -d '\r'`. Adding `text=auto` mid-phase renormalises the corpus —
  exactly the mass drift SC#4 forbids (Phase 159, per 154).

### Area C — SC#4: the drift accounting

- **D-16: The structural gate has five components and the pin differ has already moved: 562 → 563.**
  `[MEASURED]` `_CONTENT-PINS.txt` = 563 (`83660691 feat(157-07)` pinned `## Prose Style Authoring
  Standard`), `_PINNED-HEADINGS.txt` 186 → 187; `pins2.py scripts/validation docs` live arm = 685 pinned,
  0 lost / 0 added vs `156-LIVE-PINS-after.txt` (blind to the `.py` gate's pin by construction). STYLE-06's
  "562 pins" is superseded (D-66). C17 237/0, apex 111/0/0, nav-hub 0/0 and check-phase-54 32/0 are unchanged
  at HEAD; verify2 Part A moved **down** (6382 → 6130 / 3713 → 3493 / 2669 → 2637) because 15 more files joined
  `LINE COUNT DIFFERS` (6 → **21**) and Part A skips them — an explanation, not a regression; Part B resolved
  6304 → 6319, missing anchor 454 → 455, **INTRODUCED 1**.

- **D-17: SC#4's "reproduce" is a re-run plus attribution, and it is recorded as a substitution.**
  `[MEASURED]` 156's recorded `verify-meaning.py 987770f8 --dispositions _DISPOSITIONS-batch10.tsv` no longer
  returns 0 `docs/` findings (14 undispositioned, 9 `docs/`), and 156-VERIFICATION's "4, all `.planning/`"
  is now 5. The phase re-runs 156's recorded commands, attributes every delta in `drift[]` (D-51), proves 0
  undispositioned `docs/` findings at BASE `d0b611e8` with the 158 sibling, and records the three declined
  alternatives (disposition into the batch-10 file; fix the 8 template comments at source; reproduce against a
  156-era worktree). The mechanical residual (`sweep3.py docs _CONTENT-PINS.txt` = 1, the citation-blocked
  `desired` site) reproduces; the 36-sets-over-the-13 = 0 reproduces — by luck of the `(?<!Sure )` guard, since
  `firmware-oem-matrix.md` *is* one of the 13 and *was* edited at `bb22f89a`; the unscoped 36-set reading moved
  37 → 50 (+13, all in the 59) and is recorded in a `deterministic_slice` block, never in `components`.

- **D-18: verify2's INTRODUCED 1 is a named, attributed blind-spot item; verify2.py stays byte-unchanged; no
  sibling is built.** `[MEASURED]` the item is `docs/admin-setup-apv2/03-device-preparation-policy.md →
  ../operations/patch-management/08-windows-app-updates.md#eam-store-winget-routing`, introduced by
  `97f7ca28 fix(157-05)` (157 D-39's deliberate explicit-anchor link); the anchor is live at
  `08-windows-app-updates.md:251`; `check-nav-hub-links.mjs` (code at `:169`, not the comment at `:142`) unions
  explicit `<a id>` values and reports 0. Of verify2's 289 distinct missing-anchor items at HEAD (454/455 are
  occurrence counts), **284** are the explicit-anchor class; the remaining 5 are 2 inside a ```markdown fence
  at `EEE-SOP-standard.md:542-549` and 3 in `docs/_templates/`, which the checker skips as a source (`:280`).
  The discharge is the item, its class, its commit, and the checker's 0/0 at both ends — with the BASE half
  obtained by running the **HEAD** `check-nav-hub-links.mjs` with cwd set to a `git worktree` of BASE (the
  checker is fully cwd-relative; no new tool, same resolver held constant). The round-1 sibling ruling is
  superseded here. Also fix the live doc defect at `google-style-verify/SKILL.md:54` (D-43).

- **D-19: `158-GATE-BASELINE.json` has three columns — `phase156 / before (fresh at 158's start) / after` —
  and every read across archival goes through `_lib/archive-path.mjs`.** `[MEASURED]` 156's own `before`
  carries its own SHA (`0425921b`) and differed from 154's after; embedding 156's `after` as 158's `before`
  would double-count (8 metrics already differ). `embedded_156` carries `values`, `source_sha`,
  `source_content_hash` and a `rederivation`; `157-BASELINE.json` (note the naming break) is embedded too.
  `resolveArchivedPhasePath(suffix, ['v1.22-phases'])` is exact-suffix, live-first, globs nothing and returns
  `null` (default `['v1.5-phases']`), so no `on_many` branch is added and the caller exits loud on `null` —
  which turns the unverifiable `v1.22-phases` token (`check-phase-125.mjs:86` has carried a wrong token, green,
  for two milestones) into a loud failure at archival. `path_note` is carried verbatim from the predecessors.
  Dropped from `components`: `check-phase-135` (its surface is untouched; it runs in full under the apex, 0
  NESTED refs) and the sibling. `check-phase-54` moves to `final_apex` (D-54). `checkpy` (`[MEASURED]` 10,427
  at HEAD, 10,402 at 157's base; moves on every prose byte; `check.py:161` prints one total line) is
  recorded outside `drift[]`, never asserted.

- **D-20: Every `drift[]` row carries `{cmd, args[]}` — never a shell string — plus a declared extractor and
  comparator.** `[MEASURED]` 4 of 156's 5 component invocations are pure argv (`node …c17`, `node …153`,
  `node …nav-hub`, `python verify2.py <sha>`); only pin-differ and checkpy need in-process composition. A
  Finder ran 157's recorded `check.py --no-headings $(git ls-files 'docs/*.md')` through `bash -c`: the
  substitution expanded to 294 lines, bash executed lines 2–294 as scripts, and the corpus's own bare
  Platform-blockquote lines became redirections — **53 zero-byte files in the repository root**, removed by
  hand. Comparators: equality for C17 / apex / nav-hub / pins; directional for verify2 Part A.

- **D-21: `unattributed_rows`, not `unattributed_count`, computed by the existing audit runner with per-row
  `evidence` (`git show --name-only <sha>` touches the row's file); no second `gate-drift.mjs`.** A
  self-typed zero is the written record VERIFY-06 forbids; re-executing ~331 s of gates in a second tool
  proves only determinism (`[MEASURED]` one half: apex ~20 s, verify2 26 s, check-prose-style 73 s, check.py
  64 s, verify-meaning 41 s, the 37-invocation idempotency sweep 77 s). Gate values are measured once and
  recorded; the evidence check falsifies a wrong attribution and does not prove causation, and says so.

### Area D — VERIFY-05: the bundle

- **D-22: `node scripts/pipeline/build-publish-bundle.mjs --version=v1.22`, in its own Bash invocation with
  the 600 000 ms cap and nothing else, stdout+stderr to `158-BUNDLE-RUN.txt`.** `[MEASURED]` 1,424 ms/doc
  convert + 145 ms/doc guard → ~390–410 s for 237 documents, ~1.5× headroom (the draft's "5–6 min from zip
  timestamps" saw only the convert pass); the inner `timeout: 120000` at `:482` bounds only
  `Compress-Archive`. Pre-run: the pandoc pin (`pandoc --version` line 1 == `convert.ps1:43`'s
  `$expectedVer = '3.7.0.2'`; `pwsh --version` 7.6.5), the `dist/` and staging inventories (45 stale `.docx`
  from the killed 2026-08-30 run sit in `.pipeline-output/publish-staging`; the tool's `rmSync` at `:385`
  runs only after six exit-1 preflight gates). Recovery on timeout: remove the staging dir and any
  `dist/*.tmp`, re-run. The assertions and the record commit run in a second invocation — consistent with the
  single-invocation rule because the bundle changes no tracked byte by contract (D-24) and both project Stop
  hooks are `allow` throughout the phase (D-71).

- **D-23: Twelve inline assertions, no `verify-bundle.mjs`** (both precedents ran inline — 152-02 22 rows,
  153-14 three; round 3 reversed two new-tool proposals of this profile): (1) `unzip -Z1` = **239** entries —
  237 matching `^[a-z0-9-]+\.docx$` + `manifest.csv` + `README.md`, no directory entries, list recorded;
  (2) README byte-equality by extracting it from the v1.22 zip and from `dist/docs-library-v1.21.zip` and
  `cmp` — never by importing the module (`[MEASURED]` `readmeContent()` is a version-independent 1513-byte
  constant, identical in the v1.20 and v1.21 zips; the module reads the **importer's** argv at load and can
  `process.exit(1)` there); (3) `git diff --exit-code -- scripts/pipeline/filename-map.md` first (config-robust;
  the worktree file is CRLF and blob equality rides `autocrlf`), then `rev-parse`/`hash-object` blob equality;
  (4) `git diff --quiet HEAD -- scripts/pipeline/` — no 158 commit touched the pipeline; (5) manifest header
  `RE-ID,Output Filename,Status,Last Verified` + 237 rows, RE-ID set == the registry's Approved set — the only
  assertion needing code, a `node -e` importing `parseRegistry` from `build-filename-map.mjs` (its main is
  guarded); (6) blank-`Status` rows **⊆** `{RE-228 … RE-236}` (`[MEASURED]` exactly 9 at HEAD, accepted-not-fixed
  under 152-02 D-28), named once in the SUMMARY citing `RE-index.md:266`; (7) **both** `--self-test`s green and
  both canaries at 237, quoted verbatim — SC#1's fourth limb (`[MEASURED]` 15/15, 8/8; canary (a) is
  `build-publish-bundle.mjs:515-527`, the other is `build-filename-map.mjs:274-286`; self-test (c) at `:556-571`
  is a synthetic coverage test, not a canary); (8) pre/post `dist/` inventory: the v1.22 zip ∈ post and
  `post \ pre ⊆ {that name}` — never "exactly one new file", which is RED on the mandated rebuild
  (`renameSync` overwrites); (9) `! -e dist/docs-library-v1.22.0.zip` (`deriveZipName` accepts three parts;
  the `v1.21.0`/`v1.21` pair exists) and `! -e dist/*.tmp`; (10) staging holds exactly 237 `*.docx`
  (extension-filtered — a completed run leaves 239 files); (11) `git status --porcelain --untracked-files=no`
  empty, un-pathspec'd, plus the identical 9-entry untracked set (2 of them under `.planning/`); (12) the
  pandoc pin pre-check. Dropped: mtime (`renameSync` preserves it). Plus K20's disposition row for the
  README's "entire Approved documentation corpus" sentence citing D-31's shipped remedy at RE-237 `:219-221`
  (inside the bundle; `assets/` sit outside `docs/` by owner ruling, so the sentence is not false).

- **D-24: Evidence: `158-BUNDLE-RUN.txt` (verbatim), `158-BUNDLE-MANIFEST.csv` (a citation copy), the zip's
  size and SHA-256 inside `158-GATE-BASELINE.json` outside `drift[]` labelled non-reproducible** (`[MEASURED]`
  `Compress-Archive` stamps per-entry DOS times and pandoc embeds a build timestamp). Proof of the bundle's
  harmlessness is `filename-map.md` blob equality plus the corpus identity `git diff --exit-code <after.sha>
  HEAD -- docs/ scripts/pipeline/` evaluated on the **post-bundle** tree.

- **D-25: Sibling zips in `dist/` are left untouched; the phase asserts only the two names in D-23(9).**
  v1.22's HARN-05 contains no bundle rebuild, so this zip is the milestone's only one; creating it disarms
  `publish-bundle-gate.cjs`'s `zipExists` guard (`:93`) for 159's close — recorded, not acted on.

- **D-26: Order — the bundle runs after every `docs/` and `docs/_registry/` edit, after SC#4's after-half,
  and before the flip** (144 D-29). `[MEASURED]` `build-filename-map.mjs` slugs the registry **Title** column
  at `:297-299` before staging; RE-index holds 12 spaced em-dashes inside Approved Title cells, all
  sweep-protected table rows; an authoring invariant "no 158 commit edits a registry Title cell" is asserted
  in the sweep commit, and D-23(3) fails closed at C12 on any rename.

### Area F — Push and history

- **D-27: No push of any ref in Phase 158.** `[MEASURED]` the repository is **PUBLIC**; the 9-character host
  label `077b29b7` removed is absent from every tracked file at HEAD, present in exactly one file at
  `9a114815`, touched by exactly two commits, and `git branch -r --contains 9a114815` is empty; all 18
  workflows have `workflow_dispatch` + `schedule` + `pull_request` and **0** `push:` triggers, so a push buys
  no CI by itself (Axis-2 is push-then-dispatch against `master`, 153-EVIDENCE.md:914, :1065). Seven v1.22
  planning commits (`c44c26b8 … c4088fc0`) are already on `origin/master`; `origin/master…master` = 0 / 11,
  HEAD 152 ahead. The value was never printed by any agent in this discussion and must never appear in any
  158 artifact (D-31).
  — **Reversibility:** one-way — a push of a ref containing `9a114815` publishes the value; removal from a
  remote is not removal from history.

- **D-28: The history decision is Phase 159's (HARN-06); Phase 158 records it with the cost measured and
  the squash merge recommended.** The residual is already owner-accepted at `AR-155-01` ("removal from HEAD is
  not removal from history", 2026-09-03); `077b29b7`'s body is quoted verbatim in the amendment — *"Never
  pushed: the branch is 50 commits ahead of origin/master and no remote ref contains these commits, so the
  value reached no public remote. It does remain in local history at `9a114815`; scrub before this branch is
  first pushed."* `[MEASURED]` all **19** `MILESTONE_CLOSE_SHAS` (incl. `e129081e`, HARN-01's V121 anchor) and
  `check-phase-139`'s `FIXED_SHA` are ancestors of `master`, and `master` (`8de413aa`) is an ancestor of
  `9a114815` — so a squash/single-commit merge to `master` publishes a history in which `9a114815` is
  unreachable from any pushed ref, with zero frozen-SHA invalidation and zero dangling harness reads; the only
  cost is that 158's private audit cannot `git show` branch SHAs from an `origin/master` clone (nothing reads
  it). A rewrite at `9a114815` changes 103 strict / 104 inclusive commits and ~60 % of the commit SHAs cited
  in the 155–157 artifacts (over the named file set: 115 valid / 70 descendants), and 104 of the 155 commits
  in 158's own audit range — so it would have to precede the binding audit, and is not recommended.
  Recorded at REQUIREMENTS.md:90, ROADMAP.md:254 and a new `- [Phase 158]:` STATE bullet (D-66); the
  ROADMAP "Depends on" line at `:246` is **not** appended to (`init.cjs:2055` parses the whole line).

- **D-29: A `git bundle create <path on C:, outside the repo> --all` plus `git bundle verify` is an owner
  action, never committed, never gitignore-exempted, and registered as a threat in its own right** — it
  packs `9a114815` as an opaque carrier no grep or C17 sees. `[MEASURED]` `f8750c6d` committed a 1,701,557-byte
  bundle *into* the index (`.planning/artifacts/154-scratch-corpus.bundle`, tracked) — an anti-precedent;
  `D:` is the repository's volume, `C:` has 8.5 GB free.

### Area G — Threat model and secure-phase

- **D-30: Every plan carries a `<threat_model>` block in the 157 shape with the real column names
  (`Threat ID | Category | Component | Severity | Disposition | Mitigation Plan`), a real STRIDE category and
  a severity on every row, a `## Trust Boundaries` sub-table, and a `-SC` package row; ASVS 1, `block_on:
  high`.** `[MEASURED]` `.planning/config.json` carries no security keys (defaults apply). "Injection" is not
  STRIDE (Tampering).

- **D-31: The named threats.** T-01 Information disclosure — the audit's needle column, run log or any
  artifact re-leaks the host label; mitigation: `secret: true` rows carry no literal, recovery scoped to the
  row's `path` requiring exactly one removed content line (fail loud otherwise — `[MEASURED]` `077b29b7` has
  2 files each with 1 removed content line, only one carrying the label; a token-novelty tiebreak picks the
  wrong file), **no `git log -S` for secret rows** (a Finder saw a marker on git's argv in the process table on
  the first poll), and before every commit a negative-control grep of every 158 artifact with an in-memory
  positive control (never a file on disk carrying the label). T-02 Tampering — a false claim crosses
  repository prose → published SharePoint corpus for all 237 documents; mitigation: the audit, the judge, the
  corpus-consistency assertions; residual accepted for external facts (D-40). T-03 Spoofing —
  `158-GATE-BASELINE.json` / the run log as self-asserting records; mitigation: `unattributed_rows` with
  runner-computed evidence; the run log emitted from the committed bytes. T-04 Tampering — data-driven git
  argv in the runner; mitigation: `execFileSync`, `--` terminator, no shell, needles never interpolated.
  T-05 Repudiation — a killed bundle run indistinguishable from success; mitigation: D-22/D-23(8)(10).
  T-06 Tampering — `filename-map.md` silently rewritten; mitigation: D-23(3)(4). T-07 Tampering — planning
  amendments tripping V-54-21 / the Platform-token walkers; mitigation: check-phase-54/55/56 before and after
  (D-68). T-08 Tampering — the sweep rewriting a quoted or pinned string; the "guard prefix" check is vacuous
  (`[MEASURED]` all three em-dash rows are positive lookarounds, which fail *closed* on a wrap), replaced by:
  (i) for each edited line the character before the match is neither whitespace nor `*` and a non-whitespace
  follows; (ii) pins 563 / headings 187 unchanged **and the pin differ run** (not the constant line counts);
  (iii) every edited line byte-identical outside the single tightened dash, CR-insensitively. `[MEASURED]` 0
  of the 28 edited lines sit inside a wrapped quotation. T-09 — CRLF (D-15). T-10 — the `claude -p` judge as a
  write-capable subprocess over corpus bytes with corpus-text-as-instructions; mitigation: the blocklist
  (D-56), prompt + packet pre-assembled into one file, raw stdout captured. T-11 — the hardcoded
  `timeout: 120000` on `Compress-Archive`. T-12 — the bundle-backup artifact (D-29). T-13 (`accept`) — the
  value in unpushed history, citing `AR-155-01` as the pre-existing log entry, with the Step-4 checkpoint
  planned and an `AR-158-NN` row authored in 158's own log (four predecessors closed an `accept` in State B;
  `154-SECURITY.md` self-accepted AR-154-04/05). The wrapped-guard hazard in `subs-batch10.tsv:33`
  (`admin(?!\s+center)` defeated by `admin⏎center`) is a 159/backlog item, not a T-08 gap — 158 applies only
  the em-dash set.

- **D-32: `/gsd-secure-phase` runs after the flip, with the auditor spawned deliberately, and any
  remediation replays the full tail.** All four predecessors' `SECURITY.md` `created` dates follow the
  complete commit; 157's post-complete remediation (`9a68aa1a`) is the precedent. `[MEASURED]`
  `secure-phase.md:83` short-circuits to SECURED when the register is plan-time, ASVS 1 and `threats_open`
  0 — the auditor is never spawned unless the phase spawns it; 157's three deliberate auditors are what found
  the invented glossary claim. The tail on remediation: sweep gate → judge → binding audit at the new SHA →
  SC#4 after-half → bundle rebuild → blob equality + identical untracked set → amendments → apex + 54/55/56
  (157 re-ran neither 54/55/56, verify2, nor a bundle after `9a68aa1a`).

- **D-33: The two-copy skill divergence is real and is an owner action, not a 158 deliverable.** `[MEASURED]`
  `~/.claude/skills/google-style/` lacks 157's 8-line STD-03 docstring and 4-line STD-04 anti-pattern and
  carries a stray `check.py.bak`; `~/.claude/skills/google-style-verify/` does not exist. Only `check.py`
  invocations are path-bound (`check-prose-style.py:130`); a `claude -p` skill load resolves by name. The
  owner may run `cp -r .claude/skills/google-style-verify ~/.claude/skills/` (zero repo diff); 158 records it
  in the hand-off and a WINDOWS row.

### Area H — The Phase 159 hand-off

- **D-34: Placement — tool and tool-data under `scripts/docs-style/`; human records in the phase directory;
  every cross-archival read resolved, never hardcoded.** `scripts/docs-style/`: `audit-claimed-fixes.mjs`,
  `158-FIX-AUDIT.json`, `158-FIX-AUDIT-RUN.txt` (the A4 triple together), `_DISPOSITIONS-158.tsv`,
  `_STYLE-DISPOSITIONS-158.tsv`, `_JUDGE-VERDICTS-158.json`. Phase dir: `158-GATE-BASELINE.json` (with
  `path_note`), `158-BUNDLE-RUN.txt`, `158-BUNDLE-MANIFEST.csv`, `158-JUDGE-PROMPT.md`,
  `158-JUDGE-FINDINGS.md`, `158-SWEEP-DISPOSITIONS.md`. `[MEASURED]` nothing under `scripts/docs-style/` is
  read by any validator or workflow; the machine-read-by-path artifacts all live in phase dirs, and
  `_JUDGE-VERDICTS-batch10.json:13` hardcodes a 156 phase-dir path that stops existing at close — the
  anti-precedent. `check-phase-54/55/56` walk `.planning/` reading `*.md` only, so every phase-dir `.md` is
  committed with a 54/55/56 run and quotes no corpus line verbatim (the V-54-11 URL-ring trap took 54 from
  32/0 to 31/1 on one quoted URL).

- **D-35: The needles Phase 158 declares pinnable for `check-phase-158` (159 authors it — 155 D-52), and the
  ones it declares off-limits.** Pinnable: `scripts/docs-style/audit-claimed-fixes.mjs` present + `--self-test`
  exit 0; `_DISPOSITIONS-158.tsv` present with ≥ 1 data row (a `scripts/` presence needle beside `docs/`
  needles is what 153 D-22 asks for; it bars scripts-*only* leaves); `docs/index.md` contains
  `and Linux update delivery using apt and unattended-upgrades`; `docs/operations/00-index.md` contains
  `using apt and unattended-upgrades` and `5-platform comparison hub for update enforcement`;
  `docs/operations/patch-management/00-overview.md` contains `[Linux Update Delivery](05-linux-update-delivery.md)`;
  corpus-wide `4-platform comparison hub for update enforcement` == 0 (`[MEASURED]` a bare `4-platform` is
  legitimately present at 9+ sites and `5-platform` pre-existed the fix — the link-presence needle passes on
  the *unfixed* corpus); `updated 2025-06-17` == 11 in `docs/` paired with `2026-06-19` == 0 outside
  `review_by:` (5 such lines); `15 deployment rings` == 5, `300 Autopatch groups` == 4, `300 groups` == 0;
  occurrence-aware full-heading needles — `## Prose Style Authoring Standard` ×1 and each of
  `### D-01: The non-gate rule` … `### D-05: Tooling pairing and its risks` with its expected count
  (`[MEASURED]` `### D-01:`…`### D-04:` occur three times each and `### D-05:` twice in `EEE-SOP-standard.md`),
  the five glossary H3s by full text with counts (`_glossary.md:326,332,338,344`; `_glossary-linux.md:141` —
  none is a sweep-edited line); every needle proved failable by a scratch perturbation. **Not pinnable:**
  anything under `.planning/` (every v1.21 leaf's runtime prohibition; the roadmap is archived at close), line
  numbers, pin counts, `INTRODUCED`, `LINE COUNT DIFFERS`, zip presence, manifest rows, runner or sweep totals.
  DFCI is not added — it is not new (D-42).

- **D-36: Frozen surfaces — 158 edits no file under `scripts/validation/` except the docstring date-stamp in
  157's own `check-prose-style.py` (D-45), and no `_lib/`.** `verify2.py`, `sweep3.py` and every `subs-*.tsv`
  stay byte-unchanged (`using apt` needs no rule: no `via→through` row can re-fire on text with no `via`). The
  K25 fix to `.claude/skills/google-style-verify/SKILL.md:54` touches a tracked file outside `carve-gate`'s
  `IN_SCOPE_PREFIXES`. HARN-05's predecessor diff at close carries two entries the hand-off names as its
  explanations: `check-phase-135.mjs | 23 +-` (155's D-00a exception, `STATE.md:218`) and
  `check-prose-style.py | 474 ++` (+ the date-stamp).

- **D-37: What 158 hands 159 as its "before".** The final content SHA; the apex triple (check-phase-153
  111/0/0 — the only apex until 159 ships v1.22's); C17 237/0; nav-hub 0/0; `check-prose-style.py` exit 0
  (registered in no chain or workflow — 158 re-runs it by hand; its docstring exclusion record goes stale
  under the em-dash close and is date-stamped, D-45); the 4 attributed `.planning/` verify-meaning findings;
  the 6 outside-the-59 files; the HARN-06 blocker with D-28's figures and the fact that `e129081e` is an
  ancestor of both `9a114815` and `master`; 157 D-32's assertion (c) parked for `check-phase-157.mjs`; that
  **zero** leaves exist for 154–158 (only `check-phase-150..153`); the judge's structural blindness (D-58);
  and that the two project Stop hooks live in gitignored `settings.local.json` and reproduce in no clone.

### Area I — Phase 157's own prose and the unconfirmable class

- **D-38: Every one of the 59 files is dispositioned; the disposition table is what VERIFY-06 mandates, not
  the ledger it forbids.** REQUIREMENTS.md:43's "prefer a detector over a ledger entry" is scoped to *claimed
  fixes*; the same requirement says "every file edited by the HYG pillar is dispositioned". STD-03's target
  is the 9,363-candidate corpus gate, not new prose. Record shape and scope in D-59–D-62.

- **D-39: Passives are never rewritten to invent an actor, and a glossary definition is no exception.** STD-04
  (`REQUIREMENTS.md:69`) and the shipped D-03: the reader is the ruled default actor; a named system is named;
  a withheld actor is flagged and kept. The draft's "'you' is wrong inside a glossary definition" was
  unsourced and inverted 157's own ruling — and in 158 the passive class stays `KEEP-FLAGGED` in full (D-61).

- **D-40: "Corrected *to X*" claims split into three kinds.** `corpus-consistency` — assert what the corpus
  can prove: HYG-04 `[MEASURED]` the Autopatch URL is cited 12 times, 11 carry `updated 2025-06-17`, 1 is the
  undated `## External References` link (157 D-42's disposition), `2026-06-19` occurs 0 times outside
  `review_by:`; HYG-05 `[MEASURED]` `15 deployment rings` ×5 + `300 Autopatch groups` ×4 on 7 lines in 3 files,
  `300 groups` ×0; HYG-01 via D-35's four site-scoped needles (both "link present" and "`5-platform` present /
  `4-platform` absent" are false at the unfixed corpus). `external-fact` — the date or limit itself: cite 157
  D-41's rendered-bytes method and control as `verified_by`; never re-fetch (a re-fetch is a new
  measurement, and `ms.date` can legitimately move). `replace` (not "deletion") — `9a68aa1a` is 1 insertion /
  1 deletion; its needle works, and its replacement text is handled by D-44.

- **D-41: The falsified sentence at `EEE-SOP-standard.md:662` is fixed in 158** (line `:660` is the
  `### D-05:` heading — a needle line). `[MEASURED]` "the two are byte-identical today" is false (D-33) and
  "both skills exist in two copies" is contradicted by the same sentence's own later clause. The point-in-time
  claim is removed, not re-measured; the target states the divergence as measured: the `google-style` skill
  exists in two copies — a user-level copy outside the repository and this tracked project copy — which have
  already diverged; `google-style-verify` exists only as the tracked project copy, so a session that loads
  only the user-level copies has the rewriter without the verifier.

### Area J — The remediation manifest (the non-sweep edits 158 owns)

- **D-42: R1/R2 — `EEE-SOP-standard.md:662` (D-41) and `:658` "EEE structural sections above" → "the
  preceding EEE structural sections" (`accessibility.md:160`, R2 ruling 10's mandatory `above` EDIT), one
  commit with a new dated VH row; gate C17 237/0, check-prose-style PASS, nav-hub 0/0, the pin differ.**
  `[MEASURED]` no pin and no validator carries either sentence; `check-phase-120`'s needle is the v1.16 STD-04
  heading at `:402`, 256 lines away (not a gate). HYG-06's DFCI: `REQUIREMENTS.md:80` still claims six
  authored entries; DFCI existed at `docs/_glossary.md:183` since Phase 149 (`8e5070d9`) — annotate-and-
  supersede to five (D-66); DFCI is not added to any needle set.

- **D-43: R7 — `.claude/skills/google-style-verify/SKILL.md:54-56`: `verify2.py <BASE>`; `pins2.py
  scripts/validation docs > <file>` (`[MEASURED]` the defaults point at `D:/claude/Autopilot/scripts/validation`
  and the scratch corpus `D:/claude/docs-google-style-test`); a Windows-safe path; drop "any output = broken
  pin" (`[MEASURED]` the live-vs-committed differ emits exactly one permanent line, `## Prose Style
  Authoring Standard`, because `pins2.py` globs `*.mjs` only); and `:179`'s superseded "9,363" → the
  "more than ten thousand" phrasing EEE-SOP:646 already uses. No claim that the project copy "diverges
  further" — there is no global verifier copy.**

- **D-44: R3 — `docs/_glossary-linux.md:143` is a corpus-consistency cross-reference, not an external-fact
  fetch.** `[MEASURED]` the Canonical page is already cited with a date at
  `05-linux-update-delivery.md:262` (`**Source:** [How to upgrade your Ubuntu release](…) (Canonical, updated
  2026-07-06)`, pinned by `V-147-ORIGINS`) and `:271-272` states the same claim; the entry's closing sentence
  gains a second link to `05#reboot-handling` (anchor at `05:233`). `[CITED:` is barred — it is a
  provenance-*deficit* marker ("training-knowledge best-effort", 118 uses in 19 files) — and no glossary
  carries an inline `**Source:**`. The hedge is left alone in **both** files: `05:271-276` is already scoped
  ("no first-party page consulted *for this guide* … this guide claims none"), `05:287-290` is a different
  silence, and `9a68aa1a` deliberately mirrored the guide's hedge. Lands before the sweep (`:143` is also the
  file's single em-dash edit); gate check-phase-49 22/0 (five H2s, collision note, reciprocal link — not body
  prose), C17, nav-hub, check-prose-style. No VH row (D-14).

- **D-45: R6 — `check-prose-style.py:50-58`'s exclusion record is date-stamped, never re-measured and never
  deleted.** `[MEASURED]` only `person-first` has a committed producer (`compute_unprotected_person_first`);
  the em-dash pair (both halves, 3,123 / 832) and the directional pair (both halves, 207 / 96 — `:658`'s
  `above` is one of them) move under 158 and are not re-derivable. One appended dated line says so; the
  gate's assertions read none of the figures (`--self-test` + full run PASS is the gate, and cannot detect a
  stale number — stated).

- **D-46: Planning amendments and flips are harness-shaped (D-66–D-68); the deferred list is complete
  (D-72).**

### Area K — The audit JSON and runner

- **D-47: `scripts/docs-style/158-FIX-AUDIT.json` + `audit-claimed-fixes.mjs` + `158-FIX-AUDIT-RUN.txt`.**
  Row: `{id, source:{kind, ref}, claim (≤ 200 chars; secret rows redacted), kind: corpus-consistency|
  external-fact|replace|deletion|secret, fix_sha, path, evidence_path?, needle (literal, never regex; null
  for secret), assert:[{op, value?}], verified_by?, note?}`; `range` a resolved SHA pair; `authored_at_sha`
  and the run log's SHA stated as the **parent** of the recording commit (HEAD equality is unsatisfiable by
  construction); `source.ref` records a ruling's identity, never a line number. Ops: `present_at_parent`,
  `absent_at_parent`, `present_at_head`, `absent_at_head`, `count_at_head_eq`, `count_decreased_vs_parent`,
  `count_increased`, `introduced_then_removed` (both commits located by walking `git rev-list <range> --
  <path>` and counting per blob — no `-S`). Vacuity: at least one side non-zero and the direction matches;
  reject any row whose every count is 0. Instrument, argv only: directory rows →
  `execFileSync('git', ['grep','-o','-F','-e', needle, rev, '--', pathspec])` counting non-empty output lines
  (rc 0 matches / rc 1 zero / rc ≥ 2 throw; `[MEASURED]` `git show <sha>^:docs/` returns a 6-name tree
  listing at rc 0, and `git grep -c` sums lines — 39 vs 42); file, wrapped and secret rows → `git show
  <rev>:<file>`, join, collapse `\s+`, count in process. **Mandatory before every count:** `git ls-tree -r
  --name-only <rev> -- <path>` non-empty (`git grep` returns rc 1 for a bad pathspec exactly as for zero
  matches). Node built-ins only; `--` always; needles never on a shell.

- **D-48: `--self-test` builds a temporary git repo in `os.tmpdir()`** (committer identity set,
  `init.defaultBranch` warnings silenced, Windows pack cleanup handled; `guard-docx` is the tmpdir precedent,
  not a git one) with fixtures carrying LF **and** CRLF blobs (`[MEASURED]` `core.autocrlf=true` at system
  scope; the corpus blobs are CRLF): (a) parent 1 / HEAD 0 → PASS; (b) every count 0 → FAIL; (c) a path absent
  at the rev → FAIL via the `ls-tree` guard; (d) a secret row → the label absent from captured output **and**
  the same assertion failing on an in-memory injected copy.

- **D-49: The run log is committed beside the JSON, tied to it by a row-set hash; the negative-control grep
  has a positive control that never touches disk.**

- **D-50: Every 158-own remediation (D-41–D-45, D-10) is also an audit row — additive ones through
  `absent_at_parent`/`count_increased`, with full-line needles where the old line is a prefix of the new
  (`SKILL.md:54`).** R5's amendments are asserted by check-phase-54/55/56, not by the runner.

### Area L — The gate baseline and the resolver

- **D-51: `158-GATE-BASELINE.json` `phase_baseline`: `sha`, `branch`, `measured_at`, `path_note`, `resolver`
  (helper, roots, on-null exit), `embedded_156`, `embedded_157`, `before`, `after`, `comparison.components`
  (`c17`, `check-phase-153`, `check-nav-hub-links`, `verify2`, `pin_differ`, `check-prose-style`,
  `nav-hub-at-base-worktree`), `deterministic_slice` (sweep3 residual 1; 36-sets-over-the-13 0; the unscoped
  37→50 reading), `recorded` (checkpy total; zip size and SHA-256), `drift[]` rows `{component, metric,
  before, after, attributed_to:[sha…] | "158-sweep" | "158-remediation" | "post-156-close remediation
  (bb22f89a)", cmd, args, extractor, comparator, evidence}`, `unattributed_rows`, `discharge.sc3`,
  `discharge.sc4`, `final_apex_recorded_in`.** Named rows: verify2 `introducedBySweep 0→1` /
  `missingAnchor 454→455` → `97f7ca28`; `LINE COUNT DIFFERS` 6→21 with a post-156-close bucket
  (`firmware-oem-matrix.md`, `bb22f89a`); the 15-file coverage matrix — `[MEASURED]` `_templates/` and
  `_registry/` are in the sweep set, 5 of the 15 are on the LCD list (verify2 Part A is blind to a third of
  the sweep, including all three hand-remediation sites), `RE-index.md` and `operations/00-index.md` are
  C17-unenrolled; pin differ 562→563 → `83660691`; the six outside-the-59 files.

- **D-52: `before` is a fresh measurement at a named SHA at 158's start** — never "C1's parent"
  (`/gsd-plan-phase` commits `docs(158): create phase plan` first).

- **D-53: No shell string anywhere in a recorded command** (D-20's 53-file incident); a recorded command is
  `{cmd, args[]}`.

- **D-54: `after` is measured at the final content SHA on a clean tracked tree
  (`git status --porcelain --untracked-files=no` empty, un-pathspec'd; the 9 foreign untracked entries recorded
  as an identical set — 2 of them under `.planning/`, so a `.planning/`-scoped porcelain check can never be
  empty), before the bundle; the corpus identity is `git diff --exit-code <after.sha> HEAD -- docs/
  scripts/pipeline/` on the post-bundle tree; `final_apex` (apex + check-phase-54/55/56 after the last
  planning-document edit) is recorded in the last plan's SUMMARY, distinct from `after`, which is the SC#4
  comparison point.**

### Area M — The judge

- **D-55: Walk root `docs`, BASE `d0b611e8`, clean-tree precondition, `--chunk-file <prefix> --chunks 1`.**
  `[MEASURED]` `changed_files` diffs BASE against the working tree; root `.` admits `RESUME.md`, the skills,
  REQUIREMENTS/ROADMAP/STATE and `CLAUDE.md` as packet sources (77 files, 18 non-docs); `--chunks` is inert
  without `--chunk-file`; the two hunks are byte-identical, so one judge sees both. Expected 2 packets before
  and after the sweep and remediation — because `packets()` iterates baseline lines and R1/R2/R3/R4 edit lines
  that do not exist at BASE (EEE-SOP is 649 lines at BASE; `### unattended-upgrades` is absent), not because
  "the sweep changes no modal"; only 2 of the 28 swept lines carry a modal and both keep their bag; `can` is in
  neither MODALS set. 156-05's raw-worklist cross-check is restored (the two MODALS sets differ).

- **D-56: `158-JUDGE-PROMPT.md` is 156's bytes retitled, with: the blocklist extended to `157-*` and `158-*`
  planning documents, `_DISPOSITIONS-158.tsv`, `_STYLE-DISPOSITIONS-158.tsv`, `_JUDGE-VERDICTS-158.json`,
  `158-FIX-AUDIT*`, `157-BASELINE.json`, and **`scripts/validation/check-prose-style.py` first** (its
  docstring is 157's full HYG-02 rationale and states the needles must be 0 — an answer key), plus
  REQUIREMENTS/ROADMAP (HYG-02's rationale verbatim); the key enumeration and the `fix` definition widened to
  admit `before_region` and a multi-line fix; one sentence stating the deletion was deliberate; and the `fix`
  rule for a non-PRESERVED verdict on a deletion: a **reword that preserves the expectation without the
  leak-class token, never a reinstatement** (`[MEASURED]` reinstating `entry per ROADMAP)` takes
  `check-prose-style.py`'s class needle 0 → 1 → exit 1). The prompt's SHA-256 is embedded in the verdict
  record; prompt + packet are pre-assembled into one file for dispatch (156's recorded command carries a
  literal `\n` and was never run — `process_count` 0). Committed before dispatch.

- **D-57: One ~10-line tool edit to `judge-packets.py` in its own commit** — `before_region` (every baseline
  line of the containing opcode block) and the `j is None` context window (`[MEASURED]` it collapses to
  `newL[0:5]`, the top of the file) — gated by `git show --stat <commit> -- docs/` empty (`judge-packets.py`
  lives in `scripts/docs-style/`, so a `scripts/validation/` diff is unconditionally empty); no committed
  `--self-test` (a temp-repo fixture for a ten-line fix) — a two-case scratch demonstration recorded instead.
  A judge fix lands with the em-dash count guard (156 D-26), `check-prose-style.py`, the statement that no
  live rule produced the deletion class (156 D-05), and the idempotency re-run, in the same commit.

- **D-58: The judge covers only the 2 modified pre-existing lines and is structurally blind to 157's added
  prose and 158's own remediation text — stated in this CONTEXT and as an explicit line in
  `158-JUDGE-FINDINGS.md` (with an explicit empty statement for VERIFY-03 findings if none).** Not an SC
  amendment: no requirement claims judge coverage of added prose. `_JUDGE-VERDICTS-158.json` carries per-packet
  hash and exit code; verdicts are transcribed from raw stdout captured to a file.

### Area N — The style-disposition record

- **D-59: Two machine artifacts and one thin narrative.** `_DISPOSITIONS-158.tsv` (D-13, verify-meaning's
  fingerprint key space) and `_STYLE-DISPOSITIONS-158.tsv` (scripts/docs-style, underscore-prefixed) keyed
  `file · ord · line@<named pre-edit SHA> · rule · token` (`[MEASURED]` 94 unique keys; 91 without `ord`),
  columns `file ord line rule token verdict ground fix_sha post_line`, **no anchor column** (`[MEASURED]` 20 of
  94 occurrences sit on lines the remediation and sweep rewrite; an anchor is a frozen copy of a live line
  with no staleness gate — the defect `fingerprint()`'s docstring exists to prevent). Verdicts:
  `EDIT | KEEP-PROTECTED | KEEP-BY-RULE | KEEP-FLAGGED | MASK-ARTIFACT | SWEPT | NO-CANDIDATES`
  (`[MEASURED]` of the 19 em-dash occurrences, 5 are `check.py` masking artifacts — `mask_code` blanks a link
  and manufactures the whitespace — 11 are protected table rows, 3 sit on the 2 swept lines; 26 of the 59
  files have neither a candidate nor a sweep edit and get a `NO-CANDIDATES` row so all 59 are provably
  dispositioned). `ground` is the word-list/voice entry's own scope text or the structural class — never
  "product term": `[MEASURED]` `access` is a parser artifact (`(verb)` stripped), `portal` is
  Google-Cloud-scoped, `compliance` is standards-claim-scoped, `Google` verb-scoped, `check` at L144 is the
  verb *verify*, `administrator` ×4 are Android-scope-correct (check.py truncates the entry's Android note).
  The thin `158-SWEEP-DISPOSITIONS.md` (phase dir) carries the arithmetic (184 / 122 / 62), the named range,
  the instrument and `check.py`'s blob SHA, the `--no-headings` disclosure (93 vs 95), the 15 `sweep-file` rows
  with the 6 outside flags, the R1–R4 remediation rows and the README disposition row — and no verbatim
  corpus line.

- **D-60: No enumeration script — `check.py` is imported in-process in the plan task**
  (`check-prose-style.py:167-179` precedent): whole-file hits intersected with the added-line numbers
  `[MEASURED]` reproduce **94 occurrences = word-list 47 / em-dash 19 / passive 25 / directional 3 across 53
  lines in 32 files** with real line numbers. The per-file-fragment method inflates hits per (file, term)
  (93 rows vs 70 flat; the "fence boundary" explanation was false — 0 fences in the 184) and loses line
  numbers. `actionable.py` cannot produce the record (it drops passive and em-dash and excludes `wish`/
  `native`) and is cited only for its term list and the six-line truncation trap. "Reproducible from bytes" =
  the named SHA pair, the ~15-line snippet verbatim, and the `check.py` blob SHA in the narrative.

- **D-61: EDITs are exactly five: `via`→`using` ×2 (D-10), `above` at `EEE-SOP-standard.md:658` (D-42),
  `wish` at `:642`, `native` in `_glossary-linux.md:143`'s neighbourhood — all detector-backed; every passive
  stays `KEEP-FLAGGED`.** The judge is blind to added prose (D-58), a hand edit carries no rule (156 D-05),
  and nothing re-reads the 93 after the phase; more EDITs go to 159 with a judge pass.

- **D-62: The record commit follows the corpus edits (so every EDIT row's `fix_sha` and `post_line` are
  real), and the re-proof at the post-edit SHA has three limbs:** (i) whole-file `check.py` on the edited
  files — each EDIT row's `(rule, token)` no longer fires on its `post_line`; (ii) every non-EDIT row's line
  byte-identical between the pre- and post-edit SHAs, CR-insensitively — the staleness gate; (iii) the same
  instrument over the **same immutable range** with files read at the new HEAD totals `94 − Σ EDIT`. The
  range's `to` endpoint never moves (it would ingest 158's own prose).

### Area O — The bundle assertions

- **D-63: The twelve assertions in D-23 are recorded as a table in the plan and in the plan task's
  automated verify block, with results quoted verbatim in the SUMMARY; the README byte-equality never imports
  the module** (D-23(2)).

- **D-64: Assertion 5's `parseRegistry` import from `build-filename-map.mjs` is safe (its main is guarded);
  `build-publish-bundle.mjs` is never imported** (`:34-40` read the importer's argv; `:63-70` call
  `deriveZipName` at load outside the guard).

- **D-65: The bundle run has no `--self-test` scratch zip and no new zip writer** (`ooxml.mjs` only reads;
  there is no zip writer in the repository).

### Area P — The planning-document amendments

- **D-66: Six annotate-and-supersede blocks, all in the `**[SUCCESS-CRITERION AMENDMENT, D-NN]**` shape in
  both documents** (`[MEASURED]` `[AMENDED` has zero precedent; the token appears at ROADMAP `:88 ×2, :89,
  :90, :121, :153`), each carrying `[MEASURED, plan 158-NN]` with its command named, no placeholders, no
  `05-compliance-policy` filename literal (V-54-21 — the only V-54 assertion that reads these files, together
  with V-54-32) and no bare Platform blockquote token:
  REQUIREMENTS.md `:32` STYLE-06 (562 → 563, `83660691`; the `_EMDASH-PINS.txt` clause stands — D-16);
  `:43` VERIFY-06 (D-20 widened to every claim — D-02; the retroactivity clause for the 31 — D-06; the SC#4
  "reproduce" note — D-17; the carve-out for `:110`/`:128` — D-05);
  `:80` HYG-06 (five entries, not six; DFCI Phase 149 — D-42);
  `:90` HARN-06 (`origin/master…master` 0 / 11, HEAD 152 ahead; `git branch -r --contains 9a114815` empty;
  `077b29b7`'s body verbatim; `AR-155-01`; the squash measurement; 104 commits / ~60 % basis; "the owner rules
  the mechanism at Phase 159" — D-28);
  ROADMAP.md `:237` SC#2 (D-02, D-06), `:239` SC#4 (D-17; no pin count duplicated here), `:254` 159 SC5 (D-28,
  marked); a note on its own line in Phase 159's block — never appended to the `:246` `Depends on` line.
  STATE.md: a new `- [Phase 158]:` bullet (the jira hook counts phase checkboxes only) — never a rewrite of
  the Phase-155 scrub bullet at `:159`. `157-VERIFICATION.md:118` is cited as the hand-off (its DFCI evidence
  sentence is `:115`).

- **D-67: No hand flips.** `requirements.mark-complete` (`execute-plan.md:519-523`, driven by the plan
  frontmatter `requirements:` field; `milestone.cjs:164/:174` flips both the checkbox and the Traceability
  row — `[MEASURED]` on `2b4f8863`, whose plan never mentioned REQUIREMENTS) and `phase.complete`
  (`execute-phase.md:1410-1433`, writes ROADMAP's checkbox with `(completed YYYY-MM-DD)`) own them. VERIFY-05
  and VERIFY-06 are declared in exactly **one** plan's frontmatter — the last — so the flip fires at that
  plan's boundary, after the bundle.

- **D-68: The amendments land in a task inside that last plan, committed before its metadata commit**
  (`execute-plan.md:541` pathspec-commits the three planning files at every plan boundary and would sweep in
  uncommitted amendment text), gated by check-phase-54 (32/0) + 55 + 56 before and after, with the apex
  re-run recorded as `final_apex` in that plan's SUMMARY.

### Area Q — Mechanism-forced ordering constraints (wave shape, plan count and commit granularity are the
planner's — 155 D-51, 157 D-50)

- **D-69: The thirteen constraints.**
  1. Remediation (D-41–D-44) before the sweep — `_glossary-linux.md:143` is both the R3 line and its file's
     single em-dash edit.
  2. Tool edits (D-47, D-57) in their own commits with no `docs/` path; gate `git show --stat <commit> --
     docs/` empty.
  3. The judge after the sweep (D-55).
  4. Dispositions after the judge; the style record commit **after** the corpus edits it disposes (D-62).
  5. The binding claim-audit at the final content SHA, after every `docs/` edit including any C-12
     remediation (D-47).
  6. SC#4's after-half at that SHA, clean tree, before the bundle (D-54).
  7. The bundle after every `docs/` and `docs/_registry/` edit (D-26).
  8. Corpus identity on the post-bundle tree (D-24).
  9. Amendments in a task inside the last plan, before its metadata commit (D-68).
  10. VERIFY-05/06 in exactly one plan's frontmatter — the last (D-67).
  11. Apex + check-phase-54/55/56 after the last planning-document edit; `final_apex` in that plan's SUMMARY.
  12. `/gsd-secure-phase` last with the auditor spawned; remediation re-enters at 1 and replays 1–11; when
      the finding is not a `docs/` edit the minimal replay is sweep gate → judge-blindness note → binding
      audit → SC#4 → bundle → identity → amendments → apex (D-32).
  13. Apply, gate and commit inside one tool invocation for every commit that edits tracked files — except
      the bundle run, which gets its own invocation (D-22).

- **D-70: A discovery audit runs first, uncommitted** — expected falsifications are the known set (D-41,
  D-42's DFCI, D-44's replacement text); anything else enters D-05's path.

- **D-71: The single-invocation rule's ground, corrected.** `[MEASURED]` at HEAD both project Stop hooks
  return `allow` for the whole phase (`publish-bundle-gate.cjs` needs STATE `status` to match its complete
  signal — it reads `planning`; `jira-milestone-gate.cjs` sees 6 mapped phases, `doneCount 4 ==
  completed_phases 4`, 158 `in_progress`). The live hazards are the **phase-completion transition** (the jira
  gate fires when `completed_phases` becomes 5 while the story is `in_progress`) and any commit-shaped skill
  (the Jira skill's pathspec scoping was assistant discretion — its SKILL.md has no git instruction). There
  are four Stop hooks, two of them in gitignored `.claude/settings.local.json` (`.gitignore:66`) — nothing in
  a clone reproduces them. Never run a recorded command string through a shell (D-53). Both canaries are
  re-asserted at 237 in the sweep commit (D-09). Every phase-dir `.md` commit runs check-phase-54/55/56
  (D-34). Every `before` SHA is named (D-52).

### Claude's Discretion

- Plan count, wave shape and commit granularity, provided D-69's thirteen constraints hold and every gate
  named on a decision runs in the commit that lands it.
- The runner's internal structure and row ids, provided D-47–D-49 hold and it is Node built-ins only.
- Exact wording of the six amendment blocks and the `AR-158-NN` row, provided every figure is `[MEASURED,
  plan 158-NN]` with its command named and D-66's constraints hold.
- Exact `drift[]` row set beyond the named rows in D-51, and the `extractor`/`comparator` vocabulary.
- The dispatch command shape for the judge, provided prompt + packet are one pre-assembled file and raw
  stdout is captured (D-56).
- Whether the discovery audit (D-70) is its own plan task or a checkpoint inside the first plan.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Governing planning documents
- `.planning/ROADMAP.md` — Phase 158 Goal and SC#1–SC#4 at `:229-241`; Phase 159 at `:243-254` (SC5 `:254`,
  Depends-on `:246`); the amendment token precedents at `:88-90`, `:121`, `:153`.
- `.planning/REQUIREMENTS.md` — `:16` the `[MEASURED]` definition; `:32` STYLE-06; `:39` VERIFY-02 (the
  over-inclusive worklist); `:42-43` VERIFY-05/06 incl. D-20; `:69` STD-04's reader-default; `:80` HYG-06;
  `:90` HARN-06; `:110`, `:128` the do-not-edit-ruled defects; `:136-149` Traceability.
- `.planning/STATE.md` — `:53-63` the LOCKED named decisions (FINAL-VERIFY-SEPARATE, DISCUSS-PHASE-FLAGS);
  `:142` the VERIFY-06 premise; `:159` the Phase-155 scrub bullet (never rewritten); `:218` the D-00a forward
  note for HARN-05.
- `.planning/WINDOWS.md` — rows 10 (no planning file in range), 13 (non-idempotent sets), 15 (the
  wrapped-guard escape) — all `open`.
- `.planning/phases/157-*/157-VERIFICATION.md:115-118` — the DFCI hand-off; `157-CONTEXT.md` D-04, D-17,
  D-26–D-35, D-41, D-44, D-48, D-50; `157-BASELINE.json`; `157-SECURITY.md` (the register shape, AR-157-01).
- `.planning/phases/156-*/156-GATE-BASELINE.json` — `phase_baseline.{path_note, resolver, embedded_154,
  before, after, comparison, batch10.closure, handoffs}`; `156-CONTEXT.md` D-05, D-13, D-14, D-16–D-20, D-22,
  D-26, D-28–D-37; `156-JUDGE-PROMPT.md`; `156-05-SUMMARY.md`; `156-VERIFICATION.md:70-135`.
- `.planning/phases/155-*/155-CONTEXT.md` D-01, D-05, D-29, D-31, D-48, D-51, D-52; `155-SECURITY.md:137`
  (**AR-155-01**); `155-03-PLAN.md:65` (the index-scoped owner constraint); `155-03-SUMMARY.md`.
- `.planning/phases/154-*/154-CONTEXT.md` D-12, D-22, D-33; `154-GATE-BASELINE.json` (`anchor_note`).
- `.planning/milestones/v1.21-phases/152-*/152-02-SUMMARY.md` (22 inline bundle assertions, D-28's nine
  blank cells) and `152-02-bundle-run.txt`; `153-*/153-14-SUMMARY.md`; `153-06-SUMMARY.md:25` (D-22
  content-leaf rule); `153-EVIDENCE.md:914,1065` (push-then-dispatch).
- Commits: `077b29b7` (the directive, quoted verbatim), `9a114815`, `bb22f89a`, `03d43070`, `97f7ca28`,
  `83660691`, `2b4f8863` (the harness flip), `7ba7ce35`, `b9a442c4` (two-document amendment), `f8750c6d`
  (the committed bundle anti-precedent), `8e5070d9` (DFCI, Phase 149).

### Tools and their contracts
- `scripts/docs-style/verify-meaning.py` — `:45` MODALS; `:261-265` `fingerprint`; `:267-278`
  `load_dispositions` (accepts ≥ 2 columns); no path scoping.
- `scripts/docs-style/judge-packets.py` — `:26` MODALS; `:40-60` `changed_files` (BASE vs working tree);
  `:75-127` `packets()` (iterates baseline lines; `:113-114` the `j is None` window); `:132-150` `--chunks`
  only under `--chunk-file`.
- `scripts/docs-style/verify2.py` — `:15-16` LINK/HEAD regexes; `:33` `slug()`; `:42` `Path('docs')`; `:47`
  worktree read; `:68-104` `health()`; **byte-unchanged in 158**.
- `scripts/docs-style/sweep3.py` — `:56-67` PROTECT; `:199` heading skip; `:203-205` table rows; `:212`
  `do_em`; `:220` pin block; `:231` blockquote cap; `:240` `write_text`; `subs-emdash-batch10.tsv` (3 positive
  lookaround rows); `subs-via-sense.tsv:6`; `actionable.py`; `pins2.py:38-44` (defaults); `RESUME.md:482-525`
  (the 30 rulings), `:518` (package-source `via` → `from`).
- `scripts/docs-style/_CONTENT-PINS.txt` (563), `_PINNED-HEADINGS.txt` (187), `_DISPOSITIONS-docs.tsv` (6
  rows, frozen), `_DISPOSITIONS-batch10.tsv` (0 rows), `_JUDGE-VERDICTS-batch10.json:13` (the hardcoded-path
  anti-precedent).
- `scripts/validation/check-prose-style.py` — `:50-58` the exclusion record; `:130` CHECKPY_PATH; `:139`
  the class needle; `:143-146` the anchor convention; `:167-179` import-by-location; `:248-306`
  `compute_unprotected_person_first`; registered in no chain or workflow.
- `scripts/validation/check-nav-hub-links.mjs` — `:54,:61,:207` cwd-relative reads; `:169` the explicit
  `<a id>` union (the comment is `:142`); `:219-233` `extractLinks`; `:280` the `_templates/` source skip.
- `scripts/validation/check-phase-54.mjs` — `:30-31`; `:353` V-54-21's literal; `:437-470` the walker
  (`*.md` only); `-55.mjs:465`; `-56.mjs:462`; `check-phase-153.mjs:44-53` (the resolver token warning);
  `check-phase-125.mjs:86` (the wrong-token counterexample); `check-phase-120.mjs:61-72` (STD-04 at `:402`);
  `check-phase-147.mjs:128-145` (pins `05-linux-update-delivery.md`); `check-phase-49.mjs:199-214, :288, :320`.
- `scripts/validation/_lib/archive-path.mjs:19` — `resolveArchivedPhasePath(suffix, roots)`, live-first,
  exact suffix, returns `null`; `_lib/frozen-at-close.mjs` (19 `MILESTONE_CLOSE_SHAS`).
- `scripts/pipeline/build-publish-bundle.mjs` — `:34-40` argv at load; `:54` `deriveZipName`; `:63-70`
  load-time derivation; `:164-175` `writeManifestCsv`; `:189-211` `readmeContent()`; `:243-257` preflight
  (presence only); `:297-302` filename-map regeneration; `:385` `rmSync`; `:430-449` parity (`… 0 orphan.`);
  `:479-483` `Compress-Archive` + `timeout: 120000` + `renameSync`; `:515-527` canary (a).
  `build-filename-map.mjs` — `parseRegistry`; `:274-286` canary (c); `:394-397` `--dry-run` (compares
  nothing). `convert.ps1:43` the pandoc pin. `lib/ooxml.mjs` (read-only zip walk).
- `.claude/hooks/jira-milestone-gate.cjs`, `publish-bundle-gate.cjs` (`:46` complete signal, `:93`
  `zipExists`, `:110-119` STATE `milestone:` read); `.claude/skills/jira-milestone/` (no git instruction).
- `~/.claude/gsd-core/workflows/execute-plan.md:519-543` (`requirements.mark-complete`;
  `git_commit_metadata`); `execute-phase.md:1410-1433` (`phase.complete`); `secure-phase.md:83` (the ASVS-L1
  short-circuit); `~/.claude/agents/gsd-security-auditor.md`; `~/.claude/gsd-core/bin/lib/milestone.cjs:164,174`.
- `.claude/skills/google-style/check.py` (`:52-71` `mask_code`; `:132-142` word-list emission; `:161` the
  total line) and `references/word-list.md`, `voice.md`, `accessibility.md:160`;
  `.claude/skills/google-style-verify/SKILL.md:54-56` (broken invocations), `:179` (superseded 9,363).

### The corpus sites this phase edits or asserts
- `docs/_standards/EEE-SOP-standard.md` — `:658` (D-04, `above`), `:660` the `### D-05:` heading (a needle),
  `:662` the falsified sentence, `:642` `wish`, `:646` "more than ten thousand", `:402` the STD-04 heading;
  its Version History (the v1.19 HYG-05 row precedent).
- `docs/_glossary-linux.md:141-143`; `docs/_glossary.md:183` (DFCI), `:326,332,338,344` (the four new H3s),
  `:340`; `docs/operations/patch-management/05-linux-update-delivery.md:233` (`## Reboot Handling`), `:257-262`
  (the Canonical quote + Source), `:271-276`, `:287-290`.
- `docs/index.md:305`, `docs/operations/00-index.md:28` (`via apt`); `docs/reference/linux-capability-matrix.md:112`
  (the protected third site); `docs/operations/drift-migration/02-macos-drift-detection.md:116`,
  `03-ios-android-drift-detection.md:130` (the judge hunks); `docs/admin-setup-apv2/03-device-preparation-policy.md:141`
  and `docs/operations/patch-management/08-windows-app-updates.md:251` (the explicit anchor);
  `docs/reference/firmware-oem-matrix.md` (the wrapped citation; `bb22f89a`); `docs/admin-setup-macos/02-enrollment-profile.md:94,146`;
  `docs/_registry/RE-index.md:266` (the nine blank cells), `:269` (the sweep's prose edit), the 12 Title-cell
  em-dashes; `docs/recipes/06-walk-up-avd-kiosk-autologon.md:219-221` (D-31's shipped remedy).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`check-nav-hub-links.mjs` run from a `git worktree` of BASE** gives the link-health BASE half under the
  authoritative resolver with zero new code; it is fully cwd-relative.
- **`check-prose-style.py:167-179`** is the precedent for importing `check.py` by location in-process — the
  enumeration instrument for the 94 candidates.
- **`build-filename-map.mjs`'s `parseRegistry`** is importable safely (its main is guarded);
  `build-publish-bundle.mjs` is not (load-time argv parse).
- **`_lib/archive-path.mjs`** already resolves phase artifacts across archival; pass `['v1.22-phases']`.
- **`subs-emdash-batch10.tsv` through the unmodified `sweep3.py`** reproduces the 31/28/15 close and its
  six-bucket protection census exactly.
- **The 156 judge prompt, dispositions sibling and verdict-record shapes** are copied, not re-designed.

### Established Patterns
- Annotate-and-supersede in **both** planning documents, same token, `[MEASURED, plan NNN-NN]` labels, a
  new STATE bullet rather than an in-place rewrite.
- Flips are harness-owned and frontmatter-driven; a phase asserts them post-hoc.
- Perturb-and-restore for non-vacuity; a fresh `claude -p` process for independence; `{cmd, args[]}` for
  every recorded command; every `before` SHA named.
- "Build nothing" where an existing tool held constant across two runs gives the number (three new-tool
  proposals were reversed in this discussion; one runner survives because nothing existing counts per blob).

### Integration Points
- The apex `check-phase-153` chains 145–152, so `V-149-BARREDPHRASINGS`, `V-151-ROLLBACK`, `V-54-21` and
  the three Platform-token walkers are live over every edit; `check-phase-54/55/56` also walk every
  phase-dir `.md`.
- `execute-plan.md:541` commits the three planning files at every plan boundary — the amendments must be
  committed inside the last plan before that boundary.
- `docs/_registry/RE-index.md` feeds both canaries and the filename slugs; it is in the sweep set (prose
  bullet only).
- `dist/` and `.pipeline-output/` are gitignored; the bundle's only tracked write is `filename-map.md`.

</code_context>

<specifics>
## Specific Ideas

- **The pickaxe has the same blind spot as the sweep.** `sweep3.py` is line-at-a-time and so is `git log -S`;
  the falsified HP citation was wrapped across a line and is invisible to both. Whitespace-normalised counting
  over the joined blob sees it (2 → 0 → 0). The audit must never assume a needle fits on one line.
- **A written record in this discussion falsified itself three times.** "No remote ref carries any v1.22
  commit" (seven are on `origin/master`), "28 already-checked requirements" (31), and a `[MEASURED]` "94 from a
  fence boundary" (70; no fences). Each survived a draft because it was plausible; each died to one command.
- **Mechanism first, then the table.** The harness flips requirement checkboxes from plan frontmatter; a
  hand-sequenced commit table could not have been executed as written. Ordering constraints with their
  measured reasons are what the planner can use.
- **Two "exactly one" assertions were traps:** "exactly one new zip" is RED on the mandated rebuild; "exactly
  one removed content line" is what makes the secret-needle recovery decidable. Direction matters.

</specifics>

<deferred>
## Deferred Ideas

- **The history mechanism at close** (squash merge recommended; rewrite costed) — Phase 159, owner's call
  (D-28); `creating dist/docs-library-v1.22.zip` disarms `publish-bundle-gate.cjs`'s `zipExists` guard for 159.
- **`.gitattributes * text=auto eol=lf`** — Phase 159 (the file exists with one `binary` line; this is an
  EOL-policy addition).
- **The wrapped-guard hazard** in `subs-batch10.tsv:33` and the 16 other lookahead/lookbehind rows across 8
  sets — WINDOWS row 15's open handoff; 158 applies only the em-dash set (measured 0 wrapped quotations on
  its 28 lines).
- **The user-level skill copies** — `cp -r .claude/skills/google-style-verify ~/.claude/skills/` and
  re-syncing `google-style` (owner action, D-33).
- **verify2's explicit-anchor blind spot** (284 of 289 items) and its lack of fence masking — a tool item;
  `verify2.py` stays byte-unchanged this milestone.
- **`check-prose-style.py`'s exclusion record has no producer for five of six figures** — write one or
  retire the figures (a 159/backlog item; 158 date-stamps).
- **The nine blank `status:` frontmatter keys** (RE-228…RE-236) — accepted-not-fixed since 152-02 D-28.
- **`scripts/pipeline/README.md:122-130`** omits three pipeline files; nothing gates it.
- **The remaining ~18 RESUME rulings with no single literal** — class rules dispositioned, never assertable.
- **More style EDITs on 157's prose** (reader-actor passives) — need a judge pass; 159 or backlog.
- **The 95-file `Phase NN` body-prose population**, the requirement-identifier leak arm, the citation
  freshness drift, the DEFERRED-CLEANUP convergence flag, `docs/operations/` EEE enrollment, seed-status
  normalisation, `_glossary.md:33`'s non-alphabetical index tail, a merge-marker gate, the
  `V-132/V-137-HUBSNOTWIRED` regex repair, the evidence-label taxonomy, `judge-packets.py` alignment quality
  and `pins2.py` cross-repo geometry — all carried from Phase 157 unchanged.
- **The `scripts/pipeline/` "built-ins only" convention vs `unzip`** — 158 uses `unzip` inline (present in
  both shells here); a Node entry walker exists in `ooxml.mjs` if a later phase wants zero externals.

</deferred>

---

*Phase: 158-final-corpus-verification-publish-bundle*
*Context gathered: 2026-09-07*
