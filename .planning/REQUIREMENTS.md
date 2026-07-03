# Requirements: Windows Autopilot & macOS Provisioning Documentation Suite — Milestone v1.15

**Defined:** 2026-07-03
**Milestone:** v1.15 — EEE SOP Documentation-Standard Retrofit (Phase-1)
**Core Value:** IT teams can independently provision, troubleshoot, and manage Windows, macOS, iOS/iPadOS, Android, and Linux devices through Microsoft Intune / Entra ID without escalating to engineering — and (new) find those answers as clean, correctly-cited results in the Copilot Studio / SharePoint knowledge base.
**Research basis:** `.planning/research/SUMMARY.md` (+ STACK / FEATURES / ARCHITECTURE / PITFALLS), committed `1a285c9`. Grounding-platform behavior verified against Microsoft Learn / Copilot Studio / SharePoint + Pandoc docs (HIGH confidence on architectural constraints; MEDIUM on format-dilution magnitudes; LOW on undocumented chunk internals — empirical items flagged for Phase-113 grounding test).
**Gray-area picks resolved via `/adversarial-review`:** D1 = hybrid-superset platform normalization; D2 = carry `last_verified` verbatim; D3 = `# Title → block → ## Summary → gate-blockquote → sections`. Header-block format = **single inline line** (owner-confirmed, research-optimal). Retrofitted already-live docs = `Status: Approved`. Doc ID sequence starts at `RE-001` (literal prefix).

---

## Milestone v1.15 Requirements

Requirements for this milestone. Each maps to exactly one roadmap phase (phases 113+). REQ-IDs continue project-wide conventions; numbering restarts per category prefix. **Phase-1 retrofit scope = L1/L2 runbooks + admin-setup guides (all platforms) + reference docs.** Structural classes (glossaries, Mermaid decision-trees, nav-hubs, lifecycle) are deferred to v1.16 (see Future).

### Category: Conversion Pipeline & Grounding Validation (PIPE)

*Research finding: `.md` is not a SharePoint knowledge-source type — the MD→.docx pipeline is mandatory, and a misconfigured pipeline corrupts all ~150 docs at once, so it is the first deliverable.*

- [ ] **PIPE-01**: The Markdown→.docx conversion pipeline is defined and **locked** — a pinned Pandoc version + a `--reference-doc` Word template + a documented invocation — with a post-conversion guard that fails if raw `---` YAML frontmatter leaks into the first ~500 characters of the generated `.docx` body.
- [ ] **PIPE-02**: A grounding-validation procedure is defined and executed on a representative 3–5-doc set (convert → upload → live Copilot Studio queries) confirming: the single-line header block is indexed as body text, document-level citations resolve, no YAML leak, and capability-matrix tables remain retrievable — and resolving the empirical open questions (citation-title source; whether `Status: Draft` is a retrieval gate or label) before the full retrofit begins. *(Discuss-flag: agent-run vs owner-run if Copilot Studio access is unavailable to the harness.)*

### Category: EEE Standard, Templates & Doc ID Registry (STD)

- [ ] **STD-01**: The canonical **EEE SOP standard** document is authored in-repo (NOT in the grounded library) — defining the single-line header-block format + field vocabulary, the Doc Type taxonomy (Runbook / Guide / RCA / Reference), the D1 Platform-normalization rule, the D2 `Last Reviewed` = `last_verified` semantics, the supersedence convention, and a "grounding notes" section stating the platform realities (visible-body-only indexing; document-level-only citations; Approved-only in the indexed library).
- [ ] **STD-02**: `docs/_templates/*` (admin, L1, L2, per-platform) are updated so every **new** doc is born EEE-conformant — frontmatter keys + single-line header block + `## Summary`-first — with new docs defaulting to `Status: Draft` (only the owner promotes to Approved).
- [ ] **STD-03**: A **Doc ID Registry** is created (flat `RE-NNN`, starting `RE-001`) mapping `RE-NNN → file + descriptive title + doc_type + status`, stored **outside** the grounded library; all Phase-1 Doc IDs are assigned in one collision-free pass before authoring; supersedence is expressed via the registry + archive-scope-exclusion (superseded docs leave the indexed library).

### Category: Metadata Model & Platform Normalization (META)

*Research finding: YAML frontmatter and SharePoint managed-metadata columns are invisible to the semantic index — the visible block is retrieval-necessary, not decorative.*

- [ ] **META-01**: The frontmatter schema is extended with `doc_id`, `status`, `owner`, `doc_type` keys as the single source of truth for the rendered block; **C10 is confirmed lenient on the new keys before any file is edited** (precondition — a strict C10 would fail the whole corpus).
- [ ] **META-02**: The visible EEE header block is a **single inline line rendered from the frontmatter keys**, with **Platform + Doc Type as the first fields** (survive chunk splits) and `## Summary` immediately following the block (no intervening content).
- [ ] **META-03**: A documented **Platform-normalization map** (the D1 EEE spec-extension) covers every real `platform:` frontmatter variant (~19–20: case + separator chaos + Apple compounds + `all`/`cross-platform`) → a clean visible label; an **unmapped value is a hard failure**, not a silent fallback.
- [ ] **META-04**: On retrofit, `Last Reviewed` carries the doc's existing `last_verified` **verbatim** (no staleness-clock reset); each retrofitted doc receives a one-time "v1.15 EEE reformat — content not re-reviewed" Version-History row so the reformat is auditable without asserting a review that did not occur.

### Category: Corpus Retrofit — Phase-1 Doc Classes (RETRO)

- [ ] **RETRO-01**: All **L1/L2 runbooks** (~75) are retrofitted to EEE — `# Title → single-line block → ## Summary → gate-blockquote → sections`; every runbook `## Summary` opens with a one-line scope/safety banner (pulling the read-only-scope / escalation guardrail into the lead retrieval chunk); `Status: Approved`.
- [ ] **RETRO-02**: All **admin-setup guides** (Windows / macOS / iOS / Android / Linux / 802.1X, all platforms) are retrofitted to EEE (header block + Summary-first + normalized Platform label + `Status: Approved`).
- [ ] **RETRO-03**: All **reference docs** (capability matrices, 4-platform comparison, error-codes, cross-platform references) are retrofitted to EEE, **including table remediation** — capability-matrix tables are capped (~25 rows) and/or given a mandatory per-table prose summary so header context survives ~2,000-char chunk boundaries.

### Category: Harness Enforcement & Milestone Close (HARN)

- [ ] **HARN-01**: A new **blocking C17 harness check** is authored as one indivisible validator atom, asserting the EEE contract from Markdown source — the machine-checkable lint surface: required frontmatter + block keys present; block is a single inline paragraph (not a table); Platform + Doc Type first; H1 present, descriptive (not a bare `RE-NNN` code), unique; `## Summary` is the first H2 and meets a minimum word count; `platform` value resolves in the normalization map; no Mermaid fences in Phase-1 classes; reference tables within the row-cap or carrying a prose summary; `Status ∈ {Draft, Approved, Superseded}`; indexed set is Approved-only.
- [ ] **HARN-02**: The **atomic frozen-surface re-baseline** is performed — the deliberate re-pin of all Phase-1 frozen surfaces at the new close SHAs, with the apex and continuity chain validators green together; non-Phase-1 predecessor frozen surfaces remain byte-unchanged.
- [ ] **HARN-03**: The **13th Path-A audit-harness lineage bump** — `v1.15-milestone-audit.mjs` (C1–C17) + `v1.15-audit-allowlist.json` + BASELINE_19 + `check-phase-113..NN.mjs` + `_lib/frozen-at-close.mjs` V114 pin (v1.14 close-gate SHA `7d922a7`) + the 12th parallel CI coexistence workflow (predecessors v1.4–v1.14 byte-unchanged).
- [ ] **HARN-04**: The milestone closes via a **3-axis terminal re-audit** (fresh clone + cross-OS Linux GHA authoritative + fresh zero-context sub-agent; cross-OS EXACT MATCH) **plus the PIPE-02 grounding-validation confirmation**, in a single close-gate commit flipping all v1.15 requirements to Validated across PROJECT / ROADMAP / STATE / REQUIREMENTS.

---

## Discuss-Phase Flags (resolve per-phase via `/adversarial-review`, NOT at roadmap)

Gray-area scoping decisions deferred to `/gsd-discuss-phase` per project convention:

1. **PIPE-02 execution** — agent-run vs owner-run grounding validation if the harness lacks live Copilot Studio access; what "pass" means without programmatic access.
2. **C17 strictness / staging** — ship C17 fully blocking from the start, or informational-then-graduate (v1.5 C9/C11/C13 precedent) given ~150 docs must conform before it can be green.
3. **Retrofit phase granularity** — whether RETRO-02 (admin-setup, ~8 guide sets across 5 platforms) and RETRO-03 (references) each split into multiple phases, and whether runbooks split L1 vs L2.
4. **Owner field placement** — render `Owner` in the visible block vs. frontmatter-only (research escape-valve for owner-name citation noise); C17 asserts key presence regardless.
5. **Reference table remediation depth** — row-cap threshold + whether to split oversized matrices vs. add prose summaries only (RETRO-03).
6. **Summary authoring method** — derive each doc's `## Summary` from its existing intro vs. author fresh; the minimum-word-count threshold for C17.
7. **Doc Type edge cases** — comparison docs (`apv1-vs-apv2.md`, `windows-vs-macos.md`), error-codes, and end-user guides: Reference vs Guide.

---

## Future Requirements (deferred beyond v1.15)

- **v1.16 — Structural doc-class retrofit**: glossaries, Mermaid **decision-trees** (incl. the "no key info in code-fenced diagrams" collision → text-equivalent conversion), nav-hubs (`index.md`, `common-issues.md`, `quick-ref-l1/l2.md`), and lifecycle docs brought under EEE + C17.
- **v1.16 candidate — File-rename pass**: if PIPE-02 finds the Copilot citation title derives from the SharePoint file/page name (not H1), a descriptive-filename normalization pass across the corpus.
- **Deployment — SharePoint content-approval**: if `Status: Draft` must actually gate retrieval (not just label), enabling + maintaining SharePoint content approval on the indexed library (tenant/ops config, not a doc change).
- **Infra — Azure AI Search structured index**: upgrade from the native knowledge source to an Azure AI Search + SharePoint indexer to make `platform`/`doc_type` filterable metadata (the D1 normalized labels are already the right term set).

## Out of Scope (explicit exclusions)

- **Content re-review / accuracy edits** — v1.15 is a reformat-only envelope change; `last_verified` is carried verbatim and no technical content is re-verified (that is the normal 90-day freshness cycle's job).
- **New documentation content** — no new runbooks, guides, platforms, or features; this milestone only reshapes existing Phase-1 docs.
- **The grounded library / Copilot Studio agent configuration itself** — building or tuning the Copilot Studio agent, SharePoint library provisioning, and content-approval setup are downstream deployment concerns; v1.15 delivers grounding-ready source + a validation procedure, not the deployed agent.
- **AOSP-wired 802.1X, Cloud PKI deep-dive, multi-tenant PSSO, and all other v1.14-carried backlog** — remain in `.planning/milestones/v1.14-DEFERRED-CLEANUP.md`; not folded into this envelope milestone.

---

## Traceability

*(Filled by the roadmapper — REQ-ID → Phase mapping.)*

| REQ-ID | Phase | Status |
|--------|-------|--------|
| PIPE-01 | — | Pending roadmap |
| PIPE-02 | — | Pending roadmap |
| STD-01 | — | Pending roadmap |
| STD-02 | — | Pending roadmap |
| STD-03 | — | Pending roadmap |
| META-01 | — | Pending roadmap |
| META-02 | — | Pending roadmap |
| META-03 | — | Pending roadmap |
| META-04 | — | Pending roadmap |
| RETRO-01 | — | Pending roadmap |
| RETRO-02 | — | Pending roadmap |
| RETRO-03 | — | Pending roadmap |
| HARN-01 | — | Pending roadmap |
| HARN-02 | — | Pending roadmap |
| HARN-03 | — | Pending roadmap |
| HARN-04 | — | Pending roadmap |
