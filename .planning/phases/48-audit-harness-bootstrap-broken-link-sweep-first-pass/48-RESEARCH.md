# Phase 48: Audit Harness Bootstrap + Broken-Link Sweep First Pass — Research

**Researched:** 2026-04-26
**Domain:** Docs-engineering tooling — audit harness Path A copy, sidecar/pin refresh, broken-link sweep
**Confidence:** HIGH (all claims verified from codebase inspection and live tool runs)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Single Phase 48 with internal Wave-1 (tooling) → Wave-2 (sweep). No split.
- **D-02:** Wave-1 plans: harness Path A copy, allowlist skeleton, BASELINE_9 refresh, C10 blocking, C6/C7/C9 disposition, C11/C12/C13 informational scaffolds, `check-phase-48.mjs` validator, new CI workflow yml, pre-commit advisory hook. Wave-2 plans: `.mlc-config.json` + GFM `#[A-Z]` precheck + 179-file sweep + categorize A/B/C + write `48-VERIFICATION-broken-links.md`.
- **D-03:** Phase 43 D-27 ordered-plan-step precedent applies. Atomicity-contract commits per Phase 43 D-07.
- **D-04:** Graduate C6 (PITFALL-7 AOSP preservation) to BLOCKING in v1.5.
- **D-05:** Graduate C7 (bare-Knox disambiguation) to BLOCKING in v1.5.
- **D-06:** Keep C9 (cope_banned_phrases) INFORMATIONAL through Phase 60.
- **D-07:** C6/C9 disposition is a referee inversion of original Option C. C6 targets frozen; C9 ops-domain false-positive risk.
- **D-08:** C10–C13 detail-string emit format = COMPACT — `(informational)` only; no hardcoded "Phase 60" text.
- **D-09:** SC#1 contradiction (says C1–C9 blocking PASS, but C10 ships blocking per AUDIT-02) — AUDIT-02 is authoritative. Plan must surface and propose fix.
- **D-10:** Broken-link inventory at `.planning/phases/48-*/48-VERIFICATION-broken-links.md`. Markdown only. Tables: Category A / B / C.
- **D-11:** VERIFICATION artifacts persist. D-20 prep-shell-deletion concerns only INPUT artifacts.
- **D-12:** Inventory schema: header (phase, date, tool versions, findings count), Category A (broken anchors), Category B (broken file paths), Category C (deferred stubs / intentional), Summary (count × pre-existing-vs-new).
- **D-13:** Allowlist seeding = inherit v1.4.1 verbatim. Update phase/generated. Clear stale provenance comments to "v1.5 inherit baseline 2026-04-26".
- **D-14:** Run `regenerate-supervision-pins.mjs --report` BEFORE inheritance commit. Refresh shifted coordinates in same atomic commit.
- **D-15:** Reject empty-allowlist (3B1) and inherit+scaffold-empty-arrays (3B3). YAGNI per Phase 43 D-05. Linux/ops-domain arrays added lazily.
- **D-16:** CI workflow = NEW FILE `.github/workflows/audit-harness-v1.5-integrity.yml`. Existing yml frozen.
- **D-17:** New v1.5 yml structurally clones v1.4.1 yml (parse → path-match → harness-run → pin-helper-advisory). Path glob: `'scripts/validation/v1.5-*'` + Linux/ops-depth doc globs.
- **D-18:** New yml registers `check-phase-48.mjs` immediately. Reserves placeholder steps for `check-phase-49..60.mjs` (lazy-skip if absent).
- **D-19:** Workflow has explicit comment header citing "v1.4 + v1.4.1 in audit-harness-integrity.yml".
- **D-20:** Pin-drift enforcement = pre-commit ADVISORY hook + CI advisory. Not pre-commit hard-block.
- **D-21:** Pre-commit hook = advisory only, exits 0 always. Runs `regenerate-supervision-pins.mjs --report` on staged files matching pinned-file glob.
- **D-22:** Advances Phase 43 D-15 promotion ladder (CI advisory → pre-commit advisory + CI advisory).
- **D-23:** Phase 48 plan order: (1) rescue-style atomic commit, (2) C10 commit, (3) C11/C12/C13 scaffolds, (4) C6+C7 graduation, (5) `check-phase-48.mjs`, (6) CI commit, (7) `.mlc-config.json`, (8) `#[A-Z]` precheck, (9) 179-file sweep, (10) VERIFICATION artifact, (11) terminal sanity.

### Claude's Discretion

- Pre-commit hook tooling (Husky vs native vs lefthook) — check repo tooling at plan time.
- Exact text of `audit-harness-v1.5-integrity.yml` comment header.
- Internal structure of `48-VERIFICATION-broken-links.md` triage table column order.
- Exact `.mlc-config.json` flag set.
- Phase numbering treatment for ROADMAP.md SC#1 contradiction.

### Deferred Ideas (OUT OF SCOPE)

- CI advisory → blocking promotion ladder for pin drift (v1.6+)
- Plugin-architecture harness refactor (v1.6+)
- C7 sidecar allowlist mechanism (earn if Phase 49+ false positives occur)
- `broken_link_external_allowlist` array
- iOS/macOS/Windows admin template `last_verified` normalization
- Pre-commit hook tooling standardization in PROJECT.md
- Hard-CI blocking on pin drift
- C12 promotion-condition split into C12a/C12b
- `audit-harness-v1.5-integrity.yml` archive lifecycle

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AUDIT-01 | `v1.5-milestone-audit.mjs` ships as Path A copy of v1.4.1; FROZEN markers updated; sidecar renamed `v1.5-audit-allowlist.json`; exits 0 at terminal re-audit | Lines 1–6 of `v1.4.1-milestone-audit.mjs` contain the exact header to update; `parseAllowlist()` at line 57–65 hardcodes sidecar path to update |
| AUDIT-02 | C10 — Linux frontmatter check (`platform: Linux`, `last_verified` 60d cycle) — blocking from Phase 48 | C5 (Android frontmatter) at lines 246–283 is the direct pattern analog; adapt `androidDocPaths()` → `linuxDocPaths()` |
| AUDIT-03 | C11 — ops-domain anti-pattern regex — informational-first; promotes to blocking Phase 60 | C9 is the template: sidecar-driven banned-phrase list with informational flag |
| AUDIT-04 | C12 — 4-platform comparison structural validation — informational-first; promotes to blocking when file exists | Scaffold as a file-existence guard + link-not-copy cell check; `pass: true, detail: '(informational)'` when file absent |
| AUDIT-05 | C13 — broken-link automation via `markdown-link-check` — informational-first Phase 48 | `markdown-link-check` v3.14.2 available (`npm view` confirmed); `.mlc-config.json` config documented below |
| AUDIT-06 | `check-phase-48.mjs` validator + CI registration | check-phase-30/31 are the pattern; assertions: file existence + JSON parse + self-test exit code + VERIFICATION artifact |
| AUDIT-07 | BASELINE_9 refresh + `--self-test` exits 0 | `--self-test` currently FAILS with 13 stale pins; exact refresh values documented in §BASELINE_9 section below |
| AUDIT-08 | First-pass broken-link sweep inventory — Category A/B/C, pre-existing vs new | markdown-link-check v3.14.2 confirmed; `grep -rn "#[A-Z]" docs/` precheck for Category A |
| CLEAN-06 | Anchor sweep across all `docs/**/*.md` | Phase 48 wave-2 uses `grep -rn "#[A-Z]"` precheck + markdown-link-check with GFM-aware config |
| CLEAN-07 | Relative-path inter-doc link sweep | Same wave-2 markdown-link-check run; internal vs external output separated by config |

</phase_requirements>

---

## Summary

Phase 48 is a pure tooling/docs-engineering phase — no content authored, no PowerShell/Python/React code modified. It has two internal waves: Wave-1 (harness bootstrap) produces the live v1.5 audit harness, refreshed sidecar/pins, CI infrastructure, and pre-commit advisory hook; Wave-2 (broken-link sweep) runs markdown-link-check against the 179-file baseline and produces a categorized inventory.

The harness work is fully characterized. The source file (`v1.4.1-milestone-audit.mjs`, 391 lines) has been read and analyzed. The BASELINE_9 failure mode is concretely diagnosed via live `--self-test` and `--report` runs: 13 stale pins in the sidecar, all corresponding to line-coordinate drift from Phase 44–46 additions. The exact current-line values for all drifted pins are known. The sidecar must be updated with 13 new line coordinates before BASELINE_9 is also updated in `regenerate-supervision-pins.mjs`.

The broken-link tooling is confirmed: `markdown-link-check` v3.14.2 is available on npm (`npm view` ran successfully, version confirmed). The tool's config format is documented; the planner can specify exact flags. Node v22.20.0 is available locally. No husky or lefthook exists in the repo; the pre-commit advisory hook should be contributed as a native `.git/hooks/pre-commit` script (only `.sample` files present in `.git/hooks/`).

**Primary recommendation:** Follow D-23 plan order exactly. The BASELINE_9 refresh + sidecar inheritance + `--self-test` pass constitute the single most load-bearing commit in the phase. Do not attempt the Wave-2 sweep until Wave-1 is committed and the harness exits 0.

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Audit harness (v1.5-milestone-audit.mjs) | Scripts/Validation | — | Single-file, file-reads-only contract (Phase 42 D-25); no web/API involvement |
| Sidecar JSON (v1.5-audit-allowlist.json) | Scripts/Validation | — | Co-located with harness per Path A versioning pattern |
| BASELINE_9 refresh | Scripts/Validation | — | In `regenerate-supervision-pins.mjs` line 390; same file owns the self-test |
| Broken-link sweep | Scripts/Validation (config) + docs/ (scan target) | — | Tool config lives at repo root or scripts/validation/; scan target is docs/** |
| CI workflow | .github/workflows/ | — | New file parallel to frozen v1.4.1 yml |
| Pre-commit hook | .git/hooks/ | — | Native hook (no Husky/lefthook in repo) |
| VERIFICATION artifact | .planning/phases/48-*/ | — | VERIFICATION artifacts persist per D-11 |

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| markdown-link-check | 3.14.2 | Anchor + relative-path broken-link detection | Node ESM compatible; integrates with .mjs harness; chosen in SUMMARY.md research; confirmed on npm registry [VERIFIED: npm view] |
| Node.js | 22.20.0 (local) | Harness runtime | Already required by all existing .mjs validators |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `grep` | OS-provided | GFM capital-anchor precheck (`grep -rn "#[A-Z]" docs/`) | Wave-2 pre-sweep only; PITFALL-15 mitigation |

**Installation (markdown-link-check):**
```bash
npm install --save-dev markdown-link-check
# or run inline via npx:
npx markdown-link-check --config .mlc-config.json <file>
```

**Version verification:** `npm view markdown-link-check version` returns `3.14.2` [VERIFIED: live npm view run 2026-04-26].

---

## Architecture Patterns

### Harness Path A Copy Pattern

The v1.5 harness is a verbatim copy of `v1.4.1-milestone-audit.mjs` with additive changes only. The v1.4.1 file is 391 lines. Key structural regions:

```
Lines 1-6    Header comment (frozen-predecessor anchor + sidecar filename + check inventory)
Lines 18-23  Imports + argv/VERBOSE flag
Lines 29-33  readFile() helper
Lines 36-53  walkMd() helper
Lines 57-65  parseAllowlist() — hardcodes sidecar path at line 58
Lines 70-72  relNormalize() helper
Lines 76-122 androidDocPaths() — enumeration function Phase 48 uses as pattern for linuxDocPaths()
Lines 128-353 Check definitions (C1, C2, C3, C4, C5, C6, C7, C9)
Lines 357-391 Runner loop (padLabel, pass/fail/skipped counting, process.exit)
```

**Path A changes for v1.5:**
1. Header comment lines 1–6: update "v1.4.1" → "v1.5"; update sidecar filename; update frozen-predecessor comment text
2. Line 58: `v1.4.1-audit-allowlist.json` → `v1.5-audit-allowlist.json`
3. Add `linuxDocPaths()` function after `androidDocPaths()` (same structural pattern)
4. Add C10, C11, C12, C13 check objects to the `checks` array
5. Remove `informational: true` from C6 and C7 (graduating to blocking per D-04/D-05)
6. Keep `informational: true` on C9 (per D-06)
7. Update `checks.length` in runner prefix from 8 to 13 (once all checks added)

### Exact Header Comment Changes

**v1.4.1 lines 1–6 (current):**
```javascript
// v1.4.1 Milestone Audit Harness (copy of v1.4 + C6/C7/C9 informational-first per Phase 42 D-29 + _*-prefix scope-filter + TEMPLATE-SENTINEL parse)
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-01..D-08, D-24, D-26)
// Sidecar allow-list: scripts/validation/v1.4.1-audit-allowlist.json  (Knox / per-OEM AOSP / COPE exemptions)
// Frozen-predecessor reproducibility anchor: v1.4-milestone-audit.mjs pinned at commit 3c3a140
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
```

**v1.5 replacement lines 1–8 (write these):**
```javascript
// v1.5 Milestone Audit Harness (Path A copy of v1.4.1 + C10 blocking + C11/C12/C13 informational-first + C6/C7 promoted to blocking)
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md (D-01..D-23)
// Sidecar allow-list: scripts/validation/v1.5-audit-allowlist.json  (inherited v1.4.1 schema + Linux/ops-domain arrays added lazily)
// Frozen-predecessor reproducibility anchor: v1.4.1-milestone-audit.mjs pinned at Phase 47 close
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
//
// C6 (PITFALL-7) + C7 (bare-Knox): PROMOTED to blocking per Phase 48 D-04/D-05.
// C9 (cope_banned_phrases): INFORMATIONAL through Phase 60 per Phase 48 D-06 (ops-domain false-positive risk).
// C10 (Linux frontmatter): BLOCKING from Phase 48 — new Linux docs must have platform: Linux + 60d last_verified.
// C11 (ops-domain anti-patterns): INFORMATIONAL-FIRST per AUDIT-03; promotes to blocking Phase 60.
// C12 (4-platform comparison structure): INFORMATIONAL-FIRST per AUDIT-04; promotes to blocking once file exists (Phase 58+).
// C13 (broken-link automation): INFORMATIONAL-FIRST per AUDIT-05; promotes to blocking after Phase 60 second-pass triage.
```

### linuxDocPaths() Function — Exact Analog of androidDocPaths()

Add immediately after `androidDocPaths()` (after line 122), before the `// Checks` comment:

```javascript
// linuxDocPaths: enumerate the C10 scope — Linux docs requiring platform: Linux + 60d last_verified.
// Returns a de-duplicated, sorted array of relative paths that exist on disk.
// Starts empty — grows lazily as Phase 49+ adds Linux files.
function linuxDocPaths() {
  const paths = new Set();

  // Root singletons
  for (const p of [
    'docs/_glossary-linux.md',
    'docs/_templates/admin-template-linux.md',
    'docs/reference/linux-capability-matrix.md',
    'docs/decision-trees/09-linux-triage.md'
  ]) {
    if (existsSync(join(process.cwd(), p))) paths.add(p);
  }

  // Directory walks
  for (const d of ['docs/linux-lifecycle', 'docs/admin-setup-linux']) {
    for (const abs of walkMd(d)) {
      paths.add(relNormalize(abs));
    }
  }

  // L1 runbooks 30-33 linux-*
  for (const abs of walkMd('docs/l1-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(3[0-3])-linux-/.test(rel)) paths.add(rel);
  }

  // L2 runbooks 24-25 linux-*
  for (const abs of walkMd('docs/l2-runbooks')) {
    const rel = relNormalize(abs);
    if (/\/(2[4-5])-linux-/.test(rel)) paths.add(rel);
  }

  // D-24 scope-filter: exclude any DIRECTORY segment starting with "_"
  function hasUnderscoreDirSegment(relPath) {
    const segments = relPath.split('/');
    return segments.slice(0, -1).some(seg => /^_/.test(seg));
  }
  return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
}
```

### C10 Check — Linux Frontmatter (Blocking)

Modeled on C5 (Android frontmatter, lines 246–283). Key difference: C10 is BLOCKING from day one (no `informational: true`); also validates `platform: Linux` field; 60-day cycle is same as Android.

```javascript
{
  id: 10,
  name: 'C10: Linux frontmatter (platform: Linux + 60d last_verified)',
  // AUDIT-02: BLOCKING from Phase 48. Scope = linuxDocPaths().
  // Validates: platform: Linux present; last_verified ISO date present (not TEMPLATE-SENTINEL);
  // review_by present; review_by - last_verified <= 60 days (Phase 34 D-14 cadence for Linux too).
  run() {
    const violations = [];
    for (const relPath of linuxDocPaths()) {
      const content = readFile(relPath);
      if (!content) { violations.push({ file: relPath, reason: 'unreadable' }); continue; }
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
      if (!fmMatch) { violations.push({ file: relPath, reason: 'no frontmatter' }); continue; }
      const fm = fmMatch[1];
      // Platform check
      if (!/^platform:\s*Linux\s*$/m.test(fm)) {
        violations.push({ file: relPath, reason: 'platform: Linux missing' }); continue;
      }
      const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
      const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
      if (!lvMatch) { violations.push({ file: relPath, reason: 'last_verified missing or malformed' }); continue; }
      if (lvMatch[1] === '1970-01-01') continue;  // TEMPLATE-SENTINEL — skip
      if (!rbMatch) { violations.push({ file: relPath, reason: 'review_by missing or malformed' }); continue; }
      const lv = new Date(lvMatch[1]);
      const rb = new Date(rbMatch[1]);
      const diffDays = Math.round((rb - lv) / 86400000);
      if (diffDays > 60) {
        violations.push({ file: relPath, reason: 'review_by-last_verified=' + diffDays + 'd (>60)' });
      }
    }
    if (violations.length === 0) return { pass: true };
    return {
      pass: false,
      detail: violations.length + ' Linux frontmatter violation(s): '
            + violations.slice(0, 3).map(v => v.file + ' (' + v.reason + ')').join('; ')
    };
  }
},
```

**Pass condition on empty linuxDocPaths():** When no Linux docs exist yet (Phase 48 baseline), `linuxDocPaths()` returns `[]`, the loop does not execute, `violations` is empty, and C10 returns `{ pass: true }`. Blocking check with no scope = trivially PASS — correct behavior for a forward-gating check.

### C11 Check — Ops-Domain Anti-Pattern Regex (Informational-First)

Modeled on C9 pattern (sidecar-driven banned-phrase list). Key differences: different phrase patterns targeting SCCM/ConfigMgr disambiguation + WUfB naming + SafetyNet cross-domain detection; ships informational.

```javascript
{
  id: 11,
  name: 'C11: Ops-domain anti-pattern regex',
  informational: true,
  // AUDIT-03: INFORMATIONAL-FIRST. Promotes to blocking at Phase 60.
  // Patterns sourced from sidecar JSON c11_ops_patterns[] array (lazy-loaded; hardcoded fallback).
  run() {
    const patternSource = (ALLOWLIST.c11_ops_patterns && ALLOWLIST.c11_ops_patterns.length)
      ? ALLOWLIST.c11_ops_patterns
      : [
          '\\bSystem Center\\b',           // SCCM/ConfigMgr disambiguation
          '\\bSCCM\\b[^.]*\\bIntune\\b',   // SCCM co-mentioned with Intune without disambiguation
          '\\bAutopatch rings\\b',          // WUfB-vs-Autopatch ring-naming
          '\\bSafetyNet\\b[^.]*\\bcompliance\\b' // SafetyNet cross-domain detection
        ];
    const patterns = patternSource.map(p => new RegExp(p, 'i'));
    // Scope: all docs/**/*.md (ops-depth is cross-platform)
    const targets = [];
    for (const abs of walkMd('docs')) { targets.push(relNormalize(abs)); }
    let hits = 0;
    for (const t of targets) {
      const c = readFile(t);
      if (!c) continue;
      for (const pat of patterns) { if (pat.test(c)) hits++; }
    }
    return { pass: true, detail: '(informational)' };
  }
},
```

**Note on detail string:** D-08 mandates COMPACT format — `(informational)` only, not findings count in detail string. Findings count goes to `--verbose` output if desired. Promotion schedule is documented in harness header comment, not detail string.

### C12 Check — 4-Platform Comparison Structural Validation (Informational-First)

```javascript
{
  id: 12,
  name: 'C12: 4-platform comparison structural validation',
  informational: true,
  // AUDIT-04: INFORMATIONAL-FIRST. File-existence pre-gate. Promotes to blocking once
  // docs/reference/4-platform-capability-comparison.md exists (Phase 58+).
  // Link-not-copy: every non-empty data cell must contain a markdown hyperlink.
  run() {
    const targetFile = 'docs/reference/4-platform-capability-comparison.md';
    const content = readFile(targetFile);
    if (!content) {
      // File doesn't exist yet (Phase 48–57) — informational PASS (pre-gate)
      return { pass: true, detail: '(informational)' };
    }
    // File exists (Phase 58+) — validate structure:
    // 1. Contains all 5 platform columns: Windows, macOS, iOS, Android, Linux
    // 2. Every non-empty table cell (not header, not "—" or "N/A") contains at least one hyperlink
    const platforms = ['Windows', 'macOS', 'iOS', 'Android', 'Linux'];
    const missingPlatforms = platforms.filter(p => !content.includes(p));
    if (missingPlatforms.length > 0) {
      return { pass: false, detail: 'Missing platform columns: ' + missingPlatforms.join(', ') };
    }
    // Link-not-copy check: table rows with non-empty cells must contain [text](link)
    // (heuristic — planner can refine regex at implementation time)
    const tableLines = content.split('\n').filter(l => /^\|/.test(l) && !/^\|[-: ]+\|/.test(l));
    const emptyCells = [];
    for (const line of tableLines) {
      const cells = line.split('|').slice(1, -1);
      for (const cell of cells) {
        const trimmed = cell.trim();
        if (trimmed && trimmed !== '—' && trimmed !== 'N/A' && !/\[.+\]\(.+\)/.test(trimmed)) {
          emptyCells.push(trimmed.slice(0, 40));
        }
      }
    }
    if (emptyCells.length > 0) {
      return { pass: false, detail: emptyCells.length + ' cell(s) missing hyperlinks (link-not-copy violation)' };
    }
    return { pass: true, detail: '(informational)' };
  }
},
```

### C13 Check — Broken-Link Automation (Informational-First)

C13 calls `markdown-link-check` via `execFileSync` (same pattern as check-phase-30.mjs check id 13). Critical: markdown-link-check is invoked with a config file for redirect-following and GFM-anchor-case handling. The check itself is a harness trigger — the full inventory lives in VERIFICATION artifact.

```javascript
{
  id: 13,
  name: 'C13: Broken-link automation (markdown-link-check)',
  informational: true,
  // AUDIT-05: INFORMATIONAL-FIRST. Promotes to blocking after Phase 60 second-pass triage.
  // Scope: internal anchor links + relative paths in docs/**/*.md.
  // External MS Learn URL validation explicitly OUT OF SCOPE (REQUIREMENTS.md).
  run() {
    // Collect all docs/**/*.md files
    const docFiles = [];
    for (const abs of walkMd('docs')) { docFiles.push(relNormalize(abs)); }
    if (docFiles.length === 0) return { pass: true, detail: '(informational)' };
    try {
      const { execFileSync } = await import('node:child_process');  // dynamic to keep file-reads-only contract for non-C13 runs
      execFileSync('npx', [
        '--yes', '--no-install', 'markdown-link-check',
        '--config', '.mlc-config.json',
        '--quiet',
        ...docFiles.slice(0, 10)  // sample run in harness; full sweep is Wave-2 manual step
      ], { stdio: 'pipe', timeout: 60000, cwd: process.cwd() });
      return { pass: true, detail: '(informational)' };
    } catch (err) {
      const isMissing = err.code === 'ENOENT' || (err.stderr && err.stderr.toString().includes('not found'));
      if (isMissing) return { pass: true, detail: '(informational)' };
      return { pass: true, detail: '(informational)' };  // always informational-first pass
    }
  }
},
```

**Implementation note:** C13 in the harness is a lightweight probe (sample of files, non-blocking). The full 179-file sweep is a Wave-2 manual step producing the VERIFICATION artifact. C13 in the harness confirms the tool is wired; Wave-2 produces the findings inventory.

### .mlc-config.json — Exact Flag Set

```json
{
  "ignorePatterns": [
    { "pattern": "^https://learn\\.microsoft\\.com" },
    { "pattern": "^https://docs\\.microsoft\\.com" },
    { "pattern": "^https://techcommunity\\.microsoft\\.com" },
    { "pattern": "^https://portal\\.azure\\.com" },
    { "pattern": "^https://endpoint\\.microsoft\\.com" },
    { "pattern": "^https://intune\\.microsoft\\.com" }
  ],
  "retryOn429": true,
  "retryCount": 2,
  "timeout": "10s",
  "aliveStatusCodes": [200, 201, 206, 301, 302, 303, 307, 308]
}
```

**Rationale for each flag:**
- `ignorePatterns`: External MS Learn URL validation is explicitly OUT OF SCOPE per REQUIREMENTS.md. This prevents the false-positive flood described in PITFALL-14 (redirect chains). The pattern excludes `docs.microsoft.com` (old domain), `learn.microsoft.com` (new domain), portal URLs, and community URLs.
- `retryOn429`: Some GitHub/npm CDN links may return 429 transiently. Retry prevents false positives.
- `aliveStatusCodes` including 301/302/307/308: Follows D-23 "redirect-following" intent — pages that redirect to valid content are not broken. This implements PITFALL-14 mitigation at config level.

**Config location:** Place at repo root as `.mlc-config.json` (markdown-link-check's default config discovery path).

**Note on GFM anchor-case handling:** markdown-link-check v3.14.2 does NOT natively normalize GFM anchor IDs (lowercase+hyphenate). This is why D-23 step 8 mandates a `grep -rn "#[A-Z]" docs/` precheck BEFORE running the tool sweep. The precheck catches PITFALL-15 capital-anchor issues that markdown-link-check would miss or misreport.

---

## BASELINE_9 Refresh — Concrete Values

### Current Self-Test Failure Diagnosis

`regenerate-supervision-pins.mjs --self-test` **FAILS** (confirmed via live run 2026-04-26). Root cause: BASELINE_9 at line 390 contains pre-Phase-43 line coordinates that have drifted due to Phase 44–46 file additions. [VERIFIED: live --self-test run]

**`--report` output analysis:** [VERIFIED: live --report run]

```
Stale pins (13):  
  docs/_glossary-android.md:65   (was in BASELINE_9)
  docs/_glossary-android.md:67   (was in BASELINE_9)
  docs/_glossary-android.md:134  (was in BASELINE_9)
  docs/_glossary-android.md:148  (was in BASELINE_9)
  docs/admin-setup-android/03-fully-managed-cobo.md:35  (was in BASELINE_9)
  docs/_glossary-android.md:15   (was in v1.4.1-audit-allowlist.json sidecar, NOT baseline)
  docs/_glossary-android.md:45   (was in sidecar)
  docs/_glossary-android.md:63   (was in sidecar)
  docs/reference/android-capability-matrix.md:74  (was in sidecar)
  docs/reference/android-capability-matrix.md:76  (was in sidecar)
  docs/reference/android-capability-matrix.md:77  (was in sidecar)
  docs/reference/android-capability-matrix.md:79  (was in sidecar)
  docs/reference/android-capability-matrix.md:84  (was in sidecar)

Un-pinned Tier-1 occurrences (12 — these are the CURRENT line coordinates):
  docs/_glossary-android.md:16
  docs/_glossary-android.md:46
  docs/_glossary-android.md:66
  docs/_glossary-android.md:78
  docs/_glossary-android.md:172
  docs/_glossary-android.md:188
  docs/admin-setup-android/03-fully-managed-cobo.md:36
  docs/reference/android-capability-matrix.md:78
  docs/reference/android-capability-matrix.md:80
  docs/reference/android-capability-matrix.md:81
  docs/reference/android-capability-matrix.md:87
  docs/reference/android-capability-matrix.md:88

Un-pinned Tier-2 suspected regression (1):
  docs/_glossary-android.md:76  —  ### Supervision
```

### What the Atomic Commit Must Do (D-14)

The rescue-style Wave-1 atomic commit must do TWO things together:

**Part A — Update `v1.5-audit-allowlist.json` sidecar (inherit from v1.4.1 + refresh coordinates):**

The 13 stale pins in `v1.4.1-audit-allowlist.json` must be updated to current line numbers. Cross-referencing stale-pins vs Tier-1 current positions:

| Stale Pin | Current Line | File |
|-----------|-------------|------|
| `docs/_glossary-android.md:65` | 66* (BASELINE_9 only — not in sidecar Phase 43 authored) | — |
| `docs/_glossary-android.md:67` | 78** | — |
| `docs/_glossary-android.md:134` | (no match) | — |
| `docs/_glossary-android.md:148` | (no match) | — |
| `docs/admin-setup-android/03-fully-managed-cobo.md:35` | 36 | Update to 36 |
| `docs/_glossary-android.md:15` | 16 | Update to 16 |
| `docs/_glossary-android.md:45` | 46 | Update to 46 |
| `docs/_glossary-android.md:63` | 66 | Update to 66 |
| `docs/reference/android-capability-matrix.md:74` | 78 | Update to 78 |
| `docs/reference/android-capability-matrix.md:76` | 80 | Update to 80 |
| `docs/reference/android-capability-matrix.md:77` | 81 | Update to 81 |
| `docs/reference/android-capability-matrix.md:79` | 87 | Update to 87 |
| `docs/reference/android-capability-matrix.md:84` | 88 | Update to 88 |

*The `_glossary-android.md:76` Tier-2 item (### Supervision heading) was previously pinned at line 78 in the v1.4.1 sidecar. The `--report` classifies it as Tier-2 because the heading line itself does not contain iOS/Apple/ADE context keywords — but the sidecar explicitly exempts this line. The v1.5 sidecar must retain this pin at line 76.

**Important:** The self-test reads `v1.4-audit-allowlist.json` (not v1.4.1). The v1.4 sidecar's 9-pin baseline is what BASELINE_9 was calibrated against. The Phase 43 sidecar expansion happened in `v1.4.1-audit-allowlist.json`. BASELINE_9 at `regenerate-supervision-pins.mjs:390` is stale because it reflects pre-Phase-43 coordinates, but the v1.4.1 sidecar was re-verified at Phase 46 close with new coordinates. The self-test fails because the classifier finds pins at new coordinates (e.g., `:36` not `:35`), and BASELINE_9 still contains old coordinates (`:35`).

**Part B — Update BASELINE_9 in `regenerate-supervision-pins.mjs` line 390:**

BASELINE_9 encodes the 9 S1..S9 pre-Phase-43 pin coordinates from commit `e5e45db`. These 9 baseline pins also drifted. The correct v1.5 BASELINE_9 values must be derived by running `--report` against the v1.4 sidecar and identifying which 9 original pins survive at new coordinates.

The self-test failure analysis shows that 5 of the 9 BASELINE_9 entries are stale (glossary android:65, :67, :134, :148 and cobo.md:35). Their counterparts in the current classifier Tier-1 set are: glossary android:66?, :78?, cobo.md:36. The exact v1.5 BASELINE_9 update requires the executor to run `node scripts/validation/regenerate-supervision-pins.mjs --report` against the UPDATED v1.5 sidecar (after Part A) and identify which 9 pins correspond to the original S1..S9 occurrences by content inspection.

**Recommended executor procedure:**
1. Update `v1.5-audit-allowlist.json` with current pin coordinates (Part A above)
2. Run `--report` again to confirm stale count = 0
3. Inspect which 9 occurrences are the original S1..S9 bridge-prose items (enrollment overview x3, cobo.md x1, glossary x5)
4. Update BASELINE_9 accordingly
5. Run `--self-test` — must exit 0

**Shortcut:** The v1.5 self-test will use `v1.5-audit-allowlist.json` (not v1.4). The self-test as written reads `v1.4-audit-allowlist.json` at line 405. For v1.5, `doSelfTest()` must be updated to read `v1.5-audit-allowlist.json`. This is a one-line change at `regenerate-supervision-pins.mjs:405`.

---

## C6 / C7 Graduation — Exact Changes

### C6: Remove `informational: true` flag

In `v1.5-milestone-audit.mjs`, check id 6 currently has:
```javascript
informational: true,
// D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Always PASS. Emits findings count.
```

**Change for v1.5:** Remove `informational: true`. Update comment to:
```javascript
// D-04 + Phase 48 CONTEXT: BLOCKING in v1.5 (C6 target files frozen; no v1.5 phases touch admin-setup-android/ AOSP files).
```

Update `run()` to return `{ pass: false, detail: ... }` on violations instead of always `{ pass: true, detail: ... }`.

**Verify first:** Before committing C6 blocking, confirm 6/6 AOSP files pass (they do — v1.4.1 harness run shows `6/6 AOSP-scoped files preserve PITFALL-7 framing`). [VERIFIED: live v1.4.1 harness run]

### C7: Remove `informational: true` flag

In `v1.5-milestone-audit.mjs`, check id 7 currently has:
```javascript
informational: true,
// D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Emits bare-Knox occurrences.
```

**Change for v1.5:** Remove `informational: true`. C7 must now FAIL if `bare > 0`.

**Current baseline:** v1.4.1 harness run shows `99 bare "Knox" occurrence(s)`. This will cause C7 to FAIL immediately on the existing corpus. [VERIFIED: live v1.4.1 harness run]

**The executor must resolve this before committing C7 as blocking.** Options per D-05:
- C7 suffix list locks Knox SKU qualifiers: `(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|KPE Standard|KPE Premium|on-device attestation|Mobile Enrollment Portal)`. The 99 occurrences are likely legitimate (phase 44 Knox ME content is rich). The executor must scan the 99 occurrences and determine how many are bare vs qualified.
- If legitimate occurrences exist without a suffix qualifier (e.g., "Knox" in a heading or introductory sentence), the C7 check may need an allowlist mechanism (D-05 explicitly permits this: "if C7 produces false positive in Phase 49+ Linux glossary cross-platform see-also, add allowlist mechanism in same commit").
- **Pre-graduation step:** Run `grep -rn "\bKnox\b" docs/admin-setup-android/ | grep -v -E "(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|Standard|Premium|attestation|Portal)"` to count actual bare occurrences requiring exemption.

---

## check-phase-48.mjs — Required Assertions

Pattern: same structure as check-phase-30.mjs and check-phase-31.mjs. File-reads-only + graceful degradation.

```javascript
// check-phase-48.mjs — Phase 48 static validation harness
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md
// File reads only: all content loaded via fs.readFileSync; no shell invocations except AUDIT-07 self-test.
```

**Required assertions (minimum 5 checks):**

| Check ID | Assertion | Pass Condition |
|----------|-----------|----------------|
| 1 | `scripts/validation/v1.5-milestone-audit.mjs` exists | `existsSync(...)` |
| 2 | `scripts/validation/v1.5-audit-allowlist.json` exists and parses | `JSON.parse(raw)` succeeds |
| 3 | Sidecar `supervision_exemptions.length > 0` | Inherits 18 pins from v1.4.1 |
| 4 | `regenerate-supervision-pins.mjs --self-test` exits 0 | `execFileSync` exit code = 0 (AUDIT-07) |
| 5 | `48-VERIFICATION-broken-links.md` exists with three category sections | File exists AND contains `## Category A` AND `## Category B` AND `## Category C` |
| 6 | `v1.5-milestone-audit.mjs` references `v1.5-audit-allowlist.json` (not v1.4.1) | `grep` for sidecar path string |
| 7 | `.mlc-config.json` exists | `existsSync(...)` |

**Note on check 4 (self-test):** This is the one check that uses `execFileSync` (not file-reads-only). Match the pattern from check-phase-30.mjs check id 13 — wrap in try-catch, treat ENOENT as SKIPPED.

---

## CI Workflow — audit-harness-v1.5-integrity.yml

### Full Structure Clone from v1.4.1 yml

The new yml at `.github/workflows/audit-harness-v1.5-integrity.yml` follows the exact 4-job structure of `audit-harness-integrity.yml` (93 lines). Key changes:

**Trigger paths (extend with v1.5 + Linux doc globs):**
```yaml
on:
  pull_request:
    paths:
      - 'scripts/validation/v1.5-*'
      - 'docs/_glossary-linux.md'
      - 'docs/reference/linux-capability-matrix.md'
      - 'docs/linux-lifecycle/**'
      - 'docs/admin-setup-linux/**'
      - 'docs/l2-runbooks/**-linux-*.md'
      - 'docs/l1-runbooks/**-linux-*.md'
      - 'docs/operations/**'
  schedule:
    - cron: '0 8 * * 1'
  workflow_dispatch:
```

**Comment header (D-19):**
```yaml
# v1.5 Audit Harness Integrity
# v1.5 integration surface. v1.4 + v1.4.1 harnesses frozen in audit-harness-integrity.yml.
# New v1.5 checks (C10-C13) and per-phase validators registered here.
```

**`parse` job:** Validate `v1.5-audit-allowlist.json` (same inline node -e pattern as existing yml lines 26–35). Assertion: `supervision_exemptions` array exists AND has length > 0.

**`path-match` job:** Assert `v1.5-milestone-audit.mjs` contains string `v1.5-audit-allowlist.json`.

**`harness-run` job:** `node scripts/validation/v1.5-milestone-audit.mjs --verbose`.

**`check-phase-48` job (new — registered immediately per D-18):**
```yaml
check-phase-48:
  name: check-phase-48 validator
  runs-on: ubuntu-latest
  needs: harness-run
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with: { node-version: '20' }
    - name: Run check-phase-48.mjs
      run: |
        if [ -f scripts/validation/check-phase-48.mjs ]; then
          node scripts/validation/check-phase-48.mjs
        else
          echo "check-phase-48.mjs not present — skipping (graceful degradation per Phase 42 D-31)"
        fi
```

**`check-phase-49..60` placeholder jobs (D-18 lazy-skip pattern):** Each registered as the same lazy-skip pattern. Add 12 additional jobs at Phase 48 as placeholders.

**`pin-helper-advisory` job:** Clone from existing yml lines 67–93, updating harness path to v1.5. `continue-on-error: true` preserved.

---

## Pre-Commit Advisory Hook

### Repo Tooling State

No Husky, no lefthook found in repo root. `package.json` has no `husky` or `lint-staged` devDependencies. Only `.git/hooks/*.sample` files exist. [VERIFIED: live ls output]

**Decision (Claude's Discretion):** Contribute as native `.git/hooks/pre-commit` script. This file does not currently exist (only `pre-commit.sample` exists).

### Hook Content

```bash
#!/usr/bin/env bash
# v1.5 pre-commit advisory: supervision pin drift detector
# Advisory only — exits 0 always; never blocks commit.
# Phase 48 D-20/D-21: intermediate step between CI-advisory-only (v1.4.1) and CI-hard-block (v1.6+ candidate).

PINNED_FILE_PATTERN="docs/_glossary-android.md|docs/reference/android-capability-matrix.md|docs/admin-setup-android/|docs/_glossary-linux.md|docs/admin-setup-linux/"

# Check if any staged files match the pinned-file glob
STAGED=$(git diff --cached --name-only 2>/dev/null | grep -E "$PINNED_FILE_PATTERN" || true)

if [ -z "$STAGED" ]; then
  exit 0
fi

echo "[pin-drift advisory] Staged files matching pinned-file scope detected:" >&2
echo "$STAGED" >&2
echo "[pin-drift advisory] Running regenerate-supervision-pins.mjs --report..." >&2

if command -v node >/dev/null 2>&1; then
  node scripts/validation/regenerate-supervision-pins.mjs --report 2>&1 | grep -E "(Stale pins|Un-pinned|BASELINE)" >&2 || true
else
  echo "[pin-drift advisory] node not found in PATH; skipping pin report" >&2
fi

echo "[pin-drift advisory] Advisory only — commit not blocked." >&2
exit 0
```

**Installation note:** `chmod +x .git/hooks/pre-commit` required after creation. The hook file is NOT tracked in git (`.git/hooks/` is not in the repo). Contribution pattern: write the hook content to `scripts/validation/pre-commit-advisory.sh` (tracked in repo as reference), and include an installation step in the plan that copies it to `.git/hooks/pre-commit`. Document this in `scripts/validation/README-supervision-pins.md` (existing file per Phase 43 D-13).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Broken link detection | Custom regex-based link parser | `markdown-link-check` v3.14.2 | Handles relative paths, HTTP redirect following, config-driven ignores, 429 retry — edge cases that hand-rolled scanners miss |
| Anchor ID normalization | Custom GFM anchor lowercaser | `grep -rn "#[A-Z]" docs/` precheck | Phase 48 only needs to FIND uppercase anchors for inventory; full GFM normalization not needed at first-pass triage |
| Pin coordinate tracking | Full-auto re-pinner | `regenerate-supervision-pins.mjs --report` + human update | Phase 43 D-09/D-11: never auto-pin; two-tier discrimination requires human judgment for Tier-2 |
| CI job structure | Novel workflow pattern | Clone `audit-harness-integrity.yml` structure | 4-job parse → path-match → harness-run → advisory is battle-tested; no novel CI patterns in Phase 48 |

---

## Common Pitfalls

### Pitfall 1: C6 Blocking Before Regression-Check
**What goes wrong:** C6 is promoted to blocking in the harness before verifying the current corpus passes. With 6/6 AOSP files currently showing PITFALL-7 framing, C6 should PASS — but if the check logic is wrong (e.g., off-by-one in target file list), it fails.
**How to avoid:** Run the check in informational mode first (add a temporary `informational: true` in a local test run), inspect the detail string, confirm 6/6, then remove the flag.
**Warning sign:** C6 FAIL on first v1.5 harness run with "0/6 AOSP-scoped files" detail.

### Pitfall 2: C7 Blocking Produces 99 FAILs
**What goes wrong:** Committing C7 as blocking immediately produces FAIL because the v1.4.1 corpus has 99 bare "Knox" occurrences per live harness run.
**How to avoid:** D-23 step 4 says "Verify v1.4.1 corpus passes C7 blocking before commit." Run `grep -rn "\bKnox\b" docs/` and identify which occurrences lack SKU qualifiers. If any legitimate bare-Knox occurrences exist (e.g., heading "Knox Mobile Enrollment" is fine, but "Knox" alone in a cross-reference sentence may not be), add those to a `c7_knox_allowlist[]` array in the sidecar per D-05.
**Warning sign:** C7 FAIL after graduation with count > 0.

### Pitfall 3: BASELINE_9 Updated Before Sidecar Refresh
**What goes wrong:** BASELINE_9 is updated first (to current file positions), but the sidecar still has old coordinates. The self-test reads the sidecar to compute expected-new-pins, which now has stale coordinates. Self-test fails in a confusing way.
**How to avoid:** Update sidecar FIRST (Pin Part A), confirm stale count = 0 in `--report`, THEN update BASELINE_9 to match current coordinates of the original S1..S9 occurrences. These two edits land in the same atomic commit per D-14.

### Pitfall 4: markdown-link-check Flags 40+ MS Learn Links
**What goes wrong:** Running markdown-link-check without the MS Learn ignorePatterns produces massive false-positive output (PITFALL-14). The `.mlc-config.json` MUST be committed before Wave-2 sweep runs.
**How to avoid:** D-23 step 7 places `.mlc-config.json` authoring before the sweep (step 9). The Wave-2 sweep must use `--config .mlc-config.json` explicitly.

### Pitfall 5: v1.5 Sidecar Self-Test Reads Wrong Sidecar
**What goes wrong:** `doSelfTest()` at line 405 of `regenerate-supervision-pins.mjs` hardcodes `scripts/validation/v1.4-audit-allowlist.json`. For v1.5, the function must read `v1.5-audit-allowlist.json` instead, or it tests the wrong baseline.
**How to avoid:** Update line 405 in `regenerate-supervision-pins.mjs` as part of the BASELINE_9 refresh commit. This is a one-line change.

### Pitfall 6: Frozen-Marker Confusion
**What goes wrong:** The v1.5 harness header comment is phrased such that v1.5 appears to be frozen. The correct phrasing has the frozen-predecessor comment pointing BACKWARD to v1.4.1 (the predecessor that v1.5 anchors against), not claiming v1.5 itself is frozen.
**How to avoid:** Use exact wording from §Architecture Patterns above: "Frozen-predecessor reproducibility anchor: v1.4.1-milestone-audit.mjs pinned at Phase 47 close".

### Pitfall 7: Category A Findings Not Distinguished from Category B
**What goes wrong:** The VERIFICATION artifact conflates broken anchors (#heading) with broken relative file paths (../platform/file.md). These are categorically different repairs — anchor issues require heading-text lookup, path issues require file existence/rename lookup.
**How to avoid:** Use D-12 schema: Category A = anchor links (`#anchor` failures), Category B = file path links (`file.md` or `../path/file.md` failures), Category C = intentional stubs.

---

## Code Examples

### Pattern: parseAllowlist() in v1.5 Harness

```javascript
// Source: v1.4.1-milestone-audit.mjs lines 57-65 (verbatim copy with path update)
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');  // CHANGED from v1.4.1
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
```

### Pattern: Informational Flag in Runner

```javascript
// Source: v1.4.1-milestone-audit.mjs lines 379-387
// C10 has no informational flag → FAIL causes process.exit(1) (blocking)
// C11/C12/C13 have informational: true → PASS detail shown even without --verbose
const showDetail = result.detail && (check.informational === true || VERBOSE);
process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' ' + result.detail : '') + '\n');
```

### Pattern: v1.5 Sidecar Schema (Initial)

```json
{
  "schema_version": "1.0",
  "generated": "2026-04-26T00:00:00Z",
  "phase": "48-audit-harness-bootstrap-broken-link-sweep-first-pass",
  "safetynet_exemptions": [ /* 4 inherited from v1.4.1 with updated line coords */ ],
  "supervision_exemptions": [ /* 18 inherited from v1.4.1 with updated line coords */ ],
  "cope_banned_phrases": [ /* 8 inherited verbatim from v1.4.1 */ ]
}
```

No new top-level arrays added at Phase 48 (YAGNI per D-15).

---

## Runtime State Inventory

> Phase 48 is a greenfield tooling phase — no rename/refactor. However, the BASELINE_9 stale-state is a runtime state concern equivalent to a stale registry entry.

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | `regenerate-supervision-pins.mjs` BASELINE_9 at line 390 — 5 of 9 entries have stale line coordinates | Update BASELINE_9 array in same atomic commit as sidecar refresh |
| Live service config | None | — |
| OS-registered state | `.git/hooks/pre-commit` — does not exist yet (only `pre-commit.sample`) | Create new file via plan step; `chmod +x` required |
| Secrets/env vars | None | — |
| Build artifacts | None | — |

**`v1.4.1-audit-allowlist.json` stale pins — verified not nothing:** 13 supervision_exemption line coordinates are stale (v1.4.1 sidecar was re-verified post-Phase-46 but BASELINE_9 was not updated at that time). These are copy-source for v1.5 sidecar; must refresh before copying.

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All .mjs harness files | ✓ | v22.20.0 | — |
| npm / npx | markdown-link-check invocation | ✓ | bundled with Node 22 | — |
| markdown-link-check | C13 + Wave-2 sweep | ✓ (via npx) | 3.14.2 | Install: `npm install --save-dev markdown-link-check` |
| git | Pre-commit hook; diff operations | ✓ | Windows native + WSL | — |
| grep | `grep -rn "#[A-Z]" docs/` precheck | ✓ (bash env) | OS-provided | `node -e` fallback if grep unavailable |

**Missing dependencies:** None blocking. markdown-link-check is available via `npx --yes` without pre-installation (same pattern as check-phase-30.mjs check 13).

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | check-phase-48.mjs (custom harness; no external test framework) |
| Config file | none — self-contained |
| Quick run command | `node scripts/validation/check-phase-48.mjs` |
| Full suite command | `node scripts/validation/v1.5-milestone-audit.mjs --verbose` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDIT-01 | `v1.5-milestone-audit.mjs` exists | file-exists | `node scripts/validation/check-phase-48.mjs` check 1 | ❌ Wave 0 |
| AUDIT-02 | C10 Linux frontmatter blocking | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs` | ❌ Wave 0 |
| AUDIT-03 | C11 informational scaffold present | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs` | ❌ Wave 0 |
| AUDIT-04 | C12 informational scaffold present | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs` | ❌ Wave 0 |
| AUDIT-05 | C13 informational scaffold present | unit (harness check) | `node scripts/validation/v1.5-milestone-audit.mjs` | ❌ Wave 0 |
| AUDIT-06 | `check-phase-48.mjs` exists + CI registered | file-exists | `node scripts/validation/check-phase-48.mjs` | ❌ Wave 0 |
| AUDIT-07 | `--self-test` exits 0 | integration | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` | ✅ (exists; currently FAILs) |
| AUDIT-08 | `48-VERIFICATION-broken-links.md` has A/B/C sections | file-content | `node scripts/validation/check-phase-48.mjs` check 5 | ❌ Wave 0 |
| CLEAN-06 | Anchor sweep complete | manual + automated | `grep -rn "#[A-Z]" docs/` | ✅ (grep available) |
| CLEAN-07 | Relative-path sweep complete | manual + automated | `npx markdown-link-check --config .mlc-config.json docs/**/*.md` | ❌ Wave 0 (need .mlc-config.json) |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.5-milestone-audit.mjs`
- **Per wave merge:** `node scripts/validation/v1.5-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test`
- **Phase gate:** Both commands exit 0 + `check-phase-48.mjs` exits 0 before `/gsd-verify-work`

### Wave 0 Gaps

- [ ] `scripts/validation/v1.5-milestone-audit.mjs` — covers AUDIT-01..05 (core harness deliverable)
- [ ] `scripts/validation/v1.5-audit-allowlist.json` — covers AUDIT-01 sidecar requirement
- [ ] `scripts/validation/check-phase-48.mjs` — covers AUDIT-06
- [ ] `.mlc-config.json` — covers AUDIT-05/CLEAN-07 tool configuration
- [ ] `.planning/phases/48-*/48-VERIFICATION-broken-links.md` — covers AUDIT-08/CLEAN-06/CLEAN-07
- [ ] `.github/workflows/audit-harness-v1.5-integrity.yml` — covers AUDIT-06 CI registration

---

## Security Domain

> This phase is purely docs-engineering tooling. No web-facing endpoints, no authentication flows, no user input processing, no cryptographic operations. ASVS categories V2/V3/V4/V6 do not apply. V5 input validation applies only to sidecar JSON parsing (handled by `try/catch` graceful-degradation pattern already present in harness).

**Applicable security pattern:** The `parseAllowlist()` function uses `try/catch` on `JSON.parse()` and degrades to empty arrays on failure — this is the correct input validation pattern for JSON config files. No additional security controls needed.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | BASELINE_9 update requires changing `doSelfTest()` sidecar path from `v1.4-audit-allowlist.json` to `v1.5-audit-allowlist.json` at line 405 | BASELINE_9 Refresh | If the self-test is kept reading v1.4 sidecar, v1.5 BASELINE_9 calibration will be against the wrong pin set |
| A2 | The 99 bare "Knox" occurrences in the current corpus will require an allowlist mechanism before C7 can be promoted to blocking | C7 Graduation | If all 99 are covered by the suffix list, no allowlist needed — run grep verification before committing C7 blocking |
| A3 | `linuxDocPaths()` will return empty array in Phase 48 (no Linux docs yet), causing C10 to trivially PASS | C10 Check | [ASSUMED] — verified that no docs/linux-lifecycle/ or docs/admin-setup-linux/ dirs exist via docs ls output, but confirmed Linux files are Phase 49+ |

**If this table is near-empty after A3:** A1 and A2 are both executable-plan-time decisions with clear verification steps documented. Only A3 is a structural assumption; it is low-risk because the 179-file count confirmed in STATE.md and the docs/ tree inspection show no Linux files exist yet.

---

## Open Questions (RESOLVED)

1. **C7 allowlist scope** — RESOLVED
   - What we know: 99 bare "Knox" occurrences in current corpus; suffix list at v1.4.1 line 318 covers `(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|KPE Standard|KPE Premium|on-device attestation|Mobile Enrollment Portal)`
   - What's unclear: How many of the 99 are legitimately bare (e.g., `Knox` as a heading word, or in a product comparison context not covered by suffix list)
   - **Resolution:** Plan 48-04 Task 2 (graduation procedure) performs the grep triage at execution time. Procedure: run `grep -rn '\bKnox\b' docs/ | grep -vE '(Mobile Enrollment|Platform for Enterprise|Suite|Manage|Configure|KPE|KME|on-device attestation|Mobile Enrollment Portal)' | wc -l` to count truly-bare occurrences (no qualifying suffix within 50 chars). If count > 0, add `c7_knox_allowlist[]` array to `v1.5-audit-allowlist.json` with `{file, line, reason}` pins for each legitimately-bare occurrence (e.g., glossary cross-platform see-also entries) before flipping C7 to blocking. Sidecar-driven allowlist mechanism per Phase 43 D-26 contract.

2. **ROADMAP.md SC#1 contradiction wording fix** — RESOLVED
   - What we know: SC#1 says "C1-C9 blocking PASS and C10-C13 informational" but C10 ships blocking (AUDIT-02 authoritative per D-09)
   - What's unclear: Whether the fix is a one-line SC#1 edit or a VERIFICATION.md note
   - **Resolution:** Plan 48-09 Task 2 will edit `ROADMAP.md` SC#1 directly per Option A (preferred per D-09 Claude's Discretion). Wording change: `"C1-C9 blocking PASS and C10-C13 informational"` → `"C1-C7 + C10 blocking PASS; C8 unused; C9 + C11/C12/C13 informational"`. Same task expanded to also fix SC#3 (lazy-allowlist + Phase 60 promotion schedule) and SC#5 (new CI workflow filename `.github/workflows/audit-harness-v1.5-integrity.yml`) per the same revision pass.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| v1.4.1 harness as active (C6/C7/C9 informational) | v1.5 harness as active (C6/C7 blocking, C9 still informational, C10-C13 new) | Phase 48 | Phase 49+ content runs against stricter blocking checks |
| BASELINE_9 stale (v1.4 pre-Phase-43 coordinates) | BASELINE_9 refreshed to v1.5 current coordinates | Phase 48 | `--self-test` exits 0 |
| No broken-link inventory | 179-file baseline categorized inventory | Phase 48 | Phase 60/61 second-pass has a diff baseline |
| CI advisory only for pin drift | Pre-commit advisory + CI advisory | Phase 48 | Earlier detection (at edit time vs CI run time) |

**Deprecated/outdated:**
- `v1.4-milestone-audit.mjs` and `v1.4.1-milestone-audit.mjs`: frozen, not deleted. The v1.4 frozen commit `3c3a140` is a permanent reference.
- BASELINE_9 stale state: remediated in Phase 48 atomic commit.

---

## Sources

### Primary (HIGH confidence — codebase inspection + live tool runs)

- `scripts/validation/v1.4.1-milestone-audit.mjs` (391 lines) — full source read [VERIFIED: Read tool]
- `scripts/validation/v1.4.1-audit-allowlist.json` (41 lines) — full source read [VERIFIED: Read tool]
- `scripts/validation/regenerate-supervision-pins.mjs` (482 lines) — partial source read, BASELINE_9 at line 390 [VERIFIED: Read tool]
- `.github/workflows/audit-harness-integrity.yml` (93 lines) — full source read [VERIFIED: Read tool]
- `scripts/validation/check-phase-30.mjs` — full source read [VERIFIED: Read tool]
- `scripts/validation/check-phase-31.mjs` — partial source read [VERIFIED: Read tool]
- `node scripts/validation/regenerate-supervision-pins.mjs --self-test` — live run output [VERIFIED: Bash tool]
- `node scripts/validation/regenerate-supervision-pins.mjs --report` — live run output [VERIFIED: Bash tool]
- `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` — live run confirming 8 PASS [VERIFIED: Bash tool]
- `npm view markdown-link-check version` → 3.14.2 [VERIFIED: live npm view]
- `.git/hooks/` directory listing → only `.sample` files, no husky/lefthook [VERIFIED: Bash tool]
- `package.json` root → no husky/lefthook devDependencies [VERIFIED: Read tool]
- `docs/` directory listing → 179 .md files confirmed [VERIFIED: Bash find]

### Secondary (MEDIUM confidence — official docs)

- `npx markdown-link-check --help` — CLI flag documentation [VERIFIED: Bash tool]
- GitHub tcort/markdown-link-check README — config schema (httpHeaders, ignorePatterns, retryOn429, aliveStatusCodes) [CITED: WebFetch from github.com/tcort/markdown-link-check]

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — markdown-link-check version and availability confirmed live
- Architecture: HIGH — all patterns derived from direct source code reads
- BASELINE_9 diagnosis: HIGH — live self-test + report runs; exact stale pins known
- C6/C7 graduation: HIGH for C6 (6/6 confirmed); MEDIUM for C7 (99 bare occurrences require executor verification)
- Pitfalls: HIGH — grounded in live tool behavior and PITFALLS.md analysis

**Research date:** 2026-04-26
**Valid until:** 2026-05-26 (30 days; stable tooling domain)
