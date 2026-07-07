# Phase 115: C17 Harness Check (Validator Atom) - Context

**Gathered:** 2026-07-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Author **C17** as ONE indivisible blocking validator atom that asserts the 13-assertion EEE
document contract (research SUMMARY.md §"C17 Lint Surface") against Markdown source, using the
needle-spec locked by Phase 114. Deliverables are fixed by ROADMAP Phase-115 SC1–SC4 and
requirement HARN-01:

1. C17 authored as one indivisible atom (all lint-surface assertions in a single atomic commit).
2. C17 blocks on the 13 assertions: required frontmatter keys (`doc_id`, `status`, `owner`,
   `doc_type`, `last_verified`); single-inline-paragraph block (not a table); Platform + Doc Type
   first; H1 present, descriptive (not bare `RE-NNN`), unique; `## Summary` is the first H2 with no
   intervening H2/H3 after the block; `platform` resolves in the D1 map (unmapped = FAIL, no
   fallback); `status ∈ {Draft, Approved, Superseded}`; no Mermaid fences; table >25 rows carries a
   prose summary within 5 lines; gate blockquote (if present) ≤200 chars; `## Summary` ≥30 words of
   prose; each visible block field matches its frontmatter value (Platform via D1 map).
3. C17 exits 0 on the Phase-115 representative set (see D-05 — SC3 redefinition) and on all
   `docs/_templates/*`.
4. Content phases 116–118 receive the C17 needle-spec ONLY — C17 is never re-opened or modified
   during content phases; it is the enforcing gate.

**NOT this phase:** any corpus retrofit (116–118); the frozen-surface re-baseline / 13th Path-A
lineage bump / `v1.15-milestone-audit.mjs` C1–C17 wiring / `check-phase-113..119.mjs` (all Phase
119); the C10 lenient-key precondition (already verified in Phase 114). New capabilities belong in
their own phases.

**Adjudication method:** All four gray areas were resolved via a three-agent adversarial review
(Finder → Adversary → Referee), each independently re-verifying every deciding fact against the
repo. The Adversary overturned the Finder's Area-2 pick (2D→2A) on two grounded rebuttals; the
Referee's calibrated package is 1A + 2A + 3C + 4A. User confirmed "Lock all + proceed" on
2026-07-04.
</domain>

<decisions>
## Implementation Decisions

### D-01 — Strictness / staging: fully blocking from the start, scope-limited (Area 1 → 1A)
- C17 ships **blocking** (exit ≠ 0 on any violation) from Phase 115; NOT informational-then-graduate.
- *Rationale:* ROADMAP requires a "live gate from the first retrofitted file" (`ROADMAP.md:111`),
  Phase 116 SC5 requires "C17 exits 0 on **every** L1/L2 runbook file before phase close"
  (`ROADMAP.md:134`), and Phase 116 depends on "C17 gate must be **live** before any retrofitted
  file is merged" (`ROADMAP.md:126`) — all require C17 to *block during* 116–118.
- *Rejected 1B (informational-then-graduate, v1.5 C9/C11/C13 precedent):* those graduated at their
  OWN milestone close with nothing downstream depending on their blocking behavior; C17 must block
  in the three phases *preceding* its close. A warn→block graduation would also be a disallowed
  second edit to the atom. *Rejected 1C (per-phase scope edits):* violates the "C17 never re-opened
  during content phases" atom constraint (`ROADMAP.md:119`).
- *Blocking-and-green-now is achievable only via D-02's scope mechanism.*

### D-02 — File-scope selection: opt-in by EEE-key presence, scoped to `docs/` (Area 2 → 2A)
- A file is subject to C17 **iff its frontmatter carries the new EEE keys** (e.g. `doc_id`),
  restricted to the `docs/` tree. Un-retrofitted docs are simply not-yet-enrolled; a retrofitted
  doc is gated the moment it gains keys. Templates enroll automatically (they carry all four keys —
  `docs/_templates/l1-template.md:23-27`), so SC3's `docs/_templates/*` clause is meaningfully
  exercised.
- *Rejected 2D (directory-class universe + key enrollment — the Finder's original pick):*
  `docs/_templates/` is NOT a D-03 named class, so a directory-class universe **excludes** templates
  → SC3's hard "C17 exits 0 on all `docs/_templates/*`" clause becomes vacuous. 2D's only real edge
  (catch a keyless *new* class member) needs per-file phase-state, obtainable only via per-phase
  edits (=1C, disqualified) or registry-status coupling (=2C, staleness/path-drift). *Rejected 2B
  (pure directory-class):* enrolls the ~150 un-retrofitted docs → C17 can't exit 0 at Phase 115 →
  breaks SC3 green-now. *Rejected 2C (registry-driven):* the RE-index has 179 rows nearly all
  `Pending` today; the plain form breaks green-now, and any Status-filtered form couples C17 to a
  hand-maintained external Markdown table that can silently desync from disk.
- **Mandatory mitigation (2A blind spot):** a brand-new in-scope doc authored *without* keys would
  silently escape. Closing this is NOT C17's job (it is immutable and phase-stateless). Each retrofit
  phase (116–118) must carry a **two-part SC**: (a) an enrollment-completeness precheck — *every*
  file in the named class carries the four EEE keys — then (b) C17 exits 0. Part (a) is authored
  per-phase (allowed) and is already implied by SC5's "on every … file". (Moot within v1.15 anyway:
  reshape-only, no new docs — `REQUIREMENTS.md:76`.)

### D-03 — Diagnostics surface: aggregate + machine summary + stdout AND stderr capture (Area 3 → 3C)
- C17 aggregates ALL failures grouped per-file → per-assertion and exits once at the end (NOT
  fail-fast); emits a machine-readable counts-by-assertion-# summary; and if it shells out to any
  child process it **captures and surfaces child stderr** — never discards it.
- *Rationale:* 116–118 iterate against this gate over ~150 files, so aggregate beats fail-fast (3B);
  the stderr-capture guard is the **CHAIN-WRAPPER-01** lesson (a wrapper that dropped stderr masked a
  real chain failure for ~2 weeks — v1.7 records). 3C is a strict superset of 3A at negligible cost.
- Matches the established runner pattern (aggregate + count + exit once) in
  `scripts/validation/v1.12-milestone-audit.mjs` and `scripts/pipeline/guard-docx.mjs`.

### D-04 — Integration & invocation: node-builtins-only standalone script (Area 4 → 4A)
- Author C17 as a **standalone** `scripts/validation/c17-*.mjs` (no `CHAIN_PHASES`), importing
  **node built-ins only** (`node:fs`/`node:path`/`node:process` — NO `_lib` dependency). Content
  phases 116–118 invoke it directly as a live gate. **Phase 119** folds the C17 assertion into
  `v1.15-milestone-audit.mjs` (C1–C17, Atom 1).
- *Rationale:* the guard-docx precedent is explicit — "Phase-119 seed … Keep it standalone now; the
  chain-fold is Phase 119's job" (`scripts/pipeline/guard-docx.mjs:10-11`). C17's fold target is the
  milestone-audit, and **every milestone-audit imports node built-ins only** (`v1.12`/`v1.14`
  `-milestone-audit.mjs:38-40`, zero `_lib` imports). Authoring C17 node-builtins-only pre-empts the
  exact problem that disqualifies 4B.
- *Rejected 4B (shared `_lib/c17-*.mjs` module the v1.15 audit imports):* breaks the milestone-audit
  node-builtins-only self-containment / freeze-reproducibility convention. *Rejected 4C (wire into
  `check-phase-115.mjs` now):* that file doesn't exist and is a Phase-119 Atom-2 deliverable
  (`ROADMAP.md:174`) — authoring it now collides with Phase 119; and check-phase-NN are
  phase-*continuity* validators, not content-contract checks (category error).

### D-05 — SC3 representative-set redefinition (grounding correction — MANDATORY at plan time)
- **Problem (both review agents confirmed):** ROADMAP SC3's "C17 exits 0 on the Phase-113
  representative set" is **unsatisfiable as written**. That set lives in
  `scripts/pipeline/test-fixtures/` (OUTSIDE `docs/`), carries none of the four EEE keys, and uses a
  deliberately different block (`.` separator, Doc-ID-first per its own README). A literal C17 scan
  would **FAIL** it on assertions #7 (block order), #8 (missing keys), and the `·` separator; under
  any `docs/`-scoped C17 the clause is otherwise vacuous.
- **Required planning action:** redefine SC3's representative-set clause as **in-`docs/` born-EEE
  conformant exemplars** (the templates already qualify) **+ a dedicated C17 fixture set under
  version control** that carries the four keys and the locked `·` block — at least one **passing**
  exemplar and at least one **intentionally-failing** exemplar (a C17 `--self-test`, analogous to
  guard-docx's clean/leaked fixtures).
- **Do NOT** retrofit `scripts/pipeline/test-fixtures/*` to the EEE block — they are Phase-113
  conversion fixtures with an intentionally distinct stub format, live outside C17's universe, and
  repurposing them would conflate two harnesses.

### Claude's Discretion (resolve at plan time)
- Exact filename of the standalone C17 script (`c17-eee-contract.mjs` or similar) and its CLI flag
  surface (e.g. `--self-test`, path args, `--json`); keep it node-builtins-only.
- Exact Markdown-parsing approach for the 13 assertions (regex vs. a lightweight hand-rolled
  frontmatter/heading/table scanner) — must handle the template HTML-comment preamble, placeholder
  tokens (`RE-[FILL-IN]`, `platform: all`), the `TEMPLATE-SENTINEL` date, and cosmetic `**bold**`
  block labels.
- The concrete `## Summary` word-count implementation (ROADMAP SC2 names ≥30 words — adopt that).
- Layout/wording of the machine-readable diagnostics summary.

### Authoring notes (do NOT reinvent — locked by Phase 114)
- **Assertion #7 is authored from `114-CONTEXT.md` D-05, NOT the stale SUMMARY.md wording.** Block
  field-set/order = `Platform · Doc Type · Doc ID · Status`; the operative check is "Platform + Doc
  Type are the first two fields." `owner` is **never** in the block (frontmatter-only, D-01 of
  Phase 114) — the block-field-match assertion #9 never evaluates owner.
- The D1 platform-normalization map + "no silent fallback" rule is authored in Phase 114's
  `docs/_standards/EEE-SOP-standard.md`; C17 consumes it (must resolve `all` → its D1 label for the
  block↔frontmatter match).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The C17 needle-spec (read FIRST)
- `.planning/research/SUMMARY.md` §"C17 Lint Surface" (lines 190-208) — the 13 machine-checkable
  assertions with sources. NOTE: assertion #7's wording is superseded by 114-CONTEXT D-05 (below).
- `.planning/phases/114-eee-standard-templates-doc-id-registry-metadata-rules/114-CONTEXT.md` —
  the locked needle-spec inputs: D-01 (owner frontmatter-only, absent from block), D-05 (block
  field-set/order `Platform · Doc Type · Doc ID · Status`, `·` separator), D-09 (D1 map + no-fallback
  enumerated variants). These OVERRIDE the research where they differ.
- `docs/_standards/EEE-SOP-standard.md` (authored Phase 114) — the authoritative D1 map, Doc Type
  taxonomy {Runbook, Guide, RCA, Reference}, status set {Draft, Approved, Superseded}, table-row-cap
  rule, and grounding-notes. C17 must assert against THIS spec.

### Phase scope + requirements
- `.planning/ROADMAP.md` §"Phase 115" (SC1–SC4, lines 109-121) — the deliverable + assertion list;
  §"Phase 116" (SC5, the live-gate dependency); §"Phase 119" (Atom 1 = `v1.15-milestone-audit.mjs`
  C1–C17 fold target; Atom 2 = `check-phase-113..119.mjs`).
- `.planning/REQUIREMENTS.md` — HARN-01 (L45, blocking indivisible atom); Discuss-Phase Flag #2
  (L57, strictness/staging — resolved here as D-01).
- `.planning/STATE.md` — Phase-115 Pending Todo ("confirm the full C17 needle-spec is complete
  before authoring; review the strictness/staging flag").

### Existing harness patterns to mirror
- `scripts/validation/v1.12-milestone-audit.mjs` (and `v1.14-`) — the C-check structure, aggregate
  runner (count/exit-once ~lines 953-979), **node-builtins-only imports** (lines 38-40), and the
  C9/C11/C13 informational→graduated markers (the 1B precedent that was rejected).
- `scripts/pipeline/guard-docx.mjs` (lines 10-11) — the standalone-now / Phase-119-fold precedent
  and the `--self-test` clean/leaked-fixture pattern D-05 mirrors.
- `scripts/validation/_lib/frozen-at-close.mjs` — the freeze invariant C17 must NOT entangle with
  (do not import it into the standalone C17; Phase 119 owns the audit fold).

### Registry & fixtures (scope grounding)
- `docs/_registry/RE-index.md` — 179 RE-NNN rows, nearly all `Status: Pending` today (why 2B/2C
  break green-now).
- `scripts/pipeline/test-fixtures/` — the Phase-113 rep set that D-05 rules OUT of the C17 universe
  (outside `docs/`, non-conformant stub block); do not retrofit.
- `docs/_templates/*.md` — the born-conformant files 2A enrolls; the SC3 template clause target.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/validation/v1.12-milestone-audit.mjs` / `v1.14-milestone-audit.mjs` — the C-check idiom,
  aggregate-and-count runner, and node-builtins-only import discipline C17 copies.
- `scripts/pipeline/guard-docx.mjs` — a standalone node-builtins validator with `--self-test`
  fixtures; the closest structural analog for the standalone C17 (D-04) and its self-test set (D-05).
- `docs/_standards/EEE-SOP-standard.md` + `docs/_templates/*` — the spec + conformant inputs C17
  asserts against (Phase-114 output).

### Established Patterns
- **Validator-atom deferral:** C17 = one indivisible atom authored here; content phases 116–118 get
  a needle-spec only and never re-open it (per v1.13 pattern; ROADMAP SC4).
- **Standalone-then-fold:** author node-builtins-only standalone now; Phase 119 folds the assertion
  into `v1.15-milestone-audit.mjs` (guard-docx precedent).
- **Milestone-audits are self-contained** (node built-ins only) — the reason C17 must not depend on
  `_lib` (D-04).
- **Frozen invariant:** `v1.14-milestone-audit.mjs` and predecessors are byte-frozen — C17 cannot be
  added to them; `v1.15-milestone-audit.mjs` does not exist until Phase 119.

### Integration Points
- **Greenfield:** no `c17-*.mjs` exists yet; `check-phase-113/114/115.mjs` do NOT exist (highest is
  `check-phase-112.mjs`) — all are Phase-119 deliverables.
- **Content-phase invocation:** 116–118 call the standalone C17 directly as their merge gate; the
  standalone script IS the live gate between authoring here and the Phase-119 audit fold.

</code_context>

<specifics>
## Specific Ideas

- The single load-bearing fact: C17 asserts the **visible body-text header block** (retrieval layer)
  as a pure function of frontmatter (harness layer). Frontmatter is invisible to the index (OQ4);
  the block is retrieval-necessary — which is *why* the block↔frontmatter match (assertion #9) and
  the exact block order (assertion #7, per 114-CONTEXT D-05) matter.
- C17 must pass the templates **as authored** — strip the HTML-comment preamble, tolerate placeholder
  tokens, resolve `platform: all` via the D1 map, and normalize cosmetic `**bold**` labels when
  parsing block fields. Plan-time acceptance must run C17 against every `docs/_templates/*` and prove
  exit 0.
- Ship a C17 `--self-test` with a passing exemplar and at least one intentionally-failing exemplar
  (D-05), so the gate's own correctness is regression-guarded independent of the corpus.

</specifics>

<deferred>
## Deferred Ideas

- **Phase 119 — audit fold + lineage bump:** wiring C17 into `v1.15-milestone-audit.mjs` (C1–C17),
  `check-phase-113..119.mjs`, BASELINE_19, V114 pin, 12th CI workflow, frozen-surface re-baseline.
  Explicitly NOT this phase (D-04).
- **Post-v1.15 gate-hole:** the 2A keyless-new-doc blind spot (D-02) beyond v1.15's reshape-only
  window — if future milestones add net-new docs, revisit whether a directory-class enrollment-
  completeness check belongs in the standing harness (not C17 itself).
- **v1.16 — 45 orphan docs + structural classes** (glossaries, decision-trees, nav-hubs, lifecycle)
  brought under EEE + C17; carried from Phase 114 D-04.

None of the above are scope creep into Phase 115 — they are downstream/parallel and preserved so
they are not lost.

</deferred>

---

*Phase: 115-c17-harness-check-validator-atom*
*Context gathered: 2026-07-04*
