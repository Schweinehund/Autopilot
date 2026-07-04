# Phase 114: EEE Standard, Templates, Doc ID Registry + Metadata Rules - Context

**Gathered:** 2026-07-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Author the complete EEE SOP specification and scaffolding — the standard document, updated
templates, the Doc ID registry, and the metadata/normalization rules — **before** any file in
the corpus receives the retrofit. Deliverables are fixed by ROADMAP Phase-114 SC1–SC4 and
requirements META-01..04 + STD-01..03:

1. **C10 lenient-key precondition confirmed** — C10 passes against a test file carrying the four
   new frontmatter keys (`doc_id`, `status`, `owner`, `doc_type`) before any corpus file is
   edited (META-01).
2. **`docs/_standards/EEE-SOP-standard.md`** committed — single-line header-block format; the D1
   platform-normalization map (all ~19 real variants → clean labels; unmapped = hard failure, no
   fallback); D2 `Last Reviewed` = `last_verified` verbatim semantics; Doc Type taxonomy; the
   "v1.15 EEE reformat — content not re-reviewed" Version-History row rule; grounding-notes
   section (body-text-only indexing; document-level-only citations; Approved-only indexed library;
   **Status: Draft = label, not an index gate**) (STD-01, META-02/03/04).
3. **`docs/_templates/*`** updated so every new doc is born EEE-conformant — required frontmatter
   keys, single-line block, `## Summary`-first, `Status: Draft` default; owner-promotes-to-Approved
   rule documented (STD-02).
4. **`docs/_registry/RE-index.md`** committed OUTSIDE the indexed library — all Phase-1 Doc IDs
   assigned in one sequential collision-free pass from `RE-001`, mapping `RE-NNN → path + title +
   doc_type + status` (STD-03).

**NOT this phase:** the C17 validator atom (Phase 115 — this phase hands off a needle-spec only);
any corpus retrofit (Phases 116–118); the frozen-surface re-baseline / lineage bump / close
(Phase 119). New capabilities belong in their own phases.

**Adjudication method:** All four gray areas were resolved via a three-agent adversarial review
(Finder → Adversary → Referee), grounded in REQUIREMENTS.md, ROADMAP Phase 114/115, the Phase-113
PIPE-02 empirical findings, and research SUMMARY.md, with every deciding corpus fact independently
re-verified against the repo. The user confirmed the one genuine scope question (45 orphan docs)
on 2026-07-04.
</domain>

<decisions>
## Implementation Decisions

### Owner field placement (discuss-flag #4)
- **D-01 (owner frontmatter-ONLY; NOT rendered in the visible header block):** `owner` is a
  required frontmatter key (C17 asserts key **presence** regardless of rendering), but it is NOT a
  field in the single-line body-text block.
  - *Rationale:* OQ1 proved Copilot citations are **filename-driven**, so owner-in-block buys
    **zero** citation value while injecting a person-name into the load-bearing lead retrieval
    chunk (embedding dilution + answer/attribution noise — the exact "escape-valve" concern named
    in REQUIREMENTS L59). Copilot recites block fields verbatim (PIPE-02 Q2), so a rendered owner
    would surface people in AI answers.
  - *Rejected 1A (owner in block):* dilutes the lead chunk with a non-topical person-name for no
    citation gain. *Rejected 1C (role-only string enforced by C17):* "role not person" is not
    deterministically lintable.
  - *C17 handoff:* needle-spec = `owner` required **in frontmatter**, **absent** from the block;
    the block-field-match assertion never evaluates owner (ordinary case, not an asymmetry).

### Doc Type taxonomy + Phase-1 registry scope (discuss-flag #7)
- **D-02 (edge-case classifications):** comparison docs (`apv1-vs-apv2.md`, `windows-vs-macos.md`)
  → **Reference**; error-code docs → **Reference**; end-user guides → **Guide**.
  - *Rationale:* comparison/error-code docs are lookup material with no procedural walkthrough
    (Reference); end-user guides are audience-facing procedure (Guide). doc_type is
    **audience-agnostic by design** — admin-vs-end-user is discriminated by Platform + title +
    Summary, not by doc_type — so "Guide over-collapses admin+end-user audiences" was disproved.
  - The taxonomy stays **{Runbook, Guide, RCA, Reference}** (RCA retained for forward-compat even
    though zero RCA docs exist today — REQUIREMENTS L24).
- **D-03 (positive-named Phase-1 scoping RULE — makes the registry runnable this phase):** The EEE
  standard states Phase-1 membership **positively by named class**: Phase-1 = **(1)** L1/L2
  runbooks (`l1-runbooks/` + `l2-runbooks/`, 75 docs) + **(2)** admin-setup guides all platforms
  (`admin-setup-*/`, ~66) + **(3)** reference docs (`reference/` + `error-codes/` + the
  platform-comparison docs + `end-user-guides/`, ~35). Total ≈ 167–176.
- **D-04 (45 orphan docs OUT — owner-confirmed 2026-07-04):** `operations/` (20),
  `device-operations/` (5), and `cross-platform/apple-business/` (20) are **OUT of Phase-1**,
  deferred to v1.16. They are named in neither the Phase-1 scope list nor the original v1.16
  deferred list; the three named classes already sit at/above the "~150" envelope, the 75-runbook
  count matches the roadmap exactly, and v1.15 is reshape-only (no new scope). They join
  glossaries / decision-trees / nav-hubs / lifecycle in v1.16.

### Header block field set, order & separator (META-02)
- **D-05 (field-set A — exactly `Platform · Doc Type · Doc ID · Status`, in that order,
  `·` middle-dot separator; Platform + Doc Type first; NO Owner, NO Last Reviewed in the block):**
  - *Rationale:* this is **precisely** the block PIPE-02 empirically proved indexes as body text
    (the load-bearing EEE thesis, PIPE-02 Q2) — the four fields with the `·` separator — merely
    reordered to the already-locked Platform+DocType-first rule (META-02 L33; SC2), which is
    strictly **more** chunk-split-resilient. The validated thesis is order-independent, so the
    "stub led with Doc ID → critical" concern was disproved.
  - *Rejected field-set C (+`Last Reviewed`):* injects a stale-looking verbatim date into the lead
    chunk for no retrieval gain; META-04's verbatim-carry is a **semantic** rule satisfied by
    frontmatter `last_verified` + the Version-History row, not by block rendering. *Rejected
    field-set B (+Owner):* eliminated by D-01. *Rejected `|` separator:* GFM-table collision risk;
    `·` is the validated separator. (Bold-vs-plain labels are cosmetic — Copilot strips markdown on
    recitation; indexed text is identical either way.)
  - `## Summary` immediately follows the block, no intervening content (META-02 / D3-A structure).
  - *C17 handoff:* block-fields = `{Platform, Doc Type, Doc ID, Status}` in that order; the
    "Platform + Doc Type are the first two fields" assertion is the operative check.

### Templates, registry & the C17-platform precondition (STD-02, STD-03)
- **D-06 (templates = 4B-hybrid):** keep the 6 existing templates (`admin`, `admin-android`,
  `admin-ios`, `admin-macos`, `l1`, `l2`); **ADD a Reference template** (the ~35 reference-class
  docs have no template home today, and table-remediation conventions need a scaffold for
  Phase 118). **DEFER the RCA template** (zero RCA docs / no new content — Out-of-Scope L76); RCA
  stays a taxonomy member for forward-compat.
- **D-07 (fix the pipe-list template `platform:` so C17 passes all templates — the one real
  CRITICAL):** Phase-115 SC3 requires C17 exit-0 on **all** `docs/_templates/*`, and C17 fails any
  `platform:` value that doesn't resolve in the D1 map (no fallback). The three pipe-list templates
  (`admin-template.md`, `l1-template.md`, `l2-template.md`) carry unmappable placeholders
  (`Windows | macOS | … | all`). **Decisive verified fact:** the pipe-format variants exist
  **ONLY in these three templates — no real corpus doc uses them.** → Change those three to a
  single D1-mapped value **`platform: all`** (`all` is a real corpus variant that must be in the
  map anyway) + an author-guidance HTML comment (`<!-- choose: Windows|macOS|iOS|Android|Linux|all -->`).
  The `-android/-ios/-macos` admin templates already carry concrete mappable values — no change.
  - *Rejected:* a C17 template carve-out (leaves the platform assertion unexercised on templates,
    weakening the gate); a placeholder token in the D1 map (pollutes D1 with a non-corpus value).
- **D-08 (registry = Phase-1-only, flat sequential `RE-001…RE-NNN`):** over the D-03/D-04-scoped
  set only; stored OUTSIDE the indexed library. Flat sequential (no reserved ranges, no
  class-encoded IDs — IDs stay semantically opaque; the "all-274" sweep is rejected — it would pull
  v1.16-deferred structural classes into an ill-fitting taxonomy). Test fixtures (`RE-T0x`,
  `draft-test-doc`, `clean-test-doc`) live in `scripts/pipeline/test-fixtures/` +
  `.pipeline-output/` — **outside `docs/`** — so a corpus-file registry naturally excludes them
  (no RE-T0x contamination).

### D1 platform-normalization map (META-03 / STD-01)
- **D-09 (the map RULE is authored now; unmapped = hard failure, no silent fallback):** the D1 map
  and its "no fallback" rule are the STD-01/SC2 deliverable, authored this phase. Enumerated real
  variants to cover (verified via corpus grep; confirm again at plan time before authoring):
  `Windows/windows`, `macOS/macos`, `iOS/ios`, `Android/android`, `Linux/linux`, `all`,
  `cross-platform`, `apple-tv`, `iOS,Android`, `ios+macos`, `ios+ipados+macos`,
  `ios+ipados+macos+tvos`, `ios+macos+shared-ipad`, `ios+shared-ipad`,
  `windows+macos+ios+android+linux`. (Some tricky compounds live in now-OUT-of-scope docs per
  D-04; the map is authored against the in-scope enumeration confirmed at plan time.)

### Claude's Discretion (resolve at plan time)
- Exact ordering of the sequential `RE-NNN` assignment (by class, by directory, or by
  operator-impact retrofit order 116→117→118) — Claude's discretion; keep IDs semantically flat.
- Exact `## Summary` minimum-word-count value the standard states (ROADMAP Phase-115 SC2 already
  names ">=30 words"; adopt that unless a stronger threshold is warranted).
- Exact filename/section layout of `EEE-SOP-standard.md`, the Reference template, and
  `RE-index.md`.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase-113 empirical findings (the decisive inputs — read FIRST)
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md`
  — OQ1 (citations filename-driven → drives D-01), OQ2 (`Status: Draft` = label, not a gate →
  drives the standard's Draft-exclusion wording), OQ3 (no chunk fragmentation observed; Phase-118
  table mitigation remains prudent), OQ4 (pandoc promotes frontmatter keys to **invisible** custom
  properties → the body-text block is retrieval-necessary), and the Q2 proof that the single-line
  block indexes as body text (validates field-set A, D-05).
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/113-CONTEXT.md`
  — the locked pipeline decisions (D-01..D-07 there); the single-line inline block is the
  grounding-necessary format.

### Grounding research (authoritative platform facts)
- `.planning/research/SUMMARY.md` — body-text-only indexing; YAML→invisible custom properties;
  document-level-only `.docx` citations; ~2,000-char chunking; the P-02/P-06/P-08/P-09 pitfalls;
  the C17 lint-surface / needle list; the D3-A structure. `PITFALLS.md`, `STACK.md`,
  `ARCHITECTURE.md`, `FEATURES.md` — supporting detail.

### Phase scope + requirements
- `.planning/ROADMAP.md` §"Phase 114" — Goal + SC1–SC4 (fixed deliverables). §"Phase 115" — the
  C17 assertion list this phase feeds a needle-spec into. §"Phases 116–118" — retrofit scope the
  registry/taxonomy must serve.
- `.planning/REQUIREMENTS.md` — META-01..04 (L32–35), STD-01..03 (L24–26), the discuss-flag list
  (L52–62), Out-of-Scope (L73–78), and the v1.16 Future list (L66–71) into which D-04's 45 orphan
  docs are deferred.
- `.planning/STATE.md` — Phase-114 Plan-Time Research Flags (C10-leniency test; D1 variant
  enumeration) and Pending Todos.

### Existing scaffolding to update/mirror
- `docs/_templates/` — the 6 existing templates (D-06/D-07 target). `l1-template.md`,
  `l2-template.md`, `admin-template.md` carry the pipe-list `platform:` placeholders that D-07
  fixes; the `-android/-ios/-macos` admin templates are already mappable.
- `scripts/pipeline/README.md` §SC3 — documents the Draft-exclusion / indexed-library deployment
  policy the standard's grounding-notes section should reference.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/{l1,l2,admin,admin-android,admin-ios,admin-macos}-template.md` — the born-conformant
  scaffolds updated in this phase; the new **Reference template** (D-06) mirrors their frontmatter +
  HTML-comment-guidance shape.
- `scripts/pipeline/test-fixtures/` + `.pipeline-output/` — where the Phase-113 `.docx`/`RE-T0x`
  fixtures live (OUTSIDE `docs/`), so the corpus registry excludes them automatically (D-08).
- `scripts/validation/*.mjs` — the C1–C16 validator pattern; C17 (Phase 115) will be authored here
  from this phase's needle-spec (D-01/D-05 C17 handoffs). C10 is embedded in the per-phase / audit
  validators — the C10-leniency precondition test (SC1) targets that check.

### Established Patterns
- **Validator-atom deferral:** C17 is authored as one indivisible atom at Phase 115; this phase
  hands off a **needle-spec only** (block-field set + order, owner-in-FM-not-block, platform-resolves,
  no-fallback). Do NOT wire any new validator into the chain here.
- **Frontmatter is harness-only:** OQ4 confirmed all frontmatter keys land in invisible Word custom
  properties. Everything the Copilot agent must see is retrieval-necessary body text (the block +
  `## Summary`). This is the load-bearing architectural fact behind D-01 and D-05.
- **Reshape-only envelope:** v1.15 carries `last_verified` verbatim, never re-reviews content, and
  adds no new docs/scope — the basis for the D-04 OUT ruling and the D-05 no-`Last Reviewed`-in-block
  choice.

### Integration Points
- **Greenfield standard/registry:** `docs/_standards/` and `docs/_registry/` do not exist yet — both
  are created this phase. The registry lives OUTSIDE the indexed SharePoint library (if indexed,
  doc-specific queries would return the registry row instead of doc content).
- **C10 precondition gate:** the C10-leniency test (SC1) must pass BEFORE any corpus file gains the
  four new frontmatter keys — a phase-opening plan step.
</code_context>

<specifics>
## Specific Ideas

- The single most load-bearing spec detail: the visible **single-line body-text header block is
  retrieval-necessary**; frontmatter is invisible to the index. The standard must state this
  explicitly (OQ4).
- Field-set A is not a preference — it is the exact block PIPE-02 grounding-validated
  (`Doc ID · Platform · Doc Type · Status`), reordered to Platform+DocType-first. Keep the `·`
  separator that passed live grounding.
- Standard's grounding-notes wording on Draft: **"Status: Draft is a label, not an index gate —
  exclude Draft/superseded docs by library scoping (or SharePoint content-approval), never by
  relying on the body-text label"** (OQ2). Content-approval stays a deferred deployment lever.
</specifics>

<deferred>
## Deferred Ideas

- **v1.16 — 45 orphan docs (D-04):** `operations/` (20), `device-operations/` (5),
  `cross-platform/apple-business/` (20) — owner-confirmed OUT of Phase-1 on 2026-07-04; brought
  under EEE + C17 in v1.16 alongside glossaries, decision-trees, nav-hubs, and lifecycle docs.
- **v1.16 — file-rename pass:** OQ1 confirmed Copilot citation titles are the raw `.docx`
  filenames (not H1). A descriptive-filename normalization pass across the corpus is flagged for
  v1.16 (REQUIREMENTS L69); this phase only preserves the flag.
- **Deployment — SharePoint content-approval:** the hardening lever if `Status: Draft` must be
  provably un-retrievable (OQ2 proved Draft is a label, not a gate). Tenant/ops config, not a doc
  change; deferred to deployment (REQUIREMENTS L70).
- **Deferred RCA template (D-06):** authored when the first RCA doc exists; RCA remains in the
  taxonomy for forward-compat now.

None of the above are scope creep into Phase 114 — they are downstream/parallel and preserved here
so they are not lost.
</deferred>

---

*Phase: 114-eee-standard-templates-doc-id-registry-metadata-rules*
*Context gathered: 2026-07-04*
