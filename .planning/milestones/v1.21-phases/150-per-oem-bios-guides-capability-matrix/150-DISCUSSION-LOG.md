# Phase 150: Per-OEM BIOS Guides & Capability Matrix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-08-25
**Phase:** 150-per-oem-bios-guides-capability-matrix
**Areas discussed:** Recovery gaps (U-1/U-2/U-3), Inverted-prerequisite pair and editing 149's overview,
Matrix shape and depth, Guide depth cap and the updates seam

---

## Method

The owner selected all four gray areas and directed that `/grill-me` raise the questions in depth and
`/adversarial-review` evaluate each recommended answer.

1. **Grill draft** — 45 questions across the four areas, each with a recommended answer and an evidence
   label, grounded in eleven measurements taken against the live repo.
2. **Five parallel Finders** — one per area plus a cross-cutting agent auditing requirement coverage,
   inter-area contradictions and structural omissions. **149 raw findings.**
3. **Adversary** — ruled on every finding with a double-penalty for wrong disproofs, plus a mandated
   double-count netting pass. **34 disproved.**
4. **Referee** — adjudicated the disproofs, ran a "what did everyone miss" pass, verified the netting
   arithmetic independently, and produced the recommended answer per question.

**Final: 149 raw → 120 net distinct → 34 disproved → 86 surviving, plus 6 new from the Referee = 92
(20 CRITICAL · 50 MEDIUM · 22 LOW).**

---

## Area 1 — Recovery gaps (U-1 / U-2 / U-3)

Twelve questions. The draft's shape survived; its sourcing plan did not.

| Draft position | Outcome |
|---|---|
| A bounded, graded fetch list covering the three recovery gaps | **Reversed in scope** — the list must be phase-wide (D-43). Confining it to the three gaps left every other quoted string in the phase with no fetch obligation, against an absolute inherited bar. |
| Two distinct sources per gap | **Corrected** — the draft's U-1 second source *was* U-2's entire list, and it named the certificate tool as the home for a lost-password answer. U-3's source had already been fetched (D-49). |
| Documented silence stated explicitly, three-part shape | **Upheld, with part (a) made per-gap** — the draft let a U-2 answer serve as the "what the vendor does document" slot for a U-1 reader (D-53). |
| Escalate with "model + serial" | **Reversed** — that is Dell's requirement and nothing sources it for Lenovo or HP (D-54). |
| No system-board sentence, not even hedged | **Upheld**, and narrowed — the bar does not reach Lenovo's own first-party pointer to System Deployment Boot Mode / Absolute Remote SVP (D-55). |
| The three gaps become the matrix's Key Gaps | **Corrected** — in all four sibling matrices that H2 lists what a platform *cannot do*, so filing a documentation silence there converts silence into incapacity by layout. Split into two labeled enumerations (D-14). |
| U-6 load-bearing, U-8 not | **Upheld on both**, but U-6 needed a closure rule it did not have — its only named source is a live Intune tenant no agent can open (D-50). |

**Disproved by the Adversary and upheld by the Referee:** that Q1.3 and Q1.5 contradict each other; that
Dell's Recovery section was left unscoped; that U-2 is internally contradictory in the research; that the
sequencing of who runs the fetches was unruled.

---

## Area 2 — Inverted-prerequisite pair and editing 149's overview

Ten questions. The weakest area in the draft.

| Draft position | Outcome |
|---|---|
| The pair lands as "a named row" in the matrix | **Not constructible** — matrix rows are the three OEMs, so a two-state pair cannot be one row. Became a 2×2 sub-table, password-state as rows (D-31). |
| Its home is the matrix, not the overview, because the overview is a Phase 149 file | **Rationale deleted** — that rule is invented, and the draft's own answers put the overview in this phase's edit set anyway (D-33). |
| One sentence in each of the Dell and Lenovo guides | **Insufficient alone** — SC#2 grades on the pair *reading as a decision point*; two halves in two files produce no such reading. BIOS-06's own closing formulation now has a named home (D-32). |
| Three surgical edits at `00-overview.md:129-131` | **Coordinates wrong and count wrong** — the sentence spans 128-130, line 131 is blank, and the real count is four to six sites (D-37). |
| `last_verified` reset per 149 D-69 | **Wrong authority** — D-69 is a midnight tiebreaker; D-30 is the rule, and it already closed the question the draft re-opened (D-39). |
| Editing the 149 file is safe | **True but unproven** — the proof (`grep -rn "firmware-bios" scripts/` = 0, and `V-54-29`'s scope) is now recorded (D-42). |

**Owner ruling — the quote collision.** Neither the draft nor any Finder had noticed that
`00-overview.md:52` and `:66` already ship two of this phase's load-bearing quotes. The Referee surfaced
it as the sharpest finding in the set.

| Option | Description | Selected |
|--------|-------------|----------|
| Quote in guide, overview becomes a pointer | HP guide carries both quotes with two separate evidence lines; the overview reduces to the custody claim plus a link | ✓ |
| Quote in both files, accept the duplication | Leave 149's file byte-unchanged; the same evidence line ships twice | |
| Quote in guide, leave overview alone | The defect ships unrecorded | |

**Notes:** the selected option is the only one that satisfies SC#3's *"quoted against"* while leaving one
authoritative copy. Phase 150 owns the overview edit under 149 D-65's falsification clause.

---

## Area 3 — Matrix shape and depth

Thirteen questions. Capability-first with OEM rows survived; three measured conclusions did not.

| Draft position | Outcome |
|---|---|
| Decline the C1-5 "OS features gated by this setting" column — it is a DFCI artifact | **Reversed on a false premise.** `PITFALLS.md:284-292` shows C1-5's chains are virtualization→VBS→Hotpatch, Secure Boot→attestation, TPM→Autopilot attestation — none DFCI-specific, all three configured by Dell/HP/Lenovo tooling. The decline also silently dropped C1-5's prescribed cross-links (D-12). |
| Decline `## Source Attribution` — 1-of-26, not a convention | **Reversed.** That one is the chosen precedent and the corpus's only OEM matrix, and its own Version History records the H2 as the solution to the literal-cell rule the draft simultaneously imported (D-06). |
| No prose-summary requirement exists | **Reversed.** 41 `> **Table summary:**` blockquotes across 6 of 7 matrices, on ~5-row tables. A house convention the draft missed by reading only the validator (D-07). |
| C17 #11 fires above 25 data rows | **Off by one** — the header row is counted (D-08). |
| Long quotes cannot ship in the matrix — a structural constraint | **Policy upheld, reason void.** Assertion 12 matches only `^>` at column 0; inline prose, footnotes and split blockquotes all escape it. And there is no file-level blockquote budget (D-09, D-10). |
| `doc_id: RE-226`, `status: Approved`, row deferred | **Upheld**, strengthened by a precedent nobody had cited: `EEE-SOP-standard.md` is Approved and enrolled with no registry row today (D-20). |
| Matrix frontmatter | **Two of seven fields decided.** `platform` sits under a hard failure with no fallback; the rest are now fixed (D-17, D-18). |

---

## Area 4 — Guide depth cap and the updates seam

Seventeen questions. Contained the phase's largest coverage holes.

| Draft position | Outcome |
|---|---|
| Five capability H2s | **Amended to six** — see the owner ruling below. |
| Write nothing about U-7, in any form | **Reversed** — `patch-management/06:768-771` already ships the conflict statement generically; link to it (D-67). |
| Guide → guide → guide → matrix → overview, five commits | **Reversed** — overview-last fixes only one direction; guide↔guide, guide→matrix and guide→glossary anchors all dangle. 149 D-28 measured that symmetry and chose one commit (D-80). |
| ThinkCentre statements ship "as quotes or claims" | **Corrected** — both are `[RELAYED]`; quoting requires re-verification (D-44). |
| DCDM is out of scope | **Corrected** — the research requires the judgement be made explicitly on the record, and DCDM's deployment path runs through a portal this phase already documents (D-70). |
| Glossary touched once at the end | **Two of three D-63 obligations were missing**, and the general date rule would have reversed an owner ruling made the same day (D-86, D-87). |
| Terms `Sure Admin`, `Think BIOS Config`, `HP Connect`, `DCECMI` | **Upheld**, with placement under `## Hardware` per 149's precedent (D-85). |
| Both Dell RBAC paths as an asymmetry | **Upheld untouched** — the strongest answer in the draft (D-73). |

**Coverage holes the cross-cutting Finder found:** BIOS-07 (the clause-heaviest requirement in the
phase), BIOS-09, the anchor-id contract for all four files, and the hand-forward contracts to Phases 152
and 153 — each carrying essentially zero decisions across 45 questions. Now D-23 through D-30, D-78, and
the Phase 152/153 hand-forwards.

**Referee's own additions, in neither report:** Lenovo's two-tool / two-auth-model shape has one section
slot each (D-76); Dell's per-device agent is what makes BIOS-07's "not a Win32 agent" informative (D-24);
the `C:\ProgramData\Dell` ACL trap has no home in a five-section shape; the third-party-tool disposition
is two different cases, not one (D-55); HP's license floor has an existing corpus artifact (D-26).

---

## Owner rulings

### Guide shape

| Option | Description | Selected |
|--------|-------------|----------|
| Six H2s, all three guides | Add `## Offboarding and Loss of the Management Plane`; amends SC#1 and BIOS-05 on the record | ✓ |
| Five H2s, Recovery absorbs offboarding | No amendment; Recovery becomes two jobs and the Dell ACL trap stays homeless | |
| Five H2s, offboarding rides in Prerequisites | No amendment; a 30-day countdown is a live incident, not a prerequisite | |

**Notes:** grew scope. The amendment is filed in `REQUIREMENTS.md` per D-02, following 149 D-05's
precedent for an SC-level premise amendment.

### SC#3's fleet-first clause

| Option | Description | Selected |
|--------|-------------|----------|
| Ship both honestly, record the mismatch | Each vendor's path with its own sourced content; the SC-versus-research gap filed as an accepted inconsistency | ✓ |
| Amend SC#3 in ROADMAP | Cleanest on the record; costs a ROADMAP edit mid-milestone | |
| Try harder to source a Dell ordering first | Adds a fetch task that may not close | |

### The four reversals

| Option | Description | Selected |
|--------|-------------|----------|
| Adopt all four | C1-5 column, two-commit order, U-7 links to `06`, table-summary blockquotes | ✓ |
| Adopt all but the C1-5 column | Would decline an inherited hand-forward on a premise now known false | |
| Show the reasoning per item first | | |

---

## Claude's Discretion

- Section-internal ordering within the six H2s, and the sub-headings inside Lenovo's two-tool Delivery
  and Authentication sections.
- The matrix `## Summary` wording, subject to C17's 30-word floor.
- Ordering of the two labeled `## Key Gaps Summary` enumerations.
- The `owner` frontmatter value, matched to the sibling matrices.
- Wave and plan decomposition — the planner's, as in 149. The remediation round is planned in per
  149 D-28.

---

## Deferred Ideas

- A per-OEM firmware/BIOS Device Recipe — its own phase; Recipe #5 covers driver/firmware cadence, not
  BIOS custody.
- Retrofitting the 20 legacy operations documents into C17 enrollment — out of scope per Phase 152 SC#3.
- A `docs/reference/00-index.md` row for the matrix — 4 of 7 matrices have none and nothing fails.
  Handed to Phase 152 as a disposition to record either way.
- HP Connect procedural walkthroughs — the only first-party document is version 1.2.0 from 2022.
- Per-setting compliance attestation for Dell/HP/Lenovo fleets — no path satisfies it today.
