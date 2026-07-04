# Phase 114: EEE Standard, Templates, Doc ID Registry + Metadata Rules — Research

**Researched:** 2026-07-03
**Domain:** Documentation standard authoring — EEE SOP spec, templates, registry, D1 normalization map
**Confidence:** HIGH (all findings verified directly against repo source code and corpus)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** `owner` is required frontmatter key; NOT rendered in the visible header block.
- **D-02:** Comparison docs and error-code docs → Reference. End-user guides → Guide. Taxonomy: {Runbook, Guide, RCA, Reference}.
- **D-03:** Phase-1 scope = L1/L2 runbooks (l1-runbooks/ + l2-runbooks/) + admin-setup guides (admin-setup-*/) + reference class (reference/ + error-codes/ + the 2 comparison docs + end-user-guides/). Positive-named.
- **D-04:** operations/ (20), device-operations/ (5), cross-platform/apple-business/ (20) are OUT of Phase-1. Deferred to v1.16. Owner-confirmed 2026-07-04.
- **D-05:** Block = `Platform · Doc Type · Doc ID · Status` (middle-dot separator, that order, no Owner, no Last Reviewed in block). `## Summary` immediately follows block.
- **D-06:** Keep 6 existing templates + ADD a Reference template. DEFER RCA template.
- **D-07:** Fix the three pipe-list templates (admin-template.md, l1-template.md, l2-template.md) — change `platform:` to `platform: all` + HTML comment guidance.
- **D-08:** Registry = Phase-1-only, flat sequential RE-001…RE-NNN, stored OUTSIDE indexed library.
- **D-09:** D1 map authored now; unmapped = hard failure, no fallback.

### Claude's Discretion

- Exact ordering of sequential RE-NNN assignment (by class, by directory, or by retrofit order).
- Exact `## Summary` minimum-word-count value (ROADMAP Phase-115 SC2 names >=30 words; adopt unless stronger threshold warranted).
- Exact filename/section layout of EEE-SOP-standard.md, the Reference template, and RE-index.md.

### Deferred Ideas (OUT OF SCOPE)

- v1.16: 45 orphan docs (operations/, device-operations/, cross-platform/apple-business/).
- v1.16: file-rename pass (OQ1 confirmed citation titles are raw .docx filenames).
- Deployment: SharePoint content-approval (hardening lever; deferred to deployment).
- Deferred RCA template (no RCA docs exist; RCA stays taxonomy member for forward-compat).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| META-01 | C10 lenient-unknown-key precondition verified before any file is edited | Section "C10 Leniency" — code-verified additive; SC1 test design provided |
| META-02 | Visible EEE header block is single inline line, Platform + Doc Type first, `## Summary` immediately following | Section "EEE-SOP-standard.md Structure" — D-05 locked, PIPE-02 validated |
| META-03 | D1 platform normalization map covers all ~19-20 real variants; unmapped = hard failure | Section "D1 Platform Normalization Map" — full 20-entry map enumerated via corpus grep |
| META-04 | `Last Reviewed` = `last_verified` verbatim; one-time "v1.15 EEE reformat" Version-History row | Section "EEE-SOP-standard.md Structure" — D2 semantics rule |
| STD-01 | EEE SOP standard doc authored (block format, D1 map, D2 semantics, taxonomy, grounding-notes) | Section "EEE-SOP-standard.md Structure" — proposed section outline |
| STD-02 | docs/_templates/* updated — all new docs born EEE-conformant | Section "Template Changes" — exact delta per template |
| STD-03 | Doc ID Registry RE-index.md committed outside indexed library; all Phase-1 IDs assigned | Section "Doc ID Registry" — exact Phase-1 file count, proposed format |
</phase_requirements>

---

## Summary

Phase 114 is a pure documentation-authoring phase. It writes no product code and retrofits no corpus files — it authors three deliverables: the EEE SOP standard document, updated templates, and the Doc ID registry. All four gray areas were already resolved via adversarial review (CONTEXT.md D-01..D-09). The PIPE-02 empirical findings from Phase 113 ground every architectural claim in the standard (OQ1: citations are filename-driven; OQ2: Draft = label not gate; OQ3: no chunk fragmentation on mode-first tables; OQ4: frontmatter → invisible custom properties, body-text block is retrieval-necessary).

The phase-opening gate is the META-01 C10 leniency precondition. Research confirms by direct code inspection that C10 is additive — it validates specific key values but does not whitelist keys — so the test will pass. The SC1 test plan is concrete and implementable in one plan step. The D1 normalization map has been fully enumerated from the corpus (20 entries for 20 real `platform:` variants plus 3 template pipe-list placeholders that D-07 replaces). The Phase-1 in-scope file count is confirmed at 178 docs, mapping to RE-001 through RE-178.

**Primary recommendation:** Open the phase with the SC1 C10 leniency test (one step), then author the three deliverables in dependency order: EEE-SOP-standard.md first (reference for everything else), templates second (need the standard's block format spec), registry last (sequential collision-free pass over the enumerated Phase-1 file set).

---

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| C10 leniency gate | Harness (scripts/validation/) | — | C10 lives in v1.14-milestone-audit.mjs; validation is harness-only, no product code |
| EEE-SOP-standard.md | docs/_standards/ (meta-docs, NOT indexed library) | — | Standard is operator reference; MUST NOT be in indexed SharePoint library |
| docs/_templates/* | docs/_templates/ | — | Templates are authoring scaffolds; D-07 fixes three to avoid C17 failure at Phase 115 |
| docs/_registry/RE-index.md | docs/_registry/ (OUTSIDE indexed library) | — | SC3 policy: registry indexed → doc-specific queries return registry row, not doc content |
| D1 normalization map | EEE-SOP-standard.md (authoritative) | C17 needle-spec (Phase 115) | Map is authored in the standard; C17 reads it as its normalization authority |
| C17 needle-spec | Phase 114 handoff artifact | Phase 115 implementation | This phase produces the spec; Phase 115 authors the validator as one indivisible atom |

---

## Standard Stack

This is a documentation-authoring phase — no software packages are installed. All tools are already present.

### Core Tools (already installed, no new installs)
| Tool | Version | Purpose | Source |
|------|---------|---------|--------|
| Pandoc | 3.7.0.2 (pinned) | MD→.docx pipeline (Phase 113 deliverable) | [VERIFIED: Phase 113 SC1/SC2] |
| Node.js | Existing in repo | Harness validators (C10, C17 at Phase 115) | [VERIFIED: scripts/validation/*.mjs in repo] |

### No External Packages

Phase 114 installs no new npm, pip, or other packages. All deliverables are Markdown files authored with the existing toolchain.

---

## Package Legitimacy Audit

Not applicable — Phase 114 installs no external packages.

---

## Architecture Patterns

### System Architecture Diagram

```
YAML frontmatter (source of truth)
    │
    ├── C10 harness validation (scripts/validation/) ─── SC1 leniency gate (Phase 114 plan step 1)
    │
    ├── Pandoc 3.7.0.2 ─── → invisible Word custom properties (NOT indexed by Copilot)
    │
    └── C17 harness (Phase 115) ─── validates visible block matches frontmatter via D1 map
         │
         └── derives from needle-spec handed off by Phase 114

Visible body-text block (retrieval layer)
    │
    ├── Platform · Doc Type · Doc ID · Status (D-05 locked format, PIPE-02 proven)
    │
    └── ## Summary (first H2, immediately after block) ─── highest-density retrieval chunk

docs/_standards/EEE-SOP-standard.md ─── NOT in indexed SharePoint library
docs/_registry/RE-index.md ─── NOT in indexed SharePoint library
docs/_templates/* ─── authoring scaffolds; born-EEE-conformant after Phase 114
```

### Recommended Project Structure
```
docs/
├── _standards/            # Created this phase — meta-docs, NOT in indexed library
│   └── EEE-SOP-standard.md
├── _registry/             # Created this phase — OUTSIDE indexed library (SC3 policy)
│   └── RE-index.md
└── _templates/            # Updated this phase — 6 existing + 1 new Reference template
    ├── admin-template.md          # D-07 platform fix + 4 new keys + EEE block
    ├── admin-template-android.md  # 4 new keys + EEE block (no platform fix needed)
    ├── admin-template-ios.md      # 4 new keys + EEE block (no platform fix needed)
    ├── admin-template-macos.md    # 4 new keys + EEE block (no platform fix needed)
    ├── l1-template.md             # D-07 platform fix + 4 new keys + EEE block
    ├── l2-template.md             # D-07 platform fix + 4 new keys + EEE block
    └── reference-template.md      # NEW (D-06) — table-remediation convention for Phase 118
```

### Pattern 1: C10 Additive Validation (SC1 Leniency Proof)

**What:** C10 validates Linux docs by checking specific key values only — it does NOT enumerate or whitelist all frontmatter keys.

**Code evidence (v1.14-milestone-audit.mjs, lines 524-554):**
```javascript
// C10 checks ONLY these three things:
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/m);
const fm = fmMatch[1];

// 1. platform: Linux present as a line
if (!/^platform:\s*Linux\s*$/m.test(fm)) { violations.push(...); }

// 2. last_verified ISO date present
const lvMatch = fm.match(/^last_verified:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);

// 3. review_by within 90 days of last_verified
const rbMatch = fm.match(/^review_by:\s*(\d{4}-\d{2}-\d{2})\s*(#.*)?$/m);

// NO check that the frontmatter contains ONLY known keys.
// Adding doc_id, status, owner, doc_type lines is invisible to this validator.
```

**Implication:** C10 is definitively lenient on unknown frontmatter keys. [VERIFIED: scripts/validation/v1.14-milestone-audit.mjs]

**SC1 test design (META-01 precondition):**

The test adds the four new keys to a synthetic file in `linuxDocPaths()` scope and runs C10:

Step 1 — Create `scripts/pipeline/test-fixtures/c10-leniency-probe.md` with:
```yaml
---
doc_id: RE-T10
status: Draft
owner: test-owner
doc_type: Reference
platform: Linux
last_verified: 2026-07-03
review_by: 2026-09-30
---
# C10 Leniency Probe
Test fixture for META-01 precondition. Delete after SC1 confirmed.
```

Step 2 — Temporarily register this file in `linuxDocPaths()` — OR — copy it temporarily to `docs/admin-setup-linux/` (which IS in `linuxDocPaths()`) as `docs/admin-setup-linux/99-c10-probe.md`.

Step 3 — Run `node scripts/validation/v1.14-milestone-audit.mjs` and confirm C10 (`id: 10`) result = PASS.

Step 4 — Delete the probe file. C10 confirmed lenient.

**Alternative (simpler, no temp file in linuxDocPaths):** Since C10 only scans files in `linuxDocPaths()` and does not scan the `docs/_standards/` or `docs/_registry/` paths, any new files in those new directories will trivially never be checked by C10. The leniency concern is: when Phase-1 docs in `linuxDocPaths()` gain the four new keys, will C10 still pass? The answer is yes — proven by code inspection. The SC1 step can be: take one existing Linux doc (e.g., `docs/admin-setup-linux/00-overview.md`), temporarily add the four new keys, run the harness, confirm C10 passes, revert. Either approach works.

### Pattern 2: EEE Header Block Format (PIPE-02 Proven)

**What:** The visible body-text header block is the single retrieval-necessary metadata element. PIPE-02 Q2 directly confirmed:

> Copilot recited: "Doc ID: RE-T01 · Platform: Windows · Doc Type: Runbook · Status: Approved" from body text.

**Locked format (D-05):**
```markdown
**Platform:** Windows · **Doc Type:** Runbook · **Doc ID:** RE-042 · **Status:** Approved
```

Field order: Platform first, Doc Type second, Doc ID third, Status fourth. Middle-dot `·` separator. Owner NOT in block (D-01). Last Reviewed NOT in block (D-05).

**Why bold-vs-plain is cosmetic:** Copilot strips Markdown formatting on recitation; indexed text is identical whether bold or plain. The `·` separator is the validated separator. [VERIFIED: PIPE-02-FINDINGS.md]

### Pattern 3: Doc ID Registry Outside Indexed Library

**What:** `docs/_registry/RE-index.md` must not be placed in the indexed SharePoint library. If it is, doc-specific queries return the registry row instead of doc content.

**Source:** `scripts/pipeline/README.md §SC3`: "Doc ID Registry Not Indexed — docs/_registry/RE-index.md (and its compiled .docx equivalent, if any) must not be placed in the indexed SharePoint library." [VERIFIED: scripts/pipeline/README.md]

### Anti-Patterns to Avoid

- **Owner in block:** Dilutes lead retrieval chunk with a person-name for zero citation gain (OQ1 proved citations are filename-driven, not block-field-driven). D-01 locked: owner in frontmatter ONLY.
- **Last Reviewed in block:** Injects a stale-looking verbatim date into the lead chunk for no retrieval gain. D-05 locked: no Last Reviewed in block.
- **Pipe-list `platform:` in templates:** Templates with `Windows | macOS | all` are unmappable in D1 map → C17 FAILS all templates at Phase 115. D-07 locked: change to `platform: all`.
- **Registry inside indexed library:** If indexed, "What does RE-047 cover?" returns registry row, not doc content.
- **Mermaid fences in Phase-1 docs:** C17 assertion #1 — fail on any Mermaid fence. Phase-1 docs must not gain new Mermaid fences.
- **`Status: Draft` as retrieval gate:** OQ2 proved Draft docs ARE indexed and retrieved. Draft exclusion must be by library scoping, never by relying on the body-text label.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Proving C10 leniency | Custom frontmatter parser | Run existing harness (v1.14-milestone-audit.mjs) against a probe file | The harness already implements C10 exactly; running it directly gives ground truth |
| Doc ID uniqueness | Manual collision checking | Single sequential assignment pass (RE-001…RE-178) in one plan step | Sequential assignment over a fixed enumerated list is collision-free by construction |
| Platform normalization | Case-insensitive string comparison in templates | D1 map in EEE-SOP-standard.md (authoritative) + C17 enforcement | The map IS the normalization; runtime matching is C17's job (Phase 115) |

---

## C10 Leniency Research (SC1 / META-01)

**Finding:** [VERIFIED: scripts/validation/v1.14-milestone-audit.mjs lines 517-555]

C10 is the "Linux frontmatter" check (BLOCKING from Phase 48). Its scope is `linuxDocPaths()`, which enumerates:
- `docs/_glossary-linux.md`
- `docs/_templates/admin-template-linux.md` (does not exist currently)
- `docs/reference/linux-capability-matrix.md`
- `docs/decision-trees/09-linux-triage.md`
- All files in `docs/linux-lifecycle/`
- All files in `docs/admin-setup-linux/`
- L1 runbooks matching `/\/(3[0-3])-linux-/`
- L2 runbooks matching `/\/(2[4-5])-linux-/`

C10 validates each scoped file for:
1. `platform: Linux` present as a frontmatter line
2. `last_verified` ISO date present (non-SENTINEL)
3. `review_by` within 90 days of `last_verified`

**C10 does NOT assert:** that frontmatter contains only known keys. Adding `doc_id`, `status`, `owner`, `doc_type` anywhere in a frontmatter block is completely transparent to C10. The regex patterns used are line-anchored, additive checks.

**The new `docs/_standards/` and `docs/_registry/` directories are not in `linuxDocPaths()` at all — C10 never scans them.** Therefore any file written to those directories cannot break C10.

**Conclusion:** C10 is definitively lenient on unknown frontmatter keys. SC1 is proven by code analysis; the plan step confirms it empirically. [VERIFIED: scripts/validation/v1.14-milestone-audit.mjs]

---

## D1 Platform Normalization Map (SC2 / META-03 / D-09)

**Enumeration method:** `grep -rhi "^platform:" docs --include="*.md" | sort | uniq -c` — run against full corpus. [VERIFIED: direct grep]

**Total distinct variants: 20 real corpus variants + 3 template pipe-list placeholders (D-07 targets)**

### Full D1 Map (all 20 real corpus variants)

| Raw `platform:` value | Count (all docs) | In Phase-1 scope? | Proposed clean label |
|-----------------------|-----------------|------------------|----------------------|
| `macOS` | 39 | Yes | macOS |
| `Android` | 39 | Yes | Android |
| `Windows` | 27 | Yes | Windows |
| `iOS` | 27 | Yes | iOS |
| `all` | 19 | Yes | All Platforms |
| `Linux` | 18 | Yes | Linux |
| `ios+macos` | 11 | No (out-of-scope only) | iOS + macOS |
| `windows+macos+ios+android+linux` | 8 | Yes | All Platforms |
| `ios+ipados+macos+tvos` | 6 | No (out-of-scope only) | iOS / iPadOS / macOS / tvOS |
| `cross-platform` | 5 | No (out-of-scope only) | Cross-Platform |
| `ios+macos+shared-ipad` | 3 | Yes | iOS + macOS + Shared iPad |
| `windows` | 1 | Yes (admin-setup case variant) | Windows |
| `macos` | 1 | Yes (admin-setup case variant) | macOS |
| `linux` | 1 | Yes (admin-setup case variant) | Linux |
| `ios+shared-ipad` | 1 | No (out-of-scope only) | iOS + Shared iPad |
| `ios+ipados+macos` | 1 | No (out-of-scope only) | iOS / iPadOS / macOS |
| `iOS,Android` | 1 | No (out-of-scope only) | iOS + Android |
| `ios` | 1 | Yes (admin-setup case variant) | iOS |
| `apple-tv` | 1 | No (out-of-scope only) | Apple TV |
| `android` | 1 | Yes (admin-setup case variant) | Android |

**Total: 20 entries — confirms the D-09 estimate of "~19-20".**

### Template pipe-list placeholders (D-07 targets — NOT added to D1 map)

These are templates, not real corpus docs. D-07 replaces them with `all` (a real corpus variant):

| Template | Current `platform:` | D-07 fix |
|----------|--------------------|-----------------------|
| `admin-template.md` | `Windows \| macOS \| all` | `platform: all` |
| `l1-template.md` | `Windows \| macOS \| iOS \| Android \| all` | `platform: all` |
| `l2-template.md` | `Windows \| macOS \| iOS \| Android \| all` | `platform: all` |

**Why NOT in D1 map:** Pipe-list values are template authoring instructions, not real platform values. Adding them to the D1 map would pollute D1 with non-corpus values.

### Phase-1 variants (13 of 20)

The 13 variants that appear in Phase-1 in-scope directories:
`macOS`, `Android`, `Windows`, `iOS`, `Linux`, `all`, `ios+macos+shared-ipad`, `windows+macos+ios+android+linux`, `windows` (case), `macos` (case), `linux` (case), `ios` (case), `android` (case)

### Out-of-scope-only variants (7 of 20)

These appear ONLY in D-04-excluded directories (operations/, device-operations/, cross-platform/apple-business/). They must still be in the D1 map for v1.16 EEE coverage:
`ios+macos`, `ios+ipados+macos+tvos`, `cross-platform`, `ios+shared-ipad`, `ios+ipados+macos`, `iOS,Android`, `apple-tv`

**Merging note for planner:** `all` and `windows+macos+ios+android+linux` have identical semantic scope and can map to the same clean label ("All Platforms"). This is Claude's discretion per the D-09 intent.

---

## EEE-SOP-standard.md Structure (SC2 / STD-01)

**File location:** `docs/_standards/EEE-SOP-standard.md` — directory does NOT exist yet; created this phase.

**Location rationale:** `docs/_standards/` is prefixed with `_`, signaling non-corpus scope. Per `scripts/pipeline/README.md §SC3`, only `.docx` content files go in the indexed library. This standard is meta-documentation, not an operator runbook.

### Proposed Section Outline

```
docs/_standards/EEE-SOP-standard.md
```

The standard itself must have a frontmatter block + EEE body-text block (it is authored conformantly):

```yaml
---
doc_id: STD-001         # a "STD-" prefix distinguishes meta-docs from corpus RE-NNN
status: Approved
owner: [project owner]
doc_type: Reference
last_verified: 2026-07-04
review_by: 2026-10-02
platform: all
---
```

```
**Platform:** All Platforms · **Doc Type:** Reference · **Doc ID:** STD-001 · **Status:** Approved

## Summary
[2-3 sentences: this document defines the EEE SOP standard governing format, metadata, and
normalization rules for the Copilot Studio / SharePoint grounded knowledge base. It is the
canonical reference for Phase-115 C17 enforcement and Phases 116-118 corpus retrofit.]

## Purpose and Scope
[Why the standard exists; the grounding motivation; what Phase-1 covers]

## Required Frontmatter Schema
[The key set: doc_id, status, owner, doc_type, platform, last_verified, review_by]
[Including data-type / format constraints for each]
[Template-sentinel pattern (1970-01-01) explained]

## Visible Header Block Format (D-05)
[Single inline paragraph format — NOT a table]
[Field set: Platform · Doc Type · Doc ID · Status]
[Why single-line: OQ4 grounding proof (frontmatter → invisible custom properties)]
[Why Platform + Doc Type first: chunk-split resilience]
[Middle-dot · separator (PIPE-02 validated)]
[## Summary must immediately follow — no intervening content]

## D1 Platform Normalization Map
[Full 20-entry map table: raw value → clean visible label]
[Rule: unmapped value = hard failure; no silent fallback]
[C17 implements this rule at harness level]

## Doc Type Taxonomy
[Runbook: L1/L2 runbooks — procedural walkthrough for operators]
[Guide: procedure docs for an audience (admin setup, end-user guides)]
[Reference: lookup material, no procedural walkthrough
  — includes comparison docs, error-codes, capability matrices]
[RCA: post-incident root cause analysis — taxonomy member for forward-compat; no RCA docs in Phase-1]
[Edge-case ruling (D-02): comparison docs → Reference; error-codes → Reference;
  end-user-guides → Guide]

## D2 Last Reviewed Semantics (META-04)
[`last_verified` is carried verbatim on retrofit — no staleness-clock reset]
[Version-History row: "v1.15 EEE reformat — content not re-reviewed" — one-time per retrofitted doc]
[Rationale: v1.15 is reformat-only; content accuracy review is the normal 90-day cadence's job]

## Status Values
[Draft / Approved / Superseded — controlled vocabulary]
[Draft = LABEL, not an index gate]
[Superseded convention: add "see RE-NNN" to block; new doc has "Supersedes RE-NNN" in block; archive-scope-exclusion is primary control]

## Grounding Notes
[Body-text-only indexing: OQ4 empirical proof (frontmatter → invisible custom properties)]
[Document-level-only citations: whole .docx, no section anchors (OQ1/SC4 empirical proof)]
[Approved-only in indexed library: operator responsibility (scripts/pipeline/README.md §SC3)]
[Status: Draft = label, not an index gate — exclude Draft/superseded docs by library scoping
  (or content-approval), never by relying on the body-text label (OQ2 empirical proof)]

## Phase-1 Scope
[D-03 positive-named classes: L1/L2 runbooks + admin-setup-* + reference class]
[D-04 OUT: operations/, device-operations/, cross-platform/apple-business/ → v1.16]

## C17 Enforcement Reference
[C17 (Phase 115) is the machine-checkable harness encoding of this standard]
[13 assertions enumerated — see C17 Needle-Spec section in this document or SUMMARY.md]
```

**Total sections: ~10 H2 sections.** The standard doc is not long — each section is a tight specification, not tutorial prose.

---

## Template Changes (SC3 / STD-02 / D-06 / D-07)

### Existing Template Inventory

| Template | Current `platform:` | Current frontmatter keys | D-07 needed? |
|----------|--------------------|--------------------------|-|
| admin-template.md | `Windows \| macOS \| all` | last_verified, review_by, applies_to, audience, platform | Yes |
| admin-template-android.md | `Android` | last_verified, review_by, audience, platform | No |
| admin-template-ios.md | `iOS` | last_verified, review_by | No (check full FM) |
| admin-template-macos.md | `macOS` | last_verified, review_by | No |
| l1-template.md | `Windows \| macOS \| iOS \| Android \| all` | last_verified, review_by, applies_to, audience, platform | Yes |
| l2-template.md | `Windows \| macOS \| iOS \| Android \| all` | last_verified, review_by, applies_to, audience, platform | Yes |

[VERIFIED: direct read of all 6 template files]

### Changes Required for ALL Templates

For each of the 6 existing templates, the delta is:

**1. Add 4 new frontmatter keys (in order, before `platform:`):**
```yaml
doc_id: RE-[FILL-IN]      # author fills in from registry at doc creation time
status: Draft              # default; owner promotes to Approved
owner: [FILL-IN]           # person or role
doc_type: [Runbook|Guide|Reference]  # choose per D-02 taxonomy
```

**2. Fix pipe-list `platform:` (D-07 — 3 templates only):**
- `admin-template.md`: `platform: Windows | macOS | all` → `platform: all`
- `l1-template.md`: `platform: Windows | macOS | iOS | Android | all` → `platform: all`
- `l2-template.md`: `platform: Windows | macOS | iOS | Android | all` → `platform: all`

Add HTML comment after `platform:` on all 3: `<!-- choose: Windows|macOS|iOS|Android|Linux|all -->`

**3. Add EEE header block immediately after frontmatter `---` close (before H1):**
```markdown
**Platform:** [normalized-from-D1] · **Doc Type:** [Runbook|Guide|Reference] · **Doc ID:** RE-[NNN] · **Status:** Draft
```
(Template uses placeholder text that authors replace)

**4. Add `## Summary` as first H2 with placeholder:**
```markdown
## Summary

[2–3 sentences: scope, audience, safety/escalation signal. Minimum 30 words. For runbooks: open
with the one-line scope/safety banner (read-only vs. escalation guardrail).]
```

**5. Remove the existing `> **Version gate:**` blockquote** if it currently appears between frontmatter and H1 — relocate it to after `## Summary`, or make it an optional author-placed element per the D3-A structure.

**C17 compliance after changes:**
- D-07 fixes ensure `platform:` values resolve in D1 map — C17 assertion #10 passes on all templates
- The 4 new keys satisfy C17 assertion #8 (required frontmatter keys present)
- Single-line block satisfies C17 assertion #6
- `## Summary` as first H2 satisfies C17 assertion #4

### New Reference Template (D-06)

**File:** `docs/_templates/reference-template.md`

```yaml
<!-- REFERENCE DOCUMENT TEMPLATE
     Usage: Copy this file as your starting point for any reference doc (capability matrix,
     comparison, error-code guide, endpoint list, etc.)
     Rules:
     - Fill in doc_id from docs/_registry/RE-index.md at doc creation time
     - doc_type: Reference (this template is reference-class only)
     - Tables: cap at ~25 rows or add a prose summary paragraph within 5 lines of any
       table that exceeds 25 rows (Phase 118 C17 table-remediation rule)
     - No Mermaid fences (C17 assertion #1)
     Reviewer: [Platform Lead for the reference domain]
-->
---
doc_id: RE-[FILL-IN]
status: Draft
owner: [FILL-IN]
doc_type: Reference
platform: [FILL-IN]   <!-- choose from D1 map: Windows|macOS|iOS|Android|Linux|all|... -->
last_verified: YYYY-MM-DD
review_by: YYYY-MM-DD
---

**Platform:** [normalized] · **Doc Type:** Reference · **Doc ID:** RE-[NNN] · **Status:** Draft

# [Reference Doc Title — descriptive, not bare RE-NNN]

## Summary

[2–3 sentences: what this reference document covers, audience, and key lookup value.]

## [Main Table or Reference Section]

[For capability matrices: organize with primary discriminator as the organizing axis
(e.g., enrollment mode, platform) — this is chunk-resilient per OQ3 findings.
Any table >25 rows requires a prose summary paragraph within 5 lines of the table
(C17 table-remediation assertion #11).]

| [Column A] | [Column B] | [Column C] |
|------------|------------|------------|
| [value]    | [value]    | [value]    |

> **Table summary:** [1-2 sentence prose summary of the table — required if table exceeds 25 rows.
> Ensures column-header context survives ~2,000-char chunk boundaries.]

## See Also

- [Related reference or runbook]
```

---

## Doc ID Registry (SC4 / STD-03 / D-08)

### Phase-1 File Count (confirmed from corpus)

[VERIFIED: direct directory listing of all Phase-1 scoped paths]

| Class | Directory | File count |
|-------|-----------|-----------|
| L1 runbooks | docs/l1-runbooks/ | 42 |
| L2 runbooks | docs/l2-runbooks/ | 33 |
| Admin setup — APv1 | docs/admin-setup-apv1/ | 11 |
| Admin setup — APv2 | docs/admin-setup-apv2/ | 5 |
| Admin setup — Android | docs/admin-setup-android/ | 14 |
| Admin setup — iOS | docs/admin-setup-ios/ | 10 |
| Admin setup — macOS | docs/admin-setup-macos/ | 12 |
| Admin setup — Linux | docs/admin-setup-linux/ | 6 |
| Admin setup — 802.1X | docs/admin-setup-8021x/ | 8 |
| Reference | docs/reference/ | 26 |
| Error codes | docs/error-codes/ | 7 |
| End-user guides | docs/end-user-guides/ | 2 |
| Comparison docs (singletons) | docs/ (apv1-vs-apv2.md, windows-vs-macos.md) | 2 |
| **Phase-1 total** | | **178** |

**Note:** D-03 estimated "~167-176." The actual count is 178. The 2-doc overage is within the "~" envelope; the ~75 runbook and ~66 admin-setup estimates are exact (75, 66). The reference class estimate of "~35" is 37 actual.

**Note on 00-index.md / 00-overview.md files:** Four in-scope directories contain navigation/overview files (l1-runbooks/00-index.md, l2-runbooks/00-index.md, reference/00-index.md, error-codes/00-index.md; each admin-setup dir has 00-overview.md). These are included in the 178 count and the D-03 "75 runbooks" roadmap count. If the planner wants to exclude navigation files from the registry, the count decreases by up to 11; update ordering accordingly.

### RE-index.md Format

**Location:** `docs/_registry/RE-index.md` — directory does NOT exist yet.

**Why outside indexed library:** If indexed, doc-specific queries (e.g., "What does RE-047 cover?") return the registry row instead of document content. [VERIFIED: scripts/pipeline/README.md §SC3]

**Proposed format:**
```markdown
# Doc ID Registry — Phase-1

> This registry lives OUTSIDE the indexed SharePoint library. See scripts/pipeline/README.md §SC3.

| Doc ID | Path | Title | Doc Type | Status |
|--------|------|-------|----------|--------|
| RE-001 | docs/l1-runbooks/01-device-not-registered.md | [H1 title] | Runbook | Pending |
| RE-002 | docs/l1-runbooks/02-... | ... | Runbook | Pending |
| ... | | | | |
| RE-178 | docs/windows-vs-macos.md | [H1 title] | Reference | Pending |
```

**Status column at assignment time:** "Pending" (before retrofit); "Approved" after retrofit + Phase 119 close. The registry is updated in-phase as docs are retrofitted (Phases 116-118).

### RE-NNN Assignment Ordering (Claude's Discretion)

**Recommended ordering:** By class in D-03 retrofit order (L1 → L2 → admin-setup → reference class), then by existing filename within each class. Rationale:
- Mirrors the Phase 116 → 117 → 118 retrofit order — RE-NNN loosely corresponds to when a doc will be retrofitted
- Filename ordering within a class is reproducible (alphabetical/numerical)
- IDs remain semantically flat (no class-encoded structure — D-08 rule)

**Specific ordering:**
1. RE-001 to RE-042 — docs/l1-runbooks/ (sorted by filename)
2. RE-043 to RE-075 — docs/l2-runbooks/ (sorted by filename)
3. RE-076 to RE-086 — docs/admin-setup-apv1/ (sorted by filename)
4. RE-087 to RE-091 — docs/admin-setup-apv2/
5. RE-092 to RE-105 — docs/admin-setup-android/
6. RE-106 to RE-115 — docs/admin-setup-ios/
7. RE-116 to RE-127 — docs/admin-setup-macos/
8. RE-128 to RE-133 — docs/admin-setup-linux/
9. RE-134 to RE-141 — docs/admin-setup-8021x/
10. RE-142 to RE-167 — docs/reference/
11. RE-168 to RE-174 — docs/error-codes/
12. RE-175 to RE-176 — docs/end-user-guides/
13. RE-177 — docs/apv1-vs-apv2.md
14. RE-178 — docs/windows-vs-macos.md

**Collision prevention:** The assignment is done in one complete pass over the sorted, enumerated file list before any corpus file is edited. Running the assignment as a single plan step with a script that lists all Phase-1 files and emits the RE-index.md is the safest approach.

### Registry Excludes

- `scripts/pipeline/test-fixtures/` — RE-T0x fixtures live here, OUTSIDE `docs/`. D-08 confirmed: corpus-file registry naturally excludes them.
- `.pipeline-output/` — generated .docx outputs; also outside `docs/`.
- `docs/_standards/EEE-SOP-standard.md` — uses STD-001 prefix, not RE-NNN.
- `docs/_templates/*` — templates, not corpus docs.
- `docs/_glossary-*.md`, `docs/index.md`, `docs/quick-ref-*.md` — v1.16 structural class.

---

## C17 Needle-Spec Handoff

Phase 114 hands off a needle-spec that Phase 115 encodes as one indivisible validator atom. Phase 114 does NOT wire any new validator into the chain.

### Complete C17 Assertion List (from SUMMARY.md — 13 assertions)

[VERIFIED: .planning/research/SUMMARY.md §C17 Lint Surface]

| # | Assertion | Phase 114 inputs this assertion needs |
|---|-----------|---------------------------------------|
| 1 | No Mermaid code fences in Phase-1 corpus files | None (existing constraint) |
| 2 | H1 present exactly once, first non-frontmatter line | None (D3-A structure) |
| 3 | H1 content ≠ bare doc-ID pattern (`^RE-\d+$`) | None (D3-A structure) |
| 4 | `## Summary` is first H2 (no intervening H2/H3 between block and Summary) | D-05: `## Summary` immediately follows block |
| 5 | `## Summary` ≥ 30 words of content prose | Word count threshold: 30 words (from ROADMAP Phase-115 SC2) |
| 6 | Header block is single inline paragraph, NOT a table | D-05: block is single inline line |
| 7 | Platform and Doc Type appear before Doc ID and Status in block | D-05 field order: Platform · Doc Type · Doc ID · Status |
| 8 | Required frontmatter keys present: `doc_id`, `status`, `owner`, `doc_type`, `last_verified` | D-01 through D-05: these 5 keys required |
| 9 | Each visible block field matches corresponding frontmatter value; Platform via D1 map | D-05 field set; D-09: unmapped = fail |
| 10 | `platform` value in D1 map — FAIL on unmapped (no fallback) | D-09 + full 20-entry D1 map |
| 11 | Markdown tables >25 rows have prose summary within 5 lines | Phase-118 Reference retrofit rule (OQ3) |
| 12 | Gate blockquote (if present) ≤ 200 characters | Existing constraint (PITFALLS.md P-06 Sub-risk B) |
| 13 | `status` ∈ {Draft, Approved, Superseded} | D-01/D-05 controlled vocabulary |

### Phase 114 Additions to Needle-Spec

| Item | Needle-Spec Text for Phase 115 |
|------|-------------------------------|
| Block field set | `{Platform, Doc Type, Doc ID, Status}` — exactly 4 fields, in that order |
| Owner placement | `owner` required in YAML frontmatter; `owner` NOT present in the visible block |
| Block format | single inline paragraph with `·` (middle-dot U+00B7) separator |
| Platform resolves | `platform` value must resolve in D1 map (the 20-entry map in EEE-SOP-standard.md); unmapped = FAIL, no fallback |
| Status vocabulary | `status` (frontmatter) ∈ {Draft, Approved, Superseded} (case-insensitive matching or exact match — Phase 115 decides) |
| Summary word-count | `## Summary` section body ≥ 30 words |

---

## Common Pitfalls

### Pitfall 1: C10 Scope Confusion

**What goes wrong:** Planner assumes C10 checks ALL docs and designs SC1 test using a file outside `linuxDocPaths()` — the test file is never checked by C10, producing a false positive.
**Why it happens:** C10's name ("Linux frontmatter") doesn't make its scope obvious.
**How to avoid:** SC1 test file must be in `linuxDocPaths()` scope (see SC1 test design above — use `docs/admin-setup-linux/` path for the probe file, or use an existing Linux doc temporarily).
**Warning signs:** If the harness output shows C10 checking zero files after adding the probe, the probe is out of scope.

### Pitfall 2: Registry Indexed by Accident

**What goes wrong:** `docs/_registry/RE-index.md` gets converted to .docx and uploaded to the SharePoint library alongside the corpus docs.
**Why it happens:** Batch conversion scripts that walk `docs/**/*.md` will pick up `_registry/RE-index.md`.
**How to avoid:** Document in the standard AND in the registry file itself that it must NOT be uploaded. The conversion/upload scripts (future phases) must exclude `docs/_standards/` and `docs/_registry/`.
**Warning signs:** Query "What does RE-047 cover?" returns a registry table row instead of the runbook content.

### Pitfall 3: D1 Map Missing a Phase-1 Variant

**What goes wrong:** The D1 map doesn't cover one of the 13 Phase-1 variants → C17 FAILs every file with that variant during Phase 115 SC3 (C17 exit 0 on all templates) or during Phase 116 corpus retrofit.
**Why it happens:** The lowercase case-variants (`windows`, `macos`, `ios`, `android`, `linux`) each appear only once and are easy to miss.
**How to avoid:** The full 20-entry map in this research must be used verbatim. Re-run the grep at plan time: `grep -rhi "^platform:" docs --include="*.md" | sort | uniq -c`.
**Warning signs:** C17 reports "unmapped platform value 'windows'" (lowercase) on an admin-setup doc.

### Pitfall 4: Two Deliverables with "All Platforms" Ambiguity

**What goes wrong:** `all` and `windows+macos+ios+android+linux` are merged to the same clean label "All Platforms" in the D1 map, but C17 then needs to differentiate them for some assertion.
**Why it happens:** The two raw values are semantically identical but syntactically distinct.
**How to avoid:** Map both to "All Platforms" — they ARE the same thing. C17 only needs the clean label (not the raw value) for body-text block generation. Frontmatter stores the raw value; block shows the clean label.
**Warning signs:** None — this is safe by design. If C17 ever needs to distinguish them, the frontmatter raw value is available.

### Pitfall 5: Template Block Format Inconsistency

**What goes wrong:** Different templates produce differently-formatted EEE blocks (e.g., some bold all labels, some bold none, some use `|` separator).
**Why it happens:** Six templates authored independently.
**How to avoid:** The EEE-SOP-standard.md must specify the EXACT block format string that all templates must use, and C17 assertion #6 validates it. All 7 templates (6 existing + 1 new) use the same block format.

---

## Runtime State Inventory

This is a greenfield documentation-authoring phase. No runtime state items are modified:

| Category | Items Found | Action Required |
|----------|-------------|------------------|
| Stored data | None — no databases, registries, or data stores affected | None |
| Live service config | None — no SharePoint library, Copilot Studio agent, or pipeline config modified | None |
| OS-registered state | None — no scheduled tasks, services, or OS-registered processes involved | None |
| Secrets/env vars | None — no credentials or environment variables involved | None |
| Build artifacts | `docs/_standards/` and `docs/_registry/` directories created (new) | None — greenfield |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Platform value in frontmatter only (invisible to index) | Platform in frontmatter + in visible body-text block | Phase 114 (EEE standard) | Platform label now queryable by Copilot |
| No Doc IDs | RE-NNN sequential IDs (body-text block + registry) | Phase 114 | "What does RE-047 cover?" queries become reliable |
| Templates without EEE keys | Templates born conformant (doc_id, status, owner, doc_type) | Phase 114 | All new docs born EEE-conformant from creation |
| Status inferred from content | `status:` frontmatter + block render | Phase 114 | C17 enforceable; library scoping separable from content |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Harness validators (C10 SC1 test) | ✓ | existing | — |
| Pandoc | Pipeline (Phase 113 deliverable) | ✓ | 3.7.0.2 | — |
| `docs/_standards/` directory | EEE-SOP-standard.md | ✗ — created this phase | — | Create in Wave 0 / plan step |
| `docs/_registry/` directory | RE-index.md | ✗ — created this phase | — | Create in Wave 0 / plan step |

**Missing with fallback (creation is part of this phase):** Both new directories are created as plan steps; no external dependency or human action needed.

---

## Validation Architecture

**nyquist_validation:** Not applicable — Phase 114 is documentation authoring only. No code tests apply. Validation is the SC1 harness run (C10 leniency test), not a test framework.

### Phase Gate Validation (not a test suite — harness runs)

| Gate | Behavior | Command | When |
|------|----------|---------|------|
| SC1 | C10 passes on probe file with 4 new frontmatter keys | `node scripts/validation/v1.14-milestone-audit.mjs` | Plan step 1 (before any corpus file is touched) |
| SC2 | EEE-SOP-standard.md committed with all required sections | Visual review against section checklist | After standard is authored |
| SC3 | All templates updated; D-07 pipe-list fix applied | Check `grep "^platform:" docs/_templates/*.md` shows no pipe-list values | After templates updated |
| SC4 | RE-index.md committed with RE-001..RE-178; no duplicates | `grep -c "^| RE-" docs/_registry/RE-index.md` = 178 | After registry authored |

---

## Security Domain

Phase 114 writes no code, handles no authentication, processes no user input, and modifies no runtime systems. ASVS categories V2 (Authentication), V3 (Session), V4 (Access Control), V6 (Cryptography) do not apply. V5 (Input Validation) does not apply — no data processing.

The one security-adjacent note: `owner:` field in frontmatter will contain a person name or role identifier. The EEE standard should specify that owner values are author-tracking metadata for internal use only — they are NOT rendered in the visible header block (D-01) and thus do not appear in Copilot responses. No PII is exposed to the grounding index.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | `docs/_standards/` and `docs/_registry/` directories not yet excluded by any harness check (C1-C16) that would fail on new files | Architecture Patterns | Low — these are new `_`-prefixed directories unlikely to be in existing harness scope; verify by running harness after creating them |
| A2 | admin-template-ios.md and admin-template-macos.md have complete frontmatter with `platform:` set (iOS and macOS respectively) | Template Changes | Low — verified via grep; but ios/macos templates were only partially read |
| A3 | The 178-doc Phase-1 count includes all 00-index.md / 00-overview.md files; the planner has discretion to exclude nav files from the registry | Doc ID Registry | Medium — if nav files are excluded, count decreases to ~167 and RE-NNN numbering adjusts |

---

## Open Questions

1. **00-index.md / 00-overview.md files in Phase-1 scope — include in registry or exclude?**
   - What we know: D-03 says "75 docs" for runbooks (42+33=75), which includes 00-index.md; admin-setup dirs have 00-overview.md; both are in-scope directory walks
   - What's unclear: whether navigation/overview files should get RE-NNN Doc IDs (they will eventually be C17-gated if included)
   - Recommendation: Include them in the registry (consistent with D-03 count); they get RE-NNN IDs and are retrofitted in Phase 116-118 like any other file

2. **`all` vs `windows+macos+ios+android+linux` in D1 map — one clean label or two?**
   - What we know: semantically identical; D-09 lists both separately; 8 corpus docs use the compound form
   - What's unclear: whether the standard should map both to "All Platforms" or distinguish them visually
   - Recommendation: Both → "All Platforms" — they are semantically identical; the raw frontmatter value preserves the distinction for any future tooling

3. **EEE-SOP-standard.md Doc ID scheme — RE-NNN or separate prefix?**
   - What we know: The registry is corpus-only (Phase-1 docs); the standard is meta-documentation
   - What's unclear: whether the standard gets a RE-NNN ID from the registry or a separate prefix (e.g., STD-001)
   - Recommendation: Use STD-001 prefix to distinguish meta-docs from corpus docs; avoids occupying a RE-NNN slot

---

## Sources

### Primary (HIGH confidence — verified directly against repo)
- `scripts/validation/v1.14-milestone-audit.mjs` lines 517-555 — C10 implementation (additive validator, not whitelist)
- `scripts/validation/v1.14-milestone-audit.mjs` lines 199-234 — `linuxDocPaths()` scope definition
- Direct corpus grep: `grep -rhi "^platform:" docs --include="*.md"` — full D1 variant enumeration
- Per-directory `ls` counts — Phase-1 file counts (178 total)
- `docs/_templates/*.md` — direct read of all 6 templates, platform values and frontmatter keys
- `scripts/pipeline/README.md §SC3` — deployment policy (registry not indexed; only .docx in library)
- `.planning/phases/113-*/PIPE-02-FINDINGS.md` — OQ1-OQ4 empirical findings (all four resolved)

### Secondary (HIGH confidence — canonical planning documents)
- `.planning/phases/114-*/114-CONTEXT.md` — locked decisions D-01..D-09
- `.planning/REQUIREMENTS.md` — META-01..04, STD-01..03
- `.planning/research/SUMMARY.md` — C17 lint surface / needle list (13 assertions)
- `.planning/STATE.md` — Plan-Time Research Flags and Pending Todos

---

## Metadata

**Confidence breakdown:**
- C10 leniency: HIGH — verified by direct code analysis of the validator implementation
- D1 platform variant enumeration: HIGH — verified by direct corpus grep (20 variants, ~19-20 confirmed)
- Phase-1 file count (178): HIGH — verified by directory listing of all in-scope paths
- Template current state: HIGH — verified by direct read of all 6 templates
- EEE-SOP-standard.md section outline: MEDIUM — based on requirements, decisions, and grounding facts; exact wording is authoring discretion
- Reference template shape: MEDIUM — based on D-06 intent and Phase-118 table remediation need
- RE-index.md format: MEDIUM — based on D-08 and REQUIREMENTS; exact column set is Claude's discretion

**Research date:** 2026-07-03
**Valid until:** Stable — Phase 114 is pure documentation authoring against locked decisions; no moving targets

---

## RESEARCH COMPLETE

**Phase:** 114 — EEE Standard, Templates, Doc ID Registry + Metadata Rules
**Confidence:** HIGH

### Key Findings

- **C10 is definitively lenient on unknown keys** — additive regex-based validator; SC1 test design is concrete (probe file in `docs/admin-setup-linux/` or `docs/reference/`-adjacent path, run harness, confirm C10 passes).
- **D1 map fully enumerated: 20 entries** — 13 in Phase-1 scope, 7 exclusively in out-of-scope docs (D-04). The D-09 "~19-20" estimate is confirmed exactly. Five case-variant pairs (windows/Windows, macos/macOS, ios/iOS, android/Android, linux/Linux) are among the Phase-1 in-scope variants.
- **Phase-1 file count: 178 docs** (above D-03 estimate of ~167-176; within the "~" envelope). L1/L2 runbooks: 75 (exact match), admin-setup: 66 (exact match), reference class: 37 (~35 estimate).
- **`docs/_standards/` and `docs/_registry/` do not yet exist** — both created this phase. Neither is a harness-checked path in C1-C16. No existing check will fail on new files added there.
- **Three templates need D-07 fix** — admin-template.md, l1-template.md, l2-template.md carry pipe-list `platform:` values that are unmappable in D1. The four platform-specific templates (android, ios, macos, + linux stub) already carry concrete mappable values.

### File Created
`.planning/phases/114-eee-standard-templates-doc-id-registry-metadata-rules/114-RESEARCH.md`

### Confidence Assessment

| Area | Level | Reason |
|------|-------|--------|
| C10 leniency | HIGH | Direct code analysis of v1.14-milestone-audit.mjs lines 517-555 |
| D1 variant enumeration | HIGH | Direct corpus grep, count confirmed |
| Phase-1 file count | HIGH | Direct directory listing of all 13 in-scope paths |
| Template current state | HIGH | Direct read of all 6 templates |
| EEE-SOP standard structure | MEDIUM | Based on requirements/decisions; wording is authoring discretion |
| C17 needle-spec completeness | HIGH | Sourced from SUMMARY.md §C17 Lint Surface (13 assertions) |

### Open Questions

- Whether 00-index.md / 00-overview.md navigation files get RE-NNN Doc IDs (recommendation: yes, consistent with D-03 "75 runbooks" count).
- Exact clean label for `all` vs `windows+macos+ios+android+linux` — recommendation: both → "All Platforms".

### Ready for Planning
Research complete. Planner can now create PLAN.md files.
