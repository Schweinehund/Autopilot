# Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes - Research

**Researched:** 2026-07-10
**Domain:** Local CLI build-pipeline orchestration (PowerShell 7 + Node.js, zero external dependencies) over an existing, green single-doc MD→.docx conversion pipeline
**Confidence:** HIGH — every finding below was reproduced live against the actual repo (pandoc 3.7.0.2, PowerShell 7.5.8, Node v24.17.0 all confirmed installed and pinned-version-matched on this machine), not inferred from training data.

## Summary

Phase 126 does not need to invent conversion or guard logic — `scripts/pipeline/convert.ps1` and
`scripts/pipeline/guard-docx.mjs` are both already green, single-doc tools. The work is pure
orchestration: loop the registry's 221 `Status: Approved` rows, shell out to the existing tools per
doc, collect every failure before deciding anything, and on a 100% clean pass write a CSV manifest +
static README + zip. Two live empirical findings materially change the plan's scope versus what
CONTEXT.md/REQUIREMENTS.md literally say:

1. **HYG-02's stated scope (`docs/_glossary-android.md` only) is insufficient.** The stale
   `phase_46_wave2_retrofit` frontmatter key that trips `guard-docx.mjs`'s CUSTOM-PROPS check exists
   in **5** Approved-registry files, not 1. Converting and guarding `RE-095`
   (`docs/admin-setup-android/03-fully-managed-cobo.md`) live reproduces the exact same
   `CUSTOM-PROPS FAIL` as the already-logged `DEFER-125-06-A` for RE-179. If HYG-02 fixes only
   `_glossary-android.md`, PUB-02's full-corpus fail-closed gate will still trip on the other 4 —
   the batch will never produce a zip. See **Open Questions #1** and **Common Pitfalls #1**.
2. **`guard-docx.mjs` takes exactly one positional `.docx` path per invocation** — there is no
   batch/multi-path mode. The orchestrator must invoke it once per converted file (221 invocations),
   exactly mirroring how it must invoke `convert.ps1` once per source file.

Beyond that, three additional live-verified facts should directly shape the plan: (a) a PowerShell
script invoked via `&` from within another script does **not** propagate a bare `exit 1` up to the
caller — `$LASTEXITCODE` is set and execution continues, which is the mechanism a `.ps1` orchestrator
needs for D-07's "collect all failures" semantics; (b) `pwsh.exe` cold-start (~395ms/invocation) is
~3.5x more expensive than `node` cold-start (~112ms/invocation) on this machine, which matters at
221x scale; (c) `SOURCE_DATE_EPOCH` genuinely pins pandoc's `docProps/core.xml` timestamp (verified:
setting it to `1700000000` produced `2023-11-14T22:13:20Z` in the output docx) — confirming
CONTEXT.md's characterization of it as a real, working, but non-load-bearing determinism lever.

**Primary recommendation:** Build a single zero-dependency Node `.mjs` batch orchestrator
(`scripts/pipeline/build-publish-bundle.mjs`, matching the existing `retrofit-*.mjs` /
`build-filename-map.mjs` family convention of one Node process looping over N files and aggregating
results) that shells out to `pwsh -File convert.ps1` and `node guard-docx.mjs` per doc, then shells
out **once** to PowerShell's native `Compress-Archive` (`Microsoft.PowerShell.Archive`, ships with
PS7 — zero new dependency) to produce the final zip. Expand HYG-02 to cover all 5 stale-key files.

## Architectural Responsibility Map

This is a local CLI build pipeline, not a client/server app — the standard browser/API/DB tiers don't
apply. Mapped instead to pipeline stages:

| Capability | Primary Stage | Secondary Stage | Rationale |
|------------|---------------|------------------|-----------|
| Publish-set selection (Approved rows) | Orchestrator (Node) | Registry file (`RE-index.md`) | Registry-driven, never a glob (D-11); orchestrator reads/filters it |
| MD→.docx conversion | `convert.ps1` (PowerShell + pandoc) | Orchestrator (invokes per-doc) | Existing pinned tool; orchestrator must NOT reimplement pandoc invocation |
| Post-conversion guard | `guard-docx.mjs` (Node) | Orchestrator (invokes per-docx, aggregates) | Existing tool, one-path-per-call; orchestrator composes into batch fail-closed |
| Filename resolution | `filename-map.md` (generated) | `build-filename-map.mjs` (regenerator) | RE-ID -> output filename join key; regenerate before each run for freshness |
| Frontmatter status/last_verified extraction | Orchestrator (reads each source `.md`) | — | Registry `Status` (EEE lifecycle) ≠ frontmatter `status` (D-12); manifest needs the latter |
| Manifest + README authoring | Orchestrator (Node, writes CSV+MD) | — | Deterministic, no timestamps (D-04) |
| Atomic staging → promote | Orchestrator (filesystem ops) | — | D-07: only promote after ALL conversions AND ALL guards pass |
| Zip creation | PowerShell `Compress-Archive` | Orchestrator (invokes once, at the end) | Native PS7 module, zero new dependency; no npm zip lib in this repo |
| Build artifact storage | Gitignored `dist/` or `.pipeline-output/` subdir | — | D-01/D-02: never committed, per-milestone versioned |

## Standard Stack

### Core (all pre-existing, pinned, and already verified installed on this machine)

| Tool | Version | Purpose | Why Standard |
|------|---------|---------|---------------|
| pandoc | 3.7.0.2 (pinned) | MD→.docx conversion engine | `convert.ps1` hard-asserts this exact version; confirmed installed at `%LOCALAPPDATA%\Pandoc\pandoc.exe` [VERIFIED: live `pandoc --version` on this machine] |
| PowerShell | 7.5.8 (>= 7.0 required) | `convert.ps1` host (`#Requires -Version 7.0`) | `Set-Content -Encoding utf8NoBOM` (PIPE-03) requires PS6+; confirmed `pwsh` 7.5.8 present [VERIFIED: live `pwsh -Version`] |
| Node.js | v24.17.0 | `guard-docx.mjs`, `build-filename-map.mjs`, and the new orchestrator | Zero-npm-dependency convention already established across `scripts/pipeline/*.mjs` [VERIFIED: live `node --version`] |
| `Microsoft.PowerShell.Archive` (`Compress-Archive`) | 1.2.5, ships with PS7 | Zip creation | Native, zero new dependency; confirmed working (`Compress-Archive -Path ... -DestinationPath ...`) [VERIFIED: live test run, produced a valid 23271-byte zip] |

### Supporting

No new libraries are needed. The root `package.json` has **no `dependencies` field at all** — the
entire `scripts/pipeline/` family is intentionally zero-npm-dependency (`node:fs`, `node:zlib`,
`node:child_process`, `node:path` built-ins only). This phase should preserve that convention exactly.

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `Compress-Archive` (native PS) | Node zero-dep manual ZIP writer (mirroring `lib/ooxml.mjs`'s manual ZIP *reader*) | ~100+ new lines (CRC32 + local/central-directory headers) to avoid a single `pwsh -Command Compress-Archive` shell-out; not worth it — `pwsh` is already a hard dependency via `convert.ps1` |
| `Compress-Archive` (native PS) | An npm zip lib (`adm-zip`/`archiver`/`jszip`) | None present in `package.json`; would be the **first** npm dependency ever introduced into `scripts/pipeline/` — breaks the zero-dependency convention for no benefit since a native tool already works |
| Node orchestrator spawning `pwsh` per doc | Pure `.ps1` orchestrator calling `convert.ps1` in-process via `&` | Saves ~88s of `pwsh.exe` cold-start overhead across 221 docs (measured: ~395ms/spawn) at the cost of NOT matching the established `retrofit-*.mjs`/`build-filename-map.mjs` Node-family convention; still needs to shell out to `node guard-docx.mjs` either way (guard logic is Node-only). See **Code Examples** and **Common Pitfalls #4** for the concrete tradeoff. |

**No installation needed** — every tool above is already present and version-matched on this machine
and, per the pipeline's own version guards, will fail loudly (not silently) if it drifts on another machine.

## Package Legitimacy Audit

**Not applicable — this phase introduces zero new external packages.** All tooling
(`pandoc`, `pwsh`/`Compress-Archive`, `node` built-ins) is pre-existing, pinned, and already part of
the repo's established zero-npm-dependency pipeline convention. The Package Legitimacy Gate protocol
is skipped because there is nothing to run `slopcheck`/`npm view` against.

## Architecture Patterns

### System Architecture Diagram

```
docs/_registry/RE-index.md ──┐
  (221 rows, Status column)  │
                              ▼
                    [1] Regenerate filename-map.md
                        node build-filename-map.mjs
                              │
                              ▼
                    [2] Parse registry -> filter Status:Approved
                        join RE-ID -> output filename (filename-map.md)
                        read each source .md's frontmatter {status, last_verified}
                              │
                              ▼  (D-12 guard: fail if registry-Approved row has
                              │   frontmatter status != Approved)
                    [3] For each Approved doc (SEQUENTIAL, D-06):
                        pwsh -File convert.ps1 -InputMd <src> -OutputDocx <staging>/<name>.docx
                              │  (failure -> record in failures[], continue to next doc — D-07)
                              ▼
                    [4] For each staged .docx (SEQUENTIAL):
                        node guard-docx.mjs <staging>/<name>.docx
                              │  (failure -> record in failures[], continue — D-07)
                              ▼
                    [5] failures.length > 0 ?
                         ├── YES → print full failure list, exit 1, NO zip written (fail-closed)
                         └── NO  → continue
                              │
                              ▼
                    [6] Write manifest.csv {RE-ID, filename, frontmatter status, last_verified}
                        Write README.md (static, no timestamps — D-04)
                        into the staging dir alongside the .docx files
                              │
                              ▼
                    [7] Registry-parity assertion (PUB-04):
                        staged file count == Approved row count, every RE-ID exactly once
                              │
                              ▼
                    [8] Atomic promote: staging dir -> gitignored build dir
                        pwsh -Command Compress-Archive -Path <build-dir>/* \
                             -DestinationPath dist/docs-library-v1.17.zip -Force
                              │
                              ▼
                        dist/docs-library-v1.17.zip  (never committed — D-01/D-02)
```

### Recommended Project Structure

```
scripts/pipeline/
├── convert.ps1                    # EXISTING — apply the .tmp-leak fix only (see Pitfall #2)
├── guard-docx.mjs                 # EXISTING — do not modify (no new guard logic per phase boundary)
├── build-filename-map.mjs         # EXISTING — export parseRegistry()/slug() for reuse (minimal, additive change)
├── build-publish-bundle.mjs       # NEW — the batch orchestrator (PUB-01..04)
├── filename-map.md                # EXISTING — regenerated as orchestrator step 1
└── lib/
    └── ooxml.mjs                  # EXISTING — unchanged

.pipeline-output/  or  dist/       # gitignored (both already covered — confirmed via `git check-ignore -v`)
└── docs-library-v1.17.zip         # per-milestone versioned output (D-02)

docs/_glossary-android.md                        # HYG-02 target (line 11)
docs/admin-setup-android/03-fully-managed-cobo.md # HYG-02 SCOPE GAP — same defect, not in stated scope
docs/admin-setup-android/04-byod-work-profile.md  # HYG-02 SCOPE GAP — same defect
docs/reference/android-capability-matrix.md       # HYG-02 SCOPE GAP — same defect
docs/android-lifecycle/03-android-version-matrix.md # HYG-02 SCOPE GAP — same defect
```

### Pattern 1: Reusing `parseRegistry()` instead of re-deriving it

`build-filename-map.mjs` already contains a battle-tested (self-test-proven, 221-row-verified) registry
table parser. Its regex-anchored row filter is the reliable way to get exactly 221 rows, not 223 (the
naive-grep trap — see Pitfall #3):

```javascript
// Source: scripts/pipeline/build-filename-map.mjs lines 95-104 (verified live: yields
// exactly 221 rows against the real docs/_registry/RE-index.md, confirmed via its own
// --self-test check (c))
function parseRegistry(content) {
  return content
    .split(/\r?\n/)
    .filter(l => /^\|\s*RE-\d+\s*\|/.test(l))   // excludes header/separator/prose rows by construction
    .map(l => {
      const cols = l.split('|').map(s => s.trim());
      return { docId: cols[1], path: cols[2], title: cols[3], docType: cols[4], status: cols[5] };
    });
}
```

**Recommendation:** add `export` to `parseRegistry`, `slug`, and `readFile` in `build-filename-map.mjs`
(purely additive — does not change any existing behavior or its self-test) so
`build-publish-bundle.mjs` can `import { parseRegistry, readFile } from './build-filename-map.mjs'`
instead of copy-pasting the parser. This keeps "no new conversion/guard logic" honest while avoiding
duplication drift between the two scripts.

### Pattern 2: Frontmatter status/last_verified extraction (needed for D-12 + the CSV manifest)

The registry's `Status` column (EEE retrofit lifecycle) is explicitly **not** the same field as each
source doc's frontmatter `status:` key (D-12). The manifest needs the latter; D-12's divergence guard
needs to compare the two. Verified live: **all 221** registered docs carry `status:` and
`last_verified:` within the first 12 lines of frontmatter (100% consistent shape, no missing fields).

```javascript
// Frontmatter is delimited by the first two "---" lines. This is a lighter-weight parse than
// a full YAML parser and matches this repo's existing zero-dependency convention.
function readFrontmatterField(mdContent, key) {
  const fmMatch = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) return null;
  const line = fmMatch[1].split(/\r?\n/).find(l => l.startsWith(key + ':'));
  return line ? line.slice(key.length + 1).trim() : null;
}
// readFrontmatterField(src, 'status')         -> 'Approved' | 'Draft' | 'Superseded'
// readFrontmatterField(src, 'last_verified')  -> 'YYYY-MM-DD'
```

### Pattern 3: Batch loop with collect-all-failures (D-07), matching the `retrofit-structural.mjs` convention

`retrofit-structural.mjs` already establishes the "loop N files, collect an array of results, decide
pass/fail only after the full loop" shape used repeatedly in this repo
(`--all` mode, `targetAbsPaths` loop). The orchestrator should follow the same shape for both the
conversion pass and the guard pass — do not fail-fast inside the loop:

```javascript
const conversionFailures = [];
for (const doc of approvedDocs) {                          // D-06: sequential, not parallel
  try {
    execFileSync('pwsh', ['-NoProfile', '-File', 'scripts/pipeline/convert.ps1',
      '-InputMd', doc.path, '-OutputDocx', doc.stagingOutPath],
      { stdio: 'pipe', cwd: process.cwd(), timeout: 60000 });
  } catch (err) {
    conversionFailures.push({ docId: doc.docId, path: doc.path,
      detail: (err.stdout || '') + (err.stderr || '') });
    continue;  // D-07: keep going, collect everything
  }
}
// ... only after the loop: same pattern for guard-docx.mjs, one per staged .docx ...
// ... only after BOTH loops: if (conversionFailures.length + guardFailures.length > 0) exit 1, no zip.
```

### Pattern 4: The `.tmp` leak fix in `convert.ps1` (minimal, verified)

**Empirically reproduced:** one run of `convert.ps1` leaves exactly one orphaned 0-byte `.tmp` file in
`$env:TEMP` (confirmed via `Get-ChildItem $env:TEMP -Filter '*.tmp'` count before/after: 133 -> 134).
Root cause: `[System.IO.Path]::GetTempFileName()` **creates and reserves** the `.tmp` file as a side
effect of being called; the existing code then computes a *different* `.md`-suffixed path via string
`-replace` and copies into that new path — the original `.tmp` file is never touched again.

```powershell
# scripts/pipeline/convert.ps1, current line 85 (BEFORE):
$tempMd = [System.IO.Path]::GetTempFileName() -replace '\.tmp$', '.md'
Copy-Item -Path $InputMd -Destination $tempMd -Force

# MINIMAL FIX (additive, does not touch PIPE-03 rewrite/diff-guard logic below it):
$rawTempFile = [System.IO.Path]::GetTempFileName()   # this call creates the orphan on disk
$tempMd = $rawTempFile -replace '\.tmp$', '.md'
Remove-Item -LiteralPath $rawTempFile -Force -ErrorAction SilentlyContinue  # clean it up immediately
Copy-Item -Path $InputMd -Destination $tempMd -Force
```

This does not disturb the PIPE-03 temp-copy logic: the existing `Remove-Item $tempMd -Force` calls
(the fail-closed abort path and the post-conversion cleanup, lines ~130 and ~147) already correctly
clean up the `.md`-suffixed temp copy — they were never the source of the leak. At 221x scale per full
run, the unfixed leak accumulates 221 orphaned 0-byte files in the user's TEMP directory per batch run.

### Pattern 5: Zip creation (`Compress-Archive`, verified working)

```powershell
# Verified live: produces a valid zip from a flat directory of files.
Compress-Archive -Path "$stagingDir\*" -DestinationPath "dist\docs-library-v1.17.zip" -Force
```

`-Path "$stagingDir\*"` flattens everything directly inside the staging dir (the .docx files, the
CSV manifest, and the README) into the zip root — matching PUB-03's "flat internal layout" requirement
without any extra path-manipulation logic.

### Anti-Patterns to Avoid

- **Re-implementing pandoc invocation logic in the orchestrator to "save a shell-out":** `convert.ps1`
  owns the version guard AND the PIPE-03 YAML-alias preprocessing fix. Bypassing it (e.g. calling
  pandoc directly from Node, as `guard-docx.mjs`'s `--self-test` mode does for a *different*, narrow
  self-test purpose) would silently drop both protections for the batch's real corpus. Always shell
  out to `convert.ps1`.
- **Invoking `guard-docx.mjs` with multiple paths in one call:** it only reads the first non-flag
  argv token (`argv.find(a => !a.startsWith('--'))`). A second path is silently ignored, not an error.
  Always invoke once per `.docx`.
- **Using `Invoke-Expression` or string-concatenated shell commands to build the `convert.ps1` call:**
  use PowerShell's native argument array / splatting (`& $script @params`) or `execFileSync`'s array
  argv form (never string interpolation into a shell command) — even though today's inputs are
  developer-controlled registry paths (see Security Domain), this is a cheap, permanent habit.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| MD→.docx conversion | A new pandoc wrapper | `convert.ps1` (existing, pinned, version-guarded) | Owns the pinned-version guard + PIPE-03 fix; a parallel implementation would silently diverge |
| Post-conversion validation | New YAML-leak/heading/custom-prop checks | `guard-docx.mjs` (existing) | Already correctly decompresses OOXML (raw-byte scanning always false-greens per its own docs); re-deriving this is a known pitfall class this repo has already solved |
| Registry table parsing | A new markdown-table regex | `parseRegistry()` from `build-filename-map.mjs` (export it) | Already self-test-proven against the real 221-row registry |
| Zip file format writing | A manual ZIP/DEFLATE writer in Node | `Compress-Archive` (native PS7 module) | `lib/ooxml.mjs` already had to hand-roll a ZIP *reader* because no npm dep was allowed for *reading*; writing is strictly harder (CRC32, central directory) — a native OS tool exists, use it |

**Key insight:** Every piece of this phase's "hard part" (pandoc quirks, OOXML structure, YAML-leak
detection) was already solved and hardened across Phases 113/119/124. Phase 126's actual job is thin
orchestration glue around proven, single-doc tools — resist the temptation to "improve" them in-flight.

## Common Pitfalls

### Pitfall 1: HYG-02's literally-stated scope will leave PUB-02 failing closed
**What goes wrong:** The plan fixes only `docs/_glossary-android.md` (as REQUIREMENTS.md/CONTEXT.md
literally state), runs the full batch, and PUB-02 fails closed on 4 more files carrying the identical
`phase_46_wave2_retrofit` stale key.
**Why it happens:** `DEFER-125-06-A` was logged from a single representative-set conversion (only
RE-179 was tested in Phase 125); the other 4 occurrences of the same key were never converted/guarded
before now, so they were never discovered.
**How to avoid:** Expand the HYG-02 task's file scope to all 5: `docs/_glossary-android.md`,
`docs/admin-setup-android/03-fully-managed-cobo.md`, `docs/admin-setup-android/04-byod-work-profile.md`,
`docs/reference/android-capability-matrix.md`, `docs/android-lifecycle/03-android-version-matrix.md`.
All 5 carry the key at the identical line 11 — same one-line reformat-only removal, `last_verified`
untouched, same defect class REQUIREMENTS.md already characterizes as "harmless historical artifact."
**Warning signs:** `node scripts/pipeline/guard-docx.mjs` reports `CUSTOM-PROPS FAIL ... [phase_46_wave2_retrofit]`
on any file other than `_glossary-android.md` during the batch run.

### Pitfall 2: Naive `grep -c Approved` overcounts by 2
**What goes wrong:** `grep -c 'Approved' docs/_registry/RE-index.md` returns 223, not 221.
**Why it happens:** The registry's header blockquote (lines 9-13) contains 2 prose mentions of the
word "Approved" explaining the `Status` column's semantics — these are not table rows.
**How to avoid:** Anchor the match to the table-row shape: `^\|\s*RE-\d+\s*\|.*\|\s*Approved\s*\|?\s*$`
or (preferably) reuse `parseRegistry()` and filter `.status === 'Approved'` on the parsed objects —
verified live to yield exactly 221.
**Warning signs:** Any count derived from a bare substring/line-count grep on this file.

### Pitfall 3: `convert.ps1`'s bare `exit 1` — invocation-mode-dependent safety
**What goes wrong:** Assuming `exit 1` inside a called script always terminates only that script.
**Why it happens (and the actual, verified behavior):** Live-tested in this exact environment: when a
*top-level* PowerShell script file (invoked via `pwsh -File parent.ps1`) calls a child script via
either `&` **or** dot-sourcing (`. .\child.ps1`), and that child calls `exit 1`, control returns to the
parent with `$LASTEXITCODE = 1` — the parent process does **not** terminate. This was verified with
both invocation styles in this PowerShell 7.5.8 session. This is what makes an in-process `.ps1`
orchestrator viable for D-07's "collect all failures, don't fail-fast" semantics without needing a
fresh child process per doc.
**How to avoid:** Trust `$LASTEXITCODE` after `& .\convert.ps1 ...`, not thrown exceptions — `Write-Error`
inside `convert.ps1` is non-terminating by default (`$ErrorActionPreference` is `Continue` unless
explicitly changed), and the script's own `exit 1` is the actual failure signal.
**Caveat:** This verified behavior applies to *file-based* script invocation. Do not assume the same
of an interactive/pasted-into-REPL session — always run the orchestrator via `pwsh -File orchestrator.ps1`
if a `.ps1` orchestrator shape is chosen.

### Pitfall 4: `pwsh.exe` cold-start cost at 221x scale
**What goes wrong:** A Node orchestrator that spawns a fresh `pwsh.exe` child process per document
(221 times) pays ~395ms of pure process-startup overhead per spawn — measured live on this machine
(10 sequential `pwsh -NoProfile -Command "exit 0"` calls: 3.95s total = ~395ms/call). At 221 docs that
is **~87 seconds of pure spawn overhead**, before any actual pandoc conversion work happens.
**Why it happens:** `pwsh.exe` cold-start (loading the .NET runtime + PowerShell host) is inherently
slower than `node`'s cold-start (measured: ~112ms/call, ~3.5x faster).
**How to avoid:** This is a real but modest cost (not a correctness bug) — document it as an expected
runtime baseline rather than a blocker. If batch runtime becomes a concern, a `.ps1` orchestrator
calling `convert.ps1` in-process via `&` (Pitfall #3's verified-safe pattern) eliminates this overhead
entirely for the conversion pass, at the cost of not matching the existing Node-family (`retrofit-*.mjs`)
convention. `guard-docx.mjs` invocation cost (221x `node` spawns, ~112ms each ≈ 25s total) is
unavoidable either way since its logic is Node-only and not currently exported for in-process reuse.
**Warning signs:** Full-batch orchestrator run taking multiple minutes dominated by process-startup,
not actual conversion/guard work — check with `Measure-Command` / wall-clock bracketing per stage.

### Pitfall 5: docx output is provably non-deterministic — never assert on bytes/hash
**What goes wrong:** Any downstream check (a validator, a future HARN chain entry, a manual diff) that
compares docx file bytes or sha256 across two runs of the same source will fail even when nothing
changed.
**Why it happens (verified live):** Converting the identical source file twice, 2 seconds apart,
produced `docProps/core.xml` with `dcterms:created`/`dcterms:modified` differing by exactly the wall-clock
gap (`2026-07-10T21:06:40Z` vs `...:43Z`), and different full-file sha256 hashes.
**How to avoid:** Never key the manifest, the registry-parity assertion, or any future validator on
docx bytes or hash (D-03 already excludes sha256 from the manifest for exactly this reason). Assert on
filenames + counts only.
**Verified mitigation available but optional (per CONTEXT.md, not load-bearing):** Setting
`$env:SOURCE_DATE_EPOCH` before invoking pandoc **does** pin the timestamp — verified live:
`SOURCE_DATE_EPOCH=1700000000` produced `2023-11-14T22:13:20Z` (the correct UTC conversion of that
epoch) in `docProps/core.xml`. This is a genuine, working lever if the planner wants it, but nothing
downstream may depend on it being set.

### Pitfall 6: `convert.ps1`'s paths are CWD-relative
**What goes wrong:** Invoking `convert.ps1` from a working directory other than the repo root causes
`Test-Path $ReferenceDoc` (default `'scripts/pipeline/reference.docx'`, a relative path) to fail.
**Why it happens:** Both the reference-doc default and `Test-Path $InputMd` are relative-path lookups
with no repo-root anchoring inside the script.
**How to avoid:** Always invoke with `cwd: process.cwd()` (if spawning from Node, matching the existing
pattern already used in `guard-docx.mjs`'s own `tryConvert()` self-test helper) or ensure the `.ps1`
orchestrator itself always runs from the repo root.

## Code Examples

### Invoking `convert.ps1` from Node with proper failure collection (no exceptions swallowed)

```javascript
// Source pattern: scripts/pipeline/guard-docx.mjs `tryConvert()` (lines 149-165) — same
// execFileSync + cwd + stdio:'pipe' + try/catch idiom, generalized for the batch case.
import { execFileSync } from 'node:child_process';

function convertOne(inputMd, outputDocx) {
  try {
    execFileSync('pwsh', [
      '-NoProfile', '-File', 'scripts/pipeline/convert.ps1',
      '-InputMd', inputMd, '-OutputDocx', outputDocx
    ], { stdio: 'pipe', cwd: process.cwd(), timeout: 60000 });
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      detail: ((err.stdout || '') + (err.stderr || '')).toString().slice(0, 500)
    };
  }
}
```

### Invoking `guard-docx.mjs` per file and parsing its result from exit code

```javascript
function guardOne(docxPath) {
  try {
    execFileSync('node', ['scripts/pipeline/guard-docx.mjs', docxPath],
      { stdio: 'pipe', cwd: process.cwd(), timeout: 30000 });
    return { ok: true };
  } catch (err) {
    // guard-docx.mjs exit 1 -> execFileSync throws; stdout still has the [CHECK/n] detail lines
    return { ok: false, detail: (err.stdout || '').toString() };
  }
}
```

### Registry-parity assertion (PUB-04)

```javascript
// After the full conversion+guard loop, before promote:
const approvedIds = new Set(approvedRows.map(r => r.docId));
const stagedIds = new Set(stagedResults.filter(r => r.ok).map(r => r.docId));
const missing = [...approvedIds].filter(id => !stagedIds.has(id));
const orphans = [...stagedIds].filter(id => !approvedIds.has(id));
if (missing.length || orphans.length) {
  // fail closed — never promote a partial/divergent bundle
}
console.log(`Registry parity: ${approvedRows.length} Approved rows, ` +
  `${stagedIds.size} staged docx, ${excludedCount} excluded (Draft/Pending), 0 missing, 0 orphan.`);
```

## State of the Art

| Prior State (Phases 113–124) | Current Phase (126) | What Changed |
|-------------------------------|----------------------|----------------|
| Single-doc `convert.ps1` invocation, manual per-file guard run | Batch orchestrator over all 221 Approved docs | Orchestration layer added; no change to conversion/guard internals |
| No filename map (Phase <124) | `filename-map.md` committed, generated by `build-filename-map.mjs` | Phase 124 (PIPE-04) — this phase reads it, doesn't regenerate its algorithm |
| Ad-hoc representative-set testing (Phase 125's `PIPE-02-CLOSE-RUNBOOK.md`, manual zips in `.pipeline-output/`) | A single deterministic, versioned, registry-parity-asserted zip | This phase formalizes what was previously manual spot-checking |

**Deprecated/outdated:** None — this phase is purely additive on top of a currently-green pipeline.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | The orchestrator's exact language/shape (Node `.mjs` vs `.ps1`) is presented as a researched recommendation, not a locked decision — CONTEXT.md explicitly reserves this as Claude's Discretion. | Architecture Patterns | Low — either shape is viable per verified evidence above; the plan should pick one and note the tradeoff, not treat this research's Node-family recommendation as mandatory. |
| A2 | `.gitignore` coverage was verified via `git check-ignore -v` for both `dist/` and `.pipeline-output/` on this machine's working tree — assumed stable across environments (both patterns are simple top-level globs, not environment-specific). | Recommended Project Structure | Low — trivial to re-verify with the same command on any target machine. |

**If this table is empty:** N/A — see above. Everything else in this research was reproduced live
against the actual repo state on 2026-07-10 (pandoc conversions run, guard-docx run, registry counted,
`.tmp` leak reproduced, `exit` propagation tested, cold-start timed, `SOURCE_DATE_EPOCH` tested) — no
training-data-only claims remain un-flagged.

## Open Questions (RESOLVED)

1. **Does HYG-02 need to be expanded from 1 file to 5, or should the other 4 be tracked as a new
   deferred item instead?**
   - RESOLVED: all 5 files — folded into Plan 126-01 Task 1 (single reformat-only stale-key removal under HYG-02).
   - What we know: All 5 files carry the identical stale key at the identical line 11; fixing only 1
     leaves PUB-02 failing closed on a full-corpus run — the phase cannot ship a zip otherwise.
   - What's unclear: Whether the user/planner wants this folded into HYG-02's existing requirement ID
     (recommended — same defect class, same reformat-only nature, same "no content change" contract)
     or split into a new sub-task for traceability.
   - Recommendation: Expand HYG-02's task file scope to all 5; it is not a scope creep risk (same
     mechanical fix, same file class) and PUB-02's fail-closed contract makes it a hard blocker either
     way — better to catch it at plan time than mid-execution.

2. **Orchestrator language: Node `.mjs` (family-convention match) vs `.ps1` (lower subprocess overhead)?**
   - RESOLVED: Node `.mjs` per CONTEXT.md Claude's-Discretion — adopted in Plan 126-02 (build-publish-bundle.mjs); `.ps1` retained as the documented fallback if a future perf concern arises.
   - What we know: Concrete, measured tradeoff — Node matches the existing `retrofit-*.mjs` family
     convention; `.ps1` saves ~87s of `pwsh.exe` cold-start overhead across 221 docs by calling
     `convert.ps1` in-process via the verified-safe `&`/dot-source pattern (Pitfall #3).
   - What's unclear: Whether ~87s of extra wall-clock time on an "always-full-rebuild" batch (D-05,
     which already accepts full-corpus regeneration cost every run) is material enough to prefer
     `.ps1` over convention-consistency.
   - Recommendation: Default to Node `.mjs` (convention match, isolation-by-separate-process is also a
     minor robustness plus for D-06's "bounded/cleanable temp leak" goal); note `.ps1` as the documented
     fallback if a future performance concern arises (already a Deferred Idea: "bounded-concurrency" —
     the same discussion applies to reducing per-doc process-spawn overhead generally).

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|--------------|-----------|---------|----------|
| pandoc | `convert.ps1` (PUB-01) | Yes | 3.7.0.2 (exact pin match) | None needed — version guard already fails loudly if absent/mismatched |
| PowerShell (`pwsh`) | `convert.ps1`, `Compress-Archive` (PUB-01, PUB-03) | Yes | 7.5.8 (>= 7.0 required) | None needed |
| Node.js | `guard-docx.mjs`, `build-filename-map.mjs`, new orchestrator (PUB-01..04) | Yes | v24.17.0 | None needed |
| `Microsoft.PowerShell.Archive` module | Zip creation (PUB-03) | Yes | 1.2.5 | Ships with PS7 by default; no install step required |

**Missing dependencies with no fallback:** None — every tool this phase needs is already installed and
version-verified on this development machine.

**Note for HOOK-01 (Phase 127, out of scope here):** REQUIREMENTS.md flags that the future auto-trigger
"must degrade gracefully when prerequisites (pandoc, Node) are absent." This phase's orchestrator
should itself fail loudly and immediately (not silently skip) if pandoc/pwsh/node are missing — `convert.ps1`
already does this for pandoc (hard `Write-Error` + `exit 1`); the new orchestrator should do the same
upfront check before starting the 221-doc loop, so a missing-tool failure is reported in seconds, not
after partial batch work.

## Security Domain

`security_enforcement` is not explicitly disabled in `.planning/config.json` — included per default.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|----------------|---------|--------------------|
| V2 Authentication | No | No auth surface — local CLI tooling, no network/user identity involved |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Yes | Registry `Path`/`Title` values are developer-controlled (git-tracked), but should still be validated as defense-in-depth: confirm resolved `Path` stays inside `docs/` (no `..` traversal) and output filenames match the D-05 slug charset (`^[a-z0-9-]+\.docx$`) before use in filesystem operations |
| V6 Cryptography | No | No secrets, no hashing requirement (D-03 explicitly excludes sha256 from the manifest due to docx non-determinism) |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|-----------------------|
| Command injection via shell string-concatenation | Tampering | Use argument-array invocation exclusively: PowerShell `&` with named/positional params or splatting; Node `execFileSync(cmd, [args])` (never `exec()`/`Invoke-Expression` with concatenated strings). All examples above already follow this. |
| Path traversal via a corrupted/hand-edited `filename-map.md` or `RE-index.md` | Tampering | `filename-map.md` is a GENERATED, committed file (regenerate it as orchestrator step 1, never trust a stale/hand-edited copy); validate output filenames against the slug charset before constructing filesystem paths from them |
| Arbitrary write outside the staging dir | Tampering | Construct all staging/output paths via `path.join(stagingDir, sanitizedFilename)`, never raw string concatenation of registry-sourced values |
| Zip-slip (path traversal on zip extraction) | N/A here | Not applicable — this phase only **creates** zips (`Compress-Archive`), never extracts one. Flag for the (out-of-scope) SharePoint-upload consumer side, not this phase. |

**Overall residual risk: LOW.** All inputs (registry rows, source `.md` paths, frontmatter values) are
developer-controlled, git-tracked content — not runtime/user-submitted input. The controls above are
recommended as low-cost defense-in-depth (consistent with this repo's existing fail-closed conventions
in `build-filename-map.mjs`'s D-08 collision handling), not as mitigations against an active adversary.

## Sources

### Primary (HIGH confidence — live verification against the actual repo, this session)
- `scripts/pipeline/convert.ps1` — read in full; `.tmp` leak reproduced live (133→134 files in `$env:TEMP`); `SOURCE_DATE_EPOCH` pinning verified live
- `scripts/pipeline/guard-docx.mjs` — read in full; CUSTOM-PROPS failure on RE-095 reproduced live (not just RE-179)
- `scripts/pipeline/lib/ooxml.mjs` — read in full (manual ZIP-reader pattern, informs the "don't hand-roll a zip writer" recommendation)
- `scripts/pipeline/build-filename-map.mjs` — read in full; `parseRegistry()` reused/recommended for export
- `scripts/pipeline/README.md` — read in full (SC1 canonical invocation, SC3 deployment policy)
- `docs/_registry/RE-index.md` — read + counted live: 221 table rows, 221 with `Approved` status, 223 via naive `grep -c` (2 header-prose false positives)
- `scripts/pipeline/filename-map.md` — read; 221 rows confirmed via `grep -c`
- `.planning/phases/126-.../126-CONTEXT.md`, `.planning/REQUIREMENTS.md`, `.planning/STATE.md` — read in full
- Live empirical tests this session: `pwsh`/`node` cold-start timing (10x each), `&`/dot-source `exit 1` propagation test (both non-propagating when parent is file-invoked), `Compress-Archive` zip-creation test, frontmatter `status`/`last_verified` presence scan across all 221 registered docs (100% present)

### Secondary (MEDIUM confidence)
- None used — this phase required no external/web research; the entire domain is this repo's own pre-existing tooling.

### Tertiary (LOW confidence)
- None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — every tool version-confirmed installed and pinned-version-matched live on this machine
- Architecture: HIGH — orchestrator patterns derived directly from existing, self-tested sibling scripts in this repo (`retrofit-structural.mjs`, `guard-docx.mjs`'s own self-test helpers)
- Pitfalls: HIGH — every pitfall in this document was empirically reproduced this session, not inferred

**Research date:** 2026-07-10
**Valid until:** Stable until the pandoc/PowerShell/Node pins change (no fixed expiry — re-verify tool versions if any pin bumps before planning executes)
