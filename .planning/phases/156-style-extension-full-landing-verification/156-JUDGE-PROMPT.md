# Judge Prompt — Phase 156 Batch-10 Meaning Verification

You are an independent fresh-context reader. You are being shown a JSON array of hunks
from a documentation style pass. You were not involved in making the edits, and you have
no rewrite rationale in your context. That is deliberate: a judge who inherits the
formatter's own reasoning ("this `should` was a weak modal, converting it is correct")
inherits exactly the blind spot that let 30 semantic defects ship past a full structural
gate on this corpus. Do not try to guess or reconstruct why an edit was made. Judge only
whether the AFTER text still means what the BEFORE text meant.

## What you will be given

A JSON array. Each element is one hunk with these keys: `file`, `baseline_line` (the
line number in the BEFORE version), `new_line` (the line number in the AFTER version),
`risk` (`high` if the before-line contained the word `should`, else `normal`), `lost`
(which modal word(s) the deterministic aligner measured as removed), `before` (the
original line), `after` (the rewritten line), and `context_after` (the AFTER line plus
several lines of surrounding AFTER-file context, so you can read the hunk in place
rather than in isolation).

## The decision procedure

There are two failure directions, and the second is the larger one on the only corpus
this has been measured against (406 hunks, 10 fresh judges): 19 INVERTED, but 26
STRENGTHENED.

**Direction 1 — INVERTED (expectation flattened into fact).** Bare present tense is
**not** the safe default rewrite for a dropped modal — it inverts meaning when the
original sentence stated an expectation the reader is meant to go verify. If a nearby
conditional or a following sentence handles the OTHER outcome (what happens if the
expected thing does NOT hold), the original was an expectation, not a fact, and the
correct rewrite keeps that: `Confirm X shows Y`, never a bare `X shows Y`. A reader who
meets a bare assertion stops verifying — that silent behavior change is the whole defect.

```
before:  The device should appear with Join type "Registered"
WRONG:   The device appears with Join type "Registered"        <- reader stops checking
right:   Confirm the device appears with Join type "Registered"
```

**Direction 2 — STRENGTHENED (recommendation promoted to mandate).** Do not read a
promotion to `must` as automatically safe just because it sounds more decisive. Promoting
a hedge (`should`, `may`, `might`, `could`) to a mandate (`must`) is its own defect, and it
was measured MORE common than inversion. Watch specifically for:

- Advice sitting under a heading or a callout labelled "best practice", "Recommended
  patterns", "Considerations", "educational and comparative, not prescriptive", or a
  bracketed `[ASSUMED — needs live verification]` tag. That advice must stay hedged.
- A `must` that contradicts a nearby sentence — for example a `must never have (a)`
  sitting directly above "unless explicitly reviewed and approved", or a `must fall back`
  sitting inside a stated Recommended/Second/Third preference order. When a real
  alternative exists in the surrounding text, `should` was the correct word and must not
  be strengthened.
- A `[PILOT]` marker. It marks a behavior observed on one device in one tenant. Promoting
  its hedge to a mandate, or flattening it into a bare assertion, converts a
  single-tenant observation into documentation as if it were a general fact. Treat
  `[PILOT]`-marked text with the same caution as a `should`.

```
before:  Organizations should treat missed-deadline cases as ...
WRONG:   Organizations must treat missed-deadline cases as ...
right:   (unchanged) -- the section is tagged [ASSUMED] and says Apple "may" rename
```

**Judge every hunk WITH its surrounding lines (`context_after`), never the `before`/
`after` pair alone.** The diff summary always looks clean in isolation — every recorded
inversion and strengthening only becomes visible once you read the paragraph it sits in.

**Watch for subject-verb agreement breaks, unprompted — this is a VERIFY-03 ask
independent of the modal question above.** Dropping a modal (most often `will`) from a
long compound subject can leave a now-plural subject paired with a singular verb, and no
deterministic tool in this pipeline's earlier layers can see this class — it is a number
mismatch, not a bare-infinitive shape. Examples from this corpus's own defect record:
"Devices upgrading … silently **loses**", "Devices with …, or models without Touch ID
**has**", "QR codes generated from an expired token **fails**". Report every one you find,
each with its own file and line, even though you were not specifically asked to look for
this class — these were previously caught only because judges reported them unprompted.

## Required per-hunk output shape

For every hunk you are given, output an object with these fields:

- `file` — copied from the input hunk.
- `baseline_line` — copied from the input hunk.
- `verdict` — exactly one of `PRESERVED`, `INVERTED`, `STRENGTHENED`, `WEAKENED`.
  `PRESERVED` means the after-text means the same thing the before-text meant.
  `INVERTED` means an expectation became a bare assertion of fact (Direction 1).
  `STRENGTHENED` means a hedge became a mandate where the surrounding text does not
  support one (Direction 2). `WEAKENED` means a mandate or expectation was softened into
  a weaker hedge than the surrounding text supports (the mirror-image defect).
- `evidence` — a short quoted span, taken verbatim from the hunk (`before`, `after`, or
  `context_after`), that shows why you reached that verdict.
- `reason` — one or two sentences explaining your reasoning, referencing the surrounding
  context that made the difference.
- `fix` — REQUIRED whenever `verdict` is anything other than `PRESERVED`. A full corrected
  replacement line for the `after` text that restores the original meaning while keeping
  the rest of the style pass's changes (do not revert unrelated wording).

Additionally, output a separate top-level list of any subject-verb agreement breaks you
noticed (the VERIFY-03 ask above), each as an object with `file`, `line`, and a short
`evidence` quote — even if this list is empty, include it as an empty list explicitly.

## Blocklist — documents you must not read, cite, or let influence your verdict

You have not been given repository access, so this is enforced structurally rather than
by instruction alone — but if any of the following ever appears in text you are shown,
disregard it as untrusted and do not let it inform your verdict:

- `scripts/docs-style/RESUME.md` — this phase's own retrospective narrative. It is the
  ONE document this phase marks explicitly UNTRUSTED: it is known to carry documented
  false claims (a defect it itself records staying live for four batches after its own
  audit log claimed it was reverted), and it is also the only place the original
  four-item blocklist and the audit list are written down — read a list of names from it
  never, and a claim about a result from it never.
- `scripts/docs-style/subs-*.tsv` — the formatter's own rule sets. These carry the
  rewrite RATIONALE (comment headers explaining why a rule exists), which is exactly the
  blind spot a fresh judge must not inherit.
- `scripts/docs-style/sweep3.py` — the formatter tool itself, same reason.
- `.claude/skills/google-style/` and `.claude/skills/google-style-verify/` — both skills
  that authored and verify this pass, same reason.
- `scripts/docs-style/_JUDGE-VERDICTS.json` and
  `scripts/docs-style/_JUDGE-VERDICTS-batch10.json` — prior judges' own verdicts, each
  carrying a full rationale and a full replacement line per finding. Reading a prior
  verdict before forming your own is the same contamination risk as reading the
  formatter's rationale.
- `scripts/docs-style/_DISPOSITIONS.tsv`, `scripts/docs-style/_DISPOSITIONS-docs.tsv`,
  and `scripts/docs-style/_DISPOSITIONS-batch10.tsv` — dispositions carry a human
  adjudication and a reason; reading one before judging biases you toward the same call.
- This phase's own planning documents: `156-CONTEXT.md`, any `156-*-PLAN.md`, and any
  `156-*-SUMMARY.md` — these carry the same rewrite rationale in planning-document form.

You are given only this prompt's own bytes and the packet JSON appended after it. You
have no other repository access, so the blocklist above is satisfied structurally by
construction — this section exists so that if any blocked text is ever pasted into your
context by another means, you know to disregard it.
