# Phase 158: Final Corpus Verification & Publish Bundle - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-09-06 → 2026-09-07
**Phase:** 158-final-corpus-verification-publish-bundle
**Areas discussed:** A VERIFY-06 audit shape · B SC#3 sweep · C SC#4 drift accounting · D bundle proof & ordering ·
F push/branch · G threat model · H Phase 159 hand-off · I 157's own prose & unconfirmable claims · J remediation
manifest · K audit JSON + runner · L gate baseline + verify2 sibling · M judge prompt & packets · N style-disposition
record · O bundle assertion script · P amendment wording · Q commit sequence & gates

**Method (per the owner's standing instruction):** each round = `/grill-me` draft with measured answers →
`/adversarial-review` (4–5 parallel Finders → Adversary → Referee) → owner ratification of the Referee's
per-recommendation table. Totals: 447 raw findings, 417 rulings, 359 real; 22 draft recommendations reversed or
falsified. The scratchpad drafts, Finder/Adversary/Referee reports and four Referee summaries were the working
record; CONTEXT.md is the canonical output.

---

## Round 1 — areas A–D

| Option | Description | Selected |
|--------|-------------|----------|
| Audit: JSON + runner + run log, RESUME's 30 rows audited | Referee's instrument; RESUME rulings are testable at HEAD | ✓ |
| Audit: ratify, exclude RESUME with corrected grounds | keep the exclusion, re-ground it | |
| Audit: manual pass only | committed command list + output, no runner | |
| Sweep: corpus-wide 31/15 + hand `using` | no new asymmetry; STYLE-05 tight canon | ✓ |
| Sweep: apply the 21 in the 59 | original draft; leaves AOSP 09/11 spaced | |
| Sweep: apply only the 5 on 157-authored lines | smallest diff; keeps the deferred class | |
| verify2 gap: sibling detector | 156 D-08 shape (later REVERSED in round 3 to a worktree run) | ✓ (superseded) |
| verify2 gap: explain only | one drift row | |
| verify2 gap: patch verify2.py | recomputes the 454 baseline | |
| Amendments: ratify all five in both documents | SC#2 `-S`, SC#2 retroactivity, SC#4 reproduce, STYLE-06 562, HYG-06 DFCI | ✓ |
| Amendments: SC#2/SC#4 only | leave 562/DFCI as notes | |
| Amendments: REQUIREMENTS only | | |
| Riders: no VH row, no re-stamp on swept files | 157's own treatment | ✓ |

**User's choice:** all four recommended options; "Explore more gray areas".

## Round 2 — areas F–I

| Option | Description | Selected |
|--------|-------------|----------|
| History: record + recommend squash, decide at 159 | zero frozen-SHA invalidation measured | ✓ |
| History: decide now — squash | | |
| History: decide now — rewrite before the binding audit | | |
| EEE-SOP:660/662: fix in 158; the `cp` is the owner's action | | ✓ |
| EEE-SOP: fix + let Claude run the `cp` | | |
| EEE-SOP: record only, defer to 159 | | |
| Glossary claim (9a68aa1a's replacement): edit both in 158 | later narrowed by round 3 to a cross-reference; hedges untouched | ✓ (amended) |
| Cite URL, keep the negative | | |
| Record as unconfirmable | | |
| Secure-phase: ratify all (severity + STRIDE, AR-155-01 accept, deliberate auditor spawn, full tail) | | ✓ |
| Secure-phase: allow the ASVS-L1 short-circuit | | |

**User's choice:** all four recommended options; "Explore more gray areas".

## Round 3 — areas J–M

| Option | Description | Selected |
|--------|-------------|----------|
| Sibling/drift: ratify both reversals (worktree run of the checker; no gate-drift.mjs) | overrides round 1's sibling | ✓ |
| Keep the sibling, drop gate-drift.mjs | | |
| Keep both as drafted | | |
| J/K/M package: ratify all (R3 cross-ref, :662, VH yes/no, R6 date-stamp, git grep -o / normalised counts / ls-tree / no -S / additive ops / RESUME ~12+~18, judge root docs / reword-never-reinstate / --chunks 1 / prompt SHA-256) | | ✓ |
| Ratify but audit all 30 RESUME rows literally | | |
| Ratify but keep R3 as a fetch + control | | |

**User's choice:** both recommended options; "Explore more gray areas".

## Round 4 — areas N–Q

| Option | Description | Selected |
|--------|-------------|----------|
| Ratify all: no new scripts; two disposition artifacts, no anchors, NO-CANDIDATES; five EDITs; record after edits; harness-owned flips in the last plan; 13 constraints; 13 amendment fixes | | ✓ |
| Ratify but keep ≤15 discretionary EDITs | | |
| Ratify but keep verify-bundle.mjs | | |
| Done: I'm ready for context | | ✓ |
| Done: explore more gray areas | | |

**Notes:** the owner ratified every Referee recommendation in all four rounds without amendment, including the
five that reversed the discussion draft (B3 sweep scope, D5 ordering, I3 the EEE-SOP falsehood, L2/L3 build-nothing,
N3/O1/P3/Q build-nothing and harness-owned flips).

## Claude's Discretion

Plan count, wave shape, commit granularity (under D-69's constraints); runner internals; amendment-block wording
(under D-66's constraints); the `drift[]` row set beyond the named rows; the judge dispatch command shape; whether
the discovery audit is a task or a checkpoint.

## Deferred Ideas

See CONTEXT.md `<deferred>` — the history mechanism (159), `.gitattributes` EOL policy (159), the wrapped-guard
hazard, the user-level skill copies (owner action), verify2's anchor blind spot, the exclusion record's missing
producers, the nine blank status keys, `scripts/pipeline/README.md`, the ~18 non-assertable RESUME rulings, further
style EDITs on 157's prose, and the full Phase 157 carry-forward list.
