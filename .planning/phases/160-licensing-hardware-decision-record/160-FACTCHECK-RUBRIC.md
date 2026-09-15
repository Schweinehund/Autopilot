# 160-02 Fact-Check Rubric

You are judging whether a documentation edit preserves meaning and is supported by the source
bytes provided in the packet below. Judge every sentence and every table-cell clause against the
source extracts in the packet. Do not use outside knowledge of Microsoft licensing beyond what the
packet's source extracts state. Never judge a hunk with any rationale for why it was written a
particular way — you were given none, and that is deliberate.

## The five classes

1. **Sourced sentence** — PASS iff a sentence on the fetched page (in the packet's source extracts)
   supports it, the draft's modal is not stronger than the source's, and the link target named in
   the sentence is the fetched URL.
2. **`**[PILOT]**` sentence** — PASS iff traceable to a cited pre-edit RE-237 line or to a checkpoint
   record. No new pilot claim may be introduced beyond what is already attributed to the pilot
   elsewhere in the packet.
3. **Reasoning sentence** — PASS iff it carries an explicit hedge (for example "not pilot-tested,
   stated as reasoning from the licensing structure, not as an observation") and uses no `must` /
   `will`.
4. **UNVERIFIED sentence** — PASS iff the sentence itself says so (carries the word UNVERIFIED, or
   an equivalent explicit "nobody has confirmed" / "stays unconfirmed" construction).
5. **Table-cell fragment** — a `|`-delimited cell that is not a single sentence. Split it at each
   `;` and each sentence boundary into clauses and classify every clause under classes 1-4.
   **AGGREGATION RULE: the cell PASSES only if every clause passes.** A cell mixing classes must
   carry each clause's own marker inside the cell text — `**[PILOT]**` on the pilot clause, explicit
   "nobody has confirmed" / UNVERIFIED wording on the unverified clause. A cell FAILS if any clause
   is unmarked and would read as sourced when it is not.

## Fail-on-any-promotion rule

**FAIL any verdict where a class is promoted to a stronger one during the rewrite** — for example a
hedge ("should", "not pilot-tested, stated as reasoning") flattened into an assertion, or an
UNVERIFIED claim promoted to a stated fact. On this corpus, a hedge promoted to a mandate is the
measured single largest defect class from prior fact-check and style-verification passes (26 of 45
recorded semantic defects on a prior corpus pass were this class, outnumbering inversions). Report
any such promotion as INVERTED or STRENGTHENED regardless of whether the underlying fact is
otherwise correct.

## Verdict vocabulary

For each sentence or clause, report one of:
- **PRESERVED** — the class-appropriate PASS criterion above is met.
- **STRENGTHENED** — a hedge or reasoning marker was flattened into a stronger assertion or a
  weaker modal was promoted to a stronger one (e.g. "should" → "must", "may" → "will").
- **INVERTED** — the sentence now asserts something the source does not support, or the opposite of
  what the source says.
- **WEAKENED** — the sentence understates what the source supports (a factual claim turned into an
  unwarranted hedge).
- **FAIL** (class 4/5 specific) — the UNVERIFIED marker was dropped, or a table cell has an unmarked
  clause that would read as sourced.

Report your verdicts as a numbered list, one entry per sentence or clause, in the order the packet
presents them. For each entry give: a short quote (first ~8 words) identifying the sentence/clause,
the class (1-5), the verdict, and a one-sentence reason citing which packet source extract (or lack
thereof) supports your verdict.
