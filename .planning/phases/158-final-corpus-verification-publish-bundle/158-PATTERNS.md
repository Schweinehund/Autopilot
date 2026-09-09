# Phase 158: Final Corpus Verification & Publish Bundle - Pattern Map

**Mapped:** 2026-09-07
**Files analyzed:** 21 (6 new tool/data files, 1 tool edit, 1 docstring date-stamp, 5 corpus edits, 1 skill doc, 6 phase-dir records, 3 planning-doc amendment targets — em-dash sweep itself uses byte-unchanged `sweep3.py`)
**Analogs found:** 21 / 21

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/docs-style/audit-claimed-fixes.mjs` (NEW) | utility (git-history auditor) | batch/transform (git object reads → JSON rows) | `scripts/pipeline/guard-docx.mjs` (self-test tmpdir pattern) + `scripts/docs-style/verify2.py` (argv-driven git-diff auditor) | role-match (no existing git-history-audit script; nearest is verify2's diff-driven health check) |
| `scripts/docs-style/158-FIX-AUDIT.json` | config/data (audit output) | batch | `.planning/phases/156-*/156-GATE-BASELINE.json` (structured measurement JSON with `prediction`/`agreement`/`invocation` fields) | exact shape-match |
| `scripts/docs-style/158-FIX-AUDIT-RUN.txt` | log/data | batch | `152-02-bundle-run.txt` (verbatim captured stdout beside a JSON/CSV artifact) | exact |
| `scripts/docs-style/_DISPOSITIONS-158.tsv` | config/data (disposition table) | CRUD (key→verdict lookup) | `scripts/docs-style/_DISPOSITIONS-batch10.tsv` | exact (same sibling-file convention, same tool reads it) |
| `scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv` | config/data | CRUD | `scripts/docs-style/_DISPOSITIONS-batch10.tsv` (sibling-file convention) + `_DISPOSITIONS-docs.tsv` (frozen precedent) | role-match |
| `scripts/docs-style/_JUDGE-VERDICTS-158.json` | config/data (judge transcript) | batch | `_JUDGE-VERDICTS-batch10.json` (structure only — note its hardcoded phase-dir path at `:13` is the named anti-pattern, do NOT copy that field) | exact-with-caveat |
| `scripts/docs-style/judge-packets.py` (EDIT ~10 lines) | utility | transform | itself, pre-edit (`:75-127` `packets()`, `:113-114` `j is None` window) | exact (in-place edit) |
| `scripts/validation/check-prose-style.py:50-58` (date-stamp edit) | validator/config | request-response (gate) | itself, pre-edit; `:50-58` exclusion-record block | exact (in-place edit) |
| `158-GATE-BASELINE.json` (phase dir) | config/data (drift record) | batch | `156-GATE-BASELINE.json` (`phase_baseline.{path_note, resolver, before, after, comparison, guards}`) | exact |
| `158-BUNDLE-RUN.txt` | log | batch | `152-02-bundle-run.txt` | exact |
| `158-BUNDLE-MANIFEST.csv` | data (citation copy) | batch | `152-02-SUMMARY.md`'s manifest citation practice; `build-publish-bundle.mjs:164-175` `writeManifestCsv` (source format) | exact |
| `158-JUDGE-PROMPT.md` | config/data (dispatch prompt) | request-response (LLM dispatch) | `156-JUDGE-PROMPT.md` (retitled + blocklist extended per D-56) | exact (copy-and-extend) |
| `158-JUDGE-FINDINGS.md` | data/narrative | batch | `157-VERIFICATION.md` (findings-and-hand-off narrative shape) | role-match |
| `158-SWEEP-DISPOSITIONS.md` | data/narrative | batch | `156-05-SUMMARY.md` narrative-with-arithmetic sections | role-match |
| `docs/_standards/EEE-SOP-standard.md` (R1/R2/D-42 edits) | content (corpus doc) | CRUD (text replace) | itself, pre-edit — a C17-enrolled STD-doc; `9a68aa1a` (157's own same-file same-entry precedent for "no VH row") | exact |
| `docs/_glossary-linux.md:143` (R3 edit) | content | CRUD | `docs/operations/patch-management/05-linux-update-delivery.md:262` (the cross-reference target's own Source-line pattern) | exact |
| `docs/index.md:305`, `docs/operations/00-index.md:28` (D-10 `via`→`using`) | content | CRUD (single-token substitution) | `sweep3.py`'s own `subs-via-sense.tsv` rule shape (hand-applied here, not swept) | role-match |
| `.claude/skills/google-style-verify/SKILL.md:54-56` (R7/D-43) | doc/config | CRUD | itself, pre-edit; `google-style/check.py.bak` divergence noted as the anti-pattern context, not copied | exact |
| `.planning/REQUIREMENTS.md` / `ROADMAP.md` / `STATE.md` (amendment blocks) | config/data (planning doc) | CRUD (append block) | `ROADMAP.md:88-90,:121,:153` (`[SUCCESS-CRITERION AMENDMENT, D-NN]` precedent tokens) + `155-03-PLAN.md`/`157-*` amendment commits | exact |
| em-dash sweep (`docs/*.md`, 15 files, via unmodified `sweep3.py` + `subs-emdash-batch10.tsv`) | content (mechanical edit) | batch/transform | `sweep3.py` itself run in Phase 156/157 (tool byte-unchanged; this is a data-only run) | exact |
| `dist/docs-library-v1.22.zip` (gitignored, not committed) | build artifact | batch (pipeline) | `dist/docs-library-v1.21.zip` produced by `build-publish-bundle.mjs` in 152-02/153-14 | exact |

## Pattern Assignments

### `scripts/docs-style/audit-claimed-fixes.mjs` (utility, batch/transform) — NEW

**Analogs:** `scripts/pipeline/guard-docx.mjs` (self-test tmpdir fixture pattern) and the confirmed-safe argv pattern already spelled out in `158-RESEARCH.md`'s Code Examples section (verbatim, reuse directly — do not re-derive):

**Core git-argv pattern (no shell string, `--` terminator always, D-20/D-53):**
```javascript
import { execFileSync } from 'node:child_process';

function gitLsTreeNonEmpty(rev, path) {
  const out = execFileSync('git', ['ls-tree', '-r', '--name-only', rev, '--', path],
                            { encoding: 'utf8' });
  return out.trim().length > 0;
}

function countOccurrences(rev, path, needle) {
  if (!gitLsTreeNonEmpty(rev, path)) throw new Error(`bad pathspec at ${rev}: ${path}`);
  try {
    const out = execFileSync('git', ['grep', '-o', '-F', '-e', needle, rev, '--', path],
                              { encoding: 'utf8' });
    return out.split('\n').filter(Boolean).length; // rc 0: count non-empty lines
  } catch (err) {
    if (err.status === 1) return 0;   // rc 1: zero matches (guard already ran above)
    throw err;                         // rc >= 2: real git error
  }
}
```

**Self-test fixture pattern (`guard-docx.mjs:205-245`, adapted for a *git* repo, not just a tmpdir):**
```javascript
if (SELF_TEST) {
  console.log('audit-claimed-fixes --self-test\n');
  let stPassed = 0, stFailed = 0;
  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write('[ST] ' + label + ' ' + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }
  const tmpDir = join(tmpdir(), 'audit-claimed-fixes-selftest-' + Date.now());
  mkdirSync(tmpDir, { recursive: true });
  try {
    execFileSync('git', ['init', '-q', tmpDir]);
    execFileSync('git', ['-C', tmpDir, 'config', 'user.email', 'test@test']);
    execFileSync('git', ['-C', tmpDir, 'config', 'user.name', 'test']);
    execFileSync('git', ['-C', tmpDir, 'config', 'init.defaultBranch', 'master']);
    // ... write fixtures, commit parent, edit, commit fix, assert per D-48(a)-(d)
  } finally {
    rmSync(tmpDir, { recursive: true, force: true });
  }
}
```
This is the one genuinely new mechanism (RESEARCH.md's own conclusion) — no existing `--self-test` in this stack builds a git repo; `guard-docx.mjs` only supplies the tmpdir-fixture shape.

**Row schema (from D-47, copy verbatim into the script's JSDoc/type comment):**
```
{ id, source:{kind, ref}, claim (<=200 chars; secret rows redacted), kind: corpus-consistency|external-fact|replace|deletion|secret,
  fix_sha, path, evidence_path?, needle (literal, never regex; null for secret),
  assert:[{op, value?}], verified_by?, note? }
```
Ops: `present_at_parent`, `absent_at_parent`, `present_at_head`, `absent_at_head`, `count_at_head_eq`, `count_decreased_vs_parent`, `count_increased`, `introduced_then_removed`.

**Error handling:** fail loud on `null` from any resolver (matches `archive-path.mjs`'s "CALLER OWNS FAIL SEMANTICS" convention below) and on any rc ≥ 2 from git.

---

### `158-GATE-BASELINE.json` (config/data, batch)

**Analog:** `.planning/phases/156-*/156-GATE-BASELINE.json`

**Structure to copy** (`:1-16` of the 156 file):
```json
{
  "phase_baseline": {
    "sha": "...", "sha_short": "...", "branch": "...", "measured_at": "...",
    "path_note": "Phase NNN and Phase NNN+1 must RESOLVE this artifact's path rather than hardcode it -- .planning/phases/ relocates to .planning/milestones/vX.Y-phases/ at milestone close.",
    "...": "each measured block carries: note, the exact invocation string, the measured value, and (where a prediction exists) a prediction/agreement sub-object"
  }
}
```
Per D-19/D-51, extend this shape with `resolver` (helper + roots + on-null exit), `embedded_156`, `embedded_157`, `before`, `after`, `comparison.components`, `deterministic_slice`, `recorded`, `drift[]` (`{component, metric, before, after, attributed_to, cmd, args, extractor, comparator, evidence}`), `unattributed_rows`, `discharge.sc3`, `discharge.sc4`, `final_apex_recorded_in`. Every `cmd`/`args` pair follows D-20's `{cmd, args[]}` shape — never a shell string, matching the same discipline as the auditor above.

**Path resolution — copy verbatim, do not reimplement:**
```javascript
// scripts/validation/_lib/archive-path.mjs
export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  if (typeof phaseSuffix !== 'string' || phaseSuffix.trim() === '') return null;
  const live = '.planning/phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  for (const root of milestoneRoots) {
    const archived = '.planning/milestones/' + root + '/' + phaseSuffix;
    if (existsSync(join(process.cwd(), archived))) return archived;
  }
  return null;
}
```
Call with `resolveArchivedPhasePath(suffix, ['v1.22-phases'])`; the caller (not the helper) must exit loud on `null` — this is the exact contract D-19 requires.

---

### `_DISPOSITIONS-158.tsv` / `_STYLE-DISPOSITIONS-158.tsv` (config/data, CRUD)

**Analog:** `scripts/docs-style/_DISPOSITIONS-batch10.tsv`

**Header/comment convention to copy:**
```
# Dispositions for verify-meaning.py, batch-10 sibling of _DISPOSITIONS.tsv and
# _DISPOSITIONS-docs.tsv (D-20/D-21, phase 156-03). New sibling file per the plan's
# explicit instruction -- _DISPOSITIONS-docs.tsv is frozen at exactly 6 data rows by a
# Phase 154 contract and batch-10 findings must never be appended to it.
```
Rename references to 158's own predecessor files (`_DISPOSITIONS-batch10.tsv`/`_DISPOSITIONS-docs.tsv` stay frozen — never append to them, per D-13). `_STYLE-DISPOSITIONS-158.tsv` columns per D-59: `file ord line rule token verdict ground fix_sha post_line` (no anchor column — an explicit ruled omission, do not add one).

---

### `158-JUDGE-PROMPT.md` (config/data, request-response)

**Analog:** `156-JUDGE-PROMPT.md`

**Copy verbatim then extend** (per D-56): the file's opening framing (`:1-9`) and decision-procedure sections (`:21-60`, INVERTED/STRENGTHENED) are reused byte-for-byte with only the title changed. Add to the blocklist: `157-*`/`158-*` planning documents, `_DISPOSITIONS-158.tsv`, `_STYLE-DISPOSITIONS-158.tsv`, `_JUDGE-VERDICTS-158.json`, `158-FIX-AUDIT*`, `157-BASELINE.json`, and `scripts/validation/check-prose-style.py` **first** in the blocklist enumeration (its docstring is an answer key). Widen the `fix` definition to admit `before_region` and multi-line fixes, and add the reword-not-reinstate rule for a non-PRESERVED verdict on a deletion.

---

### `judge-packets.py` (utility, transform) — ~10-line edit

**Analog:** itself, pre-edit. Target lines (confirmed by RESEARCH): `:75-127` `packets()`, specifically the `j is None` window at `:113-114` which "collapses to `newL[0:5]`, the top of the file" — the bug D-57 fixes. Add `before_region` (every baseline line of the containing opcode block) to the emitted packet dict alongside existing keys (`file`, `baseline_line`, `new_line`, `risk`, `lost`, `before`, `after`, `context_after` — confirmed from the judge prompt's own "What you will be given" section). No `--self-test` commit; a two-case scratch demonstration is recorded in the commit message/SUMMARY instead (D-57).

**Gate for this commit:** `git show --stat <commit> -- docs/` must be empty (tool edit lives in `scripts/docs-style/`, so this is unconditionally satisfied — still assert it per D-69 constraint 2).

---

### `check-prose-style.py:50-58` (validator, request-response) — date-stamp edit

**Analog:** itself, pre-edit. The existing exclusion-record block:
```python
# ── Fixed locations, resolved by file location (never by an assumed cwd or by a git-derived
# repo root -- an empty-repo invocation must still find these two real files). ──────────────
_SCRIPT_DIR = pathlib.Path(__file__).resolve().parent          # scripts/validation/
_DEPS_ROOT = _SCRIPT_DIR.parent.parent                          # repository root
CHECKPY_PATH = _DEPS_ROOT / ".claude" / "skills" / "google-style" / "check.py"
SWEEP3_PATH = _DEPS_ROOT / "scripts" / "docs-style" / "sweep3.py"
```
D-45 requires **one appended dated line** stating the em-dash pair and directional-pair figures are now stale and not re-derivable — append as a comment line near this block, never edit the existing prose, never re-measure the numbers.

**Reuse pattern for any in-process `check.py`/`sweep3.py` import** (used by the plan's disposition-enumeration task per D-60, not a new script):
```python
def _load_module(name, path):
    spec = importlib.util.spec_from_file_location(name, str(path))
    if spec is None or spec.loader is None:
        sys.exit("check-prose-style: cannot load %s from %s" % (name, path))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod
```
Import `RULES`/`mask_code` from `check.py` and `PROTECT`/`HEADING`/`FENCE`/`KEEP_LINE`/`quoted_lines` from `sweep3.py` — fail loudly on any missing symbol, never reimplement the regex (same discipline `check-prose-style.py:167-183` already applies).

---

### Corpus content edits (`docs/_standards/EEE-SOP-standard.md`, `docs/_glossary-linux.md`, `docs/index.md`, `docs/operations/00-index.md`)

**Role:** content (Markdown prose), **data flow:** CRUD (targeted single-sentence/token replace), never a rewrite.

**Analog for "no VH row" convention:** `9a68aa1a`'s own same-file same-entry precedent (D-14) — glossary edits get no new Version History row; `EEE-SOP-standard.md` DOES get one (its own v1.19 HYG-05 precedent, "the prior claim was empirically false").

**Analog for the cross-reference edit at `_glossary-linux.md:143`:** the target it points to, `docs/operations/patch-management/05-linux-update-delivery.md:262`:
```
**Source:** [How to upgrade your Ubuntu release](...) (Canonical, updated 2026-07-06)
```
D-44 requires the glossary entry gain a second link to `05#reboot-handling` — no new `**Source:**` line in the glossary itself (`[CITED:` is barred as a provenance-deficit marker, D-44).

---

### `.claude/skills/google-style-verify/SKILL.md:54-56` (doc/config, CRUD)

**Analog:** itself, pre-edit. Fix the two broken invocations (`verify2.py <BASE>`; `pins2.py scripts/validation docs > <file>`) to use Windows-safe paths, per D-43. Do not touch `google-style/check.py.bak` or the user-level copy — those are the named divergence, owner action only (D-33).

---

### Planning-document amendment blocks (`REQUIREMENTS.md`, `ROADMAP.md`, `STATE.md`)

**Analog:** the existing amendment tokens at `ROADMAP.md:88-90`, `:121`, `:153`.

**Shape to copy exactly** (D-66):
```
**[SUCCESS-CRITERION AMENDMENT, D-16]** [MEASURED, plan 158-NN]: <figure> via `<exact command>` — <what changed and why>.
```
No placeholders, no bare `05-compliance-policy` filename literal (V-54-21), no bare Platform blockquote token. `STATE.md` gets a new `- [Phase 158]:` bullet — never a rewrite of the existing `:159` Phase-155 scrub bullet.

---

### Bundle rebuild (`dist/docs-library-v1.22.zip`, gitignored)

**Analog:** `152-02-SUMMARY.md` (22 inline assertions) and `153-14-SUMMARY.md` (3 inline assertions) — both ran the 12(/22/3)-assertion set **inline in the plan task**, never via a `verify-bundle.mjs` script (D-23, reaffirmed after two new-tool proposals were reversed in adversarial review).

**Invocation (own Bash call, nothing else, 600000ms cap, D-22):**
```
node scripts/pipeline/build-publish-bundle.mjs --version=v1.22
```
stdout+stderr → `158-BUNDLE-RUN.txt` verbatim.

**Safe import pattern** (never import `build-publish-bundle.mjs` itself — it parses argv and calls `deriveZipName` at load time outside any guard):
```javascript
import { parseRegistry } from './build-filename-map.mjs'; // main is isMainModule-guarded, safe
```

**12 inline assertions:** see CONTEXT D-23(1)-(12) verbatim — copy that list directly into the plan task, do not re-derive.

## Shared Patterns

### Argv-only git/subprocess invocation (no shell string, ever)
**Source:** `158-RESEARCH.md` Code Examples (`execFileSync('git', [...])`, `--` terminator, `git ls-tree` pre-count guard)
**Apply to:** `audit-claimed-fixes.mjs`, every `{cmd, args[]}` `drift[]` row in `158-GATE-BASELINE.json`, and any inline verify task that shells out to git or `check.py`/`sweep3.py`. Never wrap a recorded command in a second `bash -c` (D-20's 53-zero-byte-file incident).

### Self-test fixture in `os.tmpdir()`, never against the live corpus
**Source:** `scripts/pipeline/guard-docx.mjs:205-245`
**Apply to:** `audit-claimed-fixes.mjs --self-test` (extended to a git-repo fixture per D-48).

### Fixed-location module import, fail loud on missing symbol
**Source:** `scripts/validation/check-prose-style.py:158-183`
**Apply to:** any in-process reuse of `check.py`'s `RULES`/`mask_code` or `sweep3.py`'s `PROTECT`/`HEADING`/`FENCE`/`KEEP_LINE`/`quoted_lines` (D-60's disposition-enumeration task).

### Archived-path resolution, caller owns fail semantics
**Source:** `scripts/validation/_lib/archive-path.mjs`
**Apply to:** every cross-archival read in `158-GATE-BASELINE.json` and any hand-off note referencing 156/157 artifacts. Pass `['v1.22-phases']`.

### Inline bundle assertions, no new verifier tool
**Source:** `.planning/milestones/v1.21-phases/152-*/152-02-SUMMARY.md`, `153-*/153-14-SUMMARY.md`
**Apply to:** the bundle-rebuild plan task (D-23).

### Annotate-and-supersede planning amendments
**Source:** `ROADMAP.md:88-90,:121,:153` existing `[SUCCESS-CRITERION AMENDMENT]` tokens
**Apply to:** all six D-66 amendment blocks across REQUIREMENTS.md/ROADMAP.md/STATE.md.

## No Analog Found

None — every file this phase creates or edits has at least a role-match analog in the existing corpus/tooling (see table above). The nearest-miss is `audit-claimed-fixes.mjs`, which has no single close analog for its git-history-audit *purpose* but composes two confirmed existing patterns (guard-docx's tmpdir self-test shape + verify2's argv-driven git-diff auditor shape) per RESEARCH.md's own explicit recommendation.

## Metadata

**Analog search scope:** `scripts/docs-style/`, `scripts/validation/`, `scripts/validation/_lib/`, `scripts/pipeline/`, `.planning/phases/156-*/`, `.planning/phases/157-*/`, `.planning/milestones/v1.21-phases/152-*/`, `docs/_standards/`, `docs/_glossary-linux.md`, `.claude/skills/google-style-verify/`
**Files scanned:** 12 read directly this session (in addition to CONTEXT/RESEARCH's own citations, which supplied the majority of concrete line-numbered excerpts already verified against HEAD)
**Pattern extraction date:** 2026-09-07
**Tracked-source gate:** all analog paths confirmed via `git ls-files` before citation; none resolve to a gitignored mirror.
