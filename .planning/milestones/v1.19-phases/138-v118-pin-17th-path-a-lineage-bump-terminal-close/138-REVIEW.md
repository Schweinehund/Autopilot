---
phase: 138-v118-pin-17th-path-a-lineage-bump-terminal-close
reviewed: 2026-08-04T00:00:00Z
depth: standard
files_reviewed: 9
files_reviewed_list:
  - scripts/validation/check-phase-138.mjs
  - scripts/validation/check-phase-135.mjs
  - scripts/validation/check-phase-136.mjs
  - scripts/validation/check-phase-137.mjs
  - scripts/validation/v1.19-milestone-audit.mjs
  - scripts/validation/v1.19-audit-allowlist.json
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/regenerate-supervision-pins.mjs
  - .github/workflows/audit-harness-v1.19-integrity.yml
findings:
  critical: 0
  warning: 0
  info: 1
  total: 1
status: clean
---

# Phase 138: Code Review Report

**Reviewed:** 2026-08-04
**Depth:** standard
**Files Reviewed:** 9
**Status:** clean

## Summary

Reviewed the v1.19 chain-apex (`check-phase-138.mjs`), its three new leaf validators
(`check-phase-135/136/137.mjs`), the 17th Path-A audit harness + sidecar, the append-only edits to
`_lib/frozen-at-close.mjs` and `regenerate-supervision-pins.mjs`, and the 16th CI coexistence
workflow. This is validation-harness code with no runtime deployment surface, so the review was
weighted toward "does this validator fail open" rather than generic code-quality nits.

**The three mandatory hazard fixes were verified present and correctly implemented in
`check-phase-138.mjs`, and were exercised, not just read:**

1. **Explicit `maxBuffer`** — `SUBPROCESS_MAX_BUFFER = 20 * 1024 * 1024` is declared at line 100 and
   passed to both `execFileSync` call sites (line 179, CHAIN; line 214, AUDIT-HARNESS). The
   predecessor `check-phase-134.mjs` still has no `maxBuffer` set at either of its two call sites
   (lines 145–150, 176) — confirmed by direct read — so the fix is real and correctly scoped to the
   new file only, per the byte-unchanged doctrine.
2. **Narrowed `isMissing` heuristic** — line 192 restricts the classifier to
   `err.code === 'ENOENT' || err.status === 127`. The predecessor's looser heuristic (`stderr.includes('not found') || stderr.includes('Could not resolve')`, lines 155–156 of `check-phase-134.mjs`) is
   absent from the new file. A module-load throw from one of `check-phase-138.mjs`'s own dedup/length/
   termini guards firing inside a spawned child can no longer be laundered into a green skip.
3. **Non-existent chain child → FAIL, not skip** — lines 167–171 return `pass: false` with a
   "deleted predecessor validator regression" detail when a `CHAIN_PHASES` member is missing from
   disk, replacing the predecessor's `pass: true, skipped: true` graceful-skip (line 139 of
   `check-phase-134.mjs`). Verified directly via the plan's own mutation test description and by
   independently confirming `check-phase-134.mjs`'s corresponding branch is still the permissive
   graceful-skip form.

**Independently confirmed, not just trusted from the SUMMARY:**
- `CHAIN_PHASES` is generated via `Array.from({length: 90}, ...)`, spans exactly `[48..137]`, and
  excludes 138 (`node -e` re-derivation matches the file's own module-load assertions).
- Running `node scripts/validation/check-phase-138.mjs` at current HEAD produces `93 PASS, 0 FAIL,
  0 SKIPPED (total checks: 93)` — `V-138-AUDIT` now resolves to a real PASS (not the pre-close-gate
  SKIP), consistent with the domain note that this phase's `138-VERIFICATION.md` already exists at
  HEAD.
- All three new leaf validators (`check-phase-135/136/137.mjs`) run clean against the live corpus
  (7/7, 11/11, 5/5) and `v1.19-milestone-audit.mjs --verbose` is 16/16.
- `check-phase-137.mjs`'s `V-137-BULLET` check extracts the single quick-nav bullet line via a
  dedicated anchor regex and tests `bullet.includes(...)` on that isolated line only — never a
  whole-file `c.includes()` — correctly implementing the line-scoped needle the domain context called
  out as the known defect class (`check-phase-132.mjs`-style whole-file matching would have
  false-matched `docs/index.md:36`).
- `git diff <WAVE0_ANCHOR>..HEAD` against `c17-eee-contract.mjs`, `_lib/archive-path.mjs`,
  `_lib/exec-fail-detail.mjs`, and `check-phase-134.mjs` shows **zero** byte changes — the
  byte-unchanged gate (D-18) holds. The full `scripts/`/`.github/` diff for the phase is
  additive-only (9 new/append-only files, 2,719 insertions, 0 deletions outside the two
  append-only edits).
- `_lib/frozen-at-close.mjs` and `regenerate-supervision-pins.mjs` diffs are genuinely append-only
  (one new `V118` entry + `readAtV118Close` export; one new `BASELINE_23` comment block) — no
  existing line was touched.
- `v1.19-audit-allowlist.json` differs from `v1.18-audit-allowlist.json` in exactly the two header
  fields (`generated`, `phase`); all 59 line-pins are byte-identical, matching the D-20 mandate.
- `audit-harness-v1.19-integrity.yml` diffed cleanly against its v1.18 predecessor: only
  version/number tokens changed, the DUAL-APEX header paragraph is byte-identical apart from the
  renumbered citation (the documented, deliberate acceptance-criteria conflict), all three
  `.planning/` paths are present in the trigger filter, and there is deliberately no
  `check-phase-134` job (matches D-08.iii).

No Critical or Warning findings were produced. Nothing here fails open, no needle enforces less
than it claims to, and every change to a frozen/append-only surface was independently diffed rather
than taken on the SUMMARY's word.

## Info

### IN-01: `[17/16]` cosmetic label mismatch in the harness runner output (pre-existing, not introduced this phase)

**File:** `scripts/validation/v1.19-milestone-audit.mjs:993` (pattern originates in the inherited
`v1.18-milestone-audit.mjs`, confirmed byte-for-byte identical there too)
**Issue:** The runner loop labels each line `'[' + check.id + '/' + checks.length + ']'`. Because
check id 8 (C8) was retired long before v1.18 and the ids are not renumbered, the array has 16
entries but the last check's own id is 17, producing a `[17/16]` label in `--verbose` output. This
is purely cosmetic — `checks.length` (16) is used correctly everywhere it matters (loop bounds,
pass/fail/skip counters, exit code) — but it can read as "17 out of 16" to someone unfamiliar with
the id-numbering history.
**Fix:** Not a Phase 138 regression (verified identical in `v1.18-milestone-audit.mjs`, which this
file is a Path-A copy of, per D-20). No action needed this phase; a future lineage bump could switch
the label to `checks.indexOf(check) + 1 + '/' + checks.length` if the cosmetic confusion is ever
worth fixing.

---

_Reviewed: 2026-08-04_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
