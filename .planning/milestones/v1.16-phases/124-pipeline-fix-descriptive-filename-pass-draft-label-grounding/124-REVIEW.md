---
phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding
reviewed: 2026-07-09T00:16:22Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - scripts/pipeline/convert.ps1
  - scripts/pipeline/lib/ooxml.mjs
  - scripts/pipeline/guard-docx.mjs
  - scripts/pipeline/build-filename-map.mjs
findings:
  critical: 2
  warning: 5
  info: 3
  total: 10
status: resolved
resolution_commit: e9d7055
resolved: 2026-07-09
---

> **RESOLUTION (2026-07-09, commit `e9d7055`).** All actioned findings addressed.
> **CR-01 / CR-02 are runtime-conditional false-positives for the actual pipeline
> runtime** — verified live under pwsh 7.5.8: `convert.ps1` provably rewrites
> (`1 nav-footer rewrite(s)`, exit 0) on a previously-failing file, matching the
> verifier's 12/12 exit-0 + 14 byte-identical proof. They only bite under Windows
> PowerShell 5.1. Hardened anyway: added `#Requires -Version 7.0` (fail loudly, no
> silent no-op under 5.1) + explicit `-Encoding utf8` on both `Get-Content` reads.
> **WR-01** (dormant collision-resolver edge) fixed with a globally-unique Doc-ID
> fallback in both resolver branches; self-test (e) retargeted to duplicate-Doc-ID,
> new (g) regression guard added; `filename-map.md` byte-identical (0 collisions on
> the live registry). Remaining WR-02..WR-05 / Info items are low-severity notes
> (see below); not blocking. All self-tests green post-fix.

# Phase 124: Code Review Report

**Reviewed:** 2026-07-09T00:16:22Z
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Reviewed the PIPE-03 nav-footer preprocessing in `convert.ps1`, the new `extractCustomProperties()` / `CUSTOM-PROPS` guard check in `lib/ooxml.mjs` + `guard-docx.mjs`, and the new `build-filename-map.mjs` PIPE-04 generator.

Two BLOCKER-severity defects were found in `convert.ps1` and **both were empirically reproduced against the actual PowerShell binary present on this machine** (Windows PowerShell / Desktop edition, the same edition the project's own `Setup-Environment.ps1` declares as its minimum supported version — "PowerShell 5.1 or higher required"). Together they mean the entire PIPE-03 nav-footer fix this phase implements **silently does nothing** on this supported PowerShell edition, while the script's own console output claims success ("guard PASS"). The `build-filename-map.mjs` collision resolver also has a reachable (empirically demonstrated) ordering defect where an unrelated singleton title's slug can collide with a disambiguated group member's candidate name and cause a hard, avoidably-unresolved `FILENAME-COLLISION-UNRESOLVED` abort. The `ooxml.mjs`/`guard-docx.mjs` additions are comparatively sound; findings there are lower severity.

## Critical Issues

### CR-01: `Set-Content -Encoding utf8NoBOM` is not a valid parameter value on Windows PowerShell — the nav-footer rewrite is silently never written, yet the script reports "guard PASS"

**File:** `scripts/pipeline/convert.ps1:110`

**Issue:** `utf8NoBOM` was introduced as a named `-Encoding` value in PowerShell 6+ (Core). It does not exist in Windows PowerShell 5.1/Desktop edition's `Set-Content` `ValidateSet`. This was reproduced directly against the PowerShell binary on this machine:

```
Set-Content : Cannot bind parameter 'Encoding'. Cannot convert value "utf8NoBOM" to type
"Microsoft.PowerShell.Commands.FileSystemCmdletProviderEncoding". Error: "Unable to match the identifier
name utf8NoBOM to a valid enumerator name. Specify one of the following enumerator names ... :
Unknown, String, Unicode, Byte, BigEndianUnicode, UTF8, UTF7, UTF32, Ascii, Default, Oem, BigEndianUTF32"
```

Because this is a **non-terminating** parameter-binding error (the script never sets `$ErrorActionPreference = 'Stop'` and never checks `$?`/`$Error` after the call), execution *continues past the failed `Set-Content` call*. The result: `$tempMd` on disk is **never overwritten** with the rewritten lines — it still contains whatever `Copy-Item` put there (the original, un-rewritten content). This was directly reproduced end-to-end: running `convert.ps1` against a fixture containing the `*Previous:`/`*Next step:` nav-footer pattern prints

```
Set-Content : Cannot bind parameter 'Encoding'. ...
PIPE-03 preprocessing: 1 nav-footer rewrite(s), guard PASS
Converting ... -> ...
Conversion complete.
```

i.e. the script claims 1 rewrite happened and the guard passed, but a direct dump of the actual on-disk `$tempMd` content immediately after the (failed) `Set-Content` call shows the line is still literally `---`, never `* * *`. The D-03(b) "fail-closed" diff guard (lines 112-129) does not catch this because it only diffs the **in-memory** `$lines` array (which *was* correctly mutated before the failed write) against `$origLines` — it never re-reads the actual bytes that end up on disk and get fed to pandoc. On this PowerShell edition, PIPE-03 is a complete, silent no-op: the entire nav-footer fix this phase exists to deliver does not take effect, and nothing in the script's exit code or console output reveals this.

**Fix:** Use a cross-edition-safe write path and verify the write actually took effect, e.g.:
```powershell
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllLines($tempMd, $lines, $utf8NoBom)

# Verify the write actually landed before trusting it
$writtenBack = Get-Content -LiteralPath $tempMd
if (Compare-Object $lines $writtenBack -SyncWindow 0) {
    Write-Error "PIPE-03: temp file write verification failed."
    exit 1
}
```
Also set `$ErrorActionPreference = 'Stop'` (or `-ErrorAction Stop` on every cmdlet call) at the top of the script so any future non-terminating error doesn't get silently swallowed and misreported as success.

---

### CR-02: `Get-Content` without `-Encoding utf8` mis-decodes non-ASCII UTF-8 content (em-dashes, curly quotes) into mojibake on Windows PowerShell

**File:** `scripts/pipeline/convert.ps1:82` and `:114`

**Issue:** Neither `Get-Content -LiteralPath $tempMd` (line 82) nor `Get-Content -LiteralPath $InputMd` (line 114) specifies `-Encoding utf8`. On Windows PowerShell (Desktop edition), `Get-Content` without an explicit encoding and without a BOM in the source file falls back to the system ANSI code page, not UTF-8. This project's real markdown corpus is full of BOM-less UTF-8 files containing em-dashes and other non-ASCII characters (verified: `docs/l1-runbooks/01-device-not-registered.md` and dozens of `docs/_registry/RE-index.md` titles use "—"). This was reproduced directly:

```
source line (UTF-8 bytes): title: Title <E2 80 94> Subtitle
Get-Content result (re-encoded to UTF-8 for inspection): 74 69 74 6C 65 3A 20 54 69 74 6C 65 20 C3 A2 E2 82 AC E2 80 9D 20 53 75 62 74 69 74 6C 65
```
i.e. the single em-dash character (3 UTF-8 bytes) became 9 bytes of mojibake (`â€"` / similar) in the in-memory string — classic UTF-8-decoded-as-CP1252 corruption.

Before this phase, `convert.ps1` fed `$InputMd` to pandoc directly as raw bytes; pandoc's own encoding detection correctly handled UTF-8. This phase introduces the **first** PowerShell text decode/re-encode round-trip in this pipeline, and that round-trip corrupts non-ASCII characters on Windows PowerShell. Note this is currently masked by CR-01 (the corrupted `$lines` never gets written to disk because `Set-Content` fails first) — but if CR-01 is "fixed" by simply swapping to a valid encoding name without also fixing the read side, every document containing an em-dash, curly quote, or accented character will get silently corrupted in the .docx sent to pandoc. The D-03(b) diff guard does not catch this either, since both `$origLines` and `$lines` are decoded identically (both corrupted the same way), so no diff is observed.

**Fix:** Read with explicit UTF-8 on both sides, e.g. `Get-Content -LiteralPath $tempMd -Encoding utf8` and `Get-Content -LiteralPath $InputMd -Encoding utf8` (or better, `[System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)` for full cross-edition consistency, paired with the WriteAllLines fix in CR-01).

## Warnings

### WR-01: `build-filename-map.mjs` collision resolver can spuriously hard-fail on an unrelated singleton/group name coincidence

**File:** `scripts/pipeline/build-filename-map.mjs:123-159`

**Issue:** `finalNames` is a single `Set` shared across all `bySlug` bucket iterations, and bucket iteration order follows `Map` insertion order (i.e., row order in the registry). A singleton bucket (unique base slug) that happens to claim a name identical to what a *different* collision group's disambiguation would produce causes the group member to exhaust its available path-segment suffixes and trigger `FILENAME-COLLISION-UNRESOLVED`, aborting the whole generator — even though the "collision" is a naming coincidence between two unrelated documents, not a genuine duplicate title, and could trivially be resolved (e.g. by trying additional segments, or a doc-ID fallback suffix). Reproduced directly with the extracted collision-resolution logic:
```
rows = [
  { docId: 'RE-S01', path: 'zzz/unrelated.md', title: 'Foo A', ... },   // slug -> "foo-a" (singleton)
  { docId: 'RE-G01', path: 'a/x.md',           title: 'Foo',   ... },   // slug -> "foo", group w/ RE-G02
  { docId: 'RE-G02', path: 'b/x.md',           title: 'Foo',   ... },
]
=> { ok: false, error: 'FILENAME-COLLISION-UNRESOLVED: RE-G01 (Foo) -- exhausted 1 path segment(s), still colliding on base "foo"' }
```
`RE-G01`'s only candidate suffix ("a") collides with `RE-S01`'s already-claimed `foo-a.docx`, and since `RE-G01`'s path has only one parent directory segment, the algorithm gives up rather than trying a further fallback (e.g. appending the doc ID). Does not currently trigger against the real 221-row registry (verified via `--dry-run` and `--self-test`), but is a live landmine for any future registry addition.

**Fix:** Either (a) pre-populate `finalNames` with all singleton names before processing any collision groups (removes the insertion-order dependency, though doesn't fully solve it), or (b) add a final fallback suffix using the Doc ID itself (guaranteed unique) when path-segment disambiguation is exhausted, e.g. `base + '-' + r.docId.toLowerCase() + '.docx'`, before declaring `FILENAME-COLLISION-UNRESOLVED`.

### WR-02: `convert.ps1` fence-state tracking does not track fence length, only fence character

**File:** `scripts/pipeline/convert.ps1:91-95`

**Issue:** `$fenceChar` only stores the 3-character literal matched by the alternation (`` ``` `` or `~~~`), never the actual run length of the opening fence marker. Per CommonMark, a fence opened with 4+ backticks can only be closed by a fence of at least that same length; a shorter run (e.g. exactly 3 backticks) appearing as literal body content inside a 4-backtick-fenced block should NOT close the fence. This code treats any line starting with the fence character as a close, regardless of length, so a longer-opened fence could be prematurely (and incorrectly) marked as closed, at which point any subsequent `---`+nav-footer-anchor pattern that should still be "inside a fence" would incorrectly be eligible for rewriting. Not currently triggered (no 4+ backtick fences found in `docs/`), but a real spec-compliance gap in the "D-03(a): fenced code is tracked and never rewritten inside" guarantee.

**Fix:** Capture and compare fence run length, not just character:
```powershell
if ($line -match '^\s*(`{3,}|~{3,})') {
    $marker = $Matches[1]
    if (-not $inFence) { $inFence = $true; $fenceChar = $marker[0]; $fenceLen = $marker.Length }
    elseif ($marker[0] -eq $fenceChar -and $marker.Length -ge $fenceLen) { $inFence = $false }
    continue
}
```

### WR-03: `convert.ps1` leaks a 0-byte `.tmp` placeholder file on every invocation

**File:** `scripts/pipeline/convert.ps1:79`

**Issue:** `[System.IO.Path]::GetTempFileName()` creates a real, empty file on disk at the `.tmp` path as a side effect of guaranteeing uniqueness. The code immediately string-replaces the extension to `.md` for its own use, but never deletes (nor renames) the original `.tmp` file that `GetTempFileName()` actually created. Only the derived `.md` path is cleaned up (line 141, and on the guard-failure exit path at line 124). Across a full corpus run (221 docs per `filename-map.md`), this leaves 221 stray 0-byte `.tmp` files in the user's temp directory.

**Fix:** Delete the original `.tmp` file immediately after deriving the `.md` path:
```powershell
$tmpPlaceholder = [System.IO.Path]::GetTempFileName()
$tempMd = $tmpPlaceholder -replace '\.tmp$', '.md'
Remove-Item $tmpPlaceholder -Force -ErrorAction SilentlyContinue
```

### WR-04: `runCustomPropsCheck`'s "absent" fallback conflates a genuinely-missing entry with the ZIP walker giving up early

**File:** `scripts/pipeline/guard-docx.mjs:114-119`, `scripts/pipeline/lib/ooxml.mjs:38-81`

**Issue:** `extractEntry()` (used by the new `extractCustomProperties()`) has a documented "Pitfall 5" early-exit: if it encounters a ZIP local file header with `compressionMethod === 8 && compressedSize === 0` (the streamed/data-descriptor pattern) *before* reaching the sought entry, it `break`s the scan entirely and the function falls through to throw `Entry '...' not found in ...`. `runCustomPropsCheck` catches any error whose message contains `"not found in"` and treats it as "docProps/custom.xml absent — not a regression," i.e. a PASS. This means a genuinely-present `docProps/custom.xml` that simply appears *after* an earlier streamed ZIP entry in archive order would be silently treated as "no custom properties promoted," masking a real leaked/renamed frontmatter key that the CUSTOM-PROPS check exists specifically to catch. Low likelihood in practice (pandoc-produced docx archives are not created in streaming mode), but it is a real gap in the new check's reliability that inherits an existing limitation of the shared ZIP walker.

**Fix:** At minimum, distinguish "walked entire archive without a match" from "gave up early due to a data-descriptor entry" in `extractEntry`'s thrown error (e.g. a different error message/type for the early-exit case), and have `runCustomPropsCheck` only treat the genuine "walked to end, not present" case as a pass.

### WR-05: `sanitizeSegment()`'s doc-comment claims behavior it doesn't have

**File:** `scripts/pipeline/build-filename-map.mjs:75-82`

**Issue:** The comment states: "Same character-class discipline as `slug()` step 3/4, applied to one path segment." But `slug()` step 3 **deletes** disallowed characters (`.replace(/[^a-z0-9-]/g, '')`), while `sanitizeSegment()` **replaces** them with a hyphen (`.replace(/[^a-z0-9-]/g, '-')`). These produce different results for a segment containing punctuation (e.g. a directory literally named `foo.bar` slugs to `foobar` via `slug()`'s rule but to `foo-bar` via `sanitizeSegment()`'s rule). Not a functional defect against the current corpus (directory names are already kebab-case), but the comment is factually wrong about the two functions' relationship, which will mislead a future maintainer who trusts the comment over the code.

**Fix:** Correct the comment to state the actual (replace-with-hyphen, not delete) behavior, or make the two functions genuinely share logic if identical behavior was intended.

## Info

### IN-01: `convert.ps1`'s per-line loop breaks for single-line input files

**File:** `scripts/pipeline/convert.ps1:82, 87`

**Issue:** `Get-Content` returns a scalar `[string]` (not a 1-element array) when the target file has exactly one line. In that case `$lines.Count` and `$lines[$i]` operate on the *string's characters*, not "lines," silently breaking the per-line rewrite/guard logic. Not realistically reachable for this project's `.md` corpus (every real doc has frontmatter + body, guaranteeing 2+ lines), but it's a well-known PowerShell foot-gun worth guarding against defensively.

**Fix:** Force array semantics: `$lines = @(Get-Content -LiteralPath $tempMd)`.

### IN-02: Anchor regex hardcodes "Next step" only, not bare "Next:"

**File:** `scripts/pipeline/convert.ps1:103`

**Issue:** `'^\s*\*(Previous|Next step)\b'` only recognizes a leading `*Next step` label, not a bare `*Next:` (the corpus currently always uses either `*Previous: ... | Next: ...*` on one line, or standalone `*Next step: ...*` — verified via corpus grep, no standalone `*Next:` lines exist today). If a future nav-footer convention introduces a standalone `*Next:` (without "step") as the first token on the line, the anchor won't match, PIPE-03 silently skips the rewrite for that footer, and the original DEFER-119-C pandoc exit-64 failure would resurface for that file (loudly, via the `$pandocExit -ne 0` check) rather than being masked — so this fails loud, not silent, but is worth noting as an incompleteness given the anchor is meant to future-proof this pattern.

**Fix:** Broaden the anchor to `^\s*\*(Previous|Next)\b` if bare "Next:" nav footers are ever introduced.

### IN-03: `build-filename-map.mjs`'s registry parser is not pipe-escape-aware

**File:** `scripts/pipeline/build-filename-map.mjs:100`

**Issue:** `l.split('|').map(s => s.trim())` assumes exactly 5 data columns with no literal `|` character inside any cell. No title in the current 221-row registry contains a literal pipe, so this isn't triggered today, but there's no defensive check (e.g. asserting `cols.length === 7`) to catch a future row whose Title contains an unescaped `|`, which would silently misalign `docType`/`status` into the wrong fields (or shift the title itself) rather than erroring.

**Fix:** Add a column-count assertion per parsed row and fail loudly (or skip with a warning) on mismatch, rather than silently trusting `cols[1..5]`.

---

_Reviewed: 2026-07-09T00:16:22Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
