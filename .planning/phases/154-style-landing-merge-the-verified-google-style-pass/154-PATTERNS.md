# Phase 154: STYLE Landing — Pattern Map

**Mapped:** 2026-08-31
**Files analyzed:** 8 hand-authored/edited artifacts + 1 bulk corpus class + 5 read-only validator invocations
**Analogs found:** 6 / 8 (2 "no analog — first of its kind", explained below)

## Scope note

This phase is a git-merge-and-measurement phase, not a build phase. ~280 `docs/**/*.md` files land
via `git apply --3way` from a foreign repo's diff — that bulk class gets one row, not 280 analogs
(see below). Everything else this phase touches is either (a) a small hand-edit to an existing
tooling/config file, (b) a new generated JSON artifact, or (c) an existing validator/script this
phase RUNS unmodified. Those are where an analog is worth extracting.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `docs/**/*.md` (~280 files, bulk landing via `git apply --3way`) | content/data | batch (foreign-repo patch apply) | none — treat as one class, not per-file | n/a — see "Bulk Corpus Class" below |
| `154-GATE-BASELINE.json` (new, this phase dir) | config/measurement artifact | batch (generated JSON) | `.planning/milestones/v1.20-phases/141-…/141-sweep-result.json` (structure) + `143-…/.143-edge-coverage.json` (precedent-citation form) | role-match |
| `.planning/REQUIREMENTS.md` (hand-edit, annotate-and-supersede) | config/doc | transform (in-place text amendment) | `.planning/milestones/v1.20-GOV-02-LEDGER.md:64` (Phase 143 D-29 ledger row) + `.planning/milestones/v1.20-phases/141-…/141-01-PLAN.md:24-25` (the actual amendment text) | exact |
| `.planning/ROADMAP.md` (hand-edit, annotate-and-supersede) | config/doc | transform | same as above | exact |
| `scripts/docs-style/subs-admin-batch9.tsv` row 26 (hand-edit, add one lookbehind alternate) | config/data row | transform (regex TSV row) | row 25 in the same file (identical alternate-chain idiom, one line up) | exact |
| `scripts/docs-style/_DISPOSITIONS-docs.tsv` (new sibling file, D-28) | config/data | CRUD (append-only disposition ledger) | `scripts/docs-style/_DISPOSITIONS.tsv` (the file it is a sibling of — same format) | exact |
| `scripts/docs-style/verify2.py` (2-line edit, D-31) | utility/CLI | transform (git-diff-driven link/anchor differ) | itself pre-edit — no other differ script in-repo shares its shape | no analog — first of its kind (see below) |
| `.claude/settings.local.json` Stop hooks (read, not edited — governs D-22's single-invocation constraint) | config | event-driven | n/a — read for constraint only | no analog needed |

## Bulk Corpus Class: `docs/**/*.md` landing

**Do not seek a per-file analog.** These ~280 files arrive as a `git apply --3way` patch
(`c97d322..e71f862`) against the live `docs/` tree. 277 apply cleanly; 3 conflict
(`docs/end-user-guides/android-work-profile-setup.md:130`, `docs/index.md:33`,
`docs/operations/patch-management/00-overview.md:241`) and are hand-resolved per CONTEXT.md D-05's
table (already fully specified there — the resolution direction per file is a decision, not a
pattern-search target). The one true "new content" edit inside this class is
`docs/_standards/EEE-SOP-standard.md:554` (`admin decision points`, a `sweep3.py`-driven
substitution) — this is a mechanical regex apply, not hand-authored prose, so no prose analog
applies; the pattern to follow is "run `sweep3.py --apply`," covered under Shared Patterns below.

## Pattern Assignments

### `154-GATE-BASELINE.json` (measurement artifact, batch)

**Analogs:**
1. `.planning/milestones/v1.20-phases/141-standalone-red-validator-set-chain-members-green/141-sweep-result.json` — structure for recording multiple validator-run results with pass/fail counts and exact tally-line strings, keyed by run identity.
2. `.planning/milestones/v1.20-phases/143-link-coverage-fence-mask-unification/.143-edge-coverage.json` — precedent for a dot-prefixed generated JSON artifact living directly in a phase directory (not under `scripts/`), cited explicitly by CONTEXT.md D-19.

**Structure to copy** (from `141-sweep-result.json`, full file read):
```json
{
    "cacheStateDeclared":  "warm",
    "ascendingOrder":  [48, 60, 61, ...],
    "totalWallClockMs":  764807,
    "results":  [
                    {
                        "member":  48,
                        "script":  "scripts/validation/check-phase-48.mjs",
                        "exitCode":  0,
                        "wallClockMs":  289,
                        "pass":  7,
                        "fail":  0,
                        "skipped":  0,
                        "tallyLine":  "Result: 7 PASS, 0 FAIL, 0 SKIPPED",
                        "cacheState":  "warm",
                        "anomaly":  false
                    }
                ]
}
```

**Applied shape per D-19:** top-level `gate_baseline` (the five SC#4 components + the SHA they ran
at — one object per component, same `script`/exit/pass-fail/tallyLine shape as above) and
`landing` (SC#1's post-merge shortstat + the four commit SHAs C1–C4). Exact key names/nesting are
Claude's Discretion (CONTEXT.md, "Claude's Discretion" section) — only the two top-level key names
are fixed.

---

### `.planning/REQUIREMENTS.md` / `.planning/ROADMAP.md` (annotate-and-supersede amendment)

**Analog:** `.planning/milestones/v1.20-phases/141-standalone-red-validator-set-chain-members-green/141-01-PLAN.md:24-25` (the amendment text itself) and `.planning/milestones/v1.20-GOV-02-LEDGER.md:64` (the ledger row documenting it, Phase 143 D-29).

**Exact marker format used previously** (grep-verified live in `.planning/milestones/v1.20-DEFERRED-CLEANUP.md:105`):
```
## C17-FROZEN-AWARE-RESIDUE-V15-V19: The C17 Contract-Presence Leg Stays Live-HEAD Across All Six C17-Bearing Harnesses (V15-V20) [SUCCESS-CRITERION AMENDMENT, D-08]
```
and inline, per `141-01-PLAN.md:24`:
```
ROADMAP.md Phase 141 SC#2 no longer prescribes the withdrawn classifier-context-window mechanism;
it carries an in-line [SUCCESS-CRITERION AMENDMENT, D-28] marker naming the stale-BASELINE_9
rebase, with the superseded wording preserved verbatim in the same block (D-27 annotate-and-supersede).
```

**Pattern to copy for Phase 154:** insert `[SUCCESS-CRITERION AMENDMENT, D-16]` (or the specific
D-NN owning the change — D-12 for the REQUIREMENTS/ROADMAP drift-figure correction, D-16 for SC#2
and VERIFY-01's "0 wanted edits over the landed set" rescoping) directly adjacent to the amended
bullet/line, and leave the original wording **in the same block**, not deleted. The
`check-phase-54.mjs` re-run afterward (below) is the gate that must stay green.

**Verification command** (from the Phase 143 ledger row, `v1.20-GOV-02-LEDGER.md:64`):
```
grep -c 'SUCCESS-CRITERION AMENDMENT, D-29' .planning/REQUIREMENTS.md .planning/ROADMAP.md
# = 2 + 6 = 8 in that precedent; Phase 154's own count will differ — assert count >= number of D-NN markers landed
```

---

### `scripts/docs-style/subs-admin-batch9.tsv` row 26 (D-23 fix)

**Analog:** row 25 in the same file — the immediately preceding row already uses the identical
negative-lookbehind-chain idiom for a different set of exemptions.

**Current row 26** (`subs-admin-batch9.tsv:26`, read verbatim):
```
(?<!Intune )(?<!Sub-Org )(?<!Google )(?<!Local )(?<!macOS )(?<!iOS )(?<!> )(?<!/ )(?<![\w-])Admin(?![\w-])(?! ?[A-Z])(?! log)(?! consent)(?! directory)(?! sees)(?! \(Intune\))(?!:)	Administrator
```

**Row 25, the sibling idiom this fix must match** (`subs-admin-batch9.tsv:25`):
```
(?<!Intune )(?<!Sub-Org )(?<![\w-])Admins(?! [A-Z])(?![\w-])	Administrators
```

**Fix per D-23:** add `(?<!Sure )` to row 26's existing lookbehind chain, in the same position/style
as the other product-name exemptions (`(?<!Intune )`, `(?<!Sub-Org )`, `(?<!Google )`, etc. — all
already present). Do not delete the row (would lose ~1,500 legitimate expansions per D-23).

**Verification (standing detector, D-23):** `grep -c "Sure Administrator" docs/` must be 0.

---

### `scripts/docs-style/_DISPOSITIONS-docs.tsv` (new sibling file, D-28)

**Analog:** `scripts/docs-style/_DISPOSITIONS.tsv` itself — same format, new file is a sibling not
a rewrite.

**Format** (from Tooling Inventory in RESEARCH.md, confirmed by direct read): 17 lines total
(3-line comment header + 14 data rows) in `_DISPOSITIONS.tsv`; row shape is
`<id><TAB><reason>` where `id = sha1(kind\x00file\x00evidence)[:12]` (fingerprint function at
`verify-meaning.py:52-55`, quoted below). The new file carries the **same six verbatim reasons**
under six new `docs/`-prefixed IDs (per D-28) — copy the six reason strings unchanged from
`_DISPOSITIONS.tsv`, recompute only the IDs against `docs/`-prefixed paths.

**`--dispositions` flag already exists — no source edit needed** (`verify-meaning.py:317-318`):
```python
disp_path = (sys.argv[sys.argv.index("--dispositions") + 1]
             if "--dispositions" in sys.argv else DISPOSITIONS)
```

**Fingerprint function to reproduce the IDs** (`verify-meaning.py:52-55`):
```python
def fingerprint(kind, f, evidence):
    """Keyed to the evidence text, so a disposition goes stale when the line
    changes again. A documented keep must not silence a future edit."""
    return hashlib.sha1(f"{kind}\x00{f}\x00{evidence}".encode("utf-8")).hexdigest()[:12]
```

---

### `scripts/docs-style/verify2.py` (2-line edit, D-31)

**No analog — first of its kind.** No other differ script in this repo hardcodes `HEAD~1` +
`Path('.')` in this exact shape; `verify-meaning.py` already takes `BASE` as `sys.argv[1]` (a
pattern this edit should copy) but is a different script with a different purpose (meaning-diff vs
link/anchor-diff). The executor must decide the argv-parsing style for the two edit sites; the
`verify-meaning.py` `sys.argv[1]` convention (below) is the nearest in-repo idiom to imitate, not a
literal analog.

**Current hardcoded lines to edit** (`verify2.py:27` and `:41`, both read verbatim):
```python
def baseline(f):
    return subprocess.run(['git', 'show', 'HEAD~1:' + f],
                          capture_output=True, text=True, encoding='utf-8').stdout
...
files = sorted(p for p in pathlib.Path('.').rglob('*.md') if '.git' not in p.parts)
```

**Nearest in-repo idiom for argv-driven BASE** (`verify-meaning.py:314-315`, for the executor to
imitate — not copy verbatim, different script):
```python
    base = sys.argv[1]
```

D-31 specifies: `HEAD~1` → an argv `BASE` at `:27`; `Path('.')` → `Path('docs')` at `:41`. Ship as
its own commit or ride with the baseline capture (Claude's Discretion), separable from the 277-file
landing commit.

---

## Shared Patterns (validators/scripts this phase RUNS, does not modify)

### C17 structural gate
**Path:** `scripts/validation/c17-eee-contract.mjs`
**Invocation:** `node scripts/validation/c17-eee-contract.mjs`
**Expected baseline (measured, HEAD `033acd54`):** `237 files checked, 0 with violations, 0 total violations`
**`.md`-only filter** (`c17-eee-contract.mjs:81`) and **walk root** (`c17-eee-contract.mjs:526`, `walkMd('docs')`) — the reason `_PINNED-HEADINGS.txt` (a `.txt`) is invisible to this gate (D-03).

### Apex chain validator
**Path:** `scripts/validation/check-phase-153.mjs` (current apex — highest-numbered `check-phase-*.mjs`)
**Invocation (non-nested, for baseline capture):** `node scripts/validation/check-phase-153.mjs`
**Expected baseline:** `111 PASS, 0 FAIL, 0 SKIPPED`
**`CHECK_PHASE_NESTED` read** (`check-phase-153.mjs:220`, `:228`, `:238`):
```javascript
const NESTED = process.env.CHECK_PHASE_NESTED === '1';
...
return { pass: true, skipped: true, detail: 'nested invocation (CHECK_PHASE_NESTED=1): skip recursive chain-guard expansion' };
...
const subEnv = { ...process.env, CHECK_PHASE_NESTED: '1' };
```
Use **non-nested** (unset) for the phase's own baseline capture — this is what produces the 111/0/0
figure with SKIPPED=0 (RESEARCH.md confirms this explicitly).

### `check-phase-54.mjs` (gates the REQUIREMENTS.md/ROADMAP.md amendment, D-13)
**Path:** `scripts/validation/check-phase-54.mjs`
**Invocation:** `node scripts/validation/check-phase-54.mjs`
**Expected baseline:** `32 passed, 0 failed, 0 skipped`
**Live dual-document read** (`check-phase-54.mjs:29-30`):
```javascript
const REQ  = ".planning/REQUIREMENTS.md";
const ROAD = ".planning/ROADMAP.md";
```
**V-54-27, the assertion that can actually fire on this phase's own artifacts** (`check-phase-54.mjs:437-442`):
```javascript
id: 27, name: "V-54-27: NEGATIVE — no bare '> **Platform:**' token across docs/ + .planning/ corpus (recursive .md walk per CONTEXT D-17:121)",
run() {
  // CONTEXT D-17 line 121 mandates corpus-wide scope (entire docs/ + .planning/ tree),
  // not just the 5 PATCH_FILES. Lexicon-family-preservation regression-guard.
  // Implementation: recursive readdirSync walk per Phase 48 D-25 file-reads-only pattern.
  function walkMd(dir, acc) {
```

### Nav-hub link checker
**Path:** `scripts/validation/check-nav-hub-links.mjs`
**Invocation:** `node scripts/validation/check-nav-hub-links.mjs`
**Expected baseline:** `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`
**Role:** the only automated detector in the toolchain that catches a wrong-direction android
conflict resolution (D-06).

### `sweep3.py` (Python, mechanical style-conformance sweep)
**Path:** `scripts/docs-style/sweep3.py`
**Argv parse, verbatim** (`sweep3.py:244-249`):
```python
if __name__ == "__main__":
    root, pinsfile = sys.argv[1], sys.argv[2]
    apply = "--apply" in sys.argv
    if "--subs" in sys.argv:
        # TSV of  regex <TAB> replacement, applied in file order (longest first).
        SUBS[:] = []
```
**Invocation (dry run, correct pins file):** `python scripts/docs-style/sweep3.py docs scripts/docs-style/_CONTENT-PINS.txt` — never `_EMDASH-PINS.txt` (STYLE-06).
**`KEEP_LINE`, 7 alternates** (`sweep3.py:47-49`):
```python
KEEP_LINE = re.compile(r"Tenant admin\b|Ask the user: \"|Enrolled via DEP"
                       r"|Create a local admin account|Tri-portal admin surface"
                       r"|Intune config profiles|via staging")
```
**`do_em` hardcoded off** (`sweep3.py:212`, inside the per-line loop): `do_em = False` — em-dash
substitution branch (`sweep3.py:88-89`, `EMDASH.subn("—", seg)`, spaced→tight) never executes in
any current invocation. Discharge STYLE-05 by asserting this flag unchanged.

### `verify-meaning.py` (Python, meaning-preservation differ)
**Path:** `scripts/docs-style/verify-meaning.py`
**Invocation forms:**
```
python scripts/docs-style/verify-meaning.py BASE [--dispositions FILE] [--json]
python scripts/docs-style/verify-meaning.py --self-test
```
**`main()` argv handling, verbatim** (`verify-meaning.py:312-320`):
```python
def main():
    if "--self-test" in sys.argv:
        return self_test()
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    base = sys.argv[1]
    disp_path = (sys.argv[sys.argv.index("--dispositions") + 1]
                 if "--dispositions" in sys.argv else DISPOSITIONS)
    files, findings, live, worklist, disp = run(base, disp_path)
```
**Expected `--self-test` output:** `PASS: 10/10 self-test assertions`

### Pin-verbatim differ (no tool — a one-off assertion, D-31)
**Do not run `pins2.py`** — it hardcodes the scratch repo as its corpus source
(`pins2.py:41-42`, `D = Path("D:/claude/docs-google-style-test")`) and would move the 562-pin
invariant onto the wrong tree if run post-merge. The pin differ is instead: assert every
`_CONTENT-PINS.txt` line occurs verbatim somewhere in `docs/` (measured 562/562, 0 lost, both sides
of the merge).

## No Analog Found

| File | Role | Data Flow | Reason |
|---|---|---|---|
| `docs/**/*.md` bulk landing (277 clean applies) | content | batch/foreign-patch-apply | No prior phase in this repo has landed a 280-file cross-repo `git apply --3way` patch — this is a first-of-its-kind mechanical operation, fully specified by CONTEXT.md D-01/D-02/D-07/D-20, not a prose-pattern-matching task. |
| `scripts/docs-style/verify2.py` argv-ification | utility/CLI | transform | No other in-repo differ script hardcodes `HEAD~1` + `Path('.')` in this exact shape; nearest idiom (`verify-meaning.py`'s `sys.argv[1]` BASE parameter) is a convention to imitate, not a literal analog — see Pattern Assignments above. |

## Metadata

**Analog search scope:** `.planning/milestones/v1.20-phases/`, `.planning/milestones/v1.20-GOV-02-LEDGER.md`, `.planning/milestones/v1.20-DEFERRED-CLEANUP.md`, `scripts/docs-style/*.py`, `scripts/docs-style/subs-admin-batch9.tsv`, `scripts/docs-style/_DISPOSITIONS.tsv`, `scripts/validation/check-phase-54.mjs`, `scripts/validation/check-phase-153.mjs`, `scripts/validation/c17-eee-contract.mjs`, `scripts/validation/check-nav-hub-links.mjs`.
**Files scanned:** 12 (all read directly this session; no re-reads of overlapping ranges).
**Pattern extraction date:** 2026-08-31
