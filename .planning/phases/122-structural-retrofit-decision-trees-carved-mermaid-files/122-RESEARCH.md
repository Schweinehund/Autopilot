# Phase 122: Structural Retrofit — Decision-Trees, Carved-Mermaid Files & the 9 Mermaid-bearing Lifecycle Docs - Research

**Researched:** 2026-07-07
**Domain:** Mermaid-to-text conversion + EEE structural retrofit pipeline (Node.js fork), 30-file corpus
**Confidence:** HIGH (all claims below are `[VERIFIED]` against the live repo via `Read`/`Bash`/`grep`, not training-data guesses; this is an internal-tooling phase with zero external dependencies)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

All four gray areas were resolved via **`/adversarial-review`** — a Proponent → Adversary → Referee panel of three separate Opus agents per decision, each grounded in the live repo (12 agents total; workflow `wf_d79b6f81-c08`). Full reasoning in `122-DISCUSSION-LOG.md`. **Two rulings OVERRULED their pre-stated recommendation on grounded evidence** (D-01, D-02); one is a partial-specifics overrule (D-03); one upheld (D-04).

**D-01 — Leaf-parity verification discipline → Option B (uniform coverage, tiered depth), HIGH confidence.** Every one of the 30 converted files gets an independent, read-only leaf/node/labeled-edge re-derivation pass — a separate agent re-derives the pre-conversion diagram's element set from the pre-122 Mermaid bytes (`git show <base>:<path>`) and diffs it against the converted table/list. NO file is labeled "trivial, skip." Tiering is in depth, not coverage: branch-heavy files get full adversarial re-derivation; branchless linear step-lists get the lightweight mechanical count-and-label diff. Verification agents are read-only `git show` diffs — no validator chain, no checkout, stays inside `use_worktrees:false`. Riders: (1) semantic-paraphrase check on edge condition semantics, not just row presence; (2) multi-block/subgraph/classDef enumeration; (3) stale diagram-prose grep ("click the leaf", "diagram above/below", node-shape/legend/classDef language); (4) capture LOCKED-N BEFORE the fork injects the envelope.

**D-02 — Conversion shape for non-decision diagrams → Option C bright-line + 3 amendments, HIGH confidence.** Bright-line: does the Mermaid block contain a `{...}` decision node? Yes → decision table; No → ordered numbered stage list. Amendment 1: classify PER MERMAID BLOCK, not per file (non-negotiable). Amendment 2: failure-annotation maps → `Stage | Failure Mode` table; subgraph-partitioned flows → grouped/headed sub-lists preserving the partition label. Amendment 3: drop the literal `Scenario | Leaf | Resolution` / "LOCKED — N leaves" wording; use diagram-fitted table columns with an ordinal first column where order is load-bearing, plus a container-neutral "LOCKED — N" parity annotation counting nodes PLUS labeled edges (a row OR list item). LOCK note: do NOT reopen a nested-list-for-a-single-small-fork exception on branch-light files — any diamond → table.

**D-03 — Pipeline division of labor + DEFER-121-07-B → Option A direction UPHELD; specifics PARTIALLY OVERRULED, HIGH confidence.** Two-step split: (1) human hand-authors each Mermaid→text conversion; (2) a Phase-122 fork of `retrofit-structural.mjs` injects the EEE envelope/frontmatter/VH-row/doc_id via `buildDocIdMap()` join-on-Path, fail-closed (DOC-ID-UNRESOLVED), never touching diagram content. Specific overrule 1: the fork must DELETE `MERMAID_DEFERRED_PATHS` and replace it with a fail-closed body ```` ^```mermaid ```` absence precondition (highest-severity hazard: MERMAID-ENROLL-UNGUARDED); the doc_id-presence idempotency guard (DEFER-121-07-B CR-01) must ERROR, not skip. Specific overrule 2: DROP "CRLF-symmetric write" (WR-01); keep LF-normalize; close WR-01 as WONTFIX-in-fork (all 30 targets are CRLF on disk but Phase 121 already LF-normalized directory siblings — restoring CRLF would void the byte-length proof). Specific add 3: the fork adds a multi-class router (11 decision-trees→Reference; carved admin-setup class; ca-enrollment-timing.md→Reference) + a cheap fail-closed guard: ERROR on a keyless file outside a known-Windows path allowlist. Specific add 4: decision-trees are a three-step sequence: convert (hand) → hand-mint 11 RE-index.md rows → run fork (rows MUST exist path-keyed BEFORE `buildDocIdMap()` runs). Specific add 5: fold in the DEFER-121-07-A root-cause fix — auto-fill the real retrofit date instead of the literal `YYYY-MM-DD`, and sweep the 9 known-unfilled Phase-121 files in the same commit.

**D-04 — Registry enrollment + doc_type roster → UPHELD, HIGH confidence.** (a) `docs/decision-trees/05-device-lifecycle.md` → Reference (directory precedence beats lifecycle-flavored filename — the LOCKED worked resolution). (b) All 11 decision-trees (00..10) → Reference; mint new IDs RE-207…RE-217 sequentially in path order 00→10 (05 = RE-212); the other 19 files flip Pending→Approved with existing IDs, minting nothing. Number-vs-existence nuance: the RE-207…217 numbers are NOT load-bearing; what is load-bearing is that rows exist (path-keyed) before `buildDocIdMap()` runs. RIDER: admin-setup doc_type UNPINNED upstream — the planner must make the admin-setup doc_type an explicit router ruling before coding the fork (default expectation: Guide, matching existing registry rows — this research confirms Guide is indeed the current registry value for all 9 rows). RIDER: record the 05 rationale at RE-212's registry row/review note.

### Claude's Discretion

- Exact prose of each net-new `## Summary` (≥30 words, scope statement) — layout & sourcing rule fixed, sentences not.
- Plan/wave decomposition within Phase 122 (batching the 30 files by class + interleaving convert/verify/enroll) is the planner's call — sequential-on-main-tree per `use_worktrees:false`. Front-load the 11 decision-trees (highest-value full re-derivation + the only new-ID/coordination-risk class).
- The exact high-complexity threshold that routes a file to "full adversarial re-derivation" vs. "lightweight count-and-label diff" (D-01 depth-tier) — but coverage is fixed at all 30.

### Deferred Ideas (OUT OF SCOPE)

- Optional C17 hardening — `VALID_DOC_TYPES` + registry↔frontmatter cross-check (carried from Phase-120/121 deferred) — a future HARN/STD lever, NOT this phase.
- Whole-class enrollment of `operations/` (~20), `device-operations/` (~5), `cross-platform/apple-business/` (~20) → v1.17+. Enroll by directory as complete classes, never cherry-picked by filename.
- A diagram-aware C17 assertion (leaf-parity parser) — would convert D-04's human obligation into a machine check and retire the D-01 independent-verification pass. Large lift; explicitly out of the v1.16 frozen-harness envelope (C17 #1 stays byte-unchanged per STD-04 D-02).
- Out of scope per phase boundary: nav-hub retrofit (Phase 123, RETRO-06); pandoc alias fix / descriptive-filename pass / Draft-label probe (Phase 124, PIPE-03); frozen-surface pin + close (Phase 125); the `operations/`, `device-operations/`, `cross-platform/apple-business/` directory classes (v1.17+ whole-class enrollment).
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-------------------|
| RETRO-05 | All decision-tree docs (`docs/decision-trees/*`) retrofitted to EEE, Mermaid resolved per STD-04 with every decision leaf preserved; C17 exits 0 on every decision-tree file | Per-File Mermaid Enumeration Class 1 table (exact node/edge/diamond counts for all 11 files, new IDs RE-207..217 confirmed against live registry); Architecture Patterns (bright-line classification + exemplar shapes); Common Pitfalls 1-3 (fork router/idempotency changes needed to enroll this brand-new class) |
| RETRO-07 (remainder — Phase 122's 9 files) | The 9 Mermaid-bearing lifecycle docs have Mermaid resolved per STD-04 with every leaf preserved, flip Pending→Approved, C17 exits 0; RETRO-07 closes only when all 22 lifecycle files are green | Per-File Mermaid Enumeration Class 3 table (multi-block/subgraph/reconvergence detail for all 9 files, cross-verifying CONTEXT's cited lifecycle/04-esp.md and lifecycle-apv2/02-deployment-flow.md examples exactly); Fork Surface guidance (GUIDE_DIRS already covers these paths — only the MERMAID_DEFERRED_PATHS guard blocks them) |
| RETRO-08 | The carved-mermaid files (RE-128, RE-147, 9 admin-setup carve-outs) retrofitted to EEE, Mermaid resolved per STD-04, each moves Pending→Approved; C17 exits 0 | Per-File Mermaid Enumeration Class 2 table (all 10 files' node/edge/diamond counts); Registry State verification (admin-setup doc_type = Guide, confirmed live, resolving the D-04 RIDER); Common Pitfall 2 (explicit-Set routing required since sibling admin-setup files are already enrolled) |
</phase_requirements>

## Summary

Phase 122 has two truly distinct workloads that the planner must size independently. **Workload A (the phase's namesake)** is hand-converting 31 Mermaid blocks across 30 files to C17-compliant text, per the LOCKED STD-04 bright-line (`{...}` present → decision table; sequence diagram → ordered step list; no diamond → numbered list; two named amendments for failure-annotation maps and subgraph-partitioned flows). **Workload B (undersized in the roadmap's framing but empirically larger)** is C17 assertion #12 blockquote remediation: a fresh scan using C17's own exact grouping algorithm found **74 over-200-char blockquote groups across 28 of the 30 files** (only `01-esp-failure.md`, `02-profile-assignment.md`, `03-tpm-attestation.md`, `04-apv2-triage.md`, and `06-macos-triage.md` are clean), including four outlier blocks over 1000 chars (one at 5877 chars in `macos-lifecycle/01-psso-provisioning-walkthrough.md`). This is comparable in size to Phase 117/118/121's dedicated blockquote-splitting waves and must be planned as its own task set, not folded silently into "conversion."

The retrofit-structural.mjs fork requires four concrete changes, all pinned to exact line numbers in this document: (1) delete `MERMAID_DEFERRED_PATHS` and its two call sites, replacing the guard with a fail-closed `^```mermaid`-absence precondition; (2) add a doc_id-idempotency ERROR guard (not currently present at all); (3) extend the path router with **explicit path Sets** (not directory-prefix additions) for the 11 decision-trees and 9 admin-setup carve-outs, because every sibling file in those 7 admin-setup directories is already enrolled — a directory-prefix match would attempt to reprocess already-Approved files; (4) auto-fill the literal `YYYY-MM-DD` VH-date token. Registry mechanics are simple: max ID is `RE-206` (contiguous, verified), the 19 flip-targets are confirmed present, and the admin-setup carve-outs' current registry Doc Type is **`Guide`** (verified — not an assumption), resolving the D-04 RIDER.

**Primary recommendation:** Sequence the phase as (1) fork + registry-mint prep, (2) hand-convert the 11 decision-trees with full independent re-derivation (front-loaded per CONTEXT), (3) hand-convert the 19 remaining files split LIGHT/FULL per the tiering table below, (4) run the fork per class, (5) a dedicated blockquote-remediation pass sized at ~74 groups, (6) final C17-green verification across all 30.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Mermaid→text conversion (content authoring) | Human/hand-authoring | — | Leaf-parity is unautomatable (STD-04 D-04); this is prose/table authoring, not a script's job |
| EEE envelope injection (frontmatter, block line, VH row) | Pipeline (retrofit-structural.mjs fork) | — | Deterministic, mechanical; same fork pattern as Phases 117/118/121 |
| Registry ID minting (RE-207..217) | Human (hand-edit RE-index.md) | Pipeline (join-only) | Fork never edits RE-index.md; rows must pre-exist before `buildDocIdMap()` runs |
| Leaf-parity verification | Human (read-only `git show` diff agent) | — | No validator/diagram parser exists or is in-scope; C17 cannot check this (D-04 honesty caveat) |
| C17 structural gating | Validator (c17-eee-contract.mjs) | — | Existing frozen 13-assertion atom; no changes needed this phase beyond a comment (already done in Phase 120) |
| Blockquote #12 remediation | Human (Transform A/B split) | — | Same discipline as Phase 117/118/121; word-preserving split, no validator involvement |

This is a documentation/tooling phase with no browser/API/DB tiers — the map above substitutes "pipeline vs. human" for the usual client/server split, which is the correct analog for this domain.

## Package Legitimacy Audit

**Not applicable.** This phase installs zero external packages. `retrofit-structural.mjs` and `c17-eee-contract.mjs` both use Node.js built-ins only (`node:fs`, `node:path`, `node:process`) per the established `scripts/pipeline/` and `scripts/validation/` conventions (confirmed by reading both files in full). No `npm install`, no new dependency of any kind. The Package Legitimacy Gate protocol is skipped for this phase.

## Per-File Mermaid Enumeration (the pre-conversion capture D-01 requires)

All 30 files confirmed via `git show`-equivalent live-file reads (files are at pre-122 HEAD state — none of the 30 carry `doc_id` yet, confirming the roster is genuinely unenrolled/unconverted). Node/edge counts below are **exact re-derivations**, not estimates — use these as the authoritative pre-conversion baseline for the D-01 verification pass (supersedes the CONTEXT's rough "~25-27 edge-lines" estimate for files 00/01, which this research refines to 20/23).

**LOCKED-N convention used below** = nodes + labeled edges (per D-02 Amendment 3's "container-neutral… counting nodes PLUS labeled edges" rule). Note this is a **different, larger** count than the pre-existing RE-068/`10-8021x-triage.md` precedent, which counted only terminal leaves (RE-068 = "7 leaves"; `10-8021x-triage.md`'s own "Routing Verification" table implicitly documents 5 path-rows = 5 leaves, not the 11 this new nodes+labeled-edges formula would produce). **Flag for the planner:** decide explicitly whether `10-8021x-triage.md` (already carrying a leaf-count-style table) needs its LOCKED-N annotation upgraded to the new nodes+edges convention, or whether the leaf-count convention is grandfathered for pure decision-tree files. This is not resolved by CONTEXT and should be pinned before the executor touches file 10.

### Class 1 — 11 Decision-Trees (RETRO-05, new IDs RE-207..217 in path order, doc_type = Reference — LOCKED)

| File | New ID | Blocks | Diagram Type | Nodes | Edges (total/labeled/plain) | Diamonds | Reconvergence | Existing >200c BQ groups | Recommended Tier |
|------|--------|--------|--------------|-------|------------------------------|----------|----------------|---------------------------|-------------------|
| 00-initial-triage.md | RE-207 | 1 | decision graph | 18 | 20 / 18 / 2 | 6 | Yes (4-way into TRD4) | 1 | FULL |
| 01-esp-failure.md | RE-208 | 1 | decision graph | 24 | 23 / 19 / 4 | 8 | No | 0 | FULL |
| 02-profile-assignment.md | RE-209 | 1 | decision graph | 19 | 18 / 16 / 2 | 7 | No | 0 | FULL |
| 03-tpm-attestation.md | RE-210 | 1 | decision graph | 18 | 17 / 15 / 2 | 6 | No | 0 | FULL |
| 04-apv2-triage.md | RE-211 | 1 | decision graph | 14 | 13 / 9 / 4 | 3 | No | 0 | FULL |
| 05-device-lifecycle.md | RE-212 | 1 | decision graph | 10 | 9 / 8 / 1 | 4 (Q1-Q4, LOCKED verified case) | No | 2 | FULL |
| 06-macos-triage.md | RE-213 | 1 | decision graph | 16 | 15 / 15 / 0 | 4 (incl. nested MACSSO) | No | 0 | FULL |
| 07-ios-triage.md | RE-214 | 1 | decision graph | 12 | 11 / 11 / 0 | 3 | No | 1 | FULL |
| 08-android-triage.md | RE-215 | 1 | decision graph | 14 | 24 / 24 / 0 | 5 | **Yes — heaviest in corpus** (4-way into ANDR25 and ANDE3) | 1 | FULL |
| 09-linux-triage.md | RE-216 | 1 | decision graph | 7 | 6 / 5 / 1 | 2 | No | 1 | FULL |
| 10-8021x-triage.md | RE-217 | 1 | decision graph | 6 | 5 / 5 / 0 | 1 | No | 1 | FULL |

All 11 route to **decision table** per the D-02 bright-line (every file has ≥1 `{...}` node). All 11 get **FULL** independent re-derivation per CONTEXT's explicit mandate ("branch-heavy files… get full adversarial re-derivation"). Sum across the class: 158 nodes, 161 edges (145 labeled / 16 plain). `08-android-triage.md` is the single highest-reconvergence file in the entire 30-file roster (two separate 4-way merges) — front-load it within the decision-tree wave.

**`10-8021x-triage.md` is not yet actually converted** — the file currently has BOTH the live `\`\`\`mermaid` fence (lines 27-47) AND a "Legend" section (lines 17-23) describing diamond/rounded-node shape conventions, AND the "Routing Verification" table (the cited exemplar). The fence and the Legend section must both be deleted as part of this file's own conversion task — the Legend describes mermaid-shape semantics that become stale prose the moment the fence is removed (the exact D-01 RIDER 3 / STD-04 D-03 stale-prose class). Do not treat this file as "already done" because it has a nice-looking table already.

### Class 2 — 10 Carved-Mermaid Files (RETRO-08: 9 admin-setup + RE-147, flip Pending→Approved, mint nothing)

| File | Existing ID | Blocks | Diagram Type | Nodes | Edges (total/labeled/plain) | Diamonds | Reconvergence | Existing >200c BQ groups | Recommended Tier |
|------|-------------|--------|--------------|-------|------------------------------|----------|----------------|---------------------------|-------------------|
| admin-setup-8021x/00-overview.md | RE-134 | 1 | linear graph LR | 3 | 2 / 0 / 2 | 0 | No | 2 | LIGHT |
| admin-setup-8021x/01-eap-method-overview.md | RE-135 | 1 | sequenceDiagram | 3 actors | 10 messages | 0 | No | 2 | LIGHT (convert to ordered step list per STD-04 D-03 sequence rule) |
| admin-setup-android/00-overview.md | RE-092 | 1 | flowchart TD | 8 | 10 / 8 / 2 | 1 (`CHOOSE`, 6 outcomes) | No | 1 | **FULL** (multi-branch diamond) |
| admin-setup-apv1/00-overview.md | RE-076 | 1 | linear graph LR | 8 | 7 / 0 / 7 | 0 | No | 2 | LIGHT |
| admin-setup-apv1/01-hardware-hash-upload.md | RE-077 | 1 | flowchart TD | 6 | 5 / 4 / 1 | 2 (`OEM`, `BATCH`) | No | 8 | **FULL** (≥2-diamond threshold) |
| admin-setup-apv2/00-overview.md | RE-087 | 1 | linear graph LR | 4 | 3 / 0 / 3 | 0 | No | 1 | LIGHT |
| admin-setup-ios/00-overview.md | RE-106 | 1 | flowchart TD | 10 | 9 / 8 / 1 | 1 (`CHOOSE`, 4 outcomes) | No | 1 | **FULL** (multi-branch diamond) |
| admin-setup-linux/00-overview.md | RE-128 | 1 | flowchart TD | 5 | 4 / 0 / 4 | 0 | No (fan-out only, one B→C/D/E) | 2 | LIGHT |
| admin-setup-macos/00-overview.md | RE-116 | 1 | graph LR | 11 | 12 / 0 / 12 | 0 | **Yes** (C,D,E→F; chain continues G→H→I→J→K) | 1 | **FULL** (reconvergence trips full tier despite no diamond — same principle CONTEXT applies to `lifecycle/04-esp.md`) |
| reference/ca-enrollment-timing.md | RE-147 | 1 | sequenceDiagram | 4 actors | 8 messages | 0 | No | 4 | LIGHT (convert to ordered step list) |

### Class 3 — 9 Mermaid-bearing Lifecycle Files (RETRO-07 remainder, flip Pending→Approved, mint nothing)

| File | Existing ID | Blocks | Diagram Type(s) | Nodes | Edges (total/labeled/plain) | Diamonds | Reconvergence / Subgraphs | Existing >200c BQ groups | Recommended Tier |
|------|-------------|--------|------------------|-------|------------------------------|----------|----------------------------|---------------------------|-------------------|
| lifecycle/00-overview.md | RE-192 | **2** | B1: decision graph; B2: failure-annotation map | B1=9, B2=10 | B1: 10/3/7; B2: 9/0/9 (5 dashed) | B1 has 1 (`M`) | B1 reconvergence: `RESEAL→S3a`, `S3a`+`S3c`→`S4` (Amendment 1: classify per block — B1→table, B2→Stage\|Failure table) | 1 | **FULL** |
| lifecycle/03-oobe.md | RE-195 | 1 | decision graph (flowchart LR) | 15 | 16 / 5 / 11 | 2 (`M`, `PPRESULT`) | **Yes — 3-way merge into `ESP4`** (AADUD, UDOOBE, AADSD all converge) | 4 (incl. a 1054-char "L2 Note" block) | **FULL** |
| lifecycle/04-esp.md | RE-196 | 1 | subgraph-partitioned flow | 8 | 7 / 0 / 7 | 0 | 2 subgraphs (`Device Phase`/`User Phase`) + 1 cross-subgraph edge `D4→U1` — **this is CONTEXT's own cited example of a triage undercount (7 edges/8 nodes/2 subgraphs, not "3 edges LOW")** | 3 (incl. a 1317-char "L2 Note" block) | **FULL** |
| lifecycle-apv2/02-deployment-flow.md | RE-200 | **2** | B1: linear chain; B2: failure-annotation map | B1=11, B2=13 | B1: 10/0/10; B2: 12/0/12 (5 dashed: F_REG/F_IME/F_APP1/F_SCRIPT/F_APP2 → S3/S4/S7/S8/S9 — **confirms CONTEXT's exact citation**) | 0 | B2 is the CONTEXT-cited "second block a triage missed" | 2 | **FULL** (multi-block + failure-map, despite B1 alone being LIGHT-eligible) |
| ios-lifecycle/01-ade-lifecycle.md | RE-190 | 1 | linear chain (graph TD) | 7 | 6 / 0 / 6 | 0 | No | 2 | LIGHT |
| ios-lifecycle/02-mdm-migration.md | RE-191 | 1 | linear chain (graph TD) | 7 | 6 / 0 / 6 | 0 | No | 10 (heaviest blockquote count of the whole corpus; one 656-char block) | LIGHT (diagram is simple; blockquote workload is heavy — see Workload B) |
| macos-lifecycle/00-ade-lifecycle.md | RE-204 | 1 | linear + 1 diamond | 8 | 8 / 2 / 6 | 1 (`S6`) | Yes (`S7`→`S8` merges with direct `S6`→`S8`) | 1 | **FULL** |
| macos-lifecycle/01-psso-provisioning-walkthrough.md | RE-205 | 1 | linear + 1 diamond | 11 | 10 / 2 / 8 | 1 (`Branch` — **"the psso decision node," explicitly named in CONTEXT D-01 riders**) | No (dual non-converging terminals `S9`/`S10`) | 4 (incl. the corpus-max 5877-char block) | **FULL** (explicit CONTEXT citation overrides the no-reconvergence signal) |
| macos-lifecycle/02-mdm-migration-psso.md | RE-206 | 1 | linear + 1 diamond, dual pipelines | 15 | 14 / 2 / 12 | 1 (`Gate`) | No — **confirmed dual non-reconverging pipelines** (B1: 7 stages, B2: 5 stages, no merge back together — matches CONTEXT's exact claim) | 16 (heaviest blockquote burden in the corpus; one 1480-char block) | **FULL** |

### Recommended LIGHT/FULL Tiering Summary (Claude's Discretion item per CONTEXT — this research's proposed threshold)

Rather than gating on diamond-count alone (which CONTEXT's own adversarial review proved unreliable — `lifecycle/04-esp.md` has zero diamonds but was the single worst triage-undercount example), this research recommends tiering on: **diamond present with ≥2 branches, OR reconvergence present, OR multi-block file, OR subgraph partition present → FULL. Otherwise → LIGHT.**

- **LIGHT (8 files):** `admin-setup-8021x/00`, `admin-setup-8021x/01`, `admin-setup-apv1/00`, `admin-setup-apv2/00`, `admin-setup-linux/00`, `reference/ca-enrollment-timing.md`, `ios-lifecycle/01-ade-lifecycle.md`, `ios-lifecycle/02-mdm-migration.md`
- **FULL (22 files):** all 11 decision-trees + `admin-setup-android/00`, `admin-setup-apv1/01-hardware-hash-upload`, `admin-setup-ios/00`, `admin-setup-macos/00` + `lifecycle/00-overview`, `lifecycle/03-oobe`, `lifecycle/04-esp`, `lifecycle-apv2/02-deployment-flow`, `macos-lifecycle/00`, `macos-lifecycle/01`, `macos-lifecycle/02`

This is a **recommendation**, not a lock — CONTEXT explicitly reserves the exact threshold to the planner's discretion. All 30 files still get the LOCKED-N annotation + author self-check floor regardless of tier (D-01 uniform coverage).

## Standard Stack

No new libraries. This phase extends existing zero-dependency Node.js tooling.

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Node.js built-ins (`node:fs`, `node:path`, `node:process`) | whatever Node the repo already runs | Fork of retrofit-structural.mjs, no change | Established `scripts/pipeline/`/`scripts/validation/` convention — zero external npm packages, verified by reading both scripts in full |

### Supporting
None — no new supporting libraries.

### Alternatives Considered
Not applicable — this is an internal fork of existing project tooling, not a library-selection decision.

**Installation:** None required.

## Architecture Patterns

### System Architecture Diagram

```
[docs/decision-trees/*.md]         [docs/admin-setup-*/00,01.md]      [docs/{lifecycle,*-lifecycle}/*.md]
  (11 files, unenrolled)              (9 files, Pending)                  (9 files, Pending)
        │                                    │                                    │
        ▼                                    ▼                                    ▼
  [STEP 1: HAND-AUTHOR Mermaid→text conversion per D-02 bright-line]
  {...} present? ──Yes──▶ Decision Table (node/labeled-edge rows, LOCKED-N annotation)
        │
        No
        │
        ├─▶ sequenceDiagram? ──▶ Ordered numbered step list
        ├─▶ failure-annotation map (dashed edges)? ──▶ Stage | Failure Mode table
        ├─▶ subgraph-partitioned? ──▶ grouped/headed sub-lists (partition label preserved)
        └─▶ else (branchless linear) ──▶ Ordered numbered stage list
        │
        ▼
  [STEP 1b: DELETE stale diagram-prose — Legend sections, "click the leaf", classDef color text]
        │
        ▼
  [STEP 2 (decision-trees ONLY): HAND-MINT 11 RE-index.md rows RE-207..217, path-keyed]
        │
        ▼
  [STEP 3: RUN Phase-122 fork of retrofit-structural.mjs]
   ├─ Guard: ^```mermaid absence precondition (NEW — replaces MERMAID_DEFERRED_PATHS)
   ├─ Guard: doc_id-already-present → ERROR (NEW — idempotency, never silent skip)
   ├─ Guard: buildDocIdMap() join-on-path → DOC-ID-UNRESOLVED fail-closed (existing)
   ├─ Router: decision-trees/* → Reference; admin-setup carve-outs (explicit Set) → Guide;
   │          ca-enrollment-timing.md → Reference; lifecycle dirs → Guide (existing GUIDE_DIRS)
   ├─ Platform: inject Windows only for the known-Windows keyless allowlist (NEW cheap guard);
   │          ERROR otherwise
   ├─ VH row: auto-filled real date (NEW — replaces literal YYYY-MM-DD)
   └─ Writes: frontmatter + EEE block + Summary [FILL-IN] + relocated pre-H1 span
        │
        ▼
  [STEP 4: HAND-AUTHOR ## Summary prose (>=30 words) per file]
        │
        ▼
  [STEP 5: D-01 INDEPENDENT VERIFICATION — read-only git-show diff, per-file tier]
   FULL tier (22 files): full adversarial re-derivation, semantic-paraphrase check,
                          multi-block/subgraph enumeration, stale-prose grep
   LIGHT tier (8 files): mechanical count-and-label diff
        │
        ▼
  [STEP 6: C17 #12 BLOCKQUOTE REMEDIATION — 74 groups across 28/30 files, Transform A/B]
        │
        ▼
  [STEP 7: node scripts/validation/c17-eee-contract.mjs → exit 0 on all 30 files]
        │
        ▼
  [STEP 8: Registry flip — 19 rows Pending→Approved (no new IDs); 11 rows already Approved
           at RE-207..217 from Step 2]
```

### Recommended Project Structure

No new directories. All work is in-place edits to the 30 existing files + `docs/_registry/RE-index.md` + a new `scripts/pipeline/retrofit-structural-122.mjs` (or equivalent fork name; the existing forks are all named `retrofit-<class>.mjs` — follow that convention, e.g. `retrofit-mermaid-structural.mjs`, but do NOT overwrite `retrofit-structural.mjs` itself, per the fork-don't-refactor convention already established across Phases 117/118/121).

### Pattern 1: Bright-Line Mermaid Classification (STD-04 D-02/D-03, LOCKED)

**What:** Classify each Mermaid block — not file — by presence of a `{...}` decision node.
**When to use:** Every one of the 31 blocks across the 30 files (2 files carry 2 blocks each: `lifecycle/00-overview.md`, `lifecycle-apv2/02-deployment-flow.md`).
**Example (decision table shape, from the shipped exemplar):**
```markdown
<!-- Source: docs/decision-trees/10-8021x-triage.md (STD-04-cited exemplar) -->
| Path | Step 1 (root: EAP1) | Step 2 | Destination |
|------|---------------------|--------|-------------|
| Certificate profile error | Intune cert profile shows Error or Pending | (terminal) | Runbook 38 |
| Server trust / validation failure | Trust prompt or untrusted server / RADIUS root CA missing | (terminal) | Runbook 40 |
```

### Pattern 2: Failure-Annotation Map → Stage | Failure Mode Table (D-02 Amendment 2a)

**What:** Dashed-edge (`-.->`) failure-mapping blocks convert to a 2-column table, not a nested list.
**When to use:** `lifecycle/00-overview.md` block 2, `lifecycle-apv2/02-deployment-flow.md` block 2.
**Example (verified live content, block 2 of lifecycle-apv2/02-deployment-flow.md):**
```
F_REG[Enrollment fails / APv1 conflict] -.-> S3
F_IME[IME install fails] -.-> S4
F_APP1[LOB or M365 app install fails] -.-> S7
F_SCRIPT[PowerShell script fails] -.-> S8
F_APP2[Win32 or Store app install fails] -.-> S9
```
→ becomes:
```markdown
| Stage | Failure Mode |
|-------|--------------|
| Step 3: Entra join + Intune enrollment | Enrollment fails / APv1 conflict |
| Step 4: IME installs | IME install fails |
| Step 7: LOB and M365 apps install | LOB or M365 app install fails |
| Step 8: PowerShell scripts run | PowerShell script fails |
| Step 9: Win32, Store, EAC apps install | Win32 or Store app install fails |
```

### Pattern 3: Subgraph-Partitioned Flow → Grouped Sub-Lists (D-02 Amendment 2b)

**What:** `subgraph "Label" ... end` blocks convert to headed sub-lists, preserving the partition label as a load-bearing semantic (device-before-user-login in `lifecycle/04-esp.md`).
**Example (verified live content):**
```
subgraph Device Phase
  D1[MDM enrollment] --> D2[Device policies] --> D3[Device apps] --> D4[Device phase complete]
end
subgraph User Phase
  U1[User logs in] --> U2[User policies] --> U3[User apps] --> U4[Desktop unlocked]
end
D4 --> U1
```
→ becomes two headed numbered lists ("Device Phase" / "User Phase") with an explicit transition note between them ("Device phase completes before user phase begins — `D4 → U1`").

### Anti-Patterns to Avoid

- **Nested list for a single small fork (LOCKED anti-pattern per D-02):** Do not reopen a "nested bullet list with an embedded branch" exception on branch-light files (`macos-lifecycle/00`, `ios-lifecycle/01`) — the bright line is: any diamond → table, no exceptions, even on files that "feel" simple.
- **Stale diagram-prose left behind (STD-04 D-03, explicit defect class):** Any Legend/node-shape glossary/`classDef` color explanation/"click the leaf to navigate" text describing the *removed* diagram is a defect if left in place. Confirmed present in two places this phase must handle: `10-8021x-triage.md`'s own "Legend" section (lines 17-23, in-roster) and — as a **cautionary reference only, NOT an in-scope edit** — `l2-runbooks/26-apple-business-permission-denied.md` (RE-068) line 29's "then click the leaf to the target runbook" residue, which the EEE-SOP-standard.md STD-04 section itself quotes verbatim as the canonical example of this defect.
- **Diamond-count/edge-count triage as a complexity proxy:** CONTEXT's own adversarial review proved this fails empirically (`lifecycle/04-esp.md` undercounted 2×; `lifecycle-apv2/02-deployment-flow.md`'s second block missed entirely). Do not use node/diamond count alone to justify a LIGHT tier — reconvergence and multi-block structure matter more than diamond presence (see the tiering table above).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|--------------|-----|
| EEE envelope injection (frontmatter, block line, VH row, pre-H1 span relocation) | A new from-scratch script | Fork `retrofit-structural.mjs` (per line-range guidance below) | The whole-pre-H1-span relocation logic (117/118 fix) and `detectVhColumnCount` CREATE-vs-PREPEND logic are already correct and tested; a fresh script would have to re-derive both from zero and risks regressing the byte-length-preservation proof |
| Leaf-parity checking | A Mermaid AST parser / diagram-diff tool | Human read-only `git show` diff per D-01 | STD-04 D-04 explicitly states no diagram parser exists in scope; building one is a v1.17+-scale lift explicitly deferred |
| Blockquote length checking | A hand count of characters | The exact grouping algorithm already in `c17-eee-contract.mjs` (join consecutive `>` lines, strip prefix, measure joined length) | A per-line-only check under-detects — Phase 121 discovered this the hard way (see STATE.md `[Phase 121-03]`); replicate the validator's own algorithm, do not invent a simpler one |

**Key insight:** Every mechanical piece of this phase (frontmatter injection, VH rows, blockquote-length measurement) has an existing, tested implementation somewhere in the repo already. The only genuinely novel work is the Mermaid→text conversion itself, which is explicitly human-only by design (STD-04 D-04).

## Runtime State Inventory

Not applicable — this is a content-and-tooling retrofit phase (Markdown files + a Node.js script fork + a registry table edit), not a rename/refactor/migration phase. No stored data, live service config, OS-registered state, or secrets are touched.

## Common Pitfalls

### Pitfall 1: Treating `MERMAID_DEFERRED_PATHS` deletion as a one-line change

**What goes wrong:** Deleting the `Set` declaration (lines 130-140) without also removing/replacing Guard 1b (lines 310-314), the `--all` filter (line 681), and — critically — **rewriting self-test sub-test (e)** (lines 554-577), which currently *asserts* the hard-exclusion exists (`mermaidRefused = MERMAID_DEFERRED_PATHS.has(mermaidPath)` and `allNineDeferred = MERMAID_DEFERRED_PATHS.size === 9`). If only the Set is deleted, `--self-test` will throw a ReferenceError, not silently pass.
**Why it happens:** The constant is referenced in 4 separate places in the 767-line file; a search-and-delete on the declaration alone misses the other 3.
**How to avoid:** Grep `MERMAID_DEFERRED` across the whole file before editing (4 hits expected: declaration, Guard 1b, `--all` filter, self-test sub-test e) and rewrite all 4 sites in one commit.
**Warning signs:** `--self-test` exits with a stack trace instead of a PASS/FAIL count.

### Pitfall 2: Directory-prefix routing for the new admin-setup/decision-tree classes

**What goes wrong:** Adding `'docs/admin-setup-8021x/'` etc. to `GUIDE_DIRS` (prefix-match style) instead of an explicit path `Set` (Set-match style, like `MERMAID_DEFERRED_PATHS`). Every admin-setup directory in scope has 5-14 sibling files that are **already enrolled** (verified: `grep -L doc_id` on all `docs/admin-setup-*/`.md files returns exactly the 9 target files, confirming every other file already has `doc_id`). A directory-prefix router would attempt to reprocess those already-Approved siblings under `--all`.
**Why it happens:** `GUIDE_DIRS` (the Phase-121 pattern) is prefix-based because *entire* lifecycle directories were in scope for that phase; this phase's admin-setup class is a scattered carve-out (9 files out of ~57 admin-setup files total), not a whole-directory class.
**How to avoid:** Add two new explicit `Set`s — `DECISION_TREE_PATHS` (11 entries) and `ADMIN_SETUP_CARVEOUT_PATHS` (9 entries) — and route on membership, exactly like `MERMAID_DEFERRED_PATHS`'s existing pattern, not on `GUIDE_DIRS`'s prefix pattern. This is also why the doc_id-idempotency guard (Pitfall 3) is not optional — it is the second line of defense if a router mistake ever does target an already-enrolled sibling.
**Warning signs:** `--dry-run --all` output includes files like `docs/admin-setup-ios/02-abm-token.md` in its target list.

### Pitfall 3: No doc_id-idempotency guard currently exists

**What goes wrong:** `processFile()` has zero check for a pre-existing `doc_id:` key in frontmatter before injecting a new one. Combined with Pitfall 2, a routing mistake would silently double-inject `doc_id` keys into an already-Approved file.
**Why it happens:** The original fork (Phase 121) never needed this — its `GUIDE_DIRS`/`GLOSSARY_FILES` targets were, by construction, always keyless at Phase-121 time.
**How to avoid:** Add a new Guard (recommend inserting immediately after the frontmatter-parse/TEMPLATE-SENTINEL guard, ~line 335): if `fm.match(/^doc_id:\s*\S+/m)` is truthy, `return { ok: false, error: 'DOC-ID-ALREADY-PRESENT: refusing to re-enroll' }` — **ERROR, not silent skip**, per D-03 Specific Overrule 1's explicit "match the fork's fail-closed convention."
**Warning signs:** A file's frontmatter shows two `doc_id:` keys, or `writeFileSync` overwrites an Approved file's existing block line.

### Pitfall 4: Assuming C17 assertion #11 (table >25 rows) is a risk in this batch

**What goes wrong:** Spending remediation effort on table-row-count fixes that aren't needed.
**Why it doesn't apply here:** A full table-block scan of all 30 files found the largest single table block is 21 lines (`08-android-triage.md`'s L1-action table), i.e. ≤19 data rows after subtracting header+separator — well under the 25-row threshold. **Verified, not a risk for this phase.**

### Pitfall 5: Underestimating the C17 #12 blockquote workload

**What goes wrong:** Planning this phase as "convert Mermaid, run the fork, done" and discovering mid-execution that 28 of 30 files have gate-blockquote or admonition-box violations, several requiring multi-way splits (five files carry a single block >600 chars; the worst is 5877 chars in `macos-lifecycle/01-psso-provisioning-walkthrough.md`).
**Why it happens:** The roadmap/CONTEXT frame this phase entirely around Mermaid conversion; blockquote hygiene is a carried-over, unaddressed debt from these files never having been through a Phase 117/118/121-style pass.
**How to avoid:** Size a dedicated blockquote-remediation task set (74 groups total) using the same word-preserving Transform A/B discipline and greedy packer already built in Phase 121 (`[Phase 121-03]` per STATE.md — a reusable link/backtick-aware splitter already exists in project history and should be reused/ported, not rebuilt).
**Warning signs:** C17 run reports assertion #12 violations after the fork has already run and Summary prose has already been authored — meaning the blockquote fix has to be threaded back through already-"complete" files.

## Code Examples

### The `retrofit-structural.mjs` Fork Surface — Exact Line Ranges (verified against live file, 767 lines total)

```
Source: scripts/pipeline/retrofit-structural.mjs (read in full this session)

Lines 130-140  MERMAID_DEFERRED_PATHS Set declaration       → DELETE
Lines 310-314  Guard 1b: hard-exclusion check                → REPLACE with mermaid-absence precondition
Lines 675-681  --all enumeration filter (.filter(abs =>       → DELETE (no longer needed once Guard 1b
                !MERMAID_DEFERRED_PATHS.has(...))))              is a content-based check, not a path-based one)
Lines 554-577  Self-test sub-test (e)                        → REWRITE — currently asserts the OLD exclusion
                                                                  exists; must assert the NEW mermaid-absence
                                                                  guard fires on synthetic fixture content instead
Lines 194-204  buildDocIdMap()                                → UNCHANGED (join-on-path already correct)
Lines 337-341  Guard 3: DOC-ID-UNRESOLVED fail-closed         → UNCHANGED
Lines 98-105   GLOSSARY_FILES Set                             → UNCHANGED (not this phase's class)
Lines 109-117  GUIDE_DIRS array                               → UNCHANGED (already covers the 9 lifecycle
                                                                  dirs; only Guard 1b blocks them today)
Lines 119-124  resolveDocType()                               → EXTEND: add lookups against two NEW explicit
                                                                  Sets (DECISION_TREE_PATHS → 'Reference',
                                                                  ADMIN_SETUP_CARVEOUT_PATHS → 'Guide') plus a
                                                                  single-path check for ca-enrollment-timing.md
                                                                  → 'Reference' — do NOT add directory prefixes
                                                                  (Pitfall 2)
Line 349       platform = 'Windows' default injection        → GUARD: add a cheap fail-closed check — ERROR
                                                                  if platform key is absent AND the path is
                                                                  outside a known-Windows allowlist (the 5
                                                                  keyless decision-trees 00-04 are the only
                                                                  keyless targets this phase and are confirmed
                                                                  genuinely Windows-scoped — see registry check
                                                                  below)
Lines 231-232  NEW_ROW_2COL / NEW_ROW_3COL literal            → CHANGE 'YYYY-MM-DD' to the actual retrofit
               'YYYY-MM-DD' token                                commit date (mirrors the 117-02/118-04 fix
                                                                  precedent for DEFER-121-07-A's root cause)
Line 155       readFileSync(...).replace(/\r\n/g, '\n')       → KEEP UNCHANGED (LF-normalize read; do NOT
                                                                  add a CRLF-restore write — D-03 Specific
                                                                  Overrule 2, WR-01 closed WONTFIX)
Line 745       writeFileSync(..., result.newContent, 'utf8')  → KEEP UNCHANGED (writes LF content, no CRLF
                                                                  re-insertion — confirms WR-01 is correctly
                                                                  absent already)
```

**New Guard insertion point (idempotency, Pitfall 3):** recommend immediately after the existing TEMPLATE-SENTINEL guard (current lines 330-335), before Guard 3 (doc_id resolution, line 337) — check `fm.match(/^doc_id:\s*\S+/m)` and `return {ok:false, error:'DOC-ID-ALREADY-PRESENT'}` if truthy.

**New Guard insertion point (mermaid-absence precondition):** recommend inserting right after `content` is read (current line ~320, before frontmatter parse) — replicate C17's own detection method for consistency: mask code fences, then test `bodyLines.some((l,i) => !inCodeFence[i] && /^```mermaid/.test(l))`; `return {ok:false, error:'MERMAID-STILL-PRESENT'}` if true.

### Registry State (verified via direct `grep`/`tail` of `docs/_registry/RE-index.md`)

```
Max existing ID:        RE-206 (contiguous RE-001..RE-206, zero gaps — confirmed)
New IDs to mint:         RE-207..RE-217 (11 rows, path order 00→10; 05-device-lifecycle.md = RE-212)
Registry table format:   | Doc ID | Path | Title | Doc Type | Status |
Admin-setup carve-out
  current Doc Type:      "Guide" for ALL 9 rows (RE-076/077/087/092/106/116/128/134/135)
                          — VERIFIED, not assumed. Resolves the D-04 RIDER: router should emit
                          doc_type: Guide for this class, matching existing registry state.
RE-147 current Doc Type: "Reference" (matches docs/reference/ directory precedence)
19 Pending flip-targets: RE-076,077,087,092,106,116,128,134,135,147 (carved-mermaid)
                         RE-190,191,192,195,196,200,204,205,206 (lifecycle)
                         — all 19 confirmed present via grep, exact match to CONTEXT's roster
Decision-trees in
  registry today:        NONE (confirmed via grep — the whole class is new-mint, matches roster)
```

### Conversion-Shape Exemplar Extraction

**`docs/decision-trees/10-8021x-triage.md` (STD-04-cited)** — already contains a "Routing Verification" table (`Path | Step 1 | Step 2 | Destination`, 5 data rows) sitting *alongside* the still-live `\`\`\`mermaid` fence and a "Legend" section explaining diamond/rounded-node shapes. This file is **not yet actually converted** — the fence (lines 27-47) and the Legend (lines 17-23) both need deletion as part of this file's conversion task, even though the target table shape already exists.

**`docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068)** — the first shipped conversion, **out of this phase's scope** (already Approved, not in the 30-file roster) but the canonical `Scenario | Leaf | Resolution` + `LOCKED — 7 leaves` precedent AND the cautionary stale-prose anti-example. Confirmed verbatim at line 29: `"This runbook contains a 7-leaf Mermaid decision tree (DA-9 LOCKED — 7 leaves). Start at the root, follow the matching branch, then click the leaf to the target runbook..."` — the `"click the leaf"` phrase is diagram-interaction language with no diagram present. **Do not edit RE-068 this phase** (out of roster) — use it only as the negative-example reference when instructing the executor on Pattern "stale diagram-prose."

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-------------------|---------------|--------|
| Mermaid fence retained (Phase 117/121 deferred these files with `MERMAID_DEFERRED_PATHS`) | Mermaid fence deleted, text-equivalent table/list substituted | Phase 120 (STD-04, this milestone) | C17 assertion #1 stays a hard-fail; the 30-file backlog this phase clears is the last remaining Mermaid content in the enrolled corpus |
| Leaf-count convention: "LOCKED — N leaves" (terminal outcomes only, RE-068 precedent) | Node+labeled-edge count convention ("container-neutral… nodes PLUS labeled edges") | This phase (D-02 Amendment 3) | Produces a materially larger N for the same diagram (e.g., file 10 would go from "5 leaves" to "LOCKED-11" under the new rule) — flagged above as needing an explicit planner ruling on whether to retrofit file 10's own table annotation |

**Deprecated/outdated:** `MERMAID_DEFERRED_PATHS` itself becomes dead code the moment this phase's fork ships — it existed solely to gate these 9 lifecycle files until Phase 122.

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|----------------|
| A1 | The exact insertion line number recommended for the new doc_id-idempotency guard and the mermaid-absence guard (this research suggests specific line numbers as of the CURRENT, pre-122 file state) | Code Examples — Fork Surface | Low — these are suggested insertion points, not load-bearing; the executor will re-derive exact line numbers against the file state at execution time, which may have shifted slightly if Phase 122 planning inserts other changes first |
| A2 | The recommended fork filename (`retrofit-mermaid-structural.mjs` or similar) | Recommended Project Structure | Low — purely a naming suggestion; the planner/executor may pick any name consistent with the `retrofit-<class>.mjs` convention |
| A3 | LIGHT/FULL tier recommendations in the per-file tables | Per-File Mermaid Enumeration | Medium — CONTEXT explicitly reserves this threshold to planner discretion; if the planner adopts a different threshold, the FULL-tier file count (currently 22 of 30) will shift, affecting wave/time sizing |

All package/library claims in this document are `[VERIFIED]` (read directly from the two scripts in full) or based on live `grep`/`Bash` output against the actual repo — no training-data-only claims were made about this project's own code. The three items above are flagged not because they are unverified facts, but because they are this researcher's own downstream recommendations that the planner should treat as adjustable, not as locked findings.

**If this table looks short:** that is because this is an internal-repo tooling phase — nearly everything checkable was checked directly against the live files rather than relying on external/training-data claims.

## Open Questions

1. **LOCKED-N convention retrofit for `10-8021x-triage.md`**
   - What we know: The file already has a leaf-count-implicit table (5 destination rows) built under the RE-068-style "leaf count" convention. D-02 Amendment 3 locks a *different*, broader "nodes + labeled edges" convention (would be 11 for this file, not 5).
   - What's unclear: Whether Amendment 3's convention is meant to apply retroactively to this already-drafted exemplar table, or whether the exemplar is grandfathered as "the shape to copy" while the LOCKED-N *number* itself follows the older leaf-count style for pure single-diamond star-topology files.
   - Recommendation: Planner should make an explicit ruling before the executor edits this file, and record it as a plan-time decision (not leave it to per-file improvisation, since it sets precedent for the other 10 decision-trees).

2. **Whether `admin-setup-macos/00-overview.md`'s reconvergence (no diamond, C/D/E→F fan-in) truly warrants FULL tier**
   - What we know: It has zero `{...}` diamonds — under the strict D-02 bright-line it's "no diamond → list." But it does have genuine reconvergence (three parents into one child, `F`), the exact structural feature CONTEXT calls the highest silent-loss risk.
   - What's unclear: Whether a pure navigational "guide roadmap" diagram (nodes are guide-number references, not decision outcomes) needs the same rigor as a true operational decision/lifecycle diagram.
   - Recommendation: Treat as FULL per this research's recommended tiering (reconvergence trips full regardless of diamond presence), but this is a low-stakes file (navigational only, no operator-facing decision logic) — acceptable to downgrade to LIGHT if the planner wants to trade rigor for speed here specifically.

## Sources

### Primary (HIGH confidence — direct repo reads this session)
- `D:\claude\Autopilot\.planning\phases\122-structural-retrofit-decision-trees-carved-mermaid-files\122-CONTEXT.md` — locked D-01..D-04 decisions, canonical refs
- `D:\claude\Autopilot\.planning\REQUIREMENTS.md` — RETRO-05/07/08 definitions
- `D:\claude\Autopilot\.planning\STATE.md` — phase dependency summary, accumulated decisions through Phase 121
- `D:\claude\Autopilot\scripts\pipeline\retrofit-structural.mjs` — read in full (767 lines)
- `D:\claude\Autopilot\scripts\validation\c17-eee-contract.mjs` — read in full (590 lines)
- `D:\claude\Autopilot\docs\_standards\EEE-SOP-standard.md` — STD-04 section (Mermaid policy) and Doc Type Taxonomy directory-precedence rule, read directly
- `D:\claude\Autopilot\docs\_registry\RE-index.md` — grepped for max ID, Pending rows, admin-setup Doc Type column
- All 30 target files under `docs/decision-trees/`, `docs/admin-setup-{8021x,android,apv1,apv2,ios,linux,macos}/`, `docs/reference/ca-enrollment-timing.md`, `docs/{lifecycle,lifecycle-apv2,ios-lifecycle,macos-lifecycle}/` — read directly for Mermaid block enumeration, blockquote-length scan (via a purpose-built Node.js script replicating C17's exact grouping algorithm), and table-row-count scan
- `docs/decision-trees/10-8021x-triage.md`, `docs/l2-runbooks/26-apple-business-permission-denied.md` (RE-068) — read in full for conversion-shape exemplars
- `.planning/ROADMAP.md` §"Phase 122" — 5 success criteria, cross-checked against REQUIREMENTS traceability

### Secondary (MEDIUM confidence)
None — no external/web sources were needed; this is a fully internal-repo research task.

### Tertiary (LOW confidence)
None.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new libraries, verified zero-dependency convention by reading both scripts
- Architecture: HIGH — fork line ranges verified against live file; router/idempotency gaps confirmed by direct code inspection, not inference
- Pitfalls: HIGH — blockquote/table scans run against live file content with a script replicating C17's own algorithm, not estimated
- Per-file Mermaid enumeration: HIGH — every node/edge/diamond count is a direct manual count from the live Mermaid source, not an estimate (refines and in two cases corrects the CONTEXT's own rough estimates)
- LIGHT/FULL tiering recommendation: MEDIUM — this is a recommendation on top of verified data, explicitly flagged as adjustable planner discretion

**Research date:** 2026-07-07
**Valid until:** Effectively unbounded for the file-content/registry facts (static repo state at research time) — 7 days for the "current HEAD" framing in case other phases land commits to these files before Phase 122 executes; re-verify registry max ID and roster membership at plan time if execution is delayed.

## RESEARCH COMPLETE
