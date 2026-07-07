# Research Summary: v1.15 EEE SOP Documentation-Standard Retrofit

**Project:** Windows Autopilot & macOS Provisioning Documentation Suite -- v1.15 EEE SOP Retrofit
**Domain:** Markdown-sourced SOP corpus -> Copilot Studio / SharePoint grounding pipeline
**Researched:** 2026-07-03
**Confidence:** HIGH (Copilot Studio platform constraints, file-type rules, citation granularity -- all Microsoft Learn verified); MEDIUM (chunk boundary internals, citation title precedence, managed-metadata column indexing -- partially documented); LOW (exact DOCX chunking algorithm -- no public specification)

---

## Executive Summary

The v1.15 milestone is retrofitting an existing ~150-document Markdown corpus to the EEE SOP document standard so that a Copilot Studio / SharePoint agent can ground on the content and return clickable citations. Four parallel researchers converged strongly across all major findings. The central architectural fact that governs every decision in this milestone is this: **the Copilot Studio semantic index processes visible body text only.** YAML frontmatter becomes Word document properties after Pandoc conversion (not body text), and SharePoint managed-metadata column values are not read by the native knowledge-source grounding pipeline at all. The only metadata the agent will ever see is what appears as rendered prose in the .docx body. This makes the EEE bold-inline header block a retrieval-necessary load-bearing element -- not decoration -- and validates the D3-A adversarial-review winner (`# Title -> block -> ## Summary -> gate -> sections`) on grounding grounds, not just readability grounds.

The Markdown-to-.docx conversion is mandatory and must be defined, locked, and validated as a first-class early deliverable. SharePoint knowledge sources do not index .md files; .docx (or PDF) is the only supported path for the SharePoint connector. The pipeline must use Pandoc with a `--reference-doc` template that preserves Word Heading 1/2/3 styles, and a post-conversion assertion must confirm that YAML `---` delimiters do not appear in the first 500 characters of generated .docx body text. These are not implementation details -- they are preconditions without which the grounding pipeline does not function at all.

The three most actionable constraints on the EEE standard itself are: (1) the header block must be formatted as a single inline paragraph, not a multi-row Markdown table, because a table injects 10-20x more non-topical characters into the lead chunk than a single line; (2) Platform and Doc Type must be the first two fields in the block, so they survive chunk splits; and (3) only `Status: Approved` documents may be present in the indexed SharePoint library, because the `Status: Draft` body-text label is invisible to Copilot Studio citation UI -- Draft documents produce authoritative-sounding responses with no user-visible warning. The research also identified a tension between the EEE spec illustrated three-line two-column block and the single-line inline format that grounding requires; the standard author must confirm the single-line format as the canonical specification before retrofit authoring begins.

---

## Key Findings

### Stack: The Grounding Pipeline

The confirmed pipeline is: Markdown source (.md + YAML frontmatter) -> Pandoc -> .docx -> SharePoint document library -> Copilot Studio semantic index (Dataverse/Microsoft Graph) -> agent response with citation.

**Core technologies and constraints:**

- **Markdown + YAML frontmatter (source of truth):** Human-editable; validated by C10/C17 harness. YAML keys are the single source of truth from which the visible header block is derived. Authors never manually type the visible block label.
- **Pandoc (conversion step, MANDATORY):** Bridges .md to SharePoint required .docx format. Must be invoked with `--reference-doc=reference.docx` to preserve Word Heading styles. Without the reference template, all headings render as Normal paragraph style and the SharePoint indexer sees a flat wall of text with no structural chunk anchors.
- **SharePoint document library (.docx files):** The grounding store. Supported file types for the SharePoint knowledge-source connector: .doc/.docx/.ppt/.pptx/.pdf only. `.md` files are explicitly unsupported and not discovered by the connector. Confirmed: Microsoft Learn (2026-06-30) and multiple independent community reports.
- **Copilot Studio (agent layer):** Uses a built-in semantic index -- NOT SharePoint native search. The semantic index embeds body text from .docx files. Custom SharePoint managed-metadata column values are not passed to the agent in native knowledge-source mode (confirmed: Lee Ford 2026; Office365Clinic 2026-05; MS roadmap item 516044 not yet GA).
- **Dataverse / Microsoft Graph semantic index (index backend):** Chunks .docx body text at approximately 2,000 characters per chunk with 500-character overlap. Chunk boundaries are not publicly documented. The head of each chunk is the critical retrieval zone.

**What the index sees and does NOT see:**

- Indexed: H1 heading text, H2/H3 heading text, body paragraph prose, table cell text.
- NOT indexed: Word document properties (standard or custom), hidden text, comments, embedded images.
- Consequence chain: `doc_id: RE-042` in YAML frontmatter -> Pandoc -> Word custom property -> Copilot Studio semantic index -> NOT INDEXED. The only way RE-042 appears in agent responses is if it is written as visible body text in the rendered header block.

### Features: Retrieval-Friendly Document Structure

**Must-have (table stakes for acceptable grounding quality):**

- **Descriptive H1 title (not a bare code):** The Document Layout skill maps H1 to the searchable `title` index field. A bare code `# RE-042` contributes zero semantic signal. Doc IDs belong in the visible header block only.
- **H1 -> H2 -> H3 hierarchy; H1 is first non-frontmatter line:** Content before the first H1 produces an orphan chunk with no `header_1` metadata -- the worst possible retrieval chunk. H1 must be the first non-frontmatter line.
- **`## Summary` as the first H2:** Ensures the lead chunk contains the document highest-density topic signal. The embedding for the first chunk covers H1, header block, and Summary together -- maximizing cosine similarity against a wide range of operator queries.
- **One topic per document:** Existing modular corpus satisfies this; maintain during retrofit.
- **All key information as prose or table text (not images or Mermaid code fences):** SharePoint indexer does not extract text from embedded images. Mermaid fences convert to raw DSL text or PNG images -- neither grounds decision logic correctly.

**Should-have (differentiators):**

- **Single inline paragraph format for the header block:** A single pipe-separated line adds ~4% dilution to the lead chunk. A six-row Markdown table adds 10-20% dilution. The inline format is architecturally superior and must be mandated by the EEE spec. **This is in tension with the EEE spec illustrated three-line two-column block -- standard author must confirm single-line as canonical before retrofit authoring begins.**
- **Platform + Doc Type as the first two fields in the block:** Highest-discriminator fields. Survive chunk splits.
- **Normalized platform values enforced by C17 (D1 hybrid superset map):** LLM-assisted filtering works only when body-text values are consistent. Free-text variants miss LLM filter matches.
- **Descriptive H2/H3 headings:** `header_2`/`header_3` fields are independently searchable in the Azure AI Search index schema.

**Defer (not Phase-1 scope):**

- Mermaid conversion to prose (v1.16)
- Structural docs: glossaries, decision-trees, nav-hubs, lifecycle docs (v1.16)
- File naming convention review for improved citation text (v1.16 -- citation title driven by SharePoint Title column, not H1 content)
- Azure AI Search structured filtering upgrade (infrastructure complexity; not needed for Phase-1 LLM-assisted filtering)

### Architecture: Metadata Representation and Document Structure

**Recommended layout (D3-A, confirmed by all four researchers):**

The D3-A layout places the H1 descriptive title first, then the single-line bold inline header block (`**Doc ID:** RE-NNN . **Platform:** [Normalized label] . **Doc Type:** [...] . **Status:** [...] . **Owner:** [Name] . **Last Reviewed:** YYYY-MM-DD`), then `## Summary` with 2-4 sentences of scope/audience/safety content, then an optional gate blockquote (<=2 lines / <=200 characters), then the content section H2s.

**Component responsibilities:**

1. **YAML frontmatter (harness layer, not retrieval layer):** Carries `doc_id`, `status`, `owner`, `doc_type`, `last_verified`, `review_by`, `applies_to`, `audience`, `platform`. Becomes Word document properties after Pandoc -- invisible to grounding index. C10 validates shape; C17 derives the visible block from these values.

2. **Visible body header block (retrieval layer):** The only metadata the agent sees. Rendered FROM frontmatter keys, not authored independently. C17 asserts every rendered field matches the corresponding frontmatter value, with Platform derived via the D1 normalization map. C17 FAILS on any unmapped `platform` value -- no silent fallback.

3. **Doc ID Registry (`docs/_registry/RE-index.md`):** Flat table mapping RE-NNN -> file path, title, status, doc type, supersedes. MUST live OUTSIDE the grounded SharePoint library. If included in the knowledge source, queries about a specific document return the registry row instead of document content.

4. **Superseded documents:** Primary control is scope exclusion -- move to an archive library not connected to the agent. A SharePoint column alone is invisible to grounding. During transition: add `**Status:** Superseded -- see RE-NNN` to visible block body text. New document includes `**Supersedes:** RE-NNN` in its block.

5. **Post-conversion validation (pipeline gate):** After each Pandoc conversion, assert: (a) no `---` YAML delimiter in first 500 characters of .docx body text; (b) sample files have Word Heading 1/2/3 paragraph styles applied (not Normal) for `#`/`##`/`###` converted headings.

### Critical Pitfalls

The four researchers identified 11 pitfalls. The six with immediate Phase-1 impact:

1. **.md files not indexed by SharePoint connector (P-07, CRITICAL):** Not discovered by the Copilot Studio SharePoint knowledge-source connector. MD->docx conversion must be the first deliverable.

2. **YAML frontmatter leaking as body text (P-08, HIGH):** Without correct Pandoc flags, raw YAML block appears verbatim in Word document body. Post-conversion validation must assert no `---` delimiter in first 500 chars. Affects all 150+ documents simultaneously if misconfigured.

3. **Heading styles lost in conversion (P-09, HIGH):** Without `--reference-doc` template, headings render as bold Normal paragraphs. Indexer sees a flat document with no structural chunk anchors.

4. **Large tables fragment across chunk boundaries (P-02, HIGH for reference docs):** A five-platform capability matrix with 30+ rows easily exceeds the ~2,000-character chunk window. Body rows land in a different chunk from the header row; retrieved chunks contain data cells without column labels. Prevention: cap tables at ~25 rows; require prose summary paragraph within 5 lines of every table. Both C17-lintable.

5. **Draft documents produce authoritative citations with no UI warning (P-06 Sub-risk A, MEDIUM-HIGH):** The agent retrieves Draft-status documents without surfacing draft status to the user. Only `Status: Approved` documents may be in the indexed library. C17 must assert `status: approved` for all docs in the production library path.

6. **Images and Mermaid fences produce unindexed content (P-01, P-10, CRITICAL for affected docs):** Images in .docx files are not OCR processed by the SharePoint indexer. Mermaid fences convert to raw DSL or PNG -- neither grounds correctly. Phase-1 must enforce no new Mermaid fences via C17.

---

## Implications for Roadmap

### Phase 113 -- Conversion Pipeline Definition and Lock

**Rationale:** The MD->docx pipeline is a precondition for everything else. If misconfigured, all 150+ documents are corrupted simultaneously. Must be established, documented, and validated before any document receives the EEE header retrofit.

**Delivers:**
- Pandoc version pinned in pipeline
- `reference.docx` template with Heading 1/2/3 styles defined
- Exact conversion command documented (`pandoc input.md -o output.docx --reference-doc=reference.docx`)
- Post-conversion validation script: asserts no `---` in first 500 chars of .docx body; asserts Heading styles in a sample
- 3-5 representative docs converted, uploaded to test SharePoint library, queried via live Copilot Studio -- confirms end-to-end grounding before full corpus retrofit
- Deployment policy documented: only .docx files in indexed library; Draft docs excluded

**Pitfalls avoided:** P-07 (.md files not indexed), P-08 (YAML frontmatter leak), P-09 (heading styles lost)

**Research flags:** NEEDS empirical grounding validation. Chunk boundary behavior, citation title source, and YAML-leak confirmation cannot be resolved from documentation alone. Requires live Copilot Studio access. Only phase requiring live platform testing.

---

### Phase 114 -- EEE Standard Document + Doc ID Registry

**Rationale:** The written EEE standard and canonical templates must be locked before authors retrofit documents. Doc ID Registry sequence must be confirmed (starting RE-001) before any IDs are assigned.

**Delivers:**
- `docs/_standards/EEE-SOP-standard.md` with all research-confirmed constraints
- Updated `docs/_templates/` (L1 Runbook, L2 Runbook, Admin Setup, Reference) born conformant; new docs default `Status: Draft`
- `docs/_registry/RE-index.md` outside the indexed SharePoint library
- D1 platform normalization map documented in the EEE standard
- Header block format locked as single inline paragraph (resolves three-line two-column block tension)
- C10 lenient-unknown-key precondition verification completed

**Research flags:** Standard patterns; no research phase needed.

---

### Phase 115 -- C17 Harness Check (Validator Atom)

**Rationale:** C17 must be authored as one indivisible atom before any retrofitted document is merged. Content phases hand off a needle-spec only; the validator is a single indivisible atom per the v1.13 validator-atom deferral pattern.

**Delivers:** `C17` blocking harness check covering all assertions in the C17 Lint Surface section below. Integrated into Phase-1 close gate.

**Research flags:** Standard harness patterns; no research phase needed.

---

### Phase 116-N -- Corpus Retrofit (Three Document Classes)

**Rationale:** Three classes in dependency order: (1) L1/L2 runbooks (~75 docs) -- highest operator impact, first; (2) admin-setup guides (all platforms); (3) reference docs (~26 docs) -- last because they contain the large capability tables most at risk from P-02.

**Each retrofit phase delivers:**
- EEE header block retrofitted (Doc ID from registry, platform normalized via D1 map, Status = Approved for live docs)
- D3-A structure: `# Title -> block -> ## Summary -> gate -> sections`
- Version-History row: "v1.15 EEE reformat -- content not re-reviewed"
- `Last Reviewed` carries `last_verified` verbatim (D2-A)
- Runbook Summaries open with one-line scope/safety banner
- Reference docs: table row caps enforced (~25 rows), prose summaries added per table
- C17 green for every file in the batch before phase close

**Research flags:** Standard authoring patterns. No research phase needed per doc class.

---

### Phase N+1 -- Grounding Validation Gate + 13th Path-A Harness Lineage Bump

**Rationale:** Grounding validation is a Phase-1 CLOSE requirement. The converted + uploaded corpus must be queried via live Copilot Studio. This catches YAML leak residue, heading-style loss, and unexpected chunk splits invisible from Markdown source inspection. The frozen-surface re-baseline is the dominant technical risk -- first milestone to deliberately re-pin all Phase-1 frozen surfaces at once.

**Delivers:**
- Live Copilot Studio grounding validation: doc-by-ID retrieval, platform-scoped queries, capability-matrix queries, status queries
- Empirical resolution of citation title source open question
- `v1.15-milestone-audit.mjs` (C1-C17) + `v1.15-audit-allowlist.json` + BASELINE_19
- `check-phase-113..N.mjs` per-phase validators
- `_lib/frozen-at-close.mjs` V114 pin (v1.14 close-gate SHA `7d922a7`)
- 12th parallel CI coexistence workflow
- 3-axis terminal re-audit close (fresh clone + cross-OS Linux GHA + fresh sub-agent)
- Frozen-surface re-baseline: apex + continuity chain validators green together atomically

**Research flags:** NEEDS grounding validation query design. Harness lineage bump follows standard patterns.

---

### Phase Ordering Rationale

- Pipeline -> standard -> harness check -> corpus retrofit is an inviolable dependency chain.
- Grounding validation belongs at close (Phase N+1), not at start -- real documents must be in the index to query. Phase 113 early test (3-5 docs) de-risks the pipeline; Phase N+1 validates the full corpus.
- Reference docs retrofit last due to P-02 table-chunking severity.
- Frozen-surface re-baseline must be handled atomically at close -- apex + continuity chain validators green together per v1.12-v1.14 precedent.

---

## C17 Lint Surface

The research implies the following machine-checkable assertions. This is the needle-spec for the C17 validator atom:

| # | Assertion | Source |
|---|-----------|--------|
| 1 | No Mermaid code fences in Phase-1 corpus files | P-10; FEATURES.md anti-features |
| 2 | H1 is present exactly once and is the first non-frontmatter line | FEATURES.md; ARCHITECTURE.md D3-A |
| 3 | H1 content does NOT match bare doc-ID pattern (`^RE-\d+$` or equivalent) | FEATURES.md Finding 5 |
| 4 | `## Summary` is the first H2 in the document body (no intervening H2/H3 between block and Summary) | FEATURES.md; ARCHITECTURE.md C17 shape |
| 5 | `## Summary` section contains >=30 words of content prose | PITFALLS.md P-05; FEATURES.md MVP criteria |
| 6 | Header block is a single inline paragraph, NOT a Markdown table (no pipe-dash-pipe row follows the block line) | FEATURES.md anti-features; ARCHITECTURE.md Q2 |
| 7 | Platform and Doc Type appear before Owner and Last Reviewed in the block | ARCHITECTURE.md Q2 mitigation; STACK.md Finding 7 |
| 8 | Required frontmatter keys present: `doc_id`, `status`, `owner`, `doc_type`, `last_verified` | ARCHITECTURE.md C17 shape; FEATURES.md MVP criteria |
| 9 | Each visible block field matches the corresponding frontmatter value; Platform derived via D1 normalization map | ARCHITECTURE.md C17 shape |
| 10 | Platform frontmatter value is in the D1 normalization map -- FAIL on any unmapped value (no fallback) | ARCHITECTURE.md Q5; STACK.md |
| 11 | Any Markdown table exceeding 25 rows has a prose summary paragraph within 5 lines of the closing table delimiter | PITFALLS.md P-02; FEATURES.md MVP criteria |
| 12 | Gate blockquote (if present) is <=200 characters | PITFALLS.md P-06 Sub-risk B |
| 13 | `status` value is from the controlled set: Draft, Approved, or Superseded | ARCHITECTURE.md C17 shape |

---

## Verify at Plan Time / Open Questions

| Question | Why Unknown | How to Verify / Decision Required | Phase |
|----------|------------|----------------------------------|-------|
| Citation title source: SharePoint Title column vs. filename vs. Word title property vs. H1 content | Microsoft Learn is silent on exact precedence | Empirical: upload test .docx with mismatched values; check citation label in agent response | Phase 113 grounding gate |
| Whether a filename->H1 alignment pass improves citation readability | Citation text likely filename-driven; current filenames may produce poor citation labels | If confirmed: flag as v1.16 candidate; do not block Phase-1 retrofit | Phase 113 -> v1.16 decision |
| Status-as-retrieval-gate vs. label only: should `Status: Draft` prevent indexing, or only label docs? | EEE `status:` body text does NOT prevent indexing; only SharePoint content-approval prevents crawl; Copilot Studio semantic index vs. content-approval not confirmed | Owner decision required before Phase 114 EEE standard authoring | Phase 114 |
| Deployment mode: Dataverse upload vs. SharePoint connector | Affects sync frequency, file count limits, and citation behavior | Confirm with Copilot Studio agent owner before Phase 113 conversion test | Phase 113 |
| Pandoc custom-property promotion for non-standard YAML keys (`doc_id`, `status`, `owner`, `doc_type`) | Version-specific; tracked in open Pandoc issue #3034 (2016) | Pin pandoc version; test custom property output with `doc_id:` in YAML | Phase 113 |
| Whether Copilot Studio semantic index excludes SharePoint content-approval draft/pending items | Documented for SharePoint search; semantic index behavior not stated in Microsoft Learn | Enable content approval on test library; upload doc as pending; query agent | Phase 113 (if status-as-gate = YES) |
| Exact chunk boundaries for .docx in the actual deployment configuration | No public specification; ~2,000 chars is default but deployment-specific config may differ | Empirical: ask narrow questions about content at specific positions in a test SOP | Phase 113 grounding gate |

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| MD->docx pipeline is mandatory | HIGH | Multiple independent Microsoft Learn sources + community confirmation; .md unsupported by SharePoint connector |
| YAML frontmatter not indexed | HIGH | Pandoc behavior documented; semantic index confirmed to process body text only |
| SharePoint managed-metadata columns not indexed | HIGH | Lee Ford 2026; Office365Clinic 2026-05; corroborated by MS Learn semantic index docs; roadmap item 516044 not GA |
| .docx citations document-level only (no section anchors) | HIGH | Microsoft Learn explicit; .docx exclusion from page-level citations confirmed |
| Large tables fragment across chunk boundaries | HIGH | Copilot Studio community guide; RAG literature consensus; ~2,000-char chunk size confirmed |
| Only Approved docs in indexed library | HIGH (deployment policy); MEDIUM (Copilot Studio UI treatment of Draft body-text label) | SharePoint content-approval docs HIGH; agent UI treatment of Draft label MEDIUM |
| Header block single-line inline format benefit | MEDIUM | Derived from Document Layout skill output schema + chunk size analysis; not directly measured |
| Citation title source | MEDIUM | Community evidence + architecture inference; no single definitive Microsoft Learn statement |
| Exact chunk boundary behavior | LOW | No public specification; empirical verification required at Phase 113 |

**Overall confidence:** HIGH for architectural constraints (pipeline mandatory, YAML invisible, body-text-only grounding, document-level citations). MEDIUM for exact format optimization claims. LOW for chunk internals.

### Gaps to address during planning

- Citation title source: determine at Phase 113 live grounding test; may trigger a v1.16 file-rename scope item.
- Status-as-gate vs. label-only: owner decision required before Phase 114; impacts whether SharePoint content-approval must be enabled on the library.
- Pandoc version: pin before pipeline authoring; custom key promotion is version-specific.

---

## Sources

### Primary (HIGH confidence -- Microsoft Learn, verified 2026-07-03)

- [Add unstructured data as a knowledge source](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-unstructured-data) -- file types, page-level PDF citations -- 2026-06-11
- [Upload files as a knowledge source](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload) -- .md support (Dataverse only), file types -- 2026-04-22
- [Add SharePoint as a knowledge source](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint) -- .docx/.pdf only for SharePoint connector -- 2026-06-30
- [Quotas and limits](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas) -- file size/count limits, sync frequency -- 2026-06-30
- [Azure AI Search: Chunk and Vectorize by Document Layout](https://learn.microsoft.com/en-us/azure/search/search-how-to-semantic-chunking) -- heading-boundary chunking, header_1/2/3 index fields -- 2026-06-08
- [Azure AI Search: Document Layout Skill](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout) -- pre-heading orphan chunk behavior -- 2026-07-02
- [M365 Copilot Extensibility: Optimize Content Retrieval](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/optimize-content-retrieval) -- 36,000-character document limit -- 2025-08-07
- [Optimizing SharePoint content for Employee Self-Service agents](https://learn.microsoft.com/en-us/copilot/microsoft-365/employee-self-service/optimization-sharepoint) -- summary-first structural guidance -- 2026-06-04
- [Semantic indexing for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/microsoftsearch/semantic-index-for-copilot) -- body text indexed; custom properties not indexed -- 2026-04-23
- [Draft items not crawled in SharePoint](https://support.microsoft.com/en-us/office/draft-items-are-not-crawled-in-sharepoint-9198c307-13d6-425c-a174-542a60e410e4)
- [Pandoc User Guide](https://pandoc.org/MANUAL.html) -- YAML metadata blocks, Word document properties, --reference-doc behavior

### Secondary (MEDIUM confidence)

- [SharePoint Knowledge Sources: The Metadata Problem -- Lee Ford (2026)](https://www.lee-ford.co.uk/posts/sharepoint-knowledge-sources-in-copilot-studio-the-metadata-problem/)
- [Filtering SharePoint Custom Metadata in Copilot Studio -- Office365Clinic (2026-05-12)](https://www.office365clinic.com/2026/05/12/sharepoint-custom-metadata-copilot-studio/)
- [Copilot Studio + SharePoint: .md Files -- MS Community Hub (2026)](https://techcommunity.microsoft.com/discussions/copilot-studio/copilot-studio--sharepoint-markdown--md-files-in-doc-libraries-supported-as-know/4517314)
- [Copilot-Studio knowledge limitations guide -- Rickcau (2026)](https://github.com/Rickcau/Copilot-Studio/blob/main/Knowledge_Source_Limitations_Solutions/copilot-studio-knowledge-limitations-guide.md)
- [23 RAG Pitfalls and How to Fix Them -- nb-data.com](https://www.nb-data.com/p/23-rag-pitfalls-and-how-to-fix-them)
- [RankRAG -- NeurIPS 2024](https://proceedings.neurips.cc/paper_files/paper/2024/file/db93ccb6cf392f352570dd5af0a223d3-Paper-Conference.pdf)
- [Pandoc GitHub Issue #3034](https://github.com/jgm/pandoc/issues/3034)

---

*Research synthesized: 2026-07-03*
*Ready for roadmap: yes*
*Phase numbering: v1.15 starts at Phase 113 (continues from v1.14 close at Phase 112)*
