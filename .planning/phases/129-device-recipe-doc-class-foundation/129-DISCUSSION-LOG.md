# Phase 129: Device Recipe Doc-Class Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-17
**Phase:** 129-Device Recipe Doc-Class Foundation
**Areas discussed:** Decision-point block format; Branch-encoding convention; Template skeleton; Spec placement & enforcement; Worked-example count; recipes/ index doc; STD-05 vs template split; Summary end-state element

**Method:** Per user request, every pick in every area was resolved via `/adversarial-review` (Finder/Adversary/Referee, Opus agents; 4 parallel Finders per round, 2 rounds). Round 1: Finder issues 41, Adversary disproved 2 LOW, all 4 recommendations SURVIVED and were Referee-upheld. Round 2: Adversary disproved 1 LOW + 1 MED, all 4 areas survived; the Referee OVERTURNED the Area-D Finder (RECOMMENDED → REQUIRED-review-enforced). User ratified all 8 referee verdicts, selecting the recommended option each time.

---

## Round 1

## Decision-point block format (CLASS-01 dominant)

| Option | Description | Selected |
|--------|-------------|----------|
| Composite 3-case | `> **Ask the admin:**` one-sentence lead-in + case-based table (branching / enumerable / free-value, no table for free-value); blank-line-before-table mandated | ✓ |
| Pure decision table | Table-only for every decision point | |
| Blockquote only | `> **Ask the admin:**` prose only | |

**User's choice:** Composite 3-case (Recommended)
**Notes:** Blockquote-only failed CRITICALLY — C17 #12's 200-char cap (markup counted) cannot carry the kiosk-vs-SharedPC decision (~228 chars worked count). Pure table degenerates for free-value prompts and drops the consequence-callout idiom. Blank-line rule verified as real GFM lazy-continuation behavior, not over-caution. Disproved: A4 (C17 #11's 25-row trigger unreachable for recipes).

## Branch-encoding convention

| Option | Description | Selected |
|--------|-------------|----------|
| C-plus: thin floor + RECOMMENDED idiom | 3 normative rules + PSSO sibling-section idiom RECOMMENDED; no forced rejoin | ✓ |
| Fully normative with carve-outs | Idiom itself MUST-level | |
| Author-free | Branch presentation left to Phase 130/131 authors | |

**User's choice:** C-plus (Recommended)
**Notes:** Author-free failed CRITICALLY (defeats Phase 129 SC3). Referee ruled the idiom stays RECOMMENDED — C17 has no heading assertions below Summary, so normative force buys nothing; precision comes from the named PSSO exemplar + boolean carve-out. Adversary disproved A-3 (the standard DOES enshrine forward-normativity: RCA doc_type, needle-spec, STD-04) and corrected the finder's rationale: anti-normative findings attacked avoidable drafting choices; the real basis is no-C17-teeth.

## Template skeleton

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid, ledger CUT | admin-template base + post-Summary Scope blockquote + Unsupported/Anti-Feature section + realistic worked example; Decision Record ledger cut | ✓ |
| Hybrid + optional back-ref ledger | Same + optional link-only Decision Record index | |
| Pure inherit admin-template | No new sections | |

**User's choice:** Hybrid, ledger CUT (Recommended)
**Notes:** From-scratch skeleton (an original Finder option) failed CRITICALLY — leading sections break C17 #4 on the template itself (TEMPLATE-SENTINEL skips only #9/#12). Pure inherit lacks the anti-feature container AVD-03/IPAD-02 hard-require. Referee cut the ledger (duplication/drift, no requirement mandates it); outcome statement folded into Summary prose.

## Spec placement & enforcement

| Option | Description | Selected |
|--------|-------------|----------|
| STD-05 + no C17 change | New STD-05 policy section mirroring STD-04 + slim D-02 ruling row; prose/template enforcement | ✓ |
| Fold into D-02 area | Everything in the D-02 edge-case rulings bullets | |
| Add C17 assertion #14 | Mechanical decision-block validation | |

**User's choice:** STD-05 + no C17 change (Recommended)
**Notes:** #14 failed CRITICALLY — c17-eee-contract.mjs is ONE shared live script subprocess-spawned by the v1.15/16/17 milestone audits; any assertion change retroactively mutates predecessor audits (HARN-12 byte-unchanged violation). Adversary corrected one clause: the broken invariant is HARN-12 (predecessor replay), not HARN-13 (3-axis internal match).

---

## Round 2

## Worked-example count

| Option | Description | Selected |
|--------|-------------|----------|
| Three examples | Branching → enumerable → free-value in one delete-marked HTML-comment region | ✓ |
| One branching example only | Adversary's cheaper variant | |
| Two (branching + enumerable) | Drops the free-value closer | |

**User's choice:** Three examples (Recommended)
**Notes:** Referee: free-value's one-line closer is the only "no table needed" demonstration — cutting it is false economy. Forced fixes: swap the Finder's DeletionPolicy enumerable example (self-collides with AVD-02's real Phase-130 fields) for a synthetic one; `###`/bold only inside the region (HTML comments aren't inCodeFence-masked; `##` would break #4). Adversary disproved I2-E (enumerable example is a distinct 3-column shape, non-marginal). Joint ruling: 3-in-template + STD-05 fenced sample is NOT over-delivery (spec-sample vs instantiated-scaffold tiers, D-05 precedent).

## recipes/ index doc (00-overview.md)

| Option | Description | Selected |
|--------|-------------|----------|
| No index + source fix | docs/index.md recipes section is sole discovery surface; fix ARCHITECTURE.md:61 at source | ✓ |
| Registered index in Phase 132 | RE-224 + publish .docx | |
| No index, skip the source fix | CONTEXT.md note only | |

**User's choice:** No index + source fix (Recommended)
**Notes:** Genuine grounding discovery — ARCHITECTURE.md:61's "every doc-class directory has an 00-* index" is FALSE (end-user-guides/ has none at N=2; device-operations/, operations/ + subdirs, apple-business have UNREGISTERED 00-* files). Phase-129 placement rejected outright (scope creep + navigation-last violation, both CRITICAL). Publishability argument for a registered index neutralized: docs/index.md (RE-219) already carries the recipes section into the indexed set. Recorded Phase-132+ guidance: unregistered 00-overview only, if ever.

## STD-05 vs template content split

| Option | Description | Selected |
|--------|-------------|----------|
| Full spec + fenced sample | STD-05 full spec + ONE compact FENCED branching mini-example + carve-out sentence; template carries instantiated copies | ✓ |
| Unfenced real sample | Real table + short blockquote as the sample | |
| Rules only in STD-05 | All examples in template | |

**User's choice:** Full spec + fenced sample (Recommended)
**Notes:** Rules-only failed CRITICALLY (SC3 precision — novel column headers reconstructed from prose; forward-reference to a not-yet-written template; normative shape living solely in a sentinel scaffold). Fenced beat the Adversary's unfenced variant: length-immune on the enrolled non-sentinel standard, and "fence hypocrisy" is void — D-05 already specs unfenced live content via fenced samples (house style). Version-History row added, last_verified NOT bumped (STD-04 precedent).

## Summary end-state element

| Option | Description | Selected |
|--------|-------------|----------|
| REQUIRED, review-enforced | D-08-style normative sentence in STD-05 + template Summary opens with the end-state sentence | ✓ |
| RECOMMENDED only | Finder's original pick: template placeholder + one-line recommended note | |
| Leave free | No recipe-specific Summary element | |

**User's choice:** REQUIRED, review-enforced (Recommended)
**Notes:** The one Referee OVERTURN of a Finder recommendation. Finder discovered the v1.15 runbook-banner precedent was never lifted into the standard (template-only), arguing RECOMMENDED. Adversary disproved the "unenforceable REQUIRED = enforcement theater" leg (D-08 and supersedence are already REQUIRED-but-review-enforced — the standard's normal mode). Referee's pivot: runbooks chose template-only by necessity (no policy section existed); recipes uniquely have STD-05 as a policy home, and post-ledger-cut the end-state sentence is the only surface stating what the recipe produces (class-defining). C17 #5 fires on templates → placeholder ≥30 words.

---

## Claude's Discretion

- Exact STD-05 prose/subsection naming, D-02 ruling-row sentence, Version-History row text (within locked constraints).
- Synthetic enumerable example subject (non-colliding with Phase 130/131 fields); branching example subjects (compact in STD-05 vs instantiated in template, different granularity).

## Deferred Ideas

- Unregistered `docs/recipes/00-overview.md` landing page (Phase 132+ at earliest, only if class grows; zero registry rows).
- Optional back-reference-only Decision Record index (link-only, no restated values).
- C17 assertion #14 (mechanical decision-block validation) — future harness-phase item only if recipe drift is observed.
