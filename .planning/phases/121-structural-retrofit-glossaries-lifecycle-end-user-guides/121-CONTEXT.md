# Phase 121: Structural Retrofit — Glossaries, Lifecycle & End-User Guides - Context

**Gathered:** 2026-07-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Retrofit three structural doc classes to the EEE SOP standard — EEE header block (rendered from frontmatter) + `## Summary`-first (D3-A) + normalized Platform label + `doc_id` enrollment — each green under the blocking **C17** harness check (`scripts/validation/c17-eee-contract.mjs`). Retrofit-only (reformat, not re-review); live docs → `Status: Approved`; `Last Reviewed` carries existing `last_verified` verbatim + a one-time "v1.16 EEE reformat — content not re-reviewed" Version-History row.

**In scope (this phase):**
- **RETRO-04 — glossaries (6 files):** `docs/_glossary.md`, `_glossary-android.md`, `_glossary-apple-business.md`, `_glossary-linux.md`, `_glossary-macos.md`, `_glossary-network.md` → `doc_type: Reference`.
- **RETRO-07 (partial) — the 13 Mermaid-FREE lifecycle files** of the 22-file canonical lifecycle class → `doc_type: Guide`.
- **RETRO-09 — end-user Guides RE-175, RE-176** (`docs/end-user-guides/android-work-profile-setup.md`, `linux-intune-portal-enrollment.md`) → `doc_type: Guide`; flip registry Pending→Approved.

**Explicitly deferred to Phase 122 (see D1):** the 9 Mermaid-BEARING lifecycle files (pre-enrolled here at `Status: Pending` with path-order IDs; Phase 122 flips them to Approved after Mermaid conversion). **RETRO-07 spans Phase 121 + 122** and closes only when all 22 lifecycle files are C17-green.

**Out of scope (belongs elsewhere):** any Mermaid diagram conversion (Phase 122); nav-hub retrofit (Phase 123); pandoc alias fix / descriptive-filename pass / Draft-label probe (Phase 124); frozen-surface pin + close (Phase 125); the `operations/`, `device-operations/`, and `cross-platform/apple-business/` directory classes (deferred to a future whole-class enrollment milestone, v1.17+ — see Deferred Ideas).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via `/adversarial-review` (Proponent → Adversary → Referee, three Opus agents per decision, grounded in the live repo — 12 agents total). Full reasoning in `121-DISCUSSION-LOG.md`.

### D1 — Mermaid-in-lifecycle collision (DOMINANT) → Option B, HIGH confidence
The roadmap premised RETRO-07/Phase-121 as "no Mermaid dependency" — **factually false: 9 of 22 lifecycle files carry top-level ` ```mermaid `.** Because enrolling a file (adding `doc_id`) makes C17 assertion #1 hard-fail on ` ```mermaid ` (Phase-120 D-02, byte-unchanged), those 9 cannot go C17-green in Phase 121 without Mermaid→text conversion — which is Phase 122's job.

- **D-01 (LOCKED):** Phase 121 retrofits **only the 13 Mermaid-free lifecycle files**; the **9 Mermaid-bearing files defer to Phase 122**, where the leaf-parity conversion discipline (STD-04 / RETRO-05/08) lives. RETRO-07 becomes a **spanning** requirement (121 + 122), kept under RETRO-07 — NOT folded into RETRO-08 (RETRO-08's enumerated scope stays clean: RE-128, RE-147, the 9 admin-setup carve-outs).
- **The 9 deferred files:** `docs/lifecycle/{00-overview,03-oobe,04-esp}.md`, `docs/lifecycle-apv2/02-deployment-flow.md`, `docs/ios-lifecycle/{01-ade-lifecycle,02-mdm-migration}.md`, `docs/macos-lifecycle/{00-ade-lifecycle,01-psso-provisioning-walkthrough,02-mdm-migration-psso}.md`.
- **Decisive rationale:** honors the milestone's own LOCKED `STRUCTURAL-SPLIT` axis ("split by Mermaid dependency, not document-class similarity"); isolates the highest silent-content-loss risk (Phase-120 D-04: C17 has NO diagram parser, so green C17 ≠ faithful conversion — leaf-completeness is a human obligation) in the phase built for it; keeps Phase 121 a zero-content-loss reformat. The Proponent's competing "convert all 9 in-phase" case rested on a **false premise** (that Phase 122 was already complete — it is Not started; the ROADMAP L44 `[x]` was a data-entry bug, now fixed).
- **Roadmap edits applied this session** (user-authorized): ROADMAP L44 checkbox fixed; Phase 121 goal/SC2 + Phase 122 goal/SC5 re-scoped; REQUIREMENTS RETRO-07 text + traceability (`Phase 121 + 122`); STATE Current-Position + dependency block + STRUCTURAL-SPLIT note corrected; EEE-SOP-standard D-04 stale "in v1.16" promise corrected to v1.17+.

### D2 — Lifecycle scope boundary → 22 files, HIGH confidence
- **D-02 (LOCKED):** RETRO-07 scope = **the 22 files in the 6 canonical device/enrollment-lifecycle directories ONLY** — `docs/lifecycle/` (6), `docs/lifecycle-apv2/` (4), `docs/android-lifecycle/` (4), `docs/ios-lifecycle/` (3), `docs/macos-lifecycle/` (3), `docs/linux-lifecycle/` (2). **Directory-enumerated, NOT glob-matched** (the `*-lifecycle/*` glob is imprecise both ways — it misses `lifecycle/`/`lifecycle-apv2/` and spuriously matches `operations/app-lifecycle/`).
- **Excluded (8 files), by D-08 directory precedence** — each belongs to a separately-enumerated deferred class (per EEE-SOP-standard D-04), NOT enrolled in v1.16: `docs/operations/app-lifecycle/*` (5) + `docs/operations/patch-management/03-ios-update-lifecycle.md` (1) → the `operations/` class; `docs/cross-platform/apple-business/{09-shared-ipad-lifecycle,10-apple-tv-lifecycle}.md` (2) → the `apple-business/` class. A `-lifecycle` filename inside a non-lifecycle class directory does NOT confer lifecycle-class membership (same rule that resolves `decision-trees/05-device-lifecycle.md` → Reference/Phase 122).
- Of these 22, **13 retrofit here** and **9 defer to Phase 122** per D1.

### D3 — Glossary term-surface & anchor-slug preservation → Option A (strict D3-A, net-new Summary), confirmed
- **D-03 (LOCKED):** Apply the standard D3-A layout: frontmatter (4 new keys `doc_id`/`status`/`owner`/`doc_type` prepended; existing `platform`/`last_verified`/`review_by`/`applies_to`/`audience` kept) → EEE header block (immediately after frontmatter, **before H1**) → `# Title` → **net-new ≥30-word scope `## Summary`** (first H2) → existing "coverage" blockquote(s) relocated to gate position **below** Summary (split to ≤200 chars each per C17 #12) → `## Alphabetical Index` → term sections (unchanged below the index).
- **Summary sourcing = NET-NEW scope prose, NOT the repurposed coverage blockquote.** This matches the shipped Phase-118 `retrofit-reference.mjs` precedent (174 C17-green files: net-new Summary coexisting with a byte-identically-relocated see-also block). Repurposing the coverage blockquote would poison the lead retrieval chunk with see-also navigation links and require MORE editorial mutation.
- **Anchor-slug safety (proven):** every insertion is above the first term heading and adds no term heading → all term slugs (`#apv1`, `#esp`, …) invariant; the `## Alphabetical Index` links stay live; no `#summary` collision (no glossary has a "Summary" heading). Plain-GitHub slugs preserved; NO `{#id}` overrides (project convention — `docs/_glossary-macos.md` already ships the canonical `### Kandji-Iru`).
- **Correction to the layout rationale:** placement of the coverage blockquote below Summary is a **precedent + grounding** choice, NOT a C17 forcing function — C17 #4 only checks Summary-is-first-H2 and scans H3 between block and Summary; it does NOT forbid a blockquote there. (Recorded so the planner doesn't over-constrain.)
- **⚠ Executor hazard:** `docs/_glossary-network.md` uses `## Change History` (the other 5 use `## Version History`). The retrofit must reconcile this (rename to `## Version History`, or point the VH-row helper at it) or it will spawn a duplicate section. Not a C17 violation, but a real defect if missed.

### D4 — Doc-ID enrollment & registry sync → Option A + mandatory refinement, confirmed
- **D-04 (LOCKED):** **Sequential append** from the current max (RE-178) → RE-179+, class-then-path order (glossaries first as Reference: `_glossary-android`, `-apple-business`, `-linux`, `-macos`, `-network`, then bare `_glossary.md` last → RE-179…184; lifecycle block next → RE-185…206). No reserved blocks (nothing enforces numbering; citations are path-driven, not ID-driven; registry is excluded from the indexed library). `RE-` is a literal prefix, 3-digit zero-padded.
- **D-05 (mechanism, LOCKED):** Registry rows are **hand-authored FIRST**, then the pipeline injects `doc_id` by reading `RE-index.md` joined on Path (`buildDocIdMap()`); the pipeline **fails closed** (`DOC-ID-UNRESOLVED`) if a target path is absent from the registry, and **does NOT edit `RE-index.md`**. The registry `Doc Type` column is hand-maintained and NOT C17-cross-checked (Phase-120 D-06) — so it must be authored correctly by hand (Reference for glossaries, Guide for lifecycle + end-user guides).
- **D-06 (MANDATORY refinement — the D1 interaction):** **Pre-author ALL 22 lifecycle registry rows now (RE-185…206) in path order** — the 13 retrofitted here → `Approved` (after injection), the **9 deferred → `Status: Pending`** — mirroring the existing **RE-147** (`ca-enrollment-timing.md`) mermaid-deferred-Pending precedent (sits Pending in its natural path slot). This preserves zero-gap, path-order IDs and lets Phase 122's `buildDocIdMap()` resolve the 9 paths (flip Pending→Approved) **without minting new IDs**. Assigning only the 13 here would fragment the lifecycle ID block into permanent, unvalidated path-order disorder (the 9 interleave with the 13 within directories).
- **D-07 (Status, LOCKED):** All retrofitted glossary + lifecycle + end-user-guide files are live → frontmatter `status: Approved`. RE-175/176 flip registry Pending→Approved — this requires **actually EEE-retrofitting those 2 files** (they currently have no `doc_id`/`status`/`owner`/`doc_type` frontmatter; registry-enrolled ≠ injected).
- **D-08 (fork mechanics, LOCKED):** Phase 121 needs a **new retrofit fork (or one parameterized by doc_type+owner)** — the existing `retrofit-guide.mjs`/`retrofit-reference.mjs` path-allowlists exclude `_glossary*` and the lifecycle/end-user-guide dirs. The fork spans **three directories / two doc_types** (glossary=Reference; lifecycle + end-user-guides=Guide). It **must change the Version-History row literal from `v1.15` to `v1.16`** (both existing forks hardcode "v1.15 EEE reformat"; D2/META-04 mandates v1.16) and carry the Phase-118 `detectVhColumnCount` CREATE-vs-PREPEND / 2-col-vs-3-col logic (never assume a Version History section exists).

### Claude's Discretion
- Exact prose of each net-new glossary `## Summary` (≥30 words, scope statement) is the author's discretion — D-03 fixes the layout and sourcing rule, not the sentences.
- Plan/wave decomposition within Phase 121 (e.g. glossaries + end-user guides + 13 lifecycle in waves) is the planner's call — sequential-on-main-tree per `use_worktrees:false`.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap (as edited this session)
- `.planning/ROADMAP.md` §"Phase 121" and §"Phase 122" — the 121↔122 RETRO-07 split; Phase 121 SC (4 criteria, SC2 now = 13 Mermaid-free files); Phase 122 SC5 (the 9 lifecycle remainder). L44 checkbox corrected.
- `.planning/REQUIREMENTS.md` — RETRO-04 (glossaries), RETRO-07 (now scope-annotated + spans 121+122), RETRO-09 (RE-175/176); traceability table (`RETRO-07 | Phase 121 + 122`); "Discuss-Phase Flags" section.
- `.planning/STATE.md` — v1.16 dependency summary (Phase 121 block corrected); STRUCTURAL-SPLIT note (2026-07-07 correction).

### The EEE standard + C17 contract (the enforcement surface)
- `docs/_standards/EEE-SOP-standard.md` (STD-001) — the EEE SOP standard. Relevant: "Visible Header Block Format" (~L69, block-before-H1); "Structure invariant" (~L103, `## Summary` = first H2, no blockquote/H2/H3 between H1 and Summary); Doc Type Taxonomy + D-07 rulings (glossary→Reference ~L144, lifecycle→Guide ~L154) + D-08 directory-precedence (~L166-184); D1 platform-normalization map (`all` → "All Platforms" ~L353); D-04 "Out of scope" (~L321, corrected to v1.17+ this session).
- `scripts/validation/c17-eee-contract.mjs` — the 13-assertion contract. #1 Mermaid hard-fail (~L206, `inCodeFence`-masked, byte-unchanged per Phase-120 D-02); #2 H1-after-block (~L216); #4a Summary-is-first-H2 + #4b no-H3-between (~L242); #5 Summary ≥30 words (~L257); #8 `doc_type` presence; #9 block==frontmatter equality; #10 platform in-map; #12 blockquote ≤200 chars (scans ALL blockquotes, ~L386); #13 VALID_STATUSES. NO doc_id-format / gap / dup / registry cross-check. `--self-test` + default corpus run both green (174 files, 0 violations) after this session's edits.

### Registry + pipeline (D4 mechanics)
- `docs/_registry/RE-index.md` — the doc-ID registry; contiguous RE-001…178, zero gaps; RE-147 = the mermaid-deferred-Pending precedent (natural path slot); RE-175/176 = end-user guides at Pending; Status-column semantics note (top-of-file).
- `scripts/pipeline/retrofit-guide.mjs`, `scripts/pipeline/retrofit-reference.mjs` — the doc_type forks (path-allowlist + `buildDocIdMap` join-on-Path + Guard-3 fail-closed + `NEW_ROW_2COL/3COL` detection + the `v1.15` literal to change → the Phase-121 fork template).

### Target files (this phase)
- 6 glossaries: `docs/_glossary.md`, `docs/_glossary-{android,apple-business,linux,macos,network}.md`.
- 13 Mermaid-free lifecycle files (of `docs/{lifecycle,lifecycle-apv2,android-lifecycle,ios-lifecycle,macos-lifecycle,linux-lifecycle}/`); 9 Mermaid-bearing deferred to Phase 122 (enumerated in D1).
- 2 end-user guides: `docs/end-user-guides/{android-work-profile-setup,linux-intune-portal-enrollment}.md`.
- `docs/reference/00-index.md` (RE-142) — shipped Phase-118 exemplar of net-new-Summary + relocated-blockquote layout (the D3 pattern to copy).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`retrofit-reference.mjs` / `retrofit-guide.mjs`** — fork-per-corpus template (path-allowlist + join-on-Path doc_id injection + span-relocation + VH-row insertion). Phase 121 forks these ("fork, don't refactor in place" convention, mirrors 116→117→118).
- **Phase-118 shipped output** (`docs/reference/00-index.md`) — the canonical net-new-Summary-above-relocated-blockquote layout; copy directly for glossaries.
- **RE-147 registry row** — the pattern for the 9 deferred lifecycle files: `Status: Pending` in natural path slot, flipped by a later phase without new IDs.

### Established Patterns
- **Enrollment gate:** a docs/ file is "enrolled" iff frontmatter has `doc_id`. Enrolling a Mermaid-bearing file trips C17 #1 — the entire basis for D1's deferral.
- **Reformat-only discipline:** relocated spans are byte-identical (word-set-diff / span-byte-equality proof, v1.15 Phases 117/118); the net-new Summary is the ONLY additive envelope element. Phase 121 touches no term body / no diagram.
- **Frozen predecessor surfaces:** v1.4–v1.15 harness surfaces stay byte-unchanged; C17 assertion #1 stays byte-unchanged (Phase-120 D-02).
- **Sequential-on-main-tree** (`use_worktrees:false`); navigation-last (RETRO-06/Phase-123 depends on both 121 and 122).

### Integration Points
- Hand-authored `RE-index.md` rows ↔ pipeline `buildDocIdMap()` (rows MUST precede pipeline run; fail-closed on missing path).
- The 9 Pending lifecycle rows authored here ↔ Phase 122's flip-to-Approved (no new IDs).
- Registry `Doc Type` column ↔ frontmatter `doc_type` (hand-kept consistent; NOT machine-checked — author carefully).

</code_context>

<specifics>
## Specific Ideas

- Glossary top-of-file must end up byte-for-byte matching the Phase-118 reference exemplar's *method* (net-new Summary + relocated coverage blockquote), not a one-off shape.
- The 9-file leaf-parity conversion (handed to Phase 122) must capture each diagram's decision-leaf/edge count BEFORE conversion and annotate "LOCKED — N leaves"; edge counts run high (e.g. `lifecycle-apv2/02-deployment-flow.md`, `lifecycle/03-oobe.md` ~16–17 edges; `macos-lifecycle/01-psso-provisioning-walkthrough.md` has a real decision node). This is Phase 122's obligation but is recorded here because Phase 121 pre-enrolls those files as Pending.
- Residual hazards for the planner: (R1) `_glossary-network.md` `## Change History` reconciliation; (R2) C17 #12 caps EVERY blockquote ≤200 chars — several in-body glossary blockquotes exceed it and need word-preserving splits; (R3) the fork's `v1.15`→`v1.16` VH-literal change.

</specifics>

<deferred>
## Deferred Ideas

- **The 9 Mermaid-bearing lifecycle files → Phase 122** (RETRO-07 remainder). Pre-enrolled here at `Status: Pending`; Phase 122 converts + flips to Approved. Not lost — tracked via the spanning RETRO-07.
- **Whole-class enrollment of `operations/` (~20), `device-operations/` (~5), `cross-platform/apple-business/` (~20) → future milestone (v1.17+).** Surfaced by D2: these are ~40+ fully-unenrolled docs (incl. the 8 "lifecycle-named" extras). NOT in v1.16 scope (owner-narrowed). Enroll by directory as complete classes, never cherry-picked by filename. The EEE-SOP-standard D-04 "in v1.16" promise was corrected to v1.17+ this session.
- **Optional C17 hardening — `VALID_DOC_TYPES` + registry↔frontmatter cross-check** (carried from Phase-120 deferred): would close the unenforced-vocabulary + silent-divergence gaps that make D4's careful hand-authoring necessary. A future HARN/STD lever.

### Reviewed Todos (not folded)
None — no pending todos matched this phase's scope.

</deferred>

---

*Phase: 121-structural-retrofit-glossaries-lifecycle-end-user-guides*
*Context gathered: 2026-07-07*
