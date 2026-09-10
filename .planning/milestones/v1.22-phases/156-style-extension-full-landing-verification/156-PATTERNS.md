# Phase 156: STYLE Extension & Full-Landing Verification - Pattern Map

**Mapped:** 2026-09-04
**Files analyzed:** 9 hand-authored/generated artifacts + 2 bulk edit classes (13-doc mechanical sweep, judge fix pass) + 5 read-only validator/differ invocations
**Analogs found:** 9 / 9 (all matched — this is the third instance of a shape shipped twice already in this milestone)

## Scope note

Like Phase 154/155, this is not a build phase. No new controller/service/component code exists in
this repo's domain — every file here is either (a) a hand-edited existing tooling/config file, (b) a
new generated JSON/TSV artifact under the phase directory or `scripts/docs-style/`, (c) a bulk prose
edit class over the 13 target documents, or (d) an existing validator/differ this phase RUNS but does
not modify. All analogs below come from Phase 154 and Phase 155, the two immediately-preceding
instances of this exact artifact shape in this milestone, confirmed by direct read this session.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/**/*.md` (13 target documents, mechanical sweep via `sweep3.py --apply`) | content/data | batch (regex substitution over prose) | Phase 154's `docs/_standards/EEE-SOP-standard.md:554` sweep3-driven edit (same mechanism, smaller scale) | exact |
| `docs/**/*.md` (13 target documents, judge-fix pass, Step 4) | content/data | batch (hand-edit responding to verdict) | Phase 154's own D-05 fix-and-delete-row precedent (no separate file — same shape as the mechanical row above, but hand-typed not regex-applied) | role-match |
| `scripts/docs-style/subs-*.tsv` new/edited rows (admin-class residue, em-dash 3-row TSV per D-23) | config/data row | transform (regex TSV row consumed by `sweep3.py --subs`) | `scripts/docs-style/subs-admin-batch9.tsv` (existing negative-lookbehind idiom for the admin class) | exact |
| `scripts/docs-style/subs-*.tsv` row deletions (Step 4, D-05) | config/data row | CRUD (delete overturned rows) | Phase 154's `154-CONTEXT.md` D-05/STYLE-03 precedent — "20 rows across 6 files had to go" — same file family, same delete-on-verdict shape | role-match |
| `156-GATE-BASELINE.json` (new, phase dir) | config/measurement artifact | batch (generated JSON, before/after structural gate) | `154-GATE-BASELINE.json` (structure, `anchor_note`/`path_note` idiom) + `155-GATE-BASELINE.json` (updated `phase_baseline` wrapper key, `structural_gate` sub-object shape) | exact |
| `156-JUDGE-VERDICTS-batch10.json` (new sibling, D-20) | config/measurement artifact | CRUD (append-only verdict ledger) | `scripts/docs-style/_JUDGE-VERDICTS.json` (the file it is a sibling of — same top-level shape: `baseline`, `judged`, `judges`, `counts`, `verdicts`) | exact |
| `156-JUDGE-PROMPT.md` (new, committed, dispatched verbatim per D-19) | config/prompt artifact | request-response (fed unmodified to `claude -p`) | no prior committed judge-prompt file exists in-repo — first of its kind, but the **dispatch mechanism** (`claude -p` fresh process) is itself precedented per D-14; see "No Analog Found" | no analog (mechanism precedented, artifact is new) |
| `156-JUDGE-FINDINGS.md` (new, VERIFY-03 out-of-task findings, explicit-empty-statement) | config/report artifact | request-response (judge output capture) | `scripts/docs-style/RESUME.md`'s `:93-95` rule-change/finding-log idiom (structure only — RESUME itself is untrusted per D-19, do not copy claims, only the "named finding, file+line" shape) | role-match |
| `scripts/docs-style/_CONTENT-PINS.txt` (possible regeneration, D-08 discretionary) | config/data | batch (regenerated pin list) | itself, pre-regeneration — `pins2.py` is the unmodified generator; Phase 154's D-31 bars running `pins2.py` in that phase for the opposite reason (scratch-corpus staleness), which is the citation to carry forward, not a code analog | exact (tool unmodified, only the invocation/corpus target changes) |
| `scripts/docs-style/judge-packets.py` walk-root-filter fix (D-16) | utility/CLI | transform (git-diff-driven hunk binning) | `scripts/docs-style/verify2.py`'s own D-31 two-line argv-ification (Phase 154 precedent for "commit the tool edit separately from any corpus edit") | role-match |

## Pattern Assignments

### 13-document mechanical sweep (`docs/**/*.md`, Step 1)

**Analog:** Phase 154's sweep3-driven edit to `docs/_standards/EEE-SOP-standard.md:554`, and the
tool itself, `scripts/docs-style/sweep3.py` (read in full this session, 281 lines).

**Invocation pattern** (`scripts/docs-style/sweep3.py:244-249`, argv parse, verified this session):
```python
if __name__ == "__main__":
    root, pinsfile = sys.argv[1], sys.argv[2]
    apply = "--apply" in sys.argv
    if "--subs" in sys.argv:
        # TSV of  regex <TAB> replacement, applied in file order (longest first).
        SUBS[:] = []
        for row in pathlib.Path(sys.argv[sys.argv.index("--subs") + 1]).read_text(
                encoding="utf-8").splitlines():
```

**TSV row idiom to copy** (`scripts/docs-style/subs-admin-batch9.tsv`, the two data rows, verified
this session — negative-lookbehind chain for the admin class):
```
(?<!Intune )(?<!Sub-Org )(?<![\w-])Admins(?! [A-Z])(?![\w-])	Administrators
(?<!Intune )(?<!Sub-Org )(?<!Google )(?<!Local )(?<!macOS )(?<!iOS )(?<!Sure )(?<!> )(?<!/ )(?<![\w-])Admin(?![\w-])(?! ?[A-Z])(?! log)(?! consent)(?! directory)(?! sees)(?! \(Intune\))(?!:)	Administrator
```
Every new batch-10 admin-class row (and the em-dash 3-row TSV per D-23: `\s+—\s+`, `\s+—`, `—\s+`)
follows this same two-column, tab-separated, longest-alternate-chain shape — comment header above the
rows documents every blocked case, exactly as this file does at lines 1-21.

**Load-time guard to respect** (`sweep3.py:259-260` area, the literal-space check, verified this
session — do not violate this when authoring new rows):
```python
if pat.endswith(" ") and not rep.endswith(" "):
    sys.exit("subs: pattern ends in a space, replacement does not: %r" % pat)
```

### `156-GATE-BASELINE.json` (measurement artifact, batch)

**Analogs:** `154-GATE-BASELINE.json` (top-level `gate_baseline` key) and
`155-GATE-BASELINE.json` (top-level `phase_baseline` key with a `structural_gate` sub-object) — both
read in full this session. 155's shape is the more recent precedent and nests all five structural
components under one `structural_gate` object rather than flat top-level component keys.

**Top-level shape to copy** (`155-GATE-BASELINE.json`, `phase_baseline` object, verified this
session):
```json
{
  "phase_baseline": {
    "sha": "...", "sha_short": "...", "branch": "...", "measured_at": "...",
    "path_note": "...",
    "structural_gate": { "c17-eee-contract": {...}, "check-nav-hub-links": {...}, "check-phase-135": {...}, "check-phase-54": {...} },
    "conflict_marker_sweep": {...},
    "counts_this_phase_changes": {...},
    "style_residual": {...},
    "pin_residency": {...},
    "line_endings": {...}
  }
}
```

**Per-component tally-line idiom** (`155-GATE-BASELINE.json`, `structural_gate.c17-eee-contract`,
verified this session — every component carries `script`, `invocation`, `exitCode`, and a literal
`tallyLine` string copied from the tool's own stdout, never paraphrased):
```json
{
  "script": "scripts/validation/c17-eee-contract.mjs",
  "invocation": "node scripts/validation/c17-eee-contract.mjs",
  "exitCode": 0,
  "filesChecked": 237,
  "totalViolations": 0,
  "tallyLine": "C17 summary: 237 files checked, 0 with violations, 0 total violations"
}
```

**`anchor_note`/`path_note` idiom for embedded cross-phase values** (`154-GATE-BASELINE.json`, D-28
requires `source_sha` + a content hash for the embedded 154 before-values this phase copies verbatim
— follow the SAME annotate-and-supersede prose shape as this file's own `anchor_note`, read in full
this session):
```json
"path_note": "Phase 156 and Phase 158 must RESOLVE this artifact's path rather than hardcode it -- .planning/phases/ relocates to .planning/milestones/v1.22-phases/ at milestone close."
```
(D-29's two-candidate glob resolver is the mechanism this note describes — copy the resolve-not-
hardcode discipline, not the literal path.)

**pin_differ / mechanical_residual component** (`154-GATE-BASELINE.json`, verified this session —
this is the shape to extend for D-32's enumerated (not bare-zero) residual):
```json
"pin_differ": {
  "tool": "none -- set-membership assertion per D-31 (pins2.py must not be run)",
  "pinsFile": "scripts/docs-style/_CONTENT-PINS.txt",
  "pinCount": 562,
  "found": 562, "lost": 0,
  "tallyLine": "562 pins / 562 found / 0 lost"
}
```
D-32 requires this be an enumerated residual list (7 sites, one CITATION-blocked), not a bare `0` —
follow the `mechanical_residual.perTokenEdits` sibling key's shape (a per-site breakdown object)
rather than inventing a new nesting.

### `156-JUDGE-VERDICTS-batch10.json` (new sibling, D-20)

**Analog:** `scripts/docs-style/_JUDGE-VERDICTS.json` itself — read via `python -c` inspection this
session; do not hand-roll a new key shape.

**Shape to reproduce exactly** (verified this session):
```python
{
  "baseline": "c97d322",       # -> this phase's own pre-batch-10 BASE (D-17)
  "judged": 406,               # -> N (batch-10 hunk count only, per D-20/SC#2)
  "judges": 10,                # -> however many claude -p dispatches this phase makes
  "counts": {"STRENGTHENED": 26, "PRESERVED": 360, "INVERTED": 19, "WEAKENED": 1},
  "verdicts": [ /* each {"file": ..., "baseline_line": int, "verdict": str, "fix": str, ...} */ ]
}
```
Preserve the `(file, baseline_line)` uniqueness invariant (proven unique across all 406 existing
entries this session) for the new rows. Batch-10's `file` keys should be `docs/`-prefixed (unlike the
406's scratch-root-relative keys) since D-20 records this as the correct, provable difference between
the two files — do not retrofit the 406 to match.

### `scripts/docs-style/judge-packets.py` walk-root fix (D-16)

**Analog:** `scripts/docs-style/verify2.py`'s own Phase 154 D-31 edit — the precedent for "commit a
tool edit separately from any corpus edit." Read this session:
```python
# judge-packets.py:40-43, changed_files() — the function needing the walk-root filter + returncode guard
def changed_files(root, base):
    out = subprocess.run(["git", "diff", "--name-only", base], cwd=root,
                         capture_output=True, text=True).stdout
    return [f for f in out.split() if f.endswith(".md")]
```
D-16 requires: filter `out` to paths under the walk root (not just `.md` suffix — `.planning/*.md`
currently leaks through), check `returncode` before trusting `out`, and add an empty-bin guard to the
`--chunks N` binning at `judge-packets.py:118-127` (cited range; actual binning code confirmed present
in this session's read, exact line offsets may drift 1-4 lines per RESEARCH.md's Citation Spot-Check
— locate by the quoted code, not the bare number).

### `156-JUDGE-PROMPT.md` / `156-JUDGE-FINDINGS.md` (new artifacts)

**No direct file analog** — no committed judge-prompt file exists yet in this repo. The **dispatch
mechanism** is precedented: `claude -p "..." --output-format text` as an ordinary `Bash`-tool
invocation from `gsd-executor`, verified this session (`PONG`, exit 0, v2.1.260). Committing the
prompt bytes and reading them at dispatch time (rather than retyping) is the same discipline
`156-CONTEXT.md` D-19 names explicitly — no code precedent needed, just don't retype.

For `156-JUDGE-FINDINGS.md`'s "explicit empty statement if none" requirement (D-19), the shape to
copy is structural, not content: a named heading with either enumerated `file:line` findings or a
literal sentence stating none were found — mirroring how `WINDOWS.md`/`STATE.md` record deviations
in this repo (an absent file is never treated as an empty list).

## Shared Patterns

### Perturb-and-restore non-vacuity proof (D-06, D-16's own detector class)
**Source:** `154-CONTEXT.md` / `155-CONTEXT.md` precedent, reproduced literally this session:
```bash
grep -c "Sure Administrator" docs/        # WRONG: "Is a directory", prints 0, exits 2 -- can never fail
grep -rc "Sure Administrator" docs/ | awk -F: '{s+=$2} END{print s}'   # RIGHT
```
**Apply to:** every new guard/detector this phase adds or asserts (the `Sure Admin` fix, the
walk-root filter, the empty-bin guard, the pin-coverage claim) — prove the guard fires before trusting
it, exactly as D-06 did.

### Run the committed tool, never re-implement it (D-23/D-24, this phase's central lesson)
**Source:** `scripts/docs-style/sweep3.py`, unmodified, fed a TSV.
**Apply to:** the em-dash pass and every mechanical substitution class in Step 1 — a 3-row TSV through
the committed tool recovers `quoted_lines()`, the `PROTECT` mask, the exact pin check, the C17 #12
200-char cap, and the frontmatter skip for free; a hand-rolled classifier drops all five silently
(measured cause of 9/13 wrong per-file rows in this phase's own draft).

### Resolve, never hardcode, a cross-phase artifact path (D-29)
**Source:** `154-GATE-BASELINE.json`'s `path_note`, this phase's own D-29 two-candidate glob.
**Apply to:** any read of `154-GATE-BASELINE.json` from within Phase 156 — glob
`.planning/phases/154-*/` then `.planning/milestones/v1.22-phases/154-*/`, fail loud on 0 or >1 match.

### Commit split by edit kind, not doc family (D-04)
**Source:** `156-RESEARCH.md`'s "Recommended Task/Commit Structure" (5 commits: mechanical sweep,
em-dash pass, judge fixes + TSV row deletions together, pin regeneration, gate baseline). Each needs
its own named gate — `LEFTOVERS: 0` is only true after the last file and cannot be a per-commit gate.

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `156-JUDGE-PROMPT.md` | prompt artifact | request-response | First committed judge-prompt file in this repo; the dispatch mechanism (`claude -p`) is precedented per D-14 but no prior prompt file exists to copy bytes from — author fresh per the section-3 decision procedure in `.claude/skills/google-style-verify/SKILL.md`. |

## Metadata

**Analog search scope:** `.planning/phases/154-*/`, `.planning/phases/155-*/`, `scripts/docs-style/`,
`.claude/skills/google-style-verify/SKILL.md`
**Files read in full or by cited section this session:** `154-PATTERNS.md`, `154-GATE-BASELINE.json`,
`155-PATTERNS.md`, `155-GATE-BASELINE.json`, `155-RCP10-CLAIMS.json`, `sweep3.py` (argv/guard
sections), `subs-admin-batch9.tsv` (header + 2 data rows), `judge-packets.py` (docstring, MODALS,
`changed_files`), `.claude/skills/google-style-verify/SKILL.md` (`--chunks 10`, `[PILOT]` lines)
**Pattern extraction date:** 2026-09-04
**`git status --porcelain` confirmed unchanged** (modulo this PATTERNS.md and the pre-existing
untracked `156-RESEARCH.md`) at end of this pattern-mapping pass.
