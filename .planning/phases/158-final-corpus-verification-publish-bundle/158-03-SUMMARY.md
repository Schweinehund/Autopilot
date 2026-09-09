---
phase: 158-final-corpus-verification-publish-bundle
plan: 03
subsystem: docs-style-tooling
tags: [judge-packets, sweep3, em-dash-sweep, verifier-skill, prose-style-gate, pin-differ, structural-gate]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: plan 158-01's before-half measurement (685 live pins, 156-LIVE-PINS-after.txt comparison file) and plan 158-02's three hand-remediation commits, which had to land before this plan's sweep touched the same lines
provides:
  - "judge-packets.py's before_region key and corrected no-following-anchor context window, for plan 158-04's judge dispatch"
  - "google-style-verify/SKILL.md's two corrected, runnable invocations and two false claims removed"
  - "The em-dash class closed corpus-wide (31 edits / 28 lines / 15 files), idempotent, with three independent correctness guards"
  - "check-prose-style.py's exclusion-record date-stamp marking the em-dash and directional figures stale"
affects: [158-04, 158-05, 158-06, 158-07]

# Actuals (#2632)
actuals:
  tokens: 11635
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Two-case scratch git-repo demonstration under the OS temp directory (never committed) as the proof artifact for a tool fix too small to justify a committed --self-test"
    - "Segment-based (not line-length-based) diff analysis to isolate exactly which em dash a sweep tightened, since removing surrounding whitespace changes line length and defeats a naive same-length line-pair comparison"
    - "Three independent guards over a mechanical sweep's own output (boundary, pin differ, CR-insensitive byte identity) rather than trusting the substitution table's own lookarounds, which fail closed on any segment/line boundary and can only prove they did not fire"

key-files:
  created: []
  modified:
    - scripts/docs-style/judge-packets.py
    - .claude/skills/google-style-verify/SKILL.md
    - scripts/validation/check-prose-style.py
    - docs/_registry/RE-index.md
    - docs/_glossary.md
    - docs/_glossary-linux.md
    - docs/_standards/EEE-SOP-standard.md
    - docs/_templates/admin-template-android.md
    - docs/admin-setup-android/08-cope-full-admin.md
    - docs/admin-setup-android/09-aosp-realwear.md
    - docs/admin-setup-android/10-aosp-zebra.md
    - docs/admin-setup-android/11-aosp-pico.md
    - docs/admin-setup-android/12-aosp-htc-vive-focus.md
    - docs/admin-setup-android/13-aosp-meta-quest.md
    - docs/end-user-guides/android-work-profile-setup.md
    - docs/l1-runbooks/01-device-not-registered.md
    - docs/operations/00-index.md
    - docs/recipes/02-shared-ipad-full-provisioning.md
    - .planning/WINDOWS.md

key-decisions:
  - "judge-packets.py's fix kept to a minimal-diff form (13 insertions / 2 deletions, not a reindented rewrite) specifically to stay under the plan's own 30-changed-line acceptance cap; a first attempt that restructured the opcode loop for readability hit 36 changed lines and had to be redone."
  - "The em-dash sweep was applied corpus-wide (15 files) rather than scoped to Phase 157's 59-file edit set, per D-09: a subset would tighten AOSP recipes 10/12/13 while leaving the byte-identical clause in 09/11 spaced, an asymmetry this phase would itself author."
  - "One newly-discovered link-adjacency residual (docs/recipes/02-shared-ipad-full-provisioning.md:286) left one em dash spaced after the closing paren of a markdown link, because sweep3's PROTECT-segment split erases the lookbehind's required preceding character at that boundary. Recorded as WINDOWS.md #16, matching the identical, already-accepted architectural class from Phase 156 (rows 12/14) rather than hand-edited into the frozen sweep commit."

requirements-completed: []

coverage:
  - id: D1
    description: "judge-packets.py gains a before_region key (every baseline line of the containing opcode block) and its no-following-anchor context window is anchored at the change's own position instead of collapsing to the top of the file; modal set and changed-file computation untouched."
    requirement: null
    verification:
      - kind: other
        ref: "python -c \"ast.parse(...); assert 'before_region' in src\" -- parses, before_region present"
        status: pass
      - kind: other
        ref: "git show --numstat HEAD -- single file, 13 insertions / 2 deletions (<=30 cap); git diff grep for MODALS|changed_files == 0 occurrences"
        status: pass
      - kind: manual_procedural
        ref: "two-case scratch git-repo demonstration (following-anchor case and no-anchor case), output recorded verbatim below"
        status: pass
    human_judgment: false
  - id: D2
    description: "google-style-verify/SKILL.md's verify2.py and pins2.py invocations both carry their required arguments (BASE; scripts/validation docs), the any-output-means-broken-pin claim is replaced with the true one-permanent-line expectation, the superseded 9,363 count is replaced with EEE-SOP-standard.md's own qualitative phrasing, and no drive-letter path or global-copy-divergence claim was introduced."
    requirement: null
    verification:
      - kind: other
        ref: "python regex checks: no [A-Za-z]:[\\\\/] path; verify2.py and pins2.py invocations both carry arguments; '9,363' count == 0; 'any output'+'broken pin' co-occurrence == 0"
        status: pass
      - kind: other
        ref: "git show --name-only HEAD == exactly .claude/skills/google-style-verify/SKILL.md"
        status: pass
    human_judgment: false
  - id: D3
    description: "The em-dash class is closed corpus-wide (31 edits / 28 lines / 15 files) via the unmodified sweep3.py and subs-emdash-batch10.tsv, proven idempotent and correct by three independent guards (boundary, pin differ, CR-insensitive byte identity), with the registry Title-cell invariant and both publish-bundle drift canaries re-asserted in the same commit, and a one-line dated stamp appended to check-prose-style.py's exclusion record."
    requirement: null
    verification:
      - kind: other
        ref: "sweep re-run after apply: 0 TOTAL edits (idempotent)"
        status: pass
      - kind: other
        ref: "git diff --stat -- docs/: 15 files changed, 28 insertions(+), 28 deletions(-)"
        status: pass
      - kind: other
        ref: "boundary guard: 31/31 tightened dashes have a non-whitespace, non-'*' preceding character and a non-whitespace following character, 0 violations"
        status: pass
      - kind: other
        ref: "pin differ: 685 live pinned (matches plan 158-01's before-half exactly), 0 lost, 0 added vs 156-LIVE-PINS-after.txt"
        status: pass
      - kind: other
        ref: "CR-insensitive byte-identity guard: every changed line identical outside the dash, no file's line count changed"
        status: pass
      - kind: other
        ref: "registry table-row check: 239 rows byte-unchanged; build-publish-bundle.mjs --self-test 15/15 passed; build-filename-map.mjs --self-test 8/8 passed"
        status: pass
      - kind: other
        ref: "c17-eee-contract.mjs 237/0; check-nav-hub-links.mjs 0/0; check-prose-style.py exit 0"
        status: pass
      - kind: other
        ref: "git diff --stat -- scripts/validation/: exactly check-prose-style.py, 1 insertion(+), 0 deletions; scripts/docs-style/ and .gitattributes byte-unchanged"
        status: pass
      - kind: manual_procedural
        ref: "one link-adjacency residual (docs/recipes/02-shared-ipad-full-provisioning.md:286) left one em dash spaced -- matches Phase 156's already-accepted architectural class; recorded as WINDOWS.md #16, not hand-fixed"
        status: fail
    human_judgment: true
    rationale: "The plan's literal 'no changed line carries a spaced em dash' verify command fails on this one line because of a known, previously-documented (Phase 156 WINDOWS #12/#14) architectural limitation of the frozen, unmodified sweep tool -- not a defect introduced by this plan. A human should confirm this disposition (accept as a recurring known-limitation residual, matching precedent) rather than have it auto-pass."

duration: 22min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 3: Fix the Judge Packet Emitter and Verifier Skill, Then Close the Em-Dash Class Corpus-Wide Summary

**Gave `judge-packets.py` a `before_region` key and a correct no-anchor fallback, made the verifier skill's two documented invocations actually runnable while dropping two false claims, then closed the em-dash class across all 15 corpus-wide targets (31 edits) with three independent guards proving the sweep rewrote spacing and nothing else — one link-adjacency residual left spaced, matching an already-accepted Phase 156 architectural class.**

## Performance

- **Duration:** 22 min
- **Started:** 2026-09-08T06:15:34Z
- **Completed:** 2026-09-08T06:37:27Z
- **Tasks:** 3
- **Files modified:** 19 (18 tracked corpus/tool files + `.planning/WINDOWS.md`)

## Accomplishments

- `scripts/docs-style/judge-packets.py` (commit `46ad75e9`): added a `before_region` key carrying every baseline line of the containing opcode block (replace or delete), and fixed the no-following-anchor fallback to anchor the context window at the change's own baseline position instead of collapsing to the top of the new file. Kept to a minimal-diff form (13 insertions / 2 deletions) to stay under the plan's 30-changed-line cap; the modal set (`MODALS`) and `changed_files()` computation are untouched (0 occurrences in the diff). Two-case scratch demonstration (below) proves the following-anchor case is byte-identical to pre-fix behavior except for the new key, and the no-anchor case now emits the change's own neighbourhood instead of the document's top.
- `.claude/skills/google-style-verify/SKILL.md` (commit `91a25f7d`): `verify2.py` now documented with its required `BASE` argument; `pins2.py` now documented with its two positional roots (`scripts/validation docs`) instead of falling back to a hardcoded absolute path outside this repository and a scratch corpus that doesn't exist on this host. Replaced "any output = broken pin" (false by construction — the live-vs-committed differ emits exactly one permanent line, `## Prose Style Authoring Standard`, since `pins2.py` globs `*.mjs` only) with the true expectation. Replaced the superseded "9,363" candidate count with `EEE-SOP-standard.md:646`'s own "more than ten thousand" phrasing. No claim added that the project copy diverges further from a global verifier copy — no global copy of `google-style-verify` exists.
- `scripts/validation/check-prose-style.py` + 15 files under `docs/` (commit `44ab8c21`): closed the em-dash class corpus-wide via the byte-unchanged `sweep3.py` and `subs-emdash-batch10.tsv`. Dry run: 15 files, 563 pins loaded, **31 TOTAL edits**; protection census (6-bucket): 6540 table row, 384 cited verbatim quotation, 123 heading line, 92 agent speech script, 29 UI label line, 4 validator-pinned string. Applied: identical 31/15/563 and census. Re-run after apply: **0 TOTAL edits** (idempotent). Three guards: (1) boundary — all 31 tightened dashes have a non-whitespace/non-`*` preceding character and a non-whitespace following character, 0 violations; (2) pins — live differ run (not the two constant line counts), 685 pinned (matches plan 158-01's before-half exactly), 0 lost / 0 added vs `156-LIVE-PINS-after.txt`; (3) line identity — every one of the 28 changed lines byte-identical to its pre-sweep form outside the single tightened dash, carriage returns stripped, no file's line count changed. Registry invariant: `docs/_registry/RE-index.md`'s edit is a prose bullet; all 239 table rows byte-unchanged; both publish-bundle drift canaries re-run clean (15/15, 8/8 self-test). One dated line appended to `check-prose-style.py`'s exclusion record (1 insertion, 0 deletions). Frozen surfaces confirmed byte-unchanged: everything under `scripts/docs-style/`, `.gitattributes`, and every other file under `scripts/validation/`. Gates green: C17 237/0, nav-hub 0/0, prose-style exit 0.

## Task Commits

Each task was committed atomically:

1. **Task 1: Give the packet emitter a before_region key and fix its no-following-anchor window** - `46ad75e9` (feat)
2. **Task 2: Make the verifier skill's documented invocations run and drop its two false expectations** - `91a25f7d` (fix)
3. **Task 3: Close the em-dash class corpus-wide with the unmodified sweep, guarded three ways** - `44ab8c21` (fix)

_Note: this plan is `type="execute"`, not TDD -- no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `scripts/docs-style/judge-packets.py` - `before_region` key, corrected no-anchor context window
- `.claude/skills/google-style-verify/SKILL.md` - two runnable invocations, corrected pin-differ expectation, superseded count replaced
- `scripts/validation/check-prose-style.py` - one dated line appended to the exclusion record
- `docs/_registry/RE-index.md`, `docs/_glossary.md`, `docs/_glossary-linux.md`, `docs/_standards/EEE-SOP-standard.md`, `docs/_templates/admin-template-android.md`, `docs/admin-setup-android/{08,09,10,11,12,13}-*.md`, `docs/end-user-guides/android-work-profile-setup.md`, `docs/l1-runbooks/01-device-not-registered.md`, `docs/operations/00-index.md`, `docs/recipes/02-shared-ipad-full-provisioning.md` - em-dash tightening (28 lines, 31 edits)
- `.planning/WINDOWS.md` - ledger entry #16 for the newly-discovered link-adjacency residual

## Two-Case Packet-Emitter Demonstration (Task 1)

Scratch git repo built under the OS temp directory, discarded after the run:

Baseline (BASE commit) `doc.md`:
```
...
This setting should apply immediately to every enrolled device in scope.
...
The administrator must verify the enrollment before shipping the device.
...
```
Working-tree edit: drop `should` from line 4 (a replace opcode WITH a following anchor); delete line 8 wholesale (a pure-delete opcode with NO following anchor).

**Case 1 (following anchor exists) — before vs. after this fix, byte-identical except the new key:**
```
"context_after": ["", "Line one is unrelated filler text kept the same across both versions.",
                   "This setting applies immediately to every enrolled device in scope.",
                   "Line three is unrelated filler text kept the same across both versions.",
                   "Line four is unrelated filler text kept the same across both versions."]
```
(Both pre-fix and post-fix emit this identical list; post-fix additionally carries `"before_region": ["This setting should apply immediately to every enrolled device in scope."]`.)

**Case 2 (no following anchor) — changed by this fix:**
- Pre-fix: `"context_after": ["# Heading", "", "Line one is unrelated filler text kept the same across both versions."]` (the top of the file, regardless of where the deleted line sat).
- Post-fix: `"context_after": ["Line four is unrelated filler text kept the same across both versions.", "Line five is unrelated filler text kept the same across both versions.", "Line seven is unrelated filler text kept the same across both versions.", "Line eight is unrelated filler text kept the same across both versions.", ""]` — the deleted line's own neighbourhood, plus `"before_region": ["The administrator must verify the enrollment before shipping the device."]`.

## Sweep Dry-Run Counts and Protection Census (Task 3, verbatim)

```
DRY RUN -- 15 files, 563 pins loaded
      31  (?<=[^\s*])\s+—\s+(?=\S)
       0  (?<=[^\s*])\s+—(?=\S)
       0  (?<=[^\s*])—\s+(?=\S)
      31  TOTAL edits
  protected (em dashes left alone):
    6540  table row
     384  cited verbatim quotation
     123  heading line
      92  agent speech script
      29  UI label line
       4  validator-pinned string
```
(Table-row count is 6540 here versus 6539 recorded in `158-RESEARCH.md`'s earlier run — a one-row drift from an intervening commit; re-measured live per this session, not copied.)

## Applied 15-File List

```
docs/_glossary.md
docs/_glossary-linux.md
docs/_registry/RE-index.md
docs/_standards/EEE-SOP-standard.md
docs/_templates/admin-template-android.md
docs/admin-setup-android/08-cope-full-admin.md
docs/admin-setup-android/09-aosp-realwear.md
docs/admin-setup-android/10-aosp-zebra.md
docs/admin-setup-android/11-aosp-pico.md
docs/admin-setup-android/12-aosp-htc-vive-focus.md
docs/admin-setup-android/13-aosp-meta-quest.md
docs/end-user-guides/android-work-profile-setup.md
docs/l1-runbooks/01-device-not-registered.md
docs/operations/00-index.md
docs/recipes/02-shared-ipad-full-provisioning.md
```

## Six Files Outside Phase 157's Enumerated 59-File Edit Set

```
docs/_registry/RE-index.md
docs/admin-setup-android/09-aosp-realwear.md
docs/admin-setup-android/11-aosp-pico.md
docs/end-user-guides/android-work-profile-setup.md
docs/l1-runbooks/01-device-not-registered.md
docs/recipes/02-shared-ipad-full-provisioning.md
```
Confirmed via `comm -12` against `.planning/phases/156-.../156-TARGETS.txt`: zero overlap between the 15 sweep-touched files and Phase 156's 13-target list — neither Phase 156's own 13 targets nor any recipe file carrying an "armed" `check-phase-135.mjs` content assertion were touched.

## Pin Differ Result

- Live pinned total: **685** (identical to plan 158-01's before-half measurement, `4590 literals scanned, 685 pinned`)
- Lost vs. `.planning/phases/156-style-extension-full-landing-verification/156-LIVE-PINS-after.txt`: **0**
- Added vs. same file: **0**

## Self-Test Tails

```
$ node scripts/pipeline/build-publish-bundle.mjs --self-test | tail -3
[ST] (f4) deriveZipName throws on traversal-shaped version (T-127-05) ... PASS

15 passed, 0 failed

$ node scripts/pipeline/build-filename-map.mjs --self-test | tail -3
[ST] (f) 0-row registry (prose only) parses to rows.length === 0 (main() fail-closed guard input) PASS -- rows.length=0

8 passed, 0 failed
```

## Decisions Made

See `key-decisions` in frontmatter. In brief: the packet-emitter fix was rewritten once to fit the 30-changed-line cap (13 ins/2 del, not a reindented 23 ins/13 del rewrite); the em-dash sweep ran corpus-wide rather than scoped, per D-09; the one newly-discovered link-adjacency residual was recorded as a WINDOWS.md ledger entry rather than hand-edited into the frozen sweep commit.

## Deviations from Plan

### Discovered, Not Auto-Fixed

**1. [Architectural limitation, matches Phase 156 precedent — not a Rule 1-3 auto-fix] One em dash left spaced by the unmodified sweep**
- **Found during:** Task 3's post-apply verification
- **Issue:** `docs/recipes/02-shared-ipad-full-provisioning.md:286` held two spaced em dashes before the sweep. The sweep tightened the first (`made — see` → `made—see`) but left the second spaced (`...provisioning.md) — and`) because it sits immediately after a markdown link's closing paren — `sweep3.py`'s `PROTECT`-segment split masks the link as a protected span, which erases the "real preceding character" the substitution table's lookbehind guard requires at that exact boundary. This is the identical architectural class already recorded and accepted at Phase 156 (`WINDOWS.md` rows 12 and 14, "link-adjacency … Correct guard behavior per plan spec, not a bug"), recurring here at a new site because this file was never swept for em dashes before this phase (it is one of the 6 files outside Phase 157's enumerated 59-file set).
- **Why not fixed:** Two explicit prohibitions in this plan block a fix: `sweep3.py` and `subs-emdash-batch10.tsv` must stay byte-unchanged (frozen surfaces), and "no hand edit is applied inside the sweep commit" (the sweep commit contains only the tool's output). Neither a tool change nor a hand edit was applied.
- **Impact on this task's verify block:** The literal automated check `python -c "... a changed line still carries a spaced em dash ..."` fails on this one line (out of 28 changed lines, 15 files). All three of the plan's actual correctness guards — the per-dash boundary check, the pin differ, and the CR-insensitive byte-identity check — pass clean; this residual is a known limitation of the mandated, unmodified tool, not a defect this plan introduced.
- **Recorded:** `.planning/WINDOWS.md` entry #16 (kind: deviation, phase 158, file `docs/recipes/02-shared-ipad-full-provisioning.md`, line 286), status `open`, matching the Phase 156 rows' own disposition language.
- **Committed in:** `44ab8c21` (the sweep commit — the corpus was left exactly as the unmodified tool produced it; no separate corrective commit was made)

---

**Total deviations:** 1 discovered-and-recorded architectural residual (not a bug; not auto-fixed, per two explicit plan prohibitions). **Impact:** No corpus meaning was affected — the residual is a spacing-only limitation on one pre-existing dash, matching an already-accepted class from Phase 156. Plan 158-06's drift attribution should carry this WINDOWS.md row forward alongside the six outside-the-59 file rows.

## Known Stubs

None.

## Issues Encountered

- **Windows console/subprocess text-encoding gotcha:** Running the plan's literal Python verify one-liners without an explicit `encoding='utf-8'` on `subprocess.run(...)` silently mis-decoded the em-dash character on this host (default `cp1252`-family decoding of a 3-byte UTF-8 em dash), producing false "line carries no em dash" failures and corrupted terminal output (`�`) that looked like a data problem but was purely a decoding artifact. Every verify command in this SUMMARY was re-run with an explicit `encoding='utf-8'` (or `PYTHONUTF8=1`) to get the true result before drawing any conclusion — this is the same general class of hazard `D-15` already names for `sweep3.py`'s own newline handling on this host.
- **`pins2.py`'s informational stderr line must not be merged into a captured stdout pin file** (`2>&1` redirection concatenated `4590 literals scanned, 685 pinned` onto the last stdout line with no separating newline, corrupting the comparison file and producing a spurious 1-lost/2-added result on first attempt). Re-ran with stdout and stderr captured separately; corrected result: 685 pinned, 0 lost, 0 added.
- **First attempt at Task 1's packet-emitter fix exceeded the 30-changed-line acceptance cap** (36 changed lines from restructuring the opcode loop for readability). Rewritten to a minimal-diff form (13 insertions / 2 deletions) preserving the original `if tag != "replace": continue` control flow; re-verified byte-for-byte identical emitted output via the same two-case scratch demonstration.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- `judge-packets.py`'s `before_region` key and corrected no-anchor window are ready for plan 158-04's judge dispatch; the prompt's key enumeration should be widened to include `before_region`.
- `google-style-verify/SKILL.md`'s two invocations are now runnable as documented; the authoring skill, its backup file, and any user-level copy remain untouched (an owner action, not this phase's deliverable).
- The em-dash class is closed corpus-wide (15 files, 31 edits), idempotent, and byte-identical outside the tightened dashes. The six files outside Phase 157's 59-file set are recorded above for plan 158-06's `drift[]` rows.
- **WINDOWS.md entry #16 is a new open item** for plan 158-06's drift attribution and plan 158-05's disposition table — it should be carried forward matching Phase 156 rows 12/14's disposition (accepted architectural residual, not a defect requiring remediation).
- No blockers.

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All 18 modified tracked files confirmed present on disk with expected content (`before_region` present in `judge-packets.py`; both invocations present in `SKILL.md`; the dated line present in `check-prose-style.py`; all 15 `docs/` files show the em-dash tightening in `git diff`).
- All 3 task commits (`46ad75e9`, `91a25f7d`, `44ab8c21`) confirmed present via `git log --oneline`.
- All task-level `<acceptance_criteria>` re-confirmed passing above, with one plan-level `<verify>` command's literal assertion failing on a single, already-precedented, non-fixable residual (recorded as `WINDOWS.md` #16 and as a deviation above, not silently passed over).
- Plan-level `<verification>` re-confirmed: sweep idempotent (0 edits on re-run), 15 files / 28 lines / 31 edits, all changed lines byte-identical outside the dash (CR-stripped), registry table rows unchanged, both bundle self-tests 0 failed, only one appended dated line under the validator directory, `scripts/docs-style/` and `.gitattributes` byte-unchanged, C17/nav-hub/prose-style/pin-differ all green against plan 158-01's before half, packet emitter parses and emits `before_region` in a single-file no-corpus-path commit, verifier skill's invocations corrected with no drive-letter path and both false claims removed.
