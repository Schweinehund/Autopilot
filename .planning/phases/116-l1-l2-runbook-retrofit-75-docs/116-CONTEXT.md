# Phase 116: L1/L2 Runbook Retrofit (~75 docs) - Context

**Gathered:** 2026-07-04
**Status:** Ready for planning

<domain>
## Phase Boundary

Retrofit **all 75 L1/L2 runbook files** (registry IDs `RE-001`…`RE-075`) to the EEE standard so
**C17 exits 0 on every file** before phase close. This is a **pure reformat** — content is NOT
re-reviewed: `last_verified` is carried verbatim into `Last Reviewed` and a
`v1.15 EEE reformat — content not re-reviewed` Version-History row is added (D2-A). Deliverables
are fixed by ROADMAP Phase-116 SC1–SC5 and requirement RETRO-01.

**The corpus (verified):**
- `docs/l1-runbooks/` — `00-index.md` + `01`…`41` = **42 files** (`RE-001`…`RE-042`)
- `docs/l2-runbooks/` — `00-index.md` + `01`…`33` = **33 files** (`RE-043`…`RE-075`)
- Total = **75 files**, all `doc_type: Runbook` in the registry. **Both `00-index.md` files are
  IN scope** (D-06 below).

**Per-file target shape** (from `docs/_templates/l1-template.md` / `l2-template.md`):
frontmatter gains `doc_id` (from registry), `status: Approved`, `owner` (per-tier role),
`doc_type: Runbook`, normalized `platform` (D1 map); **old keys `review_by`/`applies_to`/`audience`
are RETAINED**; insert the single-line EEE block `**Platform:** X · **Doc Type:** Runbook ·
**Doc ID:** RE-NNN · **Status:** Approved` (`·` separator, Platform+DocType first, bold labels
cosmetic); add `## Summary` as the first H2 opening with a scope/safety banner; **relocate** the
existing pre-H1 gate blockquote to AFTER `## Summary` (it is the D3-A gate-blockquote); add the
Version-History row. Then C17 must exit 0.

**NOT this phase:** admin-setup guide retrofit (Phase 117 / RETRO-02); reference-doc retrofit +
table remediation (Phase 118 / RETRO-03); the frozen-surface re-baseline / 13th Path-A lineage bump
/ close (Phase 119); any edit to C17 itself (immutable gate — Phase 115 D-04); the 45 orphan docs
and structural nav-hub/glossary classes (v1.16 — Phase 114 D-04). **No new documentation content**
(REQUIREMENTS.md:76). New capabilities belong in their own phases.

**Adjudication method:** All four gray areas were resolved via a three-agent adversarial review
(Finder → Adversary → Referee, all Opus), each independently re-verifying every deciding fact
against the repo. The Adversary overturned 0 of the Finder's picks (1A/2A/3C/4C all survived) and
surfaced one material grounding correction; the Referee re-ran C17 assertion #12's own char-count
logic across all 75 files to quantify it. User confirmed **"Lock all + proceed"** on 2026-07-04.
</domain>

<decisions>
## Implementation Decisions

### D-01 — Phase vs. plan granularity: ONE Phase 116 with batched plans (Area 1 → 1A)
- Deliver RETRO-01 as **one Phase 116** carved into multiple batched **plans** — NOT split into
  separate L1/L2 roadmap sub-phases.
- *Rationale:* `REQUIREMENTS.md:13` locks "each maps to exactly **one** roadmap phase"; RETRO-01
  (`REQUIREMENTS.md:39`) is a single requirement covering all 75 runbooks — a sub-phase split would
  fork RETRO-01 across two phases. Prior art is exactly this: Phase 113 = 4 plans, Phase 114 =
  4 plans, both in a single phase.
- *Rejected 1B (separate L1/L2 sub-phases):* breaks the 1-req-1-phase rule **and** forces a
  **HARN-03 renumber cascade** — `ROADMAP.md:176` hard-codes `check-phase-113..119.mjs`,
  `CHAIN_PHASES=[48..118]`, `CHAIN_SKIP=new Set([])`, and the SHA-pinned Phase-119 frozen-surface
  atom; inserting a sub-phase renumbers 117/118/119 and desyncs those continuity validators.
  Sub-phase isolation buys nothing: execution is sequential-on-main (no worktrees) and C17 enrolls
  **per-file by EEE-key presence** (`c17-eee-contract.mjs:519-533`), so any batch is independently
  mergeable/gateable. *Rejected 1C (one plan for 75):* no reviewable checkpoints; violates the
  max-thoroughness preference.

### D-02 — Batch grouping & size: tier-then-platform, ~6 plans (Area 2 → 2A)
- Batch **tier-outer, platform-inner**: all L1 first (batched by platform cluster), then all L2.
  Lean toward **~6 plans** (finer than the 4-plan prior-phase default) because of the D-05
  blockquote-reformat workload.
- *Rationale:* the corpus is **tier-partitioned** (all L1 in `l1-runbooks/`, all L2 in
  `l2-runbooks/`) and platform-clustered within each tier. Platform-homogeneous batches share one
  `platform:` value → one D1 label → one identical block Platform field, making C17 assertion #9
  (block↔frontmatter exact match, `c17-eee-contract.mjs:298-329`) easy to get right and review.
  Tier-outer keeps L1 and L2 as clean per-class enrollment-precheck units (Phase-115 D-02) and keeps
  the per-tier Summary banner (D-04) on one side of every batch boundary.
- **Batching-guidance correction (Referee):** "registry is tier-then-platform ordered" is *coarse*.
  Tier ordering is exact, but **platform is interleaved within each tier** (macOS appears at L1
  10–16 **and** 35–37; apple-business `34`; 802.1X 38–41). Batch on **actual filename number-range +
  platform cluster** — a batch boundary may fall mid-platform-cluster; do NOT assume clean
  contiguous platform blocks.
- *Rejected 2B (platform family across BOTH tiers):* merges L1's read-only banner and L2's
  escalation banner into one plan, crossing the D-04 per-tier boundary and the per-class D-02
  precheck. *Rejected 2C (fixed registry-order batch):* a fixed cut straddles platform groups and
  the L1→L2 boundary at RE-042/043 → heterogeneous platform values per plan. *Rejected 2D (single
  batch):* no checkpoints; violates max-thoroughness.

### D-03 — Retrofit method: hybrid script + hand-author + C17-verify each (Area 3 → 3C)
- **Script the mechanical half:** `doc_id` (join on path against `RE-index.md`), `status: Approved`,
  `doc_type: Runbook` (uniform), the EEE block line, the Version-History row, and gate-blockquote
  relocation. **Hand-author the judgment half:** the ≥30-word `## Summary` prose, the scope/safety
  banner (D-04), the `owner` value, and every D-05 blockquote reformat. **Run C17 per file** to
  exit 0.
- *Rationale:* **no runbook has a `## Summary` today** (grep `^## Summary` = 0 across both dirs), and
  C17 assertion #5 requires ≥30 words of real prose (`c17-eee-contract.mjs:262`) — a script would
  emit 75 hollow blurbs. The `owner` value is a role absent from the registry (no owner column), and
  the D-05 blockquote splits need per-file judgment. Per-file C17 verify **is** the design's own
  contract (live gate during 116–118, `ROADMAP.md:126`; Phase-115 D-02(b)).
- *Rejected 3A (fully scripted):* cannot author 75 distinct Summaries or accurate safety banners;
  would ship C17-red files where a long relocated blockquote fails #12. *Rejected 3B (hand-edit
  all):* the block↔frontmatter exact-match (#9) is unforgiving of hand-transcribing 75 `doc_id`s and
  D1 labels; the mechanical shape is identical across files and belongs in a script.

### D-04 — Summary banner + owner: per-tier default, tailor where not read-only (Area 4 → 4C)
- **Banner:** a standardized per-tier scope/safety banner as the default lead sentence of every
  `## Summary` (L1 = read-only-scope; L2 = escalation/change-control guardrail), **tailored where a
  runbook is demonstrably NOT pure read-only**.
- **Owner (exact strings — Referee ruling):** L1 files → `owner: L1 Team Lead`; L2 files →
  `owner: L2 Desktop Lead` (from `l1-template.md:20` / `l2-template.md:21` reviewer roles; the
  template's own `owner:` field is `[FILL-IN]`, and owner+reviewer are conflated by the
  owner-promotes-to-Approved rule).
- *Rationale:* a canned L1 "read-only diagnostic steps only — no registry edits, no PowerShell, no
  destructive actions" banner (`l1-template.md:40`) is **factually false** for state-changing
  runbooks — verified end-to-end: `37-macos-local-password-reset.md` performs three state-changing
  password-reset paths (escrowed-FileVault-key reset, LAPS-admin reset, Apple-ID reset — all destroy
  the Secure-Enclave key binding), and `34-apple-business-shared-ipad-passcode-reset.md` already
  carries a hand-tailored L1 scope note distinguishing read-only triage from `MDM ClearPasscode` /
  `EraseDevice`. Because SC2 pushes the banner into the **lead retrieval chunk** (`ROADMAP.md:133`)
  and Copilot recites body-text lead content (PIPE-02/OQ4), a false "read-only" claim would be
  surfaced verbatim in AI answers — actively harmful, not merely imperfect.
- *Rejected 4A (pure canned per-tier banner):* false for `37`/`34`, contradictory with `34`'s
  existing note. *Rejected 4B (per-platform owner + fully bespoke banner):* `owner` is
  frontmatter-only and never rendered in the block (Phase-114 D-01), so per-platform owner
  granularity buys zero citation value; fully bespoke Summaries beyond the safety line exceed the
  reformat-only envelope.

### D-05 — C17 assertion-#12 blockquote compliance (GROUNDING CORRECTION — MANDATORY at plan time)
- **The problem (Referee-measured against all 75 files):** C17 assertion #12
  (`c17-eee-contract.mjs:387-405`) caps **every top-level blockquote group** at ≤200 chars — NOT
  just the gate blockquote (the "gate blockquote" header comment is misleading; the implementation
  scans all `^>` runs). **56 of 75 files (~75%) carry ≥1 over-limit blockquote; 183 over-limit
  blockquotes total**, gate blockquotes included (Linux gates ~389–401c, apple-business `34` gate
  399c, macOS-MDM-migration 386c; worst offenders 720–929c). C17 is LOCKED (Phase-115 SC4) — Phase
  116 cannot fix the validator; it must comply.
- **The collision:** passing #12 requires bringing over-limit blockquotes ≤200c, but
  **trimming/rewording is a content edit** forbidden by the reformat-only envelope
  (`REQUIREMENTS.md:75-76`; D2-A).
- **MANDATORY plan policy (word-preserving):** resolve every over-limit top-level blockquote by
  **structural reformat ONLY** — split at sentence/clause boundaries into consecutive
  **blank-line-separated** blockquotes (a truly empty line splits; an empty `>` line does NOT), or
  convert a non-gate callout to a **bold-led normal paragraph** (removing it from #12's universe).
  Both preserve **every word**. **Deleting or rewording to fit 200 chars is FORBIDDEN.** If a single
  atomic sentence exceeds 200c and cannot be split without a word change (rare — verify by re-running
  the #12 measurement), **escalate that specific blockquote to the content owner**, do not silently
  trim.
- **Structural nuances (Referee-verified):**
  - **Blockquotes nested in list items (`N. >`, `- >`) are invisible to #12** — the line begins with
    the list marker so `/^>/` never matches. L1/`01`'s "Say to the user" scripts (`9. >`, `6. >`)
    need **no** remediation (this corrects an Adversary example).
  - **The GATE blockquote itself exceeds 200c in a large subset** — reconcile with SC3's singular
    "gate-blockquote" phrasing by allowing the gate to render as **split blockquotes / a
    de-blockquoted nav line** after relocation.
  - TEMPLATE-SENTINEL files (`last_verified: 1970-01-01`) and code-fenced lines are exempt from #12
    (not relevant to live runbooks, but confirms the corpus is fully gated).
- **Completion check:** re-run the #12 char-count measurement after reformatting as the objective
  proof that the file will pass, alongside the per-file C17 exit-0.

### D-06 — `00-index.md` scope: IN scope, retrofitted and enrolled (user-confirmed 2026-07-04)
- Both `docs/l1-runbooks/00-index.md` (`RE-001`) and `docs/l2-runbooks/00-index.md` (`RE-043`) are
  **IN scope** — retrofitted to EEE and enrolled so C17 scans them.
- *Rationale:* the "75" count includes them, they live **inside the named Phase-1 class
  directories**, and Phase-114 D-08 already assigned them `RE-001`/`RE-043` with `doc_type: Runbook`.
  The Phase-114 D-04 "nav-hubs deferred to v1.16" ruling covered *orphan* nav-hub docs elsewhere
  (`operations/`, standalone hubs), NOT the runbook-class indexes. Excluding them would contradict
  the registry.
- *Consequence:* the index files' navigation tables and blockquotes are subject to C17 — the L2
  index alone has ~10 over-limit blockquotes (folds into the D-05 workload). Their `doc_type`
  remains `Runbook` per the locked registry (do not relitigate).

### Claude's Discretion (resolve at plan time)
- Exact plan count and the precise file-to-plan assignment within the D-02 tier-then-platform scheme
  (target ~6 plans; keep each batch platform-homogeneous where the filename ranges allow).
- Exact shape/name of the mechanical retrofit helper (D-03) — a node-builtins script mirroring the
  repo's `scripts/pipeline/` idiom, or an in-plan transform recipe; must join `doc_id` from
  `RE-index.md` by path and never hand-transcribe IDs.
- The exact canned per-tier banner wording (L1 read-only-scope; L2 escalation/change-control), and
  the per-runbook tailored wording for the enumerated non-read-only files.
- The exact `## Summary` prose per runbook (≥30 words, scope/safety banner as the lead sentence) —
  reformat-only: summarize existing content, do not add new technical claims.

### Authoring notes (locked upstream — do NOT reinvent)
- **Platform inference for keyless files:** Windows classic/APv2 runbooks (L1 `01`–`09`, L2
  `01`–`08`) have **no `platform:` frontmatter key** and the registry has **no platform column** →
  the retrofit MUST inject `platform: Windows` (confirm the exact keyless set by grep at plan time)
  or C17 assertion #10 hard-fails (`c17-eee-contract.mjs:331-339`, absent/unmapped = FAIL, no
  fallback). Files that already carry a `platform:` key carry it verbatim (normalized via D1).
- **Gate relocation keys on structural position, not the string:** gates use two literal variants —
  "Version gate" (10/42 L1, the Windows files) and "Platform gate" (32/42 L1, all 33 L2). Relocate
  the **pre-H1 first blockquote**; never match on the literal string; never touch secondary/inline
  blockquotes.
- Block field-set/order = `Platform · Doc Type · Doc ID · Status`; Platform+DocType first; `·`
  separator; `owner` NEVER in the block (Phase-114 D-01/D-05). `Status: Approved` for live runbooks
  (RETRO-01). `Last Reviewed` = existing `last_verified` verbatim + the
  `v1.15 EEE reformat — content not re-reviewed` Version-History row (D2-A / SC4).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The retrofit target spec (read FIRST)
- `docs/_standards/EEE-SOP-standard.md` — the authoritative D1 platform-normalization map (unmapped
  = hard failure, no fallback), the single-line header-block format, Doc Type taxonomy
  {Runbook, Guide, RCA, Reference}, status set {Draft, Approved, Superseded}, D2 `Last Reviewed` =
  `last_verified` verbatim, and the `v1.15 EEE reformat — content not re-reviewed` Version-History
  row rule. The retrofit conforms to THIS.
- `docs/_templates/l1-template.md` / `docs/_templates/l2-template.md` — the exact target shape:
  frontmatter key set (new EEE keys + retained old keys), the EEE block line, `## Summary`-first,
  gate-blockquote AFTER Summary, the canned banner wording (L1:40), and the reviewer/owner roles
  (l1:20 `L1 Team Lead`, l2:21 `L2 Desktop Lead`).
- `docs/_registry/RE-index.md` — `RE-001`…`RE-075` rows mapping `RE-NNN → path + title + doc_type +
  status`; the authoritative `doc_id` source (join by path; NO platform column). Note the registry's
  own `Status` column tracks the retrofit lifecycle (Pending→Approved), distinct from frontmatter
  `status`.

### The enforcing gate (the phase's live merge gate)
- `scripts/validation/c17-eee-contract.mjs` — the immutable C17 validator. Assertions the retrofit
  must satisfy: **#5** `## Summary` ≥30 words (line 262); **#9** block↔frontmatter exact match
  (298-329); **#10** platform resolves in D1 map, no fallback (331-339); **#12** every top-level
  blockquote ≤200 chars (387-405, the D-05 crux); the enrollment scan (opt-in by EEE-key presence,
  519-533). Invoke it per file; ship green.
- `scripts/validation/c17-fixtures/` — the `--self-test` passing/failing exemplars (do not modify;
  reference for expected-shape).

### Phase scope + requirements + locked upstream decisions
- `.planning/ROADMAP.md` §"Phase 116" (SC1–SC5, lines 125-138) — the deliverable + the SC5
  discuss-flag resolved here; §"Phase 119" (lines 168-181, the HARN-03 `check-phase-NN` chain that
  D-01 protects).
- `.planning/REQUIREMENTS.md` — RETRO-01 (L39), the 1-req-1-phase rule (L13), the reformat-only /
  no-new-content envelope (L75-76), and Discuss-Phase Flag #3 (L52-58, retrofit granularity —
  resolved here as D-01/D-02).
- `.planning/phases/114-eee-standard-templates-doc-id-registry-metadata-rules/114-CONTEXT.md` —
  D-01 (owner frontmatter-only, absent from block), D-03 (positive-named Phase-1 scope: L1/L2
  runbooks = 75), D-04 (45 orphan docs + nav-hubs deferred to v1.16 — the boundary D-06 rules on),
  D-05 (block field-set/order `·` separator), D-08 (flat registry, index files enrolled),
  D-09 (D1 map variants).
- `.planning/phases/115-c17-harness-check-validator-atom/115-CONTEXT.md` — D-02 (C17 opt-in by
  key presence + the mandatory two-part per-phase SC: enrollment-completeness precheck THEN C17
  exit 0), D-04 (C17 immutable during content phases), D-05 (the representative-set / self-test
  pattern this phase's grounding correction mirrors).

### Empirical grounding (why the banner and block placement matter)
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md`
  — OQ4 (frontmatter → invisible custom properties; body-text block is retrieval-necessary), the Q2
  proof that the single-line block indexes as body text, and the citation/recitation behavior that
  makes an inaccurate lead-chunk safety banner (D-04) harmful.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `docs/_templates/{l1,l2}-template.md` — the born-conformant target shape every retrofitted runbook
  is reshaped toward; copy the frontmatter key set, block line, `## Summary`-first order, and the
  gate-blockquote-after-Summary placement.
- `docs/_registry/RE-index.md` — the machine-readable `doc_id` source; the mechanical D-03 script
  joins on `Path` to emit the correct `RE-NNN` per file (why the registry is a table).
- `scripts/validation/c17-eee-contract.mjs` — the live gate; `--self-test` and per-file scan
  patterns; the D-05 #12 char-count logic to re-implement as the completion measurement.
- `scripts/pipeline/` idiom (node-builtins-only) — the shape any mechanical retrofit helper should
  mirror if the plan builds one.

### Established Patterns
- **Reshape-only envelope:** carry `last_verified` verbatim, add the fixed Version-History row, never
  re-verify technical content (REQUIREMENTS.md:75-76; D2-A). D-05 is the sharp edge of this rule.
- **Per-file C17 enrollment by key presence:** a runbook is gated the moment it gains the four EEE
  keys — so batches are independently mergeable/gateable (underpins D-01/D-02).
- **Two-part per-phase SC (Phase-115 D-02):** enrollment-completeness precheck (every file in the
  L1/L2 class carries all four EEE keys) THEN C17 exits 0 — author both as success criteria.
- **Multi-plan single phase:** 113 and 114 each ran 4 plans within one phase — the house pattern
  D-01 follows (this phase leans ~6).

### Integration Points
- **C17 is the merge gate** between authoring and the Phase-119 audit fold — every retrofitted file
  must pass it before phase close (SC5). C17 is immutable here.
- **Sequential-on-main execution** (project constraint: worktrees unreliable) — plans run one at a
  time on the main tree; no parallel-worktree isolation. Batch design (D-02) accounts for this.
- **Registry lifecycle:** retrofitting a file flips its `RE-index.md` Status Pending→Approved
  (registry lifecycle column, not frontmatter status) — update the registry as part of the phase.
</code_context>

<specifics>
## Specific Ideas

- The load-bearing surprise: **C17 #12 gates ALL top-level blockquotes, not just the gate** (D-05),
  and ~75% of the corpus violates it — most runbooks carry long "Say to the user" scripts and
  multi-clause gate/callout blockquotes. This is the single biggest hand-authoring workload in the
  phase and the reason 3C (not 3A) is mandatory. Resolve by **word-preserving structural splits**,
  never trims.
- The banner must be **accurate to the runbook**, not canned: `37-macos-local-password-reset.md` and
  `34-apple-business-shared-ipad-passcode-reset.md` are state-changing L1 runbooks; sweep the class
  for others (LAPS resets, MDM ClearPasscode/EraseDevice, cert/enrollment remediation) so their lead
  banner states the real guardrail, not a false "read-only" claim.
- Owner is exact and uniform per tier: `L1 Team Lead` / `L2 Desktop Lead` — frontmatter-only, never
  in the block.
</specifics>

<deferred>
## Deferred Ideas

- **Phase 117 (RETRO-02) — admin-setup guide retrofit** (all platforms) — next in the mandatory
  116→117→118 retrofit order; NOT this phase.
- **Phase 118 (RETRO-03) — reference-doc retrofit + table remediation** — last due to table-chunking
  severity; NOT this phase.
- **Phase 119 — frozen-surface re-baseline + 13th Path-A lineage bump + close** — the HARN-03
  `check-phase-NN` chain and C17 audit-fold; D-01 explicitly protects its SHA pins by refusing a
  116 sub-phase split.
- **v1.16 — 45 orphan docs + structural classes** (`operations/`, `device-operations/`,
  `cross-platform/apple-business/`, glossaries, decision-trees, standalone nav-hubs, lifecycle) —
  Phase-114 D-04 deferral; the runbook-class `00-index.md` files are explicitly NOT part of this
  deferral (D-06 rules them IN scope).
- **Content re-review (out of envelope):** any over-limit blockquote that cannot be split without a
  word change is escalated to a content owner (D-05) rather than trimmed — genuine content edits are
  a post-v1.15 concern, not this reformat-only milestone.

None of the above are scope creep into Phase 116 — they are downstream/parallel and preserved here
so they are not lost.
</deferred>

---

*Phase: 116-l1-l2-runbook-retrofit-75-docs*
*Context gathered: 2026-07-04*
