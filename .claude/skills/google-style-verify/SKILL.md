---
name: google-style-verify
description: Use after a google-style formatting pass, before committing, to prove the rewrite did not change meaning, references, or citations. Trigger on "verify the style pass", "did the formatting change meaning", "check the rewrite", "/google-style-verify", or whenever documentation prose has been reformatted in bulk and the diff needs to be trusted. Pairs with the google-style skill.
argument-hint: "<git rev the pass started from>"
allowed-tools:
  - Bash
  - Read
  - Grep
  - Glob
  - Agent
---

# Verify a style pass preserved meaning

`google-style` rewrites prose. This proves the rewrite is still true.

## Why this exists

Over a completed 9-batch pass on this corpus, **30 semantic defects shipped or nearly
shipped, and every one passed the full structural gate** — C17 (234 files, 13 assertions),
check-nav-hub-links, the apex validator (101 checks), a link/anchor differ, and an exact
validator-pin differ. Structural validators check shape. They cannot see a sentence that
now asserts the opposite of what it meant.

One of the 30 was still live four batches after the audit log recorded it as reverted.
Assume this pass has defects the gate will call green.

## The one rule that matters

**Never judge a hunk in the context that produced it.** All 30 defects were found by a
reader who did not author the edit. A judge holding the formatter's rationale — "this
`should` was a weak modal, converting it is correct" — inherits exactly the blind spot
the record documents. The judge step below **must** run as a fresh Agent with no rewrite
rationale in context.

## Protocol

Run from the corpus root. `BASE` is the rev the pass started from.

### 0. Idempotency — free, run it first

Re-run the formatter over its own output. A correct rule set is idempotent and reports
**0 edits** the second time. Non-zero means a rule is chasing its own tail and the pass is
not finished. This needs no baseline, no LLM, and no corpus knowledge.

```bash
python scripts/docs-style/sweep3.py <ROOT> scripts/docs-style/_CONTENT-PINS.txt \
  --subs scripts/docs-style/<the-tsv-you-just-applied>.tsv   # expect: 0 TOTAL edits
```

### 1. The checks that already exist — do not reimplement these

```bash
python scripts/docs-style/verify2.py                    # link + anchor health, before/after
python scripts/docs-style/pins2.py > /tmp/pins-now.txt \
  && grep -vxF -f /tmp/pins-now.txt scripts/docs-style/_CONTENT-PINS.txt   # any output = broken pin
```
Plus the repo gate: `c17-eee-contract.mjs`, `check-nav-hub-links.mjs`, the apex
`check-phase-NNN.mjs`. Run the apex **without** `CHECK_PHASE_NESTED=1` or 99 of 101
checks skip and green is meaningless.

### 2. Deterministic meaning checks

```bash
python scripts/docs-style/verify-meaning.py BASE
```

Covers the seven classes with a textual signature, none of which any other tool sees:

| Finding | The defect it catches |
|---|---|
| `frontmatter` | `audience: admin` → `administrator`. Controlled vocabulary, 124 files, never prose. |
| `quotation` | A verbatim vendor sentence restyled. Falsifying a citation is worse than the style violation it fixes. Mechanical-only changes are suppressed. |
| `htmlcomment` | ABAUDIT-NN comments carry validator waivers; restyling one can break a suppression. |
| `label-drift` | One of N verbatim copies of a UI label stopped matching. This is how `Create a local admin account` stayed false for four batches. |
| `split-verb` | One modal governing two verbs, only the first converted. Reads fine in a one-line diff, ungrammatical in context. |
| `word-order` | A directional word inserted **inside** a multi-word proper name. Three instances on record. |
| `prose-crossref` | A by-name reference to a heading recased. **No link checker can see this** — it is not a link. |

Exit 1 on any undispositioned finding.

### 3. The judge — the class with no textual signature

`verify-meaning.py` also emits a **judge worklist**: every hunk where a modal
(`should`/`will`/`would`/`could`/`must`) was removed, flagged `high` when it was a
`should`. This class is *provably* not greppable — `The device appears with Join type
"Registered"` is structurally identical to a correct declarative sentence. All 5 recorded
inversions came from a removed modal; measured recall of this trigger on them is **5/5**.

```bash
python scripts/docs-style/verify-meaning.py BASE --json > /tmp/worklist.json
```

Spawn a **fresh Agent** per chunk with no rewrite rationale, given only before/after plus
surrounding lines. The decision procedure, from the record:

> Bare present tense is **not** the safe default — it inverts meaning when the sentence
> stated an expectation. If a nearby conditional handles the **other** outcome, it was an
> expectation: the correct rewrite is `Confirm X shows Y` or `must`, never a bare
> assertion. A reader who meets an assertion stops verifying.

Real example — the fix, not the theory:

```
before:  The device should appear with Join type "Registered"
WRONG:   The device appears with Join type "Registered"      <- reader stops checking
right:   Confirm the device appears with Join type "Registered"
```

Judge each hunk **with its surrounding lines**, never the line alone. "The diff summary
always looks clean — the inversions only appear in the surrounding lines."

### 4. Disposition, then re-run

A finding is either fixed or dispositioned. Add the id and a reason to
`scripts/docs-style/_DISPOSITIONS.tsv`. Dispositions are keyed to the **evidence text**,
so one goes stale the moment that line changes again — a documented keep must never
silence a future edit to the same line.

Disposition only what you have actually adjudicated. A residual that is correct-by-ruling
is normal here; a residual you did not read is not.

## What this does not do

- **It checks preservation, not truth.** It proves the text still says what it said. It
  does not verify the original was correct, or that a cited URL says what the doc claims.
  A formatter introduces no new claims, so preservation is the right closed question.
- **It cannot prove absence.** An inversion produced by a *non-modal* rule reaches the
  judge only if a deterministic check also flagged the hunk. That gap is real.
- **It does not replace reading the diff.** Measured hit rate: a human re-reading the diff
  in context caught 30 of 30. Nothing else has a measured rate at all.

## Calibration

On the completed 9-batch pass (281 files, 6,166 changed lines) this reports **40
findings** and a **653-hunk judge worklist, 164 high-risk** — versus `check.py`'s 9,363
candidates on the same accepted corpus. If findings ever reach the hundreds, a rule is
over-firing: fix the rule, do not bulk-disposition.

Verify the tool itself with `python scripts/docs-style/verify-meaning.py --self-test`
(10 assertions built from the real defect record, including two negatives that must stay
silent).
