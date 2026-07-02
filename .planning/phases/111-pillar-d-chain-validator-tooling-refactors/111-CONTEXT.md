# Phase 111: Pillar D — Chain-Validator Tooling Refactors - Context

**Gathered:** 2026-07-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Three DRY refactors to the chain-validator tooling under a **behavior/verdict-equivalence
invariant** on all predecessor frozen surfaces (full chain must exit 0 after each atomic
commit):

- **TOOL-01** — centralize the `(stdout + stderr).slice(0, N).trim()` failure-detail
  pattern into a new `scripts/validation/_lib/exec-fail-detail.mjs`; consume it at all
  CHAIN/AUDIT/helper-spawn wrapper sites (~18–21 sites); no inline duplicates remain.
- **TOOL-02** — replace the ~13 inline frozen-aware readers in
  `check-phase-{61,67,68,70}.mjs` with calls to the centralized
  `_lib/frozen-at-close.mjs` module (D-02 LOCKED Option C); behavior byte/verdict-equivalent.
- **TOOL-03** — fix the 3 helper-spawn stderr-only catch blocks in
  `check-phase-{48,60,61}.mjs` to capture both stdout and stderr, keyed on the
  `--self-test` discriminator.

**Not in scope:** no new validation coverage, no new checks, no scope beyond restructuring
existing duplicated code. New checks/coverage belong in Phase 112 (Pillar E) or later.
</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via a scored adversarial review (Finder → Adversary →
Referee, Opus). The Finder raised flaws across all 12 options; the Adversary refuted **none**
after reading the real validators; the Referee ruled one winner per decision. The high-value
output was **five code-verified landmines** (see Cross-Cutting Constraints) that the
ROADMAP's "mechanical refactor" framing hides.

### Plan Granularity
- **D-01 (WINNER 1b):** Execute all three refactors as **one combined plan** with atomic
  commits inside — NOT three separate plans. Rationale: the file-overlap graph is fully
  connected (TOOL-01/02/03 all edit `check-phase-61`; TOOL-01+TOOL-02 both edit
  `check-phase-68`), and with worktrees unreliable here (sequential main-tree execution),
  splitting buys zero parallelism and only adds handoff/re-entry cost on the shared files.
  Atomic commits inside the plan preserve rollback isolation.
  - *Rejected:* 1a (three plans — max handoffs, no parallelism benefit); 1c (two plans —
    rationale is self-inconsistent: `check-phase-68` is co-touched by both proposed plans).

### Slice-Length (N) Handling
- **D-02 (WINNER 2a):** The centralized helper **parameterizes N and preserves each site's
  value** (N=500 for the `check-phase-N FAIL:` / trimmed `harness FAIL:` sites; N=300 for
  the no-trim `harness FAIL:` sites). Rationale: `result.detail` is printed **verbatim** by
  the runner, so the safe reading of the invariant is **string-equivalence, not just
  verdict-equivalence**. Explicit per-site N is byte-preserving AND diff-auditable — no
  default can silently mask an omitted override.
  - *Rejected:* 2b (normalize to 500 — changes observable bytes of the ~18 N=300 sites =
    string-equivalence violation); 2c (default 500 — footgun: any missed 300-site silently
    lengthens output, invisibly).

### Byte-Equivalence Verification
- **D-03 (WINNER 3a):** Verify via **full-chain output diff with FORCED failure/VERBOSE
  rendering** — capture verdicts + detail bytes before refactor, refactor, re-run, assert
  identical. Rationale: the runner renders `detail` only when `!pass || skipped || VERBOSE`
  (`check-phase-100.mjs:174,183`), so a green→green diff proves nothing about the exact
  lines under refactor. Verification MUST exercise the failure path (inject a failing/
  unreadable SHA or non-zero exit, or run VERBOSE) and MUST include an unreadable-SHA case
  to confirm SKIP is preserved (Landmine B).
  - *Rejected:* 3b (per-site `--self-test` — those sites ARE the TOOL-03 targets = circular;
    covers none of the ~40 detail sites); 3c (review-only — exactly what misses the
    verdict-flipping landmines).

### Helper API Contract (exec-fail-detail.mjs)
- **D-04 (WINNER 4a):** `execFailDetail(stdout, stderr, { n, trim, prefix })` — takes
  **separate raw `stdout`/`stderr` args** and parameterizes **all three varying axes**
  (prefix, N, trim). Rationale: only a 3-axis-parameterized helper reproduces every variant
  byte-for-byte, and separate raw args serve both the non-throwing spawn-result sites
  (`.stdout`/`.stderr`) and the catch-block TOOL-03 sites (`err.stdout`/`err.stderr`, now
  capturing BOTH streams as required). Every call site passes `n`, `trim`, and `prefix`
  **explicitly** — defaults are a documented safety net, not a shortcut. A helper self-test
  asserts each variant's exact bytes.
  - *Rejected:* 4b (slice-only — leaves prefix/trim duplicated, doesn't DRY the axes that
    actually drifted); 4c (error-object — couples to the `execFileSync` throw shape, but most
    TOOL-01 sites read a non-throwing spawn result and would have to fabricate a fake `err`).

### Claude's Discretion
- Exact helper file layout, JSDoc, and per-site edit sequencing within the combined plan are
  the planner's/executor's to determine, subject to the constraints above and below.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & scope
- `.planning/REQUIREMENTS.md` §"Pillar D" (TOOL-01/02/03) — the three refactor requirements
  and their exact target files/site counts.
- `.planning/ROADMAP.md` §"Phase 111" — goal, success criteria (pins helper path, ~18-21 /
  ~13 / 3 site counts, byte-equivalence invariant).

### Code under refactor (read before editing)
- `scripts/validation/_lib/frozen-at-close.mjs` — centralized frozen-aware module TOOL-02
  adopts. Exports `readAtClose(tag, path)` (**throws** on failure) + per-milestone
  convenience wrappers `readAtV15Close`…`readAtV112Close`. `MILESTONE_CLOSE_SHAS` map at top.
- `scripts/validation/check-phase-61.mjs` — touched by ALL THREE refactors: TOOL-01 sites
  (`:370`, `:389`), TOOL-03 self-test site (`:406`), TOOL-02 inline readers (`:39`, `:58`).
- `scripts/validation/check-phase-68.mjs` — **Landmine A**: `:216-218` hard-greps for
  check-phase-61's inline reader symbol names with AND logic and no fallback.
- `scripts/validation/check-phase-{67,70}.mjs` — TOOL-02 inline frozen readers (catch→null→SKIP).
- `scripts/validation/check-phase-{48,60}.mjs` — TOOL-03 stderr-only self-test sites
  (`48:76`, `60:192`, both `stderr.slice(0, 200)`); 60 also has TOOL-01 sites.
- `scripts/validation/check-phase-{73,100}.mjs` — reference for tolerant matcher pattern
  (73:204 uses OR logic); each contains BOTH a variant-A and a variant-C detail site.
- `scripts/validation/check-phase-{62,63,64,65,66,69,71,72,74,82,88,93,95}.mjs` — additional
  TOOL-01 wrapper sites (variant A at CHAIN wrapper, variant C at harness wrapper).

### Prior decision lineage
- D-02 (LOCKED, Option C) — centralized frozen-at-close module is the sanctioned design;
  documented in `frozen-at-close.mjs` header + `.planning/milestones/v1.8-DEFERRED-CLEANUP.md`
  (FROZEN-AWARE-ADOPTION-SWEEP-01, deferred from Phase 74).
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `_lib/frozen-at-close.mjs` `readAtClose()` — the target of TOOL-02 adoption. Must be
  **wrapped** (catch→return null) at adoption sites to preserve SKIP semantics, not called raw.
- `check-phase-73.mjs:204` tolerant matcher (`!includes('readAtV15Close') && !includes('frozen-at-close')`)
  — the pattern to mirror when making check-phase-68's V-68-10 assertion tolerant.

### Established Patterns
- **Three live failure-detail variants** (verified): A = `check-phase-N FAIL: …slice(0,500).trim()`;
  B = `harness FAIL: …slice(0,500).trim()` (only 60, 61); C = `harness FAIL: …slice(0,300)`
  NO trim (62-95, 67, 68, 70, 73:404, 100:137). Prefix does NOT determine N or trim.
- **isMissing verdict branch** — the ENOENT / `status===127` / "not found" SKIP-vs-FAIL branch
  is duplicated identically at `100:111-113`, `60:189-190`, `61:403-405`. This is a VERDICT
  concern — keep it OUT of the detail-string helper.
- Runner renders `result.detail` only on `!pass || skipped || VERBOSE`.

### Integration Points
- New `_lib/exec-fail-detail.mjs` is imported by ~18-21 check-phase-*.mjs wrapper sites.
- TOOL-02 adoption changes imports/usage in check-phase-{61,67,68,70}.mjs; the check-phase-68
  V-68-10 assertion change is coupled to the check-phase-61 inline-reader removal.
</code_context>

<specifics>
## Specific Ideas

- Verification tooling should be reusable across the three refactors (single forced-failure
  harness that captures verdicts + detail bytes before/after), not three ad-hoc checks.
</specifics>

<deferred>
## Deferred Ideas

- A lint/guard that fails CI if a future inline `(stdout+stderr).slice(...)` duplicate
  reappears (regression fence for TOOL-01) — a new capability; note for a future tooling
  phase, out of scope for these three refactors.

**Cross-Cutting Execution Constraints (LOCKED — apply regardless of option):**
1. **Landmine A — atomicity:** Removing the literal inline symbols `readRequirementsAtV15Close`
   / `readRoadmapAtV15Close` from `check-phase-61` and making `check-phase-68`'s V-68-10
   assertion (`68:216-218` AND-grep) tolerant (mirror check-phase-73's OR / add a
   frozen-at-close fallback) MUST land in **one commit**.
2. **Landmine B — preserve SKIP:** `readAtClose` **throws**; the inline readers it replaces
   catch→return null→caller SKIPs. Adoption MUST wrap `readAtClose` to catch and return null.
   A naive swap flips SKIP→FAIL and fails the chain.
3. **Landmine C — preserve stderr behavior:** `readAtClose` sets `stdio:['ignore','pipe','pipe']`;
   check-phase-61's inline readers omit it. Adoption in 61 must preserve 61's failure-path
   stderr behavior (the suite treats the stderr leak as significant).
4. **Verdict vs string separation:** Do NOT fold the `isMissing` SKIP-vs-FAIL branch into the
   detail-string helper; preserve each site's verdict exactly.
5. **Per-site, not per-file:** "One N per file" is unsafe — check-phase-73 and check-phase-100
   each contain BOTH a variant-A and a variant-C site. N/trim/prefix selection is per-call-site.
6. **Forced-failure verification is mandatory:** green-chain equality is not evidence
   (detail renders only on failure/VERBOSE).
7. **Sequential main-tree execution:** worktrees unreliable — no parallel plans; order edits
   so each atomic commit leaves the full chain exiting 0.

### Reviewed Todos (not folded)
None — no pending todos matched this phase.
</deferred>

---

*Phase: 111-pillar-d-chain-validator-tooling-refactors*
*Context gathered: 2026-07-01*
