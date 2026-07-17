# Architecture Research

**Domain:** Documentation-corpus doc-class integration (EEE SOP standard, Markdown → .docx pipeline)
**Researched:** 2026-07-16
**Confidence:** HIGH — every claim below is grounded in the real local files listed in Sources, not training data. The one open item (decision-point block shape) is explicitly a discuss-phase gray area per `.planning/PROJECT.md`, not a research gap.

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│  AUTHORING LAYER                                                          │
│  docs/_standards/EEE-SOP-standard.md  (STD-001, single source of truth)   │
│  docs/_templates/*.md  (scaffolds — admin/l1/l2/reference + per-platform) │
├──────────────────────────────────────────────────────────────────────────┤
│  CONTENT LAYER  (docs/, per-doc-class top-level directories)              │
│  l1-runbooks/ l2-runbooks/ admin-setup-*/ reference/ *-lifecycle/         │
│  decision-trees/ cross-platform/ _glossary-*.md  ← doc-class-first,       │
│  NOT platform-first, is the established top-level layout convention      │
├──────────────────────────────────────────────────────────────────────────┤
│  REGISTRY LAYER                                                           │
│  docs/_registry/RE-index.md  (Doc ID → Path → Title → Doc Type → Status) │
│  Status column here = retrofit lifecycle, NOT frontmatter status         │
├──────────────────────────────────────────────────────────────────────────┤
│  GATE LAYER                                                               │
│  scripts/validation/c17-eee-contract.mjs  (13-assertion EEE contract,    │
│  content-agnostic — walks docs/, enrolls any file with a doc_id key)     │
├──────────────────────────────────────────────────────────────────────────┤
│  PUBLISH LAYER                                                            │
│  scripts/pipeline/build-filename-map.mjs → filename-map.md (generated)   │
│  scripts/pipeline/convert.ps1 (pandoc) → guard-docx.mjs → docx-library   │
│  scripts/pipeline/build-publish-bundle.mjs → zip (Approved rows only)    │
├──────────────────────────────────────────────────────────────────────────┤
│  NAVIGATION LAYER (wired LAST)                                            │
│  docs/index.md · common-issues.md · quick-ref-l1.md · quick-ref-l2.md    │
└──────────────────────────────────────────────────────────────────────────┘
```

The entire pipeline is **data-driven off the registry**, not code-driven off directory structure. `c17-eee-contract.mjs` enrolls "any `.md` under `docs/` carrying a `doc_id` frontmatter key" (see `scripts/validation/c17-eee-contract.mjs:522-537`) — it does not care what directory the file lives in. `build-filename-map.mjs` and `build-publish-bundle.mjs` read only `docs/_registry/RE-index.md`. This means **a new doc class integrates by adding registry rows and being EEE-conformant — no pipeline code changes are structurally required** for a new directory or a new `doc_type` value that already exists in the 4-value taxonomy.

### Component Responsibilities

| Component | Responsibility | Grounded in |
|-----------|----------------|-------------|
| `EEE-SOP-standard.md` (STD-001) | Canonical spec: frontmatter schema, header-block format, Doc Type taxonomy + D-02 edge-case rulings, D1 platform map, C17 needle-spec | `docs/_standards/EEE-SOP-standard.md` |
| `docs/_registry/RE-index.md` | Flat `RE-NNN → Path → Title → Doc Type → Status` table; single source of truth for what's publishable | 248 lines, 221 rows today, ends at RE-221 |
| `docs/_templates/*.md` | Per-doc-class authoring scaffolds; carry `TEMPLATE-SENTINEL` (`last_verified: 1970-01-01`) so C17 skips value-equality/blockquote-length checks on them | `admin-template.md`, `l1-template.md`, `reference-template.md` inspected directly |
| `c17-eee-contract.mjs` | 13-assertion blocking gate; enrollment is **opt-in by `doc_id` key presence**, not by directory allowlist | `scripts/validation/c17-eee-contract.mjs` |
| `build-filename-map.mjs` | Generated artifact (`scripts/pipeline/filename-map.md`); derives `.docx` output filenames from the registry `Title` column via a 5-step slug algorithm; D-08 collision-resolves by path-segment suffix | Read in full |
| `build-publish-bundle.mjs` / `convert.ps1` / `guard-docx.mjs` | Batch-converts every `Status: Approved` registry row to `.docx`, quality-gates, zips | `scripts/pipeline/` directory listing + `v1.17` PROJECT.md context |
| `docs/index.md` | Master nav hub; per-platform `##` sections, each a table of `[Resource](link) | When to Use` rows | Read lines 1-120 |

## Recommended Project Structure

```
docs/
├── recipes/                              # NEW top-level doc-class directory
│   ├── 01-windows-avd-shared-device.md   # NEW — Recipe #1
│   └── 02-shared-ipad-full-provisioning.md # NEW — Recipe #2
├── _templates/
│   └── recipe-template.md                # NEW — canonical scaffold for the Device Recipe class
├── _standards/
│   └── EEE-SOP-standard.md               # MODIFIED — new D-02 edge-case ruling row (+ decision-point
│                                          #   block spec once resolved at discuss-phase)
├── _registry/
│   └── RE-index.md                       # MODIFIED — 2-3 new rows (RE-222/223[/224]), Status: Draft
│                                          #   → Approved on owner sign-off
└── index.md                              # MODIFIED — new "## Device Configuration Recipes" nav section
                                           #   (LAST, navigation-last discipline)

scripts/pipeline/
└── filename-map.md                       # REGENERATED (not hand-edited) — pick up the 2-3 new rows
```

### Structure Rationale

- **`docs/recipes/` as a NEW top-level directory, not per-platform folders.** The corpus's established convention for a cross-cutting "journey" doc class is a **dedicated top-level directory named after the doc-class shape**, not nested inside `admin-setup-*/`: `decision-trees/` holds triage trees for every platform in one folder; `macos-lifecycle/`, `ios-lifecycle/`, `android-lifecycle/`, `linux-lifecycle/` each hold multi-stage walkthrough Guides distinct from that platform's `admin-setup-*/` step-by-step config guides. PROJECT.md explicitly frames the Device Recipe as "a new doc-class *shape*" (not new content in an old class), which is the same framing that justified `decision-trees/` and the `*-lifecycle/` family getting their own directories rather than being folded into `admin-setup-*/`. A recipe is also explicitly cross-platform as a *class* (Recipe #1 = Windows, Recipe #2 = iOS/iPadOS) even though each instance is platform-specific — exactly the shape `decision-trees/` already uses (one directory, `platform:` varies per file). There is no existing `admin-setup-windows/` folder to shoehorn Recipe #1 into (Windows content is organized by *framework* — `admin-setup-apv1/`, `admin-setup-apv2/` — not by OS), which is further evidence against a per-platform-folder placement.
- **`doc_type: Guide`, not a new taxonomy value.** The EEE-SOP-standard's Doc Type Taxonomy is a locked 4-value enum (`Runbook | Guide | RCA | Reference`, `EEE-SOP-standard.md:125-132`), and C17 assertion #13 hard-checks `status ∈ {Draft, Approved, Superseded}` — but `doc_type` itself is only checked for **presence** (assertion #8) and **block/frontmatter equality** (assertion #9), not against an enum. `EEE-SOP-standard.md:154-156` already rules that `*-lifecycle/*` documents → `Guide` "because lifecycle docs walk a reader through an end-to-end procedural setup or migration journey" — a Device Recipe is definitionally the same shape (linear, step-by-step, yields a concrete end state) plus embedded decision points. No C17 code change and no taxonomy-schema change are needed; what's needed is a **new D-02 edge-case ruling row** in the standard (`docs/recipes/*` → `Guide`) so the classification is documented precedent, exactly how v1.16 added rows for glossary/decision-tree/nav-hub/lifecycle (`EEE-SOP-standard.md:158-167`, Version History `2026-07-07` entry).
- **`platform:` values need ZERO D1-map changes.** Checked the live 20-entry D1 map in both `EEE-SOP-standard.md:341-363` and its code mirror in `c17-eee-contract.mjs:26-47`: `Windows`/`windows` already resolves to `Windows` (Recipe #1), and — notably — `ios+shared-ipad` **already resolves to `iOS + Shared iPad`** (Recipe #2's exact platform combination is a pre-existing D1 entry, likely added defensively during a prior Apple Business milestone). This is a concrete, non-obvious finding: recipe authoring is a pure content-plane change with no risk of tripping C17 assertion #10's no-fallback hard-failure.
- **Template inherits `admin-template.md`'s shape, not `l1-template.md`'s or `reference-template.md`'s.** `admin-template.md` already has the closest-matching skeleton for a recipe: `## Prerequisites` → `### Step N: [action]` → per-step `> **What breaks if misconfigured:**` callout → `## Verification` checklist → `## Configuration-Caused Failures` table → `## See Also`. The only net-new structural element a recipe template needs is the **admin decision-point block** inserted per relevant step (see Architectural Patterns below).

## Architectural Patterns

### Pattern 1: EEE Header Block (mandatory, unchanged)

**What:** Single inline paragraph immediately after frontmatter, before H1: `**Platform:** [label] · **Doc Type:** Guide · **Doc ID:** RE-NNN · **Status:** [value]`, using the `·` U+00B7 middle-dot separator — not a table, not a blockquote, not a code fence (`EEE-SOP-standard.md:80-100`).
**When to use:** Every recipe file, verbatim per the D-05 spec. No doc-class gets a variant of this block.
**Trade-offs:** None — this is a hard C17 assertion (#6, #7, #9) with zero flexibility.

### Pattern 2: Decision Table for structured branch/option content (`Scenario | Leaf | Resolution`)

**What:** A real Markdown table (not a blockquote, not a code fence) enumerating discrete choices and their outcomes. This is the corpus's proven, C17-clean mechanism for encoding "pick one of several paths" content — it's the STD-04 Mermaid-conversion target shape (`EEE-SOP-standard.md:427-436`, D-03) and is live in production at `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068):
```markdown
| Scenario | Leaf | Resolution |
|----------|------|-----------|
| Role lacks permission | ABPDR1 | [Role & Permission Model](../cross-platform/apple-business/01-role-permission-model.md) |
```
and in `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md`'s "Stage Summary Table" (`| Stage | Actor | Location | What Happens | Key Pitfall | Path |`).
**When to use:** Any decision point that has more than one sentence of content, more than ~1-2 options, or a routing/link target — i.e., almost certainly the right shape for "application choices, naming, group targeting" decision points named in PROJECT.md.
**Trade-offs:** Not blockquote-length-capped (C17 #12 doesn't apply to tables); does hit C17 #11 if a single table exceeds 25 data rows (unlikely for a per-step decision table, but multi-decision-point tables spanning a whole recipe should stay chunked per-step rather than consolidated into one giant table). Pandoc renders tables cleanly to `.docx`, proven by the entire existing corpus.

### Pattern 3: Short blockquote callout for a single-sentence prompt

**What:** A one-line `> **Ask the admin:** ...` blockquote, mirroring the existing `> **What breaks if misconfigured:** ...` convention used throughout `admin-setup-*/` (e.g. `docs/admin-setup-apv1/04-dynamic-groups.md:50,64,78,88` — each instance is a single sentence, well under the 200-char cap).
**When to use:** A single yes/no or single-value prompt with no enumerable option table (e.g., "Ask the admin: what should the shared-device naming prefix be?").
**Trade-offs:** **C17 assertion #12 hard-caps this at 200 characters** — measured as the joined text of one *contiguous run* of `>`-prefixed lines (a blank line ends the run and starts a new independently-measured chunk; verified directly in `c17-eee-contract.mjs:390-408`). The existing corpus already uses this blank-line-chunking technique to stay under budget: `docs/index.md`'s "Platform coverage" block and the PSSO walkthrough's "Platform gate" block are each split into several blank-line-separated one-sentence blockquote paragraphs rather than one long run. A blockquote is unsuitable for anything resembling an enumerated option list — use Pattern 2 for that.
**Do NOT use a code fence for decision-point content.** Confirmed no such convention exists anywhere in 128 corpus/planning files referencing "decision point" language. Two independent facts rule it out structurally: (1) `EEE-SOP-standard.md`'s body-text-only indexing finding (`## Grounding Notes` → "Body-text-only indexing (OQ4)") establishes that the sole indexed retrieval surface is prose body text — a code fence's content is not semantically distinguished from any other fence by Pandoc/SharePoint, so decision-relevant text inside one is exactly as retrieval-poor as the Mermaid-fence problem STD-04 already solved by banning fences for decision content; (2) C17 assertion #1's `^```mermaid` opener-regex is fence-syntax-specific, but the STD-04 D-01 rationale ("the single most decision-relevant content becomes the least prose-like, least retrievable text") generalizes to any code fence used to carry decision logic, not just Mermaid.

**Recommended composite for the recipe template (grounded synthesis, not a roadmap decision):** a short `> **Ask the admin:**` blockquote lead-in (Pattern 3) immediately followed by a `| Question | Options | Recorded As |`-shaped decision table (Pattern 2) when there is more than one option — this exact "blockquote-then-table" composition is already the established idiom in `reference-template.md`'s "`> **Table summary:**` after a table" pattern, just inverted (prompt-before-table instead of summary-after-table). **The exact final shape is explicitly named a discuss-phase gray area in `.planning/PROJECT.md` ("routed to `/gsd-discuss-phase` + `/adversarial-review`, NOT resolved at roadmap") — this section documents the grounded option space, it does not resolve the gray area.**

### Pattern 4: TEMPLATE-SENTINEL scaffold discipline

**What:** New templates set `last_verified: 1970-01-01 # TEMPLATE-SENTINEL`, which makes C17 skip assertion #9 (block/frontmatter value equality) and assertion #12 (blockquote length) — necessary because template placeholder text (`RE-[FILL-IN]`) and authoring-instruction blockquotes are intentionally longer/inconsistent (`c17-eee-contract.mjs:135-137,386-389`).
**When to use:** `recipe-template.md` only — never a real corpus recipe.
**Trade-offs:** None; this is how every existing template already works.

## Data Flow

### Registry → Filename-Map → Publish-Bundle (the only pipeline integration point that matters)

```
docs/_registry/RE-index.md              (hand-edited: add RE-222, RE-223[, RE-224])
        │  Status: Draft  (retrofit-lifecycle column; independent of frontmatter status)
        ▼
  [authoring + C17 gate + owner review]
        │  Status flips to: Approved
        ▼
scripts/pipeline/build-filename-map.mjs  →  scripts/pipeline/filename-map.md  (GENERATED — never hand-edit, D-09)
        │  slug(Title) → NN-slug.docx, 5-step algorithm, D-08 collision-resolve
        ▼
scripts/pipeline/convert.ps1 (pandoc)  →  guard-docx.mjs (fail-closed quality gate)
        ▼
scripts/pipeline/build-publish-bundle.mjs  →  docs-library-vX.Y.zip  (Approved rows only)
```

No script in `scripts/pipeline/` needs code changes to carry the two new recipes through this flow — `build-filename-map.mjs` parses `RE-index.md` generically (`parseRegistry()`, any row matching `^\|\s*RE-\d+\s*\|`) and `build-publish-bundle.mjs` imports from it (per `126-02` comment at `build-filename-map.mjs:50-54`). **This is purely a registry-data-plane integration**, confirmed by the v1.17 PROJECT.md framing: "Registry-Approved = the publish set = the SharePoint-indexed set."

### Nav-hub wiring (navigation-last, final step)

`docs/index.md` gets one new `##` section, e.g. `## Device Configuration Recipes`, added to the "Choose Your Platform" top-of-file link list and given its own resource table, following the exact pattern already used for `### Admin Setup` (`docs/index.md:97-102`, a `| Guide Set | Framework | Description |` table) and `## macOS Provisioning` → lifecycle links (`docs/index.md:117`, linking `macos-lifecycle/00-ade-lifecycle.md` inline from prose). `common-issues.md` and `quick-ref-l1.md`/`quick-ref-l2.md` are failure-triage nav hubs (their existing rows all route to Runbook-class troubleshooting content) — recipes are provisioning Guides, not troubleshooting docs, so **they do not need rows in those three hubs**; the correct wiring surface is `docs/index.md` only, consistent with how `macos-lifecycle/`'s Guide-class walkthrough docs are wired (present in `index.md`'s platform sections, absent from `common-issues.md`/`quick-ref-*.md`). Recipes should link-not-copy OUT to relevant `l1-runbooks/`/`l2-runbooks/` failure docs from their `## Configuration-Caused Failures` table (same convention `admin-template.md` and the PSSO walkthrough already use).

## Suggested Build Order

Dependency-ordered, mapped to the question's requested shape ("template/doc-class first, then recipes, then nav"):

1. **Standard amendment** — add the new D-02 edge-case ruling row to `EEE-SOP-standard.md` (`docs/recipes/*` → `Guide`), and — once `/gsd-discuss-phase` + `/adversarial-review` resolve the decision-point block shape — record the resolved spec as a new subsection, mirroring how STD-04 (Mermaid policy) was added in v1.16. **Must come first**: the template and the eventual C17 self-test fixtures both need this as their citable source of truth, and doing it first avoids retrofitting the template after the gray area resolves.
2. **Template** (`docs/_templates/recipe-template.md`) — built from `admin-template.md`'s skeleton + the resolved decision-point block pattern + `TEMPLATE-SENTINEL` scaffold discipline (Pattern 4). Zero C17 code changes required — confirm with `node scripts/validation/c17-eee-contract.mjs --self-test` (still 0 exit) plus a manual instantiated-template check, since templates are structurally checked but not value-equality-checked.
3. **Registry ID reservation** — add `RE-222`/`RE-223`[/`RE-224` if an `00-overview.md` index is added] to `RE-index.md` with `Status: Draft`, *before* content authoring, matching the existing "Fill in `doc_id` from `docs/_registry/RE-index.md` at doc creation time" instruction present in every template.
4. **Recipe #1 content** (Windows AVD shared device, `docs/recipes/01-windows-avd-shared-device.md`) — no dependency on Recipe #2.
5. **Recipe #2 content** (Shared iPad, `docs/recipes/02-shared-ipad-full-provisioning.md`) — no dependency on Recipe #1. (4 and 5 are parallelizable; order between them doesn't matter.)
6. **C17 gate run** — `node scripts/validation/c17-eee-contract.mjs --verbose` against the full corpus; both new files must be enrolled (they carry `doc_id`) and pass all 13 assertions before status promotion.
7. **Registry status flip** Draft → Approved, owner-gated (this is the actual "join the publish set" trigger — do not treat file-creation as sufficient).
8. **Regenerate `filename-map.md`** — `node scripts/pipeline/build-filename-map.mjs` (generated artifact; hand-editing violates D-09).
9. **Navigation-last hub wiring** — add the `## Device Configuration Recipes` section to `docs/index.md` (last, per the project's explicit "Navigation-last discipline for hub wiring" convention).
10. **Publish-bundle regen** (if in this milestone's DoD) — `build-publish-bundle.mjs` picks up the two new Approved+filename-mapped rows automatically; no bundle-script changes expected.

## Anti-Patterns

### Anti-Pattern 1: Nesting recipes inside `admin-setup-apv1/` or `admin-setup-ios/`

**What people might do:** Treat Recipe #1 as "just another APv1 admin-setup step" and drop it in `admin-setup-apv1/`, or Recipe #2 into `admin-setup-ios/`.
**Why it's wrong:** Breaks the corpus's own doc-class-directory convention (`decision-trees/`, `*-lifecycle/` are precedent for "new shape → new top-level directory"), and conflates a **linear device-configuration recipe** (this milestone's explicit new *shape*, with embedded decision points and a "yields one concrete device config" outcome) with the **step-by-step-but-decision-free** admin-setup Guide class that already exists. It also makes future recipes (recipe #3, #4, ...) awkward to discover, since they'd be scattered across unrelated platform folders instead of one place.
**Do this instead:** New `docs/recipes/` top-level directory, per Structure Rationale above.

### Anti-Pattern 2: Encoding decision points as code fences

**What people might do:** Use a ```` ```yaml ```` or ```` ```text ```` fence to show "decision: app-choice, options: [...]" as structured pseudo-config.
**Why it's wrong:** Violates the body-text-only indexing thesis (`EEE-SOP-standard.md` Grounding Notes) — fenced content is exactly as retrieval-invisible-in-effect as the Mermaid problem STD-04 already solved, and the STD-04 D-01 rationale ("the single most decision-relevant content becomes the least prose-like, least retrievable text") applies verbatim.
**Do this instead:** Pattern 2 (decision table) or Pattern 3 (short blockquote), per the "recommended composite" above.

### Anti-Pattern 3: Adding a 5th `doc_type` taxonomy value ("Recipe")

**What people might do:** Introduce `doc_type: Recipe` to make the new class self-describing, requiring a C17 code change to the (currently unenforced) enum and a taxonomy-schema bump.
**Why it's wrong:** `doc_type` is explicitly "audience-agnostic by design" and the taxonomy is stated as locked at 4 values (`EEE-SOP-standard.md:123-132`, "The controlled vocabulary for `doc_type` contains exactly four values"); C17 doesn't even enum-check it (only presence + block-equality), so a 5th value would pass C17 today but contradict the standard's own text and create registry inconsistency with every other Guide-class doc. `Guide` already fits by the same reasoning that classified `*-lifecycle/*` as `Guide`.
**Do this instead:** `doc_type: Guide` + a new directory-precedence D-02 ruling row naming `docs/recipes/*` explicitly (Pattern/Rationale above).

### Anti-Pattern 4: Hand-editing `scripts/pipeline/filename-map.md`

**What people might do:** Manually add the two new rows to `filename-map.md` to save a build step.
**Why it's wrong:** The file's own header says "GENERATED FILE — DO NOT HAND-EDIT" and D-09 (`build-filename-map.mjs:27-29`) states this generator is the *only* writer; hand-edits will be silently clobbered (or worse, drift) on the next regeneration and desync from the registry's actual Title-column slug algorithm (which also handles D-08 collision suffixes that are easy to get wrong by hand).
**Do this instead:** Run `node scripts/pipeline/build-filename-map.mjs` after every registry change (build order step 8).

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `EEE-SOP-standard.md` ↔ `recipe-template.md` | Standard defines the schema/taxonomy the template instantiates | Template must cite the new D-02 ruling; C17 enforces structural rules on the template itself (presence + structure, not value-equality — sentinel-skipped) |
| `RE-index.md` ↔ `filename-map.md` | One-way generator (`build-filename-map.mjs`), never hand-sync | D-09; regenerate, don't edit |
| `RE-index.md` (`Status: Approved`) ↔ `build-publish-bundle.mjs` | Registry-Approved rows are the sole publish-set filter | Zero code change needed for new doc classes — purely data-driven |
| `docs/recipes/*` ↔ `c17-eee-contract.mjs` | Opt-in enrollment via `doc_id` key presence + `docs/` path prefix | No allowlist/directory registration step exists or is needed — any new directory under `docs/` auto-enrolls once a file carries `doc_id` |
| `docs/recipes/*` ↔ `docs/index.md` | Outbound link only, added last (navigation-last discipline) | Recipes should NOT be added to `common-issues.md`/`quick-ref-l1.md`/`quick-ref-l2.md` — those are troubleshooting hubs, recipes are provisioning Guides (same treatment as `*-lifecycle/*`) |
| Recipe `## Configuration-Caused Failures` ↔ `l1-runbooks/`/`l2-runbooks/` | Link-not-copy, inbound-failure routing | Established convention from `admin-template.md` and `macos-lifecycle/01-psso-provisioning-walkthrough.md` |

## Sources

All findings are grounded in direct reads of the local repository at `D:\claude\Autopilot` on 2026-07-16 — no external/web sources were used for this architecture-integration question (per task scope: verify locally, do not re-research existing architecture):

- `docs/_standards/EEE-SOP-standard.md` (full read, 516 lines) — frontmatter schema, header-block format, Doc Type Taxonomy + D-02/D-08 rulings, D1 platform-normalization map, STD-04 Mermaid policy (D-01..D-04), C17 needle-spec (13 assertions)
- `scripts/validation/c17-eee-contract.mjs` (full read, 590 lines) — live C17 implementation; verified D1 map mirrors the standard exactly, verified blockquote-run chunking behavior for assertion #12, verified enrollment is opt-in by `doc_id` presence not directory allowlist
- `docs/_registry/RE-index.md` (structure + head/tail read, 248 lines, 221 data rows, ends RE-221)
- `docs/_templates/admin-template.md`, `l1-template.md`, `reference-template.md` (full reads) — TEMPLATE-SENTINEL convention, `> **What breaks if misconfigured:**` callout idiom, `## Configuration-Caused Failures` / `## See Also` shape
- `scripts/pipeline/build-filename-map.mjs` (full read, 397 lines) — D-05 slug algorithm, D-08 collision resolution, D-09 generated-artifact-only invariant, registry-generic parser
- `scripts/pipeline/filename-map.md` (head read) — generated artifact format
- `docs/index.md` (lines 1-120) — nav-hub structure: platform `##` sections, resource tables, blockquote-chunking convention for the "Platform coverage" lead
- `docs/macos-lifecycle/01-psso-provisioning-walkthrough.md` (lines 1-90) — closest existing analog to a "recipe" (Guide-class, multi-stage walkthrough, decision-branch table, `> **Platform gate:**` blockquote convention, prerequisites checklist)
- `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068, lines 1-50) — live `Scenario | Leaf | Resolution` decision-table exemplar named as corpus law by STD-04
- `docs/admin-setup-apv1/04-dynamic-groups.md` (grep hits) — live single-sentence `> **What breaks if misconfigured:**` blockquote instances, confirming real-world length discipline
- `docs/admin-setup-ios/`, `docs/cross-platform/apple-business/`, `docs/*-lifecycle/` directory listings — confirmed no existing AVD/Windows-shared-device content, confirmed `ios+shared-ipad` platform combination already documented in the Apple Business surface (via `_glossary`/`_registry` grep for "shared ipad")
- `.planning/PROJECT.md` (lines 1-197, v1.18 milestone section) — decision-point block format explicitly named a discuss-phase gray area; navigation-last discipline explicitly stated as a durable project convention

---
*Architecture research for: Device Recipe doc-class integration, v1.18 milestone*
*Researched: 2026-07-16*
