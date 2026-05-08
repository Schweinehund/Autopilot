# Phase 48: Audit Harness Bootstrap + Broken-Link Sweep First Pass — Pattern Map

**Mapped:** 2026-04-26
**Files analyzed:** 8 (7 created, 1 modified)
**Analogs found:** 6 / 8 (2 no analog — pre-commit hook and mlc-config are greenfield)

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `scripts/validation/v1.5-milestone-audit.mjs` | utility / validator | batch (file-scan) | `scripts/validation/v1.4.1-milestone-audit.mjs` | exact — Path A copy source |
| `scripts/validation/v1.5-audit-allowlist.json` | config | — | `scripts/validation/v1.4.1-audit-allowlist.json` | exact — verbatim copy source |
| `scripts/validation/check-phase-48.mjs` | utility / validator | batch (file-scan + exec) | `scripts/validation/check-phase-30.mjs` | exact — same phase-validator pattern |
| `scripts/validation/pre-commit-advisory.sh` | utility / hook | event-driven (git pre-commit) | none | no analog |
| `.github/workflows/audit-harness-v1.5-integrity.yml` | config / CI | event-driven (PR + schedule) | `.github/workflows/audit-harness-integrity.yml` | exact — structural clone source |
| `.mlc-config.json` | config | — | none | no analog |
| `.planning/phases/48-.../48-VERIFICATION-broken-links.md` | documentation / artifact | — | `.planning/milestones/v1.4.1-phases/43-.../43-VERIFICATION.md` | role-match (VERIFICATION artifact schema) |
| `scripts/validation/regenerate-supervision-pins.mjs` (modified) | utility | batch (file-scan + self-test) | self (lines 390-400 = BASELINE_9 array to refresh) | self-edit |

---

## Pattern Assignments

### `scripts/validation/v1.5-milestone-audit.mjs` (utility, batch file-scan)

**Analog:** `scripts/validation/v1.4.1-milestone-audit.mjs` (391 lines — read in full)

**Instruction:** Path A copy — verbatim copy of v1.4.1 harness then apply the specific additive changes below.
Do NOT refactor shared utilities into a module (Phase 42 D-25 locks file-reads-only/no-shared-module contract).

**Change 1 — Header comment (replace v1.4.1 lines 1-6):**

v1.4.1 lines 1-6 (for diff reference):
```
// v1.4.1 Milestone Audit Harness (copy of v1.4 + C6/C7/C9 informational-first per Phase 42 D-29 + _*-prefix scope-filter + TEMPLATE-SENTINEL parse)
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-01..D-08, D-24, D-26)
// Sidecar allow-list: scripts/validation/v1.4.1-audit-allowlist.json  (Knox / per-OEM AOSP / COPE exemptions)
// Frozen-predecessor reproducibility anchor: v1.4-milestone-audit.mjs pinned at commit 3c3a140
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
```

Replace with (v1.5):
```
// v1.5 Milestone Audit Harness (Path A copy of v1.4.1 + C10 blocking + C11/C12/C13 informational-first + C6/C7 promoted to blocking)
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md (D-01..D-23)
// Sidecar allow-list: scripts/validation/v1.5-audit-allowlist.json  (inherited v1.4.1 schema + Linux/ops-domain arrays added lazily)
// Frozen-predecessor reproducibility anchor: v1.4.1-milestone-audit.mjs pinned at Phase 47 close
// File reads only: all content loaded via fs.readFileSync; no shell invocations.
//
// C6 (PITFALL-7) + C7 (bare-Knox): PROMOTED to blocking per Phase 48 D-04/D-05.
// C9 (cope_banned_phrases): INFORMATIONAL through Phase 60 per Phase 48 D-06 (ops-domain false-positive risk).
// C10 (Linux frontmatter): BLOCKING from Phase 48 -- new Linux docs must have platform: Linux + 60d last_verified.
// C11 (ops-domain anti-patterns): INFORMATIONAL-FIRST per AUDIT-03; promotes to blocking Phase 60.
// C12 (4-platform comparison structure): INFORMATIONAL-FIRST per AUDIT-04; promotes to blocking once file exists (Phase 58+).
// C13 (broken-link automation): INFORMATIONAL-FIRST per AUDIT-05; promotes to blocking after Phase 60 second-pass triage.
```

**Change 2 — parseAllowlist() line 58 path change only** (v1.4.1 lines 57-65):

Change `scripts/validation/v1.4.1-audit-allowlist.json` to `scripts/validation/v1.5-audit-allowlist.json` on the readFile call.
All other lines copy verbatim.

**Change 3 — C6 graduation** (v1.4.1 lines 286-309):

- Remove `informational: true` line.
- Update comment: `// D-04 + Phase 48 CONTEXT: BLOCKING in v1.5 (C6 target files frozen; no v1.5 phases touch admin-setup-android/ AOSP files).`
- run() return change: instead of always `{ pass: true, detail: '(informational ...)' }`:
  - `if (found === total && total > 0) return { pass: true };`
  - `return { pass: false, detail: found + '/' + total + ' AOSP-scoped files preserve PITFALL-7 framing' };`

**Change 4 — C7 graduation** (v1.4.1 lines 311-332):

- Remove `informational: true` line.
- Update comment: `// D-05 + Phase 48 CONTEXT: BLOCKING in v1.5. Knox corpus stable since v1.4.1 Phase 44.`
- run() return change: instead of always `{ pass: true, detail: '(informational ...)' }`:
  - `if (bare === 0) return { pass: true };`
  - `return { pass: false, detail: bare + ' bare "Knox" occurrence(s) without SKU qualifier' };`

**Change 5 — linuxDocPaths() — add after androidDocPaths() (after v1.4.1 line 122):**

Follows identical structure to androidDocPaths() (v1.4.1 lines 76-122). Key differences:
- Root singletons: `docs/_glossary-linux.md`, `docs/_templates/admin-template-linux.md`,
  `docs/reference/linux-capability-matrix.md`, `docs/decision-trees/09-linux-triage.md`
- Directory walks: `docs/linux-lifecycle`, `docs/admin-setup-linux`
- L1 runbook pattern: `/\/(3[0-3])-linux-/.test(rel)` (runbooks 30-33)
- L2 runbook pattern: `/\/(2[4-5])-linux-/.test(rel)` (runbooks 24-25)
- Same `hasUnderscoreDirSegment` scope-filter from v1.4.1 lines 117-120
See RESEARCH.md section 'linuxDocPaths() Function' for the exact full function body.

**Change 6 — C10 check — add to `checks` array (BLOCKING, no `informational` flag):**

Modeled on C5 (v1.4.1 lines 247-283). Key differences:
- id: 10, uses linuxDocPaths() not androidDocPaths()
- Adds platform field check: `/^platform:\s*Linux\s*$/m.test(fm)`
- Same `1970-01-01` TEMPLATE-SENTINEL skip (v1.4.1 line 268 pattern)
- Same 60-day diffDays > 60 freshness threshold
- Pass on empty scope: linuxDocPaths() returns [] in Phase 48 baseline, violations is empty, returns `{ pass: true }` -- correct blocking-with-no-scope behavior
See RESEARCH.md section 'C10 Check' for the exact full check object.

**Change 7 — C11 check — informational scaffold (modeled on C9 at v1.4.1 lines 334-352):**

- `id: 11`, `informational: true`
- Comment: `// AUDIT-03: INFORMATIONAL-FIRST. Promotes to blocking at Phase 60.`
- Pattern source: sidecar-driven `ALLOWLIST.c11_ops_patterns` array with hardcoded fallback
- Hardcoded fallback: `['\\bSystem Center\\b', '\\bSCCM\\b[^.]*\\bIntune\\b', '\\bAutopatch rings\\b', '\\bSafetyNet\\b[^.]*\\bcompliance\\b']`
- Scope: `walkMd('docs')` -- all docs
- Always returns `{ pass: true, detail: '(informational)' }` (D-08 compact format)
See RESEARCH.md section 'C11 Check' for the exact full check object.

**Change 8 — C12 check — informational scaffold with file-existence pre-gate:**

- `id: 12`, `informational: true`
- Comment: `// AUDIT-04: INFORMATIONAL-FIRST. Promotes to blocking once file exists (Phase 58+).`
- Target file: `docs/reference/4-platform-capability-comparison.md`
- If file absent: `return { pass: true, detail: '(informational)' }`
- If file exists: validate 5 platform columns present + link-not-copy table cells
See RESEARCH.md section 'C12 Check' for the exact full check object.

**Change 9 — C13 check — informational scaffold (external tool probe):**

Modeled on check-phase-30.mjs check 13 (lines 252-300).
- `id: 13`, `informational: true`
- Comment: `// AUDIT-05: INFORMATIONAL-FIRST. External MS Learn URLs OUT OF SCOPE per REQUIREMENTS.md.`
- Invokes `markdown-link-check` via execFileSync with ENOENT graceful-degradation
- Sample run only (first 10 files via docFiles.slice(0, 10)) -- harness probe, not full sweep
- Always returns `{ pass: true, detail: '(informational)' }` regardless of tool output
See RESEARCH.md section 'C13 Check' for the exact full check object.

**Runner loop** (v1.4.1 lines 367-391 — copy verbatim with one async exception):

The showDetail guard at v1.4.1 line 382 already handles C11/C12/C13 compact output. Runner copies verbatim **EXCEPT** for the runner loop body (lines 367-388), which Plan 48-03 Task 3 converts to async-IIFE form (`for ... { let result; try { result = await check.run(); } catch ...`) because C13 must be `async run()` to use `await` for `markdown-link-check` `execFile` invocation. The async-IIFE conversion is **additive** (preserves all v1.4.1 logic; only adds `await` keyword and the IIFE wrapper) and is the **SOLE** harness modification beyond verbatim Path A copy + new check-function additions. The `padLabel`, pass/fail/skipped counting, and `process.exit` semantics remain identical to v1.4.1. The `checks.length` value is evaluated dynamically at runtime.

**Reconciliation note (resolves checker review of 2026-04-26):** Plan 48-03 Task 3 is the canonical source for this conversion — research already evaluated Option A (async-IIFE wrap) vs Option B (sync execSync) and selected Option A. PATTERNS.md does not require a different runner-loop choice; the verbatim-copy guidance applies to the loop's structural shape (label-pad, status string, exit code), and the async-IIFE wrapper is treated as an additive surgical edit, not a structural deviation.

---

### `scripts/validation/v1.5-audit-allowlist.json` (config)

**Analog:** `scripts/validation/v1.4.1-audit-allowlist.json` (41 lines — read in full)

**Instruction:** Verbatim copy, then update three metadata fields and refresh 13 stale pin coordinates.

**Metadata fields to update:**
- `"generated"`: `"2026-04-24T00:00:00Z"` → `"2026-04-26T00:00:00Z"`
- `"phase"`: `"43-v1-4-cleanup-audit-harness-fix"` → `"48-audit-harness-bootstrap-broken-link-sweep-first-pass"`
- All `"reason"` strings in supervision_exemptions: clear stale provenance to `"v1.5 inherit baseline 2026-04-26"`

**Stale supervision_exemptions coordinate refresh** (update line values only):

| File | Old Line | New Line |
|------|----------|----------|
| `docs/admin-setup-android/03-fully-managed-cobo.md` | 35 | 36 |
| `docs/_glossary-android.md` | 15 | 16 |
| `docs/_glossary-android.md` | 45 | 46 |
| `docs/_glossary-android.md` | 63 | 66 |
| `docs/reference/android-capability-matrix.md` | 74 | 78 |
| `docs/reference/android-capability-matrix.md` | 76 | 80 |
| `docs/reference/android-capability-matrix.md` | 77 | 81 |
| `docs/reference/android-capability-matrix.md` | 79 | 87 |
| `docs/reference/android-capability-matrix.md` | 84 | 88 |

Entries NOT in this table (all 4 safetynet_exemptions; supervision_exemptions for enrollment-overview
lines 51/53/83, l2-runbook line 21, glossary lines 76/78/172/188) retain their existing coordinates unchanged.

**No new top-level arrays at Phase 48** (YAGNI per D-15 — linux_exemptions, ops_domain_allowlist, etc.
added lazily at Phase 49+ when first legitimate exemption appears).

---

### `scripts/validation/check-phase-48.mjs` (utility, phase validator)

**Analog:** `scripts/validation/check-phase-30.mjs` (338 lines — read in full)

**Header pattern** (check-phase-30.mjs lines 1-4, update for phase 48):
```
#!/usr/bin/env node
// check-phase-48.mjs — Phase 48 static validation harness
// Source of truth: .planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-CONTEXT.md
// File reads only: all content loaded via fs.readFileSync; no shell invocations except check 4 self-test.
```

**Imports** (check-phase-30.mjs lines 6-9 + add execFileSync for check 4):
```
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import process from 'node:process';

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
```

**readFile helper** (check-phase-31.mjs lines 15-19 — CRLF normalization version):
```
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

**Seven required checks (ids 1-7):**

Check 1 — v1.5-milestone-audit.mjs exists (file-exists, check-phase-30.mjs check 7 pattern):
```
{ id: 1, name: 'v1.5-milestone-audit.mjs exists',
  run() {
    const exists = existsSync(join(process.cwd(), 'scripts/validation/v1.5-milestone-audit.mjs'));
    if (exists) return { pass: true };
    return { pass: false, detail: 'scripts/validation/v1.5-milestone-audit.mjs does not exist' };
  }
},
```

Check 2 — v1.5-audit-allowlist.json exists and parses (check-phase-31.mjs parseInventory pattern):
```
{ id: 2, name: 'v1.5-audit-allowlist.json exists and parses',
  run() {
    const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
    if (!raw) return { pass: false, detail: 'file does not exist' };
    try { JSON.parse(raw); return { pass: true }; }
    catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
  }
},
```

Check 3 — supervision_exemptions.length > 0:
```
{ id: 3, name: 'sidecar supervision_exemptions.length > 0',
  run() {
    const raw = readFile('scripts/validation/v1.5-audit-allowlist.json');
    if (!raw) return { pass: false, detail: 'sidecar missing' };
    try {
      const j = JSON.parse(raw);
      if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0)
        return { pass: false, detail: 'supervision_exemptions empty (expected 18 inherited pins)' };
      return { pass: true, detail: j.supervision_exemptions.length + ' supervision pins' };
    } catch (err) { return { pass: false, detail: 'JSON parse error: ' + err.message }; }
  }
},
```

Check 4 — self-test exits 0 (execFileSync with ENOENT graceful-degradation, check-phase-30.mjs check 13 pattern):
```
{ id: 4, name: 'regenerate-supervision-pins.mjs --self-test exits 0 (AUDIT-07)',
  run() {
    try {
      execFileSync('node', ['scripts/validation/regenerate-supervision-pins.mjs', '--self-test'],
        { stdio: 'pipe', timeout: 30000, cwd: process.cwd() });
      return { pass: true };
    } catch (err) {
      const stderr = err.stderr ? err.stderr.toString() : '';
      const isMissing = err.code === 'ENOENT' || err.status === 127
        || stderr.includes('not found') || stderr.includes('Could not resolve');
      if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
      return { pass: false, detail: '--self-test FAIL: ' + stderr.slice(0, 200) };
    }
  }
},
```

Check 5 — VERIFICATION artifact with three category H2 sections:
```
{ id: 5, name: '48-VERIFICATION-broken-links.md exists with Category A/B/C sections',
  run() {
    const relPath = '.planning/phases/48-audit-harness-bootstrap-broken-link-sweep-first-pass/48-VERIFICATION-broken-links.md';
    const content = readFile(relPath);
    if (!content) return { pass: false, detail: relPath + ' does not exist' };
    const hasA = /^## Category A/m.test(content);
    const hasB = /^## Category B/m.test(content);
    const hasC = /^## Category C/m.test(content);
    if (hasA && hasB && hasC) return { pass: true };
    const missing = [!hasA && 'A', !hasB && 'B', !hasC && 'C'].filter(Boolean).join(', ');
    return { pass: false, detail: 'Missing sections: Category ' + missing };
  }
},
```

Check 6 — harness sidecar reference string-search:
```
{ id: 6, name: 'v1.5-milestone-audit.mjs references v1.5-audit-allowlist.json',
  run() {
    const content = readFile('scripts/validation/v1.5-milestone-audit.mjs');
    if (!content) return { pass: false, detail: 'harness file missing' };
    if (content.includes('v1.5-audit-allowlist.json')) return { pass: true };
    return { pass: false, detail: 'harness does not reference v1.5-audit-allowlist.json' };
  }
},
```

Check 7 — .mlc-config.json exists:
```
{ id: 7, name: '.mlc-config.json exists',
  run() {
    const exists = existsSync(join(process.cwd(), '.mlc-config.json'));
    if (exists) return { pass: true };
    return { pass: false, detail: '.mlc-config.json does not exist at repo root' };
  }
},
```

**Runner loop** (check-phase-30.mjs lines 303-337 — copy verbatim; omit QUICK flag since no external-type checks).

---

### `scripts/validation/pre-commit-advisory.sh` (utility, git hook)

**Analog:** none — greenfield. No Husky/lefthook in repo; only `.git/hooks/*.sample` files present (verified live).

**Full hook content (copy verbatim from RESEARCH.md Pre-Commit Advisory Hook section):**
```
#!/usr/bin/env bash
# v1.5 pre-commit advisory: supervision pin drift detector
# Advisory only -- exits 0 always; never blocks commit.
# Phase 48 D-20/D-21: intermediate step between CI-advisory-only (v1.4.1) and CI-hard-block (v1.6+ candidate).

PINNED_FILE_PATTERN="docs/_glossary-android.md|docs/reference/android-capability-matrix.md|docs/admin-setup-android/|docs/_glossary-linux.md|docs/admin-setup-linux/"

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

echo "[pin-drift advisory] Advisory only -- commit not blocked." >&2
exit 0
```

**Installation steps (required in plan):**
1. Write `scripts/validation/pre-commit-advisory.sh` (tracked in git as reference copy)
2. `cp scripts/validation/pre-commit-advisory.sh .git/hooks/pre-commit`
3. `chmod +x .git/hooks/pre-commit`

`.git/hooks/pre-commit` is NOT tracked in git.
Document installation in `scripts/validation/README-supervision-pins.md` (existing file per Phase 43 D-13).

---

### `.github/workflows/audit-harness-v1.5-integrity.yml` (CI config)

**Analog:** `.github/workflows/audit-harness-integrity.yml` (93 lines — read in full)

**Comment header (D-19) — place at very top of file:**
```
# v1.5 Audit Harness Integrity
# v1.5 integration surface. v1.4 + v1.4.1 harnesses frozen in audit-harness-integrity.yml.
# New v1.5 checks (C10-C13) and per-phase validators registered here.
```

**`name` field:** `Audit Harness v1.5 Integrity`

**`on.pull_request.paths` block** (analog lines 5-12, extend with v1.5 + Linux paths):
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

**`parse` job** (clone analog lines 18-35, update for v1.5 sidecar path and console.log label).

**`path-match` job** (clone analog lines 37-52):
Shell grep assertion: `grep -q "scripts/validation/v1.5-audit-allowlist.json" scripts/validation/v1.5-milestone-audit.mjs`

**`harness-run` job** (clone analog lines 54-65):
Run step: `node scripts/validation/v1.5-milestone-audit.mjs --verbose`

**`check-phase-48` job (D-18 — registered immediately, needs: harness-run):**
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
          echo "check-phase-48.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
        fi
```

**`check-phase-49` through `check-phase-60` placeholder jobs** (D-18 lazy-skip, 12 jobs):
Each follows the same pattern as check-phase-48 above with `needs: harness-run` and the lazy-skip shell block.
Replace `check-phase-48` with `check-phase-NN` and `check-phase-48.mjs` with `check-phase-NN.mjs`.

**`pin-helper-advisory` job** (clone analog lines 67-93, preserve `continue-on-error: true`):
Copy verbatim from analog. All structural elements identical.

---

### `.mlc-config.json` (config, repo root)

**Analog:** none — greenfield.

**Full JSON content (copy verbatim from RESEARCH.md section '.mlc-config.json -- Exact Flag Set'):**
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

**Location:** Repo root `.mlc-config.json` (markdown-link-check default discovery path).
Must be committed before Wave-2 sweep. Invoke with `--config .mlc-config.json` explicitly.

---

### `48-VERIFICATION-broken-links.md` (documentation artifact)

**Analog:** `.planning/milestones/v1.4.1-phases/43-v1-4-cleanup-audit-harness-fix/43-VERIFICATION.md`
(VERIFICATION artifact convention — frontmatter + prose + tables)

**Required schema (per D-12):**

The following H2 headings are MANDATORY (check-phase-48.mjs check 5 asserts exact text):
- `## Category A` — Broken Anchors
- `## Category B` — Broken File Paths
- `## Category C` — Deferred Stubs / Intentional

Full schema:
```markdown
---
phase: 48
slug: audit-harness-bootstrap-broken-link-sweep-first-pass
generated: 2026-04-26
sweep_tool: markdown-link-check 3.14.2
gfm_precheck: grep -rn "#[A-Z]" docs/
total_findings: <N>
---

# Phase 48: Broken-Link Sweep -- First-Pass Inventory

## Header

- **Phase:** 48
- **Generated:** 2026-04-26
- **Sweep tools:** markdown-link-check 3.14.2; grep -rn "#[A-Z]" docs/ (GFM capital-anchor precheck)
- **Total findings:** <N>  (Category A: <a>, Category B: <b>, Category C: <c>)
- **Scope:** 179 docs/**/*.md files; external MS Learn / docs.microsoft.com / portal URLs excluded

## Category A -- Broken Anchors

Broken #anchor references (GFM precheck + markdown-link-check anchor validation).

| File | Line | Link Target | Pre-existing? | Triage Decision |
|------|------|-------------|---------------|-----------------|
| example | 42 | #uppercase-Anchor | A pre-existing v1.0-v1.4.1 | (Phase 60) |

## Category B -- Broken File Paths

Broken relative file path references.

| File | Line | Link Target | Pre-existing? | Triage Decision |
|------|------|-------------|---------------|-----------------|
| example | 17 | ../missing-file.md | A pre-existing v1.0-v1.4.1 | (Phase 60) |

## Category C -- Deferred Stubs / Intentional

Intentional stubs or links to files planned but not yet created.

| File | Line | Link Target | Reason | Allowlist Entry |
|------|------|-------------|--------|-----------------|
| example | 5 | ./future-file.md | planned stub Phase 49 | n/a |

## Summary

| Category | Pre-existing (v1.0-v1.4.1) | New (Phase 48) | Total |
|----------|---------------------------|----------------|-------|
| A: Broken Anchors | <n> | 0 | <n> |
| B: Broken File Paths | <n> | 0 | <n> |
| C: Deferred/Intentional | <n> | 0 | <n> |
| Total | <n> | 0 | <n> |

All findings are pre-existing. Phase 60 second-pass triage will diff against this baseline.
```

Note: check-phase-48.mjs check 5 uses `/^## Category A/m.test(content)` -- the heading text before
any em-dash suffix must be exactly `## Category A`, `## Category B`, `## Category C`.
The ' -- Broken Anchors' portion can be on a subheading line or after the H2 text (planner discretion per Claude Discretion).

---

### `scripts/validation/regenerate-supervision-pins.mjs` (modified)

**Edit scope:** Lines 390-400 (BASELINE_9 array) + line 405 (doSelfTest sidecar path).

**Current BASELINE_9 at lines 390-400** (stale — 5 of 9 coordinate entries have drifted):
```javascript
const BASELINE_9 = [
  ['docs/_glossary-android.md', 65],
  ['docs/_glossary-android.md', 67],
  ['docs/_glossary-android.md', 134],
  ['docs/_glossary-android.md', 148],
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 35],
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]
];
```

Stale entries: `_glossary-android.md:65`, `:67`, `:134`, `:148`, `03-fully-managed-cobo.md:35`.
Executor must determine replacement values by running `--report` against the updated v1.5 sidecar
and identifying the S1..S9 original bridge-prose occurrences at their current line positions via
content inspection (see RESEARCH.md BASELINE_9 section, executor procedure steps 1-4).

**Line 405 — doSelfTest() sidecar path — one-line change:**

Current: `const allow = parseAllowlist('scripts/validation/v1.4-audit-allowlist.json');`
Change to: `const allow = parseAllowlist('scripts/validation/v1.5-audit-allowlist.json');`

**Atomicity constraint (Pitfall 3):** Sidecar coordinates updated FIRST, `--report` confirms stale count = 0,
THEN BASELINE_9 updated, THEN line 405 updated, THEN `--self-test` exits 0.
All three edits land in ONE atomic commit per D-14.

---

## Shared Patterns

### readFile() with CRLF normalization
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` lines 29-33 / `check-phase-31.mjs` lines 15-19
**Apply to:** `v1.5-milestone-audit.mjs`, `check-phase-48.mjs`

Pattern: `return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');`

### walkMd() recursive .md walker
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` lines 36-53
**Apply to:** `v1.5-milestone-audit.mjs`

Pattern: existsSync guard on dir; readdirSync/statSync in try-catch; push `.md` files to array.

### relNormalize() path normalizer
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` lines 70-72
**Apply to:** `v1.5-milestone-audit.mjs`

Pattern: strips `process.cwd()` prefix, converts backslashes to forward slashes (Windows compat).

### parseAllowlist() JSON graceful degradation
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` lines 57-65 / `check-phase-31.mjs` lines 31-39
**Apply to:** `v1.5-milestone-audit.mjs`

Pattern: null on missing file → empty arrays; JSON.parse in try-catch → `{ _parseError: ..., ...empty arrays }`

### ENOENT graceful-degradation for external tool calls
**Source:** `scripts/validation/check-phase-30.mjs` lines 268-279
**Apply to:** `check-phase-48.mjs` check 4, `v1.5-milestone-audit.mjs` C13

Pattern: catch checks `err.code === 'ENOENT'`, `err.status === 127`,
stderr fragments `'not found'`/`'Could not resolve'`/`'npm error could not determine executable'`.

### Informational check compact detail format (D-08)
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` line 382 (showDetail guard)
**Apply to:** C11, C12, C13 in `v1.5-milestone-audit.mjs`

Pattern: `informational: true` flag on check → runner shows detail on PASS unconditionally.
Always use `'(informational)'` — never hardcode phase numbers or finding counts per D-08.

### TEMPLATE-SENTINEL skip
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` line 268
**Apply to:** C10 in `v1.5-milestone-audit.mjs`

Pattern: `if (lvMatch[1] === '1970-01-01') continue;`

### D-24 underscore-dir-segment scope filter
**Source:** `scripts/validation/v1.4.1-milestone-audit.mjs` lines 114-121
**Apply to:** `linuxDocPaths()` in `v1.5-milestone-audit.mjs`

Pattern:
```
function hasUnderscoreDirSegment(relPath) {
  const segments = relPath.split('/');
  return segments.slice(0, -1).some(seg => /^_/.test(seg));
}
return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
```

### CI lazy-skip graceful-degradation job step
**Source:** RESEARCH.md CI Workflow section D-18 (new Phase 48 pattern)
**Apply to:** All 13 check-phase-NN jobs in `audit-harness-v1.5-integrity.yml`

Pattern:
```
if [ -f scripts/validation/check-phase-NN.mjs ]; then
  node scripts/validation/check-phase-NN.mjs
else
  echo "check-phase-NN.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"
fi
```

---

## No Analog Found

| File | Role | Data Flow | Reason |
|------|------|-----------|--------|
| `scripts/validation/pre-commit-advisory.sh` | utility / hook | event-driven (git pre-commit) | No pre-commit hook of any kind exists in repo. Only `.git/hooks/*.sample` files present (verified in RESEARCH.md). Content spec fully defined in RESEARCH.md Pre-Commit Advisory Hook section. |
| `.mlc-config.json` | config | — | No markdown-link-check config exists anywhere in repo. Content spec fully defined in RESEARCH.md .mlc-config.json Exact Flag Set section. |

---

## Metadata

**Analog search scope:** `scripts/validation/` (all .mjs files), `.github/workflows/`,
`.planning/milestones/v1.4.1-phases/43-*/`

**Files read:** `v1.4.1-milestone-audit.mjs` (391 lines), `v1.4.1-audit-allowlist.json` (41 lines),
`audit-harness-integrity.yml` (93 lines), `check-phase-30.mjs` (338 lines),
`check-phase-31.mjs` (lines 1-80), `43-VERIFICATION.md` (lines 1-60),
`regenerate-supervision-pins.mjs` lines 380-449 (BASELINE_9 region)

**Pattern extraction date:** 2026-04-26

**Load-bearing order constraint:** BASELINE_9 update must come AFTER sidecar coordinate refresh.
Sidecar updated first, `--report` confirms stale=0, then BASELINE_9 updated, then line 405 updated,
then `--self-test` exits 0. All three edits in one atomic commit per D-14 and RESEARCH.md Pitfall 3.
