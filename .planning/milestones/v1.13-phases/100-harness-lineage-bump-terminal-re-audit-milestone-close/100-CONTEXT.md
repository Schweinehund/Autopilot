# Phase 100: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Context

**Gathered:** 2026-06-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver **HARN-01, HARN-02, HARN-03** — the 11th Path-A audit-harness lineage bump (v1.4→v1.13), per-phase validators covering all v1.13 content phases (96–100), the V112 close-gate-SHA pin, the 3-axis terminal re-audit with cross-OS EXACT MATCH, and the v1.13 milestone close (14/14 requirements Validated). This is the **MUST-BE-LAST** close phase — it executes only after content phases 96–99 are complete (they are). Mirrors v1.12 Phase 95 / v1.11 Phase 93.

**In scope (tooling/close only):** the three indivisible/atomic harness commits, the re-audit, and the close-gate doc set.
**Out of scope:** ANY `docs/*` corpus edit (Phase 100 is tooling/close-only); fixing deferred docs-content items (they route to DEFERRED-CLEANUP); re-touching the byte-frozen predecessor surfaces v1.4–v1.12.

This phase's *what* is locked by HARN-01/02/03 + the 4 ROADMAP success criteria + the named decisions LOCKED at roadmap. The four *how* decisions below were resolved via `/adversarial-review` (Finder → Adversary → Referee, ground-truthed against the live harness lineage and the v1.12 close).

</domain>

<decisions>
## Implementation Decisions

Resolved via `/adversarial-review` — Finder raised 23 objections (96 pts); Adversary disproved 7 (0 wrong calls); Referee independently verified every pivotal claim. **One CRITICAL self-disqualifier confirmed (GA3-C).** All four winners = Option A with mandatory refinements. Full trail in DISCUSSION-LOG.md.

### D-01 (GA1): Phase-96 validator needles — derive inline in `check-phase-96.mjs` from 96-CONTEXT + committed edits (NO retroactive 96-NEEDLE-SPEC.md)
- Phase 96 shipped before the needle-spec hand-off convention (which started at 97), so it has no `96-NEEDLE-SPEC.md`. Authoring one retroactively back-dates a closed/verified phase and adds zero validation value (needle-specs are by-design untested — they are hand-off docs; the CI net is `check-phase-96.mjs` itself, path-filtered via `check-phase-*.mjs`).
- **Refinements (non-negotiable):**
  - **Needle the ACC-01 landing strings at `docs/macos-lifecycle/00-ade-lifecycle.md` ~lines 309/319** (the corrected PKG/LOB sentences). Do **NOT** needle the pre-existing line-326 "never distributed via Apple VPP" phrase — it pre-dated Phase 96 and would false-green against pre-96 bytes.
  - **Add an explicit, unique ACC-04 token** at `docs/l1-runbooks/15-macos-company-portal-sign-in.md:30`. The generic "user group" string is non-discriminating across the suite — pick a stable unique substring from the corrected remediation sentence.
  - **GLOS-01:** needle the 3-URL glossary statement at `docs/_glossary-macos.md:114` (`support.iru.io` / `support.kandji.io` / `docs.iru.com`).
  - **Guardrails:** assert the bare `### Kandji-Iru` heading is intact (slug `#kandji-iru` — double-hyphen/slash landmine); assert the removed local VPP "Glossary Terms Used" row stays removed; do **NOT** needle the glossary `#vpp` definition (~15 inbound links).
  - ACC-02 token also needed (the "static user group" correction at guide 00 ~line 250).

### D-02 (GA2): `v1.13-DEFERRED-CLEANUP.md` scope — drop resolved, carry open verbatim, add new
- **DROP (record Closed in `v1.13-MILESTONE-AUDIT.md`):** `GLOSSARY-IRU-URL-FRESHNESS-01` — resolved by GLOS-01 (Phase 96 `b70d028`; glossary:114 now carries the 3-URL roles). The quarterly URL-liveness cadence was deliberately kept OUT of the durable glossary per Phase-96 D-04 (dated caveats live in guide 02) — it is NOT an unmet closure criterion. Phase-99 **WR-02** is also NOT carried — it was FIXED in Phase 99 `5d6ee80`.
- **CARRY open items verbatim** ("do NOT mask via deletion"): `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (now at depth [48..99] apex — worse), multi-tenant PSSO (`MTPSSO-01/02/03` / `PSSO-FUT-03`), `KRBFUT-01/02`, plus any still-open items from v1.12-DEFERRED-CLEANUP.
- **ADD new v1.13 deferrals:**
  - Stale runbook count at **`docs/index.md:108`** ("(6 runbooks…)") — defensibly stale (8 macOS L1 runbooks exist). **Cite `docs/index.md:108`, NOT `06-macos-triage.md:101`** (the Finder mis-cited; :100/:101 is the escalation-collect row, not a count).
  - **WR-01** — `docs/quick-ref-l1.md:101` still reads "Escalate L2 via [Secure Enclave Key Loss]…", mislabeling L1 #36 as an L2 escalation target. **Verified OPEN.**
  - **IN-01** — `docs/common-issues.md:242-247` locked-out entry goes L1 #37 → L2 #27 without surfacing the L1 #36 mandatory-re-registration intermediate. **Verified OPEN.**
  - WR-01 and IN-01 are docs-content fixes — **out of Phase-100 tooling/close-only scope → defer (do NOT fix here)**.

### D-03 (GA3): Chain handling — frozen-aware, `CHAIN_SKIP = new Set([])`, Linux-GHA-authoritative honest accounting
- **GA3-C (force-green via CHAIN_SKIP) is DISQUALIFIED — CRITICAL:** adding phases to `CHAIN_SKIP` trips the V-SELF `CHAIN_SKIP.size === 0` hard-assert (`check-phase-95.mjs:138-141`) and breaks the locked Atom-2 `new Set([])` pin → V-100-SELF FAIL; it also reverses the v1.7/v1.8 CHAIN_SKIP-elimination history.
- The chain is **NOT RED**: legacy phases 58-66/73 were converted to **frozen-aware GREEN at Phase 86**; v1.12 closed chain FULLY GREEN (Linux apex). No fresh chain-health re-pass (GA3-B) is needed — it's wasted motion.
- **`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` is genuinely open** and carries forward (D-02); the close honestly accounts for it as a Windows-only, Linux-authoritative non-blocker.
- **Refinement (CRITICAL — corrects a roadmap-shorthand misread):** author the apex internal **`CHAIN_PHASES = [48..99]`**, NOT `[48..100]`. The roadmap "[48..100]" is the *milestone range*; the validator array follows the `[48..N-1]` invariant (check-phase-95 uses `[48..94]`, excluding its own phase). A literal `[48..100]` includes the apex (phase 100) → V-100-SELF self-reference FAIL.

### D-04 (GA4): 3-axis re-audit Windows axis-1 — lean on locked D-03, run Windows leaf axis, document the deep-nest timeout as a known non-blocker
- **GA4-B (Windows execution mitigation) rejected:** a bounded-concurrency / per-subprocess-budget rewrite of the synchronous `execFileSync` chain runner IS the deferred O(n²) remediation — it would bloat the indivisible Atom 2 and violate the Phase-100 tooling/close-only lock + the Path-A "mirror check-phase-95" template.
- **GA4-C (drop Windows axis) rejected:** needlessly regresses auditor independence 3-axis→2-axis and forfeits the cross-OS EXACT-MATCH leaf evidence; the leaf validators (v1.13-audit + check-phase-96..99, all non-chain) run **fine** on Windows — only the chain validators hit the deep-nest, and those are already Linux-authoritative per D-03.
- The `check-phase-66` "timeout" is a **verified 60s external-`timeout` artifact** (standalone is 28/0/0, exit 0, with a 300 000 ms internal subprocess budget) — **document, do NOT "fix."**
- **Refinement:** in `v1.13-MILESTONE-AUDIT.md`, explicitly record the deep-nest chain timeout as a Linux-GHA-authoritative non-blocker **with the prior-misclassification caveat** (Phase-97 deferred-items mis-read the cascade as a genuine check-phase-66 failure); populate the cross-OS table fully from the fast leaf axes + Linux GHA chain counts.

### Claude's Discretion
- Exact stable-token strings chosen for each needle (subject to D-01's land-not-preexisting + uniqueness + guardrail rules).
- The precise V112 SHA (resolve via `git log --grep="close-gate" --grep="v1.12" --all-match`) and the BASELINE_17 value — mechanical lookups for research/planner.
- DEFERRED-CLEANUP prose/section structure (mirror v1.12).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents (researcher, planner, executor) MUST read these before planning or implementing.**

### Validator templates & invariants (Atom 2 — mirror these)
- `scripts/validation/check-phase-95.mjs` — the most recent per-phase validator; THE template for check-phase-96..100. Note: `CHAIN_PHASES=[48..94]` (apex excludes own phase — proves D-03's `[48..99]` rule), V-SELF dual-invariant `CHAIN_SKIP.size===0` hard-assert (~lines 138-141), synchronous `execFileSync` chain runner (~88-94).
- `scripts/validation/check-phase-90.mjs`..`94.mjs` — continuity-validator examples.
- `scripts/validation/check-phase-66.mjs` — the deep-nest non-blocker: internal 300 000 ms subprocess budget (~line 310), exits only 0/1 (~379-380); 28/0/0 standalone.

### Audit harness & freshness (Atom 1)
- `scripts/validation/v1.12-milestone-audit.mjs` — Path-A C1-C16 source to inherit verbatim for `v1.13-milestone-audit.mjs`.
- `scripts/validation/_lib/frozen-at-close.mjs` — the V-pin lib; add the **V112** entry (v1.12 close-gate SHA). See how V111/prior pins are structured.
- `.github/workflows/audit-harness-v1.12-integrity.yml` — template for the 10th CI workflow `audit-harness-v1.13-integrity.yml`; path-filter triggers on `scripts/validation/v1.13-*` + `check-phase-*.mjs` + the workflow file. Windows chain reference ~430 s.

### Needle sources for check-phase-96..100 (Atom 2)
- `.planning/phases/96-surgical-conflict-fixes/96-CONTEXT.md` — D-01 (ACC-01 landed 309/319; 326 pre-existing), ACC-02 (~guide-00:250 "static user group"), ACC-04 (runbook 15:30), D-02 (removed VPP glossary row), D-04 (GLOS-01 + bare `### Kandji-Iru` slug guardrail). **The source for check-phase-96 needles (no 96-NEEDLE-SPEC.md exists).**
- `.planning/phases/97-enrollment-filevault-depth-formalization/97-NEEDLE-SPEC.md` (+ `97-.../deferred-items.md` — note its conditional Phase-100 catalog obligation, discharged by carrying WINDOWS-CLONE-DEEPNEST).
- `.planning/phases/98-guide-07-comprehensive-pass/98-NEEDLE-SPEC.md` — substring/negative-lookahead rigor exemplar.
- `.planning/phases/99-new-runbook-navigation-wiring/99-NEEDLE-SPEC.md` — 18 tokens for check-phase-99.

### Close-artifact precedents (close-gate)
- `.planning/milestones/v1.12-DEFERRED-CLEANUP.md` — the carry/drop/add doctrine ("do NOT mask via deletion" line ~23; WINDOWS-CLONE-DEEPNEST §47-71; O(n²) remediation note ~65).
- `.planning/milestones/v1.12-MILESTONE-AUDIT.md` — chain GREEN accounting (~51-60), `[48..N-1]` apex invariant (~70-71,126), cross-OS table (~181-196).
- `.planning/PROJECT.md` — milestone history; Phase-86 frozen-aware conversion (~line 498); WINDOWS-CLONE-DEEPNEST + WR-01-hardening precedent (~650).

### Phase 99 open findings to route into DEFERRED-CLEANUP (verify line cites at authoring time)
- `docs/quick-ref-l1.md:101` (WR-01) · `docs/common-issues.md:242-247` (IN-01) · `docs/index.md:108` (stale count).

</canonical_refs>

<code_context>
## Existing Harness-Lineage Insights

### Reusable Assets
- **Path-A milestone-audit pattern** (v1.12-milestone-audit.mjs C1-C16) — copy verbatim, relabel for v1.13.
- **Per-phase validator template** (check-phase-95.mjs) — V-SELF + chain + frozen-aware structure; clone for 96..100.
- **frozen-at-close.mjs V-pin ladder** — append V112; predecessors byte-unchanged.
- **CI coexistence workflow** (audit-harness-v1.12-integrity.yml) — clone as the 10th; v1.4–v1.12 byte-unchanged.
- **Close-artifact templates** (v1.12 MILESTONE-AUDIT + DEFERRED-CLEANUP).

### Established Patterns
- **Indivisible atoms** (Atom 1 = audit+allowlist+BASELINE; Atom 2 = validators+frozen-pin+CI) committed as single commits; single close-gate commit (NO Commit A).
- **Frozen-at-close** handles legacy chain FAILs (CHAIN_SKIP stays empty).
- **D-03 OS split** — Linux GHA authoritative for BOTH chain validators (Windows deep-nest is a non-blocker).
- **3-axis terminal re-audit** — fresh `git clone --no-hardlinks` + cross-OS Linux GHA + fresh zero-context sub-agent; cross-OS PASS/FAIL/SKIP EXACT MATCH.
- **Sequential-on-main-tree** execution (use_worktrees:false).

### Integration Points
- check-phase-96..100 wrap (do not edit) the committed content of phases 96–99.
- The apex validator (check-phase-100) extends the chain; predecessors frozen.
- DEFERRED-CLEANUP ← phase-99 open findings; MILESTONE-AUDIT ← resolved-item closures + cross-OS table.

</code_context>

<specifics>
## Specific Ideas / Execution Cautions (from the adversarial review)

1. **`CHAIN_PHASES = [48..99]`** in check-phase-100 (NOT [48..100] — the roadmap shorthand is the milestone range; the array excludes the apex's own phase, mirroring check-phase-95's [48..94]). Authoring [48..100] trips V-100-SELF self-reference.
2. **`CHAIN_SKIP = new Set([])`** — never add entries to force the chain green (V-SELF asserts size 0; locked empty-Set). This was the CRITICAL self-disqualifier (GA3-C).
3. **Needle the 309/319 ACC-01 landing**, not the pre-existing line-326 phrase (false-green risk). Add a **unique ACC-04 token** at runbook 15:30. Honor the slug/row guardrails (bare `### Kandji-Iru`, removed VPP row, untouched `#vpp` def).
4. **DEFERRED-CLEANUP:** drop GLOSSARY-IRU + WR-02 (both resolved — record Closed in MILESTONE-AUDIT); add WR-01 + IN-01 + docs/index:108 (open); carry WINDOWS-CLONE-DEEPNEST etc. verbatim.
5. **check-phase-66 deep-nest** = Linux-authoritative non-blocker (exit=124 is a 60 s external-`timeout` artifact; standalone 28/0/0). Document in MILESTONE-AUDIT with the prior-misclassification caveat; do NOT do the O(n²) runner rewrite.
6. **Predecessors 96–99 byte-unchanged** — WR-02 already fixed (`5d6ee80`); do not re-touch `06-macos-triage.md`.
7. **V112 pin** must be committed (BEFORE/within Atom 2) using the v1.12 close-gate SHA — resolve via `git log --grep="close-gate" --grep="v1.12" --all-match -1`.

</specifics>

<deferred>
## Deferred Ideas

- The actual resolution of WR-01 / IN-01 / docs/index:108 stale count — docs-content fixes, out of Phase-100 tooling/close-only scope; routed to `v1.13-DEFERRED-CLEANUP.md` for a future corpus-editing milestone (per do-NOT-mask doctrine).
- The O(n²) chain-runner subprocess-caching remediation for `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` (2–4 h) — explicitly deferred; out of close-scope.
- Multi-tenant PSSO (MTPSSO/PSSO-FUT-03), KRBFUT-01/02 — carried open to a future milestone.

</deferred>

---

*Phase: 100-harness-lineage-bump-terminal-re-audit-milestone-close*
*Context gathered: 2026-06-29*
