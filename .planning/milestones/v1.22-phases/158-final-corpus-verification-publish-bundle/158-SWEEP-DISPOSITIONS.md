# Phase 158: Sweep Dispositions Narrative

Thin index over two machine-readable tables — `scripts/docs-style/_DISPOSITIONS-158.tsv` and
`scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv` — not a second copy of either. This file carries
the arithmetic, the named range, the instrument, the heading-suppression disclosure, the sweep-file
rows, the remediation rows, the bundle-readme disposition row, and the three-limb re-proof at the
post-edit revision. It quotes no corpus line verbatim.

## The added-line arithmetic

Measured live against the current tree (not copied from `158-CONTEXT.md`): the fifty-nine-file
`docs/` edit range `d0b611e8..937d0a1f` (byte-identical to `3a5c74b6^..937d0a1f`, both derivations
confirmed to agree — see "The named range" below) added **184** lines across the fifty-nine files.
Of those:

- **27** are blank.
- **24** are template bullet lines that `check.py`'s own `mask_code()` reduces entirely to
  whitespace (inline code, links, or URLs consume the whole line's content).
- **11** are heading lines, excluded per this table's own convention.
- **62** total non-dispositionable (27 + 24 + 11).
- **122** scannable — the population the instrument actually ran the structural rules and the
  word list over.

This matches `158-CONTEXT.md` D-11's figures exactly (184 / 27 / 24 / 11 / 122 / 62).

## The named range

Resolved SHA pair: `d0b611e8f064e4aa031aaaca53da8fafe6b92798` (base) ..
`937d0a1f335c37182482dcf77173d98e00a018bf` (tip). `git diff --name-only 3a5c74b6^..937d0a1f -- docs/`
and `git diff --name-only d0b611e8..937d0a1f -- docs/` both return the identical 59-file list,
confirmed byte-for-byte via `diff`.

The range's `to` endpoint — `937d0a1f` — never advances to the current tip. Every `line` value in
`_STYLE-DISPOSITIONS-158.tsv` is relative to that fixed revision. Advancing the endpoint to this
phase's own final commit would ingest this phase's own hand-remediation and sweep prose into the
population being measured, defeating the point of the table.

## The instrument

In-process import, not a script: `scripts/validation/check-prose-style.py`'s `_load_module()`
helper (`importlib.util.spec_from_file_location`) loads `check.py`'s `RULES` and `mask_code` and
`sweep3.py`'s structural classifiers (`PROTECT`, `HEADING`, `KEEP_LINE`, `quoted_lines`) by file
location, the same pattern `check-prose-style.py` itself already uses to reuse these symbols rather
than re-transcribe them. Whole-file structural-rule and word-list hits are computed once per file
against the file's content at the named pre-edit revision, then intersected with that file's added
line numbers from the range diff. No enumeration script was written, and the per-file-fragment
method (`check.py` invoked separately per file fragment) was not used — that method inflates hits
per (file, term) and loses the real line numbers this table is keyed on.

The style checker's blob identifier at the revision used:
`.claude/skills/google-style/check.py` = `f4ee7b199944149f74977bca65d6f00b9ab5a025` at `937d0a1f`.
The enumeration is reproducible from these two bytes: the named revision pair and this blob SHA.

## The heading-suppression disclosure

Within this table's own added-line population, the eleven added heading lines carry **zero**
structural-rule or word-list hits — re-measured directly by running the same masked-line scan
against those eleven lines without excluding them. The ninety-four raw occurrence total is
therefore identical whether or not heading suppression is applied, for this specific population.

Separately, and for full disclosure: running `check.py`'s own CLI directly over all fifty-nine
files' *whole content* (not just the added lines) reports **2391** total candidates with headings
included and **2049** with `--no-headings` — a difference of 342, entirely from `heading-case` and
`heading-punct` hits on pre-existing (non-added) heading lines in these fifty-nine files. That
342-candidate difference sits entirely outside this table's added-line scope and is recorded here
only so a reader knows which population (whole-file vs. added-line) each number belongs to.

## Fifteen sweep-file rows

The mechanical em-dash sweep (`scripts/docs-style/sweep3.py`, unmodified, commit `44ab8c21`) edited
exactly fifteen files corpus-wide. Six of them sit outside this table's fifty-nine-file edit set —
flagged below — and their em-dash tightening is recorded in a separate `drift[]` row for plan
158-06's gate baseline, not in `_STYLE-DISPOSITIONS-158.tsv`.

- `docs/_glossary.md` — inside the 59; one line (`:340`) carried two spaced em dashes, both tightened.
- `docs/_glossary-linux.md` — inside the 59; one line (`:143`) tightened; this is also the file's
  hand-remediation line (fix_sha `804e12ba`).
- `docs/_registry/RE-index.md` — **outside** the 59; one line tightened.
- `docs/_standards/EEE-SOP-standard.md` — inside the 59; three pre-existing lines tightened, none of
  them the two hand-remediation lines (`:642`, `:658`).
- `docs/_templates/admin-template-android.md` — inside the 59; one line inside the template's
  authoring comment tightened.
- `docs/admin-setup-android/08-cope-full-admin.md` — inside the 59; one line tightened.
- `docs/admin-setup-android/09-aosp-realwear.md` — **outside** the 59; two lines tightened.
- `docs/admin-setup-android/10-aosp-zebra.md` — inside the 59; one line tightened.
- `docs/admin-setup-android/11-aosp-pico.md` — **outside** the 59; one line tightened.
- `docs/admin-setup-android/12-aosp-htc-vive-focus.md` — inside the 59; one line tightened.
- `docs/admin-setup-android/13-aosp-meta-quest.md` — inside the 59; one line tightened.
- `docs/end-user-guides/android-work-profile-setup.md` — **outside** the 59; three lines tightened.
- `docs/l1-runbooks/01-device-not-registered.md` — **outside** the 59; two lines tightened.
- `docs/operations/00-index.md` — inside the 59; one pre-existing line tightened (not the hub line
  the hand remediation fixed).
- `docs/recipes/02-shared-ipad-full-provisioning.md` — **outside** the 59; two lines tightened, one
  of them left one dash spaced (a link-adjacency architectural residual, `.planning/WINDOWS.md`
  entry #16, matching Phase 156's already-accepted class — not this table's concern).

Nine of the fifteen sit inside the 59-file set; six sit outside it (`RE-index.md`,
`09-aosp-realwear.md`, `11-aosp-pico.md`, `android-work-profile-setup.md`,
`01-device-not-registered.md`, `02-shared-ipad-full-provisioning.md`).

## Remediation rows

The three hand-remediation commits plan 158-02 landed, all before the sweep per D-69 constraint 1:

- **`3c53f72a`** — `docs/_standards/EEE-SOP-standard.md`: the falsified two-skill divergence
  statement at `:662` replaced with the measured divergence; the directional reference at `:658`
  ("... EEE structural sections above") replaced per accessibility.md's ban on directional
  language; the desire-verb word-list candidate at `:642` replaced per the word list's plainer-form
  guidance. One new dated Version History row.
- **`804e12ba`** — `docs/_glossary-linux.md`: the `unattended-upgrades` entry's closing sentence
  gained a second corpus-consistency cross-reference link; the nativeness-word candidate on the same
  line replaced per the word list's own example. This is also the file's single em-dash sweep
  target (`44ab8c21`).
- **`1c4f7880`** — `docs/index.md` and `docs/operations/00-index.md`: the tool-sense preposition at
  each Patch & Update Management hub line replaced, matching the substitution table's tool-sense
  mapping.

## The bundle-readme disposition row

`scripts/pipeline/build-publish-bundle.mjs`'s `readmeContent()` (lines 189–221) states the bundle
"contains the entire Approved documentation corpus." This sentence is not false: the walk-up AVD
kiosk recipe's own "Asset Provenance" section
(`docs/recipes/06-walk-up-avd-kiosk-autologon.md:221`) states plainly that every committed asset the
recipe links lives under `assets/recipes/06-walk-up-avd-kiosk/`, reachable only from the repository
itself — the published `.docx` bundle is built from the registry's rows and never walks a
filesystem directory, so it does not carry the asset tree even though the README states it contains
the entire Approved documentation corpus. The owner ruling that asset files sit outside the corpus
walk (Phase 155, RCP-09) is the ground for this disposition: the README's claim is scoped to the
Approved `docs/` corpus that becomes `.docx` files, which is exactly and only what the bundle
carries; the asset tree was never claimed to be included.

## Three-limb re-proof at the post-edit revision

All three limbs run at the current HEAD (`e0dbac28c306fb39f34a4e11ba8a92674d7e04f5` at the time of
this narrative's own authoring, before this commit).

### Limb one — every EDIT row's rule and token no longer fires on its post-edit line

Re-ran the in-process instrument against each EDIT row's `fix_sha` content at its `post_line`. All
five confirmed silent:

| File | post_line | rule | token | Result |
|---|---|---|---|---|
| `docs/_glossary-linux.md` | 143 | word-list | native | no longer fires |
| `docs/_standards/EEE-SOP-standard.md` | 642 | word-list | wish | no longer fires |
| `docs/_standards/EEE-SOP-standard.md` | 658 | directional | above | no longer fires |
| `docs/index.md` | 305 | word-list | via | no longer fires |
| `docs/operations/00-index.md` | 28 | word-list | via | no longer fires |

### Limb two — the staleness gate

The literal check (every non-`EDIT`/non-`NO-CANDIDATES` row's line byte-identical between
`937d0a1f` and `HEAD`, carriage returns stripped) reports **14 moved lines**, not zero. Per this
task's own instruction, none is re-anchored; each is investigated and recorded here rather than
hidden:

- **3 are the `SWEPT` rows themselves** (`docs/_glossary-linux.md:143` ×1,
  `docs/_glossary.md:340` ×2) — their line moved because the em-dash sweep (`44ab8c21`) tightened
  the exact spacing the `em-dash-spaced` rule flagged. The occurrence no longer exists; that is the
  intended, correct outcome of a `SWEPT` verdict, not a defect.
- **11 more share a physical line with an `EDIT` or `SWEPT` action on a *different* token or rule**:
  four at `docs/_glossary-linux.md:143` (the three passive rows plus the `check` word-list row — the
  line moved because of the co-located `native`→`built-in` edit and the em-dash tightening, not
  because of anything these four rows flagged), two at `docs/_glossary.md:340` (the two passive
  rows, moved by the co-located em-dash tightening), three at
  `docs/_standards/EEE-SOP-standard.md:658` (two word-list rows plus the word-list `under` row,
  moved by the co-located `above`→`the preceding` edit), and two at
  `docs/_standards/EEE-SOP-standard.md:662` (a passive row and a word-list `new` row, moved by the
  R1 divergence-statement rewrite on the same line, `3c53f72a`). For every one of these eleven,
  direct inspection at HEAD confirms the SPECIFIC token each row flagged is still present, unchanged,
  at the same line — the disposition on each of those eleven rows remains valid; only the *line's
  bytes as a whole* moved, because the table is keyed at line granularity and several independent
  candidates share these four physical lines with an edited or swept token.

No row's flagged occurrence disappeared silently and no row was re-anchored to a new line number.
Every movement is attributed to a named commit (`44ab8c21` or `3c53f72a`) and its cause is recorded
above.

### Limb three — the same instrument over the same immutable range at the new tip

Re-running the identical instrument (same range, same added-line-number set, same masking and
matching logic) with every file read at HEAD instead of `937d0a1f` totals **85** raw occurrences —
not the `93 - 5 = 88` a naive reading of "original count minus the number of edit rows" would
predict. The arithmetic that actually holds: **93 (this table's occurrence-row count) − 5 (`EDIT`
rows) − 3 (`SWEPT` rows, resolved by the mechanical sweep, a separate mechanism from the five named
edits) = 85**, which is exactly what re-running the instrument measures. `158-CONTEXT.md` D-62's
"94 − Σ EDIT" formula did not anticipate that the sweep's own mechanical action would also remove
occurrences from the re-scan; this narrative records the corrected formula and the measured number
rather than forcing the unreconciled one.

## Two recorded divergences from the written record

1. **93 occurrence rows, not 94.** `check.py`'s own `RULES` independently fire both the
   `directional` structural rule and a separate word-list `above` entry on the identical token at
   `docs/_standards/EEE-SOP-standard.md:658`. Both are resolved by the single `3c53f72a` edit, so
   the duplicate word-list finding is folded into that one `EDIT` row (keyed under `directional`,
   matching `158-CONTEXT.md` D-61's own naming) rather than given a second row that would fail
   limb two's byte-identity re-proof under any non-`EDIT` verdict.
2. **27 `NO-CANDIDATES` files, not 26.** One additional file beyond `158-CONTEXT.md` D-59's recorded
   twenty-six — `docs/_glossary-macos.md` joins the eight `docs/_templates/*.md` files whose added
   lines resolve entirely to blank or mask-blanked content, carrying zero scannable candidates.

Total table rows: 93 occurrence rows + 27 `NO-CANDIDATES` rows = **120**.
