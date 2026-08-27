# RESUME — Google-style pass over the Autopilot doc library

Everything needed to continue after a `/clear`. Read this first, then start the next batch.

---

# ⏩ NEXT SESSION STARTS HERE — judge the 653-hunk worklist (2026-08-26, session 2)

**State:** the deterministic half of the verifier is **DONE and green**. All 40 findings
are dispositioned or fixed, three over-firing rules were tightened, and the full gate
re-ran clean. What remains is the half that has no textual signature: the **judge
worklist, 653 hunks (164 high-risk)**. Nothing on it has been read.

## Reproduce the current state in one command

```bash
cd /d/claude/docs-google-style-test && python /d/claude/Autopilot/scripts/docs-style/verify-meaning.py c97d322 \
  --dispositions /d/claude/Autopilot/scripts/docs-style/_DISPOSITIONS.tsv
```

Expected, exactly:

```
  6  dispositioned (silent)
  JUDGE WORKLIST: 653 hunks (164 high-risk)
  PASS: no undispositioned findings.            exit=0
```

`c97d322` is the corrected pristine baseline — **not** `6010dd5`.
`python verify-meaning.py --self-test` must still print `PASS: 10/10`.

## The job

**Judge worklist, 653 hunks, 164 high-risk.** Start with the 164 `risk: high` — a
`should` was dropped, which is the shape that produced all 5 recorded inversions.

```bash
cd /d/claude/docs-google-style-test && python /d/claude/Autopilot/scripts/docs-style/verify-meaning.py c97d322 --json > worklist.json
```

**Spawn fresh Agents to judge. Do not judge them yourself in a context that has read
this file.** Independence is the whole point: all 30 defects were found by a reader who
did not author the edit. The decision procedure and a worked example are in
`.claude/skills/google-style-verify/SKILL.md` §3.

A modal drop that this session found *by hand*, outside any deterministic rule, shows
the worklist is not theoretical: `cross-platform/apple-business/_admin-directory.md:26`
had `SHOULD resolve via` rewritten to `must resolve through` — a recommendation carrying
an explicit "(in tenant preference order)" turned into a requirement. Reverted to
`should`. It was one of only two capitalised `SHOULD`s in the corpus; the other
(`l1-runbooks/21:142`) correctly became "is expected to".

## What session 2 did (do not redo)

**Rules tightened — three classes were over-firing, exactly as the previous block warned.**
Each new guard reuses `mech_canon()`, the same suppression the quotation rule already had,
and the self-test still passes 10/10.

| Class | Before | After | Guard added |
|---|---|---|---|
| `doubled-connective` | 14 | 0 | fires only if the doubled `through` span did **not** already exist in the baseline. Four hits were lines edited for an unrelated reason (`admin` to `administrator`, dash spacing) that happened to carry a pre-existing double. |
| `prose-crossref` | 9 | 0 | skip when `mech_canon(old).count() == mech_canon(new).count()`. Six references differed **only** by dash spacing: headings are pinned and keep the spaced dash, prose was canonicalised to the tight one. Nothing a reader can misread. |
| `label-drift` | 9 | 0 | same `mech_canon` guard. `mech_canon` does not touch `admin`/`administrator`, so the C1 defect this rule exists to catch still fires — the self-test fixture proves it. |

**10 real doubled connectives reworded** (`or through X` to `or X`; `added through Apple
Configurator` to `added using`; `controlled through the "Await Configuration"` to
`controlled by`; `NOT through Managed Google Play` to `NOT from`; and so on).

**5 label pairs re-joined.** The pass never edits table cells, so expanding only the prose
copy split the label. Uniform resolution: **revert the prose copy to match the untouched
table copy.**

| File | Reverted to |
|---|---|
| `admin-setup-android/03-fully-managed-cobo.md:112` | `fully managed, via staging` |
| `admin-setup-android/08-cope-full-admin.md:115` | `with work profile, via staging` |
| `cross-platform/apple-business/14-device-transfer-runbook.md:72` | `Intune config profiles` |
| `l1-runbooks/21-ios-compliance-blocked.md:98` | `OS version below minimum` |
| `reference/android-capability-matrix.md:148` | `Tri-portal admin surface` |

**2 prose cross-references fixed** (real, not cosmetic): `linux-lifecycle/00:35` had the
link **text** rewritten to `Out of Scope for Linux through Intune` while the heading and
the `#out-of-scope-for-linux-via-intune` anchor still said `via` — reverted;
`operations/drift-migration/04:390` had `preceding` inserted inside the heading name
(`macOS / iOS preceding tenant migration`) — moved to `see the preceding / Windows and
macOS / iOS tenant migration sections`. Same word-order break as
`l2-runbooks/00-index.md:256` (`APv2 preceding L2` to `preceding APv2 L2`), also fixed.

**1 quotation reverted, 4 kept.** `l2-runbooks/14` had `"configuration didn't apply"` put
back to `"config didn't apply"` — it is a quoted **user complaint**, and the register is
the point of quoting it. The other four are the corpus's own scare quotes / rhetorical
questions, not vendor sentences; each has a reason in `_DISPOSITIONS.tsv`.

**`split-verb`'s one finding was the predicted false positive** and is dispositioned with
the grammatical reason, not "fixed".

**Idempotency was NOT what the old block claimed.** Re-running `sweep3.py` would have
**re-broken three hand-adjudicated reverts**, including `Create a local admin account` —
the 30th defect, reverted in `dc7e996` and re-broken by the very next sweep run because
nothing pinned it. Fixed at the rule level:

- `sweep3.py` `KEEP_LINE` now also protects `Create a local admin account`,
  `Tri-portal admin surface`, `Intune config profiles`, and `via staging`.
- `subs-directional.tsv` lost its `OS version below minimum` row: it split a label pair,
  and "below minimum" is the compliance setting's own phrasing.

Verified: `sweep3.py` with `_CONTENT-PINS.txt` and **every** `subs-*.tsv` now applies
**0** edits corpus-wide.

⚠ **`sweep3.py` takes a PINSFILE argument and the two available files are not
interchangeable.** Running it with `_EMDASH-PINS.txt` (8 pins) instead of
`_CONTENT-PINS.txt` (562 pins) reports 20 wanted edits, 17 of them on the
validator-pinned `> **Ask the admin:**` lines in `recipes/01-04`,
`_standards/EEE-SOP-standard.md` and `_templates/recipe-template.md`. Those lines are
pinned verbatim by `check-phase-131.mjs` and `check-phase-136.mjs` and must never be
expanded. Always pass `_CONTENT-PINS.txt`.

**One known residual, pre-existing and out of scope:** `subs-directional-adminsetup.tsv`
still wants `see callout above` shortened to `see callout` in
`operations/co-management/02-windows-workload-sliders.md:115,134`. That file belongs to
the `operations` batch, whose directional rule set has no `callout above` row. Two lines,
cosmetic, nobody's defect.

## Gate re-run after all of the above — all green

```
verify-meaning.py            PASS, exit 0 (6 dispositioned, 653 judge hunks outstanding)
verify-meaning --self-test   PASS 10/10
verify2.py                   link/anchor INTRODUCED by the sweep: 0
                             (6017 resolved / 29 missing file / 340 missing anchor, identical to baseline)
pins2.py                     4030 literals scanned, 562 pinned; grep -vxF vs _CONTENT-PINS.txt empty
c17-eee-contract.mjs         234 files, 0 with violations, 0 total (#1..#13 all 0)
check-nav-hub-links.mjs      0 hub-presence, 0 corpus-link, 0 total
check-phase-144.mjs          101 PASS, 0 FAIL, 0 SKIPPED (~33s)
```

The gate ran in the `c17-sandbox` clone (at `534073f4`) with `docs/` replaced by the
scratch corpus and the generated `_PASSIVE-REPORT.md` removed.

## ⚠ The corpus moved under us — re-measure before trusting any drift number

v1.21 phases **149, 150 and 151 shipped while the first session was running**, from a
separate workstream in the same repo. `docs/` drift since the scratch fork
(`534073f4`) is no longer the 3 files measured earlier:

```
15 files changed, 3969 insertions(+), 9 deletions(-)
  6 files  the pass edited AND the repo has since changed  -> real merge conflicts
  9 files  brand new, never seen by the pass               -> unformatted
```

The nine new ones are the whole `operations/firmware-bios/` tree (00-overview,
01-windows-dfci, 02-dell, 03-hp, 04-lenovo), `patch-management/07-windows-autopatch`,
`08-windows-app-updates`, and `recipes/05-enterprise-update-plan`.

**Consequences.** Landing the pass is a real merge, not a copy. The nine new docs
have had no style pass at all, so shipping the pass would make the corpus *inconsistent*
rather than consistent. And this repo takes commits from other sessions — re-run
`git diff --shortstat 534073f4 HEAD -- docs` at the start of every session rather than
trusting any number written here, including this one.

---

## Decision already made (do not re-litigate)

**Option 1.** Adopt every Google dev-docs style rule EXCEPT sentence-case headings.
Headings stay Title Case. 101 distinct Title Case headings (590 occurrences) are pinned
verbatim as string literals inside 83 `check-phase-*.mjs` validators. Always run the
checker with `--no-headings`.

**Passive voice = REPORT ONLY.** Owner chose to change none of the 3,333 passives.
The report already exists at `D:\claude\docs-google-style-test\_PASSIVE-REPORT.md`.

**Not a GSD phase.** v1.21 is active at Phase 148/153 scoped to update/driver/firmware/BIOS
governance. This work is an experiment in a scratch copy. If the results justify shipping,
scope it later as a v1.22 milestone or `/gsd-capture` backlog item — using the measured
numbers from this experiment, not estimates.

## Locations

**The skill and this tooling now live IN the repo** (vendored 2026-08-25). They used
to sit only in `~\.claude\` and `D:\claude\gstyle-tools\` — unversioned, one machine,
no history.

| Path | What |
|---|---|
| `.claude/skills/google-style/` | The skill: `SKILL.md`, `check.py`, `references/` (68 pages, the full word list). **Tracked.** |
| `scripts/docs-style/` | This folder: the sweep engine, the worklist tools, the pin baselines, the `subs-*.tsv` rule sets, and this record. **Tracked.** |
| `docs/` | The real corpus. **The completed pass has NOT been landed here** — that is a separate decision, see Status. |
| `D:\claude\docs-google-style-test\` | Scratch working copy holding the finished 9-batch pass, forked from `docs/` @ `534073f4`. Git-tracked locally, **outside this repo**, and the only copy of the result. |
| `D:\claude\c17-sandbox\` | `git clone` of this repo for running the gate. Swap `docs/` in to test. Reproducible; nothing lives here. |
| `~\.claude\skills\google-style\` | The original user-global skill. Now a duplicate — the in-repo copy is authoritative. |

## Status

**THE PASS IS COMPLETE, and its deterministic verification is GREEN.** See the
NEXT SESSION block at the top: all 40 deterministic findings were adjudicated on
2026-08-26 (session 2) and the verifier now exits 0. The 653-hunk judge worklist
is still unread -- that is the only open work. "Nothing is open" below refers to the

Mechanical phase green, all 8 class batches done
(`l1-runbooks` 42, `l2-runbooks` 33, `reference` 26, `operations` 22,
`cross-platform` 20, `admin-setup-*` 66, `decision-trees` 11, `the rest` 64),
and the one corpus-wide class -- capitalised `Admin` / `Admins` in prose --
closed as **batch 9**. Nothing is open. The numbers are ready to scope as a
v1.22 milestone or a `/gsd-capture` backlog item.

```
dc7e996  fix(batch6): revert the 'Create a local admin account' label expansion  <- the 30th defect
3a85b08  judgment/batch9: capitalised Admin/Admins in prose (115 edits, 63 files)
b7fafaf  judgment/batch8: tense, should, minimizers, word list (batch 8 complete)
eb15df4  judgment/batch8: directional language (117 -> 0)
d0b06f0  judgment/batch8: via mapped by sense (208 -> 8 documented)
f9c69af  judgment/batch8: admin -> administrator, vs., sign in to, config
12b7857  judgment/decision-trees: batch 7 complete (11 files)
63a7b45  judgment/admin-setup: tense, should/would/could, minimizers, impact (batch 6 complete)
62b8b5a  judgment/admin-setup: directional language (157 -> 0)
f30c37b  judgment/admin-setup: via mapped by sense (233 -> 3 documented)
4b72278  judgment/admin-setup: admin -> administrator, config, desired, sign in to
dc7619f  judgment/cross-platform: batch 5 complete (20 files) + admins fix corpus-wide
6085d81  judgment/operations: batch 4 complete (22 files)
c7542cb  judgment/reference: batch 3 complete (26 files)
8251e0d  judgment/l2-runbooks: tense, should, remaining word list (batch complete)
27e9229  judgment/l2-runbooks: word list + directional (part 1 of batch 2)
e38140c  fix(l1-runbooks): tighten the 'should' rule -- 5 meaning inversions
d71f0d3  fix(l1-runbooks): six defects found reviewing the batch diff
e8e8b73  judgment/l1-runbooks: CONFIG BLOCKS -> CONFIGURATION BLOCKS
058d707  judgment/l1-runbooks: tense, should/would, blast radius (batch complete)
3096803  judgment/l1-runbooks: directional language (86 -> 0)
3ca5613  judgment/l1-runbooks: via -> through, config/sign-in-to/desired, minimizers
15c6bb5  judgment/l1-runbooks: admin -> administrator, vs. -> versus
e5c2fa9  report: passive-voice findings (3333: 3021 agentless / 312 actor-named)
306b974  mechanical v2: prose em dashes + Latin abbrevs, headings/tables/pins protected
c97d322  restore pinned Version-History row in doc 1
6010dd5  baseline  <- NOTE: already contained the 2 sample rewrites, not pristine repo state
```

`l1-runbooks` went 1,378 raw candidates -> 31 residual, every one a documented
out-of-scope call (see below). Gate green after every commit: C17 234/0/0,
check-nav-hub-links 0, apex check-phase-144 101 PASS/0 FAIL, 0 links or anchors
newly broken, 0 validator literals altered.

**Batch 8** was "the rest" -- 64 files with nothing in common: six lifecycle
trees, `device-operations`, `end-user-guides`, `error-codes`, `recipes`,
`diagrams`, `_standards`, `_templates`, `_registry`, and the root docs. 956
prose hits -> 318 residual, 537 edits over four commits. The residual is all
documented keeps: 181 `admin` (every one `Intune admin center`, `audience:
admin`, or the validator-pinned `> **Ask the admin:**` lead-in), 89 capitalised
`Admin`/`Admins` deferred to the open class, 9 `via` (5 blockquote-cap, 3
validator-pinned, 1 verbatim Apple quotation), and 39 modal/word-list keeps.

It ran corpus-root rather than per-directory, which is safe -- batches 1-7 are
idempotent -- with **one exception worth knowing**: a generic rule reaches
residuals that an earlier batch deliberately LEFT. The batch-8 `via` rule broke
`reference/macos-commands.md`'s `Enrolled via DEP` label, which batch 3 had kept
because it mirrors `profiles status` output sitting in a code fence four lines
up. Reverted, and added to `KEEP_LINE` so it cannot recur. After any corpus-root
run, `git diff --name-only | sed 's|/[^/]*$||' | sort -u` and question every
directory outside the batch.

Batch 8 also cost three sweep3 bugs, all in guards that already existed and were
one file-shape too narrow -- see the Guards table.

`decision-trees` (batch 7) is the SMALLEST class by prose, not by file count.
The 11 files are ~90% table -- 386 rows protected -- so the whole prose surface
is 31 term hits and 24 edits, done in one commit with one 10-rule TSV
(`subs-decisiontrees.tsv`). Residual: 1, the heading `## Action Quick Reference`,
frozen under Option 1. No new rulings and no new guards: batch 6's rule sets and
the capitalised-`Admin` deferral both transferred unchanged (5 `Admin` hits
skipped here, 5 `admin` hits were all `Intune admin center`).

Two things generalise from it. **Every directional hit wanted the word DROPPED,
not swapped** -- `grouped below into three stages`, `represented below`,
`preserved below as explicit per-mode rows` all point at the table that IS the
body of the document, and two name it outright, so `preceding`/`following`
would have been noise. And **the `**LOCKED—NN (nodes + labeled edges)**`
diagram-conversion attestation lines carry ordinary prose**: 9 of the 24 edits
landed inside one. They are safe to edit as long as the counts and the
`git show <sha>` tokens are untouched -- grep the validators for the phrase
first (none matched) and let the pin check confirm.

`admin-setup-*` (batch 6, the largest class: 66 files across seven families)
went 724 actionable -> 135 residual, all documented keeps: 65 `audience: admin`
frontmatter values, 22 `etc.`, 16 modal/tense keeps, 8 `simple` (a property or
the setting name **Block simple passwords**), 8 `vs.` in table rows, and eight
one-offs. 578 edits over four commits. Gate green after each: C17 234/0/0,
nav-hub 0, apex 101/0/0, 0 links introduced, 0 pins altered, 0 frontmatter
drift, 0 HTML-comment-content drift.

## Tooling built during batch 1 -- use it for the remaining seven

| Tool | What |
|---|---|
| `actionable.py FILES` | The worklist. Filters `check.py` down to hits this corpus should act on: drops passive (owner ruled report-only), leftover em dashes (protected contexts), table rows, `Say to the user` speech, and word-list terms outside a curated in-scope set. |
| `prose.py "D:/.../CLASS/*.md" [TERM ...]` | **Run this, not just `actionable.py`.** It ignores `check.py` entirely and instead applies sweep3's own skips (frontmatter, fences, indented code, headings, table rows, cited quotations, speech scripts) plus the `PROTECT` split, then reports every term hit in what is LEFT. So a hit here is editable by definition, and a term with no hit is one no TSV rule could ever reach. `actionable.py`'s word list is lowercase-only -- that is what hid `admins` for four batches and still hides capitalised `Admin`. Use it to build the worklist, then again after applying: `LEFTOVERS: 0` is the batch-complete signal. It exits with an error on an MSYS `/d/...` path, which used to glob to nothing and print a false green. |
| `prose_all.py ROOT [TERM ...]` | Corpus-wide `prose.py`. `prose.py` globs ONE directory (`root.glob(name)`), so it cannot see a class that spans the corpus -- which is exactly what batch 9 was. Same skips, same PROTECT split, `rglob`, and it drops `_PASSIVE-REPORT.md` (3,333 quoted baseline sentences that a corpus-root run would rewrite). |
| `pins2.py > _CONTENT-PINS.txt` | Every validator string literal present verbatim in the corpus (562 of them). `pins.py` only did em-dash literals. |
| `sweep3.py ROOT PINS [--subs TSV] [--apply]` | The engine. Fork of `sweep2.py`; keeps all its protections and adds table-row, speech-script and UI-label skips. `--subs` takes a TSV of `regex<TAB>replacement` applied in file order. |
| `subs-*.tsv` | The batch-1 substitution sets: directional, directional2, tense, should. Reusable starting points -- most phrases recur across doc classes. |
| `subs-*-adminsetup.tsv` | Batch 6's three sets (`via` 27 rules, `directional` 98, `tense` 106). The directional one is the most reusable: its last two rules are anchored `^ above` / `^ below`, which after the `PROTECT` split can only match a prose segment that a markdown link just closed -- i.e. exactly the "the link already names the target" family. That pair alone cleared 30 of the 157 hits with no per-line authoring. |
| `subs-decisiontrees.tsv` | Batch 7, all four rule families in one 10-rule file. Worth copying when a class is small: authoring one TSV beats four, and the run order (`via` exceptions, generic `via`, directional, tense, minimizer) is the same order the big batches use. |
| `subs-admin-batch9.tsv` | Batch 9, two rules. Worth reading as the reference for the *negative-context* shape: when a term is 80% label and 20% prose, one generic rule plus a lookbehind list (the qualifiers) and a lookahead list (the label nouns) beats enumerating 115 call sites. Its header carries the full keep/change split. |
| `subs-*-batch8.tsv` | Batch 8's three sets (`via` 11 rules, `directional` 107, `tense` 112). The tense one is the reference for the split-verb trap below -- and for the `> **Ask the admin:**` carve-out, which its header documents in full. |

**The pin check is exact, not a heuristic.** `sweep3` transforms a line, then
reverts it if the edit would actually alter a pinned literal. Blocking every
line that merely *contains* a pin skipped 33 legitimate edits, because generic
validator literals like `troubleshoot`, `Apple Business` and `All Platforms`
sit on dozens of lines.

**Prove pins after every batch**, because `pins2.py` only finds literals still
present -- one you already broke silently disappears from the list:

```bash
cd /d/claude/Autopilot/scripts/docs-style && python pins2.py > _PINS-NOW.txt   && grep -vxF -f _PINS-NOW.txt _CONTENT-PINS.txt    # any output = a broken pin
```


## Guards added after batch 1, 2 and 6 (sweep3 rejects these at load / edit time)

| Guard | The bug it closes |
|---|---|
| pattern ends in a space, replacement does not | `version is below ` -> `earlier than` gave `earlier than102.x` |
| `[Cc]`-style case class with a fixed-case replacement | recased the section name `Escalation Criteria` |
| bare-domain arm in `PROTECT`, anchored to real TLDs | `admin.microsoft.com` -> `administrator.microsoft.com`. A generic dotted-token pattern instead swallows `802.1X` and `5.2404.0` and silently blocks edits |
| never edit a cited quotation | nine verbatim Microsoft/Ubuntu quotations had been restyled, two of them by the MECHANICAL phase. A blockquote is a quotation if a `**Source:**` line follows OR the preceding sentence ends in a colon. Falsifying a citation is worse than the style violation it fixes, and no validator can see it |
| skip YAML frontmatter entirely | the admin rule rewrote `audience: admin` (a controlled vocabulary, 124 files use it) to `audience: administrator` in 20 reference docs. Frontmatter is metadata, never prose. Audit it with a baseline diff after every batch |
| refuse an edit that pushes a blockquote past 200 chars | C17 assertion #12. MATCH THE VALIDATOR: it applies only to ENROLLED files (frontmatter has `doc_id`) and measures CONSECUTIVE `> ` lines joined with a space, not one line. A per-line guard refused legitimate edits across the whole unenrolled `operations` tree |
| reject a backslash escape in a REPLACEMENT (batch 6) | `re.sub` processes escapes on the replacement side too, so a TSV replacement written as `It is \*\*not\*\* auto-filled` shipped literal backslashes into the corpus. `\n` is still allowed -- batch 5 uses it deliberately to hard-wrap a line |
| an indented `>` is a blockquote, not indented code (batch 6) | the `^ {4,}\S` code-block skip swallowed every blockquote nested in a numbered list, so `10` `via` hits and two word-list hits in the AOSP guides were invisible. C17 #12 anchors on `/^>/` at column 0, so these blocks are NOT capped and need no length guard. Only **36** such lines exist corpus-wide and only **1** is in the five already-shipped classes, so the earlier batches lost nothing |
| find the frontmatter after a leading HTML comment (batch 8) | the eight `_templates/` files open with an authoring-comment block, so anchoring the fence search on `lines[0]` missed their frontmatter entirely and the admin rule rewrote `audience: admin` in five of them. **The identical bug as batch 2's, one file shape later** -- a guard is only as wide as the shapes you fed it. Audit frontmatter with a comment-aware extractor, not a `lines[0]` one, or the audit shares the blind spot |
| skip C17 #12 for TEMPLATE-SENTINEL files (batch 8) | C17 identifies authoring scaffolds by `last_verified: 1970-01-01` and skips assertions #9 and #12 for them. sweep3 keyed only on `doc_id`, so the 200-char cap silently refused every blockquote edit in `_templates/` -- their gate blockquotes are deliberately 220-450 chars. MATCH THE VALIDATOR on BOTH sides of a condition, not just one |
| protect inline `"..."` spans (batch 8) | `quoted_lines()` only recognises BLOCKQUOTES. A verbatim vendor sentence or a UI string quoted INLINE went through three times: the Microsoft PSSO re-registration passage, Apple's "manually assign it to the devices via device serial number", and the Android UI error "A PIN to exit kiosk mode has not been set by your IT admin". `PROTECT` now masks any same-line quoted span up to 400 chars. Cost: the corpus's own scare-quoted phrases are no longer restyled -- worth it, since falsifying a quotation is invisible to every validator |
| skip our own generated artifacts (batch 8) | `_PASSIVE-REPORT.md` quotes 3,333 baseline sentences. A corpus-root run would have rewritten hundreds of them and destroyed the record |

Each guard caught a further unfired instance the moment it went in. Run every
rule set twice: a correct one is idempotent and reports 0 edits the second time.

**The quotation guard has a second blind spot.** It only recognises BLOCKQUOTES.
A verbatim vendor quotation set as an ordinary paragraph wrapped in `"..."` --
`08-auth-methods-deep-dive.md:154` is one -- sails straight through, and a
`should`-rule edit falsified it before the post-batch audit caught it. Run this
after every batch; it compares every `"..."` span on a changed line against the
same span in the baseline and is the only check that sees this class:

```bash
# from docs-google-style-test, BASE = the commit this batch started from
python - <<'PY'
import subprocess, re
BASE = "dc7619f"
for f in subprocess.run(["git","diff","--name-only",BASE],
                        capture_output=True,text=True).stdout.split():
    old = subprocess.run(["git","show",f"{BASE}:{f}"],capture_output=True,
                         text=True,encoding="utf-8",errors="replace").stdout.split("\n")
    new = open(f,encoding="utf-8",errors="replace").read().split("\n")
    for a,b in zip(old,new):
        if a == b: continue
        for q in re.findall(r'"[^"]{4,}"', a):
            if q not in b: print(f, q[:90])
PY
```

## Two rules that need per-batch judgment, not a blanket

**`via`.** Batch 1 was almost all channel-sense, so `via` -> `through` looked
safe. l2 is investigation runbooks and broke it. Map by sense: channel ->
`through`, tool or cmdlet -> `using`, property you read a value from -> `from`,
physical medium -> `with`, URL -> `at`. See `subs-via-sense.tsv`.

Batch 6 was the biggest `via` set yet (233) and confirms the split: 26
exceptions carried the mechanism senses (`nmcli`, `PowerShell`, `Microsoft
Graph`, `StageNow Export`, `WebAuthn APIs`, `defaults read`, the headset UI) and
the generic channel rule swept the other ~200. Three survive by design -- one
inside an HTML comment, one a cited verbatim quotation, and
`08-cope-full-admin.md:175`, whose blockquote is 199 chars and `through` costs 4.
After applying it, **grep the added lines for `through .{0,80} through`**: the
generic rule produced four genuine "through ... through" clauses, and each one
wanted `using` on the second half.

**`should`.** Bare present tense is NOT the default -- it inverts meaning when
the sentence stated an expectation. The decision procedure is written at the top
of `subs-should.tsv`. Short version: if a conditional nearby handles the OTHER
outcome, it was an expectation, so use `Confirm X shows Y` or `must`.

## The verifier (2026-08-26)

`google-style-verify` (skill) + `verify-meaning.py` (script) now cover the classes the
gate structurally cannot see. Designed against the real defect record via `/grill-me` +
`/adversarial-review`, which killed four of eight candidate design questions as already
settled and surfaced three that had been missed entirely.

Two layers, because the record splits cleanly:

- **Deterministic** — seven classes with a textual signature: frontmatter drift,
  quotation drift, HTML-comment drift, label-drift, split-verb, word-order-inside-a-
  proper-name, and prose cross-reference recasing. That last one is invisible to every
  link checker because it is *not a link*: `See Escalation Criteria` -> `Escalation
  criteria`.
- **Judge worklist** — modal->assertion inversion, which *provably* has no textual
  signature. `The device appears with Join type "Registered"` is identical in shape to a
  correct declarative sentence. Every hunk where a modal was removed is emitted for an
  **independent fresh-context** reader. Measured recall on the 5 recoverable inversions:
  **5/5**, all inside the high-risk (`should` dropped) subset.

**Independence is the load-bearing rule.** All 30 defects were found by a reader who did
not author the edit. A judge holding the formatter's rationale inherits exactly the blind
spot this document catalogues.

Output is a **gate with persisted dispositions**, keyed to the evidence text so a keep
goes stale when that line changes again. A binary gate dies on day one against a corpus
full of correct-by-ruling residuals; a pure report gets ignored -- which is precisely how
a false Intune setting label survived four batches while this file recorded it as fixed.

Calibration: **40 findings** on the completed pass, vs `check.py`'s **9,363** candidates
on the same accepted corpus. Three of the verifier's own rules over-fired at 120 findings
on the first run and were tightened, not bulk-dispositioned.

## The gate cannot see this class of error

Every meaning inversion found in batch 1 passed C17, check-nav-hub-links, the
apex, the link check and the pin diff. Structural validators check shape, pins
and links; they cannot see a sentence that now asserts the opposite of what it
meant. Budget a per-batch re-audit that re-reads each judgment edit IN CONTEXT.
The diff summary looks clean -- the inversions only appear in the surrounding
lines.


## Standing post-batch audits (all four must come back empty)

```bash
# 1. link + anchor health
cd /d/claude/docs-google-style-test && python /d/claude/Autopilot/scripts/docs-style/verify2.py

# 2. no validator literal broken
cd /d/claude/Autopilot/scripts/docs-style && python pins2.py > _PINS-NOW.txt   && grep -vxF -f _PINS-NOW.txt _CONTENT-PINS.txt

# 3, 4, 5. vs the batch's OWN base commit, all must report 0:
#    frontmatter drift | altered quotations | HTML comment drift
#    (ABAUDIT-NN comments carry C15 validator waivers -- restyling one
#     could break a suppression)
#    Compare the extracted <!-- ... --> SPANS, not "lines containing <!--":
#    a long line can carry a trailing comment and have its prose edited, which
#    gave 4 false positives in batch 6.
#    The quotation check is the `"..."`-span script under Guards above.
```

Plus the gate itself, and a **context re-audit**: read the changed lines with
their surroundings. Four of the five worst defects so far -- the meaning
inversions, `audience: administrator`, the falsified quotations, and batch 6's
`the timing sequence and mitigation preceding patterns` word-order break -- were
invisible to every validator and surfaced only by reading the diff.

Batch 6's re-audit found six defects the whole gate passed: the reverted
`Create a local admin account` UI label, the leaked `\*\*not\*\*` backslashes,
a subject-verb break (`requirements ... marks ALL devices`), the misplaced
`preceding`, a falsified Microsoft quotation, and a doubled `through`.
Budget for it -- the diff summary always looks clean.

Batch 8 found **eleven**, and three of them are a class no earlier batch hit:

**The split-verb trap.** Converting `will` to the present tense breaks any
sentence where one `will` governs two verbs. `will fail silently or produce
unclear errors` became `fails silently or produce`; `will receive an uninstall
command ... and remove itself` became `receives ... and remove itself`; `cannot
see Secure Enclave-stored keys and will report no certificate` became `and
report`. All three read fine in the one-line diff and all three are ungrammatical
in context. Grep the added lines for a converted verb followed by ` and ` or
` or ` plus a bare infinitive:

```bash
grep -E "^\+" batch.diff | grep -v "^+++" \
  | grep -oP "\b(fails|receives|blocks|shows|matches|takes|appears|is|are|does|do|has|have)\b[^.]{0,110}\b(and|or) (?!not\b)[a-z]+\b"
```

Also budget for the two recurring shapes: **word order** (`the cross-platform
preceding bridge subsection` -- inserting `preceding` where the adjective
already is, twice now) and **doubled `through`** (the generic `via` rule made
nine pairs in batch 8; each wanted `using`, `with` or `over` on the second half).

## Rulings made in batch 1 (apply them to the other seven)

| Term | Ruling |
|---|---|
| `admins` | -> `administrators`. Missed for four batches because the bundled word list has only the singular, which left mixed usage inside one paragraph. |
| `admin` | -> `administrator`, EXCEPT `Intune admin center`, `Tenant admin` (UI blades) and `Admin Action Required` (a heading whose anchor is linked). |
| `via` | -> `through` everywhere; only `command prompt with Shift+F10` wanted `with`. |
| `etc.` | KEEP. Google's word list prefers `etc.` over `and so on`, so the corpus is already right -- the `latin-abbrev` rule over-fires here. |
| `should` | -> present tense for behaviour, `must` for a requirement, imperative for an instruction. |
| `will` | -> present tense for product behaviour; keep only for events genuinely in the reader's future. |
| `above`/`below` | Spatial -> `preceding`/`following`, or drop it when an anchor link already names the target. Version comparisons -> `earlier than`. Other magnitudes -> `less than` / `shorter than`. |
| `could not` | KEEP where it is past inability ("could not connect"), not a modal. |
| `config` (l2) | Out of scope there: `⚙️ Config Error` / `[CONFIG]` is a fixed taxonomy label with its own gloss, like `Tenant admin`. |
| Anything inside a heading | Never edited -- it changes the GitHub anchor. |
| Speech scripts | `> **Say to the user:** "..."` and `Ask the user: "..."` are read aloud. Never edited. |
| Quoted user text | Ticket phrasings and UI strings quoted verbatim are evidence, not prose. Never edited. |
| Minimizers | `just`/`simply` cut. `simple rules vs complex rules` (a property) and `easily confused` (a diagnostic warning) are NOT minimizers -- kept. |

## Rulings added in batch 6 (`admin-setup-*`)

| Term | Ruling |
|---|---|
| `config` (admin-setup) | IN scope here, unlike l2. Every prose hit is Intune's own noun -- `app config policy` is really **app configuration policy**, `config profile` is **configuration profile** -- so expanding it moves the text TOWARD the UI. The `.exe.config` filenames and table cells are protected already. |
| `Create a local admin account` | KEEP. It is the verbatim Intune enrollment-profile setting label; the table row two screens up carries it as the setting-name column. **This row was FALSE from batch 6 until 2026-08-26.** It said the prose echo at `admin-setup-macos/02:146` "had to be reverted after the blanket rule expanded it" — the revert never happened. `git log -S` shows the expansion introduced at `f30c37b` and untouched for four batches while this line recorded it as fixed. Actually reverted in `dc7e996`, found by an adversarial review of the verifier design, not by the gate. **The defect count is 30, not 29, and a written audit log is not evidence.** |
| `not just X` | -> `not only X`. It means "only", never "merely" -- treating it as a minimizer and cutting it inverts the sentence. |
| `simple` (admin-setup) | KEEP. Every hit is a complexity property (`simple OEMConfig configurations` vs the StageNow path) or the macOS policy setting **Block simple passwords**. |
| `master` | KEEP. `FileVault master keychain` is Apple's term. |
| `impact` | -> `effect` where it is a noun in a sentence. KEEP in the coined label `CA-blocked-until-re-registered impact window`. |
| `blast radius` | -> `scope`. Batch 1 used `cross-platform scope` for the one cross-platform sense; the plain `scope` fits the token-disclosure and staged-rollout senses here. |
| hyphenated `admin` | NOT touched. `per-admin`, `admin-side`, `local-admin`, `non-admin` (~40 corpus-wide) stay as they are -- many are file names and anchor slugs, and batches 1-5 left them too. Accept the one mixed line in `07-knox-mobile-enrollment.md:207`. |
| link text that mirrors a frozen heading | Keep it in step with the RULE, not with the heading. `00-overview.md:47`'s `(EAP-TLS via nmcli)` became `using nmcli` to match the prose on the same line; the H1 and H2 of `07-linux.md` keep `via` because Option 1 freezes headings. A link text and its target's title diverging is the same divergence Option 1 already accepts 101 times. |

## Rulings added in batch 8 (the rest)

| Term | Ruling |
|---|---|
| a package source | `via` -> **`from`**, not `through`. "not available from snap / from the default Ubuntu archive" is a distribution statement; "not available through snap" reads as a capability claim. APT is a protocol, so it takes `over`. |
| `Ask the admin:` | EXEMPT, and enforced. `check-phase-136.mjs` counts exactly 5 `/^> \*\*Ask the admin:\*\*/gm`; it is pinned twice. The `should`/`will` inside those prompts stays too -- they are interrogatives. |
| `quick` | KEEP, all seven. Every use means FAST (`quick lookup`, `quick overview`), never "this task is easy", which is the sense Google's entry actually bars. Same call as batch 7's `## Action Quick Reference`. |
| `master` | The three PROSE uses (`the master routing hub`, `the master lookup table`, `the master error-code lookup reference`) -> `primary`. The document title **Master Error Code Index** is a heading and stays frozen. |
| `impact` | -> `effect` as a plain noun. KEEP inside coined labels (`impact window`, batch 6). |
| a template and the docs it generates | Must not diverge. `_templates/admin-template-macos.md`'s Platform-gate sentence took **`with`**, not `through`, because the seven `admin-setup-macos` guides it generates sit at 198 chars against C17 #12's 200-char cap and took `with` in batch 6. Templates are exempt from #12; what they GENERATE is not. |
| an authoring comment that mirrors template body text | Edit both. `admin-template-android.md` carries the same example "What breaks" sentence at line 64 (inside the `<!-- -->` block) and line 86 (in the body). Restyling only the visible one would have propagated `admin` back into every new doc. No validator matches it -- this is the one accepted HTML-comment drift in the whole pass. |
| the doc's own scare quotes | Editable, unlike a citation. `_glossary-android.md:137`'s `"user-controlled hidden personal-side partition that admin policies cannot reach"` restates the doc's OWN preceding sentence. Same call as batch 6's `"enforce via config profile"`. Note the new `PROTECT` quote arm now blocks these automatically -- if you want one changed, do it by hand. |

## The judgment classes (all shipped) — original scoping

~4,700 decisions that could not be scripted. Kept here as the size record:

| Rule | Count | Note |
|---|---|---|
| word-list | 3,412 | **Most are out of scope.** Entries are narrow: `type` only means "enter text", `check` only means "mark a checkbox", `portal` only the Google Cloud console, `admin` exempt as a UI label, `access` only as a verb. Read the guidance on each hit. |
| directional | 740 | `above`/`below`/`right-hand` → named anchor links or earlier/following. |
| future-tense | 314 | `will` → present, except genuinely future events. |
| person-first | 232 | `we`/`our` → `you`. **Do NOT touch `> **Say to the user:** "..."` scripts** — that is speech staff read aloud, not doc prose. |

Batch order (matches the v1.16 precedent of splitting retrofits by doc class):
~~`l1-runbooks` (42)~~ → ~~`l2-runbooks` (33)~~ → ~~`reference` (26)~~ → ~~`operations` (22)~~ →
~~`cross-platform` (20)~~ → ~~`admin-setup-*` (66, seven families)~~ → ~~`decision-trees` (11)~~ →
~~**batch 8, the rest** (64): six lifecycle trees, `device-operations`,
`end-user-guides`, `error-codes`, `recipes`, `diagrams`, `_standards`,
`_templates`, `_registry`, and the root docs~~ → ~~**batch 9, corpus-wide**:
capitalised `Admin` / `Admins` in prose~~ → **ALL BATCHES DONE.**

Nothing is open. The numbers are ready to scope as a v1.22 milestone or a
`/gsd-capture` backlog item.

One commit per class. Run the gate after each.

### CLOSED corpus-wide class: capitalised `Admin` / `Admins` in prose (batch 9)

Batches 1-8 only ever matched **lowercase** `admin`/`admins` -- `check.py`'s word
list and `actionable.py`'s `TERM_RX` are both lowercase, so none of this was ever
on a worklist. `prose_all.py` found **527** capitalised hits in editable prose;
**115** were prose and got expanded, **412** are labels and stay. 63 files, one
commit (`3a85b08`), gate green: C17 234/0/0, nav-hub 0, apex 101/0/0, 0 links or
anchors introduced, 0 pins broken, 0 frontmatter / quotation / HTML-comment drift,
and the rule set is idempotent (second run: 0 edits).

**The ruling, and it generalises.** *Title Case is a label and is frozen under the
same Option 1 spirit that freezes headings; sentence case is prose and expands.*
That is exactly the distinction the corpus already draws between the frozen
taxonomy label `Admin Action Required` and the prose lead-in `Admin action
required.`, and it decides every one of the 281 distinct contexts without a
per-site call.

**The documented exception: `Admin sees` (47) stays.** It pairs with `End user
sees` (37) and with 58 Title Case `What the Admin Sees` headings and column cells.
It is one convention, not a sentence, and Option 1 freezes the Title Case half --
so changing only the sentence half would split it. Either both or neither, and
Option 1 forces neither.

Other keeps, all label-side: `Intune Admin(s)` (the corpus's own audience
archetype, sibling to `L1 Service Desk` / `L2 Desktop Engineering`), `Sub-Org
Admin(s)`, `Knox Admin Portal`, `Google Admin account`, `Local Admin Setting`, the
`Standard / Admin / Groups` enum, `Admin log` (an event channel), `Admin consent`
(Entra's own button), `Admin directory` (mirrors `_admin-directory.md`), `Admin
Note:`, the six `**Admin:**` routing labels in `common-issues.md` (siblings are
`**L1:**` / `**L2:**` / `**Decision Tree:**`), `*Admin (Intune):*` (sibling is `*On
the device (Terminal):*`), `[macOS Admin]` / `[iOS Admin]` / `[For Admins Familiar
with ...]` link text, and the two UI breadcrumbs `Entra Enterprise App >
Provisioning > Admin` and ABM `*People > Admin*`.

`> **Ask the admin:**` never came up: it is in `_CONTENT-PINS.txt` twice, so the
exact pin check blocks all 17 occurrences before any rule sees them.

**Two things worth carrying forward.**

*A lookbehind/lookahead pair beats enumeration.* When a term is 80% label and 20%
prose, one generic rule with a qualifier lookbehind list (`Intune `, `Sub-Org `,
`Google `, `Local `, `macOS `, `iOS `, `> `, `/ `) and a label-noun lookahead list
(`(?! ?[A-Z])` plus `log`, `consent`, `directory`, `sees`) covered all 115 sites.
`(?! ?[A-Z])` alone blocked `Admin Setup|Guide|Portal|Note:|Action Required|Sees|
Directory|Decision-Point Block|Bundle|Holder|Owns This Pool?` -- Title Case does
most of the work because the corpus is consistent about it.

*The re-audit paid for itself again, on someone else's batch.* Reading the diff in
context surfaced a **batch-8** defect the whole gate passed: the directional rule
had split a proper name, turning `Per-OU Admin Holder Lookup table below` into
`Per-OU Admin Holder following Lookup table`. That is the **third** instance of the
word-order shape RESUME already flags (`the cross-platform preceding bridge
subsection`, `the timing sequence and mitigation preceding patterns`). Fixed in the
same commit. A directional rule must never insert its word INSIDE a multi-word
proper name -- grep the added lines for a directional word sitting between two
capitalised tokens.

## Hard rules learned the hard way

1. **Never edit a heading line.** Changing heading text changes its GitHub anchor slug and
   orphans every link to it. My first sweep did this and broke 7 anchors + 4 validators.
2. **GitHub slugs do NOT collapse whitespace runs.** `### A — B` → `a--b` (double hyphen).
   A verifier that collapses them reports "0 broken" falsely. `verify2.py` has this fixed.
3. **Never touch a validator-pinned string.** See `_EMDASH-PINS.txt` (8 strings). Extract more
   with `pins.py` if new rules are added.
4. **Table rows are protected** — a lone `—` is the corpus "N/A" cell placeholder, content-matched
   by ten `v1.NN-milestone-audit.mjs` files.
5. **Verify against THEIR gate, not mine.** My checkers have been wrong twice; C17 +
   check-nav-hub-links + the apex are authoritative.
6. **The sandbox needs a real `git clone`.** Without `.git`, frozen `git show <sha>:path` reads
   fail and report present files as missing — 21 phantom FAILs.
7. **Run the apex WITHOUT `CHECK_PHASE_NESTED=1`.** With it set, 99 of 101 checks SKIP and green
   is meaningless.

## Commands

```bash
# find candidates in a batch (headings suppressed per Option 1)
python .claude/skills/google-style/check.py --no-headings D:/claude/docs-google-style-test/l1-runbooks/*.md

# prove only intended edits + compare link health vs previous commit
cd /d/claude/docs-google-style-test && python /d/claude/Autopilot/scripts/docs-style/verify2.py

# run the gate
cd /d/claude/c17-sandbox && rm -rf docs && cp -r /d/claude/docs-google-style-test docs \
  && rm -rf docs/.git docs/_PINNED-HEADINGS.txt docs/_PASSIVE-REPORT.md \
  && node scripts/validation/c17-eee-contract.mjs 2>&1 | tail -1 \
  && node scripts/validation/check-nav-hub-links.mjs 2>&1 | tail -1 \
  && node scripts/validation/check-phase-144.mjs 2>&1 | grep -E "FAIL|^Result:"

# commit a batch
cd /d/claude/docs-google-style-test && git add -A \
  && git -c user.email=x@y -c user.name=b commit -m "judgment: <class> (<n> files)"

# roll back a bad batch
cd /d/claude/docs-google-style-test && git reset --hard HEAD~1
```

## Known pre-existing issue (NOT ours, do not fix in this pass)

Some anchors are broken under real GitHub slug rules but pass `check-nav-hub-links`
because it collapses hyphen runs — e.g. `#deadlines-cutover-dates` → `### Deadlines &
Cutover Dates` (GitHub: `deadlines--cutover-dates`), `#kme` → `### KME (Knox Mobile
Enrollment)`. Worth its own ticket.
