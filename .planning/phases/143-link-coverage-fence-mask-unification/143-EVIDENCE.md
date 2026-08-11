# Phase 143 Plan 02 — D-38 Evidence Artifact

**Opened:** 2026-08-11, Task 1 (before any code edit this plan makes).
**Tree:** main worktree at SHA `6d930b4d12e31240f3a531a6f1bcd52fc15d255a` (the tip this plan
executes from — Phase 142 D-36's warning about tree identity applies: main-worktree timings and
counts are not directly comparable to a fresh-clone run). **Cache:** warm. **Node:** v24.17.0.
**OS:** Windows 10 Pro 19045. `n=3` on every count row below unless stated otherwise.

## D-38 ruling and its evidence

The owner ruled 2026-08-11 to convert ALL 87 `{#id}` overrides (across 29 files) to `<a id>`
anchors — not only the 22 that are link targets. `143-CONTEXT.md`'s new D-38 entry records the
ruling, its rationale, what it supersedes (D-04's Class-B source-side routing for the 26 affected
pairs) and what it leaves unchanged (D-04's "no new prose" bar, D-11, D-12, D-14, D-23, D-31, D-33,
both CARVE Standing bars). This artifact carries the measured evidence behind that ruling.

**Blast-radius table.** The BEFORE row is this plan's own target state — GitHub anchor model live
(Task 2), `docs/_templates/` excluded and inline-code masking on (Task 3) — i.e. the corpus-scan
state this plan's own `<verification>` block measures at 13/130/143 total (see `143-02-PLAN.md`'s
`<verification>`; the AFTER row's 132/67 anchor split is the pre-repair figure this plan's Task 2
tracer repair further narrows by exactly one pair). The AFTER row is a trial, measured-and-reverted
application of all 87 conversions on top of that same state — never committed in this plan; the
real conversion commit is Plan 09 (wave 3), strictly after this plan's Task 2 per the ordering gate
below.

| state | brokenFile | brokenAnchor | distinct pairs |
|---|---|---|---|
| BEFORE (HEAD, GitHub model, templates excluded, inline mask on) | 13 | 132 | 77 |
| AFTER (all 87 converted) | 13 | 67 | 51 |

`[MEASURED]` both rows n=3, bit-identical across runs, same tree/cache/node declaration above.

### Finding 1 — Zero regressions

No pair broken in the AFTER set is absent from the BEFORE set: `AFTER_pairs \ BEFORE_pairs = ∅`,
verified by set-difference over the two pair lists, not by eyeballing the totals. No link anywhere
in the corpus currently resolves *because* a heading's slug is inflated by its own `{#…}` text —
the one real hazard a blanket conversion could have introduced (a link that only worked by
targeting the inflated auto-slug `foo-bar-custom-anchor` would break once the override is
converted to a clean `<a id>` and the heading reverts to a shorter auto-slug). This was measured
absent.

### Finding 2 — 65 links / 26 pairs fixed by the conversion alone

BEFORE → AFTER drops broken anchors 132 → 67, a delta of exactly 65 links across 26 distinct pairs
— exactly the 65 phantom links D-01 identified (checker-green/GitHub-broken under the old Pandoc
model). The all-87 conversion IS the complete D-01 remedy, delivered entirely target-side (an
existing heading's anchor, not new prose), which is why D-38 can supersede D-04's source-side
Class-B routing for those 26 pairs without weakening D-04 itself.

### Finding 3 — Ordering is a hard gate

Running the all-87 conversion against the *pre*-LINK-01 checker (the shipped Pandoc-model checker,
before this plan's Task 2 lands) turns the hub-scope scan RED: 2 outbound failures at
`docs/quick-ref-l2.md:345,347`, both pointing at
`operations/patch-management/04-android-patch-delivery.md#deadlines-cutover-dates`. The shipped
checker registers `{#id}` verbatim as an anchor and has no `<a id>` recognition at all, so
converting the target heading's `{#deadlines-cutover-dates}` override to an `<a id>` removes the
verbatim anchor the old checker was matching against, with no replacement recognition to catch the
new tag. This is why the conversion must land in Plan 09 at wave 3, strictly after this plan's
Task 2 (the GitHub-model + `<a id>`-recognition edit) — model first, conversion second, always.

### Finding 4 — c17 is unaffected

A trial application of all 87 conversions, measured and reverted, leaves `c17-eee-contract.mjs` at
`234 files checked, 0 with violations, 0 total violations`, all thirteen `#1`–`#13` counters at 0
— unchanged from its pre-trial baseline. The trial's `git diff --numstat` measures exactly
**174 added / 87 removed** across 29 files: one removed heading line replaced by two lines (the new
`<a id>` line above the heading, plus the heading line itself minus its trailing `{#id}` token)
everywhere, with no collateral line touched anywhere in the 29 files.

## `<a id>` placement ruling

D-38 says convert, but not where the tag goes. The ruling: **the `<a id>` goes on its own line
immediately ABOVE the heading line**, following the live precedent at
`docs/admin-setup-android/02-zero-touch-portal.md:38-39`. Two independent reasons, both measured:

1. **Corpus precedent.** Of the 200 live `<a id>` instances in `docs/`, **182 are alone on their
   own line**; **zero** are inline within a heading line. Own-line placement is overwhelmingly the
   house convention; inline-in-heading has no precedent at all in this corpus.
2. **A correctness hazard inline placement would create.** GitHub strips HTML tags before
   slugifying a heading, but this checker's `stripHeadingText` (`check-nav-hub-links.mjs:121-127`)
   strips only `**` and backtick emphasis markers — it does not strip HTML tags. An inline
   `<a id>` placed on the heading line itself would therefore be slugified by this checker as
   ordinary heading text, and the checker's computed auto-slug would diverge from GitHub's true
   rendered slug — re-creating the exact model-divergence defect class D-01 exists to close.
   Own-line placement (above the heading, never inside it) leaves the heading text clean for both
   GitHub's real renderer and this checker's model of it.

## D-38 conversion pre-flight (Plan 09, Task 1)

**Opened:** 2026-08-11. Tree: main worktree at the current HEAD (post-Plan-02). Node: v24.17.0.
OS: Windows 10 Pro 19045.

### Pre-flight A — the census still holds

`[MEASURED]` re-derived by direct grep (not trusted from the plan's authored figure): `docs/`
(excluding `docs/_templates/`) holds exactly **85** `{#id}` occurrences across exactly **29**
files — 2 lower than the plan's authored 87/29 because Plan 02's own Deviation 1 already
converted 2 of the 87 early (`docs/operations/patch-management/04-android-patch-delivery.md`,
commit `598c76a7`) to keep the hub-scope scan green. All 29 files are exactly the plan's named
29-file set — no file gained or lost a `{#id}` occurrence outside that set. All **85** are
heading-TRAILING (verified per-occurrence against `^#{1,6}\s+.*\{#[a-zA-Z0-9_-]+\}\s*$`), **0**
mid-heading, **0** outside a heading line. Per-file counts:

| file | count | file | count |
|---|---|---|---|
| l1-runbooks/02-esp-stuck-or-failed.md | 3 | l2-runbooks/19-android-enrollment-investigation.md | 5 |
| l1-runbooks/11-macos-setup-assistant-failed.md | 3 | l2-runbooks/21-android-compliance-investigation.md | 4 |
| l1-runbooks/12-macos-profile-not-applied.md | 2 | l2-runbooks/22-android-knox-investigation.md | 5 |
| l1-runbooks/13-macos-app-not-installed.md | 3 | l2-runbooks/23-android-aosp-investigation.md | 5 |
| l1-runbooks/14-macos-compliance-access-blocked.md | 2 | l2-runbooks/25-linux-agent-investigation.md | 4 |
| l1-runbooks/21-ios-compliance-blocked.md | 3 | operations/app-lifecycle/01-windows-win32-msix-scale.md | 3 |
| l1-runbooks/25-android-compliance-blocked.md | 4 | operations/app-lifecycle/04-android-mgp-lifecycle.md | 1 |
| l1-runbooks/27-android-zte-enrollment-failed.md | 4 | operations/co-management/00-overview.md | 1 |
| l1-runbooks/28-android-knox-enrollment-failed.md | 4 | operations/co-management/03-cocmgmt-migration-paths.md | 1 |
| l1-runbooks/29-android-aosp-enrollment-failed.md | 5 | operations/drift-migration/01-windows-drift-detection.md | 2 |
| l1-runbooks/30-linux-enrollment-failed.md | 3 | operations/patch-management/00-overview.md | 1 |
| l1-runbooks/31-linux-compliance-non-compliant.md | 4 | operations/patch-management/01-windows-wufb-rings.md | 4 |
| l1-runbooks/32-linux-ca-blocking-web-access.md | 3 | operations/patch-management/02-macos-update-enforcement.md | 2 |
| l2-runbooks/00-index.md | 1 | operations/patch-management/03-ios-update-lifecycle.md | 1 |
| | | operations/patch-management/04-android-patch-delivery.md | 2 |

Sum: 85 across 29 files. Task 2 converts these 85; the 2 already-converted headings are Task 2's
zero-op (they already carry the target `<a id>` shape).

### Pre-flight B — Category 10 covers every file

`[MEASURED]` all 29 files individually confirmed present in `v1.20-CARVE.md`'s Category 10 block
(`grep -qxF` per path, 29/29 hits). Set difference in both directions: {29 files} \ {Category 10
roster} = ∅, and no file among the 29 is absent from Category 10. `carve-gate.mjs`'s hard-exit-1
off-list behavior will not block Task 2's docs edits.

### Pre-flight C — the ordering gate is satisfied

`[MEASURED]` `grep -c 'matchAll' scripts/validation/check-nav-hub-links.mjs` → **1** (the single
real `.matchAll(` call added by Plan 02). No functional `{#id}`-recognition regex remains outside
the self-test block: the only `{#id}`-shaped text in the file is 5 comments (`:120,121,134,139,166`,
all explaining what is deliberately NOT done) plus the self-test Case D fixture string (`:369-375`,
synthetic test data, not a recognition branch). The pre-LINK-01-checker red-scan hazard (2 outbound
failures at `docs/quick-ref-l2.md:345,347`) does not apply — the ordering gate is satisfied.

### NEW FINDING — two frozen chain validators hard-pin 14 of the 85 `{#id}` tokens literally on the heading line

The plan's own cross-reference-check instruction ("confirm no frozen validator pins a heading
line, a heading slug or a `{#id}` token from any of the 29 files") surfaced a real, previously
undocumented conflict — not covered by Pre-flights A/B/C as named, but the exact class of defect
D-33's discipline exists to catch before an edit lands.

`[MEASURED]` a systematic grep of all 85 anchor ids for the literal escaped-regex source text
`\{#ID\}` across `scripts/` (not just a mention — an exact hard requirement) found **14** hits,
confined to exactly two files:

- **`scripts/validation/check-phase-51.mjs`** (CARVE Category 5, already on-list) — `V-51-12`
  (`:206-219`), `V-51-13` (`:220-235`), `V-51-14` (`:236-250`) — 10 regexes of the shape
  `/^## Cause A: [^\n]*\{#cause-a-package-install\}\s*$/m`, each requiring the literal `{#id}`
  token present ON the heading line, read **live** (`readFile(RB30/RB31/RB32)`, not
  `readTreeFrozen()`) against `docs/l1-runbooks/{30,31,32}-*.md` — three of the 29 files.
- **`scripts/validation/check-phase-52.mjs`** (NOT on any CARVE category — fully off-list) —
  `V-52-11` (`:169-184`) — 4 regexes of the same shape against `docs/l2-runbooks/25-linux-agent-
  investigation.md` (`RB25`, `readFile`, live), the fourth of the 29 files.

Both files carry an explicit precedent for exactly this maintenance: `check-phase-51.mjs:41`'s
own header comment reads "CDI-02: Pinned H2 strings — Phase 52+ renaming requires same-commit
validator update" — this project's own established convention is that a heading-shape change
ships together with the validator update, in the same edit set, not as a separate ceremony.

**Why this is not one of Pre-flights A/B/C but is still a genuine gate:** these 14 pins require
the literal token to be present ON the heading line; Task 2's mechanical conversion strips that
token from the heading line and places `<a id="ID"></a>` on the line immediately above. Post-
conversion, `V-51-12/13/14` and `V-52-11` — all four currently PASS, all four inside
`check-phase-138.mjs`'s apex `CHAIN_PHASES = [48..137]` — would flip to FAIL, a genuine apex
regression Task 2's own `<verify>` block does not test for (it runs only c17/hub-scan/carve-gate,
none of which exercise `check-phase-51.mjs`/`52.mjs`). Confirmed by direct execution:
`node scripts/validation/check-phase-51.mjs` → `25 passed, 0 failed, 0 skipped`;
`node scripts/validation/check-phase-52.mjs` → `22 passed, 0 failed, 0 skipped` (both bare and
`CHECK_PHASE_NESTED=1`, pre-edit baseline).

**Remediation (Rule 2/Rule 3 auto-fix, not an architectural change):** update both files' pinned
regexes to test the same underlying invariant (this runbook has N anchor-indexed Cause/Trap H2s
with these specific ids) under the new convention — an own-line `<a id="ID"></a>` immediately
above the bare heading — instead of the old trailing-token convention. `check-phase-51.mjs` is
already CARVE Category 5 (on-list, no amendment needed). `check-phase-52.mjs` requires a CARVE
Category 5 amendment (D-09 three-step procedure: amendment-only commit, then the edit) before its
regexes can be touched — landed as part of Task 2, recorded in its own GOV-02 ledger rows, per
this project's own precedent (`check-phase-67.mjs` and `check-phase-138.mjs` were both "absent
from the allowlist entirely" until the phase that needed to edit them added them). No other
frozen validator hard-pins any of the other 71 anchor ids (verified by the same systematic
per-id grep across all 85 ids — zero hits outside these 14).

## Status

This artifact is opened by Task 1 (Plan 02) and D-38's conversion pre-flight (Task 1, Plan 09),
carrying D-38's supporting evidence forward for Plan 09's wave-3 conversion and for Phase 144's
close-gate review. Plan 09 Task 2 lands the 85-token corpus conversion plus the two-file validator
remediation this pre-flight surfaced.
