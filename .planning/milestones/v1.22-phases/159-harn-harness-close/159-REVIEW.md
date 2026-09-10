---
phase: 159-harn-harness-close
reviewed: 2026-09-10T00:00:00Z
depth: standard
files_reviewed: 16
files_reviewed_list:
  - .claude/skills/jira-milestone/install-jira-milestone-hook.cjs
  - .gitattributes
  - .github/workflows/audit-harness-v1.22-integrity.yml
  - .gitignore
  - scripts/hooks/pre-push.sh
  - scripts/hooks/README.md
  - scripts/validation/_lib/frozen-at-close.mjs
  - scripts/validation/check-phase-154.mjs
  - scripts/validation/check-phase-155.mjs
  - scripts/validation/check-phase-156.mjs
  - scripts/validation/check-phase-157.mjs
  - scripts/validation/check-phase-158.mjs
  - scripts/validation/check-phase-159.mjs
  - scripts/validation/regenerate-supervision-pins.mjs
  - scripts/validation/v1.21-milestone-audit.mjs
  - scripts/validation/v1.22-audit-allowlist.json
  - scripts/validation/v1.22-milestone-audit.mjs
findings:
  critical: 1
  warning: 4
  info: 3
  total: 8
status: issues_found
---

# Phase 159: Code Review Report

**Reviewed:** 2026-09-10
**Depth:** standard
**Files Reviewed:** 16 (17 listed; `scripts/validation/v1.22-audit-allowlist.json` reviewed as data, not source, and folded into the findings on `v1.22-milestone-audit.mjs`)
**Status:** issues_found

## Summary

This phase's payload is the v1.22 harness-close apex (`check-phase-159.mjs`), the freshly-converted frozen predecessor harness (`v1.21-milestone-audit.mjs`), the still-live v1.22 harness, five new content leaves (154-158), the CI workflow that wires them together, and two hand-written git hooks plus their installer/doc.

The apex (`check-phase-159.mjs`) is internally well-guarded: the chain math, dedup/length/termini/disjointness guards, and the HARN03 leg were spot-checked against the live repository and all measured claims (contiguity of `check-phase-{48..158}.mjs` on disk, the V120→V121 `docs/recipes/05-enterprise-update-plan.md` one-step-back discriminator, the `_JUDGE-VERDICTS-batch10.json` normalized byte length, and `check-phase-157.mjs`'s live PASS run) checked out exactly as documented.

The one finding that matters is a real regression: **`v1.21-milestone-audit.mjs`, the harness this phase itself converted to frozen-corpus reads, silently reads its Android/Linux/Apple-Business "root singleton" doc paths off the LIVE filesystem instead of the frozen V121 snapshot** — a correctness bug that contradicts both this file's own header claim ("reads its own frozen corpus everywhere") and the pattern used by every other already-converted sibling (v1.15 through v1.20), which all use the frozen-aware form at the equivalent call sites. The bug is dormant today only because the affected files still exist on disk at HEAD, so `V-159-HARN03`'s "exits 0" check cannot see it — exactly the kind of one-time-measurement blind spot this project's own harness culture is built to avoid.

Four warnings and three info items round out the review: a CI Python-setup gap specific to `check-phase-154.mjs`, a `.gitattributes` rule-ordering issue that silently overrides the `binary` classification on the one binary path in the repo, a design note about `pre-push.sh` being described as "the sole mechanical guard" while being an optional, bypassable, manually-installed hook, and minor dead-code/data-quality notes.

## Critical Issues

### CR-01: v1.21-milestone-audit.mjs reads its Android/Linux/Apple-Business doc scope from live disk, not the frozen V121 corpus it claims to audit

**File:** `scripts/validation/v1.21-milestone-audit.mjs:138,151,199,250`

**Issue:**
This file's header (lines 13-26) and in-line comment (lines 81-87) both assert that, after the Phase 159 Plan 159-04 conversion, the harness "reads its corpus and its sidecar frozen at its own milestone-close SHA (V121 = e129081e) ... instead of live HEAD" and that `existsSync` "stays in place because the C17 leg's existence guard is deliberately still live and is **otherwise unused by the helpers below**."

That claim is false. `androidDocPaths()` (line 199), `linuxDocPaths()` (line 250), and `appleBusinessDocPaths()` (lines 138 and 151) all still gate their "root singleton" file list with:

```js
if (existsSync(join(process.cwd(), p))) paths.add(p);
```

`existsSync(join(process.cwd(), p))` stats the **live working tree**, not the frozen V121 snapshot (`FROZEN`, built via `createFrozenCorpusReader('V121', ...)` at line 91). Every directory-walk branch in the same three functions correctly uses `walkMd()`, which is frozen-aware (`FROZEN.paths.filter(...)`, `frozen-at-close.mjs:104-109`) — only the singleton-file branches regressed.

This is a genuine functional defect, not a style nit: `readFile()` (line 97-100) reads through `FROZEN.get()`, so a file that exists live but was absent at V121 is silently skipped (`if (!content) continue`) — harmless, if wasteful. But a file that existed **at V121** and was later renamed or deleted from the live tree is now **excluded from `paths` entirely**, even though it is still enumerable via `FROZEN.paths` and its content is still fetchable via `FROZEN.get()`. That means checks C1, C2, C5, C7, C9 (via `androidDocPaths`), C10 (via `linuxDocPaths`), and C14/C15/C16 (via `appleBusinessDocPaths`) — 8 of this harness's 16 registered checks — can silently stop auditing part of the frozen V121 corpus the moment the live tree diverges from it, defeating the entire point of freezing a milestone-close harness for reproducibility.

Confirmed by direct comparison: every already-converted predecessor uses the correct frozen-aware form at the identical call site —
```
scripts/validation/v1.15-milestone-audit.mjs:165:  if (FROZEN.has(p)) paths.add(p);
scripts/validation/v1.16-milestone-audit.mjs:105,118,166,217: if (FROZEN.has(p)) paths.add(p);
scripts/validation/v1.17-milestone-audit.mjs: (same, 4 sites)
scripts/validation/v1.18-milestone-audit.mjs: (same, 4 sites)
scripts/validation/v1.19-milestone-audit.mjs: (same, 4 sites)
scripts/validation/v1.20-milestone-audit.mjs:108,121,169,220: if (FROZEN.has(p)) paths.add(p);
```
`v1.21-milestone-audit.mjs` is the only converted harness in the entire lineage that uses live `existsSync` instead of `FROZEN.has(p)` at these sites — this is a phase-159-introduced regression relative to its own stated template, not an inherited, previously-accepted pattern.

The bug is currently dormant: running `node scripts/validation/v1.21-milestone-audit.mjs` at HEAD today reports "16 passed, 0 failed, 0 skipped" because all the singleton files (`docs/_glossary-android.md`, `docs/_glossary-linux.md`, `docs/_glossary-apple-business.md`, `docs/admin-setup-macos/01-abm-configuration.md`, `docs/admin-setup-ios/02-abm-token.md`) still exist live. `V-159-HARN03` in `check-phase-159.mjs` only asserts "exits 0" and a `withDocsAtClose` substring reference — it cannot detect this, so the apex is green while carrying the defect forward invisibly into v1.23.

**Fix:**
```js
// scripts/validation/v1.21-milestone-audit.mjs — apply at lines 138, 151, 199, 250
// Before:
if (existsSync(join(process.cwd(), p))) paths.add(p);
// After (matches v1.15-v1.20 precedent exactly):
if (FROZEN.has(p)) paths.add(p);
```
Also correct the now-doubly-false comment at lines 84-87 (`existsSync` is not "otherwise unused by the helpers below" — remove that clause once the fix lands and `existsSync` truly becomes C17-only), and drop the now-fully-dead `readFileSync` import (line 70) alongside the already-acknowledged unused `readdirSync`/`statSync`.

## Warnings

### WR-01: check-phase-154's standalone CI job spawns python3 without a Python setup step

**File:** `.github/workflows/audit-harness-v1.22-integrity.yml:121-134` (job `check-phase-154`); `scripts/validation/check-phase-154.mjs:160-181` (`V-154-SELFTEST`)

**Issue:** The workflow header (lines 31-33) states the pinned Python setup step "is added to exactly the three jobs that transitively run the authoring-standard leaf (check-phase-157.mjs): `linux-chain-ubuntu-latest`, `check-phase-157`, `check-phase-159`. Nowhere else." That rationale is incomplete: `check-phase-154.mjs`'s own `V-154-SELFTEST` check independently spawns `execFileSync('python3', [VERIFY_MEANING, '--self-test'], ...)` (line 166), entirely unrelated to `check-phase-157.mjs`. The standalone `check-phase-154` job (lines 121-134) has no `actions/setup-python@v5` step.

Worse, unlike `check-phase-157.mjs`/`check-phase-158.mjs`'s `isMissingRuntime()` classifier (which treats a missing runtime as a graceful `{ pass: true, skipped: true }`), `check-phase-154.mjs`'s own classifier (lines 167-171) treats `err.code === 'ENOENT'` as a hard `{ pass: false, ... }` FAIL. Today this is masked because GitHub-hosted `ubuntu-latest` runners ship a system `python3`, but the job's correctness is accidental, not guaranteed by the workflow's own stated Python-provisioning contract, and a hard FAIL here is `continue-on-error: false` — it blocks the required check.

**Fix:** Either add `actions/setup-python@v5` (matching the version used by `check-phase-157`/`check-phase-159`, currently `3.13`) to the `check-phase-154` job, or change the workflow header's rationale to explicitly acknowledge `check-phase-154.mjs` as a fourth Python-dependent job and rely on the runner's system Python deliberately (in which case `V-154-SELFTEST`'s hard-FAIL-on-ENOENT should be reconsidered to match the graceful-skip pattern used elsewhere, or the discrepancy documented).

### WR-02: `.gitattributes` rule order lets the wildcard override the explicit `binary` declaration

**File:** `.gitattributes:1-2`

**Issue:**
```
scripts/pipeline/reference.docx binary
* text=auto eol=lf
```
Git's `gitattributes` precedence is: for a given path, when multiple lines match, a **later** line overrides an **earlier** line, per attribute. Here `* text=auto eol=lf` (line 2) matches `scripts/pipeline/reference.docx` too and comes after line 1, so it overrides the `text` attribute that the `binary` macro (line 1) set to `-text` — the net result for `reference.docx` is `diff=unset, merge=unset, text=auto, eol=lf`, not the fully-binary `diff=unset merge=unset text=unset` the author intended. In practice this is very likely harmless only because git's `text=auto` heuristic independently detects the NUL bytes in a real `.docx` (a zip archive) and refuses to line-ending-normalize it — but the explicit `binary` declaration is not actually doing the job the line implies, and the safety net is an implicit heuristic rather than the stated declaration.

**Fix:** Reorder so the specific override comes after the wildcard:
```
* text=auto eol=lf
scripts/pipeline/reference.docx binary
```

### WR-03: `pre-push.sh` is documented as "the sole mechanical guard" but is optional, per-clone, and bypassable

**File:** `scripts/hooks/pre-push.sh:1-11`; `scripts/hooks/README.md:53-80`

**Issue:** The header states this hook "is the sole mechanical guard between the archived history and any remote push," guarding against the scrub-source commit (`9a114815...`) ever reaching a remote. But per the README's own install instructions, the hook is copied manually per developer clone (`cp scripts/hooks/pre-push.sh .git/hooks/pre-push`), is not distributed or enforced by git itself, is not referenced by any CI workflow in this review's scope, and is explicitly documented as bypassable via `git push --no-verify`. A fresh clone that never runs the manual install step has no guard at all, and any push author can trivially skip it. For content whose disclosure this phase went to specific lengths to scrub, relying solely on an opt-in local hook (with no CI-side backstop scanning pushed refs/commits for the same SHA) is a real gap between the stated guarantee ("the sole mechanical guard") and what is actually enforced.

**Fix:** At minimum, soften the "sole mechanical guard" claim to reflect that it is opt-in, or add a CI-side check (e.g., a scheduled job that fetches all remote refs and greps for the scrub-source SHA) as the actual enforcement backstop, with `pre-push.sh` only as fast local feedback.

### WR-04: v1.22-audit-allowlist.json carries mojibake in four `reason`/`scope` strings, inherited but re-serialized

**File:** `scripts/validation/v1.22-audit-allowlist.json:357,508,538,555`

**Issue:** Four string fields in the `c13_rotting_external` object contain the double-encoding artifact `â€”` (Windows-1252-decoded-then-re-UTF-8-encoded em dash) instead of a real `—`. This corruption is not new to this phase — `v1.21-audit-allowlist.json` carries the identical corrupted codepoints, just serialized as `â€”` JSON escapes instead of literal UTF-8 bytes — so the content is unchanged, only its on-disk encoding form changed during the Path-A copy. This does not affect any check logic (these fields are human-readable `reason`/`scope` documentation, never pattern-matched), but it does mean the header's claim that the sidecar was carried forward "byte-identical, per D-23" is not literally true at the byte level (only at the decoded-string level), and the pre-existing corruption itself was never caught or flagged in either generation's authoring.

**Fix:** No functional fix required; if the sidecar is ever hand-edited again, replace the four corrupted sequences with a real em dash (`—`, U+2014) and note the correction in the phase's evidence file.

## Info

### IN-01: `v1.21-milestone-audit.mjs` C16 re-parses the sidecar instead of reusing the module-level `ALLOWLIST`

**File:** `scripts/validation/v1.21-milestone-audit.mjs:803`

**Issue:** Every other check reads the module-level `ALLOWLIST` (computed once at line 126 via `parseAllowlist()`), but C16's `run()` calls `parseAllowlist()` again, re-reading and re-parsing the frozen sidecar on every invocation. Harmless (frozen reads are memoized in `FROZEN`), but inconsistent with the rest of the file and slightly obscures that C16 uses a separately-scoped local `sidecar` variable rather than the shared `ALLOWLIST` constant used everywhere else.

**Fix:** Replace `const sidecar = parseAllowlist();` with `const sidecar = ALLOWLIST;` for consistency (this exact duplication is also present, byte-for-byte, in `v1.22-milestone-audit.mjs:796`, where it's at least consistent with that file's non-frozen, cheap `readFileSync`-based `parseAllowlist()`).

### IN-02: Duplicated `walkMd`/`readFile`/runner-loop boilerplate across all five new content leaves

**File:** `scripts/validation/check-phase-154.mjs:52-77,233-259`; `check-phase-156.mjs:55-80,208-235`; `check-phase-157.mjs:73-98,372-399`; near-identical `padLabel`/runner blocks in `check-phase-155.mjs` and `check-phase-158.mjs`

**Issue:** `readFile()`, `walkMd()`, `padLabel()`, and the final runner `for` loop are copy-pasted verbatim (down to comment wording, e.g. "structural copy of check-phase-145.mjs:57-76 walkMd") across all five leaves plus the apex. This is a deliberate, documented convention in this codebase (each `check-phase-N.mjs` is self-contained by design, per the "Path-A copy" / "no-shared-module" precedent already established for the milestone-audit harnesses), so this is not a new defect — it's flagged here only because a future shared-lib extraction (mirroring `_lib/frozen-at-close.mjs` and `_lib/exec-fail-detail.mjs`) would remove several hundred duplicated lines with no behavior change, if the project ever revisits the no-shared-module rule for standalone chain leaves.

**Fix:** No action required under the current convention; noted for awareness only.

### IN-03: Installer's settings-merge assumes `settings.hooks.Stop` is always an array

**File:** `.claude/skills/jira-milestone/install-jira-milestone-hook.cjs:85-95`

**Issue:** `settings.hooks.Stop = settings.hooks.Stop || []` only substitutes a fresh array when the existing value is falsy. If a developer's `.claude/settings.local.json` already has a non-array truthy value under `hooks.Stop` (e.g., a single object instead of an array — a plausible hand-edit mistake), the subsequent `settings.hooks.Stop.push(...)` (line 91) throws an uncaught `TypeError`, crashing the installer with a raw stack trace instead of a clear error message.

**Fix:**
```js
if (!Array.isArray(settings.hooks.Stop)) settings.hooks.Stop = settings.hooks.Stop ? [settings.hooks.Stop] : [];
```

---

_Reviewed: 2026-09-10_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
