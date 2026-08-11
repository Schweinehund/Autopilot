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

## D-38 remediation class 2 — prose-scanning validators reading the new `<a id>` tag as body text

Discovered empirically during Task 2's family-by-family conversion (not by the pre-flight grep,
since this class has no literal `{#id}` text to find): a frozen validator that scans body prose
for a bare/unqualified word, stripping the OLD `\{#[a-z0-9-]+\}` form from its input but not the
NEW own-line `<a id="ID"></a>` tag, can misread the anchor id's own text as unqualified content.

**Instance 1 (found):** `check-phase-54.mjs`'s `V-54-11` scans
`docs/operations/patch-management/01-windows-wufb-rings.md` for every occurrence of the word
"ring" and requires each to be qualified (e.g. "WUfB deployment ring"). After converting
`## WUfB Deployment Rings {#wufb-deployment-rings}`, the new `<a id="wufb-deployment-rings"></a>`
line contains "rings" in its id attribute, unqualified by any preceding qualifier phrase within
the check's 40-character window — a false-positive FAIL. Fixed by adding an `<a id>` strip to the
same regex chain that already stripped the old form (`check-phase-54.mjs`, GOV-02 ledger, this
plan's Task 2).

**General rule for the two remaining families (co-management, drift-migration):** after each
family's conversion, re-run every validator that reads a converted file — not just the three gates
named in this plan's own `<verify>` blocks — since a bare-word/prose-scanning check is a class of
false positive the pre-flight grep (which looks for literal `{#id}` text) structurally cannot
detect in advance. `check-phase-51/52/54.mjs` are now confirmed clean; `check-phase-53.mjs`
(co-management) and `check-phase-55/56.mjs` (app-lifecycle, drift-migration) were inspected ahead
of their conversion and found to use either optional-group heading matches (`(\s+\{#id\})?`,
tolerant of removal) or presence/positive-literal checks unrelated to the new anchor's id text —
no further strip-chain gaps expected, but each is re-run after its family lands rather than
assumed clean.

## D-38 remediation class 3 — 47 pre-existing duplicate anchors

Discovered empirically after all four family commits landed (a full-corpus post-hoc scan, not
predictable from the pre-flight census): 13 of the 29 files already carried a pre-existing,
blank-line-separated `<a id="ID"></a>` anchor immediately above a heading whose `{#ID}` override
used the identical id — an older anchor convention co-existing with the newer `{#id}` override on
the same heading, predating this phase (visible in `git log`, e.g.
`docs/l1-runbooks/02-esp-stuck-or-failed.md`'s `a6f312e9 fix(60-04): repair 3 broken anchors...`).

The D-38 conversion script correctly, mechanically inserted its own `<a id>` line directly above
every `{#id}`-bearing heading regardless of what preceded it, producing **47** cases of two
identical `<a id="ID"></a>` tags in a row — duplicate `id` attributes. Harmless to the Set-based
checker (`Set.add` is idempotent) but invalid HTML and sloppier than the mechanical-edit-only
mandate intends.

**Fix:** for every case of two identical `<a id>` lines where the second is immediately followed
by the heading, remove the second (this plan's newly-inserted) line, leaving the original
pre-existing anchor and the heading's blank-line spacing untouched — net effect for these 47
headings: the heading line is shortened (its `{#id}` suffix stripped) and nothing is added, since
an anchor with the matching id already existed nearby.

**Verification of the fix, not just the count:** a full-corpus scan post-fix confirms zero
duplicate `<a id>` ids remain anywhere in the 29 files, and every one of the 87 `{#id}`-to-anchor
conversions (85 this plan + 2 Plan 02) now has exactly one working `<a id>` immediately preceding
its heading — 40 with no blank line (38 this plan's genuine insertions + 2 Plan 02's early
conversions) and 47 with the original blank-line spacing preserved (this plan's deduped cases),
summing to exactly 87. A systematic per-id grep across all 47 affected ids against `scripts/`
confirms zero validator references any of them.

**Reconciled diff shape:** the corpus-wide diff from before Task 2 to the end of Task 2 is
**29 files / 123 added / 85 removed** (170 added minus the 47 deduped lines), not the plan's
authored 174/87 nor the interim 170/85 — recorded here as the final, measured figure.

## Status

This artifact is opened by Task 1 (Plan 02) and D-38's conversion pre-flight (Task 1, Plan 09),
carrying D-38's supporting evidence forward for Plan 09's wave-3 conversion and for Phase 144's
close-gate review. Plan 09 Task 2 lands the 85-token corpus conversion plus the validator
remediation and duplicate-anchor cleanup this pre-flight and Task 2's own family-by-family
re-verification surfaced. Task 3 records the post-landing dry-run measurement below.

## Task 3 — dry-run checkpoint (measured on the landed state)

**Method:** the same temporary-widening procedure Plan 02 established — delete `checkInboundLinks`'s
`:284` (`if (hubSet.has(relPath)) continue;`) and `:297`
(`if (!hubSet.has(resolvedRel)) continue;`, line numbers shifted from Plan 02's `:259`/`:269` by
this plan's own corpus edits to the checker's surrounding comments), run
`node scripts/validation/check-nav-hub-links.mjs --verbose`, capture the full failure list and
summary, then `git checkout -- scripts/validation/check-nav-hub-links.mjs` to revert — never
committed.

**Headline measurement — matches the plan's own projection exactly:**

| metric | measured |
|---|---|
| files scanned | 274 |
| relative links | 6252 |
| broken file targets | **13** |
| broken anchors | **65** |
| **total** | **78** |

Dry-run ladder: **175 → 173 → 143 → 78** (the first three rows are Plan 02's own measured values;
78 is this plan's measurement on the fully-landed state, matching the plan's projected 78 exactly).

**Zero-regression proof, measured on BOTH ends (not projected):** the BEFORE snapshot was
reconstructed by temporarily reverting the 29 corpus files to their state immediately after Plan
09 Task 1 (commit `da2876db`, before any Task 2 edit) — `git checkout da2876db -- <29 files>`,
re-run the same widened scan, then `git checkout HEAD -- <29 files>` to restore (working tree
confirmed clean of docs/ changes afterward; only the temporary `check-nav-hub-links.mjs` widening
remained dirty until its own revert). BEFORE totals 274 files / 6252 links / 13 file-target
failures / **125** anchor failures / **138** total — reproducing Plan 02's own recorded 138
exactly, confirming the reconstruction method is sound.

Restricting to `anchor not found` failures only (excluding the 13 file-target failures, which are
LINK-03 scope and untouched by this plan) and resolving each link's target relative to its source
file's directory (a scripted comparison, not eyeballed):

| | BEFORE (post-Plan-02, pre-Task-2) | AFTER (fully landed) |
|---|---|---|
| distinct (target-file, fragment) pairs | 74 | **50** |
| anchor links | 125 | **65** |

Pair-set subset proof: **24 pairs removed, 0 added** — the AFTER set is a strict subset of the
BEFORE set, confirmed by `Set` difference in both directions, not by comparing totals. This is the
critical zero-regression property: no link anywhere in the corpus that resolved before this
plan's edits now fails to resolve.

**Reconciliation against the plan's own projected 77→51/26-removed figures:** this plan measures
74→50/24-removed instead. Both BEFORE figures were computed by the SAME temporary-widening
procedure against the SAME `da2876db` state; the 3-pair discrepancy (77 vs 74) is not
independently reproducible from Plan 02's own artifacts (no raw pair list was preserved in
`143-02-SUMMARY.md`, only the aggregate 77) and is not chased further here — the methodology used
in this plan is fully reproducible (scripted path resolution + `Set` difference, not eyeballed)
and its own internal arithmetic is self-consistent (65 anchor links + 13 file-target links = 78,
matching the checker's own summary line exactly on both BEFORE and AFTER runs). Per D-36's rule,
this is recorded as a measured value with its derivation shown, not silently reconciled to match
the earlier projection.

**Class split for Plans 03, 04 and 05 — measured pair list provided; full C/D/B classification
deferred to those plans' own investigation.** The 50 surviving anchor pairs are listed below with
a best-effort structural signal (does the target file contain a heading or table-row matching the
fragment's words) — this is NOT a final classification per D-04/D-05's disjoint-class rule, which
requires reading each target file's actual content, not a word-presence heuristic. Three cases are
already ruled by CONTEXT.md and are authoritative: `docs/_glossary.md#intune` is **Class D**
(D-06: no real `### Intune` entry exists, de-anchor is correct); `docs/_glossary.md#enrollment-
status-page`, `#entra`, `#self-deploying` are **Class B** (D-06: rewrite to `#esp`,
`#entra-id-sso`, `#self-deploying-mode`); `docs/lifecycle-apv2/00-overview.md#enrollment-time-
grouping----the-core-mechanism` is **Class B** (D-03: stale by exactly one inserted `etg` token,
correct heading exists as `## Enrollment Time Grouping (ETG) -- The Core Mechanism`).

27 of the 50 pairs are `docs/error-codes/{01..05}-*.md` deep links (8+8+3+1+7) — D-10 already
establishes these as **Class C** (target-side `<a id>` prepended to the numerically-first matching
table row), with the editorial calls D-10 already named (two double-row codes) still standing.

The remaining 19 pairs (glossary/reference/cross-platform/admin-setup entries not named above)
need Plans 03/04/05's own per-link read — recorded here as the ground-truth pair list, not
pre-classified:

```
docs/_glossary-android.md#aosp (2)
docs/_glossary-macos.md#abm-apple-business-manager (1)
docs/_glossary-macos.md#managed-apple-id (1)
docs/admin-setup-linux/01-intune-linux-agent.md#identity-broker-v202-re-enrollment (1)
docs/admin-setup-macos/10-kerberos-sso-extension.md#k-1-wrong-extension-identifier (1)
docs/admin-setup-macos/10-kerberos-sso-extension.md#k-5-wrong-payload-type (1)
docs/android-lifecycle/02-provisioning-methods.md#byod (1)
docs/android-lifecycle/03-android-version-matrix.md#cope (2)
docs/cross-platform/apple-business/01-role-permission-model.md#account-holder-do-not-delegate (1)
docs/cross-platform/apple-business/01-role-permission-model.md#edit-without-view-dependency-table (1)
docs/cross-platform/apple-business/01-role-permission-model.md#intune-side-labels-preserved (1)
docs/reference/linux-capability-matrix.md#monitoring (1)
docs/reference/linux-capability-matrix.md#supported-management-surface (1)
docs/reference/macos-commands.md#intunemacODC (1)
docs/reference/registry-paths.md#autopilotsettings (1)
docs/reference/registry-paths.md#provisioning-diagnostics (1)
docs/reference/registry-paths.md#winlogon (1)
```

**Line-number-shift hazard.** Every `file:line` citation into one of the 29 converted files, in
any plan or artifact written before this conversion, is stale by one line per preceding converted
heading in the same file (two lines where a deduped anchor was kept: the anchor line is unchanged
but the heading itself shifted by 0 since the `{#id}` suffix removal is same-line). Two named live
instances carried over from Plan 02's own citation set:
`docs/l2-runbooks/25-linux-agent-investigation.md:352` is now `:356` (Trap D heading region), and
`docs/l2-runbooks/23-android-aosp-investigation.md:362` is now `:367`. **General rule:** locate
every downstream edit by heading/content text, never by a pre-conversion line number.

**Not committed:** `git status --porcelain scripts/validation/check-nav-hub-links.mjs` confirmed
empty after both widened runs (BEFORE and AFTER) were reverted.

## Plan 03 — LINK-03 + Class-D per-class remedy ledger, dry-run checkpoint (Task 3)

**Method:** identical to Plan 09's Task 3 — `checkInboundLinks`'s two `continue` guards
(`:284` `if (hubSet.has(relPath)) continue;` and `:297` `if (!hubSet.has(resolvedRel)) continue;`
at this plan's tree state) deleted in the working tree only, `node scripts/validation/
check-nav-hub-links.mjs --verbose` run, full output captured, then
`git checkout -- scripts/validation/check-nav-hub-links.mjs` reverted. `git status --porcelain`
confirmed empty afterward.

**Per-class remedy ledger, keyed to Plan 09's 51-pair / 67-link post-conversion split:**

| Class | Count landed this plan | Mechanism |
|---|---|---|
| LINK-03 file targets | 13 links / 10 lines (11 total links, one line carries 2) | `../` level dropped, destination unchanged (Task 1) |
| Class D (de-anchor) | 12 pairs / 16 links | `#fragment` dropped, file target kept; 2 of the 16 are self-links degraded to plain text (Task 2) |
| Class B (ETG) | 0 (explicitly excluded) | Left untouched — Plan 05's Class-B rewrite |

**Headline measurement:**

| metric | measured | Plan 09 baseline |
|---|---|---|
| files scanned | 274 (unchanged — no file added/removed this plan) | 274 |
| relative links | 6252 (unchanged — every edit rewrites an existing link's target in place, none added/removed; `git diff --numstat` across both tasks confirms per-file added==removed) | 6252 |
| broken file targets | **0** | 13 |
| broken anchors | **49** | 65 |
| **total** | **49** | 78 |

`grep -c "target file not found"` on the captured dry-run output returns **0**, confirming LINK-03's
13 are fully cleared and Task 1's zero-file-target claim independently — the three Stage
fragments (`#stage-2-...`, `#stage-7-...`, `#stage-9-...`) that only became evaluable once the
paths resolved add zero new anchor failures, matching D-09's stability claim.

**Dry-run ladder:** 175 → 173 → 143 → 78 → **49** (this plan; 78 → 49 is a drop of 29 — the 13
file-target links plus the 16 de-anchored Class-D links).

**Reconciliation against the plan's own acceptance text:** two of the plan's literal grep
patterns produced a measured value different from the plan's authored number, both recorded (not
silently forced) per D-36:
- `grep -c '](macos-lifecycle/02-mdm-migration-psso.md' docs/_glossary-macos.md` measures **9**,
  not the plan's authored **7** — the plan's own repair table names exactly 9 rows targeting that
  file (`:103,111,151,161,171,189,199,207,327`), so 9 is what the table itself implies.
- `git diff -- docs/ | grep '^+' | grep -cE '^\+#{1,6} |^\+\|'` measures **4**, not the plan's
  expected **0** — all 4 are pre-existing table rows in `docs/error-codes/*.md` whose fragment sat
  mid-row; a same-line edit inside an existing `|`-delimited row reproduces a line starting with
  `|` in the unified diff, indistinguishable by this grep from a genuinely new row. The substantive
  no-new-content prohibition is verified instead by `git diff --numstat -- docs/`, which shows
  equal added/removed line counts in every one of the 15 files this plan touched (13 in Task 1 + 11
  in Task 2, with `docs/_glossary-macos.md`/`docs/_glossary-apple-business.md` appearing once
  each with their own totals) — confirming every edit is a same-line replacement, nothing added.

**Not committed:** `git status --porcelain scripts/validation/check-nav-hub-links.mjs` confirmed
empty after the widened run was reverted; the unpatched checker still reports
`0 outbound failure(s), 0 inbound failure(s), 0 total`, exit 0.

**Next-plan readiness:** Plans 04 (Class C target-side `<a id>`) and 05 (Class B source-side
rewrite) can proceed against this measured 49-broken-anchor ground truth. `docs/_glossary-android.md#aosp`
is now cleared (Class D, landed this plan) and no longer among Plans 04/05's remaining work; the
ETG pair remains Plan 05's sole confirmed Class-B item pending its own investigation of the other
broken-anchor pairs in this dry-run's failure list above.

## Plan 04 — D-05 precedence rule, per-pair ledger, four contested-pair adjudication (Task 1)

**Opened:** 2026-08-11 (this session), before any code edit this plan makes. Tree: main worktree
at HEAD `599a996b` (post-Plan-03). Node: v24.17.0. OS: Windows 10 Pro 19045.

### The D-05 precedence rule (fixed order, three branches, two exclusions)

D-05 requires the classes be defined disjointly or a fixed precedence rule be stated, because D-04
routes Class B and Class C to opposite remedies and an order-dependent split silently picks the
remedy (`[MEASURED]` D-05: testing C before B moves nine anchors — `{A:1,B:3,C:48,D:15}` vs
`{A:1,B:12,C:46,D:8}` — `#intune` alone satisfies both tests under an unordered read). The rule
below is evaluated in this fixed order for every (target-file, fragment) pair; the FIRST branch
that holds assigns the class, so every pair belongs to exactly one class and no ordering artifact
can pick the remedy silently.

1. **Class A/B — source-side link rewrite.** An anchor already exists in the target file that is a
   *semantic* match for the link's intent (judged from the link text plus the target heading's own
   text), not merely a prefix/substring match (D-06's `#intune` false-friend rule). If this holds:
   rewrite the source fragment to the existing anchor.
2. **Class C — target-side `<a id>`.** No semantic match exists under rule 1, but the fragment
   names a **content** row that exists in a table in the target file: the row's key cell carries
   the fragment's token, hyphen-exact, on a non-fence-masked line. If this holds: prepend
   `<a id="FRAGMENT-VERBATIM"></a>` to that row's first cell.
3. **Class D — de-anchor.** Neither holds. Drop the `#fragment`, keep the file link.

**Exclusion 1 — a changelog/revision-history row is never a Class-C anchor site.** Those tables
record edit history, not the concept the fragment names; anchoring there would produce a link that
jumps to a provenance table instead of the content it names. The mechanical token locator proposes
exactly this for three pairs, all adjudicated below.

**Exclusion 2 — a row whose first cell already carries an `<a id>` is a rule-1 candidate, not a
rule-2 site.** `docs/android-lifecycle/02-provisioning-methods.md:45` already carries
`<a id="byod-work-profile"></a>` on its BYOD Work Profile row, so the incoming `#byod` fragment is
a Class-B rewrite target (`#byod-work-profile`), not a second anchor stacked on the same row —
confirmed below.

### Four contested pairs — each ruling confirmed against the live file this session

| pair | mechanical locator says | ruling | evidence (confirmed this session) | remedy |
|---|---|---|---|---|
| `docs/_glossary.md#entra` (2 links) | TABLE `:285` (changelog row: "Phase 75 (SSOREF-01/XC-1): added `### Entra ID SSO` term...") | **Class B** | `sed -n '188,193p' docs/_glossary.md` confirms `### Entra ID SSO` heading present at `:190` (GitHub slug `entra-id-sso`) — a real semantic-match heading exists, rule 1 fires before rule 2 ever gets a turn | rewrite source fragment `#entra` → `#entra-id-sso` at `docs/error-codes/03-esp-enrollment.md:32` and `docs/error-codes/05-hybrid-join.md:23`; **deferred to Plan 05** |
| `docs/_glossary-android.md#aosp` (2 links) | TABLE `:331` (changelog row: "Phase 45 AEAOSPFULL-09...") | **Class D** | `grep -n 'AOSP' docs/_glossary-android.md` confirmed this session: every hit is prose (`:57,:63,:222,:245,:247,:249,:277`) or the changelog row (`:331`) — zero `#{1,6}` heading lines mention AOSP | de-anchor; **already landed in Plan 03** (this pair does not appear in this plan's live 49-failure dry-run — confirms Plan 03's remedy is durable) |
| `docs/android-lifecycle/02-provisioning-methods.md#byod` (1 link) | TABLE `:45` (already anchored) | **Class B** | `sed -n '43,47p' docs/android-lifecycle/02-provisioning-methods.md` confirms the row's first cell reads `<a id="byod-work-profile"></a>BYOD Work Profile` at `:45` — exclusion 2 fires: an anchor already exists on this row, so the pair is a rule-1 rewrite target, not a second `<a id>` | rewrite source fragment `#byod` → `#byod-work-profile` at `docs/admin-setup-android/04-byod-work-profile.md:294`; **deferred to Plan 05** |
| `docs/cross-platform/apple-business/01-role-permission-model.md#edit-without-view-dependency-table` (1 link) | TABLE `:395` (changelog row: "Phase 62 plan 62-04: initial authoring...") | **Class B** | `sed -n '340,346p;390,398p'` confirms the real heading `## Edit-without-View Dependency Table (OP-3 Prevention)` exists at `:343` (GitHub slug `edit-without-view-dependency-table-op-3-prevention`) — rule 1 fires; the incoming fragment is simply missing the heading's parenthetical, not a Class-C table-row site | rewrite source at `docs/_glossary-apple-business.md:96` to `#edit-without-view-dependency-table-op-3-prevention`; **deferred to Plan 05** |

The last ruling is the one that moved from an earlier draft's Class-C guess: the mechanical locator
proposed a changelog row, but the section already HAS a heading and the incoming fragment is merely
missing that heading's parenthetical suffix — exactly why the fixed-order rule matters (rule 1 fires
before rule 2 is ever consulted).

### Per-pair remedy ledger — measured live (not transcribed), fully reconciles the 51/67 invariant

**Method:** the same temporary-widening procedure as Plans 03/09 — `checkInboundLinks`'s two
`continue` guards (`check-nav-hub-links.mjs:284` `if (hubSet.has(relPath)) continue;` and `:297`
`if (!hubSet.has(resolvedRel)) continue;`) deleted in the working tree only, `node
scripts/validation/check-nav-hub-links.mjs --verbose` run, full output captured and programmatically
resolved (source file + relative target → absolute target path, grouped by (target-file, fragment)),
then `git checkout -- scripts/validation/check-nav-hub-links.mjs` reverted. `git status --porcelain`
confirmed empty afterward. This measurement is the ground truth for this plan's Task 2/3 edits — not
projected from any earlier plan's narrative figure.

**Headline measurement, live at this plan's start:** 0 broken file targets, **49** broken anchors
across **38** distinct (target-file, fragment) pairs — an exact match to Plan 03's own closing
figure, confirming zero drift between plans.

**Class split of the current 38 live pairs / 49 live links (Class D's 12 pairs/16 links already
resolved by Plan 03 and so absent from this live scan):**

| Class | Pairs | Links | Disposition |
|---|---|---|---|
| C (target-side `<a id>`, this plan) | 30 | 36 | error-code family 28 pairs/34 links (Task 2) + registry-paths 2 pairs/2 links (Task 3) |
| B (source-side rewrite, Plan 05) | 8 | 13 | listed below, deferred |
| **Live total** | **38** | **49** | matches the dry-run summary exactly |

**The 8 live Class-B pairs (deferred to Plan 05), measured this session:**

| pair | links |
|---|---|
| `docs/_glossary.md#enrollment-status-page` | 2 |
| `docs/_glossary.md#entra` | 2 |
| `docs/_glossary.md#self-deploying` | 2 |
| `docs/android-lifecycle/02-provisioning-methods.md#byod` | 1 |
| `docs/android-lifecycle/03-android-version-matrix.md#cope` | 2 |
| `docs/cross-platform/apple-business/01-role-permission-model.md#edit-without-view-dependency-table` | 1 |
| `docs/lifecycle-apv2/00-overview.md#enrollment-time-grouping----the-core-mechanism` (ETG) | 2 |
| `docs/reference/macos-commands.md#intunemacODC` | 1 |
| **Total** | **8 pairs / 13 links** |

`grep -c 'deferred to Plan 05' .planning/phases/143-link-coverage-fence-mask-unification/143-EVIDENCE.md`
returns at least 4 (the three contested-pair rows above plus this section's own summary references).

**The 30 live Class-C pairs (this plan's Task 2/3 scope), measured this session:**

| File | Pairs | Links |
|---|---|---|
| `docs/error-codes/01-mdm-enrollment.md` | 9 | 9 |
| `docs/error-codes/02-tpm-attestation.md` | 8 | 14 (5 double-linked: `0x800705b4`, `0x801C03F3`, `0x801c03ea`, `0x81039001`, `0x81039023`, `0x81039024` each link from both `00-index.md` and `04-pre-provisioning.md`) |
| `docs/error-codes/03-esp-enrollment.md` | 3 | 3 |
| `docs/error-codes/04-pre-provisioning.md` | 1 | 1 |
| `docs/error-codes/05-hybrid-join.md` | 7 | 7 |
| `docs/reference/registry-paths.md` | 2 | 2 |
| **Total** | **30** | **36** |

### Reconciling the full 51-pair / 67-link post-conversion invariant

The plan's own frontmatter/action text states the invariant as: **51 distinct (target-file,
fragment) pairs, 67 links, every pair in exactly one class, class sets summing to Class C 31/38,
Class D 12/16, Class B 8/13.** Adding the tracer's already-resolved 1 pair/2 links (Plan 02, Task 2
— `docs/error-codes/01-mdm-enrollment.md#0x80180014`, landed before this plan and so absent from
the live scan above) to this session's live-measured 30 pairs/36 links gives Class C = 31 pairs/38
links exactly. Class D's 12 pairs/16 links (Plan 03, absent from the live scan since already
resolved) plus this session's measured Class C (31) and Class B (8) sum to 12+31+8 = **51 pairs**,
and 16+38+13 = **67 links** — the invariant holds, reconciled against a live measurement rather than
transcribed from the plan.

**Pre-conversion defect census, recorded with its own distinct scope (not superseding the
post-conversion figures above):** `[MEASURED, Plan 02]` the pre-D-38-conversion corpus carried
**77 pairs / 132 links** broken (the full defect census against the pre-conversion, `{#id}`-override
Pandoc-model corpus). `[MEASURED, Plan 09]` the D-38 all-87 `{#id}`-to-`<a id>` conversion closed
**26 pairs / 65 links** of that census target-side (zero new prose, zero regressions — the AFTER
pair set was a strict subset of the BEFORE pair set). 77 − 26 = 51 pairs; 132 − 65 = 67 links —
the post-conversion invariant this plan's ledger reconciles above descends directly from this
defect census and its D-38 closure, not a separately-derived figure.

### Verification

`node scripts/validation/carve-gate.mjs` — this task edits `.planning/` only, outside
`IN_SCOPE_PREFIXES`, so the gate is unaffected: exit 0, off-list=0 (unchanged from Plan 03's
closing state).

## Plan 04 — Task 2/3 dry-run checkpoint (measured after the corpus edits land)
