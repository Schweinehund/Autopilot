# Phase 152: Integration, Registry & Navigation-Last Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-26
**Phase:** 152-integration-registry-navigation-last-close
**Areas discussed:** Successor-validator ownership, Commit shape and ordering, Ops-index Firmware
H2 and the stale hub row, `docs/index.md` wiring scope — plus three queued areas (registry
identifiers and Doc Type, out-of-INT-04 link obligations, publish-bundle proof depth)

---

## Method

The owner selected all four presented gray areas and directed a grill pass to raise additional
questions in each, followed by an adversarial evaluation to recommend the best option per question
with reasoning.

A draft of 40 questions with recommended answers was written first, then reviewed by four parallel
Finder agents (Areas A+B, Areas C+D, Areas E+F+G, and a cross-cutting agent hunting seams and
silences), an Adversary scored on disproving them, and a Referee scored on accuracy.

| Stage | Result |
|---|---|
| Finder findings, merged and deduplicated | 84 (21 critical, 38 medium, 25 low) |
| Disproved by the Adversary | 22 |
| Referee overturns of those disproofs | 9 |
| **Confirmed real** | **57** (13 critical, 32 medium, 12 low) |
| False positives | 24 |
| Decisions the draft never asked about | 13 |

Three Adversary disproofs were flagged for the Referee before it began, and it overturned all
three. The most consequential: the Adversary dismissed the live-corpus-walk hazard using a
case-sensitive grep against a pattern the code compiles case-insensitively — the identical error
it had convicted a Finder of two findings earlier.

---

## Successor-validator ownership

| Option | Description | Selected |
|--------|-------------|----------|
| Needle-spec to Phase 153 | Phase 152 authors zero validators; hands a fully pre-specified spec to Phase 153, recorded on both surfaces. Precedent unanimous across three milestones. Requires ratifying a split reading of the Success Criterion. | ✓ |
| Standalone additive validator, here | Author a non-leaf validator now. Real precedent the draft missed: two standalone validators were authored in content phases, both outside the close phase's atom. Satisfies the criterion literally with no ratification. | |
| Author the leaf validator here | Breaks the pattern in every milestone checked and splits the close phase's arithmetic-generated chain range. | |

**User's choice:** Needle-spec to Phase 153.
**Notes:** The draft had presented this as a binary and would have hidden the third option
entirely. CONTEXT D-58 records it as declined-with-reason rather than overlooked, because the
ratification burden the first option carries exists only if the third is unavailable — and it was
available. The Referee marked this the single case where the draft's recommendation survived but
its reasoning did not.

---

## Commit shape and ordering

Not put to the owner as a question — the evidence settled it. Recorded here because the draft's
answer changed substantially under review.

| Draft answer | Corrected answer |
|---|---|
| Two content commits, file lists fixed at 4 and 2 | Two content commits, Commit A fixed at 4, **Commit B derived** — the four inbound links land in it |
| 2 plans / 2 waves | **4 plans / 4 waves**, strictly sequential |
| Canary bump at "three sites each" | **Four sites each**, and append a provenance line rather than editing it |
| "The bundle proof writes only gitignored output" | False — the run rewrites a tracked file |

**Notes:** The missed canary site is the module header of the file that already sat red for an
entire milestone, roughly five hundred lines outside the range the draft cited, and no self-test
catches a stale comment.

---

## Ops-index Firmware H2 and the stale hub row

| Option | Description | Selected |
|--------|-------------|----------|
| Leave the stale description | The standing requirement text says this phase grows the region "without correcting the description", and a prior phase logged the cell as an accepted, unowned inconsistency. | ✓ |
| Fix it — all four sites | Overrides two written rulings; four sites, two distinct literals, and two adjacent rows that are genuinely still four-platform. | |
| Fix only the row we edit | Narrowest override; leaves the identical falsehood in the master hub and both lead-ins. | |

**User's choice:** Leave it stale.
**Notes:** The draft had recommended fixing it and had quoted only the trailing trigger clause of
the deferral, omitting the sentence that scopes this phase to adding rows. The heading literal also
changed under review — from `## Firmware and BIOS` to `## Firmware and BIOS Governance`, because
the draft's ground for dropping "Governance" was refuted by a sibling heading named in its own
list — and the placement reversed from domain-adjacency to append, on the only precedent.

---

## `docs/index.md` wiring scope

| Option | Description | Selected |
|--------|-------------|----------|
| One row — Linux only | Linux is the one platform with a shipped guide and zero presence anywhere in the master hub's Operations block. | ✓ |
| None — strict criterion reading | The new sub-heading is the criterion's "Operations entry"; the Patch table stays as it is. | |
| All four new patch guides | Abandons the curation convention every sibling sub-table follows. | |
| Linux plus a macOS/iOS rebalance | Only option leaving the table internally consistent; largest scope addition. | |

**User's choice:** One row — Linux only.
**Notes:** The draft's stated reason was withdrawn. It claimed this "closes the only representation
gap"; the table shows Overview, Windows and Android, so macOS and iOS are equally unrepresented.
The correct ground is narrower and survives. Two further answers in this area reversed outright:
the quick-nav edit is one line rather than two (the direct precedent amended the banner blockquote
and deliberately left the bullet alone), and the matrix gets no master-hub row (four of eight
reference matrices are absent from it, including the OEM sibling).

---

## Out-of-INT-04 link obligations

| Option | Description | Selected |
|--------|-------------|----------|
| Reciprocal firmware link | Added to a prior phase's summary by the orchestrator after its verifier found it in no phase's inheritance; a review finding made deferral conditional on recording all four touch points. | ✓ |
| App-lifecycle return links | Deferred by Phase 148 on the explicit basis that inbound links are Phase 152's. | ✓ |
| The apv2 WinGet link | Logged as an accepted gap with the inbound wiring handed here by name. | ✓ |
| The apv1 hardware-hash link | Handed forward by name because the requirement's enumeration does not reach it. | ✓ |

**User's choice:** All four.
**Notes:** The draft contained only the last of these. The other three were dropped entirely —
each deferred by its own phase *specifically because Phase 152 owns it*. The cross-cutting Finder
found all three by enumerating every hand-forward across seven predecessor phases, which is the
check the draft never ran. Phase 148 also handed forward a *class* — "all inbound nav-hub wiring" —
not the two files the requirement enumerates.

---

## Publish-bundle proof depth

Not put to the owner — the evidence settled it, and the draft was wrong twice.

| Draft answer | Corrected answer |
|---|---|
| Run without a version flag | **Must pass a version flag** — the default is a prior milestone's version and the zip rename is unconditional, so the draft's instruction would have overwritten a shipped 3.7 MB artifact |
| The pre-flight probe is already discharged | **Not discharged** — the cited measurement covered conversion and the docx guard only, never the bundle, the coverage and parity checks, or the manifest, which is precisely what the research flag names |

**Notes:** The manifest leg also surfaced an observable the phase would otherwise have shipped
blind: nine manifest rows will carry a blank Status, because the nine operations documents carry
no status key by design. Accepted and recorded so review does not read it as a defect.

---

## Registry identifiers, Doc Type and Titles

Largely as drafted and confirmed by execution — the identifier assignment, the verbatim-H1 rule
(a 225/225 existing invariant, not a new convention), and a proven collision-free regeneration.
Two things changed: the Doc Type answer survived but needed the classification rule cited rather
than asserted, and the "record the asymmetry" note about the unregistered legacy documents was
rewritten, because as drafted it told the verifier not to look at a measured consequence — the
new documents route readers to nine documents the published bundle does not contain.

---

## Claude's Discretion

- Exact wording of the ten new hub row descriptions, subject to the prose constraint on the live
  corpus walk.
- Placement of each inbound link within its host file's sections.
- Whether the WUfB rings guide receives the companion reciprocal link, decided at plan time
  against its pins and recorded either way.
- Task decomposition inside each of the four waves.

---

## Deferred Ideas

- The stale hub descriptions — four sites, owner-ruled out of this phase.
- Guide-level back-links to Recipe #5 — already ruled by Phase 151; recipes 03 and 04 carry
  line-count pins.
- The Operations quick-nav bullet's stale enumeration — missing a domain since 2026-05-22 by
  ratified precedent, so this phase leaves it alone rather than half-fixing it.
- Registering the twenty legacy operations documents — out of scope; the measured reachability
  consequence is recorded.
- A reference-index row for the firmware OEM matrix — disposition recorded as declined.
- Re-stamping the two past-due files this phase touches — part of the corpus-wide past-due
  population that no validator tests against the current date.
- The third WinGet site, per Phase 148's own ruling.
