---
phase: 60-audit-harness-v1-5-finalization
reviewed: 2026-05-06T00:00:00Z
depth: standard
files_reviewed: 4
files_reviewed_list:
  - scripts/validation/check-phase-60.mjs
  - scripts/validation/regenerate-supervision-pins.mjs
  - scripts/validation/v1.5-audit-allowlist.json
  - scripts/validation/v1.5-milestone-audit.mjs
findings:
  critical: 0
  warning: 2
  info: 6
  total: 8
status: issues_found
---

# Phase 60: Code Review Report

**Reviewed:** 2026-05-06T00:00:00Z
**Depth:** standard
**Files Reviewed:** 4
**Status:** issues_found

## Summary

Reviewed the 4 source files modified in Phase 60's audit-harness-v1.5 finalization:

1. `scripts/validation/check-phase-60.mjs` (NEW, 311 lines, 25 V-60-NN structural assertions)
2. `scripts/validation/regenerate-supervision-pins.mjs` (BASELINE_9 refresh + comment line)
3. `scripts/validation/v1.5-audit-allowlist.json` (3 new sidecar arrays + BASELINE_9 pin coordinate refresh)
4. `scripts/validation/v1.5-milestone-audit.mjs` (C9/C11/C13 promoted to blocking, C12 H2-anchor expansion)

The implementation is largely correct — JSON parses cleanly, all sidecar pin coordinates verified to match real corpus content, C9/C11 produce zero violations against the current docs corpus, the regenerate-supervision-pins `--self-test` passes (11 new pins / 9 baseline / 0 unpinned Tier-2), `v1.5-milestone-audit.mjs` exits 0 (12/12 PASS), and `check-phase-60.mjs` is at 24/25 PASS today.

However, two meaningful defects warrant fixing before this code is treated as a reproducibility anchor:

- **WR-01:** The 11-phase regression-chain (V-60-12..22) silently masks failure detail because the subprocess error path reads `err.stderr` while the chained validators write FAIL details to `stdout`. As proof, `check-phase-53.mjs` is currently failing (V-53-22 forbidden-H2 regression), and `check-phase-60` reports only `"check-phase-53 FAIL: "` with empty body. This blocks debugging exactly when it matters most.
- **WR-02:** `CHAIN_PHASES` excludes phase 50 based on an incorrect rationale (claims `check-phase-50.mjs` is a "stub validator without full assertions"). In fact `check-phase-50.mjs` is a 422-line validator with 26 V-50-NN assertions that pass 26/26 today. Phase 50 docs (admin-setup-linux/, linux-capability-matrix.md, etc.) exist on disk. A regression in phase 50 will not be guarded by V-60 chain.

Six lower-severity issues (correctness-adjacent, diagnostic-quality, or weak-assertion) are noted under Info.

## Warnings

### WR-01: V-60-12..22 chain validators discard failing-check details

**File:** `scripts/validation/check-phase-60.mjs:227-233`, also `:244-250` (V-60-23 same pattern)
**Issue:** The subprocess error handler reads only `err.stderr` for the FAIL detail string. All `check-phase-NN.mjs` scripts in the chain write their FAIL lines and Summary line to `process.stdout`, leaving `stderr` empty on a normal validation failure (only crashes / missing-node would surface there). When a chained validator fails (e.g., today `check-phase-53.mjs` exits 1 because V-53-22 detects a forbidden H2 in `00-index.md`), `check-phase-60.mjs` reports:

```
[16/25] V-60-16: check-phase-53.mjs exits 0 (Phase 53 V-NN-NN regression-guard) FAIL -- check-phase-53 FAIL:
```

The colon hangs with no detail, so an operator cannot tell whether the failure is in V-53-01, V-53-22, or anywhere in between without manually re-running. This defeats the purpose of a regression-chain validator.

**Fix:** Capture both streams and surface stdout when stderr is empty:

```js
} catch (err) {
  const stderr = err.stderr ? err.stderr.toString() : '';
  const stdout = err.stdout ? err.stdout.toString() : '';
  const isMissing = err.code === 'ENOENT' || err.status === 127
    || stderr.includes('not found') || stderr.includes('Could not resolve');
  if (isMissing) return { pass: true, skipped: true, detail: 'node not found -- skipped' };
  // Surface tail of stdout (where check-phase-NN.mjs writes FAIL lines) when stderr is empty.
  const detail = stderr.trim() || stdout.split('\n').filter(l => /FAIL/.test(l)).slice(-3).join(' | ').slice(0, 240);
  return { pass: false, detail: 'check-phase-' + phaseNum + ' FAIL: ' + (detail || '(no diagnostic; see manual run)') };
}
```

Apply same pattern to V-60-23 (line 244-250) and V-60-10 (line 185-191).

### WR-02: CHAIN_PHASES excludes phase 50 based on incorrect rationale; silent regression-coverage gap

**File:** `scripts/validation/check-phase-60.mjs:33-37`
**Issue:** The CHAIN_PHASES exclusion comment states:

```
// Phase 50 (Linux Admin Setup + Capability Matrix) intentionally excluded -- Phase 50 is
// 'Not started' per ROADMAP:471; check-phase-50.mjs is a stub validator without full assertions until
// Phase 50 ships content.
```

Two factual problems:

1. **The line number is wrong.** ROADMAP.md line 481 (not 471) carries the Phase 50 row. (Use `grep -n "^| 50\\. " .planning/ROADMAP.md`.)
2. **`check-phase-50.mjs` is NOT a stub.** It is a 422-line validator with 26 V-50-NN assertions (V-50-01..26) covering file existence, pinned H2s, NEGATIVE regression-guards, cross-link forward/reverse pairs, PITFALL-2/3 callouts, DPO-01 anchor back-links, and 60-day frontmatter cadence. Running it today: 26 passed, 0 failed, 0 skipped (exit 0).

Phase 50 docs exist on disk (`docs/admin-setup-linux/00-overview.md` through `05-conditional-access.md`, plus `docs/reference/linux-capability-matrix.md` and `docs/end-user-guides/linux-intune-portal-enrollment.md`), so the assertions have real content to validate. The exclusion is incorrect: a regression in phase 50 will be silently uncovered until phase 60 close.

**Fix:** Add 50 to CHAIN_PHASES and renumber the V-NN assignment loop, OR document the actual reason for exclusion (e.g., ROADMAP-status pending) with accurate line citation. Recommend adding:

```js
const CHAIN_PHASES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59];
```

This grows V-60-12..23 to 12 entries and shifts V-60-23..25 to V-60-24..26. Alternative: keep the exclusion but rewrite the comment to reflect actual status (Phase 50 ROADMAP-row says "Not started" but content has shipped; exclusion is a deliberate choice pending ROADMAP update — if that's the actual reason, say so).

## Info

### IN-01: ROADMAP line citation in CHAIN_PHASES comment is off by 10

**File:** `scripts/validation/check-phase-60.mjs:35`
**Issue:** Comment says `'Not started' per ROADMAP:471`. Actual line is 481.
**Fix:** Update to `ROADMAP:481` (or remove the line citation; an explicit phase-name reference is more durable across ROADMAP edits).

### IN-02: parseAllowlist() swallows JSON parse errors with no operator-visible diagnostic

**File:** `scripts/validation/v1.5-milestone-audit.mjs:71-79`
**Issue:** On JSON parse failure, `parseAllowlist()` returns an object with `_parseError: err.message` plus empty arrays for `safetynet_exemptions` / `supervision_exemptions`. The `_parseError` field is set but never logged anywhere, and the missing array fields (`cope_banned_phrases`, `c7_knox_allowlist`, `c9_exemptions`, `c11_ops_exemptions`, `c13_broken_link_allowlist`) cause C13 to fail with a misleading "expected 15 entries, got 0" message instead of "JSON parse error: <reason>".

When C9/C11/C13 are blocking, a malformed sidecar produces a meaningless failure trail. Operators have to inspect `parseAllowlist` source to discover that `_parseError` exists.

**Fix:** Log `_parseError` to stderr at top of script when it's set, so operators see the real cause:

```js
const ALLOWLIST = parseAllowlist();
if (ALLOWLIST._parseError) {
  process.stderr.write('WARN: sidecar JSON parse error: ' + ALLOWLIST._parseError + '\n');
}
```

### IN-03: V-60-07 / harness C13 only validate sidecar shape, not pin-coordinate accuracy

**File:** `scripts/validation/check-phase-60.mjs:128-146`, `scripts/validation/v1.5-milestone-audit.mjs:607-618`
**Issue:** Both V-60-07 and the harness C13 check assert exactly: 15 entries, 6 transient_external, 9 template_placeholder. Neither verifies that each `{file, line, target}` triple corresponds to an actual broken-link occurrence in that line of that file. A sidecar entry pointing to `docs/_templates/admin-template-ios.md:57` with target `"link"` (current sidecar line 75) is silently accepted even if line 57 of that file no longer contains a broken-link match — analogous to the "stale pin" concern that `regenerate-supervision-pins.mjs` explicitly flags for supervision pins.

The harness comment defers full sweep to CI markdown-link-check, which is reasonable. But V-60-07 is a structural-shape check by name; the lack of coordinate-validity verification is a known limitation worth documenting in the assertion's comment so future readers don't assume the structural check is comprehensive.

**Fix:** Either add a "stale pin" detector (fail if the file at `entry.line` does not contain a markdown-link-syntax token), OR clarify in the comment that V-60-07 is shape-only and full coordinate validation lives in CI mlc.

### IN-04: C12 cell-hyperlink regex `/\[.+\]\(.+\)/` is greedy but currently safe

**File:** `scripts/validation/v1.5-milestone-audit.mjs:582`
**Issue:** The cell-bearing-link assertion uses greedy `.+` which would mis-match a cell containing both `[Bold]` and `[Link](url)` (it would scan from the first `[` to the last `)`, ignoring intermediate brackets without parens). Today the canonical 6-col tables in `docs/reference/4-platform-capability-comparison.md` always carry exactly one `[verb](url)` per cell, so the regex passes; but a future cell containing `**[Mode-dependent]** ([matrix](url))` would still match (because greedy spans whole cell) — fine. A cell containing `[orphan-bracket-text]` followed by no parens would correctly fail. Robustness is adequate but not bulletproof.

**Fix:** Tighten to non-greedy + word-boundary:
```js
if (trimmed && trimmed !== '—' && trimmed !== 'N/A' && !/\[[^\]]+\]\([^)]+\)/.test(trimmed)) { ... }
```

This requires the link's bracket pair and paren pair to be balanced individually. Same patch in 4-platform-capability-comparison.md if any cell uses pipes inside HTML — currently none do.

### IN-05: C11 keyword `transition` matches as substring inside `transitional`, `transitioning`, etc.

**File:** `scripts/validation/v1.5-milestone-audit.mjs:516`
**Issue:** The disambiguation-keyword regex is:

```js
/successor|deprecated|historical|disambiguation|mutual-exclusion|mutually\s+exclusive|co-management|migration|transition|replacement|PITFALL-9|first-occurrence|callout/i
```

`transition` and `migration` lack word boundaries. A doc paragraph containing `transitional` or `migrationary` — anywhere within ±200 chars of an SCCM/Intune anti-pattern — would suppress the violation as legitimate disambiguation. This is a soft over-suppression risk; not currently triggered (C11 has 0 violations against today's corpus) but could mask real anti-patterns in v1.6+ content.

**Fix:** Add `\b` boundaries to substring-prone keywords:

```js
/\bsuccessor\b|\bdeprecated\b|\bhistorical\b|\bdisambiguation\b|\bmutual-exclusion\b|\bmutually\s+exclusive\b|\bco-management\b|\bmigration\b|\btransition\b|\breplacement\b|PITFALL-9|\bfirst-occurrence\b|\bcallout\b/i
```

(Hyphenated tokens like `mutual-exclusion` already have de-facto boundaries from the hyphen.)

### IN-06: c7_knox_allowlist[] contains duplicate {file, line} keys (pre-existing, not phase-60)

**File:** `scripts/validation/v1.5-audit-allowlist.json:45-46`, `:50-51`
**Issue:** The c7_knox_allowlist has duplicate `(file, line)` entries:
- Line 143 of `07-knox-mobile-enrollment.md` appears twice (entries for "Knox silently produces" and "Knox does not recognize" — both legitimate, but a single allowlist key would suffice).
- Line 123 of `_glossary-android.md` appears twice (entries for "Knox is Samsung's" and "Knox Vault" — same situation).

The C7 check builds a `Set` from `e.file + ':' + e.line`, so duplicates are deduplicated at runtime. Behavior is correct but the JSON is noisy. This is pre-existing (not Phase 60) but a future cleanup target. No fix required for Phase 60 close; flagged for backlog.

**Fix (optional):** Collapse duplicate entries in a future allowlist refresh — keep one entry per `(file, line)` pair and concatenate the `reason` strings, or accept the duplication as documenting per-occurrence intent.

---

_Reviewed: 2026-05-06T00:00:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
