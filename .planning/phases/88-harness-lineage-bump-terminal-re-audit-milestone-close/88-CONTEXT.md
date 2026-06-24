# Phase 88: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Context

**Gathered:** 2026-06-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Ship the v1.10 audit harness as the **8th Path-A milestone-close harness** (the v1.4→v1.9 lineage pattern), run a **3-axis terminal re-audit** confirming cross-OS EXACT MATCH, and **formally close v1.10** with all 17 requirements flipped to Validated and all predecessor frozen surfaces byte-unchanged.

This phase clarifies HOW to implement what HARN-01/02/03 already scope. It does NOT add new capabilities, and it does NOT itself perform milestone archival (that is a separate `/gsd-complete-milestone` step — see D-07).

The exact structural precedent is **phase 82 (v1.9 close)** — same phase name, same 4-plan shape (82-01..82-04).
</domain>

<decisions>
## Implementation Decisions

All four gray areas were resolved to **Option A** via `/adversarial-review` (Finder→Adversary→Referee, opus). Both Finder and Adversary independently ranked all four areas as Option A; the Referee calibrated and locked the binding conditions below. Full reasoning in `88-DISCUSSION-LOG.md`.

### D-01 — Validator strategy: structural / self-referential ONLY (Area 1 → Option A)
The six new per-phase validators (`check-phase-83..88.mjs`) assert **lineage and structure only** — they MUST NOT blob-hash, anchor-match, or content-couple to v1.10 doc content.
- Each validator asserts: harness file exists & runs; phase ∉ `CHAIN_PHASES`; `CHAIN_SKIP.size === 0`; predecessor frozen surfaces read at **V19**.
- This is the exact pattern that kept validators 75–82 green with zero chain-health debt (`check-phase-82.mjs` = "AUDIT-HARNESS + SELF only").
- **Rejected:** Option B (content-coupled + self-freeze at V110) — bootstrap paradox (V110 SHA does not exist until close) + adds a commit after the close-gate (recreates the V17/V17_CLOSEGATE ambiguity). Option C (content-coupled at HEAD, defer conversion) — willfully manufactures v1.11 chain-health debt, the exact pre-71 pattern phase 86 just removed.
- **Division of labor (record so structural-only is not later mistaken for a coverage gap):** v1.10 doc *content* correctness is enforced by `check-phase-83..87` at AUTHORING time + per-phase verification; the milestone harness verifies lineage/immutability, a different invariant.

### D-02 — Validator wording guardrail
When authoring, "read predecessor frozen surfaces at V19" means structural reads via the `frozen-at-close.mjs` helpers for **predecessor** (v1.9-and-earlier) surfaces only. Do NOT extend `git show` / frozen reads to v1.10's own content — that would re-add the coupling D-01 forbids.

### D-03 — 3-axis re-audit execution: fresh clone (NOT worktree) + GHA + sub-agent (Area 2 → Option A)
- **Axis 1:** fresh `git clone --no-hardlinks` to a temp dir (NOT a git worktree — worktree lifecycle is known-unreliable on this repo).
- **Axis 2:** cross-OS Linux GHA.
- **Axis 3:** Task-tool zero-context sub-agent (no worktree).
- Cross-OS EXACT MATCH compares PASS/FAIL/SKIP counts.
- **Rejected:** Option B (worktrees + retries) — fights the known-flaky lifecycle; retries mask determinism. Option C (drop Axis 1) — forfeits the fresh-checkout signal and is no longer "3-axis".

### D-04 — MANDATORY D-03 mitigation for the deeper apex (binding condition on D-03)
The v1.10 apex is **[48..87]** — 6 deeper than v1.9's [48..81]. The Windows cold fresh-clone O(n²) cold-Node-subprocess timeout (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01`) is **OPEN and worsens with depth**. Therefore:
- Take the **authoritative apex PASS/FAIL/SKIP count from the WARM main tree + Linux GHA**.
- Use the fresh clone (Axis 1) **only for the fast non-apex validators**.
- Do NOT run the full apex under a cold fresh-clone on Windows — it produces spurious truncated FAILs and breaks EXACT MATCH.
This mirrors the Phase-82 D-03 mitigation and is MORE necessary at v1.10 depth, not less.

### D-05 — Close boundary: phase ends at close-gate; archival is separate (Area 3 → Option A)
- Phase 88 ends at the **close-gate commit**: `v1.10-MILESTONE-AUDIT.md` + `v1.10-DEFERRED-CLEANUP.md` + 4-doc traceability (PROJECT / ROADMAP / STATE / REQUIREMENTS) flipping **17/17 to Validated** + "MILESTONE CLOSE".
- Archival (move phase dirs → `.planning/milestones/v1.10-phases/`, remove REQUIREMENTS.md, jira complete) runs as a SEPARATE `/gsd-complete-milestone` step **after** the 3-axis re-audit passes.
- **Rejected:** Option B (phase also archives) — couples *irreversible* archival to the phase before independent verification, mutates the byte-layout/path-resolution validators read (`resolveArchivedPhasePath`), and breaks the 6-milestone v1.4–v1.9 boundary precedent.

### D-06 — Deferred-cleanup scope: deferred REQUIREMENTS only (Area 4 → Option A)
- `v1.10-DEFERRED-CLEANUP.md` enumerates deferred **requirements** only: MTPSSO-01/02/03 (multi-tenant PSSO → own milestone), KRBFUT-01/02 (on-prem AD Kerberos deep-dive; Azure Files Cloud-Kerberos GA promotion).
- Working-tree cruft (`.claude/worktrees/agent-*`, `TEMPcp*.txt`, `docs.zip`) is **out of scope** for this doc and is NOT mentioned in it. If cleanup is wanted, route to `/gsd-cleanup` as separate work — do not contaminate the close artifact.
- **Rejected:** Option B (req + hygiene checklist) and Option C (req + cruft disclaimer) — both pollute a traceability artifact with janitorial content / reference untracked files absent from the close SHA.

### D-07 — DO NOT carry the resolved chain-RED forward (correction surfaced by the review)
`PRE-EXISTING-CHAIN-RED-AT-HEAD-01` (legacy FAILs 58–66, 73) is **CLOSED by phase 86** — chain [48..82] is 37 PASS / 0 FAIL / 0 SKIPPED on BOTH Windows and Linux GHA. It MUST NOT be listed as unresolved debt in `v1.10-DEFERRED-CLEANUP.md` or any close artifact. (`WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` IS still open and is handled by D-04, not by carry-forward.)

### Claude's Discretion
- `V110` naming for the future v1.10 frozen-at-close key is convention-correct (`V` + version digits without dots; v1.5→V15, v1.8→V18). Readability nit only — no decision needed. NOTE: V110 itself is NOT pinned in this phase; it is the NEXT milestone's chain-health concern. This phase pins **V19** (see D-08 / CX-1).
- The v1.10 CI coexistence workflow is the **7th** (base + v1.5..v1.10), following the existing pattern.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase requirements & roadmap
- `.planning/ROADMAP.md` §"Phase 88" — goal, 4 success criteria, 4-plan shape (88-01..88-04)
- `.planning/REQUIREMENTS.md` — HARN-01 (Atom 1), HARN-02 (Atom 2), HARN-03 (3-axis re-audit + close); v2 deferred reqs (MTPSSO, KRBFUT) for D-06

### Path-A harness precedent (the template — copy from v1.9)
- `scripts/validation/v1.9-milestone-audit.mjs` — Path-A source for `v1.10-milestone-audit.mjs` (C1–C16 inherited)
- `scripts/validation/v1.9-audit-allowlist.json` — source for `v1.10-audit-allowlist.json` (apply v1.10 content-file deltas)
- `scripts/validation/regenerate-supervision-pins.mjs` — add BASELINE_14 freshness comment (Atom 1)
- `scripts/validation/_lib/frozen-at-close.mjs` — currently tops at `V18: '2bd79d8'`; add the **V19** entry (see CX-1). Note `V17` + `V17_CLOSEGATE` exist due to RETRO-02 (wrong-SHA lesson).
- `scripts/validation/check-phase-82.mjs` — the structural/self-referential validator pattern to replicate for check-phase-83..88 (D-01)

### Exact structural precedent (v1.9 close = phase 82)
- `.planning/milestones/v1.9-phases/82-harness-lineage-bump-terminal-re-audit-milestone-close/82-01-PLAN.md` — Atom 1 pattern (harness-core + predecessor V-pin)
- `.../82-02-PLAN.md` — Atom 2 pattern (validators + CI workflow + frozen-at-close entry)
- `.../82-03-PLAN.md` — 3-axis re-audit pattern (incl. the D-03 warm-tree×GHA mitigation)
- `.../82-04-PLAN.md` — close-gate pattern (MILESTONE-AUDIT + DEFERRED-CLEANUP + 4-doc traceability)

### Close artifacts precedent (for D-05/D-06)
- `.planning/milestones/v1.9-MILESTONE-AUDIT.md` — structure for `v1.10-MILESTONE-AUDIT.md`
- `.planning/milestones/v1.9-DEFERRED-CLEANUP.md` — scope precedent for `v1.10-DEFERRED-CLEANUP.md` (requirements-only)

### CI coexistence workflows (Atom 2 — the 7th)
- `.github/workflows/audit-harness-v1.9-integrity.yml` — source for `audit-harness-v1.10-integrity.yml`; predecessors `audit-harness-integrity.yml` + v1.5..v1.9 stay byte-unchanged
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **v1.9 harness pair** (`v1.9-milestone-audit.mjs` + `v1.9-audit-allowlist.json`): direct Path-A copy targets — change version strings + apply allowlist deltas for v1.10 content files (guides 10/11, L2 28/29, matrix rows).
- **`check-phase-82.mjs` structural shape**: "AUDIT-HARNESS + SELF only" — replicate per phase 83..88 with the correct phase number in each SELF dual-invariant (guard against transposed-digit copy-paste errors).
- **`frozen-at-close.mjs` V-entry registry + `readAtVNNClose` helpers**: add V19 + `readAtV19Close`.

### Established Patterns
- **Two-atomic-commit:** Atom 1 (harness-core + V-pin) and Atom 2 (validators + CI + frozen entry) each ship indivisible (HARN-01/02).
- **Predecessor byte-immutability:** v1.4–v1.9 harnesses + frozen surfaces must be byte-unchanged.
- **No CHAIN_SKIP masking:** `CHAIN_SKIP.size === 0` is asserted; retries/skips are forbidden (established phase 86).
- **Naming convention:** `V` + version-digits-without-dots → V19 for v1.9.

### Integration Points
- New `check-phase-83..88.mjs` plug into the validator chain; apex grows to [48..87] (+6 vs v1.9 — drives the D-04 mitigation).
- `audit-harness-v1.10-integrity.yml` joins the parallel CI coexistence set as the 7th workflow.
</code_context>

<specifics>
## Specific Ideas

- **CX-1 (gating prerequisite, Areas 1 & 3):** Pin **V19 = `b29dca5`** (v1.9 *close-gate* commit: "Phase 82 close-gate … MILESTONE CLOSE") in `frozen-at-close.mjs` as part of Atom 1, **before** any `check-phase-83.mjs` is authored (HARN-02 ordering). Pin the **close-gate** SHA, NOT an Atom SHA — verify the SHA against `git log` before committing (the V17/V17_CLOSEGATE supplement is the documented cost of getting this wrong). Confirm `b29dca5` is still the canonical close-gate at plan time.
- **CX-2 (gating prerequisite, Area 2):** see D-04 — warm-tree + GHA authoritative apex count; fresh clone for non-apex only.
- Milestone-close invariants are non-negotiable: predecessor byte-immutability, `CHAIN_SKIP.size === 0`, cross-OS EXACT MATCH.
</specifics>

<deferred>
## Deferred Ideas

- **Repo working-tree cleanup** (`.claude/worktrees/agent-*`, `TEMPcp*.txt`, `docs.zip`, `\357\200\272TEMP*.txt`) — out of scope for the close artifact (D-06); route to `/gsd-cleanup` as separate work.
- **Subprocess-result caching** as the *durable* fix for `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` — deferred (D-04 uses the warm-tree×GHA mitigation, not the durable fix). Tracked in `v1.9-DEFERRED-CLEANUP.md`; carry forward to v1.10-DEFERRED-CLEANUP since still open.
- **DEFERRED-CLEANUP single canonical location** convergence (`.planning/milestones/` vs `docs/`) — low-priority hygiene flag from v1.9; not resolved here.
- **MTPSSO-01/02/03, KRBFUT-01/02** — v2 requirements; enumerate in `v1.10-DEFERRED-CLEANUP.md` (D-06), execute in their own future milestones.

</deferred>

---

*Phase: 88-harness-lineage-bump-terminal-re-audit-milestone-close*
*Context gathered: 2026-06-24*
