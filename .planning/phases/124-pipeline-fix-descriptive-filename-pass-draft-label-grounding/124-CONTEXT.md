# Phase 124: Pipeline Fix, Descriptive-Filename Pass & Draft-Label Grounding Probe - Context

**Gathered:** 2026-07-08
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 124 clears the v1.16 pipeline/structural shelf before the Phase-125 terminal close. It delivers exactly three things and **no new content**:

1. **PIPE-03** — the pandoc nav-footer YAML-alias defect (`DEFER-119-C`, exit-64 `Unknown alias 'Previous'`) is fixed at the pipeline surface, without regressing the OQ4 frontmatter → Word custom-property promotion.
2. **PIPE-04** — a descriptive-filename pass so Copilot Studio citation titles read descriptively (filename-driven, not RE-NNN).
3. **PIPE-05** — an owner-run empirical confirmation that the Draft label renders + is queryable in the shipped EEE header-block format.

**Hard boundary — Phase-125 firewall:** Phase 124 must NOT author the close-gate, add the `V115` `frozen-at-close.mjs` entry (HARN-05), create `check-phase-124.mjs` / `v1.16-milestone-audit.mjs` (HARN-06), run the 3-axis terminal re-audit or the full predecessor chain (HARN-07 / flag §6), or flip any requirement to Validated. All of that is Phase 125's indivisible atom. Phase 124 MAY emit a *needle-spec* of any predecessor-validator drift it CAUSES (near-empty under the output-only PIPE-04 resolution).

**Frozen-surface discipline:** v1.4–v1.15 content surfaces stay BYTE-UNCHANGED through Phase 124. Every decision below was selected in part to avoid touching frozen source docs.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a 12-agent `/adversarial-review` (Proponent → Adversary → Referee per area), each Referee verifying decisive claims independently against the repo (re-ran pandoc 3.7.0.2, re-ran the slug sanitizer over all 221 titles, read the v1.15 `PIPE-02-FINDINGS.md`). In all four areas the Adversary position won or refined the Proponent's. See `124-DISCUSSION-LOG.md` for the full argument trail.

### PIPE-03 — Pandoc nav-footer alias fix (Referee confidence 0.9)
- **D-01 (approach):** **Pipeline-side *surgical* preprocessing in `scripts/pipeline/convert.ps1`.** Before the pandoc call (line 74), copy `$InputMd` to an **ephemeral temp file**; on that copy only, rewrite a standalone blank-preceded `---` line → `* * *` **iff the next non-blank line matches `^\s*\*(Previous|Next step)\b`**. Feed the temp file to the existing (flag-identical) pandoc invocation. **Source `.md` is never mutated** → freeze intact; top frontmatter (line 1, not blank-preceded) is never touched → OQ4 promotion path unchanged. Rewriting only the **opening** `---` of the bracket suffices (the trailing `---` degrades to a harmless thematic break).
- **D-02 (rejected alternatives — do NOT re-open):** Option A (`--from=markdown-yaml_metadata_block`) is **empirically disproven** — it zeroes the 9 OQ4 custom-properties AND leaks `doc_id` into the body. Option A2 (frontmatter-extract + `--metadata-file`) leaks frontmatter into the body → guard-docx fail. Option B (corpus-wide nav-footer normalization) is a **frozen-surface violation** — 20 of the 26 footer files are frozen v1.15 surfaces. The naive *blanket* variant (rewrite every blank-preceded `---`) over-matches 27× (718 blank-preceded `---` corpus-wide vs. 26 nav-openers) — rejected in favor of the surgical anchor, which covers **100% of failures with 0 false hits corpus-wide**.
- **D-03 (mandatory hardening bundle — all three LOCKED, not advisory):** (a) the preprocessor MUST track ` ``` `/`~~~` fenced-code state and skip any `---` inside a fence (0 instances today; durable-tool latent defense); (b) a **fail-closed** guard assertion that the ONLY diff between source and temp is `---`→`* * *` on anchor-matched lines — abort conversion (non-zero exit) on any other delta; (c) any future nav-footer generator/template emits `* * *` directly, never `---`.
- **D-04 (SC2 regression test — required, "both paths regression-tested"):** Positive — the 12 failing files convert **exit 0** through `convert.ps1`. OQ4 non-regression — a converted nav file's `docProps/custom.xml` still carries the **9** promoted custom properties and `word/document.xml` body contains **no** leaked frontmatter keys. Byte-equivalence — `word/document.xml` is byte-identical pre-fix vs post-fix for the 14 previously-passing nav files.
- **Verified defect surface:** exactly **12 files** fail (all admin-setup guides), triggered by the full `---`…`---` bracket (opening blank-preceded `---`, `*Previous:`/`*Next step:` line, closing `---`/`...`). 14 other footer-bearing files have only a lone leading `---` and already pass. `README.md` SC1 ("no other flags") must be updated to *document* the pre-pandoc source-normalization step (it is not a pandoc flag; line 74 stays flag-identical).

### PIPE-04 — Descriptive-filename scheme
- **D-05 (naming convention):** **Title-derived output slug.** `output_docx = slug(RE-index.Title) + ".docx"` where `slug` applies in this exact order: (1) lowercase; (2) replace `/` and every whitespace run with a single `-`; (3) delete every char not in `[a-z0-9-]` (so `802.1X`→`8021x`, `(APNs)`→`apns`); (4) collapse runs of `-`, trim leading/trailing `-`; (5) append `.docx`. **Do not paraphrase step order** — converting whitespace→`-` *before* stripping is what prevents `devicenotregisteredinautopilot`. Path-flattening was rejected: it leaks directory jargon (`l2-runbooks-`) + meaningless ordinals (`03-`) into the citation, defeating the PIPE-02-OQ1 goal. Both schemes verified **0 collisions across all 221 titles**.
- **D-06 (SOURCE INVARIANT — LOCKED, both parties agree):** **Source `.md` files are NEVER renamed.** PIPE-04 assigns **output `.docx` filenames only.** (Source files are already descriptively named; RE-NNN lives only in the registry, so "RE-NNN ↔ file mapping stays intact" holds by construction.)
- **D-07 (source of truth):** the existing `docs/_registry/RE-index.md` **`Title` column** (single source); `Path` consulted **only** as the collision tie-break input. No new authored data.
- **D-08 (collision policy — deterministic, fail-closed):** on a slug clash (0 of today's 221), append the minimal number of trailing `Path` parent-directory segments (nearest-first, each sanitized) until unique. The generator **fails closed** (`FILENAME-COLLISION-UNRESOLVED`, non-zero exit) if a clash cannot be resolved — never emits a silent duplicate.
- **D-09 (sync mechanism):** a **generated, committed build-artifact map** (e.g. `scripts/pipeline/build-filename-map.mjs` → a map with columns `Doc ID | Path | Output Filename`). It reads `RE-index.md`, asserts 0 unresolved collisions, and **does NOT write `RE-index.md`.** No hand-maintained "Output Filename" column (that would be a denormalized drift surface).
- **D-10 (timing):** convention + generator + committed map ship **in Phase 124**. The **batch driver + any actual `.docx` generation/upload are DEFERRED to the deployment phase** (v1.17+; bulk upload is out of scope this milestone). **`convert.ps1` stays byte-unchanged** — its existing `-OutputDocx` param consumes the map value.
- **D-11 (scope):** the **221 registered docs** (registry-driven). The 56 unregistered `.md` files are excluded by construction.
- **D-12 (D-01 checker obligation — DOWNGRADED to no-op):** because the resolution is output-only, no markdown link target changes, so the Phase-123 D-01 link-checker (`check-nav-hub-links.mjs`) re-run is at most a no-op safety check, **not blocking work**. (It remains a live obligation only for a future phase that renames source `.md` files — which this scheme explicitly does not.)

### PIPE-05 — Draft-label grounding probe
- **D-13 (execution model):** **Owner-run, agent-prepared, at a blocking execution checkpoint sequenced LAST.** Agent-run is genuinely impossible — verified NO Copilot Studio / Graph API / SharePoint connector or credential exists in this environment. Agent authors the runbook, fixture, blank FINDINGS, and rubric, then HALTS; the owner (Josh) runs the live upload + queries. Mirrors the v1.15 PIPE-02 model.
- **D-14 (single artifact — drop the A/B twin):** ONE Draft test document. Reformat `scripts/pipeline/test-fixtures/draft-test-doc.md` so its header is the **shipped EEE single-line block** (`**Platform:** macOS · **Doc Type:** Runbook · **Doc ID:** RE-T05 · **Status:** Draft`) AND frontmatter `status: draft` — both legs mutated to mirror a real retrofitted Draft doc. The approved twin is ceremony SC4 does not ask for; ambient Approved docs already supply the contrast.
- **D-15 (evidence):** committed `PIPE-05-FINDINGS.md` (owner-filled) + a reusable parameterized `PIPE-05-RUNBOOK.md` (library/agent URL as fill-ins, the exact fixture, two fixed queries, binary rubric), both in `.planning/phases/124-.../`. Two fixed queries: a *render* query ("Tell me about the draft macOS test document") and a *queryable* query ("What is the status of the RE-T05 document?"). Binary rubric: PASS = literal "Draft" appears in the response/citation, attributable to the visible body-text block.
- **D-16 (checkpoint discipline):** Hold the active Jira Story **In Progress** across the checkpoint (do NOT let the Stop-hook flip it Done mid-probe); the agent must **not** auto-flip the SC4 checkbox — it flips only on the owner's in-thread confirmation + committed FINDINGS. If the tenant is unavailable, commit runbook + fixture + a FINDINGS stub recording "prepared; live confirmation deferred to deployment" — never a fabricated "confirmed."
- **D-17 (REQUIREMENTS.md:35 correction — owner-approved):** During Phase 124 planning, **correct the inverted wording** in `REQUIREMENTS.md:35`. The v1.15 probe DID exercise the visible `**Status:**` body-text leg — that is the leg that surfaced; the frontmatter `status:` leg is the non-surfacing one (promotes to an *invisible* Word custom property). This is already codified in `docs/_standards/EEE-SOP-standard.md` §L284-296. **PIPE-05 is a cosmetic FORMAT re-confirmation** (shipped `·`-separated Platform-first single-line block vs. the v1.15 `.`-separated Doc-ID-first stub), not a new-leg discovery — the plan and FINDINGS must state this honestly. The owner chose to keep the cheap probe anyway.
- **D-18 (SC4 rewording — owner-approved):** Reword ROADMAP SC4 **outcome-neutral with a FAIL-escalation clause**: "PIPE-05 probe executed against the shipped EEE header-block format; the Draft label's render + queryability recorded in `PIPE-05-FINDINGS.md`." A PASS (expected) or a tenant-unavailable **deferred** result closes SC4 cleanly; a recorded **surfacing FAIL** (Draft label does NOT surface in the shipped block) does NOT auto-close — it escalates as a genuine defect (shipped block regressed vs. the v1.15 stub, contradicting EEE-SOP-standard.md §L284-296) and must be triaged before Phase 124 close.
- **D-19 (PIPE-05 ≠ HARN-07):** `PIPE-05-FINDINGS.md` is a **necessary but NOT sufficient** input to Phase 125's HARN-07 "PIPE-02 grounding-validation confirmation on the retrofitted structural corpus" (HARN-07 spans the whole retrofitted corpus; PIPE-05 is the narrow Draft-label slice). Phase 125 must reference it, not treat it as discharging HARN-07.

### Phase sequencing / scope
- **D-20 (plan decomposition — 3 plans):** **124-01** PIPE-03 (Wave 1, gating, standalone, with the D-04 OQ4 regression) → **124-02** PIPE-04 combined (define map + output-name wiring + registry-sync confirmation + one representative sample conversion proving the descriptive citation title) → **124-03** PIPE-05 (Wave 3, terminal owner-gate). Ordering **PIPE-03 → PIPE-04 → PIPE-05 is invariant.** Plan count matches transformation volume (this is a 120-class ≈2-3-plan phase, not a bulk-retrofit phase). Do NOT fold PIPE-03 into another plan — it is a distinct correctness surface with its own regression gate.
- **D-21 (escalation trigger — does NOT fire):** the define/apply split → 4 plans would trigger ONLY if PIPE-04 resolved to a source-`.md` mass-rename. It resolved output-only (D-06), so **3 plans is the locked answer.**
- **D-22 (validator schedule):** after 124-01 → the D-04 OQ4 regression (mandatory). After 124-02 → D-01 link-checker + full-corpus C17 re-run **only if link targets change** — under output-only they do NOT, so **neither re-runs.** Nothing chain / 3-axis re-audit / V115 runs in Phase 124 (Phase-125 firewall).

### Claude's Discretion
None material — all four areas were adjudicated to locked decisions. Implementation-mechanism details (exact PS/JS of the preprocessing regex, the generator script structure, the fixture reformat) are the executor's to write within the D-01…D-22 constraints.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` — PIPE-03 (line ~33), PIPE-04 (line ~34), PIPE-05 (line ~35); Discuss-Phase Flags §4/§5/§6 (lines ~56-58); out-of-scope (line ~76). **Line ~35 to be corrected per D-17.**
- `.planning/ROADMAP.md` — Phase 124 (line ~178), Success Criteria 1-4; **SC4 (line ~188) to be reworded per D-18.** Phase 125 dependency (line ~192+).
- `.planning/PROJECT.md` — v1.16 scope, frozen-surface discipline, `V1.16-DESCRIPTIVE-FILENAME-PASS`, `PIPE-02-DRAFT-LABEL-PROBE`, `DEFER-119-C`.

### Pipeline surface
- `scripts/pipeline/convert.ps1` — the pinned pandoc 3.7.0.2 wrapper; line 74 is the single canonical invocation (PIPE-03 preprocessing inserts before it; stays flag-identical). Its `-OutputDocx` param is the PIPE-04 output-name hook.
- `scripts/pipeline/README.md` — SC1 "no other flags" contract (update to document the D-01/D-03 preprocessing step); SC3 test-vs-indexed-library rules (PIPE-05 uploads to the TEST library only).
- `scripts/pipeline/guard-docx.mjs` — the output guard used for the D-04 OQ4 custom-property + no-body-leak assertions.
- `scripts/pipeline/test-fixtures/draft-test-doc.md` — existing dual-leg fixture; reformat per D-14.

### Registry & standard
- `docs/_registry/RE-index.md` — 221 rows (`Doc ID | Path | Title | Doc Type | Status`); **`Title` column is the PIPE-04 source of truth (D-07).** Lives OUTSIDE the indexed library — never uploaded.
- `docs/_standards/EEE-SOP-standard.md` — §L284-296 codifies "Status: Draft is a label, not an index gate" (the PIPE-02 Q5 finding PIPE-05 re-confirms); the shipped single-line EEE header-block format.

### Prior context & precedent
- `.planning/phases/123-orphan-nav-hub-retrofit-navigation-last/123-CONTEXT.md` — the D-01 link-checker (`check-nav-hub-links.mjs`, `HUB_PATHS` hardcode ~line 28); fork-don't-refactor + fail-closed pipeline patterns.
- `.planning/milestones/v1.15-phases/113-*/` — `PIPE-02-{RUNBOOK,FINDINGS}.md` (commit `b8b7b6d`) + `113-04-PLAN.md`: the exact owner-run checkpoint precedent PIPE-05 mirrors, and the FINDINGS artifact that settled the D-17 inversion.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/pipeline/convert.ps1` — reused as-is for PIPE-04 (byte-unchanged, `-OutputDocx` consumes the map) and extended (pre-pandoc preprocessing block) for PIPE-03.
- `scripts/pipeline/guard-docx.mjs` — reused for the D-04 OQ4 regression assertions (custom-property promotion + no body leak).
- `scripts/pipeline/test-fixtures/draft-test-doc.md` — reused (reformatted) as the PIPE-05 fixture.
- v1.15 `PIPE-02-{RUNBOOK,FINDINGS}.md` layout — reused as the PIPE-05 evidence-file template.

### Established Patterns
- **Fail-closed guards** — every new gate (D-03 preprocessing assertion, D-08 collision resolver) returns non-zero / aborts on any unexpected state; never silently proceeds.
- **Fork/generate, don't hand-maintain** — PIPE-04's map is a *generated* build artifact keyed off the registry (D-09), mirroring the fork-don't-refactor discipline from Phases 116-123.
- **Sequential-on-main-tree** (`use_worktrees:false`) — the three plans run sequentially on the main tree; no worktree isolation.
- **Owner-checkpoint hold** — the PIPE-05 gate holds the Jira Story In Progress until owner confirms (jira-hook-vs-verification-race lesson); no auto-flip.

### Integration Points
- PIPE-03 preprocessing ↔ the ephemeral temp copy ↔ pandoc line-74 invocation (source `.md` never sees the rewrite).
- PIPE-04 generator ↔ `RE-index.md` `Title`/`Path` columns ↔ the committed `Doc ID | Path | Output Filename` map ↔ (deferred) batch driver → `convert.ps1 -OutputDocx`.
- PIPE-05 fixture ↔ `convert.ps1` + `guard-docx.mjs` (agent-runnable local legs) ↔ owner's live Copilot Studio session (the irreducible tenant-boundary leg).
- Phase 124 → Phase 125: an optional near-empty needle-spec of any validator drift caused by PIPE-04's registry-sync edit; `PIPE-05-FINDINGS.md` as a necessary input to HARN-07.

</code_context>

<specifics>
## Specific Ideas

- **The PIPE-03 defect is the `---`…`---` bracket, not "has a footer"** — 12 files fail (full closing-delimiter bracket), 14 pass (lone leading `---`). The surgical anchor `^\s*\*(Previous|Next step)\b` covers 100% of failures with 0 false positives corpus-wide (verified 277-file scan).
- **The D-17 inversion is a real defect in the requirement text** — `REQUIREMENTS.md:35` and the SC4 framing currently claim v1.15 tested "only the frontmatter leg." The opposite is true and codified in the EEE standard. Correct it during planning; do not let it mislead the Phase-125 close-gate author.
- **`802.1X` → `8021x`** under the D-05 sanitizer (the `.` is deleted). Does not affect uniqueness; noted so a later editor doesn't "fix" it and churn the map.
- **Longest title slug = 89 chars** (`macos-platform-sso-provisioning-walkthrough-...`) + `.docx` = 94 — well under the 255-char SharePoint filename limit.
- **PIPE-05 uploads to the TEST library only** (README §SC3) — never the production/indexed library.

</specifics>

<deferred>
## Deferred Ideas

- **PIPE-04 batch driver + actual `.docx` generation/upload** → deployment phase (v1.17+). Bulk upload is out of scope this milestone; only the convention + generator + map ship now (D-10).
- **True-source normalization of the nav-footer** (`* * *` written into the source `.md`) → post-freeze / v1.17 cleanup. The PIPE-03 fix leaves source `.md` pandoc-invalid for non-pipeline tools — an accepted cost of the v1.15 freeze (D-01 residual risk).
- **SharePoint content-approval** (if `Status: Draft` must GATE retrieval, not just label) → owner/ops deferral, pairs with PIPE-05 (per REQUIREMENTS.md future-requirements). PIPE-05 confirms label-only behavior; gating is separate.
- **Whole-class enrollment of `operations/`, `device-operations/`, `cross-platform/apple-business/`** → v1.17+ (56 unregistered `.md` files; excluded from PIPE-04 scope by D-11).

### Reviewed Todos (not folded)
None — `todo.match-phase 124` → 0 matches.

</deferred>

---

*Phase: 124-pipeline-fix-descriptive-filename-pass-draft-label-grounding*
*Context gathered: 2026-07-08*
