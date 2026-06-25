# Phase 91: Glossary + Capability Matrix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-24
**Phase:** 91-glossary-capability-matrix
**Areas discussed:** Glossary structure, Deadline entry depth, Matrix row placement, 4-platform + atomicity, Anchor scope
**Method:** User selected all four gray areas and requested `/adversarial-review` (Finder/Adversary/Referee, three Opus agents) to recommend the best option per area with reasoning — consistent with how Phases 89/90 were decided.

**Adversarial-review tally:** Finder raised 38 flaws (116 pts). Adversary disproved 0 (played conservative under the −2× wrong-disprove penalty; verified the three load-bearing facts — guide-02 hard-coded anchors, double-hyphen slug rule, tenant-migration wipe path — all TRUE). Referee confirmed 35 real, ruled 3 FALSE POSITIVES (index-churn, literal-match, link-density), and discovered the dead-anchor scope gap.

---

## Area 1 — Glossary structure

| Option | Description | Selected |
|--------|-------------|----------|
| 1A | 3 terms under existing `## Device Management`; Kandji→Iru folded inside MDM Migration body; no new H2 | |
| 1B | New `## Migration` H2 grouping all migration terms incl. standalone `### Kandji / Iru` | |
| 1C (modified) | Terms under existing `## Device Management`; standalone Kandji/Iru entry with forced single-hyphen `#kandji-iru` anchor | ✓ |

**Winner:** 1C (modified). **Confidence:** HIGH.
**Disqualifiers:** 1A folds Kandji→Iru into prose ⇒ no `#kandji-iru` anchor ⇒ guide 02 line 547 dead link (CRITICAL). 1B/vanilla-1C use `### Kandji / Iru` ⇒ slugifies to `kandji--iru` (double hyphen, proven by in-repo `#cobo--cope--wpco`) ⇒ CRITICAL mismatch. 1B's `## Migration` H2 also breaks sibling symmetry (MEDIUM).
**Sub-question (Windows-equivalent callout):** OMIT positive callout; use a NEGATIVE callout ("No direct equivalent — Windows tenant migration is wipe + re-import, not in-place"). `_glossary.md#tenant-migration` verified wipe-only.

## Area 2 — Deadline entry depth

| Option | Description | Selected |
|--------|-------------|----------|
| 2A | Concise definition + link-not-copy to guide 02 / L2 #30 | ✓ |
| 2B | Rich inline non-dismissible full-screen lockout description | |

**Winner:** 2A. **Confidence:** HIGH.
**Disqualifiers:** 2B = third drift-prone copy of the 1–90-day/lockout prose + strips the sources' MEDIUM-confidence hedges (2× MEDIUM). 2A's two flaws (literal-match, link-density) ruled FALSE POSITIVES.

## Area 3 — Matrix row placement & granularity

| Option | Description | Selected |
|--------|-------------|----------|
| 3A | Single row under existing `## Enrollment`, no new H2, Windows cell `n/a` | ✓ |
| 3B | New `## Migration` H2 with 1–3 rows | |
| 3C | Single row, multi-line macOS cell | |

**Winner:** 3A. **Confidence:** HIGH.
**Disqualifiers:** 3B = sibling-asymmetry (no `## Migration` in matrix family) + bigger blob-pin blast radius (2× MEDIUM). 3C = multi-line pipe cell needs `<br>`/HTML, zero precedent (MEDIUM).
**Sub-question (Windows column):** `n/a` — a non-`n/a` cell would invent a Windows capability (no in-place analog).

## Area 4 — 4-platform cells + commit atomicity

| Option | Description | Selected |
|--------|-------------|----------|
| 4A | Extend existing Enrollment rows + ONE combined atomic commit | |
| 4B | New dedicated row + TWO per-file commits | |
| 4C | New dedicated row + ONE combined atomic commit; non-macOS cells `n/a` | ✓ |

**Winner:** 4C. **Confidence:** HIGH.
**Disqualifiers:** 4B = CRITICAL — two per-file commits guarantee a red HEAD (pinned file edited without its V-63-08/09 pin in the same commit). 4A reuses existing rows ⇒ conflates the migration verdict into unrelated Re-enrollment/Factory-reset rows (LOW).
**Sub-question (anchor ordering):** link target = `#enrollment` (stable existing anchor); no dangling-anchor risk since Area 3 added no new H2.

## Area 5 — Anchor scope (scope decision, raised by Referee)

| Option | Description | Selected |
|--------|-------------|----------|
| Mint all 9 | Add glossary entries for all 9 currently-dead inbound anchors guide 02 links to | ✓ |
| REF-01 literal (3–4 only) | Stay strictly within REF-01; leave 6 guide-02 links dead, log as backlog | |
| Mint all 9 + flag P90 defect | Mint all 9 AND record guide 02's forward dead-links as a formal Phase-90 escaped defect | |

**User's choice:** Mint all 9 (recommended).
**Notes:** Verified `git`-level that 9 of guide 02's 10 inbound glossary anchors are dead (only `#platform-sso` resolves). REF-01 named only 3 of the 9. Minting all 9 satisfies the phase goal ("glossary captures the new MDM-migration terminology") and closes the gap Phase 90 opened — not a new capability. User declined to additionally flag it as a formal Phase-90 defect.

---

## Claude's Discretion

- Exact entry wording/body prose and which existing H2 each of the 6 added terms reads most naturally under (within the no-new-`## Migration`-H2 rule).
- Exact matrix/4-platform cell phrasing and the dedicated row label, within the coverage-fact and `n/a`-Windows rules.
- Sibling consistency: frontmatter freshness stamps, entry anatomy, Version History footer rows.

## Deferred Ideas

- Process note: guide 02 (Phase 90) shipped a 10-link Glossary Quick Reference before the target entries existed → 9 forward dead-links. Closed by minting all 9 in Phase 91; worth a one-line mention at milestone audit/learnings if the pattern recurs.
- Renderer `{#id}` support: if the executor confirms the markdown pipeline does NOT honor explicit `{#id}` anchors, capture as a repo-wide constraint affecting future divergent-slug headings.
