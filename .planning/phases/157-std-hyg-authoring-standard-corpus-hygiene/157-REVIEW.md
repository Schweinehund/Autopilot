---
phase: 157-std-hyg-authoring-standard-corpus-hygiene
reviewed: 2026-09-06T02:51:33Z
depth: standard
files_reviewed: 8
files_reviewed_list:
  - scripts/validation/check-prose-style.py
  - .claude/skills/google-style/check.py
  - .claude/skills/google-style/SKILL.md
  - scripts/docs-style/_CONTENT-PINS.txt
  - scripts/docs-style/_PINNED-HEADINGS.txt
  - scripts/docs-style/RESUME.md
  - CLAUDE.md
  - docs/_standards/EEE-SOP-standard.md
findings:
  critical: 0
  warning: 2
  info: 2
  total: 4
status: issues_found
---

# Phase 157: Code Review Report

**Reviewed:** 2026-09-06T02:51:33Z
**Depth:** standard
**Files Reviewed:** 8
**Status:** issues_found

## Summary

I read all 8 files in full, ran `check-prose-style.py` in both `--self-test` and normal mode
against the live tree, ran `check.py` against the full 294-file corpus to cross-check the
docstring's candidate-count claim, and traced the actual line-by-line order of operations
between `check-prose-style.py`, `check.py`'s `mask_code`, and `sweep3.py`'s `PROTECT`/`quoted_lines`
filter chain by hand.

**The central risk this review was scoped to check — a rule that cannot fire but reports
zero — is not present.** Both gated rules (`anthropomorphism`, `person-first`) fire on
synthetic violations in `--self-test` (verified: 7/7 self-test assertions pass, and I
independently confirmed cases 3/4 are a genuine paired positive/negative control by hand-tracing
`sweep3.PROTECT` offsets against the masked-line offsets `mask_code` preserves). The two
dead-regex rules from `check.py` (`vague-link`, `empty-alt`) are correctly excluded from the
gated set rather than silently trusted, and I independently reproduced the masking mechanism
that kills them (`\]\([^)]*\)` in `mask_code` blanks the `](` sequence both regexes require,
before `RULES` ever iterates). The `--self-test` mode never touches the corpus (confirmed by
reading it — it uses `tempfile.mkdtemp`/`shutil.rmtree` exclusively). The file-count floor is
correctly secondary, not the primary anti-vacuity proof — the primary proof is the hard
`return 1` on an empty `git ls-files` enumeration, which I confirmed exists ahead of any other
logic in `run_normal`. All subprocess calls use argument arrays, not shell strings, and none of
the `git`/`check.py` subprocess call sites swallow a non-zero return into a false pass (the
`git` call sites check `returncode` explicitly and exit; `run_checkpy` does not check
`returncode`, but a crashed/partial `check.py` run is still caught by the file-count floor,
since a partial run necessarily emits fewer per-file headers than files enumerated). The module
imports `check.py`/`sweep3.py` by file location into synthetic module names never registered in
`sys.modules`, so there is no stale/shadowed-symbol risk, and both dependency files guard their
entry point with `if __name__ == "__main__":`, so importing them for their symbols alone has no
side effects — confirmed by reading both files' bottoms. The two pin files
(`_CONTENT-PINS.txt`, `_PINNED-HEADINGS.txt`) each received exactly one well-formed, correctly
placed entry (`## Prose Style Authoring Standard`) matching their respective existing formats;
nothing was misfiled between them. `EEE-SOP-standard.md`'s new section makes no claim the gate
does not back — I independently reproduced its two load-bearing numeric claims (294 tracked
files / 237 EEE-enrolled / 57 remainder, and the 26/19/360/1 = 406 hunk tally) and both check out
exactly against the live tree.

Two real defects remain, both in `check-prose-style.py` itself, detailed below. Neither is a
"reports zero when it shouldn't" defect — one is an over-firing risk (opposite direction, lower
severity), and one is a documentation-accuracy defect (stale line-number citations) inside the
one file whose entire stated purpose is to be a forensically precise account of this exact
masking mechanism.

## Warnings

### WR-01: `check-prose-style.py`'s person-first filter omits the front-matter skip that `sweep3.py` itself applies

**File:** `scripts/validation/check-prose-style.py:248-295` (function `unprotected_person_first_in_file`)
**Issue:** The function's own docstring claims: "Apply sweep3's own semantics, in sweep3's own
order (D-03)" and then lists the skip chain: quoted-block, fence, indent, heading, table row,
agent-speech marker, `KEEP_LINE`, then `PROTECT` spans. This is a faithful line-for-line port of
`sweep3.sweep()`'s filter chain — except for one thing `sweep3.sweep()` does that this function
does not: `sweep3.py` computes a YAML front-matter end offset (`front`) and skips every line
`i <= front` before any other check runs (`scripts/docs-style/sweep3.py:200-206` sets `front`;
line ~213 in the per-line loop does `if i <= front: continue`). `check-prose-style.py` never
computes an equivalent `front` boundary, so YAML front-matter lines are fed straight into the
person-first scan alongside real prose. I verified empirically that none of the 294 tracked
files currently trigger this (a script check of every front-matter block against the
person-first regex found zero hits), so the live gate is unaffected today. But the claim of
exact semantic parity with `sweep3.py` is false as written, and the gap is a false-positive risk,
not a false-negative one: a future front-matter field containing a standalone `us`/`we`/`our`/
`ours` token (e.g., a `description:` or `summary:` key phrased in first person) would be flagged
as an "unprotected" person-first hit and fail the gate, even though it is YAML metadata that
`sweep3.py`'s own protection semantics — the semantics this function claims to reproduce exactly
— would skip outright.
**Fix:** Port the same front-matter boundary detection `sweep3.py` uses (skip a leading
`<!--...-->` comment block, then skip a leading blank run, then find the closing `---` of a
`---`-fenced front-matter block) and skip lines `i <= front` before entering the per-line filter
chain, exactly as `sweep3.sweep()` does. Add a `--self-test` case with a synthetic front-matter
value containing a standalone person-first token to prove the skip works, mirroring the existing
paired positive/negative control for quoted spans.

### WR-02: Three hardcoded `check.py:NN` line citations in the module docstring are stale by exactly +8 lines

**File:** `scripts/validation/check-prose-style.py:5-6, 70`
**Issue:** The docstring cites `check.py:66` for the `mask_code` link-target substitution,
`check.py:121` for where `RULES` "ever runs", and `check.py:139-142` for the `--no-headings`
skip-set logic. I checked all three against the current `.claude/skills/google-style/check.py`:
the `]\(...\)` substitution is actually at line 74, the `for rid, rx, note in RULES:` loop is at
line 129, and the `--no-headings` skip-set block is at lines 146-149. Every citation is off by
exactly 8 — the exact size of the docstring addition this same phase made to `check.py`
(commit `1e80bfc5`/the docstring-only diff adds 8 lines to `check.py`'s module docstring), which
was never propagated to `check-prose-style.py`'s hardcoded citations. This has no effect on the
gate's exit code or behavior — it is a comment-only defect — but it sits inside the one file in
this phase whose stated purpose is to be the authoritative, re-verifiable account of exactly this
masking mechanism (the file's own header states "A divergence between the recorded regex and the
one implemented here is a defect, not a refinement"), and a future maintainer who trusts the
citation instead of re-reading `check.py` (the exact failure mode this file exists to prevent)
will look at the wrong line. Note `scripts/docs-style/sweep3.py:199` (the one non-`check.py`
citation) is correct — `sweep3.py` was not touched in this phase, which is why only the
`check.py` citations drifted.
**Fix:** Update the three citations to `check.py:74`, `check.py:129`, and `check.py:146-149`.

## Info

### IN-01: `--self-test` never exercises `CLASS_EXCLUDED_DIRS` end-to-end through `scan_needles`

**File:** `scripts/validation/check-prose-style.py:309-327, 451-459`
**Issue:** `self_test()` cases 5-7 prove each of the three needle regexes (`literal`, `fix11`,
`class`) matches a synthetic string via `NEEDLES[...].search(needle_line)` directly. That proves
the regexes themselves are not dead. It does not exercise `scan_needles()`, the function actually
used in `run_normal`, which additionally computes `class_excluded = rel.startswith(
CLASS_EXCLUDED_DIRS)` per file and suppresses a `class`-needle hit when true. No self-test fixture
places a synthetic file inside a `docs/_standards/`-like or `docs/_registry/`-like relative path
and confirms the exclusion actually suppresses the count there while still counting the same hit
for a file outside those directories. A future edit that inverted this condition (e.g.
`not rel.startswith(...)`, or a typo in `CLASS_EXCLUDED_DIRS`) would pass `--self-test` cleanly
while silently changing which real files get the `class`-needle exemption.
**Fix:** Add a `--self-test` case that calls `scan_needles` directly (not just the bare regex)
against two synthetic relative paths carrying the same needle line — one under
`docs/_standards/...` and one under an ordinary `docs/...` path — and asserts the count differs
by exactly one between them.

### IN-02: Leak-needle scan is line-at-a-time, inheriting `sweep3.py`'s documented architectural limitation, for a class of string that could in principle wrap

**File:** `scripts/validation/check-prose-style.py:309-327` (function `scan_needles`)
**Issue:** `scan_needles` splits each file on `\n` and searches each line independently, the same
architecture `sweep3.py` uses for its own edits (and the same architecture this project's own
history flags as having caused a real miss before — a pinned string can be "seen" as LOST but
never as an introduced wrong one, per this project's own prior lesson on line-at-a-time guards).
A leak-needle token such as `.planning/research/PITFALLS.md` that were split across a hard line
wrap (the token itself broken mid-string by a literal newline in the source Markdown) would not
match `NEEDLES["literal"]`/`NEEDLES["fix11"]`/`NEEDLES["class"]` on either half-line, and the gate
would report a clean 0 for that instance while the string is still present in the rendered
document. I checked whether this project's own prose is hard-wrapped at a fixed column (which
would make this a live risk) — it is not: sampled files carry lines up to 400+ characters, and
the corpus is authored one-sentence/clause-per-line rather than column-wrapped, so a citation
token being split mid-string by an incidental line break is unlikely today. This is a structural
limitation worth naming rather than a demonstrated live miss.
**Fix:** No action required unless this project later adopts hard column-wrapping for prose; if
it does, `scan_needles` should join and re-split on sentence boundaries, or scan the whole file
text with `re.MULTILINE`/`re.DOTALL`-aware patterns instead of a per-line split, before trusting a
zero count from a wrapped corpus.

---

_Reviewed: 2026-09-06T02:51:33Z_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
