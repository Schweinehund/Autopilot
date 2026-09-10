---
phase: 159-harn-harness-close
fixed_at: 2026-09-10T16:04:12Z
review_path: D:/claude/Autopilot/.planning/phases/159-harn-harness-close/159-REVIEW.md
iteration: 1
findings_in_scope: 5
fixed: 4
skipped: 1
status: partial
---

# Phase 159: Code Review Fix Report

**Fixed at:** 2026-09-10T16:04:12Z
**Source review:** D:/claude/Autopilot/.planning/phases/159-harn-harness-close/159-REVIEW.md
**Iteration:** 1

**Verification environment:** `workflow.use_worktrees` is `false` in `.planning/config.json` --
all edits, syntax/logic checks, and commits ran directly in the main checkout at
`D:/claude/Autopilot` on branch `master` (no isolated worktree was created). The exit codes and
pass counts below are reproducible from this same tree/branch.

**Summary:**
- Findings in scope (Critical + Warning): 5
- Fixed: 4
- Skipped: 1

## Fixed Issues

### CR-01: v1.21-milestone-audit.mjs reads its Android/Linux/Apple-Business doc scope from live disk, not the frozen V121 corpus it claims to audit

**Files modified:** `scripts/validation/v1.21-milestone-audit.mjs`
**Commit:** `dfa75ff9`
**Applied fix:** Replaced the four live-filesystem `existsSync(join(process.cwd(), p))` gates in
`appleBusinessDocPaths()` (lines 138, 151), `androidDocPaths()` (line 199), and `linuxDocPaths()`
(line 250) with `FROZEN.has(p)`, matching the `v1.15`-`v1.20` precedent exactly. Corrected the
now-false header/inline comment (lines 81-90) that claimed `existsSync` was "otherwise unused by
the helpers below" -- it was actively used by all four singleton gates before this fix. Confirmed
by grep that `readFileSync`/`readdirSync`/`statSync` were genuinely dead (imported, never called)
and dropped them from the `node:fs` import; `existsSync` stays, now used solely by the live C17
contract-presence guard (lines 868, 885 -- unaffected, correctly left live per D-19).

**Diff:**
```diff
-import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
+import { existsSync } from 'node:fs';
...
-    if (existsSync(join(process.cwd(), p))) paths.add(p);
+    if (FROZEN.has(p)) paths.add(p);
```
(applied at all 4 singleton-gate call sites: lines 138, 151, 199, 250 pre-fix)

**Verification (both run post-fix, in this same tree):**
- `node scripts/validation/v1.21-milestone-audit.mjs` -- exit code 0, "16 passed, 0 failed, 0 skipped"
- `node scripts/validation/check-phase-159.mjs` -- exit code 0, "117 PASS, 0 FAIL, 0 SKIPPED"

### WR-01: check-phase-154's standalone CI job spawns python3 without a Python setup step

**Files modified:** `.github/workflows/audit-harness-v1.22-integrity.yml`
**Commit:** `01f928cf`
**Applied fix:** Added the same pinned `actions/setup-python@v5` (`python-version: '3.13'`) step
already used by `check-phase-157` and `check-phase-159` to the `check-phase-154` job (between the
`setup-node` step and the `Run check-phase-154.mjs` step). Updated the header's "PYTHON" comment
block (lines 31-33) which previously claimed the setup step was added to "exactly the three jobs"
-- it is now four, since `check-phase-154.mjs`'s own `V-154-SELFTEST` check independently spawns
`python3` via `verify-meaning.py --self-test`, unrelated to `check-phase-157.mjs`'s
authoring-standard leaf.

**Verification:** YAML parsed successfully via `node -e` with the `js-yaml` package (already
installed in this project) -- `yaml.load()` succeeded and all 13 job names (`parse`, `path-match`,
`harness-run`, `linux-chain-ubuntu-latest`, `check-phase-154`..`check-phase-159`,
`rotting-external-quarterly`, `pin-helper-advisory`, `frozen-read-probe`) enumerated correctly
after the edit. Did not attempt to execute the CI job (not runnable locally without GitHub Actions).

### WR-02: `.gitattributes` rule order lets the wildcard override the explicit `binary` declaration

**Files modified:** `.gitattributes`
**Commit:** `bdd8b45f`
**Applied fix:** Reordered the two lines so the wildcard (`* text=auto eol=lf`) comes first and the
specific `scripts/pipeline/reference.docx binary` rule comes after -- git-attributes resolution is
last-match-wins per attribute, so the specific rule now correctly wins for the `text` attribute.

**Verification -- `git check-attr -a scripts/pipeline/reference.docx`:**

Before:
```
scripts/pipeline/reference.docx: binary: set
scripts/pipeline/reference.docx: diff: unset
scripts/pipeline/reference.docx: merge: unset
scripts/pipeline/reference.docx: text: auto
scripts/pipeline/reference.docx: eol: lf
```

After:
```
scripts/pipeline/reference.docx: binary: set
scripts/pipeline/reference.docx: diff: unset
scripts/pipeline/reference.docx: merge: unset
scripts/pipeline/reference.docx: text: unset
scripts/pipeline/reference.docx: eol: lf
```

`text` is now correctly `unset` (the `binary` macro's `-text` wins, as intended). `eol: lf` remains
set from the wildcard rule but is inert -- git only applies EOL normalization when a path is
treated as text, and `text` is now unset for this path, so the file is treated as fully binary.

## Skipped Issues

### WR-04: v1.22-audit-allowlist.json carries mojibake in four reason/scope strings

**File:** `scripts/validation/v1.22-audit-allowlist.json:357,508,538,555`
**Reason:** Per explicit scope instruction: review states no functional fix is required; sidecar is
byte-pinned by a later validator, hand-editing risks a pin break. Not edited.
**Original issue:** Four string fields in `c13_rotting_external` contain the double-encoding
artifact `â€”` instead of a real em dash (`—`, U+2014), inherited unchanged (at the decoded-string
level) from `v1.21-audit-allowlist.json`. Does not affect check logic (documentation fields only,
never pattern-matched).

## Out of Scope

`fix_scope` for this run is `critical_warning`; the following Info findings from 159-REVIEW.md were
not attempted:

- **IN-01**: `v1.21-milestone-audit.mjs` C16 re-parses the sidecar instead of reusing the
  module-level `ALLOWLIST` (`scripts/validation/v1.21-milestone-audit.mjs:803`)
- **IN-02**: Duplicated `walkMd`/`readFile`/runner-loop boilerplate across the five new
  `check-phase-15{4,5,6,7,8}.mjs` content leaves (documented, deliberate no-shared-module
  convention; noted for awareness only, no action required per the review itself)
- **IN-03**: Installer's settings-merge assumes `settings.hooks.Stop` is always an array
  (`.claude/skills/jira-milestone/install-jira-milestone-hook.cjs:85-95`)

---

_Fixed: 2026-09-10T16:04:12Z_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
