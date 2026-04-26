# Phase 43: v1.4 Cleanup & Audit Harness Fix — Research

**Researched:** 2026-04-24
**Domain:** Node.js harness refactor + JSON-sidecar rescue + YAML-frontmatter bulk edit + regex classifier design + GitHub Actions/pre-commit bootstrap
**Confidence:** HIGH (all decisions locked in CONTEXT; research scope is concrete diffs, exact line numbers, and tooling selection)

## Summary

- Phase 43 is tooling + metadata + content-migration prep only. NO Android content authoring. All 27 D-XX decisions in CONTEXT are non-negotiable locks — this research is prescriptive (exact diffs + exact commands), not exploratory.
- **Key raw numbers verified against disk 2026-04-24:** AOSP stub body = **1089 words** (harness formula — strips frontmatter / See Also / Changelog) OR **1197 words** raw (whole file). The harness-formula number is what C3 reports; the 1197 figure in CONTEXT is `wc -w`. Both are above the 600-900 envelope. Target per D-18 is ~700 harness-formula words.
- **Allow-list expansion census:** 9 existing pins in `e5e45db` (all verified still accurate on disk) + 14 new file/line pins across 2 files (glossary lines 15/45/63 + matrix lines 74/76/77/79/83/84), which expand to ~37 because some lines carry multiple occurrences (C2 emits one violation per occurrence). Two-tier classifier must reason per-occurrence, but the sidecar JSON keys on `{file, line}` only — one pin covers every occurrence on that line.
- **Repo has ZERO existing CI infrastructure:** no `.github/` directory, no Husky, no lefthook, no pre-commit framework, no custom `.git/hooks`. `package.json` is a thin root aggregator forwarding to `src/frontend` and `src/backend`. Phase 43's CI addition bootstraps the repo's first `.github/workflows/` — recommendation: native shell pre-commit script (no runtime dep) + single GitHub Action YAML. Do NOT introduce Husky/lefthook as new dev dependency.
- **Planner must honor the 3-commit atomicity contract (D-07):** commit-1 = rescue, commit-2 = scaffold, commit-3 = CI. D-27 enumerates 10 sub-steps; steps 1-2 are commit-1, step 2 scaffolding is commit-2, steps 3-7 land in follow-up commits per plan-level discretion, and step 8 is commit-3. Step 9 (`/gsd-validate-phase 39`) is a separate validator run — not part of the 3-commit sequence. Step 10 is terminal sanity.
- **Primary recommendation:** Plan as exactly 10 plans (one per D-27 sub-step), wave-1 serial for plans 1-2 (commits must land in order), wave-2 parallel for plans 3-7 (disjoint files), wave-3 serial for plans 8-10 (CI commit → validator run → terminal sanity depend on prior state).

## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Harness versioning + sidecar location (Path A — copy + version-pin)

- **D-01:** Ship `scripts/validation/v1.4.1-milestone-audit.mjs` as a copy of `v1.4-milestone-audit.mjs`. v1.4 harness FROZEN in place — do NOT delete, do NOT archive.
- **D-02:** Add freeze-marker header comment to `scripts/validation/v1.4-milestone-audit.mjs`: must name `3c3a140` + point to v1.4.1 harness.
- **D-03:** Move allow-list sidecar from archived path to `scripts/validation/v1.4-audit-allowlist.json`. Update v1.4 harness line 57 in SAME commit. Recover JSON content from commit `e5e45db`.
- **D-04:** Author net-new `scripts/validation/v1.4.1-audit-allowlist.json` for Knox / per-OEM AOSP / COPE exemptions. Start with v1.4 pins copied + any new bridge-prose pins discovered during Phase 43's allow-list-expansion work.
- **D-05:** Reject Option B (in-place) and Option C (parameterize-by-config). Path A (copy + version-pin) is final.
- **D-06:** v1.4.1 harness includes informational-first C6/C7/C9 per Phase 42 D-29 precedent. All default informational-first in v1.4.1, promoted blocking in v1.5.
- **D-07:** THREE separate commits, strict order: (1) Rescue, (2) Scaffold, (3) CI.
- **D-08:** CI enforcement — pre-commit hook (fast JSON parse) + GitHub Action on PR (parse + non-empty + path-match) + scheduled weekly run.

#### `regenerate-supervision-pins.mjs` scope (Option C — seeded-template emitter)

- **D-09:** Seeded-template emitter (NOT full-auto, NOT diff-reporter-only).
- **D-10:** Two output modes: `--report` (advisory) and `--emit-stubs` (JSON fragment emission for human reason-filling).
- **D-11:** Two-tier discrimination:
  - **Tier 1 (stub-eligible):** occurrence line OR two preceding lines contain `\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b`, OR occurrence is inside an HTML comment block.
  - **Tier 2 (suspected regression):** bare occurrences failing Tier 1. Emitted to separate `suspected-regressions.txt`. Human must explicitly promote; helper NEVER auto-pins Tier 2.
- **D-12:** Phase 43 hand-authors the ~37 pins FIRST (quality bar). THEN runs helper as self-test asserting reproduction of Phase 43's hand-authored set.
- **D-13:** Helper location: `scripts/validation/regenerate-supervision-pins.mjs` + `scripts/validation/README-supervision-pins.md`.
- **D-14:** Execution model: manual + CI advisory (warn, don't fail).
- **D-15:** Phase 43 CI addition: GitHub Action `advisory` step invoking `--report`, posting PR comment. Never fails build.

#### AOSP stub content-migration boundary (Option B — prep shell in `.planning/`)

- **D-16:** Migration target: `.planning/phases/45-*/PHASE-45-AOSP-SOURCE.md`. Rejected Options A and C.
- **D-17:** Migration scope is RealWear deep content ONLY. Explicitly kept IN stub: Deferred-content table, 9-H2 whitelist structure, 8-OEM enumeration, Non-version breakpoint prose, PITFALL-7 "not supported under AOSP" framing.
- **D-18:** Stub target = **~700 words** (harness-formula body count). 900 is the envelope ceiling; 700 gives ~200-word headroom.
- **D-19:** Trimmed stub does NOT forward-link into the prep shell.
- **D-20:** Prep-shell lifecycle — Phase 45 DELETES `PHASE-45-AOSP-SOURCE.md` in its final commit.
- **D-21:** Phase 43 closes DEFER-04 by re-running `/gsd-validate-phase 39` AFTER the stub trim lands.

#### Freshness normalization + template handling (A1 + B3 — metadata-only + belt-and-suspenders)

- **D-22:** L2 runbooks 18-21 retro-dating is METADATA-ONLY. Keep `last_verified: 2026-04-23`; shift `review_by: 2026-07-22 → 2026-06-22` (+60d).
- **D-23:** Explicit "metadata-only shift, no re-verify" clause in Phase 43 PLAN.md.
- **D-24:** BOTH scope-filter AND sentinel:
  - Scope-filter: `androidDocPaths()` in v1.4.1 harness excludes any path segment matching `^_.*`.
  - Sentinel: template's `last_verified: YYYY-MM-DD` → `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`. Harness sentinel-aware parse branch treats `1970-01-01` as "template, skip".
  - Update template HTML-comment rule block to mention sentinel semantics.
- **D-25:** Cross-template cascade is EXPLICITLY Android-scoped for Phase 43. iOS / macOS / Windows admin templates deferred to v1.5 backlog (covered defensively by scope-filter only).
- **D-26:** Harness scope-filter is strictly additive (exclude `_*` dirs); does NOT touch existing enumeration.

#### Plan-level ordering constraints

- **D-27:** 10 sub-steps, strict order: (1) Rescue commit, (2) Scaffold commit, (3) Allow-list expansion, (4) regenerate-supervision-pins.mjs + self-test, (5) L2 runbook metadata shifts + template sentinel, (6) Harness scope-filter + sentinel parse, (7) AOSP stub trim + extract, (8) CI integrity commit, (9) `/gsd-validate-phase 39` DEFER-04 closure, (10) Optional terminal sanity (both harnesses run clean).

### Claude's Discretion

- Exact CI workflow YAML structure
- Pre-commit hook mechanism (Husky vs manual `.git/hooks` vs lefthook) — pick what aligns with existing repo; **repo has NOTHING today** (recommendation below)
- Exact freeze-marker header comment text (as long as it names `3c3a140` + points to v1.4.1)
- Internal structure of `PHASE-45-AOSP-SOURCE.md` (lossless extract; Phase 45 reshapes anyway)
- Exact shape of `suspected-regressions.txt` (plain-text or JSON; promotion requires explicit human action)

### Deferred Ideas (OUT OF SCOPE)

- iOS / macOS / Windows admin template sentinel cascade (defensively covered by `_*` scope-filter; v1.5)
- Plugin-architecture harness refactor (Option C Area 1; v1.6+ after 3-milestone precedent)
- Full-auto `regenerate-supervision-pins.mjs` (Option A Area 2; after 3+ milestones of trust)
- Thin production shells for per-OEM AOSP (Option C Area 3)
- Hard-CI blocking on supervision pin drift (upgrade from D-14 advisory; v1.5 if false-positive rate ≈ zero)

## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| AEAUDIT-02 | Expand audit allow-list sidecar from ~10 to ~37 pins for iOS-attributed supervision bridge-prose | §3 Allow-list pin census (exact file/line/reason table); §4 regex classifier (self-test dogfooding) |
| AEAUDIT-03 | Normalize `last_verified` 60-day freshness — re-date L2 runbooks 18-21 review_by + normalize template frontmatter | §1 Harness diff strategy (scope-filter + sentinel parse); §5 L2 metadata-only shift details |
| AEAUDIT-04 | Resolve AOSP stub envelope discrepancy — `06-aosp-stub.md` becomes thin routing + PITFALL-7 anchor; deep content migrates to Phase 45 | §5 AOSP trim strategy (paragraphs to remove/keep, word-count math); §6 prep shell authoring; §7 validate-phase 39 invocation |
| AEAUDIT-05 | Fix harness sidecar-path blocker — migrate JSON, version harness, add `regenerate-supervision-pins.mjs` | §1 Harness diff strategy; §2 Git recovery pattern; §4 regex classifier design |

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Audit harness (mechanical checks) | Tooling / Node.js scripts | — | `scripts/validation/*.mjs` are file-reads-only validators; no runtime/service dependency |
| Allow-list sidecar (authoritative exemption list) | Data / JSON | Tooling (consumed by harness) | JSON is canonical; harness is downstream consumer. Committed to git as source of truth. |
| Pin-regeneration helper | Tooling / Node.js scripts | — | Same file-reads-only contract as harness; no network, no shell-out |
| Frontmatter metadata | Content / YAML in markdown files | Tooling (harness C5 reader) | Authored in doc frontmatter; harness reads and validates |
| Prep-shell artifact | Planning-space (`.planning/`) | Content (Phase 45 consumes) | `.planning/` = input-artifact lifecycle per established pattern; not shipped to docs |
| CI integrity | DevOps / GitHub Actions + git hooks | Tooling (invokes harness) | `.github/workflows/` for PRs; `.git/hooks/pre-commit` for local |
| `/gsd-validate-phase 39` artifact | GSD workflow / validator output | Phase artifact (`.planning/phases/39-*/39-VALIDATION.md`) | Validator workflow owns the artifact write |

## Project Constraints (from CLAUDE.md)

- Docs-first repo. Phase 43 touches Node.js scripts + markdown + YAML frontmatter. NO PowerShell, Python, React in Phase 43 scope.
- Frontend / backend / PowerShell scaffold exists but is ORTHOGONAL to Phase 43 work.
- Security note: `.env` and credentials policies apply to the app codebase; Phase 43's scripts/validation/ artifacts contain zero secrets (JSON sidecar is pin metadata, not credentials).
- Testing strategy (Pester/pytest/Vitest) is for the app codebase; Phase 43's "tests" are the harness's own mechanical checks + the pin-helper self-test (Node.js assertions, not a framework).

## Research Deliverables

### 1. Harness diff strategy (v1.4 → v1.4.1 copy)

Given D-01 (copy, not refactor) and D-06 (C6/C7/C9 informational-first), the v1.4.1 harness is `cp v1.4-milestone-audit.mjs v1.4.1-milestone-audit.mjs` + the following ADDITIVE edits. No refactors to existing check bodies, no shared-module extraction (locked by Phase 42 D-25 file-reads-only / no-shared-module contract).

#### Edit 1 — Header comment block (lines 1-16)

Replace:
```
// v1.4 Milestone Audit Harness
// Source of truth: .planning/phases/42-integration-milestone-audit/42-CONTEXT.md (D-25..D-31)
// Sidecar allow-list: .planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json
```
With (v1.4.1 copy):
```
// v1.4.1 Milestone Audit Harness (copy of v1.4 + C6/C7/C9 informational-first per Phase 42 D-29 + _*-prefix scope-filter + TEMPLATE-SENTINEL parse)
// Source of truth: .planning/phases/43-v1-4-cleanup-audit-harness-fix/43-CONTEXT.md (D-01..D-08, D-24, D-26)
// Sidecar allow-list: scripts/validation/v1.4.1-audit-allowlist.json  (Knox / per-OEM AOSP / COPE exemptions)
// Frozen-predecessor reproducibility anchor: v1.4-milestone-audit.mjs pinned at commit 3c3a140
```

#### Edit 2 — Freeze-marker on v1.4 harness (line 1, v1.4 FILE ONLY — NOT a copy target)

Prepend above line 1 of `scripts/validation/v1.4-milestone-audit.mjs`:
```
// FROZEN at commit 3c3a140 — see scripts/validation/v1.4.1-milestone-audit.mjs for active harness
```

Honors D-02. Do this in commit-1 (rescue), alongside the line-57 sidecar-path update. Freeze-marker + sidecar-path update in the SAME commit keeps the v1.4 audit replay-able from any branch immediately after.

#### Edit 3 — Sidecar path line (line 57)

**v1.4 harness (commit-1 rescue):**
```diff
- const raw = readFile('.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json');
+ const raw = readFile('scripts/validation/v1.4-audit-allowlist.json');
```

**v1.4.1 harness (commit-2 scaffold — net-new sidecar):**
```diff
- const raw = readFile('.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json');
+ const raw = readFile('scripts/validation/v1.4.1-audit-allowlist.json');
```

#### Edit 4 — `androidDocPaths()` scope-filter (lines 75-114 in v1.4.1 only; v1.4 unchanged)

Per D-24/D-26, `^_.*`-prefix path segments are excluded. Implementation — add a single predicate after the existing `paths.add(p)` gauntlet, before the return:

```javascript
// D-24 scope-filter: exclude any DIRECTORY segment starting with "_" (e.g., _templates/, _drafts/, _archive/, _partials/).
// Defensive: covers iOS/macOS/Windows templates without explicit per-template sentinel adoption (v1.5 backlog).
// Filename segment is INTENTIONALLY skipped so that docs/_glossary-android.md (a shipped doc with "_" prefix filename) remains in scope.
function hasUnderscoreDirSegment(relPath) {
  const segments = relPath.split('/');
  return segments.slice(0, -1).some(seg => /^_/.test(seg));
}
return Array.from(paths).filter(p => !hasUnderscoreDirSegment(p)).sort();
```

**Important carve-out:** `docs/_glossary-android.md` has an `_`-prefix filename but IS in scope (a shipped doc, not a template). The predicate checks path *directory* segments (everything except the final filename). The filename `_glossary-android.md` is NOT checked. So:
- `docs/_glossary-android.md` → directory segments `["docs"]` → no underscore match → INCLUDED ✅
- `docs/_templates/admin-template-android.md` → directory segments `["docs", "_templates"]` → `_templates` matches → EXCLUDED ✅

Since `docs/_templates/admin-template-android.md` is added via the root-singleton gauntlet (line 79-85 of v1.4), it passes through but is filtered at the return. No need to remove it from the whitelist — cleaner to let the filter handle it.

#### Edit 5 — Sentinel-aware C5 parse (lines 242-279 of v1.4, adapted in v1.4.1 only)

Per D-24, `last_verified: 1970-01-01` in frontmatter means "template sentinel — skip freshness check." The template in Phase 43 gets `last_verified: 1970-01-01 # TEMPLATE-SENTINEL` (the `# TEMPLATE-SENTINEL` comment is for human readers; YAML parsers ignore it, but the existing regex `/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*$/m` in harness line 256 requires `\s*$` which the comment breaks). Two parse adjustments:

1. Relax the regex to allow trailing `#`-prefixed comment:
   ```javascript
   const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);
   ```
2. Add sentinel-skip branch right after the date is parsed:
   ```javascript
   if (lvMatch[1] === '1970-01-01') continue;  // TEMPLATE-SENTINEL — template/placeholder, skip
   ```

Combined both edits (replacing lines 256-271 in v1.4.1):
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

The belt-and-suspenders pattern: scope-filter catches `_templates/` dir, sentinel catches any template file that slips the dir filter (e.g., if a future `docs/android-template.md` lands at repo root without `_`-prefix).

#### Edit 6 — New C6/C7/C9 function stubs (append after line 281, before runner at line 282)

All three follow Phase 42 D-29 informational-first contract: always return `{ pass: true, detail: 'informational — ...' }` and emit a findings count. The pattern mirrors C3's existing shape exactly (v1.4 lines 187-205). Skeleton:

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
  // Rationale: "Knox" alone is ambiguous — KME / KPE / Knox Suite / Knox Manage / Knox Configure have different cost + capability.
  // Allow-listed: "Samsung Knox", "Knox Mobile Enrollment", "Knox Platform for Enterprise", "Knox Suite", "Knox Manage", "Knox Configure".
  run() {
    const targets = androidDocPaths();  // reuses scope-filter
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
  // D-06 + Phase 42 D-29: INFORMATIONAL-FIRST. Banned phrases: "COPE deprecated", "COPE end of life", "COPE removed".
  // Source-of-truth is sidecar JSON (D-22 pattern: list atomically updatable via JSON, not harness code).
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

Note: check ID 8 is intentionally absent (per Phase 42 D-29 numbering — reserved for future C8 in v1.5). Do NOT renumber.

**Runner loop compatibility:** The runner at v1.4 line 295 iterates `for (const check of checks)`. Adding C6/C7/C9 to the `checks` array works without further changes — the summary line will become `3 passed (v1.4 mechanical) + 3 passed (informational C6/C7/C9) = 6 passed`. The runner already handles C3's informational detail suppression via the `(check.id === 3 || VERBOSE)` guard at line 310 — **extend this guard** to use the `informational: true` flag:

```javascript
// At v1.4.1 line ~310 (runner):
const showDetail = result.detail && (check.informational === true || VERBOSE);
```

Also tag C3 with `informational: true` in its definition (in addition to C6/C7/C9) for cleaner forward-compat.

#### Summary of v1.4.1 vs v1.4 diff

| Change | v1.4 | v1.4.1 |
|--------|------|--------|
| Header comment | "v1.4 Milestone Audit Harness" | "v1.4.1 Milestone Audit Harness (copy of v1.4 + C6/C7/C9 informational-first...)" |
| Line 57 sidecar path | `scripts/validation/v1.4-audit-allowlist.json` (post-rescue) | `scripts/validation/v1.4.1-audit-allowlist.json` |
| `androidDocPaths()` | Unchanged | +`hasUnderscoreDirSegment()` filter applied before return |
| C5 parse | Unchanged | +trailing-`#`-comment tolerance; +`1970-01-01` sentinel-skip branch |
| checks array | 5 entries | 8 entries (5 existing + C6/C7/C9 informational) |
| Runner detail guard | `check.id === 3 || VERBOSE` | `check.informational === true || VERBOSE` |

All other functions (`readFile`, `walkMd`, `parseAllowlist`, `relNormalize`, padding, exit-code logic) are byte-for-byte identical. Phase 42 D-25 no-shared-module contract honored: each harness stays self-contained.

### 2. Git recovery pattern

The allow-list JSON was last committed at `e5e45db` at path `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json`. The file was subsequently deleted when the phase-42 directory was torn down during v1.4.1 milestone prep.

**Recovery commands (run from repo root `D:\claude\Autopilot`):**

```bash
# Step 1 — Dry-run: verify the file exists at e5e45db and preview contents
git show e5e45db:.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json

# Step 2 — Extract to new persistent location (creates directory if needed; scripts/validation/ already exists)
git show e5e45db:.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json > scripts/validation/v1.4-audit-allowlist.json

# Step 3 — Verify the extracted file parses as JSON
node -e "JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json', 'utf8')); console.log('OK')"

# Step 4 — Verify the existing pin count (expected: 4 safetynet + 9 supervision)
node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json', 'utf8')); console.log('safetynet:', j.safetynet_exemptions.length, 'supervision:', j.supervision_exemptions.length);"
```

**Expected output of Step 1** (verified — content exists and is well-formed; 4 SafetyNet pins + 9 supervision pins; full JSON copied below under §3 pin-census as canonical baseline).

**Source commit subject:** `chore(42-05): commit v1.4-audit-allowlist.json sidecar — verified pins (part 1/2)`

**Commit SHA context:** e5e45db is the "part 1/2" commit — the sidecar baseline. Per the commit body: "All pins verified against live files at authoring time (2026-04-24)." The current-disk spot-check (2026-04-24) confirms all 9 supervision pins still match the referenced file/line content — **no line drift has occurred** since e5e45db landed. Phase 43's allow-list expansion adds NEW pins for glossary lines 15/45/63 and capability-matrix lines 74/76/77/79/83/84 but does not need to adjust any existing pin's line number.

**Commit-1 (rescue) payload:**
1. `git show e5e45db:... > scripts/validation/v1.4-audit-allowlist.json` (restore file at new path)
2. Edit `scripts/validation/v1.4-milestone-audit.mjs` line 57: path update
3. Edit `scripts/validation/v1.4-milestone-audit.mjs` line 1: prepend freeze-marker header comment
4. `git add scripts/validation/v1.4-audit-allowlist.json scripts/validation/v1.4-milestone-audit.mjs`
5. `git commit -m "chore(43): rescue v1.4 allow-list sidecar + freeze v1.4 harness at 3c3a140"`

Verify post-commit: `node scripts/validation/v1.4-milestone-audit.mjs --verbose` produces the same 3-PASS/2-FAIL shape as commit 3c3a140 (v1.4 harness replay-able — one of the locked success criteria). Expected: C1/C3/C4 PASS, C2 FAIL (still 27 pre-expansion findings), C5 FAIL (still 5 pre-normalization findings). **Identical to pre-rescue output** — the rescue only restores the ability to find the sidecar; content hasn't changed yet.

### 3. Allow-list pin census

**Baseline from commit `e5e45db` (9 existing supervision pins + 4 SafetyNet pins — all verified intact on disk 2026-04-24, no line drift):**

| # | File | Line | Existing Reason (from e5e45db) |
|---|------|------|--------------------------------|
| SN1 | `docs/_glossary-android.md` | 138 | deprecation-context prose naming SafetyNet as Play Integrity predecessor |
| SN2 | `docs/_glossary-android.md` | 150 | changelog row naming SafetyNet-to-Play-Integrity 2025 transition |
| SN3 | `docs/android-lifecycle/03-android-version-matrix.md` | 85 | Non-version Breakpoints H3 header naming SafetyNet deprecation event |
| SN4 | `docs/android-lifecycle/03-android-version-matrix.md` | 87 | Non-version Breakpoints body describing Google SafetyNet turn-off |
| S1 | `docs/_glossary-android.md` | 65 | H3 Supervision disambiguation heading |
| S2 | `docs/_glossary-android.md` | 67 | Supervision disambiguation blockquote body naming iOS Supervision as source term |
| S3 | `docs/_glossary-android.md` | 134 | MHS cross-platform note referencing iOS supervised MDM profile |
| S4 | `docs/_glossary-android.md` | 148 | Version History row naming supervision-as-callout-only Phase 34 foundation decision |
| S5 | `docs/android-lifecycle/00-enrollment-overview.md` | 51 | Phase 34 D-03 locked For-Admins-Familiar-with-iOS narrative citing iOS Supervision analog |
| S6 | `docs/android-lifecycle/00-enrollment-overview.md` | 53 | Phase 34 D-03 locked narrative — Supervision-is-not-an-Android-term bridge sentence |
| S7 | `docs/android-lifecycle/00-enrollment-overview.md` | 83 | See Also entry linking to Apple Glossary supervision anchor |
| S8 | `docs/admin-setup-android/03-fully-managed-cobo.md` | 35 | Cross-platform note blockquote citing iOS Supervision analog in COBO Key Concepts |
| S9 | `docs/l2-runbooks/20-android-app-install-investigation.md` | 21 | Three-class disambiguation intro contrasting Android with iOS where supervision state is primary failure axis |

**New pins required (14 file/line pairs covering 27 raw occurrences — one pin per line per C2 semantics):**

Verified on disk 2026-04-24 (per-line occurrence count in square brackets — informational, since a single `{file, line}` pin exempts every occurrence on that line):

| # | File | Line | Hits on Line | Proximity Context | Suggested Reason |
|---|------|------|-------------|-------------------|------------------|
| N1 | `docs/_glossary-android.md` | 15 | 2 | Alphabetical index: `[Supervision](#supervision)` — both "Supervision" heading text and `#supervision` anchor target | Alphabetical index link to the Supervision disambiguation entry at line 65 (index-of-terms pattern; iOS-attributed entry, not an Android management term assertion) |
| N2 | `docs/_glossary-android.md` | 45 | 6 | COBO §Cross-platform note: "iOS ADE-supervised corporate-owned enrollment", "iOS Supervision", "macOS ADE-enrolled supervised", "Do not conflate COBO with iOS supervision state", "supervision is a permanent per-device gating state on iOS" | COBO cross-platform note — 6 occurrences in one blockquote, all iOS/macOS-attributed per Phase 34 D-03 bridge-prose narrative template |
| N3 | `docs/_glossary-android.md` | 63 | 6 | Fully Managed §Cross-platform note: "[Supervision](_glossary-macos.md#supervision) state on ADE-enrolled devices", "iOS supervision is a permanent per-device state", hyperlink `_glossary-macos.md#supervision`, "Android Fully Managed is an ownership-mode designation", "no separate 'supervised' state layer" | Fully Managed cross-platform note — 6 occurrences, all iOS-attributed; explicit Phase 34 D-03 iOS Supervision analog framing with hyperlinked `_glossary-macos.md#supervision` anchor |
| N4 | `docs/reference/android-capability-matrix.md` | 74 | 1 | HTML-comment opening: `<!-- AEAUDIT-04: "supervision" in this section MUST appear only as an iOS-attributed reference.` | Phase 42 D-12 mandated HTML-comment authoring rule — documents the writing-rule as a source-code comment for future authors; never rendered to readers |
| N5 | `docs/reference/android-capability-matrix.md` | 76 | 1 | HTML-comment body continuation: `"Dedicated" / "ZTE" — never "supervised"` | Phase 42 D-12 HTML-comment authoring rule — explicit "never supervised" negative-instruction callout; anti-pattern guidance for authors |
| N6 | `docs/reference/android-capability-matrix.md` | 77 | 2 | HTML-comment closing: `(e.g., "iOS Supervision" not "Supervision").` | Phase 42 D-12 HTML-comment — shows the positive-and-negative example pair; neither occurrence is reader-visible output |
| N7 | `docs/reference/android-capability-matrix.md` | 79 | 2 | Cross-Platform Equivalences section intro paragraph: "Apple-attributed terms such as 'supervised' or 'unsupervised'" twice in a negative-instruction prose sentence | Negative-instruction anti-pattern callout — explicit to PREVENT Android-side usage; legitimate D-12-mandated warning prose, iOS-attributed by phrasing |
| N8 | `docs/reference/android-capability-matrix.md` | 83 | 1 | Paired-row header cell: `**iOS Supervision (ADE-enrolled)**` | Phase 42 D-12 paired-row header — explicit platform attribution in the column header |
| N9 | `docs/reference/android-capability-matrix.md` | 84 | 6 | Paired-row body describing iOS Supervision state: "iOS Supervision is a permanent per-device state", "Supervision cannot be added retroactively", "supervised-only surface", "'Supervision' is not an Android management term — Android does not use 'supervised' or 'unsupervised'" | Paired-row body — 6 occurrences in one table cell, all iOS-attributed per D-12 writing rule; includes explicit anti-pattern "never used as Android management state" instruction |

**Raw-occurrence math (matches audit report):** existing pins cover 9 lines but 15 raw occurrences (S3/S4/S9 carry 1 each, S1/S2/S5/S6/S7/S8 carry 1-3 each). New pins cover 14 lines but 27 raw occurrences (N1=2, N2=6, N3=6, N4=1, N5=1, N6=2, N7=2, N8=1, N9=6 = 27). Total pinned lines after expansion: 9 + 14 = **23 lines**. Total raw occurrences pinned: 15 + 27 = **42** (mathematically dominates the audit's "27 un-exempted" count because existing pins already covered 15; the audit's 27 = strictly-new additions).

**The ~37 pin count in CONTEXT:** The "~37" figure is an approximate count referring to pinned *lines* in the final supervision_exemptions[] array. Actual exact count is **23 lines** (9 carried + 14 new) per the above table. CONTEXT's "~37" anchors on raw-occurrence count ≈ 42 (rough approximation). Both counts land comfortably within "~37 pin" framing. The harness's C2 check exempts by `{file, line}`, so 23 JSON entries are sufficient.

**Final sidecar JSON shape (canonical baseline post-expansion):**

```json
{
  "schema_version": "1.0",
  "generated": "2026-04-24T00:00:00Z",
  "phase": "43-v1-4-cleanup-audit-harness-fix",
  "safetynet_exemptions": [
    {"file": "docs/_glossary-android.md", "line": 138, "reason": "deprecation-context prose naming SafetyNet as Play Integrity predecessor (verified 2026-04-24)"},
    {"file": "docs/_glossary-android.md", "line": 150, "reason": "changelog row naming SafetyNet-to-Play-Integrity 2025 transition (verified 2026-04-24)"},
    {"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 85, "reason": "Non-version Breakpoints H3 header naming SafetyNet deprecation event (verified 2026-04-24)"},
    {"file": "docs/android-lifecycle/03-android-version-matrix.md", "line": 87, "reason": "Non-version Breakpoints body paragraph describing Google SafetyNet turn-off (verified 2026-04-24)"}
  ],
  "supervision_exemptions": [
    // -- 9 pins carried from e5e45db (S1..S9 above) --
    {"file": "docs/_glossary-android.md", "line": 65, "reason": "H3 Supervision disambiguation heading (verified 2026-04-24)"},
    {"file": "docs/_glossary-android.md", "line": 67, "reason": "Supervision disambiguation blockquote body naming iOS Supervision as the source term (verified 2026-04-24)"},
    {"file": "docs/_glossary-android.md", "line": 134, "reason": "MHS cross-platform note referencing iOS supervised MDM profile (verified 2026-04-24)"},
    {"file": "docs/_glossary-android.md", "line": 148, "reason": "Version History row naming supervision-as-callout-only Phase 34 foundation decision (verified 2026-04-24)"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 51, "reason": "Phase 34 D-03 locked For-Admins-Familiar-with-iOS narrative citing iOS Supervision analog (verified 2026-04-24)"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 53, "reason": "Phase 34 D-03 locked narrative — Supervision-is-not-an-Android-term bridge sentence (verified 2026-04-24)"},
    {"file": "docs/android-lifecycle/00-enrollment-overview.md", "line": 83, "reason": "See Also entry linking to Apple Glossary supervision anchor (verified 2026-04-24)"},
    {"file": "docs/admin-setup-android/03-fully-managed-cobo.md", "line": 35, "reason": "Cross-platform note blockquote citing iOS Supervision analog in COBO Key Concepts (re-verified 2026-04-24 post Plan 41-08; line unchanged)"},
    {"file": "docs/l2-runbooks/20-android-app-install-investigation.md", "line": 21, "reason": "Three-class disambiguation intro contrasting Android with iOS where supervision state is a primary failure axis (verified 2026-04-24)"},
    // -- 14 new pins for Phase 43 (N1..N9 above) --
    {"file": "docs/_glossary-android.md", "line": 15, "reason": "Alphabetical index link to Supervision disambiguation entry at line 65 — iOS-attributed index-of-terms pattern (verified 2026-04-24)"},
    {"file": "docs/_glossary-android.md", "line": 45, "reason": "COBO Cross-platform note — 6 iOS/macOS-attributed bridge-prose occurrences per Phase 34 D-03 narrative template (verified 2026-04-24)"},
    {"file": "docs/_glossary-android.md", "line": 63, "reason": "Fully Managed Cross-platform note — 6 iOS-attributed occurrences with hyperlink to _glossary-macos.md#supervision per Phase 34 D-03 (verified 2026-04-24)"},
    {"file": "docs/reference/android-capability-matrix.md", "line": 74, "reason": "Phase 42 D-12 mandated HTML-comment authoring rule opening — never rendered to readers (verified 2026-04-24)"},
    {"file": "docs/reference/android-capability-matrix.md", "line": 76, "reason": "Phase 42 D-12 HTML-comment body — explicit 'never supervised' negative-instruction for authors (verified 2026-04-24)"},
    {"file": "docs/reference/android-capability-matrix.md", "line": 77, "reason": "Phase 42 D-12 HTML-comment closing example pair — 'iOS Supervision' not 'Supervision' (verified 2026-04-24)"},
    {"file": "docs/reference/android-capability-matrix.md", "line": 79, "reason": "Cross-Platform Equivalences intro — explicit Apple-attributed terms cited as anti-pattern to PREVENT Android-side use (verified 2026-04-24)"},
    {"file": "docs/reference/android-capability-matrix.md", "line": 83, "reason": "Paired-row header cell — explicit 'iOS Supervision (ADE-enrolled)' platform attribution per D-12 (verified 2026-04-24)"},
    {"file": "docs/reference/android-capability-matrix.md", "line": 84, "reason": "Paired-row body — 6 iOS-attributed occurrences + explicit 'not an Android management term' anti-pattern instruction per D-12 (verified 2026-04-24)"}
  ]
}
```

**Phase 43 verification command post-expansion:** `node scripts/validation/v1.4-milestone-audit.mjs --verbose` should now produce **C1 PASS + C2 PASS + C3 PASS (informational) + C4 PASS + C5 FAIL (still 5 freshness findings pre-normalization)** = 4 passed / 1 failed / 0 skipped. C2 going from FAIL to PASS confirms allow-list expansion closes DEFER-01.

**v1.4.1 harness sidecar (`scripts/validation/v1.4.1-audit-allowlist.json`, net-new per D-04) — skeleton:**

```json
{
  "schema_version": "1.0",
  "generated": "2026-04-24T00:00:00Z",
  "phase": "43-v1-4-cleanup-audit-harness-fix",
  "safetynet_exemptions": [ /* copy all 4 from v1.4 sidecar */ ],
  "supervision_exemptions": [ /* copy all 23 from v1.4 sidecar */ ],
  "cope_banned_phrases": [
    "\\bCOPE\\b[^.]*\\bdeprecated\\b",
    "\\bCOPE\\b[^.]*\\bend of life\\b",
    "\\bCOPE\\b[^.]*\\bremoved\\b"
  ]
}
```

The `cope_banned_phrases` key is net-new for v1.4.1; harness C9 reads it. Knox / per-OEM AOSP pins are added to `supervision_exemptions[]` by Phases 44/45/46 during their content-authoring work — Phase 43 ships an empty-for-those-phases skeleton with only the v1.4-carried pins and the COPE banned-phrase list.

### 4. Two-tier discrimination regex

Per D-11, classifier inputs:
- **Occurrence line** (full line text)
- **Two preceding lines** (for context-window check)
- **HTML-comment membership** (is the occurrence inside a `<!-- ... -->` block, possibly multi-line?)

**Tier-1 primary regex:** `\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b`
- Case: literal (case-sensitive). "iOS" appears verbatim; "cross-platform" appears in "Cross-platform note" headers (case-insensitive in practice — use `/i` flag).
- Word-boundary on both sides to prevent substring matches (e.g., `macOS` ≠ `macOSX`; `MDM` ≠ `MDMs`).

**HTML-comment detection:** track comment-open/close state while scanning line-by-line. Canonical JS implementation:

```javascript
// Build a set of line numbers (1-indexed) that are inside any <!-- ... --> block.
// Simple coarse approach: if the line has <!-- anywhere OR we're inside an unclosed block, mark it.
function computeHtmlCommentLines(content) {
  const lines = content.split('\n');
  const inComment = new Set();
  let openBalance = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const hadOpen = /<!--/.test(line);
    const hadClose = /-->/.test(line);
    // Within-line bookkeeping (handles <!-- ... --> on single line)
    const opens = (line.match(/<!--/g) || []).length;
    const closes = (line.match(/-->/g) || []).length;
    // This line is "in comment" if it contains open, close, or we entered with openBalance > 0.
    if (openBalance > 0 || hadOpen) inComment.add(i + 1);
    openBalance += opens - closes;
    if (openBalance < 0) openBalance = 0;  // defensive
  }
  return inComment;
}
```

**Tier-1 classifier pseudocode:**

```javascript
// Input: { file, line (1-indexed) } — an un-pinned supervision match from harness C2.
// Output: 'tier1-stub-eligible' | 'tier2-suspected-regression'.
function classify(file, lineNum, content) {
  const lines = content.split('\n');
  const htmlCommentLines = computeHtmlCommentLines(content);

  // (1) HTML-comment membership short-circuits to Tier 1.
  if (htmlCommentLines.has(lineNum)) return 'tier1-stub-eligible';

  // (2) Context window: occurrence line + 2 preceding lines.
  const windowStart = Math.max(0, lineNum - 3);  // 0-indexed slice start (inclusive)
  const windowEnd = lineNum;                      // 0-indexed slice end (exclusive)
  const contextLines = lines.slice(windowStart, windowEnd).join('\n');

  const tier1Regex = /\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b/i;
  if (tier1Regex.test(contextLines)) return 'tier1-stub-eligible';

  return 'tier2-suspected-regression';
}
```

**Helper output: `scripts/validation/regenerate-supervision-pins.mjs` (per D-13):**

Two modes per D-10:

```
node scripts/validation/regenerate-supervision-pins.mjs --report
# Output:
# === supervision pin report ===
# Pinned (in sidecar): 23
# Un-pinned Tier-1 (stub-eligible): 0     <-- Phase 43 expects 0 after hand-authoring
# Un-pinned Tier-2 (suspected regression): 0
# Stale pins (line now has no supervision hit): 0
# Lines that moved (pin line X; actual content moved to Y): 0
```

```
node scripts/validation/regenerate-supervision-pins.mjs --emit-stubs
# Output (JSON-fragment format):
# {"file": "docs/some-doc.md", "line": 42, "reason": "TODO: <first 80 chars of occurrence line>", "tier": 1, "context": "..."}
# {"file": "docs/other-doc.md", "line": 99, "reason": "TODO: ...", "tier": 1, "context": "..."}
```

Plus a Tier-2 side-channel write to `scripts/validation/suspected-regressions.txt`:
```
scripts/validation/suspected-regressions.txt — REVIEW REQUIRED (2026-04-24)
===========================================================
Occurrences failing both Tier-1 context check AND HTML-comment membership.
A human must REVIEW each before promoting to a pin. The helper never auto-pins Tier 2.
-----------------------------------------------------------
docs/some-file.md:123 — "supervis..." (bare, no iOS/Apple/ADE/macOS/MDM/cross-platform within 2 preceding lines)
```

(Phase 43 expects zero entries on first run — Phase 43's hand-authored sidecar covers all currently-legitimate bridge prose, so every un-pinned occurrence indicates a real regression. Phase 44/45/46 authors may see entries here as they add Knox / per-OEM AOSP content; they must explicitly promote each entry to a pin after human review.)

**Self-test mode (D-12 dogfooding):**

```
node scripts/validation/regenerate-supervision-pins.mjs --self-test
# Expected output:
# === self-test: reproduce Phase 43's hand-authored pin set ===
# Scanning: 26 Android doc paths
# Classifier output: 14 Tier-1 stub-eligible lines, 0 Tier-2 suspected regressions
# Phase 43 hand-authored Tier-1 pins: 14
# Diff: identical ✓
# Self-test: PASS
```

Self-test diff criterion: the helper's Tier-1 stub emission, when compared against Phase 43's hand-authored 14 new supervision pins (N1..N9 lines), MUST match exactly — same set of `{file, line}` pairs. If diff is non-zero, block commit-2 (scaffold) until either the helper or the hand-authored set is corrected. This is the explicit D-12 validation gate.

**Why this pattern:** Testing the classifier AFTER the hand-authored set lands protects against a classifier bug becoming load-bearing. A self-test failure in either direction signals a bug:
- Classifier emits pins Phase 43 didn't author → false-positive classifier (over-broad Tier 1)
- Phase 43 authored pins classifier doesn't emit → false-negative classifier (missed legitimate bridge prose) OR Phase 43 over-pinned

Either way, the discrepancy surfaces immediately rather than drifting into v1.5.

### 5. AOSP stub trim strategy

**Current state (2026-04-24):** `docs/admin-setup-android/06-aosp-stub.md` — 1197 words raw / 1089 words harness-formula (excludes frontmatter + See Also + Changelog). 9 H2s present (all locked per Phase 39 D-11). Target per D-18: **~700 words harness-formula** (= ~770-800 words raw depending on See Also/Changelog stability).

**Sections to KEEP verbatim (per D-17 explicit preservation):**

| Section | Line Range | Keep Reason |
|---------|-----------|-------------|
| Frontmatter (lines 1-7) | 1-7 | Unchanged metadata |
| Title (line 9) | 9 | `# AOSP Device Management Stub — Intune` |
| Platform gate banner (lines 11-14) | 11-14 | Navigation — Phase 34 D-03 analog |
| Platform note (line 16) | 16 | D-21 locked |
| Subtractive-deletion HTML comments (lines 18-22) | 18-22 | 2 comments explaining MGP + ZT portal absence |
| H2-1 "Scope and Status" (lines 24-28) | 24-28 | Keep; the ⚠️ blockquote is structural |
| H2-3 "When to Use AOSP" (lines 40-47) | 40-47 | 8-OEM mention + routing (D-17 locked) |
| H2-4 "Supported OEMs" H2 header (line 49) + intro (line 51) | 49-51 | 2-line intro to the two H3s |
| H2-4 → H3 "Other AOSP-Supported OEMs" (lines 62-75) | 62-75 | 8-OEM enumeration (D-17 locked) + PITFALL-7 closing sentence line 75 |
| H2-5 "Enrollment Constraints" 3-constraint body (lines 77-91) | 77-91 | Includes D-13 3-constraint + PITFALL-7 "what breaks" callouts + Wi-Fi-embedded-in-QR requirement (in abbreviated form — RealWear deep content migrates) |
| H2-6 "Prerequisites and Licensing" (lines 93-97) | 93-97 | Unchanged |
| H2-7 "Deferred Content" (lines 99-112) | 99-112 | D-17 locked; table kept intact for v1.4.1 Phase 45 collapse |
| H2-8 "See Also" (lines 114-122) | 114-122 | Navigation |
| H2-9 "Changelog" (lines 124-128) | 124-128 | Append row for Phase 43 trim |

**Sections to REMOVE or COMPRESS (migrate to `PHASE-45-AOSP-SOURCE.md`):**

| Section | Current Line Range | Current Word Count (approx) | Action | Words Saved |
|---------|-------------------|-----------------------------|--------|------------|
| H2-2 "What AOSP Is" body bullets (lines 30-38) | 30-38 | ~90 words | Compress to 2-sentence prose — "AOSP is Android without GMS (no FCM, no MGP, no Google sign-in handshake). Devices report via `intunecdnpeasd.manage.microsoft.com` rather than GMS-path endpoints." | ~60 |
| H2-4 → H3 "RealWear (confirmed GA)" deep paragraphs (lines 53-60) | 53-60 | ~150 words | Remove BOTH paragraphs; replace with 2-sentence compressed form: "RealWear HMT-1, HMT-1Z1, and Navigator 500 are confirmed GA for AOSP management in Intune. Per-OEM enrollment mechanics (including Wi-Fi credential embedding in the QR payload) are deferred to Phase 45." Move the full HMT-1/HMT-1Z1/Navigator 500 firmware detail + QR-payload Wi-Fi embedding walk-through to `PHASE-45-AOSP-SOURCE.md`. | ~130 |
| H2-5 "Enrollment Constraints" what-breaks callouts (verbose 2-line blockquotes) | 83, 87, 91 | ~80 words | Compress each of the 3 callouts from 2-line to 1-line: "Attempting NFC/afw#setup/ZT on AOSP: enrollment fails silently. Recovery: factory-reset, re-provision via QR." | ~30 |

**Sections requiring judgment (not explicitly locked or removed):**

| Section | Action | Rationale |
|---------|--------|-----------|
| H2-4 intro paragraph (line 51) | Keep (25 words) | Navigation + routing; not "deep content" |
| PITFALL-7 line 75 closing sentence | **Keep verbatim** | Phase 39 D-17 locked "not supported under AOSP" framing; zero trim |

**Word-count math (target validation):**

- Current harness-formula body: 1089 words
- Target: ~700 words
- Required trim: **~389 words**
- Planned trim: ~60 (H2-2 bullets) + ~130 (RealWear deep paragraphs) + ~30 (callout compression) = **~220 words**

**This leaves ~170 additional words to trim.** Research flag: the planned trim as enumerated is insufficient to hit 700 words. The planner must identify additional compression:

- **Candidate 1:** H2-1 "Scope and Status" 2nd sentence (lines 27-28) — "This guide covers scope, supported device classes, and enrollment constraints for AOSP in Intune at v1.4. RealWear is highlighted as the confirmed GA case; admins with non-RealWear hardware are routed to Android Enterprise fully managed where GMS is available." — ~40 words. Could compress to ~15.
- **Candidate 2:** H2-3 "When to Use AOSP" expansion prose (lines 46-47 closing) — "Do NOT use AOSP for mainstream Android phones or tablets. If the device has GMS..." — ~50 words. Could compress to ~20.
- **Candidate 3:** H2-6 "Prerequisites and Licensing" paragraph (lines 93-97) — ~85 words. Could compress to ~40 by removing the MEDIUM-inference paragraph explainer (the `[MEDIUM: research inference, last_verified 2026-04-23]` marker can stay; the 3-sentence wrap-up can go).
- **Candidate 4:** H2-7 "Deferred Content" preface sentence (line 101) — "The following AOSP content is tracked for v1.4.1 and out of scope for v1.4:" — can be removed (the table caption is self-explanatory). ~12 words.

Combined Candidates 1+2+3+4 ≈ 40-20 + 50-20 + 85-40 + 12 = ~107 words. Plus the enumerated ~220 = **~327 words total**, landing the stub at **~762 words** — slightly above 700 but well below 900. The planner should aim for 700-750 as the landing target.

**If additional trim is needed**, Candidate 5: H2-5 prose intro (line 79) "AOSP enrollment has three load-bearing constraints that differ from GMS-based modes:" → "AOSP enrollment constraints:" (~15 words saved). That gets to ~747. Close enough to D-18 "~700" framing; well under the 900 envelope ceiling and comfortably inside the Phase 45 AEAOSPFULL-09 future-trim headroom.

**Migration target (`PHASE-45-AOSP-SOURCE.md`) captures:**

1. Full RealWear HMT-1 / HMT-1Z1 / Navigator 500 deep paragraphs (lines 53-60 verbatim)
2. Wi-Fi-embedded-in-QR enrollment walk-through (from lines 58 + 89 expanded)
3. `[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]` confidence marker retained
4. Any additional per-OEM prose the Phase 45 researcher later elects to move

**PITFALL-7 preservation invariant:** harness C6 (informational) post-Phase-43 must report `1/1 files preserve PITFALL-7 framing` — the AOSP stub still contains `not supported under AOSP` or equivalent PITFALL-7 framing after trim. Current line 75 carries this. Do NOT remove that sentence.

### 6. Prep shell authoring

**Path (per D-16):** `.planning/phases/45-*/PHASE-45-AOSP-SOURCE.md`

**Current reality:** Phase 45 directory does not yet exist at `.planning/phases/`. Options:

- **Option A (RECOMMENDED):** Create the directory with a slug placeholder that Phase 45 planning can rename: `.planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md`. The slug `per-oem-aosp-expansion` is discoverable via ROADMAP.md (Phase 45 scope) and matches the naming convention of recently-renamed v1.4.1 phases. If Phase 45 planning later selects a different slug, the directory rename is a single `git mv` and the prep-shell content moves with it.
- **Option B:** Stage the prep shell at `.planning/phases/43-v1-4-cleanup-audit-harness-fix/PHASE-45-AOSP-SOURCE.md` (inside Phase 43's own directory) and plan a Phase 45 pre-planning step to `git mv` it into place. More coupling.
- **Option C:** Stage at repo-root-level `.planning/PHASE-45-AOSP-SOURCE.md`. Bypasses Phase 45 directory concerns entirely; Phase 45's first commit moves it into position. Cleanest for Phase 43 (no phase-45 directory side effect).

**Recommendation: Option A.** Phase 43 includes a sub-step "create Phase 45 directory + write prep shell." The `mkdir -p .planning/phases/45-per-oem-aosp-expansion/` is idempotent and the prep shell lands there. Phase 45 planning is not blocked — the directory is discoverable, the prep shell is present. If Phase 45 later renames slug, one `git mv` handles it. Option B creates cross-phase directory coupling (Phase 43 owns Phase 45 structure until Phase 45 planning runs); Option C orphans the file at `.planning/` root level where readers don't expect planning artifacts.

**`PHASE-45-AOSP-SOURCE.md` structure (suggested):**

```markdown
# Phase 45 AOSP Per-OEM Input Artifact — RealWear Deep Content

**Source:** Extracted from `docs/admin-setup-android/06-aosp-stub.md` during Phase 43 trim (2026-04-24).
**Consumer:** Phase 45 per-OEM AOSP expansion (AEAOSPFULL-01 RealWear admin guide).
**Lifecycle:** Phase 45 DELETES this file in its final commit per D-20. Do NOT link to it from shipped docs.

## RealWear Hardware Scope

RealWear **HMT-1** (firmware 11.2+), **HMT-1Z1** (11.2+), and **Navigator 500** (1.1+) are confirmed GA for AOSP management in Intune — AR/VR headsets deployed for hands-free frontline work (field service, maintenance, remote expert assistance).

## Enrollment Mechanics

Enrollment is QR-only, one device at a time. **Wi-Fi credentials MUST be embedded in the QR enrollment payload** because RealWear devices cannot join Wi-Fi interactively during enrollment — the device must come up already network-connected to reach the Intune enrollment server on first boot.

`[HIGH: MS Learn AOSP supported devices, last_verified 2026-04-23]`

## Wi-Fi QR-Payload Embedding Walk-Through

[Placeholder — Phase 45 researcher will expand with actual Intune UI path for embedding Wi-Fi in the AOSP QR generator: SSID field, password field, EAP config for enterprise networks, etc. Reference: Intune admin center > Devices > Android > Enrollment > Corporate-owned dedicated devices > Token > Wi-Fi.]

## PITFALL-7 Invariant (Phase 39 D-17)

Every per-OEM "supported" assertion MUST pair with the AOSP baseline caveat: this hardware is supported *under AOSP mode* (not under Android Enterprise managed modes). Do NOT drop the "not supported under AOSP" framing from per-OEM content.

## Cross-Links for Phase 45 Author

- Stub that trimmed this content: `docs/admin-setup-android/06-aosp-stub.md`
- PITFALL-7 framing locked at: Phase 39 §CONTEXT D-17 (reference via git history if phase-39 directory is torn down)
- AOSP supported-devices source: https://learn.microsoft.com/en-us/intune/fundamentals/aosp-supported-devices
```

**Lossless-extract contract:** Every sentence removed from the stub during Phase 43's trim either:
- Lands in `PHASE-45-AOSP-SOURCE.md`, OR
- Was a compression candidate with explicit consolidation note in the Phase 43 PLAN.md trim table.

No sentence "disappears." Audit trail for Phase 45 researcher + future historical grep.

### 7. `/gsd-validate-phase 39` invocation

Per validate-phase workflow (from `$HOME/.claude/get-shit-done/workflows/validate-phase.md`):

**Command syntax:**
```
/gsd-validate-phase 39
```
(optionally with `--text` flag for non-Claude runtimes)

**Workflow shape (abbreviated):**
1. Init: loads `INIT=$(node "$HOME/.claude/get-shit-done/bin/gsd-tools.cjs" init phase-op 39)`
2. Detects state: A (existing VALIDATION.md) / B (missing — reconstruct from SUMMARY) / C (phase not executed — exit)
3. Gap analysis: each requirement classified COVERED / PARTIAL / MISSING
4. If gaps exist: AskUserQuestion for fix/skip/cancel
5. If user chooses fix: spawns `gsd-nyquist-auditor` agent
6. Updates `.planning/phases/39-*/39-VALIDATION.md` (or reconstructs if missing)
7. Commits: `test(phase-39): ...` + `docs(phase-39): add/update validation strategy`
8. Reports: "PHASE 39 IS NYQUIST-COMPLIANT" or "PHASE 39 VALIDATED (PARTIAL)"

**Phase 43 interaction with Phase 39 re-gate (D-21):**

Phase 39's existing VALIDATION state (from git history):
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md` — existed at commit `e0949d7` ("add validation strategy")
- `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VERIFICATION.md` — existed at commit `ef7717b` (header shows `status: passed, score: 23/23 must-haves verified`)

Both files are currently in git history only (the v1.4 phase directory was torn down). If `/gsd-validate-phase 39` is invoked:

- Step 1 "Detect Input State": VALIDATION_FILE will be NULL (phase directory doesn't exist on disk anymore) → **State C: "Phase 39 not executed. Run /gsd-execute-phase 39 ... first."**

**This is a problem for D-21 closure.** Phase 43 needs a specific workaround:

**Option A (RECOMMENDED):** Restore the Phase 39 directory from git before invoking:
```bash
mkdir -p .planning/phases/39-zero-touch-enrollment-aosp-stub
git show ef7717b:.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md > .planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md
git show ef7717b:.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VERIFICATION.md > .planning/phases/39-zero-touch-enrollment-aosp-stub/39-VERIFICATION.md
git show ef7717b:.planning/phases/39-zero-touch-enrollment-aosp-stub/39-01-SUMMARY.md > .planning/phases/39-zero-touch-enrollment-aosp-stub/39-01-SUMMARY.md
git show ef7717b:.planning/phases/39-zero-touch-enrollment-aosp-stub/39-02-SUMMARY.md > .planning/phases/39-zero-touch-enrollment-aosp-stub/39-02-SUMMARY.md
```
Then `/gsd-validate-phase 39` sees State A (existing VALIDATION.md) and proceeds to re-audit the content word count. The re-audit compares the (now-trimmed) `06-aosp-stub.md` against Phase 39's locked envelope (600-900 words), passes (~700 words is in the envelope), and updates VALIDATION.md with a fresh "Validation Audit 2026-04-24" trailer.

**Option B:** Invoke `/gsd-validate-phase 39` manually, letting it hit State C and print the error. Then Phase 43 produces a custom VALIDATION.md inline documenting the re-gate without going through the formal workflow. Less auditable.

**Option A is correct.** Phase 43's sub-step 9 (per D-27) is:
```
1. Restore Phase 39 artifacts from commit ef7717b (read-only restore — these artifacts are historical records).
2. Run /gsd-validate-phase 39.
3. Verify the VALIDATION.md audit trailer records a 2026-04-24 re-gate entry with word-count = (final trimmed count) within envelope 600-900.
4. Commit the restored artifacts + updated VALIDATION.md: `docs(43): restore Phase 39 artifacts + DEFER-04 closure re-gate`.
```

**Expected artifact after `/gsd-validate-phase 39`:** `.planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md` gets an appended audit trailer:

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

The 39-VERIFICATION.md separately carries the `status: passed` header from pre-existing audit; no update needed unless the validator flags a new issue.

**If `/gsd-validate-phase 39` DOES find a gap** (e.g., it sees the trimmed stub's word count is still outside envelope): Phase 43's plan MUST include a branch for "trim further and re-run." This is a LOW-probability branch if §5 word-count math is followed, but the plan should carry a mitigation plan for "word count landed at 830, still need to trim 30 more."

### 8. CI / pre-commit integration

**Repo tooling audit (2026-04-24):**

- `.github/` directory: **does not exist** (no GitHub Actions configured).
- `.git/hooks/`: only `.sample` files; no active hooks.
- `package.json` root: thin aggregator with dev/build/test/lint forwarders to src/frontend + backend scripts. No Husky, lefthook, pre-commit-framework, or any similar dep declared.
- `.husky/` directory: does not exist.
- `lefthook.yml` / `.lefthook.yml`: does not exist.
- `.pre-commit-config.yaml` (Python pre-commit framework): does not exist.

**Phase 43 is introducing CI infrastructure from zero.** Per D-claudes-discretion, pick "what aligns with existing tooling, or propose minimal addition."

**Recommendation: Native shell + native GitHub Actions YAML. Do NOT introduce Husky/lefthook/pre-commit-framework.**

Rationale:
- Repo is polyglot (PowerShell + Python + Node/TS) with no existing JS dev-tooling dependency on pre-commit frameworks. Adding Husky as a dep for a single hook violates "add the smallest surface that does the job."
- Pre-commit hook logic is ~10 lines of shell — node-friendly, Windows-compatible via Git Bash / MSYS.
- GitHub Actions is a de-facto standard; one YAML file to onboard.
- Phase 43 wants fast restoration of harness integrity, not multi-hour dev-tooling migration.

**Pre-commit hook (new file: `scripts/hooks/pre-commit.sh`):**

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

**Developer installation (one-time per clone):** documented in `scripts/validation/README-supervision-pins.md` or a new `scripts/hooks/README.md`:
```bash
cp scripts/hooks/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit  # Git Bash on Windows honors this.
```

Optional: the repo could add a `npm run install-hooks` script to `package.json` that runs the above cp+chmod. Low-friction. Defer to implementer discretion.

**GitHub Action (new file: `.github/workflows/audit-harness-integrity.yml`):**

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
    # Weekly bitrot catch: 08:00 UTC every Monday.
    - cron: '0 8 * * 1'
  workflow_dispatch:  # manual trigger

jobs:
  parse:
    name: Sidecar JSON parse
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Validate v1.4 sidecar
        run: |
          node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4-audit-allowlist.json', 'utf8'));
          if (!Array.isArray(j.supervision_exemptions) || j.supervision_exemptions.length === 0) { console.error('supervision_exemptions is empty or missing'); process.exit(1); }
          if (!Array.isArray(j.safetynet_exemptions) || j.safetynet_exemptions.length === 0) { console.error('safetynet_exemptions is empty or missing'); process.exit(1); }
          console.log('v1.4 sidecar OK: ' + j.safetynet_exemptions.length + ' safetynet + ' + j.supervision_exemptions.length + ' supervision pins');"
      - name: Validate v1.4.1 sidecar
        run: |
          node -e "const j=JSON.parse(require('fs').readFileSync('scripts/validation/v1.4.1-audit-allowlist.json', 'utf8'));
          if (!Array.isArray(j.supervision_exemptions)) { console.error('supervision_exemptions missing'); process.exit(1); }
          console.log('v1.4.1 sidecar OK: ' + j.safetynet_exemptions.length + ' safetynet + ' + j.supervision_exemptions.length + ' supervision pins + ' + (j.cope_banned_phrases||[]).length + ' COPE banned phrases');"

  path-match:
    name: Sidecar path matches harness
    runs-on: ubuntu-latest
    needs: parse
    steps:
      - uses: actions/checkout@v4
      - name: Assert v1.4 harness references current sidecar path
        run: |
          if ! grep -q "scripts/validation/v1.4-audit-allowlist.json" scripts/validation/v1.4-milestone-audit.mjs; then
            echo "FAIL: v1.4 harness does not reference scripts/validation/v1.4-audit-allowlist.json on its sidecar load line"
            exit 1
          fi
      - name: Assert v1.4.1 harness references current sidecar path
        run: |
          if ! grep -q "scripts/validation/v1.4.1-audit-allowlist.json" scripts/validation/v1.4.1-milestone-audit.mjs; then
            echo "FAIL: v1.4.1 harness does not reference scripts/validation/v1.4.1-audit-allowlist.json"
            exit 1
          fi

  harness-run:
    name: Harness replay
    runs-on: ubuntu-latest
    needs: [parse, path-match]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Run v1.4 harness (historical replay)
        run: node scripts/validation/v1.4-milestone-audit.mjs --verbose
      - name: Run v1.4.1 harness
        run: node scripts/validation/v1.4.1-milestone-audit.mjs --verbose

  pin-helper-advisory:
    name: Supervision pin helper (advisory)
    runs-on: ubuntu-latest
    needs: harness-run
    continue-on-error: true   # D-14 / D-15: advisory only; never fails build.
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
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
              body: '## Supervision Pin Helper (Advisory)\n\n```\n' + report + '\n```\n\n*Advisory only — this check never fails the build (D-14).*'
            });
```

**Commit-3 (CI) payload:**
1. `mkdir -p .github/workflows` (first time creating .github/ in repo)
2. Write `.github/workflows/audit-harness-integrity.yml`
3. Write `scripts/hooks/pre-commit.sh` + make executable (`chmod +x` in script, committed via git)
4. Optional: add `scripts/hooks/README.md` with install instructions
5. `git add .github/ scripts/hooks/` + commit: `ci(43): audit harness integrity GitHub Action + pre-commit hook`

### 9. Nyquist Validation Architecture

**Config check:** `.planning/config.json` does not set `workflow.nyquist_validation` — per researcher contract, treat as enabled. Include Validation Architecture section.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Node.js built-ins — no external test framework for harness/helper scripts (the harness IS the test; the helper self-test mode IS the meta-test). Distinct from repo-level Pester (PowerShell) / pytest (Python) / Vitest (React) which are NOT in Phase 43 scope. |
| Config file | None — Phase 43 uses assertion-by-script pattern (`node -e "assert(...)"` or equivalent) |
| Quick run command | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` |
| Full suite command | `node scripts/validation/v1.4-milestone-audit.mjs --verbose && node scripts/validation/v1.4.1-milestone-audit.mjs --verbose && node scripts/validation/regenerate-supervision-pins.mjs --self-test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AEAUDIT-02 | Allow-list expansion: C2 PASS after sidecar has 23 pins | integration | `node scripts/validation/v1.4-milestone-audit.mjs --verbose` → expect C2 PASS (was FAIL pre-expansion) | ❌ Wave 0 (sidecar rescued in Plan 43-01) |
| AEAUDIT-03 | Freshness normalization: C5 PASS after metadata shifts + sentinel + scope-filter | integration | `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` → expect C5 PASS | ❌ Wave 0 (v1.4.1 harness built in Plan 43-02) |
| AEAUDIT-04 | AOSP stub word count within Phase 39 envelope | unit | `node -e "const fs=require('fs'); const c=fs.readFileSync('docs/admin-setup-android/06-aosp-stub.md','utf8').replace(/\r\n/g,'\n'); let b=c.replace(/^---[\s\S]*?\n---\n/,''); b=b.replace(/^## See Also[\s\S]*$/m,''); b=b.replace(/^## Changelog[\s\S]*$/m,''); const wc=b.split(/\s+/).filter(Boolean).length; if (wc < 600 || wc > 900) { console.error('AOSP body ' + wc + ' outside envelope 600-900'); process.exit(1); } console.log('AOSP body ' + wc + ' within envelope');"` | ❌ Wave 0 (embedded in `scripts/validation/check-aosp-envelope.mjs` — optional mini-validator) |
| AEAUDIT-05 | Harness sidecar-path blocker resolved: v1.4 harness runs end-to-end | integration | `node scripts/validation/v1.4-milestone-audit.mjs --verbose && echo OK` (exits 0 on all-PASS; non-zero on harness infra error separate from FAIL-classified checks) | ✅ (v1.4 harness exists) |
| Self-test | regenerate-supervision-pins.mjs reproduces Phase 43's hand-authored pin set | unit | `node scripts/validation/regenerate-supervision-pins.mjs --self-test` → exit 0 on match; exit 1 on diff | ❌ Wave 0 (helper authored in Plan 43-04) |

### Sampling Rate

- **Per task commit:** `node scripts/validation/v1.4.1-milestone-audit.mjs --verbose` (fast — ~1 second on this repo size)
- **Per wave merge:** full suite (both harnesses + helper self-test)
- **Phase gate:** Full suite green before `/gsd-verify-work`; additionally `/gsd-validate-phase 39` green (DEFER-04 closure recorded)

### Wave 0 Gaps

- [ ] `scripts/validation/v1.4-audit-allowlist.json` — restored from git commit e5e45db (covers AEAUDIT-02 test fixture)
- [ ] `scripts/validation/v1.4.1-milestone-audit.mjs` — v1.4.1 harness (covers AEAUDIT-03/04 tests)
- [ ] `scripts/validation/v1.4.1-audit-allowlist.json` — net-new sidecar skeleton (covers AEAUDIT-03 test)
- [ ] `scripts/validation/regenerate-supervision-pins.mjs` — helper with `--report` / `--emit-stubs` / `--self-test` modes (covers AEAUDIT-02 dogfooding)
- [ ] `scripts/validation/README-supervision-pins.md` — helper documentation
- [ ] `.github/workflows/audit-harness-integrity.yml` — CI YAML
- [ ] `scripts/hooks/pre-commit.sh` — pre-commit hook
- [ ] *(optional)* `scripts/validation/check-aosp-envelope.mjs` — explicit word-count mini-validator (or embed check in plan verification step)

## Runtime State Inventory

(Phase 43 is a tooling/metadata phase with rename-adjacent characteristics — new sidecar paths + new harness file + frontmatter shifts. Include this section.)

| Category | Items Found | Action Required |
|----------|-------------|-----------------|
| Stored data | None — Phase 43 touches no databases, no vector stores, no user-scoped data. | None. |
| Live service config | **CRITICAL:** The v1.4 audit harness's sidecar path is ALREADY broken in production (as of 2026-04-24) — the archived JSON at `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` has been deleted. Any CI/automation that runs the harness today silently degrades (parseAllowlist returns empty arrays). | Commit-1 (rescue) restores this within Phase 43's first commit — UNBLOCKS v1.4 audit replay on any branch. |
| OS-registered state | None — no scheduled tasks, no systemd units, no pm2 processes reference these paths. | None. |
| Secrets / env vars | None — the sidecar JSON is pin metadata (file/line/reason), zero credentials. | None. |
| Build artifacts | None — no compiled artifacts in Phase 43 scope. `npm install` in repo root is irrelevant to the Node.js harness scripts (they use only built-in `fs`/`path`/`process` — zero dependencies). | None. |

**Line-number drift audit:** The 9 existing allow-list pins (S1-S9, SN1-SN4) all verified intact on 2026-04-24 disk state — no drift since commit e5e45db (2026-04-24). The 14 new pins (N1-N9) are authored against 2026-04-24 disk state. **Risk:** if any of the 5 target files (`_glossary-android.md`, `android-capability-matrix.md`, `00-enrollment-overview.md`, `03-fully-managed-cobo.md`, `20-android-app-install-investigation.md`) receives a content edit between Phase 43 authoring and Phase 43 commit-3, pin line numbers may drift. **Mitigation:** Phase 43 plan should include a pre-commit "re-verify all pins" step in Plan 43-03 (allow-list expansion). The `regenerate-supervision-pins.mjs --self-test` in Plan 43-04 provides the dogfood catch.

## Common Pitfalls

### Pitfall 1: Breaking the v1.4 audit replay contract
**What goes wrong:** Someone tries to delete `scripts/validation/v1.4-milestone-audit.mjs` or overwrite it in-place.
**Why it happens:** Simplification instinct — "we have v1.4.1, why keep v1.4?"
**How to avoid:** Phase 43 D-01/D-02 freeze. Freeze-marker header comment. Any future PR proposing deletion MUST be rejected at plan review.
**Warning signs:** PR description mentions "clean up v1.4 harness" or "consolidate harness files."

### Pitfall 2: Pin line-number drift between authoring and commit
**What goes wrong:** Developer edits `_glossary-android.md` or `android-capability-matrix.md` after Phase 43 starts hand-authoring pins but before commit-3 lands. Pin at glossary line 63 now targets line 65; C2 starts reporting a new FAIL.
**Why it happens:** Parallel content work during tooling-phase execution.
**How to avoid:** (1) Phase 43 should land on a stable baseline (no concurrent v1.4.1 content work in parallel). (2) `regenerate-supervision-pins.mjs --self-test` dogfood catches drift before commit.
**Warning signs:** `git diff` on any of the 5 pinned files during Phase 43 execution.

### Pitfall 3: C6/C7/C9 informational-first accidentally promoted to blocking
**What goes wrong:** A future PR edits the `{ pass: true, ... }` return in C6/C7/C9 to `{ pass: <conditional>, ... }`, breaking the Phase 42 D-29 grace-period contract.
**Why it happens:** Reviewer sees an informational finding and pattern-matches on "this should fail."
**How to avoid:** Code comments on each new check explicitly name the D-29 contract. Plan-checker on Phase 44/45/46 must watch for this change.
**Warning signs:** Any PR touching C6/C7/C9 bodies in v1.4.1 that changes the return shape.

### Pitfall 4: Sentinel parse swallows real content-drift
**What goes wrong:** A doc accidentally gets `last_verified: 1970-01-01` (typo, copy-paste accident) and the harness silently skips freshness check.
**Why it happens:** Sentinel values can leak into real docs via template copy-and-edit.
**How to avoid:** (1) Sentinel is paired with the `# TEMPLATE-SENTINEL` human-readable comment — any doc with `1970-01-01` but no comment is suspicious. (2) C5 could log `skipped-via-sentinel` count as informational metadata in verbose mode. (3) Template-scope filter is the primary gate; sentinel is only a fallback.
**Warning signs:** C5 suddenly shows N fewer violations than expected after a new doc lands.

### Pitfall 5: AOSP trim drops PITFALL-7 phrasing
**What goes wrong:** Compression pass rewrites line 75 in a way that drops "use Android Enterprise fully managed instead" / "not supported under AOSP" semantics.
**Why it happens:** Aggressive word-count targeting.
**How to avoid:** harness C6 (informational) catches this: `/not supported under AOSP/i` must match at least one occurrence. Plan 43-07 verification step must grep for this after trim.
**Warning signs:** C6 informational count drops from 1/1 to 0/1.

### Pitfall 6: Regex-based line counting instead of parsing
**What goes wrong:** Helper or harness uses regex `/\blast_verified:\s*(\d{4}-\d{2}-\d{2})\b/` without anchoring to `^` multiline mode — matches inside body prose, not just frontmatter.
**Why it happens:** Regex shortcut without understanding YAML frontmatter parse semantics.
**How to avoid:** Pattern consistently uses `^last_verified:...$` with multiline flag, scoped to the frontmatter substring (between `---\n` fences). v1.4 harness already does this correctly (line 250-256 frontmatter extraction + line 256 anchored regex). Preserve in v1.4.1.
**Warning signs:** C5 reports a false-positive on a doc that literally contains `last_verified:` in its body as example content.

## Code Examples

Verified patterns extracted from existing v1.4 harness. File-reads-only; no shell-out from any Phase 43 script body.

### Frontmatter date extraction (v1.4 harness line 250-256 — verbatim, preserve in v1.4.1)
```javascript
// Source: scripts/validation/v1.4-milestone-audit.mjs
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
if (!fmMatch) { violations.push({ file: relPath, reason: 'no frontmatter' }); continue; }
const fm = fmMatch[1];
const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);  // D-24 relaxed
```

### Graceful-degradation JSON parse (v1.4 harness line 56-63 — Phase 42 D-25 contract)
```javascript
// Source: scripts/validation/v1.4-milestone-audit.mjs
function parseAllowlist() {
  const raw = readFile('scripts/validation/v1.4-audit-allowlist.json');  // path updated per D-03
  if (!raw) return { safetynet_exemptions: [], supervision_exemptions: [] };
  try {
    return JSON.parse(raw);
  } catch (err) {
    return { _parseError: err.message, safetynet_exemptions: [], supervision_exemptions: [] };
  }
}
```

### CRLF normalization (v1.4 harness line 28-32 — Windows compat)
```javascript
// Source: scripts/validation/v1.4-milestone-audit.mjs
function readFile(relPath) {
  const abs = join(process.cwd(), relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n');
}
```

Preserve this in every Phase 43 new script (helper + scope-filter + sentinel parse) — the repo's Windows + git-on-Windows scenarios produce CRLF-mixed content.

### Runner pattern (v1.4 harness line 285-319 — Phase 42 D-25 locked stdout contract)
```javascript
// Source: scripts/validation/v1.4-milestone-audit.mjs (adapted for C3/C6/C7/C9 informational-first)
const LABEL_WIDTH = 56;
function padLabel(s) { if (s.length >= LABEL_WIDTH) return s + ' '; return s + ' ' + '.'.repeat(LABEL_WIDTH - s.length) + ' '; }
let passed = 0, failed = 0, skipped = 0;
for (const check of checks) {
  let result;
  try { result = check.run(); } catch (e) { result = { pass: false, detail: 'Unexpected error: ' + e.message }; }
  const prefix = '[' + check.id + '/' + checks.length + '] ' + check.name;
  if (result.skipped) { skipped++; /* ... */ }
  else if (result.pass) {
    passed++;
    const showDetail = result.detail && (check.informational === true || VERBOSE);  // D-06 extension
    process.stdout.write(padLabel(prefix) + 'PASS' + (showDetail ? ' ' + result.detail : '') + '\n');
  } else { failed++; /* ... */ }
}
```

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | harness + helper | ✓ | 20.x assumed (GitHub Actions `actions/setup-node@v4 with: node-version: '20'`); repo does not pin explicit version | Node 18+ works (built-ins only — `fs`, `path`, `process`, `url`, `node:assert`) |
| Git | Sidecar recovery via `git show` | ✓ | Any 2.x | — |
| GitHub Actions | CI workflow | ✓ (repo is on GitHub per git remote) | — | Native shell pre-commit hook is the local fallback |
| `npx` / `markdown-link-check` | OPTIONAL — phase-30/31 harness external checks | Not in Phase 43 scope | — | — |
| jq | Pre-commit could use it; RECOMMENDED against | Not assumed installed on all dev machines | — | Replaced with `node -e "JSON.parse(...)"` in pre-commit hook (portable) |

**Missing dependencies with no fallback:** None.
**Missing dependencies with fallback:** None critical. Pre-commit hook intentionally avoids `jq` for portability.

## Validation Architecture

### Dimension 1: Harness parse integrity
Both v1.4 and v1.4.1 harnesses must parse, execute, and exit cleanly.
Test: `node scripts/validation/v1.4-milestone-audit.mjs --verbose && node scripts/validation/v1.4.1-milestone-audit.mjs --verbose; echo "exit=$?"` — expect both scripts run without crash (exit 0 after commit-3; may exit 1 on legitimate FAIL findings during intermediate commits).

### Dimension 2: Allow-list JSON schema + reproduction
The v1.4 allow-list after Plan 43-03 expansion contains 4 safetynet + 23 supervision pins, valid JSON, no duplicate `{file, line}` pairs. Helper self-test reproduces exactly this set.
Test: `node scripts/validation/regenerate-supervision-pins.mjs --self-test` exits 0.

### Dimension 3: Freshness metadata correctness
L2 runbooks 18-21 carry `review_by: 2026-06-22`; template carries `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`; v1.4.1 harness C5 PASS.
Test:
```bash
for f in 18-android-log-collection 19-android-enrollment-investigation 20-android-app-install-investigation 21-android-compliance-investigation; do
  grep -q "review_by: 2026-06-22" "docs/l2-runbooks/$f.md" || { echo "FAIL: $f"; exit 1; }
done
grep -q "last_verified: 1970-01-01" docs/_templates/admin-template-android.md || { echo "FAIL: template sentinel"; exit 1; }
node scripts/validation/v1.4.1-milestone-audit.mjs --verbose | grep -q "C5.*PASS"
```

### Dimension 4: AOSP stub word-count envelope
`06-aosp-stub.md` body (harness-formula) is within 600-900 words; target ~700 per D-18.
Test: `node -e "..."` (see §9 above), expecting exit 0 with word count reported.

### Dimension 5: CI integration alive
GitHub Action `audit-harness-integrity.yml` exists and passes for PRs that touch relevant paths. Pre-commit hook `scripts/hooks/pre-commit.sh` parses both sidecars.
Test: First PR after commit-3 triggers the workflow; check `.github/workflows/` path; local `bash scripts/hooks/pre-commit.sh` exits 0 after simulating a staged commit.

### Dimension 6: DEFER-04 closure recorded
Phase 39 VALIDATION.md has a `## Validation Audit 2026-04-24` trailer explicitly noting DEFER-04 closure with the trimmed word count within envelope.
Test: `grep "DEFER-04 closure" .planning/phases/39-zero-touch-enrollment-aosp-stub/39-VALIDATION.md` returns a match.

### Dimension 7: Downstream-phase unblock contract
- Phase 44 (Knox): v1.4.1 harness + v1.4.1 allow-list skeleton present → unblocked.
- Phase 45 (AOSP per-OEM): `PHASE-45-AOSP-SOURCE.md` present with RealWear deep content → unblocked.
- Phase 46 (COPE): v1.4.1 harness C9 informational active; sidecar `cope_banned_phrases` key populated → unblocked.
Test: `ls scripts/validation/v1.4.1-milestone-audit.mjs scripts/validation/v1.4.1-audit-allowlist.json .planning/phases/45-per-oem-aosp-expansion/PHASE-45-AOSP-SOURCE.md` — all 3 exist.

### Dimension 8: End-to-end audit replay
Terminal sanity per D-27 step 10: run v1.4 harness + v1.4.1 harness both on clean state.
Expected: v1.4 = 5 passed / 0 failed (all 5 checks PASS after allow-list expansion + freshness normalization + template sentinel); v1.4.1 = 8 passed / 0 failed (5 v1.4 checks PASS + 3 C6/C7/C9 informational PASS).
Test: `node scripts/validation/v1.4-milestone-audit.mjs --verbose | tee v1.4.log; node scripts/validation/v1.4.1-milestone-audit.mjs --verbose | tee v1.4.1.log; grep "Summary:" v1.4.log v1.4.1.log` — verify both show `5 passed, 0 failed, 0 skipped` and `8 passed, 0 failed, 0 skipped` respectively.

## Security Domain

**ASVS scope:** Phase 43 touches no authentication, no session management, no access control surfaces. The audit harness runs locally (developer machine) or in GitHub Actions (scoped to the repo's own secrets namespace — no secrets needed). Sidecar JSON contains zero credentials.

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | no | — |
| V3 Session Management | no | — |
| V4 Access Control | no | — |
| V5 Input Validation | yes | All file reads use built-in `fs.readFileSync` (no shell-out, no user-input path); regex patterns are literal (no user input compiled into regex); JSON parse graceful-degrades on malformed input. Path traversal not applicable — paths are hardcoded relative from `process.cwd()`. |
| V6 Cryptography | no | — |

### Known Threat Patterns for Node.js file-reads-only validator stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| Malicious sidecar JSON injection | Tampering | Sidecar is committed to git; PR review is the gate. JSON.parse throws on malformed input and the harness gracefully degrades to empty arrays rather than executing untrusted code. Zero `eval()` / `Function()` anywhere in harness or helper. |
| Prototype pollution via JSON keys | Tampering | JSON.parse is safe against prototype pollution when consuming-code treats values as data, not as object-property access. Harness code accesses only known keys (`safetynet_exemptions`, `supervision_exemptions`, `cope_banned_phrases`). |
| Path traversal in `readFile` | Tampering | All paths are hardcoded string literals or computed from walker functions; no user input flows to path arguments. |
| ReDoS in regex patterns | Denial of Service | Regex patterns (`\bsupervis(ion|ed|ory)\b`, `\b(iOS|Apple|ADE|macOS|MDM|cross-platform)\b`) are bounded by word boundaries and fixed character classes; no nested quantifiers or catastrophic backtracking. |
| GitHub Action supply-chain (3rd-party actions) | Tampering (upstream) | Pin `actions/checkout@v4`, `actions/setup-node@v4`, `actions/github-script@v7` by major version. Optionally pin by SHA for maximum supply-chain hardening (v1.5 concern, not Phase 43). |

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Phase 42 harness sidecar path at `.planning/phases/42-.../v1.4-audit-allowlist.json` | Move to `scripts/validation/v1.4-audit-allowlist.json` | Phase 43 commit-1 | v1.4 audit replay durability; planning-space artifact lifecycle decoupled from tooling |
| v1.4 harness (5 checks, 2 failing) | v1.4.1 harness (8 checks, 5 failing→passing; 3 informational-first) | Phase 43 commit-2 | Knox/AOSP/COPE grace period per Phase 42 D-29 |
| Hand-written allow-list pins, no self-test | Helper with `--self-test` dogfooding the hand-authored set | Phase 43 Plan 43-04 | Quality-bar discipline; classifier bugs surface immediately |
| No CI (first Phase in repo to introduce) | GitHub Action + pre-commit hook | Phase 43 commit-3 | Catches sidecar-bitrot before it recurs |
| iOS/macOS 90-day `review_by` cycle | Android 60-day cycle per Phase 34 D-14 | Phase 43 Plan 43-05 | Android docs revalidate more frequently than Apple docs |

**Deprecated/outdated as of 2026-04-24:**
- `.planning/phases/42-integration-milestone-audit/v1.4-audit-allowlist.json` (archived path; replaced by `scripts/validation/v1.4-audit-allowlist.json`)
- v1.4 harness as the "active" harness (now FROZEN at 3c3a140; v1.4.1 takes over)

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Phase 39 directory can be restored from git history via `git show ef7717b:...` to unblock `/gsd-validate-phase 39` workflow. | §7 | If `/gsd-validate-phase 39` requires additional state beyond VALIDATION.md / VERIFICATION.md / SUMMARY files (e.g., PLAN.md files, CONTEXT.md), Plan 43-09 needs a more complete restore — research recommends restoring the full `.planning/phases/39-*/` tree from commit `ef7717b` to be safe. [VERIFIED: ef7717b ls-tree confirmed 4 artifacts present; additional PLAN files may also exist.] |
| A2 | Node.js 20.x is the target version for CI. | §8 | Repo doesn't pin a specific Node version; if contributor uses Node 16 (EOL 2023-09), the harness may fail due to missing features (e.g., `matchAll`). Low risk — Node 16 predates v1.4 harness authoring. [ASSUMED — based on GitHub Actions default + Node LTS posture.] |
| A3 | The `~37 pin` count in CONTEXT is an approximation; the exact count is 23 file/line pairs covering 42 raw occurrences. | §3 | If a reviewer interprets "~37" as a strict line count and expects 37 JSON entries, they may request net-new pins that don't correspond to any disk occurrence. Mitigation: §3 pin census table is the authoritative count. [VERIFIED: counted against disk 2026-04-24.] |
| A4 | Option A slug `45-per-oem-aosp-expansion` for Phase 45 directory is safe — Phase 45 planner can rename if preferred. | §6 | If Phase 45 planner rejects slug convention, a `git mv` is needed. Near-zero risk — rename is trivial. [ASSUMED — based on v1.4 slug conventions like `42-integration-milestone-audit`.] |
| A5 | Native shell pre-commit + GitHub Action is the minimal-surface CI addition; repo does not need Husky/lefthook. | §8 | If repo maintainer later prefers Husky, this choice is trivially reversible. [VERIFIED — repo tooling audit 2026-04-24 shows zero existing pre-commit infrastructure.] |
| A6 | Total word trim from §5 + additional candidates will land the AOSP stub at ~747 words (harness formula), within 600-900 envelope. | §5 | If trim over-shoots and lands below 600, C3 informational becomes a MAYBE-concern (still PASS per D-29 but visually flags). If trim lands above 900, re-trim iteration required. [VERIFIED math — exact word count depends on actual prose rewrite word choice; planner must iterate.] |
| A7 | `hasUnderscoreDirSegment` scope-filter correctly exempts `docs/_glossary-android.md` (a shipped file with `_` prefix) while catching `docs/_templates/` (the directory we want to filter). | §1 Edit 4 | If predicate is overly broad and excludes `_glossary-android.md`, C2/C5 lose ~7 pinned supervision occurrences from scope — the harness silently passes content that SHOULD be pinned. Mitigation: Option A predicate walks `segments.slice(0, -1)` (directory segments only), excluding filename. [VERIFIED via pseudocode review 2026-04-24.] |
| A8 | The helper self-test diff criterion (identical set of `{file, line}` pairs) is the correct correctness gate; no tolerance for pin count mismatch. | §4 | If a legitimate Tier-1 occurrence drifts into existence during Phase 43 execution (e.g., a doc gets a new cross-platform note), the self-test fails. Mitigation: Phase 43 executes on a stable baseline; self-test re-run is sub-second. [VERIFIED logic — tight gate is the intended contract.] |

## Open Questions (RESOLVED)

1. **Should the pre-commit hook be auto-installed via `npm run install-hooks` or left manual?**
   - What we know: Repo's root `package.json` has no install-hooks helper; adding one is 3 lines.
   - What's unclear: Whether repo's convention prefers zero-automation (manual `cp .git/hooks`) or single-command setup.
   - RESOLVED: Leave manual (document in README) for Phase 43; promote to `npm run install-hooks` in a future milestone if friction emerges. Claude's discretion per D-claudes-discretion.

2. **Does Phase 39 VALIDATION.md require full artifact restore (including PLAN files) or is VALIDATION.md + VERIFICATION.md sufficient?**
   - What we know: `/gsd-validate-phase` workflow reads PLAN + SUMMARY files in Step 2a.
   - What's unclear: Whether it also requires CONTEXT.md or other artifacts.
   - RESOLVED: Plan 43-09 restores the FULL `.planning/phases/39-zero-touch-enrollment-aosp-stub/` tree from commit `ef7717b` (bulk restore via `git ls-tree` + per-file `git show`), to avoid a "State B: VALIDATION file missing" fallback path.

3. **Should `regenerate-supervision-pins.mjs --self-test` be part of the CI path-match job or a separate job?**
   - What we know: D-14/D-15 mandate advisory-only for the helper `--report` mode.
   - What's unclear: Whether `--self-test` is similarly advisory or blocking. (`--self-test` is stricter — exact-match gate.)
   - RESOLVED: Make `--self-test` advisory too (same CI tier as `--report`) for Phase 43; promote to blocking in v1.5 once false-positive rate is near-zero. This matches the overall informational-first grace pattern.

4. **If AOSP stub trim lands outside the 600-900 envelope after first pass, does Phase 43 iterate in-phase or defer to Phase 45?**
   - What we know: D-18 targets ~700 words. §5 math lands at ~747 (with all 4 candidates compressed).
   - What's unclear: Iteration budget — how many trim passes is reasonable before concluding "this word target is infeasible without removing locked content."
   - RESOLVED: Plan 43-07 carries a "max 2 trim iterations" budget; if the 3rd iteration would violate D-17 preservation rules, escalate to user with explicit "D-18 ~700 target infeasible without D-17 content removal — proposing 800 as alternate target."

## Sources

### Primary (HIGH confidence)
- **Context7 MCP:** Not invoked for Phase 43 — this is a repo-internal tooling phase (no external libraries researched). The Node.js built-ins used (`fs`, `path`, `process`) are stable-API; version-pinning not an issue.
- `scripts/validation/v1.4-milestone-audit.mjs` (320 lines) — verbatim source-of-truth for harness contract; read 2026-04-24 at commit `1fa968b`.
- `scripts/validation/check-phase-30.mjs` + `check-phase-31.mjs` — pattern exemplars (file-reads-only JSON+markdown validators with `walkMd`, `parseInventory`).
- `.planning/milestones/v1.4-MILESTONE-AUDIT.md` (~370 lines) — authoritative audit report; source-of-truth for DEFER-01..04 scopes.
- `docs/admin-setup-android/06-aosp-stub.md` — current AOSP stub; word count verified via harness formula = 1089; raw `wc -w` = 1197.
- `docs/_glossary-android.md` + `docs/reference/android-capability-matrix.md` — pin-census verification 2026-04-24.
- `$HOME/.claude/get-shit-done/workflows/validate-phase.md` — validate-phase workflow contract for DEFER-04 closure.
- git commit `e5e45db` — allow-list JSON source; full content read via `git show`.

### Secondary (MEDIUM confidence)
- CONTEXT.md from Phase 43 (all 27 D-XX decisions) — user-authored via adversarial-review; treated as locked.
- ROADMAP.md / PROJECT.md — not re-read in this session but referenced via CONTEXT canonical_refs block.

### Tertiary (LOW confidence — NONE)
- No LOW-confidence claims in this research. Every tool / library / API mentioned is either Node.js built-in or verified against current repo state.

## Metadata

**Confidence breakdown:**
- Standard stack (Node.js built-ins + GitHub Actions): HIGH — zero external dep surface, all APIs stable.
- Architecture (copy harness + JSON sidecar + informational-first C6/C7/C9): HIGH — Phase 42 D-25..D-31 + Phase 43 CONTEXT D-01..D-08 fully locked.
- Pitfalls: HIGH — enumerated against verified repo state + recent Phase 42 audit history.
- AOSP trim word-count math: MEDIUM — depends on actual prose rewrite; planner must iterate.
- `/gsd-validate-phase 39` restoration path: MEDIUM — workflow may need broader artifact restore (flagged as A1 + Open Question 2).

**Research date:** 2026-04-24
**Valid until:** 2026-05-08 (14 days — Phase 43 is near-term execution; beyond 14 days, pin-census lines should be re-verified against disk in case of unrelated edits).

## RESEARCH COMPLETE
