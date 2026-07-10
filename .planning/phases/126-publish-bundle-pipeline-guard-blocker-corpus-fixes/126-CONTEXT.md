# Phase 126: Publish-Bundle Pipeline + Guard-Blocker Corpus Fixes - Context

**Gathered:** 2026-07-10
**Status:** Ready for planning

<domain>
## Phase Boundary

A deterministic batch orchestrator that converts **every** `docs/_registry/RE-index.md`
`Status: Approved` doc (221 today) to `.docx` via the pinned `scripts/pipeline/convert.ps1`
(pandoc 3.7.0.2 + Word reference doc + v1.16 PIPE-03 YAML-alias temp-copy fix), naming each
output from `scripts/pipeline/filename-map.md`, into a flat build directory; runs
`scripts/pipeline/guard-docx.mjs` on every converted `.docx` and **fails closed** (non-zero
exit, no zip) on any leak/stale-prop/heading defect; and on a clean pass emits a single
versioned `docs-library-v1.17.zip` (flat, descriptively-named, in-zip manifest, asserted
registry parity). The two known guard blockers (HYG-02 stale key, HYG-03 date placeholders)
are folded in so the Approved corpus guards clean end-to-end.

**Requirements:** PUB-01, PUB-02, PUB-03, PUB-04, HYG-02, HYG-03.

**NOT in this phase:** the automated milestone-close trigger mechanism (Phase 127, HOOK-01),
and the V116 pin + 15th Path-A lineage bump + terminal close (Phase 128, HARN-08/09/10).
No content authoring — tooling/pipeline only; the corpus is frozen except the 2 guard-motivated
HYG edits.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via `/adversarial-review` (Finder → Adversary → Referee,
Opus). The Adversary ran live verification; the empirical findings below are load-bearing.

### D1 — Zip artifact location + retention
- **D-01:** Emit the bundle to a **gitignored build dir** — `dist/docs-library-v1.17.zip`
  (or `.pipeline-output/`; both already covered by `.gitignore`). **Never commit the zip to git.**
- **D-02:** **Per-milestone versioned** filename (`docs-library-v1.17.zip`); do NOT overwrite a
  single "latest" file — preserves per-close provenance at near-zero cost.
- **Rationale:** `.docx` output is **provably non-deterministic** — pandoc stamps wall-clock into
  `docProps/core.xml`, so identical source → different bytes/sha256 every run. A committed zip would
  churn bytes every close and **break the HARN byte-unchanged invariant** Phase 128 depends on
  (cross-risk X3). Repo is local-first (5 commits incl. the entire v1.16 close are unpushed;
  the `v1.6` tag is missing) → a release-asset path couples to unreliable push/tag infra and
  misaligns with Phase 127, which mirrors the milestone-**close hook**, not a git-tag trigger.
- **Losers:** commit-to-git (byte churn vs frozen-surface invariant, binary bloat, violates the
  established `.pipeline-output/ = never committed` convention); GitHub release asset (push/tag
  dependency this local-first repo doesn't reliably satisfy).

### D2 — Manifest format + contents
- **D-03:** **CSV** manifest, bundled inside the zip. Columns = **{RE-ID, output `.docx` filename,
  frontmatter status, last_verified}**. **Exclude** the source `.md` path column and any sha256 column.
- **D-04:** Bundle a **static Markdown upload-instructions README** inside the zip (no per-run
  timestamps — must stay deterministic).
- **Rationale:** The SharePoint connector indexes `.docx` **only** (README.md §SC1), so a CSV/MD
  manifest is never indexed → no citation-poisoning. Keying the manifest on the **output filename**
  (per PUB-04) rather than source path is exactly what defuses the "manifest recreates the
  SC3-forbidden RE-index mapping" risk. sha256 is excluded because docx non-determinism makes any
  hash a **false** integrity signal that won't match a regenerated file.
- **Losers:** JSON/MD-as-data (verbose for inherently-tabular data, no indexing benefit);
  source-path column (reintroduces the SC3 §3 mapping); sha256 column (unstable by construction).

### D3 — Batch conversion performance + resilience
- **D-05:** **Always-full rebuild** — regenerate all 221 `.docx` every run; NO incremental/only-changed.
- **D-06:** **Sequential** conversion (bounded concurrency is an acceptable *later* optimization only
  if per-doc temp isolation + full failure collection are preserved).
- **D-07:** **Collect-all-failures, then fail closed** — convert into a staging dir, run
  `guard-docx.mjs` on **every** generated `.docx`, and promote/zip **only if all conversions AND all
  guards pass** (atomic promote). Any failure ⇒ **no** bundle + the complete failure list surfaced.
- **Rationale:** All three incremental-detection signals are broken here — mtime detection dies after
  the HARN-10 `git clone --no-hardlinks` (fresh mtimes), content-hash is unstable (non-deterministic
  docx), and any skipped docx is a stale, **un-re-guarded** artifact violating PUB-02/PUB-04. Always-full
  is the only mode guaranteeing every emitted docx was freshly generated **and** freshly guarded.
  "Fail-closed" is about the *outcome* (no bundle when any file fails), not about stopping at the first
  error — so collect-all gives the operator every failure in one pass. Sequential keeps failure
  attribution clean and the `.tmp` leak bounded/cleanable.
- **Losers:** incremental (stale docx → PUB-02/04 breach); fail-fast (hides later failures, N re-run
  round-trips); unbounded parallel (temp-file races, interleaved stderr obscures the culprit, no
  correctness gain).

### D4 — HYG-03 date-fill policy + publish-set boundary
- **D-08:** HYG-03 is scoped to the **9 named `DEFER-121-07-A` files only** (2 glossaries from Phase
  121-04 + 7 lifecycle from Phase 121-05), as an **idempotent verify / no-op**. ⚠ These files were
  **already filled in commit `9031056` (Phase 121)** — none currently contain literal `YYYY-MM-DD`.
  Treat HYG-03 as *verification that real dates are present*, not a rewrite. If (only if) a gap is
  found, backfill from that file's **`last_verified`** value (option c).
- **D-09:** **Do NOT** add a corpus-wide `YYYY-MM-DD` acceptance gate. ⚠ A naive "no `YYYY-MM-DD`
  in the Approved corpus" grep would **corrupt 4 other Approved docs** where the literal is legitimate
  content: `docs/l2-runbooks/01-log-collection.md` + `docs/l2-runbooks/06-apv2-log-collection.md`
  (log-filename format specs `YYYY-MM-DD_SerialNumber_*`) and
  `docs/admin-setup-android/03-fully-managed-cobo.md` + `docs/admin-setup-android/08-cope-full-admin.md`
  (verbatim Microsoft date-format quotes). Phase 122 already had to hand-carve exactly these 4 out of
  a grep gate — must not repeat it. If any date check touches other files, carve out these 4 explicitly.
- **D-10:** `last_verified` is **untouched** by any HYG fill (v1.15 D2/META-04 — no freshness-clock
  reset). HYG-02/03 are reformat-only, no content change.
- **D-11:** Publish set = registry `Status: Approved` rows (221 today), confirmed. Unregistered `docs/`
  files (`_templates/*`, `_standards/*`, section indexes, cruft) are excluded **by construction**
  (registry-driven selection, never a `docs/**/*.md` glob). Draft/Pending are silently excluded and
  the pipeline **records the exclusion count** in the log/manifest so a partial bundle can't masquerade
  as complete.
- **D-12:** Add a cheap **divergence guard** now (no present breach, latent axis): fail the build if any
  registry-`Status: Approved` row is **frontmatter-`status: Draft`**. Today all registered docs are
  frontmatter-Approved; the only frontmatter-Draft files are unregistered `_templates/`. The registry
  `Status` column tracks the **EEE retrofit lifecycle**, which is distinct from the frontmatter
  `status ∈ {Draft, Approved, Superseded}` vocabulary — SC3 §2 says frontmatter-Draft docs must not
  reach the indexed library.

### Claude's Discretion
- Exact orchestrator language/shape (a `.mjs` batch driver invoking `convert.ps1` per doc, vs a `.ps1`
  orchestrator) — planner's call, provided the D-05/06/07 semantics hold and the pinned-pandoc version
  guard runs (at least once).
- Whether `SOURCE_DATE_EPOCH` is set to pin `docProps/core.xml` for reproducibility — a **nice-to-have
  determinism lever only**, NOT load-bearing (depends on controlled build env); nothing downstream may
  depend on docx bytes/hash regardless.
- Exact gitignored build-dir name (`dist/` vs `.pipeline-output/` subdir) — confirm the chosen path is
  covered by an existing `.gitignore` glob; don't rely on the top-level dir name alone.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Pipeline surface (the existing v1.15/v1.16 tooling this phase orchestrates)
- `scripts/pipeline/convert.ps1` — the pinned pandoc 3.7.0.2 single-file MD→.docx wrapper (version
  guard + reference-doc check + PIPE-03 YAML-alias temp-copy fix); `#Requires -Version 7.0`.
  ⚠ Known defect to fix: leaks a 0-byte `.tmp` (`GetTempFileName()`) per call → 221 orphans per full run.
- `scripts/pipeline/guard-docx.mjs` — the fail-closed guard. Three checks only: **YAML-LEAK**
  (no `---` in first ~500 chars of body), **HEADING-STYLE** (Heading1 pStyle present), **CUSTOM-PROPS**
  (lenient — property names within the known 9-key EEE set). ⚠ Does **not** check for `YYYY-MM-DD`.
- `scripts/pipeline/filename-map.md` — GENERATED (do not hand-edit) RE-ID → descriptive output `.docx`
  filename map (citation title = filename). Regenerate via `build-filename-map.mjs`.
- `scripts/pipeline/build-filename-map.mjs` — regenerates `filename-map.md` from the registry Title column.
- `scripts/pipeline/reference.docx` — the Word reference doc (the only tracked binary artifact).
- `scripts/pipeline/README.md` — pipeline conventions; **§SC1** (connector indexes `.docx` only),
  **§SC3** (the RE-index registry must NOT be uploaded/indexed — citation-poisoning hazard).

### Registry + selection source of truth
- `docs/_registry/RE-index.md` — the publish-set source of truth. Header note: the `Status` column
  tracks the **EEE retrofit lifecycle** (Approved = retrofitted + C17-green), distinct from frontmatter
  `status`. Publish set = `Status: Approved` rows.

### Requirements + roadmap
- `.planning/REQUIREMENTS.md` — v1.17 reqs PUB-01..04, HYG-02/03; the "Discuss-Phase Flags" section.
- `.planning/ROADMAP.md` — Phase 126 goal + 4 success criteria. ⚠ SC #3 as literally worded
  ("no literal `YYYY-MM-DD` remains in the Approved corpus") is a **corruption hazard** — see D-09;
  the acceptance test must be scoped to Version-History rows and carve out the 4 legit-content files.

### Corpus-fix targets
- `docs/_glossary-android.md:11` — HYG-02: stale `phase_46_wave2_retrofit` frontmatter key to remove
  (RE-179, closes DEFER-125-06-A; reformat-only, `last_verified` untouched).
- The 9 `DEFER-121-07-A` files (2 glossaries + 7 lifecycle) — HYG-03 verify-only target; already filled
  in commit `9031056` (Phase 121).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `convert.ps1` / `guard-docx.mjs` / `filename-map.md` / `build-filename-map.mjs` — the full
  single-doc pipeline already exists and is green; Phase 126 adds the **batch orchestrator + zip
  bundler + manifest + parity assertion** on top. No new conversion/guard logic — orchestration only.
- `.gitignore` already covers `.pipeline-output/`, `dist/`, `build/` — the D1 gitignored-output
  decision needs no `.gitignore` change beyond confirming the chosen path is matched.

### Established Patterns
- Registry-driven selection (never glob) — matches PUB-01 "excluded by construction".
- Fail-closed guard already returns non-zero on any check failure; the orchestrator composes this into
  a batch-level fail-closed (no zip on any failure).
- Sequential-on-main-tree execution (`.planning/config.json` `use_worktrees:false`) — durable constraint.

### Integration Points
- Orchestrator → `convert.ps1` (per doc) → staging dir → `guard-docx.mjs` (per docx) → atomic promote → zip.
- The zip + manifest are consumed by Phase 127's auto-trigger (which invokes this pipeline at close)
  and, downstream, by the owner's manual SharePoint bulk upload.

</code_context>

<specifics>
## Specific Ideas

- Deliverable name: `docs-library-v1.17.zip` (versioned per milestone).
- Manifest is CSV; a static MD upload-instructions README rides alongside inside the zip.
- Empirical fact to design around (verified live during review): pandoc writes a wall-clock
  `dcterms:created/modified` into `docProps/core.xml` → docx bytes/sha256 differ run-to-run for
  identical source. **Nothing downstream may key on docx bytes, hash, or mtime.**

</specifics>

<deferred>
## Deferred Ideas

- **Bounded-concurrency conversion** — a later performance optimization over the D-06 sequential
  default, allowed only if per-doc temp isolation + full failure collection are preserved.
- **`SOURCE_DATE_EPOCH` reproducible-docx pinning** — optional determinism lever; not adopted as
  load-bearing this phase.
- **Repair tag discipline / flush unpushed commits** — the `v1.6` tag is missing and 5 commits
  (incl. the v1.16 close) are unpushed. Only relevant if a release-asset delivery path is ever
  revisited (currently rejected in D-01). Not this phase.
- Automated milestone-close trigger mechanism → **Phase 127** (HOOK-01).
- V116 pin + 15th Path-A lineage bump + terminal close → **Phase 128** (HARN-08/09/10).

### Research / verify flags for the planner
- Confirm HYG-03's 9 named files still carry real (non-placeholder) dates at HEAD (expected: yes,
  filled in `9031056`) → HYG-03 is a verify-only no-op. If somehow not, backfill from `last_verified`.
- Confirm the exact live Approved count (221 expected; `grep -c Approved` gives 223 incl. 2 header-prose
  mentions) and that `filename-map.md` has a row for every Approved doc (registry parity precondition).

</deferred>

---

*Phase: 126-publish-bundle-pipeline-guard-blocker-corpus-fixes*
*Context gathered: 2026-07-10*
