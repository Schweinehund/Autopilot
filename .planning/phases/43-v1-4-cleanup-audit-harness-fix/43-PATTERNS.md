# Phase 43: v1.4 Cleanup & Audit Harness Fix — Pattern Map

**Mapped:** 2026-04-24
**Files analyzed:** 17 (13 CREATE + 4 MODIFY + Phase 39 restore set)
**Analogs found:** 15 / 17 (2 net-new — CI YAML + pre-commit shell — have no in-repo analog per RESEARCH §8)

Downstream-phase agents MUST read this alongside `43-CONTEXT.md` and `43-RESEARCH.md` before authoring task-level `<read_first>` and `<action>` blocks.

## File Classification

| # | File Path | Action | Role | Data Flow | Closest Analog | Match Quality |
|---|-----------|--------|------|-----------|----------------|---------------|
| 1 | `scripts/validation/v1.4-audit-allowlist.json` | CREATE (git-restore) | sidecar JSON / data | file-I/O (read by harness) | `git show e5e45db:.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` | exact — literal git-history source |
| 2 | `scripts/validation/v1.4-milestone-audit.mjs` | MODIFY (2 edits only) | harness / validator | file-reads-only CLI | self (edit-in-place — line 1 prepend, line 57 path update) | self |
| 3 | `scripts/validation/v1.4.1-milestone-audit.mjs` | CREATE (cp + additive) | harness / validator | file-reads-only CLI | `scripts/validation/v1.4-milestone-audit.mjs` (entire file) | exact — cp-then-additive |
| 4 | `scripts/validation/v1.4.1-audit-allowlist.json` | CREATE (skeleton) | sidecar JSON / data | file-I/O (read by harness) | `scripts/validation/v1.4-audit-allowlist.json` schema (post-rescue) + RESEARCH §3 final JSON | exact |
| 5 | `scripts/validation/regenerate-supervision-pins.mjs` | CREATE (new helper) | utility / CLI | file-reads-only batch transform | `scripts/validation/check-phase-31.mjs` `parseInventory()` pattern + v1.4 harness `androidDocPaths()` + `readFile()` | role-match (new pattern, reuses primitives) |
| 6 | `scripts/validation/README-supervision-pins.md` | CREATE | doc / usage | static | no in-repo README analog (project has no `scripts/*/README.md` convention); follow `docs/_templates/` frontmatter-less style | role-match |
| 7 | `docs/l2-runbooks/18-android-log-collection.md` | MODIFY frontmatter line 3 | content / runbook | YAML edit | self (lines 1-7 existing frontmatter) | self |
| 8 | `docs/l2-runbooks/19-android-enrollment-investigation.md` | MODIFY frontmatter line 3 | content / runbook | YAML edit | identical shape to file 7 | self |
| 9 | `docs/l2-runbooks/20-android-app-install-investigation.md` | MODIFY frontmatter line 3 | content / runbook | YAML edit | identical shape to file 7 | self |
| 10 | `docs/l2-runbooks/21-android-compliance-investigation.md` | MODIFY frontmatter line 3 | content / runbook | YAML edit | identical shape to file 7 | self |
| 11 | `docs/_templates/admin-template-android.md` | MODIFY frontmatter line 28 + comment block | template / YAML | YAML edit + HTML-comment edit | self (lines 27-32 existing frontmatter) | self |
| 12 | `docs/admin-setup-android/06-aosp-stub.md` | MODIFY (trim ~389 words) | content / stub | prose compression | self (H2 hierarchy lines 24/30/40/49/77/93/100/114/124 — lock structure while trimming bodies) | self |
| 13 | `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` | CREATE (net-new prep shell) | planning artifact / input | static content extract | RESEARCH §6 template + lines 53-60 of current `06-aosp-stub.md` (verbatim RealWear paragraphs) | exact — content source is identifiable |
| 14 | `.github/workflows/audit-harness-integrity.yml` | CREATE (bootstraps CI) | config / CI | event-driven | **no in-repo analog** — `.github/` directory does not exist (RESEARCH §8); use RESEARCH §8 YAML verbatim | none — net new |
| 15 | `scripts/hooks/pre-commit.sh` | CREATE (bootstraps hooks) | config / git hook | event-driven | **no in-repo analog** — no Husky / lefthook / `.git/hooks/*` in repo (RESEARCH §8); use RESEARCH §8 shell verbatim | none — net new |
| 16 | `scripts/hooks/README.md` | CREATE (optional) | doc / usage | static | none — follow README-supervision-pins style | role-match |
| 17 | `.planning/phases/39-zero-touch-enrollment-aosp-stub/*` | RESTORE (5 artifacts via git show) | planning artifact / historical | file-I/O (git show to fs) | historical git state at commit `ef7717b` | exact — git-history source |

**Phase 43 own artifacts (emitted by orchestrator tooling; NOT planner-authored):**
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-VALIDATION.md`
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-VERIFICATION.md`
- `.planning/phases/43-v1-4-cleanup-audit-harness-fix/43-{01..10}-SUMMARY.md`

---

## Pattern Assignments

### File 1: `scripts/validation/v1.4-audit-allowlist.json` (CREATE via git-restore)

**Analog:** git blob at commit `e5e45db`, path `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`. This is the **literal source** — verbatim restore to new path, no content changes in commit-1.

**Restore commands** (RESEARCH §2, verified by Phase 43 context):
```bash
# From repo root D:\claude\Autopilot
git show e5e45db:.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json \
  > scripts/validation/v1.4-audit-allowlist.json

# Verify the restore:
node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json', 'utf8'));
  console.log('safetynet:', j.safetynet_exemptions.length, 'supervision:', j.supervision_exemptions.length);"
# Expected output: safetynet: 4 supervision: 9
```

**JSON schema pattern** (post-rescue file shape — authoritative from git history):
```json
{
  "schema_version": "1.0",
  "generated": "<iso-timestamp>",
  "phase": "<phase-slug>",
  "safetynet_exemptions": [
    {"file": "<relative/path.md>", "line": <int>, "reason": "<human-readable>"}
  ],
  "supervision_exemptions": [
    {"file": "<relative/path.md>", "line": <int>, "reason": "<human-readable>"}
  ]
}
```

**Expansion pattern** (Plan 43-03 follow-up — add 14 new supervision pins):
- Source for new pins: RESEARCH §3 pin census (N1..N9 table), lines 363-374.
- Expansion mechanics: `supervision_exemptions[]` grows from 9 → 23 entries; add entries matching the JSON block at RESEARCH.md lines 394-414.
- After expansion: `node scripts/validation/v1.4-milestone-audit.mjs --verbose` produces C2 PASS (was FAIL).

---

### File 2: `scripts/validation/v1.4-milestone-audit.mjs` (MODIFY: 2 edits only)

**Analog:** self. Only two atomic edits in commit-1 (rescue). Do NOT refactor, reorder, or touch any other line.

**Edit A — prepend line 1 freeze-marker** (D-02 locks `3c3a140` + points at v1.4.1):
```diff
+// FROZEN at commit 3c3a140 — see scripts/validation/v1.4.1-milestone-audit.mjs for active harness
 #!/usr/bin/env node
 // v1.4 Milestone Audit Harness
```

**Edit B — line 57 sidecar path** (D-03):
```diff
 function parseAllowlist() {
-  const raw = readFile('.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json');
+  const raw = readFile('scripts/validation/v1.4-audit-allowlist.json');
   if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
```

**Verify after edit:** `node scripts/validation/v1.4-milestone-audit.mjs --verbose` — should produce identical `Summary:` line to the pre-rescue output EXCEPT C2 now finds the sidecar (FAIL → may go to PASS after Plan 43-03 expansion).

**Forbidden changes** (Pitfall 1 in RESEARCH §"Common Pitfalls"):
- Do NOT delete this file.
- Do NOT archive into `.planning/milestones/v1.4-phases/`.
- Do NOT add new checks (C6/C7/C9 go into v1.4.1 ONLY per D-06).
- Do NOT change `androidDocPaths()` (scope-filter lives in v1.4.1 ONLY per D-24/D-26).

---

### File 3: `scripts/validation/v1.4.1-milestone-audit.mjs` (CREATE via cp + additive edits)

**Analog:** `scripts/validation/v1.4-milestone-audit.mjs` — entire file. Phase 42 D-25 locks no-shared-module contract; v1.4.1 harness is a **concrete copy with additive edits**. Zero refactors.

**Creation command:**
```bash
# From repo root (AFTER commit-1 rescue has updated v1.4 line 57 to scripts/validation/...)
cp scripts/validation/v1.4-milestone-audit.mjs scripts/validation/v1.4.1-milestone-audit.mjs
```

**Six additive edits (in order of appearance in the file):**

#### Edit 1: Header comment (lines 1-4) — REPLACE (not prepend; this is the fresh v1.4.1 file)

Existing (copied from v1.4 post-rescue):
```javascript
// FROZEN at commit 3c3a140 — see scripts/validation/v1.4.1-milestone-audit.mjs for active harness
#!/usr/bin/env node
// v1.4 Milestone Audit Harness
// Source of truth: .planning/phases/42-integration-milestone-audit/42-CONTEXT.md (D-25..D-31)
// Sidecar allow-list: scripts/validation/v1.4-audit-allowlist.json
```

Replace with (RESEARCH §1 Edit 1):
```javascript
#!/usr/bin/env node
// v1.4.1 Milestone Audit Harness (copy of v1.4 + C6/C7/C9 informational-first per Phase 42 D-29 + _*-prefix scope-filter + TEMPLATE-SENTINEL parse)
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-01..D-08, D-24, D-26)
// Sidecar allow-list: scripts/validation/v1.4.1-audit-allowlist.json  (Knox / per-OEM AOSP / COPE exemptions)
// Frozen-predecessor reproducibility anchor: v1.4-milestone-audit.mjs pinned at commit 3c3a140
```

(Note: the FROZEN marker line present in v1.4 post-rescue must be REMOVED from v1.4.1 — that marker applies to v1.4 only.)

#### Edit 2: Sidecar path line (line 57)

```diff
 function parseAllowlist() {
-  const raw = readFile('scripts/validation/v1.4-audit-allowlist.json');
+  const raw = readFile('scripts/validation/v1.4.1-audit-allowlist.json');
```

#### Edit 3: `androidDocPaths()` scope-filter (append to function body, lines 113-114)

Current last two lines of function (v1.4 line 113-114):
```javascript
  return Array.from(paths).sort();
}
```

Replace with (RESEARCH §1 Edit 4, D-24 scope-filter):
```javascript
  // D-24 scope-filter: exclude any DIRECTORY segment starting with "_" (e.g., _templates/, _drafts/, _archive/, _partials/).
  // Defensive: covers iOS/macOS/Windows templates without explicit per-template sentinel adoption (v1.5 backlog).
  // Filename segment is INTENTIONALLY skipped so that docs/_glossary-android.md (a shipped doc with "_" prefix filename) remains in scope.
  function hasUnderscoreDirSegment(relPath) {
    const segments = relPath.split('/');
    return segments.slice(0, -1).some(seg => /^_/.test(seg));
  }
  return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
}
```

**Carve-out validation** (RESEARCH §1 A7):
- `docs/_glossary-android.md` → dir segments `["docs"]` → INCLUDED ✅
- `docs/_templates/admin-template-android.md` → dir segments `["docs", "_templates"]` → EXCLUDED ✅

#### Edit 4: C5 sentinel-aware parse (replace lines 256-271)

Current (v1.4 lines 256-271):
```javascript
const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*$/m);
if (!lvMatch) {
  violations.push({ file: relPath, reason: 'last_verified missing or malformed' });
  continue;
}
if (!rbMatch) {
  violations.push({ file: relPath, reason: 'review_by missing or malformed' });
  continue;
}
const lv = new Date(lvMatch[1]);
const rb = new Date(rbMatch[1]);
const diffDays = Math.round((rb - lv) / 86400000);
if (diffDays > 60) {
  violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>60)' });
}
```

Replace with (RESEARCH §1 Edit 5, D-24 sentinel):
```javascript
const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
if (!lvMatch) { violations.push({ file: relPath, reason: 'last_verified missing or malformed' }); continue; }
if (lvMatch[1] === '1970-01-01') continue;  // D-24 TEMPLATE-SENTINEL — skip
if (!rbMatch) { violations.push({ file: relPath, reason: 'review_by missing or malformed' }); continue; }
const lv = new Date(lvMatch[1]);
const rb = new Date(rbMatch[1]);
const diffDays = Math.round((rb - lv) / 86400000);
if (diffDays > 60) {
  violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>60)' });
}
```

Two surgical changes: (1) regex gains `\s*(#.*)?$` to tolerate trailing `# TEMPLATE-SENTINEL` comment; (2) add `if (lvMatch[1] === '1970-01-01') continue;` sentinel-skip branch.

#### Edit 5: Tag C3 with `informational: true` + append C6/C7/C9

C3 definition (v1.4 line 186-205) — add `informational: true` field:
```javascript
{
  id: 3,
  name: 'C3: AOSP stub word count within Phase 39 envelope',
  informational: true,  // D-06 extension — tag for runner detail-guard
  run() { /* existing body unchanged */ }
},
```

Then APPEND after line 281 (before closing `];` of `checks` array) the three new entries. Use RESEARCH §1 Edit 6 verbatim. Note: **ID 8 is reserved; do NOT renumber**.

```javascript
{
  id: 6,
  name: 'C6: PITFALL-7 preservation in AOSP + per-OEM docs',
  informational: true,
  // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Always PASS. Emits findings count.
  // Target regex (per Phase 42 D-22 precedent): /not supported under AOSP/i — every per-OEM "supported" assertion
  // should pair with this AOSP-baseline caveat. Scope: docs/admin-setup-android/ + per-OEM AOSP files when they land.
  run() {
    const targets = [
      'docs/admin-setup-android/06-aosp-stub.md',
      // Phase 45 will add per-OEM files here (09-aosp-realwear.md, 10-aosp-zebra.md, etc.)
    ];
    let found = 0, total = 0;
    for (const t of targets) {
      const c = readFile(t);
      if (!c) continue;
      total++;
      if (/not supported under AOSP/i.test(c)) found++;
    }
    return { pass: true, detail: '(informational — ' + found + '/' + total + ' AOSP-scoped files preserve PITFALL-7 framing)' };
  }
},
{
  id: 7,
  name: 'C7: bare-"Knox" disambiguation check',
  informational: true,
  // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Emits bare-Knox occurrences (no SKU qualifier within 50 chars).
  run() {
    const targets = androidDocPaths();
    const suffixes = /(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure)/;
    let bare = 0;
    for (const t of targets) {
      const c = readFile(t);
      if (!c) continue;
      const re = /\bKnox\b/g;
      let m;
      while ((m = re.exec(c)) !== null) {
        const window = c.slice(m.index, m.index + 50);
        if (!suffixes.test(window)) bare++;
      }
    }
    return { pass: true, detail: '(informational — ' + bare + ' bare "Knox" occurrence(s); promoted to blocking in v1.5)' };
  }
},
{
  id: 9,
  name: 'C9: COPE banned-phrase check',
  informational: true,
  // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Banned phrases source from sidecar JSON cope_banned_phrases[].
  run() {
    const bannedSource = (ALLOWLIST.cope_banned_phrases && ALLOWLIST.cope_banned_phrases.length)
      ? ALLOWLIST.cope_banned_phrases
      : [ '\\bCOPE\\b[^.]*\\bdeprecated\\b', '\\bCOPE\\b[^.]*\\bend of life\\b', '\\bCOPE\\b[^.]*\\bremoved\\b' ];
    const banned = bannedSource.map(p => new RegExp(p, 'i'));
    const targets = androidDocPaths();
    let hits = 0;
    for (const t of targets) {
      const c = readFile(t);
      if (!c) continue;
      for (const pat of banned) { if (pat.test(c)) hits++; }
    }
    return { pass: true, detail: '(informational — ' + hits + ' COPE banned-phrase occurrence(s))' };
  }
}
```

#### Edit 6: Runner detail-guard generalization (line 310)

Current v1.4 line 310:
```javascript
const showDetail = result.detail && (check.id === 3 || VERBOSE);
```

Replace with (RESEARCH §1 Edit 6 runner compatibility):
```javascript
const showDetail = result.detail && (check.informational === true || VERBOSE);
```

**Verify after all 6 edits:** `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` — expect 8 checks run; eventually 8 passed / 0 failed / 0 skipped after Plans 43-03/05/07 land.

---

### File 4: `scripts/validation/v1.4.1-audit-allowlist.json` (CREATE — net-new sidecar)

**Analog:** post-expansion `scripts/validation/v1.4-audit-allowlist.json` (from Plan 43-03) for the 23 carried pins + `cope_banned_phrases[]` as a new key for v1.4.1 C9.

**Full skeleton** (RESEARCH §3 lines 422-434):
```json
{
  "schema_version": "1.0",
  "generated": "2026-04-24T00:00:00Z",
  "phase": "43-v1-4-cleanup-audit-harness-fix",
  "safetynet_exemptions": [
    /* COPY ALL 4 ENTRIES verbatim from scripts/validation/v1.4-audit-allowlist.json */
  ],
  "supervision_exemptions": [
    /* COPY ALL 23 ENTRIES verbatim (9 carried + 14 new) from scripts/validation/v1.4-audit-allowlist.json */
  ],
  "cope_banned_phrases": [
    "\\bCOPE\\b[^.]*\\bdeprecated\\b",
    "\\bCOPE\\b[^.]*\\bend of life\\b",
    "\\bCOPE\\b[^.]*\\bremoved\\b"
  ]
}
```

The `cope_banned_phrases` key is net-new for v1.4.1 — harness C9 (Edit 5 above) reads from `ALLOWLIST.cope_banned_phrases` and falls back to hardcoded defaults if the key is absent.

**JSON-parse validation** (embedded as pre-commit hook check):
```bash
node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4.1-audit-allowlist.json', 'utf8'));
  if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) process.exit(1);
  console.log('v1.4.1 sidecar OK:', j.safetynet_exemptions.length, 'safetynet +',
    j.supervision_exemptions.length, 'supervision +', (j.cope_banned_phrases||[]).length, 'COPE phrases');"
```

---

### File 5: `scripts/validation/regenerate-supervision-pins.mjs` (CREATE — helper)

**Analogs** (this is a net-new utility composing existing primitives — role-match, not exact):
1. **Primary structural analog:** `scripts/validation/check-phase-31.mjs` lines 31-39 — `parseInventory()` graceful-degradation JSON parse (reuse this pattern for reading the sidecar).
2. **Enumeration analog:** v1.4 harness lines 75-114 — `androidDocPaths()` (reuse this predicate for scoping).
3. **File-read analog:** v1.4 harness lines 28-32 — `readFile()` with CRLF normalization (Windows compat — REQUIRED per RESEARCH §"Code Examples").
4. **Runner-loop analog:** v1.4 harness lines 285-319 (padded label + PASS/FAIL pattern).

**Header comment pattern** (follow v1.4.1 style):
```javascript
#!/usr/bin/env node
// regenerate-supervision-pins.mjs — seeded-template emitter for supervision_exemptions[] sidecar pins
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-09..D-15)
// Contract: NEVER auto-pins. Tier-1 occurrences emit JSON stubs for human reason-filling.
//           Tier-2 occurrences emit to scripts/validation/suspected-regressions.txt — require explicit human promotion.
// Modes: --report (advisory diff), --emit-stubs (JSON fragments), --self-test (dogfood Phase 43's hand-authored set)
// File reads only: all content loaded via fs.readFileSync; zero shell, zero network, zero dynamic code evaluation.

import { readFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

const argv = process.argv.slice(2);
const MODE_REPORT = argv.includes('--report');
const MODE_STUBS = argv.includes('--emit-stubs');
const MODE_SELFTEST = argv.includes('--self-test');
```

**Reused primitives (copy verbatim — DO NOT extract shared module per Phase 42 D-25):**

`readFile()` — v1.4 harness lines 28-32, verbatim:
```javascript
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');  // CRLF normalization per Phase 31 ca40eb9
}
```

`walkMd()` — v1.4 harness lines 35-52, verbatim:
```javascript
function walkMd(dir) {
  const abs = join(process.cwd(), dir);
  if (!existsSync(abs)) return [];
  const results = [];
  function walk(current) {
    let entries;
    try { entries = readdirSync(current); } catch { return; }
    for (const entry of entries) {
      const full = join(current, entry);
      let stat;
      try { stat = statSync(full); } catch { continue; }
      if (stat.isDirectory()) { walk(full); }
      else if (entry.endsWith('.md')) { results.push(full); }
    }
  }
  walk(abs);
  return results;
}
```

`androidDocPaths()` — v1.4.1 variant including the `_*`-prefix filter (v1.4.1 harness Edit 3 body). Use the v1.4.1 version so helper scope matches harness scope.

`parseAllowlist()` — `check-phase-31.mjs` lines 31-39 pattern, adapted to the target sidecar:
```javascript
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.4-audit-allowlist.json');
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try { return JSON.parse(raw); }
  catch (err) { return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] }; }
}
```

**Tier-1/Tier-2 classifier** (D-11, RESEARCH §4 — core unique logic):
```javascript
function computeHtmlCommentLines(content) {
  const lines = content.split('\n');
  const inComment = new Set();
  let openBalance = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hadOpen = /<!--/.test(line);
    const opens = (line.match(/<!--/g) || []).length;
    const closes = (line.match(/-->/g) || []).length;
    if (openBalance > 0 || hadOpen) inComment.add(i + 1);
    openBalance += opens - closes;
    if (openBalance < 0) openBalance = 0;
  }
  return inComment;
}

function classify(file, lineNum, content) {
  const lines = content.split('\n');
  const htmlCommentLines = computeHtmlCommentLines(content);
  // (1) HTML-comment membership → Tier 1.
  if (htmlCommentLines.has(lineNum)) return 'tier1-stub-eligible';
  // (2) Context window: occurrence line + 2 preceding lines.
  const windowStart = Math.max(0, lineNum - 3);
  const windowEnd = lineNum;
  const contextLines = lines.slice(windowStart, windowEnd).join('\n');
  const tier1Regex = /\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b/i;
  if (tier1Regex.test(contextLines)) return 'tier1-stub-eligible';
  return 'tier2-suspected-regression';
}
```

**Mode output shapes** (RESEARCH §4 lines 502-544):

`--report`:
```
=== supervision pin report ===
Pinned (in sidecar): 23
Un-pinned Tier-1 (stub-eligible): 0
Un-pinned Tier-2 (suspected regression): 0
Stale pins (line now has no supervision hit): 0
```

`--emit-stubs` (stdout JSON fragments):
```
{"file": "docs/some-doc.md", "line": 42, "reason": "TODO: <first 80 chars>", "tier": 1, "context": "..."}
```
Plus side-channel write to `scripts/validation/suspected-regressions.txt` (D-11 Tier 2 — never auto-pinned).

`--self-test` (D-12 dogfood — compares classifier Tier-1 set against Phase 43 hand-authored 14-new-pin set):
```
Self-test: PASS  (exit 0)
Self-test: FAIL — classifier emitted X pins not in hand-authored set, Y hand-authored pins not emitted (exit 1)
```

**CLI exit-code contract** (inherits from v1.4 harness line 319):
```javascript
process.exit(failed > 0 ? 1 : 0);
```

---

### File 6: `scripts/validation/README-supervision-pins.md` (CREATE — doc)

**Analog:** no in-repo precedent for `scripts/*/README.md`. Follow the style of `.planning/` planning artifacts (no YAML frontmatter — these are developer-facing docs, not shipped user docs).

**Minimum content outline** (D-13):
```markdown
# regenerate-supervision-pins — Usage

Helper for maintaining `scripts/validation/v1.4-audit-allowlist.json` and `v1.4.1-audit-allowlist.json` supervision_exemptions[] pins.

## Why This Helper Exists

[Summary of Phase 43 D-09..D-14 rationale. Mention D-11 two-tier discrimination. Emphasize: NEVER auto-pins.]

## Modes

### `--report` (advisory)
[Output shape + when to run]

### `--emit-stubs`
[Output shape — JSON fragments to stdout, side-channel write to suspected-regressions.txt]

### `--self-test`
[Dogfood mode — asserts reproduction of Phase 43's hand-authored Tier-1 set]

## Two-Tier Discrimination (D-11)

- **Tier 1 (stub-eligible):** iOS/Apple/ADE/macOS/MDM/cross-platform context in 2-line window OR inside `<!-- -->` block.
- **Tier 2 (suspected regression):** bare occurrences failing Tier 1. **Human must explicitly promote** — helper NEVER auto-pins.

## Why the Helper Never Auto-Pins (D-11)

[Violating this rule masks real content regressions. Worse than mild pin-drift.]

## CI Integration

See `.github/workflows/audit-harness-integrity.yml` `pin-helper-advisory` job (advisory only per D-14/D-15).
```

---

### Files 7-10: L2 runbooks 18-21 frontmatter edits (MODIFY)

**Analog:** self (identical pattern across all 4 files).

**Current frontmatter shape** (verified 2026-04-24 — file 7 lines 1-7, identical shape in files 8-10):
```yaml
---
last_verified: 2026-04-23
review_by: 2026-07-22
applies_to: all
audience: L2
platform: Android
---
```

**Required edit** (D-22 — metadata-only, NO body changes, NO re-verify ritual):
```diff
 ---
 last_verified: 2026-04-23
-review_by: 2026-07-22
+review_by: 2026-06-22
 applies_to: all
 audience: L2
 platform: Android
 ---
```

**Scope invariant** (D-22/D-23): only line 3 (`review_by:`) changes in each of the 4 files. `last_verified` stays at 2026-04-23 (factually correct authoring date — do NOT bump to 2026-04-24).

**Verification:**
```bash
for f in 18-android-log-collection 19-android-enrollment-investigation \
         20-android-app-install-investigation 21-android-compliance-investigation; do
  grep -q "review_by: 2026-06-22" "docs/l2-runbooks/$f.md" || { echo "FAIL: $f"; exit 1; }
done
node scripts/validation/v1.4.1-milestone-audit.mjs --verbose | grep -E "C5.*PASS" || exit 1
```

---

### File 11: `docs/_templates/admin-template-android.md` (MODIFY — sentinel + HTML-comment rule)

**Analog:** self. Two coupled edits:

**Edit A — frontmatter line 28** (D-24 TEMPLATE-SENTINEL):
```diff
 ---
-last_verified: YYYY-MM-DD
+last_verified: 1970-01-01 # TEMPLATE-SENTINEL
 review_by: YYYY-MM-DD
 audience: admin
 platform: Android
 ---
```

Note: `review_by` stays as `YYYY-MM-DD` placeholder (author fills in when copying template — belt-and-suspenders rule: the `_templates/` directory is already excluded by v1.4.1 harness scope-filter, so the sentinel is fallback-only).

**Edit B — HTML-comment rule block (lines 3-4)** — add sentinel semantics explanation:

Current (lines 3-5):
```
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 60 days, NOT 90)
     - Set platform to Android (this template is Android Enterprise-specific)
```

Replace with (D-24 third bullet):
```
     Rules:
     - Fill in all YYYY-MM-DD dates (review_by = last_verified + 60 days, NOT 90)
     - The `1970-01-01 # TEMPLATE-SENTINEL` value on last_verified is a harness-skip sentinel — REPLACE with actual authoring date when copying this template. The harness (v1.4.1+) treats `1970-01-01` as "template placeholder, skip freshness check." Real docs MUST have a valid authoring date (never keep the sentinel value in a shipped doc).
     - Set platform to Android (this template is Android Enterprise-specific)
```

**Why iOS/macOS templates don't change** (D-25): Phase 43 is Android-scoped; iOS/macOS sentinel adoption is v1.5 backlog. The `_*`-prefix scope-filter covers them defensively. Reference analog `docs/_templates/admin-template-ios.md` lines 18-23 to confirm the iOS/macOS frontmatter shape stays `last_verified: YYYY-MM-DD` unchanged in Phase 43.

---

### File 12: `docs/admin-setup-android/06-aosp-stub.md` (MODIFY — trim to ~700 words)

**Analog:** self — lock the H2 hierarchy while compressing H2-2 / H2-4/H3-RealWear / H2-5 callouts.

**H2 hierarchy (locked per Phase 39 D-11 — verified via grep 2026-04-24):**

| Line | Section | Status |
|------|---------|--------|
| 9 | `# AOSP Device Management Stub — Intune` | KEEP |
| 24 | `## Scope and Status` | KEEP; Candidate-1 compression on 2nd sentence |
| 30 | `## What AOSP Is` | **COMPRESS** bullets to 2-sentence prose (save ~60 words) |
| 40 | `## When to Use AOSP` | KEEP; Candidate-2 compression on closing prose |
| 49 | `## Supported OEMs` | KEEP intro + 8-OEM H3; **REMOVE** RealWear deep-content H3 paragraphs (lines 53-60 — migrate to PHASE-45-AOSP-SOURCE.md) |
| 77 | `## Enrollment Constraints` | KEEP 3-constraint body; **COMPRESS** 3 callouts 2-line → 1-line (save ~30 words) |
| 93 | `## Prerequisites and Licensing` | KEEP; Candidate-3 compression on paragraph tail |
| 100 | `## Deferred Content` | KEEP table intact; Candidate-4 strip preface sentence |
| 114 | `## See Also` | KEEP unchanged |
| 124 | `## Changelog` | APPEND Phase 43 trim row |

**Trim math** (RESEARCH §5): current 1089 words (harness formula) → target ~747 words after all 4 candidates + H2-5 intro compression. Planned savings: ~342 words.

**PITFALL-7 invariant** (D-17, RESEARCH §"Common Pitfalls" #5): `06-aosp-stub.md` MUST still contain `/not supported under AOSP/i` after trim — currently line 75 carries it. DO NOT remove that sentence. Post-trim verify: `grep -q "not supported under AOSP" docs/admin-setup-android/06-aosp-stub.md`.

**Verification command:**
```bash
node -e "const fs=require('fs');
  const c=fs.readFileSync('docs/admin-setup-android/06-aosp-stub.md','utf8').replace(/\r\n/g,'\n');
  let b=c.replace(/^---[\s\S]*?\n---\n/,'');
  b=b.replace(/^## See Also[\s\S]*$/m,'');
  b=b.replace(/^## Changelog[\s\S]*$/m,'');
  const wc=b.split(/\s+/).filter(Boolean).length;
  if (wc < 600 || wc > 900) { console.error('AOSP body '+wc+' outside envelope 600-900'); process.exit(1); }
  console.log('AOSP body '+wc+' within envelope');"
```

---

### File 13: `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` (CREATE)

**Analog:** RESEARCH §6 lines 633-663 (full template). **Content source** = lines 53-60 of current `docs/admin-setup-android/06-aosp-stub.md` (the RealWear HMT-1 / HMT-1Z1 / Navigator 500 deep paragraphs extracted verbatim).

**Directory creation** (Option A per RESEARCH §6):
```bash
mkdir -p .planning/phases/45-per-oem-aosp-expansion/
```

**File structure** (lossless-extract contract — every sentence removed from stub lands here OR has explicit consolidation note in Plan 43-07):
```markdown
# Phase 45 AOSP Per-OEM Input Artifact — RealWear Deep Content

**Source:** Extracted from `docs/admin-setup-android/06-aosp-stub.md` during Phase 43 trim (2026-04-24).
**Consumer:** Phase 45 per-OEM AOSP expansion (AEAOSPFULL-01 RealWear admin guide).
**Lifecycle:** Phase 45 DELETES this file in its final commit per Phase 43 D-20. Do NOT link to it from shipped docs.

## RealWear Hardware Scope

[Verbatim from current 06-aosp-stub.md lines 53-60. HMT-1 firmware 11.2+, HMT-1Z1 11.2+, Navigator 500 1.1+; AR/VR headsets for hands-free frontline work.]

## Enrollment Mechanics

[Wi-Fi-embedded-in-QR requirement — verbatim from current stub.]

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`

## Wi-Fi QR-Payload Embedding Walk-Through

[Placeholder — Phase 45 researcher expands. Ref: Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token > Wi-Fi.]

## PITFALL-7 Invariant (Phase 39 D-17)

Every per-OEM "supported" assertion MUST pair with the AOSP baseline caveat.

## Cross-Links for Phase 45 Author

- Stub that trimmed this content: `docs/admin-setup-android/06-aosp-stub.md`
- PITFALL-7 framing locked at: Phase 39 §CONTEXT D-17 (reference via git history if phase-39 directory is torn down)
- AOSP supported-devices source: https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices
```

**D-19 invariant:** trimmed stub does NOT forward-link to `.planning/phases/45-*/PHASE-45-AOSP-SOURCE.md`. The stub references "Phase 45 will expand per-OEM" as prose only.

---

### File 14: `.github/workflows/audit-harness-integrity.yml` (CREATE — bootstraps `.github/`)

**Analog: NONE in repo** (RESEARCH §8 — `.github/` directory does not exist; Phase 43 is the first to add CI). Use public GitHub Actions YAML conventions + RESEARCH §8 literal YAML verbatim.

**Directory bootstrap:**
```bash
mkdir -p .github/workflows
```

**Full YAML** (RESEARCH §8 lines 803-904, verbatim — D-08 three-job structure: parse / path-match / harness-run + D-15 pin-helper-advisory):

```yaml
name: Audit Harness Integrity

on:
  pull_request:
    paths:
      - 'scripts/validation/**'
      - 'docs/_glossary-android.md'
      - 'docs/reference/android-capability-matrix.md'
      - 'docs/android-lifecycle/**'
      - 'docs/admin-setup-android/**'
      - 'docs/l2-runbooks/**-android-*.md'
      - 'docs/l1-runbooks/**-android-*.md'
  schedule:
    - cron: '0 8 * * 1'   # Weekly bitrot catch: 08:00 UTC every Monday
  workflow_dispatch:

jobs:
  parse:
    name: Sidecar JSON parse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Validate v1.4 sidecar
        run: |
          node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json','utf8'));
          if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) { console.error('supervision_exemptions empty'); process.exit(1); }
          if (!Array.isArray(j.safetynet_exemptions) || j.safetynet_exemptions.length === 0) { console.error('safetynet_exemptions empty'); process.exit(1); }
          console.log('v1.4 OK: '+j.safetynet_exemptions.length+'+'+j.supervision_exemptions.length);"
      - name: Validate v1.4.1 sidecar
        run: |
          node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4.1-audit-allowlist.json','utf8'));
          if (!Array.isArray(j.supervision_exemptions)) { console.error('supervision_exemptions missing'); process.exit(1); }
          console.log('v1.4.1 OK:', j.safetynet_exemptions.length+'+'+j.supervision_exemptions.length+'+'+(j.cope_banned_phrases||[]).length);"

  path-match:
    name: Sidecar path matches harness
    runs-on: ubuntu-latest
    needs: parse
    steps:
      - uses: actions/checkout@v4
      - name: Assert v1.4 harness sidecar path
        run: |
          if ! grep -q "scripts/validation/v1.4-audit-allowlist.json" scripts/validation/v1.4-milestone-audit.mjs; then
            echo "FAIL: v1.4 harness missing sidecar reference"; exit 1
          fi
      - name: Assert v1.4.1 harness sidecar path
        run: |
          if ! grep -q "scripts/validation/v1.4.1-audit-allowlist.json" scripts/validation/v1.4.1-milestone-audit.mjs; then
            echo "FAIL: v1.4.1 harness missing sidecar reference"; exit 1
          fi

  harness-run:
    name: Harness replay
    runs-on: ubuntu-latest
    needs: [parse, path-match]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run v1.4 harness (historical replay)
        run: node scripts/validation/v1.4-milestone-audit.mjs --verbose
      - name: Run v1.4.1 harness
        run: node scripts/validation/v1.4.1-milestone-audit.mjs --verbose

  pin-helper-advisory:
    name: Supervision pin helper (advisory)
    runs-on: ubuntu-latest
    needs: harness-run
    continue-on-error: true   # D-14 / D-15: advisory only; never fails build
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - name: Run regenerate-supervision-pins.mjs --report
        run: |
          node scripts/validation/regenerate-supervision-pins.mjs --report > pin-report.txt
          cat pin-report.txt
      - name: Post report as PR comment
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('pin-report.txt', 'utf8');
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '## Supervision Pin Helper (Advisory)\n\n```\n' + report + '\n```\n\n*Advisory only — D-14.*'
            });
```

**Third-party actions pinned by major version** (RESEARCH §"Security Domain" — accept major-version pin for Phase 43; SHA-pin is v1.5 hardening).

---

### File 15: `scripts/hooks/pre-commit.sh` (CREATE — bootstraps `scripts/hooks/`)

**Analog: NONE in repo** (RESEARCH §8 — no `.husky/`, no `lefthook.yml`, no `.pre-commit-config.yaml`, no active `.git/hooks/*` non-sample files). Phase 43 introduces the first hook. Use RESEARCH §8 shell verbatim.

**Directory bootstrap:**
```bash
mkdir -p scripts/hooks
```

**Full shell** (RESEARCH §8 lines 768-792, verbatim — uses `node` instead of `jq` for cross-platform portability):

```bash
#!/usr/bin/env bash
# Pre-commit hook: fast JSON-parse check on audit allow-list sidecars.
# Install (manual, per-developer): cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# Rationale: catches typos in sidecar JSON before push (Phase 43 D-08 pre-commit tier).

set -e

SIDECARS=(
  "scripts/validation/v1.4-audit-allowlist.json"
  "scripts/validation/v1.4.1-audit-allowlist.json"
)

for sidecar in "${SIDECARS[@]}"; do
  if [ -f "$sidecar" ]; then
    # Use node (portable across Windows Git Bash + macOS + Linux) instead of jq (not universally installed).
    if ! node -e "JSON.parse(require('fs').readFileSync('$sidecar', 'utf8'))" 2>/dev/null; then
      echo "FAIL: $sidecar is not valid JSON" >&2
      exit 1
    fi
  fi
done

echo "pre-commit: audit allow-list JSON parse OK"
exit 0
```

**Install instructions** (documented in File 16 or inline in `scripts/hooks/README.md`):
```bash
cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

**Key portability decisions** (from RESEARCH §8):
- `node` over `jq` — Windows Git Bash compat.
- `set -e` — fail-fast on first bad sidecar.
- No `npx`, no network — pre-commit stays <1 second.

---

### File 16: `scripts/hooks/README.md` (CREATE — OPTIONAL)

**Analog:** File 6 style (`README-supervision-pins.md`). Short install+rationale note; no frontmatter (developer-facing).

Content outline:
```markdown
# Git Hooks — Audit Harness Integrity

## pre-commit.sh

Fast JSON-parse check on `scripts/validation/v1.4-audit-allowlist.json` and `scripts/validation/v1.4.1-audit-allowlist.json` before each commit.

## Install (one-time per clone)

```bash
cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit  # Git Bash on Windows honors this
```

## Rationale

Phase 43 D-08: pre-commit tier catches typos locally; the GitHub Action `audit-harness-integrity.yml` is the CI tier. Both run the same parse check.

## Why Not Husky / lefthook?

[RESEARCH §8 recommendation — minimum-surface principle. Native shell + node-builtin is zero new deps.]
```

---

### File 17: Phase 39 artifact restore (READ-ONLY RESTORE, Plan 43-09)

**Analog:** git-history state at commit `ef7717b`. These are historical records being rehydrated on disk so `/gsd-validate-phase 39` workflow can find them (it detects "State A: existing VALIDATION.md" vs "State C: phase not executed"). Phase 43 doesn't author new content in these files — it restores them.

**Restore block** (RESEARCH §7 Option A + Open Question 2 full-directory mitigation):
```bash
mkdir -p .planning/phases/39-zero-touch-enrollment-aosp-stub/

# Step 1: enumerate git-tracked files in the phase-39 directory at commit ef7717b
git ls-tree -r --name-only ef7717b .planning/phases/39-zero-touch-enrollment-aosp-stub/ > /tmp/phase39-files.txt

# Step 2: restore each file verbatim
while IFS= read -r path; do
  mkdir -p "$(dirname "$path")"
  git show "ef7717b:$path" > "$path"
done < /tmp/phase39-files.txt
```

Expected restored files (minimum per RESEARCH §7 verified tree):
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md`
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VERIFICATION.md`
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-01-SUMMARY.md`
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-02-SUMMARY.md`
- Additional PLAN/CONTEXT/etc. if present in tree

**Workflow invocation:**
```
/gsd-validate-phase 39
```

**Expected VALIDATION.md trailer append** (RESEARCH §7 lines 725-739):
```markdown
## Validation Audit 2026-04-24

| Metric | Count |
|--------|-------|
| Gaps found | 0 |
| Resolved | 0 |
| Escalated | 0 |

### DEFER-04 closure

AOSP stub body word count (harness formula): {final-trimmed-count} words.
Phase 39 envelope: 600-900 words. Status: PASS.
Trim committed in Phase 43 (commit-7 of 10-commit plan).
```

---

## Shared Patterns

### Pattern A: File-reads-only / no-shell-out contract (Phase 42 D-25)

**Source:** `scripts/validation/v1.4-milestone-audit.mjs` line 5 header comment; implemented via `readFile()` (lines 28-32) and zero `child_process` imports.

**Apply to:** Files 3 (v1.4.1 harness), 5 (regenerate-supervision-pins). Every new Phase 43 script MUST:
1. Import only from `'node:fs'`, `'node:path'`, `'node:process'`, (optional) `'node:url'`.
2. Use `readFileSync` with CRLF normalization `readFileSync(abs, 'utf8').replace(/\r\n/g, '\n')`.
3. Zero child-process spawning (no `child_process` imports), zero `eval`, zero dynamic `Function()`, zero dynamic `require()`.
4. Zero network I/O.
5. Paths constructed via `join(process.cwd(), relPath)` — no user-input path flow (Security V5 input validation — RESEARCH §"Security Domain").

**Exception:** The pre-commit shell script (File 15) is shell, not Node — but it still avoids `jq` and uses `node -e` for JSON parse.

---

### Pattern B: Graceful-degradation JSON parse

**Source:** `scripts/validation/check-phase-31.mjs` lines 31-39 `parseInventory()` + v1.4 harness lines 56-63 `parseAllowlist()`.

**Apply to:** Files 3 (v1.4.1 harness sidecar load), 5 (helper sidecar load).

**Canonical shape:**
```javascript
function parseAllowlist() {
  const raw = readFile('<path-to-sidecar>');
  if (!raw) return { /* all expected keys default to empty arrays */ };
  try { return JSON.parse(raw); }
  catch (err) { return { _parseError: err.message, /* empty defaults */ }; }
}
```

**Why:** Harness/helper must not crash on missing or malformed sidecar — graceful degradation with `_parseError` trail. Phase 42 D-25 locks this contract.

---

### Pattern C: CRLF normalization (Windows + git-on-Windows compat)

**Source:** v1.4 harness lines 28-32; `check-phase-31.mjs` line 18.

**Apply to:** Every new script that calls `readFileSync` (Files 3, 5).

**Pattern:**
```javascript
return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
```

**Why:** Windows checkout + `core.autocrlf=true` produces mixed `\r\n` endings; regex patterns anchored with `^...$` in multiline mode drift unless normalized.

---

### Pattern D: YAML frontmatter extraction + multiline-anchored regex

**Source:** v1.4 harness lines 250-256.

**Apply to:** Files 3 (v1.4.1 C5 parse), 5 (helper scope filter if it reads frontmatter).

**Canonical shape:**
```javascript
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
if (!fmMatch) { /* handle no-frontmatter */ }
const fm = fmMatch[1];
const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);  // D-24 trailing-comment tolerance
```

**Critical invariant** (Pitfall 6 in RESEARCH):
- `^last_verified:...$` with `/m` flag scoped to frontmatter substring.
- Never run the regex against full body — would false-positive on body prose containing `last_verified:` example text.

---

### Pattern E: Runner loop with label-padding + exit-code 0/1

**Source:** v1.4 harness lines 285-319.

**Apply to:** Files 3 (v1.4.1 harness runner), 5 (helper runner for all 3 modes).

**Canonical shape:**
```javascript
const LABEL_WIDTH = 56;
function padLabel(s) {
  if (s.length >= LABEL_WIDTH) return s + ' ';
  return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' ';
}
let passed = 0, failed = 0, skipped = 0;
for (const check of checks) {
  let result;
  try { result = check.run(); }
  catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  // ... PASS/FAIL/SKIP bookkeeping ...
}
process.stdout.write('\nSummary: ' + passed + ' passed, ' + failed + ' failed, ' + skipped + ' skipped\n');
process.exit(failed > 0 ? 1 : 0);
```

**Runner detail-guard generalization (v1.4.1 Edit 6):** `check.informational === true || VERBOSE` replaces the v1.4 `check.id === 3` literal.

---

### Pattern F: YAML frontmatter for shipped docs (L2 runbook shape)

**Source:** `docs/l2-runbooks/18-android-log-collection.md` lines 1-7 (verbatim shape shared across files 8-10).

**Apply to:** Files 7, 8, 9, 10 (all 4 L2 runbooks).

**Canonical shape:**
```yaml
---
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
applies_to: all
audience: L2
platform: Android
---
```

**D-22 scope rule:** Phase 43 touches `review_by` only. `last_verified` stays at 2026-04-23 (metadata-only shift, no re-verify ritual).

---

### Pattern G: Template frontmatter sentinel

**Source:** New pattern (Phase 43 introduces it) — cross-reference `docs/_templates/admin-template-ios.md` lines 18-23 to confirm iOS/macOS templates remain UNCHANGED in this phase (D-25 Android-scope lock).

**Apply to:** File 11 ONLY (`admin-template-android.md`).

**Pattern:**
```yaml
---
last_verified: 1970-01-01 # TEMPLATE-SENTINEL
review_by: YYYY-MM-DD
audience: admin
platform: Android
---
```

**Harness pair** (Pattern D + D-24 sentinel-aware branch):
1. Scope-filter (v1.4.1 `androidDocPaths()` filter) → primary defense (excludes `_templates/` dir).
2. Sentinel-skip (v1.4.1 C5 `if (lvMatch[1] === '1970-01-01') continue;`) → fallback defense.

---

### Pattern H: Atomicity-same-commit contract (Phase 42 D-20/D-22)

**Source:** Phase 42 D-20 + D-22 precedent (shared-file retrofits land in same commit as consumer updates).

**Apply to:** Phase 43 D-07 three-commit atomicity:

| Commit | Payload | Files |
|--------|---------|-------|
| 1 (Rescue) | sidecar JSON restore + v1.4 harness line 57 + line 1 freeze-marker | Files 1, 2 |
| 2 (Scaffold) | v1.4.1 harness + v1.4.1 sidecar skeleton (Plans 43-02..43-07 content lands across multiple follow-up commits per plan-level discretion) | Files 3, 4 (skeleton) + 5, 6, 7-10, 11, 12, 13 (follow-up) |
| 3 (CI) | GitHub Action + pre-commit hook | Files 14, 15, 16 |

**Never split:** line 57 sidecar-path update MUST land in the SAME commit as the JSON restore (otherwise the harness is broken between commits).

---

### Pattern I: Informational-first check contract (Phase 42 D-29)

**Source:** v1.4 harness C3 (lines 186-205) — always returns `{ pass: true, detail: '(informational — ...)' }`.

**Apply to:** File 3 C3/C6/C7/C9 in v1.4.1 harness. Every new check in Phase 43 MUST:
1. Set `informational: true` field on the check object.
2. Always return `pass: true` in `run()` — never conditional.
3. Emit `detail` string with count(s) inside parentheses.

**Pitfall 3 guard** (RESEARCH §"Common Pitfalls"): ANY future PR that changes `pass: true` → `pass: <conditional>` on C3/C6/C7/C9 MUST be rejected at plan review. Phase 42 D-29 promotion to blocking is a v1.5 concern.

---

### Pattern J: Planning-space input-artifact lifecycle

**Source:** Phase 43 D-20 codifies general pattern established by earlier `.planning/` artifacts.

**Apply to:** File 13 (`PHASE-45-AOSP-SOURCE.md`) — Phase 45 DELETES in its final commit. Not archived. Not linked from shipped docs.

**Invariant:** Shipped docs (anything under `docs/`) MUST NOT contain links to `.planning/` artifacts (D-19).

---

### Pattern K: Git-history restore via `git show`

**Source:** RESEARCH §2 (sidecar restore) + §7 (Phase 39 restore) + Open Question 2 (full-directory restore).

**Apply to:** Files 1, 17.

**Single-file pattern:**
```bash
git show <commit-sha>:<path-in-repo> > <destination-path>
```

**Multi-file / directory pattern:**
```bash
git ls-tree -r --name-only <commit-sha> <path-prefix>/ | while IFS= read -r path; do
  mkdir -p "$(dirname "$path")"
  git show "<commit-sha>:$path" > "$path"
done
```

**Post-restore validation:** `node -e "JSON.parse(...)"` for JSON; `head -n 7` for markdown frontmatter inspection.

---

## No Analog Found

Files whose patterns are **net-new in this repo** (planner should source patterns from RESEARCH.md §8 directly, NOT from existing code):

| File | Role | Data Flow | Reason | Planner Source |
|------|------|-----------|--------|----------------|
| `.github/workflows/audit-harness-integrity.yml` | config / CI | event-driven | `.github/` directory does not exist; first CI workflow in repo | RESEARCH §8 YAML verbatim (lines 803-904) |
| `scripts/hooks/pre-commit.sh` | config / git hook | event-driven | No Husky/lefthook/pre-commit-config; `.git/hooks/` has only `.sample` files | RESEARCH §8 shell verbatim (lines 768-792) |

Both files use public-convention patterns (GitHub Actions + Bash + `node -e`) — neither introduces a new third-party dev dependency.

---

## Metadata

**Analog search scope:**
- `scripts/validation/*.mjs` (3 files: v1.4 harness, check-phase-30, check-phase-31)
- `docs/_templates/admin-template-*.md` (4 files)
- `docs/l2-runbooks/*-android-*.md` (4 files)
- `docs/admin-setup-android/06-aosp-stub.md` (1 file — self-analog for trim)
- `docs/_glossary-android.md` (line 15 pin census verification)
- `docs/reference/android-capability-matrix.md` (lines 74/76/77/79/83/84 pin census verification)
- `.planning/phases/43-*/` (CONTEXT + RESEARCH)
- `.github/`, `.husky/`, `.githooks/`, `.git/hooks/`, `package.json` root (RESEARCH §8 repo tooling audit)

**Files scanned:** ~20 files read; ~8 unique pattern-source analogs selected.

**Pattern extraction date:** 2026-04-24.

**Pattern-map scope lock:** Phase 43 is pure tooling + metadata + content-migration prep. NO Android content authoring (content authoring is Phases 44-46 scope). Every pattern in this map is either (a) copy-from-existing, (b) mechanical YAML edit, or (c) new utility composing existing primitives. No patterns in this map introduce a new third-party dependency.
