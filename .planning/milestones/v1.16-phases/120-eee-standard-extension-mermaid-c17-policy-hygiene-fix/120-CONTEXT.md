# Phase 120: EEE Standard Extension — Mermaid/C17 Policy + Hygiene Fix - Context

**Gathered:** 2026-07-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Extend the two canonical v1.15 EEE artifacts — `docs/_standards/EEE-SOP-standard.md` and `scripts/validation/c17-eee-contract.mjs` — with:
1. A codified **Mermaid-in-enrolled-classes policy** (STD-04) resolving the dominant Mermaid-vs-C17-#1 collision.
2. An extended **Doc Type taxonomy** explicitly covering the 5 remaining structural doc classes (glossary / decision-tree / nav-hub / lifecycle / end-user guide).
3. A trivial **hygiene fix** (HYG-01): correct the stale `frozen-at-close.mjs:5-9` header comment.

**This phase writes STANDARD + CONTRACT + one comment only. It does NOT retrofit any content doc.** The actual conversion/retrofit of decision-trees and carved-mermaid files happens in Phases 121–123 under the policy locked here. This phase unblocks those phases; RETRO-05 (decision-trees) and RETRO-08 (carved-mermaid) cannot start until the Mermaid policy is locked.

**Out of scope (belongs to later phases):** converting any actual Mermaid diagram (Phase 122); retrofitting glossary/lifecycle/nav-hub content (Phases 121, 123); pandoc alias fix / descriptive-filename pass (Phase 124); frozen-surface pin + close (Phase 125); nav-hub *library exclusion* (orthogonal deployment axis, not this phase — see D-09).

</domain>

<decisions>
## Implementation Decisions

Both dominant gray areas were resolved via `/adversarial-review` (Finder → Adversary → Referee, three Opus agents per decision, grounded in the live repo). The full reasoning is preserved in `120-DISCUSSION-LOG.md`.

### Decision A — Mermaid-in-enrolled-classes policy (STD-04, DOMINANT)

- **D-01 (LOCKED):** Adopt **text-equivalent conversion** (Option A1), NOT a C17 carve-out. Every enrolled Mermaid diagram is converted to a C17-compliant text form. Decisive rationale:
  - **North-star (Copilot grounding):** the sole indexed surface is pandoc→`.docx` body text; Mermaid does not render there — raw ` ```mermaid graph TD / classDef ` code lands verbatim in the citation body, and for flowcharts the branch logic lives *only* in the edges, so the most decision-relevant content becomes the least-prose-like garbage. A carve-out poisons the exact surface the program exists to clean.
  - **Frozen-harness discipline:** A1 leaves C17 assertion #1 **byte-unchanged** (zero close-gate re-baseline ripple); a carve-out would require editing the "indivisible validator atom" mid-close.
  - **Precedent:** RE-068 (`docs/l2-runbooks/26-apple-business-permission-denied.md`, enrolled + Approved) already converted its tree to a `Scenario | Leaf | Resolution` table. A1 ratifies shipped corpus law.
- **D-02 (LOCKED):** **C17 assertion #1 stays UNCHANGED** — it remains a hard-fail on `^```mermaid` in every enrolled file. Not scoped, not relaxed. Any code touch in this phase is comment-only (and even that is optional). `--self-test` still exits 0.
- **D-03 (LOCKED):** Conversion shapes to codify in the standard:
  - **Decision graphs / flowcharts** → a decision table (`Scenario | Leaf | Resolution`) or a nested decision list. **Every** node/leaf and every labeled edge MUST appear as a row/item; the routing target is a relative Markdown link; annotate leaf count as a LOCKED invariant (the RE-068 "LOCKED — N leaves" pattern). Reference exemplar already in-corpus: `docs/decision-trees/10-8021x-triage.md` "Routing Verification" table.
  - **Sequence diagrams** → an ordered numbered step list of the actor exchange. The 2 known sequenceDiagrams (RE-147 `docs/reference/ca-enrollment-timing.md`; RE-135 `docs/admin-setup-8021x/01-eap-method-overview.md`) already carry full prose equivalents in-file — conversion = delete the fence at enrollment, no new authoring.
  - Any legend / node-shape glossary / `classDef` color explanation / "click the leaf" prose describing the removed diagram MUST be removed or rewritten to describe the table.
- **D-04 (LOCKED — honesty caveat in the standard):** State explicitly that C17 #1 is an opener-regex with **no diagram parser** — it guarantees Mermaid *absence*, it CANNOT verify that the replacement table preserves every leaf. Leaf-completeness is a **human authoring-and-review obligation** verified at enrollment, NOT something a green C17 run attests. (This governs the residual risks R1–R2 below, which land in Phases 121–122, not here.)

### Decision B — Doc Type taxonomy extension (STD-04)

- **D-05 (LOCKED):** **Add ZERO new Doc Types.** The taxonomy stays at exactly 4 values (`Runbook | Guide | RCA | Reference`). All 5 structural classes map to existing values:

  | Class | Doc Type | Note |
  |---|---|---|
  | glossary (`docs/_glossary*.md`) | **Reference** | Paradigm lookup case — alphabetical term definitions |
  | decision-tree (`docs/decision-trees/*`) | **Reference** | Via explicit D-02 edge ruling extending "decision-support material" to decision trees |
  | nav-hub (`index.md`, `common-issues.md`, `quick-ref-l1/l2.md`) | **Reference** | Non-procedural default; least-wrong bucket |
  | lifecycle (`*-lifecycle/*`) | **Guide** | End-to-end procedural setup — Reference here is definitionally wrong |
  | end-user guide (RE-175/176) | **Guide** | Settled prior (D-02); upheld, audience-agnostic |

- **D-06 (rationale for zero new types):** A new `doc_type` value buys **phantom** C17 enforcement (there is NO `VALID_DOC_TYPES` enum — C17 only asserts `doc_type` presence #8 and block==frontmatter equality #9; a new value is unenforced anyway), costs a **real** 4th hard-coded pipeline fork + template + self-test fixtures (`scripts/pipeline/retrofit-{runbook,guide,reference}.mjs` each hard-code the literal + block string + path allowlist), and is **grounding-inert** (Copilot citations are filename-driven; `doc_type` is near-inert metadata). Because reusing `Reference` for a new *directory-class* also requires the same allowlist edits, the reuse-vs-new cost gap collapses → minimalism wins.
- **D-07 (LOCKED — new D-02 edge rulings to add to the standard):** `glossary → Reference`; `decision-trees/ → Reference` (extend the "decision-support material" language to name decision trees explicitly, discharging the "no procedural walkthrough" tension in text); `navigation/index hubs → Reference`; `*-lifecycle/ → Guide`.
- **D-08 (LOCKED — non-MECE tie-breaker, goes into the standard's D-02):** The 5 classes are not a clean partition (`decision-trees/05-device-lifecycle.md` ∈ decision-tree∩lifecycle; `quick-ref-l1` ∈ nav∩procedural), and C17 #9 cannot catch a *wrong* value. Add an authoring-time precedence rule (enforced by registry review, not the harness): **(1) Directory precedence** — a doc in a class-dedicated directory takes that directory's type regardless of topical overlap (`decision-trees/*`→Reference, `*-lifecycle/*`→Guide); **(2)** else classify by **dominant body structure** (executable end-to-end procedure → Runbook/Guide; else Reference); **(3) tie → Reference**. Resolves `05-device-lifecycle.md`→Reference and `quick-ref-l1`→Reference.
- **D-09 (scope ruling):** Nav-hub **library exclusion** (whether to keep index/common-issues/quick-ref out of the indexed `.docx` corpus, mirroring the `_standards/`/`_registry/` exclusion at EEE-SOP-standard.md §253-259) is **OUT-OF-SCOPE for Phase 120**. Exclusion is orthogonal to `doc_type` — STD-001 itself carries `doc_type: Reference` yet is excluded from indexing. It's a library-scoping / `.docx`-upload-walk axis; Phase 123 already settled that nav-hubs are *included* (retrofitted). Every doc gets a `doc_type` regardless. Do not reopen it here.

### Decision — HYG-01 (fully specified, no discussion)

- **D-10:** Correct the stale header comment at `scripts/validation/_lib/frozen-at-close.mjs:5-9`. It still asserts helpers "REMAIN INLINE" across `check-phase-{61,67,68,70}`, factually false since v1.14 Phase 111 centralized them. Single-comment edit, no functional change, no behavior touch.

### Claude's Discretion
- Exact prose wording of the new standard subsections (diagram policy, D-02 edge rulings, precedence rule) is the author's discretion — decisions D-01..D-10 fix the substance, not the sentences.
- Whether to add an (optional) comment-only note near C17 #1 pointing to the new standard subsection — allowed, but must not change assertion behavior and `--self-test` must still exit 0.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` — STD-04 (Mermaid policy + taxonomy) and HYG-01 (comment fix) definitions; the v1.16 gray-area list.
- `.planning/ROADMAP.md` §"Phase 120" — goal + 4 success criteria; downstream dependency chain (RETRO-05/08 blocked on this).

### The two artifacts this phase edits
- `docs/_standards/EEE-SOP-standard.md` — the canonical EEE SOP standard. Relevant sections: `## Doc Type Taxonomy` (~L123, the exactly-4 controlled vocabulary + definitions), `### D-02 Edge-case rulings` (~L136, where the new per-class rulings + precedence rule land), the RCA forward-compat note (~L146), the C17 assertion-reference table (~L363, Mermaid row #1), Grounding Notes / OQ4 (`.docx` body text = sole indexed surface; frontmatter → invisible custom properties, ~L209-235), and the `_standards`/`_registry` exclusion rationale (~L253-259, relevant to D-09).
- `scripts/validation/c17-eee-contract.mjs` — the C17 contract. Assertion #1 (Mermaid opener-regex) at L201-210 (`/^```mermaid/.test(l)` over `bodyLines` with `inCodeFence` mask); `doc_type` presence assertion #8 (~L288) and block==frontmatter equality #9 (~L312) — note there is NO `VALID_DOC_TYPES` set (contrast `VALID_STATUSES` #13 ~L410); `--self-test` harness ~L418+ (does NOT exercise #1). `checkFile` receives `relPath` (~L116).

### HYG-01 target
- `scripts/validation/_lib/frozen-at-close.mjs` §L5-9 — the stale "REMAIN INLINE" header comment to correct.

### Conversion precedent & exemplars (for the standard's policy text)
- `docs/l2-runbooks/26-apple-business-permission-denied.md` — RE-068, the enrolled+Approved precedent whose Mermaid tree is already a `Scenario | Leaf | Resolution` table. NOTE (residual R2): it still contains stale "Mermaid decision tree" / "click the leaf" prose — the pattern to *fix*, not copy verbatim.
- `docs/decision-trees/10-8021x-triage.md` — in-corpus "Routing Verification" path-enumeration table faithfully encoding a *branching* tree; the exemplar shape for D-03.
- `docs/reference/ca-enrollment-timing.md` (RE-147) and `docs/admin-setup-8021x/01-eap-method-overview.md` (RE-135) — the 2 sequenceDiagrams; both already carry in-file prose equivalents.

### Taxonomy consumers (cost model for D-05/D-06)
- `scripts/pipeline/retrofit-runbook.mjs`, `scripts/pipeline/retrofit-guide.mjs`, `scripts/pipeline/retrofit-reference.mjs` — the 3 hard-coded forks; each hard-codes a literal `doc_type`, block string, path allowlist, and self-test fixtures ("fork, don't refactor in place" convention). A new value → a 4th fork; even reuse-Reference for a new directory needs allowlist edits.
- `docs/_registry/RE-index.md` — the doc-ID registry; the `Doc Type` column is a hand-maintained Markdown table, NOT an enforced enum and never cross-checked vs frontmatter (CF2).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **RE-068 table pattern** (`docs/l2-runbooks/26-...md`) and **10-8021x Routing-Verification table** — copy these shapes directly into the standard's diagram-policy prose as the canonical conversion templates.
- **`VALID_STATUSES` pattern** in `c17-eee-contract.mjs` (~L49/L410, assertion #13) — the template a *future* optional `VALID_DOC_TYPES` assertion would follow (flagged downstream, NOT this phase).

### Established Patterns
- **Indivisible validator atom (SC1/HARN-01):** C17's 13 assertions are one atom; editing assertion logic ripples into the frozen-surface pin (HARN-05/06) and close-gate re-baseline (HARN-07). D-02 keeps #1 byte-unchanged precisely to avoid this — respect it.
- **Frozen predecessor surfaces:** v1.4–v1.15 harness surfaces stay byte-unchanged; the standard doc + a single comment are the only edits this phase makes to shipped surfaces, both in-scope by design (Phase 120 SC).
- **Enrollment gate:** a docs/ file is "enrolled" iff its frontmatter has a `doc_id` key. The 30 Mermaid-bearing files are NOT currently enrolled — the Mermaid collision is a *future* RETRO-05/08 enrollment event, so nothing in the corpus breaks when this phase lands.

### Integration Points
- Standard doc text ↔ C17 assertion #1 source row (keep cross-reference accurate, but #1 code stays unchanged).
- Standard D-02 edge rulings + precedence rule ↔ registry `Doc Type` column assignment (Phases 121-123 consume D-07/D-08 when assigning `doc_type`).

</code_context>

<specifics>
## Specific Ideas

- The standard's new diagram-policy subsection should carry the honest enforceability caveat (D-04) verbatim in spirit — downstream reviewers must know green-C17 ≠ faithful conversion.
- Residual risks to hand forward to Phases 121-122 research/planning (NOT actioned here): R1 mandatory per-file leaf-parity checklist + second-reviewer sign-off (RE-068 "LOCKED — N leaves" annotation standardized); R2 scrub stale mermaid-referencing prose (RE-068 itself needs it); R3 confirm `## Summary` within 5 lines of any >25-row converted table (assertion #11); R4 template-ize table-first authoring to stop the recurrence tax; R5 convert every former `click` target to a real relative Markdown link (recovers citable nav the .docx never had).

</specifics>

<deferred>
## Deferred Ideas

- **Optional C17 hardening — `VALID_DOC_TYPES` enforcement:** add a 14th C17 assertion `doc_type ∈ {Runbook, Guide, RCA, Reference}` + a registry↔frontmatter cross-check, to close the unenforced-vocabulary gap (CF1) and silent-divergence gap (CF2) the review surfaced. Explicitly a later-phase hardening lever, orthogonal to the Phase 120 mapping decision. The zero-new-types decision (D-05) *shrinks* this gap. Candidate for a future HARN/STD requirement.
- **RE-068 prose scrub:** fix the stale "click the leaf" / "Mermaid decision tree" text in the already-converted RE-068 — opportunistic, belongs with the Phase 122 decision-tree work.
- Nav-hub library exclusion (D-09) — a library-scoping decision on a different axis; not reopened here.

</deferred>

---

*Phase: 120-eee-standard-extension-mermaid-c17-policy-hygiene-fix*
*Context gathered: 2026-07-07*
