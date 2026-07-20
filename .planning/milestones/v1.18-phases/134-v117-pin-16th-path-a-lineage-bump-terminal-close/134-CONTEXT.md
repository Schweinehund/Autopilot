# Phase 134: V117 Pin + 16th Path-A Lineage Bump + Terminal Close - Context

**Gathered:** 2026-07-19
**Status:** Ready for planning

<domain>
## Phase Boundary

The terminal close of milestone v1.18. Delivers the mandatory back-anchor pin, the 16th Path-A audit-harness lineage bump, and a 3-axis terminal re-audit + single close-gate — the sole deliverable cluster of this phase, per project convention (mirrors the phase 100/112/119/125/128 close precedent; harness close never batches with content/tooling work).

Requirements HARN-11/12/13 are fully specified in REQUIREMENTS.md and carried mostly by convention. This phase adds NO new content and pulls NOTHING into v1.18 scope. **V118 pin is explicitly out of scope** (the successor milestone's job, per the back-anchor rule).

**Deliverables (from HARN-11/12/13):**
- `_lib/frozen-at-close.mjs` gains the **V117** entry + `readAtV117Close` export (back-anchor pin).
- `v1.18-milestone-audit.mjs` (16th, Path-A from v1.17, C1-C17 inherited) + `v1.18-audit-allowlist.json` + BASELINE_22 refresh + `check-phase-129..134.mjs` (6 new validators) + `audit-harness-v1.18-integrity.yml` (new CI coexistence workflow).
- 3-axis terminal re-audit + SINGLE close-gate commit flipping all 20 v1.18 requirements to Validated across PROJECT/ROADMAP/STATE/REQUIREMENTS + `v1.18-MILESTONE-AUDIT.md` + `v1.18-DEFERRED-CLEANUP.md`.

</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved via `/adversarial-review` (Finder 187 pts / Adversary +45, 8 risks disproved / Referee final calibration). Each decision is grounded in the surviving CONFIRMED risks and the repo's locked conventions.

### GA-1 — Windows deep-nest axis of the 3-axis re-audit → **Option B (advisory)**
- **D-01:** The Windows fresh-clone deep-nest axis is **ADVISORY** with a documented, D-03-sanctioned accepted-timeout. **Linux GHA (authoritative for BOTH chain validators per D-03) + a zero-context subagent carry the authoritative verdict.** WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 "deepens again" this milestone (now [48..133], hitting both chain validators) — it is a known recurring platform timeout, not a close-blocker.
- **Reject Option A (mandatory-PASS):** converts a known recurring win32 timeout into a hard close-blocker (contradicts D-03) AND forces a frozen apex/harness timeout edit (collides with HARN-12 byte-unchanged invariant). 86 nested spawns near the ceiling = flaky gate.
- **Reject Option C (Windows shallow run):** `CHECK_PHASE_NESTED=1` skips chain AND audit-harness re-run, so there is no clean "audit-harness-only" lever without a frozen edit; a shallow run changes *what* is validated → vacuous "exact match" and skips exactly the win32-divergent frozen-read/archival-resolution paths.
- **Mandatory guardrails:**
  - Document the win32 timeout **explicitly** as an accepted D-03 divergence (never silent) so it does not read as normalized debt.
  - The zero-context subagent (axis 3) must run on an **independent host/runner** — a same-host win32 subagent inherits the timeout and is not an independent axis.

### GA-2 — Validator authoring scope & apex identity → **Option A (129..134, apex=134)**
- **D-02:** Author `check-phase-129.mjs` through `check-phase-134.mjs` (**6 new validators**; validator-atom deferral confirmed — content phases 129-133 shipped no validators). New chain-apex = **check-phase-134**, chain range **[48..133]** (86 entries, self-inclusive per the 128 precedent). V-134-SELF asserts `134 NOT in CHAIN_PHASES` AND `CHAIN_SKIP.size === 0` (dual-invariant); V-134-AUDIT is SKIP-PASS until the close-gate lands (intended graceful-skip; the final fresh-clone re-audit reads the committed doc → real PASS).
- **Reject Option B (129..133, apex=133):** ships Phase 134 with NO validator (under-delivers HARN-12, which names check-phase-...NN=134), is forward-incompatible with v1.19 (next apex expects apex=134 + chain reaching 133), collides with 133's chain-entry identity, and drops 133 from the chain.
- **Mandatory guardrails:**
  - Resolve every one of the 6 validators' `VERIFICATION.md` reads through the **`archive-path.mjs` resolver** — never a hardcoded `.planning/phases/...` path (archival-drift-recurs-every-close blocker).
  - **Do NOT guess the archive-root token.** check-phase-128 literally passes `['v1.16-phases']` for a v1.17 doc — the token is non-obvious and fragile. A wrong guess → `resolveArchivedPhasePath` returns null → graceful-skip returns `pass:true` → **silent false-green**. Make resolver-null **fail-loud**, not skip-pass. Verify the correct v1.18 root string.
  - Preserve the **HARN-11 dual-token positive-confirmation** `git log --all --grep` method for the V117 SHA and **verify the returned commit's SUBJECT LINE carries both tokens** (v1.17 false-positive caveat — the archival git-rm SHA d0fda4f9 / safety SHA 6851b54a can share tokens; pinning the post-git-rm tree would corrupt every v1.17-frozen read).
  - Guard against a `CHAIN_SKIP===0` deadlock (adding chain entries to force green is a self-disqualifier per D-119-3/D-125-1/D-128-C) and de-duplicate the interior [48..133] entries (length+termini asserts don't catch a duplicated/dropped interior entry).

### GA-3 — v1.18-DEFERRED-CLEANUP.md scope → **Option A, scoped (log-only)**
- **D-03:** The close doc **logs BOTH CARVE-1 AND CARVE-2** (133-CONTEXT requires two logged carve-outs). **Log-only, ZERO fixes** — nothing is remediated in this close.
  - CARVE-1: `FROZEN-AWARE-ADOPTION-SWEEP-01` remains durable debt — the permanent fix (`readAtClose` adoption across the 13 milestone-audit harnesses + `regenerate-supervision-pins.mjs`) is deferred to a **future dedicated tooling milestone**. Re-pin does NOT masquerade as "sweep resolved."
  - CARVE-2: TOOL-05 re-scoped to "verify + attest the existing single-apex O(n) property cross-OS" (the imagined within-apex O(n²) does not exist — the `CHECK_PHASE_NESTED` guard already satisfies it).
- **Reject Option B (minimal, CARVE-1 only):** drops CARVE-2 → 133-CONTEXT both-carve-outs-logged requirement miss; TOOL-05's original O(n²) wording survives unqualified.
- **Mandatory guardrails:**
  - **Log-only** — resist the sweep→fix temptation (this close pulls nothing into v1.18 scope).
  - If a token-sweep for open DEFER-*/CARVE-* is run, match **exact deferral IDs against an exclusion list of already-frozen predecessor deferrals** (FROZEN-AWARE-ADOPTION-SWEEP-01 already lives in v1.8-DEFERRED-CLEANUP; DEFER-121-07 / RETRO-* series) — never re-catalogue a frozen earlier deferral (double-book).
  - Give CARVE-1 an explicit "unscheduled, tracked → future tooling milestone" home so it does not rot.
  - DEFER-119-A re-listing is **optional** (D-05 was satisfied by the Phase-133 plan stating it in writing — not mandated in the close doc). Include only if it does not reintroduce double-booking.

### GA-4 — Close-PR Class-B cascade disposition → **Option B (criteria-gated fallback)**
- **D-04:** Expect green, but **retain the ACCEPTED-STANDALONE-CI-RED fallback**, criteria-gated. TOOL-04 re-pin (Phase 133) greened the 11 predecessor integrity workflows, but CARVE-1's root cause is **unresolved** — `audit-harness-v1.N-integrity.yml` `harness-run` checkout has no ref, so frozen predecessor harnesses run against **live HEAD**; the close-gate adds `.planning/*` changes to HEAD → a predecessor frozen harness can *legitimately* go RED. A criteria-gated fallback is required so an expected RED does not deadlock the close.
- **Reject Option A (all-green, any RED blocks):** with CARVE-1 unresolved, an expected structurally-explained predecessor RED with no escape hatch deadlocks the close forever.
- **Mandatory guardrails:**
  - Apply ACCEPTED-STANDALONE-CI-RED **only IFF**: all failing jobs are harness jobs + **zero** chain failures + current-milestone run green.
  - **Machine-verify** the disposition with `gh run view --json jobs` — never eyeball the checks UI (a real linux-chain/apex failure must never be waved through as "harness-only").
  - **Enumerate the cascade workflows fresh at close time** — do not trust a stale count; the new 15th CI coexistence workflow (`audit-harness-v1.18-integrity.yml`) must be caught.
  - **Sequence-coupling with GA-2:** confirm the new **apex=134 validator actually ran and passed BEFORE invoking the fallback** — the "current-milestone green" criterion rides the freshly-authored, unproven apex.

### Claude's Discretion
- Internal structure of the 6 new `check-phase-*.mjs` validators (each follows the check-phase-128 template: AUDIT + CHAIN + AUDIT-HARNESS + SELF, NESTED-aware) — planner/executor's call within the invariants above.
- The exact `v1.18-audit-allowlist.json` line-pin deltas (Path-A from v1.17, TARGETED shift-repointing per any recorded HYG-02-style line shifts; count/identity unchanged, confirmed against live corpus).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap (the locked spec)
- `.planning/REQUIREMENTS.md` — HARN-11 (V117 pin + dual-token false-positive caveat), HARN-12 (16th Path-A lineage bump + byte-unchanged-except-TOOL-04 + full predecessor chain BEFORE close-gate), HARN-13 (3-axis re-audit + single close-gate). 20 v1.18 requirements total to flip to Validated.
- `.planning/ROADMAP.md` §"Phase 134" — 4 success criteria; §"Phase 133" for the TOOL-04/05/06 lineage that lands its carve-outs here.
- `.planning/STATE.md` — §Blockers/Concerns Phase-134 watch items (WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 deepens; Linux GHA both chain validators authoritative; V118 out of scope).

### Prior-phase decisions that bind this close
- `.planning/phases/133-chain-validator-tooling-debt-closure/133-CONTEXT.md` — D-01..D-09, **CARVE-1** (FROZEN-AWARE-ADOPTION-SWEEP-01 durable debt), **CARVE-2** (TOOL-05 re-scope), D-05 (DEFER-119-A ACCEPTED-ADVISORY), D-03 (Linux OS split).

### The frozen/harness surfaces this phase edits or extends
- `scripts/validation/_lib/frozen-at-close.mjs` — `MILESTONE_CLOSE_SHAS` (V116='3dd2512' present; V117 slot next) + `readAtClose()` + convenience exports; add V117 + `readAtV117Close` here.
- `scripts/validation/check-phase-128.mjs` — the prior apex; the exact template for the [48..N-1] invariant, V-N-SELF dual-invariant, NESTED guard, AUDIT-HARNESS spawn, and the `archive-path.mjs` milestoneRoots call pattern (note the fragile `['v1.16-phases']` root).
- `scripts/validation/_lib/archive-path.mjs` — `resolveArchivedPhasePath` resolver; the standing archival-drift fix. All 6 new validators' VERIFICATION reads route through it; resolver-null must fail-loud.
- `scripts/validation/v1.17-milestone-audit.mjs` — the 15th harness; Path-A template for `v1.18-milestone-audit.mjs` (C1-C17 inherited verbatim; C17 subprocess-spawn of c17-eee-contract.mjs).
- `scripts/validation/v1.17-audit-allowlist.json` — sidecar template for `v1.18-audit-allowlist.json`.
- `scripts/validation/regenerate-supervision-pins.mjs` — BASELINE_21 (v1.17) → refresh to **BASELINE_22** at this close (already earmarked in the file's comments); frozen, do NOT convert to readAtClose (D-02 from 133).
- `.github/workflows/audit-harness-v1.17-integrity.yml` — template for the new `audit-harness-v1.18-integrity.yml`; confirms the CARVE-1 live-HEAD root cause (do not edit the predecessor checkout layer).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **check-phase-128.mjs** — copy-forward template for all 6 new validators; carries the fail-loud module-load length/terminus asserts (guarantees an off-by-one aborts rather than false-greens), the dual-invariant SELF check, and the NESTED-aware AUDIT-HARNESS step.
- **v1.17-milestone-audit.mjs + v1.17-audit-allowlist.json** — Path-A copy source for the 16th harness (C1-C17 inherited).
- **archive-path.mjs resolver** — already imported by ~25 validators; the mechanism that keeps prior-milestone reads alive post-archival.
- **frozen-at-close.mjs** — mature `readAtClose(tag, path)` (git show `<SHA>:<path>`) with MILESTONE_CLOSE_SHAS populated v1.4.1→v1.16; V117 append + export is a mechanical one-entry add.

### Established Patterns
- **Back-anchor invariant:** at close of milestone N, pin the PREVIOUS milestone's close SHA (V117 at v1.18 close); the current milestone's pin (V118) is deferred to the successor. Single-entry per close.
- **[48..N-1] chain-apex invariant:** apex = close phase; chain array spans every integer 48..(N-1); apex asserts self NOT in chain + CHAIN_SKIP empty.
- **Validator-atom deferral:** content phases hand off a needle-spec; the close phase authors the whole validator block (129..134) as one indivisible atom.
- **NESTED guard:** `CHECK_PHASE_NESTED=1` short-circuits both the recursive chain-guard AND the audit-harness re-run (gives single-apex O(n)).

### Integration Points
- The 6 new validators chain into the apex; the 16th harness reads the re-pinned sidecars (also read transitively by the chain); the new CI workflow coexists with the 14 prior integrity workflows; the close-gate commit flips 20 reqs across 4 planning docs.

</code_context>

<specifics>
## Specific Ideas

- The V117 SHA must be recovered by the HARN-11 dual-token positive-confirmation grep with **subject-line verification** — the v1.17 close-gate commit, NOT the archival git-rm (d0fda4f9) or safety (6851b54a) commits.
- The TOOL-04 re-pin from Phase 133 landed as a single D-00a-exception commit; HARN-12's "byte-unchanged EXCEPT the explicitly-scoped remediation" must reconcile against exactly that diff — no broader frozen-surface drift.

</specifics>

<deferred>
## Deferred Ideas

- **`readAtClose` adoption across the 13 `v1.4–v1.17-milestone-audit.mjs` harnesses + `regenerate-supervision-pins.mjs`** — the permanent root-cause fix for `FROZEN-AWARE-ADOPTION-SWEEP-01` (CARVE-1). Deferred to a future dedicated tooling milestone where a large frozen-code change is not racing a milestone close. Logged in v1.18-DEFERRED-CLEANUP.md (log-only, this phase pulls nothing in).
- **V118 back-anchor pin** — explicitly the successor milestone's (v1.19) job per the back-anchor rule. Out of scope here.

### Reviewed Todos (not folded)
None — no pending todos matched this phase's scope.

</deferred>

---

*Phase: 134-V117 Pin + 16th Path-A Lineage Bump + Terminal Close*
*Context gathered: 2026-07-19*
