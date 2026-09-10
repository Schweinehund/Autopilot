---
phase: 158-final-corpus-verification-publish-bundle
reviewed: 2026-09-08T00:00:00Z
depth: standard
files_reviewed: 25
files_reviewed_list:
  - .claude/skills/google-style-verify/SKILL.md
  - docs/_glossary.md
  - docs/_glossary-linux.md
  - docs/_registry/RE-index.md
  - docs/_standards/EEE-SOP-standard.md
  - docs/_templates/admin-template-android.md
  - docs/admin-setup-android/08-cope-full-admin.md
  - docs/admin-setup-android/09-aosp-realwear.md
  - docs/admin-setup-android/10-aosp-zebra.md
  - docs/admin-setup-android/11-aosp-pico.md
  - docs/admin-setup-android/12-aosp-htc-vive-focus.md
  - docs/admin-setup-android/13-aosp-meta-quest.md
  - docs/end-user-guides/android-work-profile-setup.md
  - docs/index.md
  - docs/l1-runbooks/01-device-not-registered.md
  - docs/operations/00-index.md
  - docs/recipes/02-shared-ipad-full-provisioning.md
  - scripts/docs-style/_DISPOSITIONS-158.tsv
  - scripts/docs-style/_JUDGE-VERDICTS-158.json
  - scripts/docs-style/_STYLE-DISPOSITIONS-158.tsv
  - scripts/docs-style/158-FIX-AUDIT.json
  - scripts/docs-style/158-FIX-AUDIT-RUN.txt
  - scripts/docs-style/audit-claimed-fixes.mjs
  - scripts/docs-style/judge-packets.py
  - scripts/validation/check-prose-style.py
findings:
  critical: 1
  warning: 2
  info: 1
  total: 4
status: issues_found
---

# Phase 158: Code Review Report

**Reviewed:** 2026-09-08
**Depth:** standard
**Files Reviewed:** 25
**Status:** issues_found

## Summary

Phase 158 adds one new executable tool (`scripts/docs-style/audit-claimed-fixes.mjs`, ~560
lines, Node built-ins only), a small enhancement to `judge-packets.py` (new `before_region`
key plus a fix to the no-anchor context window for pure-delete blocks), a one-line docstring
addition to `check-prose-style.py`, and a corpus-wide em-dash/word-choice sweep plus several
corrective prose edits across the Markdown/registry/standards files and template.

All git-argument handling in the three scripts under review is via `execFileSync` with argv
arrays (never a shell string), so there is no command-injection surface from row data, file
paths, or needles — the tools' own stated design goal here is genuinely met. `check-prose-style.py`
correctly imports the real `sweep3.py`/`check.py` symbols rather than re-implementing them, and
fails loudly (non-zero exit / thrown `SystemExit`) rather than silently defaulting to a
zero-findings pass, as its docstring promises.

The one real defect found is a logic bug in `audit-claimed-fixes.mjs`'s vacuity guard: it
misclassifies a legitimately-passing all-zero assertion (`absent_at_head`, `absent_at_parent`,
or `count_at_head_eq` with `value: 0`, used as a row's *only* assertion) as `FAIL (vacuous)`
instead of `PASS`. This is demonstrated empirically below. It does not corrupt the current
46-row shipped audit result (`158-FIX-AUDIT.json` / `158-FIX-AUDIT-RUN.txt`, both 46/46 PASS)
because every shipped row happens to pair such an op with a companion op that produces a
non-zero count — but the bug is real, reproducible, and will misfire the next time this
"TERMINAL TOOL" is pointed at a row that verifies pure removal-to-zero with no companion
assertion. A second, related defect is that the module's top-level CLI dispatch is unguarded,
so importing any of its `export function`s as a library (exactly the use its JSDoc and
`export` keywords invite) triggers `process.exit()` as a side effect of import.

The Markdown/registry content changes in this phase's diff hunks were checked for broken
links/anchors, contradictions, and mangled tables; only the already-recorded WINDOWS.md #16
spaced-em-dash residue was found (correctly attributable to a documented sweep3 guard
limitation, not a new defect).

## Critical Issues

### CR-01: Vacuity guard produces a false FAIL for a legitimately-zero sole assertion

**File:** `scripts/docs-style/audit-claimed-fixes.mjs:216-234, 266-268`
**Issue:**
`assertRow`'s vacuity guard treats "every count produced by this row's assertions is zero" as
proof the row measured nothing meaningful, and fails the row with `reason: 'vacuous'` — even
when `verdict` would otherwise be `PASS`. But three ops (`absent_at_head`, `absent_at_parent`,
`count_at_head_eq` with `value: 0`) are *designed* to succeed exactly when their measured count
is zero. A row that uses one of these ops as its only assertion (a natural way to assert "this
fix removed the needle down to zero, full stop") can never pass: when the needle really is
gone, `countsUsed` is `[0]`, every count is zero, and the vacuity check fires unconditionally
before the per-op direction check is ever consulted.

Reproduced directly against the shipped `assertRow` logic (fixture: a needle present at parent,
absent at head, single assertion `{ op: 'absent_at_head' }`):
```
legit correct removal, sole absent_at_head assertion -> {"verdict":"FAIL","reason":"vacuous","counts":{"absent_at_head":0}}
```
This is a demonstrably wrong verdict for demonstrably correct data.

The bug does not currently corrupt `scripts/docs-style/158-FIX-AUDIT.json` /
`158-FIX-AUDIT-RUN.txt` (46/46 PASS) — every shipped row that uses `absent_at_head` or
`absent_at_parent` pairs it with `present_at_head`/`present_at_parent`/`count_decreased_vs_parent`,
whose own non-zero half saves the row from the all-zero vacuity check. But this is incidental to
how the 46 rows happen to have been authored, not something the tool enforces or the self-test
(`--self-test`) exercises — none of the four self-test cases (a/b/c/d) constructs a row whose
*sole* assertion is one of these three zero-on-success ops. The next row authored this way
(explicitly invited by the ops' own documented semantics: "absent_at_head" / "absent_at_parent" /
"count_at_head_eq" with a `0` value) will silently misreport a correct fix as unverified.

**Fix:** Exclude counts produced by explicitly zero-expected ops from the vacuity computation,
or track "did any op assert an expected-zero outcome" separately from "did every produced count
happen to be zero":
```javascript
// Track whether this row asserted an expected-zero outcome at all; only treat
// an all-zero count set as vacuous when nothing in the row expected zero.
let assertedExpectedZero = false;
...
case 'absent_at_parent': {
  const c = countAt(`${row.fix_sha}^`, row.path, row.needle, cwd);
  counts.absent_at_parent = c;
  countsUsed.push(c);
  assertedExpectedZero = true;
  if (c !== 0) failReason = failReason || 'direction';
  break;
}
// ...same for absent_at_head and count_at_head_eq with a.value === 0...

if (!assertedExpectedZero && countsUsed.length > 0 && countsUsed.every((c) => c === 0)) {
  return { id: row.id, verdict: 'FAIL', reason: 'vacuous', counts };
}
```
Add a fifth self-test case exercising a row whose sole assertion is `absent_at_head` (or
`count_at_head_eq: 0`) against a fixture where the needle is genuinely gone, asserting `PASS`.

## Warnings

### WR-01: Unguarded top-level CLI dispatch runs (and can `process.exit`) on module import

**File:** `scripts/docs-style/audit-claimed-fixes.mjs:49-53, 71, 84, 105, 191, 281, 338, 542-559`
**Issue:** The module exports six functions (`gitLsTreeNonEmpty`, `countOccurrences`,
`countInBlob`, `assertRow`, `rowSetHash`, `driftEvidence`) with `export function`, signaling
they are meant to be reusable/testable independent of the CLI. But the file's CLI dispatch block
(lines 542-559) runs unconditionally at module top level — there is no
`if (import.meta.url === \`file://${process.argv[1]}\`)` guard. Importing this file from any
other script (a unit test, a future harness, another docs-style tool) executes the dispatch
logic against *that other script's* `process.argv`, and on the common case where no matching
flag is present, calls `process.exit(1)` after printing the usage string — silently aborting
the importing process before any of its own code (including code that imported this module
specifically to call `assertRow` for a one-off check) can run.

Reproduced directly: `import { assertRow } from './audit-claimed-fixes.mjs'` from a sibling
script, run with no CLI flags of its own, prints `Usage: audit-claimed-fixes.mjs --rows <path>
--log <path> | --drift <path> --log <path> | --self-test` and exits 1 before the importing
script's own subsequent code executes.

Currently nothing in the repository imports this module (confirmed via repo-wide grep — every
recorded invocation is `node scripts/docs-style/audit-claimed-fixes.mjs ...`), so there is no
live breakage today. But the exports exist for a reason, the self-test only exercises the
direct-CLI path, and the very first thing a future consumer will hit is an unexplained
`process.exit(1)`.

**Fix:**
```javascript
const argv = process.argv.slice(2);
const isMain = process.argv[1] && import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`;
if (isMain) {
  if (argv.includes('--self-test')) {
    selfTest();
  } else {
    // ...existing dispatch...
  }
}
```
(Windows path separators need normalizing for the `file://` comparison, as shown, since this
repo's validators run on both Windows and Linux.)

### WR-02: `--drift` mode has zero test coverage in `--self-test`

**File:** `scripts/docs-style/audit-claimed-fixes.mjs:335-373, 400-533`
**Issue:** `--self-test` (D-48) proves four cases, all against `assertRow`/`countAt`/secret-row
evidence. `runDrift`/`driftEvidence` — the drift-attribution mode that plan 158-06 depends on per
the module's own header comment ("Written now (D-47), exercised by plan 158-06 (D-21)") — is
never exercised by `--self-test` at all: no fixture repo, no synthetic `drift[]` array, no
assertion that `unattributed_rows` is computed correctly for either the attributed or
unattributed case. A regression in `driftEvidence`'s `git show --name-only` parsing (e.g. a path
separator mismatch between the `attributed_to` SHA's reported path and `row.file`/`row.path` on
Windows) would go undetected by the one command (`--self-test`) this file offers as its
self-check.
**Fix:** Add a fifth self-test block: build a small fixture commit that touches a known path,
write a synthetic `*-GATE-BASELINE.json`-shaped object with one attributed and one unattributed
`drift[]` row, call `runDrift`-equivalent logic (or refactor `runDrift`'s per-row loop into an
exported, directly-testable function) and assert the two rows classify correctly.

## Info

### IN-01: Spaced em dash at docs/recipes/02-shared-ipad-full-provisioning.md:286 (already recorded)

**File:** `docs/recipes/02-shared-ipad-full-provisioning.md:286`
**Issue:** The line `Undoing federation is therefore a change made where it was made—see
[Managed Apple Account Provisioning](../cross-platform/apple-business/08-managed-apple-account-provisioning.md)
— and it reaches every Managed Apple Account...` still carries one spaced em dash (immediately
after the link's closing paren) even though this phase's sweep tightened the first em dash on
the same line. This is exactly the sweep3 PROTECT-segment/lookbehind guard limitation already
recorded as `.planning/WINDOWS.md` entry 16 (link-adjacency class, same root cause as WINDOWS
rows 12/14 from Phase 156) — correct guard behavior per the frozen sweep3.py/tsv constraints for
this phase, not a new defect.
**Fix:** None required for this phase; tracked as an open WINDOWS.md deviation for a future
milestone that revisits the sweep3 lookbehind guard's link-adjacency blind spot.

---

_Reviewed: 2026-09-08_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
