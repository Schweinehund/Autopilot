---
phase: 68-chain-skip-root-cause-resolution-pillar-b-validator-surgery
reviewed: 2026-05-26T17:30:00Z
depth: standard
files_reviewed: 14
files_reviewed_list:
  - scripts/validation/_lib/archive-path.mjs
  - scripts/validation/check-phase-31.mjs
  - scripts/validation/check-phase-48.mjs
  - scripts/validation/check-phase-51.mjs
  - scripts/validation/check-phase-58.mjs
  - scripts/validation/check-phase-60.mjs
  - scripts/validation/check-phase-61.mjs
  - scripts/validation/check-phase-62.mjs
  - scripts/validation/check-phase-63.mjs
  - scripts/validation/check-phase-64.mjs
  - scripts/validation/check-phase-65.mjs
  - scripts/validation/check-phase-66.mjs
  - scripts/validation/regenerate-supervision-pins.mjs
  - scripts/validation/v1.5-audit-allowlist.json
findings:
  critical: 0
  warning: 4
  info: 5
  total: 9
status: issues_found
---

# Phase 68: Code Review Report

**Reviewed:** 2026-05-26T17:30:00Z
**Depth:** standard
**Files Reviewed:** 14
**Status:** issues_found

## Summary

Phase 68 (Pillar B — Validator Surgery) is a highly mechanical set of edits across 13 validator source files and 1 sidecar JSON. The architectural primitive (`_lib/archive-path.mjs` helper) is well-scoped, correctly factored, and adequately documented. CRLF normalization in check-phase-{51,58}.mjs is a straightforward verbatim copy of the established `ca40eb9` idiom. The CHAIN_SKIP atomic emptying across check-phase-{62..66}.mjs is uniform and well-narrated.

Empirical post-surgery validation **passes**:
- `v1.5-milestone-audit.mjs` exits 0 with 12/12 PASS in fully-blocking mode
- `v1.6-milestone-audit.mjs` exits 0 with 15/15 PASS
- `regenerate-supervision-pins.mjs --self-test` exits 0
- `check-phase-65.mjs` standalone runs in 101s (within new 300s timeout); `check-phase-66.mjs` runs in 202s
- 17 _glossary-android.md sidecar entries verified — every pinned `line` resolves to a line containing the expected token (`supervis|knox|SafetyNet|COPE`)
- All structural assertions in the v1.5-frozen-aware check-phase-61.mjs PASS against `git show ba2cbc0:.planning/REQUIREMENTS.md`

However, four warning-tier defects were found, with one (W-01) being load-bearing for the helper's own audit-trail integrity:

1. `regenerate-supervision-pins.mjs` was repointed v1.5→v1.6 ONLY in the `--self-test` mode; the `--report` and `--emit-stubs` modes still read `v1.4-audit-allowlist.json`, producing a misleading 15-false-positives advisory report
2. `check-phase-61.mjs` retained 60s subprocess timeouts, breaking the uniformity that the rest of the surgery established at 300s — fragile under recursive chain depth
3. `archive-path.mjs` resolves empty-string input to `.planning/phases/` (a directory) instead of `null` — defensive-coding gap
4. `check-phase-61.mjs` spawns 4 sequential `git show` subprocesses for V-61-01..04 instead of memoizing — minor wasteful work, not a correctness bug

Plus 5 info-tier observations (placeholder hygiene, comment-block consistency, etc.).

No Critical findings. No security vulnerabilities. No data-loss risks.

## Warnings

### WR-01: `regenerate-supervision-pins.mjs` --report and --emit-stubs modes read STALE v1.4 sidecar after Phase 68 surgery claimed v1.5→v1.6 repoint

**File:** `scripts/validation/regenerate-supervision-pins.mjs:289` and `:334`
**Issue:** The Plan 68-02 Wave 3 lineage repoint was incomplete. Only `doSelfTest()` at line 429 was repointed from `v1.5-audit-allowlist.json` to `v1.6-audit-allowlist.json`. Both `doReport()` at line 289 and `doEmitStubs()` at line 334 still call `parseAllowlist('scripts/validation/v1.4-audit-allowlist.json')` — a sidecar that predates the BASELINE_9 +1 shift.

Empirical evidence (run on this branch):
```
$ node scripts/validation/regenerate-supervision-pins.mjs --report
=== supervision pin report ===
Pinned (in sidecar): 18                         # <-- reads v1.4 (18 pins)
Un-pinned Tier-1 (stub-eligible): 15            # <-- 15 FALSE POSITIVES
Un-pinned Tier-2 (suspected regression): 1
Stale pins (line now has no supervision hit): 14   # <-- 14 FALSE POSITIVES
```

Sidecar pin counts confirm three lineages:
- `v1.4-audit-allowlist.json.supervision_exemptions.length = 18`
- `v1.5-audit-allowlist.json.supervision_exemptions.length = 20`
- `v1.6-audit-allowlist.json.supervision_exemptions.length = 20`

The helper's own header comment (lines 411-413) reads "parseAllowlist() lineage repointed v1.5 -> v1.6 sidecar" — claiming a single-line edit. In reality, three call-sites exist and only one was edited. The advisory `--report` mode is now structurally broken: it reports 15 false-positive Tier-1 suggestions and 14 false-positive stale-pin warnings against a sidecar that has not been v1.5 since Phase 48.

Since the self-test (the lineage gate per D-12) was correctly repointed and passes, the harness chain still PASSES. But anyone running `--report` or `--emit-stubs` interactively to maintain pins will receive misleading output — and the Phase 68-VERIFICATION.md §F carry-forward narrative for Phase 70 HARNESS-02 says "Phase 70 HARNESS-02 repoints parseAllowlist() to v1.7 sidecar at that future commit via 1-line edit (line 422)". Phase 70 will edit the wrong line again unless this is fixed first.

**Fix:**
```javascript
// At line 289 (doReport):
const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');

// At line 334 (doEmitStubs):
const allow = parseAllowlist('scripts/validation/v1.6-audit-allowlist.json');
```

And update the header comment (lines 407-413) to reflect 3-site repoint, not 1-site:
```
// BASELINE_9 refreshed 2026-05-26 (Phase 68 Plan 68-02): ... parseAllowlist() lineage
// repointed v1.5 -> v1.6 sidecar across ALL 3 call-sites (doReport L289, doEmitStubs L334,
// doSelfTest L429); forward-pointer for Phase 70 HARNESS-02 is now a 3-line edit, not 1-line.
```

---

### WR-02: `check-phase-61.mjs` subprocess timeouts NOT bumped to 300s — last validator still at 60s breaks uniformity post-empty-CHAIN_SKIP

**File:** `scripts/validation/check-phase-61.mjs:346`, `:364`, `:381`
**Issue:** Phase 68's "subprocess timeout bumped 60s→300s across 10 sites in 5 chain validators" was implemented in check-phase-{62..66}.mjs but `check-phase-61.mjs` retains 60s on its three execFileSync calls:
- L346: `timeout: 60000` on chain regression-guard spawning check-phase-{48..60}
- L364: `timeout: 60000` on v1.5-milestone-audit.mjs harness spawn
- L381: `timeout: 30000` on regenerate-supervision-pins.mjs --self-test

The CHAIN_PHASES = [48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60] for check-phase-61 currently completes well within 60s (none of these are recursive harnesses), so check-phase-61 standalone PASSES today (verified: 34 PASS, 0 FAIL, 0 SKIPPED).

But this is fragile under two foreseeable conditions:
1. When `check-phase-62.mjs` spawns `check-phase-61.mjs` (which spawns 48..60), measured wall-time accumulates through cold-start `node` process spawns. Each subprocess inherits the 60s ceiling from check-phase-61's internal calls. If any single inner call drifts past 60s (e.g., check-phase-60 takes ~8s today but grows with future phases), the chain fails uniformly.
2. The empty-CHAIN_SKIP state means check-phase-61 is now load-bearing under the spawn cascade for the first time. The Phase 68 author chose 300s as the new uniform standard for "correctness fix — empty CHAIN_SKIP forces full recursive chain traversal" (per CONTEXT). Leaving check-phase-61 at 60s violates that uniformity for no documented reason.

The pattern carry-forward risk is real: Phase 70 HARNESS-03 "Path-A copy check-phase-66 → check-phase-67..70" will inherit the 300s standard, but anyone running check-phase-61 deeper into the dependency graph will hit the inconsistent 60s. The fact that empty CHAIN_SKIP makes check-phase-61 NOT a self-loop but DOES make it a member of every chain-validator's transitive call graph is the precise reason to align it.

**Fix:**
```javascript
// L346: chain regression-guard
execFileSync('node', [path], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });

// L364: v1.5 harness spawn
execFileSync('node', [HARNESS], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });

// L381 (30s on a tiny --self-test): leave as 30s OR also bump to 300s for absolute uniformity.
// Recommendation: bump to 300s; self-test only takes ~1s, the cost is symbolic.
execFileSync('node', [PIN_HELPER, '--self-test'], { stdio: 'pipe', timeout: 300000, cwd: process.cwd() });
```

---

### WR-03: `archive-path.mjs` empty-string input resolves to directory path instead of null

**File:** `scripts/validation/_lib/archive-path.mjs:19-26`
**Issue:** The helper's contract docstring says "Returns the resolved relative path (string) or null if neither exists." But when called with an empty string:
```javascript
resolveArchivedPhasePath('')
// -> '.planning/phases/'
```
Empirically verified — the helper joins `cwd + '.planning/phases/'`, `existsSync` returns true (the directory exists), and the helper returns the directory path as if it were a file path. The downstream caller will then call `readFile(relPath)` which calls `readFileSync(abs, 'utf8')` — on Windows that throws EISDIR; on Linux it may behave differently.

While in practice no current caller passes an empty string (all call-sites pass static `'NN-name/file.ext'` strings from validator source), the helper's contract is broken for this input. Three call-sites — check-phase-48.mjs:84, check-phase-60.mjs:{31,33}, check-phase-31.mjs:33, check-phase-62.mjs:42, check-phase-63.mjs:49 — pass `phaseSuffix` strings constructed via concatenation; a future refactor could introduce empty-string at runtime (e.g., conditional construction).

Defensive-coding gap, not a security vuln (input is not user-supplied today). But the phase context's listed concern "Path-traversal security in archive-path.mjs — document caller-responsibility contract" is materially relevant: the helper SHOULD assert that `phaseSuffix` is non-empty AND does not start with `/` or `..`. Doing so closes both the empty-string trap and the (presently theoretical) traversal vector.

**Fix:**
```javascript
export function resolveArchivedPhasePath(phaseSuffix, milestoneRoots = ['v1.5-phases']) {
  // Defensive: helper contract requires non-empty, traversal-free phaseSuffix.
  // Caller-input is static-string from validator source today; this guards against
  // future refactors introducing empty-string or relative-traversal at runtime.
  if (typeof phaseSuffix !== 'string' || phaseSuffix.length === 0) return null;
  if (phaseSuffix.startsWith('/') || phaseSuffix.startsWith('..')) return null;

  const live = '.planning/phases/' + phaseSuffix;
  if (existsSync(join(process.cwd(), live))) return live;
  for (const root of milestoneRoots) {
    const archived = '.planning/milestones/' + root + '/' + phaseSuffix;
    if (existsSync(join(process.cwd(), archived))) return archived;
  }
  return null;
}
```

---

### WR-04: `check-phase-61.mjs` spawns 4 redundant `git show` subprocesses for V-61-01..04 — caller-memoization would suffice

**File:** `scripts/validation/check-phase-61.mjs:38-44`, called from `:66`, `:79`, `:88`, `:102`
**Issue:** `readRequirementsAtV15Close()` invokes `execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'], ...)` 4 times — once per V-61-01..04 check. Each subprocess spawn is ~30-50ms on Windows. Total cost: ~120-200ms wasted, fully avoidable.

V-61-01..04 each call the same accessor and discard the cached content. Standard idiom would be module-scope lazy initialization:

```javascript
let _v15Requirements = undefined;
function readRequirementsAtV15Close() {
  if (_v15Requirements !== undefined) return _v15Requirements;
  try {
    _v15Requirements = execFileSync('git', ['show', 'ba2cbc0:.planning/REQUIREMENTS.md'],
      { encoding: 'utf8', timeout: 10000 }).replace(/\r\n/g, '\n');
  } catch (err) {
    _v15Requirements = null;
  }
  return _v15Requirements;
}
```

This also pre-empts a real correctness risk: if the working tree gets into a transient state mid-validation (lock files, GC) where the second `git show` fails but the first succeeded, V-61-02..04 would FAIL while V-61-01 PASSED — confusing intermittent failure. Memoization eliminates this race window.

Severity: Warning (not Critical) because today's runs pass and the cost is small. But the recursive-chain context (check-phase-66 → 65 → ... → 61 spawning 4 git subprocesses per call) does amplify the wasted work.

**Fix:** See module-scope memoization snippet above.

---

## Info

### IN-01: Literal `{68_05_SHA}` placeholder left in 5 chain validators by intentional chicken-and-egg compromise

**File:** `check-phase-62.mjs:66`, `check-phase-63.mjs:73`, `check-phase-64.mjs:72`, `check-phase-65.mjs:67`, `check-phase-66.mjs:65`
**Issue:** Each of the 5 chain validators contains a comment block ending with:
```
// Full chain check-phase-{48..66}.mjs exits 0 on Windows host with NO CHAIN_SKIP entries
// for the first time since v1.5 close. Phase 68 close-gate: sha {68_05_SHA}.
```
The literal token `{68_05_SHA}` was deliberately left as a placeholder because Plan 68-05's own close-gate SHA cannot be self-referenced at the moment of authorship. The actual close-gate commit is `07c9a6e` (verified via `git log`); the placeholder-fill commit for `{68_03_SHA}` was `3814bee`, which only filled the inner CHAIN-03 SHA, not the outer close-gate SHA.

This is documented behavior per the phase context: "Plan 68-05 author chose chicken-and-egg Option (a) and left literal text. Acceptable comment-block hygiene OR should be backfilled in a future commit?"

Recommendation: backfill in a follow-up housekeeping commit at the start of Phase 69 (e.g., `chore: backfill {68_05_SHA} placeholder with 07c9a6e across 5 chain validators`). The comment block is documentary-only — semantic behavior is unaffected — but leaving an obviously-template-style literal in production source code is a code-smell that future readers will mistake for an unresolved TODO.

**Fix:** In a follow-up commit:
```bash
git ls-files 'scripts/validation/check-phase-6*.mjs' | \
  xargs sed -i 's/{68_05_SHA}/07c9a6e/g'
```

---

### IN-02: CHAIN_SKIP comment block uses cross-reference to a file that no longer holds the canonical narrative

**File:** `check-phase-62.mjs:51-53`, `check-phase-63.mjs:58-60`, `check-phase-65.mjs:52-54` (and `check-phase-66.mjs:48-52`)
**Issue:** Four of the five new CHAIN_SKIP comment blocks reference `check-phase-64.mjs` as the historical source of the rationale block:
```
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution (documented at scripts/validation/check-phase-64.mjs:55-73 prior to
// Phase 68 close; full historical narrative in .planning/milestones/v1.6-DEFERRED-CLEANUP.md
// "CHAIN_SKIP Resolution" section).
```

But the matching comment block in `check-phase-64.mjs:55-73` itself now says "this file historically held the CANONICAL pre-Phase-68 rationale block" — meaning the cross-reference points to a file that has been overwritten with the Phase 68 close narrative. The "documented at ... prior to Phase 68 close" phrasing is correct historically but unhelpful operationally: future readers following the cross-reference will land on the same Phase-68-close text in all 5 files.

The cross-reference only continues to make sense if a reader knows to `git blame` the file back to its pre-Phase-68 state. Reasonable for an audit trail; mildly confusing for casual readers.

**Fix:** Either (a) accept the as-is text as a deliberate audit-trail breadcrumb, OR (b) restructure the cross-reference to point to a stable URL/file (e.g., the v1.6-DEFERRED-CLEANUP.md "CHAIN_SKIP Resolution" section directly, which is already named):
```
// Pre-existing v1.5/v1.6-era failures {48, 51, 58, 60, 61} had been suppressed here pending
// root-cause resolution. Full historical narrative:
//   .planning/milestones/v1.6-DEFERRED-CLEANUP.md "CHAIN_SKIP Resolution" section
//   git log --diff-filter=D -- scripts/validation/check-phase-64.mjs for pre-Phase-68 form
```

No code change required; recommendation only.

---

### IN-03: `regenerate-supervision-pins.mjs:411-413` BASELINE_10 / BASELINE_9 narrative comment claims `Path-A inheritance pattern (v1.4.1 -> BASELINE_8 -> v1.5 -> BASELINE_9 -> v1.6 -> BASELINE_10)` but `BASELINE_9` constant remains literal name post-v1.6

**File:** `scripts/validation/regenerate-supervision-pins.mjs:399-413`
**Issue:** The Phase 66 BASELINE_10 freshness comment and Phase 68 BASELINE_9 +1 rebase comment co-exist atop a single literal `const BASELINE_9 = [...]` (line 414). The narrative documents an inheritance pattern where the constant name should rotate (BASELINE_8 → BASELINE_9 → BASELINE_10 → BASELINE_11). The code does not rotate; only the comment claims rotation.

This is fine for code-correctness (the self-test only consumes the array, not its name) but creates confusion: a reader looking for `BASELINE_10` will not find it as a constant, only as a comment line. The self-documenting promise of the inheritance pattern is partially broken.

Recommendation: either (a) accept the comment-only "logical baseline name" convention and document it clearly, OR (b) actually rename the constant to `BASELINE_CURRENT` so the comment narrative aligns with code:
```javascript
const BASELINE_CURRENT = [
  // baseline coords at HEAD (logical: BASELINE_10 at v1.6 close + Phase 68 +1 rebase)
  ['docs/_glossary-android.md', 80],
  ...
];
```

No code change required; recommendation only.

---

### IN-04: `check-phase-31.mjs:34-36` graceful-degradation branch returns `{ _missing: true, placeholders: [] }` but the inventory consumer always reads `inv.placeholders` — empty array masks missing-file errors

**File:** `scripts/validation/check-phase-31.mjs:32-42`, consumed at `:107` (V-31-21) and `:116` (V-31-24)
**Issue:** When `placeholder-inventory.json` cannot be resolved at either the live or v1.3-archived path, `parseInventory()` returns `{ _missing: true, placeholders: [] }`. The consumers at V-31-21 and V-31-24 correctly check `if (inv._missing)` and emit a FAIL with the diagnostic detail. Good defensive coding.

The minor observation: the consumer pattern at L107 reads `inv._missing` first and bails. But if the `_missing` field ever drifts (typo, partial migration), the loop `for (const p of inv.placeholders)` correctly iterates the empty array and emits a misleading PASS ("0 remaining"). Not load-bearing today because the file exists at the v1.3-archived path (verified), but the contract is slightly bidirectional: if the helper returns `{ _missing: true, placeholders: [...not-empty] }`, both early-return AND loop run.

This is the Phase 68-02 STRETCH "silent-swallow fix" working correctly; the pre-fix bug returned a silent empty inventory. Post-fix is strictly better. No change needed.

---

### IN-05: BASELINE_9 entries in `regenerate-supervision-pins.mjs:414-424` are not sorted — visual diff complexity for future +1 shifts

**File:** `scripts/validation/regenerate-supervision-pins.mjs:414-424`
**Issue:** The BASELINE_9 array mixes files in interleaved order:
```javascript
const BASELINE_9 = [
  ['docs/_glossary-android.md', 80],
  ['docs/_glossary-android.md', 82],
  ['docs/_glossary-android.md', 182],
  ['docs/_glossary-android.md', 199],
  ['docs/android-lifecycle/00-enrollment-overview.md', 51],
  ['docs/android-lifecycle/00-enrollment-overview.md', 53],
  ['docs/android-lifecycle/00-enrollment-overview.md', 83],
  ['docs/admin-setup-android/03-fully-managed-cobo.md', 36],
  ['docs/l2-runbooks/20-android-app-install-investigation.md', 21]
];
```
The 4 _glossary entries are first, then 00-enrollment-overview, then 03-fully-managed-cobo, then 20-android-app-install. Alphabetical-by-filepath would put `admin-setup-android` before `android-lifecycle` before `_glossary-android.md` (since `_` sorts before letters in ASCII). The current order is "grouped by file, by line ascending within file" — internally consistent but not alphabetical.

Recommendation (Info only): for future +N rebases, alphabetical-by-filepath would make `git diff` smaller and easier to audit. Not a defect; style preference.

---

_Reviewed: 2026-05-26T17:30:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
