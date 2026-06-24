---
phase: 86-chain-health-pass
reviewed: 2026-06-23T20:15:00Z
depth: standard
files_reviewed: 6
files_reviewed_list:
  - scripts/validation/check-phase-58.mjs
  - scripts/validation/check-phase-59.mjs
  - scripts/validation/check-phase-72.mjs
  - scripts/validation/check-phase-73.mjs
  - scripts/validation/check-phase-74.mjs
  - scripts/validation/check-phase-82.mjs
findings:
  critical: 0
  warning: 1
  info: 1
  total: 2
status: issues_found
---

# Phase 86: Code Review Report

**Reviewed:** 2026-06-23T20:15:00Z
**Depth:** standard
**Files Reviewed:** 6
**Status:** issues_found

## Summary

Reviewed the six chain validators modified in commit 690f2a4 as part of the Phase 86 "Chain Health Pass" (CHAIN-01). The changes convert HEAD-coupled assertions to frozen/archive-aware reads. The scope was narrow: two files (check-phase-58, check-phase-59) swap a single `readFile` call to `readAtV15Close`, and four files (check-phase-72/73/74/82) replace a hard-coded `.planning/phases/…` path with `resolveArchivedPhasePath(…)` calls, converting former SKIP-PASS sentinels to FAIL-if-not-found.

**Core correctness assessment — CLEAN:**

- SHA correctness: `ba2cbc0` is confirmed to be the v1.5 close commit (chore(61): close v1.5 milestone). The `COMPARISON_DOC` and all four glossary files exist at that SHA. V-58-10's 45-day cycle (`2026-05-01` → `2026-06-15` = 45 days) passes. `audience: admin` and `platform: all` both present in frozen frontmatter.
- milestoneRoots correctness: `['v1.8-phases']` is correct for phases 72/73/74; `['v1.9-phases']` is correct for phase 82. Both milestone archive directories exist under `.planning/milestones/` and contain the expected VERIFICATION.md files.
- Null-guard correctness: All four archive-aware checks follow the identical pattern `const x = resolveArchivedPhasePath(…); const content = x ? readFile(x) : null; if (!content) return { pass: false, … }`. `resolveArchivedPhasePath` is documented to return `null` (not throw), so no crash path exists on missing archive.
- SKIP-PASS → FAIL transitions: Confirmed for V-72-AUDIT-VERIFY, V-73-AUDIT, and V-82-AUDIT. V-73-INVENTORY was already `pass: false` (not a skip) in the pre-diff code; after the change it now correctly finds the archived file and passes. The commit message description is accurate for the AUDIT checks.
- `CHAIN_SKIP` is `new Set([])` in all four chain-apex files; no modifications introduced.
- `CHECK_PHASE_NESTED` guard is intact in check-phase-72/73/74/82; check-phase-58/59 have no subprocess calls so no guard is needed.
- Check-name suffixes: `[v1.5-frozen @ ba2cbc0]` added correctly to V-58-10 and V-59-24 names.

**One WARNING and one INFO finding follow.**

## Warnings

### WR-01: V-59-24 loop throws undiagnosable error if any glossary is absent at ba2cbc0

**File:** `scripts/validation/check-phase-59.mjs:648-663`
**Issue:** V-59-24 iterates `ALL_GLOSSARIES` (4 files) and calls `readAtV15Close(f)` for each. If `readAtV15Close` throws (e.g., git failure, corrupt SHA, or a file not present at `ba2cbc0`), the exception propagates out of the `run()` function and is caught by the runner's generic catch: `result = { pass: false, detail: 'Unexpected error: ' + e.message }`. The `e.message` from a failed `execFileSync` is `"Command failed: git show ba2cbc0:<path>"` — it does not include the git stderr output (e.g., `"fatal: Path '...' does not exist in 'ba2cbc0'"`), because the `stdio: ['ignore', 'pipe', 'pipe']` config in `readAtClose` pipes stderr to `err.stderr`, not to `err.message`. Additionally, the loop aborts at the first failing glossary; the remaining three are not checked. In practice all four glossaries are confirmed present at `ba2cbc0`, so this is not currently failing — but if any is removed from that historical commit (force-push scenario) or if git becomes unavailable, the failure message will be cryptic.

The same pattern applies to V-58-10 in check-phase-58, but that check reads a single file so the "which file failed" concern is trivial.

**Fix:** Extract `err.stderr` in the runner catch block, or have `readAtClose` append stderr to the thrown error message. Minimal targeted fix for V-59-24 specifically:
```javascript
// In V-59-24 run(), wrap each glossary read to surface which file fails:
for (const f of ALL_GLOSSARIES) {
  let c;
  try {
    c = readAtV15Close(f);
  } catch (e) {
    failures.push(basename(f) + ': git read failed @ ba2cbc0 (' + e.message + ')');
    continue;
  }
  const lines = c.split(/\r?\n/);
  // ... rest of loop
}
```
Alternatively, accept the current behavior since `ba2cbc0` is a historical commit that cannot lose the files in normal operation.

## Info

### IN-01: V-73-INVENTORY semantic change understated in commit message

**File:** `scripts/validation/check-phase-73.mjs:74-88`
**Issue:** The commit message states "SKIP-PASS -> FAIL on AUDIT" for check-phase-73. This is accurate for `V-73-AUDIT`. However, `V-73-INVENTORY` underwent a different transformation: before the diff it was `pass: false` (always FAIL because the live `.planning/phases/73-…` directory is gone), and after the diff it is `pass: true` (PASS via archive lookup). So `V-73-INVENTORY` changed from FAIL → PASS, not from SKIP-PASS → FAIL. The commit message omits this. The code is correct — the archive path resolves to the existing `.planning/milestones/v1.8-phases/73-retrospective-forward-port-pillar-c/73-RETRO-INVENTORY.md` — but the commit description is incomplete.

**Fix:** No code change required. For commit hygiene only: the commit message could note "V-73-INVENTORY: FAIL → PASS via archive (live dir archived; artifact now found at v1.8-phases)".

---

_Reviewed: 2026-06-23T20:15:00Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
