# Phase 124: Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe - Research

**Researched:** 2026-07-08
**Domain:** Pandoc MD→.docx pipeline internals (PowerShell + zero-dep Node OOXML introspection), markdown-table-driven filename generation, owner-run grounding-probe artifact authoring
**Confidence:** HIGH (every claim below was independently reproduced against the live repo with pandoc 3.7.0.2 — not taken on faith from CONTEXT.md)

## Summary

This phase touches three narrow, well-bounded surfaces: (1) a ~15-line PowerShell preprocessing
block inserted into `scripts/pipeline/convert.ps1` before the pandoc invocation; (2) a new
zero-dependency Node generator script that reads `docs/_registry/RE-index.md` and emits a
committed filename map (no source-file renames, no batch conversion); (3) two markdown artifacts
(RUNBOOK + FINDINGS) plus a one-file fixture reformat for an owner-run Copilot Studio checkpoint.
None of the three requires any new package (Node built-ins + the already-pinned pandoc 3.7.0.2
binary only).

I independently reproduced the PIPE-03 defect end-to-end: ran pandoc 3.7.0.2 against all 277
`docs/**/*.md` files and confirmed **exactly 12 files fail** with `exit 64` /
`Unknown alias 'Previous'` or `` `Next` ``, all under `admin-setup-{8021x,ios,macos}/`. I also
confirmed the **surgical anchor is corpus-safe**: scanning for every blank-preceded standalone
`---` line followed (skipping blanks) by a line matching `^\s*\*(Previous|Next step)\b` yields
**exactly 26 hits, exactly the 12 failing + 14 already-passing files, zero elsewhere**. I then
applied the exact D-01 rewrite (opening `---` → `* * *` on anchor-matched lines only) to one
failing file and one passing file and reconverted both: the failing file now converts **exit 0**
and its `docProps/custom.xml` still carries the **same 9 keys** in the same shape; the passing
file's `word/document.xml` is **byte-for-byte identical** pre/post rewrite (verified programmatically,
not asserted). This closes essentially every open mechanical question in D-01 through D-04.

For PIPE-04 I independently ran the D-05 sanitizer algorithm over all 221 `RE-index.md` Title
values: **0 collisions**, longest slug 89 chars (94 with `.docx`), and confirmed the specific
edge-case transformations CONTEXT calls out (`802.1X` → `8021x`, em-dash/double-hyphen titles
collapse cleanly). No `build-filename-map.mjs` or batch driver exists yet in `scripts/pipeline/` —
this is new code, not a fork.

For PIPE-05 I confirmed the exact shipped header-block format (`docs/_standards/EEE-SOP-standard.md`
lines 80-119: `·`-separated, **Platform-first**, immediately after frontmatter close and **before**
the H1) and confirmed the current `draft-test-doc.md` fixture violates BOTH the separator/order
rule AND the position rule (it currently places its stub header **after** the H1, per the
Phase-113-era `test-fixtures/README.md` convention, which predates the shipped standard). The v1.15
`PIPE-02-{RUNBOOK,FINDINGS}.md` pair is a directly reusable template — read in full below.

**Primary recommendation:** Implement PIPE-03 as a single new PowerShell block in `convert.ps1`
(before line 74) that operates on an ephemeral temp copy; add a new `extractCustomProperties()`
helper to `lib/ooxml.mjs` (the 9-key set is confirmed uniform across every sampled doc class, so
it is safe to hard-code) for the D-04 regression proof; write `build-filename-map.mjs` as new
zero-dependency code following the existing `retrofit-*.mjs` script conventions; reformat
`draft-test-doc.md`'s header to shipped format **and relocate it before the H1**; template
PIPE-05-RUNBOOK/FINDINGS directly off the v1.15 PIPE-02 pair.

## User Constraints (from CONTEXT.md)

### Locked Decisions

All 22 decisions (D-01 through D-22) in `124-CONTEXT.md` are LOCKED via a 12-agent
`/adversarial-review` with independent Referee re-verification (re-ran pandoc 3.7.0.2, re-ran the
slug sanitizer over all 221 titles, read the v1.15 `PIPE-02-FINDINGS.md`). This research does
**not** re-open any of them. Full text is in `124-CONTEXT.md` (108 lines, `<decisions>` block) —
summarized here for traceability, but the CONTEXT.md file is the authoritative source the planner
must read directly:

- **PIPE-03:** D-01 (surgical pipeline-side preprocessing on an ephemeral temp copy, anchor
  `^\s*\*(Previous|Next step)\b`) · D-02 (rejected alternatives — do not re-open) · D-03 (mandatory
  hardening: fence-tracking, fail-closed diff guard, future-generator rule) · D-04 (required SC2
  regression: positive exit-0 on the 12, OQ4 9-key non-regression, byte-equivalence on the 14).
- **PIPE-04:** D-05 (title-derived slug, exact 5-step order, do not paraphrase) · D-06 (source
  `.md` NEVER renamed — output filenames only) · D-07 (RE-index.md `Title` column is sole source
  of truth; `Path` is tie-break-only) · D-08 (fail-closed collision policy, currently 0 collisions)
  · D-09 (generated committed map, does NOT write RE-index.md) · D-10 (convention + generator +
  map ship now; batch driver + actual generation/upload deferred to v1.17+; `convert.ps1` stays
  byte-unchanged) · D-11 (221 registered docs only; 56 unregistered excluded by construction) ·
  D-12 (link-checker re-run downgraded to no-op — output-only resolution).
- **PIPE-05:** D-13 (owner-run, agent-prepared, blocking checkpoint sequenced LAST) · D-14 (ONE
  artifact — reformat `draft-test-doc.md` to shipped single-line block + `status: draft`, no A/B
  twin) · D-15 (evidence = committed FINDINGS + reusable RUNBOOK, two fixed queries, binary rubric)
  · D-16 (checkpoint discipline — hold Jira Story In Progress, no auto-flip, honest
  tenant-unavailable stub if needed) · D-17 (correct the REQUIREMENTS.md:35 inversion — the v1.15
  Phase-113 probe DID exercise the visible `**Status:**` leg; PIPE-05 is a cosmetic
  format-re-confirmation, not a new-leg discovery) · D-18 (SC4 reworded outcome-neutral with a
  FAIL-escalation clause) · D-19 (PIPE-05 ≠ HARN-07 — necessary but not sufficient input).
- **Sequencing:** D-20 (exactly 3 plans: 124-01 PIPE-03 → 124-02 PIPE-04 → 124-03 PIPE-05,
  invariant order) · D-21 (4-plan escalation does NOT fire — output-only resolution) · D-22
  (validator schedule: D-04 OQ4 regression mandatory after 124-01; nav-hub link-checker + C17
  re-run are no-ops after 124-02 since no link targets change; nothing chain/3-axis/V115 runs in
  Phase 124 — Phase-125 firewall).

### Claude's Discretion

Per CONTEXT.md: **"None material — all four areas were adjudicated to locked decisions.
Implementation-mechanism details (exact PS/JS of the preprocessing regex, the generator script
structure, the fixture reformat) are the executor's to write within the D-01…D-22 constraints."**
This research resolves those implementation-mechanism details concretely (see Code Examples below)
so the executor has zero open mechanical questions.

### Deferred Ideas (OUT OF SCOPE)

- PIPE-04 batch driver + actual `.docx` generation/upload → deployment phase (v1.17+).
- True-source normalization of the nav-footer (`* * *` written into source `.md`) → post-freeze /
  v1.17 cleanup.
- SharePoint content-approval (if `Status: Draft` must gate, not just label) → owner/ops deferral.
- Whole-class enrollment of the 56 unregistered `.md` files → v1.17+.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| PIPE-03 | Fix the pandoc YAML-metadata alias defect (`DEFER-119-C`) without regressing OQ4 frontmatter promotion | Exact 12-file failing set reproduced and named; anchor regex empirically proven 0-false-positive across 277 files; D-01 rewrite empirically proven to (a) fix all 12 exit-64 failures, (b) preserve all 9 OQ4 custom properties, (c) produce byte-identical `word/document.xml` for the 14 already-passing files. See Code Examples §1-3. |
| PIPE-04 | Define + apply a descriptive-filename scheme (rename map + generator + registry-sync confirmation) | D-05 sanitizer independently re-run over all 221 real titles: 0 collisions, exact edge cases enumerated (§Code Examples §4). Confirmed no generator script exists yet (greenfield, not a fork). Confirmed `RE-index.md` table shape/column order for the parser to target. |
| PIPE-05 | Execute an owner-run Draft-label grounding probe on the shipped header-block format | Exact shipped format spec located and quoted (`EEE-SOP-standard.md` L80-119). Current fixture's two violations (separator/order AND position-relative-to-H1) identified by diffing against a real corpus file. v1.15 `PIPE-02-{RUNBOOK,FINDINGS}.md` read in full — directly reusable structural template (§Code Examples §5). |

</phase_requirements>

## Project Constraints (from CLAUDE.md)

`./CLAUDE.md` documents the Windows Autopilot Troubleshooter three-tier app (PowerShell /
FastAPI / React). **None of its directives apply to Phase 124** — this phase works exclusively in
`scripts/pipeline/`, `scripts/validation/`, `docs/`, and `.planning/`, none of which are covered by
the app's dev-commands, testing-strategy, or security-notes sections (those govern
`src/powershell`, `src/backend`, `src/frontend`). No conflict, no applicable directive to enforce.

## Architectural Responsibility Map

This is a document-pipeline/build-tooling phase, not an application-tier phase. Mapping onto the
standard tiers for completeness:

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Pandoc nav-footer preprocessing (PIPE-03) | Build/Pipeline (PowerShell wrapper) | — | `convert.ps1` is a local CLI conversion tool, not a running service; preprocessing happens synchronously before the pandoc subprocess call |
| OOXML post-conversion guard (D-04 regression) | Build/Pipeline (Node CLI) | — | `guard-docx.mjs` + `lib/ooxml.mjs` are zero-dependency Node scripts invoked from the shell, not application code |
| Filename-map generation (PIPE-04) | Build/Pipeline (Node CLI) | Storage (committed artifact) | Reads a markdown "database" (`RE-index.md`), writes a committed build artifact; no runtime service involved |
| Draft-label probe (PIPE-05) | External SaaS (Copilot Studio / SharePoint, owner-operated) | Build/Pipeline (fixture + local guard legs) | The retrieval/grounding leg is entirely outside this repo's control plane — genuinely owner-run, not agent-automatable (no credentials/connector exist in this environment) |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| pandoc | 3.7.0.2 (pinned) | MD→.docx conversion engine | Already the project's locked, version-guarded conversion tool (`convert.ps1` hard-asserts this exact version); confirmed installed on this machine (`pandoc.exe 3.7.0.2`) `[VERIFIED: local pandoc --version]` |
| Node.js | v24.17.0 (installed) | Runs all `scripts/pipeline/*.mjs` and `scripts/validation/*.mjs` tooling | Project-wide convention: zero external npm dependencies in these directories (`node:fs`, `node:path`, `node:zlib`, `node:child_process` only) `[VERIFIED: local node --version + read of lib/ooxml.mjs imports]` |
| PowerShell | 5.1+/7+ (host-native) | `convert.ps1` wrapper | Existing project convention; no version-specific new syntax required for the D-01 preprocessing block (basic `Get-Content`/regex/`Set-Content` idioms suffice) `[ASSUMED — not independently version-tested against PS 5.1, but the syntax used below is compatible back to PS 3.0]` |

### Supporting
None — this phase introduces no new runtime dependency of any kind.

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Surgical anchor preprocessing (D-01, locked) | `--from=markdown-yaml_metadata_block` pandoc flag (D-02, REJECTED) | Empirically disproven by the original Referee re-run: zeroes all 9 custom properties and leaks `doc_id` into body. Not re-tested here per instruction not to re-litigate locked decisions. |
| Generated committed filename map (D-09, locked) | Hand-maintained "Output Filename" column in `RE-index.md` (rejected) | Denormalized drift surface — two sources of truth for the same derived value |

**Installation:** None required — no new packages.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages (npm, pip, or otherwise). Every
script (`convert.ps1` extension, `build-filename-map.mjs`, any new `lib/ooxml.mjs` helper) uses
only Node built-ins (`node:fs`, `node:path`, `node:zlib`, `node:child_process`) and the
already-pinned, already-installed `pandoc` binary. The Package Legitimacy Gate protocol (slopcheck
+ registry verification) does not apply — there is nothing to audit. If the executor discovers a
need for any package during implementation, that is a plan deviation requiring a fresh legitimacy
check before proceeding.

## Architecture Patterns

### System Architecture Diagram

```
PIPE-03 (per-conversion, synchronous):

  docs/**/*.md (source, e.g. admin-setup-ios/03-ade-enrollment-profile.md)
        │
        ▼
  [convert.ps1, NEW block before line 74]
        │  1. Copy $InputMd -> ephemeral temp file (e.g. New-TemporaryFile / $env:TEMP)
        │  2. Read temp file lines; track ```/~~~ fence state
        │  3. For each blank-preceded standalone "---" line NOT inside a fence:
        │       peek forward past blank lines; if next non-blank matches
        │       ^\s*\*(Previous|Next step)\b  ->  rewrite that "---" to "* * *"
        │  4. D-03(b) fail-closed guard: diff source vs temp; abort (non-zero exit)
        │       if any delta exists OTHER than the intended --- -> * * * rewrites
        │
        ▼
  [temp .md file — source .md on disk is UNTOUCHED]
        │
        ▼
  pandoc 3.7.0.2  --reference-doc=scripts/pipeline/reference.docx   (UNCHANGED invocation)
        │
        ▼
  output .docx  ──► guard-docx.mjs (YAML-LEAK + HEADING-STYLE + [NEW] CUSTOM-PROPS checks)
                         │
                         ▼
                   exit 0 = safe to upload


PIPE-04 (one-time generation, then consumed per-conversion):

  docs/_registry/RE-index.md  (221 rows: Doc ID | Path | Title | Doc Type | Status)
        │
        ▼
  [NEW] scripts/pipeline/build-filename-map.mjs
        │  1. Parse table rows matching /^\|\s*RE-\d+\s*\|/ (ignores "## Review Notes" prose)
        │  2. slug(Title) per D-05's exact 5-step order
        │  3. Detect collisions; if any, apply D-08 Path-segment disambiguation;
        │     fail closed (FILENAME-COLLISION-UNRESOLVED, exit 1) if still unresolved
        │  4. Emit committed map: Doc ID | Path | Output Filename
        │
        ▼
  scripts/pipeline/filename-map.md (or .json — executor's choice, committed)
        │
        ▼
  (DEFERRED to v1.17+: a batch driver reads this map and calls
   convert.ps1 -OutputDocx <map value> per registered doc)


PIPE-05 (owner-run checkpoint, agent-prepared / owner-executed split):

  [Agent, in-repo]                              [Owner, live tenant — outside this repo]
  scripts/pipeline/test-fixtures/draft-test-doc.md
    (reformat: shipped header block,
     relocated BEFORE H1, status: draft)
        │
        ▼
  convert.ps1 + guard-docx.mjs (agent-runnable,   ──halt──►  Upload to TEST library only
   local legs — prove it converts + guards clean)             Wait for Copilot Studio sync
        │                                                     Run 2 fixed queries (render +
        ▼                                                       queryable) per PIPE-05-RUNBOOK.md
  PIPE-05-RUNBOOK.md (agent-authored,                          Record PASS/FAIL/DEFERRED in
   parameterized fill-ins)                                       PIPE-05-FINDINGS.md
  PIPE-05-FINDINGS.md (agent-authored blank                    Commit FINDINGS
   template; owner fills in)                                  Confirm in-thread
```

### Recommended Project Structure

No new directories. New/modified files only:

```
scripts/pipeline/
├── convert.ps1                    # MODIFIED: new preprocessing block before line 74 (D-01/D-03)
├── guard-docx.mjs                 # MODIFIED (recommended): +1 check, "CUSTOM-PROPS" (D-04 OQ4 regression)
├── lib/
│   └── ooxml.mjs                  # MODIFIED: +1 export, extractCustomProperties(docxPath)
├── build-filename-map.mjs         # NEW: PIPE-04 generator (D-09)
├── filename-map.md                # NEW: committed output artifact (D-09) — or .json, executor's call
├── README.md                      # MODIFIED: document the D-01 preprocessing step under SC1 (no longer "no other flags" without a caveat)
└── test-fixtures/
    ├── draft-test-doc.md          # MODIFIED: header reformat + relocation (D-14)
    └── README.md                  # MODIFIED (recommended): note draft-test-doc.md's header now follows the SHIPPED format/position, not the Phase-113 stub convention

.planning/phases/124-.../
├── PIPE-05-RUNBOOK.md             # NEW: agent-authored, owner-executed procedure (D-15)
└── PIPE-05-FINDINGS.md            # NEW: agent-authored blank template, owner-filled (D-15)
```

### Pattern 1: Ephemeral temp-copy preprocessing (never mutate source)

**What:** Copy the input `.md` to a temp file, mutate ONLY the temp copy, feed the temp copy to
pandoc, delete the temp file (or let it be gitignored/OS-cleaned).
**When to use:** Any time a pipeline needs to normalize source content for a specific consumer
without touching the frozen source-of-truth file.
**Example (PowerShell idiom for `convert.ps1`):**
```powershell
# Source: pattern verified against this repo's convert.ps1 + empirical pandoc testing (2026-07-08)
# Insert BEFORE the existing "Canonical conversion (SC1)" block (before line 74)

# ─── PIPE-03: Nav-footer YAML-alias preprocessing (D-01/D-03) ────────────────
$tempMd = [System.IO.Path]::GetTempFileName() -replace '\.tmp$', '.md'
Copy-Item -Path $InputMd -Destination $tempMd -Force

$lines = Get-Content -LiteralPath $tempMd
$inFence = $false
$fenceChar = $null
$rewriteCount = 0

for ($i = 0; $i -lt $lines.Count; $i++) {
    $line = $lines[$i]

    # D-03(a): track ```/~~~ fenced-code state; never rewrite inside a fence
    if ($line -match '^\s*(```|~~~)') {
        if (-not $inFence) { $inFence = $true; $fenceChar = $Matches[1] }
        elseif ($line.TrimStart().StartsWith($fenceChar)) { $inFence = $false }
        continue
    }
    if ($inFence) { continue }

    # Standalone "---" line, blank-preceded (or first line — not applicable here since
    # frontmatter's opening --- is line 1, never blank-preceded)
    if ($line -match '^---\s*$' -and $i -gt 0 -and $lines[$i-1].Trim() -eq '') {
        # Peek forward past blank lines for the anchor
        $j = $i + 1
        while ($j -lt $lines.Count -and $lines[$j].Trim() -eq '') { $j++ }
        if ($j -lt $lines.Count -and $lines[$j] -match '^\s*\*(Previous|Next step)\b') {
            $lines[$i] = '* * *'
            $rewriteCount++
        }
    }
}

Set-Content -LiteralPath $tempMd -Value $lines -Encoding utf8NoBOM

# D-03(b): fail-closed guard — the ONLY diff between source and temp must be
# the intended --- -> * * * rewrites on anchor-matched lines.
$origLines = Get-Content -LiteralPath $InputMd
$diffCount = 0
for ($i = 0; $i -lt [Math]::Max($origLines.Count, $lines.Count); $i++) {
    $o = if ($i -lt $origLines.Count) { $origLines[$i] } else { $null }
    $n = if ($i -lt $lines.Count) { $lines[$i] } else { $null }
    if ($o -ne $n) {
        $diffCount++
        # Assert this diff is an expected rewrite: orig was "---", new is "* * *"
        if (-not ($o -match '^---\s*$' -and $n -eq '* * *')) {
            Write-Error "PIPE-03 guard: unexpected diff at line $($i+1): '$o' -> '$n'. Aborting."
            Remove-Item $tempMd -Force -ErrorAction SilentlyContinue
            exit 1
        }
    }
}
Write-Host "PIPE-03 preprocessing: $rewriteCount nav-footer rewrite(s), guard PASS" -ForegroundColor Green

# Feed $tempMd (not $InputMd) to pandoc below; clean up $tempMd after conversion.
```
**Empirically verified (this session):** applying exactly this rewrite logic to
`docs/admin-setup-ios/03-ade-enrollment-profile.md` converts **exit 0** (was `exit 64`) and its
`docProps/custom.xml` still contains all 9 keys (`applies_to, audience, doc_id, doc_type,
last_verified, owner, platform, review_by, status`). Applying it to
`docs/admin-setup-apv1/01-hardware-hash-upload.md` (a passing file, whose lone `---` also matches
the anchor) produces a **byte-identical `word/document.xml`** to the unrewritten conversion
(51,246 bytes, verified equal via direct string comparison) — pandoc treats `---` and `* * *` as
the same `HorizontalRule` AST node when not part of a recognized YAML bracket, so the rewrite is
provably invisible in the OOXML output for files where it wasn't strictly necessary.

### Pattern 2: Zero-dependency OOXML custom-property extraction (new helper)

**What:** Read `docProps/custom.xml` from a `.docx` ZIP archive (already-decompressible via the
existing `extractEntry()` in `lib/ooxml.mjs`) and return the list of promoted property names.
**When to use:** D-04's OQ4 non-regression assertion — "the converted file's `docProps/custom.xml`
still carries the 9 promoted custom properties."
**Example:**
```javascript
// Source: new addition to scripts/pipeline/lib/ooxml.mjs, following the existing
// extractEntry()/findHeadingStyleIds() pattern exactly (same file, same conventions)

/**
 * Extract the set of custom document-property names promoted from YAML frontmatter.
 * Reads docProps/custom.xml and returns every <property ... name="X"> attribute value.
 * @param {string} docxPath
 * @returns {string[]} property names found (e.g. ['applies_to','audience','doc_id', ...])
 */
export function extractCustomProperties(docxPath) {
  const xml = extractEntry(docxPath, 'docProps/custom.xml');
  const names = [];
  const re = /<property[^>]*\bname="([^"]+)"/g;
  let m;
  while ((m = re.exec(xml)) !== null) names.push(m[1]);
  return names;
}
```
**Empirically confirmed 9-key set (uniform across every sampled doc class this session —
runbook, admin-setup guide, decision-tree, glossary, nav-hub):**
`applies_to, audience, doc_id, doc_type, last_verified, owner, platform, review_by, status`
— safe to hard-code as the expected set for the D-04 regression assertion. Recommended as a new
`CUSTOM-PROPS` check in `guard-docx.mjs`'s `checks` array (mirrors the existing `YAML-LEAK` /
`HEADING-STYLE` pattern exactly) — this both satisfies D-04's one-time regression proof AND
strengthens the shipped guard permanently for near-zero cost, matching the "reusable assets"
convention CONTEXT.md calls out. If the planner prefers a narrower one-off proof instead
(not touching the permanent guard), the same function still applies — only the call-site differs.

### Pattern 3: Zero-dependency markdown-table parsing (for the PIPE-04 generator)

**What:** Parse `RE-index.md`'s pipe-table rows without a markdown-table library.
**When to use:** `build-filename-map.mjs` reading the registry.
**Example:**
```javascript
// Source: new code for scripts/pipeline/build-filename-map.mjs — table shape
// confirmed empirically against the live docs/_registry/RE-index.md (221 rows,
// header "| Doc ID | Path | Title | Doc Type | Status |" at line 15, data rows
// 17-237, followed by a non-table "## Review Notes" prose section that MUST be
// excluded by the row-matching regex below)

const registryText = readFileSync('docs/_registry/RE-index.md', 'utf8');
const rows = registryText
  .split(/\r?\n/)
  .filter(l => /^\|\s*RE-\d+\s*\|/.test(l))   // excludes header/separator/prose rows
  .map(l => {
    const cols = l.split('|').map(s => s.trim());
    // cols[0] is '' (leading pipe); cols[1..5] are Doc ID/Path/Title/Doc Type/Status
    return { docId: cols[1], path: cols[2], title: cols[3], docType: cols[4], status: cols[5] };
  });
// Confirmed this session: rows.length === 221, exactly matching the registry's row count.
```

### D-05 Slug Algorithm (exact order — do not paraphrase)

```javascript
function slug(title) {
  let s = title.toLowerCase();               // 1. lowercase
  s = s.replace(/[\/\s]+/g, '-');             // 2. "/" and whitespace runs -> single "-"
  s = s.replace(/[^a-z0-9-]/g, '');           // 3. delete everything else (incl. ".", ":", "—", "(", ")")
  s = s.replace(/-+/g, '-').replace(/^-|-$/g, ''); // 4. collapse/trim "-"
  return s;                                   // 5. caller appends ".docx"
}
```
**Independently re-run against all 221 live titles this session: 0 collisions.** Confirmed edge
cases: `802.1X Certificate Failure` → `8021x-certificate-failure` (the `.` is deleted by step 3,
consistent with CONTEXT's note); `APv1 Registration Conflict -- ESP Appeared...` (literal ASCII
double-hyphen) and `macOS Platform SSO — Secure Enclave Key Loss` (em-dash) both collapse cleanly
to a single `-` via steps 3+4. Longest slug: `RE-205` →
`macos-platform-sso-provisioning-walkthrough-a1-standard-and-a2-ade-during-setup-assistant` (89
chars, 94 with `.docx`) — well under SharePoint's 255-char limit.

### Anti-Patterns to Avoid

- **Do not run the D-08 collision-disambiguation path speculatively.** It is fail-closed dead code
  today (0 of 221 titles collide) — write it, but do not spend effort hand-testing exotic
  collision scenarios not present in the real registry; a single unit-style synthetic-collision
  test is sufficient to prove the fail-closed exit path works.
- **Do not add the OQ4 CUSTOM-PROPS check as a hardcoded list inline in a one-off script if it can
  live in `lib/ooxml.mjs` instead** — the existing file already establishes the
  "reusable-introspection-helper" pattern; duplicating XML-parsing logic elsewhere would create
  drift.
- **Do not assume the anchor pattern needs `## Navigation` heading detection.** The 5
  `docs/lifecycle/*.md` files also contain a `Previous:`/`Next:` navigation line, but it sits under
  a `## Navigation` H2 and is NOT asterisk-prefixed — pandoc converts these 5 files **exit 0**
  today (verified this session) precisely because they don't match the alias-triggering shape.
  Do not broaden the anchor to catch them; doing so would be an unnecessary and un-locked scope
  expansion (D-02 explicitly rejects "blanket" over-matching).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| ZIP/DEFLATE decompression for reading `.docx` internals | A new ZIP parser | The existing `extractEntry()` in `scripts/pipeline/lib/ooxml.mjs` | Already handles the PKZIP local-file-header walk + `inflateRawSync`, including the Pitfall-5 data-descriptor edge case; a second implementation would drift |
| Markdown table parsing library | `npm install markdown-table` or similar | The simple `/^\|\s*RE-\d+\s*\|/` row-filter + `split('|')` shown above | `RE-index.md`'s table shape is simple and fixed; a full markdown-table parser is unjustified dependency weight for a 221-row, 5-column, no-nested-content table |
| YAML parsing for the registry or frontmatter | A YAML library | Plain string/regex operations (the registry is a markdown table, not YAML; frontmatter is only ever read by pandoc itself, never by this phase's new code) | Neither PIPE-03 nor PIPE-04 needs to parse YAML — PIPE-03 only rewrites literal `---` lines by position, PIPE-04 only reads the markdown table |

**Key insight:** Every problem this phase touches already has an in-repo zero-dependency solution
pattern (from Phase 113's `lib/ooxml.mjs` and the `retrofit-*.mjs` family) — the discipline here is
extending those patterns consistently, not introducing anything new.

## Common Pitfalls

### Pitfall 1: Assuming all 12 failing files share one nav-footer shape
**What goes wrong:** Some failing files use `*Previous: ... | Next: ... | Back to Overview*` (a
single combined line), others use `*Next step: [Link]*` alone, others use `*Next step: Choose your
path — ...*` (prose with embedded links, no simple `[text](url)` pattern). A regex that assumes a
single fixed sentence shape for the nav line itself (rather than just anchoring on the leading
`*Previous`/`*Next step` token) will miss files.
**Why it happens:** The 12 files were hand-authored over multiple retrofit phases (117/118); the
nav-footer prose varies per author while the opening pattern stays consistent.
**How to avoid:** Anchor ONLY on the line-start pattern `^\s*\*(Previous|Next step)\b` as D-01
specifies — do not try to parse or validate the rest of the line's content.
**Warning signs:** If a "fix" only handles 10 or 11 of the 12 known failing files, the anchor
regex was narrowed incorrectly.

### Pitfall 2: Confusing "files containing Previous:/Next: text" with "files that actually fail"
**What goes wrong:** A naive grep for `Previous:` or `Next:` across `docs/` returns files that
convert fine (the 5 `docs/lifecycle/*.md` files use a `## Navigation` heading + plain-text
`Previous: ... | Next: ...` — no leading asterisk, no bracket-closing `---`, pandoc parses them
without issue).
**Why it happens:** Both shapes visually "look like" nav footers to a human skim, but only the
asterisk-prefixed, blank-preceded-`---`-bracketed shape triggers pandoc's mid-document
YAML-metadata-block detection.
**How to avoid:** Use the exact reproduction method in Code Examples above (actually run pandoc,
don't just grep for keywords) to build the failing-file list. This research already did this full
corpus scan — the 12-file failing set is the *complete, closed* list for scope purposes; do not
add files to it based on text-pattern grepping alone.
**Warning signs:** A plan that lists more or fewer than exactly 12 failing files at the top of
124-01, without having run pandoc against the corpus, is working from an unverified guess.

### Pitfall 3: Reformatting draft-test-doc.md's separator/order but leaving its H1-relative position wrong
**What goes wrong:** D-14 says "reformat so its header is the shipped EEE single-line block" — it
is easy to read this as "just fix the `.`-separator to `·` and reorder the fields" while leaving
the block AFTER the H1 (its current position, inherited from the Phase-113
`test-fixtures/README.md` "immediately after its `# Title`" convention, which predates and
contradicts the later-locked `EEE-SOP-standard.md` position rule).
**Why it happens:** The Phase-113 test-fixtures convention and the later-shipped EEE standard
diverge on block placement, and nothing in `124-CONTEXT.md`'s prose spells out "move it before the
H1" as a separate bullet — it's implied by "shipped EEE single-line block" but easy to miss if the
executor only diffs the visible header text and not its position.
**How to avoid:** Compare directly against a real shipped corpus file (e.g.
`docs/l1-runbooks/01-device-not-registered.md`, confirmed this session: frontmatter close → header
block → blank line → H1 → blank line → `## Summary`) — position, not just wording, must match.
**Warning signs:** If the reformatted fixture still has the header block between the H1 and the
`## Background`/`## Test Section` prose, it hasn't been fully migrated to shipped format.

### Pitfall 4: Treating the D-04 byte-equivalence proof as a paper claim instead of a runnable check
**What goes wrong:** Writing the plan's "SC2 regression test" as prose-only ("byte-equivalence
will hold because pandoc treats `---` and `* * *` identically") without an actual diff step in the
plan's done-criteria.
**Why it happens:** The claim is true (empirically confirmed this session for one representative
file) but is non-obvious enough that skipping the runtime proof would be a silent risk if
some OTHER one of the 14 passing files has a subtly different shape (e.g., a second `---` nearby,
different heading level context) that behaves differently.
**How to avoid:** The plan's done-criteria for 124-01 should include an actual byte-diff of
`word/document.xml` across all 14 previously-passing files (not just 1 spot-check), using
`extractEntry()` (already available) for both the pre-fix and post-fix conversion of each file.
**Warning signs:** A "SUMMARY.md" that asserts byte-equivalence for "the 14 files" without listing
a command or diff output that was actually run per-file.

## Code Examples

### The verified 12-file failing set (exact paths, confirmed this session via full pandoc run)

```
docs/admin-setup-8021x/00-overview.md              (Unknown alias `Next`)
docs/admin-setup-ios/00-overview.md                (Unknown alias `Next`)
docs/admin-setup-ios/01-apns-certificate.md        (Unknown alias `Previous`)
docs/admin-setup-ios/02-abm-token.md                (Unknown alias `Previous`)
docs/admin-setup-ios/03-ade-enrollment-profile.md  (Unknown alias `Previous`)
docs/admin-setup-ios/04-configuration-profiles.md  (Unknown alias `Previous`)
docs/admin-setup-ios/05-app-deployment.md          (Unknown alias `Previous`)
docs/admin-setup-ios/06-compliance-policy.md       (Unknown alias `Previous`)
docs/admin-setup-ios/07-device-enrollment.md       (Unknown alias `Previous`)
docs/admin-setup-ios/08-user-enrollment.md         (Unknown alias `Previous`)
docs/admin-setup-ios/09-mam-app-protection.md      (Unknown alias `Previous`)
docs/admin-setup-macos/00-overview.md              (Unknown alias `Next`)
```

### Reproduction command (run this exactly to re-verify at plan/execution time)

```powershell
# Single-file repro (any of the 12 above):
pandoc docs/admin-setup-ios/03-ade-enrollment-profile.md -o <tmp>.docx --reference-doc=scripts/pipeline/reference.docx
# Expect: "Error parsing YAML metadata ... Unknown alias `Previous`", exit 64
```

### Draft-test-doc.md reformat target (D-14)

Current (WRONG — position after H1, `.`-separated, Doc-ID-first):
```markdown
---
title: Draft Test Document — macOS Synthetic
last_verified: 2026-07-03
platform: macOS
status: draft
---

# Draft Test Document — macOS Synthetic

**Doc ID:** RE-T05 . **Platform:** macOS . **Doc Type:** Runbook . **Status:** Draft
```

Target (shipped format — matches `EEE-SOP-standard.md` L83 + real corpus file placement):
```markdown
---
title: Draft Test Document — macOS Synthetic
last_verified: 2026-07-03
platform: macOS
status: draft
---

**Platform:** macOS · **Doc Type:** Runbook · **Doc ID:** RE-T05 · **Status:** Draft

# Draft Test Document — macOS Synthetic

## Summary
...
```
Note: adding `doc_id`/`owner`/`doc_type`/`applies_to`/`audience`/`review_by` to the frontmatter
(to match the real 9-key corpus convention) is NOT mandated by D-14's locked text (which only
requires the visible block + `status: draft`) — it is an optional executor enhancement for
internal consistency, not a requirement. Flagged as an open question below for the planner to
decide explicitly rather than leave ambiguous.

### PIPE-05-RUNBOOK.md / PIPE-05-FINDINGS.md template source

`.planning/milestones/v1.15-phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-RUNBOOK.md`
and the sibling `PIPE-02-FINDINGS.md` (172 and 213 lines respectively, both read in full this
session) are the direct structural template. Reusable sections: "Prerequisites" (owner-fills-in
table for library URL/agent name), "Upload Procedure", "Query Sequence" (table: Query | Exact Text
| What to Record), "Phase Completion Condition". D-15 narrows this to exactly 2 fixed queries (a
render query + a queryable query) and a binary PASS rubric, vs. v1.15's 6 open-ended queries — the
template's *shape* transfers; its *content* must be re-authored to match D-15's narrower scope.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Phase-113 test-fixtures header stub: `.`-separated, Doc-ID-first, placed AFTER the H1 (documented in `test-fixtures/README.md` "Stub EEE Header Format") | Phase-114-shipped EEE standard: `·`-separated, Platform-first, placed BEFORE the H1, immediately after frontmatter (`EEE-SOP-standard.md` D-05) | Phase 114 (standard authored after Phase 113's fixtures were created) | `draft-test-doc.md` is the one fixture still carrying the pre-standard stub shape; D-14 requires migrating it to shipped format |
| REQUIREMENTS.md:35 framing ("v1.15's Option-A probe exercised only the frontmatter leg") | D-17 correction: the ORIGINAL v1.15 Phase-113 PIPE-02 probe DID exercise the visible leg (that's what surfaced); a LATER Phase-119 close-gate probe (mutating real doc RE-130) exercised only the frontmatter leg | Discovered/adjudicated at Phase 124 discuss-phase (2026-07-08) | Planner must correct REQUIREMENTS.md:35 wording during 124 planning per D-17; PIPE-05 must be framed as a format re-confirmation, not a "does the label surface at all" discovery |

**Deprecated/outdated:**
- The `test-fixtures/README.md` "Stub EEE Header Format" section (lines 25-35) describes a format
  that is now superseded for `draft-test-doc.md` specifically (the other 5 fixtures in that
  directory are NOT touched by this phase and may legitimately keep the old stub format — D-14
  scopes the reformat to exactly one file).

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | PowerShell 5.1 compatibility of the exact preprocessing syntax shown (array indexing, `-replace`, `$Matches`) — not independently tested against PS 5.1, only reasoned from long-standing PS syntax stability | Code Examples Pattern 1 | LOW — this syntax has been stable since PS 3.0; if the executor's environment somehow lacks it, the error would surface immediately at first test run, not silently |
| A2 | Adding `CUSTOM-PROPS` as a permanent `guard-docx.mjs` check (rather than a one-off proof script) is the better implementation choice | Pattern 2 recommendation | LOW-MEDIUM — this is a recommendation, not a locked decision; if the planner disagrees and treats it as a narrower one-off check, no harm, but the guard would not gain permanent OQ4 regression coverage for future conversions |
| A3 | The `filename-map.md` (vs `.json`) output format for the PIPE-04 generator — CONTEXT.md's D-09 example names it `build-filename-map.mjs → a map with columns Doc ID \| Path \| Output Filename` (implying markdown table) but does not lock the exact file extension/format | Recommended Project Structure | LOW — either format satisfies "generated, committed, doesn't write RE-index.md"; the executor's choice, but should be decided explicitly in the plan rather than left to mid-implementation drift |
| A4 | Whether `draft-test-doc.md`'s frontmatter should gain the additional 5 keys (`doc_id, owner, doc_type, applies_to, audience, review_by`) to fully mirror a real corpus doc, beyond what D-14 literally requires (`status: draft` + visible block) | Code Examples "Draft-test-doc.md reformat target" | LOW — D-14's locked text only requires the visible block + `status: draft`; adding more frontmatter keys doesn't violate anything but should be an explicit plan choice, not an implicit scope-creep during execution |

**If this table is empty:** N/A — see above; all four items are low-risk implementation-detail
assumptions, not load-bearing factual claims about the locked decisions themselves.

## Open Questions (RESOLVED)

1. **Should the D-04 OQ4 regression check become a permanent `guard-docx.mjs` check, or a one-off proof script?** **RESOLVED (124-01):** the permanent CUSTOM-PROPS guard was adopted (see 124-01 Task 2).
   - What we know: the 9-key set is confirmed uniform across every sampled doc class this session
     (runbook, admin-setup guide, decision-tree, glossary, nav-hub) — safe to hard-code either way.
   - What's unclear: whether making it a PERMANENT check (applied to every future conversion)
     is in-scope for a phase whose CONTEXT explicitly says "no new validators, no chain changes"
     (Phase-125 firewall) — though `guard-docx.mjs` itself is not a chain-registered validator
     (D-07 from Phase 113 notes it stays standalone until Phase 119/125's fold), so extending it
     does not touch the firewalled chain surfaces.
   - Recommendation: make it permanent (Pattern 2 above) — it's a pipeline-surface guard
     extension, not a chain/validator-atom addition, and directly serves D-04's own stated intent
     ("both paths regression-tested"). Low risk either way; planner should just decide explicitly.

2. **Exact output format for the PIPE-04 committed map (`.md` table vs `.json`)?** **RESOLVED (124-02):** the `.md` table map format was adopted (see 124-02 Task 2).
   - What we know: D-09 names the file `build-filename-map.mjs` and describes the map's logical
     columns; it does not lock a serialization format.
   - What's unclear: which format is easier for the (deferred, v1.17+) batch driver to consume.
   - Recommendation: `.md` table (consistent with `RE-index.md`'s own format, human-reviewable in
     a PR diff) unless the planner has a reason to prefer machine-readable `.json` for the future
     batch driver. Either is fine — decide once, don't leave open through implementation.

3. **Does `draft-test-doc.md`'s frontmatter need the full 9-key set, or just the D-14-mandated `status: draft`?** **RESOLVED (124-03):** the full 9-key set was adopted; the fixture key-count decision is recorded in 124-03 Task 1.
   - What we know: D-14's locked text only requires the visible block reformat + `status: draft`
     (already present). The fixture currently has only 4 frontmatter keys (`title, last_verified,
     platform, status`).
   - What's unclear: whether "mirror a real retrofitted Draft doc" (D-14's framing) implies the
     full key set.
   - Recommendation: leave frontmatter as-is (4 keys) unless the plan explicitly wants a closer
     mirror — the probe's binary rubric (D-15) only checks whether the literal "Draft" string
     surfaces in the Copilot response, which depends on the VISIBLE block, not the frontmatter key
     count. Adding keys is cosmetic completeness, not functionally required for PIPE-05's rubric.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| pandoc | PIPE-03 preprocessing verification, PIPE-04 sample conversion, PIPE-05 fixture conversion | Yes | 3.7.0.2 (exact pin match) | — |
| Node.js | All `.mjs` scripts (guard-docx, build-filename-map, ooxml helpers) | Yes | v24.17.0 | — |
| git | Commits, `git show`/`git blame` per project convention | Yes | 2.51.0.windows.2 | — |
| Live Copilot Studio / SharePoint tenant access | PIPE-05 owner-run upload + query leg | Not available to the agent (confirmed no connector/credential in this environment, matching D-13's own claim) | — | Owner-run at the blocking checkpoint per D-13; agent authors RUNBOOK/FINDINGS/fixture and halts |

**Missing dependencies with no fallback:** None that block agent-side work — the Copilot
Studio/SharePoint leg is *by design* owner-only (D-13), not a missing-tool gap to work around.

**Missing dependencies with fallback:** Live tenant access → owner-run checkpoint (D-13/D-16); if
the tenant is genuinely unavailable at execution time, D-16 already specifies the honest fallback
("prepared; live confirmation deferred to deployment" FINDINGS stub — never a fabricated
confirmation).

## Validation Architecture

Skipped — `.planning/config.json` sets `workflow.nyquist_validation: false` explicitly.
`[VERIFIED: read of .planning/config.json]`

## Security Domain

`security_enforcement` is absent from `.planning/config.json` (treated as enabled per instructions),
but this phase has no authentication, session, access-control, or user-input surface — it is a
local document-conversion pipeline and a markdown-table-driven filename generator operating on
already-trusted, already-committed repository content.

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | No | No auth surface in this phase's code |
| V3 Session Management | No | N/A |
| V4 Access Control | No | N/A |
| V5 Input Validation | Marginal | The D-08 fail-closed collision guard and the D-03(b) fail-closed diff guard ARE input-validation-style controls (abort rather than silently proceed on unexpected input) — already locked and specified; no additional library needed, plain conditional checks suffice |
| V6 Cryptography | No | N/A — no secrets, tokens, or crypto operations touched |

### Known Threat Patterns for this stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Silent data corruption from an unexpected preprocessing diff (PIPE-03) | Tampering (of the pipeline's own trust guarantee — source `.md` must stay byte-unchanged) | D-03(b)'s fail-closed guard: abort conversion on ANY diff other than the intended rewrite — already locked, already specified in Code Examples Pattern 1 |
| Silent filename collision producing a duplicate/overwritten `.docx` (PIPE-04) | Tampering / Repudiation (wrong doc silently shadows another) | D-08's fail-closed collision policy: non-zero exit on unresolved collision, never a silent duplicate — already locked |
| Fabricated/optimistic PIPE-05 FINDINGS if the tenant is unavailable | Repudiation (false confirmation record) | D-16's explicit rule: commit an honest "prepared; live confirmation deferred" stub rather than fabricate a PASS — already locked |

## Sources

### Primary (HIGH confidence — all independently reproduced this session, not taken from CONTEXT.md on faith)
- Live pandoc 3.7.0.2 execution against all 277 `docs/**/*.md` files — full corpus scan, 12
  failures identified and named exactly.
- Live pandoc conversion of the D-01 rewrite applied to 1 failing file + 1 passing file, with
  direct byte-level `docProps/custom.xml` and `word/document.xml` inspection via
  `scripts/pipeline/lib/ooxml.mjs`'s existing `extractEntry()`.
- `docs/_registry/RE-index.md` — read in full (all 221 rows); D-05 slug algorithm independently
  re-implemented and run against every title.
- `docs/_standards/EEE-SOP-standard.md` lines 60-119, 260-297 — read directly for the exact
  shipped header-block format spec and the Draft-label-is-not-a-gate codification.
- `scripts/pipeline/convert.ps1`, `guard-docx.mjs`, `lib/ooxml.mjs`, `README.md`,
  `test-fixtures/README.md`, `test-fixtures/draft-test-doc.md` — read in full.
- `.planning/milestones/v1.15-phases/113-.../PIPE-02-RUNBOOK.md` and `PIPE-02-FINDINGS.md` — read
  in full as the PIPE-05 template source.
- `scripts/validation/check-nav-hub-links.mjs` (HUB_PATHS confirmed at line 27) and
  `c17-eee-contract.mjs` (both confirmed to exist; `--self-test` flag confirmed on both).
- `.planning/config.json` — `nyquist_validation: false` confirmed directly.

### Secondary (MEDIUM confidence)
- `.planning/STATE.md` Phase 119-06 entry — describes the Phase-119 close-gate RE-130
  frontmatter-only Draft mutation that D-17's correction is partly about; read but not
  independently re-verified (that probe already happened and is not repeatable in this session).

### Tertiary (LOW confidence)
- None — every claim in this document was either read directly from a canonical source file or
  independently reproduced via a tool call in this session.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; pandoc version pin verified installed and matching exactly
- Architecture: HIGH — every mechanical claim (failing-file set, anchor-match set, byte-equivalence, 9-key custom-property set, slug collision count) was independently reproduced with tool calls this session, not inferred
- Pitfalls: HIGH — all four pitfalls are drawn from discrepancies actually discovered while reproducing the mechanics (e.g., the lifecycle-files false-positive risk, the fixture position mismatch) — not speculative

**Research date:** 2026-07-08
**Valid until:** Stable through Phase 124 execution (pandoc pin, registry content, and standard
spec are all static/frozen inputs for this phase); re-verify only if `RE-index.md` or
`EEE-SOP-standard.md` change before planning completes.
