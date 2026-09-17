# Phase 161 — Evidence Record

This file is the shared evidence record all four plans in Phase 161 append to (D-57). It is a
`files_modified` entry in every plan's frontmatter, which is what makes the phase's sequential
depends-on chain a real shared-file dependency rather than reflexive chaining (D-35). 161-01
creates the first two task-headed sections below; 161-02, 161-03 and 161-04 append their own.

## Task 1 (161-01): Gate baseline

Full figures recorded in `161-GATE-BASELINE.json` (single `phase_baseline` snapshot, sha
`fa951b90`). Summary below; see the JSON for every `invocation` string.

**Structural gate — six validators, all green pre-edit:**

| Validator | Result | Wall-clock |
|---|---|---|
| `check-phase-54.mjs` | Summary: 32 passed, 0 failed, 0 skipped | — |
| `c17-eee-contract.mjs` | 237 files checked, 0 with violations, 0 total (all 13 assertions at 0) | — |
| `check-nav-hub-links.mjs` | 0 hub-presence failure(s), 0 corpus-link failure(s), 0 total | — |
| `check-phase-155.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED | — |
| `check-phase-156.mjs` | 10 PASS, 0 FAIL, 0 SKIPPED (also the V-156-ADMIN-4 reading: `administrator`=10 on RE-237) | — |
| apex `check-phase-159.mjs` | 117 PASS, 0 FAIL, 0 SKIPPED (un-nested) | 124s |

**Environment probes:** `claude auth status` → `loggedIn: true`. `claude -p` one-word PONG probe →
round trip returned `PONG`. Root `npm test` → fails immediately (`'vitest' is not recognized`,
frontend deps not installed); this is the pre-existing baseline `161-RESEARCH.md` records, a
**compare-not-count** anchor — the identical failure before and after this wave is the no-drift
signal, never a pass requirement. `git status --porcelain` shows `.planning/STATE.md` modified
(session tracking) plus two pre-existing untracked paths, `.claude/skills/fireworks-tech-graph/`
and `.planning/milestone.lock`, both out of scope for this phase.

**Style instruments — recorded as reports, never thresholds:**

`check.py --no-headings` on RE-237 → 93 candidates (report-only; the finished corpus carries
thousands). `sweep3.py` run PER DIRECTORY: `docs/recipes` → 0 TOTAL edits, 563 pins loaded, nonzero
protected counts (291 table row, 29 validator-pinned string, 1 cited verbatim quotation) proving a
genuine scan occurred; `docs/reference` → 0 TOTAL edits, protected counts 848 table row, 3 heading
line, 2 UI label line. Both sweep3 blind spots restated here: it skips every line starting with the
pipe character, so it can never see a table cell, and it sets the em-dash rule off unconditionally,
so D-28's tight-em-dash requirement for new `docs/` strings has no instrument at all — that check is
a hand ruling deferred to 161-04 Task 6.

**Pin residency (RE-237, seven rows, three are 161's delta over 160's baseline):** `Ask the admin:`
callouts = 5; `What breaks if misconfigured:` callouts = 9; `administrator` = 10; `ruled
2026-09-10` = 1 (161 delta); `Deploy-WindowsApp.ps1` = 4 (161 delta); ASCII ` -- ` = 0 (161 delta,
confirming tight em dash U+2014 is the only long-dash idiom in this file); contiguous `>` blockquote
runs = 27, max joined run length = 197 chars (under the C17 #12 200-char cap).

**Line endings** recorded for the four files this phase edits (RE-237, NOTICE, the PSADT functions
file, the Baseline README) — all four are LF-only and end with a newline. The `pending` sub-object
carries `git check-attr -a` readings for the two not-yet-existing vendored paths
(`Files/RemoveBloat.ps1`, `Files/LICENSE.GPL-3.0.txt`): both read `text: auto` and `eol: lf`, making
D-06's "the eol rule is a no-op on these LF files" claim a reading rather than an assumption.

`test ! -e scripts/validation/check-phase-161.mjs` succeeds — no leaf validator was authored in this
phase; Phase 167 owns that leaf under HARN-04.

## Task 2 (161-01): Amendment landing

**`check-phase-54.mjs` gate bracket, both readings recorded verbatim:**

- Immediately before the first `Edit`: `Summary: 32 passed, 0 failed, 0 skipped`
- Immediately after the fourth `Edit`: `Summary: 32 passed, 0 failed, 0 skipped`

No drop occurred; the four appends did not break a live-read assertion.

**Four antecedent confirmations (`grep -cF`, each 1 in its owning file and 0 in the other):**

| Antecedent | ROADMAP.md | REQUIREMENTS.md |
|---|---|---|
| E-A1 — "the script carries the same Authenticode signing chain as the rest of the Baseline package" | 1 | 0 |
| E-A2 — "re-signed with the same Authenticode chain the Baseline package already uses" | 0 | 1 |
| E-A3 — "a pilot-device run's second-boot block-sensor reading is recorded as `[PILOT]`" | 1 | 0 |
| E-A4 — "the change is exercised once on the pilot device with the second-boot block-sensor reading recorded as `[PILOT]`" | 0 | 1 |

Confirms the ROADMAP pair and the REQUIREMENTS pair are not interchangeable: each amendment quotes
only text its own file actually contains.

**Amendment-marker and placeholder counts:** `SUCCESS-CRITERION AMENDMENT` = 3 in `ROADMAP.md` and 3
in `REQUIREMENTS.md` (one pre-existing plus two added in each). Unsubstituted `D-NN` placeholder
count across both files = 0.

**VND anchor greps (all three bullets still unchecked and start-anchored):**
`^- \[ \] \*\*VND-0[23]\*\*:` on `REQUIREMENTS.md` = 2. `^- \[ \] \*\*VND-01\*\*:` = 1. No
`requirements.mark-complete` invocation of any kind appears anywhere in this plan's transcript or
its commits — `VND-02` and `VND-03` remain unchecked precisely because this plan declares
`requirements: []`.

**`roadmap.get-phase 161`:** returns `found: true` with exactly 3 `success_criteria`; criteria 2 and
3 each carry their amendment inline.

**Landing commit:** `e7a9792a` — `docs(161-01): amend Phase 161 SC2/SC3 and VND-02/VND-03 for the
signing and pilot clauses`.

**PART G needle rows re-measured at this plan's own landing commit** (each plan re-measures its own
needles rather than deferring all nine to 161-04, D-45):

| # | Needle | Value at `e7a9792a` |
|---|---|---|
| 36 | `SUCCESS-CRITERION AMENDMENT` count, ROADMAP | 3 |
| 37 | `SUCCESS-CRITERION AMENDMENT` count, REQUIREMENTS | 3 |
| 38 | `D-NN` placeholder count, both files | 0 |

**D-27 label precedent:** `D-27` is already a live amendment label in three archived milestone files
(carried decision-ledger references from earlier milestones); this is the norm here too, because
each new string names Phase 161 explicitly and cannot be confused with an earlier milestone's use of
the same decision-label shorthand.

**D-41 — corroboration, not load-bearing:** E-A1's and E-A2's ground is the ruling (Phase 161
pilot-checkpoint scoping), not a measurement. The signature-block reading
`grep -rlF '# SIG # Begin signature block' assets/` is corroboration only: it returned no match
(exit 1, zero files) at this plan's landing commit — true before 161-02 lands the vendored bytes,
and PART G row 9/10 record it will name exactly the vendored script and no EEE-authored file
afterward. No validator guards that reading and none is added here; it is re-measured, not cited as
a gate.

---

## Task 1 (161-02): Vendoring identity record

**Pin confirmation.** `commits?path=De-Bloat/RemoveBloat.ps1&per_page=1` returned exactly one
commit object at execution time: SHA `11918c5085b1be5ba25ace74c5cf3a52bfd37b26`, author date
`2026-09-03T10:11:27Z` (not carried forward from `161-RESEARCH.md` without re-confirmation).
`contents/De-Bloat/RemoveBloat.ps1?ref=<sha>` returned blob SHA-1
`80c67dcf35418bd675dd2f8e1a4b2ade576a5440` and `size: 179789`, matching the byte count measured
independently below. `repos/.../license` confirmed `spdx_id: GPL-3.0` (name "GNU General Public
License v3.0") — the registry-level confirmation that the committed license text is the
repository's own declared license.

**Two-fetch compare, both files.** `RemoveBloat.ps1` fetched twice from
`raw.githubusercontent.com/andrew-s-taylor/public/<sha>/De-Bloat/RemoveBloat.ps1`: `cmp` reported
no difference (`SCRIPT_MATCH`); both copies SHA256
`bf0f4bd01991bb1becf5e33a24ad410c3781281afe3c1774cbf3225a17d24e99`, 179789 bytes, 4405 lines.
`LICENSE` fetched twice from the same SHA: `cmp` reported no difference (`LICENSE_MATCH`); both
copies SHA256 `3972dc9744f6499f0f9b2dbf76696f2ae7ad8af9b23dde66d6af86c9dfb36986`, 35149 bytes, 674
lines. Neither compare was unequal; no HALT was triggered.

**LF confirmation.** Both fetched copies and both committed copies report `LF-ONLY` (no byte 13
present) at their measured byte counts (179789 / 35149).

**`git check-attr -a` comparison.** Both new paths read `text: auto` and `eol: lf` before `git add`,
identical to 161-01's pre-existence reading in `161-GATE-BASELINE.json` (`line_endings.pending`) —
confirming the `* text=auto eol=lf` rule is a demonstrated no-op on these LF files, not an
assumption.

**Upstream-declared script version:** `5.6.4`, read from the script's own `.NOTES` block at line 20
(`Version: 5.6.4`, `Author: Andrew Taylor`).

**Modification set: EMPTY.** No header, no in-file notice, no marker was added to either file. The
committed bytes equal the fetched bytes at every measurement above (staged-blob check via
`git show :<path> | sha256sum`, and post-commit `git show HEAD:<path> | sha256sum`, both matching
the independently fetched SHA256 for both files).

**Landing commit:** `52ca0535` — `feat(161-02): vendor RemoveBloat.ps1 and the GPL-3.0 license text
at a pinned commit`. `git show --stat --name-only` lists exactly the two vendored paths and nothing
else.

**PART G needle rows re-measured at this plan's landing commit (`88f564db`, after Task 2):**

| # | Needle | Value |
|---|---|---|
| 1 | vendored script present | rc 0 |
| 2 | blob identity (`git show HEAD:<path> \| sha256sum`) | `bf0f4bd0…` — equals the NOTICE pin |
| 3 | LICENSE present | rc 0 |
| 4 | LICENSE identity | `3972dc97…` |
| 5 | GPL title count | 1 |
| 6 | GPL version line count | 1 |
| 9 | upstream SIG block, file | 1 |
| 10 | upstream SIG block, tree-wide | 1 (row 1's path only) |

## Task 3 (161-02): Scrub scan

**Employer-name scan.** The needle was derived in-process from an out-of-repository source (the
owner-delivered, not-yet-committed ConfigMgr package staging tree at `D:\Temp\05-configmgr-client\`,
the same source Ruling 1 and its Rule-2 scope extension scrubbed in Phase 155-03) rather than from
any value persisted in this repository — no artifact in `.planning/` or `assets/` carries the
employer's name in any form, by design, and this execution machine is a personal, non-domain-joined
WORKGROUP host with no `RegisteredOrganization` registry value, so no ambient signal exists either.
The needle's second dot-segment (15 characters) was extracted programmatically from the staged
`$CmgPath` literal into an in-memory value, never printed, and used to case-insensitively scan the
two newly vendored files, `NOTICE` and the README addition. Result: **0** occurrences in all four
files (count only; the needle itself is not reproduced here, consistent with the 155-03 precedent
that writing the search term into a record would reintroduce the disclosure the scan exists to
prevent).

**GUID scan, vendored script.** Case-insensitive scan of
`Files/RemoveBloat.ps1` found the pre-declared set exactly: 10 distinct values at 15 total
occurrences, matching D-36's enumeration line-for-line:

| Line(s) | GUID |
|---|---|
| 352 | `1527c705-839a-4832-9118-54d4Bd6a0c89` |
| 353 | `c5e2524a-ea46-4f67-841f-6a9465d9d515` |
| 354 | `E2A4F912-2574-4A75-9BB0-0D023378592B` |
| 355 | `F46D4000-FD22-4DB4-AC8E-4E1DDDE828FE` |
| 818 | `BFA794E4-F964-4FDB-90F6-51056BFE4B44` |
| 900, 901 | `0DB7E03F-FC29-4DC6-9020-FF41B59E513A` |
| 966, 976, 1487, 1599 | `2cc5ca98-6485-489a-920e-b3e88a6ccce3` |
| 2286, 2290 | `6468C4A5-E47E-405F-B675-A70A70983EA6` |
| 2910 | `0a5aa116-8736-4571-b49d-739020affb16` |
| 3594 | `2B51C83A-465D-4EA9-9CDC-1ED95ED09AC6` |

**GUID scan, tree-wide under `assets/`.** Distinct case-insensitive count: **12** — the two
pre-existing values (`9a2a490f-…` the Assigned Access profile id, `814b6409-…` the
Azure/WindowsAppKiosk sample profile id, both recorded in NOTICE's own Mechanical scrub
verification note) plus the ten just vendored. Every one of the twelve is accounted for against
D-36's pre-declared set; no thirteenth distinct value was found.

**G3-V excluded-identifier needles, over both vendored files:**
- Security-identifier sequence (well-known-SID shape): 9 occurrences in `RemoveBloat.ps1`, zero in
  `LICENSE.GPL-3.0.txt`. All nine are the four generic LOCAL SYSTEM / LOCAL SERVICE / NETWORK
  SERVICE / Administrators-group well-known authority identifiers (three occurrences each of the
  first two profile-exclusion checks, one ACL group-name lookup), plus a digit-wildcarded
  built-in-Administrator-account exclusion pattern — all public, Microsoft-documented Windows
  constants identical on every Windows installation, not a tenant- or device-specific instance
  identifier (those carry a long per-domain numeric suffix, absent here). These are unavoidable,
  unmodified upstream bytes (D-01 forbids editing them) and are not an information disclosure by
  this plan; the byte-identity proof against the independently fetched upstream file already
  establishes that nothing was added.
- Forty-hex-character shape (word-bounded): 0 in both vendored files.
- Certificate-subject-field prefix (composed in-process from its two letters plus the equals sign
  rather than typed as a literal): 0 in both vendored files.

**Recording discipline:** every needle above (employer name, the three G3-V patterns) is reported
as a count only; none is echoed back into this file as a literal pattern string, because a row that
quotes the value it asserts absent both leaks it and inverts its own verdict. (The well-known-SID
finding above is reported by category and line count rather than by quoting the matched substrings,
for the same reason — even though these particular values are public Windows constants, not
secrets.)

**PART G needle rows re-measured at this plan's landing commit (`88f564db`):**

| # | Needle | Value |
|---|---|---|
| 18 | NOTICE section heading (`^Plan 161 vendoring$`) | 1 |
| 19 | GAP paragraph retained | 1 |
| 20 | closure marker | 1 |
| 21 | upstream path recorded | 1 |
| 22 | header amendment | 1 |
| 22b | 155-05 supersede | 1 |

**Validator confirmation:** `check-phase-54.mjs` — Summary: 32 passed, 0 failed, 0 skipped.
`check-phase-155.mjs` — 10 PASS, 0 FAIL, 0 SKIPPED. `check-phase-156.mjs` — 10 PASS, 0 FAIL, 0
SKIPPED.

---

*Sections 5 through 9 are owned by 161-03 and 161-04. `## Needle list handed to Phase 167
(HARN-04)` lands inside section 9 (D-42, D-57). No empty headings are pre-created for them here —
each later plan creating its own section is what makes the shared-file dependency real (D-35).*
