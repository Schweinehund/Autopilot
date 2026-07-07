# Phase 122: Structural Retrofit — Decision-Trees, Carved-Mermaid Files & the 9 Mermaid-bearing lifecycle docs - Context

**Gathered:** 2026-07-07
**Status:** Ready for planning

<domain>
## Phase Boundary

Retrofit the **30 Mermaid-bearing files** to the EEE SOP standard — EEE header block (rendered from frontmatter) + `## Summary`-first (D3-A) + normalized Platform label + `doc_id` enrollment — each green under the blocking **C17** harness (`scripts/validation/c17-eee-contract.mjs`). The defining work of this phase (vs. the pure reformat of Phase 121) is **converting every top-level Mermaid diagram to a C17-compliant text equivalent per the LOCKED STD-04 policy**, with **every decision leaf / node / labeled edge preserved** (STD-04 D-04: C17 has NO diagram parser, so a green run does NOT attest leaf-completeness — that is a human obligation). All targets move to `Status: Approved`.

**In scope — the 30-file roster (verified: `grep -rl '^```mermaid' docs/` → exactly 30):**
- **RETRO-05 — 11 decision-trees** (`docs/decision-trees/00..10`) — currently **UNENROLLED** (no `doc_id`); need **NEW** appended registry IDs (RE-207…RE-217) + conversion.
- **RETRO-08 — 10 carved-mermaid files** (all already Pending, flip Pending→Approved, mint no new IDs): the **9 admin-setup files** RE-076 (`admin-setup-apv1/00`), RE-077 (`admin-setup-apv1/01-hardware-hash-upload`), RE-087 (`admin-setup-apv2/00`), RE-092 (`admin-setup-android/00`), RE-106 (`admin-setup-ios/00`), RE-116 (`admin-setup-macos/00`), **RE-128 (`admin-setup-linux/00`)**, RE-134 (`admin-setup-8021x/00`), RE-135 (`admin-setup-8021x/01-eap-method-overview`) + **RE-147** (`docs/reference/ca-enrollment-timing.md`).
- **RETRO-07 remainder — 9 Mermaid-bearing lifecycle files** (already Pending at RE-190/191/192/195/196/200/204/205/206; flip Pending→Approved, mint no new IDs): `docs/lifecycle/{00-overview,03-oobe,04-esp}.md`, `docs/lifecycle-apv2/02-deployment-flow.md`, `docs/ios-lifecycle/{01-ade-lifecycle,02-mdm-migration}.md`, `docs/macos-lifecycle/{00-ade-lifecycle,01-psso-provisioning-walkthrough,02-mdm-migration-psso}.md`.

**Roster fact resolved this session (kills the RETRO-08 double-count):** RETRO-08's separate mention of "RE-128 (linux overview)" is a **redundant call-out — RE-128 IS one of the 9 admin-setup files**, not a 10th. Carved-mermaid = **10 unique files** (9 admin-setup + RE-147). Grand total = **30** (11 + 10 + 9).

**Already LOCKED upstream — NOT re-opened this phase:**
- **STD-04 Mermaid policy** (Phase 120, adversarial-review-resolved) — text-equivalent conversion (NOT a carve-out); C17 assertion #1 stays byte-unchanged (D-02); green C17 ≠ leaf-completeness (D-04, human obligation).
- **The 121↔122 split** — the 9 lifecycle files were pre-enrolled Pending with path-order IDs in Phase 121; Phase 122 flips them without minting new IDs. **RETRO-07 closes only when all 22 lifecycle files are C17-green.**
- **DEFER-121-07-A** — the unfilled `YYYY-MM-DD` VH-date placeholder in 9 Phase-121 files was already fixed (commit `9031056`). *(Its root-cause defect in the pipeline recurs — see D-03 RIDER below.)*

**Out of scope (belongs elsewhere):** nav-hub retrofit (Phase 123, RETRO-06); pandoc alias fix / descriptive-filename pass / Draft-label probe (Phase 124, PIPE-03); frozen-surface pin + close (Phase 125); the `operations/`, `device-operations/`, `cross-platform/apple-business/` directory classes (v1.17+ whole-class enrollment).

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via **`/adversarial-review`** — a Proponent → Adversary → Referee panel of three separate Opus agents per decision, each grounded in the live repo (12 agents total; workflow `wf_d79b6f81-c08`). Full reasoning in `122-DISCUSSION-LOG.md`. **Two rulings OVERRULED their pre-stated recommendation on grounded evidence** (D-01, D-02); one is a partial-specifics overrule (D-03); one upheld (D-04).

### D-01 — Leaf-parity verification discipline → Option B (uniform coverage, tiered depth), HIGH confidence ⚖️ OVERRULED "risk-tiered gating"
Every one of the **30 converted files gets an independent, read-only leaf/node/labeled-edge re-derivation pass** — a separate agent re-derives the pre-conversion diagram's element set from the **pre-122 Mermaid bytes (`git show <base>:<path>`)** and diffs it against the converted table/list. **NO file is labeled "trivial, skip."** The tiering is in *depth*, not *coverage*: branch-heavy files (11 decision-trees, ≥2-diamond / multi-diagram flowcharts, the psso decision node) get full adversarial re-derivation; branchless linear step-lists get the lightweight mechanical count-and-label diff. Keep the `LOCKED — N` annotation + author self-check on **all 30** as the floor.
- **Why B over the pre-stated risk-tiered gate (C):** the adversary *empirically tested* the complexity-triage a gate would rely on and found it wrong on the exact properties it sorts on — `docs/lifecycle/04-esp.md` diagram carries **7 edges / 8 nodes / 2 subgraphs**, not the "3 edges, LOW" a triage assigned (>2× undercount); `docs/lifecycle-apv2/02-deployment-flow.md` has **TWO diagrams** and the triage missed the second block's **5 dashed failure-mapping edges** (`F_REG/F_IME/F_APP1/F_SCRIPT/F_APP2 -.-> S3/S4/S7/S8/S9`) — precisely the edge-borne branch logic STD-04 D-01 calls "the single most decision-relevant content." **You cannot use an unverified gate to suppress the verification that catches the gate's own errors.** Base rate confirms the hazard is live here: DEFER-121-07-A shipped a placeholder through C17 195/0 green; DEFER-121-07-B documents the fork reporting "OK, 0 ERRORS" while corrupting files. Marginal cost of B-over-C = ~14 extra **read-only** diffs of the simplest files — near-zero.
- **Run discipline:** the verification agents are read-only `git show` diffs — **they run NO validator chain and perform NO checkout**, so the `chain_baseline_run_kill` / dirty-tree hazard does NOT apply; they stay inside the `use_worktrees:false` sequential-on-main-tree envelope. Batch them (front-load the 11 decision-trees).
- **RIDERS the verification instruction MUST carry** (from the referee's key_risks):
  1. **Semantic-paraphrase check** — verify each edge's *condition semantics*, not just that a matching row exists. (Real example: `10-8021x-triage.md` edge "Trust prompt or untrusted server / RADIUS root CA missing" was narrowed to table row "Server trust / validation failure." A pure cardinality/`LOCKED-N` diff is blind to this.)
  2. **Multi-block / subgraph enumeration** — enumerate ALL fenced ```` ```mermaid ```` blocks per file **plus** every `subgraph` grouping and `classDef` semantic class (stage vs. failure). A single-diagram-per-file assumption reproduces the exact defect being guarded.
  3. **Stale diagram-prose grep** — the RE-068 defect class ("click the leaf", "contains a Mermaid decision tree", node-shape/legend/`classDef` color language) lives OUTSIDE the table and a completeness diff passes it green. Grep the whole converted doc for `mermaid|click|decision tree|diagram above/below|node shape|legend` (D-03 stale-prose defect).
  4. **Ordering** — capture LOCKED-N / element set **BEFORE** the `retrofit-structural.mjs` fork injects the envelope (the fork adds frontmatter/VH-rows, NOT diagram content); diff against the pre-122 Mermaid bytes via `git show` of the base commit.

### D-02 — Conversion shape for non-decision diagrams → Option C bright-line + 3 amendments, HIGH confidence ⚖️ OVERRULED "shape-by-type"
**Bright-line spine:** *does the Mermaid block contain a `{...}` decision node?* **Yes → decision table; No → ordered numbered stage list.** This is the genuinely mechanical boundary (Option B's "count-the-diamonds self-classifies" was fuzzy and **misfired on its own example** — `decision-trees/05-device-lifecycle.md` is a **verified 4-diamond decision tree** (Q1–Q4), proving filenames are red herrings and only *structure* governs). The numbered stage list survives for genuinely branchless linear flows (where B and C agree). **Option A (uniform table everywhere) jointly rejected** — a trivial S1→S7 chain reads better as a numbered list than a contrived empty-`Scenario` table.
- **AMENDMENT 1 — classify PER MERMAID BLOCK, not per file.** `lifecycle/00-overview.md` and `lifecycle-apv2/02-deployment-flow.md` each carry two heterogeneous blocks; per-file classification silently under-converts block 2. **Non-negotiable.**
- **AMENDMENT 2 — two shapes A/B/C all miss, now named:** (a) **failure-annotation maps** (dotted stage→failure edges) → `Stage | Failure Mode` table; (b) **subgraph-partitioned flows** → grouped/headed sub-lists preserving the partition label (e.g. `lifecycle/04-esp.md`'s `Device Phase` / `User Phase` partition is semantically load-bearing — device-before-user-login — and a flat list erases it).
- **AMENDMENT 3 — drop the literal `Scenario | Leaf | Resolution` / `LOCKED — N leaves` wording.** Use **diagram-fitted table columns with an ordinal first column where order is load-bearing** (per the shipped `10-8021x-triage.md` `Path | Step 1 | Step 2 | Destination` precedent — an ordinal-column table preserves order exactly as a numbered list does; D-03's `Scenario|Leaf|Resolution` is only a *parenthetical example*, `EEE-SOP-standard.md:429`), plus D-03's **container-neutral `LOCKED — N`** parity annotation counting **nodes PLUS labeled edges** ("a row OR list item", `:430-431`).
- **Why C over B:** on branch-dominant/reconverging topologies verified in the repo (`lifecycle/00` block-1 `RESEAL-->S3a` rejoin; `lifecycle/03` PP-path resealing into ESP; `macos/02` dual non-reconverging pipelines), B's "linear list with a nested branch sub-list" structurally **cannot hold merge/reconvergence edges** without dropping them — the exact D-04 loss Phase 122 exists to fence off — whereas one-row-per-labeled-edge table holds them. Both D-03 exemplars are tables for branch-bearing diagrams; B's nested-stage-list-with-decision-sublist has **zero corpus precedent**.
- **LOCK note:** do NOT re-open a "nested list only for a single small fork" exception on branch-*light* files (`macos-lifecycle/00`, `ios-lifecycle/01`). That reintroduces the embedded-vs-rooted taste boundary that made B lose. Keep the bright line: **any diamond → table.** (This is a real consistency-tax tradeoff, accepted deliberately.)

### D-03 — Pipeline division of labor + DEFER-121-07-B → Option A direction UPHELD; specifics PARTIALLY OVERRULED, HIGH confidence
**Direction (settled by STD-04 D-04):** two-step split — (1) a **human hand-authors** each Mermaid→text conversion (leaf-parity is unautomatable); (2) a **Phase-122 fork of `retrofit-structural.mjs`** injects the EEE envelope/frontmatter/VH-row/`doc_id` via `buildDocIdMap()` join-on-Path, fail-closed (`DOC-ID-UNRESOLVED`), **never touching diagram content**. Options B (pipeline strips/tabulates Mermaid — fabricates parity) and C (single hand pass, no fork — forfeits the fail-closed join that matters MORE here because 11 doc_ids are brand-new and C17 does NOT cross-check `doc_id`↔RE-row) both lose.
- **SPECIFIC OVERRULE 1 — the guard that matters is NOT a `doc_id`-idempotency check.** The fork's job is to enroll files currently protected by `MERMAID_DEFERRED_PATHS` (`retrofit-structural.mjs:130-140,:312`), so the fork **must DELETE that exclusion**. Replace it with a **fail-closed body `^```mermaid` absence precondition** — else a file with an unconverted/partially-converted diagram enrolls and the pipeline reports 0 ERRORS (C17 #1 only catches it later at corpus validation). This is the **highest-severity Phase-122-specific hazard (MERMAID-ENROLL-UNGUARDED).** The `doc_id`-presence idempotency guard (DEFER-121-07-B CR-01) is still added for re-run safety, but must **ERROR, not skip** (match the fork's fail-closed convention — a silent skip hides partial-completion state).
- **SPECIFIC OVERRULE 2 — DROP "CRLF-symmetric write" (WR-01); keep LF-normalize; close WR-01 as WONTFIX-in-fork.** Inspection found **all 30 targets are CRLF on disk, but Phase 121 already LF-normalized their directory siblings** in `lifecycle/` and `lifecycle-apv2/`. Restoring CRLF would create a within-directory EOL split and **void the byte-length proof** (measured on LF-normalized buffers, `:407,:458-460`). Keep the current LF-normalize behavior (`:155→:745`). **⚠ This directly overrules GA-4's RIDER-1 "fold in WR-01 (CRLF restore)" — adjudicated in favor of GA-3's deeper on-disk inspection.** *(Consequence: LF-normalizing 30 CRLF files produces whole-file EOL-flip diffs — review with `git diff --ignore-space-at-eol` / `-w` + rely on the per-file byte-span proof + C17 as the content gate. Do NOT "fix" the noise by restoring CRLF.)*
- **SPECIFIC ADD 3 — the fork adds a multi-class router** (11 decision-trees→Reference; the carved admin-setup class; `docs/reference/ca-enrollment-timing.md`→Reference) + a **cheap fail-closed guard: ERROR on a keyless file outside a known-Windows path allowlist** rather than blindly defaulting `platform: Windows` (`:349`). *(Tempered vs. the adversary: this trap does NOT misfire on the actual roster — every keyless target is genuinely Windows APv1/APv2 and every non-Windows target carries an explicit platform key — so it warrants a cheap guard, not a redesign.)*
- **SPECIFIC ADD 4 — decision-trees are a THREE-step sequence:** convert (hand) → **hand-mint 11 `RE-index.md` rows** → run fork. Rows MUST exist (path-keyed) BEFORE `buildDocIdMap()` runs (fork fails closed on missing path, does NOT edit `RE-index.md`).
- **SPECIFIC ADD 5 — fold in the DEFER-121-07-A root-cause fix:** the fork still writes literal `YYYY-MM-DD` (`retrofit-structural.mjs:231-232`) — **auto-fill the real retrofit date** in the Phase-122 fork, and sweep the 9 known-unfilled Phase-121 files in the same commit (they do NOT overlap the 19 flip-targets — separately carried).

### D-04 — Registry enrollment + doc_type roster → UPHELD, HIGH confidence ✅
- **(a) `docs/decision-trees/05-device-lifecycle.md` → Reference.** Directory precedence is categorical: `EEE-SOP-standard.md:178-179` ("a document in a class-dedicated directory takes that directory's type regardless of topical overlap: `decision-trees/*` → Reference") and `:186-187` names `05-device-lifecycle.md` as the **LOCKED worked resolution** (rule-1 directory-precedence beats its lifecycle-flavored filename). Same rule that makes RE-068 a Runbook despite containing a converted 7-leaf tree.
- **(b) All 11 decision-trees (00..10) → Reference;** mint new IDs **RE-207…RE-217** appended sequentially from current registry max (**206, verified contiguous / zero-gap**) in **path order 00→10** (so `05` = **RE-212**). The other 19 files flip Pending→Approved with existing IDs, minting nothing.
- **Number-vs-existence nuance:** the RE-207…217 *numbers* are NOT load-bearing (citations are path-driven; registry excluded from indexed library). What is load-bearing: **rows exist (path-keyed) before `buildDocIdMap()` runs.** Sequential-path-order is the right D-06 zero-gap hygiene convention, not a hard constraint.
- **RIDER — admin-setup doc_type UNPINNED:** 121-CONTEXT pins decision-trees→Reference but does NOT pin the `doc_type` the fork's router must emit for the carved admin-setup class (RE-076/077/087/092/106/116/128/134/135). Registry rows show these as **`Guide`/Pending** today; the fork injects `doc_type` from its **router**, not from the RE-row (C17 #9 checks block==frontmatter, not doc_type correctness — `:174-176`, enforced by registry review not the harness). **The planner must make the admin-setup `doc_type` an explicit router ruling before coding the fork** (default expectation: `Guide`, matching existing rows — confirm against the taxonomy).
- **RIDER — record the 05 rationale** at RE-212's registry row / review note, or a future reviewer re-litigates the `-lifecycle` filename sitting in a Reference block.

### Claude's Discretion
- Exact prose of each net-new `## Summary` (≥30 words, scope statement) — layout & sourcing rule fixed, sentences not.
- Plan/wave decomposition within Phase 122 (batching the 30 files by class + interleaving convert/verify/enroll) is the planner's call — sequential-on-main-tree per `use_worktrees:false`. Front-load the 11 decision-trees (highest-value full re-derivation + the only new-ID/coordination-risk class).
- The exact high-complexity threshold that routes a file to "full adversarial re-derivation" vs. "lightweight count-and-label diff" (D-01 depth-tier) — but coverage is fixed at all 30.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/ROADMAP.md` §"Phase 122" — Goal + 5 Success Criteria (SC5 = the 9 lifecycle remainder); §"Phase 121" for the 121↔122 RETRO-07 split.
- `.planning/REQUIREMENTS.md` — RETRO-05 (decision-trees), RETRO-07 (spans 121+122, scope-annotated), RETRO-08 (carved-mermaid: RE-128, RE-147, 9 admin-setup); traceability table (`RETRO-05|122`, `RETRO-07|121+122`, `RETRO-08|122`).
- `.planning/STATE.md` — v1.16 dependency summary; STRUCTURAL-SPLIT axis ("split by Mermaid dependency").

### The LOCKED Mermaid policy + EEE standard + C17 contract (the enforcement surface)
- `docs/_standards/EEE-SOP-standard.md` §"Mermaid-in-Enrolled-Classes Policy (STD-04)" (~L398-448) — **D-01** text-equivalent conversion (`:412-413` "edge-borne branch logic is the single most decision-relevant content"); **D-02** C17 #1 byte-unchanged; **D-03** conversion shapes (`:429` `Scenario|Leaf|Resolution` is a *parenthetical* example; `:430-431` "a row OR list item" container-neutral; `:437-440` stale-prose-is-a-defect rule); **D-04** honesty caveat (`:442-448` C17 = opener-regex, no diagram parser, leaf-completeness is human). Also: Doc Type Taxonomy + **D-08 directory precedence** (`:174-187`, `decision-trees/* → Reference`, `05-device-lifecycle.md` = LOCKED worked case); D1 platform-normalization map.
- `scripts/validation/c17-eee-contract.mjs` — the 13-assertion contract. #1 Mermaid hard-fail (`inCodeFence`-masked, byte-unchanged); #9 block==frontmatter (does NOT check doc_type correctness); #5 Summary ≥30 words; #12 blockquote ≤200 chars.

### Conversion-shape exemplars (copy these shapes)
- `docs/decision-trees/10-8021x-triage.md` — the STD-04-cited exemplar: **ordinal-column table** (`Path | Step 1 | Step 2 | Destination`) + "Routing Verification" table (D-02 AMENDMENT 3 precedent).
- `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068) — the first shipped `Scenario|Leaf|Resolution` decision-table conversion + `LOCKED — N leaves`. **⚠ ALSO the stale-prose cautionary case** (`:29` "click the leaf" prose shipped green under "content not re-reviewed" — D-02 RIDER 3 / D-01 RIDER 3 guard against exactly this).

### Registry + pipeline (D-03 / D-04 mechanics)
- `docs/_registry/RE-index.md` — contiguous RE-001…206, zero gaps; the 19 Pending flip-targets (RE-076/077/087/092/106/116/128/134/135/147/190/191/192/195/196/200/204/205/206); mint RE-207…217 for decision-trees.
- `scripts/pipeline/retrofit-structural.mjs` — the Phase-121 fork = the Phase-122 fork template. Key sites: `MERMAID_DEFERRED_PATHS` (`:130-140,:312`, **must DELETE**); `buildDocIdMap()` join-on-Path + `DOC-ID-UNRESOLVED` fail-closed (`:337-341`); platform default (`:349`); LF-normalize read (`:155→:745`, **KEEP**); literal `YYYY-MM-DD` VH token (`:231-232`, **auto-fill**).
- `scripts/pipeline/retrofit-guide.mjs`, `scripts/pipeline/retrofit-reference.mjs` — the "fork, don't refactor in place" ancestors.
- `.planning/phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/121-CONTEXT.md` — the LOCKED D-01..D-08 this phase continues.
- `.planning/phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/deferred-items.md` — **DEFER-121-07-A** (VH-date fill, fold in) + **DEFER-121-07-B** CR-01 idempotency / WR-01 CRLF (adjudicated in D-03).
- `.planning/phases/121-.../121-REVIEW.md` — full DEFER-121-07-B detail.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`retrofit-structural.mjs`** (Phase-121 fork) — the direct fork template. Phase 122 forks it (per "fork, don't refactor in place"), **deletes `MERMAID_DEFERRED_PATHS`**, adds the `^```mermaid`-absence precondition + doc_id-idempotency-ERROR guard + multi-class router + keyless-Windows fail-closed guard + real-date VH fill.
- **`10-8021x-triage.md` + RE-068** — the two shipped conversion-shape exemplars (ordinal table; `Scenario|Leaf|Resolution` + `LOCKED-N`). RE-068 doubles as the stale-prose anti-example.
- **The 19 Pending registry rows** (RE-076…206 flip-targets) — already path-order-correct; Phase 122 only flips Status, mints nothing for them.

### Established Patterns
- **Enrollment gate:** a file is "enrolled" iff frontmatter has `doc_id`. Enrolling a Mermaid-bearing file trips C17 #1 — the entire reason conversion must precede/accompany enrollment. The `^```mermaid`-absence precondition makes this a fail-closed pipeline invariant.
- **Reformat-only envelope; conversion is the ONE content edit.** Unlike Phase 121 (zero content change), Phase 122 deliberately rewrites diagram content — hence the D-01 uniform independent verification.
- **Fail-closed pipeline:** PATH-ALLOWLIST / DOC-ID-UNRESOLVED / SENTINEL all `return ok:false`. Every new guard (mermaid-absence, doc_id-present, keyless-non-Windows) must ERROR, matching this convention — never silently skip.
- **Sequential-on-main-tree** (`use_worktrees:false`); the D-01 verification agents are read-only `git show` diffs (no validator chain, no checkout) so they do NOT trip `chain_baseline_run_kill`.

### Integration Points
- Hand-minted `RE-index.md` rows (RE-207…217) ↔ `buildDocIdMap()` (rows MUST precede the fork run).
- The 9 Phase-121 Pending lifecycle rows + 10 carved rows ↔ Phase-122 flip-to-Approved (no new IDs).
- Registry `Doc Type` column ↔ frontmatter `doc_type` (router-emitted, NOT machine-checked by C17 #9 — the admin-setup doc_type must be an explicit router ruling, D-04 RIDER).
- Pre-122 Mermaid bytes (`git show <base>:<path>`) ↔ D-01 verification diff (capture BEFORE the fork injects the envelope).

</code_context>

<specifics>
## Specific Ideas

- **The unit of conversion is the Mermaid BLOCK, not the file** (D-02 AMENDMENT 1). Multi-block files identified: `lifecycle/00-overview.md` (2 blocks), `lifecycle-apv2/02-deployment-flow.md` (2 blocks — the second is a failure-annotation map with 5 dashed edges). The executor must enumerate every fence per file before converting.
- **Reconvergence/merge edges are the easiest to silently drop** and the reason the table shape wins on branch-dominant files: `lifecycle/00` `RESEAL-->S3a`, `lifecycle/03` PP-path→ESP rejoin, `macos/02` dual pipelines. LOCKED-N must count these labeled edges; the verifier must diff edge-by-edge against the raw fence BEFORE deletion.
- **Edge volume runs high:** decision-trees `00`/`01` ≈ 25-27 edge-lines (above the 16-17-edge lifecycle files) — front-load them and give them full adversarial re-derivation.
- **Semantic narrowing is a real, verified failure mode** (`8021x-triage.md:32→:56`): the verifier compares edge *condition semantics*, not just row presence.
- **EOL diff noise is expected and must NOT be "fixed" by restoring CRLF** — review the 30-file diffs with `git diff -w` / `--ignore-space-at-eol` + byte-span proof + C17.

</specifics>

<deferred>
## Deferred Ideas

- **Optional C17 hardening — `VALID_DOC_TYPES` + registry↔frontmatter cross-check** (carried from Phase-120/121 deferred): would machine-enforce the doc_type vocabulary + close the silent block-vs-registry divergence that makes D-04's careful hand-authoring + the admin-setup router ruling necessary. A future HARN/STD lever, NOT this phase.
- **Whole-class enrollment of `operations/` (~20), `device-operations/` (~5), `cross-platform/apple-business/` (~20) → v1.17+.** Enroll by directory as complete classes, never cherry-picked by filename.
- **A diagram-aware C17 assertion (leaf-parity parser)** — would convert D-04's human obligation into a machine check and retire the D-01 independent-verification pass. Large lift; explicitly out of the v1.16 frozen-harness envelope (C17 #1 stays byte-unchanged per STD-04 D-02).

### Reviewed Todos (not folded)
None — no pending todos matched this phase's scope (`todo.match-phase 122` → 0 matches).

</deferred>

---

*Phase: 122-structural-retrofit-decision-trees-carved-mermaid-files*
*Context gathered: 2026-07-07*
