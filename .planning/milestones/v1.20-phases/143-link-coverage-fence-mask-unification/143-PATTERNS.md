# Phase 143: Link Coverage & Fence-Mask Unification - Pattern Map

**Mapped:** 2026-08-11
**Files analyzed:** 1 checker (edited in place) + 8 sibling fence-mask files + ~46-49 corpus repair files + 4 governance files
**Analogs found:** File set is fixed by CONTEXT.md/RESEARCH.md — this document supplies copy-verbatim excerpts, not discovery.

The file set is already enumerated in CONTEXT.md D-11/D-16/D-32/D-33 and RESEARCH.md. There is
effectively **one file per role**, and in most cases the analog for a file IS itself (edited in
place) or one of its 8 fence-mask siblings. No cross-codebase analog search was needed; the
excerpts below are what the planner copies from.

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `scripts/validation/check-nav-hub-links.mjs` | validator/CLI (self, in-place edit) | batch/transform (corpus scan) | itself (pre-edit) + `c17-eee-contract.mjs`'s self-test/summary shape | exact (self) |
| `scripts/validation/c17-eee-contract.mjs` (fence site only) | validator/CLI | batch/transform | itself — paired-fence shape is the reference form | exact |
| `scripts/pipeline/convert.ps1` (fence site only) | pipeline/transform script | file-I/O (pandoc pre-pass) | itself — PowerShell single-toggle form | exact |
| `scripts/pipeline/retrofit-{guide,mermaid-structural,nav-hub,reference,runbook,structural}.mjs` (fence sites) | pipeline/transform script | file-I/O (batch rewrite) | `retrofit-guide.mjs:314` — single `mf` toggle form (all 6 share this shape) | exact |
| `docs/**` corpus repair files (~46-49) | content (Markdown) | CRUD (repair: link rewrite / anchor drop / `<a id>` insert) | `docs/admin-setup-android/13-aosp-meta-quest.md:62-65` (table-row `<a id>`); `docs/error-codes/01-mdm-enrollment.md` (D-08's proven-safe insertion site) | exact |
| `.planning/milestones/v1.20-CARVE.md` (Category 10 amendment) | governance ledger (Markdown) | append-only / event-driven | `v1.20-CARVE.md:151-154` (prior amendment bullet, D-35/RED-04) | exact |
| `.planning/milestones/v1.20-GOV-02-LEDGER.md` (new rows) | governance ledger (Markdown table) | append-only | `v1.20-GOV-02-LEDGER.md:55` (check-phase-67.mjs row — path-literal + symbol grep + cross-reference shape) | exact |
| `.planning/ROADMAP.md` / `.planning/REQUIREMENTS.md` (SC-amendment) | governance doc (Markdown) | transform (annotate-and-supersede) | in-line `**[SUCCESS-CRITERION AMENDMENT, D-NN]**` / `**[DISCHARGED, D-NN]**` marker pair (Phase 141 D-23, cited in CONTEXT D-30) | exact |

## Pattern Assignments

### `scripts/validation/check-nav-hub-links.mjs` (validator, batch/transform — edited in place)

**Analog:** itself. Four sub-patterns to copy exactly.

**1. `<a id>` insertion pattern — table-row precedent, quoted verbatim**
`docs/admin-setup-android/13-aosp-meta-quest.md:62-65` (one row of a Markdown table):
```
| <a id="quest-2-regional"></a>Meta Quest 2 | v49 | AR/VR Headset | Available in select regions only `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-25]` |
```
Placement rule visible in this live instance: the tag sits **immediately after the opening `|`
and its following space, with no space before the cell's visible text** — `| <a id="..."></a>Meta
Quest 2 |`, not `| <a id="..."></a> Meta Quest 2 |`. The tag is the very first token in the cell,
before any inline code or bold. A second real-corpus instance with a leading inline-code span
(`RESEARCH.md` Q4, `docs/error-codes/...`) confirms the same rule ahead of a code span:
```
<a id="user-content-0x80180014"></a><code>0x80180014</code>
```
i.e. `<a id="..."></a>` then immediately the backtick/code content, zero intervening space. Use
this exact shape for every Class-C row-anchor insertion (D-04/D-10): `<a id="EXACT-FRAGMENT"></a>`
prepended to the cell content, fragment spelled verbatim including case (Claude's Discretion note
in CONTEXT).

**2. `matchAll`-per-line recognition loop** (the shape LINK-01's new `<a id>` regex must follow,
and the shape the old `{#id}` loop already uses — copy the loop, swap the regex)
`check-nav-hub-links.mjs:137-143` (existing `{#id}` loop, to be deleted per Q1 but structurally
the template for the new `<a id>` loop):
```js
for (let i = 0; i < lines.length; i++) {
  if (fenceMask[i]) continue;
  for (const m of lines[i].matchAll(/\{#([a-zA-Z0-9_-]+)\}/g)) {
    set.add(m[1]);
  }
}
```
New recognition regex (RESEARCH Q3, verified against all 201 live instances, zero over-match):
```js
/<a\s+id\s*=\s*"([a-zA-Z0-9_-]+)"\s*>\s*<\/a>/g
```
Must be `matchAll`, not `.match()` — `docs/admin-setup-android/05-dedicated-devices.md:242`
carries two adjacent tags on one line
(`<a id="exit-kiosk-pin-synchronization"></a><a id="exit-kiosk-pin"></a>`), a single-match
implementation silently drops the second.

**3. Machine-readable summary line — the pattern to preserve, quoted verbatim**
`check-nav-hub-links.mjs:418-420`:
```js
process.stdout.write(
  `\ncheck-nav-hub-links summary: ${outboundFailures.length} outbound failure(s), ` +
  `${inboundFailures.length} inbound failure(s), ${allFailures.length} total\n`
);
```
Keep this shape (labelled counts + total) when widening for corpus-wide scope (D-12) — Phase 144
will pin *something* about this line (Pitfall 4), so widen the wording, not the format.

**4. `--self-test` house style — `padLabel` + `stAssert` + trailing counts + exit code**
`check-nav-hub-links.mjs:36-40` (`padLabel`):
```js
const LABEL_WIDTH = 60;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
```
`check-nav-hub-links.mjs:290-299` (self-test harness, `stAssert`):
```js
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag + (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }
  // ...cases A-G, each one stAssert() call with a literal-expectation label...
  process.stdout.write('\nSelf-test: ' + stPassed + ' passed, ' + stFailed + ' failed\n');
  process.exit(stFailed > 0 ? 1 : 0);
}
```
Existing case D (`:341-350`) is the one that must be **rewritten**, not added-to, per Q1 (GitHub
model, not Pandoc override):
```js
const overrideContent = '### Foo Bar {#custom-anchor}\n\nsome prose';
const overrideSet = computeAnchorSetFromContent(overrideContent);
stAssert(
  '{#id} override verbatim + auto-slug suppressed: has "custom-anchor", NOT "foo-bar"',
  overrideSet.has('custom-anchor') && !overrideSet.has('foo-bar'),
  `set: [${[...overrideSet].join(', ')}]`
);
```
New GitHub-model assertion must instead expect `foo-bar-custom-anchor` and assert absence of a
bare `custom-anchor` slug.

---

### `scripts/validation/c17-eee-contract.mjs` (validator — fence site + self-test/summary reference)

**Fence-mask site — paired open/close form** (one of the 15 sites LINK-05 rewrites; representative
of the 8 sites sharing this exact shape), quoted verbatim, `c17-eee-contract.mjs:150-176`:
```js
const inCodeFence = (() => {
  const mask = new Array(bodyLines.length).fill(false);
  let fenced = false;
  let fenceChar = '';
  let fenceLen = 0;
  for (let i = 0; i < bodyLines.length; i++) {
    const t = bodyLines[i];
    if (!fenced) {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m) {
        fenced = true;
        fenceChar = m[1][0];
        fenceLen = m[1].length;
      }
    } else {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m && m[1][0] === fenceChar && m[1].length >= fenceLen) {
        fenced = false;
      } else {
        mask[i] = true;
      }
    }
  }
  return mask;
})();
```
LINK-05's edit at every paired-form site: `^(`{3,}|~{3,})` → `^ {0,3}(`{3,}|~{3,})`, both the open
test and the close test, byte-identical otherwise (D-16).

**`--self-test` house style — `c17`'s own shape, near-identical to the checker's, quoted verbatim**
`c17-eee-contract.mjs:421-430`:
```js
if (SELF_TEST) {
  let stPassed = 0, stFailed = 0;

  function stAssert(label, pass, detail) {
    const tag = pass ? 'PASS' : 'FAIL';
    process.stdout.write(padLabel('[ST] ' + label) + tag +
      (detail ? ' -- ' + detail : '') + '\n');
    if (pass) stPassed++; else stFailed++;
  }
  // Sub-test A/B: fixture-passing / fixture-failing (0 violations / >=1 violation)
  // Sub-test C+: synthetic front-matter fixtures targeting one assertion each
```

**Machine-readable summary-line convention — the frozen shape Phase 144 will pin next**, quoted
verbatim `c17-eee-contract.mjs:573-587`:
```js
const counts = {};
for (let i = 1; i <= 13; i++) counts[i] = 0;
for (const v of allViolations) {
  if (v.assertion >= 1 && v.assertion <= 13) counts[v.assertion]++;
}
process.stdout.write(
  'C17 assertion-violation-counts: ' +
  Object.entries(counts).map(([k, v]) => '#' + k + '=' + v).join(' ') + '\n'
);
process.stdout.write(
  'C17 summary: ' + enrolledFiles.length + ' file' + (enrolledFiles.length !== 1 ? 's' : '') + ' checked, ' +
  filesWithViolations.length + ' with violations, ' +
  allViolations.length + ' total violation' + (allViolations.length !== 1 ? 's' : '') + '\n'
);
process.exit(allViolations.length > 0 ? 1 : 0);
```
This exact string `'C17 assertion-violation-counts:'` is pinned verbatim by
`check-phase-115.mjs:88` — do not touch it. `'--self-test'` is pinned at `check-phase-115.mjs:75`.
`'CHAIN_PHASES'` must remain **required-ABSENT** from this file (`check-phase-115.mjs:102`).

---

### `scripts/pipeline/retrofit-guide.mjs` (pipeline script — fence site, single-toggle form)

**Fence-mask site — single `mf` toggle form** (this shape is shared by all 6 `retrofit-*.mjs`
files' fence sites; only `retrofit-mermaid-structural.mjs` and `retrofit-nav-hub.mjs` have
additional paired-form sites elsewhere in the same files per the census), quoted verbatim,
`retrofit-guide.mjs:311-318`:
```js
let inFence = false, fenceChar = '', fenceLen = 0;
let firstH1Idx = -1;
for (let i = 0; i < bodyLines.length; i++) {
  const mf = bodyLines[i].match(/^(`{3,}|~{3,})/);
  if (!inFence && mf) {
    inFence = true; fenceChar = mf[1][0]; fenceLen = mf[1].length;
  } else if (inFence && mf && mf[1][0] === fenceChar && mf[1].length >= fenceLen) {
    inFence = false;
  } else if (!inFence && /^# [^#]/.test(bodyLines[i])) {
```
LINK-05's edit: `/^(`{3,}|~{3,})/` → `/^ {0,3}(`{3,}|~{3,})/` on the single regex literal that both
the open-check and close-check share (`mf` is computed once per line and reused for both branches
— unlike the paired form, there is only one regex literal to touch per site, not two).

---

### `scripts/pipeline/convert.ps1` (pipeline script — PowerShell fence form, D-17's tightening)

**Fence-mask site — PowerShell form**, quoted verbatim, `convert.ps1:104-113`:
```powershell
for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]

    # D-03(a): track ```/~~~ fenced-code state; never rewrite inside a fence
    if ($line -match '^\s*(```|~~~)') {
        if (-not $inFence) { $inFence = $true; $fenceChar = $Matches[1] }
        elseif ($line.TrimStart().StartsWith($fenceChar)) { $inFence = $false }
        continue
    }
    if ($inFence) { continue }
```
LINK-05's edit here is a **tightening**, not a widening (D-17): `'^\s*(```|~~~)'` currently matches
4+-space and tab indents and Unicode whitespace (`.NET \s` = `\p{Z}`); the target `^ {0,3}` is
strictly narrower. `[MEASURED]` 0 live instances of any of those wider forms exist today, so the
edit is behaviourally identical on the current corpus — record it as a tightening in the GOV-02
ledger row and CARVE amendment prose, not as "the same change applied a 15th time" (D-17 explicit
instruction).

---

### `.planning/milestones/v1.20-GOV-02-LEDGER.md` (governance ledger — append-only rows)

**Row schema**, quoted verbatim, `v1.20-GOV-02-LEDGER.md:19-22`:
```
| File | Grep command | Hit count | Regression gate run | Result | Plan |
|------|--------------|-----------|----------------------|--------|------|
```

**Prior row to copy the shape of**, quoted verbatim, `v1.20-GOV-02-LEDGER.md:55` (File + Grep
columns):
```
File: `scripts/validation/check-phase-67.mjs` (`:261` chain-spawn timeout raised 300000 -> 1800000, D-17, Plan 141-04 Task 2 — the ONLY edit this milestone makes to this file)
Grep command: Path-literal grep: `check-phase-67.mjs` across `scripts/`, `.github/`, `.planning/` (target-scoped, D-12). Symbol grep: `timeout: 300000`, `chicken-and-egg` across `scripts/validation/check-phase-67.mjs`. Cross-reference check: opened `check-phase-73.mjs:266-299` (`V-73-CONVERT-67-05/06`) and `check-phase-74.mjs:59,84` (comment-only line-range mentions) to confirm neither pins a raw line number against this file.
```
Copy this four-part shape per row: (1) path-literal grep across `scripts/`, `.github/`, **and**
`.planning/` (not just `scripts/`); (2) symbol-scoped grep for the exact text changing; (3) an
explicit cross-reference check of any validator that might pin the *old* value; (4) a "Result"
that states a concrete diff size (e.g. `git diff --numstat`), never a bare "PASS". Append-only,
one row per edit (not per path) — row 59 is the precedent for batching multiple `.planning/`
document edits into a single row when they're one SC-amendment commit.

---

### `.planning/milestones/v1.20-CARVE.md` (governance allowlist — Category 10 amendment)

**Prior amendment bullet to copy the shape of**, quoted verbatim, `v1.20-CARVE.md:151-154`:
```
- **D-35, RED-04 extended.** RED-04 as worded is already satisfied vacuously by V-30-02, whose
  regular expression is built from a double-quoted string and has never inspected a Mermaid
  block; the amendment brings that defect into RED-04's scope so the fix is authorized scope,
  not drift.
```
Pattern: bold `**D-NN, short label.**` lead-in with **one colon max, kept outside the bold span**
(this repo's decision-bullet grammar convention), followed by prose naming the defect/need and why
the amendment is authorized — never a bare glob addition with no rationale. For D-32's Category 10:
name the 132-anchor Class-B/C remedy set, cite the 46-47-file union figure, and cite D-32/D-04 as
the authorizing decisions.

**Amendment procedure to follow exactly**, quoted verbatim, `v1.20-CARVE.md:64-77`(cited in
RESEARCH Q7):
```
1. Touches only this file (.planning/milestones/v1.20-CARVE.md) — no other path, in-scope
   or out-of-scope, may be touched in the same commit.
2. Carries a one-line rationale for the addition, either in the commit message or as a new #
   comment line directly above the added glob(s) in the allowlist block.
3. Lands before the edit it authorizes — never in the same commit, never after.
```

## Shared Patterns

### Fence-mask unification (the single cross-cutting LINK-05 pattern)
**Source:** `check-nav-hub-links.mjs:82-103` (buildFenceMask, the most complete/commented instance)
**Apply to:** all 15 sites across the 9 Pillar-C files
```js
function buildFenceMask(lines) {
  const mask = new Array(lines.length).fill(false);
  let fenced = false, fenceChar = '', fenceLen = 0;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i];
    if (!fenced) {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m) { fenced = true; fenceChar = m[1][0]; fenceLen = m[1].length; }
    } else {
      const m = t.match(/^(`{3,}|~{3,})/);
      if (m && m[1][0] === fenceChar && m[1].length >= fenceLen) {
        fenced = false;
      } else {
        mask[i] = true;
      }
    }
  }
  return mask;
}
```
The universal edit: prefix `^` with ` {0,3}` inside every regex literal of this shape — both the
open-test and close-test regex in paired-form sites (8 sites: c17 x2, check-nav-hub-links x2,
mermaid-structural x2, nav-hub x2 per the census — see CONTEXT fence census for the exact
`file:line` list), the single shared regex in single-toggle-form sites (6 retrofit-*.mjs), and the
PowerShell `-match` pattern (`convert.ps1:108`). No shared `_lib/fence-mask.mjs` — copy-verbatim
with a provenance comment citing the source site, per D-16 (locked).

### `<a id>` table-row insertion (LINK-01/D-04 Class-C remedy)
**Source:** `docs/admin-setup-android/13-aosp-meta-quest.md:62-65`
**Apply to:** every Class-C corpus repair row (D-10's editorial-choice rows included)
```
| <a id="EXACT-FRAGMENT-VERBATIM"></a>Cell visible text… | … |
```
No space between `</a>` and the following content; fragment spelling matches the incoming link
fragment exactly, including case (Claude's Discretion, CONTEXT).

### Self-test / summary-line house style
**Source:** `check-nav-hub-links.mjs:36-40,290-299,418-420` and `c17-eee-contract.mjs:421-430,573-587`
**Apply to:** the widened `check-nav-hub-links.mjs` self-test additions (GitHub `{#id}` model case,
`<a id>` recognition case, inline-mask case) and its summary line
- `padLabel` + `[ST] <label> PASS/FAIL -- <detail>` line shape — reuse verbatim.
- Keep the existing `check-nav-hub-links summary: ${outbound} outbound failure(s), ${inbound}
  inbound failure(s), ${total} total` **shape**, only widen the semantics (D-12) and soften
  wording that implies a 4-hub-only scan (RESEARCH Pitfall 4) — do not invent a new format, since
  Phase 144's `check-phase-143.mjs` will very likely pin *something* about it, following the
  `'--self-test'` / `'C17 assertion-violation-counts:'` / `'CHAIN_PHASES'`-absent three-pin
  precedent on the c17 sibling file.

### GOV-02 ledger + CARVE amendment (governance, applies to every frozen-file edit this phase makes)
**Source:** `v1.20-GOV-02-LEDGER.md:55`, `v1.20-CARVE.md:64-77,151-154`
**Apply to:** all 9 Pillar-C fence edits + the LINK-01 checker edit + the Category-10 corpus set
Each frozen-path edit needs: (1) a target-scoped path-literal grep across `scripts/`, `.github/`,
`.planning/`, (2) a symbol-scoped grep for the specific text changing, (3) an explicit
cross-reference check against known pinning validators (`check-phase-115/120/113/123/124.mjs` per
CONTEXT's Pin-safety section), (4) a ledger row with a concrete diff-size Result — all **before**
the edit lands, and the Category-10 CARVE amendment must land in its own commit before any of the
~46-47 files it authorizes is touched (D-09 rule 3, D-31 commit ordering).

## No Analog Found

None. Every file in this phase's fixed set has either itself (pre-edit) or a same-repo sibling
file sharing its exact structural role as its analog — this is expected given RESEARCH.md's own
finding that LINK-05 is condition-removal/duplication, not new-feature construction, and that
LINK-01/02 are net deletions inside an existing file (Pitfall 1).

## Metadata

**Analog search scope:** `scripts/validation/`, `scripts/pipeline/`, `docs/**` (targeted greps
only, per RESEARCH.md's own file:line citations), `.planning/milestones/`.
**Files scanned/read this session:** `check-nav-hub-links.mjs` (self-test + summary regions),
`c17-eee-contract.mjs` (fence site, self-test, summary regions), `retrofit-guide.mjs` (fence
site), `convert.ps1` (fence loop) — all other excerpts sourced from 143-CONTEXT.md /
143-RESEARCH.md's own already-verbatim, file:line-cited quotes (both documents explicitly state
these were read with the Read tool this/a prior session; re-reading identical ranges was avoided
per the no-re-read rule).
**Pattern extraction date:** 2026-08-11
