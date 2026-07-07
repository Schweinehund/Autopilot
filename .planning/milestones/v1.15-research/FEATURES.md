# Feature Research: Retrieval-Friendly Document Structure for RAG/Copilot Studio

**Domain:** Markdown SOP corpus retrofit for LLM knowledge-base grounding (Copilot Studio / SharePoint)
**Researched:** 2026-07-03
**Confidence:** HIGH (Microsoft Learn official docs); MEDIUM (RAG best-practice literature)
**Downstream consumer:** Requirements author + roadmapper for v1.15 EEE SOP retrofit

---

## Preamble: How to Read This File

The five research questions map directly to the five findings sections below. The "Feature Landscape" tables then reframe each structural pattern as a retrieval feature — table stakes vs. differentiators vs. anti-features — with evidence grade and an explicit implication for the EEE standard and its retrofit acceptance criteria.

**Evidence grades:**
- **STRONG** — direct official Microsoft Learn guidance (Azure AI Search, Copilot Studio, M365 Copilot extensibility docs); verified against sources updated 2025-2026
- **MEDIUM** — multiple credible sources corroborate but no single authoritative Microsoft statement; or mechanism is clearly derivable from official docs but not stated explicitly
- **WEAK** — single source or reasoning from first principles; flag for later validation

---

## Finding 1: Summary / Abstract as First Content Block

**Verdict: CONFIRMED positive signal; mechanism is embedding density, not a magic bullet. Evidence grade: MEDIUM-STRONG.**

**The mechanism.** Azure AI Search's Document Layout skill (current recommendation: the newer Content Understanding skill) chunks document content along heading boundaries, producing one chunk per Markdown section. When that first H2 chunk is a 2-4 sentence focused summary of the document topic, the embedding vector for that chunk is dense with the document's key concepts. The result is a higher cosine similarity against a wide range of user queries whose vocabulary overlaps the topic domain.

**Official source.** The Azure AI Search semantic chunking guidance (learn.microsoft.com/azure/search/search-how-to-semantic-chunking, updated 2026-06-08) states: "when those chunks are of higher quality and semantically coherent, the overall relevance of the query is improved." The Document Layout skill's design is explicitly optimized around semantically coherent sections — the `## Summary` pattern directly feeds this design.

**Corroborating evidence.** RAG chunking literature (multiple practitioner sources, MEDIUM) consistently reports that the retrieval precision of a chunk correlates with its topical focus. A 2-4 sentence summary is maximally focused by design.

**Caveat.** No controlled A/B study comparing "Summary-first vs. no Summary" on SharePoint + Copilot Studio specifically has been published. The mechanism is well-grounded in how embedding retrieval works but the effect size is unquantified for this exact stack.

**Additional benefit specific to runbooks.** The EEE requirement that runbook Summaries open with a "one-line scope/safety banner" (naming procedure domain + platform + safety posture) further concentrates the first chunk's embedding signal, making it maximally discriminating between similar runbooks covering related but distinct scenarios. This is a structural advantage that goes beyond a generic "summary is good" claim.

**Implication for EEE standard:** The `## Summary` mandate is well-grounded and should be retained as a blocking requirement. The one-line scope/safety banner for runbook Summaries is a differentiating pattern worth keeping in the spec.

**Implication for retrofit acceptance criteria:** C17 must assert that `## Summary` is present as the first H2 following the bold header block. The Summary must be 2-4 sentences. This is a blocking gate.

---

## Finding 2: Heading Hierarchy and One-Topic-Per-Document

**Verdict: CRITICAL structural requirement; heading hierarchy is the primary chunk-boundary mechanism in the Azure AI Search stack. Evidence grade: STRONG.**

**Heading hierarchy as chunk-boundary driver.** The Azure AI Search Document Layout skill maps heading levels to separate, independently searchable index fields: `title` (from H1), `header_1`, `header_2`, `header_3` (from H2/H3 headings). These fields are attached to every chunk produced from that section. Each H2 boundary creates a new chunk and resets the section context. A document with a clean H1 → H2 → H3 hierarchy produces chunks that are each topically coherent and carry accurate heading lineage metadata.

**Source for this.** The Document Layout skill index schema (learn.microsoft.com/azure/search/search-how-to-semantic-chunking, updated 2026-06-08) shows the explicit `header_1`, `header_2`, `header_3` fields as searchable in the index — a query for "TPM reset" can match via the `header_2` field even if the term appears only in the heading, not the body.

**Kitchen-sink dilution problem.** When a single document contains multiple distinct procedures under one H2, the chunk covering that H2 encompasses multiple topics. The embedding vector for that chunk represents a blend of relevance signals, reducing cosine similarity against any single query about one of the procedures. This is the classic multi-topic embedding dilution problem documented in RAG chunking literature (multiple practitioner sources, STRONG consensus).

**Official Microsoft size guidance.** The M365 Copilot extensibility guidance (learn.microsoft.com/microsoft-365/copilot/extensibility/optimize-content-retrieval, updated 2025-08-07) explicitly states: keep SharePoint files to a maximum of 36,000 characters (~15-20 pages). Files larger than this cause Copilot to have trouble identifying the right content. This upper bound enforces one-topic-per-document as a natural consequence for SOP runbooks.

**Implication for EEE standard:** The one-topic-per-document principle and the H1 → H2 → H3 hierarchy mandate are both well-grounded. H2 headings must be descriptive procedure/section names (not generic labels) so that `header_2` field queries are useful.

**Implication for retrofit acceptance criteria:** C17 must assert that H1 appears exactly once as the first non-frontmatter line. All content sections must be at H2 or lower. H1-level prose (content that appears between the H1 and the first H2, other than the bold header block and Summary) is a smell worth flagging. This is a blocking gate.

---

## Finding 3: Optimal Chunk Size and Whether ~150 Modular Docs Are Well-Sized

**Verdict: The 150-doc modular corpus is architecturally correct for RAG. Individual doc length is the key lever. Evidence grade: STRONG (size limit), MEDIUM (doc count).**

**Official size limits (STRONG).** Microsoft M365 Copilot extensibility guidance sets a concrete upper bound: 36,000 characters (~15-20 pages) per file for SharePoint knowledge sources. Above this, Copilot has "trouble identifying the right content." For embedded file content (files uploaded directly rather than linked from SharePoint), the indexing limit is 750-1,000 pages, but the same 36,000-character practical guidance applies for retrieval quality.

**Internal chunking by the Azure AI stack.** After the Document Layout skill segments the document by heading boundaries, the Text Split skill further constrains each section: default maximum 2,000 characters per chunk, 500 characters overlap. The Content Understanding skill defaults to 500 tokens per chunk. Within a 36,000-character document, this produces roughly 15-20 semantically coherent chunks, each covering one procedure step or troubleshooting scenario. This is the optimal granularity range for RAG retrieval.

**Why 150 separate docs beats one monolith (MEDIUM, derived from architecture).** A single 150-procedure "master runbook" would exceed the 36,000-character limit, produce embedding-diluted chunks, and offer no citation precision — the citation would point to the whole document. 150 separate files each produce precise citations at the file level, and Copilot Studio citations link directly to the specific document. The modular corpus structure is the correct architecture for this use case.

**Implication for EEE standard:** No change to corpus granularity is needed. The retrofit is an envelope change only. Any document already over ~36,000 characters should be flagged during retrofit for possible splitting, but this is expected to be rare given the existing modular design.

**Implication for retrofit acceptance criteria:** An informational check (not necessarily C17-blocking) could flag documents over 36,000 characters. If added to the harness, it should be a warning, not a hard fail, to avoid blocking retrofit of otherwise-conformant docs that are marginally over the size limit.

---

## Finding 4: Metadata Header Block and First-Chunk Dilution

**Verdict: Pre-H1 content is the danger zone. Post-H1/pre-H2 content is a mild risk, well-mitigated by the EEE structure. The D3 decision (H1 → block → Summary) is the correct mitigation. Evidence grade: STRONG for the pre-H1 danger; MEDIUM for the dilution magnitude estimate.**

**How the Document Layout skill handles pre-heading content (STRONG from official schema).** The skill's output schema (learn.microsoft.com/azure/search/cognitive-search-skill-document-intelligence-layout, updated 2026-07-02) shows that each chunk carries a `sections` dictionary with `h1`, `h2`, `h3` keys reflecting the heading lineage of that chunk's position in the document. Content that appears before the first detected heading produces a chunk with an empty or null `sections` dictionary — it is an orphan chunk with no heading metadata. This is the worst possible first chunk: it has no searchable heading fields and contains whatever text appears before the first heading. If a metadata block (Doc ID / Platform / Owner / Last Reviewed / Status) appears before the H1, it forms exactly this orphan chunk.

**Risk assessment for the EEE structure: H1 → bold block → ## Summary → sections.** The bold header block appears between the H1 and the first H2. In the Document Layout skill's output, this content is part of the H1 section — it carries `header_1 = "[descriptive title]"` but no `header_2`. The bold block text and the Summary text share the first content chunk. The risk is that 5-6 metadata labels (Doc ID, Platform, Owner, etc.) are embedded alongside the Summary text, adding approximately 50-80 non-topical characters to the first chunk.

**Assessment of severity: LOW, well-mitigated.** At the 2,000-character chunk budget, 80 non-topical characters is 4% dilution. This is materially less harmful than the alternative designs:
- A full metadata table before the H1 would create an orphan chunk with 0% topical content and 0% heading metadata.
- A 10-15 row Markdown table between H1 and Summary would add ~400 non-topical characters (20% dilution) while also breaking the rendering of the visible block into a table format that the Document Layout skill may parse differently.

**YAML frontmatter handling.** If documents are stored as raw .md files in a SharePoint document library (rather than as SharePoint pages), the YAML frontmatter block (`---\nkey: value\n---`) may appear as literal text in the indexed content, depending on whether the SharePoint indexer strips YAML delimiters. The EEE design decision to keep YAML frontmatter as machine-only (for harness/tooling) and render the visible block from those keys correctly separates machine metadata from indexed content. However, the SharePoint-specific handling of raw .md frontmatter should be verified against the actual deployment environment.

**Implication for EEE standard:** The D3 structure (H1 → one-line inline bold block → ## Summary → sections) is the correct mitigation. The critical constraint is that the bold block must be formatted as a single inline paragraph (pipe-separated on one line), not as a multi-line Markdown table. A single inline line adds ~4% dilution; a table would add 10-20x more.

**Implication for retrofit acceptance criteria:** C17 must assert: (a) H1 is the first non-frontmatter line; (b) the bold header block is a single inline paragraph (not a table — can be detected by checking that no `|---|` row follows the block); (c) `## Summary` is the first H2. These are all in scope for C17.

**Open question for Phase-1.** Verify whether the SharePoint document library hosting these docs strips YAML frontmatter before indexing. If it does not strip it, the frontmatter text appears in the indexed document, adding ~100-150 non-topical characters before the H1. This would be a meaningful dilution source that needs a mitigation (e.g., SharePoint page authoring instead of raw .md file upload, or confirming that the MS Graph indexer handles YAML frontmatter).

---

## Finding 5: Descriptive H1 Titles vs. Bare Codes for Citation Click-Through

**Verdict: Descriptive H1 titles improve both retrieval signal and citation intelligibility. Bare codes are harmful on both dimensions. Evidence grade: STRONG for retrieval; MEDIUM for citation text display.**

**Retrieval dimension (STRONG).** The Azure AI Search Document Layout skill maps H1 content to the `title` index field, which is a fully searchable field in the Azure AI Search schema (confirmed from the official index schema in the semantic chunking docs). A descriptive H1 such as "Troubleshoot macOS Platform SSO Registration Failures" provides keyword and semantic retrieval signals that match natural operator queries. A bare code H1 such as "RE-042" contributes zero semantic signal. No L1/L2 operator will search for "RE-042" unless they already know the doc ID — in which case they don't need retrieval assistance.

**Citation dimension (MEDIUM from community evidence + architecture inference).** For Copilot Studio agents grounded in SharePoint knowledge sources, the displayed citation text is drawn from the SharePoint document or page title property (derived from the file name or SharePoint page Title field). For SharePoint pages, the page title is the primary citation anchor. A descriptive page title produces a readable citation ("Troubleshoot macOS Platform SSO Registration Failures") vs. an unreadable one ("RE-042" or "l2-runbook-027"). Community evidence (Power Platform community, Microsoft Q&A threads) confirms that citation title = SharePoint document/page name, not H1 content extracted from the file.

**Distinction: clickability vs. title text.** For properly indexed SharePoint files, the citation link is always clickable regardless of the H1 title — the link points to the SharePoint URL. The benefit of a descriptive title is the *text* shown in the citation, which drives user trust and click-through behavior. L1 operators click citations whose titles signal relevance ("Troubleshoot macOS Platform SSO Registration Failures") and skip citations they cannot decode ("RE-042"). This is a usability and adoption concern, not a technical indexing concern.

**Implication for EEE standard:** The requirement for a descriptive H1 title is well-grounded on both the retrieval dimension (searchable `title` field) and the citation usability dimension. Doc IDs (RE-NNN) belong in the bold header block — they serve as machine-readable identifiers and human cross-references, not as document titles.

**Implication for retrofit acceptance criteria:** C17 must assert that the H1 is not a bare Doc ID code (i.e., H1 content must not match `^RE-\d+$` or similar). A companion length/specificity heuristic (H1 must be at least N words long) is a useful quality gate. The EEE spec should state explicitly: "H1 must be a full descriptive title. Doc IDs appear in the bold header block only."

**Adjacent open question.** The current corpus uses file names like `15-macos-company-portal-sign-in.md`. The citation text in Copilot Studio derives from the SharePoint file name or page title, not from the H1. A separate file naming convention review (making file names more descriptive, or ensuring SharePoint page titles are set from H1 content) would further improve citation readability — but this is a v1.16 consideration, not a Phase-1 retrofit requirement.

---

## Feature Landscape

### Table Stakes (Retrieval Features Every Doc Must Have)

These are structural properties a knowledge-base doc must have for Copilot Studio / SharePoint RAG to function at acceptable quality. Missing any of these produces worse retrieval than is achievable.

| Structural Pattern | Why Expected | Evidence Grade | EEE Standard Implication | Retrofit Acceptance Criteria Impact |
|--------------------|--------------|----------------|--------------------------|-------------------------------------|
| **Descriptive H1 title** (not a bare code, not a filename) | Mapped to searchable `title` field in Azure AI Search; citation text intelligibility depends on it | STRONG (retrieval); MEDIUM (citation text) | H1 must be full descriptive title; Doc ID goes in bold header block | C17 must reject H1 matching bare code pattern; length heuristic recommended |
| **H1 → H2 → H3 hierarchy** (H1 is title only; all content at H2+) | Document Layout skill chunks on heading boundaries; clean hierarchy = clean, topically coherent chunks | STRONG | H1 appears exactly once as first line; no prose at H1 level except what is explicitly allowed (bold block follows H1) | C17 must assert H1 appears exactly once; assert first heading is H1 |
| **`## Summary` as first H2 section** | First content chunk has highest keyword density for the document topic; improves cosine similarity across query vocabulary | MEDIUM-STRONG | `## Summary` is the first H2 after the bold header block; 2-4 sentences required | C17 must assert `## Summary` appears as first H2 |
| **One topic per document** | Multi-topic embedding dilution reduces retrieval precision; Copilot can only cite the file, not the relevant sub-section | STRONG | Existing modular corpus already satisfies this; maintain during retrofit | Audit for outliers during Phase-1; flag any multi-procedure docs for possible split |
| **Document length ≤ 36,000 characters** | Official Microsoft Copilot content-retrieval limit for SharePoint knowledge sources; above this, Copilot has trouble finding right content | STRONG (Microsoft official) | Not a new EEE requirement; existing corpus expected to comply | Informational audit check; flag outliers; splitting is v1.16 scope |
| **Prose text for all key information** (no key info trapped in images, tables-as-pictures, code-fenced diagrams) | Azure AI Search cannot extract text from images; Microsoft explicitly states Copilot cannot parse "tables and other special formatting" | STRONG (Microsoft explicit) | Already mandated by EEE "text as text" principle | Verify during retrofit; Mermaid diagram collision deferred to v1.16 |

### Differentiators (Structural Patterns That Improve Retrieval Beyond Baseline)

These improve precision, citation usability, or answer quality beyond the baseline table stakes.

| Structural Pattern | Value Proposition | Evidence Grade | EEE Standard Implication | Retrofit Acceptance Criteria Impact |
|--------------------|-------------------|----------------|--------------------------|-------------------------------------|
| **Scope/safety banner as first sentence of runbook Summary** | Single focused sentence naming procedure domain + platform + safety posture concentrates first-chunk embedding signal and discriminates between similar runbooks | MEDIUM (EEE-specific design grounded in embedding theory) | Already mandated for runbook Summaries; retain in spec | Verify during retrofit; quality gate, not hard blocker |
| **Frontmatter as machine-only; visible block rendered from frontmatter keys** | Separates machine metadata from indexed content; prevents YAML key-value pairs from appearing as indexed prose | MEDIUM (design pattern; recommended by AI Search practitioners for metadata separation) | D2/D3 decisions already implement this correctly | C10 lenient-unknown-key precondition verifies the frontmatter shape; C17 verifies the rendered block |
| **Single-line inline bold header block** (not a multi-line Markdown table) | Limits metadata-text dilution of first content chunk to ~4%; a table would increase dilution to 10-20% | MEDIUM (derived from Document Layout skill output schema and chunk size analysis) | EEE spec must specify inline format, not table; one pipe-separated line | C17 should assert no table follows the bold block line |
| **Descriptive H2/H3 headings** (procedure-named, not generic labels like "Details" or "Overview") | `header_2`/`header_3` fields are independently searchable in Azure AI Search; a query can match via heading even if the term is not in the chunk body | STRONG (derived from index schema architecture) | Style requirement for heading wording; not a C17 blocker | Quality gate; include in EEE writing style guidance |
| **Short paragraphs** (≤ 4-5 sentences per paragraph) | Azure AI Search Text Split respects sentence boundaries within the chunk window; shorter paragraphs produce cleaner chunk splits each covering one thought | MEDIUM (RAG chunking literature consensus) | Style guidance only; not an EEE structural requirement | No acceptance criteria impact; writing guidance |

### Anti-Features (Structural Patterns That Harm Retrieval or Citations)

These are patterns that seem reasonable but actively reduce RAG quality. The EEE standard is correct to forbid or constrain each.

| Anti-Feature | Why Harmful | Evidence Grade | EEE Mitigation | Retrofit Gate |
|--------------|-------------|----------------|----------------|---------------|
| **Bare code as H1** (e.g., `# RE-042`) | Zero semantic signal in the `title` field; citation text is unreadable to operators; no vocabulary overlap with natural queries | STRONG | Descriptive H1 mandatory; Doc ID in bold header block only | C17 rejects bare-code H1 |
| **Metadata block BEFORE the H1** | Creates a pre-heading orphan chunk with no `header_1` metadata and maximum metadata-to-topical-content ratio; worst possible first chunk for retrieval | STRONG (Document Layout skill schema) | D3 decision: H1 is first non-frontmatter line; block follows H1 | C17 asserts H1 is first non-frontmatter line |
| **Multi-line Markdown table as header block** | A 5-6 row table between H1 and `## Summary` injects ~400 non-topical characters into the first content chunk (10-20x worse than a single inline line) | MEDIUM (chunk dilution analysis) | EEE spec must require single inline format | C17 asserts no table follows the bold block |
| **YAML frontmatter rendered as visible body prose** | If the SharePoint indexer does not strip YAML delimiters, raw `key: value` frontmatter lines appear in the indexed pre-H1 content, creating an orphan chunk of pure metadata noise | MEDIUM (SharePoint-specific; depends on indexer behavior) | Frontmatter is machine-only; visible block rendered separately from keys | Verify frontmatter stripping behavior for specific SharePoint deployment before Phase-2 |
| **Kitchen-sink multi-procedure documents** | Multi-topic embedding dilution; citation points to the whole file, not the relevant section | STRONG | One-topic-per-doc principle; existing corpus already correct | Audit during retrofit; flag outliers |
| **Key information in code-fenced diagrams, images, or rendered-picture tables** | Document Layout skill and Copilot's SharePoint indexer cannot extract text from these formats; information is invisible to semantic search | STRONG (Microsoft explicit guidance) | EEE "text as text" principle; Mermaid deferred to v1.16 | Verify during retrofit; flag Mermaid blocks as "text summary needed" |
| **Generic H2/H3 headings** (`## Steps`, `## Details`, `## Overview`) | `header_2`/`header_3` fields contain generic terms that match everything and discriminate nothing; heading-field keyword search becomes noise | MEDIUM | EEE style guidance for descriptive headings | Quality gate; not a C17 blocker |

---

## Feature Dependencies

```
[Descriptive H1 title]
    enables --> [Searchable title field in Azure AI Search]
    enables --> [Readable citation text in Copilot Studio]

[H1 → H2 → H3 hierarchy]
    enables --> [Structure-aware heading-boundary chunk splits]
               enables --> [Topically coherent chunks]
                              enables --> [High cosine similarity vs. operator queries]
               enables --> [Searchable header_1 / header_2 / header_3 fields]

[## Summary as first H2]
    requires --> [H1 → H2 hierarchy (above)]
    enhances --> [First chunk embedding density]
    enhances --> [Wide-query vocabulary coverage for the document]

[Single-line inline bold header block (between H1 and ## Summary)]
    requires --> [H1 precedes block (D3 structure)]
    reduces-dilution-in --> [First chunk embedding vs. multi-line table alternative]

[YAML frontmatter as machine-only]
    prevents --> [Frontmatter prose noise in pre-H1 orphan chunk]
    enables --> [C17 deterministic render of visible block]

[One-topic-per-document]
    enables --> [All chunks stay within the document's topic domain]
    prevents --> [Multi-topic embedding dilution]
```

### Dependency Notes

- **`## Summary` requires the H1 → H2 hierarchy:** A summary can only be the "first H2 section" if there IS an H2 level. The entire EEE structure depends on the heading hierarchy being correct.
- **Single-line bold block requires D3 ordering:** The block can only be "between H1 and Summary" if H1 precedes it. Any structure that puts metadata before H1 breaks the Document Layout skill's heading-ancestry chain for the first chunk.
- **YAML-as-machine requires the C10 harness precondition:** C17 can only safely render the visible block from frontmatter keys if C10 has verified the frontmatter shape is valid. The C10 → C17 precondition chain is architecturally correct.

---

## MVP Definition for Retrofit Acceptance

### Blocking Requirements (C17 Hard Fails — Every Retrofitted Doc Must Pass)

- [ ] H1 is the first non-frontmatter line; H1 content is a full descriptive title, not a bare code (not matching `^RE-\d+$` or equivalent)
- [ ] Bold header block appears after H1 and before `## Summary`; it is a single inline paragraph (no table rows)
- [ ] `## Summary` is the first H2 in the document body
- [ ] All content sections are at H2 or lower (no prose in the H1 gap other than the bold block)
- [ ] YAML frontmatter present with `doc_id`, `status`, `owner`, `doc_type`, `last_verified` keys; visible block rendered from those keys (not duplicated as separate prose in the document body)
- [ ] `Status: Approved` for all retrofitted docs (already-live docs); `Status: Draft` for new docs born post-retrofit

### Quality Gates (Informational — Should Pass; Log for Follow-Up If Failing)

- [ ] Document length ≤ 36,000 characters (flag outliers for possible v1.16 split)
- [ ] H2 headings are descriptive procedure/section names, not generic labels
- [ ] Runbook Summaries open with a one-line scope/safety banner naming procedure domain + platform + safety posture
- [ ] No Markdown tables immediately following the bold block line (detect table-as-block anti-pattern)

### Explicitly Out of Scope for Phase-1 Retrofit

- Mermaid diagram conversion to text alternatives (deferred to v1.16 — EEE "text as text" vs. existing Mermaid diagrams is a known collision)
- Structural docs (glossaries, decision-trees, nav-hubs, lifecycle docs): deferred to v1.16
- File naming convention review for improved citation text (file name → descriptive title alignment): v1.16 differentiator
- Document splitting for oversized files: only if extreme outlier; otherwise v1.16

---

## Open Questions for Phase-1 Authoring or v1.16

1. **Does the SharePoint deployment strip YAML frontmatter before indexing?** If not, the raw `---\ndoc_id: RE-042\nstatus: Approved\n---` block appears as indexed text, creating an orphan pre-H1 chunk of pure metadata noise. Verify against the actual SharePoint instance before Phase-2 retrofit authoring begins. Mitigation if stripping does not occur: either (a) confirm SharePoint page authoring (not raw .md upload) for this corpus, or (b) treat YAML frontmatter as confirmed-harmless if Microsoft Graph / SharePoint Search already excludes YAML delimiter blocks from text indexing.

2. **Does Copilot Studio citation text use the SharePoint file name, the SharePoint page Title property, or the H1 content of the document?** Community evidence and Microsoft documentation both indicate file name / page title property (not H1 text extracted from content). If so, a file-name or page-title standardization pass (separate from the EEE header retrofit) would improve citation readability independently of the H1 content change. This is a v1.16 differentiator, not a Phase-1 blocker.

3. **Mermaid diagrams as code-fenced blocks.** The v1.15 EEE spec explicitly defers the Mermaid-vs-"no key info in code-fenced diagrams" collision to v1.16. During Phase-1 retrofit, every Mermaid block in the corpus should be flagged as "text summary needed" and an issue comment (not a deletion) added. The Phase-1 acceptance criteria should note that Mermaid blocks are deferred, not resolved.

4. **Heading depth for structure-aware chunking.** The Document Layout skill's `markdownHeaderDepth` parameter controls which heading levels create new sections/chunks. If the Copilot Studio / SharePoint pipeline uses `h3` depth (common default), H3 boundaries also create chunk splits. Documents with many H3 subsections under a single H2 produce more granular chunks, which is generally better for retrieval precision. Confirm the heading depth setting for the actual pipeline if possible.

---

## Confidence Assessment

| Area | Confidence | Primary Source | Date |
|------|------------|----------------|------|
| Azure AI Search heading-boundary chunking behavior | HIGH | learn.microsoft.com/azure/search/search-how-to-semantic-chunking | Updated 2026-06-08 |
| Azure AI Search header_1-3 as searchable fields | HIGH | learn.microsoft.com/azure/search/search-how-to-semantic-chunking (index schema) | Updated 2026-06-08 |
| Pre-heading orphan chunk behavior | HIGH | learn.microsoft.com/azure/search/cognitive-search-skill-document-intelligence-layout (output schema) | Updated 2026-07-02 |
| Microsoft Copilot 36,000-char document limit | HIGH | learn.microsoft.com/microsoft-365/copilot/extensibility/optimize-content-retrieval | Updated 2025-08-07 |
| Copilot Studio SharePoint knowledge grounding | HIGH | learn.microsoft.com/microsoft-copilot-studio/knowledge-add-sharepoint | Updated 2026-06-30 |
| Summary-first retrieval improvement (effect size) | MEDIUM | Azure AI Search coherence docs + RAG literature; no Copilot-Studio-specific A/B data | — |
| First-chunk dilution magnitude from inline bold block | MEDIUM | Derived from Document Layout skill output schema + chunk size analysis; not directly measured | — |
| Citation text = SharePoint file/page title | MEDIUM | Microsoft Q&A + Power Platform community + architecture inference; not a single definitive Microsoft Learn statement | — |

---

## Sources

- [Azure AI Search: Chunk and Vectorize by Document Layout](https://learn.microsoft.com/en-us/azure/search/search-how-to-semantic-chunking) — official, updated 2026-06-08
- [Azure AI Search: Document Layout Skill reference](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-document-intelligence-layout) — official, updated 2026-07-02
- [Azure AI Search: Azure Content Understanding Skill](https://learn.microsoft.com/en-us/azure/search/cognitive-search-skill-content-understanding) — official; current recommendation for new skillsets
- [M365 Copilot Extensibility: Optimize Content Retrieval](https://learn.microsoft.com/en-us/microsoft-365/copilot/extensibility/optimize-content-retrieval) — official, updated 2025-08-07
- [Copilot Studio: Add SharePoint as a knowledge source](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint) — official, updated 2026-06-30
- [Copilot Studio: Knowledge sources summary](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio) — official
- [Copilot Studio: Page-Level PDF Citations (Microsoft blog)](https://microsoft.github.io/mcscatblog/posts/pdf-page-level-citations/) — Microsoft engineering blog; citation mechanism evidence
- [Chunking Strategies for RAG (Unstructured.io)](https://unstructured.io/blog/chunking-for-rag-best-practices) — practitioner; MEDIUM confidence
- [RAG Chunking and Metadata Enrichment (Medium)](https://medium.com/@shaikmohdhuz/beyond-fixed-chunks-how-semantic-chunking-and-metadata-enrichment-transform-rag-accuracy-07136e8cf562) — practitioner; MEDIUM confidence

---

*Feature research for: v1.15 EEE SOP Documentation-Standard Retrofit*
*Researched: 2026-07-03*
*Confidence: HIGH (Azure AI Search + Copilot Studio official docs); MEDIUM (RAG literature + citation behavior)*
