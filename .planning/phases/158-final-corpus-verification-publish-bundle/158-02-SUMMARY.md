---
phase: 158-final-corpus-verification-publish-bundle
plan: 02
subsystem: docs-style-audit
tags: [corpus-hand-remediation, eee-sop-standard, glossary-cross-reference, word-list, accessibility, pre-sweep-ordering]

# Dependency graph
requires:
  - phase: 158-final-corpus-verification-publish-bundle
    provides: plan 158-01's discovery audit, which confirmed these three falsifications are the known-and-owned set with no unexpected additions
provides:
  - "The corrected two-skill divergence statement in docs/_standards/EEE-SOP-standard.md (D-05), replacing the falsified byte-identical claim"
  - "The named directional reference (D-04) and the word-list replacement for the desire verb (D-01), plus one new dated Version History row"
  - "A corpus-consistency cross-reference from the Linux glossary's unattended-upgrades entry to the reboot-handling section of the Linux update-delivery guide, and the word-list replacement for the nativeness adjective"
  - "The tool-sense preposition fix at the two Patch & Update Management hub sites (docs/index.md, docs/operations/00-index.md)"
affects: [158-03, 158-04, 158-05, 158-06, 158-07]

# Actuals (#2632)
actuals:
  tokens: 58000
  tasks: 3
  commits: 3

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Hand remediation lands before the mechanical em-dash sweep whenever an edited line is also that file's sweep target (D-69 constraint 1)"
    - "A falsified corpus claim is corrected by removing the point-in-time assertion rather than re-measuring it, so the sentence cannot go stale on the next measurement"
    - "A corpus-consistency cross-reference (a second in-corpus link) replaces an external-fact fetch when the claim is already supported by a dated citation elsewhere in the tracked corpus"

key-files:
  modified:
    - docs/_standards/EEE-SOP-standard.md
    - docs/_glossary-linux.md
    - docs/index.md
    - docs/operations/00-index.md

key-decisions:
  - "Word-list replacement for 'wish' (D-61): 'unenforceable wish list' -> 'unenforceable want list', the direct word-list-guided noun-compound substitution, rather than restructuring the sentence."
  - "Word-list replacement for 'native' (D-61): of the two 'native' occurrences on _glossary-linux.md's unattended-upgrades entry line, edited only 'a native Intune profile' -> 'a built-in Intune profile' (the minimal one-word swap matching the word list's own 'use built-in' guidance verbatim); left 'distro-native automatic upgrades' untouched, since D-61 names exactly one nativeness-word EDIT for this plan and a second edit on the same line would exceed the phase's five-EDIT budget."
  - "Version History row wording (D-14) avoids the literal strings 'byte-identical' (the falsified claim being corrected) and 'last_verified'/'review_by' (the frontmatter freshness keys), because the task's own verify block greps the file diff for exactly those literals to prove the row does not silently reintroduce or reference them."

requirements-completed: []

coverage:
  - id: D1
    description: "The falsified two-skill byte-identical claim in EEE-SOP-standard.md D-05 is replaced with the measured divergence statement (user-level copy vs. tracked project copy already diverged; google-style-verify exists only as the tracked project copy), the directional 'above' reference is replaced with 'the preceding EEE structural sections', the desire verb 'wish' is replaced with 'want', and one new dated Version History row records the correction with no freshness-stamp change."
    requirement: null
    verification:
      - kind: other
        ref: "node scripts/validation/c17-eee-contract.mjs (237 files checked, 0 violations)"
        status: pass
      - kind: other
        ref: "python scripts/validation/check-prose-style.py (exit 0)"
        status: pass
      - kind: other
        ref: "node scripts/validation/check-nav-hub-links.mjs (0 hub-presence, 0 corpus-link failures)"
        status: pass
      - kind: other
        ref: "grep -c 'byte-identical' docs/_standards/EEE-SOP-standard.md == 0; git diff --stat reports 4 insertions(+) / 3 deletions(-) (7 changed lines, within the 8-line cap); freshness-stamp grep reports no match"
        status: pass
    human_judgment: false
  - id: D2
    description: "The Linux glossary's unattended-upgrades entry gains a second link to the Linux update-delivery guide's #reboot-handling anchor (a corpus-consistency cross-reference, not an external-fact fetch), and the nativeness adjective 'native Intune profile' is replaced with 'built-in Intune profile'. No provenance-deficit marker or inline Source line is introduced, and no Version History row is added."
    requirement: null
    verification:
      - kind: other
        ref: "node scripts/validation/check-phase-49.mjs (22/22 PASS)"
        status: pass
      - kind: other
        ref: "grep -c '05-linux-update-delivery.md#' docs/_glossary-linux.md == 1; anchor 'configuring-unattended-upgrades' confirmed present in the target guide by a python regex+anchor-existence check"
        status: pass
      - kind: other
        ref: "grep -c '[CITED:' and grep -c '^**Source:**' both == 0 in docs/_glossary-linux.md; git diff shows 2 added lines with no Version History or freshness-stamp line touched"
        status: pass
    human_judgment: false
  - id: D3
    description: "The tool-sense preposition at docs/index.md:305 and docs/operations/00-index.md:28 is replaced ('via apt' -> 'using apt and unattended-upgrades'), matching the substitution table's tool-sense mapping and avoiding the rejected blanket 'through' form. The third 'via apt' occurrence in the protected linux-capability-matrix.md table row is left untouched, and no substitution table file is modified."
    requirement: null
    verification:
      - kind: other
        ref: "grep -c 'via apt' summed across both hubs == 0; grep -qF 'using apt and unattended-upgrades' true in both files; grep -rc 'through apt' docs/ == 0; grep -c 'via apt' linux-capability-matrix.md == 1"
        status: pass
      - kind: other
        ref: "git diff --stat reports 2 files changed, 2 insertions(+), 2 deletions(-); git status --porcelain -- scripts/docs-style/ empty; c17/nav-hub/prose-style all green"
        status: pass
    human_judgment: false

# Metrics
duration: 16min
completed: 2026-09-08
status: complete
---

# Phase 158 Plan 2: Hand Remediation of the Three Measured Corpus Defects Summary

**Landed all three of this phase's owned hand-remediation edits (the falsified skill-divergence sentence, the Linux glossary's external-fact-to-cross-reference conversion, and the tool-sense preposition fix at two hubs) in three commits, before the mechanical em-dash sweep can touch the same lines — exactly three of the phase's five style EDITs also landed here, and every passive stayed flagged rather than rewritten.**

## Performance

- **Duration:** 16 min
- **Started:** 2026-09-08T05:58:00Z
- **Completed:** 2026-09-08T06:13:28Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments

- `docs/_standards/EEE-SOP-standard.md` (commit `3c53f72a`): D-05's falsified "the two are byte-identical today" claim is gone, replaced with the measured divergence — the `google-style` skill exists in a user-level copy outside the repository and this tracked project copy, which have already diverged; `google-style-verify` exists only as the tracked project copy, so a session loading only the user-level copies has the rewriter without the verifier. D-04's positional "EEE structural sections above" became "the preceding EEE structural sections" per the accessibility reference's ban on directional language. D-01's "unenforceable wish list" became "unenforceable want list" per the word list's plainer-form guidance. One new dated Version History row (2026-09-08) records the correction, following the file's own v1.19 HYG-05 precedent for a claim found empirically false; `last_verified`/`review_by` are untouched. Diff: 4 insertions / 3 deletions (7 changed lines).
- `docs/_glossary-linux.md` (commit `804e12ba`): the `unattended-upgrades` entry's closing sentence now carries a second link, `[Reboot Handling](operations/patch-management/05-linux-update-delivery.md#reboot-handling)`, converting the reboot-marker claim into a corpus-consistency cross-reference the audit can assert from the repository's own bytes rather than an uncited external fact — the target guide already cites the vendor page with a date (`05-linux-update-delivery.md:262`, Canonical, updated 2026-07-06) and restates the claim in its own prose. "a native Intune profile" became "a built-in Intune profile" (the word list's own software-feature substitution). No provenance-deficit marker (`[CITED:`) or inline `**Source:**` line was introduced, and no Version History row was added, per this glossary's own same-entry-correction precedent (`9a68aa1a`). This edited line is also the file's single mechanical em-dash sweep target in plan 158-03 — landing this edit first is what D-69 constraint 1 requires.
- `docs/index.md` and `docs/operations/00-index.md` (commit `1c4f7880`): both Patch & Update Management hub lines changed "Linux update delivery via apt and unattended-upgrades" to "...using apt and unattended-upgrades" — the tool-sense form `scripts/docs-style/subs-via-sense.tsv` maps a command/tool sense to, matching `RESUME.md:518`'s ruling that rejects the blanket "through" substitution for this class of sense. The third `via apt` occurrence, in `docs/reference/linux-capability-matrix.md:112`'s protected table row (a different, command-object sense, in a file neither pillar of this milestone touched), is untouched and unedited. No file under `scripts/docs-style/` was modified.
- All three commits pass the full applicable gate set at commit time: `c17-eee-contract.mjs` (237 files, 0 violations) after every commit, `check-prose-style.py` (exit 0), `check-nav-hub-links.mjs` (0/0), and `check-phase-49.mjs` (22/22) for the glossary commit. The live-corpus pin differ (`pins2.py scripts/validation docs`) reports 685 pinned both before and after all three edits — unchanged from plan 158-01's before-half measurement, confirming none of these hand edits touched a pinned literal.

## Task Commits

Each task was committed atomically:

1. **Task 1: Correct the falsified skill-divergence sentence and the directional reference in the standards document** - `3c53f72a` (fix)
2. **Task 2: Give the Linux glossary entry a corpus cross-reference instead of a vendor re-fetch** - `804e12ba` (fix)
3. **Task 3: Replace the tool-sense preposition at the two hub sites, by hand, path-scoped** - `1c4f7880` (fix)

_Note: this plan is `type="execute"`, not TDD -- no RED/GREEN/REFACTOR cycle applies._

## Files Created/Modified

- `docs/_standards/EEE-SOP-standard.md` - corrected D-05 divergence claim, D-04 directional reference, D-01 desire verb, new Version History row
- `docs/_glossary-linux.md` - added reboot-handling cross-reference link, replaced "native" with "built-in"
- `docs/index.md` - "via apt" -> "using apt and unattended-upgrades" at the Patch & Update Management hub line
- `docs/operations/00-index.md` - "via apt" -> "using apt and unattended-upgrades" at the Patch & Update Management hub line

## Post-Edit Line Records (for plan 158-05's disposition table)

- **`docs/_glossary-linux.md`** post-edit `unattended-upgrades` entry line (fix_sha `804e12ba`, this file's single em-dash sweep target for plan 158-03):
  `The APT-side package and configuration that performs distro-native automatic upgrades on Ubuntu. Intune does not set it, does not read it, and has no policy surface analogous to a Windows update ring for Linux; configuration is delivered to the device through a Bash platform script rather than a built-in Intune profile. Allowed origins are configured per package source — release, `-security`, and ESM security origins enabled by default, with `-updates`, `-proposed`, and `-backports` present but commented out. A pending reboot after an `unattended-upgrades` run is signaled through a reboot-required marker file. Canonical's release-upgrade guidance names `/run/reboot-required`; the `unattended-upgrades` log output names `/var/run/reboot-required`. No first-party page consulted for the guide documents the relationship between the two spellings, so a check tests both. See [Linux Update Delivery](operations/patch-management/05-linux-update-delivery.md#configuring-unattended-upgrades) for the full configuration reference and [Reboot Handling](operations/patch-management/05-linux-update-delivery.md#reboot-handling) for the reboot-handling detail.`
- **`docs/index.md`** post-edit hub line (fix_sha `1c4f7880`): `Cross-platform OS update enforcement -- Windows Update for Business rings, macOS managed update commands (DDM), iOS supervised vs unsupervised update lifecycle, Android per-OEM patch delivery (Play Integrity tier effects), and Linux update delivery using apt and unattended-upgrades.`
- **`docs/operations/00-index.md`** post-edit hub line (fix_sha `1c4f7880`): `Cross-platform OS update enforcement guidance—Windows Update for Business rings, macOS managed update commands (DDM), iOS supervised vs unsupervised update lifecycle, Android per-OEM patch delivery (Play Integrity tier effects), and Linux update delivery using apt and unattended-upgrades.`
- **Version History row date:** `2026-09-08`, appended to `docs/_standards/EEE-SOP-standard.md`'s terminal table (only new row in this plan; no row added to either glossary).

## Decisions Made

See `key-decisions` in frontmatter. In brief: applied the word list's direct noun-compound substitution for "wish" (-> "want list") rather than restructuring the sentence; edited only one of the two "native" occurrences on the glossary's single long entry line (the word list's own "built-in" example, applied to "a native Intune profile") to stay within the phase's five-EDIT budget, leaving "distro-native automatic upgrades" untouched; worded the new Version History row to avoid the literal strings the task's own verify block greps for ("byte-identical", "last_verified", "review_by"), since those greps check the file diff for presence of those exact tokens regardless of surrounding context.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

One self-correction during Task 1: the first draft of the new Version History row referenced "byte-identical" in describing what was corrected, which caused the task's own `grep -c 'byte-identical' == 0` acceptance check to fail (the literal string appeared in the new row itself, not just the old sentence). Reworded the row to describe the correction without repeating the falsified term, re-ran all Task 1 verify commands, and confirmed all passed. No repair budget was otherwise needed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- All three hand-remediation edits this phase owns are in the corpus before plan 158-03's mechanical em-dash sweep runs. `docs/_glossary-linux.md:143`'s post-edit line is recorded above so plan 158-05's disposition record can name a stable pre-sweep line.
- Exactly three of the phase's five style EDITs (`wish`->`want`, `above`->`the preceding`, `native`->`built-in` in the glossary) landed in this plan; the two `via`->`using` hub-site EDITs also landed in this plan's Task 3, completing all five style EDITs for the phase. No corpus-wide style pass was run beyond these five named edits.
- No file under `scripts/docs-style/` or `scripts/validation/` was modified by this plan; every substitution table stays byte-unchanged.
- No blockers. The live-corpus pin differ is unchanged at 685 pinned (0 lost/0 added) against plan 158-01's before-half measurement.

---
*Phase: 158-final-corpus-verification-publish-bundle*
*Completed: 2026-09-08*

## Self-Check: PASSED

- All 4 modified files confirmed present on disk (`[ -f ]`) with the expected edits verified via `grep`.
- All 3 commits (`3c53f72a`, `804e12ba`, `1c4f7880`) confirmed present via `git log --oneline`.
- All task-level `<acceptance_criteria>` and `<verify>` commands re-confirmed passing above (c17 237/0 after every commit, prose-style exit 0, nav-hub 0/0, check-phase-49 22/22, pin differ 685/0/0 unchanged).
- Plan-level `<verification>` re-confirmed: identity claim absent, glossary cross-reference resolves with no provenance marker, both hub phrases present with the rejected form absent corpus-wide and the third site untouched, exactly one new Version History row exists (nowhere else), and no file under `scripts/docs-style/` was modified.
