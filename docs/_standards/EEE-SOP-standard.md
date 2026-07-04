---
doc_id: STD-001
status: Approved
owner: Schweinehund
doc_type: Reference
platform: all
last_verified: 2026-07-04
review_by: 2026-10-02
---

**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** STD-001 · **Status:** Approved

# EEE SOP Standard

## Summary

This document defines the EEE SOP standard governing format, metadata, and normalization rules
for the Copilot Studio / SharePoint grounded knowledge base. It is the canonical reference for
the D1 platform-normalization map, the D-05 visible header block format, the Doc Type taxonomy,
and the Phase-115 C17 enforcement needle-spec. Downstream deliverables — templates (Plan 03),
the Doc ID registry (Plan 04), and Phases 116–118 corpus retrofit — all conform to this standard.

## Purpose and Scope

The EEE SOP standard exists to make the documentation knowledge base reliably queryable by
Microsoft Copilot Studio. Copilot grounds answers in the SharePoint-indexed `.docx` versions of
operator runbooks and reference docs, returning clickable document-level citations. For that to
work, each document must carry structured metadata — Doc ID, Platform, Doc Type, Status — as
**visible body text** so it survives the Pandoc `MD→.docx` conversion and is indexed by the
SharePoint connector.

The standard governs:
- Required YAML frontmatter keys and their format constraints (harness validation source of truth)
- The single-line visible header block that renders metadata as body text (retrieval layer)
- The D1 platform-normalization map (20 raw corpus values → clean visible labels)
- The Doc Type taxonomy with edge-case rulings
- Semantics for `last_verified` on retrofit (D2 verbatim-carry rule)
- Status vocabulary and supersedence convention
- Phase-1 corpus scope boundaries

This standard applies to all Phase-1 in-scope corpus documents. Meta-documents
(`docs/_standards/`, `docs/_registry/`) and authoring scaffolds (`docs/_templates/`) are
governed by this standard but do **not** belong in the indexed SharePoint library.

## Required Frontmatter Schema

Every in-scope corpus document and template must carry these seven YAML frontmatter keys, in
the order listed:

| Key | Type | Format | Required by C17? | Notes |
|-----|------|--------|-----------------|-------|
| `doc_id` | string | `RE-NNN` (corpus) or `STD-NNN` (meta-docs) | Yes | Assigned from `docs/_registry/RE-index.md`; templates carry `RE-[FILL-IN]` |
| `status` | string | `Draft` \| `Approved` \| `Superseded` | Yes | New docs default `Draft`; owner promotes to `Approved` |
| `owner` | string | Person name or role identifier | Yes (key presence only) | Internal tracking; never rendered in the visible block (D-01); not lintable as role-only |
| `doc_type` | string | `Runbook` \| `Guide` \| `RCA` \| `Reference` | Yes | Audience-agnostic; see Doc Type Taxonomy section |
| `platform` | string | Raw corpus value; must resolve in D1 map | Yes (via D1 map) | Templates that carry a pipe-list placeholder (`all`) must set `platform: all` + HTML comment |
| `last_verified` | ISO date | `YYYY-MM-DD` | Yes (non-SENTINEL) | On retrofit, carry `last_verified` verbatim — do NOT reset the staleness clock (D2); templates use the sentinel `1970-01-01` |
| `review_by` | ISO date | `YYYY-MM-DD`; ≤ 90 days after `last_verified` | No (C10 enforces for Linux docs) | Harness-enforced freshness gate; templates carry `YYYY-MM-DD` placeholder |

### TEMPLATE-SENTINEL

Templates set `last_verified: 1970-01-01 # TEMPLATE-SENTINEL` so that freshness-check validators
(C10 and C17) skip them without a violation. Any file whose `last_verified` is the sentinel date
`1970-01-01` is treated as an authoring scaffold, not a live corpus document. Do not use this
sentinel in a real corpus doc.

## Visible Header Block Format

The visible header block is a **single inline paragraph** immediately after the frontmatter
close (`---`) and before the document H1 title. This is the retrieval-necessary metadata layer.

### Why the block is mandatory

Pandoc 3.7.0.2 promotes all non-standard YAML frontmatter keys to invisible Word custom document
properties (`docProps/custom.xml`). These custom properties are **not indexed** by the SharePoint
connector or Copilot's semantic index — they are invisible at query time. The visible body-text
block is the only mechanism that makes Doc ID, Platform, Doc Type, and Status queryable. This is
the load-bearing EEE thesis, empirically confirmed in PIPE-02 Q2 and Q4. (OQ4)

### Format specification (D-05)

```
**Platform:** [normalized-label] · **Doc Type:** [Runbook|Guide|RCA|Reference] · **Doc ID:** [RE-NNN] · **Status:** [Draft|Approved|Superseded]
```

Rules:
- **Field order:** Platform first, Doc Type second, Doc ID third, Status fourth — exactly four fields.
- **Separator:** `·` (U+00B7 middle-dot). This is the PIPE-02-validated separator. Do NOT use `|`
  (GFM-table collision risk) or `-` or any other character.
- **Single inline paragraph:** NOT a markdown table, NOT a block-quote, NOT a YAML code fence.
- **Bold labels are cosmetic:** Copilot strips markdown formatting on recitation; indexed text is
  identical whether labels are bold or plain. Bolding the label is the project convention.
- **`owner` is NOT in the block (D-01):** Owner is a frontmatter-only field. Including it in the
  block would inject a person name into the lead retrieval chunk for zero citation gain (Copilot
  citations are filename-driven — OQ1), while creating answer-attribution noise and PII surface.
  C17 asserts `owner` presence in frontmatter; it never evaluates `owner` against the block.
- **`Last Reviewed` is NOT in the block (D-05):** Rendering `last_verified` in the block would
  inject a potentially stale-looking date into the lead chunk for no retrieval gain. The D2
  verbatim-carry rule (see D2 Last Reviewed Semantics) satisfies META-04 via frontmatter and the
  Version-History row — not via block rendering.

### Structure invariant

`## Summary` must be the **first H2** heading after the H1 title. No H2 or H3 heading may appear
between the header block and the `## Summary` section. No blockquote or non-heading body-text
may appear between H1 and `## Summary`. This ensures the block and the Summary paragraph form a
single high-density lead retrieval chunk.

### Example

```markdown
**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** RE-042 · **Status:** Approved

# Device Not Registered in Autopilot

## Summary

Step-by-step L1 runbook for diagnosing and resolving the most common Windows Autopilot device
registration failure. Covers hardware hash retrieval, tenant mismatch verification, and
MDM-enrollment state reset. Read-only diagnostic steps only — escalate to L2 for registry edits.
```

## Doc Type Taxonomy

The controlled vocabulary for `doc_type` contains exactly four values:

| Value | Description | Typical docs |
|-------|-------------|--------------|
| `Runbook` | Procedural walkthrough for operators; L1 or L2 scope; step-by-step instructions | `l1-runbooks/`, `l2-runbooks/` |
| `Guide` | Procedure doc for an audience with broader scope than a runbook; covers setup or configuration end-to-end | `admin-setup-*/`, `end-user-guides/` |
| `RCA` | Post-incident root cause analysis; included for forward-compatibility — no RCA docs exist in Phase-1 | *(deferred to v1.16)* |
| `Reference` | Lookup material with no procedural walkthrough; tables, matrices, code/error-code listings, feature comparisons | `reference/`, `error-codes/`, comparison docs |

### D-02 Edge-case rulings

- **Comparison documents** (`apv1-vs-apv2.md`, `windows-vs-macos.md`) → `Reference`. These are
  lookup and decision-support material, not procedural walkthroughs.
- **Error-code documents** (`error-codes/`) → `Reference`. Error-code tables and lookup material
  classify as Reference regardless of audience.
- **End-user guides** (`end-user-guides/`) → `Guide`. These are audience-facing procedural docs;
  they share the Guide classification with admin-setup guides. `doc_type` is **audience-agnostic
  by design** — the admin-vs-end-user audience distinction is discriminated by `platform`, the H1
  title, and the `## Summary` content, not by `doc_type`.

### RCA forward-compat note

RCA is a taxonomy member so that the C17 harness and registry schema can accept RCA docs in
v1.16 without a schema change. No RCA documents exist in the Phase-1 corpus; the RCA template
is deferred to v1.16.

## D2 Last Reviewed Semantics

**Rule (META-04):** On Phase-1 retrofit, `last_verified` is carried **verbatim** from the
existing frontmatter — the staleness clock is **not** reset. The value present in the
pre-retrofit frontmatter becomes the value in the post-retrofit frontmatter. This reflects the
fact that v1.15 is a reformat-only reshape: the EEE block, structure, and metadata keys are
added, but the content is not re-reviewed. Content accuracy review remains the normal 90-day
freshness cadence's responsibility.

### One-time Version-History row rule

Every retrofitted document receives **one additional row** in its `## Version History` table:

```markdown
| YYYY-MM-DD | v1.15 EEE reformat — content not re-reviewed |
```

where `YYYY-MM-DD` is the date the retrofit commit was authored. This row:
- Documents that the document received the EEE format reshape
- Explicitly states that the content was **not** re-reviewed (distinguishing it from a normal
  review cycle)
- Does NOT update `last_verified` — the frontmatter date remains verbatim

If a document does not yet have a `## Version History` section, one is created with this row as
its first entry plus the document's original creation row if known.

## Status Values

The `status` frontmatter key and its corresponding value in the visible header block use a
controlled vocabulary of exactly three values:

| Value | Meaning | Who sets it |
|-------|---------|-------------|
| `Draft` | Document is incomplete, under review, or not yet owner-approved | Default for all new docs |
| `Approved` | Owner has reviewed and approved content; eligible for indexed library | Document owner |
| `Superseded` | Document has been replaced by a newer version | Author + registry update |

### Supersedence convention

When a document is superseded:
1. Update the superseded doc's `status` to `Superseded` and add a note "see RE-NNN" in the
   `## Version History` row or visible block context.
2. The new replacement doc carries `status: Approved` (or `Draft` if not yet approved) and
   includes "Supersedes RE-NNN" in its `## Version History` table.
3. Remove the superseded doc from the indexed SharePoint library (archive-scope-exclusion is
   the primary control — do not rely on the `Superseded` body-text label as a retrieval gate).

### Status vocabulary is final for Phase-1

No additional status values are introduced in v1.15. RCA and future doc classes may use the
same vocabulary.

## Grounding Notes

These notes record the empirical findings from Phase-113 PIPE-02 grounding validation that
inform the architectural choices in this standard. Every downstream agent or operator making
changes that affect the grounding behavior should read PIPE-02-FINDINGS.md.

### Body-text-only indexing (OQ4)

Pandoc 3.7.0.2 promotes all non-standard YAML frontmatter keys to invisible Word custom document
properties (`docProps/custom.xml`). **These properties are not indexed by the SharePoint
connector.** The SharePoint / Copilot semantic index reads only the `.docx` body text. As a
result:
- `doc_id`, `status`, `owner`, `doc_type`, `platform`, `last_verified`, `review_by` — all land
  in invisible custom properties and are **not queryable** by Copilot.
- The visible body-text header block (`**Platform:** ... · **Doc Type:** ... · **Doc ID:** ...
  · **Status:** ...`) is the **sole retrieval mechanism** for these metadata fields. Without the
  block, metadata is invisible to Copilot at query time.

This is the load-bearing architectural fact behind D-01 (owner frontmatter-only), D-05 (no
Last Reviewed in block), and the entire EEE format.

### Document-level-only citations (OQ1 / SC4)

Copilot Studio citations are **filename-driven** — every citation title in PIPE-02 testing
rendered as the raw `.docx` filename (e.g., `01-device-not-registered.docx`) with the `.docx`
extension visible, not the H1 heading, not a SharePoint Title column value, and not the Doc ID.
Citations are **document-level** (whole-file `.docx` references; no section or page anchors).

Implications:
- Filename quality matters for citation label quality. A v1.16 descriptive-filename
  normalization pass is flagged (REQUIREMENTS.md) but deferred.
- Doc IDs in the visible block do NOT drive citation titles. Their function is enabling
  "What does RE-047 cover?" queries to return doc content (rather than the registry row).

### Draft status is a label, not an index gate (OQ2)

**Status: Draft is a label, not an index gate — exclude Draft/superseded docs by library
scoping (or SharePoint content-approval), never by relying on the body-text label.**

PIPE-02 Q5 confirmed that a doc with `Status: Draft` in the body-text block was indexed and
retrieved by Copilot without restriction — the Draft label appeared in the Copilot response
verbatim from body text, but did not prevent retrieval. Draft exclusion from the production
library must be achieved by:
- **Library scoping:** deploy only Approved docs to the indexed SharePoint library (operator
  responsibility, documented in `scripts/pipeline/README.md §SC3`).
- **SharePoint content-approval** (tenant/ops config, deferred to deployment as a hardening
  lever if provable Draft un-retrievability is required).

Never design a workflow that relies on the `Status: Draft` body-text label to block retrieval.

### Excluded directories

`docs/_standards/` and `docs/_registry/` are meta-documentation and **must not** be uploaded
to the indexed SharePoint library or processed by the `.docx` conversion walk. If the registry
(`RE-index.md`) is indexed, doc-specific queries ("What does RE-047 cover?") return the registry
row instead of the document content. Exclude these directories from all batch-conversion and
upload scripts.

## Phase-1 Scope

### In scope (D-03 positive-named classes)

Phase-1 EEE retrofit covers exactly three named doc classes:

1. **L1/L2 runbooks** — `docs/l1-runbooks/` and `docs/l2-runbooks/` (~75 documents). Retrofitted
   in Phase 116.
2. **Admin-setup guides** — `docs/admin-setup-*/` (APv1, APv2, Android, iOS, macOS, Linux,
   802.1X; ~66 documents). Retrofitted in Phase 117.
3. **Reference class** — `docs/reference/`, `docs/error-codes/`, `docs/end-user-guides/`,
   `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md` (~37 documents). Retrofitted in Phase 118.

Total Phase-1 scope: ~178 documents. All receive RE-NNN Doc IDs assigned in `docs/_registry/RE-index.md`.

### Out of scope (D-04 — deferred to v1.16)

The following directories are **outside Phase-1** and will be brought under EEE + C17 in v1.16:

- `docs/operations/` (~20 documents) — owner-confirmed 2026-07-04
- `docs/device-operations/` (~5 documents) — owner-confirmed 2026-07-04
- `docs/cross-platform/apple-business/` (~20 documents) — owner-confirmed 2026-07-04

Also deferred to v1.16: glossaries (`docs/_glossary-*.md`), decision trees
(`docs/decision-trees/`), navigation hubs (`docs/index.md`, `docs/quick-ref-*.md`), lifecycle
docs (`docs/*-lifecycle/`), and architecture docs.

These docs are not assigned RE-NNN IDs in the Phase-1 registry.

## D1 Platform Normalization Map

The D1 map translates raw `platform:` frontmatter values from the corpus into clean visible
labels for the body-text header block. C17 implements this map at harness level; Phase 114
authors the map as the authoritative specification.

| Raw `platform:` value | Clean visible label |
|-----------------------|--------------------|
| `Windows` | Windows |
| `windows` | Windows |
| `macOS` | macOS |
| `macos` | macOS |
| `iOS` | iOS |
| `ios` | iOS |
| `Android` | Android |
| `android` | Android |
| `Linux` | Linux |
| `linux` | Linux |
| `all` | All Platforms |
| `windows+macos+ios+android+linux` | All Platforms |
| `cross-platform` | Cross-Platform |
| `apple-tv` | Apple TV |
| `iOS,Android` | iOS + Android |
| `ios+macos` | iOS + macOS |
| `ios+ipados+macos` | iOS / iPadOS / macOS |
| `ios+ipados+macos+tvos` | iOS / iPadOS / macOS / tvOS |
| `ios+macos+shared-ipad` | iOS + macOS + Shared iPad |
| `ios+shared-ipad` | iOS + Shared iPad |

**Total: 20 entries.** Enumerated by direct corpus grep against the repository
(`grep -rhi "^platform:" docs --include="*.md"`) on 2026-07-04.

### No-fallback rule (D-09 / META-03)

> **An unmapped `platform:` value is a HARD FAILURE. There is NO silent fallback.**

If a file carries a `platform:` value not in the table above, C17 FAILs that file. The
harness does not produce a default label, a warning-only result, or a partial pass. This
rule applies to all corpus files and templates in C17's scope.

This ensures that every new platform variant — including future Apple compound platforms or
new OS families — must be explicitly added to this map before any document using it can pass
the gate. Undeclared variants surface immediately rather than silently reaching the indexed
library with an incorrect or missing label.

### Notes on "All Platforms" entries

Both `all` and `windows+macos+ios+android+linux` map to the clean label `All Platforms`.
They are semantically identical — both indicate a doc covering all supported platforms. The
raw frontmatter value is preserved in YAML (so tooling can distinguish them if needed), but
the body-text block renders the same label. C17 does not require these two raw values to
produce different block text.

### Template pipe-list placeholders (NOT in this map)

The three templates (`admin-template.md`, `l1-template.md`, `l2-template.md`) previously
carried pipe-list `platform:` values (`Windows | macOS | all`, `Windows | macOS | iOS |
Android | all`). These are **not real corpus variants** and are **not in the D1 map**. Plan 03
(D-07) replaces these with `platform: all` + an HTML comment. Adding pipe-list values to the
D1 map would pollute the normalization authority with authoring-instruction strings.

---

## C17 Enforcement Reference (Needle-Spec for Phase 115)

C17 is the machine-checkable harness check that enforces this standard across the corpus. It
is authored as **one indivisible validator atom** in Phase 115. Phase 114 produces this
needle-spec ONLY — no validator is wired into `scripts/validation/` in this phase.

### C17 Assertion List (13 assertions)

| # | Assertion | Source in this standard |
|---|-----------|------------------------|
| 1 | No Mermaid code fences in Phase-1 corpus files | Existing constraint (P-06 anti-pattern) |
| 2 | H1 present exactly once; first non-frontmatter non-block content line | D3-A structure; Visible Header Block Format section |
| 3 | H1 content ≠ bare doc-ID pattern (`^RE-\d+$`) | D3-A structure |
| 4 | `## Summary` is first H2 (no intervening H2 or H3 between header block and Summary) | Visible Header Block Format — Structure invariant |
| 5 | `## Summary` section body ≥ 30 words of prose content | Grounding requirement; 30-word threshold from ROADMAP Phase-115 SC2 |
| 6 | Header block is a single inline paragraph, NOT a markdown table | Visible Header Block Format — Format specification (D-05) |
| 7 | Platform and Doc Type appear before Doc ID and Status in the block | D-05 field order: Platform · Doc Type · Doc ID · Status |
| 8 | Required frontmatter keys present: `doc_id`, `status`, `owner`, `doc_type`, `last_verified` | Required Frontmatter Schema section |
| 9 | Each visible block field matches the corresponding frontmatter value; Platform resolved via D1 map | D-05; D1 Platform Normalization Map section |
| 10 | `platform` value resolves in D1 map — HARD FAILURE on unmapped value (no fallback) | D1 Platform Normalization Map — No-fallback rule (D-09) |
| 11 | Markdown tables with >25 rows have a prose summary paragraph within 5 lines of the table | D2 table-remediation rule (OQ3 / Phase-118 belt-and-suspenders) |
| 12 | Gate blockquote (if present) ≤ 200 characters | Existing constraint (PITFALLS.md P-06 Sub-risk B) |
| 13 | `status` frontmatter value ∈ `{Draft, Approved, Superseded}` | Status Values section |

### Phase-114 additions to the needle-spec

| Item | Needle-spec text for Phase 115 |
|------|-------------------------------|
| Block field set | Exactly four fields — `{Platform, Doc Type, Doc ID, Status}` — in that order; no additional fields |
| Owner placement | `owner` required in YAML frontmatter; `owner` ABSENT from the visible block; C17 never evaluates owner against block text |
| Block format | Single inline paragraph using `·` (U+00B7 middle-dot) as the separator; no other separator character is valid |
| Platform resolves | `platform` frontmatter value must resolve in the 20-entry D1 map in this document; unmapped = HARD FAILURE, no fallback |
| Status vocabulary | `status` frontmatter value ∈ `{Draft, Approved, Superseded}` (Phase 115 determines case-sensitivity handling) |
| Summary word-count | `## Summary` section body contains ≥ 30 words of prose (not including headings or code fences) |

### Template behavior note

Templates (`docs/_templates/*`) carry placeholder values: `doc_id: RE-[FILL-IN]`,
`owner: [FILL-IN]`, and `status: Draft`. On templates, C17 asserts:
- Key **presence** for all five required frontmatter keys
- `platform:` value **resolves in the D1 map** (templates must carry a valid mapped value, not
  a pipe-list placeholder — D-07 ensures this)
- **Structural rules** (H1, block format, single inline paragraph, `## Summary` first H2)

C17 does NOT assert frontmatter-value-to-block-field equality on template placeholder text
(`RE-[FILL-IN]` does not need to match the block's `RE-[NNN]`). Once a template is instantiated
as a real corpus document and assigned an actual `doc_id`, the equality assertion applies.

### Validator-atom deferral

Phase 114 authors this needle-spec as the handoff artifact only. The C17 validator is
authored as one indivisible atom in Phase 115 and registered in the harness chain. No new
validator is wired into `scripts/validation/` during Phase 114 or during corpus-retrofit
Phases 116–118. The validator-atom deferral convention (introduced in v1.13 Phase 100, carried
in v1.14 Phase 112) ensures C17 is never partially live across content phases.

---

## Version History

| Date | Change |
|------|--------|
| 2026-07-04 | Initial version — EEE SOP standard for Phase-1 corpus retrofit (v1.15); all sections authored including D1 normalization map (20 entries) and C17 needle-spec handoff |
