# Phase 154: STYLE Landing — Merge the Verified Google-Style Pass - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-31
**Phase:** 154-style-landing-merge-the-verified-google-style-pass
**Areas discussed:** Merge mechanics, The un-restored sample rewrites, The drifted-hunk style gap, Baseline & landing shape

**Method.** The owner selected all four areas and directed `/grill-me` depth plus
`/adversarial-review` adjudication of every question and pick. Four parallel Finders (merge
mechanics, sample rewrites, sweep scope + baseline, cross-cutting) → Adversary → Referee.
94 raw findings, 73 after deduplication, **72 confirmed / 1 disproved**, 9 Adversary rulings
overturned by the Referee, 5 findings raised by the Referee itself. Both repositories were verified
untouched at every stage.

---

## Merge mechanics

| Option | Description | Selected |
|--------|-------------|----------|
| A — `git apply --3way` of a path-rewritten patch | Draft's pick. 277/280 clean in the original probe. | |
| B — Wholesale copy, hand-merge the 13 overlap files | | |
| C — Add the scratch repo as a remote, fetch, graft, `merge -X subtree` | Rejected in the draft in one clause. | |
| **A′ — `git fetch` the scratch repo, then `git apply --3way --directory=docs`** | Not in the draft's option set. Raised by the cross-cutting Finder, tested by the Adversary, confirmed by the Referee. | ✓ |

**Outcome:** the draft's pick was **overturned**. It lands on option A's machinery driven by the one
step option C contained and the draft dismissed without separating *fetching* from *merging*.

**Notes:** As written the draft procedure lands **zero** files — `git apply --3way` is atomic and the
android refusal rolls all 277 clean applies back. The draft's stated safety property ("any file whose
ancestor is not byte-identical is refused loudly") does not exist: refusal tracks blob *absence* only,
and 11 of the 13 overlap files merged with no signal at all. Two rejected variants that also fix the
abort — `--exclude` and a per-file loop — were verified working but are superseded by the fetch.
`format-patch`/`am -3`, `merge-file` and `subtree add` were each evaluated and rejected with reasons.

---

## The un-restored sample rewrites

| Option | Description | Selected |
|--------|-------------|----------|
| A — Hand-rebase the 3 real hunks onto the live file | Draft's pick. Implementable, but three edits nobody can `git log -S`. | |
| B — Land the whole scratch file | Imports 36 lines of unverified prose. | |
| C — Land nothing; defer to Phase 156 | | |
| **D — Let the 3-way merge do it** | Not in the draft's option set. Dissolved the question. | ✓ |

**Outcome:** **dissolved.** The draft's intended *outcome* was right; its *mechanism* is superseded.
With base `c97d322`, theirs `e71f862` and ours live `docs/`, the sample rewrite is the ours→base delta,
so 3-way keeps ours wherever the sides do not collide. Verified: `1 file changed, 6 insertions, 2
deletions`; the heading, the strengthened modal and the 15 tight dashes all correctly excluded.

**Notes:** Two of the draft's arguments for rejecting option B were **refuted and dropped**. The tight
em dashes are the canon's *output*, not a violation — `sweep3.py:89` substitutes spaced → tight, and
`do_em = False` at `:212` means the rule never runs at all. And nothing links a document's H1 to its
registry Title; `build-filename-map.mjs` takes the title from the registry row and the cited line is a
hardcoded self-test fixture. A fourth option — correct the scratch baseline and regenerate — was
tested by a Finder and found not to work. The exhaustive divergence sweep also established that
`6010dd5` carries the identical two divergences, which the draft never said.

---

## The drifted-hunk style gap

| Option | Description | Selected |
|--------|-------------|----------|
| A — Phase 154 styles the mechanical slice | | ✓ (mechanical) |
| B — Amend Phase 156's STYLE-02 set | | ✓ (judgment) |
| C — Accept as-is | | |

**Outcome:** **stands with corrected reasoning.** Every supporting number was wrong.

**Notes:** The draft's projection was measured on a tree still carrying raw conflict markers, so both
sides of every conflict were counted. Re-measured on a correctly merged tree the residual is 12 edits
across 8 files, of which 5 files belong to Phase 156 — leaving Phase 154 with **one** sweep edit plus
two applications that happen inside conflict resolutions. The judgment slice is 2 candidates, not 7.
The draft's token census (7 `admin` / 1 `via` / 1 `config`) is not reproducible in any convention; the
true figures are 4 / 1 / 0 plus 5 uncounted capital `Admin`. Separately, the draft rescoped SC#2 in
prose only — precisely the option it had rejected forty lines earlier — and never named **VERIFY-01**,
the requirement most directly narrowed, which would have flipped to Validated at the close gate against
an unamended criterion.

---

## Baseline & landing shape

| Option | Description | Selected |
|--------|-------------|----------|
| Live tree vs `c17-sandbox` | | ✓ live tree, on a branch |
| Artifact vs SUMMARY prose vs both | | ✓ both, artifact load-bearing |
| One commit / four by decision class / nine by original batch | | ✓ four, resolved first |
| STYLE-03/04/05/06 as verification vs work | | ✓ split per requirement |

**Outcome:** picks **stand with corrected reasoning**, except Q4.4 which was **overturned**.

**Notes:** The live-tree pick survives, but both stated reasons were false — the corpus is mixed
87 CRLF / 207 LF, the index is uniformly LF, and a fresh CRLF clone stages the apply at hunk
granularity. The real constraint is the two `Stop` hooks: a pathspec-scoped commit taken while
conflicts are unresolved commits the markers. The commit split survives, but its justification
(`git log -S` findability) was a rationalization — the pickaxe returns a commit regardless of size —
and its sequence was mechanically impossible. Q4.4 discharged four requirements in one optionless
paragraph with three of four mechanisms defective: `--no-headings` is a `check.py` flag that
`sweep3.py` silently discards; the STYLE-05 work item would have reverted ~4,900 canonical edits; and
STYLE-03 was marked discharged while `subs-admin-batch9.tsv` still rewrites HP's `Sure Admin` product
name 20 times in one file, five of them inside `**Source:**` citation titles. The draft also credited
the wrong commit for the `KEEP_LINE` work (`0332a61c`, not `9b3007c1`) and undercounted its alternates
as 6 rather than 7 — a false ledger entry that Phase 158's VERIFY-06 audit would have inherited.

Two SC#4 gate components — the link differ and the pin differ — were absent from the draft's baseline
entirely, and one Finder wrongly reported that neither tool exists. Both do; neither is runnable in the
main-repo geometry unedited, and `pins2.py` hardcodes the *scratch* repo path.

---

## Claude's Discretion

- JSON key names and nesting inside `154-GATE-BASELINE.json`.
- Commit message wording for C1–C4, provided C1's body carries both scratch SHAs.
- Whether the `verify2.py` two-line edit ships separately or rides with the baseline capture.

## Deferred Ideas

Recorded in CONTEXT.md's `<deferred>` section with owning phases: `.gitattributes` EOL normalization
(159); full `verify2.py` / `pins2.py` geometry rework (156); `EEE-SOP-standard.md:578`/`:649` stale
citations (157); `-G` pickaxe discipline (158); archival-path resolution for the baseline artifact
(156, 158); the third runbook-H1 copy in the pipeline test fixtures (157); the dirty `c17-sandbox`
(157 or discard); running the fixed `subs-admin-batch9.tsv` over the HP file (156).
