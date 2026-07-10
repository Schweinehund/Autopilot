# Phase 120: EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-07
**Phase:** 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix
**Areas discussed:** Mermaid vs C17 #1 (dominant), Doc Type taxonomy mapping

**Method:** Both areas resolved via `/adversarial-review` at the user's request — a scored Finder → Adversary → Referee pass (three Opus sub-agents per decision), each grounded in the live repo (EEE-SOP-standard.md, c17-eee-contract.mjs, the retrofit forks, RE-index.md, and sample class files). HYG-01 was fully specified in REQUIREMENTS.md and needed no discussion.

---

## Area 1 — Mermaid vs C17 #1 (dominant)

| Option | Description | Selected |
|--------|-------------|----------|
| A1 — Text-equivalent conversion | Convert every enrolled Mermaid diagram to a C17-compliant table/structured-list preserving every decision leaf (RE-068 precedent); C17 assertion #1 stays a hard-fail on ```mermaid, byte-unchanged | ✓ |
| A2 — Documented C17 carve-out | Permit a constrained Mermaid form in enrolled files; relax/scope C17 assertion #1; document rule + rationale | |

**User's choice:** A1 — Text-equivalent conversion, C17 #1 unchanged. ("Lock both as recommended.")

**Notes / adversarial reasoning:** Decisive, non-close. Two independent knockouts against A2: (1) **North-star** — the sole indexed grounding surface is pandoc→`.docx` body text; Mermaid does not render there, so raw `graph TD / classDef` code lands verbatim in the citation body (and for flowcharts the branch logic lives only in the edges → most decision-relevant content becomes the least-prose-like garbage). A2 poisons the exact surface the program exists to clean. (2) **Frozen-harness discipline** — A1 leaves the C17 "indivisible atom" byte-unchanged (zero close-gate ripple); A2 requires editing #1 mid-close. Corroborating: RE-068 (enrolled+Approved) already converted its tree to a table — A1 ratifies shipped corpus law. The Adversary's sole win (A2-3: a `relPath` gate *can* scope the relaxation) does not rescue A2 — scoped files still self-poison their own `.docx`. Finder "fidelity-loss" CRITICALs against A1 (tree→table loses topology; sequenceDiagrams have no target shape) were ruled OVERSTATED/FALSE-POSITIVE: RE-068 + `10-8021x-triage.md` prove branching trees convert faithfully, and both sequenceDiagrams already carry in-file prose (conversion = delete the fence). The one REAL residual of A1 — leaf-preservation is human-verified, C17 can't check it (A1-5/X-1) — is handed to Phases 121-122 as a review-checklist obligation (CONTEXT R1-R5).

---

## Area 2 — Doc Type taxonomy mapping

| Option | Description | Selected |
|--------|-------------|----------|
| Zero new Doc Types (reuse existing) | glossary→Reference, decision-tree→Reference, nav-hub→Reference, lifecycle→Guide, end-user guide→Guide (settled). Taxonomy stays at exactly 4 values. | ✓ |
| Add new Doc Type(s) | Mint e.g. Glossary / Decision-Tree / Index / Lifecycle types for the classes that fit the existing taxonomy least cleanly | |

**User's choice:** Zero new Doc Types, per-class mapping as above. ("Lock both as recommended.")

**Notes / adversarial reasoning:** A new `doc_type` value buys **phantom** C17 enforcement (there is NO `VALID_DOC_TYPES` enum — C17 only checks presence #8 + block==frontmatter equality #9; a new value is unenforced), costs a **real** 4th hard-coded pipeline fork + template + fixtures, and is **grounding-inert** (citations are filename-driven). Reusing `Reference` for a new directory-class *also* needs allowlist edits, so the reuse-vs-new cost gap collapses → minimalism. The only CRITICAL that survived adversarial challenge was **lifecycle→Reference** (definitionally wrong — `01-ade-lifecycle.md` is end-to-end procedural setup → correct fix is **Guide**). The decision-tree and nav-hub "category error" CRITICALs were ruled REAL-but-OVERSTATED → MEDIUM, resolved by explicit D-02 edge rulings (extending "decision-support material" to decision trees) rather than new types. glossary-grab-bag, nav-hub-exclusion-gap, audience-dilution, and mermaid-blocker objections were ruled FALSE-POSITIVE. A non-MECE tie-breaker (directory-precedence → dominant-structure → tie→Reference) goes into the standard's D-02 to resolve `05-device-lifecycle.md` and `quick-ref-l1`.

---

## Claude's Discretion

- Exact prose wording of the new standard subsections (diagram policy, D-02 edge rulings, precedence rule) — decisions fix the substance, not the sentences.
- Whether to add an optional comment-only pointer near C17 #1 to the new standard subsection (must not change assertion behavior; `--self-test` must still exit 0).

## Deferred Ideas

- Optional C17 hardening: a 14th assertion `doc_type ∈ {Runbook, Guide, RCA, Reference}` + registry↔frontmatter cross-check to close the unenforced-vocabulary (CF1) and silent-divergence (CF2) gaps — later-phase lever, orthogonal to this phase.
- RE-068 prose scrub (stale "click the leaf" / "Mermaid decision tree" text) — opportunistic, belongs with Phase 122 decision-tree work.
- Nav-hub library exclusion — a library-scoping decision on a different axis; not reopened here (D-09).
