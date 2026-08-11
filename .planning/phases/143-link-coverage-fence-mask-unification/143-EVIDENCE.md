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

## Status

This artifact is opened by Task 1 and carries D-38's supporting evidence forward for Plan 09's
wave-3 conversion and for Phase 144's close-gate review. No corpus edit and no checker edit has
landed as of this commit — Task 1 touches only `.planning/` paths.
