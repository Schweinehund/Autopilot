# Phase 113: Conversion Pipeline Lock + Representative-Set Grounding Validation - Context

**Gathered:** 2026-07-03
**Status:** Ready for planning

<domain>
## Phase Boundary

Define, lock, and empirically validate the Markdown→.docx conversion pipeline on a
representative 3–5 doc set **before** any file in the ~150-doc Phase-1 corpus receives
the EEE retrofit. A misconfigured pipeline corrupts all ~150 docs simultaneously, so it
must be grounding-confirmed first.

**Delivers (fixed by ROADMAP SC1–SC4):**
1. Pinned Pandoc + committed `--reference-doc` Word template + documented canonical invocation (PIPE-01)
2. A post-conversion guard that fails on raw `---` YAML in the first ~500 chars of the `.docx` **body** and passes on clean conversion (PIPE-01)
3. A 3–5 doc representative set converted (no YAML leak, Heading styles preserved — guard-verified), uploaded to the test SharePoint library, deployment policy documented (PIPE-02)
4. Live Copilot Studio queries confirm document-level citations + header block indexed as body text; empirical open questions resolved and recorded for Phase 114 (PIPE-02)

**NOT this phase:** authoring the EEE standard / templates / Doc ID registry (Phase 114);
the C17 validator atom (Phase 115); any corpus retrofit (Phases 116–118); the
frozen-surface re-baseline and `check-phase-113.mjs` authoring (Phase 119). New
capabilities belong in their own phases.
</domain>

<decisions>
## Implementation Decisions

All four gray areas were adjudicated via a three-agent adversarial review (Finder →
Adversary → Referee), grounded in `.planning/research/SUMMARY.md`, ROADMAP Phase 113,
and REQUIREMENTS PIPE-01/02. Every deciding fact was independently re-verified against
the repo. User accepted all four verdicts on 2026-07-03.

### PIPE-02 grounding-validation run model
- **D-01 (=A1, owner-run + agent-automated mechanical legs):** The agent automates the
  **in-scope** legs — convert (Pandoc) and the post-conversion guard. The **live Copilot
  Studio queries are owner-run** at a documented checkpoint, using an
  agent-authored step-by-step procedure + a results-recording template; the owner pastes
  observed results back and the phase completes at that checkpoint.
  - *Rejected A2 (agent-run end-to-end):* the agent has **no live Copilot Studio /
    SharePoint-upload access**, and that provisioning is **explicitly out of scope**
    (REQUIREMENTS L77; SUMMARY L116 — "the only phase requiring live platform testing").
  - *Rejected A3 (hybrid):* its one differentiator — agent automates the SharePoint
    **upload** leg — still needs out-of-scope SharePoint/Graph credentials, so it
    degrades into A1. The corpus-protecting value is the mechanical YAML/heading guards
    (agent-run under A1 regardless); the live query is owner-run by necessity.

### Deployment target (B3 owner gate — now RESOLVED)
- **D-02 (SharePoint document library + `.docx`) — OWNER-CONFIRMED 2026-07-03.** This
  satisfies the SUMMARY L219 gate ("confirm deployment mode with owner *before* the
  Phase 113 conversion test"). The Pandoc conversion pipeline is therefore **mandatory**.
  - *Rejected B2 (Dataverse direct `.md` upload):* it deletes the Pandoc step that moves
    YAML frontmatter into Word doc properties, so raw `---` frontmatter would leak into
    the **lead retrieval chunk unguarded across all ~150 docs** — re-introducing pitfall
    P-08 (SUMMARY L88). It is a different product, not a cheap fallback.
  - The gate arrived at the SharePoint answer *via B3's confirm-first discipline* (not by
    hard-locking B1 blindly). Dataverse remains documented as a rejected alternative only.

### reference.docx origin
- **D-03 (=C3, script-generate the pinned Pandoc default; guard asserts Heading styleIds
  on converted output):** Generate `reference.docx` from `pandoc`'s built-in default
  (which already carries correct **Heading 1/2/3 styleIds**); with Pandoc **pinned**
  those internal styleIds are deterministic (locale affects only *display names*, not
  styleIds). Commit the generated template. Correctness is proven by the D-04 guard
  asserting Heading styleIds survive on the **converted output** (satisfies ROADMAP SC3).
  - *Rejected C1 (owner hand-styled):* requires a **Word GUI in a headless environment
    with no Word**; risks a silent style-*name* mismatch → P-09 heading loss across 150
    docs; yields a non-regenerable binary blob + owner stall.
  - *Rejected C2 (pandoc default then verify/edit):* the "verify/edit" pass is **redundant**
    (defaults are already correct) and still needs the unavailable GUI to perform edits.

### Post-conversion guard depth + wiring
- **D-04 (=D2, both checks, standalone — NOT chain-wired yet):** The guard performs BOTH:
  (a) **no `---` YAML in the first ~500 chars of `.docx` body text** — this MUST unzip
  `word/document.xml` and strip XML tags first; a naive `---`-in-first-500-**raw-bytes**
  scan **never matches** on a DEFLATE-compressed `.docx` and would report false-green on
  leaked docs (the CRITICAL trap the review flagged); and (b) **Heading 1/2/3 paragraph
  styleIds present** on converted headings (P-09 guard). Ship it as a **standalone script**,
  NOT wired into the `scripts/validation` chain during Phase 113.
  - *Rejected D1 (YAML-leak only):* false-green trap above + drops the SC3 heading-style
    check entirely (P-09 left unguarded).
  - *Rejected D3 (wire into harness now):* injecting Pandoc/`.docx` byte-differences
    (Windows vs the authoritative Linux GHA runner) into the cross-OS EXACT-MATCH
    **text-lint** chain directly threatens the HARN-04 close-gate; makes Pandoc a CI
    dependency; and violates the validator-atom deferral discipline (`check-phase-113.mjs`
    is authored at Phase 119, not now).

### Cross-decision coupling (planner MUST honor)
- **D-05 (shared OOXML helper):** C3 and D2 use the **same** `.docx`/OOXML introspection
  code path — open the `.docx` zip → read `word/document.xml` → (i) body-text leak check
  and (ii) paragraph `pStyle` styleId check. **Build it once.** Use a Node-side zip reader
  (`.docx` is a zip; no external binary — `unzip` is absent on Windows).
- **D-06 (single owner touchpoint):** B3's deployment-mode confirmation is now satisfied,
  so the **only remaining owner touchpoint is the A1 live-grounding checkpoint**. Had the
  owner deferred B3, it would have sequenced immediately before the A1 checkpoint as one
  coordinated round-trip.
- **D-07 (Phase-119 fold-in):** the D-04 standalone guard is the **seed** for
  `check-phase-113.mjs`, authored at Phase 119 (HARN-03 Atom 2). Keep it standalone now;
  hand off a needle-spec, per the repo's validator-atom deferral pattern.

### Claude's Discretion (resolve at plan time)
- **Pandoc install + version pin:** Pandoc is **not currently on PATH** in this
  environment. The plan must both **install and pin** a specific Pandoc version (PIPE-01
  requires a pinned version) — pin choice and install mechanism are Claude's discretion.
- **Representative-set selection (3–5 docs):** exact files are Claude's discretion, but
  the set MUST: span multiple `platform:` frontmatter variants; include **≥1
  capability-matrix table** (exercises P-02 chunk-fragmentation); and include **≥1
  `Status: Draft` doc** (exercises the Draft-retrieval open question). Confirm test
  SharePoint library access at plan time (STATE pending todo).
- **Empirical findings artifact:** record the resolved open questions (below) in a
  findings file in this phase directory for Phase-114 handoff; exact filename Claude's
  discretion.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Grounding research (authoritative platform facts — read FIRST)
- `.planning/research/SUMMARY.md` — the v1.15 grounding research: pipeline is mandatory
  (`.md` not indexed by the SharePoint connector), body-text-only indexing, YAML→Word
  properties (invisible), document-level-only `.docx` citations, ~2,000-char chunking
  with 500-char overlap, the P-02/P-06/P-07/P-08/P-09 pitfalls, the C17 lint surface
  (Phase 115), and the **Verify-at-Plan-Time / Open Questions** table (§L214–222) that
  Phase 113 must resolve empirically.
- `.planning/research/PITFALLS.md`, `.planning/research/STACK.md`,
  `.planning/research/ARCHITECTURE.md`, `.planning/research/FEATURES.md` — supporting
  detail behind SUMMARY.

### Phase scope + requirements
- `.planning/ROADMAP.md` §"Phase 113: Conversion Pipeline Lock…" — Goal + Success
  Criteria SC1–SC4 (the fixed deliverables). Also §"Phase 119" for the HARN-03/HARN-04
  close-gate that folds in `check-phase-113.mjs`.
- `.planning/REQUIREMENTS.md` — PIPE-01, PIPE-02 (L19–20), the **Out of Scope** section
  (L73–77: grounded-library / Copilot Studio / SharePoint provisioning is out of scope),
  and the discuss-flags list (L55–62).
- `.planning/STATE.md` — Phase 113 pending todos (test SharePoint access; representative-set
  criteria; confirm Pandoc availability) and execution-time watch items (P-08/P-09 risks).

### Empirical open questions to RESOLVE + RECORD this phase (for Phase 114)
- Citation-title source (SharePoint Title column vs filename vs Word title property vs H1)
  — may trigger a v1.16 file-rename candidate (SUMMARY L216–217).
- `Status: Draft` = retrieval gate vs label only (SUMMARY L221) — owner decision needed
  before Phase 114 standard authoring.
- Exact `.docx` chunk-boundary behavior in the actual deployment (SUMMARY L222).
- Pandoc custom-property promotion of non-standard YAML keys (`doc_id`, `status`, etc.)
  for the pinned version (SUMMARY L220).
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/validation/*.mjs` — Node ESM validators. Established pattern: read `.md`/`.mjs`
  as UTF-8 with **CRLF→LF normalization**, regex/structure checks, and `execFileSync`
  exit-code subprocess guards. The cross-OS HARN-04 EXACT-MATCH diffs their **stdout**.
  The D-04 guard is authored to fold into a new `check-phase-113.mjs` **here** at Phase 119
  — mirror this file's shape then, but keep the Phase-113 guard **standalone**.
- `scripts/validation/_lib/frozen-at-close.mjs` — text-source SHA-pin via `git show
  <SHA>:<path>` (text only). Confirms the chain is text-source; a `.docx`-parsing guard
  does NOT belong in it now (D-04 rationale).
- `docs/_templates/` — exists; updated in Phase 114 (not this phase).

### Established Patterns
- **Validator-atom deferral:** validators are authored as one indivisible atom at their
  scheduled phase (C17 → Phase 115; `check-phase-113..119.mjs` → Phase 119). Content/pipeline
  phases hand off a **needle-spec**, not a wired validator. D-04/D-07 comply.
- **Cross-OS EXACT MATCH fragility:** the chain must stay deterministic + text-only across
  Windows and the authoritative Linux GHA runner. Introducing Pandoc/`.docx` byte-variance
  into it is the D3 rejection basis.

### Integration Points
- **Greenfield pipeline:** there is **no existing Pandoc/`.docx` tooling** anywhere in the
  repo — the conversion pipeline, `reference.docx`, and the OOXML guard are all new.
- **Corpus source:** `docs/` holds ~274 `.md` (~150 Phase-1 subset: `l1-runbooks/`,
  `l2-runbooks/`, `admin-setup-*/`, `reference/`, plus comparison/error-code docs). The
  representative set is drawn from here.
- **Environment gap:** `pandoc` is **not on PATH**; Node v24 + Python 3.13 are present.
</code_context>

<specifics>
## Specific Ideas

- The post-conversion guard's YAML-leak check operates on **unzipped `word/document.xml`
  body text**, never raw file bytes — this is the single most important implementation
  detail (a naive raw-byte scan silently passes every leaked doc because `.docx` is
  DEFLATE-compressed).
- The single-line inline header block (Platform + Doc Type first) is the grounding-necessary
  format; the representative set validates it renders as **body text**, not a Word custom
  property (ROADMAP SC4). Standard-authoring of the block itself is Phase 114.
</specifics>

<deferred>
## Deferred Ideas

- **v1.16 — file-rename pass:** if the Phase-113 grounding test finds the Copilot citation
  title derives from the SharePoint filename/page name (not H1), a descriptive-filename
  normalization pass across the corpus (SUMMARY L217; REQUIREMENTS L69). Phase 113 only
  *flags* this; it does not act on it.
- **Deployment — SharePoint content-approval:** if `Status: Draft` must actually *gate*
  retrieval (not just label), enabling + maintaining SharePoint content approval on the
  indexed library (tenant/ops config, REQUIREMENTS L70). Owner decision, informed by this
  phase's Draft-retrieval finding; belongs to deployment, not a doc change.
- **Infra — Azure AI Search structured index:** upgrade from the native knowledge source
  to an Azure AI Search + SharePoint indexer to make `platform`/`doc_type` filterable
  metadata (REQUIREMENTS L71). Out of Phase-1 scope.

None of the above are scope creep into Phase 113 — they are downstream/parallel and are
preserved here so they are not lost.
</deferred>

---

*Phase: 113-conversion-pipeline-lock-representative-set-grounding-valida*
*Context gathered: 2026-07-03*
