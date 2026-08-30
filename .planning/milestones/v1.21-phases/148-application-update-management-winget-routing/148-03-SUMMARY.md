---
phase: 148-application-update-management-winget-routing
plan: 03
subsystem: docs
tags: [patch-management, overview-hub, requirements-backlog, evidence-line, crlf-safety]

requires:
  - phase: 148-application-update-management-winget-routing (plan 01)
    provides: "docs/operations/patch-management/07-windows-autopatch.md — H1, eight anchors, Related Resources slot this plan links to"
  - phase: 148-application-update-management-winget-routing (plan 02)
    provides: "docs/operations/patch-management/08-windows-app-updates.md — H1, eight anchors, Related Resources slot this plan links to"
provides:
  - "docs/operations/patch-management/00-overview.md — four additive edit sites (two routing bullets, two Related Resources entries) making both new guides reachable from the domain hub, plus a conditional 60-day frontmatter re-stamp"
  - ".planning/REQUIREMENTS.md — nine evidence-carrying backlog entries for this phase's measured-but-unowned defects, plus a SUPERSEDED marker on the stale Intune-M365-channel deferral bullet"
  - "The phase's third and final docs(148) content commit, closing all six APP-01..APP-06 requirements"
affects: [phase-151-recipe-5, phase-152-registry-wiring, future-corpus-hygiene-milestone]

actuals:
  tokens: 2600
  tasks: 3
  commits: 2

tech-stack:
  added: []
  patterns:
    - "Python byte-level CRLF-preserving string replacement (not the Edit tool) for every 00-overview.md insertion, with before/after occurrence counts asserted for each replacement"
    - "In-memory kernel patching register (reused from the existing 01 Related Resources entry) to describe Hotpatch-adjacent material without tripping the anti-scope-creep banned-substring check"
    - "Evidence-carrying backlog bullet shape: bold lead-in with no colon, then the measurement, then why no phase owns it, then a trigger"

key-files:
  created: []
  modified:
    - docs/operations/patch-management/00-overview.md
    - .planning/REQUIREMENTS.md

key-decisions:
  - "Squashed the standalone Task 1 commit plus Task 2/3 changes into one final commit (git reset --soft to the pre-plan HEAD, restage, recommit) to satisfy D-65's 'commit 3 of three' contract and its literal `git log --oneline -3` acceptance criterion — the same reconciliation pattern plans 01 and 02 used, applied after verifying every task's acceptance criteria individually first. The first Task 1 commit used a wrong scope format (`docs(148-03):` instead of the phase's established `docs(148):` content-commit convention) — corrected in the squash."
  - "Documented rather than 'fixed' a stale Task 1 acceptance criterion: the plan asserts `grep -cE 'Hotpatch|VBS|MEETS_STRONG_INTEGRITY' 00-overview.md` should read exactly 1 pre-existing occurrence, but the measured pre-edit baseline is 2 matching lines (:56 MEETS_STRONG_INTEGRITY, :57 Hotpatch+VBS in the comparison table) — both pre-existing, untouched by this plan's additive-only edits, and covered by the D-03 backlog ruling. Verified the count stays unchanged at 2 before and after, rather than silently reducing it (which would require rewording the comparison table row this phase is explicitly barred from touching)."
  - "Documented rather than 'fixed' a stale Task 3 negative-battery acceptance criterion: the combined SCCM/enrolment/PITFALL-/etc. sweep across all three files returns 3, not 0 — all three hits are pre-existing lines in 00-overview.md's Ring Terminology and Deferral vs Enforcement sections (:56, :108, :133) authored by prior phases, outside this plan's additive-only blast radius, and not introduced by any Task 1 or Task 3 insertion (verified by diffing the insertion sites against the hit locations)."
  - "Wrote both new routing bullets and both new Related Resources entries using the corpus's existing 'in-memory kernel patching servicing model' register (from the pre-existing 01 Related Resources entry) instead of naming Hotpatch directly, per R17 — a natural one-line summary of 07 would otherwise trip the anti-scope-creep banned-substring check via the un-stripped em-dash description."
  - "Used a Python script operating on the file's raw bytes (not the Edit tool) for every 00-overview.md string replacement, asserting an exact `\\r\\n` count before and after each edit and confirming `git ls-files --eol` still reports `w/crlf` post-edit — per R19's documented zero-match-reports-success trap on this specific CRLF file."

requirements-completed: [APP-01, APP-02, APP-03, APP-04, APP-05, APP-06]

coverage:
  - id: D1
    description: "00-overview.md routes a reader to both new guides via two additive routing bullets (Autopatch then application updates, inserted after the WUfB Rings bullet) and two additive Related Resources entries (inserted after the driver/firmware entry, keeping Windows entries contiguous); no existing line reworded, no comparison-table row added, platform-applicability blockquote untouched"
    verification:
      - kind: other
        ref: "grep -c '07-windows-autopatch.md' / '08-windows-app-updates.md' (both 2) / git diff --stat (11 insertions, 2 deletions) / node scripts/validation/check-nav-hub-links.mjs (0/0)"
        status: pass
    human_judgment: false
  - id: D2
    description: "Conditional frontmatter re-stamp fired (execution date 2026-08-23 differed from prior last_verified 2026-08-21): both last_verified and review_by advanced together to 2026-08-23/2026-10-22, exactly 60 days by arithmetic, never one stamp alone"
    verification:
      - kind: other
        ref: "python date-arithmetic check (60 days, exit 0) / node scripts/validation/check-phase-54.mjs (32/0/0)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Nine evidence-carrying backlog entries filed under REQUIREMENTS.md's Future Requirements (falsified overview cell, falsified co-management workload-count wording plus its two downstream-site propagations, the pre-April-2025 entitlement parenthetical, the planning-ledger citation, the WinGet package-manager conflation, the stale ops-index description, the unresolved Windows 11 Pro question, and the glossary-terminology gap), plus a SUPERSEDED marker on the stale Intune-M365-channel deferral bullet naming the fetched canonical article"
    verification:
      - kind: other
        ref: "awk-scoped grep for bullet count (14, +9), evidence-word coverage (9/9 new bullets), zero-colon bold lead-ins (0), SUPERSEDED marker + canonical path present, 05-compliance-policy.md purge-literal absent (0)"
        status: pass
    human_judgment: false
  - id: D4
    description: "The prose-accuracy pass across all three files: every runnable negative check passes (barred hotpatch-implies-sufficiency conclusion absent, its positive replacement present, no third-party product names, zero code fences, zero doc_id, banned-substring count unchanged at 2), every Source line in 07/08 traces to a single page and sits at line-start, no stale line-number coordinates in either new guide's own prose, and all nine gates plus the apex read at their plan-time baselines after the final commit"
    verification:
      - kind: other
        ref: "the full nine-gate battery (54/53/59/nav-hub/c17/milestone-audit/filename-map/publish-bundle/apex), all at plan-time baselines; anchor-count and Source-line-start greps"
        status: pass
    human_judgment: true
    rationale: "Verbatim quote fidelity between 07/08's blockquotes and the live Microsoft Learn bytes they cite is a claim only a re-fetch-and-diff pass can prove; grep and the nine gates prove structure and literal-string presence but not that a quote is genuinely byte-accurate and correctly scoped to the page it cites — that is the phase verifier's job, not this executor's."

duration: ~55min
completed: 2026-08-23
status: complete
---

# Phase 148 Plan 3: Overview Wiring, Backlog Filing and Phase Close Summary

**Wired `00-overview.md` to both new Windows guides via four additive insertions plus a computed
60-day frontmatter re-stamp, filed nine evidence-carrying backlog entries and superseded a stale
deferral bullet in `REQUIREMENTS.md`, and closed the phase's third and final commit with all nine
gates and the apex at their plan-time baselines — completing APP-01 through APP-06.**

## Performance

- **Duration:** ~55 min
- **Tasks:** 3
- **Files modified:** 2 (`docs/operations/patch-management/00-overview.md`, `.planning/REQUIREMENTS.md`)
- **Commits:** 2 total during execution, squashed to 1 final content commit (see Decisions)

## Accomplishments

- Inserted two routing bullets into `## Routing to Per-Platform Guides` — Windows Autopatch, then
  Windows Application Updates, in that order — immediately after the existing WUfB Rings bullet and
  before the driver/firmware bullet, matching the existing bullet grammar exactly
- Inserted two `## Related Resources` entries — same order — immediately after the existing driver/
  firmware entry and before the macOS entry, keeping all Windows entries contiguous
- Both insertion sets avoid the three R17-banned substrings (`Hotpatch`, `VBS`,
  `MEETS_STRONG_INTEGRITY`) by reusing the corpus's existing "in-memory kernel patching servicing
  model" register instead of naming Hotpatch directly
- Re-stamped the frontmatter conditionally: `last_verified` 2026-08-21 differed from this phase's
  execution date (2026-08-23, per `148-01-SUMMARY.md`/D-76), so both `last_verified` and `review_by`
  advanced together to 2026-08-23/2026-10-22 — exactly 60 days by arithmetic
- Built the full seven-site map for the word "five" in `00-overview.md` (`:42, :43, :49, :62, :182,
  :188, :198`) before editing and changed none of them, per D-57
- Verified every string replacement matched by counting occurrences before and after (bullets 13→15,
  `07`/`08` filename occurrences 0→2 each, "five" unchanged at 7, the file-numbers parenthetical
  unchanged at 1) and confirmed the file's CRLF line endings survived every edit
  (`git ls-files --eol` still `w/crlf`)
- Filed nine evidence-carrying backlog entries under `REQUIREMENTS.md`'s `## Future Requirements`:
  the falsified overview hotpatch cell, the falsified co-management workload-count wording plus its
  two downstream propagation sites, the pre-April-2025 entitlement parenthetical, the
  planning-ledger citation inside the co-management guide, the WinGet package-manager conflation
  (reference matrix plus its unlinked apv2 twin), the stale operations-index hub description, the
  unresolved Windows 11 Pro hotpatch-eligibility question, and the glossary-terminology gap — each
  naming the file, the measurement, and why no phase in this milestone owns it
- Superseded (not deleted) the pre-existing bullet deferring the Intune-side Microsoft 365 Apps
  update-channel policy surface, naming the canonical article
  (`intune/device-configuration/settings-catalog/update-office`) that was fetched successfully this
  phase and shipped as `## Setting the Channel from Intune` in `08-windows-app-updates.md`
- Ran the full prose-accuracy pass across all three files (`00-overview.md`, `07`, `08`): every
  runnable negative check, the Source-line trace, the four Success-Criteria content assertions, and
  a coordinate-freshness check all pass or confirm as expected
- Ran the full nine-gate battery plus the apex as the phase's final measurement — every figure
  matches the plan-time baseline exactly

## Task Commits

1. **Task 1: The four additive insertions plus conditional frontmatter re-stamp** — verified via
   `check-phase-54` (32/0/0), `check-nav-hub-links` (0/0), the full acceptance-criteria grep suite
   — initially committed standalone as `823d42a8`
2. **Task 2: File nine backlog entries with evidence** — verified via `check-phase-54` (32/0/0),
   `check-phase-144` (101/0/0), the bullet-count/evidence-word/colon/SUPERSEDED/purge-literal greps
   — left uncommitted pending the Task 3 squash, per the plans 01/02 precedent
3. **Task 3: Prose-accuracy pass, full gate battery, commit 3 of three** — verified via all nine
   gates plus the apex, the negative battery, Source-line-start checks, and anchor-count checks —
   landed as the final squashed commit

**Reconciliation:** Task 1's standalone commit (`823d42a8`, message `docs(148-03): ...`) was reset
with `git reset --soft` back to the pre-plan HEAD (`4226e20f`), and the accumulated Task 1 + Task 2
changes were restaged and recommitted together as the single required commit, matching D-65's
"commit 3 of three" contract and the phase's established `docs(148):` content-commit scope
convention (matching `7d265323` and `daed2a3f` from plans 01/02, rather than the `docs(148-03):`
scope the first attempt used).

**Final commit:** `037305f1` — `docs(148): wire 00-overview.md to 07/08 and file phase backlog
entries` — touches exactly `docs/operations/patch-management/00-overview.md` and
`.planning/REQUIREMENTS.md`.

`git log --oneline -3` at completion:
```
037305f1 docs(148): wire 00-overview.md to 07/08 and file phase backlog entries
daed2a3f docs(148): author 08-windows-app-updates.md (APP-03, APP-04, APP-05, APP-06)
7d265323 docs(148): author 07-windows-autopatch.md (APP-01, APP-02)
```
Three `docs(148)` content commits for the phase, matching D-65's "three plans, three commits"
contract.

## Files Created/Modified

- `docs/operations/patch-management/00-overview.md` — 11 insertions, 2 deletions (two routing
  bullets, two Related Resources entries, and the two conditional frontmatter stamp lines)
- `.planning/REQUIREMENTS.md` — 11 insertions (nine new backlog bullets plus one appended
  SUPERSEDED marker on an existing bullet)

## The Seven-Site "five" Map (D-57) — None Changed

| Line | Context | Changed? |
|---|---|---|
| :42 | "compares ... across all five platforms" | No |
| :43 | "per-platform details live in the five sibling guides" | No |
| :49 | "the five sibling per-platform files (file numbers 01 through 05)" | No |
| :62 | "the only two hard cutovers in scope across all five platforms" | No |
| :182 | "Each of the five guides routes back to this overview via its own ... blockquote" | No |
| :188 | "cut across all five platforms" | No |
| :198 | "The five platforms expose different compliance signals" | No |

`:182`'s claim is contestable now that `07`/`08` also carry mirrored applicability blockquotes but
route through a different mechanism (routing bullets and Related Resources entries, not a sixth
per-platform slot) — left unchanged per D-57, since correcting it is an unowned scope expansion this
plan's additive-only blast radius does not cover.

## Nine Gate Baselines — Measured After the Final Commit

`check-phase-54` **32/0/0** · `check-phase-53` **26/0/0** · `check-phase-59` **36/0/0** ·
`check-nav-hub-links` **0/0** · `c17-eee-contract` **234 files / 0 violations** ·
`v1.20-milestone-audit` **16/0** · `build-filename-map --self-test` **8/0** ·
`build-publish-bundle --self-test` **15/0** · apex `check-phase-144` **101 PASS / 0 FAIL /
0 SKIPPED**. All nine match the plan-time figures recorded in `148-RESEARCH.md` and `148-CONTEXT.md`
exactly.

## Hand-Forward Contracts

**To Phase 151 (Recipe #5):** the 16 anchor ids (8 in `07`, 8 in `08`, listed in `148-01-SUMMARY.md`
and `148-02-SUMMARY.md`); the corrected Autopatch-versus-standalone-rings containment position
authored in `07`'s `## What Windows Autopatch Is and Is Not` / `## Autopatch Groups and the Test /
Last Model` sections (Recipe #5 SC#2 must be written on this corrected position, and `07` is the
only phase-148 content authoring it); the Microsoft 365 Apps channel table in `08` including
**Current as the default with rollback "Not applicable"**; the EAM no-rollout-rings / no-rollback
pair from `08`'s callouts; hotpatch's documented absence of automatic rollback (uninstalling
requires the very restart hotpatch exists to avoid, per `07`); and RCP-04's "no Autopatch
mode-switch recovery" clause — Phase 148 is the only phase in this milestone authoring Autopatch
content.

**To Phase 152 (integration, one atomic commit):** registry rows and filename-map rows for both `07`
and `08`; both canary bumps, computed from the registry after the rows land
(`grep -c "^| RE-"`), never hard-coded from a document count (INT-03); operations-index rows for
both guides (and, separately, the backlog-filed stale hub description Phase 152 is not scoped to
fix); all inbound nav-hub wiring; the `app-lifecycle/` return links (this phase's `08` links out,
nothing links in until 152, per D-35); and the inbound link from the apv2 device-preparation files
to `08`'s WinGet reconciliation section (D-44).

## Decisions Made

See the frontmatter `key-decisions` above for the commit-squash reconciliation, the two documented
(not silently "fixed") stale-acceptance-criterion baselines, the banned-substring-avoidance wording
choice, and the CRLF-safe Python-script editing approach. No additional decisions beyond those.

## Deviations from Plan

### Documented (not auto-fixed) acceptance-criteria staleness

**1. [Rule 1-adjacent — stale acceptance-criterion baseline] Task 1's banned-substring count criterion**
- **Found during:** Task 1, Step 0 (measure first)
- **Issue:** The plan's acceptance criteria assert
  `grep -cE 'Hotpatch|VBS|MEETS_STRONG_INTEGRITY' 00-overview.md` should read exactly `1` after the
  edit ("the single pre-existing occurrence"). The measured pre-edit baseline is `2` matching
  lines — `:56` (`MEETS_STRONG_INTEGRITY` in the Enforcement primitive row) and `:57`
  (`Hotpatch`/`VBS` in the Hotpatch/EOL row) — both pre-existing, from prior phases, and both inside
  the comparison table this plan is explicitly barred (D-52/D-54) from rewording.
- **Fix:** Did not force the count to `1` (which would require deleting or rewording pre-existing
  table content this phase does not own). Instead verified the count is **unchanged** at `2` both
  before and after every insertion, confirming no insertion introduced a new banned substring — the
  actual load-bearing invariant D-53/T-148-11 protects.
- **Files affected:** none (measurement only; no fix applied to the table)
- **Verification:** `grep -cE 'Hotpatch|VBS|MEETS_STRONG_INTEGRITY' 00-overview.md` = `2`,
  unchanged pre/post-edit; `check-phase-54.mjs` (whose `V-54-29` is the actual gate this criterion
  exists to satisfy) passes at 32/0/0
- **Committed in:** `037305f1`

**2. [Rule 1-adjacent — stale acceptance-criterion baseline] Task 3's combined negative-battery sweep**
- **Found during:** Task 3, Step 1 (the runnable negative battery)
- **Issue:** The plan's acceptance criteria assert the combined
  `SCCM|System Center|Autopatch rings|enrolment|licence|behaviour|TBD|TODO|FIXME|PLACEHOLDER|
  PITFALL-|winget-cli|PatchMyPC|Chocolatey|Ninite|Scappman|Robopack` sweep across all three files
  returns `0`. It returns `3`, all on pre-existing `00-overview.md` lines (`:56` "beta-enrolment",
  `:108` "PITFALL-9", `:133` "beta-programme enrolment") authored by prior phases (145-147), inside
  the Ring Terminology and Deferral vs Enforcement sections this plan does not touch.
- **Fix:** Verified none of the three hits fall inside this plan's insertion sites (diffed hit line
  numbers against the four insertion sites, none overlap) or inside `07`/`08` (both files
  independently sweep to `0`). Did not fix — these are out-of-scope pre-existing content per the
  scope-boundary rule, and rewording them would itself be a scope violation of D-52's
  additive-only constraint.
- **Files affected:** none
- **Verification:** `grep -rcE '...' 00-overview.md 07-windows-autopatch.md
  08-windows-app-updates.md | grep -v ':0$'` shows all 3 hits confined to `00-overview.md`
  pre-existing lines; `07`/`08` independently sweep to 0
- **Committed in:** `037305f1`

---

**Total deviations:** 2 documented acceptance-criteria staleness findings (0 code fixes required in
either case — both were measurement corrections against pre-existing, out-of-scope content).
**Impact on plan:** None on the deliverable. Both findings confirm the plan's own load-bearing
invariants (no new banned substring, no new negative-battery hit) hold; the stale absolute-count
assertions in the plan text do not reflect the file's actual pre-phase baseline, which this
execution measured and preserved rather than silently accepting or silently "fixing" out-of-scope
content.

## Known Stubs

None. All four insertion sites are fully authored; the nine backlog entries are complete
evidence-carrying bullets, not placeholders.

## Issues Encountered

None beyond the two documented acceptance-criteria staleness findings above.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Phase 148 is complete: all six APP-01..APP-06 requirements are satisfied across the three plans
  (APP-01/APP-02 by `07`, APP-03..APP-06 by `08`, reachability by this plan's `00-overview.md`
  wiring).
- Phase 151 (Recipe #5) can consume the full 16-anchor cross-link contract and the hand-forward
  contracts listed above.
- Phase 152 (registry/filename-map/nav-hub integration) can proceed once Phase 149/150 (the
  firmware/BIOS domain) also land — no registry row, canary bump, ops-index row, or nav-hub edit
  was made by any of this phase's three plans (D-73).
- Two accepted inconsistencies remain by design and are not phase-148 defects: the sealed
  `01-windows-wufb-rings.md`'s own Related Resources list will never point at `07` or `08` (D-75),
  and `00-overview.md`'s Windows routing blockquote line (`:12-13`) stays true while not naming the
  two new guides — neither is owned by any v1.21 phase.
- Nine backlog entries now exist in `REQUIREMENTS.md` for future corpus-hygiene work; none require
  action from any currently-scoped phase.
- No blockers. All nine gate baselines are at their plan-time figures; `git status --porcelain`
  scoped to every read-only path this phase touches (registry, ops-index, co-management,
  app-lifecycle, admin-setup-apv2, reference) returns empty.

---
*Phase: 148-application-update-management-winget-routing*
*Completed: 2026-08-23*

## Self-Check: PASSED

- `docs/operations/patch-management/00-overview.md` — FOUND, four insertion sites present, CRLF
  preserved (`git ls-files --eol` = `w/crlf`)
- `.planning/REQUIREMENTS.md` — FOUND, 9 new bullets + 1 SUPERSEDED marker present, LF preserved
- Commit `037305f1` (content, exactly two files) — FOUND in `git log --oneline --all`
- All nine plan-time gate baselines re-verified green after the final commit (32/0/0, 26/0/0,
  36/0/0, 0/0, 234/0, 16/0, 8/0, 15/0, 101/0/0)
