# Phase 118: Reference Doc Retrofit + Table Remediation (~26 docs) - Context

**Gathered:** 2026-07-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Retrofit the **reference-class** docs (registry `doc_type: Reference`) to the EEE standard so **C17 exits 0
on every enrolled file** before phase close — including **table remediation** (per-table prose summaries)
so capability-matrix header context survives ~2,000-char chunk boundaries. This is the **third and final
Phase-1 document class** (L1/L2 runbooks = Phase 116 / RETRO-01; admin-setup guides = Phase 117 / RETRO-02;
references = this phase). Pure reformat — content is NOT re-reviewed: `last_verified` carried verbatim into
`Last Reviewed` + a `v1.15 EEE reformat — content not re-reviewed` Version-History row (D2-A). Deliverables
fixed by ROADMAP Phase-118 SC1–SC4 and requirement RETRO-03.

**The corpus (verified filesystem + `docs/_registry/RE-index.md`):** the reference class = registry
`doc_type: Reference` = **35 rows**, all `Status: Pending`:

| Set | Dir / file | Registry rows | Count |
|---|---|---|---|
| Reference docs | `docs/reference/` | `RE-142`…`RE-167` | 26 |
| Error-code docs | `docs/error-codes/` | `RE-168`…`RE-174` | 7 |
| Comparison docs | `docs/apv1-vs-apv2.md`, `docs/windows-vs-macos.md` | `RE-177`, `RE-178` | 2 |

**Enrolled scope = 34 files.** Per D-05 (mermaid carve-out), the **1 mermaid-bearing file** is deferred to
v1.16 and NOT enrolled this phase → **34 files retrofitted + C17-green; 1 carved out** (`RE-147`
`docs/reference/ca-enrollment-timing.md`). Both class-directory indexes (`reference/00-index.md` RE-142,
`error-codes/00-index.md` RE-168) ARE enrolled (D-118-2 → 2C).

**NOT this phase:** L1/L2 runbook retrofit (Phase 116, DONE); admin-setup retrofit (Phase 117, DONE);
frozen-surface re-baseline / 13th Path-A lineage bump / close (Phase 119); any edit to C17 itself (immutable
gate — Phase 115 D-04); the 1 mermaid-bearing reference file (deferred to v1.16 — D-05); end-user Guides
(`RE-175/176`, `doc_type: Guide` — not reference-class, deferred). **No new documentation content**
(REQUIREMENTS.md:75-76). New capabilities belong in their own phases.

**Adjudication method:** All four gray areas were resolved via a three-agent adversarial review (Finder →
Adversary → Referee, all Opus), each independently re-verifying every deciding fact against the repo. The
review **overturned the discuss-phase candidate on D-118-2 (2B → 2C)** — deferring `reference/00-index.md`
would contradict locked Phase-116 D-06 — and surfaced **two grounding corrections the initial brief missed**:
(1) the sole >25-row table is ALREADY C17 #11-compliant → **0 gate-forced table files, not 1**; (2) **10
in-scope files carry no mappable `platform:` key** and will hard-fail C17 #10 without an injection rule. The
Referee upheld all four winners at High confidence with every deciding fact reproduced from source. User
locked 1B / 2C / 3A / 4A + riders on 2026-07-06.

</domain>

<decisions>
## Implementation Decisions

### D-118-1 — Table remediation policy: chunk-survival superset, per-table, before+after (Decision → 1B) [resolves ROADMAP SC2 flag / RETRO-03 / gray#5]
- Author a prose summary for **every capability-matrix and comparison TABLE** (per-table, NOT per-file),
  placed **both before (one-line lead-in) and after (trailing summary within 5 lines)** the table. The prose
  **restates the existing table's scope** — reformat-envelope-safe, identical logic to the `## Summary` lead
  (RETRO-03 `REQUIREMENTS.md:41` explicitly authorizes "a mandatory per-table prose summary"; no new claims).
- **Grounding correction (MANDATORY at plan time):** the C17 #11 gate (`c17-eee-contract.mjs:341-374`, fires
  on `dataRows > 25`, header-inclusive count, prose within 5 lines AFTER the last table row) forces **ZERO**
  new authoring in this corpus. The **only** >25-row table is `error-codes/00-index.md` (30 rows) and it is
  **already #11-compliant** via existing post-table prose at L61 (inside the 5-line window). The largest
  actual **capability matrix is 16 rows** (`ios-capability-matrix.md`) — SC2's ">25 rows" clause is
  **vacuous for matrices**. So 1B's justification is the phase's real driver — **PIPE-02 chunk-boundary
  survival** of matrix header context — NOT the gate.
- **Scope is per-table:** multi-table matrix files hold many tables each (macos 8, android 8, 4-platform 8,
  linux ~10, ios 7); a single per-file summary under-delivers chunk-survival for the remaining wide tables —
  each wide matrix table gets its own restated scope.
- *Rejected 1A (gate-minimal, prose only where #11 forces it):* the gate forces zero files → 1A delivers SC2's
  vacuous letter, not its chunk-survival intent. *Rejected 1C (structural table splits):* zero tables qualify
  for splitting under the >25 rule; pure reformat-envelope risk for zero incremental gate benefit.

### D-118-2 — Index scope: enroll BOTH class-directory indexes (Decision → 2C) [OVERTURNED from discuss-candidate 2B by adversarial review]
- **Both index files are enrolled:** `docs/reference/00-index.md` (RE-142) and `docs/error-codes/00-index.md`
  (RE-168). Final **enrolled count = 34** (35 Reference-class rows − 1 mermaid carve-out).
- *Rationale (repo-grounded, pivotal):* both are Phase-114 registry-assigned **Reference-class** rows sitting
  **inside named class directories**. **Locked Phase-116 D-06** (`116-CONTEXT.md:153-163`, verified verbatim):
  the "nav-hubs deferred to v1.16" ruling (PROJECT.md / Phase-114 D-04) covers only **orphan** nav-hub docs
  (`operations/`, standalone hubs), **NOT the runbook-class indexes** — "Excluding them would contradict the
  registry." `reference/00-index.md` (pure TOC) is directly analogous to the L1/L2 runbook indexes D-06
  enrolled. `error-codes/00-index.md` is additionally substantive (master error-code Quick-Lookup table).
- *Rejected 2B (defer `reference/00-index.md` as "pure TOC"):* contradicts locked D-06; the registry already
  classes it Reference; leaves a Reference-class doc Pending into the Phase-119 full-class-green close-gate for
  no forced reason (unlike the content-edit-forced mermaid carve-out). *Rejected 2A (defer both):* same, ×2.
- **Mermaid carve-out (D-05 carries, uncontested):** `docs/reference/ca-enrollment-timing.md` (RE-147) is the
  **only** reference-class file with a top-level `mermaid` fence (hard-fails C17 #1). Carved out → v1.16, left
  **keyless** (not enrolled), `RE-index.md` Status stays `Pending`.

### D-118-3 — Doc-Type edge cases: carry the registry (Decision → 3A)
- All comparison docs (RE-177/178), all error-codes (RE-168–174), and the three "…Guide"-**titled** files
  (RE-153 `esp-timeout-tuning.md`, RE-154 `gpo-to-intune.md`, RE-155 `imaging-to-autopilot.md`) keep
  `doc_type: Reference` exactly as the Phase-114 registry locked. Title ≠ doc_type.
- *Rationale (repo-grounded):* the registry `doc_type` is **Phase-114 upstream-locked**; **no harness gates
  title↔doc_type** (grep-confirmed: `doc_type` appears only in C17 #9 + the retrofit helpers, no
  milestone-audit reference). Reclassifying ripples: it changes the governing Summary-lead template (D-03) and
  yanks files out of the reference retrofit class mid-phase.
- **Mechanism correction (bake in):** C17 #9 (`c17-eee-contract.mjs:312-316`) compares the block Doc-Type field
  to the **frontmatter `doc_type` ONLY — it never reads the registry**. A hypothetical 3B reclassification
  (editing both frontmatter + block) would therefore also pass #9; 3A wins on registry-lock + absence of any
  title↔doc_type gate, NOT because #9 consults the registry.
- *Rejected 3B (reclassify the "Guide"-titled migration docs to `doc_type: Guide`):* relitigates the
  Phase-114-locked registry; zero gate benefit; ripples D-03 template governance.

### D-118-4 — Batching + helper reuse: carry D-02, fork retrofit-guide.mjs (Decision → 4A) + MANDATORY riders
- Carry **116/117 D-02**: ~4–6 **size-balanced** plans grouped by directory/topic (`docs/reference/` split on
  natural filename seams; `docs/error-codes/` as one cohesive set; the two `-vs-` comparison docs folded with
  reference). Fork the Phase-117 `scripts/pipeline/retrofit-guide.mjs` into a reference variant (its whole-span
  fix already resolved the `retrofit-runbook.mjs` 2nd-pre-H1-blockquote-drop defect). Hand-author the Summary
  + per-table prose; per-file **C17 exit-0** + re-run #11/#12 checks as the objective completion proof.
- **MANDATORY RIDER — keyless-platform injection (brief-missed grounding correction):** **10 in-scope files
  carry NO mappable `platform:` key** and will **hard-fail C17 #10** (`c17-eee-contract.mjs:331-339`, which
  fails on an **absent** key, not just an unmapped value; `both`/`APv1`/`APv2` are NOT in D1_MAP). The retrofit
  MUST inject a D1_MAP-valid `platform:` — all 10 are Windows-domain → `platform: Windows` (plan-time confirm
  it resolves in D1_MAP). The 10: the **7 error-codes files** (`00-index` carries `applies_to: both`; `01-05`
  carry `APv1`; `06` carries `APv2` — none is a `platform:` key) + `docs/reference/powershell-ref.md` +
  `docs/reference/registry-paths.md` + `docs/apv1-vs-apv2.md`. `windows-vs-macos.md` already has
  `platform: all` (leave it); `reference/00-index.md` already has `platform: all` (leave it).
- **RIDER — #12 double blockquote split:** `docs/error-codes/00-index.md` has **TWO** over-200-char top-level
  blockquotes (`L8` "Framework coverage" = 287c pre-H1; `L65` "APv2 Note" = 284c post-H1) — **both** need
  word-preserving structural splits (D-GC-01), not just the pre-H1 gate relocation. #12 scans all top-level
  blockquote groups regardless of position.
- **RIDER — #12 corpus load:** 65 over-200-char blockquote groups across ~28 reference files (measured) — again
  the dominant hand-authoring load (D-GC-01 carries); size the batches accordingly.

### Claude's Discretion (resolve at plan time)
- Exact plan count and precise file-to-plan assignment within the D-02 size-balanced scheme (target ~4–6 plans
  over the 34 enrolled files; group by dir/topic; split `docs/reference/` on natural filename seams).
- Exact shape/name of the forked reference retrofit helper (fork `retrofit-guide.mjs`; guard defects; dry-run
  `--self-test` on one multi-table matrix + the error-codes index before batch application).
- The exact ≥30-word `## Summary` prose per reference doc and the exact per-table prose-summary wording
  (reformat-only: restate existing scope; add no new technical claims).
- Confirm `platform: Windows` resolves in D1_MAP for the 10 keyless files at plan time.

### Authoring notes (locked upstream — do NOT reinvent)
- **Gate relocation keys on structural position, not the string:** relocate the **pre-H1 first blockquote** to
  AFTER `## Summary` (D3-A); never match on the literal string; never touch secondary/inline blockquotes. Then
  apply D-GC-01 splitting to every over-limit group.
- Block field-set/order = `Platform · Doc Type · Doc ID · Status`; Platform+DocType first; `·` separator;
  `owner` NEVER in the block (Phase-114 D-01/D-05) — **`owner: Intune Admin Lead`** uniform, frontmatter-only
  (carries 117 D-04). `Status: Approved` for the 34 enrolled live docs. `Last Reviewed` = existing
  `last_verified` verbatim + the `v1.15 EEE reformat — content not re-reviewed` Version-History row (D2-A / SC3).
- **Doc ID from registry:** join `RE-index.md` by `Path`; never hand-transcribe `RE-NNN` (C17 #9 is unforgiving).
- **Registry lifecycle:** flip the 34 enrolled files' `RE-index.md` Status `Pending → Approved`; leave the 1
  mermaid-carved file (RE-147) `Pending`.
- **Two-part per-phase SC (Phase-115 D-02):** enrollment-completeness precheck (every reference-class file
  EXCEPT the 1 mermaid-deferred carries all four EEE keys) THEN C17 exits 0 on the 34 — author both as SC.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### The retrofit target spec (read FIRST)
- `docs/_standards/EEE-SOP-standard.md` — the authoritative D1 platform-normalization map, the single-line
  header-block format + field order, Doc Type taxonomy {Runbook, Guide, RCA, Reference}, status set, D2
  `Last Reviewed` = `last_verified` verbatim, the Version-History row rule, and the `owner`-never-rendered rule.
- `docs/_templates/` — the born-conformant reference/guide target shapes (frontmatter EEE keys + retained old
  keys, block line, `## Summary`-first, the Summary prescription). Confirm at plan time whether a
  reference-specific template exists; else use the generic scope-lead shape (D-03 carries from 117).
- `docs/_registry/RE-index.md` — `RE-142`…`RE-174`, `RE-177`, `RE-178` rows (reference class) mapping
  `RE-NNN → path + title + doc_type + status`; the authoritative `doc_id` source (join by path). The registry
  `Status` column tracks the retrofit lifecycle (Pending→Approved), distinct from frontmatter `status`.

### The enforcing gate (the phase's live merge gate)
- `scripts/validation/c17-eee-contract.mjs` — the immutable C17 validator. Assertions the retrofit must
  satisfy: **#1** no top-level `mermaid` fence (the D-05 crux — 1 file carved out); **#5** `## Summary` ≥30
  words (262); **#9** block↔frontmatter exact match (298-329); **#10** platform resolves in D1_MAP, HARD FAIL
  on **absent** key (331-339, the keyless-injection crux — 10 files); **#11** tables >25 data rows need prose
  within 5 lines AFTER (341-374, header-inclusive count — already satisfied for the one qualifying table);
  **#12** every top-level blockquote group ≤200 chars (383-405, the D-GC-01 crux — 65 groups; error-codes
  index has 2); enrollment scan opt-in by EEE-key presence (519-533). Invoke per file; ship green.
- `scripts/validation/c17-fixtures/` — the `--self-test` passing/failing exemplars (do not modify).

### Phase scope + requirements + locked upstream decisions
- `.planning/ROADMAP.md` §"Phase 118" (SC1–SC4, incl. the SC2 table-remediation discuss-flag resolved here as
  D-118-1); §"Phase 119" (the HARN chain + `CHAIN_PHASES=[48..118]` + `frozen-at-close.mjs` V114 SHA pin
  `7d922a7` that the retrofit close feeds).
- `.planning/REQUIREMENTS.md` — RETRO-03 (L41, explicitly authorizes the per-table prose summary), the
  reformat-only / no-new-content envelope (L75-76), the 1-req-1-phase rule (L13), and the v1.16 Mermaid/orphan
  deferral (L13) that D-05 folds into.
- `.planning/phases/117-admin-setup-guide-retrofit-all-platforms/117-CONTEXT.md` — the direct precedent: D-01
  (one-phase granularity), D-02 (size-balanced homogeneous batching), D-03 (Summary lead), D-04 (uniform
  `owner: Intune Admin Lead`, absent from block), D-GC-01 (#12 word-preserving split policy), and the
  `retrofit-guide.mjs` fork (whole-span fix) this phase forks again.
- `.planning/phases/116-l1-l2-runbook-retrofit-75-docs/116-CONTEXT.md` — **D-06** (the pivotal 2C basis:
  class-directory `00-index.md` files ARE enrolled; nav-hub deferral is orphan-only) + the original D-01..D-05
  precedent.
- `.planning/phases/115-c17-harness-check-validator-atom/115-CONTEXT.md` — D-02 (C17 opt-in by key presence +
  the two-part per-phase SC: enrollment-completeness precheck THEN C17 exit 0 — scope the precheck to 34),
  D-04 (C17 immutable during content phases).
- `.planning/phases/114-eee-standard-templates-doc-id-registry-metadata-rules/114-CONTEXT.md` — D-01 (owner
  frontmatter-only, absent from block), D-04 (orphan nav-hub deferral scope), D-05 (block field-set/order `·`
  separator), D-09 (D1 map).

### Empirical grounding (why the per-table prose + Summary placement matter)
- `.planning/phases/113-conversion-pipeline-lock-representative-set-grounding-valida/PIPE-02-FINDINGS.md`
  — the chunk-boundary / citation behavior that makes the per-table prose summary (D-118-1) and the `## Summary`
  lead load-bearing retrieval chunks. This is the real driver behind 1B (SC2's ">25 rows" gate clause is
  vacuous for the matrices).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `scripts/pipeline/retrofit-guide.mjs` — the Phase-117 mechanical helper (whole-span fix; resolved the
  runbook-helper 2nd-pre-H1-blockquote-drop defect). Fork into a reference variant; dry-run before batch.
- `scripts/pipeline/retrofit-runbook.mjs` — the older 116 helper; **has defects** (drops 2nd pre-H1 blockquote;
  non-idempotent; CRLF→LF) — do NOT reuse directly; the guide fork is the correct base.
- `docs/_registry/RE-index.md` — the machine-readable `doc_id` source; join on `Path` to emit correct `RE-NNN`.
- `scripts/validation/c17-eee-contract.mjs` — the live gate; re-implement its #11 row-count + #12 char-count
  logic as objective per-file completion measurements.
- `scripts/pipeline/` idiom (node-builtins-only) — the shape the reference retrofit helper should mirror.

### Established Patterns
- **Reshape-only envelope:** carry `last_verified` verbatim, add the fixed Version-History row, never re-verify
  content (REQUIREMENTS.md:75-76; D2-A). The per-table prose (D-118-1) restates existing table scope only.
- **Per-file C17 enrollment by key presence:** a doc is gated the moment it gains the four EEE keys — batches
  are independently mergeable/gateable; the 1 mermaid-carved file stays invisible by staying keyless.
- **Two-part per-phase SC (Phase-115 D-02):** enrollment-completeness precheck (34 files) THEN C17 exit-0.
- **Multi-plan single phase:** 113/114/116/117 each ran multiple plans within one phase — the house pattern.

### Integration Points
- **C17 is the merge gate** between authoring and the Phase-119 audit fold — every enrolled file passes it
  before phase close (SC4). C17 is immutable here (Phase-115 D-04).
- **Sequential-on-main execution** (`use_worktrees:false`) — plans run one at a time on the main tree.
- **Registry lifecycle:** retrofitting a file flips its `RE-index.md` Status Pending→Approved (the 34); the 1
  mermaid-carved file (RE-147) stays Pending.
- **Phase 119 close-gate** requires C17 green across the FULL Phase-1 corpus (all three retrofit classes) — this
  phase completing the reference class at 34/34 (+ documented mermaid carve-out) is the last input.

</code_context>

<specifics>
## Specific Ideas

- The load-bearing surprises this phase (all from the adversarial review, all MANDATORY at plan time):
  **(1)** the table-remediation gate (C17 #11) is a **no-op** — 0 files forced; the ONE >25-row table
  (error-codes/00-index, 30 rows) is already compliant, and no capability matrix exceeds 16 rows. 1B is
  justified by **chunk-survival intent (PIPE-02)**, not the gate, and applies **per-table**.
  **(2)** the discuss-candidate 2B was **overturned to 2C** — locked Phase-116 D-06 enrolls class-directory
  indexes; nav-hub deferral is orphan-only.
  **(3)** **10 keyless-platform files** need injected `platform: Windows` or C17 #10 hard-fails
  (`applies_to: both`/`APv1`/`APv2` are not platforms and not in D1_MAP).
  **(4)** error-codes/00-index has **two** over-limit blockquotes, not one.
- Owner is uniform `Intune Admin Lead` for all 34 — frontmatter-only, never in the block (117 D-04 carries).

</specifics>

<deferred>
## Deferred Ideas

- **The 1 mermaid-bearing reference file → v1.16** (D-05): `docs/reference/ca-enrollment-timing.md` (RE-147).
  Deferred because passing C17 #1 requires converting/removing the diagram (a content edit out of the
  reformat-only envelope), and v1.16 already owns Mermaid handling. Its `RE-index.md` Status stays `Pending`.
- **End-user Guides (`RE-175/176`, `doc_type: Guide`) → v1.16** — not reference-class; out of Phase-118 scope.
- **Phase 119 — frozen-surface re-baseline + 13th Path-A lineage bump + close** — the HARN-02/03/04 atoms +
  C17 full-corpus audit-fold + PIPE-02 second grounding-confirmation pass. NOT this phase.
- **v1.16 — orphan docs + structural classes (glossaries, Mermaid decision-trees, orphan nav-hubs, lifecycle)
  + the parked Mermaid decision** — the deferral D-05 folds into.

None of the above are scope creep into Phase 118 — they are downstream/parallel and preserved here so they are
not lost.

</deferred>

---

*Phase: 118-reference-doc-retrofit-table-remediation-26-docs*
*Context gathered: 2026-07-06*
