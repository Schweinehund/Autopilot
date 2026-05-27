# Phase 69: CI-Linux Hardening (Pillar C — Cross-OS Verification) - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-26
**Phase:** 69-CI-Linux Hardening (Pillar C — Cross-OS Verification)
**Areas discussed:** Staging strategy, Chain scope on Linux, Job topology, SC#5 verification proof
**Methodology:** Parallel adversarial-review via 4 `gsd-advisor-researcher` agents in adversarial-review mode (per user durable memory `feedback_adversarial_review_preference`). Each agent read ROADMAP/REQUIREMENTS/STATE + 68-CONTEXT.md + v1.5/v1.6 workflow source files + check-phase-66.mjs chain-apex source independently. Scores below: lower = better, matching 68-CONTEXT.md convention. User approved all 4 recommendations without revision via single `Approve all 4` selection.

---

## Staging strategy (D-01)

**Gray area:** Where does the new ubuntu-latest job live?

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A — Stage in v1.6 workflow (transitional coexistence) | Add new `linux-chain-ubuntu-latest` job to existing `audit-harness-v1.6-integrity.yml`. Catches v1.6 chain on Linux immediately on every v1.6 path-filter PR. | 14 | |
| B — Create new `audit-harness-v1.7-integrity.yml` skeleton in Phase 69 (Phase 70 HARNESS-04 extends) | Phase 69 ships minimal v1.7 workflow file containing the new ubuntu-latest job + transitional path-filter + workflow_dispatch. Phase 70 Path-A copies v1.6 jobs into existing v1.7 file (rewriting path-filter, adding crons, etc.). | **7** | ✓ |
| C — Stage in v1.6 + commit to Phase 70 migration | Combine A's immediacy with explicit handoff comment; Phase 70 deletes v1.6 stage-in + adds equivalent job to v1.7. | 18 | |

**User's choice:** Option B
**Notes:** Decisive wedge — REQUIREMENTS.md:36 (HARNESS-04) already locks the destination: "Composes with CILINUX-01: the v1.7 workflow includes the new ubuntu-latest runner job." Option B is the only path that lands the job in its committed home on the first commit. Also honors the "v1.5 frozen the moment v1.6 shipped" lineage convention. CONTEXT.md captures the skeleton/extend file-boundary contract as a concrete handoff table for Phase 70 HARNESS-04 planner. Critical gotcha: `git config --global core.autocrlf false` BEFORE checkout (LF-fidelity contract).

---

## Chain scope on Linux (D-02)

**Gray area:** ROADMAP SC#1 says `check-phase-{48..66}.mjs`; REQUIREMENTS.md:26 says `{48..70}.mjs`. Which is binding, and what does the workflow YAML look like?

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A — `{48..66}.mjs` only (match today's tree literally) | Phase 69 ships exact validator set that exists today; Phase 70 HARNESS-04 adds 67-70 extensions. | 3 | |
| B — `{48..70}.mjs` with skip-if-missing pattern (graceful degradation) | Mirror v1.5/v1.6 canonical `if [ -f ... ]; then ...; else echo "skip per Phase 42 D-31"; fi` idiom for phases 67-70. Auto-activates as Phase 70 HARNESS-03 lands the validators. | **1** | ✓ |
| C — Parameterized bash for-loop `for i in 48..N; do node check-phase-$i.mjs; done` | Single job iterates with skip-if-missing inside loop. | 5 | |

**User's choice:** Option B (strict bound at 70, NOT future-proofed)
**Notes:** Decisive wedge — REQUIREMENTS.md is binding contract per /gsd traceability convention; ROADMAP SC#1's `{48..66}` reflects "current chain as of Phase 68 close" but the workflow file is forward-compatible scaffolding. The skip-if-missing pattern has 24+ prior occurrences across v1.5/v1.6 workflows with named-and-cited rationale string `"per Phase 42 D-31"` — Option A would be a regression to a less-mature pattern this project moved past in Phase 42. SC#3 ("NO CHAIN_SKIP entries reported") refers to in-validator `CHAIN_SKIP` Set (empty post-Phase-68 `7b635ca`), NOT workflow job-step skip-echoes.

---

## Job topology (D-03)

**Gray area:** Per-validator parallel jobs (matching v1.5/v1.6 idiom) vs single chain-apex (matching post-Phase-68 CHAIN-03 chain-recursive design)?

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A — Mirror v1.5/v1.6: 19 parallel per-validator jobs | Each phase 48..66 gets its own ubuntu-latest job; matches existing per-version workflow shape. | 4 | |
| B — Single chain-apex job (`check-phase-66.mjs` only) | One ubuntu-latest job invokes chain apex, which recursively spawns 48..65 via execFileSync internally. | 2 | |
| C — Hybrid: parse + path-match + harness-run + chain-apex | Composes v1.6-pattern harness-run + sidecar parse + path-match (idiom-preserving) with SINGLE chain-apex job (post-CHAIN-03-aware). | **1** | ✓ |
| D — Bash for-loop matrix | Single job with `for i in 48..N; do node check-phase-$i.mjs; done`. | 3 | |

**User's choice:** Option C
**Notes:** Decisive wedge — post-Phase-68 CHAIN-03, check-phase-66.mjs IS the chain apex (verified: lines 294-310 spawn execFileSync('node', [path], { timeout: 300000 }) for each phase in CHAIN_PHASES = [48..65]). Running ONLY check-phase-66 IS running the full chain. Option A's 19 parallel sister jobs would be 18-redundant compute. Option C composes the v1.6-pattern harness slice (parse + path-match + harness-run) with the post-CHAIN-03-aware chain slice (single chain-apex). Mandatory timing instrumentation: wrap chain-apex with `date +%s` capture + `::notice title=CHAIN_TIMING_LINUX::Full chain wall-clock: $((END-START))s (Windows reference: ~102s; subprocess timeout: 300s)` — answers Phase 68 TIMEOUT-01 Discovery #2 on ubuntu-latest runner speed.

---

## SC#5 verification proof (D-04)

**Gray area:** ROADMAP SC#5 requires "CI run on a representative PR (synthetic or real)" confirming Windows + Linux both exit 0 with identical PASS counts. How do we produce this evidence?

| Option | Description | Score | Selected |
|--------|-------------|-------|----------|
| A — Synthetic CRLF-injection PR (negative+positive on one PR) | Throwaway branch + PR: inject CRLF, verify Linux CI exits 1; revert, verify exits 0; close-without-merge. | 2 | |
| B — Wait for next real PR organic trigger | Phase 69 close documents the workflow; SC#5 evidence captured when next organic content PR fires it. | 4 | |
| C — `workflow_dispatch` manual trigger on master HEAD (immediate self-proof) | Fire workflow_dispatch post-commit; capture GHA run URL + PASS counts as evidence. | 3 | |
| D — Combine: A synthetic PR + C workflow_dispatch baseline | Both PR-context AND workflow_dispatch baseline; richest evidence; answers TIMEOUT-01 for free. | **1** | ✓ |

**User's choice:** Option D (sub-decision A-vs-B deferred to plan-phase)
**Notes:** Decisive wedge — Option C alone fails SC#5 letter "on a representative PR" (workflow_dispatch bypasses path-filter trigger). Option B blocks indefinitely (STATE.md shows no PRs since Phase 67 close; v1.7 is tooling milestone). Option A is strong; Option D adds workflow_dispatch baseline for free + answers Phase 68 TIMEOUT-01 Discovery #2. Sub-decision deferred to plan-phase: (a) add `docs/decision-trees/09-linux-triage.md` to Phase 69 path-filter as SC#5-evidence-only surface (Phase 70 HARNESS-04(a) removes it), OR (b) inject CRLF into a file already in transitional path-filter (e.g., comment block in check-phase-51.mjs). Recommendation: (a) for evidence-realism. CONTEXT.md captures 69-VERIFICATION.md section shape (A-G mirroring 68-VERIFICATION.md) as evidence-capture contract.

---

## Claude's Discretion

- **D-04 sub-decision (a) vs (b)** — Plan-phase plan author decides synthetic PR target file based on path-filter trade-off. Recommendation locked in CONTEXT.md: pick (a) with Phase 70 HARNESS-04(a) handoff note.
- **`harness-run` step name + Node version stanza** — copy verbatim from v1.6 workflow lines 65-74.
- **Skip-if-missing echo string** — literal `"check-phase-$i.mjs not present -- skipping (graceful degradation per Phase 42 D-31)"` per v1.5/v1.6 precedent.
- **`::notice` emission format** — recommended `::notice title=CHAIN_TIMING_LINUX::...`; equivalent GHA step-summary append is acceptable.
- **Branch naming for synthetic PR** — recommended `phase-69/sc5-crlf-evidence` (matches Phase 68 plan naming pattern).

## Deferred Ideas

(See CONTEXT.md `<deferred>` section for the full list — duplicated here only as audit trail headers)

- `pin-helper-advisory` job migration to v1.7 sidecar — Phase 70 HARNESS-04(d)
- `v1.7-audit-allowlist.json` sidecar authoring — Phase 70 HARNESS-02
- `v1.7-milestone-audit.mjs` Path-A copy — Phase 70 HARNESS-01
- Per-phase validators `check-phase-67..70.mjs` — Phase 70 HARNESS-03
- Both crons (weekly + quarterly) — Phase 70 HARNESS-04(b)
- Path-filter rewrite to v1.7-scoped surface — Phase 70 HARNESS-04(a)
- `cdcce23` archive-script root cause audit — v1.7-DEFERRED-CLEANUP.md ARCHIVE-01; v1.8+
- Subprocess-timeout architecture review (if Linux runtime > 150s) — v1.7-DEFERRED-CLEANUP.md TIMEOUT-01 escalation
