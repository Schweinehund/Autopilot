# Phase 128: V116 Pin + 15th Path-A Lineage Bump + Terminal Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-11
**Phase:** 128-v116-pin-15th-path-a-lineage-bump-terminal-close
**Areas discussed:** C · Validator remediation, A · PIPE-02 rider, D · Skeleton/pin/bundle, B · Cross-OS Axis-2 cascade

**Method:** User selected all four gray areas and delegated every pick to a three-agent adversarial review
(Finder → Adversary → Referee, all Opus, each independently re-verifying every deciding fact against the repo).
The review converged HIGH on all four and corrected several v1.17-specific grounding gaps. This mirrors the
Phase 125 close adjudication (per user's standing preference for adversarial-review on close-phase gray areas).

---

## C · Predecessor-validator remediation

| Option | Description | Selected |
|--------|-------------|----------|
| C1 emergent-slot-only | Fire `readAtV116Close` conversion only if the GHA apex comes back RED, + flag-#6 plan-time scoping | |
| C2 pre-scope-and-convert-now | Convert the known HYG-reading validators up front (surface is small & enumerable) | |
| Synthesis (adjudicated) | Plan-time pre-scope-AND-convert the KNOWN HYG-reading validators to `readAtV116Close` (MANDATORY) + emergent slot for surprises; NO broad sweep; NO value-masking; CHAIN_SKIP empty | ✓ |

**User's choice:** Delegated to adversarial review → SYNTHESIS.
**Notes:** Finder recommended C1 on the premise "the slot never fires." Adversary + Referee OVERRULED: HARN-09
*mandates* the conversion ("is converted frozen-aware…as in-scope close-gate remediation") for a confirmed
non-empty live-HEAD reading set (`check-phase-121` reads `_glossary-android.md`); STATE L205/220 orders scoping
at plan time (119-05/125-05 two-round-remediation cautionary precedent). C2's broad sweep is the deferred
`FROZEN-AWARE-ADOPTION-SWEEP-01`. Grounding corrections: HYG-03 is a v1.17 no-op (frozen in V116 via `9031056`);
HYG-02 = 5 files not 1; the ABAUDIT/C15 dominant risk is absent (no structural retrofit); no validator asserts
the removed key (emergent-RED probability ~nil).

## A · PIPE-02 grounding rider

| Option | Description | Selected |
|--------|-------------|----------|
| A1 harness-only, no rider | HARN-10 omits the PIPE-02 leg v1.16's HARN-07 carried; do not copy it | ✓ |
| A2 add bundle-integrity/grounding smoke test | Verify the .docx bundle at close since it's the hero deliverable | |

**User's choice:** Delegated to adversarial review → A1.
**Notes:** All three agents CONFIRMED. HARN-10 (and ROADMAP SC1–SC4) name no grounding leg; v1.16's HARN-07
explicitly did (`git show 3dd2512:REQUIREMENTS.md`). v1.17 changed no grounding surface. A2 mislabels packaging
validation as grounding and duplicates the Phase-126 PUB-02/PUB-04 gate; also structurally incompatible with the
fresh-clone axis (`dist/` gitignored).

## D · Close skeleton + V116-pin placement + bundle-verify + DEFERRED-CLEANUP

| Option | Description | Selected |
|--------|-------------|----------|
| D1 as scoped | 3-atom floor + Wave-0 anchor + emergent slot; V116 pin `3dd2512` rides Atom 2; apex `[48..127]`=80 hard-throw; 126/127 carry `[]`; close-gate does NOT verify hook-regen; DEFERRED-CLEANUP resolves V116-PIN-DEFERRAL now, carries sweep/O(n²)-runner/upload to v1.18 | ✓ |
| D2 pin rides Atom 1 | — | |
| D3 standalone commit for the pin | — | |

**User's choice:** Delegated to adversarial review → D1 as scoped.
**Notes:** V114/V115 both rode Atom 2 (precedent). Sub-Q1 CONFIRMED: `publish-bundle-gate.cjs` only nudges +
idempotency-skips, never builds/verifies the zip; `dist/` gitignored → fresh clone has no zip → close-gate adds
NO hook-regen leg. Grounding corrections: apex is 80 entries not 77 (update the length throw); close flips 10
reqs not 14; naming = 15th Path-A bump / 14th CI coexistence workflow; SHA `3dd2512` is a candidate, confirm via
dual-token grep.

## B · Cross-OS Axis-2 cascade

| Option | Description | Selected |
|--------|-------------|----------|
| B1 GHA authoritative | Linux GHA authoritative for BOTH chain validators; author `audit-harness-v1.17-integrity.yml`; Atom-2 push first, close-gate consumes run ID | ✓ |
| B2 local WSL2/Docker authoritative | Not the SC-named surface; local-env/LF variance | |
| B3 sub-agent runs chain, GHA skipped | Collapses Axis-2 into Axis-3 | |

**User's choice:** Delegated to adversarial review → B1.
**Notes:** CONFIRMED with a cascade-count correction. The Finder said "10 firing workflows"; the Adversary +
Referee corrected to **11 firing** (base `audit-harness-integrity.yml` via `scripts/validation/**` + v1.7–v1.16)
— but only **10 chain-running** (v1.7–v1.16) matter for the RED scan; the base runs no chain job. v1.5/v1.6 do
NOT fire. Phase 125's "all 11 versioned v1.5–v1.16" framing is imprecise.

## Claude's Discretion

- Exact plan count / plan-to-commit mapping within the skeleton.
- Optional non-blocking `.docx` parity dry-run at close (NOT a HARN-10 requirement).
- Optional local corroborating Linux (WSL/Docker) chain pass before the authoritative GHA push.

## Deferred Ideas

- `FROZEN-AWARE-ADOPTION-SWEEP-01` (broad frozen-aware conversion) → v1.18+.
- `WINDOWS-CLONE-DEEPNEST-TIMEOUT-01` / O(n²) Windows chain-runner rewrite → deferred.
- Auto-upload to SharePoint, SharePoint content-approval Draft-gating, Azure AI Search → deferred.
