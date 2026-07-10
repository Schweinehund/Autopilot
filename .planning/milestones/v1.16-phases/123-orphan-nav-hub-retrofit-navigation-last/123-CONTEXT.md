# Phase 123: Orphan Nav-Hub Retrofit (Navigation-Last) - Context

**Gathered:** 2026-07-08
**Status:** Ready for planning

<domain>
## Phase Boundary

EEE-retrofit the **4 orphan nav-hubs** — `docs/index.md`, `docs/common-issues.md`, `docs/quick-ref-l1.md`, `docs/quick-ref-l2.md` — to the EEE SOP standard (EEE header block rendered from frontmatter + net-new `## Summary`-first per D3-A + `doc_id` enrollment), each **green under the blocking C17 harness** (`scripts/validation/c17-eee-contract.mjs`). This runs **last among the content phases** ("navigation-last"): the hubs' routing/link tables reference content already committed in Phases 121–122, so hub commits post-date the content they point at (mirrors the v1.15 Phase 109/117 precedent).

**This is a PURE reformat** — verified `grep -L '^```mermaid'` → **none of the 4 contain Mermaid**, so the STD-04 Mermaid-conversion machinery (Phase 122's defining work) is entirely moot here. The phase is structurally Phase 121 (glossaries/end-user-guides reformat) applied to 4 Reference-class hubs, PLUS a nav-hub-specific **link-integrity gate** (SC2) that is the phase's signature risk.

**In scope — the 4-file roster (all currently UNENROLLED — no `doc_id`; not in `docs/_registry/RE-index.md`):**
- `docs/index.md` (363 lines) — the master platform/role routing hub
- `docs/common-issues.md` (447) — issue-triage routing hub
- `docs/quick-ref-l1.md` (262) — L1 quick-reference card
- `docs/quick-ref-l2.md` (416) — L2 quick-reference card

**doc_type = `Reference` for all 4 — LOCKED upstream (v1.16 D-07, `EEE-SOP-standard.md:151-153`),** which names these exact four files: "A nav-hub's function is routing and lookup, not a procedure; Reference is the non-procedural default for this class." NOT re-opened this phase.

**Also LOCKED upstream — NOT re-opened:**
- **D3-A layout** (Phase 121 D-03): frontmatter (prepend `doc_id`/`status`/`owner`/`doc_type`; keep existing `platform`/`last_verified`/`review_by`/`applies_to`/`audience`) → EEE header block (before H1) → `# Title` → **net-new ≥30-word scope `## Summary`** (first H2) → existing content relocated below.
- **Registry mechanics** (121 D-04/D-05): hand-author registry rows FIRST, pipeline injects `doc_id` via `buildDocIdMap()` join-on-Path, fail-closed `DOC-ID-UNRESOLVED`, never edits `RE-index.md`. Registry `Doc Type` column hand-maintained, NOT C17-cross-checked.
- **Navigation-last discipline** (SC3): satisfied by construction — Phases 121/122 are committed (2026-07-07); Phase 123 commits now post-date them. Needs only a git-history attestation at close.

**Out of scope (belongs elsewhere):** the pandoc nav-footer alias fix / descriptive-filename rename pass / Draft-label probe (Phase 124, PIPE-03/04/05); frozen-surface pin + terminal close (Phase 125); the `operations/`, `device-operations/`, `cross-platform/apple-business/` directory classes (v1.17+ whole-class enrollment). **Exception — the 12 pre-existing broken links (GA-1 below) ARE in scope** despite predating this phase, because they live inside the 4 target files and SC2 forbids broken links there.

</domain>

<decisions>
## Implementation Decisions

All 4 gray areas were resolved via **`/adversarial-review`** — a Proponent → Adversary → Referee panel of three separate Opus agents per decision, each grounded in the live repo (12 agents total). Full reasoning in `123-DISCUSSION-LOG.md`. **THREE of four rulings OVERRULED their Proponent's pre-stated recommendation on grounded evidence** (D-01 C→A, D-02 "Option B"→de-blockquote, D-03 fork-from-121→fork-from-122); D-04 upheld but downgraded to foreclosed-by-lock.

### D-01 — Link/routing-table integrity verification → Option A (automated file+anchor checker), HIGH ⚖️ OVERRULED "both (C)"
**Standing verification method = a single automated file+anchor link-checker.** The manual per-hub re-derivation layer (Proponent's C) is **dropped** — on grounded evidence it yields **zero in-scope findings**: every hub anchor into a 121/122-retrofitted file resolves (glossary term-slugs + index section-slugs are exactly the surfaces the retrofit preserved; the "anchor-drift" risk that motivated the phase is empirically ~zero). The theoretical "resolves-but-semantically-wrong-heading" residual is empty here (hub anchors don't point into Mermaid-converted body headings; any renamed heading changes its slug → the old anchor breaks → the existence checker catches it).
- **⚠ PIVOTAL — 12 REAL pre-existing broken links MUST be fixed IN Phase 123 (not deferred to 124):** `git blame` proved all 12 predate Phases 121/122 by 2+ months (2026-04-30 / 05-05 vs. 121/122's 2026-07-07):
  - **11 bad `../` prefixes in `quick-ref-l2.md`** (lines 316, 317, 318, 320, 322, 366, 367, 368, 369, 371, 373): `../operations/…` and `../admin-setup-linux/…` over-escape to repo-root (dirs live under `docs/`). The file's own line 326 (`l2-runbooks/18-…`, docs-relative) proves the convention; `docs/index.md:280` links the identical target with no `../`. Fix: drop the `../`.
  - **1 dead same-file anchor `common-issues.md:360`** `[macOS: Compliance / Access Blocked](#compliance-access-blocked)` — no heading slugs to that (candidates: `compliance-failure-or-access-blocked`, `ios-compliance--access-blocked`, `android-compliance-blocked`). This one needs a **content decision** (repoint or remove the row), not a mechanical prefix fix.
  - SC2 (`ROADMAP.md:158`) is a **state assertion** ("no broken links" in the 4 hubs) — unsatisfiable while these live. Commit the 12 fixes **separately, git-blame-attributed as pre-existing-rot cleanup**, distinct from the retrofit-drift commits, so SC2 is met literally without misrepresenting them as retrofit-induced.
- **Checker spec (this is where the correctness risk lives — do NOT under-build):**
  1. **Path resolution filesystem-relative to the LINKING file's directory** (`docs/`), normalize `..`/`.`, empty-path `#frag` → the linking file itself; run **case-sensitive / Linux-CI posture**.
  2. **Anchor resolution honors `{#id}` override FIRST, then GitHub-slug.** ⚠ The memory note "no `{#id}` overrides" is **FALSE outside glossaries** — **87 `{#id}` overrides exist** across `docs/` (l1-runbooks, operations). GitHub-slug fallback must lowercase, strip emoji/formatting, drop punctuation except hyphens, spaces→hyphens, **preserve the double-hyphen** from punctuation-between-words (e.g. `ios-compliance--access-blocked`), de-dup with `-1/-2`.
  3. **Both directions.** Outbound (every link FROM the 4 hubs) is mandatory; **inbound-to-hub is also required** because injecting `## Summary` + EEE blocks mutates each hub's own heading/anchor set — any corpus doc anchoring INTO a hub heading can break. Check corpus-wide links whose target is one of the 4 hubs.
  4. Exit nonzero with `file:line → link` per unresolved path/fragment.

### D-02 — C17 #12 over-length callout reflow → A-split for 11 + full de-blockquote for the 2 ⚠️; reject C, HIGH ⚖️ OVERRULED Proponent's "Option B"
**One uniform decision rule, applied with a per-callout #12 measurement check:** A-split (blank-line-separated blockquotes) when a clean sentence/clause boundary exists AND both halves land ≤200c; **de-blockquote to a bold-led normal paragraph** (retain any `⚠️` glyph + bold, drop the `>`) when the over-length callout is a single atomic sentence with no clean internal boundary.
- **13 over-length callouts total:** `common-issues.md`(5: lines 27, 94, 317, 334, 404), `quick-ref-l2.md`(7: 124, 237, 273, 288, 320, 339, 371), `index.md`(1: line 9).
- **The 11 multi-sentence callouts → A (split).** C17 #12 concatenates consecutive `>` lines and a truly blank line breaks the group (`c17-eee-contract.mjs:393-402`; an empty `>` line does NOT break it). Shipped exemplar: `docs/error-codes/00-index.md:21-24` (split into 97c + 189c blocks, C17-green).
- **The 2 `⚠️` ownership pointers (`quick-ref-l2.md:320`, `:371`) → full de-blockquote.** These are single atomic bold-wrapped sentences; A-split is numerically possible (measured 320→76c/155c, 371→109c/105c) but every cut falls **between the subject-list and its verb** ("…playbooks" | "are owned by [link]"), fracturing one sentence across two callout boxes. De-blockquote to `⚠️ **…**` bold-led paragraph is a **single clean word-preserving move** (D-05's second sanctioned option, `116-CONTEXT.md:136`), reads naturally ahead of the existing plain "see" pointer at `:322`/`:373`. Proponent's "Option B" (keep ≤200c lead + demote trailing sentences) is **mislabeled** — there are no trailing sentences to demote.
- **Option C (reword to fit ≤200c) is FORBIDDEN** — mandatory word-preserving policy `116-CONTEXT.md:137` ("Deleting or rewording to fit 200 chars is FORBIDDEN"), carried to v1.16 at `121-CONTEXT.md:112`. Would violate the pure-reformat envelope + risk changing safety/provenance semantics (e.g. l2:124's "MEDIUM … not official Microsoft documentation").
- **Zero GA-1 coupling:** callouts generate no heading slug, so splitting/de-blockquoting creates/renames/removes no anchor; every treatment is word-preserving so contained outbound links survive verbatim.

### D-03 — Retrofit fork base → NEW fork from `retrofit-mermaid-structural.mjs` (Phase 122, chain tip), HIGH ⚖️ OVERRULED "fork from 121"
**Fork a NEW nav-hub script from `scripts/pipeline/retrofit-mermaid-structural.mjs` (the Phase-122 fork, the chain tip)** — NOT extend `retrofit-reference.mjs` in place, NOT fork from Phase-121's `retrofit-structural.mjs`. Both 121 and 122 carry the correct **v1.16** VH literal (the Proponent's whole reason to prefer 121 over the v1.15 grandparent `retrofit-reference.mjs` was void — v1.16 is a non-differentiator between them). The 122 tip is a **strict superset**:
- **Auto-filled VH date** via `todayDate() => new Date().toISOString().slice(0,10)` (`:322-330`) — closes **DEFER-121-07-A**; forking 121 re-ships the literal `YYYY-MM-DD` placeholder (`retrofit-structural.mjs:231-232`).
- **`DOC-ID-ALREADY-PRESENT` idempotency guard** (ERROR not skip, `:446-448`) — closes **DEFER-121-07-B**; 121 has no such guard (re-run would double-stamp).
- **`MERMAID-STILL-PRESENT` fail-closed precondition** (`:415-426`) — harmless belt-and-suspenders here (all 4 hubs verified mermaid-free); keep it.
- All 122 router Sets (decision-tree / admin-setup / CA-enrollment) and the `UNKNOWN-KEYLESS-PLATFORM` guard are **inert** on nav-hubs: all 4 carry `platform: all` → `D1_MAP['all']='All Platforms'`, `platformInjected=false`, so the keyless guard is skipped and the EEE block correctly reads "All Platforms". **No base-specific misfire.**
- **Fork-not-extend** is the 6th consecutive application of the unbroken "fork, don't refactor in place" convention (116→117→118→121→122→123). Extending `retrofit-reference.mjs` would violate its own `:4-6` do-not-refactor warning; it has no idempotency guard.
- **Envelope-injection ONLY; C17 #12 is HAND-APPLIED** (per D-02). No fork has ever split blockquotes (`retrofit-mermaid-structural.mjs:55` "Does NOT … fix C17 #12"); the fork relocates the whole pre-H1 span but never splits it. #12 splits happen by hand AFTER the fork runs.
- **Strip/change from the base:** replace `main()`'s `--all` multi-class enumeration (`:890-906`) with a 4-entry `NAV_HUB_PATHS` set; add a `NAV_HUB_PATHS → Reference` branch in `resolveDocType()` (nav-hub paths currently return `null`). **Keep:** whole-pre-H1-span relocation, frontmatter injection (`doc_id`/`status: Approved`/`owner`/`doc_type: Reference`), doc_id-resolve + sentinel + idempotency guards, VH auto-fill.
- **⚠ Operational hazard:** if the inherited `--all` is left unstripped and invoked, the idempotency guard makes every already-enrolled file ERROR (safe but noisy, masks the 4 targets). Scope `--all` to `NAV_HUB_PATHS` or invoke by the 4 explicit paths.

### D-04 — `## Summary` sourcing → Option A (net-new scope Summary), VERY HIGH ✅ FORECLOSED-BY-LOCK
**A net-new ≥30-word scope `## Summary` (first H2) on all 4 hubs — foreclosed by the locked D3-A/D-03, NOT a live A-vs-B pick.** Option B (repurpose existing intro/blockquote) is precluded upstream: D3-A locks "net-new" and Phase 121 D-03 states the sourcing rule generally — "Summary sourcing = NET-NEW scope prose, NOT the repurposed coverage blockquote… repurposing would poison the lead retrieval chunk with see-also navigation links."
- **Correct rejection basis for B = LOCK + chunk-poison, NOT "no intro prose exists."** All 4 hubs DO carry a liftable "Platform coverage" blockquote above H1 (`index.md:9-10` etc.) — so B is *physically feasible* but rejected because those blockquotes contain the exact `[APv1 vs APv2](apv1-vs-apv2.md)` / `[Windows vs macOS](windows-vs-macos.md)` see-also links D-03 named as poison. (The Proponent's "3/4 have no intro" and "index intro is 26 words < 30" points are true but NOT load-bearing — do not record them as the rationale; a future editor could "fix" a word count and reopen B.)
- **Operative instruction (author):** write a net-new ≥30-word scope Summary (platforms/frameworks covered + intended audience) as first H2 on all 4, matching the RE-142 exemplar (`docs/reference/00-index.md:17-19`). **Retain** the existing intro/blockquote content **relocated below** the Summary per D3-A (the coverage blockquote's `[APv1 vs APv2]`/`[Windows vs macOS]` links must survive somewhere below for SC2 — relocate, don't delete), splitting any relocated blockquote ≤200c per D-02. Exact wording = author discretion.

### Registry (mechanical, follows 121 D-04/D-05)
- Mint **RE-218…221** in path-alphabetical order (order is cosmetic — `buildDocIdMap()` joins on Path, not RE-number): **RE-218** `docs/common-issues.md`, **RE-219** `docs/index.md`, **RE-220** `docs/quick-ref-l1.md`, **RE-221** `docs/quick-ref-l2.md`. All `Doc Type: Reference`, `Status: Approved`. Registry max verified = RE-217, zero of the 4 paths currently registered. Rows hand-authored (path-keyed) BEFORE the fork runs.
- **VH branch = PREPEND, 3-col:** all 4 hubs have exactly one `## Version History` with a 3-column `| Date | Change | Author |` header (`index:346`, `common-issues:436`, `quick-ref-l1:252`, `quick-ref-l2:404`) → `newRow3Col()` with auto-filled date + `v1.16 EEE reformat — content not re-reviewed`.

### Claude's Discretion
- Exact prose of each net-new `## Summary` (≥30 words, scope statement) — D-04 fixes layout + sourcing rule, not sentences.
- The `common-issues.md:360` dead-anchor remediation (repoint vs. remove the macOS row) — a content decision at fix-time; there is no macOS compliance heading in that file to repoint to, so may require adding an anchor or dropping the row.
- Plan/wave decomposition (batching the 4 hubs; ordering the fork run → hand #12 splits → net-new Summary authoring → link-checker → pre-existing-rot fixes) — planner's call, sequential-on-main-tree per `use_worktrees:false`.
- Whether the automated link-checker is a net-new script under `scripts/validation/` or an extension of existing slug-check tooling — planner/researcher's call; the SPEC (path resolution + `{#id}`-first + double-hyphen + inbound) is fixed.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/ROADMAP.md` §"Phase 123" — Goal + 3 Success Criteria (SC1 EEE+Summary+C17-green; SC2 link/routing accuracy — the signature risk; SC3 navigation-last git-history). Also `:83` (v1.16 VH-row literal requirement).
- `.planning/REQUIREMENTS.md` — **RETRO-06** (`:22`, the sole requirement; nav-hub enumeration + navigation-last + C17-green + routing accuracy); traceability `RETRO-06 | Phase 123 | Pending` (`:90`).
- `.planning/STATE.md` — v1.16 dependency summary; navigation-last precedent (Phase 109/117).

### The EEE standard + C17 contract (enforcement surface)
- `docs/_standards/EEE-SOP-standard.md` — **`:151-153` LOCKS nav-hub doc_type → Reference (v1.16 D-07)** naming all 4 files; D3-A layout; D-05 visible header block format; D1 platform-normalization map (`all → All Platforms`); Doc Type Taxonomy.
- `scripts/validation/c17-eee-contract.mjs` — 13-assertion contract. **#12** blockquote ≤200c, concatenates consecutive `>` lines, blank line breaks the group (`:393-402`); **#5** Summary ≥30 words (`:257-266`); **#4** Summary-is-first-H2 (`:236-246`). No link/anchor assertion exists — GA-1's checker is net-new.

### Exemplars (copy these shapes)
- `docs/reference/00-index.md` (**RE-142**) — the shipped enrolled all-platform Reference **index** exemplar: net-new scope `## Summary` (`:17-19`) + retained link-bearing intro relocated below (`:21`) = D-04 Option A executed literally. "**Platform:** All Platforms" block.
- `docs/error-codes/00-index.md:21-24` — shipped **A-split** #12 callout (blank-line-separated blockquotes, C17-green) — the D-02 exemplar for the 11.

### Pipeline + registry (D-03 / registry mechanics)
- `scripts/pipeline/retrofit-mermaid-structural.mjs` — **the fork base (Phase 122, chain tip).** Key sites: `todayDate()`/VH auto-fill (`:322-330`, DEFER-121-07-A); `DOC-ID-ALREADY-PRESENT` idempotency guard (`:446-448`, DEFER-121-07-B); `MERMAID-STILL-PRESENT` precondition (`:415-426`); `resolveDocType()` (`:176-183`, returns null for nav-hubs — add branch); `main()` `--all` enumeration (`:890-906`, replace with `NAV_HUB_PATHS`); `buildDocIdMap()` join-on-Path; `D1_MAP` (`:97`); "Does NOT fix C17 #12" (`:55`).
- `scripts/pipeline/retrofit-structural.mjs` — Phase-121 fork (the REJECTED base — still ships literal `YYYY-MM-DD` `:231-232`, no idempotency guard). Read only to confirm why 122 dominates.
- `scripts/pipeline/retrofit-reference.mjs` — Reference-native grandparent (v1.15 literal `:195-196`; do-not-refactor warning `:4-6`).
- `docs/_registry/RE-index.md` — contiguous RE-001…217, zero gaps; mint RE-218…221 (path-alpha) for the 4 nav-hubs; row format `| RE-NNN | docs/path.md | Title | Reference | Approved |`.
- `.planning/phases/121-structural-retrofit-glossaries-lifecycle-end-user-guides/121-CONTEXT.md` — D-03 (net-new Summary, LOCKED), D-04/D-05 (registry mechanics), D-08 (fork-don't-refactor); `:112` (#12 word-preserving carried to v1.16).
- `.planning/milestones/v1.15-phases/116-l1-l2-runbook-retrofit-75-docs/116-CONTEXT.md:133-140` — the MANDATORY word-preserving D-05 #12 policy (both sanctioned options: blank-line split OR de-blockquote-to-bold-paragraph; reword FORBIDDEN).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`retrofit-mermaid-structural.mjs`** (Phase-122 fork) — the direct fork base. Phase 123 forks it, replaces `main()`'s `--all` enumeration with `NAV_HUB_PATHS` (4 entries), adds a nav-hub→Reference `resolveDocType()` branch, keeps every guard + VH auto-fill.
- **RE-142 (`docs/reference/00-index.md`)** — the shipped all-platform Reference-index exemplar; net-new Summary + retained intro shape maps 1:1 onto the 4 hubs.
- **`error-codes/00-index.md:21-24`** — shipped A-split #12 exemplar.

### Established Patterns
- **Enrollment gate:** a file is "enrolled" iff frontmatter has `doc_id`. All 4 hubs are currently unenrolled (frontmatter has `platform`/`last_verified`/… but no `doc_id`/`status`/`owner`/`doc_type`).
- **Fork-don't-refactor-in-place** (unbroken 116→117→118→121→122→**123**). Envelope-injection only; #12 splits + Summary authoring are hand-work AFTER the fork.
- **Fail-closed pipeline:** every guard `return ok:false` / ERROR-not-skip. Registry rows hand-authored FIRST (path-keyed), fork fails closed on missing path.
- **Sequential-on-main-tree** (`use_worktrees:false`); the D-01 link-checker + read-only verifiers do NOT trip the chain-baseline-run-kill hazard.

### Integration Points
- Hand-minted `RE-index.md` rows (RE-218…221) ↔ `buildDocIdMap()` (rows MUST precede the fork run).
- Injecting `## Summary` + EEE block into a hub ↔ mutates that hub's heading/anchor set ↔ **inbound-to-hub links** from other corpus docs (D-01 checker must verify inbound, not just outbound).
- Fork emits a `## Summary` `[FILL-IN]` placeholder (per the reference-lineage relocation logic) ↔ author fills net-new scope prose (D-04) ↔ C17 #5 (≥30 words) / #4 (first H2).
- Relocated pre-H1 "Platform coverage" blockquote (now below Summary) ↔ any #12 over-length in it (e.g. `index.md:9`, 459c) is hand-split AFTER the fork (D-02), not by it.

</code_context>

<specifics>
## Specific Ideas

- **The 12 pre-existing broken links are the phase's hidden must-fix** (D-01) — not retrofit-induced, but SC2 forbids them in the 4 target files. Fix in-phase, separate git-blame-attributed commits. `quick-ref-l2.md` 11× `../` over-escape (lines 316,317,318,320,322,366,367,368,369,371,373) + `common-issues.md:360` dead `#compliance-access-blocked` anchor (needs content decision).
- **The `{#id}`-override reality:** 87 explicit `{#id}` anchors across `docs/` — the checker must resolve `{#id}` FIRST then GitHub-slug. The "no `{#id}`" memory note applies to glossaries ONLY.
- **Double-hyphen slug trap** recurs here: `iOS: Compliance / Access Blocked` → `ios-compliance--access-blocked` (the sibling anchor at `common-issues.md` that DOES resolve, one line above the broken macOS one). A naive slugifier that collapses `--` mis-resolves.
- **All 4 hubs are `platform: all`** → EEE block reads "All Platforms"; the fork's keyless-platform guard never fires.
- **Check inbound-to-hub links** — inserting `## Summary` pushes the self-TOC H2 to second position (harmless for C17 #4) but the hubs' own section slugs (`#macos-ade-quick-reference`, etc.) are name-derived so inbound stays valid; still verify corpus-wide since the retrofit touches the hub heading set.

</specifics>

<deferred>
## Deferred Ideas

- **A diagram-aware / link-aware C17 assertion** — folding the GA-1 link-checker into C17 as a 14th assertion would convert the standing gate from a phase-local script into the frozen harness. Out of the v1.16 frozen-harness envelope (C17 stays 13 assertions, byte-unchanged); a future HARN lever.
- **Descriptive-filename rename pass** (Phase 124, PIPE-04) — will re-touch nav-hub link targets; the D-01 checker should be re-runnable so Phase 124 can re-validate after renames.
- **Whole-class enrollment of `operations/`, `device-operations/`, `cross-platform/apple-business/` → v1.17+** — the `quick-ref-l2.md` links into `operations/` resolve to existing-but-unenrolled files; enrolling those classes is future work.

### Reviewed Todos (not folded)
None — `todo.match-phase 123` → 0 matches.

</deferred>

---

*Phase: 123-orphan-nav-hub-retrofit-navigation-last*
*Context gathered: 2026-07-08*
