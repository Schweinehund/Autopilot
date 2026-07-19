# Phase 133: Chain-Validator Tooling Debt Closure - Context

**Gathered:** 2026-07-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Resolve the accumulated chain-validator **tooling debt** across three requirements (TOOL-04, TOOL-05, TOOL-06), structurally isolated from the content phases (129–132). This is a purely internal harness/CI phase — **no `docs/` content is touched**.

**Delivers:**
- TOOL-04: the 11 standalone-RED predecessor CI workflows (`audit-harness-v1.5..v1.16-integrity.yml` + base + harness-replay) turned **green** via a coordinate-only re-pin of the affected frozen `-audit-allowlist.json` `{file,line}` sidecar pins.
- TOOL-05: **verification + attestation** that the existing `CHECK_PHASE_NESTED=1` guard already delivers single-apex O(n) behavior, plus a Windows cold-clone apex check (Linux GHA authoritative per D-03). **No cache code is authored.**
- TOOL-06: the 3 `HELPER-SPAWN-STDERR-01` slice-budget nits at `check-phase-{48,60,61}.mjs` closed; DEFER-119-A left as ACCEPTED-ADVISORY (auto-falls-out of the TOOL-04 pick).

**Decision method:** All four gray areas were resolved via a 3-agent `/adversarial-review` (Finder→Adversary→Referee, all files verified). See `133-DISCUSSION-LOG.md` for the full pass.

</domain>

<decisions>
## Implementation Decisions

### GA-1 (DOMINANT) — TOOL-04 frozen-surface approach → **(a) targeted re-pin**
- **D-01:** Ship **option (a): coordinate-only re-pin** of the affected `v1.4–v1.16 -audit-allowlist.json` `{file,line}` pins (and any harness-embedded coords) to current line positions. Pin **count and identity unchanged** — only line numbers move, by the recorded HYG-02 −1 shift.
- **D-02: Reject (b) frozen-aware `readAtClose` conversion of the 13 milestone-audit harnesses.** Rationale: broadest frozen-*CODE* blast radius, and it breaks the pin helper's own declared "zero shell, zero network" contract (`regenerate-supervision-pins.mjs:7`) — for zero pre-close benefit, since no content phase remains in v1.18.
- **D-03: Reject (c) re-disposition to ACCEPTED-STANDALONE-CI-RED.** These are genuine coordinate defects, not Class-B close-cascade REDs; accepting permanent RED defers the debt rather than clearing it (the milestone's stated purpose). Also, the predecessor-integrity workflows are `continue-on-error:false` (PR-blocking), so "accept the RED" would either block the merge or force a frozen-workflow edit anyway.
- **D-04: Reject the workflow-layer close-SHA checkout.** The same `.yml` also runs the authoritative `linux-chain` apex at live HEAD with `fetch-depth:0`; checking out the close SHA for the harness-run job makes the frozen harness validate the frozen tree against itself — a tautologically-green regression-guard (CI-layer masking).
- **Mitigation (mandatory):** derive every new coord from `regenerate-supervision-pins.mjs --report` (read-only on sidecars; reports stale pins + current positions), human-review each moved pin against live content, and attest in the commit that pin count/identity are unchanged — only line numbers moved.

### GA-2 — DEFER-119-A coupling → **(a) auto-resolve**
- **D-05:** DEFER-119-A auto-falls-out of the TOOL-04 pick and **remains ACCEPTED-ADVISORY** under re-pin. Its `pin-helper-advisory` job is `continue-on-error:true` with the `--self-test` step wrapped `|| echo` — structurally non-blocking regardless of outcome. No independent disposition (separate disposition = YAGNI). The plan MUST state this outcome in writing so Phase 134's close-audit doesn't re-litigate it.

### GA-3 — TOOL-05 cache mechanism → **REFRAME: verify-and-attest, no cache code**
- **D-06:** TOOL-05 ships as **verification, not code**. Attest that the pre-existing `CHECK_PHASE_NESTED=1` guard already gives the required single-apex O(n) property (`check-phase-128`: each phaseNum in `[48..127]` spawned exactly once; NESTED short-circuits recursive chain-guard AND audit-harness re-run). There is **no within-apex redundancy to memoize** and **no legal non-frozen apex to edit in Phase 133** (every apex `check-phase-48..128` is frozen; the next new apex `check-phase-129` is a Phase-134/HARN-12 deliverable).
- **D-07: Reject on-disk result cache (b).** Risks false-pass masking (a stale PASS surviving a tree change → HARN-12 violation) and breaks HARN-13's cross-OS PASS/FAIL/SKIP EXACT-MATCH (a persisted artifact diverges across the 3 axes). In-process memo (a) is the correct *shape* but a no-op — do not author it (authoring it means editing a frozen apex = D-00a violation).
- **D-08: Windows cold-clone verification is a Phase-133 build step** (SC#2, "verified post-fix"), non-authoritative. Linux GHA stays authoritative per D-03; Phase 134's HARN-13 3-axis re-audit is the *final* exact-match, not the first place the O(n) claim is checked.

### GA-4 — D-00a exception scoping / atomicity → **(a) one atomic attested commit**
- **D-09:** The TOOL-04 re-pin lands as a **single, bounded, atomic D-00a-exception commit**, separate from TOOL-05/06 work, with an explicit `D-00a-EXCEPTION: TOOL-04 re-pin, coordinate-only` attestation in the message. This makes HARN-12's "byte-unchanged EXCEPT the explicitly-scoped remediation" a single reviewable git diff and preserves clean rollback. The commit contains **only** re-pin coords — no TOOL-05 verification files, no TOOL-06 stderr tuning.

### Requirement-vs-reality carve-outs (RECORD for Phase 134 — user locked both)
- **CARVE-1 (TOOL-04):** Re-pin satisfies TOOL-04 SC#1 ("made green") but does NOT resolve `FROZEN-AWARE-ADOPTION-SWEEP-01`'s framing — the true root cause (CI runs frozen harnesses against **live HEAD**; `audit-harness-v1.N-integrity.yml` `harness-run` checkout has no ref) survives. It holds only because no content lands before close. Durable debt; the known permanent fix is `readAtClose` adoption across the 13 harnesses, in a **future dedicated tooling milestone**, not a pre-close scramble. Do NOT let re-pin masquerade as "sweep resolved."
- **CARVE-2 (TOOL-05):** The "cache within a single apex … stops O(n²)" wording is **already satisfied** by the shipped `CHECK_PHASE_NESTED` guard; the residual within-apex O(n²) it imagines does not exist. Re-scope the TOOL-05 success criterion to "verify + attest the existing single-apex O(n) property cross-OS."

### Claude's Discretion
- Exact per-sidecar coordinate values (derived mechanically from `--report`, human-verified).
- Which stderr slice-budget value the 3 `check-phase-{48,60,61}` sites converge on (TOOL-06 nit — implementation detail).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Requirements & roadmap
- `.planning/REQUIREMENTS.md` §TOOL-04 (line ~38), §TOOL-05 (line ~39), §TOOL-06 (line ~40), §HARN-12 (line ~45), §HARN-13 (line ~46) — acceptance criteria; the D-00a "nothing broader" out-of-scope row (line ~78); the decision list (line ~84).
- `.planning/ROADMAP.md` §"Phase 133" (line ~148) — 3 success criteria + discuss-phase flags; §"Phase 134" (line ~155) — the close where CARVE-1/CARVE-2 land.
- `.planning/STATE.md` — "At Phase 133 plan time: run `/adversarial-review` on the TOOL-04 approach" (done, this doc).

### Files this phase edits (TOOL-04 re-pin — DATA only)
- `scripts/validation/v1.5-audit-allowlist.json` … `scripts/validation/v1.16-audit-allowlist.json` (+ `v1.4`, `v1.4.1`) — the affected frozen sidecars; move stale `{file,line}` pins to current coords, count/identity unchanged.

### Files this phase edits (TOOL-06 — stderr slice-budget)
- `scripts/validation/check-phase-48.mjs`, `check-phase-60.mjs`, `check-phase-61.mjs` — the 3 `HELPER-SPAWN-STDERR-01` slice-budget sites (`execFailDetail(..., {n:...})`).

### Files this phase READS (verify/attest — do NOT edit; frozen)
- `scripts/validation/regenerate-supervision-pins.mjs` — run `--report` (read-only) to derive re-pin coords + confirm stale pins; DEFER-119-A's `--self-test` lives here. **Frozen — do not convert to `readAtClose` (D-02).**
- `scripts/validation/check-phase-128.mjs` — the v1.17 chain-apex; evidence for the TOOL-05 O(n)/NESTED attestation (D-06). **Frozen.**
- `scripts/validation/_lib/frozen-at-close.mjs` — existing `readAtClose()` + `MILESTONE_CLOSE_SHAS` (v1.4.1→v1.16); the infra a future sweep would adopt (CARVE-1). Not used this phase.
- `.github/workflows/audit-harness-v1.16-integrity.yml` (and siblings) — the standalone integrity workflows; confirms the live-HEAD root cause (CARVE-1). **Do not edit the checkout layer (D-04).**

### Standard / doctrine
- D-00a frozen-surface doctrine (REQUIREMENTS.md line ~78): frozen surfaces byte-unchanged except the exact TOOL-04 scoped remediation.
- D-03 OS split: Linux GHA authoritative for both chain validators; Windows verify-only.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `regenerate-supervision-pins.mjs --report` — read-only advisory that already reports pinned vs current positions and **stale pins** (line no longer has a supervision hit). This is the mechanical source for TOOL-04 re-pin coordinates.
- `scripts/validation/_lib/frozen-at-close.mjs` — mature `readAtClose(tag, path)` via `git show <SHA>:<path>` with `MILESTONE_CLOSE_SHAS` populated v1.4.1→v1.16, already imported by ~25 validators. The permanent-fix substrate (CARVE-1), deliberately NOT adopted this phase.
- `CHECK_PHASE_NESTED=1` guard in every apex (`check-phase-128:117`) — already collapses the chain to O(n) within a single apex; TOOL-05's "fix" is to attest this, not build over it.

### Established Patterns
- Frozen `-audit-allowlist.json` sidecars pin exemptions by exact `{file,line,reason}`; the harness reads the **live working tree** (`readFileSync`), so any content line-shift breaks the pin match → C2 FAIL. This is the whole TOOL-04 mechanism.
- Chain apex `[48..N-1]` invariant: each apex excludes its own phase and spawns each predecessor once. TOOL-05 must not perturb this.
- D-00a exception discipline: any frozen-surface edit is a single, attested, bounded commit (GA-4/D-09) so the next apex's HARN-12 byte-unchanged audit is a clean diff.

### Integration Points
- TOOL-04 re-pin must leave the 11 standalone `audit-harness-v1.N-integrity.yml` workflows green AND keep the chain apex green (the re-pinned sidecars are read by both the milestone-audit harness and, transitively, the chain).
- The DEFER-119-A `pin-helper-advisory` job (`continue-on-error:true`) must remain advisory — its state is informational, never build-blocking.

</code_context>

<specifics>
## Specific Ideas

- TOOL-04 commit message carries an explicit `D-00a-EXCEPTION: TOOL-04 re-pin, coordinate-only (pin count/identity unchanged)` attestation line (feeds Phase 134's HARN-12 audit).
- Phase 134 roadmap must gain two logged carve-outs: CARVE-1 (`FROZEN-AWARE-ADOPTION-SWEEP-01` remains durable debt) and CARVE-2 (TOOL-05 re-scoped to verify-and-attest).

</specifics>

<deferred>
## Deferred Ideas

- **`readAtClose` adoption across the 13 `v1.4–v1.16-milestone-audit.mjs` harnesses + `regenerate-supervision-pins.mjs`** — the permanent root-cause fix for `FROZEN-AWARE-ADOPTION-SWEEP-01` (GA-1 option b). Deferred to a **future dedicated tooling milestone** where a large frozen-code change is not racing a milestone close. Infra (`_lib/frozen-at-close.mjs`) already exists. (CARVE-1)
- **Workflow-layer close-SHA checkout / retiring redundant standalone integrity jobs** — considered and rejected for Phase 133 (D-04); belongs to the same future frozen-aware sweep, not this close.

</deferred>

---

*Phase: 133-chain-validator-tooling-debt-closure*
*Context gathered: 2026-07-19*
