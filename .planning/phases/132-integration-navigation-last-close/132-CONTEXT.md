# Phase 132: Integration & Navigation-Last Close - Context

**Gathered:** 2026-07-18
**Status:** Ready for planning

<domain>
## Phase Boundary

Register both already-authored recipes, publish them through the existing pipeline, and make them discoverable from `docs/index.md`. Content is **complete** — this phase is terminal wiring only (CLASS-03, CLASS-04). No recipe content is authored or edited here; no pipeline code changes.

**Delivers:**
- RE-222 / RE-223 registry rows in `docs/_registry/RE-index.md` at `Status: Approved`
- Both recipe frontmatter + byline `status: Draft → Approved`
- Regenerated (never hand-edited) `scripts/pipeline/filename-map.md` via `build-filename-map.mjs`
- New dedicated recipes section in `docs/index.md`
- Confirmation that troubleshooting hubs are NOT wired
- C17 green on full corpus including both recipe files

</domain>

<decisions>
## Implementation Decisions

### index.md recipes section (the one genuine gray area — CLASS-04)
- **D-01: Dedicated section only.** Add one new top-level `## Device Configuration Recipes` section listing both recipes. Do NOT distribute/cross-link into the `## Windows Autopilot` or `## iOS/iPadOS Provisioning` platform sections — keep recipes as a single distinct discoverable class, matching how index.md groups other doc classes.
- **D-02: Placement — after platform sections, before `## Operations`.** The section sits after `## Linux Provisioning`, before `## Operations`. Groups recipes with the platform-provisioning content they extend.

### Locked by requirement text / project convention (NOT re-decided here)
- **CLASS-03 pipeline is mechanical, zero pipeline code changes:** append RE-222/223 rows after RE-221 → flip Draft→Approved (frontmatter, `**...Status:**` byline, registry row) → regenerate `filename-map.md` by running `build-filename-map.mjs` (never hand-edit).
- **Troubleshooting hubs NOT wired:** `common-issues.md` / `quick-ref-l1.md` / `quick-ref-l2.md` are left untouched — recipes are provisioning Guides, not troubleshooting docs (CLASS-04 states this outright). Confirmation is a verification step, not a decision.
- **Navigation-last discipline:** the `index.md` nav commit MUST post-date the registry/status commits (project convention, verified via git history at close).
- **doc_type stays `Guide`** for both recipes (locked at Phase 129 D-02 ruling — closed 4-value enum, never a new "Recipe" value).

### Claude's Discretion
- Exact one-line description wording for each recipe entry in the new index.md section (follow the existing index.md entry style — short audience/scope blurb).
- RE-index row title text (reuse each recipe's H1 / `applies_to`, consistent with existing RE rows).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` §CLASS-03, §CLASS-04 — exact acceptance criteria for this phase
- `.planning/ROADMAP.md` §"Phase 132" — success criteria (4 items) + "DISCUSS-PHASE FLAGS: none"

### Files this phase edits
- `docs/recipes/01-shared-windows-avd-client.md` — RE-222, currently `status: Draft` (flip to Approved)
- `docs/recipes/02-shared-ipad-full-provisioning.md` — RE-223, currently `status: Draft` (flip to Approved)
- `docs/_registry/RE-index.md` — append RE-222/223 rows after RE-221 (last existing row)
- `docs/index.md` — RE-219; add dedicated `## Device Configuration Recipes` section after platform sections, before `## Operations`

### Pipeline (run, never edit)
- `scripts/pipeline/build-filename-map.mjs` — regenerates `scripts/pipeline/filename-map.md` from the registry; zero code changes expected
- `scripts/pipeline/filename-map.md` — generated artifact (must show both recipes after regen)

### Standard governing recipes
- `docs/_standards/EEE-SOP-standard.md` — D-02 recipe ruling (`docs/recipes/*` → `doc_type: Guide`); C17 rules incl. #12 (200-char blockquote cap)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `build-filename-map.mjs` pipeline: proven unchanged across v1.15–v1.17. Standard mechanical execution — regenerate, do not hand-edit the map.
- RE-index.md row format: `| RE-NNN | <path> | <title> | <doc_type> | <status> |` — append two rows following the RE-221 row.

### Established Patterns
- Registry → filename-map → publish-bundle pipeline is generic and byte-stable; Phase 132 exercises it on real recipe content as end-to-end proof.
- index.md is organized by top-level `##` doc-class / platform sections; the new recipes section follows that same heading convention.

### Integration Points
- Recipe frontmatter `status` + the `**Platform:** … · **Status:**` byline line + the RE-index row must all read `Approved` consistently.
- C17 validator runs over the full corpus including `docs/recipes/*` — both files already C17-green as authored (Phase 130/131); re-confirm after status flip.

</code_context>

<specifics>
## Specific Ideas

- New index.md heading: `## Device Configuration Recipes`, placed after `## Linux Provisioning` and before `## Operations`, linking both recipes with short scope blurbs.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope. (Phase 132 is deliberately terminal wiring; no new capabilities surfaced.)

</deferred>

---

*Phase: 132-integration-navigation-last-close*
*Context gathered: 2026-07-18*
