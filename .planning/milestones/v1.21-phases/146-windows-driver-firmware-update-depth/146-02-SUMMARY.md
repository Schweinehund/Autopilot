---
phase: 146-windows-driver-firmware-update-depth
plan: 02
subsystem: docs/operations/patch-management
tags: [windows, wufb, drivers, firmware, dual-scan, stub-and-move, patch-management]
status: complete

requires:
  - "docs/operations/patch-management/06-windows-driver-firmware-updates.md (plan 01)"
  - "Anchor `#configmgr-coexistence` in 06 (plan 01, D-66 contract)"
provides:
  - "01-windows-wufb-rings.md driver/firmware section as a stub forwarding to 06 (DRV-07, SC#5)"
  - "Two forward links 01 -> 06 (D-15): stub callout + Related Resources bullet"
  - "Open mitigation enumeration with a fourth Configuration Manager co-existence item (D-24)"
affects:
  - "docs/operations/patch-management/00-overview.md (plan 03 — routing)"

tech-stack:
  added: []
  patterns:
    - "Substitute-in-place / append-only editing inside a validator-frozen prose zone (D-06/D-07)"
    - "Standalone **Source:** line attached to an enumeration rather than to a list item (D-25)"

key-files:
  created: []
  modified:
    - docs/operations/patch-management/01-windows-wufb-rings.md

decisions:
  - "Checkpoint auto-resolved to `byte-identical` under AUTO_MODE; the escalate branch had no factual trigger — D-24 and D-25 were both satisfiable by substitution-in-place and append."
  - "D-70's midnight branch remained fired from plan 01: 01 is stamped last_verified 2026-08-20 / review_by 2026-10-19, so D-59's re-stamp was a real edit, not the predicted no-op."
  - "The deprecation label is `3. **(Deprecated)**` prefixed onto mitigation 3's existing opening line — the minimum in-place substitution, leaving its three continuation lines byte-identical."
  - "The fourth mitigation item and the Source line were inserted after item 3's `only.` line, before the retained validate-the-mitigation paragraph, which is outside both C11 windows."

metrics:
  duration: ~35 min
  completed: 2026-08-20
  tasks: 3
  commits: 1
  files: 1

actuals:
  tokens: 9000
  tasks: 3
  commits: 1
---

# Phase 146 Plan 02: WUfB Rings Driver/Firmware Stub-and-Move Summary

Reduced `01-windows-wufb-rings.md`'s driver and firmware section to a four-line stub forwarding to
`06`, landing commit 2 of D-61's sequence with the entire D-06 frozen zone byte-identical and both
gates at their exact baselines.

## What Was Built

One modified file: `docs/operations/patch-management/01-windows-wufb-rings.md`. Net +15/-12 lines,
231 lines before and 234 after. Four diff hunks, no whitespace-only hunks, no reflowed neighbours.

| Hunk | Lines (pre-edit) | Change |
|---|---|---|
| Frontmatter | `:2-3` | `last_verified` 2026-08-19 -> 2026-08-20, `review_by` 2026-10-18 -> 2026-10-19 (D-59, D-70) |
| Driver/firmware stub | `:171-178` -> 4 lines | 8-line movable block excised, forward callout inserted (D-13, D-15) |
| Mitigation block | `:200`, `:207`, after `:210` | Edit A open enumeration, Edit C deprecation label, Edit B fourth item, Edit C `**Source:**` line |
| Related Resources | after `:220` | Edit D second forward link (D-15) |

## Coordinate Re-measurement (RESEARCH §5.1 re-verified, not transcribed)

The live file was read at `:160-231` before the first edit. **Every plan coordinate held exactly** —
plan 01 did not touch `01`, as expected:

| Block | Plan-time | Live at execution | Match |
|---|---|---|---|
| File length | 231 | 231 | yes |
| Anchor | `:168` | `:168` `<a id="driver-firmware-policy"></a>` | yes |
| H2 | `:169` | `:169` `## Driver and Firmware Update Policy` | yes |
| Movable block | `:171-178` (8 lines) | `:171-178`, 8 lines, opening and closing literals exact | yes |
| Disambiguation | `:180-184` | `:180` `**This is NOT a ring** — neither a WUfB deployment ring nor an Autopatch ring. Treating` | yes |
| Dual-scan | `:186-213` | `:186` `**Dual-scan source conflict pitfall:** When SCCM co-management still controls the Windows Update` | yes |
| Enumeration head | `:200` | `:200` `**Mitigation options (pick one):**` | yes |
| Mitigation 3 | `:207-210`, ends `only.` | `:207-210`, `:210` is `   only.` | yes |

`:180` — the line the draft would have dropped — was confirmed to be the sole carrier of the
`**This is NOT a ring**` literal, and it was retained untouched. The deletion boundary was asserted
programmatically on both ends (`:171` opening prefix, `:178` closing suffix) before the splice ran;
a mismatch on either would have aborted the edit.

## The Frozen Zone — explicit confirmation (D-06, D-07)

**`01:186-191` is byte-identical.** Proven directly, not inferred, by diffing the pre-edit blob
against the post-edit worktree at the shifted coordinates:

```
diff <(git show HEAD:<file> | sed -n '186,191p') <(sed -n '182,187p' <file>)
-> IDENTICAL
```

**The `../co-management/02-windows-workload-sliders.md` link path survives.** Three occurrences in
the file at HEAD, three occurrences after the edit — `:104`, the former `:188` (now `:184`, the C11
keeper for the `:191` hit), and the Related Resources bullet at the former `:221`.

Nothing inside `:168-214` was re-wrapped, re-flowed, whitespace-normalised, or had `ConfigMgr`
substituted for `SCCM co-management`. The two C11 `\bSCCM\b[^.]*\bIntune\b` hits at `:186` and
`:191` are intact with their keepers in place: `co-management` at `:186`+5, and the `:188` link path
inside `:191`'s ±200-character window.

C11's mechanics were read at `v1.20-milestone-audit.mjs:565-605` and confirm the plan's F1 account:
four patterns, `Math.max(0, idx - 200)` to `idx + 200 + m[0].length`, and a `windowKeywords` regex
whose alternation includes `co-management`, `migration`, `transition` and `deprecated`. Note that
Edit C's `**(Deprecated)**` label *adds* a window keyword rather than risking one — it cannot
subtract a keeper.

## Validator Output — actual, recorded at execution

Baselines taken before any edit, and re-run after each task:

| Gate | Baseline | After Task 1 | After Task 2 | Pre-commit (Task 3) |
|---|---|---|---|---|
| `check-phase-54.mjs` | `Summary: 32 passed, 0 failed, 0 skipped` | 32/0/0 | 32/0/0 | **`Summary: 32 passed, 0 failed, 0 skipped`** |
| `v1.20-milestone-audit.mjs` | `Summary: 16 passed, 0 failed, 0 skipped` | 16/0/0 | 16/0/0 | **`Summary: 16 passed, 0 failed, 0 skipped`** |
| `check-nav-hub-links.mjs` | `0 hub-presence failure(s), 0 corpus-link failure(s), 0 total` | 0/0/0 | 0/0/0 | **`0 hub-presence failure(s), 0 corpus-link failure(s), 0 total`** |
| `c17-eee-contract.mjs` | — | — | 234/0 | **`234 files checked, 0 with violations, 0 total violations`** |

`v1.20-milestone-audit` — the gate `check-phase-54` is measurably blind to (D-08) — stayed at 16/0
through every intermediate state, including after the `**(Deprecated)**` substitution and the
insertion of the fourth item four lines below the frozen zone's last C11 hit.

`check-nav-hub-links` at 0/0 is the live proof that `#configmgr-coexistence` resolves against plan
01's anchor set — `check-nav-hub-links.mjs:295-297` fails a fragment absent from the target's
resolvable anchor set, so a byte mismatch with plan 01's `<a id>` would have reddened this gate.

## D-16 Added-Byte Ring Guard

Run after Task 1, after Task 2 over the whole accumulated diff, and finally over the landed commit:

```
git show HEAD -- docs/operations/patch-management/01-windows-wufb-rings.md \
  | grep '^+' | grep -v '^+++' | grep -cEi '\bring(s)?\b'
-> 0
```

**Zero at all three checkpoints.** No added byte carries a `ring` or `rings` token, including the
two forward-link targets and the new `**Source:**` URL. The Autopatch FAQ target
`.../windows-autopatch/overview/windows-autopatch-faq` is `ring`-free and needed no backticking,
which was verified with the validator rather than by eye per F3. The stub deliberately says
"a discrete update policy surface" rather than "not a ring" — `check-phase-54.mjs:205`'s `NOT a ring`
accommodation is specific to `:180`'s retained construction and would not have covered a new one.

`check-phase-54.mjs:173-213` was read directly to confirm the strip list: frontmatter, fenced code,
inline code, `{#anchor}`, own-line `<a id>`, bare `(#fragment)` and heading lines are stripped;
`(file.md#fragment)` targets are **not**. One correction to the plan's F5: the preceding-context
window is `m.index - 40`, not ~30. Immaterial here, since F3 bars the token outright.

## Acceptance Criteria — measured

| Criterion | Expected | Actual |
|---|---|---|
| `grep -c '^## Driver and Firmware Update Policy$'` | 1 | 1 — H2 byte-identical (D-11) |
| `grep -c '<a id="driver-firmware-policy"></a>'` | 1 | 1 |
| `grep -c '\*\*This is NOT a ring\*\*'` | 1 | 1 |
| `grep -c 'Dual-scan source conflict pitfall'` | 1 | 1 |
| `grep -c 'dual-scan'` | >=1 | 3 |
| `grep -c 'co-management/02-windows-workload-sliders.md'` | 1 (plan) | **3** — see deviation 1; unchanged from HEAD's 3 |
| `grep -c 'automatic firmware delivery for OEM-published catalogs'` | 0 | 0 (RESEARCH U-3 discharged) |
| `grep -c 'Intune > Devices > Windows > Driver and firmware updates'` | 0 | 0 (moved to `06`, D-13) |
| `grep -c 'Mitigation options (pick one):'` | 0 | 0 |
| `grep -c '\*\*Mitigation options:\*\*'` | 1 | 1 |
| `grep -c '06-...md#configmgr-coexistence'` | 1 | 1 |
| `grep -cE '^4\. '` | 1 (plan) | **2** — see deviation 2; HEAD had 1, delta is exactly 1 |
| `grep -ci 'deprecat'` | >=1 | 1 |
| `**Source:**` line matching D-25's regex | present | 6 conforming lines in file, 1 new |
| `grep -c '06-windows-driver-firmware-updates.md'` | >=3 | 3 |
| `grep -c 'This is the strategic fix and aligns with Autopatch readiness'` | 1 | 1 — mitigation 1 untouched (D-27) |
| `grep -c 'Block automatic driver delivery'` | 1 | 1 — mitigation 2 untouched (F2) |
| `git show --stat HEAD` | one file | one file, 15 insertions, 12 deletions |
| `review_by` minus `last_verified` | exactly 60 | 60, computed by `Date` arithmetic, not by eye |

## Checkpoint (auto-resolved)

**Task 1 of the plan is `checkpoint:decision gate="blocking"` — Confirm the byte-identical retention
strategy for `01:168-214` before the first edit is applied.**

Options as written in the plan:

1. **`byte-identical`** — Retain every line in `:168-214` byte-identical; confine changes to the
   `:171-178` deletion, one inserted callout placed outside `:186-191`, D-24's substitution and
   fourth item, and D-25's in-place label plus its Source line. *Pros:* matches D-06/D-07 exactly;
   gates on both validators per D-08, so the C11 failure mode is visible in the same run that would
   otherwise hide it. *Cons:* the retained prose keeps wrap widths that look inconsistent beside the
   newly inserted lines — a deliberate cosmetic price.
2. **`escalate`** — Escalate because a required edit cannot be made without reflowing a line inside
   `:186-191`. *Pros:* surfaces a genuine D-24/D-25 versus D-07 conflict before a silent reflow is
   committed. *Cons:* halts the phase; should not fire, since both were owner-ruled with the frozen
   zone in view and scoped to append/substitute-in-place.

**⚡ Auto-selected: `byte-identical`** (AUTO_MODE active, first option).

The selection is also substantively correct and not merely the default. No conflict materialised:
Edit A is a within-line substitution that moves no surrounding byte, Edit C prefixes eleven
characters onto one existing line and leaves its three continuation lines untouched, and Edits B
and D are pure appends. The frozen zone's byte-identity was then proven by diff, not assumed. The
protective work was done by the two grep guards and by running `v1.20-milestone-audit` after every
task — both of which ran regardless of how the checkpoint resolved, which is the point.

## Deviations from Plan

### 1. [Plan-coordinate miscount] `grep -c 'co-management/02-windows-workload-sliders.md'` expects 1, actual is 3

- **Found during:** Task 1 acceptance checks.
- **Issue:** The plan's acceptance criterion reads *"returns `1` — the C11 keeper link at `:188` was
  not removed"*. The actual file-wide count is **3**, at `:104`, `:188` and `:221`. The plan author
  scoped the count mentally to the frozen zone but wrote a file-wide grep.
- **Resolution:** No file change. The count at HEAD is also 3, so the invariant the criterion exists
  to protect — *the keeper link was not removed* — is satisfied and was verified two further ways:
  by listing the three line numbers, and by the byte-identity diff of `:186-191`.
- **Files modified:** none.

### 2. [Plan-coordinate miscount] `grep -cE '^4\. '` expects 1, actual is 2

- **Found during:** Task 2 acceptance checks.
- **Issue:** The criterion reads *"returns `1` — a fourth numbered item exists in the mitigation
  list"*. The file already carried a `4. ` item at `:109`, in an unrelated enumeration about
  decommissioning obsolete WUfB deployment ring policies.
- **Resolution:** No file change. `git show HEAD~1` gives a pre-edit count of 1, so the delta is
  exactly the one new item, and `grep -n` confirms the new one is at `:207` inside the mitigation
  list. Same class of defect as deviation 1: a block-scoped intent expressed as a file-wide grep.
- **Files modified:** none.

### 3. [Live instruction, D-70] The D-59 re-stamp was a real edit, not the predicted no-op

- **Found during:** Task 3.
- **Issue:** D-59 recorded the re-stamp as *"conditional and probably a no-op"* because all five
  patch-management siblings read `2026-08-19 / 2026-10-18`. Plan-01 execution crossed midnight and
  commit 1 landed 2026-08-20, firing D-70 and flipping the condition.
- **Fix:** `last_verified: 2026-08-20`, `review_by: 2026-10-19`. **Both stamps moved together in the
  same edit**, per D-60 — `check-phase-54.mjs:113-117` was read directly and is `if (days > 60)`
  only, so a half-move drives the interval negative and still passes. Interval verified as exactly
  60 by `Date` subtraction: `(2026-10-19 - 2026-08-20) / 86400000 === 60`.
- **Files modified:** `docs/operations/patch-management/01-windows-wufb-rings.md`
- **Commit:** `09e57ad9`

### 4. [Plan F5 detail correction] `V-54-11`'s preceding-context window is 40 characters, not ~30

- **Found during:** Task 1, reading `check-phase-54.mjs:173-213`.
- **Issue:** F5 describes the qualifier window as *"the preceding ~30 characters"*. The code is
  `stripped.slice(Math.max(0, m.index - 40), m.index)`; the `30` in the plan is the
  `[^\n]{0,30}` bound *inside* the compound-qualifier test, which operates on that 40-char slice.
- **Resolution:** No file change and no consequence — F3 bars the `ring` token outright, so no
  qualifier window was relied upon. Recorded so the number is not re-derived wrongly later.
- **Files modified:** none.

Nothing else deviated. No architectural change was needed, no auth gate was hit, no package was
installed, no validator was edited, and no file was deleted (`git diff --diff-filter=D HEAD~1 HEAD`
returns 0 paths).

## Deliberately Not Done

- **The apex `check-phase-144` was not run.** D-63 splits it: once before commit 1 (plan 01 did it,
  101/0/0) and once after the last commit, which is plan 03's final task.
- **No registry row, filename-map row, canary bump, index row or nav-hub wiring** — Phase 152's
  atomic unit (D-64, D-65). The two forward links added here are in-domain sibling cross-links, not
  nav-hub wiring; `check-nav-hub-links.mjs` has a four-file hub roster at `:33-41` and no general
  orphan detection, so navigation-last is not violated (D-15).
- **No "the corpus previously asserted X" attribution** for the withdrawn "only Autopatch-compatible
  answer" claim (D-26). The claim is measurably absent from `docs/`; writing an attribution would
  manufacture it.
- **Mitigation 2's mechanism was not corrected in place.** RESEARCH Q61 records that it names a
  lever that is really an update ring setting rather than a driver-policy setting, but the line is
  inside the frozen zone (F2). `06` states the mechanism correctly instead.
- **`00-overview.md` and `.planning/REQUIREMENTS.md` were not touched** — commit 3's scope (D-61).

## Known Stubs

None in the code sense. The driver/firmware *section* is now deliberately a documentation stub, but
it is a complete one: it states what the policy is, forwards to the full treatment in `06`, and
retains every literal SC#5 and DRV-07 name. No `TODO`, `FIXME`, `TBD` or placeholder token was
introduced.

## Threat Flags

None new. T-146-03 (tampering with the silent-failure integrity surface at `01:186-213`) was
mitigated exactly as planned: `v1.20-milestone-audit.mjs` ran as a per-commit gate after every task,
the blocking checkpoint preceded the first edit, and the keeper link's presence was asserted by grep
and by byte-diff. T-146-04 is accepted as planned — the new Autopatch FAQ `**Source:**` URL is not
machine-verifiable because `check-nav-hub-links.mjs:242` returns null for `http(s)` targets, so it
joins the orchestrator's manual-confirmation set (D-69).

## Notes for Verification

- The single URL added by this plan and needing manual confirmation is
  `https://learn.microsoft.com/en-us/windows/deployment/windows-autopatch/overview/windows-autopatch-faq`,
  cited at `ms.date 2026-05-28` for the Dual Scan deprecation (RESEARCH §2.9 Q54). RESEARCH §2.8's
  Q50 from `wufb-wsus` carries the same deprecation non-Autopatch-scoped if a substitute is wanted.
- Re-running the D-16 guard against `HEAD` rather than a working-tree diff is the durable form:
  `git show HEAD -- <file> | grep '^+' | grep -v '^+++' | grep -cEi '\bring(s)?\b'`.
- Both `01` and `06` now read `last_verified: 2026-08-20 / review_by: 2026-10-19`. Plan 03's
  `00-overview.md` must take the same pair, and the three remaining patch-management siblings
  (`02`, `03`, `04`) still read `2026-08-19 / 2026-10-18` — that divergence is expected, not drift.
- `01` now has three references to `06`. Phase 152's registry work must not treat the Related
  Resources bullet as nav-hub wiring already done.

## Self-Check: PASSED

- `docs/operations/patch-management/01-windows-wufb-rings.md` — FOUND, modified, 234 lines
- Commit `09e57ad9` — FOUND in `git log`, exactly one file changed, 15 insertions, 12 deletions
- `.planning/phases/146-windows-driver-firmware-update-depth/146-02-SUMMARY.md` — FOUND
- All four gates re-run immediately before the commit and recorded above with their actual output
- D-16 guard = 0 over the landed commit
