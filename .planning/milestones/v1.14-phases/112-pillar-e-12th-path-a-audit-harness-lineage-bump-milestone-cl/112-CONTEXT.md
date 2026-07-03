# Phase 112: Pillar E — 12th Path-A Audit-Harness Lineage Bump + Milestone Close - Context

**Gathered:** 2026-07-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver **HARN-01, HARN-02, HARN-03** — the 12th Path-A audit-harness lineage bump (v1.4→v1.14), per-phase validators for all v1.14 content/tooling phases (101–112), the V113 close-gate-SHA pin, the 3-axis terminal re-audit with cross-OS EXACT MATCH, and the v1.14 milestone close (22/22 requirements Validated). This is the **MUST-BE-LAST / SOLE-DELIVERABLE** close phase — it executes only after content/tooling phases 101–111 are complete (they are). Mirrors v1.13 Phase 100 / v1.12 Phase 95.

**In scope (tooling/close only):** the two indivisible atoms (Atom 1 = `v1.14-milestone-audit.mjs` + `v1.14-audit-allowlist.json` + BASELINE_18; Atom 2 = `check-phase-101..112.mjs` + `_lib/frozen-at-close.mjs` V113 pin + 11th CI workflow); **the chain-green precondition work (D-00)**; the 3-axis re-audit; the close-gate doc set; single close-gate commit (NO Commit A).

**Out of scope:** ANY `docs/*` corpus edit (freshness re-stamp explicitly rejected — see D-00/§freshness); fixing deferred docs-content items (route to DEFERRED-CLEANUP); editing the byte-frozen `v1.4–v1.13-milestone-audit.mjs` harnesses, their `*-audit-allowlist.json` sidecars, or their `*-integrity.yml` workflows (see D-00a for the precise frozen surface).

**How the decisions were reached:** Resolved via `/adversarial-review` (Finder → Adversary → Referee, all Opus, ground-truthed against the live harness by running the audits). The Finder surfaced a live chain-RED landmine the original 4 gray areas assumed away; the Adversary reproduced it verbatim (0 disproves — the case was empirically airtight); the Referee independently reproduced it (catching and correcting a cwd false-negative in its own first run), resolved the "90-day freshness = deliberate?" question, and confirmed the v1.7 `79c65c6` sidecar-rebase precedent. Full trail in DISCUSSION-LOG.md. The one irreducible doctrine choice (how to reconcile the RED predecessor audits) was decided by the user: **NESTED-guard**.

</domain>

<decisions>
## Implementation Decisions

### D-00 (CHAIN-GREEN PRECONDITION — resolve BEFORE authoring Atoms 1–2)

**The single most important finding: the v1.14 apex chain cannot reach GREEN under the two atoms as originally specified, because the tree is already chain-RED at HEAD.** This is a hard precondition, not a discovery to make mid-execution.

**Empirically verified (both agents + referee reproduced):**
```
node scripts/validation/v1.13-milestone-audit.mjs → 10 pass, 5 FAIL, EXIT 1   (C2,C5,C7,C9,C10)
node scripts/validation/v1.12-milestone-audit.mjs → 10 pass, 5 FAIL, EXIT 1   (identical)
# at v1.13-close SHA ba24f1a (cwd INSIDE that worktree): 15/15 PASS, EXIT 0 → breakage is NEW to v1.14
```

**Root cause (two committed regressions, working tree clean):**
- `eae49f7` (Phase 101-05): appended an 802.1X see-also banner to `docs/_glossary-android.md` → **+1 to every tracked line** AND bumped Android/Linux `review_by` to a **90-day** window.
- `6306da8` (Phase 109-01): added a Network-Auth row to `docs/reference/android-capability-matrix.md` → shifted the AMAPI row `:54 → :55`.

**Why it gates the chain (both OSes, NOT a deep-nest artifact):** `check-phase-95.mjs` and `check-phase-100.mjs` each carry an `AUDIT-HARNESS` step that runs their milestone audit via `execFileSync(..., {cwd: process.cwd()})` against the **LIVE** tree. Unlike the CHAIN step, the **AUDIT-HARNESS step has NO `NESTED` guard**. Apex `check-phase-112` (`CHAIN_PHASES=[48..111]`) nest-invokes 95/100 → their AUDIT-HARNESS re-runs the frozen v1.12/v1.13 audit against evolved live corpus → EXIT 1 → CHAIN-95/CHAIN-100 FAIL → apex RED. These are fast `readFileSync` checks → they fail on **Windows AND Linux** (this is NOT the WINDOWS-CLONE-DEEPNEST timeout).

**Two failure classes:**
- **Class 1 — line-pin drift (C2 supervision, C7 bare-Knox, C9 COPE):** frozen sidecars pin `_glossary-android.md:17` etc.; live is +1. Sidecar-repointable in principle.
- **Class 2 — freshness (C5 Android, C10 Linux):** `if (diffDays > 60)` is **hardcoded in the frozen `.mjs`** (v1.13-milestone-audit.mjs:406,542); the only exemption is the `1970-01-01` template sentinel. **No per-file sidecar valve.** The 90-day live value is a **deliberate v1.14 requirement** (see below) — reverting corpus to 60d is the WRONG fix.

**The 90-day freshness is DELIBERATE, not accidental** (settled — do not re-litigate): REQUIREMENTS.md discuss-flag #7 ("90-day Android version-gated vs 180-day stable"); `101-CONTEXT.md:88` locks "90-day cadence, apply to all four new files"; committed frontmatter is exactly `last_verified 2026-06-29 / review_by 2026-09-27` (90d). The frozen 60d rule ("Phase 34 D-14 Android cadence") is **superseded** by v1.14. Root architectural cause: the frozen-audit-against-**live**-corpus design assumes corpus invariants are monotonic (never relaxed); v1.14 is the first milestone to *loosen* one.

**D-00a — Byte-unchanged surface reframed (both prior agents were over-broad).** The byte-unchanged-predecessor invariant covers the **`v1.4–v1.13-milestone-audit.mjs` harnesses + their `*-audit-allowlist.json` sidecars + the `audit-harness-*-integrity.yml` workflows** — NOT the `check-phase-NN.mjs` chain validators. Proof: Phase 111 (`4a2d0b6`, TOOL-01) **already edited `check-phase-95.mjs` and `check-phase-100.mjs`** this milestone. Editing a `check-phase` validator is in-class chain maintenance; editing a frozen milestone-audit `.mjs`/sidecar/workflow is not.

**D-00b — Precedent `79c65c6` is real.** In v1.7 (Phase 68) the predecessor v1.5 sidecar was broad-rebased +1 after a Phase-62 banner shift → predecessor **sidecar line-pins** have historically been treated as rebasable coordinate maps, not byte-frozen. (Retained for the record; the chosen NESTED-guard route means sidecars are NOT touched — see D-00-RESOLUTION.)

**D-00-RESOLUTION — NESTED-guard (user decision, 2026-07-02):**
Add a **`NESTED` guard to the `AUDIT-HARNESS` step of `check-phase-95.mjs` and `check-phase-100.mjs`** (mirroring the guard already on their CHAIN step) so that **when invoked nested (`CHECK_PHASE_NESTED=1`), the predecessor apex skips re-validating evolved live corpus** — it still validates its own close SHA when run standalone. This greens the apex chain for **BOTH classes at once** without touching any frozen `.mjs`/sidecar/workflow. Architecturally it expresses the correct principle: *a frozen milestone-audit validates its own close-SHA corpus, not future live corpus.*
- **Mandatory companion:** scope the `audit-harness-v1.12-integrity.yml` / `audit-harness-v1.13-integrity.yml` **path-filters** so they do NOT trigger on v1.14-only corpus changes (otherwise those standalone CI workflows go RED on v1.14 corpus). Confirm whether path-filter scoping counts as a frozen-workflow edit (D-00a: workflows ARE frozen) — if it does, prefer a v1.14-side exclusion or document the standalone-workflow RED as a known, path-filter-scoped condition. **Flag for planner to resolve the frozen-workflow-vs-path-filter tension explicitly.**
- **Do NOT** add phases to `CHAIN_SKIP` to force green — `V-SELF` hard-asserts `CHAIN_SKIP.size === 0` (`check-phase-100.mjs:154-157`); this is the disqualified force-green path.

### D-01 (GA1): Validator needle derivation for check-phase-101..112

- **Option A — inline-derive needles** in each `check-phase-NN.mjs` from that phase's `CONTEXT.md` + committed edits. NO retroactive `NEEDLE-SPEC.md` (none exist for 101–111; verified). This is the Phase-96 / Phase-100-D-01 precedent (`check-phase-96.mjs` shipped before the needle-spec convention and derived inline).
- **Land-not-preexisting:** needle only strings that LANDED in each phase; never a string that pre-dated the phase (false-green risk). Especially **Phase 110** modified PRE-EXISTING files (`docs/index.md`, `quick-ref-l1.md`, `common-issues.md`) → needle only the POST-110 corrected phrases (WR-01 fix at `quick-ref-l1.md:106`, IN-01 at `common-issues.md:254`, count fix at `index.md:108`). Verified these fixes landed and are discriminating.
- **Phase 111 (tooling refactor) validator:** `check-phase-111` asserts **presence + CONSUMPTION of the refactored constructs**, not full byte-equivalence — but TOOL-01's needle **MUST assert `execFailDetail` is CALLED at the wrapper sites, not merely imported** (an unused import is a false-green; `4a2d0b6` consumed it at 40 sites). Caution (LOW): needling other validators' source is mildly self-referential — a future v1.15 tooling refactor of `check-phase-48/60/61` must preserve these tokens or trip a v1.14 apex needle. Keep tokens minimal/stable.
- **FIX-01 count needle** must be **range-tolerant / full-phrase**, not a bare integer (`"9 macOS L1 runbooks — 6 ADE plus 3 Platform SSO; see row below"`), because the count depends on 802.1X runbook #38-41 ordering.
- **`_lib/frozen-at-close.mjs` V-pin:** currently ends at **V112 = `12f2c7b`; there is NO V113 entry**. Append **V113 = `ba24f1a`** (confirmed: `docs(100-04)` Phase-100 close-gate; 15/15 GREEN there). Additive, matches the ladder — predecessors byte-unchanged.

- **D-01a (MANDATORY — locked in EVERY branch; both prior agents missed it):** HARN-01 says "C1–C16 inherited **verbatim**," but inheriting C5/C10 verbatim means **v1.14's OWN `v1.14-milestone-audit.mjs` FAILS on v1.14's OWN 90d corpus**. Atom 1 MUST **bump the v1.14 audit's C5/C10 threshold to 90 days** (or make the cadence frontmatter-declared). This is a NEW file — editing it is free and in-scope. Without it the current-milestone AUDIT-HARNESS (`check-phase-112`) is RED against its own corpus. This is the "Path-A-born-stale" objection, upheld.

### D-02 (GA2): v1.14-DEFERRED-CLEANUP.md scope — drop-resolved / carry-verbatim / add-new

- **DROP (record Closed in `v1.14-MILESTONE-AUDIT.md`):** the v1.13 docs backlog that Phase 110 FIXED — **WR-01** (`quick-ref-l1:101`), **IN-01** (`common-issues:242-247`), **docs/index:108 stale count**, **MIGF-01/02** migration walkthroughs. Verified live these are genuinely resolved.
- **CARRY verbatim ("do NOT mask via deletion"):** `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (now at depth `[48..111]`, worse), `MTPSSO-01/02/03` / `PSSO-FUT-03` (multi-tenant PSSO), `KRBFUT-01/02`, `CI-3` Managed-Apple-Account rename (allowlist still tracks 45 occurrences), AOSP-wired 802.1X, Cloud PKI / Intune Certificate Connector deep-dive. None appear falsely-resolved.
- **Freshness (C5/C10) is NOT a DEFERRED-CLEANUP item** — it is a live invariant collision resolved *at close* via D-00-RESOLUTION (NESTED-guard), not deferred. Record the 90d-supersession + NESTED-guard rationale honestly in `v1.14-MILESTONE-AUDIT.md`.
- **ADD new v1.14 deferrals (candidates):** the O(n²) chain-runner subprocess-caching remediation for WINDOWS-CLONE-DEEPNEST (2–4h, out of close scope); the stale `frozen-at-close.mjs:5-9` header (now factually false post-Phase-111 — "helpers REMAIN INLINE" no longer true; documentation-drift cleanup).

### D-03 (GA3): Chain handling + honest accounting

- `CHAIN_PHASES = [48..111]` = **64 entries** (verified 111−48+1=64; mirrors `check-phase-100.mjs` `[48..99]`=52 via the `[48..N-1]` apex invariant, N=112). Authoring `[48..112]` would trip V-112-SELF self-reference.
- `CHAIN_SKIP = new Set([])` — mandatory; `V-SELF` hard-asserts size 0. Force-green via CHAIN_SKIP is DISQUALIFIED.
- "Linux-GHA-authoritative for BOTH chain validators" = the apex `check-phase-112` + the continuity validator (`check-phase-95`-style), and applies **ONLY to the WINDOWS-CLONE-DEEPNEST timeout dimension** at depth `[48..111]`. It does NOT launder the D-00 corpus failures (those fail on both OSes and are cured by the NESTED-guard instead).
- Byte-unchanged reframed per D-00a: editing `check-phase-95/100` (NESTED-guard) is in-class; the frozen surface is the milestone-audit `.mjs` + sidecars + integrity workflows.

### D-04 (GA4): 3-axis terminal re-audit + allowlist

- **3-axis re-audit** unchanged in shape from Phase-100: Axis 1 fresh `git clone --no-hardlinks` into `$env:TEMP\v1.14-audit-<rand>`; Axis 2 cross-OS Linux GHA; Axis 3 fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH. With the NESTED-guard in place the apex is GREEN on both OSes for the corpus dimension, so EXACT-MATCH is a GREEN match (not the RED/RED that would obtain without D-00-RESOLUTION).
- **WINDOWS-CLONE-DEEPNEST at `[48..111]`** (12 subprocess trees deeper than v1.13's `[48..99]`): Windows leaf-axis runs fine; chain validators Linux-GHA-authoritative for the timeout dimension; document as a known Windows-only non-blocker; do NOT do the O(n²) runner rewrite (deferred, out of scope). OOM-vs-timeout flip is low-risk (linear growth under `CHECK_PHASE_NESTED=1`) but note it's unmeasured at the new depth.
- **`v1.14-audit-allowlist.json`** (Path-A copy of v1.13's): a naive copy is **born stale** — it must **repoint the pins that Phase 101/109 shifted** in `_glossary-android.md` (+1) and `android-capability-matrix.md` (`:54→:55`; STATE:358 named only the former — include BOTH, and check for non-uniform per-section offsets). NOTE: `docs/index.md`/`quick-ref-l1.md`/`common-issues.md` carry **0 line-pins** in the sidecar, so Phase-110's edits need no repoint there. The repoint is on the NEW v1.14 sidecar (in-scope); the frozen predecessor sidecars are NOT touched (NESTED-guard route).

### Claude's Discretion (mechanical — resolve at research/plan time)
- Exact stable-token strings for each needle (subject to D-01 land-not-preexisting + uniqueness + consumption rules).
- The BASELINE_18 value and the precise NESTED-guard implementation (mirror the existing CHAIN-step NESTED short-circuit in `check-phase-100.mjs:91-92`).
- The exact `audit-harness-v1.12/v1.13-integrity.yml` path-filter scoping edit (or the documented-RED alternative if workflow edits are ruled frozen) — planner to resolve the frozen-workflow-vs-path-filter tension.
- DEFERRED-CLEANUP / MILESTONE-AUDIT prose structure (mirror v1.13).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Chain-green precondition (D-00 — read FIRST)
- `scripts/validation/check-phase-100.mjs` — v1.13 apex; the CHAIN step NESTED short-circuit (~lines 91-92) is the template for the D-00-RESOLUTION guard; the **AUDIT-HARNESS step (~121-141) that lacks a NESTED guard** is the thing to fix; `CHAIN_PHASES=[48..99]` and `V-SELF CHAIN_SKIP.size===0` (~154-157).
- `scripts/validation/check-phase-95.mjs` — v1.12 continuity apex; same AUDIT-HARNESS step to guard.
- `scripts/validation/v1.13-milestone-audit.mjs` — C5/C10 hardcoded 60d threshold (~lines 406, 542; template sentinel `1970-01-01` exemption ~401); C2/C7/C9 line-pin logic; path resolution `join(process.cwd(), relPath)` (~line 51 — the cwd trap that produced the referee's false-negative).
- `scripts/validation/v1.12-milestone-audit.mjs` — identical failure surface.

### Atom 1 (harness + freshness threshold)
- `scripts/validation/v1.13-milestone-audit.mjs` — Path-A C1-C16 source to inherit for `v1.14-milestone-audit.mjs` (with D-01a 90d C5/C10 bump).
- `scripts/validation/v1.13-audit-allowlist.json` — sidecar template; note `_glossary-android.md` (20 pins) + `android-capability-matrix.md` (8 pins) are the ones needing +1 repoint in the NEW v1.14 sidecar; `index.md`/`quick-ref-l1.md`/`common-issues.md` have 0 pins.
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_18 freshness comment lands here (BASELINE_17 = v1.13 predecessor).

### Atom 2 (validators + frozen pin + CI)
- `scripts/validation/check-phase-95.mjs` / `check-phase-100.mjs` — per-phase validator + apex templates for check-phase-101..112.
- `scripts/validation/check-phase-96.mjs` — the inline-needle-WITHOUT-needle-spec precedent for GA1 (`:4-14, 32-33, 98-101`).
- `scripts/validation/_lib/frozen-at-close.mjs` — V-pin ladder; ends at `V112:'12f2c7b'`; **append `V113:'ba24f1a'`**; note the stale `:5-9` header (D-02 add-new).
- `scripts/validation/_lib/exec-fail-detail.mjs` — Phase-111 TOOL-01 helper; check-phase-111 must assert CONSUMPTION of `execFailDetail`, not import.
- `.github/workflows/audit-harness-v1.13-integrity.yml` — template for the 11th CI workflow `audit-harness-v1.14-integrity.yml`; also the file whose path-filter (with v1.12's) the D-00-companion must scope.

### Needle sources (one per content/tooling phase — no NEEDLE-SPEC.md exists)
- `.planning/phases/101-*/101-CONTEXT.md` … `.planning/phases/111-*/111-CONTEXT.md` — inline-derive needles from each phase's CONTEXT + committed edits.
- Live spot-check targets for land-not-preexisting: `docs/index.md:108`, `docs/quick-ref-l1.md:106`, `docs/common-issues.md:254` (Phase 110 landed strings).

### Close-artifact precedents + doctrine
- `.planning/milestones/v1.13-phases/100-harness-lineage-bump-terminal-re-audit-milestone-close/100-CONTEXT.md` — the direct precedent (D-01..D-04 format, land-not-preexisting, `[48..N-1]` invariant, CHAIN_SKIP self-disqualifier, "ANY docs/* edit out of scope" lock).
- `.planning/milestones/v1.13-DEFERRED-CLEANUP.md` + `.planning/milestones/v1.13-MILESTONE-AUDIT.md` — carry/drop doctrine + cross-OS table format.
- `.planning/REQUIREMENTS.md` — HARN-01/02/03 (~53-55); discuss-flag #7 (~line 100, the 90d freshness decision).
- `.planning/STATE.md` — Phase 112 dependency spec (~233-264); allowlist +1-offset note (~358).
- git precedent: `79c65c6` (v1.7 predecessor-sidecar broad-rebase); root causes `eae49f7` (Phase 101), `6306da8` (Phase 109); V113 close-gate `ba24f1a`.

</canonical_refs>

<code_context>
## Existing Harness-Lineage Insights

### Reusable Assets
- **Path-A milestone-audit pattern** (`v1.13-milestone-audit.mjs` C1-C16) — copy verbatim, relabel v1.14, **bump C5/C10 to 90d** (D-01a).
- **Per-phase validator template** (`check-phase-95/100.mjs`) — V-SELF + CHAIN + AUDIT-HARNESS structure; clone for 101..112.
- **CHAIN-step NESTED short-circuit** (`check-phase-100.mjs:91-92`) — the exact pattern to replicate on the AUDIT-HARNESS step (D-00-RESOLUTION).
- **frozen-at-close.mjs V-pin ladder** — append V113; predecessors byte-unchanged.
- **CI coexistence workflow** (`audit-harness-v1.13-integrity.yml`) — clone as the 11th; v1.4–v1.13 byte-unchanged.
- **Close-artifact templates** (v1.13 MILESTONE-AUDIT + DEFERRED-CLEANUP).

### Established Patterns
- **Indivisible atoms** (Atom 1 = audit+allowlist+BASELINE; Atom 2 = validators+frozen-pin+CI); single close-gate commit (NO Commit A).
- **Frozen surface = milestone-audit `.mjs` + sidecars + integrity workflows** (NOT check-phase-NN validators — Phase 111 edited those). (D-00a)
- **3-axis terminal re-audit** — fresh clone + cross-OS Linux GHA + fresh sub-agent; cross-OS EXACT MATCH.
- **Sequential-on-main-tree** (`use_worktrees:false`).

### Integration Points
- check-phase-101..112 wrap (do not edit) the committed content of phases 101–111.
- The NESTED-guard on check-phase-95/100 is the join point that greens the apex chain against evolved v1.14 corpus.
- DEFERRED-CLEANUP ← carried open items; MILESTONE-AUDIT ← resolved-item closures + 90d-supersession rationale + cross-OS table.

</code_context>

<specifics>
## Specific Ideas / Execution Cautions (from the adversarial review)

1. **Run the audits from the correct cwd.** `v1.1x-milestone-audit.mjs` resolves paths via `process.cwd()`, not `__dirname` — a fresh-clone/worktree axis must `cd` INTO the checkout before running or it reads the wrong tree (this produced a false-negative during the review; corrected read at `ba24f1a` = 15/15 GREEN).
2. **D-00 first.** Do not author Atoms 1–2 until the NESTED-guard + 90d-threshold precondition is designed — the apex is RED at HEAD and the close cannot go green blind.
3. **D-01a is non-optional.** v1.14's own audit inherits C5/C10; bump them to 90d or the current-milestone audit fails on its own corpus.
4. **TOOL-01 needle asserts CONSUMPTION**, not import presence (false-green).
5. **Allowlist repoint covers TWO files** (`_glossary-android.md`, `android-capability-matrix.md`), possibly non-uniform per-section offsets; `index/quick-ref/common-issues` have no pins.
6. **CHAIN_PHASES=[48..111] (64), CHAIN_SKIP=new Set([])** — never add entries (V-SELF size-0 hard-assert); `[48..111]` not `[48..112]`.
7. **V113 = `ba24f1a`** appended to `frozen-at-close.mjs` (currently tops out at V112).
8. **Path-filter/frozen-workflow tension** for the integrity-CI scoping companion (D-00-RESOLUTION) — planner must resolve whether editing `audit-harness-v1.12/v1.13-integrity.yml` path-filters counts as a frozen-surface edit, or use a v1.14-side exclusion / documented-RED-standalone alternative.

</specifics>

<deferred>
## Deferred Ideas

- **O(n²) chain-runner subprocess-caching remediation** for `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (2–4h) — out of close scope; route to `v1.14-DEFERRED-CLEANUP.md`.
- **Multi-tenant PSSO** (MTPSSO/PSSO-FUT-03), **KRBFUT-01/02**, **CI-3** Managed-Apple-Account rename, **AOSP-wired 802.1X**, **Cloud PKI deep-dive** — carried open verbatim to a future milestone.
- **Stale `frozen-at-close.mjs:5-9` header** cleanup (now factually false post-Phase-111) — documentation-drift item; route to DEFERRED-CLEANUP.
- **Corpus freshness re-stamp to 60d** — explicitly REJECTED (would undo committed v1.14 discuss-flag-#7 / 101-CONTEXT:88 decision); resolved instead via the NESTED-guard, not a corpus edit.

</deferred>

---

*Phase: 112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl*
*Context gathered: 2026-07-02*
