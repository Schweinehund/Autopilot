# Phase 112: Pillar E — 12th Path-A Audit-Harness Lineage Bump + Milestone Close - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-07-02
**Phase:** 112-pillar-e-12th-path-a-audit-harness-lineage-bump-milestone-cl
**Areas discussed:** Resolution approach; Chain-red reconciliation (GA1 needles / GA2 deferred-cleanup / GA3 chain / GA4 re-audit resolved via adversarial-review)

---

## Resolution Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Adversarial-review all 4 | Run /adversarial-review (Finder → Adversary → Referee) across all four gray areas, ground-truthed against the live harness + v1.13 Phase 100 precedent | ✓ |
| Interactive discuss | Focused AskUserQuestion turns per area; user picks directly | |
| Select specific areas | User pre-filters which of the 4 are genuinely open vs inherit-from-100 | |

**User's choice:** Adversarial-review all 4
**Notes:** Matches the durable project convention (adversarial-review for gray-area picks at discuss-phase) and mirrors exactly how v1.13 Phase 100 was resolved. Finder found 12 objections (60 pts) and surfaced a live chain-RED landmine none of the original 4 gray areas anticipated. Adversary reproduced the headline verbatim and attempted 0 disproves (score 0 — disciplined maximum; the case was empirically airtight). Referee independently reproduced (catching and correcting a cwd false-negative in its own first run), resolved the 90d-freshness-deliberate question, and confirmed the v1.7 `79c65c6` sidecar-rebase precedent.

---

## Chain-Red Reconciliation (the emergent decision — GA3/GA4 CRITICALs)

The adversarial review escalated the review beyond the original 4 gray areas to a single dominant finding: the v1.14 apex chain is RED at HEAD because Phase 101 (`eae49f7`) and Phase 109 (`6306da8`) corpus edits broke the frozen v1.12/v1.13 milestone audits that `check-phase-95/100` run against live corpus inside the chain — split into Class-1 line-pin drift (C2/C7/C9) and Class-2 freshness (C5/C10; deliberate 90d supersession, no sidecar valve). The user was asked how Phase 112 should reconcile this so the milestone can close (with Atom-1's 90d-threshold adoption locked regardless).

| Option | Description | Selected |
|--------|-------------|----------|
| NESTED-guard | Add a NESTED guard to check-phase-95/100's AUDIT-HARNESS step so nested predecessor apexes skip re-validating evolved live corpus (still validate own close SHA standalone). Greens both classes; edits living validators (Phase-111 precedent), no frozen .mjs/sidecar touch; also scope integrity-CI path-filters | ✓ |
| Accept documented RED | Touch no predecessor validators; close with chain honestly RED, documented in MILESTONE-AUDIT; amend close-gate to permit known-RED predecessor axis | |
| Sidecar-rebase + guard freshness | Rebase frozen predecessor sidecars +1 to green Class-1 (precedent 79c65c6), NESTED-guard/documented-RED only for Class-2 freshness | |

**User's choice:** NESTED-guard (recommended)
**Notes:** Architecturally expresses the correct principle — a frozen milestone-audit validates its own close-SHA corpus, not future live corpus. Greens both failure classes at once without editing any frozen `.mjs`/sidecar. Companion requirement flagged for the planner: scope the `audit-harness-v1.12/v1.13-integrity.yml` path-filters (or resolve the frozen-workflow-vs-path-filter tension) so standalone CI does not go RED on v1.14 corpus.

---

## Claude's Discretion
- Exact stable needle-token strings per validator (subject to D-01 land-not-preexisting + uniqueness + consumption rules).
- BASELINE_18 value; precise NESTED-guard implementation (mirror the CHAIN-step short-circuit at `check-phase-100.mjs:91-92`).
- Exact integrity-CI path-filter scoping edit vs documented-RED-standalone alternative (planner resolves the frozen-workflow tension).
- DEFERRED-CLEANUP / MILESTONE-AUDIT prose structure (mirror v1.13).

## Deferred Ideas
- O(n²) chain-runner subprocess-caching remediation for WINDOWS-CLONE-DEEPNEST-TIMEOUT-01 (out of close scope).
- Multi-tenant PSSO (MTPSSO/PSSO-FUT-03), KRBFUT-01/02, CI-3 Managed-Apple-Account rename, AOSP-wired 802.1X, Cloud PKI deep-dive — carried open verbatim.
- Stale `frozen-at-close.mjs:5-9` header cleanup (documentation drift, post-Phase-111).
- Corpus freshness re-stamp to 60d — REJECTED (would undo committed v1.14 discuss-flag-#7 decision).
