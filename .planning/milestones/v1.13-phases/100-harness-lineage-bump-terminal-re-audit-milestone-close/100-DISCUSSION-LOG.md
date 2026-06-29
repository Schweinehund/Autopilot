# Phase 100: Harness Lineage Bump + Terminal Re-Audit + Milestone Close - Discussion Log

> **Audit trail only.** Not consumed by downstream agents — decisions live in CONTEXT.md.

**Date:** 2026-06-29
**Phase:** 100-harness-lineage-bump-terminal-re-audit-milestone-close
**Areas discussed:** Phase-96 needle source, DEFERRED-CLEANUP scope, Chain-RED handling, Re-audit Windows axis
**Method:** All four gray-area picks resolved via `/adversarial-review` (standing user preference).

---

## Adversarial-review outcome (Finder → Adversary → Referee)

- **Finder:** 23 objections, 96 pts (1 CRITICAL: GA3-C).
- **Adversary:** disproved 7 (+19), **0 wrong disproves**. Notably killed the Finder's "check-phase-66 standalone times out (exit=124)" lever — verified it's a 60 s external-`timeout` artifact; the validator is 28/0/0, exit 0, in 354 s with a 300 000 ms internal budget.
- **Referee:** independently verified every pivotal claim; confirmed GA3-C CRITICAL and the `[48..99]` correction.

**All four winners = Option A** (with mandatory refinements).

---

## Phase-96 needle source (GA1)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Derive check-phase-96 needles inline from 96-CONTEXT + committed edits; no spec file | ✓ |
| B | Author a retroactive 96-NEEDLE-SPEC.md first | (rejected — back-dates a closed phase; needle-specs are untested anyway) |
| C | Needle GLOS-01 + ACC tokens directly, no 96-CONTEXT derivation | (rejected — skips D-02/D-04 guardrails: removed VPP row, slug landmine) |

**Refinements:** needle 309/319 (not pre-existing 326); explicit unique ACC-04 token at runbook 15:30; assert bare `### Kandji-Iru` slug + removed VPP row; don't needle `#vpp` def.

---

## DEFERRED-CLEANUP scope (GA2)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Drop resolved (GLOSSARY-IRU; WR-02 already fixed); carry open verbatim; add new (index:108, WR-01, IN-01) | ✓ |
| B | Like A but omit WR-01/IN-01 | (rejected — masks verified-OPEN items) |
| C | Carry everything incl. resolved GLOSSARY-IRU | (rejected — masking resolution violates doctrine) |

**Refinements:** stale-count cite is `docs/index.md:108` (not 06-triage:101); WR-01 (quick-ref-l1:101) + IN-01 (common-issues:242-247) verified OPEN.

---

## Chain-RED handling (GA3)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Frozen-aware, CHAIN_SKIP=new Set([]), Linux-authoritative honest accounting | ✓ |
| B | Fresh chain-health re-pass at apex before close | (rejected — chain already green-qualified; wasted motion) |
| C | Add legacy phases to CHAIN_SKIP to force green | (DISQUALIFIED — CRITICAL: trips V-SELF CHAIN_SKIP.size===0 + breaks locked empty-Set) |

**Refinement:** author internal `CHAIN_PHASES=[48..99]` (not [48..100]); chain is NOT red (legacy 58-66/73 frozen-aware GREEN since Phase 86).

---

## Re-audit Windows axis (GA4)

| Option | Description | Selected |
|--------|-------------|----------|
| A | Lean on locked D-03 (Linux authoritative); run Windows leaf axis; document deep-nest timeout as known non-blocker | ✓ |
| B | Add Windows execution mitigation (concurrency/budget rewrite) | (rejected — = deferred O(n²) rewrite; bloats Atom 2; breaks tooling-only) |
| C | Drop Windows fresh-clone axis | (rejected — 3-axis→2-axis regression; leaves run fine on Windows) |

**Refinement:** record deep-nest as Linux-authoritative non-blocker in MILESTONE-AUDIT with the prior-misclassification caveat; keep cross-OS table fully populated.

## Claude's Discretion
- Exact stable-token strings per needle (subject to land-not-preexisting + uniqueness + guardrail rules).
- V112 SHA lookup + BASELINE_17 value (mechanical).
- DEFERRED-CLEANUP prose structure (mirror v1.12).

## Deferred Ideas
- WR-01 / IN-01 / docs/index:108 resolution (docs-content; future corpus milestone).
- O(n²) chain-runner remediation for WINDOWS-CLONE-DEEPNEST-TIMEOUT-01.
- MTPSSO/PSSO-FUT-03, KRBFUT-01/02.
