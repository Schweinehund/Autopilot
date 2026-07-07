# Grounding Platform Behavior Research

**Domain:** Copilot Studio / SharePoint knowledge-base grounding for a Markdown-sourced SOP corpus (v1.15 EEE SOP retrofit)
**Researched:** 2026-07-03
**Confidence:** HIGH for file-type rules and citation granularity (direct Microsoft Learn verification, docs dated 2026); MEDIUM for citation title precedence and semantic-index internals (Microsoft Learn partially silent); LOW for exact chunk boundary behavior (no public specification exists)

---

## Platform Stack (Grounding Pipeline)

| Layer | Technology | Role in Pipeline | Why This Matters |
|-------|------------|-----------------|-----------------|
| Source of truth | Markdown (.md) + YAML frontmatter | Authoring surface; harness C10/C17 enforces YAML | Human-editable; validator-enforced |
| Conversion step | MD → .docx (pandoc or equivalent) | Bridges .md to SharePoint-supported format | SharePoint knowledge source does NOT support .md natively |
| Grounding store | SharePoint document library (.docx files) | Holds converted docs; Copilot Studio indexes them | Must be a document library (not a SharePoint list) |
| AI agent layer | Microsoft Copilot Studio (custom agent) | Semantic retrieval + response generation + citations | Uses built-in semantic index, NOT SharePoint search |
| Index backend | Dataverse / Microsoft Graph semantic index | Chunks and embeds .docx body text as vectors | YAML frontmatter NOT indexed; custom Word doc properties NOT indexed |

---

## Finding 1 — File Type Support: .md Is NOT a Valid SharePoint Knowledge Source

**Verdict: The MD→.docx pipeline is correct and necessary. It is not a workaround — it is the only supported path.**

Copilot Studio offers three distinct ingestion paths with different file type support:

| Path | Supported Types | .md Support? | Notes |
|------|----------------|--------------|-------|
| Direct file upload (Upload files > Browse) | .docx, .pdf, .pptx, .xlsx, **.md**, .txt, .log, .html, .csv, .xml, .odt, .epub, .rtf, .pages, .json, .yaml, .tex | YES | Stored in Dataverse; up to 500 files / 512 MB each; no sync |
| Upload files > SharePoint path | .doc, .docx, .ppt, .pptx, .pdf, .xls, .xlsx | NO | Syncs every 4-6 hours; up to 1,000 files / 50 folders; stored in Dataverse |
| SharePoint site URL (full connector) | .doc/.docx, .ppt/.pptx, .pdf, modern SharePoint pages | NO | User-delegated auth; crawls site and subpaths |

.md IS a first-class type for the direct file upload path. But for SharePoint-grounded retrieval (the target for this corpus), .md is not supported. Only .docx/.pdf are practical for the SharePoint paths.

**Sources:**
- [Upload files as a knowledge source](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload) — updated 2026-04-22. Confidence: HIGH.
- [Add unstructured data as a knowledge source](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-unstructured-data) — updated 2026-06-11. Confidence: HIGH.
- [SharePoint web app limits](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas) — updated 2026-06-30. Confidence: HIGH.

---

## Finding 2 — File Size and Count Limits

| Constraint | Value | Path |
|-----------|-------|------|
| Max file size (all upload paths) | 512 MB | All |
| Max file size without M365 Copilot license (SharePoint connector) | 7 MB | SharePoint site URL path only |
| Files per agent (direct upload) | 500 | Direct upload |
| Files per SharePoint knowledge source | 1,000 files / 50 folders / 10 subfolder levels | Upload > SharePoint path |
| Knowledge sources per agent | 500 across all types | Agent-level limit |
| Sync frequency (SharePoint upload path) | Every 4–6 hours | Not real-time |

**Implication:** The ~150-200 doc corpus is well inside all limits. The 7 MB cap without an M365 Copilot license is unlikely to be hit by SOP runbooks. Sync lag of 4-6 hours means freshly uploaded or updated .docx files are not immediately retrievable.

**Source:** [Quotas and limits](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas) — 2026-06-30. Confidence: HIGH.

---

## Finding 3 — How Content Is Chunked and Embedded

Microsoft Learn does not publicly document the exact chunking algorithm, token window, or chunk boundaries used by Copilot Studio's semantic index.

What is confirmed:
- Documents stored in Dataverse are processed via a "built-in semantic index" (not SharePoint native search).
- The agent performs semantic vector search against this index.
- Body text and headings from .docx files are indexed.
- For the SharePoint URL connector path, retrieval is described as "tenant graph grounding with semantic search."

**Critical finding — custom SharePoint managed metadata is NOT indexed:**

The Copilot Studio semantic index does NOT index custom SharePoint column values (e.g., a "DocID" managed property). Mapping a custom column to a SharePoint managed search property does not make it retrievable by the agent — the agent bypasses SharePoint search entirely and uses the semantic index.

**Source (MEDIUM confidence — community post, not official Microsoft Learn):** Lee Ford, "SharePoint Knowledge Sources in Copilot Studio: The Metadata Problem" (2024), [lee-ford.co.uk](https://www.lee-ford.co.uk/posts/sharepoint-knowledge-sources-in-copilot-studio-the-metadata-problem/). Verify at plan time against current platform behavior.

**Workaround confirmed by same post:** Azure AI Search as an indexing layer allows specifying which properties are indexed and returned. This is a more complex architectural alternative if property-level retrieval is required.

**Implication for EEE standard:** The EEE bold header block rendered as body text (Doc ID, Platform, Doc Type, Owner, Status, Last Reviewed) WILL be indexed and semantically searchable because it is body text in the .docx. Metadata stored only in YAML frontmatter or Word document properties will NOT be indexed or retrievable.

---

## Finding 4 — Citation Granularity

| File Type / Path | Citation Granularity | What the Link Opens |
|------------------|---------------------|---------------------|
| PDF via Upload > SharePoint path | **Page-level** | PDF at the specific page where content was cited |
| PDF via other paths (direct upload, SharePoint URL) | Document-level | Whole file |
| .docx (any path) | **Document-level only** | Whole document link; no heading/section anchor |
| .pptx | Document-level | Whole file |
| .xlsx | Document-level | Whole file |
| Direct upload .md / .txt | Document-level | Whole file |

Page-level PDF citations require: (a) Upload > SharePoint path specifically, and (b) file at least ~4 KB; smaller files fall back to document-level.

**Sources:**
- [Add unstructured data — Page-level citations section](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-unstructured-data#page-level-citations-for-pdf-files) — 2026-06-11. Confidence: HIGH.
- [Upload SharePoint limits](https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas#upload-sharepoint-limits) — 2026-06-30. Confidence: HIGH.

**Implications for EEE standard:**

- For .docx, citations will always link to the whole document — no heading-level or section-level deep link is possible. The "clickable citation" the milestone targets is a link to the SharePoint file, not to a section within it.
- The EEE header block does NOT need section anchor IDs for grounding citations — they would have no effect.
- If PDF is ever added as a second output format (MD → PDF → SharePoint), page-level citations become available, and the `## Summary`-first structure pays off further because the summary lands on page 1.
- For the current .docx path: short, well-scoped SOPs (one topic per document) are more useful than long compound documents, because the citation lands users at the document root, not the relevant section.

---

## Finding 5 — YAML Frontmatter: What Happens Across the Pipeline

### In .md (source of truth)

YAML frontmatter sits between `---` delimiters at the top of the file. Harness C10 validates it. It is the authoritative carrier of `doc_id`, `status`, `owner`, `doc_type`, `platform`, `last_verified`.

### After MD → .docx conversion (pandoc behavior)

Pandoc converts YAML frontmatter into **Word document properties, not body text**:

- Standard fields (`title`, `author`, `date`, `subject`, `abstract`, `keywords`) → standard Word document properties (visible in File > Properties in Word)
- Custom fields (`doc_id`, `status`, `owner`, `doc_type`) → custom Word document properties

The YAML block itself **does not appear as body text** in the .docx. A reader opening the file in Word will not see the frontmatter.

**Sources:**
- [Pandoc User's Guide — YAML metadata blocks and DOCX output](https://pandoc.org/MANUAL.html) — current. Confidence: HIGH for standard fields; MEDIUM for custom fields (test with the actual converter version used in the pipeline).
- [Pandoc GitHub Issue #3034](https://github.com/jgm/pandoc/issues/3034) — custom fields go to custom Word properties. Confidence: MEDIUM.

### What Copilot Studio's semantic index sees in the .docx

Indexed: body text paragraphs, heading text (H1/H2/H3), table cell text.

NOT indexed: Word document properties (standard or custom), hidden text, comments, tracked changes.

**Consequence chain:**

```
YAML: doc_id: RE-042
  → pandoc →
Word custom property: doc_id = "RE-042"  (not body text)
  → Copilot Studio semantic index →
NOT INDEXED — agent cannot retrieve or cite "RE-042"
```

**Implication for EEE standard:** The bold-inline header block rendered as visible body text from frontmatter is architecturally essential. The EEE decision (D3 — H1 → block → Summary → sections) is correct for grounding. If the header block were removed and only frontmatter retained, Doc ID, Platform, Owner, and Status would become invisible to the agent.

---

## Finding 6 — What Becomes the Citation Title

Microsoft Learn does not explicitly document the precedence order for citation titles on SharePoint .docx files.

What is known:
- The SharePoint knowledge source filter UI exposes a "Title" attribute — this refers to the **SharePoint Title column** (a list managed property).
- When a .docx is uploaded to SharePoint, the SharePoint Title column defaults to the **filename without extension** unless explicitly set or a default column value is configured.
- The Word document title property (populated by pandoc from the YAML `title:` field) is stored in Word's docProperties.xml. It is NOT automatically promoted to the SharePoint Title column.
- The document's first H1 heading is NOT automatically used as the SharePoint Title column.

**Confidence: MEDIUM.** Microsoft Learn is silent on exact precedence. Verify at plan time.

**Recommended verification:** Upload a test .docx with (a) a filename like `re-042-test.docx`, (b) a SharePoint Title column set to "Test SOP Title", and (c) a Word document title property set to "Word Title Property", and (d) an H1 of `# Actual H1 Heading`. Then trigger an agent query and check which string appears as the citation label.

**Implication for EEE standard:**

- The citation title is most likely the SharePoint Title column value, which defaults to the filename.
- Teams should set the SharePoint Title column to a human-readable SOP title (matching the H1 heading) after upload, rather than relying on filename conventions.
- If using pandoc, the YAML `title:` value goes to a Word property that does NOT auto-populate the SharePoint Title column — a post-upload step (manual, Power Automate flow, or SharePoint column default with a calculated value) is needed to surface the proper title in citations.
- Flag for roadmap: citation title hygiene is a content-ops concern, not a doc-format concern. The EEE standard should specify the expected SharePoint Title column value and note how to set it.

---

## Finding 7 — The EEE Header Block as the First Retrievable Chunk

Given that YAML frontmatter becomes document properties (not body text) and the semantic index processes body text, the first content seen by the indexer in a converted .docx is:

```
[H1 heading text]
[Bold header block: Doc ID · Platform · Doc Type · Owner · Last Reviewed · Status]
[## Summary]
[Summary paragraph]
[Gate blockquote (if present)]
[Body sections...]
```

For a typical SOP (5-20 KB), the H1, entire header block, and Summary section are very likely to land in the first semantic chunk(s).

**Does the header block help or harm the lead chunk?**

It helps:
- **Doc ID** (`RE-NNN`) gives the agent a unique identifier to cite and users can query by it
- **Platform** label makes platform-scoped queries accurate without needing metadata
- **Status** as body text allows the agent to answer "is this doc approved?" from the content itself
- **Owner** and **Last Reviewed** are answerable as factual queries without metadata
- **`## Summary`** immediately after provides the dense scope statement most likely to match user queries semantically

Risk to avoid: if the header block is rendered as a table with many rows or a long multi-line block, it dilutes the semantic signal near the start of the chunk. Keep it compact — a single visual paragraph of bold inline fields (`**Doc ID:** RE-042 · **Platform:** Windows · ...`) is better than a six-row key-value table.

---

## Finding 8 — SharePoint "Draft vs. Approved" State vs. EEE Status Field

### SharePoint content approval (a real feature, separately configured)

SharePoint document libraries can have "Require content approval" enabled (Library Settings > Versioning Settings). When enabled:

- Items move through states: Pending → Approved (or Rejected)
- **Draft/Pending items are NOT crawled by SharePoint search by default**; they are invisible to general users and the search crawl account
- Only approved items are visible to users who cannot manage the library

**Sources:**
- [Draft items are not crawled in SharePoint](https://support.microsoft.com/en-us/office/draft-items-are-not-crawled-in-sharepoint-9198c307-13d6-425c-a174-542a60e410e4) — Microsoft Support. Confidence: HIGH.
- [Require approval of items in a list or library](https://support.microsoft.com/en-us/office/require-approval-of-items-in-a-list-or-library-cd0761c4-8c3f-4ea2-9435-13c28aa23d08) — Microsoft Support. Confidence: HIGH.

**For Copilot Studio's semantic index specifically:** Microsoft Learn does not document whether the semantic index respects SharePoint content approval states. The search crawl behavior (draft items excluded) is documented for SharePoint search; whether the Copilot Studio semantic index has the same exclusion is not explicitly confirmed. MEDIUM confidence — verify at plan time.

### EEE `Status: Draft` / `Status: Approved` field

The EEE `status:` frontmatter key → rendered as "**Status:** Draft" or "**Status:** Approved" in the bold header block → body text in .docx. This field:

- CAN be found and reported by the agent if a user asks "which docs have Draft status?"
- Does NOT prevent a Draft-status doc from being indexed or retrieved by Copilot Studio
- Has NO connection to SharePoint's content approval workflow
- Is a human-readable label only

**Implication for EEE standard:**

There is a gap between user expectation and platform behavior. If the requirement is that `Status: Draft` docs must NOT surface in agent responses, the EEE `status:` body-text field alone does not achieve this. SharePoint content approval must also be enabled on the library, and draft files must be kept in Pending state. The EEE body-text label is sufficient only for the requirement that users can read the status and the agent can report it when asked.

This is a design decision that must be documented in the EEE standard spec: "Is `Status: Draft` intended to gate retrieval (requires SharePoint content approval + workflow) or only to label docs for human readers and agent reporting?"

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|------------------------|
| MD → .docx → SharePoint | MD → PDF → SharePoint | If page-level citation granularity outweighs edit simplicity; PDF pipeline harder to maintain for a living corpus |
| .docx with visible body-text header block | .docx with YAML→Word properties only | Never — Word doc properties not indexed by Copilot Studio semantic index |
| SharePoint + Copilot Studio built-in semantic index | Azure AI Search as indexing layer | If Doc ID / Status must be filterable/retrievable as properties rather than body text; significantly higher infrastructure complexity |
| Document-level citations (.docx) | Page-level citations (PDF) | Only if PDF output is added to the pipeline and per-page layout discipline is maintained |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| .md files uploaded directly to SharePoint library | Not supported as a SharePoint knowledge source file type | Convert to .docx before uploading |
| YAML frontmatter as the sole carrier of Doc ID / Status | Becomes Word document properties after pandoc; NOT indexed by Copilot Studio semantic index | Render EEE header block as visible body text |
| SharePoint managed metadata columns for Doc ID / Status (without Azure AI Search) | Custom properties not indexed by Copilot Studio built-in semantic index | Include metadata as visible body text in the header block |
| EEE `Status: Draft` label as a retrieval gate | Copilot Studio ignores this body-text label for access control | SharePoint content approval feature if gating is required |
| Heading-level anchor links in .docx citations | .docx citations are document-level only; no section/heading deep links are generated | Use short, well-titled SOPs; consider PDF pipeline if page-level granularity is needed |

---

## Sources (All Verified 2026-07-03)

| Source | URL | Date | Confidence |
|--------|-----|------|------------|
| Upload files as a knowledge source (file types, .md support) | https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-file-upload | 2026-04-22 | HIGH |
| Add unstructured data (SharePoint/OneDrive file types, page-level PDF citations) | https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-unstructured-data | 2026-06-11 | HIGH |
| Quotas and limits (all file size/count limits, citation fallback) | https://learn.microsoft.com/en-us/microsoft-copilot-studio/requirements-quotas | 2026-06-30 | HIGH |
| Use SharePoint content for generative answers (semantic index, auth) | https://learn.microsoft.com/en-us/microsoft-copilot-studio/nlu-generative-answers-sharepoint-onedrive | 2026-06-17 | HIGH |
| Add SharePoint as a knowledge source (Title filter, file types) | https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint | 2026-06-30 | HIGH |
| Pandoc User's Guide (YAML → Word document properties) | https://pandoc.org/MANUAL.html | Current | HIGH (standard fields); MEDIUM (custom fields) |
| Pandoc GitHub Issue #3034 (custom YAML → custom Word properties) | https://github.com/jgm/pandoc/issues/3034 | 2016 (open issue) | MEDIUM |
| Draft items are not crawled in SharePoint | https://support.microsoft.com/en-us/office/draft-items-are-not-crawled-in-sharepoint-9198c307-13d6-425c-a174-542a60e410e4 | Current | HIGH |
| Require approval of items in a list or library | https://support.microsoft.com/en-us/office/require-approval-of-items-in-a-list-or-library-cd0761c4-8c3f-4ea2-9435-13c28aa23d08 | Current | HIGH |
| SharePoint Knowledge Sources — The Metadata Problem (Lee Ford) | https://www.lee-ford.co.uk/posts/sharepoint-knowledge-sources-in-copilot-studio-the-metadata-problem/ | 2024 | MEDIUM (community post; verify at plan time) |

---

## Verify at Plan Time (Open Questions)

| Question | Why Unknown | How to Verify |
|----------|------------|---------------|
| Citation title precedence: SharePoint Title column vs. filename vs. Word title property | Microsoft Learn is silent on exact order | Upload test .docx with mismatched values; check citation label in agent response |
| Whether Copilot Studio semantic index excludes SharePoint content-approval draft/pending items | Documented for SharePoint search; semantic index behavior not stated | Enable content approval on a test library; upload doc as pending; query agent |
| Exact chunk boundaries for typical SOP length | No public specification | Empirical: ask narrow questions about content at different positions in a test SOP; observe retrieval |
| Whether pandoc version affects custom property promotion behavior | Version-specific pandoc behavior | Pin pandoc version in pipeline; test output with `doc_id:` in YAML |
| Whether setting Word title property via pandoc `title:` causes SharePoint to use it as Title column | Not documented | Upload test .docx with pandoc-set title property; check SharePoint Title column value |

---

*Grounding platform research for: v1.15 EEE SOP documentation-standard retrofit*
*Researched: 2026-07-03*
