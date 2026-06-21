# Phase 75: Glossary, Lifecycle Foundation & Stub Correction - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-20
**Phase:** 75-glossary-lifecycle-foundation-stub-correction
**Areas discussed:** Glossary entry depth & cross-refs, Stub correction scope, Forward-link to unwritten guide 07, Lifecycle stage-note format

**Method:** User selected all four gray areas and directed that each be resolved via `/adversarial-review` (standing preference). A three-agent scored review ran: Finder (40+ objections, score 232) → Adversary (verified every codebase claim against the live repo, disproved 1 false mechanism, +5) → Referee (final verdicts + winner per area). One follow-up decision (the missing "Entra ID SSO" term) was escalated to the user.

---

## Glossary entry depth & cross-refs

| Option | Description | Selected |
|--------|-------------|----------|
| 1A — Brief | 1-2 sentence entries, only mandated reciprocal see-also | |
| 1B — Rich (MAM-WE pattern) | Full definition + scope-boundary note + Windows-equiv blockquote + multiple see-also | |
| 1C — Medium (modified) | 3-5 sentence entries + TPM/Entra-SSO see-also; Windows-equiv blockquote for Platform SSO only | ✓ |

**Winner:** 1C, modified.
**Notes:** Adversarial review found 1A re-seeds the DS-5 #3 three-method conflation (too terse) and 1B forces both a pointer to the non-existent guide 07 and a lossy Secure Enclave↔TPM equivalence (a new factual error). 1C's only critical objection (TPM-anchor-shift) was disproved — markdown anchors are heading-slug based, so editing existing entry bodies is anchor-safe. Windows-equivalent blockquote retained for Platform SSO only.

### Sub-decision: Update `## Alphabetical Index`

| Option | Description | Selected |
|--------|-------------|----------|
| YES | Add 3 terms with deterministically-computed slugs | ✓ |
| NO | Leave index unchanged | |

**Winner:** YES. Skipping it leaves new terms undiscoverable via the file's own documented nav entry point; slug-mismatch risk is mitigable by computing GitHub slugs deterministically.

---

## Stub correction scope

| Option | Description | Selected |
|--------|-------------|----------|
| 2A — Minimal | Fix only the 2 inaccurate bullets | |
| 2B — Full rewrite | Replace whole `## Extensible SSO` body | |
| 2C — Targeted (modified) | Two distinct bullets, fix both macOS-version instances, replace fallback, touch no subheading | ✓ |

**Winner:** 2C, modified.
**Notes:** 2B eliminated — a full rewrite changes the count of repeated `#### In Intune admin center` subheadings, shifting their position-numbered duplicate anchors (PITFALL-6 violation, confirmed). 2A fails SC2's second half and leaves the line-163 `(macOS 14+)` instance unfixed. Review verified TWO `(macOS 14+)` instances (lines 163 and 166) — both must be corrected.

---

## Forward-link to unwritten guide 07

| Option | Description | Selected |
|--------|-------------|----------|
| 3A — Active link now + allowlist | Live markdown link, allowlist the broken link in the harness | |
| 3B — Deferred (code-span now, link in P76) | Filename as inline code in P75; convert to live link in Phase 76 | ✓ |
| 3C — Softened interim fallback | Point at an existing valid doc now, repoint in P76 | |

**Winner:** 3B.
**Notes:** 3A eliminated — verified `v1.8-milestone-audit.mjs:670-676` hard-codes `allowlist.length !== 15` (6 transient_external + 9 template_placeholder, only those categories). A 16th entry breaks the harness, and an intra-repo forward-link fits neither category. 3C points readers at a misleading interim target. 3B keeps the harness green (code-span text is outside C13's link-check scope — Referee ruled the "path checker trips on it" objection a false positive) and satisfies SC2 in substance. Phase 76 must convert the code-span to a live link in the same commit that creates guide 07.

---

## Lifecycle stage-note format

| Option | Description | Selected |
|--------|-------------|----------|
| 4A — Blockquote in "Watch Out For" (modified) | Append to existing `### Watch Out For` of Stages 4/6/7, matching local formatting | ✓ |
| 4B — Inline sentence in "What Happens" | Append after the numbered steps | |
| 4C — New labeled mini-callout at stage end | A `> **Platform SSO note:**` callout per stage | |

**Winner:** 4A, modified.
**Notes:** 4C eliminated — adds a 5th structural element contradicting the file's own documented "four subsections" invariant (line 23) and risks displacing stage-ending `---` separators. 4B orphans a sentence after numbered steps and is awkward in the table-dense Stage 4. 4A is purely additive within an existing subsection (anchor-safe, append-only). Stage 6 wording must respect the userless-enrollment conditional branch.

---

## Escalated decision — missing "Entra ID SSO" term (XC-1)

| Option | Description | Selected |
|--------|-------------|----------|
| Create the term | Add a short `### Entra ID SSO` entry to `_glossary.md` | ✓ |
| Retarget to existing terms only | Skip creation; point SSO see-also at existing terms; flag SC1 as inaccurate | |
| Flag for roadmap fix first | Pause and correct SC1 wording before locking context | |

**User's choice:** Create the term (Referee's recommendation).
**Notes:** Adversarial review verified that "Entra ID SSO" has zero occurrences anywhere in `docs/`, making SC1's named see-also target unbuildable as written. User confirmed creating one short anchor-safe term to resolve it cleanly. Slightly expands SSOREF-01's literal scope.

---

## Claude's Discretion

- Exact prose wording of glossary definitions, corrected stub bullets, and stage notes (within the locked factual constraints).
- Whether each new fact-bearing line gets `last_verified` / `review_by` front matter per the v1.9 90-day PSSO review cadence — apply where the researcher flags rapidly-changing facts.

## Deferred Ideas

- Convert the guide-07 code-span to a live markdown link — Phase 76, in the commit that creates the guide.
- Capability-matrix Authentication section + 5-platform comparison cells (SSOREF-02) — Phase 79.
- Nav-hub integration (SSOREF-04) — Phase 81.
- REQUIREMENTS.md wording cleanup noting that "Entra ID SSO" is now established by Phase 75.
