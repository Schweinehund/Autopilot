---
phase: 153-harness-close-v120-pin-c17-frozen-aware-residue-19th-path-a
reviewed: 2026-08-30T00:00:00Z
depth: standard
files_reviewed: 19
files_reviewed_list:
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/regenerate-supervision-pins.mjs
  - scripts/validation/v1.15-milestone-audit.mjs
  - scripts/validation/v1.16-milestone-audit.mjs
  - scripts/validation/v1.17-milestone-audit.mjs
  - scripts/validation/v1.18-milestone-audit.mjs
  - scripts/validation/v1.19-milestone-audit.mjs
  - scripts/validation/v1.20-milestone-audit.mjs
  - scripts/validation/v1.21-milestone-audit.mjs
  - scripts/validation/v1.21-audit-allowlist.json
  - .github/workflows/audit-harness-v1.21-integrity.yml
  - scripts/validation/check-phase-145.mjs
  - scripts/validation/check-phase-146.mjs
  - scripts/validation/check-phase-147.mjs
  - scripts/validation/check-phase-148.mjs
  - scripts/validation/check-phase-149.mjs
  - scripts/validation/check-phase-150.mjs
  - scripts/validation/check-phase-151.mjs
  - scripts/validation/check-phase-152.mjs
  - scripts/validation/check-phase-153.mjs
findings:
  critical: 0
  warning: 2
  info: 3
  total: 5
status: issues_found
---

# Phase 153: Code Review Report

**Reviewed:** 2026-08-30
**Depth:** standard
**Files Reviewed:** 19 (18 listed in scope + `v1.21-audit-allowlist.json`, read as part of verifying the sidecar diff claim)
**Status:** issues_found (no Critical/BLOCKER findings; 2 Warnings, 3 Info)

## Summary

Reviewed the phase's core library changes (`frozen-at-close.mjs`'s two new write verbs), the six converted C17 legs (v1.15–v1.20), the deliberately-live-HEAD 19th Path-A harness (`v1.21-milestone-audit.mjs`), the new CI workflow, the eight content-leaf validators, and the chain apex (`check-phase-153.mjs`). Every structural claim made in the phase's 14 SUMMARY files was independently re-verified rather than trusted: ran six harnesses, the full apex (confirmed live 111/0/0), two of the eight leaves directly, diffed the two allowlist sidecars programmatically, confirmed `check-phase-140.mjs`/`c17-eee-contract.mjs`/`check-phase-132.mjs` are byte-unchanged since the V120 pin, confirmed `v1.21-milestone-audit.mjs` carries zero `frozen-at-close` references, confirmed chain-span contiguity `[48..152]` on disk, and demonstrated both `withDocsAtClose`'s error-path cleanup (works correctly) and a genuine async-callback gap (does not — see WR-01).

The engineering quality here is high: argument-array `execFileSync` throughout (no shell-string injection surface), a real path-escape guard in `materializeDocsAtClose`, retry-carrying `rmSync` for Windows, an explicit CHAIN_EXTRA disjointness guard, a floor guard against vacuous corpus-wide negatives in `check-phase-145.mjs`, and fetch-depth parity across all 16 jobs in the new CI workflow (checkout count == fetch-depth:0 count, proven failable by the plan's own probe and independently re-confirmed here). No BLOCKER-class defect was found. The two Warnings below are real, demonstrated gaps that should be fixed but do not currently manifest as incorrect behavior (both are latent — one because no current caller triggers it, the other because the guarded files are unlikely to disappear).

## Warnings

### WR-01: `withDocsAtClose` deletes the temp directory before an async callback can finish

**File:** `scripts/validation/_lib/frozen-at-close.mjs:472-480`
**Issue:** `withDocsAtClose`'s `finally { rmSync(tmpDir, ...) }` runs synchronously immediately after `fn(tmpDir, writtenPaths)` returns a value — it never checks whether that return value is a Promise and never awaits it. If a future caller passes an `async` callback (a shape the JSDoc explicitly allows: `fn: (tmpDir: string, writtenPaths: string[]) => any`), the temp directory is deleted while the callback is still mid-flight, out from under any file reads / subprocess spawns the async body performs after its first `await`.

I demonstrated this directly (not merely by inspection):
```
$ node -e "
import('./scripts/validation/_lib/frozen-at-close.mjs').then(async (m) => {
  const fs = await import('node:fs');
  let capturedDir;
  const result = m.withDocsAtClose('V115', async (tmpDir) => {
    capturedDir = tmpDir;
    await new Promise(r => setTimeout(r, 50));
    return fs.existsSync(tmpDir);
  });
  console.log('tmpDir exists immediately after withDocsAtClose returns:', fs.existsSync(capturedDir));
  console.log('what the async callback itself observed at its own 50ms mark:', await result);
});
"
tmpDir exists immediately after withDocsAtClose returns: false
what the async callback itself observed at its own 50ms mark: false
```
The directory is gone before the async callback's own `await` resolves. All six current call sites (`v1.15`–`v1.20` `-milestone-audit.mjs`) pass synchronous callbacks, so this does not manifest today, but the header's own framing ("callback-owned temp-directory lifecycle... create + cleanup in one function") invites reuse by a future async caller, and nothing in the JSDoc or the header comment block warns against it.
**Fix:** Either constrain and document the contract explicitly, or make the helper actually async-safe:
```js
export async function withDocsAtClose(milestoneTag, fn) {
  const tmpDir = mkdtempSync(join(tmpdir(), `frozen-at-close-${milestoneTag}-`));
  try {
    const writtenPaths = materializeDocsAtClose(milestoneTag, tmpDir);
    return await fn(tmpDir, writtenPaths);
  } finally {
    rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}
```
(callers would then need `await withDocsAtClose(...)`, which is compatible with all six existing synchronous call sites since `await` on a non-promise is a no-op) — or, at minimum, add a one-line JSDoc/header warning that `fn` MUST be synchronous and MUST NOT return a Promise, since the current header extensively discusses cleanup ownership without naming this constraint.

### WR-02: `V-152-HUBSNOTWIRED` vacuously passes if all three guarded hub files are missing

**File:** `scripts/validation/check-phase-152.mjs:230-246` (specifically the `if (c === null) continue;` at line 238)
**Issue:** This negative needle asserts `docs/common-issues.md`, `docs/quick-ref-l1.md` and `docs/quick-ref-l2.md` do not contain `recipes/05-`. But when a hub file is absent, the loop does `continue` ("graceful skip: hub file absent is out of this check's scope") rather than recording a failure or a floor-guard. If all three hub files were deleted or renamed in a future edit, `hits` would stay empty and the check would report **PASS** — silently defeating the very invariant (INT-05) its own detail string claims to protect ("durable by invariant, not by the small file count"). This is the exact anti-pattern the phase's own doctrine explicitly guards against elsewhere in this same wave: `check-phase-145.mjs`'s `ARCHIVALDRIFT`/`DISTROSWEEP` checks both carry an explicit `files.length < 250` corpus-floor guard specifically so a missing/emptied corpus fails loud instead of vacuously passing a 0-hit negative (T-153-27, cited in that file). No equivalent guard exists here for the 3-file HUBSNOTWIRED population.
**Fix:** Assert presence of each hub file as a precondition before evaluating the negative, mirroring the floor-guard pattern already used in `check-phase-145.mjs`:
```js
run() {
  const missingHubs = HUB_FILES.filter((hub) => readFile(hub) === null);
  if (missingHubs.length > 0) {
    return { pass: false, detail: 'HUBSNOTWIRED precondition absent: ' + missingHubs.join(', ') + ' missing -- cannot evaluate a vacuous-if-absent negative' };
  }
  const hits = HUB_FILES.filter((hub) => readFile(hub).includes('recipes/05-'));
  if (hits.length > 0) {
    return { pass: false, detail: 'HUBSNOTWIRED regression: recipes/05- referenced in ' + hits.join(', ') + ' ...' };
  }
  return { pass: true, detail: '...' };
}
```

## Info

### IN-01: Stale copy-paste literal in `v1.20-milestone-audit.mjs`'s C17 comment ("Inherited byte-unchanged into v1.16")

**File:** `scripts/validation/v1.20-milestone-audit.mjs:823-824`
**Issue:** The comment directly above the C17 `run()` function reads: `// (no exports) and its own header names Phase 119 as the fold-consumer. Inherited byte-unchanged // into v1.16 (this milestone does not re-fold or re-derive the contract).` — this is v1.20's own file, so it should read "into v1.20." The sibling files (`v1.16`, `v1.17`, `v1.18`, `v1.19`) each correctly name their own version at this exact comment position, confirming this is a copy-paste artifact rather than an intentional shared comment. Confirmed pre-existing (not introduced by Phase 153): `git show 246fa3dd:scripts/validation/v1.20-milestone-audit.mjs` already carries the identical wrong literal at the V120 close pin, before this phase touched the file. It is a comment only — no functional effect — but it sits in a file this phase materially edited (the C17 leg three lines below), so a Phase 153 contributor reading this comment top-to-bottom would be misled about which milestone the surrounding code belongs to.
**Fix:** `s/into v1.16/into v1.20/` at line 824. Low priority; harmless if left, but cheap to fix while the file is already open.

### IN-02: Unusual two-step check-object construction in `check-phase-148.mjs`, inconsistent with all seven sibling leaves

**File:** `scripts/validation/check-phase-148.mjs:166-188`
**Issue:** Every other check in this file (and in all seven sibling content-leaf files, and the apex) is built as a single `checks.push({ id, name, run() {...} })` literal. The `LIMITATIONS` check alone is split: `checks.push({ id: 'LIMITATIONS', name: '...' });` immediately followed by `checks[checks.length - 1].run = function run() {...};`. This is the only occurrence of this pattern across all nine validator files in scope (`grep -rn "checks\[checks.length - 1\]" scripts/validation/check-phase-*.mjs` → exactly 1 hit). It produces no functional difference (the object still ends up with an `id`/`name`/`run`), but it is a needless, unexplained deviation from an otherwise strictly uniform pattern that every other check in the same file and its seven siblings follows — the kind of inconsistency that invites a future editor to wonder whether something special is happening here (nothing is).
**Fix:** Inline `run()` directly into the pushed object literal, matching every sibling check in the file:
```js
checks.push({
  id: 'LIMITATIONS',
  name: 'V-148-LIMITATIONS: eight named EAM limitations, count derived from the document, present in ' + DOC_08,
  run() { /* existing body unchanged */ }
});
```

### IN-03: Self-contradicting header claim in `check-phase-151.mjs`

**File:** `scripts/validation/check-phase-151.mjs:11-15`
**Issue:** The header states in one sentence: "This validator itself makes ZERO reads under .planning/ at RUNTIME -- every path it opens is under docs/ or .planning/milestones/ (the deferred-cleanup closure record, also non-phase, non-runtime planning content)." The second clause directly contradicts the first — `.planning/milestones/v1.19-DEFERRED-CLEANUP.md` (read by `V-151-TEMPLATEDIVERGENCE`, confirmed at line 90/222) **is** a path under `.planning/`. The file's own narrower and accurate constraint appears two lines later ("RUNTIME PROHIBITION: no path passed to readFile() below resolves under `.planning/phases/`"), which is the real, correctly-scoped rule this leaf actually follows (governance ledgers under `.planning/milestones/` are treated as durable, non-ephemeral content, distinct from per-phase artifacts under `.planning/phases/`). The behavior is intentional and reasoned about correctly elsewhere in the same file; only the summary sentence at the top is wrong.
**Fix:** Reword the summary sentence to match the accurate RUNTIME PROHIBITION note below it, e.g.: "This validator makes no reads under `.planning/phases/` at RUNTIME (ephemeral per-phase artifacts); it does read one durable governance ledger under `.planning/milestones/` (the deferred-cleanup closure record)."

---

_Reviewed: 2026-08-30_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
