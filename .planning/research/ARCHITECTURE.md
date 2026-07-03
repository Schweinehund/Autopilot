# Architecture Research: Metadata Representation + Header-Block Placement

**Domain:** Markdown-to-DOCX knowledge base grounded in Copilot Studio / SharePoint
**Researched:** 2026-07-03
**Confidence:** HIGH (Questions 1, 2, 5); MEDIUM (Questions 3, 4)

---

## Core Finding (Read This First)

**The visible EEE header block is retrieval-necessary, not merely human-facing.**

YAML frontmatter and SharePoint managed-metadata columns are both effectively invisible
to the native Copilot Studio grounding pipeline. Only visible body text gets indexed and
embedded. The bold-inline header block rendered from frontmatter is the only metadata
signal that the semantic retrieval layer will actually process. This validates the decided
approach (D3-A: `# Title → block → ## Summary → gate → sections`) on retrieval grounds,
not just readability grounds.

---

## Q1: What Is Actually Searchable/Filterable in Copilot Studio + SharePoint?

### YAML Frontmatter — Invisible to Grounding

When Markdown converts to DOCX (via Pandoc or equivalent), YAML frontmatter is parsed
as document-property metadata and written to DOCX custom properties — it does NOT appear
as visible body text. SharePoint's semantic index indexes file *content* (body text), not
DOCX custom properties. Result: frontmatter keys and values are not embedded, not
retrieved, and not cited.

Additionally, Markdown (.md) files stored directly in SharePoint document libraries are
not retrievable or citable as Copilot Studio knowledge sources at all. The semantic index
supported file types are DOCX, PDF, PPTX, ASPX, and OneNote. The .md extension is
explicitly confirmed unsupported: users report that .md files "don't appear to be
discovered at all on the SharePoint site" as a knowledge source (Microsoft Community Hub
discussion, 2026). The "Markdown→.docx" conversion in the project spec is therefore
mandatory, not optional.

**Verdict:** YAML frontmatter is invisible to grounding. Keep it as the single source of
truth for harness validation (C10, C17), but do not rely on it for retrieval.

### SharePoint Managed-Metadata Columns — Unreliably Invisible in Copilot Studio

Microsoft Learn states that "column metadata can be incorporated as signals during
retrieval when a query is scoped to a specific library or folder." In practice this
applies only when a *user actively attaches* a library URL in a prompt — it does not
apply to agent-level knowledge sources configured at authoring time. Multiple independent
reports (Lee Ford, 2026; Office365Clinic, 2026-05-12) confirm that custom metadata
columns are "never retrieved, not indexed, not stored, and not passed to the agent" in
Copilot Studio's native SharePoint knowledge source mode.

Microsoft roadmap item 516044 promises future column-metadata support for library-scoped
queries but this is not generally available as of mid-2026.

The exception path is Azure AI Search with a SharePoint indexer explicitly configured to
pull custom columns as `filterable` + `retrievable` fields. That path works correctly but
is an infrastructure upgrade, not the current deployment target.

**Verdict:** Managed-metadata columns are unreliable for grounding with the native
knowledge source. Do not architect citation or filtering behavior to depend on them.

### Visible Body Text — The Only Grounding Signal

SharePoint's semantic index embeds all body text from supported file types. The title
(H1), all headings, the header block, the Summary, and the prose sections are all
embedded and retrievable. Citations point to the document and the surfaced passage.

**Verdict:** The visible EEE bold-inline header block, rendered from frontmatter into
the document body, IS the metadata grounding layer. It must exist in the body.

### Implications for the EEE Spec and C17

C17 asserting the visible header block (rendered from frontmatter) is correct *and
necessary for retrieval*, not a cosmetic enforcement. The block should appear between
H1 and `## Summary` so that the heading, block, and summary all appear in the same
lead chunk, giving the LLM both document identity and topic context in one embedding.

---

## Q2: Does the Header Block Before First Prose Degrade the Lead Chunk?

### RAG Research Finding: Brief Metadata Headers Help, They Do Not Hurt

Standard RAG chunking research (2025–2026) consistently finds that prepending structural
metadata to a chunk improves retrieval precision. The header acts as a "breadcrumb trail
that disambiguates the content and enriches the semantic signal available to the embedding
model." The chunk's embedding encodes both *what the chunk says* and *where it sits in
the knowledge structure*. Practitioners describe this as "one of the few free improvements
available in chunking: you are not changing the content, only adding context."

The risk of low-signal noise arises with *verbose* metadata blocks, not terse ones. A
block that is mostly repeated boilerplate (same owner name and date across 150 documents
with no discriminating content) will dilute the topic signal in the lead chunk. The D3
layout (H1 + block + Summary in the same chunk) mitigates this by ensuring the topic
Summary rides in the same embedding as the block.

### Microsoft's Own Guidance Aligns

The Microsoft Learn "Optimizing SharePoint content for Employee Self-Service agents"
document (updated 2026-06-04) states: "A concise summary helps large language models
quickly understand the main topic, purpose, and intended audience of the article." It
explicitly recommends placing a summary at the top so "the LLM can ground its answers in
the most relevant section." The structural guidance is H1 → summary → H2 sections, with
the summary preceding the first section. The EEE layout (H1 → block → ## Summary →
gate-blockquote → sections) is consistent with this pattern; the block is the brief
preamble before the summary.

### Terse Block Threshold

Keep the visible header block to 7 lines or fewer. The right fields to include are those
that serve as *discriminators* — they differ meaningfully across documents:

| Field | Include in visible block? | Why |
|-------|--------------------------|-----|
| Doc ID (RE-NNN) | YES | Unique discriminator; enables "find RE-042" queries |
| Platform | YES | High-value discriminator across 5 platform variants |
| Doc Type | YES | Distinguishes L1 Runbook vs L2 Runbook vs Admin Setup vs Reference |
| Status | YES | Enables "find Active policies" filtering via LLM reasoning |
| Owner | YES (per spec) | Low retrieval value; see Q4 for noise mitigation |
| Last Reviewed | YES (per spec) | Low retrieval value; ISO date format reduces noise |

At 6–7 short bold key:value lines, the block is compact enough that the Summary
paragraph following it dominates the chunk's topic signal.

### Mitigation If Concerned About Chunk Boundaries

If the SharePoint chunker (which is opaque to the author) splits mid-block:

- The H1 title is the most important retrieval signal and is always in its own
  heading element, not in the body chunk.
- Platform and Doc Type should be the first two body lines of the block, so even a
  split chunk retains the discriminators.
- Summary should follow immediately — if it wraps into a second chunk, it does so
  with the block's discriminating lines visible as preceding context.

**Verdict:** LOW risk with the planned terse block. Place Platform and Doc Type first
within the block, ensure Summary follows immediately with no blank sections between.

---

## Q3: Stable Document Identifiers + Registry + Supersedence

### The RE-NNN Identifier Pattern

Sequential stable identifiers (RE-001, RE-042, etc.) work well for knowledge base
document management. Key properties:

- **Stable across renames.** The Doc ID persists even if the document's title, file
  path, or platform focus changes. This prevents broken cross-references.
- **Citable by humans.** Operators can say "RE-042" and the agent can match the block.
- **Citable by agents.** The LLM will surface the Doc ID in its response since it
  appears in the body text, allowing humans to verify the cited doc against the registry.

Starting sequence: assign IDs in one pass during the Phase-1 retrofit to avoid
collisions. Record the confirmed starting number from the owner before authoring begins.

### Registry Design

The registry (flat file: RE-NNN → file path, title, status, doc type, supersedes) should
be a maintenance document, NOT included as a knowledge source in Copilot Studio. If the
registry is in the knowledge source, queries like "what is the status of RE-042?" will
return the registry row rather than the actual document — creating a meta-citation layer
that degrades answer quality.

Recommended registry structure (a single Markdown table or YAML list):

```
| ID     | Title                              | File path                               | Status   | Doc Type   | Supersedes |
|--------|------------------------------------|-----------------------------------------|----------|------------|------------|
| RE-001 | Windows Autopilot Device Reg       | docs/l1-runbooks/01-ap-register.md      | Approved | L1 Runbook | —          |
| RE-042 | macOS ADE Enrollment Overview      | docs/admin-setup-macos/00-ade-lifecycle.md | Approved | Admin Setup | —       |
```

Suggested storage path: `docs/_registry/RE-index.md` — outside the knowledge source
library or in a separate admin-only library not connected to the agent.

### Supersedence Handling

The strongest mitigation against stale-document citation is **scope exclusion**: move
superseded documents out of the active knowledge source library (into an archive library
not connected to the agent). When the LLM cannot reach the document, it cannot cite it.

When scope exclusion is not immediately possible (transition period), surface supersedence
IN THE VISIBLE BODY BLOCK so the LLM can reason about it:

```
**Status:** Superseded — see RE-057
```

Do NOT rely on a SharePoint column Status field alone — it is invisible to grounding. The
in-body Status line is the retrieval-visible signal.

Cross-referencing: add a `Supersedes: RE-NNN` line in the block of the new document.
This allows an agent to surface the replacement when asked about the old topic.

**Verdict:** Registry stays outside the knowledge source. Supersedence expressed in the
visible body block as Status + forward/back reference. Scope exclusion (archive library)
is the primary control; body-text Status is the secondary signal during transitions.

---

## Q4: Owner/Date Repeated Across ~150 Docs — Retrieval Noise

### The Actual Noise Risk

When "Owner: Josh Anderson" appears in 150 document bodies, a semantic query containing
"Josh Anderson" may retrieve many or all of them via keyword match or embedding proximity.
This is a real concern for query-time precision. However, it is bounded: normal
operational queries ("how do I reset the TPM?") do not contain the owner's name and will
not trigger the collision. The risk materializes only when a user explicitly queries on
the owner name — which is a low-frequency operational pattern for an IT knowledge base.

Last Reviewed dates are lower risk because date strings ("2026-05-15") are semantically
distant from operational queries. Use ISO 8601 format (YYYY-MM-DD) to reduce proximity
to natural-language date mentions ("May 2026", "last month").

### Mitigation Strategies

1. **Fixed-format key:value labeling.** Use `**Owner:** Josh Anderson` not a
   free-standing name. The key:value pair is less likely to embed close to bare "Josh
   Anderson" queries than a free-standing name would be. The structured context reduces
   the ambiguity of the proper noun in the embedding.

2. **Owner as frontmatter-only (deferred option).** If retrieval noise proves problematic
   in practice, the owner field can be moved to YAML-only (not rendered in the visible
   block). This does not break C17 — C17 can assert frontmatter keys without requiring
   all keys to appear in the block. The current spec renders it; the EEE spec author
   should explicitly decide which frontmatter keys appear in the block vs. are
   metadata-only. This escape valve should be documented in the spec as available.

3. **Ordering within the block.** Place Doc ID, Platform, Doc Type, and Status BEFORE
   Owner and Last Reviewed. This ensures high-discriminator fields lead the block
   embedding even if chunking splits at the block boundary.

4. **Accepted tradeoff.** For 150 docs owned by one person, some owner-noise is
   unavoidable without removing the field. Keeping it is the right choice for
   accountability and lifecycle governance — Microsoft's own guidance explicitly
   recommends owner + review date metadata for content lifecycle management. Accept the
   tradeoff; it doesn't materially harm the primary use case (operators querying runbooks
   by topic, not by owner).

**Verdict:** Acceptable noise with ISO date format, fixed key:value labeling, and
Doc ID / Platform / Doc Type / Status as the first four block lines (before Owner and
Last Reviewed). Owner removal from the visible block is a documented escape valve if
noise proves a problem at scale.

---

## Q5: Normalized vs Free-Text Field Values and Filterability

### In the Native Copilot Studio / SharePoint Path

Column metadata is not reliably filterable in the native knowledge source (see Q1).
However, the visible body block IS processed by the LLM, which means *LLM-assisted
filtering* applies: when a user asks "find all macOS runbooks," the LLM can reason over
the body text `Platform: macOS` across retrieved chunks and assemble a filtered answer.

For this LLM-assisted filtering to work reliably, the Platform value must be:

- **Consistent.** Every macOS document must say exactly "macOS" (not "macOS 14+",
  "Apple macOS", "macOS (Sonoma/Sequoia/Tahoe)"). One canonical label per platform.
- **Unambiguous.** "iOS/iPadOS" vs "iOS" vs "iPadOS" — each is a distinct label in
  the normalized map, and the LLM will distinguish them correctly IF the body text
  uses the normalized form consistently.
- **Not free-text.** A free-text Platform value like "Apple macOS 14 Sonoma and later"
  embeds differently than "macOS" and will miss LLM filter matches for "macOS" queries.

The D1 hybrid-superset normalization map is architecturally correct for this reason. The
~19–20 granular YAML variants are preserved in frontmatter (harness accuracy), and the
C17 derivation produces the clean visible label (retrieval accuracy).

### In the Azure AI Search Path (Future Upgrade)

When the knowledge source is upgraded to Azure AI Search with a SharePoint indexer:

- Fields marked `filterable: true` in the index schema enable structured filtering (not
  just LLM reasoning).
- Managed metadata term sets (controlled vocabulary) are preferable to free-text for
  filterable fields.
- The D1 normalization map pre-adapts the corpus for this future: the normalized
  visible-block label is also the value that should populate the SharePoint column
  mapped to the filterable index field.

**Verdict:** The D1 normalization decision is correct for both the current LLM-filtering
path and the future Azure AI Search structured-filtering path. Free-text variants in the
visible block would degrade both. The normalization map must be enforced by C17 (not
just documented) to prevent drift as new platform variants appear.

---

## Recommended Placement Architecture

### Document Layout (D3-A Winner)

```
# [Descriptive Action-Oriented Title]              ← H1 (appears in citations)

**Doc ID:** RE-NNN
**Platform:** [Normalized label from D1 map]
**Doc Type:** [L1 Runbook | L2 Runbook | Admin Setup | Reference]
**Status:** [Draft | Approved | Superseded — see RE-NNN]
**Owner:** [Name]
**Last Reviewed:** YYYY-MM-DD

## Summary

[1–3 sentences: scope, audience, safety note for runbooks]

> [gate-blockquote if applicable]

## [First content section]
```

### Why This Order Works for Retrieval

- **H1 title** appears in citations. Make it descriptive ("Reset TPM for Autopilot
  Re-enrollment"), not generic ("Remediation Steps"). The H1 is the single most
  important retrieval and citation signal.
- **Block immediately after H1** means it is in the same lead chunk as the title for
  most chunking strategies. The LLM sees identity + topic in one embedding.
- **Doc ID first in the block** because it is the most unique discriminator. If the
  chunk splits after two lines, the ID and Platform survive the split.
- **Summary immediately after the block:** the topic embedding dominates the chunk.
  A longer block separating H1 from Summary would dilute retrieval precision.
- **Section headings (H2, H3)** within content act as additional retrieval anchors; each
  section should be independently interpretable without requiring the lead chunk.

### YAML Frontmatter (Harness Layer, Not Retrieval Layer)

```yaml
---
doc_id: RE-NNN
status: Approved
owner: Josh Anderson
doc_type: L2 Runbook
last_verified: "2026-05-15"
review_by: "2026-11-15"
applies_to: "Windows 11, Windows 10"
audience: L2
platform: windows-autopilot
---
```

The frontmatter `platform` key holds the granular variant (the ~20 real values); C17
applies the D1 normalization map to derive the visible block label from it. This is the
single source of truth: authors edit frontmatter, C17 validates that the rendered block
matches the derived label. Humans never manually type the visible Platform label.

### Registry (Outside Knowledge Source)

Suggested path: `docs/_registry/RE-index.md` — NOT in the active knowledge source.

Flat table: ID | Title | File | Status | Doc Type | Supersedes | Notes

Maintained manually or by a script that reads all frontmatter `doc_id` + `status`
fields. The registry is the source of truth for supersedence relationships and for
confirming the starting sequence number before Phase-2 authoring.

---

## C17 Assertion Shape (Derived from Architecture)

C17 must assert the following as a pure function of frontmatter:

1. `doc_id` key present and matches the `RE-\d{3}` pattern (or agreed range).
2. `status` key present and has a valid value from the controlled set
   (Draft | Approved | Superseded).
3. `owner` key present and non-empty.
4. `doc_type` key present and has a valid value from the controlled set.
5. The visible header block is present in the document body, between H1 and `## Summary`.
6. Each visible block field (`Doc ID`, `Platform`, `Status`, `Owner`, `Last Reviewed`,
   `Doc Type`) matches the corresponding frontmatter value, with Platform derived via
   the D1 normalization map. C17 FAILS on any unmapped `platform` variant — no silent
   fallback, no default.
7. `## Summary` heading is present and immediately follows the block (no intervening H2
   or H3 sections between the block and the Summary).

**Precondition (C10 lenient-unknown-key):** C10 must pass first to confirm that the
harness does not reject the four new frontmatter keys (`doc_id`, `status`, `owner`,
`doc_type`). Verify C10's unknown-key policy before authoring C17.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                   AUTHORING LAYER (single source of truth)           │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ YAML frontmatter: doc_id, status, owner, doc_type,           │  │
│  │ last_verified, review_by, applies_to, audience, platform     │  │
│  └──────────────────────────┬────────────────────────────────────┘  │
│                             │                                        │
│           C17 asserts       │ derives visible block                  │
│           match             ↓                                        │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │ VISIBLE BODY BLOCK (rendered FROM frontmatter, not authored)  │  │
│  │ Doc ID · Platform (normalized) · Doc Type · Status           │  │
│  │ Owner · Last Reviewed                                         │  │
│  └──────────────────────────┬────────────────────────────────────┘  │
└──────────────────────────── │ ───────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                DOCX CONVERSION + SHAREPOINT UPLOAD                   │
│  YAML frontmatter → DOCX custom properties (NOT indexed)            │
│  Visible body text → Indexed by SharePoint semantic engine          │
└──────────────────────────── │ ───────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│           COPILOT STUDIO GROUNDING (semantic index)                  │
│                                                                      │
│  What the index sees:                                                │
│  · H1 title (citation label)                                        │
│  · Doc ID · Platform · Doc Type · Status (from visible block)       │
│  · Summary (topic signal, discrimination)                            │
│  · Section headings + prose (content)                                │
│                                                                      │
│  What the index DOES NOT see:                                        │
│  · YAML frontmatter (custom properties, not body text)              │
│  · SharePoint column metadata (not read in native knowledge source) │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Anti-Patterns

### Anti-Pattern 1: Metadata Only in Frontmatter / Columns

**What people do:** Put all metadata in YAML frontmatter or SharePoint column metadata,
assuming the grounding system sees it.
**Why it fails:** Both layers are invisible to Copilot Studio's semantic index. The agent
grounds on body text only.
**Do this instead:** Render the metadata into the visible body block. Frontmatter is for
harness validation; body block is for retrieval.

### Anti-Pattern 2: Verbose Header Block (10+ Lines)

**What people do:** Include every frontmatter key in the visible block (applies_to,
review_by, audience, platform granular value, last_verified raw, etc.).
**Why it fails:** Dilutes topic signal in the lead chunk. The block's embedding can
dominate over the Summary and the document's actual content.
**Do this instead:** Limit to 6–7 lines of high-discriminator fields. Extra fields stay
in frontmatter only.

### Anti-Pattern 3: Free-Text Platform Values in Visible Block

**What people do:** Write "Apple macOS 14 (Sonoma) and later" in the visible block to
match the frontmatter granularity.
**Why it fails:** LLM filtering ("find macOS runbooks") will miss documents with
inconsistent labels. Embedding proximity to "macOS" decreases as the string grows longer.
**Do this instead:** C17 derives the normalized label ("macOS") from the variant value in
frontmatter. The visible block always shows the canonical label.

### Anti-Pattern 4: Superseded Docs Left in the Active Knowledge Source

**What people do:** Mark a document superseded via SharePoint column only and leave it
in the active library.
**Why it fails:** The column is invisible to the agent. The superseded content is still
retrieved and cited.
**Do this instead:** Move superseded docs to an archive library excluded from the
knowledge source. Add `Status: Superseded — see RE-NNN` to the visible block as a
secondary signal during any transition period.

### Anti-Pattern 5: Registry in the Knowledge Source

**What people do:** Include the RE-index registry document in the SharePoint knowledge
source library.
**Why it fails:** The LLM retrieves the registry row when users ask about a document,
returning metadata instead of content.
**Do this instead:** Store the registry in `docs/_registry/` or a separate admin library
not connected to the agent.

### Anti-Pattern 6: Treating .md Files as the Deployment Format

**What people do:** Upload raw Markdown files to SharePoint and connect the library as a
knowledge source.
**Why it fails:** Markdown (.md) files are not indexed by the SharePoint semantic index
as of mid-2026. The agent cannot read or cite them.
**Do this instead:** Convert to DOCX (or upload as SharePoint .aspx pages) before
connecting as a knowledge source.

---

## Confidence Assessment

| Finding | Confidence | Sources |
|---------|-----------|---------|
| YAML frontmatter invisible to grounding | HIGH | Pandoc docs (issue #3034); SharePoint semantic index supported-types table; DOCX property behavior |
| .md files not indexed by SharePoint semantic index | HIGH | MS Community Hub thread 2026; semantic index supported types list (DOCX/PDF/PPTX/ASPX/OneNote only) |
| Custom column metadata invisible to Copilot Studio knowledge source | HIGH | Lee Ford 2026; Office365Clinic 2026-05; confirmed against MS Learn semantic index docs |
| Column metadata works when user attaches library URL in prompt | HIGH | MS Learn semantic index docs (explicit statement, April 2026) |
| Visible body text IS indexed | HIGH | MS Learn semantic index docs |
| Terse header block helps retrieval (RAG research) | HIGH | Multiple 2025–2026 RAG papers and practitioner guides |
| Owner field noise is bounded and manageable | MEDIUM | General RAG noise principles; no SharePoint-specific empirical study found |
| Archive library exclusion prevents superseded citation | MEDIUM | General RAG lifecycle guidance (multiple KB platforms); no SharePoint-specific empirical study found |
| Azure AI Search as structured-filtering upgrade path | HIGH | MS Learn Azure AI Search SharePoint indexer docs; Office365Clinic 2026 |

---

## Sources

- [Semantic indexing for Microsoft 365 Copilot — Microsoft Learn](https://learn.microsoft.com/en-us/microsoftsearch/semantic-index-for-copilot) (updated 2026-04-23)
- [Add SharePoint as a knowledge source — Microsoft Copilot Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-add-sharepoint)
- [Optimizing SharePoint content for Employee Self-Service agents — Microsoft Learn](https://learn.microsoft.com/en-us/copilot/microsoft-365/employee-self-service/optimization-sharepoint) (updated 2026-06-04)
- [SharePoint Knowledge Sources in Copilot Studio: The Metadata Problem — Lee Ford (2026)](https://www.lee-ford.co.uk/posts/sharepoint-knowledge-sources-in-copilot-studio-the-metadata-problem/)
- [Filtering SharePoint Custom Metadata in Copilot Studio: Why It Breaks and How to Fix It with Azure AI Search — Office365Clinic (2026-05-12)](https://www.office365clinic.com/2026/05/12/sharepoint-custom-metadata-copilot-studio/)
- [Copilot Studio + SharePoint: Markdown (.md) Files in Doc Libraries — Microsoft Community Hub discussion (2026)](https://techcommunity.microsoft.com/discussions/copilot-studio/copilot-studio--sharepoint-markdown--md-files-in-doc-libraries-supported-as-know/4517314)
- [SharePoint Showcase: Metadata and the Knowledge Agent — Microsoft Community Hub](https://techcommunity.microsoft.com/blog/spblog/sharepoint-showcase-how-metadata-and-the-knowledge-agent-elevate-microsoft-365-c/4464079)
- [Ability to convert YAML front matter into custom properties in DOCX — Pandoc GitHub issue #3034](https://github.com/jgm/pandoc/issues/3034)
- [Boost RAG Retrieval: Chunking, Overlap, Metadata — By AI Team (2026-02-18)](https://byaiteam.com/blog/2026/02/18/boost-rag-retrieval-chunking-overlap-metadata/)
- [How Do RAG Systems Handle Outdated Information? — Am I Cited](https://www.amicited.com/faq/how-do-rag-systems-handle-outdated-information/)
- [SharePoint in Microsoft 365 Indexer — Azure AI Search — Microsoft Learn](https://learn.microsoft.com/en-us/azure/search/search-how-to-index-sharepoint-online)

---

*Architecture research for: v1.15 EEE SOP metadata representation + header-block placement*
*Researched: 2026-07-03*
