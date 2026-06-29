# Phase 98: Guide 07 Comprehensive Pass - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-29
**Phase:** 98-guide-07-comprehensive-pass
**Areas discussed:** TS section architecture, Diagnostic-tree format, A1/A2 label adoption, Per-section freshness

---

All four areas were selected by the user for discussion, with an explicit instruction to resolve each via `/adversarial-review` (Finder → Adversary → Referee) and return a recommended option with reasoning. This matches the user's established pattern (Phases 96 & 97 both resolved all gray areas adversarially). The review ran single-Finder mode (small surface: one doc + corpus), no Synthesizer (decision review, not code).

**Scoring trail:** Finder surfaced 138 pts of flaws across all options (2 CRITICAL). Adversary disproved 10 flaws (+49 claimed), deliberately NOT disproving the GA1-C "consolidated" CRITICAL (would have cost -20). Referee ruled all 10 Adversary disproves as correct (1 downgraded rather than cleared) and declared winners.

---

## GA1 — Troubleshooting section architecture

| Option | Description | Selected |
|--------|-------------|----------|
| A (refined) | Typo → existing Configuration-Caused-Failures section (row + deep-dive); A2 reqs → augment existing Advanced "ADE Path Prerequisites" table; tree → own subsection | ✓ |
| B | Extend the failures table with the typo row; nest diagnostic tree + A2 reqs as subsections under that H2 | |
| C | Distribute: typo→table, A2 reqs→Step 2/Advanced, diagnostic tree→own section | |

**User's choice:** Adversarial-review recommendation — Option A, refined.
**Notes:** Referee adopted A but refined it to *augment* the existing Advanced table rather than build a new consolidated section (avoids the duplicate-A2-table drift flaw). C disqualified by a surviving CRITICAL: it violates TS-02's "consolidated … cross-linked from guide 01" (no single anchor for guide 01 to target). B confirmed as a category error (requirements + diagnostic tree are not "failures") and destroys the table's quick-ref scannability. The "SC#2 requires the deep-dive to physically live in the failures section" flaw was ruled a FALSE POSITIVE — SC#2 binds the *section* to document the failure, satisfied by a schema-conformant row + adjacent deep-dive.

---

## GA2 — Diagnostic-tree format

| Option | Description | Selected |
|--------|-------------|----------|
| A | Mermaid flowchart (guide 01 idiom) | |
| B | Numbered "if X → check Y" bisection ladder (nested ordered list) | ✓ |
| C | Decision table (guide 07's dominant idiom) | |

**User's choice:** Adversarial-review recommendation — Option B.
**Notes:** Mermaid (A) breaks guide 07's zero-mermaid idiom and has real render fragility (labels contain `≠`, square brackets, backticked code-spans). A flat table (C) flattens the tree — it loses the ordered-elimination semantics and the terminal A1-bisect branch (only the "third-table monotony" sub-complaint was a false positive). The ladder renders universally and matches the linear `→` shape with the bisect as a sub-bullet.

---

## GA3 — A1/A2 label adoption

| Option | Description | Selected |
|--------|-------------|----------|
| A | Lightweight deferential cross-reference to guide 01's canonical A1/A2; use labels where TS content needs them | ✓ |
| B | Use A1/A2 only where strictly needed, without defining/pointing | |
| C | Full retrofit of A1/A2 throughout guide 07 | |

**User's choice:** Adversarial-review recommendation — Option A.
**Notes:** The GA3-C "full retrofit breaks the `#advanced...` anchor → Phase-100 sweep red" CRITICAL was DOWNGRADED to a LOW: breakage is avoidable — labels go in body prose with headings/slugs left byte-identical (Phase 96 D-04 slug discipline). C still rejected as highest-churn-regression for no benefit. B rejected — imports undefined A1/A2 jargon into a directly-landed-on guide. The line-19-vs-line-309 "contradiction" was ruled a FALSE POSITIVE (intentional chosen-deployment-vs-documented-default framing, reconciled at lines 46/91) — so A needs only an equivalence pointer, no reconciliation edit.

---

## GA4 — Per-section freshness stamping

| Option | Description | Selected |
|--------|-------------|----------|
| A | Give the new Troubleshooting section its own per-section provenance stamp (mirror Advanced precedent) | |
| B | File-level frontmatter + version-history row only (Phase 96/97 convention) | ✓ |
| C | Hybrid — file-level bump + per-section stamp only on the A2-delivery block | |

**User's choice:** Adversarial-review recommendation — Option B.
**Notes:** Phase 97 D-01's locked rejection of per-section pair-stamps governs over the in-file Advanced-section precedent — a new dated locus buys zero harness leverage (Phase-100 needles stable tokens, never dates). Both pro-A flaws were ruled FALSE POSITIVES: the "date time-bomb" (harness is forbidden to needle dates; macOS docs in no freshness scope) and the "file-level over-claims whole-file re-verification" (corpus semantics = "last meaningfully edited," not "re-verified", per Phase 96 D-03). C carries a cross-area dependency on GA1 and risks two stamps in one section. Caveat captured in CONTEXT: if the pass edits the Advanced section, bump its line-311 stamp in lockstep.

---

## Claude's Discretion

- Exact wording of the failures-table row, TS-01 deep-dive prose, A2-augmentation cells, diagnostic-tree ladder steps, A1/A2 equivalence pointer, and version-history row.
- Exact placement of the TS-03 diagnostic-tree subsection (constrained: not nested under the failures H2; no heading renames).

## Deferred Ideas

- `check-phase-98.mjs` validator + chain-apex extension → Phase 100 (HARN-02, indivisible Atom 2); Phase 98 records only the needle-spec hand-off.
- Local-macOS-password-reset runbook + macOS navigation wiring → Phase 99 (RUN-01).
- Full re-audit of the shipped DEP-03 depth against Microsoft Learn → out of scope (formalize-only + bounded spot-verify cap).
- Anchor link-integrity guard → the real guard is the Phase-100 link-integrity sweep; Phase 98 only preserves slugs byte-stable.
