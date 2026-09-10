---
phase: 154-style-landing-merge-the-verified-google-style-pass
reviewed: 2026-09-01T13:32:45Z
depth: standard
files_reviewed: 3
files_reviewed_list:
  - scripts/docs-style/verify2.py
  - scripts/docs-style/subs-admin-batch9.tsv
  - scripts/docs-style/_DISPOSITIONS-docs.tsv
findings:
  critical: 0
  warning: 3
  info: 3
  total: 6
status: issues_found
---

# Phase 154: Code Review Report

**Reviewed:** 2026-09-01T13:32:45Z
**Depth:** standard
**Files Reviewed:** 3
**Status:** issues_found

## Summary

Reviewed the three source files in scope: `verify2.py` (modified, commit `789a348a`), `subs-admin-batch9.tsv` (modified, commit `a7ac71e0`), and `_DISPOSITIONS-docs.tsv` (new, commit `5a01c329`). All documentation under `docs/` and `.planning/` was out of scope and not reviewed.

Confirmed facts (not findings, recorded because the review depended on them):

- `git log -p -- scripts/docs-style/verify2.py` shows the `789a348a` diff is exactly the two described changes (`BASE` argv-ified, walk root `'.'` → `'docs'`, plus the new `import sys`) — no scope creep.
- The line-ending hazard flagged in the task brief does **not** materialize in `verify2.py`. `docs/*.md` files are checked out with CRLF (confirmed via `file` and a hexdump of `docs/_glossary-android.md`), and `core.autocrlf=true` is set with no `.gitattributes` override for markdown. But `Path.read_text()` (line 49) and `subprocess.run(..., text=True)` (lines 29-30) both default to Python's universal-newlines mode, which normalizes `\r\n`/`\r` to `\n` on read. Verified directly: neither `p.read_text()` nor `git show`'s captured stdout contains any `\r`, and both produce the same line count (338) for a sample file. The `.split('\n')` comparison in the proof loop (lines 49-65) is therefore CRLF-safe.
- All three files are plain LF, ASCII/UTF-8, no CRLF contamination, no stray trailing whitespace (`grep -c $'\r'` and `grep -n ' $'` both empty across all three).
- `subs-admin-batch9.tsv` rows 25/26 are well-formed TSV: exactly one tab, two fields, trailing newline present, verified with `awk -F'\t'` field counts.
- `_DISPOSITIONS-docs.tsv`'s six reason strings are byte-identical, in the same order, to `_DISPOSITIONS.tsv`'s six reason strings (`diff` confirms), matching the file's own header claim. It is inert unless `verify-meaning.py` is invoked with `--dispositions scripts/docs-style/_DISPOSITIONS-docs.tsv` — `verify-meaning.py`'s hardcoded default is `_DISPOSITIONS.tsv` (line 40), which is correct given the file's stated purpose as a docs/-prefixed sibling, not a replacement.

Two real gaps were found: a silent-false-pass edge case and a swallowed-error edge case in `verify2.py`, and a row 25/row 26 consistency gap in the TSV that is currently latent (zero occurrences in the corpus today, confirmed by grep) but structurally real.

## Warnings

### WR-01: `verify2.py` produces a silent, misleadingly clean report if `docs/` isn't found from cwd

**File:** `scripts/docs-style/verify2.py:43`
**Issue:** `files = sorted(p for p in pathlib.Path('docs').rglob('*.md') if '.git' not in p.parts)` walks a path relative to the current working directory, with no existence check and no non-empty check. `pathlib.Path('docs').rglob('*.md')` raises no exception when `docs` doesn't exist relative to cwd — confirmed empirically (`Path('nonexistent_dir_xyz').rglob('*.md')` returns an empty iterator, no error). If this script is invoked from any directory other than the repo root (a very plausible operator mistake, since the old walk root was `'.'` and worked from anywhere inside the tree), `files` is silently empty and the script runs to completion printing `changed lines 0`, `explained by the 4 rules 0`, `UNEXPLAINED 0`, and `resolved OK 0 / 0`. For a script whose entire purpose is to be "rigorous proof that the sweep changed ONLY what it was supposed to," a wrong-cwd invocation yields a report that reads as a clean pass rather than as "nothing was checked."
**Fix:**
```python
files = sorted(p for p in pathlib.Path('docs').rglob('*.md') if '.git' not in p.parts)
if not files:
    sys.exit("no docs/*.md files found under %r -- run from the repo root" % str(pathlib.Path('docs').resolve()))
```

### WR-02: `baseline()` discards `git show` failures instead of surfacing them

**File:** `scripts/docs-style/verify2.py:28-30`
**Issue:** `subprocess.run(['git', 'show', BASE + ':' + f], capture_output=True, text=True, encoding='utf-8').stdout` captures stderr but never reads it, and never checks `returncode`. If `BASE` is an invalid or nonexistent ref (a typo'd SHA, or a ref that predates a given file's existence at that path), `git show` fails and `.stdout` is `''`. Downstream, `''.split('\n')` is `['']` (length 1), which almost never matches the real file's line count, so every single file in the 237-file corpus gets `bad.append((p.as_posix(), 'LINE COUNT DIFFERS'))` — with no indication that the actual cause is a bad `BASE` argument rather than corpus damage. An operator seeing a wall of "LINE COUNT DIFFERS" has no way to tell a typo'd SHA apart from a real regression without re-running `git show` by hand.
**Fix:**
```python
def baseline(f):
    r = subprocess.run(['git', 'show', BASE + ':' + f],
                        capture_output=True, text=True, encoding='utf-8')
    if r.returncode != 0:
        sys.exit("git show %s:%s failed: %s" % (BASE, f, r.stderr.strip()))
    return r.stdout
```

### WR-03: Row 25 (`Admins`) lacks the `(?<!Sure )` exemption row 26 (`Admin`) just gained

**File:** `scripts/docs-style/subs-admin-batch9.tsv:25-26`
**Issue:** Row 26 was given `(?<!Sure )` this phase specifically so `Admin` → `Administrator` stops splitting HP's "Sure Admin" product label. Row 25, the plural sibling (`Admins` → `Administrators`), was not given the matching exemption. Verified with the actual compiled patterns:
```
row26 on "through HP Sure Admin — certificate" -> no match (fixed)
row25 on "Sure Admins would be a hypothetical plural" -> matches "Admins"
```
So a hypothetical "Sure Admins" would still be rewritten to "Sure Administrators," splitting the product name exactly the way row 26 was patched to prevent for the singular. This is currently latent: `grep -rn "Sure Admin" docs/` returns 30 occurrences across the corpus and every one is the singular "Sure Admin" — none are plural — so the bug does not fire against the current 237-file corpus. It is a real correctness gap the moment a plural form is authored, and the row's own header comment (lines 8-17) enumerates every other lookbehind/lookahead exclusion in detail but never lists this asymmetry as an accepted exception.
**Fix:** Add the same lookbehind to row 25 for consistency:
```
(?<!Intune )(?<!Sub-Org )(?<!Sure )(?<![\w-])Admins(?! [A-Z])(?![\w-])	Administrators
```

## Info

### IN-01: Header comment in `subs-admin-batch9.tsv` doesn't document the new `Sure` exemption

**File:** `scripts/docs-style/subs-admin-batch9.tsv:10-13`
**Issue:** The header comment's "Blocked by lookbehind:" list purports to be an exhaustive enumeration of every lookbehind exclusion in the batch ("Intune Admin(s), Sub-Org Admin(s), Google Admin account, Local Admin Setting|= Selected, [macOS Admin] and [iOS Admin] link text..., the '> Admin' UI breadcrumbs..., and the 'Standard / Admin / Groups' enum") but was not updated to mention "HP Sure Admin" when `(?<!Sure )` was added to row 26 this phase. A future editor relying on this comment (which the file leans on heavily as its design record) would not learn that "Sure Admin" is a protected case and could mistake the lookbehind clause for redundant cruft during a later cleanup pass.
**Fix:** Append "HP Sure Admin" to the "Blocked by lookbehind" list.

### IN-02: Unused import in `verify2.py`

**File:** `scripts/docs-style/verify2.py:12`
**Issue:** `import collections` is never referenced anywhere in the file (confirmed by grep — the only hit is the import line itself). Pre-existing, not introduced by this phase's diff, but present in the file as reviewed.
**Fix:** Remove the import.

### IN-03: Vestigial `.git` filter after the walk-root change

**File:** `scripts/docs-style/verify2.py:43`
**Issue:** `if '.git' not in p.parts` was meaningful when the walk root was `'.'` (the whole repo, including `.git`). Now that the walk root is `'docs'`, a top-level `.git` entry cannot appear in `p.parts` under normal repo layout, so the filter is dead weight. Harmless, but no longer serves a purpose and could confuse a reader into thinking `docs/` can somehow contain a `.git` path component worth filtering.
**Fix:** Drop the filter, or leave a one-line comment noting it's now a no-op guard against pathological nested checkouts.

---

_Reviewed: 2026-09-01T13:32:45Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
