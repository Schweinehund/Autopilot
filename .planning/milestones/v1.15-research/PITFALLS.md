# Pitfalls Research — LLM Knowledge-Base Grounding (v1.15 EEE SOP Retrofit)

**Domain:** LLM knowledge-base grounding — Copilot Studio / SharePoint — Markdown→.docx document corpus
**Researched:** 2026-07-03
**Confidence:** HIGH for image/OCR and file-type limitations (verified against Microsoft Learn official docs); HIGH for table chunking (confirmed across Microsoft Learn + community sources); MEDIUM for header-block-as-noise and blockquote/lead-chunk effects (mechanism confirmed from RAG literature; Copilot-Studio-specific depth limited by undocumented chunker internals); MEDIUM for MD→docx conversion pitfalls (Pandoc behavior verified; downstream indexer behavior inferred from confirmed principles); LOW for Mermaid DSL treatment in Word indexer (confirmed mechanism, limited direct official citation).

---

## Critical Pitfalls

### P-01: Visual Content Not Grounded — Images, Screenshots, and Embedded Diagrams Are Invisible

**What goes wrong:**
Any content that exists only as a raster image — screenshots of Intune portal steps, embedded UI pictures, Mermaid diagrams rendered as PNGs, charts — is completely unindexed and unretrievable by the Copilot Studio / SharePoint grounding pipeline. The knowledge base cannot answer questions whose answers live only in an image.

**Why it happens:**
The SharePoint semantic indexer and the Copilot Studio Dataverse ingestion pipeline both extract text only. Microsoft Learn confirms that SharePoint knowledge sources "do not process images or support video analysis." The Dataverse file-upload path (Option 1) does offer "support for text within images for certain document types like PDF files" — but this applies only to OCR-capable PDF ingestion (Dataverse path), not to images embedded inside .docx files or to standalone image files. An image embedded in a Word document is not subject to OCR by the SharePoint indexer.

Specifically for **Mermaid decision-tree fences**: when a Markdown file containing ```` ```mermaid ```` blocks is converted to .docx via Pandoc or similar tools, the Mermaid DSL syntax is rendered as a `Code` style monospace text block in Word. The diagram is never rendered as an image inside Word during the conversion — the raw DSL (`graph TD`, `A --> B[...]`, etc.) appears as literal text. That DSL text IS indexed (as plain text), but it carries zero semantic meaning to a retrieval query and cannot represent the logic expressed by the diagram. If the conversion tool renders Mermaid to a PNG and inserts the image, the diagram then becomes an unindexed image — worse, because even the DSL text is now absent.

**Severity:** CRITICAL for any content whose key information is image-only. CRITICAL for Mermaid decision trees deferred to v1.16.

**Phase-1 class applicability:**
- Runbooks: HIGH RISK — step-by-step guides commonly include Intune portal screenshots. Any runbook step whose instruction is communicated only through a screenshot has zero grounding coverage.
- Admin-setup guides: HIGH RISK — same screenshot dependency.
- Reference docs: MEDIUM RISK — reference docs tend to be more table/prose heavy; risk depends on whether capability matrices use image-based tables.

**Prevention (retrofit + C17):**
- **"Text as text" rule**: Every step, instruction, note, or decision captured in the corpus must also exist as prose or Markdown text. Screenshots are illustration only; they must never be the sole carrier of information.
- C17 cannot directly detect images inside .docx (binary format), but the retrofit SOP must enforce this at authoring time: every image in a runbook must have a companion prose description of what the image shows and what the reader should do.
- **Mermaid deferral to v1.16 is correctly motivated**: Mermaid fences in Markdown convert to either unrenderable DSL text or unindexable images in Word; neither is grounded correctly. Phase-1 should not introduce new Mermaid fences in runbook/admin-setup/reference docs.
- For the v1.16 structural phase, the decision-tree logic must be restructured as prose decision tables or numbered conditional steps before grounding.

**Sources:** Microsoft Learn — Unstructured data as a knowledge source (confirmed "support for text within images for certain document types like PDF files" is Dataverse path only, not SharePoint connector); Princeton ITS blog — Azure Content Understanding vs SharePoint in Copilot Studio ("does not process images or support video analysis"); community thread on OCR for JPEG in Copilot Studio (Enabling OCR for JPEG Scan Documents — confirmed OCR not built in).

---

### P-02: Large Markdown Tables — Header Context Lost Across Chunk Boundaries

**What goes wrong:**
When a large Markdown table (e.g., a 5-platform capability matrix with many rows) is converted to .docx and indexed, the fixed-size chunking used by both the Dataverse ingestion pipeline and the SharePoint semantic indexer can split the table such that body rows land in a different chunk than the header row. The retrieved chunk contains only data cells — without column labels, cell values like "Yes (EAP-TLS only)" or "Requires SCEP profile" have no semantic context. The LLM either fabricates column labels, returns nonsense, or refuses to answer.

The Dataverse/Copilot Studio ingestion pipeline uses approximately 2,000 characters per chunk with 500-character overlap. A 5-platform capability matrix with 30+ rows and 6 columns easily exceeds one chunk. The header row is in chunk N; rows 12–20 land in chunk N+1 without the header row. Even with overlap, column header context is not preserved unless the chunker is heading-aware (which the default Dataverse chunker is not for table rows).

**Why it happens:**
Fixed-size text splitting is agnostic to table structure. Tables in .docx are stored as XML table elements; when extracted to plain text for indexing, they become pipe-delimited or tab-delimited strings. A multi-row table becomes a flat sequence of text. The chunker splits at character/token boundaries, which cross table row boundaries arbitrarily. This is a well-documented RAG limitation confirmed by the Copilot Studio community knowledge guide: "When a table spans multiple chunks, the relationship between headers and data cells is lost."

**Severity:** HIGH for capability matrices and any reference table with more than ~20–25 rows.

**Phase-1 class applicability:**
- Reference docs: CRITICAL — capability matrices are the primary artifact here. A platform capability matrix with 5 columns (Windows/macOS/iOS/Android/Linux) × 30+ feature rows WILL be split across multiple chunks.
- Runbooks: LOW — runbooks use tables for quick-reference steps, typically short (under 10 rows).
- Admin-setup guides: MEDIUM — may include configuration parameter tables; risk depends on table size.

**Prevention (retrofit + C17):**
- **Table size limit**: Cap tables in reference docs at approximately 20 rows. For larger tables, split into topical sub-tables (e.g., one table per platform × feature category) each preceded by a section heading that provides context in every chunk.
- **Prose summary per table**: Every capability table MUST be followed (or preceded) by a prose paragraph that states the key takeaways in sentence form. This prose lands in the same or an adjacent chunk and can be retrieved with full context even when the table is split.
- **Repeat header rows in Word**: When converting to .docx, configure Word table "Repeat Header Rows" for tables that span multiple pages — this inserts the header row into the Word XML at each page break, which some indexers recognize. This is a mitigation, not a guarantee (indexer behavior is undocumented).
- **C17 check**: C17 cannot count table rows in .docx (binary), but can check Markdown source: assert that any Markdown table exceeding 25 rows has a prose summary within 5 lines of the closing table delimiter.
- **Retrieval-test gate**: During Phase-1 validation, test at least one capability matrix query against the deployed knowledge base before closing the phase. If retrieval returns a chunk without column headers, the table must be restructured.

**Sources:** Copilot Studio knowledge limitations guide (Rickcau/Copilot-Studio GitHub — "Tables become garbled when chunked by character count"); TopoChunker/RAG chunking literature (confirmed header-context-loss as universal fixed-size-chunking problem); Microsoft Learn — Unstructured data as a knowledge source (confirmed "chunks uploaded files into pieces ... vector-indexes them").

---

### P-03: Missing, Duplicate, or Non-Descriptive Document Titles — Bad Citations

**What goes wrong:**
Three distinct title-quality failure modes degrade citation quality:

1. **Missing H1 / filename-as-title**: If a .docx has no H1 heading (or if the H1 was lost in conversion), Copilot Studio cites the document by its SharePoint file name (e.g., `l1-runbook-windows-autopilot.docx`) rather than by a human-readable title. Users clicking the citation see a file name, not a meaningful title.

2. **Duplicate titles**: Two documents with the same H1 (e.g., two runbooks both titled "Windows Autopilot Troubleshooting") produce ambiguous citations. The user cannot determine from the citation title which document was actually cited. Grounding may also conflate the two documents' content.

3. **Oversized kitchen-sink docs**: A single large document covering many sub-topics produces citations that point to the entire document even when only one section is relevant. The citation is correct but useless — the user must read a 40-page doc to find the cited passage. For Copilot Studio, page-level citations are available only for PDF files; .docx files fall back to document-level citations.

**Why it happens:**
Documents accumulated over time without enforced title conventions. Runbooks for multiple platforms may share similar titles. Kitchen-sink "everything in one doc" patterns are common in IT documentation. The EEE SOP retrofit is the first time title enforcement has been a hard requirement.

**Severity:** HIGH — poor citations directly undermine the primary goal of this milestone (clickable citations).

**Phase-1 class applicability:**
- All three classes (runbooks, admin-setup, references): HIGH RISK.

**Prevention (retrofit + C17):**
- **Unique H1 titles**: Every document must have a unique H1 that describes its specific scope. The EEE standard's "descriptive H1" requirement directly addresses this.
- **C17 assertion**: Assert that each file has exactly one H1 (the title) and that the H1 text is non-empty. The registry cross-check (RE-NNN → title) enables duplicate-title detection at the corpus level.
- **Doc ID Registry uniqueness**: Because every document gets a unique RE-NNN identifier, the registry itself is the duplicate-detection artifact. Two documents cannot share a Doc ID. If their titles are also the same, the registry will surface it.
- **Scope discipline at retrofit time**: If a runbook is found to cover multiple independent procedures, split it into two documents each with its own Doc ID and specific H1 before retrofitting. Do not retrofit a kitchen-sink doc — split first, retrofit each resulting doc.
- **File-name alignment**: The SharePoint file name (used for fallback citation) should closely match the H1 title. C17 can assert that the file name (without extension) contains a token from the H1.

**Sources:** Microsoft Learn — Copilot Studio knowledge sources summary (confirmed .docx falls back to document-level citations, page-level only for PDF); Microsoft Q&A — Local JSON/Text knowledge sources result in non-clickable citations (confirmed citation metadata depends on indexing pipeline behavior); Microsoft Q&A — Generative answers pointing to SharePoint sources don't return results (confirmed stale/moved files produce wrong citations).

---

### P-04: Stale Metadata and Sync Lag Produce Wrong Citations

**What goes wrong:**
When a document is moved, renamed, or deleted in SharePoint, the knowledge base may continue to surface its old location in citations for 4–6 hours (the Dataverse sync interval) or longer if sync fails. Citations that look correct point to a broken URL. If a document is deleted but the index still references it, clicking the citation returns a 404 or "access denied" SharePoint error.

For the EEE retrofit specifically: if a document's H1 or Doc ID changes during the retrofit but the index has not re-synced, the citation may show the old title paired with new content — producing a mismatch between what the citation says and what the document says when opened.

**Severity:** MEDIUM — does not prevent grounding but breaks the citation UX.

**Phase-1 class applicability:**
- All three classes: MEDIUM RISK — every retrofitted document will have its frontmatter and H1 updated.

**Prevention (retrofit + C17):**
- After the retrofit commit, allow a full sync cycle (4–6 hours) before validation testing.
- Do not rename or move files during the retrofit — only change internal content (frontmatter, headers, body restructuring). Keeping file paths stable prevents broken citation URLs.
- The `Status: Approved` / `Status: Draft` field must be correct at merge time. A Draft document that appears in citations misleads users who expect Approved content.
- C17 can assert that the `status` frontmatter key is present and set to a valid value (`Draft` or `Approved`). The retrofit convention (`Status: Approved` for all retrofitted live docs) must be enforced.

**Sources:** Microsoft Learn — Add SharePoint as a knowledge source ("Update the source link if the SharePoint site or folder is renamed... the existing source link can break and cause a permission gap"); Microsoft Learn — Unstructured data as a knowledge source ("synchronization happens every four to six hours"); Microsoft Q&A — Generative answers accuracy issues ("if files were moved, deleted, or renamed, search may still temporarily surface stale or partial results").

---

## Moderate Pitfalls

### P-05: Bold Inline Header Block Pulled as Noise Citation

**What goes wrong:**
The EEE bold-inline header block:

```
**Doc ID:** RE-NNN  **Platform:** Windows  **Doc Type:** Runbook  **Owner:** Josh Anderson  **Last Reviewed:** 2026-05-01  **Status:** Approved
```

appears near the top of every document, immediately after the H1. Because it is dense with keywords that correspond to user filter terms ("Platform," "Windows," "Runbook," "Status"), it can have high semantic similarity to queries like "which Windows runbooks are approved?" or "find a runbook for Windows Autopilot." The chunk containing this header block may be retrieved and cited as the answer — returning only the metadata card, not the actual content.

This is the "distracting passage" effect in RAG: semantically related to the query but not containing the answer. Research confirms that "distracting passages — passages semantically related to the query but not containing the answer — reduce model accuracy even when relevant content is present."

**Why it happens:**
The header block is intentionally metadata-rich. This is correct for document management. The risk is that the grounding pipeline cannot distinguish metadata prose from substantive content prose. It treats all text within a chunk equally.

**Severity:** MEDIUM — occasional noise citations, not systematic failure. The Summary paragraph that immediately follows the header block will typically be in the same lead chunk and provide substantive content, diluting the pure-metadata signal. The risk is higher if the header block is large or if Summary is very short.

**Phase-1 class applicability:**
- All three classes: MEDIUM RISK. The risk is proportional to how keyword-specific the query is (searching by platform or doc type) vs. content-specific.

**Prevention (retrofit + C17):**
- **Keep the header block compact**: The EEE spec's rendered format (one or two dense lines of bold-inline key: value pairs) is better than a multi-line table or multi-heading metadata section. Compact = smaller fraction of the lead chunk = lower probability of metadata dominating retrieval.
- **Ensure Summary is substantive**: The `## Summary` section must provide at least 2–3 sentences of content-bearing prose immediately after the header block. This ensures the lead chunk contains both metadata and content, reducing the metadata:content ratio.
- **D3 ordering is correctly motivated** (H1 → block → Summary → gate-blockquote → sections): placing the gate-blockquote AFTER the Summary ensures that the lead chunk's primary semantic signal is the Summary, not the header block.
- **C17 assertion**: Assert that `## Summary` is present and contains at least one non-empty paragraph of at least N words (suggest N=30) immediately following the header block. This prevents the anti-pattern of `## Summary\n\n(empty)`.
- Note: The inline bold format (`**Key:** value`) rather than a Markdown heading (`### Doc ID`) is actually correct here — it prevents the header block from becoming its own chunking anchor, which would produce an isolated metadata-only chunk with no surrounding content.

**Sources:** RAG pitfalls literature — "23 RAG Pitfalls and How to Fix Them" (noise / distracting document effect); NeurIPS RankRAG paper (confirmed "irrelevant or misleading passages can reduce model accuracy even when relevant content is present"); Microsoft Q&A — Issues with Copilot Studio knowledge base accuracy (confirmed retrieval returning metadata-like fragments rather than content).

---

### P-06: Version/Platform Gate Blockquote in Lead Chunk — Status: Draft Risk

**What goes wrong:**
The `> **Applies to:** ...` blockquote and the `Status:` line appear near the top of each document. Two distinct sub-risks:

**Sub-risk A (Draft status cited as authoritative):** If a document has `Status: Draft` in its frontmatter but the visible header block (rendered from frontmatter) appears in the lead chunk, the LLM retrieves the chunk and generates a response without necessarily surfacing the Draft status to the user. The user receives authoritative-sounding answers from a draft document. In Copilot Studio, the citation shows the document title and a link — there is no automatic "this is a draft" annotation in the citation UI.

**Sub-risk B (Restrictive gate dilutes content signal):** A verbose version gate such as `> **Applies to:** Windows 11 22H2+, macOS 14+, iOS 17.4+, Android 13+, Ubuntu 22.04 LTS only — not applicable to earlier OS versions, Windows LTSB, or devices enrolled via legacy MDM` occupies significant character space in the lead chunk. If the gate is very long, it pushes substantive content (the Summary) into chunk boundary territory or reduces the Summary's fraction of the lead chunk, decreasing retrieval precision.

**Severity:** MEDIUM for Sub-risk A (real UX harm if a Draft is cited authoritatively); LOW for Sub-risk B (manageable with gate conciseness).

**Phase-1 class applicability:**
- Runbooks and admin-setup guides: MEDIUM RISK for Sub-risk A — L1/L2 operators rely on these being authoritative. A cited Draft runbook is dangerous for a service desk engineer following steps.
- Reference docs: LOW RISK for Sub-risk B — reference docs may have complex platform gates but are less step-critical.

**Prevention (retrofit + C17):**
- **Status discipline is the primary mitigation for Sub-risk A**: Only retrofit-complete docs (reviewed, content-stable) are set to `Status: Approved`. Docs with incomplete or unverified content remain `Status: Draft`. C17 must assert that the visible `Status:` in the rendered header block matches the `status` frontmatter key — preventing a mismatch where frontmatter says Draft but the rendered header says Approved, or vice versa.
- **Draft docs should not be in the grounding corpus**: Consider whether Draft documents should be excluded from the SharePoint knowledge source folder during Phase-1. One approach: publish Approved docs to the indexed library, stage Draft docs in a separate non-indexed location. C17 can assert this by checking that any doc in the indexed library path has `status: approved` in frontmatter.
- **Gate conciseness rule**: Version gate blockquotes should identify the platform/version scope in 1–2 lines maximum. Multi-line verbose gates must be trimmed or moved to a `## Prerequisites` section. C17 can assert that the blockquote immediately following the Summary contains fewer than N characters (suggest N=200).
- **D3 ordering places gate AFTER Summary**: The correct order (H1 → block → Summary → gate-blockquote → body) means the Summary content is in the lead chunk before the gate. This limits Sub-risk B.

**Sources:** RAG retrieval noise literature (distracting passage effect); Microsoft Q&A — Generative answers from SharePoint sources (confirmed grounding uses document content without surfacing document-level metadata like status to users by default); Microsoft Learn — Unstructured data FAQ (confirmed "files protected by sensitivity labels or passwords" are not supported — implies there is no equivalent protection for Draft status documents without explicit access control).

---

### P-07: Markdown (.md) Files in SharePoint Document Libraries Are Not Grounded

**What goes wrong:**
Markdown (.md) files stored in a SharePoint document library are not retrievable or citable when the SharePoint site is added as a Copilot Studio knowledge source via the SharePoint connector option (Option 2). Multiple community reports confirm that while .md files can be uploaded directly to Copilot Studio's Dataverse file store (Option 1), they are "not retrievable or citable when stored in a SharePoint library" via Option 2. Some users report that .md files "don't appear to be discovered at all on the SharePoint site."

The supported file types for the SharePoint connector are: doc, docx, xls, xlsx, ppt, pptx, pdf. Markdown is not in this list.

**Severity:** CRITICAL for the delivery path if the corpus is to be consumed as .md files from SharePoint. This makes the MD→.docx conversion step non-optional — it is a hard requirement for SharePoint grounding to function at all.

**Phase-1 class applicability:**
- All three classes: CRITICAL — this is a gating issue that determines the entire delivery architecture.

**Prevention (retrofit + C17):**
- **The MD→.docx conversion is mandatory**: The v1.15 design (MD→.docx downstream, grounded from SharePoint) is correctly motivated. There is no path to SharePoint-grounded .md files via the SharePoint connector. This constraint validates the conversion requirement.
- **Do not add .md files to the SharePoint grounding library**: C17 should assert (or the deployment process should enforce) that only .docx files are present in the grounded SharePoint library path.
- **Alternative (Dataverse upload path)**: The Option 1 (Dataverse file upload from SharePoint) supports the same .docx formats and may support direct upload of files from a supported type. If the corpus must remain as .md in the repo and .docx is generated on export, the pipeline must automate this conversion.

**Sources:** Microsoft Tech Community discussion — "Copilot Studio + SharePoint: Markdown (.md) Files in Doc Libraries Supported as Knowledge Sources?" (confirmed: not supported via SharePoint connector, multiple users affected); Microsoft Learn — Quotas and limits, Add SharePoint files and folders (confirmed supported file types: doc, docx, xls, xlsx, ppt, pptx, pdf — no .md listed).

---

## MD→DOCX Conversion Pitfalls

### P-08: YAML Frontmatter Leaking as Body Text

**What goes wrong:**
If the Markdown→.docx conversion pipeline does not use a YAML-aware processor (or uses Pandoc without proper flags), the YAML frontmatter block — the `---` delimiters and all key: value pairs — appears verbatim as the first paragraphs of the Word document body. The indexer then ingests this raw YAML as prose:

```
---
title: Windows Autopilot L1 Runbook
doc_id: RE-001
platform: windows
status: approved
---
```

Queries for `RE-001` or `doc_id` then pull this block as the top-cited chunk. The LLM returns a fragment of YAML syntax as if it were the answer to the user's question.

**Why it happens:**
Pandoc (the standard Markdown→.docx tool) correctly strips YAML frontmatter and uses it as document metadata only — but this requires either `--standalone` flag or explicit metadata-handling. Non-Pandoc converters (online tools, GitHub-based converters, some CI pipelines) may not strip the frontmatter. Even Pandoc can fail if the YAML block uses keys it does not recognize, causing it to treat the block as a literal code fence instead of metadata.

**Severity:** HIGH — systematic pollution of the lead chunk with raw YAML syntax across all 150+ documents.

**Phase-1 class applicability:**
- All three classes: HIGH RISK — every document has YAML frontmatter under the EEE standard.

**Prevention (retrofit + C17):**
- **Specify and lock the conversion pipeline**: Document and enforce the exact conversion command/tool/version. For Pandoc: `pandoc input.md -o output.docx --reference-doc=reference.docx` correctly handles YAML frontmatter.
- **C17 / conversion validator check**: After conversion, parse the first 500 characters of the generated .docx text and assert that the YAML delimiter (`---`) is NOT present. This is a post-conversion validation step, not a Markdown lint check.
- **Alternatively**: The EEE standard already requires a visible rendered header block (the bold-inline `**Doc ID:**...` block) to appear in the document body. The YAML frontmatter should NOT be the source of that visible block in the .docx — the rendered block is separately authored from the frontmatter (single-source-of-truth: frontmatter drives the rendered block at save/export time). If this rendering is done at the Markdown level before conversion (e.g., a pre-conversion template renders the block into the .md body), then frontmatter stripping is only needed for the raw YAML, not for the rendered content.

**Sources:** Pandoc User's Guide (MANUAL.html — confirmed YAML metadata block is stripped from output body by default when using metadata block extension; confirmed `--standalone` behavior); GitHub Pandoc issue #3034 (YAML front matter into custom properties in docx — confirmed this is non-trivial and requires explicit handling).

---

### P-09: Heading Styles Lost in Conversion — Flat Document, No Chunk Anchors

**What goes wrong:**
If the MD→.docx conversion does not map Markdown heading levels (`#`, `##`, `###`) to Word paragraph styles (`Heading 1`, `Heading 2`, `Heading 3`), the output .docx contains all text as `Normal` paragraph style. The SharePoint semantic indexer uses Word heading styles as structural signals for chunking and for understanding document hierarchy. Without heading styles:
- Every chunk is character-count-driven with no structural boundaries.
- A step buried in "step 7 of procedure 3" may be split from its procedure title.
- The document appears as a flat wall of text to the indexer.
- The H1 title may not be recognized as the document title for citation purposes.

**Severity:** HIGH — systematic chunking degradation across all documents if conversion is misconfigured.

**Phase-1 class applicability:**
- All three classes: HIGH RISK.

**Prevention (retrofit + C17):**
- **Use a reference.docx template**: Pandoc's `--reference-doc` option reads heading styles from a template Word document. The conversion pipeline MUST include a reference template that correctly defines `Heading 1`, `Heading 2`, `Heading 3` paragraph styles. This is the single most important conversion configuration choice.
- **Post-conversion validation**: Open a representative sample of converted .docx files in Word and verify that `# Title` → Heading 1 style, `## Section` → Heading 2 style, etc. Do not rely on visual appearance only — check paragraph styles in the Styles panel.
- **C17 cannot inspect .docx styles directly** (binary format), but the conversion pipeline validator can check that the reference template exists and that the `--reference-doc` flag is used.

**Sources:** Pandoc User's Guide (confirmed heading style mapping to Word Heading 1/2/3 via reference-doc); conversion guide blog — "Copy-paste from rendered Markdown loses heading styles (they become bold Normal text instead of Word Heading styles)"; Microsoft Learn — Semantic indexing for Copilot (confirmed indexer uses document structure; well-structured documents produce better retrieval).

---

### P-10: Mermaid Code Fences → Raw DSL in Word — Decision Logic Not Grounded

**What goes wrong:**
Mermaid decision-tree diagrams in Markdown (`` ```mermaid `` ... ` ``` ``) convert to one of two bad outcomes in Word:

1. **Pandoc without Mermaid support**: The fenced code block is rendered as a `Code` style paragraph containing the raw Mermaid DSL (`graph TD`, `A{Condition} --> B[Action]`, etc.). The indexer ingests this as literal text — keyword-heavy but semantically meaningless for decision logic queries.

2. **Pandoc with a Mermaid plugin**: The diagram is rendered to an SVG or PNG image and embedded in Word. The image is then completely unindexed (Pitfall P-01 applies).

Neither path preserves the decision-tree logic in a form grounded by the retrieval pipeline.

**Severity:** CRITICAL for Mermaid-containing documents, specifically the decision-tree structural docs deferred to v1.16.

**Phase-1 class applicability:**
- Phase-1 docs (runbooks, admin-setup, references): LOW RISK — Phase-1 explicitly excludes Mermaid decision-trees (those are v1.16 structural docs). **The v1.16 deferral is correctly motivated by this pitfall.**
- Risk escalates to CRITICAL if any Phase-1 author introduces a new Mermaid fence in a runbook or admin-setup guide.

**Prevention (retrofit + C17):**
- **C17 Markdown source assertion**: Assert that no Markdown file in the Phase-1 corpus contains ` ```mermaid ` code fences. This is a lintable check against the .md source before conversion. Fail the check if any Mermaid fence is found in a runbook, admin-setup, or reference doc.
- For v1.16 planning: decision trees must be restructured as prose conditional tables, numbered decision steps, or indented heading hierarchies — not Mermaid — before grounding.

**Sources:** Mermaid documentation (confirmed Mermaid requires JavaScript runtime to render; Word/PDF export via Pandoc produces either raw DSL text or PNG image); Pitfall P-01 above (image not grounded).

---

### P-11: Internal Anchor Links Broken in .docx — Dead Citation Links

**What goes wrong:**
Markdown internal anchor links (`[see step 3](#step-3-verify-enrollment)`) do not convert to functional Word bookmarks in most MD→.docx pipelines. The link text survives but the `#anchor` target becomes a dead hyperlink in Word. When a user follows a citation and opens the document, any cross-references within the document are broken links.

**Severity:** LOW for grounding (the indexer does not follow internal links), MEDIUM for UX (broken links degrade the document experience after citation).

**Phase-1 class applicability:**
- Runbooks: MEDIUM RISK — runbooks frequently use internal anchor links for "see also" sections and procedure cross-references.
- Admin-setup guides: MEDIUM RISK.
- Reference docs: LOW RISK.

**Prevention (retrofit + C17):**
- During retrofit, convert internal anchor links that reference other documents to relative cross-document links rather than within-document anchors — these survive conversion better (and are more grounding-friendly since they point to separate documents).
- For within-document anchors, consider replacing with section heading references by name (plain text: "see the Verification section below") rather than hyperlinks.
- C17 can assert that no `[text](#anchor)` internal anchor link syntax appears in Markdown files, or flag them for manual conversion review.

**Sources:** Pandoc conversion guide (confirmed internal anchor links to fragments may not produce Word bookmarks); blog — "broken links in Word document when converting from Markdown."

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip prose summary for capability table | Saves 2-3 authoring minutes per doc | Table chunk retrieval returns data without context; bad answers to capability queries | Never for Phase-1 reference docs |
| Reuse same H1 title across platform-specific variants | Fewer title decisions | Ambiguous citations; users cannot identify which platform doc was cited | Never — use unique descriptive H1 per doc |
| Leave Status: Draft for live corpus docs to be "safe" | Feels cautious | Draft docs in grounded corpus produce uncertain answers with no UI signal to users that content is provisional | Never — live published docs must be Approved |
| Use Mermaid decision tree in runbooks | Fast diagram creation | Decision logic not grounded; DSL text indexed as noise | Never in Phase-1 corpus |
| Leave YAML frontmatter unstripped in .docx pipeline | Skips pipeline complexity | YAML block indexes as noise; RE-NNN citations point to raw metadata | Never — conversion must strip frontmatter |
| Paste same boilerplate gate blockquote from template without trimming | Fast retrofit | Long gate blockquote consumes lead-chunk budget; reduces Summary signal | Acceptable only if gate is ≤2 lines |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| SharePoint connector (Option 2) | Assuming .md files work as knowledge source | .md files are not indexed by SharePoint connector; must be .docx |
| Dataverse file upload (Option 1) | Expecting page-level citations like PDF | .docx in Dataverse falls back to document-level citations; only PDF gets page-level citations |
| Conversion pipeline | Using a simple online MD→docx converter | Use Pandoc with `--reference-doc` template; verify YAML stripped and headings styled |
| Sync after retrofit | Testing citations immediately after deploying documents | Allow 4–6 hour sync cycle before validation; stale index produces wrong citations |
| Draft documents in indexed library | Publishing drafts alongside approved docs | Draft docs should be in a non-indexed staging path; only Approved docs in the grounded library |

---

## "Looks Done But Isn't" Checklist

- [ ] **Header block rendered**: The visible `**Doc ID:** RE-NNN` block appears in the .docx body — verify it was NOT left as raw YAML. Check: open .docx in Word, first page should show the bold key: value block, not `---\ntitle:...`.
- [ ] **H1 is unique**: No two documents in the corpus share the same H1 title. Check: grep the H1 from all .md files, assert uniqueness.
- [ ] **Summary is substantive**: `## Summary` section contains ≥30 words of content prose. Check: C17 assertion.
- [ ] **No Mermaid fences in Phase-1 docs**: No ` ```mermaid ` in runbook, admin-setup, or reference .md files. Check: C17 lint assertion.
- [ ] **Table size within limit**: No Markdown table in the corpus exceeds 25 rows without a companion prose summary. Check: C17 Markdown table row counter.
- [ ] **Status field correct**: All retrofitted live docs have `status: approved` in frontmatter and `**Status:** Approved` in rendered header block. Check: C17 assertion.
- [ ] **Gate blockquote concise**: Version/platform gate blockquote ≤2 lines / ≤200 characters. Check: C17 assertion.
- [ ] **Conversion verified**: A post-conversion check confirms no `---` YAML delimiter appears in the first 500 characters of generated .docx text.
- [ ] **Headings styled**: A sample of converted .docx files confirms Heading 1/2/3 paragraph styles (not Normal) for `#`/`##`/`###` converted headings.
- [ ] **Sync complete before citation test**: At least one full sync cycle (4–6 hours) elapsed after deploying documents to SharePoint before grounding validation queries are run.

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| P-01: Images only (no prose) | MEDIUM | Add prose descriptions to all image-only steps; re-export .docx; re-sync |
| P-02: Large table split badly | LOW–MEDIUM | Split table into sub-tables by category; add prose summaries; re-export .docx; re-sync |
| P-03: Duplicate/missing titles | LOW | Update H1 in .md source; update Doc ID Registry; re-export; re-sync |
| P-04: Stale metadata citations | LOW (time cost) | No action needed beyond waiting for sync cycle; if persistent, manually re-upload file |
| P-05: Header block noise citations | LOW | Shorten header block; ensure Summary is ≥3 sentences; re-export; re-sync |
| P-06: Draft cited as authoritative | MEDIUM | Gate draft docs from indexed library immediately; re-sync to remove from index |
| P-07: .md files not grounded | HIGH if discovered late | Retroactively add conversion pipeline; re-export all docs to .docx; re-deploy to SharePoint |
| P-08: YAML frontmatter in body | MEDIUM | Fix conversion pipeline; re-export all docs; re-sync (all 150+ docs affected) |
| P-09: Heading styles lost | HIGH | Fix reference.docx template; re-export all docs; re-sync |
| P-10: Mermaid DSL in index | LOW | Remove Mermaid fence from .md; replace with prose; re-export; re-sync |
| P-11: Broken anchor links | LOW | Replace `[text](#anchor)` with prose references; re-export; re-sync |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | C17 / Harness Verification |
|---------|------------------|---------------------------|
| P-01: Images not grounded | Phase-1 SOP template + retrofit execution | C17: assert every step with an image has ≥1 prose sentence in the same section |
| P-02: Large table chunking | Phase-1 retrofit execution (reference docs specifically) | C17: assert no Markdown table >25 rows without prose summary within 5 lines |
| P-03: Duplicate/missing titles | Phase-1 EEE standard definition + Doc ID registry | C17: assert unique H1 per file; registry uniqueness check |
| P-04: Stale metadata | Phase-1 deployment process (not a code check) | Process gate: enforce sync wait before validation testing |
| P-05: Header block noise | Phase-1 EEE standard — Summary requirement | C17: assert `## Summary` exists and has ≥30 words |
| P-06: Draft in grounded corpus | Phase-1 Status discipline + deployment gating | C17: assert `status: approved` for all docs in production library path |
| P-07: .md not grounded | Phase-1 architecture decision (MD→.docx mandatory) | Pipeline gate: assert only .docx in indexed SharePoint library |
| P-08: YAML frontmatter leak | Phase-1 conversion pipeline definition | Post-conversion check: assert no `---` in first 500 chars of .docx text |
| P-09: Heading styles lost | Phase-1 conversion pipeline definition | Process check: manual validation of heading styles in sample .docx |
| P-10: Mermaid DSL | Phase-1 (v1.16 deferral enforced) | C17: assert no ` ```mermaid ` in Phase-1 .md corpus |
| P-11: Broken anchor links | Phase-1 retrofit (replace internal anchors) | C17: flag `[text](#anchor)` patterns for manual review |

---

## Sources

- Microsoft Learn — Unstructured data as a knowledge source: https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-unstructured-data (verified 2026-07-03) — HIGH confidence
- Microsoft Learn — Add SharePoint as a knowledge source: https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint (verified 2026-07-03) — HIGH confidence
- Microsoft Learn — Quotas and limits (SharePoint web app limits): https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas (verified 2026-07-03) — HIGH confidence
- Microsoft Learn — Semantic indexing for Microsoft 365 Copilot: https://learn.microsoft.com/en-us/microsoftsearch/semantic-index-for-copilot (verified 2026-07-03) — HIGH confidence
- Microsoft Learn — Knowledge sources summary: https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio (verified 2026-07-03) — HIGH confidence
- Microsoft Tech Community — Copilot Studio + SharePoint: Markdown (.md) Files in Doc Libraries Supported as Knowledge Sources?: https://techcommunity.microsoft.com/discussions/copilot-studio/copilot-studio--sharepoint-markdown--md-files-in-doc-libraries-supported-as-know/4517314 (verified 2026-07-03) — MEDIUM confidence (community, not official; but consensus across 4 independent reporters)
- Microsoft Q&A — Enabling OCR for JPEG Scan Documents in Copilot Studio Agent: https://learn.microsoft.com/en-us/answers/questions/5534528/enabling-ocr-for-jpeg-scan-documents-in-copilot-st (verified 2026-07-03) — HIGH confidence (Q&A with Microsoft response)
- Microsoft Q&A — Copilot Studio: Local JSON/Text Knowledge Sources Result in Non-Clickable Citations: https://learn.microsoft.com/en-us/answers/questions/5840273/copilot-studio-local-json-text-knowledge-sources-r (verified 2026-07-03) — MEDIUM confidence
- Microsoft Q&A — Issues with Copilot Studio Knowledge Base Accuracy from SharePoint: https://learn.microsoft.com/en-us/answers/questions/5494605/issues-with-copilot-studio-knowledge-base-accuracy (verified 2026-07-03) — MEDIUM confidence
- Princeton ITS Blog — Azure Content Understanding vs SharePoint in Copilot Studio: https://princetonits.com/blog/enterprise-ai-intelligent-automation/azure-content-understanding-prebuilt-analyzers-vs-sharepoint-knowledge-source-in-copilot-studio/ (verified 2026-07-03) — MEDIUM confidence (practitioner analysis)
- GitHub — Rickcau/Copilot-Studio knowledge limitations guide: https://github.com/Rickcau/Copilot-Studio/blob/main/Knowledge_Source_Limitations_Solutions/copilot-studio-knowledge-limitations-guide.md (verified 2026-07-03) — MEDIUM confidence (community practitioner guide; corroborates Microsoft Learn)
- Pandoc User's Guide — Metadata blocks and YAML handling: https://pandoc.org/MANUAL.html (verified 2026-07-03) — HIGH confidence
- NB-Data — 23 RAG Pitfalls and How to Fix Them: https://www.nb-data.com/p/23-rag-pitfalls-and-how-to-fix-them (verified 2026-07-03) — MEDIUM confidence (practitioner synthesis)
- Deepchecks — Retrieval Quality vs Answer Quality: https://deepchecks.com/retrieval-vs-answer-quality-rag-evaluation/ (verified 2026-07-03) — MEDIUM confidence
- NeurIPS 2024 — RankRAG (distracting passage effect): https://proceedings.neurips.cc/paper_files/paper/2024/file/db93ccb6cf392f352570dd5af0a223d3-Paper-Conference.pdf — HIGH confidence (peer-reviewed)

---

*Pitfalls research for: LLM knowledge-base grounding — Copilot Studio / SharePoint — Markdown→.docx corpus (v1.15 EEE SOP documentation-standard retrofit)*
*Researched: 2026-07-03*
*Confidence: HIGH for P-01, P-02, P-07, P-08, P-09 (Microsoft Learn + Pandoc official docs); MEDIUM for P-03–P-06, P-10–P-11 (community + RAG literature + inferred from confirmed mechanisms)*
