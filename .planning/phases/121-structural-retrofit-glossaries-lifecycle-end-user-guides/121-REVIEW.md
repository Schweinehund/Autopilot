---
phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides
reviewed: 2026-07-07T00:00:00Z
depth: standard
files_reviewed: 2
files_reviewed_list:
  - scripts/pipeline/retrofit-structural.mjs
  - docs/_registry/RE-index.md
findings:
  critical: 1
  warning: 1
  info: 0
  total: 2
status: issues
---

# Advisory Code Review: Phase 121 (`retrofit-structural.mjs` + `RE-index.md`)

**Reviewed:** 2026-07-07
**Depth:** standard (advisory, non-blocking)
**Files Reviewed:** 2
**Status:** issues

## Summary

Reviewed the new fork `scripts/pipeline/retrofit-structural.mjs` (D-08, forked from
`retrofit-reference.mjs`) and the 28 hand-authored rows it consumes in
`docs/_registry/RE-index.md` (RE-179…206, plus the pre-existing RE-175/176 rows that also fall
under its `end-user-guides/` `GUIDE_DIRS` prefix).

**What checks out clean:**
- **Mermaid hard-exclusion (D-01):** `MERMAID_DEFERRED_PATHS` contains exactly the 9 files that
  actually contain a ```` ```mermaid ```` fence under the 7 `GUIDE_DIRS` prefixes (verified by
  grep against the live tree) — no under- or over-inclusion. The guard fails closed
  (`MERMAID-DEFERRED` error) even on explicit-path invocation, not just `--all` enumeration.
- **Registry sequence integrity:** RE-001…RE-206 is a complete, gap-free, duplicate-free
  sequence (programmatically verified). All 28 rows in the RE-179…206 range, plus RE-175/176,
  resolve to real files on disk with matching paths; no orphan rows, no missing files.
- **Approved/Pending correctness:** the registry's `Pending` rows in the reviewed range are
  *exactly* the 9 Mermaid-deferred paths — a precise, verified 1:1 correspondence with the D-01
  carve-out. `Approved` rows in range all correspond to files that are, in fact, already fully
  EEE-retrofitted on disk.
- **v1.15→v1.16 VH literal:** both `NEW_ROW_2COL`/`NEW_ROW_3COL` constants correctly read
  `v1.16 EEE reformat — content not re-reviewed` (em-dash byte-verified, U+2014, matching what's
  actually landed in retrofitted files); no stray `v1.15` literal remains.
- **`detectVhColumnCount` CREATE-vs-PREPEND logic:** column-counting arithmetic is correct for
  both 2-col and 3-col header rows; spot-checked against real files with both shapes
  (`docs/lifecycle/01-hardware-hash.md` = 2-col, `docs/_glossary.md` /
  `docs/end-user-guides/android-work-profile-setup.md` = 3-col) and all three now carry a
  correctly-shaped `v1.16` row.
- Path-router/allowlist (`GLOSSARY_FILES` 6-file Set + `GUIDE_DIRS` 7-prefix list) correctly
  maps to exactly the 2 intended `doc_type`s with no prefix-collision false positives (e.g.
  `docs/lifecycle-apv2/` vs `docs/lifecycle/` are disjoint under `startsWith`).

**What does not check out (see Critical finding below):** the script has no way to detect that
a target file has *already* been retrofitted, and — as of this review — every single
non-Mermaid-deferred file in its own target set (21 of 30: all 6 glossaries + 15 of the 24
guide-dir files) is already fully retrofitted on disk (doc_id/EEE-block/`## Summary`/Version
History row all present, confirmed by direct read of 5 files spanning every category). Re-running
`--all` in write mode today would silently corrupt all 21 of them. This is a real, currently-live
risk, not a hypothetical one.

## Critical Issues

### CR-01: No idempotency guard — re-running `--all` (write mode) will corrupt every already-retrofitted target file

**File:** `scripts/pipeline/retrofit-structural.mjs:301-484` (`processFile`), `scripts/pipeline/retrofit-structural.mjs:709-753` (main loop)

**Issue:** `processFile()` has four guards (path-allowlist, Mermaid-deferred, TEMPLATE-SENTINEL,
doc-id-resolved, platform-mapped) but none of them detect "this file already has `doc_id:` /
`status:` / `owner:` / `doc_type:` in its frontmatter and an EEE block line + `## Summary` in its
body." The transform unconditionally:
1. Prepends `doc_id`/`status`/`owner`/`doc_type` (+ `platform` if absent) to whatever frontmatter
   already exists — on an already-retrofitted file this produces **duplicate YAML keys**
   (`doc_id: RE-175` twice, etc.).
2. Scans for the first H1 and treats everything between the frontmatter close and that H1 as
   "the pre-H1 span to relocate." On an already-retrofitted file, that span is exactly the
   **existing EEE block line** (`**Platform:** ... · **Doc ID:** ... · **Status:** Approved`),
   which then gets both (a) regenerated fresh immediately before the H1, and (b) relocated
   verbatim as if it were a stray blockquote, landing a second time inside the body.
3. Unconditionally inserts a brand-new `## Summary` heading with a `[FILL-IN: ...]` placeholder
   right after the H1 — even though the file's real `## Summary` (with real, reviewed prose) is
   still present a few lines later in `bodyAfterH1Lines`. The result is two `## Summary` headings
   per document, with the fabricated placeholder one appearing first.

I verified this is not a hypothetical edge case: I read 5 files spanning every category this
fork targets (`docs/end-user-guides/android-work-profile-setup.md` [RE-175],
`docs/end-user-guides/linux-intune-portal-enrollment.md` [RE-176],
`docs/_glossary.md` [RE-184], `docs/_glossary-android.md` [RE-179],
`docs/android-lifecycle/00-enrollment-overview.md` [RE-185],
`docs/lifecycle/01-hardware-hash.md` [RE-193]) — **all six are already fully retrofitted**
(doc_id/status/owner/doc_type in frontmatter, EEE block line, `## Summary` with real prose, and a
`v1.16 EEE reformat` Version History row already present with a real date, not the `YYYY-MM-DD`
placeholder). Per the registry, 21 of the 30 files this script's `--all` enumeration would select
are in this already-done state (all `Approved`, non-Mermaid-deferred rows in RE-175/176 and
RE-179…206).

Concretely: `node scripts/pipeline/retrofit-structural.mjs --all` (without `--dry-run`) run today
would silently rewrite all 21 already-Approved files with duplicated frontmatter keys, a
duplicated EEE block line embedded mid-body, and a spurious `[FILL-IN]` Summary section ahead of
the real one — with `main()` reporting `21 OK, 0 ERROR(S)` (no error signal at all, since every
guard it has still passes on an already-processed file). This is exactly the kind of "silent"
failure the fail-closed design elsewhere in the script (Mermaid carve-out, doc-id-unresolved,
sentinel) was clearly built to avoid, but the guard set doesn't cover the "already done"
case.

This gap is inherited verbatim from the template (`retrofit-reference.mjs` has the identical
absence of an already-processed check), so it isn't a regression introduced by this fork
specifically — but it is a live, exercisable defect in the file under review, and the file under
review's own target set is now in a state where invoking it is actively dangerous.

**Fix:** Add a guard at the top of `processFile()` that short-circuits (as an intentional no-op,
not an ERROR) when the frontmatter already contains a `doc_id:` key, e.g.:

```javascript
// Guard 0: already-retrofitted — a doc_id key already present in frontmatter means this file
// was already processed (by this tool or by hand); re-running would duplicate frontmatter keys,
// the EEE block line, and the Summary section. Skip cleanly rather than corrupt.
if (/^doc_id:\s*RE-\d+/m.test(fm)) {
  return { ok: false, rel, error: 'ALREADY-RETROFITTED: doc_id already present in frontmatter — skipping (not re-processing)', skip: true };
}
```
and have the main-loop reporting distinguish `skip` results from real `ERROR`s (so `--all` runs
against a mixed corpus of done/undone files report success rather than false alarms), e.g. a
`SKIP` output line and a separate `skipped` counter, with `errors` unaffected by skips.

## Warnings

### WR-01: Silent CRLF→LF conversion on write, contradicting the script's own stated assumption

**File:** `scripts/pipeline/retrofit-structural.mjs:150-156` (`readFile`), `scripts/pipeline/retrofit-structural.mjs:745` (`writeFileSync`)

**Issue:** `readFile()` unconditionally normalizes `\r\n` → `\n` ("CRLF normalization is
mandatory -- Windows repo files contain \r\n", per the inline comment at line 151), but there is
no corresponding re-conversion back to `\r\n` before `writeFileSync(..., result.newContent,
'utf8')` at line 745. If a target file actually uses CRLF line endings, running the script
against it would silently flip the entire file to LF-only line endings on write — a large,
low-signal diff unrelated to the intended content change, and a latent inconsistency with the
module's own stated assumption about the repo's line-ending convention.

In practice, the files currently in this fork's target set are already LF-only on disk (verified
programmatically for `docs/_glossary.md`: 0 CRLF occurrences), so this has not manifested yet for
this specific corpus — but the comment's premise ("Windows repo files contain \r\n") suggests the
author expected CRLF inputs to be a live case, and the code doesn't handle it symmetrically.

**Fix:** Either normalize consistently in both directions (detect original line-ending style in
`readFile` and re-apply it before `writeFileSync`), or update the comment to reflect that this
corpus is LF-only and the mixed-mode risk doesn't currently apply — but don't leave the asymmetry
undocumented.

---

_Reviewed: 2026-07-07_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: standard_
