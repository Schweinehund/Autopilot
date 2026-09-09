# Phase 159 Plan 01 — Evidence Log

Accumulated command-sourced evidence for Plan 159-01 (Land the v1.22 milestone on `master`). Each
section corresponds to one task; every figure below is re-measured at execution time per D-65 — the
live value wins over any figure carried from `159-CONTEXT.md` or `159-RESEARCH.md`, with the delta
against the carried figure written down explicitly.

---

## §1 — Task 1: Scrub the tracked leak, annotate falsified artifacts, register the finding

### Disclosure: in-place edit of a SECURED phase's artifacts

This task edits `.planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md`
and `158-SECURITY.md`, both belonging to Phase 158, which was already marked `secured` (see
`158-SECURITY.md` Sign-Off). **Why this is safe and necessary:** the artifact itself IS the leak —
`158-VERIFICATION.md:97`'s own "Secret-scrub negative control" row quotes the literal 9-character
label it claims is absent, which both leaks the value into a tracked file and falsifies the row's own
recorded PASS verdict. The leak must be gone from the landing branch's tracked content BEFORE Task 2
squashes and archives the branch, because after that point the branch's history is frozen behind
`refs/archive/v1.22-landing` and can never be edited again without violating D-01's prohibition on
rewriting history. This is therefore the only correct place in the milestone's timeline to fix it: an
annotate-and-supersede edit (the falsified row is kept, not deleted, with a dated note explaining the
falsification), never a silent rewrite of Phase 158's own verdict.

### Derived-token scan — five D-06 surfaces, before and after the scrub

The token is derived in-process from `git diff 077b29b7^ 077b29b7 --
assets/recipes/06-walk-up-avd-kiosk/NOTICE` (removed-minus-added 9-character alphanumeric tokens;
exactly one member at that width). It is held only in a shell variable for the duration of the scan
and edit commands; it is never echoed, never written to a file, and no scanner or hash of it is
committed anywhere in this plan. This log records counts and filenames only, per D-06.

| Surface | Pre-scrub count | Pre-scrub files | Post-scrub count (working tree) |
|---|---|---|---|
| 1. Tracked files at HEAD (`git grep -l -- "$T" HEAD`) | 2 files | `.planning/phases/158-final-corpus-verification-publish-bundle/158-VERIFICATION.md`, `.planning/phases/159-harn-harness-close/159-RESEARCH.md` | 0 (working tree; commit closes surface 1 for the new HEAD) |
| 2. `git grep --untracked -l -- "$T"` | 2 files | same two files | 0 |
| 3. Every message in `origin/master..master` (`git log origin/master..master --format=%B \| grep -c`) | 0 | — | 0 (unchanged — never carried the label) |
| 4. Squash message file | N/A — not yet created; Task 2 writes it and re-scans this surface | — | N/A (deferred to Task 2) |
| 5. Blob content in `git log -p origin/master..master \| grep -c -- "$T"` | 0 | — | 0 (unchanged — the label only ever lived in the two tracked files' current content, never in a prior blob in this range) |

**Re-measured tracked population vs. D-05's carried figure (delta, per D-65):** D-05's `[MEASURED]`
figure was **exactly one tracked file, one occurrence** (`158-VERIFICATION.md:97`), true when
`159-CONTEXT.md` was authored. The live re-measurement at this plan's execution time found **two
tracked files, five total occurrences**:

- `158-VERIFICATION.md` — 1 occurrence (line 97, the negative-control command).
- `159-RESEARCH.md` — 4 occurrences (lines 80, 81, 488, 585), introduced at commit `b0a2f84a`, after
  `159-CONTEXT.md` was gathered.

**Delta: +1 file, +4 occurrences** against D-05's figure. This is a supersession, not a correction of
an error — the second file did not exist yet when D-05 was written; it was introduced later in the
same phase's own planning pipeline by the researcher agent, which is exactly the recurrence WINDOWS
row 17 is scoped to as a CLASS rather than a single site.

### Sites fixed

| File | Line(s) | Site description | Fix |
|---|---|---|---|
| `158-VERIFICATION.md` | 97 | "Secret-scrub negative control" row's own `git grep` command | Literal replaced with `<SCRUBBED-9CHAR-TOKEN>`; dated note appended after the table naming commit `179cf247` and stating the recorded verdict is now false |
| `159-RESEARCH.md` | 80 | Verified-measurements table row quoting the leak verbatim (transcribing `158-VERIFICATION.md:97`) | Literal replaced with placeholder in the quoted cell |
| `159-RESEARCH.md` | 81 | Same table's scrubbed-token-derivation row, which explicitly named the token as the derivation result | Rewritten to state that the derived token is held only in a shell variable per D-06 and is never named in the document, while still describing what is removed/added in the source diff |
| `159-RESEARCH.md` | 488 | Runtime-state table's "Secrets/env vars" row | Literal replaced with placeholder |
| `159-RESEARCH.md` | 585 | Plan Skeleton Inputs, 159-01's "Verify commands today" bullet | Literal replaced with placeholder |

A dated note was also appended in `159-RESEARCH.md` (after the Verified Measurements table) recording
the recurrence of the same defect class and naming commit `b0a2f84a` as its origin.

### `158-SECURITY.md` — T-158-01 supersession and AR-159-01 registration

Appended a `## Supersession Note — T-158-01 (Phase 159, 2026-09-09)` section stating that T-158-01's
prior `closed` disposition covered only the `audit-claimed-fixes.mjs` runner's own guards, not
`158-VERIFICATION.md:97` itself; that the threat was re-opened by the verifier's own negative control;
and that it is closed again by this plan's scrub. Registered `AR-159-01` in the Accepted Risks Log,
referencing T-158-01 and the verifier-secret-echo class, dated 2026-09-09.

### `.planning/WINDOWS.md` — row 17

Authored row 17 (phase 159, kind deviation) for the verifier-secret-echo CLASS — not the single
`158-VERIFICATION.md:97` site — citing the recurrence in `159-RESEARCH.md` as the evidence that a
site-scoped row would not have caught the second occurrence, and stating the replacing rule: derive
needles in-process, count only, scrub on the branch before any squash, never quote a scrubbed value
when documenting the scrub. Column count matches rows 1–16 (10 columns). Frontmatter counters updated:
`open_count` 14 → 15, `total_count` 16 → 17.

### Gate readings (post-edit, before commit)

Recorded from live execution; see the task's commit for the exact command output.

- `node scripts/validation/check-phase-54.mjs` — pending (recorded at commit time below)
- `node scripts/validation/check-phase-55.mjs` — pending (recorded at commit time below)
- `node scripts/validation/check-phase-56.mjs` — pending (recorded at commit time below)
