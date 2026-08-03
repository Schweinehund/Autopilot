---
phase: 137-integration-navigation-last-close
plan: 02
subsystem: docs-nav
tags: [docs-index, navigation, hubs-not-wired, needle-spec, outbound-links]

# Dependency graph
requires:
  - phase: 137-01
    provides: "Both recipes flipped Draft -> Approved, registered in RE-index.md at 225 rows, filename-map regenerated, both drift canaries green"
provides:
  - "Both recipes discoverable from docs/index.md on both surfaces (table + line-38 quick-nav bullet), landed in one commit"
  - "Navigation-last proven structurally: Commit C's author timestamp strictly post-dates plan 137-01's Commit B author timestamp"
  - "Troubleshooting-hub disposition recorded as an explicit ruling, with the correction that check-phase-132.mjs's V-132-HUBSNOTWIRED regex does not actually cover recipes 03/04"
  - "All 42 uncovered outbound `../` links shipped by recipes 03/04 resolved against the filesystem (10 unique targets, 10 anchored, zero missing)"
  - "Phase-138 check-phase-137.mjs needle-spec handed off with measured literals, in both STATE.md and this SUMMARY"
affects: [138-harness-close]

# Actuals (#2632)
actuals:
  tokens: 1615
  tasks: 3
  commits: 2

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Single-commit two-surface nav landing closes the WR-01 defect class (table rows + quick-nav bullet in one commit, asserted by git show --stat)"
    - "Needle-spec handoff via a STATE.md Plan-Time Research Flags append + a SUMMARY 'Needle-spec handoff' section, rather than authoring the leaf validator in the content phase"

key-files:
  created: []
  modified:
    - docs/index.md
    - .planning/STATE.md

key-decisions:
  - "Both index.md surfaces (table rows + line-38 bullet) landed in one commit (Commit C, b694254f) to close the WR-01 defect class that recurred at Phase 132"
  - "Hubs stay NOT-wired; the v1.18 hub-enforcement regex's false-coverage claim (REQUIREMENTS.md:31) is corrected on the record (D-02), not silently carried forward"
  - "check-phase-137.mjs is NOT authored this phase; the needle-spec is handed to Phase 138 (D-18), appended to STATE.md's existing Plan-Time Research Flags block rather than a parallel entry"
  - "The two new table blurbs used the plan-specified text verbatim (31 words and 30 words respectively), inside the D-10 20-33 word budget"

patterns-established:
  - "Both drift canaries / both nav surfaces named explicitly wherever this class of change recurs -- never assume a single surface covers the invariant"

requirements-completed: [CLASS-06]

coverage:
  - id: D1
    description: "Both docs/index.md table rows (RE-224, RE-225) and the replaced line-38 quick-nav bullet land together in a single commit (Commit C)"
    requirement: CLASS-06
    verification:
      - kind: other
        ref: "git show --stat b694254f (docs/index.md only, 3 insertions/1 deletion); node scripts/validation/c17-eee-contract.mjs (234 files, 0 violations); node scripts/validation/check-nav-hub-links.mjs (0/0)"
        status: pass
    human_judgment: false
  - id: D2
    description: "Hubs-not-wired evidence recorded (D-03 grep + git diff --quiet) and the D-02 correction of record documented"
    requirement: CLASS-06
    verification:
      - kind: other
        ref: "grep -lE 'recipes/0[34]-|03-windows-11-multi-app-kiosk|04-android-dedicated-mhs' docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md (no match); git diff --quiet on all three hubs (clean)"
        status: pass
    human_judgment: false
  - id: D3
    description: "Outbound-link sweep: all 42 `../`-relative links in recipes 03/04 (10 unique targets, 10 anchored) resolve against the filesystem"
    requirement: CLASS-06
    verification:
      - kind: other
        ref: "manual filesystem resolution of all 10 unique targets + heading spot-check of all 10 anchors, captured verbatim below"
        status: pass
    human_judgment: false
  - id: D4
    description: "Phase-138 check-phase-137.mjs needle-spec handed off with measured literals in STATE.md and this SUMMARY; no validator authored in this phase"
    requirement: CLASS-06
    verification:
      - kind: other
        ref: "grep -q 'check-phase-137.mjs' .planning/STATE.md; awk containment check (bullet lands inside Plan-Time Research Flags block); ls scripts/validation/check-phase-137.mjs fails (no validator authored)"
        status: pass
    human_judgment: false

# Metrics
duration: 4min
completed: 2026-08-03
status: complete
---

# Phase 137 Plan 02: Navigation-Last Close Summary

**Both recipes wired onto both `docs/index.md` navigation surfaces in one commit, hubs-not-wired ruling recorded with its correction of record, all 42 uncovered outbound recipe links proven to resolve, and the Phase-138 leaf-validator needle-spec handed off with measured literals.**

## Performance

- **Duration:** 4 min
- **Started:** 2026-08-03T22:27:21Z
- **Completed:** 2026-08-03T22:31:00Z
- **Tasks:** 3
- **Files modified:** 2

## Accomplishments
- Commit C lands both `docs/index.md` navigation surfaces together: the two table rows (RE-224, RE-225) and the replaced line-38 quick-nav bullet -- closing the WR-01 defect class that recurred at Phase 132
- Navigation-last proven structurally: Commit C's author timestamp (`2026-08-03T17:28:23-05:00`) strictly post-dates plan 137-01's Commit B author timestamp (`2026-08-03T17:21:25-05:00`)
- Hubs-not-wired ruling recorded with the D-02 correction of record: `check-phase-132.mjs:97`'s regex does not actually cover `recipes/03-`/`recipes/04-`, so `REQUIREMENTS.md:31`'s "bars generically" claim is factually wrong
- All 42 uncovered `../` outbound links in recipes 03/04 (10 unique targets, 10 anchored) resolved against the filesystem -- a surface no validator in this repo covers
- Phase-138's `check-phase-137.mjs` needle-spec handed off with measured, shipped literals in both `.planning/STATE.md` and this SUMMARY

## Task Commits

Each task was committed atomically:

1. **Task 1: Commit C -- both docs/index.md navigation surfaces, in one commit** - `b694254f` (docs)
2. **Task 2: Hubs-not-wired evidence + the uncovered outbound-link sweep** - no commit (read-only task; modifies no tracked files)
3. **Task 3: Needle-spec handoff to Phase 138 + deferred-cleanup candidate** - `5f48a829` (docs)

_Note: this is a `type="execute"` plan; all tasks are `type="auto"`, no TDD RED/GREEN split._

## Files Created/Modified
- `docs/index.md` - two table rows appended (RE-224, RE-225, filename order) + line-38 quick-nav bullet replaced verbatim per D-07 (3 insertions, 1 deletion)
- `.planning/STATE.md` - one bullet appended to the existing Plan-Time Research Flags -> Phase 138 block, carrying the check-phase-137.mjs needle-spec literals

## Needle-spec handoff

Per D-18/D-19/D-20/D-21, `check-phase-137.mjs` is **not authored in this phase** -- it is Phase 138's deliverable (HARN-15). This section carries the **measured actual literals as shipped**, for Phase 138 to build the validator from (also appended to `.planning/STATE.md`'s Plan-Time Research Flags block, immediately after the existing Phase-138 entries):

**Invariant shape:** a per-recipe, LINE-SCOPED co-presence check -- NOT a whole-file `c.includes()`. For each recipe:
1. a line matching `^\| \[<H1 verbatim>\]\(recipes/0N-….md\) \|` exists in `docs/index.md`; and
2. the single line matching `^- \[Device Configuration Recipes\]\(#device-configuration-recipes\)` contains the recipe's fixed prose fragment.

Extract that one line and test it in isolation -- a whole-file `includes('Dedicated')` would false-match `docs/index.md:36` (two lines above the recipes bullet) plus other sites. The needle is buildable only because the bullet-side literals were fixed at CONTEXT ruling time (D-07), never composed at execution time.

**Shipped bullet line (byte-identical, extracted from `docs/index.md`):**
```
- [Device Configuration Recipes](#device-configuration-recipes) -- End-to-end provisioning recipes with embedded admin decision points (shared Windows AVD-client device, Shared iPad full provisioning, Windows 11 multi-app kiosk, Android Dedicated multi-app kiosk)
```

**Shipped table rows (byte-identical link text + target paths):**
```
| [Windows 11 Multi-App Kiosk: Assigned Access Provisioning](recipes/03-windows-11-multi-app-kiosk.md) | Lock a Windows 11 device to a restricted user experience -- a multi-app allow-list, Start layout, and Taskbar -- delivered through an AssignedAccess CSP custom OMA-URI profile, with no Templates GUI path available |
| [Android Dedicated Multi-App Kiosk: Managed Home Screen Provisioning](recipes/04-android-dedicated-mhs-multi-app.md) | Lock an Android Enterprise Dedicated device to a curated Managed Home Screen app grid -- MHS assigned as Required, an App Configuration policy carrying the worked JSON payload, and exit-PIN hardening |
```

**Literals for the needle:**
- Table targets: `recipes/03-windows-11-multi-app-kiosk.md`, `recipes/04-android-dedicated-mhs-multi-app.md`
- Bullet fragments: `Windows 11 multi-app kiosk`, `Android Dedicated multi-app kiosk`
- Corrected hubs-not-wired assertion literals (for the leaf validator's own hub check, since `check-phase-132.mjs:97` does not cover these and must not be edited): `recipes/03-`, `recipes/04-`

**Measured blurb word counts:** RE-224 row blurb = 31 words; RE-225 row blurb = 30 words (both inside D-10's 20-33 word budget).

## Correction of record (D-02)

`scripts/validation/check-phase-132.mjs:97` tests a pattern whose arms are `docs/recipes`, `01-shared-windows-avd`, and `02-shared-ipad` against the three hub files (`docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md`). The hub files live IN `docs/`, so a real link from a hub reads `recipes/03-...` (relative, no `docs/` prefix) -- the `docs/recipes` arm never fires, and the other two arms are hardcoded to the previous two recipes (01, 02). `REQUIREMENTS.md:31`'s claim that it "bars `docs/recipes` … generically" is **factually wrong**: the cost of wiring the hubs to recipes 03/04 is zero, not prohibitive. The hubs stay unwired on the doc-class-taxonomy ground and the existing hub-to-runbook-to-recipe layering ground alone -- NOT on a "frozen validator already enforces this" ground, which is deleted.

**Scoped-ruling sentence (D-05):** The taxonomy ground generalizes, but no standing rule is enacted here -- the phase adding recipe 05 re-rules.

## Hubs-not-wired evidence

- `grep -lE 'recipes/0[34]-|03-windows-11-multi-app-kiosk|04-android-dedicated-mhs' docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md` -> no output (no file matches)
- `git diff --quiet docs/common-issues.md docs/quick-ref-l1.md docs/quick-ref-l2.md` -> succeeds, all three byte-unchanged across the entire phase
- `git diff --quiet scripts/validation/check-phase-132.mjs` -> succeeds, the frozen v1.18 surface was never opened

## Outbound-link sweep (D-17, third gate)

Recipes 03 and 04 ship **42** `../`-relative outbound links (raw count) across **10** unique file targets, none of which `check-nav-hub-links.mjs` covers (it scans only links from/to the 4 hubs). All 10 resolved against the filesystem, relative to `docs/recipes/`:

```
../_glossary-android.md
../_standards/EEE-SOP-standard.md
../admin-setup-android/01-managed-google-play.md
../admin-setup-android/05-dedicated-devices.md
../admin-setup-apv1/03-esp-policy.md
../admin-setup-apv1/04-dynamic-groups.md
../admin-setup-apv1/08-self-deploying.md
../apv1-vs-apv2.md
../l2-runbooks/20-android-app-install-investigation.md
../recipes/01-shared-windows-avd-client.md
```

Result: **0 MISSING**. All 10 file targets exist.

**10 anchored targets spot-checked** (anchor confirmed as an actual heading/anchor tag in the target file):
- `../_glossary-android.md#dedicated` -> `### Dedicated` (`docs/_glossary-android.md:107`)
- `../_glossary-android.md#entra-shared-device-mode` -> `### Entra Shared Device Mode` (`docs/_glossary-android.md:265`)
- `../admin-setup-android/01-managed-google-play.md#bind-mgp` -> `<a id="bind-mgp"></a>` (`docs/admin-setup-android/01-managed-google-play.md:96`)
- `../admin-setup-android/05-dedicated-devices.md#scenarios` -> `## Scenarios` (`:65`)
- `../admin-setup-android/05-dedicated-devices.md#enrollment-profile` -> `## Enrollment profile` (`:110`)
- `../admin-setup-android/05-dedicated-devices.md#enrollment-token` -> `## Enrollment token` (`:170`)
- `../admin-setup-android/05-dedicated-devices.md#provisioning-method-choice` -> `## Provisioning method choice` (`:194`)
- `../admin-setup-android/05-dedicated-devices.md#exit-kiosk-pin-synchronization` -> `## Exit-kiosk PIN synchronization` (`:243`)
- `../admin-setup-android/05-dedicated-devices.md#android-15-frp-reprovisioning` -> `## Android 15 FRP and re-provisioning` (`:262`)
- `../recipes/01-shared-windows-avd-client.md#step-5a-kiosk-configuration` -> `### Step 5a: Kiosk configuration` (`:114`) -- recipe 01's pinned heading, confirmed unshifted; `git diff --quiet docs/recipes/01-shared-windows-avd-client.md` succeeds (zero-edit guard holds)

This is a one-off manual sweep, per D-17 -- a durable checker extending `check-nav-hub-links.mjs` beyond the 4 hubs is out of scope (v1.19 carries NO-TOOLING-PILLAR).

## Deferred-cleanup candidate (D-06, flagged contribution to `v1.19-DEFERRED-CLEANUP.md`)

> If a kiosk-lockout or MHS-exit-PIN-lockout L1/L2 runbook is ever authored, the hub routes to THAT runbook and the runbook may cross-link the recipe; the three hubs never link `docs/recipes` directly.

Flagged as a contribution only -- the `v1.19-DEFERRED-CLEANUP.md` file itself is created by Phase 138.

## CLASS-06 tension, stated plainly

CLASS-06 asks for a validator needle rather than reliance on code review. That needle (`check-phase-137.mjs`) lands in Phase 138, and Phase 138 is hard-blocked on the owner's PIPE-02 push. The in-phase mechanical grep pair from Task 1/Task 2 (the acceptance-criteria greps + the D-03 hub grep, both re-run above) is what covers that window until the leaf validator exists.

## Commit SHAs with Author Timestamps (navigation-last evidence, D-16)

- **Commit B** (plan 137-01, registry + regen + both canaries -- the SC2 binding atom): `f0b7aa90` -- author timestamp `2026-08-03T17:21:25-05:00`
- **Commit C** (this plan, both index.md surfaces): `b694254f` -- author timestamp `2026-08-03T17:28:23-05:00`

Commit C's author timestamp (`17:28:23`) strictly post-dates Commit B's author timestamp (`17:21:25`) -- navigation-last holds structurally. Plan-artifact/SUMMARY commits (`dca20cd4`, `9d5b213c`, `5f48a829`) are excluded by name per D-16.

## Decisions Made
- Used the plan-specified table blurb text verbatim (31 and 30 words respectively), rather than composing new wording, since it was already inside the D-10 budget and matched the two conformant precedent shapes
- STATE.md's needle-spec bullet was appended immediately after the two existing Phase-138 entries in the Plan-Time Research Flags block, not opened as a parallel entry, per D-21(c)
- Did not reintroduce Phase 132's "zero pipeline code changes" claim anywhere in this plan's commits or this SUMMARY, per the plan's `<output>` requirement

## Deviations from Plan

None - plan executed exactly as written. All `must_honor` constraints were respected: both index.md surfaces landed in one commit (Commit C), the line-38 bullet replacement string was copied verbatim (not composed), the table append did not re-create the H2/intro/header, `Dedicated` stayed capitalized, the three hubs were never edited (grep + `git diff --quiet` confirmed), `check-phase-132.mjs` was never opened, no `check-phase-137.mjs` was authored, and no platform-section cross-reference rows were added.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness

Phase 137 is complete: CLASS-05 (plan 137-01) and CLASS-06 (this plan) are both satisfied. Full-corpus C17 is green (234 files, 0 violations), `check-nav-hub-links.mjs` is 0/0, navigation-last is provable by commit timestamp, and the hubs-not-wired ruling is recorded with its correction of record. Phase 138 (V118 pin + 17th Path-A lineage bump + terminal close) is unblocked on Phase 137's side -- it remains hard-blocked on the owner's PIPE-02 push landing on `origin/master`, per STATE.md's existing blocking-precondition note (unchanged by this plan). Phase 138 has a buildable, line-scoped needle-spec with measured literals ready to consume from both `.planning/STATE.md` and this SUMMARY's "Needle-spec handoff" section.

---
*Phase: 137-integration-navigation-last-close*
*Completed: 2026-08-03*
